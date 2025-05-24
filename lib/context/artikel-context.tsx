"use client";

import { slugConvert } from "@/lib/helper/slug-convert";
import { createClient } from "@/lib/supabase-client";
import { Tag } from "@/lib/type/tag-type";
import { redirect } from "next/navigation";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface Artikel {
  id: string;
  title: string;
  content: string;
  deskripsi: string;
  thumbnail_url: string;
}

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
  artikelId: string | null;
  setArtikelId: Dispatch<SetStateAction<string | null>>;
  editingArtikel: Artikel | null;
  mode: "write" | "read" 
}

const ArtikelContext = createContext<ArtikelContextType | undefined>(undefined);

export const ArtikelProvider = ({ children, mode }: { children: ReactNode, mode: "write" | "read" }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [deskripsi, setDeskripsi] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [selectLabel, setSelectLabel] = useState<Tag[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [artikelId, setArtikelId] = useState<string | null>(null);
  const [editingArtikel, setEditingArtikel] = useState<Artikel | null>(null);

  const supabase = createClient();

  // ✅ Append Markdown Image to Content
  const addMarkdownImage = (imageUrl: string) => {
    setContent((prev) => prev + `\n![Image](${imageUrl})\n`);
  };

  const submitArtikel = async (isDraft = false) => {
    console.log("eksekusi submit!")
    if (!title.trim() || !content.trim()) {
      alert("Judul dan Konten harus diisi!")
      return;
    }
    
    if(mode === "read") {
      const { data, error } = await supabase.from("tb_artikel").update([
        {
          title,
          content,
          deskripsi: deskripsi,
          slug: slugConvert(title),
          author_id: user?.id,
          thumbnail_url: thumbnailUrl,
          status: isDraft ? 2 : 1,
          updated_at: new Date()
        }
      ]).eq('id', artikelId).select()
  
      if (data && data.length > 0) {
        let tempId = data[0].id;
  
        for (const loop of selectLabel) {
          const { error: tagError } = await supabase
            .from('artikel_tag').insert({ artikel_id: tempId, tag_id: loop.id });
  
          if (tagError) {
            console.error("error insert tag: ", tagError)
          }
        }
        console.log("tag selesai diinput.")
      }
    } else {
      const { data, error } = await supabase.from("tb_artikel").insert([
        {
          title,
          content,
          deskripsi: deskripsi,
          slug: slugConvert(title),
          author_id: user?.id,
          thumbnail_url: thumbnailUrl,
          status: isDraft ? 2 : 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ]).select()
  
      if (data && data.length > 0) {
        let tempId = data[0].id;
  
        for (const loop of selectLabel) {
          const { error: tagError } = await supabase
            .from('artikel_tag').insert({ artikel_id: tempId, tag_id: loop.id });
  
          if (tagError) {
            console.error("error insert tag: ", tagError)
          }
        }
        console.log("tag selesai diinput.")
      }
    }
  }


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

  // ✅ Fetch artikel jika dalam mode "read"
  useEffect(() => {
    if (mode === "read" && artikelId) {
      const fetchArtikel = async () => {
        const { data, error } = await supabase
          .from("tb_artikel")
          .select("*")
          .eq("id", artikelId)
          .single();

        if (error) {
          console.error("Error fetching artikel:", error.message);
        } else {
          if (data && data.id !== editingArtikel?.id) { // 🔥 Hanya update jika data berubah
            setEditingArtikel(data);
            setTitle(data.title);
            setContent(data.content);
            setDeskripsi(data.deskripsi);
            setThumbnailUrl(data.thumbnail_url);
          }
        }
      };

      fetchArtikel();
    }
  }, [mode, artikelId]);

  return (
    <ArtikelContext.Provider
      value={{
        title,
        setTitle,
        content,
        setContent,
        deskripsi,
        setDeskripsi,
        thumbnailUrl,
        setThumbnailUrl,
        addMarkdownImage: (imageUrl: string) => setContent((prev) => prev + `\n![Image](${imageUrl})\n`),
        submitArtikel,
        deleteArtikel: async (param: string) => { },
        selectLabel,
        setSelectLabel,
        tags,
        setTags,
        artikelId,
        setArtikelId,
        editingArtikel,
        mode
      }}
    >
      {children}
    </ArtikelContext.Provider>
  );
};

export const useArtikel = () => {
  const context = useContext(ArtikelContext);
  if (!context) {
    throw new Error("useArtikel must be used within an ArtikelProvider");
  }
  return context;
};
