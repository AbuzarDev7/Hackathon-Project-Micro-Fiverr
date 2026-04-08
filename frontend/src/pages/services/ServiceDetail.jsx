import React from 'react';
import { useParams } from 'react-router-dom';

const ServiceDetail = () => {
  const { id } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-4xl font-black text-slate-900 mb-6">Service Detail Page</h1>
      <p className="text-slate-500 font-medium">Service ID: {id}</p>
      <div className="mt-10 p-10 border-2 border-dashed border-slate-200 rounded-3xl">
          Content for Service Details will appear here.
      </div>
    </div>
  );
};

export default ServiceDetail;
