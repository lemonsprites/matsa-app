
import { appRoutes, maintenanceRoutes } from '@/lib/metadata/app-routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase-client';


function App() {
  const [isUnderMaintenance, setIsUnderMaintenance] = useState<number>(2);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchMaintenanceStatus = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('web_config')
        .select('web_mode')
        .eq('id', 1) // Adjust ID or condition as needed
        .single();

      if (error) {
        console.error('Error fetching maintenance status:', error);
      } else {
        setIsUnderMaintenance(data?.web_mode);
      }
      setLoading(false);
    };

    fetchMaintenanceStatus();
  }, []);

  if (loading) {
    // Display a loading screen while fetching data
    return <div></div>;
  }


  const router = createBrowserRouter(isUnderMaintenance === 2 ? maintenanceRoutes : appRoutes, {
    future: {
      v7_relativeSplatPath: true
    }
  });

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
