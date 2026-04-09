import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import socket from '../../utils/socket';
import { Search, MapPin, User, Star, Send, Shield, Navigation } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const FlyToLocation = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 16, { duration: 2.5 });
  }, [center, map]);
  return null;
};

const freelancerMarker = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style='background-color: #4f46e5; width: 12px; height: 12px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(79, 70, 229, 0.4);'></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

const clientMarker = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style='background-color: #ef4444; width: 12px; height: 12px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);'></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

const FreelancerRadar = () => {
  const { user, token } = useAuth();
  const routerLocation = useLocation();
  const [myPos, setMyPos] = useState(null);
  const [freelancers, setFreelancers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [focusPos, setFocusPos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [watchId, setWatchId] = useState(null);

  useEffect(() => {
     // Get start position
     navigator.geolocation.getCurrentPosition((pos) => {
        const myCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setMyPos(myCoords);
        fetchNearby(myCoords.lat, myCoords.lng);
     });
  }, []);

  useEffect(() => {
     if (freelancers.length > 0 && routerLocation.state?.focusFreelancer) {
        const target = freelancers.find(f => f._id === routerLocation.state.focusFreelancer);
        if (target) {
           setSelected(target);
           setFocusPos([target.lat, target.long]);
        }
     }
  }, [freelancers, routerLocation]);

  const fetchNearby = async (lat, lng) => {
     try {
        const res = await axios.get(`/api/location/nearby?lat=${lat}&lng=${lng}`, {
           headers: { Authorization: `Bearer ${token}` }
        });
        setFreelancers(res.data);
     } catch (err) {
        console.error("Error fetching nearby", err);
     } finally {
        setLoading(false);
     }
  };

  const startSharing = () => {
    if (!selected) return;
    setSharing(true);
    
    // Notify freelancer
    socket.emit("share_request", {
       clientId: user?._id,
       clientName: user?.name,
       freelancerId: selected._id,
       bookingId: "temp_" + Date.now() // For demo purposes
    });

    const id = navigator.geolocation.watchPosition((pos) => {
       const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
       setMyPos(newPos);
       socket.emit("client_update_location", {
          bookingId: "temp_" + Date.now(), // Match the room
          lat: newPos.lat,
          lng: newPos.lng
       });
    });
    setWatchId(id);
  };

  const stopSharing = () => {
    if (watchId) navigator.geolocation.clearWatch(watchId);
    setWatchId(null);
    setSharing(false);
  };

  if (loading) return (
     <div className="h-screen w-full flex items-center justify-center bg-slate-50 font-['Outfit']">
        <div className="text-center space-y-4">
           <Navigation className="w-12 h-12 text-indigo-600 animate-bounce mx-auto" />
           <p className="font-black text-slate-900 italic">Scanning Area for Pros...</p>
        </div>
     </div>
  );

  return (
    <div className="h-screen w-screen relative font-['Outfit'] overflow-hidden">
      
      {/* 🧭 HEADER UI */}
      <div className="absolute top-10 left-10 right-10 z-[1000] flex justify-between pointer-events-none">
         <div className="flex items-center gap-4 pointer-events-auto">
            <Link to="/active-hires" className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-3xl shadow-2xl border border-white flex items-center gap-4 group">
               <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
               <h1 className="text-lg font-black italic text-slate-900">Freelancer Radar</h1>
            </Link>
         </div>
         
         <div className="bg-slate-900 text-white px-8 py-4 rounded-3xl shadow-2xl pointer-events-auto flex items-center gap-6">
            <div className="text-center">
               <p className="text-[8px] font-black uppercase text-slate-500 tracking-widest">Nearby</p>
               <p className="text-xl font-black italic">{freelancers.length}</p>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="text-center">
               <p className="text-[8px] font-black uppercase text-slate-500 tracking-widest">Radius</p>
               <p className="text-xl font-black text-indigo-400">10 KM</p>
            </div>
         </div>
      </div>

      {/* 🗺️ MAP */}
      <div className="h-full w-full z-0">
        <MapContainer center={myPos || [24.8607, 67.0011]} zoom={14} zoomControl={false} className="h-full w-full">
           <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
           <FlyToLocation center={focusPos} />
           {myPos && <Marker position={myPos} icon={clientMarker} />}
           {freelancers.map(f => (
              <Marker 
                key={f._id} 
                position={[f.lat, f.long]} 
                icon={freelancerMarker}
                eventHandlers={{ click: () => setSelected(f) }}
              />
           ))}
        </MapContainer>
      </div>

      {/* 👤 SELECTION CARD */}
      {selected && (
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-lg bg-white/90 backdrop-blur-xl rounded-[3.5rem] p-10 shadow-2xl border border-white space-y-8 animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-6">
                  <div className="relative">
                     <div className="w-20 h-20 bg-indigo-50 p-1 rounded-[1.8rem] border border-indigo-100 overflow-hidden shadow-lg">
                        <img src={selected.avatar || `https://ui-avatars.com/api/?name=${selected.name}`} className="w-full h-full object-cover rounded-[1.5rem]" />
                     </div>
                     <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
                  </div>
                  <div>
                     <h3 className="text-2xl font-black text-slate-900">{selected.name}</h3>
                     <div className="flex items-center gap-2 mt-1">
                        <Star className="text-amber-500 fill-amber-500" size={14} />
                        <span className="text-sm font-black text-slate-700">{selected.rating || '5.0'}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase ml-2">{selected.location}</span>
                     </div>
                  </div>
               </div>
               <button onClick={() => setSelected(null)} className="p-3 bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-colors">&times;</button>
            </div>

            <p className="text-sm font-medium text-slate-500 leading-relaxed italic">"{selected.bio || 'Professional freelancer ready for your task.'}"</p>

            <div className="flex flex-col gap-4">
               {sharing ? (
                  <button 
                    onClick={stopSharing}
                    className="w-full py-5 bg-red-600 hover:bg-black text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-red-100"
                  >
                     <Navigation size={20} /> Stop Location sharing
                  </button>
               ) : (
                  <button 
                    onClick={startSharing}
                    className="w-full py-5 bg-indigo-600 hover:bg-black text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-indigo-100"
                  >
                     <Send size={18} /> Share Live Location
                  </button>
               )}
               <div className="flex items-center justify-center gap-2 text-slate-400">
                  <Shield size={12} />
                  <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted</span>
               </div>
            </div>
         </div>
      )}

    </div>
  );
};

export default FreelancerRadar;
