"use client"
import { slugConvert } from "@/lib/function/slug-convert";
import { Tag } from "@/lib/type/tag-type";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

// Define the type for the article context
interface ArtikelContextType {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  deskripsi: string;
  setDeskripsi: Dispatch<SetStateAction<string>>;
  thumbnailUrl: string;
  setThumbnailUrl: Dispatch<SetStateAction<string>>;
  addMarkdownImage: (imageUrl: string) => void;
  submitArtikel: (isDraft?: boolean) => Promise<void>;
  deleteArtikel: (param: string) => Promise<void>;
  selectLabel: Tag[];
  setSelectLabel: Dispatch<SetStateAction<Tag[]>>;
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
}

// Create the context with a proper type
const ArtikelContext = createContext<ArtikelContextType | undefined>(undefined);

export const ArtikelProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [deskripsi, setDeskripsi] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [selectLabel, setSelectLabel] = useState<Tag[]>([]);
  const [tags, setTags] = useState<Tag[]>([])


  const supabase = createClient();

  // ✅ Append Markdown Image to Content
  const addMarkdownImage = (imageUrl: string) => {
    setContent((prev) => prev + `\n![Image](${imageUrl})\n`);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) {
        setUser(data?.user);
      } else {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUser();
  }, []);

  // ✅ Submit Artikel
  const submitArtikel = async (isDraft = false) => {
    if (!title.trim() || !content.trim()) {
      alert("Judul dan konten harus diisi!");
      return;
    }



    const { data, error } = await supabase
      .from("tb_artikel")
      .insert([
        {
          title,
          content,
          deskripsi: deskripsi,
          slug: slugConvert(title),
          author_id: user?.id,
          thumbnail_url: thumbnailUrl,
          status: isDraft ? 2 : 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .select();

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

        console.log("[Page] Artikel and tags inserted successfully!");
    }

    if (error) {
      console.error("Error submitting article:", error);
      alert("Gagal menyimpan artikel.");
    } else {
      alert(isDraft ? "Artikel disimpan sebagai draft!" : "Artikel berhasil dipublikasikan!");
      setTitle("");
      setContent("");
      setDeskripsi("");
      setThumbnailUrl("");
      redirect("/admin/artikel/daftar")
    }
  };

  const deleteArtikel = async (param: string) => {
    const { error } = await supabase.from("tb_artikel").delete().eq("id", param);

    if (error) {
      console.error("Error deleting article:", error);
      alert("Gagal menghapus artikel.");
    } else {
      alert("Artikel berhasil dihapus!");
      redirect("/admin/artikel/daftar"); // Redirect after delete
    }
  };


  return (
    <ArtikelContext.Provider value={{
      title, setTitle, content, setContent,
      deskripsi, setDeskripsi,
      thumbnailUrl, setThumbnailUrl,
      addMarkdownImage, submitArtikel, deleteArtikel,
      selectLabel, setSelectLabel,
      tags, setTags
    }}>
      {children}
    </ArtikelContext.Provider>
  );
};

// Custom hook
export const useArtikel = () => {
  const context = useContext(ArtikelContext);
  if (!context) {
    throw new Error("useArtikel must be used within an ArtikelProvider");
  }
  return context;
};
