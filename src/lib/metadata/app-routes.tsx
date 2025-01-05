import AppSlot from "@/components/app-slot";
import AdminLayout from '@/components/layouts/admin/admin-layout';
import AdminNotFound from "@/components/layouts/admin/admin-not-found";
import RUHBebanKerja from "@/components/layouts/block/pegawai-ruh-beban";
import LandingLayout from '@/components/layouts/landing-layout';
import PegawaiLaporan from "@/components/layouts/kepegawaian/pegawai-laporan";
import PegawaiManajemen from "@/components/layouts/kepegawaian/pegawai-manajemen";
import PegawaiManajemenJabatan from "@/components/layouts/kepegawaian/pegawai-manajemen-jabatan";
import PegawaiManajemenMapel from "@/components/layouts/kepegawaian/pegawai-manajemen-mapel";
import PegawaiJadwalGeneral from "@/components/layouts/kepegawaian/pegawai-jadwal-monitoring";
import PegawaiReferensi from "@/components/layouts/kepegawaian/pegawai-referensi";
import AdminDashboard from '@/pages/admin/admin-dashboard';
import IntegritasIkhtisar from '@/pages/admin/integritas-ikhtisar';
import PegawaiOverview from '@/pages/admin/pegawai-overview';
import SuratOverview from "@/pages/admin/surat-overview";
import ZonaIntegritas from '@/pages/integritas-page';
import LandingPage from '@/pages/landing-page';
import MaintenantePage from "@/pages/maintenance.page";
import { RouteObject } from "react-router-dom";
import PegawaiJadwalPreview from "@/components/layouts/kepegawaian/pegawai-jadwal-preview";
import PegawaiManajemenKelas from "@/components/layouts/kepegawaian/pegawai-manajemen-kelas";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      { index: true, element: <AppSlot title="Selamat Datang" element={<LandingPage />} /> },
      { path: "integritas", element: <AppSlot title="Zona Integritas" element={<ZonaIntegritas />} /> },
      { path: "*", element: <AppSlot title="Tidak Ditemukan" element={<AdminNotFound />} /> },
    ],
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
      { path: "pegawai/abk-ruh", element: <RUHBebanKerja /> },
      { path: "pegawai/manajemen", element: <PegawaiManajemen /> },
      { path: "pegawai/manajemen-mapel", element: <PegawaiManajemenMapel /> },
      { path: "pegawai/manajemen-jabatan", element: <PegawaiManajemenJabatan /> },
      { path: "pegawai/manajemen-kelas", element: <PegawaiManajemenKelas /> },
      { path: "pegawai/laporan", element: <PegawaiLaporan /> },
      { path: "pegawai/monitoring-jadwal", element: <PegawaiJadwalPreview /> },
      { path: "pegawai/referensi", element: <PegawaiReferensi /> },


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