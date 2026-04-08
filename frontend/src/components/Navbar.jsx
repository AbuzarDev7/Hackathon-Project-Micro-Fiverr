import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll for sticky glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform duration-300 font-bold text-xl">
            M
          </div>
          <span className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            Micro<span className="text-indigo-600">Fiverr</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {user?.role !== 'client' && (
            <Link to="/jobs" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Find Jobs</Link>
          )}
          <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Home</Link>
          <Link to="/services" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Services</Link>
          {isAuthenticated && (
            <>
              {user?.role === 'freelancer' && (
                <Link to="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Dashboard</Link>
              )}
              <Link to="/chat" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Messages</Link>
            </>
          )}
        </div>

        {/* Auth Actions / Profile */}
        <div className="hidden lg:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-sm font-bold text-slate-700 hover:text-indigo-600 px-4 transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 active:translate-y-0">
                Join Community
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 leading-none mb-1">{user?.name}</p>
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{user?.role}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all"
                title="Log out"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-900 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-2xl py-6 px-4 flex flex-col gap-4 animate-reveal">
          <Link to="/" className="text-lg font-bold text-slate-900 py-2 border-b border-slate-50">Home</Link>
          {user?.role !== 'client' && (
            <Link to="/jobs" className="text-lg font-bold text-slate-900 py-2 border-b border-slate-50">Find Jobs</Link>
          )}
          <Link to="/services" className="text-lg font-bold text-slate-900 py-2 border-b border-slate-50">Browse Services</Link>
          {isAuthenticated && (
            <>
              {user?.role === 'freelancer' && (
                <Link to="/dashboard" className="text-lg font-bold text-slate-900 py-2 border-b border-slate-50">Dashboard</Link>
              )}
              <Link to="/chat" className="text-lg font-bold text-slate-900 py-2 border-b border-slate-50">Chat Messages</Link>
            </>
          )}
          {!isAuthenticated ? (
            <div className="flex flex-col gap-3 mt-4">
              <Link to="/login" className="w-full py-4 text-center font-bold text-slate-900 bg-slate-100 rounded-2xl">Log In</Link>
              <Link to="/register" className="w-full py-4 text-center font-bold text-white bg-indigo-600 rounded-2xl">Get Started Free</Link>
            </div>
          ) : (
            <button 
              onClick={handleLogout}
              className="w-full mt-4 py-4 text-center font-bold text-red-600 bg-red-50 rounded-2xl"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
