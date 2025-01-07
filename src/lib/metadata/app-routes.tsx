import AdminLayout from '@/components/layouts/admin/admin-layout';
import AdminNotFound from "@/components/layouts/admin/admin-not-found";
import RUHBebanKerja from "@/components/layouts/block/pegawai-ruh-beban";
import PegawaiJadwalManajemen from '@/components/layouts/kepegawaian/pegawai-jadwal-preview';
import PegawaiKurikulum from "@/components/layouts/kepegawaian/pegawai-kurikulum";
import PegawaiKurikulumJTM from "@/components/layouts/kepegawaian/pegawai-kurikulum-jtm";
import PegawaiLaporan from "@/components/layouts/kepegawaian/pegawai-laporan";
import PegawaiManajemen from "@/components/layouts/kepegawaian/pegawai-manajemen";
import PegawaiManajemenJabatan from "@/components/layouts/kepegawaian/pegawai-manajemen-jabatan";
import PegawaiManajemenKelas from "@/components/layouts/kepegawaian/pegawai-manajemen-kelas";
import PegawaiManajemenMapel from "@/components/layouts/kepegawaian/pegawai-manajemen-mapel";
import PegawaiReferensi from "@/components/layouts/kepegawaian/pegawai-referensi";
import LandingLayout from '@/components/layouts/landing-layout';
import AdminDashboard from '@/pages/admin/admin-dashboard';
import IntegritasIkhtisar from '@/pages/admin/integritas-ikhtisar';
import PegawaiOverview from '@/pages/admin/pegawai-overview';
import SuratOverview from "@/pages/admin/surat-overview";
import ZonaIntegritas from '@/pages/integritas-page';
import LandingPage from '@/pages/landing-page';
import MaintenantePage from "@/pages/maintenance.page";
import { RouteObject } from "react-router-dom";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      { index: true, element: <LandingPage title="Selamat Datang" /> },
      { path: "integritas", element: <ZonaIntegritas title="Zona Integritas" /> },
      { path: "*", element: <AdminNotFound title="Tidak Ditemukan" /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />, // Wraps admin routes
    children: [
      { index: true, element: <AdminDashboard title="Dashboard"/> },

      // Integritas Route
      { path: "integritas", element:<IntegritasIkhtisar title="Overview Integritas" /> },
      { path: "integritas/ikhtisar", element: <IntegritasIkhtisar  title="Overview Integritas"/> },
      { path: "integritas/tim", element: <AdminNotFound title="Tidak Ditemukan" />},
      { path: "integritas/monitoring", element: <AdminNotFound title="Tidak Ditemukan" /> },
      { path: "integritas/laporan", element: <AdminNotFound title="Tidak Ditemukan" /> },

      // Surat Route
      { path: "surat", element: <SuratOverview /> },

      // Pegawai Route
      { path: "pegawai", element: <PegawaiOverview title="Overview Kepegawaian"/> },
      { path: "pegawai/abk-ruh", element: <RUHBebanKerja title="Manajemen Beban Kerja"/> },
      { path: "pegawai/manajemen", element: <PegawaiManajemen title="Manajemen Pegawai" /> },
      { path: "pegawai/manajemen-mapel", element: <PegawaiManajemenMapel /> },
      { path: "pegawai/manajemen-jabatan", element: <PegawaiManajemenJabatan /> },
      { path: "pegawai/manajemen-kelas", element: <PegawaiManajemenKelas /> },
      { path: "pegawai/laporan", element: <PegawaiLaporan /> },
      { path: "pegawai/monitoring-jadwal", element: <PegawaiJadwalManajemen /> },
      { path: "pegawai/referensi", element: <PegawaiReferensi /> },
      { path: "pegawai/kurikulum", element: <PegawaiKurikulum title="Referensi Kurikulum" /> },
      { path: "pegawai/kurikulum/:idKurikulum", element: <PegawaiKurikulumJTM title="Referensi Kurikulum" /> },


      // Exception
      { path: "*", element: <AdminNotFound /> },
    ],
  },
]


export const maintenanceRoutes = [
  {
    path: '*',
    element: <MaintenantePage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />, // Wraps admin routes
    children: [
      { index: true, element: <AdminDashboard /> },

      // Integritas Route
      { path: "integritas", element: <IntegritasIkhtisar /> },
      { path: "integritas/ikhtisar", element: <IntegritasIkhtisar /> },
      { path: "integritas/tim", element: <AdminNotFound /> },
      { path: "integritas/monitoring", element: <AdminNotFound /> },
      { path: "integritas/laporan", element: <AdminNotFound /> },

      // Surat Route
      { path: "surat", element: <SuratOverview /> },

      // Pegawai Route
      { path: "pegawai", element: <PegawaiOverview /> },

      // Exception
      { path: "*", element: <AdminNotFound /> },
    ],
  },
];