import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-40">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-50/30 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-6 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-extrabold uppercase tracking-widest text-indigo-600 animate-reveal">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
            Verified Local Talent Network
          </div>
          
          <h1 className="text-5xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tighter text-slate-900 animate-reveal">
            Hire the best <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">Local Providers</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-slate-600 mb-12 leading-relaxed font-medium animate-reveal [animation-delay:0.1s]">
            From plumbing to personal tutoring, find verified professionals who 
            actually live in your neighborhood. Start chatting instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-reveal [animation-delay:0.2s]">
            <Link 
              to="/register" 
              className="w-full sm:w-auto bg-indigo-600 hover:bg-slate-900 text-white px-10 py-5 rounded-3xl font-bold text-lg shadow-2xl shadow-indigo-200 transition-all hover:-translate-y-1 active:translate-y-0"
            >
              Get Started Now
            </Link>
            <Link 
              to="/jobs" 
              className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:border-indigo-600 text-slate-900 px-10 py-5 rounded-3xl font-bold text-lg transition-all active:scale-95"
            >
              Explore Job Listings
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-400 font-bold text-sm uppercase tracking-widest animate-reveal [animation-delay:0.3s]">
            <span>Trusted By Residents Of</span>
            <div className="flex items-center gap-6 opacity-60">
              <span className="hover:text-indigo-600 transition-colors">Karachi</span>
              <span className="hover:text-indigo-600 transition-colors">Lahore</span>
              <span className="hover:text-indigo-600 transition-colors">Islamabad</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories (Professional SVGs) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight text-slate-900 leading-none">
                Browse Top Categories
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Skip the search and jump straight into our most in-demand local services categories.
              </p>
            </div>
            <Link to="/services" className="px-8 py-4 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-2xl font-bold text-indigo-600 transition-all flex items-center gap-2 group">
              View All Categories
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Plumbing", 
                desc: "Expert leak repairs, fixture installations & emergency help.",
                icon: (
                  <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96.808l-.447.559a4.788 4.788 0 01-4.431 1.761 4.781 4.781 0 01-3.619-2.072 4.781 4.781 0 01.378-4.148c.11-.18.232-.349.366-.508l.447-.559a2 2 0 00.373-1.832L6.15 6.15M16 3l-1.5 1.5M19 6l-1.5 1.5M21 9l-1.5 1.5" /></svg>
                ),
                color: "bg-indigo-50"
              },
              { 
                title: "Tutoring", 
                desc: "Personal math, science & language tutors for all ages.",
                icon: (
                  <svg className="w-10 h-10 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                ),
                color: "bg-violet-50"
              },
              { 
                title: "Electrical", 
                desc: "Home wiring, lighting fixes & appliance hookups.",
                icon: (
                  <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                ),
                color: "bg-amber-50"
              },
              { 
                title: "AC Repair", 
                desc: "Seasonal cleaning, maintenance & repair services.",
                icon: (
                  <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                ),
                color: "bg-cyan-50"
              }
            ].map((cat, idx) => (
              <Link 
                key={idx} 
                to={`/services?category=${cat.title.toLowerCase()}`}
                className="group p-10 bg-slate-50 hover:bg-white border border-transparent hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-100/50 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`w-20 h-20 ${cat.color} rounded-3xl flex items-center justify-center mb-10 transition-transform duration-500 group-hover:rotate-6 shadow-inner`}>
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-800">{cat.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-8">{cat.desc}</p>
                <div className="flex items-center gap-3 text-indigo-600 font-bold text-sm tracking-tight group-hover:gap-5 transition-all">
                  Browse List <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-32 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-full bg-indigo-600/5 rounded-[4rem] -rotate-3 scale-105"></div>
            <img 
              src="https://images.unsplash.com/photo-1540339832862-4745a49651ce?auto=format&fit=crop&q=80&w=1587" 
              alt="Trusted Provider" 
              className="relative z-10 w-full aspect-square object-cover rounded-[3.5rem] shadow-2xl border-8 border-white"
            />
            <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[3rem] shadow-2xl z-20 border border-slate-100 animate-float">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map(s => (
                  <svg key={s} className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-2xl font-black text-slate-900 leading-none mb-1">4.9/5 Rating</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">Customer Satisfaction</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl lg:text-6xl font-black mb-10 leading-tight text-slate-900 tracking-tight">
              Why thousands trust <br />
              <span className="text-indigo-600">MicroFiverr</span> for work
            </h2>
            <div className="space-y-8">
              {[
                { 
                  title: "Real-Time Direct Chat", 
                  desc: "Negotiate prices and timing directly with providers before hiring.",
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                },
                { 
                  title: "Verified Pro Profiles", 
                  desc: "View background checks, ratings, and previous work history easily.",
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                },
                { 
                  title: "Secure Local Payments", 
                  desc: "Pay only when the work is done and you are fully satisfied.",
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="w-16 h-16 shrink-0 bg-white border border-slate-200 rounded-3xl flex items-center justify-center text-indigo-600 transition-all group-hover:bg-indigo-600 group-hover:text-white shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="relative bg-slate-900 rounded-[4rem] p-12 lg:p-24 overflow-hidden border-8 border-indigo-100 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.2),transparent)]"></div>
            <div className="absolute top-0 right-0 w-[500px] h-full bg-indigo-600 skew-x-12 translate-x-1/2 opacity-20"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl lg:text-7xl font-black text-white mb-10 tracking-tight leading-none">
                  Ready to start a new <br />
                  <span className="text-indigo-400">Project?</span>
                </h2>
                <div className="flex flex-wrap gap-6">
                  <Link to="/register" className="bg-indigo-500 hover:bg-indigo-400 text-white px-12 py-5 rounded-3xl font-black text-xl transition-all shadow-xl shadow-indigo-900/50 hover:-translate-y-1">
                    Sign Up Now
                  </Link>
                  <Link to="/jobs" className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 px-12 py-5 rounded-3xl font-black text-xl transition-all backdrop-blur-xl">
                    Browse All Jobs
                  </Link>
                </div>
              </div>
              <div className="lg:text-right">
                <p className="text-2xl md:text-3xl font-bold text-slate-400 mb-10 leading-tight">
                  Over <span className="text-white">Pakistan's #1 Marketplace</span> for skilled local services and micro-jobs.
                </p>
                <div className="flex items-center lg:justify-end gap-10">
                  <div className="text-left">
                    <p className="text-4xl font-black text-white leading-none">2.4k+</p>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-2">Active Pros</p>
                  </div>
                  <div className="text-left">
                    <p className="text-4xl font-black text-white leading-none">12k+</p>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-2">Jobs Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Polished) */}
      <footer className="bg-slate-50 pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-10">
                 <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">M</div>
                 <span className="text-3xl font-black tracking-tighter text-slate-900">Micro<span className="text-indigo-600">Fiverr</span></span>
              </Link>
              <p className="text-slate-500 font-medium leading-relaxed mb-10 max-w-xs">
                Helping individuals find reliable help and professionals find great work in their local city.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map(idx => (
                  <div key={idx} className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all cursor-pointer shadow-sm">
                    {/* Placeholder for social icon */}
                    <div className="w-5 h-5 bg-slate-200 rounded-sm"></div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-black text-slate-900 mb-10">Company</h4>
              <ul className="space-y-6 text-slate-500 font-bold">
                <li><Link to="#" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-indigo-600 transition-colors">How it Works</Link></li>
                <li><Link to="#" className="hover:text-indigo-600 transition-colors">Success Stories</Link></li>
                <li><Link to="#" className="hover:text-indigo-600 transition-colors">Contact Support</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-black text-slate-900 mb-10">Explore</h4>
              <ul className="space-y-6 text-slate-500 font-bold">
                <li><Link to="/jobs" className="hover:text-indigo-600 transition-colors">Find Local Jobs</Link></li>
                <li><Link to="/services" className="hover:text-indigo-600 transition-colors">Hire Professionals</Link></li>
                <li><Link to="/register" className="hover:text-indigo-600 transition-colors">Become a Provider</Link></li>
                <li><Link to="/chat" className="hover:text-indigo-600 transition-colors">Community Forum</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-black text-slate-900 mb-10">Newsletter</h4>
              <p className="text-slate-500 font-medium mb-8">Get the latest local job alerts straight to your inbox.</p>
              <div className="flex flex-col gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white border border-slate-200 px-6 py-4 rounded-2xl outline-none focus:border-indigo-600 transition-all font-medium"
                />
                <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg transition-all hover:bg-slate-900 shadow-xl shadow-indigo-100">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">
              © 2026 MicroFiverr SMIT Batch 01. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-10 text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">
              <Link to="#" className="hover:text-slate-900 transition-colors">Privacy</Link>
              <Link to="#" className="hover:text-slate-900 transition-colors">Terms</Link>
              <Link to="#" className="hover:text-slate-900 transition-colors">Legal</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
