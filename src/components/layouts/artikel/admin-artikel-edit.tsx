import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import supabase from "@/lib/supabase-client";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useParams } from "react-router-dom";

const AdminArtikelEdit = () => {
    const { id } = useParams<{ id: string }>();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleEditorChange = ({ text }: { text: string }) => {
        setContent(text);
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from("tb_artikel")
                    .select("title, content, author_id")
                    .eq("id", id)
                    .single();

                if (error) {
                    console.error("Error fetching article:", error.message);
                    return;
                }

                if (data) {
                    setTitle(data.title);
                    setContent(data.content);
                    setAuthor(data.author_id);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            }
        };

        fetchPost();
    }, [id]); // Run only when the `id` changes

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !content) {
            alert("Please fill in all required fields.");
            return;
        }

        setIsLoading(true);

        try {
            const { error } = await supabase
                .from("tb_artikel")
                .update({
                    title,
                    content,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", id);

            if (error) {
                console.error("Error updating article:", error.message);
                alert("Failed to update article!");
                return;
            }

            alert("Article updated successfully!");
        } catch (err) {
            console.error("Unexpected error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                        Title
                    </label>
                    <Input
                        id="title"
                        placeholder="Article Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium mb-1">
                        Content
                    </label>
                    <MdEditor
                        id="content"
                        style={{ height: "300px" }}
                        renderHTML={(text) => <ReactMarkdown className="markdown-content prose">{text}</ReactMarkdown>}
                        onChange={handleEditorChange}
                        value={content}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                </Button>
            </form>
        </div>
    );
};

export default AdminArtikelEdit;
