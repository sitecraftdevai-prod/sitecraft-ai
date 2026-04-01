import { useState, useEffect } from 'react';
import { Send, User, Search, Paperclip, Smile, MessageSquare } from 'lucide-react';
import Topbar from '../components/Topbar';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');

  const contacts = [
    { id: 1, name: 'John Doe', project: 'Nexus E-commerce', lastMsg: 'When will the UI be ready?', time: '2h ago', online: true },
    { id: 2, name: 'Sarah Smith', project: 'Lumina App', lastMsg: 'Thanks for the update!', time: '1d ago', online: false },
  ];

  return (
    <div className="min-h-screen bg-[#03040a]">
      <Topbar title="Messages" />
      
      <main className="ml-72 flex h-[calc(100vh-80px)]">
        {/* Contact List */}
        <div className="w-96 border-r border-white/5 flex flex-col">
          <div className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 outline-none focus:border-indigo-500/50 transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 space-y-2">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setActiveChat(contact)}
                className={`w-full p-4 rounded-3xl flex items-center gap-4 transition-all ${
                  activeChat?.id === contact.id ? 'bg-indigo-600/10 border border-indigo-500/20' : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400">
                    <User size={24} />
                  </div>
                  {contact.online && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#03040a]" />
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-white truncate">{contact.name}</h4>
                    <span className="text-[10px] text-gray-500 font-bold uppercase">{contact.time}</span>
                  </div>
                  <p className="text-xs text-indigo-400 font-bold mb-1 truncate">{contact.project}</p>
                  <p className="text-xs text-gray-400 truncate">{contact.lastMsg}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-[#0f111a]/30">
          {activeChat ? (
            <>
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white leading-none">{activeChat.name}</h3>
                    <p className="text-xs text-emerald-400 font-bold mt-1.5 uppercase tracking-widest">Active Now</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="flex flex-col items-center py-10">
                  <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                    Start of conversation
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="glass p-4 rounded-[32px] border border-white/5 flex items-center gap-4 bg-[#161925]/50">
                  <button className="p-3 text-gray-500 hover:text-white transition-colors">
                    <Paperclip size={20} />
                  </button>
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="flex-1 bg-transparent outline-none text-white font-medium"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className="flex items-center gap-2">
                    <button className="p-3 text-gray-500 hover:text-white transition-colors">
                      <Smile size={20} />
                    </button>
                    <button className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-indigo-600/20">
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-20">
              <div className="w-24 h-24 rounded-[32px] bg-white/5 flex items-center justify-center text-gray-700 mb-8 border border-white/5">
                <MessageSquare size={48} />
              </div>
              <h2 className="text-2xl font-black text-white mb-4">Select a conversation</h2>
              <p className="text-gray-500 max-w-sm font-medium">
                Choose a client from the list on the left to start coordinating project development.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Messages;
