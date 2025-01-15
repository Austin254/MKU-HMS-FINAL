import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { School, User, LogOut, Moon, Sun, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../context/AdminContext';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-hot-toast';

export default function Header() {
  const { user, logout } = useAuth();
  const { admin, logoutAdmin } = useAdmin();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (admin) {
      logoutAdmin();
      navigate('/admin/login');
    } else {
      logout();
      navigate('/');
    }
    toast.success('Logged out successfully');
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <header className="bg-blue-900 dark:bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <School className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">MKU Hostels</h1>
              <p className="text-sm text-blue-200 dark:text-gray-400">Mount Kenya University</p>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-blue-800 dark:hover:bg-gray-800 transition"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            {admin ? (
              <>
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 hover:text-blue-200 transition"
                >
                  <Shield className="h-5 w-5" />
                  <span>{admin.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-blue-800 dark:bg-gray-800 px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 hover:text-blue-200 transition"
                >
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-blue-800 dark:bg-gray-800 px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                {!isAdminRoute && (
                  <Link
                    to="/signin"
                    className="flex items-center space-x-2 bg-blue-800 dark:bg-gray-800 px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition"
                  >
                    <User className="h-5 w-5" />
                    <span>Student Login</span>
                  </Link>
                )}
                <Link
                  to="/admin/login"
                  className="flex items-center space-x-2 bg-blue-800 dark:bg-gray-800 px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition"
                >
                  <Shield className="h-5 w-5" />
                  <span>Admin Portal</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}