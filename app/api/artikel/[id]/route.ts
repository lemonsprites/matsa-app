import { POST_STATUS } from '@/lib/enum/post-status.enum';
import createAdminClient from '@/lib/supabase-admin';
import { NextResponse } from 'next/server';


export async function GET(req: Request, { params }: { params: { id: string } }) {
    const supabase = await createAdminClient();

    // 1. Ambil data artikel (single record)
    const { data: artikel, error: artikelError } = await supabase
        .from('artikel')
        .select('*')
        .eq('status', POST_STATUS.PUBLISH)
        .eq('id', params.id)
        .single();  // <= pakai .single()

    if (artikelError) {
        return NextResponse.json({ error: artikelError.message }, { status: 500 });
    }

    // 2. Ambil unique penulis_id dan reviewer_id
    // Karena ini single artikel, langsung ambil id-nya saja (bukan array)
    const penulisIds = artikel.penulis_id ? [artikel.penulis_id] : [];
    const reviewerIds = artikel.reviewer_id ? [artikel.reviewer_id] : [];

    // 3. Ambil data penulis dari tabel profil
    const { data: penulis, error: penulisError } = await supabase
        .from('profil')
        .select('id, nama')
        .in('id', penulisIds);

    if (penulisError) {
        return NextResponse.json({ error: penulisError.message }, { status: 500 });
    }

    // 4. Ambil data reviewer dari tabel profil
    const { data: reviewer, error: reviewerError } = await supabase
        .from('profil')
        .select('id, nama')
        .in('id', reviewerIds);

    if (reviewerError) {
        return NextResponse.json({ error: reviewerError.message }, { status: 500 });
    }

    // 5. Buat map id -> nama
    const penulisMap = new Map(penulis?.map(p => [p.id, p.nama]) || []);
    const reviewerMap = new Map(reviewer?.map(r => [r.id, r.nama]) || []);

    // 6. Ambil data tags dan artikel_tag
    const { data: tags } = await supabase.from('tag').select('id, tag');
    const tagMap = new Map(tags?.map(t => [t.id, t.tag]) || []);

    const { data: artikelTags, error: artikelTagError } = await supabase.from('artikel_tag').select('artikel_id, tag_id');
    if (artikelTagError) {
        return NextResponse.json({ error: artikelTagError.message }, { status: 500 });
    }

    // 7. Buat map artikel_id -> [tag_id]
    const artikelTagMap = new Map<string, string[]>();
    artikelTags?.forEach(({ artikel_id, tag_id }) => {
        if (!artikelTagMap.has(artikel_id)) {
            artikelTagMap.set(artikel_id, []);
        }
        artikelTagMap.get(artikel_id)?.push(tag_id);
    });

    // 8. Gabungkan data
    const mergedData = {
        id: artikel.id,
        judul: artikel.judul,
        deskripsi: artikel.deskripsi,
        konten: artikel.konten,
        thumbnail_url: artikel.thumbnail_url,
        slug: artikel.slug,
        penulis: {
            id: artikel.penulis_id,
            nama: penulisMap.get(artikel.penulis_id) || null,
        },
        reviewer: {
            id: artikel.reviewer_id,
            nama: reviewerMap.get(artikel.reviewer_id) || null,
        },
        tags: artikelTagMap.get(artikel.id)?.map((tagId: string) => tagMap.get(tagId)) || [],
        created_at: artikel.created_at,
        updated_at: artikel.updated_at,
    };

    return NextResponse.json(mergedData, { status: 200 });
}
