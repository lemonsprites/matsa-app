"use client";

import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { createPortal } from "react-dom";
import { createClient } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

// Inisialisasi Supabase
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
type PilihGambarProps = {
    imageUrl: string;
    croppedAreaPixels: any;
    onSelect: (fileOrUrl: string | File) => void;
    onClose: () => void;
};

const PilihGambar: React.FC<PilihGambarProps> = ({
    imageUrl,
    croppedAreaPixels,
    onSelect,
    onClose,
}) => {
    const [galleryMode, setGalleryMode] = useState(false);
    const [gallery, setGallery] = useState<string[]>([]);
    const [isDragActive, setIsDragActive] = useState(false);

    // Ambil galeri dari storage
    const fetchGallery = async () => {
        const { data, error } = await supabase.storage
            .from("public-assets")
            .list("artikel", { limit: 100 });

        if (error) {
            console.error("Gagal ambil galeri:", error.message);
            return;
        }

        const urls = data
            .filter((file) => file.name.match(/\.(jpg|jpeg|png|webp)$/))
            .map(
                (file) =>
                    supabase.storage
                        .from("public-assets")
                        .getPublicUrl(`artikel/${file.name}`).data.publicUrl
            );

        setGallery(urls);
    };

    useEffect(() => {
        if (galleryMode) {
            fetchGallery();
        }
    }, [galleryMode]);

    // Upload Gambar
    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onSelect(acceptedFiles[0]);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        multiple: false,
        onDrop,
        onDragEnter: () => setIsDragActive(true),
        onDragLeave: () => setIsDragActive(false),
    });

    // Modal tampilan
    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            onClick={onClose}
        >
            <div
                className="bg-white w-[90vw] max-w-3xl max-h-[80vh] overflow-auto rounded-md shadow-lg p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Pilih atau Upload Gambar</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 text-xl font-bold"
                    >
                        &times;
                    </button>
                </div>

                <div className="mb-4 flex space-x-2">
                    <button
                        onClick={() => setGalleryMode(false)}
                        className={cn(
                            "px-4 py-2 rounded",
                            !galleryMode
                                ? "bg-primary text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        )}
                    >
                        Upload Gambar
                    </button>
                    <button
                        onClick={() => setGalleryMode(true)}
                        className={cn(
                            "px-4 py-2 rounded",
                            galleryMode
                                ? "bg-primary text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        )}
                    >
                        Galeri Gambar
                    </button>
                </div>

                {!galleryMode && (
                    <div
                        {...getRootProps()}
                        className={cn(
                            "border-2 border-dashed rounded-lg p-10 text-center transition-all duration-300 cursor-pointer",
                            isDragActive
                                ? "border-primary bg-muted"
                                : "border-gray-300 bg-white"
                        )}
                    >
                        <input {...getInputProps()} />
                        <p className="text-gray-500">
                            Tarik gambar ke sini atau klik untuk memilih file
                        </p>
                    </div>
                )}

                {galleryMode && (
                    <div className="grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                        {gallery.length === 0 && (
                            <p className="text-center col-span-3 text-gray-500">
                                Galeri kosong
                            </p>
                        )}
                        {gallery.map((url, idx) => (
                            <img
                                key={idx}
                                src={url}
                                alt={`Galeri ${idx}`}
                                className="object-cover w-full h-32 rounded cursor-pointer hover:ring-2 hover:ring-primary"
                                onClick={() => onSelect(url)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}


export default PilihGambar;