import { LucideGraduationCap, Feather } from "lucide-react";

export const akademikMenu = {
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
}