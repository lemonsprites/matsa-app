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

  // async function getData() {
  //   const { data, error } = await supabase
  //     .from('tb_surat')
  //     .select('*'); // Select all columns

  //   if (error) {
  //     console.error('Error fetching data:', error);
  //   } else {
  //     setSuratList(data)
  //   }
  // }
  // getData();
  return (
    <Router>
      <ZonaIntegritasPop />
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/integritas" element={<ZonaIntegritas />}></Route>
        </Route>

        <Route path='admin' element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path='dashboard' element={<AdminDashboard />} />

          {/* Surat Menu */}
          <Route path="surat">
            <Route index element={<NaskahOverview suratList={suratList} />} />
            <Route path="overview" element={<NaskahOverview suratList={suratList} />} />
            {/* <Route path="kodefikasi" element={<SuratKodefikasi />} /> */}
          </Route>


          {/* Pegawai Menu */}
          <Route path='pegawai'>
            <Route index element={<IntegritasIkhtisar />} />
            <Route path='overview' element={<PegawaiOverview />} />
          </Route>

          {/* Zona Integritas */}
          <Route path='integritas'>
            <Route path='ikhtisar' element={<IntegritasIkhtisar />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  )
}

export default App
