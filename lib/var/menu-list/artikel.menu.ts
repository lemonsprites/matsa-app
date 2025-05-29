import { Feather } from "lucide-react";

export const artikelMenu = {
    title: "Artikel",
    url: "#",
    icon: Feather,
    items: [
        {
            title: "Overview",
            url: "/admin/artikel/",
        },
        {
            title: "Daftar Artikel",
            url: "/admin/artikel/daftar",
        },
        {
            title: "Kategori/Tag",
            url: "/admin/artikel/tag",
        },
        {
            title: "Artikel Takedown",
            url: "/admin/artikel/takedown",
        },
        // {
        //     title: "Monitoring",
        //     url: "#",
        // },
        // {
        //     title: "Laporan",
        //     url: "#",
        // },
    ],
}