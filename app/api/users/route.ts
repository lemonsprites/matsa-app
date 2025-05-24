import { APP_ROLES, ROLETYPE } from '@/lib/enum/role.enum';
import createAdminClient from '@/lib/supabase-admin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    const supabase = createAdminClient();


    // 1. Auth Users
    const { data: adminUsers, error: userError } = await supabase.auth.admin.listUsers();
    if (userError) return NextResponse.json({ error: userError.message }, { status: 500 });

    // 2. Profiles
    const { data: Profil, error: profileError } = await supabase
        .from('profil')
        .select('id, nama, approved, jenis_profil, created_at');
    if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 });

    // 3. Role Links
    const { data: ProfilRole, error: roleLinkError } = await supabase
        .from('profil_role')
        .select('profil_id, role_id');
    if (roleLinkError) return NextResponse.json({ error: roleLinkError.message }, { status: 500 });

    // 4. Roles
    const { data: Role, error: rolesError } = await supabase
        .from('roles')
        .select('id, name');
    if (rolesError) return NextResponse.json({ error: rolesError.message }, { status: 500 });

    // 5. Sub-profiles
    const siswaIds = new Set((await supabase.from('siswa').select('profil_id')).data?.map(r => r.profil_id));
    const pegawaiIds = new Set((await supabase.from('pegawai').select('profil_id')).data?.map(r => r.profil_id));
    const komiteIds = new Set((await supabase.from('komite').select('profil_id')).data?.map(r => r.profil_id));

    // 6. Combine data
    const result = Profil.map((profil) => {
        const authUser = adminUsers.users.find((user) => user.id === profil.id);

        const userRoleIds = ProfilRole
            .filter((r) => r.profil_id === profil.id)
            .map((r) => r.role_id);

        const userRoles = Role
            .filter((role) => userRoleIds.includes(role.id))
            .map((role) => ({
                id: role.id,
                name: role.name
            }));

        return {
            id: profil.id,
            nama: profil.nama,
            approved: profil.approved,
            jenis_profil: profil.jenis_profil,
            created_at: profil.created_at,
            email: authUser?.email || null,
            roles: userRoles,
            is_siswa: siswaIds.has(profil.id),
            is_pegawai: pegawaiIds.has(profil.id),
            is_komite: komiteIds.has(profil.id),
        };
    });

    return NextResponse.json(result);
}

// Add User
export async function POST(req: NextRequest) {
    const supabase = createAdminClient();
    const { email, password, nama, roles, jenis_profil } = await req.json();

    // 1. Create auth user in Supabase auth
    const { data: user, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    if (authError) {
        return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = user?.user?.id;
    if (!userId) {
        return NextResponse.json({ error: 'User ID not found after creation' }, { status: 500 });
    }

    // 2. Create profile in your profil table
    const { error: profilError } = await supabase.from('profil').insert({
        id: userId,
        nama,
        approved: false,
    });

    if (profilError) {
        return NextResponse.json({ error: profilError.message }, { status: 500 });
    }

    // 3. Insert roles
    if (roles?.length) {
        const roleData = roles.map((role_id: string) => ({
            profil_id: userId,
            role_id,
        }));

        const { error: roleError } = await supabase.from('profil_role').insert(roleData);
        if (roleError) {
            return NextResponse.json({ error: roleError.message }, { status: 500 });
        }
    }

    // 4. Insert subtypes
    if (jenis_profil?.includes(ROLETYPE.SISWA)) {
        await supabase.from('siswa').insert({ profil_id: userId });
    }
    if (jenis_profil?.includes(ROLETYPE.LEMBAGA)) {
        await supabase.from('pegawai').insert({ profil_id: userId });
    }
    if (jenis_profil?.includes(ROLETYPE.KOMITE)) {
        await supabase.from('komite').insert({ profil_id: userId });
    }

    return NextResponse.json({ success: true, id: userId });
}
