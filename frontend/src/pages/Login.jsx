import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { LogIn, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return setError('Please fill in all fields.');
    setLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) navigate('/dashboard');
      else setError(result.message);
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 font-['Inter'] relative overflow-hidden">
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-purple-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <Card className="w-full max-w-[480px] border-none shadow-2xl shadow-indigo-100/50 rounded-[3rem] p-4 bg-white/80 backdrop-blur-xl animate-in zoom-in-95 duration-500">
        <CardHeader className="text-center pt-8 pb-10 space-y-4">
          <div className="mx-auto w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100 mb-2">
             <LogIn size={28} />
          </div>
          <CardTitle className="text-4xl font-black text-slate-900 tracking-tighter italic">Welcome Back</CardTitle>
          <CardDescription className="text-slate-500 font-medium">Access your local expert dashboard.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Badge variant="destructive" className="w-full justify-center py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border-none animate-bounce">
                {error}
              </Badge>
            )}

            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 group-focus-within:text-indigo-600 transition-colors">Email Address</label>
              <div className="relative">
                 <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" size={18} />
                 <Input
                   type="email"
                   name="email"
                   value={formData.email}
                   onChange={handleChange}
                   placeholder="name@company.com"
                   className="h-14 pl-14 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus-visible:ring-2 focus-visible:ring-indigo-100"
                   required
                 />
              </div>
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-focus-within:text-indigo-600 transition-colors">Password</label>
                <Link to="#" className="text-[9px] font-black text-indigo-500 uppercase hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                 <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" size={18} />
                 <Input
                   type="password"
                   name="password"
                   value={formData.password}
                   onChange={handleChange}
                   placeholder="••••••••"
                   className="h-14 pl-14 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus-visible:ring-2 focus-visible:ring-indigo-100"
                   required
                 />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-16 mt-4 bg-indigo-600 hover:bg-black rounded-2xl text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 transition-all active:scale-95"
            >
              {loading ? 'Authenticating...' : 'Sign In To Account'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-8 pb-10">
           <div className="flex items-center gap-4 w-full px-4">
              <div className="h-px bg-slate-100 flex-grow"></div>
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Secure Login</span>
              <div className="h-px bg-slate-100 flex-grow"></div>
           </div>
           
           <p className="text-slate-500 text-center font-bold text-xs">
             Don't have an account?{' '}
             <Link to="/register" className="text-indigo-600 font-black hover:text-black transition-colors flex items-center justify-center gap-1 mt-2 group">
               Create One Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </Link>
           </p>

           <div className="flex items-center justify-center gap-2 text-slate-300">
              <ShieldCheck size={14} />
              <span className="text-[8px] font-black uppercase tracking-tighter">Your data is end-to-end encrypted</span>
           </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
