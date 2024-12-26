import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './pages/auth/LoginPage';
import { useAuthStore } from './store/authStore';

// Lazy load components
const FeedPage = lazy(() => import('./pages/FeedPage').then(module => ({ default: module.FeedPage })));
const AdminPanel = lazy(() => import('./components/admin/AdminPanel').then(module => ({ default: module.AdminPanel })));

// Loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen bg-[#141414] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} 
          />
          
          <Route path="/" element={
            <ProtectedRoute>
              <FeedPage />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute requireAdmin>
              <AdminPanel />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;