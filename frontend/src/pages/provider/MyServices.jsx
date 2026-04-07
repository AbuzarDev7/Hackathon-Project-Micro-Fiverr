import React, { useState } from 'react';
import { 
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Search,
  Filter,
  LayoutGrid,
  List
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MyServices = () => {
  const [viewMode, setViewMode] = useState('grid');
  
  // Mock data for services
  const services = [
    { 
      id: 1, 
      title: 'Professional Home Plumbing Services', 
      price: 85, 
      category: 'Plumbing', 
      rating: 4.8, 
      reviews: 24,
      image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=300&h=200'
    },
    { 
      id: 2, 
      title: 'Deep House Cleaning & Sanitization', 
      price: 120, 
      category: 'Cleaning', 
      rating: 4.9, 
      reviews: 56,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80&w=300&h=200'
    },
    { 
      id: 3, 
      title: 'Expert Electrical Repair & Wiring', 
      price: 95, 
      category: 'Electrical', 
      rating: 4.7, 
      reviews: 18,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=300&h=200'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Services</h1>
          <p className="text-slate-400">Manage and update your service offerings.</p>
        </div>
        <Link 
          to="/dashboard/provider/services/create"
          className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 whitespace-nowrap"
        >
          <Plus size={20} />
          Create New Service
        </Link>
      </header>

      {/* Filter and View Toggle bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-900/40 p-4 rounded-2xl border border-slate-800/50 backdrop-blur-md">
        <div className="relative w-full sm:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search your services..."
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all font-medium"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <List size={18} />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 text-slate-300 hover:text-white border border-slate-700/50 rounded-xl font-medium transition-all group">
            <Filter size={18} className="group-hover:text-indigo-400" />
            Filters
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-slate-900/50 border border-slate-800/50 rounded-[32px] overflow-hidden group hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-1.5 flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 py-1.5 px-3 bg-black/40 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/10 uppercase tracking-wider">
                  {service.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
                  {service.title}
                </h3>
                
                <div className="flex items-center gap-6 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Price</span>
                    <span className="text-2xl font-black text-indigo-400">${service.price}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="text-amber-500 fill-amber-500" size={16} />
                      <span className="text-white font-bold">{service.rating}</span>
                      <span className="text-slate-500 font-medium text-xs">({service.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800/50 flex gap-3">
                  <Link to={`/dashboard/provider/services/edit/${service.id}`} className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800/80 hover:bg-indigo-600 text-white rounded-2xl font-bold text-sm transition-all active:scale-95">
                    <Edit2 size={16} />
                    Edit
                  </Link>
                  <button className="p-3 bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-500 text-slate-400 rounded-2xl transition-all active:scale-95 border border-transparent hover:border-rose-500/30">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="bg-slate-900/50 border border-slate-800/50 p-4 rounded-[24px] hover:border-indigo-500/30 transition-all flex items-center gap-6 group">
              <img src={service.image} className="w-24 h-24 rounded-2xl object-cover" />
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em]">{service.category}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{service.title}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-indigo-400 font-bold text-xl">${service.price}</span>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Star className="text-amber-500 fill-amber-500" size={14} />
                    <span className="text-white font-semibold">{service.rating}</span>
                    <span className="text-slate-500 font-medium text-xs">({service.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pr-4">
                <button className="p-3 bg-slate-800 hover:bg-indigo-600 text-white rounded-xl transition-all border border-slate-700/50 active:scale-95">
                  <Edit2 size={18} />
                </button>
                <button className="p-3 bg-slate-800 hover:bg-rose-500/20 hover:text-rose-500 text-slate-400 rounded-xl transition-all border border-slate-700/50 active:scale-95">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyServices;
