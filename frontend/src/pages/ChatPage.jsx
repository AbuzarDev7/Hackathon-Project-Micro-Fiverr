import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  MapPin, 
  CheckCheck, 
  Clock,
  User,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';

const ChatPage = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState('p1');
  const [message, setMessage] = useState('');
  const scrollRef = useRef();

  // Mock Conversations List
  const conversations = [
    { id: 'p1', name: 'Zain Ahmed', lastMsg: 'I am available for the plumbing repair...', time: '10:30 AM', unread: 2, online: true },
    { id: 'p2', name: 'Ms. Sarah', lastMsg: 'Tomorrow 4 PM works for the session.', time: 'Yesterday', unread: 0, online: false },
    { id: 'p3', name: 'CleanPro Services', lastMsg: 'Our team will arrive by 9 AM.', time: 'Monday', unread: 0, online: true },
    { id: 'p4', name: 'Sajid Plumber', lastMsg: 'The material cost will be separate.', time: 'Jan 28', unread: 0, online: false },
  ];

  // Mock Messages for Active Chat
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi Zain, are you available tomorrow morning for a quick plumbing fix?', sender: 'me', time: '10:00 AM' },
    { id: 2, text: 'Hello! Yes, I am available tomorrow between 9 AM and 11 AM.', sender: 'them', time: '10:05 AM' },
    { id: 3, text: 'That sounds perfect. The address is Gulshan Block 4.', sender: 'me', time: '10:06 AM' },
    { id: 4, text: 'I am available for the plumbing repair. I will see you then!', sender: 'them', time: '10:30 AM' },
  ]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      text: message,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setMessage('');

    // TODO: Socket.io emit message
    // TODO: connect API POST /api/messages
  };

  const selectedChat = conversations.find(c => c.id === activeChat);

  return (
    <div className="max-w-[1400px] mx-auto h-[calc(100vh-140px)] flex bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-indigo-100/50 overflow-hidden font-['Outfit']">
      
      {/* 📁 LEFT PANEL - CONVERSATIONS (350px) */}
      <div className="w-full md:w-[400px] border-r border-slate-50 flex flex-col bg-slate-50/30">
        <div className="p-8 pb-6">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Messages</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search conversations..."
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-8">
          {conversations.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`p-5 rounded-[2rem] cursor-pointer transition-all flex items-center gap-4 group ${activeChat === chat.id ? 'bg-white shadow-xl shadow-indigo-100/50 border-transparent' : 'hover:bg-white border border-transparent hover:border-slate-100'}`}
            >
              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-lg ${activeChat === chat.id ? 'bg-indigo-600' : 'bg-slate-200 text-slate-500 group-hover:bg-indigo-400 transition-colors'}`}>
                  {chat.name.charAt(0)}
                </div>
                {chat.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-slate-900 truncate">{chat.name}</h4>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{chat.time}</span>
                </div>
                <p className={`text-xs truncate ${chat.unread > 0 ? 'font-black text-indigo-600' : 'font-medium text-slate-500'}`}>
                  {chat.lastMsg}
                </p>
              </div>
              {chat.unread > 0 && (
                <div className="w-5 h-5 bg-indigo-600 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 💬 RIGHT PANEL - CHAT WINDOW */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
        {/* Chat Header */}
        <header className="p-6 md:px-10 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button className="md:hidden p-2 text-slate-400"><ArrowLeft size={20} /></button>
             <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-black text-lg">
               {selectedChat?.name.charAt(0)}
             </div>
             <div>
               <h3 className="font-black text-slate-900 text-lg leading-tight">{selectedChat?.name}</h3>
               <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  {selectedChat?.online ? 'Online' : 'Away'}
               </p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <button className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all shadow-sm active:scale-90"><Phone size={18} /></button>
             <button className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all shadow-sm active:scale-90"><Video size={18} /></button>
             <button className="p-3 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl transition-all shadow-sm active:scale-90"><MoreVertical size={18} /></button>
          </div>
        </header>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 bg-slate-50/20">
          <div className="text-center">
             <span className="px-5 py-1.5 bg-white border border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
               Today, May 15
             </span>
          </div>
          
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}
            >
              <div className={`max-w-[70%] md:max-w-[50%] space-y-2`}>
                <div 
                  className={`py-4 px-6 rounded-3xl text-sm font-medium leading-relaxed ${
                    msg.sender === 'me' 
                      ? 'bg-indigo-600 text-white rounded-tr-sm shadow-xl shadow-indigo-100' 
                      : 'bg-white text-slate-700 rounded-tl-sm border border-slate-100 shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <div className={`flex items-center gap-2 px-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                    {msg.time}
                  </span>
                  {msg.sender === 'me' && <CheckCheck size={12} className="text-indigo-400" />}
                </div>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        {/* Messaging Input */}
        <footer className="p-6 md:px-10 border-t border-slate-50 bg-white">
          <form onSubmit={handleSend} className="bg-slate-50 p-2 rounded-3xl flex items-center gap-2 border border-transparent focus-within:border-indigo-200 focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-indigo-100 transition-all">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-grow bg-transparent border-none text-slate-800 text-sm font-medium p-4 outline-none placeholder-slate-400"
            />
            <button 
              type="submit"
              disabled={!message.trim()}
              className="p-4 bg-indigo-600 hover:bg-black text-white rounded-2xl shadow-xl shadow-indigo-200 transition-all active:scale-[0.8] disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </form>
        </footer>

        {/* Decorative corner shape */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-600/5 -z-10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default ChatPage;
