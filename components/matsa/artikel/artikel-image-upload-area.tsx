import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Label } from "@/components/ui/label";

export default function ImageUploadArea({ onUpload }: { onUpload: (file: File) => void }) {
    const [isDragActive, setIsDragActive] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        multiple: false,
        onDrop: (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                onUpload(acceptedFiles[0]);
            }
        },
        onDragEnter: () => setIsDragActive(true),
        onDragLeave: () => setIsDragActive(false),
    });

    return (
        <div className="w-full">
            <Label className="mb-2 block">Upload Gambar</Label>
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                    isDragActive ? "border-primary bg-muted" : "border-border bg-background"
                }`}
            >
                <input {...getInputProps()} />
                <p className="text-sm text-muted-foreground text-center">
                    Tarik gambar ke sini, atau klik untuk memilih file
                </p>
            </div>
        </div>
    );
}
