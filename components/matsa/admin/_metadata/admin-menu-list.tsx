import { Feather, LayoutGrid, LucideGraduationCap, School, Settings2, ShieldCheck, Users } from "lucide-react";

export const adminMenulist = {
    main: [
        {
            title: "Dashboard",
            url: "/admin",
            icon: LayoutGrid,
            isActive: true
        },
        // {
        //     title: "Komite Madrasah",
        //     url: "#",
        //     icon: School,
        //     items: [
        //         {
        //             title: "Ikhtisar Komite",
        //             url: "/admin/komite",
        //         },
        //         {
        //             title: "Daftar Tabungan",
        //             url: "/admin/komite/tabungan",
        //         },
        //         {
        //             title: "Transaksi Bendahara",
        //             url: "/admin/komite/transaksi",
        //         },
        //         {
        //             title: "Pemindahan Kas",
        //             url: "/admin/pindah-kas",
        //         },
        //         {
        //             title: "Laporan Keuangan",
        //             url: "/admin/transaksi-komite",
        //         },
        //         {
        //             title: "Pengurus Komite",
        //             url: "/admin/pengurus-komite",
        //         },
        //         {
        //             title: "Setting",
        //             url: "/admin/pengurus-komite",
        //         },
        //     ]
        // },
        // {
        //     title: "Aset dan Persediaan",
        //     url: '/admin/aset',
        //     icon: Book,
        //     items: [
        //         {
        //             title: 'Overview',
        //             url: '/admin/aset/'
        //         },
        //         {
        //             title: 'Buku Aset',
        //             url: '/admin/aset/buku'
        //         },
        //         {
        //             title: 'Transaksi Aset',
        //             url: '/admin/aset/trx'
        //         },
        //     ],
        // },
        {
            title: "Kepegawaian",
            url: "#",
            icon: Users,
            items: [
                {
                    title: "Overview Pegawai",
                    url: '/admin/pegawai',
                },
                {
                    title: "Manajemen Pegawai",
                    url: '/admin/pegawai/manage'
                },
                {
                    title: "Laporan Kinerja",
                    url: '/admin/pegawai/laporan'
                },
                {
                    title: "Monitoring Laporan Kinerja",
                    url: '/admin/pegawai/monlap'
                },
                // {
                //     title: "Manajemen Mapel Pegawai",
                //     url: '/admin/pegawai/manajemen-mapel'
                // },
                // {
                //     title: "Manajemen Jabatan",
                //     url: '/admin/pegawai/manajemen-jabatan'
                // },
                // {
                //     title: "Manajemen Kelas",
                //     url: '/admin/pegawai/manajemen-kelas'
                // },
                // {
                //     title: "Laporan/Cetak",
                //     url: '/admin/pegawai/laporan'
                // },
                // {
                //     title: "Monitoring Jadwal",
                //     url: '/admin/pegawai/monitoring-jadwal'
                // },
                // {
                //     title: "Referensi Kepegawaian",
                //     url: '/admin/pegawai/referensi'
                // },
                // {
                //     title: "Referensi Kurikulum",
                //     url: '/admin/pegawai/kurikulum'
                // },
            ]
        },
        {
            title: "Akademik",
            url: "#",
            icon: LucideGraduationCap,
            items: [
                {
                    title: "Overview Siswa",
                    url: '/admin/siswa',
                    icon: Feather,

                },
                {
                    title: "Manajemen Siswa",
                    url: '/admin/siswa',
                    icon: Feather,
                    items: [
                        {
                            title: "Manajemen Siswa",
                            url: '/admin/siswa/manajemen'
                        },
                        {
                            title: "Manajemen Kelas",
                            url: '/admin/siswa/manajemen-kelas'
                        },
                        {
                            title: "Mutasi Internal",
                            url: '/admin/siswa/mutasi-internal'
                        },
                        {
                            title: "Mutasi Eksternal",
                            url: '/admin/siswa/mutasi-eksternal'
                        },
                    ]
                },
                {
                    title: "Manajemen Kelas",
                    url: '/admin/siswa/manajemen-kelas',
                    items: [
                        {
                            title: "Mutasi Internal",
                            url: '/admin/siswa/mutasi-internal'
                        },
                        {
                            title: "Mutasi Eksternal",
                            url: '/admin/siswa/mutasi-eksternal'
                        }
                    ]
                },


            ]
        },
        // {
        //     title: "Sub-Organisasi",
        //     url: "#",
        //     icon: LayoutGrid,
        //     items: [
        //         {
        //             title: "Overview",
        //             url: '/admin/pegawai',
        //         },
        //         {
        //             title: "Manajemen Organisasi",
        //             url: '/admin/pegawai/manajemen'
        //         },
        //         {
        //             title: "Manajemen Beban Kerja",
        //             url: '/admin/pegawai/manajemen-abk'
        //         },
        //         {
        //             title: "Manajemen Jabatan",
        //             url: '/admin/pegawai/manajemen-jabatan'
        //         },
        //         {
        //             title: "Laporan/Cetak",
        //             url: '/admin/pegawai/laporan'
        //         },
        //         {
        //             title: "Monitoring Jadwal",
        //             url: '/admin/pegawai/monitoring-jadwal'
        //         },
        //         {
        //             title: "Referensi Kepegawaian",
        //             url: '/admin/pegawai/referensi'
        //         },
        //     ]
        // },
        // {
        //     title: "Surat/Naskah Dinas",
        //     url: "#",
        //     icon: MailCheck,
        //     items: [
        //         {
        //             title: "Overview Naskah",
        //             url: 'surat',
        //         },
        //         {
        //             title: "Laporan/Cetak",
        //             url: '#'
        //         },
        //         {
        //             title: "Monitoring",
        //             url: '#'
        //         },
        //         {
        //             title: "Referensi Kodefikasi",
        //             url: 'surat/kodefikasi'
        //         }
        //     ]
        // },
        {
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
        },
        // {
        //     title: "Documentation",
        //     url: "#",
        //     icon: BookOpen,
        //     items: [
        //         {
        //             title: "Introduction",
        //             url: "#",
        //         },
        //         {
        //             title: "Get Started",
        //             url: "#",
        //         },
        //         {
        //             title: "Tutorials",
        //             url: "#",
        //         },
        //         {
        //             title: "Changelog",
        //             url: "#",
        //         },
        //     ],
        // },
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
                    url: "/admin/setting/general"
                },
                {
                    title: "Users",
                    url: "/admin/setting/users",
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