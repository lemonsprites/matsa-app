import AdminLayout from '@/components/layouts/admin-layout';
import LandingLayout from '@/components/layouts/landing-layout';
import AdminDashboard from '@/pages/admin/admin-dashboard';
import IntegritasIkhtisar from '@/pages/admin/integritas-ikhtisar';
import PegawaiOverview from '@/pages/admin/pegawai-overview';
import ZonaIntegritas from '@/pages/integritas-page';
import LandingPage from '@/pages/landing-page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

const router = createBrowserRouter([
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
      { path: "integritas", element: <IntegritasIkhtisar /> },
      { path: "pegawai", element: <PegawaiOverview /> },
      { path: "*", element: <div>Admin Page Not Found</div> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
}

export default App;
