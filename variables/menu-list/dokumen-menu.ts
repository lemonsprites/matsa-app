import { Feather, LucideGraduationCap } from "lucide-react";

export const dokumenMenu = {
    title: "Dokumen",
    url: "/admin/dokumen",
    icon: Feather,
    items: [
        {
            title: "Integritas",
            url: "/admin/dokumen/integritas",
            icon: LucideGraduationCap,
        },
        {
            title: "Persuratan",
            url: "/admin/dokumen/surat",
            icon: Feather,
        },
        {
            title: "Kodefikasi",
            url: "/admin/dokumen/kodefikasi",
            icon: Feather,
        },
    ],
};