import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      alert('Login successful! 🎉');
      navigate('/');
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="w-full max-w-[450px] p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.5)]">
        <h1 className="text-white text-3xl font-bold text-center mb-1 font-['Inter']">Welcome Back</h1>
        <p className="text-white/60 text-center mb-7 text-sm">Login to your Micro Fiverr account</p>

        {error && (
          <div className="bg-[#ff3b30]/15 border border-[#ff3b30]/30 rounded-lg py-2.5 px-4 text-[#ff6b6b] text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-white/70 text-[13px] font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="bg-white/10 border border-white/15 rounded-lg py-3 px-4 text-white text-[15px] outline-none transition-colors duration-300 focus:border-white/30 font-['Inter']"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white/70 text-[13px] font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="bg-white/10 border border-white/15 rounded-lg py-3 px-4 text-white text-[15px] outline-none transition-colors duration-300 focus:border-white/30 font-['Inter']"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg text-white text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-white/60 text-center text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#667eea] font-semibold no-underline hover:text-white transition-colors duration-200">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
