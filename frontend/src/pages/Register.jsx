import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, User, Mail, Lock, ShieldCheck, ArrowRight, UserPlus, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { cn } from '../utils/cn';

const Register = () => {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      return setError('Please fill in all required fields.');
    }

    setLoading(true);
    try {
      const result = await register(formData);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 font-['Inter']">
        <Card className="w-full max-w-[500px] border-none shadow-2xl shadow-emerald-100 rounded-[3rem] p-8 text-center bg-white animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-50 active:scale-95 transition-all">
            <ShieldCheck size={48} />
          </div>
          <CardTitle className="text-4xl font-black text-slate-900 mb-4 tracking-tighter italic">Elite Status Secured</CardTitle>
          <CardDescription className="text-slate-500 font-medium text-lg leading-relaxed">
             Welcome to the inner circle. Your account was created successfully. <br/> Redirecting to secure login...
          </CardDescription>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 lg:p-12 bg-slate-50 font-['Inter'] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <Card className="w-full max-w-[640px] border-none shadow-2xl shadow-indigo-100/50 rounded-[3.5rem] p-6 lg:p-10 bg-white/80 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-700">
        <CardHeader className="text-center pb-12 space-y-4">
           <div className="mx-auto w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-100 mb-2 relative">
              <UserPlus size={28} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
           </div>
           <CardTitle className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter italic">Join The Community</CardTitle>
           <CardDescription className="text-slate-500 font-medium">Pakistan's most reliable local services marketplace.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="md:col-span-2 space-y-2 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 group-focus-within:text-indigo-600 transition-colors">Digital Identity (Name)</label>
              <div className="relative">
                 <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" size={18} />
                 <Input
                   type="text"
                   name="name"
                   value={formData.name}
                   onChange={handleChange}
                   placeholder="e.g. Abuzar Developer"
                   className="h-14 pl-14 bg-slate-50 border-none rounded-2xl font-bold text-slate-800"
                   required
                 />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Official Email</label>
              <div className="relative">
                 <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <Input
                   type="email"
                   name="email"
                   value={formData.email}
                   onChange={handleChange}
                   placeholder="name@gmail.com"
                   className="h-14 pl-14 bg-slate-50 border-none rounded-2xl font-bold text-slate-800"
                   required
                 />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Operational Base</label>
              <div className="relative">
                 <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <Input
                   type="text"
                   name="location"
                   value={formData.location}
                   onChange={handleChange}
                   placeholder="Karachi, Sindh"
                   className="h-14 pl-14 bg-slate-50 border-none rounded-2xl font-bold text-slate-800"
                   required
                 />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Select Purpose</label>
              <div className="relative">
                 <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none" size={18} />
                 <select
                   name="role"
                   value={formData.role}
                   onChange={handleChange}
                   className="w-full h-14 pl-14 pr-6 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
                 >
                   <option value="client">Hiring Talents (Client)</option>
                   <option value="freelancer">Selling Skills (Freelancer)</option>
                 </select>
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Secure Key</label>
              <div className="relative">
                 <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <Input
                   type="password"
                   name="password"
                   value={formData.password}
                   onChange={handleChange}
                   placeholder="••••••••"
                   className="h-14 pl-14 bg-slate-50 border-none rounded-2xl font-bold text-slate-800"
                   required
                 />
              </div>
            </div>

            <div className="md:col-span-2 pt-6">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-indigo-600 hover:bg-black rounded-[1.5rem] text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-100 transition-all active:scale-95"
              >
                {loading ? 'Processing Protocol...' : 'Create Secure ID'}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-10 pt-10">
           <div className="flex items-center gap-6 w-full">
              <div className="h-px bg-slate-100 flex-grow"></div>
              <p className="text-slate-500 text-center font-bold text-xs">
                Already part of the network?{' '}
                <Link to="/login" className="text-indigo-600 font-black hover:text-black transition-colors ml-1 uppercase tracking-tighter">Login Now</Link>
              </p>
              <div className="h-px bg-slate-100 flex-grow"></div>
           </div>

           <div className="flex flex-wrap justify-center gap-6 text-slate-300">
              <div className="flex items-center gap-2">
                 <ShieldCheck size={16} />
                 <span className="text-[8px] font-black uppercase tracking-widest">Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                 <GraduationCap size={16} />
                 <span className="text-[8px] font-black uppercase tracking-widest">Verified</span>
              </div>
           </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
