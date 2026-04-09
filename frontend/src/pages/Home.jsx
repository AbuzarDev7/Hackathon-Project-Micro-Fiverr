import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Navigation,
  ClipboardList, 
  Users, 
  CheckCircle, 
  ChevronRight, 
  PlusCircle,
  Droplets,
  Zap,
  BookOpen,
  Brush,
  Wind,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Globe,
  Trophy,
  ZapOff,
  Clock,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { getDistance } from '../utils/geo';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { cn } from '../utils/cn';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('');
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('/api/services');
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  const stats = [
    { label: 'Verified Pros', value: '5,000+', icon: Users, color: 'text-indigo-600' },
    { label: 'Monthly Gigs', value: '12,000+', icon: Briefcase, color: 'text-emerald-600' },
    { label: 'Rating Avg', value: '4.9/5', icon: Star, color: 'text-amber-500' },
    { label: 'Time Saved', value: '250k hrs', icon: Clock, color: 'text-purple-600' },
  ];

  const categoriesList = ['All', 'Home Service', 'Technical', 'Education', 'Events', 'Design'];

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || service.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white font-['Inter'] selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 🚀 ELITE HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-52 lg:pb-48 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_50%)]"></div>
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <Badge variant="secondary" className="px-6 py-2 border-indigo-100 bg-indigo-50/50 text-indigo-700 text-[10px] uppercase font-black tracking-[0.3em] shadow-sm animate-pulse">
                <Sparkles className="w-3 h-3 mr-2" />
                The Future of Local Hiring
              </Badge>
              
              <h1 className="text-7xl lg:text-[10rem] font-black text-slate-900 leading-[0.85] tracking-tighter italic">
                Hire Elite. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Track Live.</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
                Platform for verified local expertise. Connect with pros, book instantly, and track their arrival in real-time.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full max-w-4xl bg-white p-5 rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(79,70,229,0.15)] border border-indigo-50/50 flex flex-col md:flex-row gap-4 items-center"
            >
              <div className="flex-grow w-full relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <Input 
                  placeholder="Need a Code Expert or Plumber?" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="h-16 pl-16 bg-slate-50/50 border-none rounded-3xl font-bold text-lg text-slate-800 focus-visible:ring-2 focus-visible:ring-indigo-100 placeholder:text-slate-300"
                />
              </div>
              <Button onClick={() => document.getElementById('marketplace')?.scrollIntoView({behavior:'smooth'})} size="lg" className="w-full md:w-auto h-16 rounded-[2rem] px-12 bg-indigo-600 hover:bg-black text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-200 transition-all active:scale-95">
                Explore Gigs
              </Button>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-10 pt-10">
               {stats.map((s, i) => (
                 <div key={i} className="text-center group">
                    <p className={cn("text-3xl font-black tracking-tighter italic mb-1 transition-transform group-hover:-translate-y-1", s.color)}>{s.value}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🏙️ FEATURED GRID */}
      <section id="marketplace" className="py-32 bg-slate-50/50 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
               <div className="space-y-6">
                  <Badge className="bg-white text-indigo-600 border-indigo-100 px-6 py-2 uppercase tracking-[0.3em] font-black italic">Live Marketplace</Badge>
                  <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none italic">Verified <br/> <span className="text-indigo-600 font-black">Neighborhood Pros.</span></h2>
               </div>
               <div className="flex flex-wrap gap-3">
                  {categoriesList.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setCategory(cat)}
                      className={cn(
                        "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300",
                        category === cat ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-100" : "bg-white text-slate-500 border-slate-200 hover:border-indigo-400 hover:shadow-lg"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
               </div>
            </div>

            {loadingServices ? (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {[1,2,3].map(i => <div key={i} className="h-[500px] rounded-[3rem] bg-slate-200 animate-pulse"></div>)}
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  <AnimatePresence mode='popLayout'>
                     {filteredServices.slice(0, 6).map((service, idx) => (
                        <motion.div
                          key={service._id}
                          layout
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                           <Card className="group border-none shadow-none bg-transparent hover:-translate-y-4 transition-all duration-700">
                              <CardHeader className="p-0 relative rounded-[3.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] group-hover:shadow-indigo-200 group-hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.25)] transition-all">
                                 <img 
                                   src={service.image || `https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=1000`} 
                                   className="w-full h-[420px] object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" 
                                 />
                                 <div className="absolute top-8 left-8 flex gap-3">
                                    <Badge className="bg-white/90 backdrop-blur-md text-indigo-600 border-none px-6 py-2 font-black uppercase text-[10px] tracking-[0.2em] shadow-lg italic">{service.category}</Badge>
                                 </div>
                                 <div className="absolute top-8 right-8 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-amber-500 shadow-xl">
                                    <Star size={20} fill="currentColor" />
                                 </div>
                                 <div className="absolute bottom-8 left-8 right-8 p-8 bg-white/90 backdrop-blur-xl rounded-[2.5rem] border border-white/50 translate-y-2 group-hover:translate-y-0 transition-transform duration-700 opacity-90">
                                    <div className="flex justify-between items-end">
                                       <div className="space-y-1">
                                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Starting at</p>
                                          <p className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none">Rs. {service.price}</p>
                                       </div>
                                       <div className="flex gap-2">
                                          <Button asChild variant="outline" className="h-14 px-6 rounded-2xl border-slate-200 hover:bg-slate-50 text-slate-900 font-black text-[10px] uppercase tracking-widest transition-all">
                                             <Link to={`/services/${service._id}`}>View Details</Link>
                                          </Button>
                                          <Button asChild className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-black text-white shadow-xl transition-all font-black text-[10px] uppercase tracking-widest">
                                             <Link to={`/checkout/${service._id}`}>Buy Now</Link>
                                          </Button>
                                       </div>
                                    </div>
                                 </div>
                              </CardHeader>
                              <CardContent className="px-4 pt-10 space-y-4">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 font-black text-xs">
                                       {service.providerId?.name?.charAt(0) || 'P'}
                                    </div>
                                    <div className="flex-grow">
                                       <p className="text-sm font-black text-slate-800">{service.providerId?.name || 'Professional'}</p>
                                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                          <MapPin size={10} className="text-indigo-400" />
                                          {service.location}
                                       </p>
                                    </div>
                                 </div>
                                 <h3 className="text-3xl font-black text-slate-900 leading-[0.9] tracking-tighter italic group-hover:text-indigo-600 transition-colors line-clamp-2">
                                    I will {service.title}
                                 </h3>
                              </CardContent>
                           </Card>
                        </motion.div>
                     ))}
                  </AnimatePresence>
               </div>
            )}

            <div className="mt-32 text-center">
               <Button asChild variant="outline" className="h-16 px-12 rounded-3xl border-2 border-slate-900 hover:bg-slate-900 hover:text-white font-black uppercase text-xs tracking-widest transition-all">
                  <Link to="/services">View All 1,000+ Services <ArrowRight className="ml-3 w-5 h-5" /></Link>
               </Button>
            </div>
         </div>
         <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      </section>

      {/* 🛡️ TRUST & LIVE TRACKING SECTION */}
      <section className="py-40 px-6 container mx-auto">
         <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-32 text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)]"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <div className="space-y-12">
                  <div className="inline-flex items-center gap-3 bg-indigo-600/20 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-400 border border-indigo-500/30">
                     <ShieldCheck size={16} />
                     Pakistan's Safest Marketplace
                  </div>
                  <h2 className="text-6xl lg:text-8xl font-black tracking-[calc(-0.04em)] leading-[0.85] italic">
                     Track. <br/> Safety. <br/> <span className="text-indigo-400">Guaranteed.</span>
                  </h2>
                  <p className="text-xl text-slate-400 font-medium max-w-lg leading-relaxed">
                     Every booking comes with a live GPS link. Follow your pro on the map from the moment they leave for your location. 
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <Trophy className="text-indigo-500" size={32} />
                        <h4 className="font-black text-lg">Elite Talent</h4>
                        <p className="text-xs text-slate-500 font-medium">Top 2% vetted experts only.</p>
                     </div>
                     <div className="space-y-2">
                        <Globe className="text-emerald-500" size={32} />
                        <h4 className="font-black text-lg">Countrywide</h4>
                        <p className="text-xs text-slate-500 font-medium">Serving 15+ major cities.</p>
                     </div>
                  </div>
               </div>

               <div className="relative flex justify-center">
                  <div className="w-full aspect-square bg-white shadow-2xl rounded-[4rem] p-10 flex flex-col items-center justify-center text-slate-900 space-y-8 animate-float">
                     <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-700">
                        <Navigation size={40} className="animate-pulse" />
                     </div>
                     <div className="text-center space-y-2">
                        <h3 className="text-4xl font-black tracking-tighter italic">Live Radar</h3>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">Signal Pulse Active</p>
                     </div>
                     <div className="w-full bg-slate-50 p-6 rounded-[2rem] border border-slate-100 space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <span>Signal Strength</span>
                           <span className="text-emerald-500 text-[12px]">98.2%</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: '98%' }}
                             transition={{ duration: 1.5 }}
                             className="h-full bg-indigo-600"
                           ></motion.div>
                        </div>
                     </div>
                     <Button className="w-full h-16 rounded-2xl bg-indigo-600 hover:bg-black text-white font-black uppercase text-xs tracking-widest shadow-2xl">
                        Demo Tracking Link
                     </Button>
                  </div>
                  <div className="absolute inset-0 bg-indigo-500/10 blur-[120px] -z-10 rounded-full scale-110"></div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Home;
