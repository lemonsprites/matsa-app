import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import supabase from "@/lib/supabase-client";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useParams } from "react-router-dom";

"use client"


import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import "react-markdown-editor-lite/lib/index.css";
import { Tag } from "@/lib/type/tag.type";

const AdminArtikelEdit = () => {
    const { id } = useParams<{ id: string }>();

    const [title, setTitle] = useState("");
    const [, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false)

    const [selectLabel, setSelectLabel] = useState<Tag[]>([])
    const [searchQr, setSearchQr] = useState<string>("all")
    const [tags, setTags] = useState<Tag[]>([])

    const [, setToastData] = useState<{
        title: string;
        desc: string;
        variant: "success" | "error" | "warning";
    } | null>(null);

    const handleEditorChange = ({ text }: { text: string }) => {
        setContent(text);
    };


    const fetchTags = async (query: string) => {
        if (!query) {
            setTags([]);
            return;
        }

        try {
            const { data, error } = searchQr === "all" ?
                await supabase
                    .from('tb_tag') // Replace with your table name
                    .select('id, tag')
                    .limit(5)
                : await supabase
                    .from('tb_tag') // Replace with your table name
                    .select('id, tag')
                    .ilike('tag', `%${query}%`)
                    .limit(5)

            if (data) {
                const { data: DATA } = await supabase.from('artikel_tag').select(
                    "tb_tag(id, tag)"
                ).eq('artikel_id', id)


                const dataBaru: Tag[] = (DATA ?? []).map((item: any) => ({
                    id: item.tb_tag.id,
                    tag: item.tb_tag.tag,
                    tag_slug: item.tb_tag.tag_slug, // If tag_slug exists, include it
                }));

                setSelectLabel(dataBaru)
            }

            if (error) {
                console.error('Error fetching tags:', error);
                setTags([]);

            } else {
                setTags(data || []);
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            setTags([]);
        }
    };


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchTags(searchQr);
        }, 300); // Debounce API call
        return () => clearTimeout(delayDebounceFn); // Cleanup
    }, [searchQr]);


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
            const { data, error } = await supabase
                .from("tb_artikel")
                .update({
                    title,
                    content,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", id)
                .select();

            if (error) {
                console.error("Error updating article:", error.message);
                alert("Failed to update article!");
                return;
            }
            if (data && data.length > 0) {
                const artikelId = data[0].id;

                // Loop through selectLabel and insert each tag
                for (const loop of selectLabel) {
                    const { error: tagError } = await supabase
                        .from("artikel_tag")
                        .insert({
                            artikel_id: artikelId,
                            tag_id: loop.id,
                        });

                    if (tagError) {
                        console.error("Error inserting artikel_tag:", tagError);
                    }
                }

                console.log("Artikel and tags inserted successfully!");
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
                    <label htmlFor="author" className="block text-sm font-medium mb-1">
                        Kata Kunci
                    </label>
                    <div className="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center">
                        <p className="text-sm font-medium leading-none space-x-2">
                            {selectLabel.length ? selectLabel.map((tag) => (
                                <Badge key={tag.id} className="rounded-full">
                                    {tag.tag}
                                </Badge>
                            )) : <span className="text-muted-foreground">Tambahkan kata kunci yang relevan</span>}

                        </p>
                        <DropdownMenu open={open} onOpenChange={setOpen}>
                            <DropdownMenuTrigger asChild disabled={(selectLabel.length < 5) ? false : true}>
                                <Button variant="default" disabled={(selectLabel.length < 5) ? false : true}>Tambahkan Keyword</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" side="bottom" avoidCollisions={false} className="w-full">
                                <Command>
                                    <CommandInput
                                        placeholder="Filter label..."
                                        onValueChange={(e) => {
                                            (e === "") ? setSearchQr("all") : setSearchQr(e);

                                        }}
                                        autoFocus={true}
                                        className="h-9"
                                    />
                                    <CommandList>
                                        <CommandEmpty>No label found.</CommandEmpty>
                                        <CommandGroup>
                                            {tags.map((tag) => (
                                                <CommandItem
                                                    key={tag.id}
                                                    value={tag.tag} // Use the tag name or ID for value
                                                    onSelect={() => {
                                                        // Check if the tag is already in the array
                                                        if (!selectLabel.find((selected: any) => selected.id === tag.id)) {
                                                            setSelectLabel((prev: any) => [...prev, tag]); // Add the tag if it doesn't exist
                                                        } else if (selectLabel.length >= 5) {
                                                            setToastData({
                                                                title: "⚠️ Peringatan!",
                                                                desc: "Kata kunci tidak boleh lebih dari 5.",
                                                                variant: "error",
                                                            });
                                                        } else {
                                                            setToastData({
                                                                title: "⚠️ Peringatan!",
                                                                desc: "Tidak bisa memilih kata kunci yang sama.",
                                                                variant: "error",
                                                            });
                                                        }

                                                        setTimeout(() => {
                                                            setToastData(null)

                                                        }, 1000)
                                                        setOpen(false); // Close the dropdown
                                                    }}
                                                >
                                                    {tag.tag}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
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
