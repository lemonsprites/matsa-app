"use client"

import AdminArtikelGaleri from '@/components/matsa/admin/admin-artikel-galerry'
import AdminEditor from '@/components/matsa/admin/admin-editor'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'

const AdminArtikelEditor = () => {
    const [content, setContent] = useState("");

    const handleInsertMarkdown = (markdown: string) => {
        setContent((prev) => `${prev}\n${markdown}\n`);
      };
    return (
        <div className='h-[100vh] overflow-hidden'>
            <div className='grid grid-cols-7 gap-4 h-full'>
            <div className='col-span-5'>
                <div className="h-full">
                    <Label htmlFor="deskripsi">Konten Artikel</Label>
                    <AdminEditor content={content} setContent={setContent} />
                </div>
            </div>
            <div className='col-span-2 rounded-md truncate'><AdminArtikelGaleri onInsertMarkdown={handleInsertMarkdown}/></div>
        </div>
        </div>
    )
}

export default AdminArtikelEditor