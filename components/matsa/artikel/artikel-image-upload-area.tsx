"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@supabase/supabase-js";
import { Label } from "@/components/ui/label";
import { useDropzone } from "react-dropzone";

// Init Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ImageUploadArea({
  onUpload,
}: {
  onUpload: (file: File | string) => void; // Accept URL (from gallery) too
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "gallery">("upload");
  const [isDragActive, setIsDragActive] = useState(false);
  const [gallery, setGallery] = useState<string[]>([]);

  const fetchGallery = async () => {
    const { data, error } = await supabase.storage
      .from("public-assets")
      .list("artikel", { limit: 100 });

    if (error) {
      console.error("Fetch gallery error:", error.message);
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

  const openModal = () => {
    setIsOpen(true);
    fetchGallery();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
      closeModal();
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const Modal = () =>
    createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={closeModal}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-[90vw] max-w-3xl p-4 overflow-auto max-h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Pilih Gambar</h3>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-900 font-bold text-xl leading-none"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          {/* Tab Menu */}
          <div className="flex border-b mb-4">
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-4 py-2 font-medium ${
                activeTab === "upload"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Upload Gambar
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-4 py-2 font-medium ml-4 ${
                activeTab === "gallery"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Galeri Gambar
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "upload" && (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                isDragActive
                  ? "border-primary bg-muted"
                  : "border-border bg-background"
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-center text-muted-foreground">
                Tarik gambar ke sini, atau klik untuk memilih file
              </p>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="grid grid-cols-3 gap-4 h-[60vh] overflow-auto">
              {gallery.length === 0 ? (
                <p className="text-center col-span-3 text-gray-500">
                  Tidak ada gambar di galeri
                </p>
              ) : (
                gallery.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Gambar ${i + 1}`}
                    className="object-cover cursor-pointer rounded hover:ring-2 hover:ring-primary"
                    onClick={() => {
                      onUpload(url);
                      closeModal();
                    }}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>,
      document.body
    );

  return (
    <>
      <Label className="mb-2 block">Upload Gambar</Label>
      <button
        onClick={openModal}
        className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/80 transition"
      >
        Pilih / Upload Gambar
      </button>
      {isOpen && <Modal />}
    </>
  );
}
