import createAdminClient from "@/lib/supabase-admin";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
  const supabase = createAdminClient();

  // 1. Ambil data artikel
  const { data: artikel, error: artikelError } = await supabase
    .from('artikel')
    .select('*')
    .order('created_at', { ascending: false });

  if (artikelError)
    return NextResponse.json({ error: artikelError.message }, { status: 500 });

  // 2. Ambil unique penulis_id dan reviewer_id dalam array
  const penulisIds = Array.from(new Set(artikel.map(r => r.penulis_id).filter(Boolean)));
  const reviewerIds = Array.from(new Set(artikel.map(r => r.reviewer_id).filter(Boolean)));

  // 3. Ambil data penulis dari tabel profil
  const { data: penulis, error: penulisError } = await supabase
    .from('profil')
    .select('id, nama')
    .in('id', penulisIds);

  if (penulisError)
    return NextResponse.json({ error: penulisError.message }, { status: 500 });

  // 4. Ambil data reviewer dari tabel profil
  const { data: reviewer, error: reviewerError } = await supabase
    .from('profil')
    .select('id, nama')
    .in('id', reviewerIds);

  if (reviewerError)
    return NextResponse.json({ error: reviewerError.message }, { status: 500 });

  // 5. Buat map id -> nama untuk penulis dan reviewer agar mudah lookup
  const penulisMap = new Map(penulis.map(p => [p.id, p.nama]));
  const reviewerMap = new Map(reviewer.map(r => [r.id, r.nama]));

  const { data: tags } = await supabase.from('tag').select('id, tag');

  const tagMap = new Map(tags?.map(t => [t.id, t.tag]));
  const { data: artikelTags, error: artikelTagError } = await supabase.from('artikel_tag').select('artikel_id, tag_id');
  if (artikelTagError)
    return NextResponse.json({ error: artikelTagError.message }, { status: 500 });

  const artikelTagMap = new Map<string, string[]>();

  artikelTags?.forEach(({ artikel_id, tag_id }) => {
    if (!artikelTagMap.has(artikel_id)) {
      artikelTagMap.set(artikel_id, []);
    }
    artikelTagMap.get(artikel_id)?.push(tag_id);
  });

  // 6. Gabungkan data artikel dengan nama penulis dan reviewer
  const mergedData = artikel.map(item => ({
    id: item.id,
    judul: item.judul,
    deskripsi:item.deskripsi,
    thumbnail_url:item.thumbnail_url,
    slug: item.slug,
    penulis: {
      id: item.penulis_id,
      nama: penulisMap.get(item.penulis_id) || null,
    },
    reviewer: {
      id: item.reviewer_id,
      nama: reviewerMap.get(item.reviewer_id) || null,
    },
    tags: artikelTagMap.get(item.id)?.map((tagId: string) => tagMap.get(tagId)) || [],
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  return NextResponse.json(mergedData, { status: 200 });
}


// export async function POST(req: NextRequest) {
//   const supabase = createAdminClient();


//   const { email, password, nama, roles, jenis_profil } = await req.json();

//   // 1. Create auth user in Supabase auth
//   const { data: user, error: authError } = await supabase.auth.admin.createUser({
//     email,
//     password,
//     email_confirm: true,
//   });

//   if (authError) {
//     return NextResponse.json({ error: authError.message }, { status: 400 });
//   }

//   const userId = user?.user?.id;
//   if (!userId) {
//     return NextResponse.json({ error: 'User ID not found after creation' }, { status: 500 });
//   }

//   // 2. Create profile in your profil table
//   const { error: profilError } = await supabase.from('profil').insert({
//     id: userId,
//     nama,
//     approved: false,
//   });

//   if (profilError) {
//     return NextResponse.json({ error: profilError.message }, { status: 500 });
//   }

//   // 3. Insert roles
//   if (roles?.length) {
//     const roleData = roles.map((role_id: string) => ({
//       profil_id: userId,
//       role_id,
//     }));

//     const { error: roleError } = await supabase.from('profil_role').insert(roleData);
//     if (roleError) {
//       return NextResponse.json({ error: roleError.message }, { status: 500 });
//     }
//   }

//   // 4. Insert subtypes
//   if (jenis_profil?.includes(ROLETYPE.SISWA)) {
//     await supabase.from('siswa').insert({ profil_id: userId });
//   }
//   if (jenis_profil?.includes(ROLETYPE.LEMBAGA)) {
//     await supabase.from('pegawai').insert({ profil_id: userId });
//   }
//   if (jenis_profil?.includes(ROLETYPE.KOMITE)) {
//     await supabase.from('komite').insert({ profil_id: userId });
//   }

//   return NextResponse.json({ success: true, id: userId });
// }
