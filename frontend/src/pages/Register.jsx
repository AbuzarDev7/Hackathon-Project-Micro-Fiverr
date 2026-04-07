import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  // State variables hold data that might change over time
  // formData stores all the input fields from the registration form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client'
  });
  
  // error stores any error messages we want to show the user
  const [error, setError] = useState('');
  
  // loading is true when we are waiting for the backend to reply (shows 'Creating Account...')
  const [loading, setLoading] = useState(false);

  // This function runs every time the user types in an input field
  const handleChange = (e) => {
    // We update only the specific field that was typed in (using e.target.name)
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear any previous errors because the user is trying again
    setError('');
  };

  // This function runs when the user clicks the "Register" button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing automatically
    setError('');

    // Basic Validation: Check if everything is filled out
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return; // Stop the function here if there's an error
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // If everything is okay, we start loading and send data to the backend
    setLoading(true);
    
    // Use the register function from useAuth context
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    });

    if (result.success) {
      alert('Registration successful! 🎉');
      navigate('/login');
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="w-full max-w-[450px] p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.5)]">
        <h1 className="text-white text-3xl font-bold text-center mb-1 font-['Inter']">Create Account</h1>
        <p className="text-white/60 text-center mb-6 text-sm">Join Micro Fiverr today</p>

        {error && (
          <div className="bg-[#ff3b30]/15 border border-[#ff3b30]/30 rounded-lg py-2.5 px-4 text-[#ff6b6b] text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-white/70 text-[13px] font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="bg-white/10 border border-white/15 rounded-lg py-3 px-4 text-white text-[15px] outline-none transition-colors duration-300 focus:border-white/30 font-['Inter']"
            />
          </div>

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
            <label className="text-white/70 text-[13px] font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="bg-white/10 border border-white/15 rounded-lg py-3 px-4 text-white text-[15px] outline-none transition-colors duration-300 focus:border-white/30 font-['Inter'] [&>option]:text-black"
            >
              <option value="client">Client</option>
              <option value="freelancer">Freelancer</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white/70 text-[13px] font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              className="bg-white/10 border border-white/15 rounded-lg py-3 px-4 text-white text-[15px] outline-none transition-colors duration-300 focus:border-white/30 font-['Inter']"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white/70 text-[13px] font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="bg-white/10 border border-white/15 rounded-lg py-3 px-4 text-white text-[15px] outline-none transition-colors duration-300 focus:border-white/30 font-['Inter']"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg text-white text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-white/60 text-center text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#667eea] font-semibold no-underline hover:text-white transition-colors duration-200">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
