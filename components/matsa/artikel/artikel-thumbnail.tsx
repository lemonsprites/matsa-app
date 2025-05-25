"use client";
import React from 'react'

import { useState } from "react";
import { Label } from "@/components/ui/label";
import CropModal from './modal/crop-modal';
import PilihGambar from '@/components/matsa/artikel/modal/pilihGambar';
import { useArtikel } from '@/lib/context/artikel-context';

const ArtikelThumbnail = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const {thumbnailUrl, setThumbnailUrl} = useArtikel();
    const [rawImage, setRawImage] = useState<string | null>(null);
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [isCropOpen, setIsCropOpen] = useState(false);

    const handleImageSelected = (fileOrUrl: File | string) => {
        if (fileOrUrl instanceof File) {
            if (!fileOrUrl.type.startsWith("image/")) {
                alert("Hanya file gambar yang diperbolehkan");
                return;
            }
            const url = URL.createObjectURL(fileOrUrl);
            setRawImage(url);
        } else {
            setRawImage(fileOrUrl);
        }
        setIsSelectOpen(false);
        setIsCropOpen(true);
    };

    const handleCropped = (croppedUrl: string) => {
        setThumbnailUrl(croppedUrl);
        setIsCropOpen(false);
        if (rawImage?.startsWith("blob:")) {
            URL.revokeObjectURL(rawImage);
        }
    };

    return (
        <div className="space-y-2">
            {thumbnailUrl ? (
                <img
                    src={thumbnailUrl}
                    alt="Thumbnail Preview"
                    className="w-full h-48 object-cover rounded-md border"
                />
            ) : (
                <div className="w-full h-48 rounded-md bg-gray-300 flex items-center justify-center text-gray-500 text-sm">
                    Belum ada thumbnail
                </div>
            )}

            <button
                className="px-4 py-2 mt-2 bg-primary text-white rounded hover:bg-primary/80 w-full"
                onClick={() => setIsSelectOpen(true)}
            >
                Ganti Thumbnail
            </button>

            {isSelectOpen && (
                <PilihGambar
                    imageUrl={''}
                    croppedAreaPixels={null}
                    onSelect={handleImageSelected}
                    onClose={() => setIsSelectOpen(false)}
                />
            )}

            {isCropOpen && rawImage && (
                <CropModal
                    imageUrl={rawImage}
                    onCrop={handleCropped}
                    onClose={() => setIsCropOpen(false)}
                />
            )}
        </div>
    );
}

export default ArtikelThumbnail