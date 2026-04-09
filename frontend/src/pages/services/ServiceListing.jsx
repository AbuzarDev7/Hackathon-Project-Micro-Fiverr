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
  Sparkles,
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../utils/cn';

const ServiceListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'All',
    location: '',
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
      service.providerId?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filters.category === 'All' || service.category === filters.category;
    const matchesLocation =
      filters.location === '' || service.location?.toLowerCase().includes(filters.location.toLowerCase());
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-white font-['Inter']">
      
      {/* 🧭 FILTER HEADERBAR */}
      <div className="sticky top-[72px] z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 py-6 px-4 lg:px-12 shadow-sm">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-center">
            <div className="flex-grow w-full relative group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
               <Input 
                 placeholder="Search Gigs (e.g. plumber, repair)..." 
                 value={searchTerm}
                 onChange={e => setSearchTerm(e.target.value)}
                 className="h-14 pl-14 bg-slate-50 border-none shadow-inner rounded-2xl font-bold text-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-100"
               />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
               <div className="relative group min-w-[200px]">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <Input 
                    placeholder="Location Filter..." 
                    value={filters.location}
                    onChange={e => setFilters({...filters, location: e.target.value})}
                    className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-bold text-xs"
                  />
               </div>
               
               <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {categories.map(cat => (
                    <Badge 
                      key={cat} 
                      onClick={() => setFilters({...filters, category: cat})}
                      variant={filters.category === cat ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer px-5 py-2 whitespace-nowrap text-[9px] uppercase font-black tracking-widest transition-all",
                        filters.category === cat ? "bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-100" : "bg-white border-slate-200 text-slate-400 hover:border-indigo-400"
                      )}
                    >
                       {cat}
                    </Badge>
                  ))}
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 space-y-12">
         <div className="flex items-end justify-between px-4">
            <div className="space-y-4">
               <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-none italic">Marketplace <span className="text-indigo-600 underline decoration-indigo-200">Gigs</span></h1>
               <p className="text-slate-500 font-medium text-lg leading-relaxed">Find verified local talent with elite skills.</p>
            </div>
            <div className="text-right">
               <span className="text-4xl font-black text-indigo-600 tracking-tighter italic">{filteredServices.length}</span>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Gigs Found</p>
            </div>
         </div>

         {loading ? (
            <div className="py-40 flex flex-col items-center justify-center gap-6">
               <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
               <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] animate-pulse">Scanning the Neighborhood...</p>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
               {filteredServices.map(service => (
                  <Card key={service._id} className="group border-none shadow-none bg-transparent hover:-translate-y-3 transition-all duration-700">
                     <CardHeader className="p-0 relative rounded-[2.5rem] overflow-hidden">
                        <img 
                          src={service.image || `https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=1000`} 
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-[1.5s]" 
                        />
                        <div className="absolute top-5 left-5">
                           <Badge className="bg-white/90 backdrop-blur-md text-indigo-600 border-none px-4 py-1.5 font-black uppercase text-[10px] tracking-widest italic">{service.category}</Badge>
                        </div>
                        <div className="absolute bottom-5 right-5 flex gap-2">
                           <Link 
                             to="/radar" 
                             state={{ focusFreelancer: service.providerId?._id }}
                             className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-xl hover:bg-black transition-colors"
                             title="View on Map"
                           >
                              <MapPin size={16} />
                           </Link>
                           <Link 
                              to="/chat"
                              state={{ introProvider: service.providerId, introMessage: `Hi! I am interested in your gig: "${service.title}"` }}
                              className="w-10 h-10 bg-white/90 backdrop-blur-md text-slate-900 rounded-xl flex items-center justify-center shadow-lg hover:bg-emerald-500 hover:text-white transition-all"
                           >
                              <MessageSquare size={16} />
                           </Link>
                        </div>
                     </CardHeader>
                     
                     <CardContent className="px-2 pt-8 space-y-4">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-1.5 text-amber-500">
                              <Star size={14} fill="currentColor" />
                              <span className="text-sm font-black text-slate-800">5.0</span>
                           </div>
                           <Badge variant="secondary" className="bg-slate-100 text-slate-500 border-none text-[8px] tracking-[0.2em] px-3">NEW SELLER</Badge>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors italic line-clamp-2 min-h-[3rem]">
                           I will {service.title}
                        </h3>
                     </CardContent>

                     <CardFooter className="px-2 pt-6 flex items-center justify-between border-t border-slate-100">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-[10px] border border-indigo-100 overflow-hidden shadow-sm">
                              {service.providerId?.name?.charAt(0) || 'P'}
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[8px] font-black text-slate-400 tracking-widest uppercase">Expert</span>
                              <span className="text-sm font-black text-slate-800 tracking-tight">{service.providerId?.name || 'Professional'}</span>
                           </div>
                        </div>
                        <div className="text-right">
                           <span className="text-[8px] font-black text-slate-400 tracking-[0.2em] uppercase leading-none block mb-0.5">Starting At</span>
                           <span className="text-xl font-black text-slate-900 italic tracking-tighter">Rs. {service.price}</span>
                        </div>
                     </CardFooter>

                     <div className="px-2 pt-4 pb-2 grid grid-cols-2 gap-2">
                        <Button asChild variant="outline" className="h-14 rounded-2xl border-slate-200 hover:bg-slate-50 font-black text-[10px] uppercase tracking-widest transition-all">
                           <Link to={`/services/${service._id}`}>Details</Link>
                        </Button>
                        <Button asChild className="h-14 rounded-2xl bg-indigo-600 hover:bg-black font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-100 transition-all">
                           <Link to={`/checkout/${service._id}`}>Buy Now</Link>
                        </Button>
                     </div>
                  </Card>
               ))}
            </div>
         )}
      </div>

    </div>
  );
};

export default ServiceListing;
