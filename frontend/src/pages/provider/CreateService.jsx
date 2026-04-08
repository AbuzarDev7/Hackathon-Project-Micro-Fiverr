import React, { useState } from 'react';
import { 
  Plus, 
  ArrowLeft, 
  DollarSign, 
  Tag, 
  AlignLeft, 
  Type,
  LayoutGrid,
  Sparkles,
  Save,
  CheckCircle2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CreateService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Plumbing',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = ['Plumbing', 'Electrical', 'Tutoring', 'Cleaning', 'Other'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Connect to API (POST /api/services)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => navigate('/dashboard/provider/services'), 2000);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/10">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Service Created Successfully! 🎉</h2>
        <p className="text-slate-400">Redirecting to your services list...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center gap-4">
        <Link 
          to="/dashboard/provider/services" 
          className="p-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 rounded-2xl transition-all active:scale-90"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 leading-tight">Post a New Service</h1>
          <p className="text-slate-400 text-sm">Tell your clients what you can do for them.</p>
        </div>
      </header>

      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-[40px] p-8 md:p-12 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title field */}
            <div className="md:col-span-2 space-y-3 group">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-300 group-focus-within:text-indigo-400 transition-colors uppercase tracking-widest pl-1">
                <Type size={16} />
                Service Title
              </label>
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Professional High-Rise Window Cleaning"
                className="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl py-4 px-6 text-white text-lg placeholder-slate-600 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
              />
            </div>

            {/* Price field */}
            <div className="space-y-3 group">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-300 group-focus-within:text-emerald-400 transition-colors uppercase tracking-widest pl-1">
                <DollarSign size={16} />
                Starting Price
              </label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                <input
                  required
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl py-4 pl-12 pr-6 text-white text-lg placeholder-slate-600 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Category field */}
            <div className="space-y-3 group">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-300 group-focus-within:text-purple-400 transition-colors uppercase tracking-widest pl-1">
                <LayoutGrid size={16} />
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl py-4 px-6 text-white text-lg outline-none appearance-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all font-medium cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-slate-900 py-3">{cat}</option>
                  ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <Tag size={18} />
                </div>
              </div>
            </div>

            {/* Description field */}
            <div className="md:col-span-2 space-y-3 group">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-300 group-focus-within:text-indigo-400 transition-colors uppercase tracking-widest pl-1">
                <AlignLeft size={16} />
                Detailed Description
              </label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                placeholder="Describe your service in detail..."
                className="w-full bg-slate-800/40 border border-slate-700/50 rounded-[32px] py-5 px-7 text-white text-lg placeholder-slate-600 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium resize-none leading-relaxed"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-3 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] text-white font-black rounded-3xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save size={22} className="group-hover:scale-110 transition-transform" />
                  Publish Service
                </>
              )}
            </button>
            <Link
              to="/dashboard/provider/services"
              className="flex items-center justify-center gap-2 px-8 py-5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-3xl font-bold transition-all border border-slate-700/50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>

      {/* Pro tip card */}
      <div className="bg-indigo-600/5 border border-indigo-500/10 rounded-[32px] p-6 flex gap-5 items-center">
        <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center shrink-0 text-indigo-400">
          <Sparkles size={32} />
        </div>
        <div>
          <h4 className="text-indigo-300 font-bold mb-1">Pro Tip: Standing Out</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            Successful providers use clear titles and detailed descriptions. For example, instead of "Plumbing", use "24/7 Professional Leak Repair & Pipe Installation".
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateService;
