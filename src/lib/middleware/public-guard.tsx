import { useAuth } from '@/lib/middleware/auth-guard';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute: React.FC = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Navigate to="/admin" /> : <Outlet />;
};

export default PublicRoute;
