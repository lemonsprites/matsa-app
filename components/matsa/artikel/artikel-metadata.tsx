"use client"
import ArtikelTagInput from '@/components/matsa/artikel/artikel-tag-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useArtikel } from '@/lib/context/artikel-context'
import React from 'react'

const ArtikelMetadata = () => {
    const {
        title, setTitle,
        deskripsi, setDeskripsi,
        tags, setTags,

    } = useArtikel()
    
    return (
        <>
            <div className="md:col-span-2 flex flex-col gap-4">
                <div>
                    <Label htmlFor="title">Judul Artikel</Label>
                    <Input
                        id="title"
                        placeholder="Masukkan judul artikel"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="deskripsi">Deskripsi</Label>
                    <Textarea
                        id="deskripsi"
                        placeholder="Masukkan deskripsi singkat"
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="tags">Tag (pisahkan dengan koma)</Label>
                    <ArtikelTagInput
                        value={tags}
                        onChange={(newTags: any) => setTags(newTags)}
                    />
                </div>
            </div>
        </>
    )
}

export default ArtikelMetadata