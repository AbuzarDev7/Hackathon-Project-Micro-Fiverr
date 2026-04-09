import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  CheckCircle, 
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Checkout = () => {
    const { serviceId } = useParams();
    const { token } = useAuth();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [customAmount, setCustomAmount] = useState(0);
    const [completedData, setCompletedData] = useState(null);
    const [cardData, setCardData] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });

    useEffect(() => {
        const fetchService = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`/api/services/${serviceId}`);
                setService(res.data);
                setCustomAmount(res.data.price);
            } catch (err) {
                try {
                    const res2 = await axios.get(`/api/service/${serviceId}`);
                    setService(res2.data);
                    setCustomAmount(res2.data.price);
                } catch (err2) {
                    setError(`Service not found.`);
                }
            } finally {
                setLoading(false);
            }
        };
        if (serviceId) fetchService();
    }, [serviceId]);

    const handleCardChange = (e) => {
        setCardData({ ...cardData, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        if (!service) return;
        if (customAmount <= 0) return alert("Please enter a valid amount");
        if (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv) {
            return alert("Please fill in all card details");
        }
        
        setProcessing(true);
        try {
            const res = await axios.post('/api/payment/fake-payment', {
                freelancerId: service.providerId?._id,
                serviceId: service._id,
                amount: customAmount,
                cardInfo: { name: cardData.name }
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.success) {
                setCompletedData({
                    ...res.data.transaction,
                    payerName: cardData.name,
                    cardLast4: cardData.number.slice(-4)
                });
                setCompleted(true);
            }
        } catch (err) {
            alert("Payment failed: " + (err.response?.data?.message || "Something went wrong"));
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!service || error) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-center space-y-8 font-['Inter']">
            <div className="w-24 h-24 bg-red-50 text-red-500 rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-red-50/50 animate-bounce">
                <ShieldCheck size={48} />
            </div>
            <h1 className="text-5xl font-black text-slate-900 italic tracking-tighter">Service Not Found</h1>
            <p className="text-slate-500 font-medium max-w-md mx-auto italic">
                The Service ID <code className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{serviceId}</code> is not available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-2xl h-16 bg-indigo-600 font-black uppercase tracking-widest px-8 shadow-xl">
                    <Link to="/services">Back to Marketplace</Link>
                </Button>
            </div>
        </div>
    );

    if (completed && completedData) return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 font-['Outfit'] overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[150px] rounded-full"></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl bg-white rounded-[3.5rem] shadow-2xl overflow-hidden relative"
            >
                {/* Formal Payment Slip Header */}
                <div className="bg-slate-950 p-10 text-white relative">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-black tracking-tighter italic uppercase text-indigo-500">Official Payment Slip</h2>
                            <p className="text-[10px] font-black tracking-[.2em] uppercase text-slate-500 mt-1">Micro Fiverr Digital Marketplace</p>
                        </div>
                        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                            <CheckCircle size={28} />
                        </div>
                    </div>
                </div>

                <div className="p-10 space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Transaction ID</label>
                            <p className="font-black text-slate-900">{(completedData._id || 'TXN').toUpperCase()}</p>
                        </div>
                        <div className="space-y-1 text-right">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Date & Time</label>
                            <p className="font-black text-slate-900">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Client Name</label>
                            <p className="font-black text-slate-900 uppercase">{completedData.payerName || 'Public User'}</p>
                        </div>
                        <div className="space-y-1 text-right">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Payment Method</label>
                            <p className="font-black text-slate-900 uppercase">Visa •••• {completedData.cardLast4}</p>
                        </div>
                    </div>

                    <div className="border-y border-slate-100 py-6 space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 font-bold">Service Details:</span>
                            <span className="text-slate-900 font-extrabold italic text-right max-w-[200px] truncate">{service.title}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 font-bold">Freelancer:</span>
                            <span className="text-indigo-600 font-extrabold uppercase tracking-tighter">{service.providerId?.name || 'Local Expert'}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        <span className="text-slate-900 font-black italic uppercase tracking-tighter text-lg">Total Amount Paid</span>
                        <span className="text-4xl font-black text-slate-900 italic tracking-tighter">Rs. {completedData.amount.toLocaleString()}</span>
                    </div>

                    <div className="pt-8 flex gap-4">
                        <Button onClick={() => window.print()} className="flex-1 h-14 bg-slate-100 border-none text-slate-900 hover:bg-slate-200 font-black uppercase text-[10px] tracking-widest rounded-2xl">
                           Print Slip (PDF)
                        </Button>
                        <Button asChild className="flex-1 h-14 bg-indigo-600 hover:bg-black font-black uppercase text-[10px] tracking-widest rounded-2xl">
                           <Link to="/active-hires">Go to Hires</Link>
                        </Button>
                    </div>
                </div>

                <div className="h-4 w-full flex justify-between px-10 gap-2 mb-[-8px]">
                   {[...Array(15)].map((_, i) => <span key={i} className="w-2 h-2 bg-slate-900 rounded-full"></span>)}
                </div>
            </motion.div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 lg:p-12 font-['Inter'] relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/30 rounded-full blur-[120px] -z-10"></div>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 animate-in slide-in-from-bottom-10 duration-1000">
                
                <div className="lg:col-span-12">
                   <Card className="border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] rounded-[4rem] overflow-hidden bg-white/90 backdrop-blur-2xl border border-white/40">
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                         
                         <div className="p-10 lg:p-20 space-y-12 border-r border-slate-50">
                            <div className="space-y-4">
                               <Badge className="bg-indigo-600 text-white border-none px-6 py-2 tracking-widest italic rounded-full h-8 uppercase font-black text-[10px]">Secure Gateway</Badge>
                               <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter italic leading-none">Checkout</h1>
                               <div className="flex gap-2 text-slate-300">
                                  <CreditCard size={18} />
                                  <Lock size={18} />
                                  <ShieldCheck size={18} />
                               </div>
                            </div>

                            <div className="space-y-8">
                               <div className="space-y-4">
                                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 italic font-['Outfit']">1. Optimized Payment Amount</label>
                                  <div className="relative group">
                                     <div className="absolute left-8 top-1/2 -translate-y-1/2 text-2xl font-black text-indigo-500">Rs.</div>
                                     <input 
                                       type="number"
                                       value={customAmount}
                                       onChange={(e) => setCustomAmount(Number(e.target.value))}
                                       className="w-full h-20 bg-indigo-50/30 border-2 border-indigo-100/50 rounded-3xl pl-20 pr-10 text-3xl font-black text-slate-900 focus:ring-4 focus:ring-indigo-100 transition-all focus:bg-white focus:border-indigo-600 shadow-xl shadow-indigo-100/10"
                                     />
                                  </div>
                               </div>

                               <div className="space-y-6">
                                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 italic font-['Outfit']">2. Enter Card Protocol</label>
                                  
                                  <div className="space-y-4">
                                     <input 
                                       type="text" 
                                       name="number"
                                       placeholder="Card Number"
                                       value={cardData.number}
                                       onChange={handleCardChange}
                                       className="w-full h-16 bg-slate-50 border-none rounded-2xl px-8 font-black text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-slate-100 transition-all"
                                     />
                                     <input 
                                       type="text" 
                                       name="name"
                                       placeholder="Cardholder Name"
                                       value={cardData.name}
                                       onChange={handleCardChange}
                                       className="w-full h-16 bg-slate-50 border-none rounded-2xl px-8 font-black text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-slate-100 transition-all"
                                     />
                                     <div className="grid grid-cols-2 gap-4">
                                        <input 
                                          type="text" 
                                          name="expiry"
                                          placeholder="MM / YY"
                                          value={cardData.expiry}
                                          onChange={handleCardChange}
                                          className="w-full h-16 bg-slate-50 border-none rounded-2xl px-8 font-black text-center text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-slate-100 transition-all"
                                        />
                                        <input 
                                          type="password" 
                                          name="cvv"
                                          placeholder="CVV"
                                          value={cardData.cvv}
                                          onChange={handleCardChange}
                                          className="w-full h-16 bg-slate-50 border-none rounded-2xl px-8 font-black text-center text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-slate-100 transition-all"
                                        />
                                     </div>
                                  </div>
                               </div>

                               <Button 
                                 onClick={handlePayment}
                                 disabled={processing}
                                 className="w-full h-20 rounded-3xl bg-indigo-600 hover:bg-black text-white text-xl font-black italic tracking-tighter uppercase shadow-2xl active:scale-95 transition-all mt-4"
                               >
                                  {processing ? 'Connecting Gateway...' : 'Finalize Payment'}
                                </Button>
                            </div>
                         </div>

                         <div className="bg-slate-900 p-10 lg:p-20 text-white relative flex flex-col justify-between overflow-hidden">
                            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                            
                            <div className="space-y-12 relative z-10">
                               <div className="flex items-center gap-6 animate-pulse">
                                  <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-indigo-500/30 p-1.5 shadow-2xl">
                                     <img src={service?.image} className="w-full h-full object-cover rounded-[1.5rem]" />
                                  </div>
                                  <div>
                                     <h3 className="text-3xl font-black italic tracking-tighter leading-tight">{service?.title}</h3>
                                     <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-2 font-['Outfit']">Provider: {service?.providerId?.name || 'Pro Agent'}</p>
                                  </div>
                               </div>

                               <div className="h-px bg-white/5 w-full"></div>

                               <div className="space-y-10">
                                  <div className="flex justify-between items-end">
                                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Total Pay</span>
                                     <span className="text-6xl font-black italic text-white tracking-tighter">Rs. {customAmount.toLocaleString()}</span>
                                  </div>
                               </div>
                            </div>

                            <div className="relative z-10 pt-10">
                               <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest leading-relaxed">
                                  Secure Digital Transaction Protocol • Micro Fiverr Digital Registry
                                </p>
                            </div>
                         </div>

                      </div>
                   </Card>
                </div>

            </div>
        </div>
    );
};

export default Checkout;
