import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  Star, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  Zap, 
  ArrowLeft,
  Navigation,
  ThumbsUp,
  Share2,
  Bookmark,
  ChevronRight,
  Sparkles,
  CheckCircle,
  X
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, token } = useAuth();
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customAmount, setCustomAmount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`/api/services/${id}`);
        setService(res.data);
        setCustomAmount(res.data.price);
      } catch (err) {
        console.error("Error fetching service", err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id, location.state]);

  const handleDemoPayment = async () => {
    if (!isAuthenticated) return navigate('/login');
    if (customAmount <= 0) return alert("Please enter a valid amount");
    
    setProcessing(true);
    try {
      const res = await axios.post('/api/payment/fake-payment', {
        freelancerId: service.providerId._id,
        serviceId: service._id,
        amount: customAmount
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setPaymentSuccess(true);
        setTimeout(() => {
          navigate('/active-hires');
        }, 2000);
      }
    } catch (err) {
      alert("Payment failed: " + (err.response?.data?.message || "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return (
     <div className="min-h-screen flex items-center justify-center bg-white space-y-6">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
     </div>
  );

  if (!service) return (
     <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-900 font-['Inter'] text-white">
        <div className="w-24 h-24 bg-red-500/20 text-red-500 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.2)] mb-8 animate-pulse border border-red-500/30">
           <X size={48} />
        </div>
        <h1 className="text-6xl font-black italic tracking-tighter mb-4">404: GIG HIDDEN</h1>
        <p className="text-slate-400 font-medium max-w-sm mx-auto mb-12 italic text-lg leading-relaxed">
           Bhai, jab tak data fetch nahi hoga, **Payment Card** render nahi hoga. Aapki ID database mein nahi hai.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
           <Button asChild size="lg" className="rounded-2xl h-20 bg-indigo-600 hover:bg-white hover:text-indigo-600 font-black uppercase tracking-widest px-10 shadow-2xl shadow-indigo-500/20 transition-all text-sm">
              <a href="/api/services/debug/seed" target="_blank">1. Generate Actual Data</a>
           </Button>
           <Button asChild variant="outline" size="lg" className="rounded-2xl h-20 border-slate-700 bg-transparent hover:bg-slate-800 font-black uppercase tracking-widest px-10 text-sm">
              <Link to="/services">2. Open Marketplace</Link>
           </Button>
        </div>
     </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 font-['Inter'] pb-20">
      
      {/* 🧭 NAVIGATION HEADER */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-indigo-50 sticky top-[72px] z-40 py-4 px-6 lg:px-12">
         <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 hover:text-indigo-600 transition-colors">
               <ArrowLeft size={16} /> Back to Search
            </button>
            <div className="flex gap-4">
               <Button variant="ghost" size="icon" className="rounded-xl"><Share2 size={18} /></Button>
               <Button variant="ghost" size="icon" className="rounded-xl"><Bookmark size={18} /></Button>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 lg:pt-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
         
         {/* 🖼️ LEFT COLUMN: CONTENT */}
         <div className="lg:col-span-8 space-y-12">
            
            <div className="space-y-6 uppercase font-black tracking-widest">
               <div className="flex flex-wrap items-center gap-4">
                  <Badge className="bg-indigo-600 text-white border-none px-6 py-2 tracking-widest italic">{service.category}</Badge>
               </div>
               <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] italic lowercase first-letter:uppercase">
                  I will {service.title}
               </h1>
            </div>

            {/* Merchant Preview */}
            <div className="flex items-center gap-6 p-8 bg-white border border-indigo-50 rounded-[2.5rem] shadow-sm">
               <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl font-black italic">
                  {service.providerId?.name?.charAt(0)}
               </div>
               <div className="space-y-1 flex-grow">
                  <p className="text-xl font-black text-slate-900">{service.providerId?.name || 'Professional'}</p>
                  <p className="text-sm font-medium text-slate-500 italic">Verified Seller • {service.location}</p>
               </div>
               <Button asChild variant="outline" className="hidden sm:flex rounded-2xl h-12 border-slate-200">
                  <Link to="/chat" state={{ introProvider: service.providerId }}>Contact Seller</Link>
               </Button>
            </div>

            <div className="rounded-[3.5rem] overflow-hidden shadow-2xl">
               <img 
                 src={service.image || 'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?auto=format&fit=crop&q=80&w=1500'} 
                 alt={service.title}
                 className="w-full aspect-video object-cover"
               />
            </div>

            <div className="space-y-8">
               <h3 className="text-3xl font-black text-slate-900 tracking-tight italic border-l-4 border-indigo-600 pl-6">About This Gig</h3>
               <div className="text-lg text-slate-600 font-medium leading-[1.8] whitespace-pre-wrap italic">
                  {service.description}
               </div>
            </div>

         </div>

         {/* 💳 RIGHT COLUMN: DYNAMIC PAYMENT CARD */}
         <div className="lg:col-span-4 relative">
            <div className="sticky top-32 space-y-8">
               <Card className="border-none shadow-2xl shadow-indigo-100 rounded-[3.5rem] overflow-hidden bg-white/80 backdrop-blur-xl p-10 animate-in slide-in-from-right-10 duration-700">
                  {paymentSuccess ? (
                    <div className="text-center space-y-8 py-6">
                       <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto animate-bounce">
                          <CheckCircle size={40} />
                       </div>
                       <h2 className="text-3xl font-black italic">Success!</h2>
                    </div>
                  ) : (
                    <div className="space-y-8">
                       <div className="flex items-end gap-2">
                          <span className="text-2xl font-black text-slate-400">Rs.</span>
                          <input 
                            type="number"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(Number(e.target.value))}
                            className="text-5xl font-black text-slate-900 tracking-tighter italic leading-none w-full bg-transparent border-none focus:outline-none"
                          />
                       </div>
                       
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 italic">Demo Card Details</label>
                          <div className="space-y-3">
                             <div className="h-14 bg-slate-50 rounded-2xl flex items-center px-6 text-slate-400 font-black tracking-widest text-xs border border-transparent focus-within:border-indigo-100 focus-within:bg-white transition-all">
                                XXXX-XXXX-XXXX-XXXX
                             </div>
                             <div className="grid grid-cols-2 gap-3">
                                <div className="h-12 bg-slate-50 rounded-2xl flex items-center px-4 text-slate-400 font-black text-[10px] tracking-widest border border-transparent">MM/YY</div>
                                <div className="h-12 bg-slate-50 rounded-2xl flex items-center px-4 text-slate-400 font-black text-[10px] tracking-widest border border-transparent">CVV</div>
                             </div>
                          </div>
                       </div>
                       
                       <Button 
                         onClick={handleDemoPayment}
                         disabled={processing}
                         className="w-full h-20 rounded-[1.8rem] bg-indigo-600 hover:bg-black text-white font-black text-lg uppercase tracking-widest shadow-2xl shadow-indigo-200 transition-all active:scale-95"
                       >
                          {processing ? 'Processing...' : 'Pay Now'} <Zap size={20} className="ml-3" />
                       </Button>

                       <div className="flex items-center justify-center gap-4 text-slate-400">
                          <ShieldCheck size={18} />
                          <span className="text-[10px] font-black uppercase tracking-widest italic">Secure Demo Payment</span>
                       </div>
                    </div>
                  )}
               </Card>
            </div>
         </div>
      </div>
    </div>
  );
};
export default ServiceDetail;
