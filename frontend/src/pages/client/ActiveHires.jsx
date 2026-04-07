import React from 'react';

const ActiveHires = () => {
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-4xl font-black text-slate-900 mb-6">Active Hires (My Hires)</h1>
      <p className="text-slate-500 font-medium font-['Outfit']">Track your ongoing services and active hires here.</p>
      <div className="mt-10 p-20 border-2 border-dashed border-indigo-200 bg-indigo-50/10 rounded-[3rem]">
          <p className="text-indigo-400 font-bold italic">No active hires yet. Start by hiring a professional!</p>
      </div>
    </div>
  );
};

export default ActiveHires;
