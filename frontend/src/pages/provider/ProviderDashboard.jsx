import React from 'react';
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
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const ProviderDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Services', value: '12', icon: Briefcase, color: 'bg-blue-500/10 text-blue-500' },
    { label: 'Active Applications', value: '45', icon: Users, color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Avg. Rating', value: '4.9', icon: Star, color: 'bg-amber-500/10 text-amber-500' },
    { label: 'Total Earnings', value: '$2,450', icon: TrendingUp, color: 'bg-purple-500/10 text-purple-500' },
  ];

  const recentActivity = [
    { id: 1, type: 'application', title: 'Home Plumbing Repair', status: 'In Review', time: '2 hours ago' },
    { id: 2, type: 'message', title: 'New message from John Doe', status: 'Unread', time: '5 hours ago' },
    { id: 3, type: 'hired', title: 'Office Cleaning Service', status: 'Hired', time: '1 day ago' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name || 'Freelancer'}! 👋</h1>
          <p className="text-slate-400">Here's what's happening with your services today.</p>
        </div>
        <div className="flex gap-4">
          <Link 
            to="/dashboard/provider/services/create"
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            <PlusCircle size={20} />
            Post a Service
          </Link>
          <Link 
            to="/jobs"
            className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all border border-slate-700/50 active:scale-95"
          >
            <Search size={20} />
            Browse Jobs
          </Link>
        </div>
      </header>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 p-6 rounded-3xl group hover:border-indigo-500/30 transition-all duration-300">
            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-slate-800/50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="text-indigo-500" size={20} />
              Recent Activity
            </h2>
            <button className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors">View All</button>
          </div>
          <div className="divide-y divide-slate-800/50">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-6 flex items-center justify-between hover:bg-slate-800/20 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors">
                    {activity.type === 'application' && <ClipboardList size={18} />}
                    {activity.type === 'message' && <MessageSquare size={18} />}
                    {activity.type === 'hired' && <Users size={18} />}
                  </div>
                  <div>
                    <h4 className="text-white font-medium group-hover:text-indigo-300 transition-colors">{activity.title}</h4>
                    <p className="text-sm text-slate-400">{activity.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    activity.status === 'Hired' ? 'bg-emerald-500/10 text-emerald-500' :
                    activity.status === 'Unread' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-indigo-500/10 text-indigo-500'
                  }`}>
                    {activity.status}
                  </span>
                  <ChevronRight size={18} className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar/Quick Profile Card */}
        <div className="space-y-6">
          <div className="bg-indigo-600 rounded-3xl p-6 text-white relative overflow-hidden group shadow-xl shadow-indigo-500/20">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Build your profile</h3>
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                Complete your profile to increase your chances of being hired by 40%.
              </p>
              <Link to="/profile/edit" className="inline-block bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg transition-all active:scale-95">
                Edit Profile
              </Link>
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl"></div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-6">
            <h3 className="text-white font-bold mb-4">Quick Tips</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0"></span>
                Reply to customer messages within 24 hours to keep your response rate high.
              </li>
              <li className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 shrink-0"></span>
                Add high-quality photos to your services to build trust with customers.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
