import { LayoutGrid, MailCheck, Feather, BookOpen, ShieldCheck, Settings2 } from "lucide-react";

export const adminMenulist = {
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
                    url: '/admin/pegawai',
                },
                {
                    title: "Manajemen Pegawai",
                    url: '/admin/pegawai/manajemen'
                },
                {
                    title: "Manajemen Mapel Pegawai",
                    url: '/admin/pegawai/manajemen-mapel'
                },
                {
                    title: "Manajemen Jabatan",
                    url: '/admin/pegawai/manajemen-jabatan'
                },
                {
                    title: "Manajemen Kelas",
                    url: '/admin/pegawai/manajemen-kelas'
                },
                {
                    title: "Laporan/Cetak",
                    url: '/admin/pegawai/laporan'
                },
                {
                    title: "Monitoring Jadwal",
                    url: '/admin/pegawai/monitoring-jadwal'
                },
                {
                    title: "Referensi Kepegawaian",
                    url: '/admin/pegawai/referensi'
                },
            ]
        },
        {
            title: "Sub-Organisasi",
            url: "#",
            icon: LayoutGrid,
            items: [
                {
                    title: "Overview",
                    url: '/admin/pegawai',
                },
                {
                    title: "Manajemen Organisasi",
                    url: '/admin/pegawai/manajemen'
                },
                {
                    title: "Manajemen Beban Kerja",
                    url: '/admin/pegawai/manajemen-abk'
                },
                {
                    title: "Manajemen Jabatan",
                    url: '/admin/pegawai/manajemen-jabatan'
                },
                {
                    title: "Laporan/Cetak",
                    url: '/admin/pegawai/laporan'
                },
                {
                    title: "Monitoring Jadwal",
                    url: '/admin/pegawai/monitoring-jadwal'
                },
                {
                    title: "Referensi Kepegawaian",
                    url: '/admin/pegawai/referensi'
                },
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
                    title: "Laporan/Cetak",
                    url: '#'
                },
                {
                    title: "Monitoring",
                    url: '#'
                },
                {
                    title: "Referensi Kodefikasi",
                    url: 'surat/kodefikasi'
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