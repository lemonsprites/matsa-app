"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useArtikel } from "@/lib/context/artikel-context";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";
import imageCompression from "browser-image-compression";

export default function AdminArtikelGaleri() {
    const {
        setTitle, setDeskripsi, submitArtikel, addMarkdownImage,
        selectLabel, setSelectLabel, tags, setTags, setThumbnailUrl, thumbnailUrl
    } = useArtikel();
    const [images, setImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [searchQr, setSearchQr] = useState<string>("all")
    const [open, setOpen] = useState(false)

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

    const fetchTags = useCallback(async (query: string) => {
        if (!query) {
            setTags([]);
            return;
        }

        try {
            const { data, error } = searchQr === "all" ?
                await supabase
                    .from('tb_tag') // Replace with your table name
                    .select('id, tag')
                    .limit(5)
                : await supabase
                    .from('tb_tag') // Replace with your table name
                    .select('id, tag')
                    .ilike('tag', `%${query}%`)
                    .limit(5)
            if (error) {
                console.error('Error fetching tags:', error);
                setTags([]);
            } else {
                setTags(data || []);
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            setTags([]);
        }
    }, [searchQr])


    useEffect(() => {
        fetchImages();
        fetchTags(searchQr);
    }, [fetchImages, fetchTags]);

    // Handle Upload
    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const options = {
                maxSizeMB: 0.5, // Compress to around 500KB
                maxWidthOrHeight: 1280, // Resize max dimensions
                useWebWorker: true, // Enable faster compression
            };

            const compressedFile = await imageCompression(file, options);
            const filePath = `gallery/${Date.now()}-${file.name}`;
            const { error } = await supabase.storage.from("public-data").upload(filePath, compressedFile);
    
            if (!error) {
                fetchImages();
            }
            setUploading(false);
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };

    const removeTag = (id: string) => {
        setSelectLabel(selectLabel.filter((tag) => tag.id !== id)); // Hapus tag dari selectLabel
    };

    return (
        <div className="h-full">

            <div className="flex space-x-2 w-full items-center gap-1.5 mb-4">

                <Button variant={"outline"} onClick={() => submitArtikel(false)}>Simpan Artikel</Button>
                <Button variant={"secondary"} onClick={() => submitArtikel(true)}>Simpan Sebagai Draft</Button>
            </div>
            <Separator />
            <div className="grid w-full items-center gap-1.5 my-4">
                <Label htmlFor="judul">Judul Artikel</Label>
                <Input type="text" id="judul" placeholder="Judul Artikel" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="grid w-full items-center gap-1.5 my-4">
                <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                <Input type="text" id="thumbnail_url" placeholder="Tarik gambar dari" onChange={(e) => setThumbnailUrl(e.target.value)} />
            </div>
            <div className="grid w-full items-center gap-1.5 mb-4">
                <Label htmlFor="deskripsi">Desksripsi Artikel</Label>
                <Textarea placeholder="Masukan Deskripsi Artikel" onChange={(e) => setDeskripsi(e.target.value)} />
            </div>
            <div className="grid w-full items-center gap-1.5 mb-8 ">
                <Label htmlFor="deskripsi">Tag Artikel</Label>
                <div className="text-sm font-medium leading-none gap-2 flex-wrap flex">
                    {selectLabel.length ? selectLabel.map((tag: any) => (
                        <Badge key={tag.id} className="rounded-full cursor-pointer" onClick={() => removeTag(tag.id)}>
                            {tag.tag}
                        </Badge>
                    )) : <Input className="text-muted-foreground border-none" readOnly onClick={() => setOpen(true)} placeholder="Tambahkan kata kunci yang relevan" />}

                </div>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild disabled={(selectLabel.length < 5) ? false : true}>
                        <Button variant="default" disabled={(selectLabel.length < 5) ? false : true}>Tambahkan Keyword</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" side="bottom" avoidCollisions={false} className="w-full">
                        <Command>
                            <CommandInput
                                placeholder="Filter label..."
                                onValueChange={(e) => {
                                    (e === "") ? setSearchQr("all") : setSearchQr(e);

                                }}
                                autoFocus={true}
                                className="h-9"
                            />
                            <CommandList>
                                <CommandEmpty>No label found.</CommandEmpty>
                                <CommandGroup>
                                    {tags.map((tag) => (
                                        <CommandItem
                                            key={tag.id}
                                            value={tag.tag} // Use the tag name or ID for value
                                            onSelect={() => {
                                                if (selectLabel.length >= 5) {
                                                    alert("Kata kunci tidak boleh lebih dari 5.");
                                                    return;
                                                }

                                                if (!selectLabel.some((selected: any) => selected.id === tag.id)) {
                                                    setSelectLabel((prev: any) => [...prev, tag]);
                                                } else {
                                                    alert("Tidak bisa memilih kata kunci yang sama.");
                                                }

                                                setOpen(false); // Tutup dropdown setelah memilih
                                            }}
                                        >
                                            {tag.tag}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

            <div className="p-4 relative h-full bg-gray-200">
                <h2 className="font-bold text-lg italic mb-2">Foto Galeri</h2>
                <label className="cursor-pointer bg-black text-white text-center px-4 py-2 rounded w-full block">
                    {uploading ? "Mengunggah..." : "Unggah Foto"}
                    <input type="file" className="hidden" onChange={handleUpload} />
                </label>
                <div className="grid grid-cols-3 gap-2 mt-4">
                    {images.map((url, idx) => (
                        <img key={idx} src={url} alt={`Image ${idx}`} className="w-full h-24 object-cover cursor-pointer" onClick={() => addMarkdownImage(url)} />
                    ))}
                </div>


            </div>
        </div>
    );
}
