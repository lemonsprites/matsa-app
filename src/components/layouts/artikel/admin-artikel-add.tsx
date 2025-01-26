import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import supabase from "@/lib/supabase-client";
import Cookies from "js-cookie";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown for rendering markdown content
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const AdminArtikelAdd: React.FC = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    const handleEditorChange = ({ text }: { text: string }) => {
        setContent(text);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Get the 'auth_user' cookie and parse it
        const a = Cookies.get('auth_user');
        if (!a) {
            alert("User not authenticated!");
            return;
        }
    
        let userAuth;
        try {
            userAuth = JSON.parse(a);
        } catch (err) {
            console.error("Error parsing auth_user cookie:", err);
            alert("Failed to parse user information!");
            return;
        }
    
        if (!userAuth?.id) {
            alert("No valid user ID found!");
            return;
        }
    
        // Save the article to Supabase
        const { error } = await supabase.from("tb_artikel").insert([
            {
                title,
                author_id: userAuth.id,
                content,
                status: 1,
                created_at: new Date().toISOString(),
            },
        ]);
    
        if (error) {
            console.error("Error saving article:", error.message);
            alert("Failed to save article!");
            return;
        }
    
        alert("Article created successfully!");
        setTitle(""); // Reset the title input
        setAuthor(""); // Reset the author input (optional, as you're using author from cookie)
        setContent(""); // Reset the content input
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create New Article</h1>
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
                    <label htmlFor="author" className="block text-sm font-medium mb-1">
                        Author
                    </label>
                    <Input
                        id="author"
                        placeholder="Author Name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
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
                        renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>} // Render markdown content
                        onChange={handleEditorChange}
                        value={content}
                    />
                </div>
                <Button type="submit" className="w-full">
                    Save Article
                </Button>
            </form>
        </div>
    );
};

export default AdminArtikelAdd;
