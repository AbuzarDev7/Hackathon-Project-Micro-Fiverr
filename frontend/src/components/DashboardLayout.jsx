import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-950 font-['Inter']">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 relative">
        <div className="max-w-7xl mx-auto space-y-8">
          <Outlet />
        </div>
        
        {/* Abstract background blobs for premium feel */}
        <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="fixed bottom-0 left-64 -z-10 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      </main>
    </div>
  );
};

export default DashboardLayout;
