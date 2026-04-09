import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  PlusCircle, 
  Search, 
  TrendingUp, 
  Star, 
  Users, 
  Briefcase,
  ChevronRight,
  Clock,
  ClipboardList,
  MessageSquare,
  Settings,
  Layout,
  ExternalLink,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import LocationSender from '../../components/tracking/LocationSender';
import socket from '../../utils/socket';

const ProviderDashboard = () => {
  const { user, token } = useAuth();
  const [vendorStats, setVendorStats] = useState({
    servicesCount: 0,
    activeBookings: 0,
    rating: user?.rating || 5.0,
    earnings: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get('/api/services/provider', config);
        setVendorStats(prev => ({ ...prev, servicesCount: res.data.length }));
      } catch (err) {
        console.error("Error fetching provider stats", err);
      }
    };
    if (token) fetchStats();
  }, [token]);

  const [isOnline, setIsOnline] = useState(user?.isOnline || false);

  const toggleOnline = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    socket.emit("set_online", { userId: user?._id, isOnline: newStatus });
  };

  useEffect(() => {
    // Sync initial status
    if (user?._id) {
       socket.emit("set_online", { userId: user._id, isOnline: isOnline });
    }
  }, [user]);

  const stats = [
    { label: 'Active Services', value: vendorStats.servicesCount, icon: Briefcase, color: 'bg-indigo-500/10 text-indigo-500' },
    { label: 'Current Hires', value: '3', icon: Users, color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Avg. Rating', value: vendorStats.rating, icon: Star, color: 'bg-amber-500/10 text-amber-500' },
    { label: 'Total Sales', value: 'Rs. 45,000', icon: TrendingUp, color: 'bg-purple-500/10 text-purple-500' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 font-['Outfit']">
      {/* 🚀 PREMIUM HEADER */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
        <header className="relative bg-slate-900 border border-slate-800 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8 z-10">
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[2.5rem] p-1 shadow-2xl">
                <div className="w-full h-full bg-slate-900 rounded-[2.2rem] flex items-center justify-center overflow-hidden border-4 border-slate-900">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-black text-indigo-500">{user?.name?.charAt(0) || 'F'}</span>
                  )}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 border-4 border-slate-900 rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div className="text-center md:text-left space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <h1 className="text-4xl font-black text-white tracking-tight">Howdy, {user?.name?.split(' ')[0] || 'Freelancer'}!</h1>
                <div onClick={toggleOnline} className="cursor-pointer group/toggle">
                   <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${isOnline ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
                      {isOnline ? '● Online' : '○ Offline'}
                   </span>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  <MapPin size={14} className="text-slate-600" />
                  {user?.location || 'Pakistan'}
                </div>
                <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  <Clock size={14} className="text-slate-600" />
                  Online
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto z-10">
            <Link 
              to="/dashboard/provider/services/create"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/20 active:scale-95 group"
            >
              <PlusCircle size={22} className="group-hover:rotate-90 transition-transform" />
              CREATE GIG
            </Link>
            <Link 
              to="/profile"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-2xl transition-all border border-slate-700/50 active:scale-95"
            >
              <Settings size={22} />
              SETTINGS
            </Link>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        </header>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] group hover:border-indigo-500/40 transition-all duration-500 relative overflow-hidden">
            <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:rotate-3`}>
              <stat.icon size={28} />
            </div>
            <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <h3 className="text-3xl font-black text-white tracking-tighter leading-none">{stat.value}</h3>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-600/5 rounded-full blur-xl group-hover:bg-indigo-600/10 transition-all"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-4">
             <h2 className="text-2xl font-black text-white flex items-center gap-3">
               <Layout className="text-indigo-500" size={24} />
               Active Sales
             </h2>
             <Link to="/dashboard/provider/services" className="text-indigo-400 hover:text-white font-bold text-sm transition-colors flex items-center gap-1">
               Go to Services
               <ExternalLink size={14} />
             </Link>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] overflow-hidden">
            <div className="p-10 text-center space-y-4">
               <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto text-slate-600 mb-2">
                 <ClipboardList size={32} />
               </div>
               <h3 className="text-xl font-black text-white">No active orders right now</h3>
               <p className="text-slate-500 text-sm font-medium max-w-xs mx-auto">Promote your gigs on the marketplace to attract more clients.</p>
               <div className="pt-4">
                  <Link to="/services" className="px-6 py-3 bg-indigo-500/10 text-indigo-400 font-black text-xs uppercase tracking-widest rounded-xl border border-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all">Browse Marketplace</Link>
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* 📡 LIVE LOCATION SENDER */}
          <LocationSender bookingId="DEMO_ORDER_123" userId={user?._id} />

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-indigo-500/20">
            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black leading-tight">Elite Vendor Status</h3>
                <p className="text-indigo-100/70 text-sm font-medium leading-relaxed">
                  Earn the Elite badge by maintaining a 4.8 rating and 95% response rate.
                </p>
              </div>
              <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                 <div className="h-full bg-white w-3/4 rounded-full"></div>
              </div>
              <Link to="/profile" className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 shadow-xl shadow-black/10">
                Level Up Profile
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-3xl -z-0 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 space-y-6">
            <h3 className="text-white font-black text-lg uppercase tracking-widest border-b border-slate-800 pb-4">Seller Resources</h3>
            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 shrink-0">
                    <Star size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm mb-1 leading-none">Rating Guide</h4>
                    <p className="text-slate-500 text-xs font-medium">How to get 5-star reviews.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 shrink-0">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm mb-1 leading-none">Chat Protocol</h4>
                    <p className="text-slate-500 text-xs font-medium">Professional client communication.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
