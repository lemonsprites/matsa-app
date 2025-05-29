import { Users } from "lucide-react";

export const kepegawaianMenu = {
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
        {
            title: "Referensi Kurikulum",
            url: '/admin/pegawai/kurikulum'
        },
    ]
}