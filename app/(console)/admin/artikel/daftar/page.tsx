import AdminContent from '@/components/matsa/admin/admin-content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NextPage } from 'next';

import "react-markdown-editor-lite/lib/index.css";

import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';

const articles = [
    {
        "thumbnail": "https://placehold.co/180x100/webp",
        "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "judul": "Belajar Next.js untuk Pemula",
        "deskripsi": "Artikel ini membahas dasar-dasar Next.js.",
        "tag": ["Next.js", "React", "JavaScript"],
    },
    {
        "thumbnail": "https://placehold.co/180x100/webp",
        "id": "9a68a7e2-3c69-4d6e-8af0-193cce65dbb6",
        "judul": "Pengenalan Tailwind CSS",
        "deskripsi": "Mempelajari bagaimana menggunakan Tailwind CSS dengan efisien.",
        "tag": ["CSS", "Tailwind", "Frontend"],
    },
    {
        "thumbnail": "https://placehold.co/180x100/webp",
        "id": "c4c8ff57-25d5-4a31-a8de-6a8b4fceecaf",
        "judul": "Membangun REST API dengan Supabase",
        "deskripsi": "Tutorial langkah demi langkah membuat REST API menggunakan Supabase.",
        "tag": ["API", "Supabase", "Database", "MTsN", "Reform"],
    }
]



const DaftarPage: NextPage = async () => {
    const supabase = createClient();

    try {
        // Fetch all articles
        const { data: articles, error: articlesError } = await (await supabase)
            .from("tb_artikel")
            .select("id, title, deskripsi, created_at, thumbnail_url, user_profiles(display_name),artikel_tag(tb_tag(tag))");

        if (articlesError || !articles) {
            console.error("Error fetching articles:", articlesError);
            return <div>Failed to load articles. Please try again later.</div>;
        }
        // @ts-ignore
        console.log(articles)

        return (
            <AdminContent title="Daftar Artikel">
                <div className="flex justify-between items-center mt-4">
                    <Input placeholder="Cari artikel..." className="w-[300px]" />
                    <Link href={"/admin/artikel/tulis"}>
                        <Button className="bg-blue-600 text-white">Tambah Artikel</Button>
                    </Link>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Thumbnail</TableHead>
                            <TableHead>Penulis / ID / Judul Artikel</TableHead>
                            <TableHead className="w-[300px]">Deskripsi</TableHead>
                            <TableHead>Tag</TableHead>
                            <TableHead className="w-[150px]">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {articles.map((article) => (
                            <TableRow key={article.id}>
                                <TableCell className="font-medium">
                                    <Image src={article.thumbnail_url} width={180} height={120} alt={article.title} />
                                </TableCell>
                                <TableCell className="flex flex-col items-start justify-center">
                                    <Badge className="font-bold">{
                                        // @ts-ignore
                                        article.user_profiles.display_name
                                    }</Badge>
                                    <small className="text-muted-foreground">{article.id}</small>
                                    <h2 className="text-md font-bold truncate text-wrap">{article.title}</h2>
                                </TableCell>
                                <TableCell className="truncate max-w-[150px]">{article.deskripsi}</TableCell>
                                <TableCell className='w-[250px] flex gap-2 flex-wrap'>
                                    {article.artikel_tag.length > 2 ? (
                                        <>
                                            {article.artikel_tag.slice(0, 2).map((e, index) => (
                                                <Badge key={index} className="text-xs bg-black text-white px-2 py-1">
                                                    {
                                                        //@ts-ignore
                                                        e.tb_tag.tag
                                                    }
                                                </Badge>
                                            ))}
                                            <Badge className="text-xs bg-gray-500 text-white px-2 py-1 rounded">
                                                +{article.artikel_tag.length - 2} tag lainnya
                                            </Badge>
                                        </>
                                    ) : (
                                        article.artikel_tag.map((e, index) => (
                                            <Badge key={index} className="text-xs bg-black text-white px-2 py-1">
                                                {
                                                    // @ts-ignore
                                                    e.tb_tag.tag
                                                }
                                            </Badge>
                                        ))
                                    )}
                                </TableCell>
                                <TableCell className="space-x-2">
                                    <Link href={`/admin/artikel/edit/${article.id}`}>
                                        <Button variant="default" size="sm">Edit</Button>
                                    </Link>
                                    <Link href={`/admin/artikel/delete/${article.id}`}>Hapus</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </AdminContent>
        );
    } catch (err) {
        console.error("Error fetching articles:", err);
        return <div>Something went wrong. Please try again later.</div>;
    }
};

export default DaftarPage;
