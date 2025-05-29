"use client";

import ImageUploadArea from "@/components/matsa/artikel/artikel-image-upload-area";
import { useArtikel } from "@/lib/context/artikel-context";
import { hitungKata } from "@/lib/helpers/hitung-kata";
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

    const handleUpload = async (file: any): Promise<string | null> => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `artikel/${fileName}`;

        const { error } = await supabase.storage
            .from("public-assets")
            .upload(filePath, file);

        if (error) {
            console.error("Upload error:", error.message);
            return null;  // return null jika gagal
        }

        const {
            data: { publicUrl },
        } = supabase.storage.from("public-assets").getPublicUrl(filePath);

        return publicUrl || null;
    };

    return (
        <>
            <div className="flex flex-col gap-4">
                <ImageUploadArea onUpload={handleUpload} />
            </div>
            <div className="border rounded-md p-2  min-h-[400px] h-fit">

                <MdEditor
                    style={{ width: "100%", minHeight: "500px" }}
                    ref={editorRef}
                    value={content}
                    config={{
                        view: {
                            menu: true,
                            md: true,
                            html: false,
                        },
                        canView: {
                            menu: true,
                            md: true,
                            html: false,
                            syncScroll: false,
                        },
                        // Customize toolbar: add your own buttons
                        toolbar: {
                            bold: true,
                            italic: true,
                            // ... other default buttons
                            importImage: {
                                icon: '<svg>...</svg>', // you can provide SVG icon or text
                                title: "Import Image",
                                onClick: () => {
                                    // Your custom action here
                                },
                            },
                        },
                    }}
                    onChange={({ text }) => setContent(text)}

                    renderHTML={(text) => (
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                            {text}
                        </ReactMarkdown>
                    )}
                />

                <div className="text-gray-500 mt-2 text-sm grid col-2 w-full">
                    <div>Karakter: {content ? content.length : 0}</div>
                    <div className="col-start-2 text-right">Kata: {hitungKata(content)}</div>
                </div>
            </div>

        </>
    );
}
