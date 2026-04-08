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
        </div>
      </div>

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
              </div>
            ))}
          </div>
        )}

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
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
