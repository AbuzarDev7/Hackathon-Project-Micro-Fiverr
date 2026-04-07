import React from 'react';
import { useParams } from 'react-router-dom';

const Checkout = () => {
    const { serviceId } = useParams();
    
    return (
        <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-4xl font-black text-slate-900 mb-6 font-['Outfit']">Secure Checkout</h1>
            <p className="text-slate-500 font-medium">Hiring Service ID: {serviceId}</p>
            <div className="mt-10 max-w-md mx-auto p-10 bg-white border border-slate-100 shadow-2xl shadow-indigo-100 rounded-[2.5rem]">
                <div className="w-full h-48 bg-slate-50 rounded-2xl mb-6 flex items-center justify-center border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-bold italic">Express Payment Form Placeholder</p>
                </div>
                <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-indigo-100">
                    Complete Demo Payment
                </button>
            </div>
        </div>
    );
};

export default Checkout;
