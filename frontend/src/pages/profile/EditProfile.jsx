import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { 
  User, 
  MapPin, 
  Image as ImageIcon, 
  Save, 
  ArrowLeft, 
  ShieldCheck, 
  Camera,
  CheckCircle2,
  Phone,
  BookOpen,
  Wrench,
  X
} from 'lucide-react';

const EditProfile = () => {
  const { user, token, updateUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    avatar: user?.avatar || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
    skills: user?.skills || [],
    languages: user?.languages || [],
    portfolioUrl: user?.portfolioUrl || '',
    experienceLevel: user?.experienceLevel || 'Beginner',
    education: user?.education || '',
    certificates: user?.certificates || [],
    lat: user?.lat || null,
    long: user?.long || null
  });
  const [newSkill, setNewSkill] = useState('');
  const [newLang, setNewLang] = useState('');
  const [newCert, setNewCert] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Cloudinary Widget Setup
  const handleUpload = () => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dfu6dxt8o',
        uploadPreset: 'user-img',
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Upload success:", result.info);
          setFormData(prev => ({ ...prev, avatar: result.info.secure_url }));
        }
      }
    );
    myWidget.open();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addItem = (field, value, clearFn) => {
    if (value.trim() && !formData[field].includes(value.trim())) {
      setFormData({ ...formData, [field]: [...formData[field], value.trim()] });
      clearFn('');
    }
  };

  const removeItem = (field, itemToRemove) => {
    setFormData({ ...formData, [field]: formData[field].filter(i => i !== itemToRemove) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const res = await axios.put('/api/auth/profile', formData, config);
      if (res.data?.user) {
        updateUser(res.data.user);
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const isFreelancer = user?.role === 'freelancer';

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 font-['Outfit'] space-y-10 animate-in fade-in duration-700">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-90 shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-1 leading-none tracking-tight">Profile Settings</h1>
            <p className="text-slate-500 font-medium text-sm">Manage your professional identity and presence.</p>
          </div>
        </div>
        {success && (
          <div className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 font-black text-sm flex items-center gap-2 animate-in slide-in-from-right-4">
             <CheckCircle2 size={18} />
             Changes Saved!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT COLUMN: PREVIEW & STATS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-10 border border-slate-100 rounded-[3rem] shadow-sm flex flex-col items-center text-center space-y-6 sticky top-28">
            <div className="relative group p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-indigo-500 rounded-[2.5rem] shadow-2xl shadow-indigo-100">
                <div 
                  onClick={handleUpload}
                  className="w-32 h-32 bg-white rounded-[2.2rem] flex items-center justify-center text-indigo-600 text-4xl font-black overflow-hidden relative border-4 border-white cursor-pointer"
                >
                  {formData.avatar ? (
                    <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
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
            <div className="px-6 py-2 bg-indigo-50 text-indigo-600 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 border border-indigo-100">
                <ShieldCheck size={12} />
                {user?.role?.toUpperCase() || 'USER'}
            </div>

            {isFreelancer && (
              <div className="w-full pt-6 border-t border-slate-50 space-y-4">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400 uppercase">Experience</span>
                  <span className="text-indigo-600">{formData.experienceLevel}</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400 uppercase">Languages</span>
                  <span className="text-slate-900">{formData.languages.length} Added</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: FULL FORM */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 border border-slate-100 rounded-[3.5rem] shadow-2xl shadow-indigo-100/50 space-y-10 relative overflow-hidden">
             
             {/* BASIC INFO SECTION */}
             <div className="space-y-6">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                   <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600"><User size={16} /></div>
                   Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 group">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 block group-focus-within:text-indigo-600 transition-colors">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-[1.4rem] text-slate-800 text-base outline-none transition-all focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 font-medium"
                        required
                      />
                    </div>
                    <div className="space-y-3 group">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 block group-focus-within:text-indigo-600 transition-colors">Phone Number</label>
                      <input 
                        type="text" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-[1.4rem] text-slate-800 text-base outline-none transition-all focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 font-medium"
                      />
                    </div>
                </div>
                <div className="space-y-3 group">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 block group-focus-within:text-indigo-600 transition-colors">Location</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="flex-grow px-6 py-4 bg-slate-50 border border-transparent rounded-[1.4rem] text-slate-800 text-base outline-none transition-all focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition((pos) => {
                            setFormData(prev => ({ 
                              ...prev, 
                              lat: pos.coords.latitude, 
                              long: pos.coords.longitude,
                              location: "GPS Coordinates Pinned"
                            }));
                          });
                        }
                      }}
                      className="px-6 bg-slate-900 text-white rounded-[1.4rem] font-black text-[10px] uppercase hover:bg-indigo-600 transition-all"
                    >
                      PIN GPS
                    </button>
                  </div>
                </div>
             </div>

             {/* PROFESSIONAL SECTION */}
             <div className="space-y-6 pt-6 border-t border-slate-50">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                   <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600"><Wrench size={16} /></div>
                   Professional Details
                </h2>
                
                <div className="space-y-3 group">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 block group-focus-within:text-indigo-600 transition-colors">Bio / Summary</label>
                  <textarea 
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-[1.8rem] text-slate-800 text-base outline-none transition-all focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 font-medium resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 group">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 block group-focus-within:text-indigo-600 transition-colors">Portfolio URL</label>
                      <input 
                        type="url" 
                        name="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={handleChange}
                        placeholder="https://yourportfolio.com"
                        className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-[1.4rem] text-slate-800 text-base outline-none transition-all focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 font-medium"
                      />
                    </div>
                    <div className="space-y-3 group">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 block group-focus-within:text-indigo-600 transition-colors">Experience Level</label>
                      <select 
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-[1.4rem] text-slate-800 text-base outline-none transition-all focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 font-medium appearance-none"
                      >
                        <option value="Beginner">Beginner (&lt; 2 years)</option>
                        <option value="Intermediate">Intermediate (2-5 years)</option>
                        <option value="Expert">Expert (5+ years)</option>
                      </select>
                    </div>
                </div>

                <div className="space-y-6">
                  {/* Skills */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 block">Skills</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('skills', newSkill, setNewSkill))}
                        placeholder="Add skill..."
                        className="flex-grow px-6 py-4 bg-slate-50 border border-transparent rounded-[1.2rem] text-sm font-medium outline-none focus:bg-white focus:border-indigo-400"
                      />
                      <button type="button" onClick={() => addItem('skills', newSkill, setNewSkill)} className="bg-indigo-600 text-white px-6 rounded-2xl font-black text-[10px] uppercase">ADD</button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.skills.map(s => (
                        <span key={s} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full font-bold text-[11px] flex items-center gap-2 border border-indigo-100">
                          {s} <X size={12} className="cursor-pointer" onClick={() => removeItem('skills', s)} />
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 block">Languages</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newLang}
                        onChange={(e) => setNewLang(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('languages', newLang, setNewLang))}
                        placeholder="Add language..."
                        className="flex-grow px-6 py-4 bg-slate-50 border border-transparent rounded-[1.2rem] text-sm font-medium outline-none focus:bg-white focus:border-indigo-400"
                      />
                      <button type="button" onClick={() => addItem('languages', newLang, setNewLang)} className="bg-indigo-600 text-white px-6 rounded-2xl font-black text-[10px] uppercase">ADD</button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.languages.map(l => (
                        <span key={l} className="px-3 py-1.5 bg-violet-50 text-violet-600 rounded-full font-bold text-[11px] flex items-center gap-2 border border-violet-100">
                          {l} <X size={12} className="cursor-pointer" onClick={() => removeItem('languages', l)} />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
             </div>

             {/* EDUCATION & CERTIFICATES */}
             <div className="space-y-6 pt-6 border-t border-slate-50">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                   <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600"><BookOpen size={16} /></div>
                   Education & Certificates
                </h2>
                <div className="space-y-3 group">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 block group-focus-within:text-indigo-600 transition-colors">Education</label>
                  <input 
                    type="text" 
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="e.g. BS in Computer Science"
                    className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-[1.4rem] text-slate-800 text-base outline-none transition-all focus:bg-white focus:border-indigo-400 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 block">Certificates</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newCert}
                      onChange={(e) => setNewCert(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('certificates', newCert, setNewCert))}
                      placeholder="e.g. AWS Certified Developer"
                      className="flex-grow px-6 py-4 bg-slate-50 border border-transparent rounded-[1.2rem] text-sm font-medium outline-none focus:bg-white focus:border-indigo-400"
                    />
                    <button type="button" onClick={() => addItem('certificates', newCert, setNewCert)} className="bg-indigo-600 text-white px-6 rounded-2xl font-black text-[10px] uppercase">ADD</button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.certificates.map(c => (
                      <span key={c} className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full font-bold text-[11px] flex items-center gap-2 border border-emerald-100">
                        {c} <X size={12} className="cursor-pointer" onClick={() => removeItem('certificates', c)} />
                      </span>
                    ))}
                  </div>
                </div>
             </div>

             {/* SAVE BUTTON */}
             <div className="pt-10">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-indigo-600 hover:bg-black text-white font-black text-lg rounded-[2rem] flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-100 hover:-translate-y-1 active:translate-y-0 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : (
                    <>
                      <Save size={22} />
                      Save Professional Profile
                    </>
                  )}
                </button>
             </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
