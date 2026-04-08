import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProviderDashboard from './pages/ProviderDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import JobDetail from './pages/JobDetail';
import Chat from './pages/Chat';
import ClientNavbar from './components/ClientNavbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import './index.css';

// Smart redirect after login based on role
const RoleRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to="/" replace />;
};

const DashboardSwitch = () => {
  const { user } = useAuth();
  if (user?.role === 'client') return <CustomerDashboard />;
  return <ProviderDashboard />;
};

// Client layout with Navbar
const ClientLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <ClientNavbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Smart redirect after login */}
          <Route path="/redirect" element={<RoleRedirect />} />

          {/* ====== DASHBOARD ROUTE (Smart Switch based on Role) ====== */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={['freelancer', 'client']}>
                <DashboardSwitch />
              </ProtectedRoute>
            }
          />

          {/* ====== CLIENT / PUBLIC ROUTES (With Client Navbar) ====== */}
          <Route path="/" element={
            <ClientLayout>
              <Home />
            </ClientLayout>
          } />

          <Route path="/login" element={
            <ClientLayout>
              <Login />
            </ClientLayout>
          } />

          <Route path="/register" element={
            <ClientLayout>
              <Register />
            </ClientLayout>
          } />

          <Route path="/jobs/:id" element={
            <ClientLayout>
              <JobDetail />
            </ClientLayout>
          } />

          <Route
            path="/chat"
            element={
              <ProtectedRoute roles={['client']}>
                <ClientLayout>
                  <Chat />
                </ClientLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
