import { NextRequest, NextResponse } from 'next/server';
import createAdminClient from '@/lib/supabase-admin';
import { ROLETYPE } from '@/lib/enum/role.enum';

export async function GET() {
    const { data, error } = await createAdminClient().auth.admin.listUsers();
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
}


const roleTableMap: Record<ROLETYPE, string> = {
    [ROLETYPE.KOMITE]: 'komite',
    [ROLETYPE.SISWA]: 'siswa',
    [ROLETYPE.LEMBAGA]: 'pegawai',
    [ROLETYPE.GUEST]: '',
    [ROLETYPE.SYSTEM]: ''
};
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const supabase = createAdminClient();
    const id = params.id;
    const body = await req.json();
    const { nama, approved, roles, jenis_profil } = body;

    await supabase.from('profil').update({ nama, approved, jenis_profil }).eq('id', id);

    if (roles) {
        await supabase.from('profil_role').delete().eq('profil_id', id);
        await supabase.from('profil_role').insert(roles.map((role_id: string) => ({ profil_id: id, role_id })));
    }



    const tableName = roleTableMap[jenis_profil as ROLETYPE];

    // 1. Check if record exists and update/insert accordingly
    if (jenis_profil && tableName) {
        const { count } = await supabase
            .from(tableName)
            .select('*', { count: 'exact', head: true })
            .eq('profil_id', id)
            .eq('isInaktif', false);

        if (count !== 0) {
            await supabase
                .from(tableName)
                .update({ isInaktif: true })
                .eq('profil_id', id);
        } else {
            await supabase
                .from(tableName)
                .insert({ profil_id: id, isInaktif: false });
        }
    }

    // 2. Update multiple selected roles (set isInactive to false again)
    const selectedRoles = Array.isArray(jenis_profil) ? jenis_profil : [jenis_profil];

    for (const role of Object.keys(roleTableMap) as ROLETYPE[]) {
        // Skip selected roles — only inactivate unselected ones
        if (selectedRoles.includes(role)) continue;

        const table = roleTableMap[role];
        if (table && table !== '') {
            await supabase
                .from(table)
                .update({ isInaktif: true }) // or isInactive, depending on your schema
                .eq('profil_id', id)
                .eq('isInaktif', false); // only update active ones
        }
    }

    return NextResponse.json({ success: true });
}


export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    const supabase = createAdminClient();
    const id = params.id;

    if (!id) {
        return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
    }

    // 1. Delete related subtypes and roles
    await supabase.from('profil_role').delete().eq('profil_id', id);
    // await supabase.from('siswa').delete().eq('profil_id', id);
    // await supabase.from('pegawai').delete().eq('profil_id', id);
    // await supabase.from('komite').delete().eq('profil_id', id);

    // 2. Delete profile
    const { error: profilError } = await supabase.from('profil').delete().eq('id', id);
    if (profilError) {
        return NextResponse.json({ error: profilError.message }, { status: 500 });
    }

    // 3. Delete from Supabase Auth
    const { error: authError } = await supabase.auth.admin.deleteUser(id);
    if (authError) {
        return NextResponse.json({ error: authError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
