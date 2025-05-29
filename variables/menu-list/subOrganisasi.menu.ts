import { LayoutGrid } from "lucide-react";

export const subOrganisasiMenu = {
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
}