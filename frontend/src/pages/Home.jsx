<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, DollarSign, Star, MessageCircle, CreditCard, Navigation } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState(5000);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/api/jobs');
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoadingServices(false);
      }
    };
    fetchJobs();
  }, []);

  const categories = ['All', 'Home Service', 'Technical', 'Education', 'Events', 'Design', 'Commercial', 'Other'];

  const filteredServices = services.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.location?.toLowerCase().includes(search.toLowerCase()) ||
      job.postedBy?.name?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || job.category === category;
    const matchesLocation =
      location === '' || job.location?.toLowerCase().includes(location.toLowerCase());
    const matchesPrice = job.budget <= priceRange;
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  const handleHireClick = (jobId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20 pb-20 font-['Inter']">

      {/* ── Hero Banner ── */}
      <div className="bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
          Find Top Freelancers <span className="text-yellow-300">Near You</span>
        </h1>
        <p className="text-indigo-200 text-lg max-w-xl mx-auto mb-8">
          Browse trusted local services. Pay securely, track live location, and leave reviews.
        </p>
        {/* Quick CTA icons */}
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {[
            { icon: '💬', label: 'Chat' },
            { icon: '💳', label: 'Pay Securely' },
            { icon: '📍', label: 'Live Track' },
            { icon: '⭐', label: 'Rate & Review' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 text-sm font-semibold">
              <span>{item.icon}</span>
              <span>{item.label}</span>
=======
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardList, 
  Users, 
  CheckCircle, 
  ChevronRight, 
  Search, 
  PlusCircle,
  Droplets,
  Zap,
  BookOpen,
  Brush,
  Wind,
  Layers
} from 'lucide-react';

const Home = () => {
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

  const categories = [
    { name: 'Plumbing', icon: Droplets, color: 'bg-blue-50 text-blue-600' },
    { name: 'Electrical', icon: Zap, color: 'bg-amber-50 text-amber-600' },
    { name: 'Tutoring', icon: BookOpen, color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Cleaning', icon: Wind, color: 'bg-cyan-50 text-cyan-600' },
    { name: 'Painting', icon: Brush, color: 'bg-rose-50 text-rose-600' },
    { name: 'Other', icon: Layers, color: 'bg-slate-50 text-slate-600' },
  ];

  return (
    <div className="min-h-screen bg-white">
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
                to="/dashboard/client/post-job" 
                className="w-full sm:w-auto bg-indigo-600 hover:bg-black text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 group hover:-translate-y-1 shadow-xl shadow-indigo-100"
              >
                <PlusCircle size={22} className="group-hover:rotate-90 transition-transform" />
                Post a Job
              </Link>
              <Link 
                to="/jobs" 
                className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:border-indigo-600 text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
              >
                <Search size={22} />
                Browse Services
              </Link>
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
            </div>
          ))}
        </div>
      </div>

      {/* ── Search & Filter Bar ── */}
      <div className="bg-white border-b border-slate-100 sticky top-16 z-30 py-4 px-4 lg:px-12 shadow-sm">
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
            {/* Location */}
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

            {/* Price Range */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl min-w-[180px]">
              <DollarSign size={16} className="text-emerald-500 shrink-0" />
              <div className="flex-grow flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Max: ${priceRange}</span>
                <input
                  type="range"
                  min="10"
                  max="5000"
                  step="10"
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-xs font-bold text-slate-600 outline-none cursor-pointer hover:bg-slate-100 transition-all"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="hidden lg:block relative">
             <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1469" 
                  alt="Professional Service" 
                  className="w-full aspect-[4/5] object-cover"
                />
             </div>
             {/* Decorative element */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl -z-10 animate-pulse"></div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* ── Service Cards ── */}
      <div className="max-w-7xl mx-auto px-4 lg:px-12 mt-10">
        <div className="flex justify-between items-center mb-6">
          <p className="text-slate-500 text-sm font-semibold">
            <span className="font-black text-slate-900">{filteredServices.length}</span> services found
          </p>
        </div>

        {filteredServices.length === 0 ? (
          <div className="py-32 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No matching services</h3>
            <p className="text-slate-500">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {loadingServices ? (
               <div className="col-span-full py-20 text-center">Loading jobs...</div>
            ) : filteredServices.map((job) => (
              <div
                key={job._id}
                className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-400 flex flex-col justify-between relative"
              >
                {/* Job Image */}
                <div className="h-44 w-full bg-slate-100 relative overflow-hidden shrink-0">
                  {job.image ? (
                    <img src={job.image} alt={job.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <Search size={48} strokeWidth={1} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-indigo-600 uppercase tracking-widest border border-slate-100 shadow-sm z-10">
                    {job.category || 'General'}
                  </div>
                </div>

                <div className="p-6 relative z-10">
                  {/* Category + Price */}
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xl font-black text-emerald-600">${job.budget}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
                    {job.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-5 line-clamp-2">
                    {job.description}
                  </p>

                  {/* Provider Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200">
                      {job.postedBy?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{job.postedBy?.name || 'Unknown'}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-400">Posted At: {new Date(job.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-50 gap-2">
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                    <MapPin size={12} className="text-indigo-400" />
                    {job.location}
                  </div>

                  <div className="flex gap-2">
                    {/* View Details Button */}
                    <button
                      onClick={() => handleHireClick(job._id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all text-xs shadow-md"
                      title="View Details"
                    >
                      View Job
                    </button>
                  </div>
                </div>
=======
      {/* 📋 HOW IT WORKS */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">How it Works</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">Getting your local tasks done is as easy as 1-2-3.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
            {/* Connecting lines (hidden on mobile) */}
            <div className="hidden md:block absolute top-[60px] left-1/4 right-1/4 h-0.5 bg-slate-100 -z-10"></div>
            
            {steps.map((step, i) => (
              <div key={i} className="group flex flex-col items-center">
                <div className="w-24 h-24 bg-white border-4 border-slate-50 rounded-[2rem] shadow-xl shadow-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative bg-white z-10">
                   <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-white`}>
                      <step.icon size={30} />
                   </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed px-6">
                  {step.desc}
                </p>
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
              </div>
            ))}
          </div>
        )}

<<<<<<< HEAD
        {/* ── Live Location Section ── */}
        <div id="live-location" className="mt-16 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <Navigation size={20} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Live Freelancer Tracking</h2>
              <p className="text-slate-400 text-sm">Track your hired freelancer's location in real-time</p>
            </div>
          </div>
          <div className="w-full h-72 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 flex flex-col items-center justify-center gap-4 text-slate-400">
            <div className="text-5xl animate-bounce">📍</div>
            <p className="font-bold text-slate-500">Hire a freelancer to enable live tracking</p>
            <p className="text-sm text-slate-400">Real-time GPS location will appear here after booking</p>
=======
      {/* 📦 CATEGORIES */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">Browse Categories</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">Choose from our wide range of professional local services.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {categories.map((cat, i) => (
              <Link 
                key={i} 
                to={`/services?category=${cat.name.toLowerCase()}`}
                className="group flex flex-col items-center p-8 bg-white border border-slate-100 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2"
              >
                <div className={`w-20 h-20 ${cat.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <cat.icon size={32} strokeWidth={1.5} />
                </div>
                <span className="text-lg font-black text-slate-800 tracking-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
          
          <div className="mt-20">
            <Link to="/services" className="inline-flex items-center justify-center gap-2 text-indigo-600 font-black text-lg hover:gap-4 transition-all group">
              Browse All Services
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 👣 FOOTER */}
      <footer className="bg-slate-900 py-20 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 pb-20 border-b border-white/10">
            <div>
              <Link to="/" className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-black text-xl">M</div>
                  <span className="text-3xl font-black tracking-tighter text-white">Micro<span className="text-indigo-400">Fiverr</span></span>
              </Link>
              <p className="text-slate-400 font-medium leading-relaxed italic">
                Connecting you with the best local workers since 2026.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-black mb-8 text-white">For Clients</h4>
              <ul className="space-y-4 text-slate-400 font-bold">
                <li><Link to="/dashboard/client/post-job" className="hover:text-indigo-400 transition-colors">Post a Job</Link></li>
                <li><Link to="/services" className="hover:text-indigo-400 transition-colors">Find Providers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-black mb-8 text-white">For Providers</h4>
              <ul className="space-y-4 text-slate-400 font-bold">
                <li><Link to="/jobs" className="hover:text-indigo-400 transition-colors">Browse Job Listings</Link></li>
                <li><Link to="/register" className="hover:text-indigo-400 transition-colors">Begin Selling</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-black mb-8 text-white">Company</h4>
              <ul className="space-y-4 text-slate-400 font-bold">
                <li><Link to="#" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-indigo-400 transition-colors">Our Careers</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-slate-500 font-black text-xs uppercase tracking-widest">
            <p>© 2026 MICROFIVERR INC. BY SMIT BATCH 01.</p>
            <div className="flex gap-10">
              <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms</Link>
            </div>
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
