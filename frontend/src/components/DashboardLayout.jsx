import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-['Inter'] relative">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <main className="flex-1 md:ml-64 p-4 md:p-8 relative min-h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
          <Outlet />
        </div>
        
        {/* Abstract background blobs for premium feel */}
        <div className="fixed top-0 right-0 -z-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="fixed bottom-0 left-64 -z-0 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      </main>
    </div>
  );
};

export default DashboardLayout;
