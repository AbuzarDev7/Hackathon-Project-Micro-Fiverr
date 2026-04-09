import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, MessageSquare, Camera, Share2, Mail, MapPin, Phone, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-20 px-6 lg:px-12 font-['Inter'] mt-auto border-t border-white/5 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 relative z-10">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20 group-hover:rotate-12 transition-transform">
                <Sparkles size={20} />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter italic">Micro Fiverr.</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Pakistan's premier marketplace for elite local talent. We bridge the gap between skilled professionals and projects that matter.
            </p>
            <div className="flex gap-4">
              {[Globe, MessageSquare, Camera, Share2].map((Icon, i) => (
                <Link key={i} to="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all hover:-translate-y-1">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase text-xs tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              {['Marketplace', 'Freelancer Radar', 'Active Gigs', 'Success Stories', 'Affiliate'].map((link) => (
                <li key={link}>
                  <Link to="#" className="hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                    <div className="w-1 h-1 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase text-xs tracking-widest">Direct Contact</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Email us at</p>
                  <p className="text-white font-bold text-sm">hello@microfiverr.pk</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Main Office</p>
                  <p className="text-white font-bold text-sm">Tech Tower, Karachi</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase text-xs tracking-widest">Elite Newsletter</h4>
            <p className="text-sm leading-relaxed">Join 5,000+ experts receiving weekly tips on scaling their freelance business.</p>
            <div className="relative group">
               <input 
                 type="email" 
                 placeholder="your@email.com" 
                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white outline-none focus:border-indigo-500 transition-all"
               />
               <button className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                  Join
               </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] relative z-10">
          <p>© 2026 Micro Fiverr. Built with passion for Pakistan.</p>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-white transition-colors">Privacy Privacy</Link>
            <Link to="#" className="hover:text-white transition-colors">Term of Service</Link>
            <Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
