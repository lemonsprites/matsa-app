"use client";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useCallback, useEffect, useState, useMemo } from "react";
import Masonry from "react-masonry-css";

const GaleriKonten = () => {
    const [images, setImages] = useState<string[]>([]);
    const [visibleImages, setVisibleImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingNext, setLoadingNext] = useState(false);
    const [loadCount, setLoadCount] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const supabase = useMemo(() => createClient(), []);
    const imagesPerLoad = 8;
    const minLoad = 3;

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };

    const addWatermark = (src: string) => {
        return new Promise<string>(async (resolve) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = document.createElement("img");
            img.crossOrigin = "anonymous";
            img.src = src;

            await img.decode();
            canvas.width = img.width;
            canvas.height = img.height;
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                const fontSize = Math.max(36, img.height * 0.05); // 5% dari lebar gambar
                ctx.font = `${fontSize}px Arial`;
                ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
                ctx.textAlign = "center";
                ctx.fillText("MTsN 1 Ciamis", img.width/2, img.height- fontSize);
            }
            resolve(canvas.toDataURL("image/png"));
        });
    };

    const fetchImages = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase.storage.from("public-data").list("gallery");

        if (!error && data.length > 0) {
            const urls = await Promise.all(
                data.map(async (file) => {
                    const url = supabase.storage.from("public-data").getPublicUrl(`gallery/${file.name}`).data.publicUrl;
                    return await addWatermark(url);
                })
            );
            setImages(urls);
            setVisibleImages(urls.slice(0, imagesPerLoad));
        }
        setLoading(false);
    }, [supabase]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const loadMoreImages = () => {
        if (!images.length || !hasMore) return;

        setLoadingNext(true);
        setTimeout(() => {
            const nextLoadCount = loadCount + 1;
            const nextImages = images.slice(0, visibleImages.length + imagesPerLoad);
            setVisibleImages(nextImages);
            setLoadCount(nextLoadCount);
            setLoadingNext(false);
            if (nextImages.length >= images.length) {
                setHasMore(false);
            }
        }, 1500);
    };

    return (
        <div>
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold">Eksplorasi Galeri</h2>
                <Badge>MTsN 1 Ciamis</Badge>
            </div>

            {loading ? (
                <Masonry breakpointCols={breakpointColumnsObj} className="flex gap-4" columnClassName="flex flex-col gap-4">
                    {Array.from({ length: imagesPerLoad }).map((_, index) => (
                        <Skeleton key={index} className="w-full h-56 rounded-lg" />
                    ))}
                </Masonry>
            ) : visibleImages.length === 0 ? (
                <p className="text-center text-gray-500">Gambar tidak tersedia.</p>
            ) : (
                <Masonry breakpointCols={breakpointColumnsObj} className="flex gap-4" columnClassName="flex flex-col gap-4">
                    {visibleImages.map((src, index) => (
                        <Dialog key={index}>
                            <DialogTitle hidden>src</DialogTitle>
                            <DialogTrigger asChild>
                                <div className="relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105" onClick={() => setSelectedImage(src)}>
                                    <Image src={src} alt={`Gallery Image ${index + 1}`} width={500} height={500} className="w-full h-auto object-cover rounded-lg" />
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                                {selectedImage && <Image src={selectedImage} alt="Selected Image" width={800} height={800} className="rounded-lg" />}
                            </DialogContent>
                        </Dialog>
                    ))}
                </Masonry>
            )}

            {hasMore && !loadingNext && (
                <div className="text-center mt-6">
                    <button onClick={loadMoreImages} className="animate-bounce text-gray-500 cursor-pointer">⬇ Muat lebih banyak</button>
                </div>
            )}
        </div>
    );
};

export default GaleriKonten;
