import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../context/AdminContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user } = useAuth();
  const { admin } = useAdmin();
  
  if (adminOnly && !admin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  if (!adminOnly && !user) {
    return <Navigate to="/signin" replace />;
  }
  
  return <>{children}</>;
}