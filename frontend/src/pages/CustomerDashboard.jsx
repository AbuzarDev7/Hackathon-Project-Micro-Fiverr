import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';
import CustomerOverview from './dashboard/CustomerOverview';
import BrowseJobs from './dashboard/BrowseJobs';
import HiredProviders from './dashboard/HiredProviders';
import BrowseServicesDashboard from './dashboard/BrowseServicesDashboard';
import Chat from './dashboard/Chat';
import Reviews from './dashboard/Reviews';
import Notifications from './dashboard/Notifications';
import Settings from './dashboard/Settings';
import PostJob from './dashboard/PostJob';
import MyPostedJobs from './dashboard/MyPostedJobs';
import Applications from './dashboard/Applications';
const CustomerDashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [data, setData] = useState({
    userJobs: [],
    totalSpent: 0,
    hiredProviders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const [userJobsRes, paymentsRes] = await Promise.all([
          axios.get('/api/jobs/user', config),
          axios.get('/api/payment/history', config),
        ]);

        const spent = paymentsRes.data.reduce((acc, curr) => acc + curr.amount, 0);

        setData({
          userJobs: userJobsRes.data,
          totalSpent: spent,
          hiredProviders: [], 
        });
      } catch (err) {
        console.error("Error fetching customer dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerData();
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'overview': return <CustomerOverview stats={{ 
        posted: data.userJobs.length, 
        spent: data.totalSpent, 
        active: data.userJobs.filter(j => j.status === 'in-progress').length, 
        messages: 12 
      }} />;
      case 'post-job': return <PostJob />;
      case 'my-jobs': return <MyPostedJobs jobs={data.userJobs} />;
      case 'hired': return <HiredProviders />;
      case 'chat': return <Chat />;
      case 'reviews': return <Reviews />;
      case 'settings': return <Settings />;
      default: return <CustomerOverview />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center">
         <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
         <p className="text-slate-500 font-bold animate-pulse">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <DashboardLayout activeView={activeView} setActiveView={setActiveView}>
      {renderView()}
    </DashboardLayout>
  );
};

export default CustomerDashboard;
