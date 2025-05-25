import Cropper from "react-easy-crop";
import { useState, useCallback, useEffect, useRef } from "react";
import getCroppedImg from "./cropGambar";

export default function CropModal({
    imageUrl,
    onCrop,
    onClose,
}: {
    imageUrl: string;
    onCrop: (croppedUrl: string) => void;
    onClose: () => void;
}) {
    const cropContainerRef = useRef<HTMLDivElement>(null);

    const [crop, setCrop] = useState({ x: 0, y: 0 }); // crop position in %
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    // Clamp helper untuk batasi nilai x/y crop
    function clamp(value: number, min: number, max: number) {
        return Math.min(Math.max(value, min), max);
    }

    // Hitung minZoom biar gambar selalu nutup crop area
    const getMinZoom = () => {
        const { width: imgW, height: imgH } = imageSize;
        const { width: contW, height: contH } = containerSize;
        if (imgW === 0 || imgH === 0 || contW === 0 || contH === 0) return 1;

        const widthRatio = contW / imgW;
        const heightRatio = contH / imgH;

        return Math.max(widthRatio, heightRatio);
    };

    // Pantau ukuran container pakai ResizeObserver
    useEffect(() => {
        if (!cropContainerRef.current) return;

        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setContainerSize({ width, height });
        });

        observer.observe(cropContainerRef.current);

        return () => observer.disconnect();
    }, []);

    // Reset posisi crop ke tengah dan zoom ke minZoom
    const resetCrop = () => {
        const minZoom = getMinZoom();
        setCrop({ x: 0, y: 0 });
        setZoom(minZoom);
    };

    // Reset posisi crop & zoom saat imageUrl atau ukuran berubah
    useEffect(() => {
        resetCrop();
    }, [imageUrl, containerSize.width, containerSize.height, imageSize.width, imageSize.height]);

    // Handle ukuran asli gambar
    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    };

    // Batasi crop position agar gak bisa geser keluar frame dengan toleransi 50%
    const TOLERANCE = 0.5;

    const handleCropChange = (newCrop: { x: number; y: number }) => {
        if (
            containerSize.width === 0 ||
            containerSize.height === 0 ||
            imageSize.width === 0 ||
            imageSize.height === 0
        ) {
            setCrop(newCrop);
            return;
        }

        const imageWidthZoomed = imageSize.width * zoom;
        const imageHeightZoomed = imageSize.height * zoom;

        const containerWidth = containerSize.width;
        const containerHeight = containerSize.height;

        // Hitung batas geser crop area dalam satuan persen (-maxOffset sampai +maxOffset)
        // Angka 50 dipakai untuk konversi persen relatif pada crop position
        const baseMaxOffsetX =
            Math.max(0, (imageWidthZoomed - containerWidth) / containerWidth) * 50;
        const baseMaxOffsetY =
            Math.max(0, (imageHeightZoomed - containerHeight) / containerHeight) * 50;

        // Tambah toleransi geser crop
        const maxOffsetX = baseMaxOffsetX * (1 + TOLERANCE);
        const maxOffsetY = baseMaxOffsetY * (1 + TOLERANCE);

        // Clamp nilai crop.x dan crop.y agar tetap dalam range toleransi
        const x = clamp(newCrop.x, -maxOffsetX, maxOffsetX);
        const y = clamp(newCrop.y, -maxOffsetY, maxOffsetY);

        setCrop({ x, y });
    };

    const onCropComplete = useCallback((_: any, areaPixels: any) => {
        setCroppedAreaPixels(areaPixels);
    }, []);

    const handleDone = async () => {
        if (!croppedAreaPixels) return;
        const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
        onCrop(croppedImage);
    };

    return (
        <>
            {/* Hidden img untuk deteksi ukuran asli gambar */}
            <img src={imageUrl} alt="hidden" className="hidden" onLoad={onImageLoad} />

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                <div className="bg-white p-4 rounded-md w-[90vw] max-w-xl">
                    <div
                        ref={cropContainerRef}
                        className="relative w-full h-96 bg-gray-200"
                    >
                        <Cropper
                            image={imageUrl}
                            crop={crop}
                            zoom={zoom}
                            minZoom={getMinZoom()}
                            aspect={16 / 9}
                            onCropChange={handleCropChange}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={resetCrop}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Reset Crop
                        </button>
                        <div className="flex gap-2">
                            <button onClick={onClose} className="px-4 py-2 text-gray-700">
                                Batal
                            </button>
                            <button
                                onClick={handleDone}
                                className="px-4 py-2 bg-primary text-white rounded"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
