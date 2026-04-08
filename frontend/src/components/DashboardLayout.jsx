import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Search, 
  Send, 
  Clock, 
  MessageSquare, 
  Star, 
  Settings, 
  Bell, 
  Menu, 
  X,
  ChevronRight,
  LogOut,
  PlusCircle,
  Users,
  UserCheck,
  Layout
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ children, activeView, setActiveView }) => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const providerMenuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'services', label: 'My Gigs', icon: Briefcase },
    { id: 'post-job', label: 'Post a Job', icon: PlusCircle },
    { id: 'my-jobs', label: 'My Posted Jobs', icon: Briefcase },
    { id: 'applications', label: 'Orders Received', icon: Send },
    { id: 'active', label: 'Active Jobs', icon: Clock },
    { id: 'chat', label: 'Messages', icon: MessageSquare },
    { id: 'reviews', label: 'My Reviews', icon: Star },
    { id: 'settings', label: 'Profile & Settings', icon: Settings },
  ];

  const customerMenuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'post-job', label: 'Post a Job', icon: PlusCircle },
    { id: 'my-jobs', label: 'My Jobs', icon: Briefcase },
    { id: 'applications', label: 'Applications', icon: Users },
    { id: 'hired', label: 'Hired Providers', icon: UserCheck },
    { id: 'chat', label: 'Messages', icon: MessageSquare },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const menuItems = user?.role === 'client' ? customerMenuItems : providerMenuItems;

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-900 font-['Inter']">
      {/* Sidebar - Desktop */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 fixed h-full z-30`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight">Micro<span className="text-indigo-600">Fiverr</span></span>}
        </div>

        <nav className="flex-grow px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                activeView === item.id 
                  ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="text-sm font-semibold">{item.label}</span>}
              {isSidebarOpen && activeView === item.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-semibold">Logout</span>}
          </button>
        </div>

        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 bg-white border border-slate-200 rounded-full p-1 shadow-sm text-slate-400 hover:text-slate-900 lg:flex hidden"
        >
          {isSidebarOpen ? <X size={14} /> : <Menu size={14} />}
        </button>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Top Navbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:hidden">
             <button onClick={() => setIsMobileMenuOpen(true)}>
               <Menu size={24} className="text-slate-600" />
             </button>
             <span className="font-bold text-lg">Micro<span className="text-indigo-600">Fiverr</span></span>
          </div>

          <div className="hidden md:flex items-center bg-slate-100 px-4 py-2 rounded-xl w-96">
            <Search size={18} className="text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search jobs, projects..." 
              className="bg-transparent border-none outline-none text-sm w-full font-medium"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold leading-none mb-1">{user?.name}</p>
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{user?.role}</p>
              </div>
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border border-indigo-200 cursor-pointer hover:shadow-md transition-all">
                {user?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="fixed inset-y-0 left-0 w-72 bg-white flex flex-col p-6 animate-in slide-in-from-left duration-300">
             <div className="flex items-center justify-between mb-8">
               <span className="font-bold text-xl">Micro<span className="text-indigo-600">Fiverr</span></span>
               <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
             </div>
             <nav className="space-y-2">
               {menuItems.map((item) => (
                 <button
                   key={item.id}
                   onClick={() => { setActiveView(item.id); setIsMobileMenuOpen(false); }}
                   className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                     activeView === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-600'
                   }`}
                 >
                   <item.icon size={22} />
                   <span className="font-bold">{item.label}</span>
                 </button>
               ))}
               <button 
                 onClick={logout}
                 className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-500 bg-red-50 mt-4"
               >
                 <LogOut size={22} />
                 <span className="font-bold">Logout</span>
               </button>
             </nav>
          </aside>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
