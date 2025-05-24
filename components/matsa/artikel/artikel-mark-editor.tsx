"use client";

import ImageUploadArea from "@/components/matsa/artikel/artikel-image-upload-area";
import { useArtikel } from "@/lib/context/artikel-context";
import { createClient } from "@supabase/supabase-js";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

// Init Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ArtikelMarkEditor() {
    const editorRef = useRef<MdEditor>(null);
    const { content, setContent } = useArtikel();
    const [gallery, setGallery] = useState<string[]>([]);

    const handleUpload = async (file: File) => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `artikel/${fileName}`;

        const { error } = await supabase.storage
            .from("public-assets")
            .upload(filePath, file);

        if (error) {
            console.error("Upload error:", error.message);
            return;
        }

        const {
            data: { publicUrl },
        } = supabase.storage.from("public-assets").getPublicUrl(filePath);

        const imageMarkdown = `![gambar](${publicUrl})`;
        setContent((prev) => prev + `\n\n${imageMarkdown}`);
    };

    return (
        <>
            <div className="flex flex-col gap-4">
                <ImageUploadArea onUpload={handleUpload} />
            </div>
            <div className="border rounded-md p-2 relative h-[80%]">

                <MdEditor
                    ref={editorRef}
                    value={content}
                    view={{ menu: true, md: true, html: false }}  // Single column: only the editor, no preview
                    onChange={({ text }) => setContent(text)}
                    renderHTML={(text) => (
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                            {text}
                        </ReactMarkdown>
                    )}
                />

                {/* <div className="text-right text-gray-500 mt-2 text-sm">
                    Jumlah Kata: <span className="font-semibold">{wordCount}</span>
                </div> */}
            </div>

        </>
    );
}
