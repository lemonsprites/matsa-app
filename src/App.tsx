import AdminLayout from '@/components/layouts/admin-layout';
import ZonaIntegritasPop from '@/components/layouts/integritas-popup';
import LandingLayout from '@/components/layouts/landing-layout';
import { Surat } from '@/lib/type/surat-type';
import AdminDashboard from '@/pages/admin/admin-dashboard';
import IntegritasIkhtisar from '@/pages/admin/integritas-ikhtisar';
import NaskahOverview from '@/pages/admin/naskah-overview';
import PegawaiOverview from '@/pages/admin/pegawai-overview';
import ZonaIntegritas from '@/pages/integritas-page';
import LandingPage from '@/pages/landing-page';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

function App() {
  const [suratList] = useState<Surat[]>([]);

  return (
    <Router>
      <ZonaIntegritasPop />
      <Routes>
        {/* Landing Layout */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="integritas" element={<ZonaIntegritas />} />
        </Route>

        {/* Admin Layout */}
        <Route path="admin" element={<AdminLayout />}>
          {/* Default Admin Dashboard */}
          <Route index element={<AdminDashboard />} />

          {/* Surat Menu */}
          <Route path="surat">
            <Route index element={<NaskahOverview suratList={suratList} />} />
            <Route path="overview" element={<NaskahOverview suratList={suratList} />} />
          </Route>

          {/* Pegawai Menu */}
          <Route path="pegawai">
            <Route index element={<PegawaiOverview />} />
            <Route path="overview" element={<PegawaiOverview />} />
          </Route>

          {/* Zona Integritas */}
          <Route path="integritas">
            <Route path="ikhtisar" element={<IntegritasIkhtisar />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
