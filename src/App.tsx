import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/landing-page'
import ZonaIntegritasPop from '@/components/integritas-popup';
import ZonaIntegritas from '@/pages/integritas-page';
import LandingLayout from '@/components/layouts/landing-layout';
import AdminLayout from '@/components/layouts/admin-layout';
import DashboardPage from '@/pages/admin/dashboard-page';
import SuratOverview from '@/pages/admin/NaskahMenu/overview-naskah';
import { useState } from 'react';
import { Surat } from '@/lib/type/surat-type';
import supabase from '@/lib/supabase';
import IntegritasIkhtisar from '@/pages/admin/Integritas/Ikhtisar-integritas';


function App() {
  const [suratList, setSuratList] = useState<Surat[]>([]);

  async function getData() {
    const { data, error } = await supabase
      .from('tb_surat')
      .select('*'); // Select all columns

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setSuratList(data)
    }
  }
  getData();
  return (
    <Router>
      <ZonaIntegritasPop />
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/integritas" element={<ZonaIntegritas />}></Route>
        </Route>

        <Route path='admin' element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="surat">
            <Route path="overview" element={<SuratOverview suratList={suratList} />} />
            {/* <Route path="kodefikasi" element={<SuratKodefikasi />} /> */}
          </Route>
          
          <Route path='integritas'>
            <Route path='ikhtisar' element={<IntegritasIkhtisar />} />
          </Route>


          <Route path='dashboard' element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
