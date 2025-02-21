// @ts-nocheck

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import Toast from "@/components/toast"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import supabase from "@/lib/supabase-client"
import { Tag } from "@/lib/type/tag.type"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown for rendering markdown content
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import { generateSlug } from "@/lib/middleware/slug-generator"


const AdminArtikelAdd: React.FC = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [open, setOpen] = useState(false)
    const [toastData, setToastData] = useState<{
        title: string;
        desc: string;
        variant: "success" | "error" | "warning";
    } | null>(null);


    const [selectLabel, setSelectLabel] = useState<Tag[]>([])
    const [searchQr, setSearchQr] = useState<string>("all")
    const [tags, setTags] = useState<Tag[]>([])

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
        const { data, error }:any = await supabase
            .from("tb_artikel")
            .insert([
                {
                    title,
                    author_id: userAuth.id,
                    content,
                    slug: generateSlug(title),
                    status: 1,
                    created_at: new Date().toISOString(),
                },
            ])
            .select();

        if (error) {
            console.error("Error inserting artikel:", error);
            return; // Stop execution if there's an error
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

            // console.log("Artikel and tags inserted successfully!");
        }




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
                </div>
            </form>
            {/* Render Toast only after form submission */}
            {toastData && (
                <Toast
                    title={toastData.title}
                    desc={toastData.desc}
                    variant={toastData.variant}
                />
            )}
        </div>
    );
};

export default AdminArtikelAdd;
