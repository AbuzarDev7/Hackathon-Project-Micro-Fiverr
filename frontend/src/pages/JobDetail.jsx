import React from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();

  // Mock Job Data for UI Demonstration
  const job = {
    title: 'Expert AC Technician Needed for Full Service',
    description: 'We are looking for a highly skilled AC technician to perform a complete service on 3 split units. The job includes filter cleaning, gas pressure check, and outdoor unit washing. We prefer someone who can bring their own professional cleaning kit and vacuum pump if needed.',
    requirements: [
      'Minimum 3 years of experience in AC maintenance',
      'Must have own professional tools',
      'Punctual and reliable',
      'Knowledge of gas leak detection is a plus'
    ],
    budget: '5000',
    location: 'Gulshan-e-Iqbal, Karachi',
    category: 'Maintenance',
    postedDate: 'Posted 2 hours ago',
    client: {
      name: 'Ahmed Khan',
      rating: '4.8',
      totalJobs: '12',
      memberSince: 'Jan 2024'
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-bold text-slate-400 mb-12 uppercase tracking-widest animate-reveal">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link to="/jobs" className="hover:text-indigo-600">Jobs</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <span className="text-slate-900">Job Detail</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Job Info */}
          <div className="lg:col-span-2 space-y-12 animate-reveal [animation-delay:0.1s]">
            <div>
              <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-black tracking-widest uppercase rounded-full border border-indigo-100 mb-6">
                {job.category}
              </span>
              <h1 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight tracking-tighter">
                {job.title}
              </h1>
              <p className="text-slate-400 font-bold flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {job.postedDate}
              </p>
            </div>

            <div className="prose prose-slate max-w-none">
              <h3 className="text-2xl font-black text-slate-900 mb-6">Job Description</h3>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                {job.description}
              </p>
              
              <h3 className="text-2xl font-black text-slate-900 mb-6 mt-12">Requirement & Skills</h3>
              <ul className="space-y-4">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-600 font-medium text-lg">
                    <div className="mt-1 w-6 h-6 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                       <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Sidebar Action */}
          <div className="space-y-8 animate-reveal [animation-delay:0.2s]">
            {/* Action Card */}
            <div className="bg-white border-4 border-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600 opacity-5 -translate-y-16 translate-x-16 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="mb-8">
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Estimated Budget</p>
                <p className="text-5xl font-black text-slate-900 tracking-tighter">RS {job.budget}</p>
              </div>

              <div className="flex items-start gap-4 mb-10 pb-10 border-b border-slate-100">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Location</p>
                  <p className="text-lg font-bold text-slate-800 leading-tight">{job.location}</p>
                </div>
              </div>

              <button className="w-full py-5 bg-indigo-600 hover:bg-slate-900 text-white rounded-3xl font-black text-xl shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1 active:translate-y-0">
                Apply for this Job
              </button>
              
              <button className="w-full mt-4 py-5 bg-white border-2 border-slate-200 hover:border-indigo-600 text-slate-900 rounded-3xl font-black text-xl transition-all">
                Send Message
              </button>
            </div>

            {/* Client Info Card */}
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.2),transparent)]"></div>
               <div className="relative z-10">
                 <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-8">About the Customer</h4>
                 <div className="flex items-center gap-5 mb-8">
                   <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-2xl font-black">
                     {job.client.name.charAt(0)}
                   </div>
                   <div>
                     <p className="text-xl font-black">{job.client.name}</p>
                     <p className="text-sm font-bold text-slate-400">Member since {job.client.memberSince}</p>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                     <p className="text-2xl font-black mb-1">{job.client.rating}</p>
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Rating</p>
                   </div>
                   <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                     <p className="text-2xl font-black mb-1">{job.client.totalJobs}+</p>
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Jobs Posted</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
