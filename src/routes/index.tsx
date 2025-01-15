import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ProtectedRoute from './ProtectedRoute';

// Lazy loaded components
const HomePage = lazy(() => import('../pages/HomePage'));
const SignInPage = lazy(() => import('../pages/SignInPage'));
const AdminLoginPage = lazy(() => import('../pages/AdminLoginPage'));
const HostelDetailPage = lazy(() => import('../pages/HostelDetailPage'));
const BookingPage = lazy(() => import('../pages/BookingPage'));
const UserDashboard = lazy(() => import('../pages/UserDashboard'));
const AdminDashboard = lazy(() => import('../components/admin/AdminDashboard'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const SupportPage = lazy(() => import('../pages/SupportPage'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/hostel/:id" element={<HostelDetailPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route 
          path="/booking/:hostelId" 
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}