import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  MapPin, 
  Image as ImageIcon, 
  Save, 
  ArrowLeft, 
  ShieldCheck, 
  Camera,
  CheckCircle2
} from 'lucide-react';

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    profilePic: '' // URL
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: connect API
      // await axios.put('/api/users/profile', formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 font-['Outfit'] space-y-10 animate-in fade-in duration-700">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-90 shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-1 leading-none tracking-tight">Edit Your Profile</h1>
            <p className="text-slate-500 font-medium text-sm">Manage your personal details and identity.</p>
          </div>
        </div>
        {success && (
          <div className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 font-black text-sm flex items-center gap-2 animate-in slide-in-from-right-4">
             <CheckCircle2 size={18} />
             Changes Saved!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* PROFILE PREVIEW */}
        <div className="bg-white p-10 border border-slate-100 rounded-[3rem] shadow-sm flex flex-col items-center text-center space-y-6">
           <div className="relative group p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-indigo-500 rounded-[2.5rem] shadow-2xl shadow-indigo-100">
              <div className="w-32 h-32 bg-white rounded-[2.2rem] flex items-center justify-center text-indigo-600 text-4xl font-black overflow-hidden relative border-4 border-white">
                {formData.profilePic ? (
                  <img src={formData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  formData.name.charAt(0) || 'U'
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                   <Camera size={24} />
                </div>
              </div>
           </div>
           <div>
             <h3 className="text-2xl font-black text-slate-900">{formData.name || 'Your Name'}</h3>
             <div className="flex items-center justify-center gap-2 mt-1 text-slate-400 font-bold text-xs uppercase tracking-widest">
               <MapPin size={12} className="text-indigo-400" />
               {formData.location || 'Location Not Set'}
             </div>
           </div>
           <div className="px-6 py-2 bg-indigo-50 text-indigo-600 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
              <ShieldCheck size={12} />
              Verified Client
           </div>
        </div>

        {/* PROFILE FORM */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3.5rem] shadow-2xl shadow-indigo-100/50 space-y-8 relative overflow-hidden">
             
             {/* Name */}
             <div className="space-y-3 group">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 block group-focus-within:text-indigo-600 transition-colors">Full Name</label>
               <div className="relative">
                 <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-400 transition-colors" size={20} />
                 <input 
                   type="text" 
                   name="name"
                   value={formData.name}
                   onChange={handleChange}
                   placeholder="e.g. Abuzar Dev"
                   className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-transparent rounded-[1.8rem] text-slate-800 text-base outline-none transition-all focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 font-medium"
                   required
                 />
               </div>
             </div>

             {/* Location */}
             <div className="space-y-3 group">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 block group-focus-within:text-indigo-600 transition-colors">Location (City, State)</label>
               <div className="relative">
                 <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-400 transition-colors" size={20} />
                 <input 
                   type="text" 
                   name="location"
                   value={formData.location}
                   onChange={handleChange}
                   placeholder="e.g. Karachi, Sindh"
                   className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-transparent rounded-[1.8rem] text-slate-800 text-base outline-none transition-all focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 font-medium"
                   required
                 />
               </div>
             </div>

             {/* Profile Pic URL */}
             <div className="space-y-3 group">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 block group-focus-within:text-indigo-600 transition-colors">Profile Image URL</label>
               <div className="relative">
                 <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-400 transition-colors" size={20} />
                 <input 
                   type="url" 
                   name="profilePic"
                   value={formData.profilePic}
                   onChange={handleChange}
                   placeholder="https://images.unsplash.com/your-photo..."
                   className="w-full pl-16 pr-8 py-4 bg-slate-50 border border-transparent rounded-[1.8rem] text-slate-800 text-sm outline-none transition-all focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 font-medium"
                 />
               </div>
             </div>

             {/* Save Button */}
             <div className="pt-6">
               <button
                 type="submit"
                 disabled={loading}
                 className="w-full py-5 bg-indigo-600 hover:bg-black text-white font-black text-lg rounded-[2rem] flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-100 hover:-translate-y-1 active:translate-y-0 disabled:opacity-50"
               >
                 {loading ? 'Saving...' : (
                   <>
                     <Save size={22} className="group-hover:scale-110 transition-transform" />
                     Save Changes
                   </>
                 )}
               </button>
             </div>

             {/* Background Shape */}
             <div className="absolute right-0 bottom-0 w-24 h-24 bg-indigo-600/5 -z-10 rounded-tl-[100px]"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
