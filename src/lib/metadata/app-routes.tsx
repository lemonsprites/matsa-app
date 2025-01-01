import { RouteObject } from "react-router-dom"
import AdminLayout from '@/components/layouts/admin-layout';
import LandingLayout from '@/components/layouts/landing-layout';
import AdminDashboard from '@/pages/admin/admin-dashboard';
import IntegritasIkhtisar from '@/pages/admin/integritas-ikhtisar';
import PegawaiOverview from '@/pages/admin/pegawai-overview';
import ZonaIntegritas from '@/pages/integritas-page';
import LandingPage from '@/pages/landing-page';
import AdminNotFound from "@/components/layouts/admin-not-found";
import SuratOverview from "@/pages/admin/surat-overview";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "integritas", element: <ZonaIntegritas /> },
      { path: "*", element: <div>Page Not Found</div> },
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

      // Exception
      { path: "*", element: <AdminNotFound /> },
    ],
  },
]