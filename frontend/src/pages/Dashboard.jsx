import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomerDashboard from './CustomerDashboard';
import ProviderDashboard from './ProviderDashboard';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return <div className="min-h-screen bg-[#0f0c29] flex items-center justify-center text-white">Checking authentication...</div>;

  return (
    <>
      {user.role === 'freelancer' ? (
        <ProviderDashboard />
      ) : (
        <CustomerDashboard />
      )}
    </>
  );
};

export default Dashboard;
