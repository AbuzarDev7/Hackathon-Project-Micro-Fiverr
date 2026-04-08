import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  MessageSquare, 
  ChevronRight,
  Zap,
  Tag
} from 'lucide-react';

const ServiceListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    location: '',
    minPrice: '',
    maxPrice: ''
  });

  const categories = ['All', 'Plumbing', 'Electrical', 'Tutoring', 'Cleaning', 'Painting', 'Other'];

  const services = [
    { 
      id: '1', 
      title: 'Professional Home Plumbing & Leakage Fix', 
      price: '2,500', 
      location: 'Karachi', 
      category: 'Plumbing', 
      provider: 'Zain Ahmed', 
      rating: 4.8, 
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: '2', 
      title: 'Expert Math & Physics Home Tuition', 
      price: '8,000', 
      location: 'Lahore', 
      category: 'Tutoring', 
      provider: 'Ms. Sarah', 
      rating: 4.9, 
      reviews: 86,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: '3', 
      title: 'Full House Deep Cleaning Service', 
      price: '12,000', 
      location: 'Islamabad', 
      category: 'Cleaning', 
      provider: 'CleanPro Services', 
      rating: 4.7, 
      reviews: 210,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: '4', 
      title: 'AC Master Service & Gas Refill', 
      price: '3,500', 
      location: 'Karachi', 
      category: 'Other', 
      provider: 'Safeer AC Tech', 
      rating: 4.6, 
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1599839575945-a98f09756f9b?auto=format&fit=crop&q=80&w=800'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 font-['Outfit'] space-y-12 animate-in fade-in duration-700">
      {/* 🚀 HEADER */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Find Top Local Experts</h1>
        <p className="text-slate-500 font-medium tracking-tight">Hire verified professionals for your home projects and tasks.</p>
      </div>

      {/* 🔍 SEARCH & FILTERS */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col lg:flex-row gap-6 items-end">
        <div className="flex-1 w-full space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Key Search</label>
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="What are you looking for?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-slate-800"
            />
          </div>
        </div>

        <div className="w-full lg:w-48 space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Category</label>
          <select 
            className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-indigo-400 transition-all font-medium text-slate-800 appearance-none cursor-pointer"
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="w-full lg:w-48 space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Min. Price</label>
          <input 
            type="number"
            placeholder="Min Rs."
            className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-indigo-400 transition-all font-medium text-slate-800"
          />
        </div>

        <button className="w-full lg:w-auto px-10 py-5 bg-indigo-600 hover:bg-black text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 group">
          <Filter size={18} />
          Filter Results
        </button>
      </div>

      {/* 💼 SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div 
            key={service.id}
            className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col h-full"
          >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
               <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute top-4 right-4 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-indigo-600 font-black text-[10px] uppercase tracking-widest shadow-sm">
                 {service.category}
               </div>
            </div>

            <div className="p-8 flex flex-col flex-1 justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Star size={16} fill="currentColor" className="text-amber-400" />
                    <span className="text-sm font-black text-slate-800">{service.rating}</span>
                    <span className="text-[11px] font-bold text-slate-400">({service.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs">
                    <MapPin size={14} />
                    {service.location}
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {service.title}
                </h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between items-end">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">Starting from</span>
                      <span className="text-2xl font-black text-slate-900">Rs. {service.price}</span>
                   </div>
                   <div className="w-10 h-10 bg-slate-50 group-hover:bg-indigo-50 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-indigo-600 transition-colors">
                      <Tag size={18} />
                   </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                   <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-500 text-xs shadow-inner">
                      {service.provider.charAt(0)}
                   </div>
                   <div className="flex-1 overflow-hidden">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-0.5 leading-none">Provider</p>
                      <p className="text-sm font-black text-slate-700 truncate">{service.provider}</p>
                   </div>
                   <Link 
                     to="/dashboard/client/chat"
                     className="w-10 h-10 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-sm"
                   >
                     <MessageSquare size={16} />
                   </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="py-32 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
          <Zap size={80} className="text-slate-200 mx-auto mb-6" />
          <h3 className="text-3xl font-black text-slate-800 mb-2">No services found</h3>
          <p className="text-slate-500 font-medium">Try different keywords or filters.</p>
        </div>
      )}
    </div>
  );
};

export default ServiceListing;
