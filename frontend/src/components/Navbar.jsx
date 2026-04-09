import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Menu, X, LogOut, MessageSquare, LayoutDashboard, Globe, Search } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../utils/cn';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[5000] transition-all duration-500 font-['Inter']",
      isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-indigo-50 py-4" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-indigo-200 group-hover:rotate-12 transition-transform duration-500">
            <Sparkles size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-900 tracking-tighter leading-none italic">Micro Fiverr.</span>
            <span className="text-[8px] font-black text-indigo-600 uppercase tracking-[0.3em] mt-1 ml-0.5">Elite Marketplace</span>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex items-center gap-10">
          <Link to="/" className={cn("text-xs font-black uppercase tracking-widest transition-colors", location.pathname === '/' ? "text-indigo-600" : "text-slate-500 hover:text-indigo-600")}>Home</Link>
          <Link to="/services" className={cn("text-xs font-black uppercase tracking-widest transition-colors", location.pathname === '/services' ? "text-indigo-600" : "text-slate-500 hover:text-indigo-600")}>Marketplace</Link>
          <Link to="/radar" className={cn("text-xs font-black uppercase tracking-widest transition-colors", location.pathname === '/radar' ? "text-indigo-600" : "text-slate-500 hover:text-indigo-600")}>Live Radar</Link>
        </div>

        {/* AUTH ACTIONS */}
        <div className="hidden lg:flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-xs font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600 transition-colors">Sign In</Link>
              <Button asChild className="rounded-2xl px-10 h-14 bg-indigo-600 hover:bg-black shadow-xl shadow-indigo-100 font-black text-[10px] uppercase tracking-widest">
                <Link to="/register">Join Community</Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-6 pl-6 border-l border-slate-100">
              <div className="text-right">
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{user?.role}</p>
                <p className="text-sm font-black text-slate-900 leading-none italic">{user?.name}</p>
              </div>
              
              <div className="flex items-center gap-2">
                 <Link to="/chat" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-inner">
                    <MessageSquare size={18} />
                 </Link>
                 <Link to="/dashboard" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-inner">
                    <LayoutDashboard size={18} />
                 </Link>
                 <button 
                   onClick={handleLogout}
                   className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-400 hover:bg-rose-600 hover:text-white transition-all shadow-inner"
                 >
                    <LogOut size={18} />
                 </button>
              </div>
            </div>
          )}
        </div>

        {/* MOBILE TRIGGER */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 shadow-inner"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-50 shadow-2xl py-8 px-6 space-y-8 animate-in slide-in-from-top-5 duration-500">
           <div className="flex flex-col gap-6">
              <Link to="/" className="text-2xl font-black italic text-slate-800">Home Feed</Link>
              <Link to="/services" className="text-2xl font-black italic text-slate-800">Global Gigs</Link>
              <Link to="/radar" className="text-2xl font-black italic text-slate-800">Live Radar tracking</Link>
           </div>
           
           {!isAuthenticated ? (
             <div className="flex flex-col gap-4">
                <Button asChild variant="outline" className="h-16 rounded-2xl font-black text-xs uppercase tracking-widest">
                   <Link to="/login">Account Login</Link>
                </Button>
                <Button asChild className="h-16 rounded-2xl bg-indigo-600 font-black text-xs uppercase tracking-widest">
                   <Link to="/register">Create Elite Account</Link>
                </Button>
             </div>
           ) : (
             <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-[2rem] flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">{user?.role}</p>
                      <h3 className="text-xl font-black italic text-slate-900">{user?.name}</h3>
                   </div>
                   <div className="w-14 h-14 bg-white rounded-2xl border border-white shadow-xl flex items-center justify-center text-indigo-600 font-black">
                      {user?.name?.charAt(0)}
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <Button asChild variant="outline" className="h-16 rounded-2xl font-black text-[10px] uppercase tracking-widest">
                      <Link to="/dashboard">Dashboard</Link>
                   </Button>
                   <Button asChild variant="outline" className="h-16 rounded-2xl font-black text-[10px] uppercase tracking-widest">
                      <Link to="/chat">Messages</Link>
                   </Button>
                </div>
                <Button onClick={handleLogout} className="w-full h-16 bg-rose-600 hover:bg-black rounded-2xl font-black text-[10px] uppercase tracking-widest">
                   Sign Out Securely
                </Button>
             </div>
           )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
