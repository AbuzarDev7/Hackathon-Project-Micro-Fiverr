import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  PlusCircle, 
  TrendingUp, 
  Star, 
  Users, 
  Briefcase,
  ClipboardList,
  MessageSquare,
  Settings,
  Layout,
  MapPin,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import LocationSender from '../../components/tracking/LocationSender';
import socket from '../../utils/socket';
import { Badge } from '../../components/ui/Badge';

const Stars = ({ size }) => <Star size={size} />;

const ProviderDashboard = () => {
  const { user, token } = useAuth();
  const [vendorStats, setVendorStats] = useState({
    servicesCount: 0,
    activeBookings: 0,
    rating: user?.rating || 5.0,
    earnings: 0
  });

  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isOnline, setIsOnline] = useState(user?.isOnline || false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const servicesRes = await axios.get('/api/services/provider', config);
        setVendorStats(prev => ({ ...prev, servicesCount: servicesRes.data.length }));

        const historyRes = await axios.get('/api/payment/history', config);
        setTransactions(historyRes.data);
        
        const profileRes = await axios.get('/api/auth/me', config);
        setBalance(profileRes.data.user?.balance || 0);
      } catch (err) {
        console.error("Error fetching provider stats", err);
      }
    };
    if (token) fetchStats();
  }, [token]);

  const toggleOnline = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    socket.emit("set_online", { userId: user?._id, isOnline: newStatus });
  };

  useEffect(() => {
    if (user?._id) {
       socket.emit("set_online", { userId: user._id, isOnline: isOnline });
    }
  }, [user, isOnline]);

  useEffect(() => {
    socket.on("payment_received", (data) => {
      setBalance(prev => prev + Number(data.amount));
      setNotifications(prev => [data, ...prev]);
      setTransactions(prev => [{
        _id: data.transactionId || Math.random().toString(),
        amount: data.amount,
        clientId: { name: data.clientName },
        serviceId: { title: 'Direct Credit' },
        createdAt: new Date()
      }, ...prev]);
    });
    return () => socket.off("payment_received");
  }, []);

  const stats = [
    { label: 'Active Services', value: vendorStats.servicesCount, icon: Briefcase, color: 'bg-indigo-500/10 text-indigo-500' },
    { label: 'Total Ledgers', value: transactions.length, icon: Users, color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Avg. Rating', value: vendorStats.rating, icon: Star, color: 'bg-amber-500/10 text-amber-500' },
    { label: 'Live Balance', value: `Rs. ${balance.toLocaleString()}`, icon: TrendingUp, color: 'bg-indigo-500/10 text-indigo-500' },
  ];

  return (
    <div className="space-y-10 pb-20 font-['Outfit'] animate-in fade-in duration-500">
      <header className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-indigo-600 rounded-[2.5rem] p-1 shadow-2xl">
              <div className="w-full h-full bg-slate-900 rounded-[2.2rem] flex items-center justify-center overflow-hidden border-4 border-slate-900">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-black text-indigo-500 uppercase">{user?.name?.charAt(0)}</span>
                )}
              </div>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-white italic tracking-tighter">Status: {isOnline ? 'Active' : 'Standby'}</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2 italic">Logged in as {user?.name}</p>
            <button onClick={toggleOnline} className={`mt-4 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isOnline ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
               {isOnline ? 'Go Offline' : 'Set Active'}
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <Link to="/dashboard/provider/services/create" className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-all uppercase tracking-widest text-[10px]">
            New Gig
          </Link>
          <Link to="/profile" className="px-8 py-4 bg-slate-800 text-white font-black rounded-2xl active:scale-95 transition-all uppercase tracking-widest text-[10px]">
            Settings
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] hover:border-indigo-500 transition-all">
            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
              <stat.icon size={24} />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</p>
            <h3 className="text-3xl font-black text-white tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black text-white italic px-4">Transaction Ledger</h2>
          <div className="space-y-4">
             {notifications.map((n, i) => (
                <div key={i} className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-[2rem] flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <Zap className="text-emerald-500" size={24} />
                      <div>
                         <h4 className="text-white font-black text-sm uppercase italic">Credit Success</h4>
                         <p className="text-emerald-400 text-xs">Rs. {n.amount} from {n.clientName}</p>
                      </div>
                   </div>
                   <Badge className="bg-emerald-500 text-white border-none">Live Verified</Badge>
                </div>
             ))}

             {transactions.length > 0 ? (
                transactions.map((txn, i) => (
                   <div key={txn._id || i} className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] hover:bg-slate-800 transition-all">
                      <div className="flex justify-between items-center">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-indigo-500">
                               <Briefcase size={18} />
                            </div>
                            <div>
                               <h4 className="text-white font-black text-sm">{txn.serviceId?.title || 'Secure Payment'}</h4>
                               <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Client: {txn.clientId?.name || 'Authorized Client'}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-white font-black text-lg italic">Rs. {txn.amount.toLocaleString()}</p>
                            <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest">{new Date(txn.createdAt).toLocaleDateString()}</p>
                         </div>
                      </div>
                   </div>
                ))
             ) : (
                <div className="bg-slate-900 border border-slate-800 p-16 rounded-[3rem] text-center">
                   <ClipboardList size={40} className="mx-auto text-slate-700 mb-4" />
                   <p className="text-slate-500 font-bold italic uppercase tracking-widest text-xs">Ledger Clear</p>
                </div>
             )}
          </div>
        </div>

        <div className="space-y-8">
           <LocationSender bookingId="DEMO" userId={user?._id} />
           <div className="bg-indigo-600 rounded-[3rem] p-10 text-white">
              <h3 className="text-2xl font-black italic">Platform Growth</h3>
              <p className="text-indigo-100 text-sm mt-4 font-medium italic">Complete 2 more orders to unlock Professional status.</p>
           </div>
           <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10">
              <h3 className="text-white font-black uppercase tracking-widest text-sm border-b border-slate-800 pb-4 italic">Shortcuts</h3>
              <Link to="/active-hires" className="flex items-center gap-4 mt-6 group">
                 <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Stars size={18} />
                 </div>
                 <div>
                    <h4 className="text-white font-black text-xs uppercase tracking-widest italic">Sales Pipeline</h4>
                    <p className="text-slate-600 text-[10px] font-medium uppercase tracking-widest mt-1">Manage Hires</p>
                 </div>
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
