import AppSlot from "@/components/app-slot";
import AdminLayout from '@/components/layouts/admin-layout';
import AdminNotFound from "@/components/layouts/admin-not-found";
import RUHBebanKerja from "@/components/layouts/block/pegawai-ruh-beban";
import LandingLayout from '@/components/layouts/landing-layout';
import PegawaiLaporan from "@/components/layouts/pegawai-laporan";
import PegawaiManajemen from "@/components/layouts/pegawai-manajemen";
import PegawaiManajemenJabatan from "@/components/layouts/pegawai-manajemen-jabatan";
import PegawaiManajemenMapel from "@/components/layouts/pegawai-manajemen-mapel";
import PegawaiMapelGeneral from "@/components/layouts/pegawai-mapel";
import PegawaiReferensi from "@/components/layouts/pegawai-referensi";
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
      { path: "pegawai/laporan", element: <PegawaiLaporan /> },
      { path: "pegawai/monitoring-jadwal", element: <PegawaiMapelGeneral /> },
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