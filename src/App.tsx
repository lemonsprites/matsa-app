
import { appRoutes } from '@/lib/metadata/app-routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

const router = createBrowserRouter(appRoutes, {
  future: {
    v7_relativeSplatPath: true
  }
});

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
