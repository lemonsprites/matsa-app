"use client";
import React, { useEffect, useRef, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { createClient } from "@/utils/supabase/client";

interface AdminEditorProps {
    content: string;
    setContent: (content: string) => void;
}

export default function AdminEditor({ content, setContent }: AdminEditorProps) {
    const editorRef = useRef<MdEditor>(null);
    const supabase = createClient();
    const [wordCount, setWordCount] = useState<number>(0);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);



    // 🛠️ **Update Word Count**
    useEffect(() => {
        const countWords = (text: string) => {
            const words = text.match(/\b\w+\b/g) || []; // Count words using regex
            setWordCount(words.length);
        };
        countWords(content);
    }, [content]);


    // ✅ Upload with Progress
    // 🛠️ **Upload Image with Progress**
    const handleImageUpload = async (file: File) => {
        if (!file) return;

        const filePath = `gallery/${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage.from("public-data").upload(filePath, file, {
            cacheControl: "3600",
            upsert: false
        });

        if (error) {
            console.error("Upload error:", error.message);
            setUploadProgress(null);
            return;
        }

        // ✅ Get public URL & Insert Markdown
        const imageUrl = supabase.storage.from("public-data").getPublicUrl(filePath).data.publicUrl;
        const markdownSyntax = `![${file.name}](${imageUrl})`;

        // @ts-ignore
        setContent((prev:any) => prev + `\n${markdownSyntax}\n`);
        setUploadProgress(null); // Reset progress after upload
    };

    // 🎯 **Handle Drag & Drop**
    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        if (file) {
            setUploadProgress(0); // Show initial progress
            await handleImageUpload(file);
        }
    };

    return (
        <div className="border rounded-md p-2 relative h-[80%]">
            {/* 🔄 Show Upload Progress */}
            {uploadProgress !== null && (
                <div className="absolute top-0 left-0 w-full bg-gray-200 h-1">
                    <div className="h-1 bg-blue-500" style={{ width: `${uploadProgress}%` }} />
                </div>
            )}

            {/* 📝 Markdown Editor */}
            <MdEditor className="h-full"
                ref={editorRef}
                value={content}
                onChange={({ text }) => setContent(text)}
                renderHTML={(text) => (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {text}
                    </ReactMarkdown>
                )}
            />

            {/* 🔢 Word Count Display */}
            <div className="text-right text-gray-500 mt-2 text-sm">
                Jumlah Kata: <span className="font-semibold">{wordCount}</span>
            </div>
        </div>
    );
}
