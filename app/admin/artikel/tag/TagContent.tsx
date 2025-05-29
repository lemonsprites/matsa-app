"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Pencil } from "lucide-react";
import { Tag } from "@/lib/type/tag-type";


const fetchTags = async (): Promise<Tag[]> => {
  const res = await fetch("/api/tags");
  const data: Tag[] = await res.json();
  return data;
};



export const TagContent = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);

  // Add tag
  const addTag = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const newTag = inputValue.trim();

      const res = await fetch("/api/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tag: newTag }),
      });

      const data: Tag[] = await res.json();
      console.log(data)
      setTags((prevTags) => [...prevTags, data[0]]);

      setInputValue("");
    }
  };

  // Open delete dialog
  const confirmDeleteTag = (tag: Tag) => {
    setSelectedTag(tag);
    setShowDeleteDialog(true);
  };

  // Delete tag
  const removeTag = async () => {
    if (selectedTag) {
      const res = await fetch("/api/tags", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedTag.id }),
      });

      const data = await res.json();
      setTags((prevTags) => prevTags.filter((t) => t.id !== selectedTag.id));

      setShowDeleteDialog(false);
    };

    // Open edit dialog



  };

  const editTag = (tag: Tag) => {
    setSelectedTag(tag);
    setEditValue(tag.tag);
    setShowEditDialog(true);
  };

  // Save edited tag
  const saveEditedTag = async () => {
    if (selectedTag && editValue.trim() !== "") {
      const res = await fetch("/api/tags", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedTag.id,
          tag: editValue.trim(),
        }),
      });

      const data: Tag[] = await res.json();
      setTags((prevTags) =>
        prevTags.map((t) => (t.id === selectedTag.id ? { ...t, tag: editValue.trim() } : t))
      );

    }
    setShowEditDialog(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-full bg-white">
      <h3 className="font-semibold text-lg mb-2 text-center">Masukan Detail Kategori/Tag Sakarepmu!</h3>

      {/* Tag Input */}
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value.toLowerCase())}
        onKeyDown={addTag}
        placeholder="Type a tag and press Enter..."
        className="border px-3 py-2 rounded-md w-full mb-5 text-center"
      />

      {/* Tag Cloud */}
      <div className="flex flex-wrap gap-2 mb-2 items-center justify-center">
        {tags?.map((tag) => (
          <span
            key={tag.id}
            className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1 cursor-pointer transition hover:bg-blue-600"
          >
            {tag.tag}
            <Pencil
              size={14}
              onClick={() => editTag(tag)}
              className="cursor-pointer hover:text-gray-300 ml-3"
            />
            <X
              size={14}
              onClick={() => confirmDeleteTag(tag)}
              className="cursor-pointer hover:text-gray-300"
            />
          </span>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Tag</DialogTitle>
          </DialogHeader>
          <p>Ubur-ubur ikan lele, yakin hapus ini le?<br /> <b>"{selectedTag?.tag}"</b>?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={removeTag}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Tag Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Tag</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="border px-3 py-2 rounded-md w-full"
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button onClick={saveEditedTag}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
