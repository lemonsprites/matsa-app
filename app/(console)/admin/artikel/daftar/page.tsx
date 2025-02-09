import AdminContent from '@/components/matsa/admin/admin-content';
import Toast from '@/components/matsa/toast';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { NextPage } from 'next'

import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
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



const DaftarPage: NextPage = ({ }) => {

    return (
        <AdminContent title="Daftar Artikel">
            <div className="flex justify-between items-center mt-4">
                <Input
                    placeholder="Cari artikel..."
                    // value={search}
                    // onChange={(e) => setSearch(e.target.value)}
                    className="w-[300px]"
                />
                <Link href={"/admin/artikel/tulis"}>
                    <Button className="bg-blue-600 text-white">Tambah Artikel</Button>
                </Link>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[200px]'>Thumbnail</TableHead>
                        <TableHead>ID/Judul Artikel</TableHead>
                        <TableHead className='w-[300px]'>Deskripsi</TableHead>
                        <TableHead>Tag</TableHead>
                        <TableHead className='w-[150px]'>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {articles.map((article) => (
                        <TableRow key={article.id}>
                            <TableCell className="font-medium">
                                <Image src={article.thumbnail} width={180} height={120} alt={article.judul} />
                            </TableCell>
                            <TableCell className='flex flex-col items-start justify-center'>
                                <small className='text-muted-foreground'>{article.id}</small>
                                <h2 className='text-md font-bold text-wrap truncate'>{article.judul}</h2>
                            </TableCell>
                            <TableCell className='truncate max-w-[150px] text-wrap align-top'>{article.deskripsi}</TableCell>
                            <TableCell className="flex flex-wrap gap-2 items-center">
                                {article.tag.map((e, index) => (
                                    <Badge key={index}>{e}</Badge>
                                ))}
                            </TableCell>
                            <TableCell className='space-x-2'>
                                <Link href={`edit/${article.id}`}>
                                    <Button variant={'default'} size={"sm"}>Edit</Button>
                                </Link>
                                <Link href={`delete/${article.id}`}>Hapus</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                {/* Buat Pagination Footer */}

                {/* <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
            </Table>
        </AdminContent>
    )
}

export default DaftarPage