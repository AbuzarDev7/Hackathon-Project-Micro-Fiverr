import React from 'react';
import { useParams } from 'react-router-dom';

const LiveTracking = () => {
    const { bookingId } = useParams();
    
    return (
        <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-4xl font-black text-slate-900 mb-6 font-['Outfit']">Live Freelancer Tracking</h1>
            <p className="text-slate-500 font-medium tracking-wide uppercase text-xs">Booking Reference: {bookingId}</p>
            
            <div className="mt-12 h-[500px] w-full bg-slate-100 rounded-[3rem] border-8 border-white shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-indigo-600 rounded-full animate-ping absolute opacity-20 ml-10 mt-10"></div>
                        <div className="w-40 h-40 bg-indigo-50 border-4 border-white shadow-xl rounded-full flex items-center justify-center z-10 relative">
                             <p className="text-indigo-600 font-black italic">Map Loading...</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-10 flex gap-6 justify-center">
                <div className="px-8 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <p className="text-slate-400 text-xs font-bold uppercase mb-1">Status</p>
                    <p className="text-indigo-600 font-black">Pro is on the way</p>
                </div>
                <div className="px-8 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <p className="text-slate-400 text-xs font-bold uppercase mb-1">Distance</p>
                    <p className="text-slate-900 font-black">1.2 km away</p>
                </div>
            </div>
        </div>
    );
};

export default LiveTracking;
