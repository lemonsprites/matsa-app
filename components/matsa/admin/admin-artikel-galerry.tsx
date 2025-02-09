"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function AdminArtikelGaleri({ onInsertMarkdown }: { onInsertMarkdown: (md: string) => void }) {
    const [images, setImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const supabase = createClient();


    // Fetch Images
    const fetchImages = useCallback(async () => {
        const { data, error } = await supabase.storage.from("public-data").list("gallery");

        if (!error) {
            const urls = data.map((file) => {
                return supabase.storage.from("public-data").getPublicUrl(`gallery/${file.name}`).data.publicUrl;
            });
            setImages(urls);
        }
    }, [supabase]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    // Handle Upload
    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const filePath = `gallery/${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from("public-data").upload(filePath, file);

        if (!error) {
            fetchImages();
        }
        setUploading(false);
    };

    return (
        <div className="h-full">

            <div className="flex space-x-2 w-full items-center gap-1.5 mb-4">
                
                <Button variant={"outline"}>Simpan Artikel</Button>
                <Button variant={"secondary"}>Simpan Sebagai Draft</Button>
            </div>
            <Separator />
            <div className="grid w-full items-center gap-1.5 my-4">
                <Label htmlFor="judul">Judul Artikel</Label>
                <Input type="judul" id="judul" placeholder="Judul Artikel" />
            </div>
            <div className="grid w-full items-center gap-1.5 mb-4">
                <Label htmlFor="deskripsi">Desksripsi Artikel</Label>
                <Textarea placeholder="Masukan Deskripsi Artikel" />
            </div>
            <div className="grid w-full items-center gap-1.5 mb-4">
                <Label htmlFor="deskripsi">Tag Artikel</Label>

            </div>

            <div className="p-4 relative h-full bg-gray-200">
                <h2 className="font-bold text-lg italic mb-2">Foto Galeri</h2>
                <label className="cursor-pointer bg-black text-white text-center px-4 py-2 rounded w-full block">
                    {uploading ? "Mengunggah..." : "Unggah Foto"}
                    <input type="file" className="hidden" onChange={handleUpload} />
                </label>
                <div className="grid grid-cols-3 gap-2 mt-4">
                    {images.map((url, idx) => (
                        <img key={idx} src={url} alt={`Image ${idx}`} className="w-full h-24 object-cover cursor-pointer" onClick={() => onInsertMarkdown(`![Image ${idx}](${url})`)} />
                    ))}
                </div>


            </div>
        </div>
    );
}
