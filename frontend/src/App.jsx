import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Define roles clearly for the application
export const ROLES = {
  CLIENT: 'client',
  FREELANCER: 'freelancer',
  ADMIN: 'admin'
};

// Provider Pages
import ProviderDashboard from './pages/provider/ProviderDashboard';
import MyServices from './pages/provider/MyServices';
import CreateService from './pages/provider/CreateService';
import MyApplications from './pages/provider/MyApplications';

// Client Pages (Restricted Experience)
import LeaveReview from './pages/client/LeaveReview';
import ActiveHires from './pages/client/ActiveHires';

// Booking & Tracking
import ServiceDetail from './pages/services/ServiceDetail';
import Checkout from './pages/checkout/Checkout';
import LiveTracking from './pages/tracking/LiveTracking';

// Common Pages
import BrowseJobs from './pages/jobs/BrowseJobs';
import JobDetail from './pages/jobs/JobDetail';
import ServiceListing from './pages/services/ServiceListing';
import ChatPage from './pages/ChatPage';
import EditProfile from './pages/profile/EditProfile';

import Navbar from './components/Navbar';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';

// ─────────────────────────────────────────────
// 🛠️ FREELANCER ROUTES
// Ye routes sirf Freelancer (Provider) ke liye hain
// Base path: /dashboard/provider
// ─────────────────────────────────────────────
const freelancerRoutes = [
  { path: '',                  element: <ProviderDashboard /> },  // /dashboard/provider
  { path: 'services',          element: <MyServices /> },         // /dashboard/provider/services
  { path: 'services/create',   element: <CreateService /> },      // /dashboard/provider/services/create
  { path: 'services/edit/:id', element: <CreateService /> },      // /dashboard/provider/services/edit/:id
  { path: 'applications',      element: <MyApplications /> },     // /dashboard/provider/applications
  { path: 'chat',              element: <ChatPage /> },           // /dashboard/provider/chat
  { path: 'profile',           element: <EditProfile /> },        // /dashboard/provider/profile
];

// (Client Routes Removed: Client only uses Main Homepage and specific features)

// ─────────────────────────────────────────────
// Layout for public pages (with Navbar)
// ─────────────────────────────────────────────
const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-white font-['Inter']">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
  </div>
);

// ─────────────────────────────────────────────
// Redirects users to their dashboard by role
// ─────────────────────────────────────────────
const DashboardRedirect = () => {
  const { user, loading } = useAuth();

  console.log('🔄 DashboardRedirect checking user:', { user, loading });

  if (loading) return null;

  if (user?.role === ROLES.FREELANCER) {
    console.log('➡️ Redirecting to Provider Dashboard');
    return <Navigate to="/dashboard/provider" replace />;
  } else if (user?.role === ROLES.CLIENT) {
    console.log('➡️ Redirecting to Home (Client choice)');
    return <Navigate to="/" replace />;
  }

  console.log('❓ Role unknown, redirecting to home');
  return <Navigate to="/" replace />;
};

// ─────────────────────────────────────────────
// Helper: Route array ko map karta hai
// index route alag handle hoti hai (path === '')
// ─────────────────────────────────────────────
const mapRoutes = (routes) =>
  routes.map((route, i) =>
    route.path === ''
      ? <Route key={i} index element={route.element} />
      : <Route key={i} path={route.path} element={route.element} />
  );

// ─────────────────────────────────────────────
// Main App
// ─────────────────────────────────────────────
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* ── Public Routes ── */}
          <Route path="/"         element={<MainLayout><Home /></MainLayout>} />
          <Route path="/login"    element={<MainLayout><Login /></MainLayout>} />
          <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
          <Route path="/jobs"         element={<MainLayout><BrowseJobs /></MainLayout>} />
          <Route path="/jobs/:id" element={<MainLayout><JobDetail /></MainLayout>} />
          <Route path="/services" element={<MainLayout><ServiceListing /></MainLayout>} />
          <Route path="/services/:id" element={<MainLayout><ServiceDetail /></MainLayout>} />
          <Route path="/checkout/:serviceId" element={<MainLayout><ProtectedRoute><Checkout /></ProtectedRoute></MainLayout>} />
          <Route path="/track/:bookingId" element={<MainLayout><ProtectedRoute><LiveTracking /></ProtectedRoute></MainLayout>} />
          <Route path="/active-hires" element={<MainLayout><ProtectedRoute><ActiveHires /></ProtectedRoute></MainLayout>} />
          <Route path="/chat" element={<MainLayout><ProtectedRoute><ChatPage /></ProtectedRoute></MainLayout>} />
          <Route path="/review/:providerId" element={<MainLayout><ProtectedRoute><LeaveReview /></ProtectedRoute></MainLayout>} />
          <Route path="/profile" element={<MainLayout><ProtectedRoute><EditProfile /></ProtectedRoute></MainLayout>} />

          {/* ── Dashboard Redirector ── */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRedirect />
              </ProtectedRoute>
            }
          />

          {/* ── Freelancer (Provider) Routes ── */}
          <Route
            path="/dashboard/provider"
            element={
              <ProtectedRoute roles={[ROLES.FREELANCER]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {mapRoutes(freelancerRoutes)}
          </Route>

          {/* Client uses MainLayout primarily, no dashboard container needed. */}

          {/* ── Catch All ── */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;