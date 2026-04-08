import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
<<<<<<< HEAD
=======
import { ROLES } from '../App';
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
<<<<<<< HEAD
    try {
      const result = await login(formData.email, formData.password);

      if (!result.success) {
        setError(result.message);
        return;
      }

      // role comes from the API response (returned in result.user)
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
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      console.log('👤 Login successful, role:', result.user.role);
      
      // Role based redirect as per requirement:
      if (result.user.role === 'client') {
        navigate('/dashboard/client');
      } else if (result.user.role === 'freelancer') {
        navigate('/dashboard/provider');
      } else {
        navigate('/');
      }
    } else {
      setError(result.message);
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-slate-50 font-['Outfit']">
      <div className="w-full max-w-[480px] p-12 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-500 font-medium tracking-tight">Login to your Micro Fiverr account</p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-100 rounded-2xl py-4 px-6 text-rose-600 text-sm mb-8 text-center animate-shake font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 text-sm font-black px-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 text-base outline-none transition-all duration-300 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 shadow-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-700 text-sm font-black px-2">Password</label>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-5 bg-indigo-600 hover:bg-black rounded-2xl text-white text-lg font-black transition-all duration-300 shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
          >
            {loading ? 'Logging in...' : 'Login Now'}
          </button>
        </form>

        <p className="text-slate-500 text-center font-bold text-sm mt-10">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 font-black hover:underline transition-all">
            Join the community
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
