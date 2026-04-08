import React, { useState } from 'react';
import { Search, Send, Plus, Smile, Image as ImageIcon, Paperclip, MoreVertical } from 'lucide-react';

const Chat = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState('');

  const chats = [
    { id: 1, name: 'Alex Johnson', lastMsg: 'I really liked the proposal...', time: '2m ago', active: true, online: true },
    { id: 2, name: 'Sarah Wilson', lastMsg: 'Can we discuss the price?', time: '1h ago', online: false },
    { id: 3, name: 'Michael Chen', lastMsg: 'Sent you the project files.', time: '3h ago', online: true },
  ];

  return (
    <div className="h-[calc(100vh-160px)] bg-white rounded-3xl border border-slate-200 shadow-sm flex overflow-hidden">
      {/* Chat Sidebar */}
      <div className="w-80 border-r border-slate-100 flex flex-col h-full bg-slate-50/30">
        <div className="p-6">
           <h2 className="text-xl font-bold mb-4">Messages</h2>
           <div className="bg-white border border-slate-200 rounded-xl flex items-center px-4 py-2">
             <Search size={16} className="text-slate-400 mr-2" />
             <input type="text" placeholder="Search chats..." className="bg-transparent border-none outline-none text-sm w-full" />
           </div>
        </div>
        <div className="flex-grow overflow-y-auto px-3">
           {chats.map(chat => (
             <button 
               key={chat.id}
               onClick={() => setActiveChat(chat.id)}
               className={`w-full flex items-center gap-4 p-4 rounded-2xl mb-1 transition-all ${
                 activeChat === chat.id ? 'bg-white shadow-md border border-slate-100' : 'hover:bg-slate-100/50'
               }`}
             >
               <div className="relative">
                 <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center font-bold text-indigo-600">
                    {chat.name.charAt(0)}
                 </div>
                 {chat.online && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></div>}
               </div>
               <div className="flex-grow text-left">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold text-slate-900 text-sm">{chat.name}</span>
                    <span className="text-[10px] text-slate-400">{chat.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate max-w-[120px] font-medium">{chat.lastMsg}</p>
               </div>
             </button>
           ))}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex-grow flex flex-col h-full bg-white relative">
         <header className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center font-bold text-indigo-600">
                 {chats.find(c => c.id === activeChat)?.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 leading-tight">{chats.find(c => c.id === activeChat)?.name}</h4>
                <p className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                   <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Online
                </p>
              </div>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg transition-colors">
               <MoreVertical size={20} />
            </button>
         </header>

         <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/10">
            <div className="flex gap-4">
               <div className="w-8 h-8 bg-indigo-100 rounded-lg flex-shrink-0"></div>
               <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none max-w-md">
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">Hello there! I'm interested in your service. Can we talk about the delivery timeline?</p>
                  <span className="text-[10px] text-slate-400 mt-2 block font-bold uppercase tracking-wider">10:45 AM</span>
               </div>
            </div>

            <div className="flex gap-4 flex-row-reverse">
               <div className="w-8 h-8 bg-indigo-600 rounded-lg flex-shrink-0"></div>
               <div className="bg-indigo-600 p-4 rounded-2xl rounded-tr-none max-w-md shadow-lg shadow-indigo-100">
                  <p className="text-sm text-white leading-relaxed font-medium">Of course! I can deliver the first draft by tomorrow. Does that work for you?</p>
                  <span className="text-[10px] text-indigo-100/60 mt-2 block font-bold uppercase tracking-wider">10:47 AM</span>
               </div>
            </div>
         </div>

         <footer className="p-6 bg-white border-t border-slate-100">
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-2 pl-4 rounded-2xl focus-within:ring-2 ring-indigo-100 transition-all">
               <button className="text-slate-400 hover:text-slate-600"><ImageIcon size={20} /></button>
               <button className="text-slate-400 hover:text-slate-600"><Paperclip size={20} /></button>
               <input 
                 type="text" 
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 placeholder="Type your message..." 
                 className="flex-grow bg-transparent border-none outline-none text-sm font-medium h-10"
               />
               <button className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-md">
                 <Send size={18} />
               </button>
            </div>
         </footer>
      </div>
    </div>
  );
};

export default Chat;
