"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Artikel } from '@/lib/interface/artikel.interface'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type Props = {
    artikel_list: Artikel[]
}

const ArtikelList = ({ artikel_list }: Props) => {
    const [filter, setFilter] = useState('');

    const filteredArtikel = artikel_list.filter((article) => article.judul.toLowerCase().includes(filter.toLowerCase()));
    return (
        <>
            <div className="flex justify-between items-center mt-4">
                <Input placeholder="Cari artikel..." className="w-[300px]" onChange={(e) => setFilter(e.target.value)} />
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
                    {filteredArtikel.map((article) => (
                        <TableRow key={article.id}>
                            <TableCell className="font-medium h-full">
                                <Image src={article.thumbnail_url} width={180} height={120} alt={article.judul} />
                            </TableCell>
                            <TableCell className="flex flex-col items-start justify-center">
                                <Badge className="font-bold">
                                    {article.penulis.nama}
                                </Badge>
                                <small className="text-muted-foreground">{article.id}</small>
                                <Link href={`/artikel/${article.slug}`}>
                                    <h2 className="hover:underline text-md font-bold truncate text-wrap">{article.judul}</h2>
                                </Link>
                            </TableCell>
                            <TableCell className="max-w-[150px] text-wrap">{article.deskripsi}</TableCell>
                            <TableCell className='w-[250px] flex gap-2 flex-wrap'>
                                {article.tags.length > 2 ? (
                                    <>
                                        {article.tags.slice(0, 2).map((tag: any, index) => (
                                            <Badge key={index} className="text-xs bg-black text-white px-2 py-1">
                                                {
                                                    tag
                                                }
                                            </Badge>
                                        ))}
                                        <Badge className="text-xs bg-gray-500 text-white px-2 py-1 rounded">
                                            +{article.tags.length - 2} tag lainnya
                                        </Badge>
                                    </>
                                ) : (
                                    article.tags.map((tag: any, index) => (
                                        <Badge key={index} className="text-xs bg-black text-white px-2 py-1">
                                            {tag}
                                        </Badge>
                                    ))
                                )}
                            </TableCell>
                            <TableCell className="space-x-2">
                                <Link href={`/admin/artikel/edit/${article.id}`}>
                                    <Button variant="default" size="sm">Edit</Button>
                                </Link>
                                {/* <ArtikelProvider mode="read">
                  <Link href={`/admin/artikel/delete/${article.id}`}>Hapus</Link>
                </ArtikelProvider> */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default ArtikelList