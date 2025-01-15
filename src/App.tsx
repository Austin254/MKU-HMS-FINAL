import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import FloatingActions from './components/FloatingActions';
import FloatingIcons from './components/animations/FloatingIcons';
import AuthProvider from './context/AuthContext';
import AdminProvider from './context/AdminContext';
import ThemeProvider from './context/ThemeContext';
import NotificationProvider from './context/NotificationContext';
import SupportProvider from './context/SupportContext';
import PageTransition from './components/animations/PageTransition';
import AppRoutes from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AdminProvider>
            <NotificationProvider>
              <SupportProvider>
                <BrowserRouter>
                  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                    <Toaster 
                      position="top-right"
                      toastOptions={{
                        duration: 3000,
                        style: {
                          background: '#363636',
                          color: '#fff',
                        },
                      }} 
                    />
                    <FloatingIcons />
                    <Header />
                    
                    <PageTransition>
                      <AppRoutes />
                    </PageTransition>

                    <FloatingActions />
                  </div>
                </BrowserRouter>
              </SupportProvider>
            </NotificationProvider>
          </AdminProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}