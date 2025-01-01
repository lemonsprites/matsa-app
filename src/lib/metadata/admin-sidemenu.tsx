import { LayoutGrid, MailCheck, Feather, BookOpen, ShieldCheck, Settings2, Frame, PieChart } from "lucide-react";

export const adminSidemenu = {
    main: [
        {
            title: "Dashboard",
            url: "/admin",
            icon: LayoutGrid,
            isActive: true
        },
        {
            title: "Kepegawaian",
            url: "#",
            icon: LayoutGrid,
            items: [
                {
                    title: "Overview Pegawai",
                    url: 'pegawai/overview',
                },
                {
                    title: "RUH Beban Kerja",
                    url: 'pegawai/abk-ruh'
                },
                {
                    title: "Monitoring Anjab",
                    url: 'pegawai/anjab'
                },
                {
                    title: "referensi",
                    url: 'pegawai/ref'
                }
            ]
        },
        {
            title: "Surat/Naskah Dinas",
            url: "#",
            icon: MailCheck,
            items: [
                {
                    title: "Overview Naskah",
                    url: 'surat',
                },
                {
                    title: "Referensi Kodefikasi",
                    url: 'surat/kodefikasi'
                },
                {
                    title: "Laporan/Cetak",
                    url: '#'
                },
                {
                    title: "Monitoring",
                    url: '#'
                }
            ]
        },
        {
            title: "Artikel",
            url: "#",
            icon: Feather,
            items: [
                {
                    title: "Overview",
                    url: "#",
                },
                {
                    title: "Kategori/Tag",
                    url: "#",
                },
                {
                    title: "Daftar Postingan",
                    url: "#",
                },
                {
                    title: "Monitoring",
                    url: "#",
                },
                {
                    title: "Laporan",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Zona Integritas",
            url: "#",
            icon: ShieldCheck,
            items: [
                {
                    title: "Ihtisar",
                    url: "integritas/ikhtisar",
                },
                {
                    title: "Tim Pembangunan ZI",
                    url: "integritas/tim",
                },
                {
                    title: "Monitoring",
                    url: "integritas/monitoring",
                },
                {
                    title: "Survey dan Asesmen",
                    url: "integritas/survey",
                },
                {
                    title: "Laporan",
                    url: "integritas/laporan",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
}