import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
<<<<<<< HEAD
=======
import { MapPin, User, Mail, Lock, ShieldCheck } from 'lucide-react';
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc

const Register = () => {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
<<<<<<< HEAD
  const { register } = useAuth();
  // State variables hold data that might change over time
  // formData stores all the input fields from the registration form
=======
  
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client', // Default to client
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.role || !formData.location) {
      setError('Please fill in all fields to join.');
      return;
    }

    setLoading(true);
<<<<<<< HEAD
    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
 
      if (!result.success) {
        setError(result.message);
        return;
      }
 
      // role comes directly from result.user returned by register()
      if (result.user?.role === 'freelancer') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
=======
    // TODO: connect API
    // Note: register() in AuthContext might auto-login, 
    // but the spec says redirect to /login.
    const result = await register(formData);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        // Redirection as per requirement:
        navigate('/login');
      }, 2000);
    } else {
      setError(result.message);
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-slate-50 font-['Outfit']">
        <div className="w-full max-w-[500px] p-12 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Registration Complete!</h1>
          <p className="text-slate-500 font-medium">Your account was created successfully. Redirecting you to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 lg:p-10 bg-slate-50 font-['Outfit'] mt-10">
      <div className="w-full max-w-[580px] p-10 lg:p-14 bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-indigo-100/50">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Create Account</h1>
          <p className="text-slate-500 font-medium tracking-tight">Join Pakistan's leading local services marketplace.</p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-100 rounded-2xl py-4 px-6 text-rose-600 text-sm mb-8 text-center animate-shake font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-slate-700 text-sm font-black px-2 flex items-center gap-2">
              <User size={14} className="text-indigo-600" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Abuzar Dev"
              className="bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 text-base outline-none transition-all duration-300 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 shadow-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-700 text-sm font-black px-2 flex items-center gap-2">
              <Mail size={14} className="text-indigo-600" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@gmail.com"
              className="bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 text-base outline-none transition-all duration-300 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 shadow-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-700 text-sm font-black px-2 flex items-center gap-2">
              <MapPin size={14} className="text-indigo-600" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State"
              className="bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 text-base outline-none transition-all duration-300 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 shadow-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-700 text-sm font-black px-2 flex items-center gap-2">
              <ShieldCheck size={14} className="text-indigo-600" />
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 text-base outline-none appearance-none transition-all duration-300 focus:bg-white focus:border-indigo-400 shadow-sm"
            >
              <option value="client">Client (Hiring)</option>
              <option value="freelancer">Freelancer (Working)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-700 text-sm font-black px-2 flex items-center gap-2">
              <Lock size={14} className="text-indigo-600" />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 text-base outline-none transition-all duration-300 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 shadow-sm"
              required
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-5 bg-indigo-600 hover:bg-black rounded-2xl text-white text-lg font-black transition-all duration-300 shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
            >
              {loading ? 'Processing...' : 'Register Account'}
            </button>
          </div>
        </form>

        <p className="text-slate-500 text-center font-bold text-sm mt-10">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-black hover:underline transition-all">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
