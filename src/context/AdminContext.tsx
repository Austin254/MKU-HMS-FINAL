import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

interface Admin {
  id: string;
  username: string;
  role: 'admin' | 'super_admin';
  name: string;
}

interface AdminContextType {
  admin: Admin | null;
  loginAdmin: (credentials: { username: string; password: string }) => Promise<void>;
  logoutAdmin: () => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

export default function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(() => {
    const savedAdmin = Cookies.get('mku_admin');
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  useEffect(() => {
    if (admin) {
      Cookies.set('mku_admin', JSON.stringify(admin), { expires: 1 }); // Expires in 1 day
    } else {
      Cookies.remove('mku_admin');
    }
  }, [admin]);

  const loginAdmin = async (credentials: { username: string; password: string }) => {
    // Demo admin credentials
    const validCredentials = [
      { username: 'admin@mku.ac.ke', password: 'admin123', role: 'admin' as const },
      { username: 'super@mku.ac.ke', password: 'super123', role: 'super_admin' as const }
    ];

    const matchedAdmin = validCredentials.find(
      cred => cred.username === credentials.username && cred.password === credentials.password
    );

    if (matchedAdmin) {
      const adminData: Admin = {
        id: Math.random().toString(36).substr(2, 9),
        username: matchedAdmin.username,
        role: matchedAdmin.role,
        name: matchedAdmin.role === 'super_admin' ? 'Super Admin' : 'Admin'
      };
      setAdmin(adminData);
      toast.success(`Welcome back, ${adminData.name}!`);
      return;
    }

    throw new Error('Invalid admin credentials');
  };

  const logoutAdmin = () => {
    setAdmin(null);
    toast.success('Admin logged out successfully');
  };

  return (
    <AdminContext.Provider value={{ admin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}