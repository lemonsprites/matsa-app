import Toast from '@/components/matsa/toast';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { NextPage } from 'next'

import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"


const AddPage: NextPage = ({ }) => {
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create New Article</h1>
            <form className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                        Title
                    </label>
                    <Input
                        id="title"
                        placeholder="Article Title"
                        // value={title}
                        // onChange={(e) => setTitle(e.target.value)}
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
                        // value={author}
                        // onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="author" className="block text-sm font-medium mb-1">
                        Kata Kunci
                    </label>
                    <div className="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center">
                        {/* <p className="text-sm font-medium leading-none space-x-2">
                            {selectLabel.length ? selectLabel.map((tag) => (
                                <Badge key={tag.id} className="rounded-full">
                                    {tag.tag}
                                </Badge>
                            )) : <span className="text-muted-foreground">Tambahkan kata kunci yang relevan</span>}

                        </p> */}
                        {/* <DropdownMenu open={open} onOpenChange={setOpen}>
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
                        </DropdownMenu> */}

                    </div>
                    {/* <div>
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
                    </div> */}
                    <Button type="submit" className="w-full">
                        Save Article
                    </Button>
                </div>
            </form>
            {/* Render Toast only after form submission */}
            {(
                <Toast
                    title={"toastData.title"}
                    desc={"toastData.desc"}
                    variant={"error"}
                />
            )}
        </div>
    )
}

export default AddPage