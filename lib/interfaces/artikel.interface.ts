import { Tag } from "@/lib/interfaces/tag.interface";

export interface Artikel {
    id: string;
    judul: string;
    konten: string;
    penulis_id: string;
    status: string;
    reviewer_id: null;
    reviewed_at: null;
    alasan_penolakan: null;
    created_at: Date;
    updated_at: Date;
    deskripsi: string;
    slug: string;
    thumbnail_url: string;
    penulis: Penulis;
    reviewer: Reviewer;
    tags: Tag[];
}

export interface Penulis {
    id: null | string;
    nama: null | string;
}

export interface Reviewer {
    id: null | string;
    nama: null | string;
}