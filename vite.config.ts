import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react', 'react-hot-toast'],
          'data-vendor': ['@tanstack/react-query', 'zustand', 'axios'],
          'pdf-vendor': ['jspdf', 'jspdf-autotable'],
          'excel-vendor': ['xlsx']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    watch: {
      usePolling: true
    }
  }
});