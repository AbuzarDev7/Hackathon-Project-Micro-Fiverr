import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  MessageSquare, 
  ChevronRight,
  Zap,
  Tag,
  Layers,
  Sparkles
} from 'lucide-react';

const ServiceListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'All',
    location: '',
    priceRange: 10000
  });

  const categories = ['All', 'Plumbing', 'Electrical', 'Tutoring', 'Cleaning', 'Painting', 'Other', 'Technical', 'Home Service'];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('/api/services');
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.providerId?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filters.category === 'All' || service.category === filters.category;
    const matchesLocation =
      filters.location === '' || service.location?.toLowerCase().includes(filters.location.toLowerCase());
    const matchesPrice = (service.price || 0) <= filters.priceRange;
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 font-['Outfit'] space-y-12 animate-in fade-in duration-700 pb-20">
      {/* 🚀 PREMIUM HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
             <Sparkles size={14} />
             Discover Excellence
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none">Marketplace Gigs</h1>
          <p className="text-slate-500 font-medium text-lg">Hire top-rated freelancers for your next project.</p>
        </div>
        <div className="text-right">
           <span className="text-3xl font-black text-indigo-600">{filteredServices.length}</span>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">Services Available</p>
        </div>
      </div>

      {/* 🔍 DYNAMIC FILTERS */}
      <div className="bg-white p-8 md:p-10 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col lg:flex-row gap-8 items-end">
        <div className="flex-grow w-full space-y-3 group">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 block group-focus-within:text-indigo-600 transition-colors">What service are you looking for?</label>
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500" size={20} />
            <input 
              type="text"
              placeholder="Search by title, skill or provider..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-transparent rounded-[2rem] outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all font-bold text-slate-800 text-lg shadow-inner"
            />
          </div>
        </div>

        <div className="w-full lg:w-56 space-y-3 group">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 block">Location</label>
          <div className="relative">
             <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
             <input 
               type="text"
               placeholder="City name..."
               value={filters.location}
               onChange={(e) => setFilters({...filters, location: e.target.value})}
               className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-transparent rounded-[2rem] outline-none focus:bg-white focus:border-indigo-400 transition-all font-bold text-slate-800 shadow-inner"
             />
          </div>
        </div>

        <div className="w-full lg:w-56 space-y-3 group">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 block">Category</label>
          <div className="relative">
            <Layers className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
            <select 
              className="w-full pl-14 pr-8 py-5 bg-slate-50 border border-transparent rounded-[2rem] outline-none focus:bg-white focus:border-indigo-400 transition-all font-bold text-slate-800 appearance-none cursor-pointer shadow-inner"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* 💼 SERVICES GRID */}
      {loading ? (
        <div className="py-32 flex flex-col items-center justify-center gap-6">
           <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
           <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Curating Best Gigs for you...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredServices.map((service) => (
            <div 
              key={service._id}
              className="group bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-200/40 hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="relative h-52 overflow-hidden bg-slate-100">
                 {service.image ? (
                   <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-slate-300 italic font-black">No Preview</div>
                 )}
                 <div className="absolute top-5 left-5 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-indigo-600 font-black text-[10px] uppercase tracking-widest shadow-sm border border-white/50">
                   {service.category || 'General'}
                 </div>
              </div>

              <div className="p-8 flex flex-col flex-1 justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Star size={16} fill="currentColor" className="text-amber-400" />
                      <span className="text-sm font-black text-slate-900">5.0</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">New Seller</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                      <MapPin size={12} className="text-indigo-400" />
                      {service.location || 'Remote'}
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2 italic">
                    I will {service.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] leading-none mb-1">Starting At</span>
                        <div className="flex items-baseline gap-1">
                           <span className="text-xs font-black text-indigo-600 mb-0.5">PKR</span>
                           <span className="text-2xl font-black text-slate-900 italic tracking-tighter">{service.price}</span>
                        </div>
                     </div>
                     <Link 
                       to={`/services/${service._id}`}
                       className="w-12 h-12 bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white rounded-2xl flex items-center justify-center text-slate-400 transition-all hover:scale-110 shadow-sm"
                     >
                        <ChevronRight size={20} />
                     </Link>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                     <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center font-black text-white text-xs shadow-lg">
                        {service.providerId?.name?.charAt(0) || 'P'}
                     </div>
                     <div className="flex-1 overflow-hidden">
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mb-0.5 leading-none">Pro Developer</p>
                        <p className="text-sm font-black text-slate-800 truncate">{service.providerId?.name || 'Professional'}</p>
                     </div>
                     <Link 
                       to="/chat"
                       state={{
                         introProvider: service.providerId,
                         introMessage: `Hi! I am interested in your gig: "${service.title}"`
                       }}
                       className="w-10 h-10 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-xl flex items-center justify-center transition-all active:scale-95 border border-emerald-100"
                     >
                       <MessageSquare size={16} />
                     </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredServices.length === 0 && (
        <div className="py-32 text-center bg-white rounded-[4rem] border-4 border-dashed border-slate-100">
          <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-slate-200">
             <Search size={48} />
          </div>
          <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">No services found</h3>
          <p className="text-slate-500 font-medium max-w-sm mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default ServiceListing;
