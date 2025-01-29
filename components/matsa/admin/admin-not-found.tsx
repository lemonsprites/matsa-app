
import AppSlot from '@/components/app-slot';
import { Link, useLocation } from "react-router-dom";

const AdminNotFound = ({ title }: any) => {
  const location = useLocation();

  return (
    <AppSlot title={title}>
      <div className="flex flex-col items-center mt-16 text-center">
        <div className="flex items-center">
          <img src={""} width={200} />
          <h1 className="text-9xl font-bold text-gray-800">404</h1>
        </div>
        <h1 className="text-4xl mt-5 font-bold text-gray-800">NOT FOUND</h1>
        <p className="text-gray-600 mt-4 text-xl">
          Sorry guys! Laman <span className="font-mono text-gray-800">{location.pathname}</span> itu gak ada, mungkin masih dibangun!😉
        </p>
        <Link to="/admin" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
          Balik lagi ke dashboard aja! 👍
        </Link>
      </div>
    </AppSlot>
  );
};

export default AdminNotFound;