"use client"
import ArtikelMarkEditor from "@/components/matsa/artikel/artikel-mark-editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { ArtikelProvider } from "@/lib/context/artikel-context";
import { useState } from "react";

export default function ArtikelEditor() {
    const [title, setTitle] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");

    return (
        <div className="flex flex-col gap-6">
            {/* Bagian Atas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Thumbnail (1/3) */}
                <div>
                    <Label>Thumbnail</Label>
                    <Skeleton className="w-full h-48 rounded-md bg-gray-300" />
                </div>

                {/* Form (2/3) */}
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
                        <Input
                            id="tags"
                            placeholder="contoh: pendidikan, teknologi"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Editor Artikel */}
            <ArtikelProvider mode="write" >
                <ArtikelMarkEditor />
            </ArtikelProvider>
            
        </div>
    );
}
