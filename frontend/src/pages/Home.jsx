import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState(5000);
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

  const categoriesList = ['All', 'Home Service', 'Technical', 'Education', 'Events', 'Design', 'Commercial', 'Other'];

  const steps = [
    { 
      title: 'Post a Job', 
      desc: 'Describe your task, set your budget, and post it for local pros to see.', 
      icon: ClipboardList, 
      color: 'bg-indigo-600' 
    },
    { 
      title: 'Get Applicants', 
      desc: 'Skilled providers in your area will apply for your job instantly.', 
      icon: Users, 
      color: 'bg-indigo-600' 
    },
    { 
      title: 'Hire & Done', 
      desc: 'Choose the best pro, chat with them, and get your work finished.', 
      icon: CheckCircle, 
      color: 'bg-indigo-600' 
    },
  ];

  const categoryIcons = [
    { name: 'Plumbing', icon: Droplets, color: 'bg-blue-50 text-blue-600' },
    { name: 'Electrical', icon: Zap, color: 'bg-amber-50 text-amber-600' },
    { name: 'Tutoring', icon: BookOpen, color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Cleaning', icon: Wind, color: 'bg-cyan-50 text-cyan-600' },
    { name: 'Painting', icon: Brush, color: 'bg-rose-50 text-rose-600' },
    { name: 'Other', icon: Layers, color: 'bg-slate-50 text-slate-600' },
  ];

  const filteredServices = services.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.location?.toLowerCase().includes(search.toLowerCase()) ||
      job.providerId?.name?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || job.category === category;
    const matchesLocation =
      location === '' || job.location?.toLowerCase().includes(location.toLowerCase());
    const matchesPrice = job.budget <= priceRange;
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  const handleHireClick = (serviceId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/services/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-white font-['Inter']">
      
      {/* 🚀 HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/5 -skew-x-12 translate-x-1/4"></div>
        <div className="container mx-auto px-6 relative z-10 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight tracking-tight font-['Outfit']">
              Find Trusted <span className="text-indigo-600 underline decoration-indigo-200">Local Services</span> Near You
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium lg:pr-20">
              Connect with top-rated plumbers, electricians, tutors and more in your neighborhood. Get things done fast.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
              <Link 
                to="/dashboard" 
                className="w-full sm:w-auto bg-indigo-600 hover:bg-black text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 group hover:-translate-y-1 shadow-xl shadow-indigo-100"
              >
                <PlusCircle size={22} className="group-hover:rotate-90 transition-transform" />
                Get Started
              </Link>
              <a 
                href="#marketplace" 
                className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:border-indigo-600 text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
              >
                <Search size={22} />
                Browse Services
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
             <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1469" 
                  alt="Professional Service" 
                  className="w-full aspect-[4/5] object-cover"
                />
             </div>
          </div>
        </div>
      </section>

      {/* ── Search & Filter Bar ── */}
      <div id="marketplace" className="bg-white border-b border-slate-100 sticky top-[72px] z-30 py-4 px-4 lg:px-12 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-center">
          
          {/* Search */}
          <div className="flex-grow w-full flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl focus-within:ring-2 ring-indigo-100 transition-all">
            <Search size={18} className="text-indigo-500 shrink-0" />
            <input
              type="text"
              placeholder="Search services, categories, or freelancers..."
              className="bg-transparent border-none outline-none text-sm font-semibold w-full text-slate-700 placeholder:text-slate-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl min-w-[140px]">
              <MapPin size={16} className="text-indigo-400 shrink-0" />
              <input
                type="text"
                placeholder="Location..."
                className="bg-transparent border-none outline-none text-xs font-bold w-full text-slate-700"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl min-w-[180px]">
              <DollarSign size={16} className="text-emerald-500 shrink-0" />
              <div className="flex-grow flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Max: ${priceRange}</span>
                <input
                  type="range"
                  min="10"
                  max="10000"
                  step="100"
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                />
              </div>
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-xs font-bold text-slate-600 outline-none cursor-pointer hover:bg-slate-100 transition-all"
            >
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Service Cards ── */}
      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Available Services</h2>
          <p className="text-slate-500 text-sm font-semibold">
            <span className="font-black text-slate-900">{filteredServices.length}</span> results
          </p>
        </div>

        {loadingServices ? (
           <div className="flex flex-col items-center justify-center py-20 gap-4">
             <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-slate-500 font-bold">Loading services...</p>
           </div>
        ) : filteredServices.length === 0 ? (
          <div className="py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No matching services</h3>
            <p className="text-slate-500">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredServices.map((job) => (
              <div
                key={job._id}
                className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 flex flex-col"
              >
                {/* Job Image */}
                <div className="h-56 w-full bg-slate-100 relative overflow-hidden">
                  {job.image ? (
                    <img src={job.image} alt={job.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <Layers size={64} strokeWidth={1} />
                    </div>
                  )}
                  <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-black text-indigo-600 uppercase tracking-widest border border-slate-100 shadow-sm z-10">
                    {job.category || 'General'}
                  </div>
                  <div className="absolute bottom-5 right-5 bg-indigo-600 px-4 py-1.5 rounded-full text-sm font-black text-white shadow-lg">
                    ${job.budget}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
                    {job.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                    {job.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-center gap-3 mb-6 pt-6 border-t border-slate-50">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold border border-indigo-100">
                        {job.providerId?.name?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-black text-slate-800">{job.providerId?.name || 'Unknown User'}</p>
                        <div className="flex items-center gap-1.5 text-slate-400 px-0.5">
                          <MapPin size={12} className="text-indigo-300" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">{job.location}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleHireClick(job._id)}
                      className="w-full py-4 bg-slate-900 hover:bg-indigo-600 text-white font-black rounded-2xl transition-all duration-300 shadow-lg active:scale-95"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 📋 HOW IT WORKS */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">How it Works</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">Getting your local tasks done is as easy as 1-2-3.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
            <div className="hidden md:block absolute top-[60px] left-1/4 right-1/4 h-0.5 bg-slate-200 -z-0"></div>
            
            {steps.map((step, i) => (
              <div key={i} className="group flex flex-col items-center relative z-10">
                <div className="w-24 h-24 bg-white border-4 border-slate-100 rounded-[2.5rem] shadow-xl shadow-indigo-100/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative">
                   <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                      <step.icon size={30} />
                   </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed px-6">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📦 CATEGORIES */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">Browse Categories</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">Choose from our wide range of professional local services.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {categoryIcons.map((cat, i) => (
              <button 
                key={i} 
                onClick={() => {
                   setCategory(cat.name);
                   document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex flex-col items-center p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 hover:bg-white"
              >
                <div className={`w-20 h-20 ${cat.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                  <cat.icon size={32} strokeWidth={1.5} />
                </div>
                <span className="text-lg font-black text-slate-800 tracking-tight">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Location Section (Small CTA) ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-indigo-600 rounded-[3rem] p-12 lg:p-20 text-white overflow-hidden relative">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/4"></div>
           <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-grow text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  <Navigation size={14} />
                  Live Tracking Enabled
                </div>
                <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">Real-time Freelancer Tracking</h2>
                <p className="text-indigo-100 text-lg font-medium max-w-2xl">
                  Peace of mind with every booking. Track your hired professional's location in real-time as they head to your job site.
                </p>
              </div>
              <div className="shrink-0">
                 <Link to="/register" className="bg-white text-indigo-600 hover:bg-black hover:text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl active:scale-95 block text-center">
                    Join Now
                 </Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
