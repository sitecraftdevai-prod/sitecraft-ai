import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Loader2, Sparkles, MessageCircle, Clock } from 'lucide-react';
import API from '../services/api';

const Chat = () => {
  const { projectId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [msgRes, projRes] = await Promise.all([
          API.get(`/chat/${projectId}`),
          API.get('/projects/list')
        ]);
        setMessages(msgRes.data);
        setProject(projRes.data.find(p => p._id === projectId));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [projectId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const tempMsg = { _id: Date.now(), content: newMessage, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, tempMsg]);
    setNewMessage('');

    try {
      await API.post('/chat/send', { projectId, content: newMessage });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[#C9FF31]/10 border-t-[#C9FF31] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-32 pb-10 px-6 flex flex-col selection:bg-[#C9FF31] selection:text-black">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col bg-surface border border-white/10 shadow-2xl relative overflow-hidden rounded-[48px]">
        
        {/* Chat Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-md relative z-20">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="p-3 border border-white/10 text-white rounded-xl hover:bg-[#C9FF31] hover:text-black hover:border-[#C9FF31] transition-all">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white luxury-serif italic">{project?.title || 'Secure Atelier'}</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 bg-[#C9FF31] rounded-full animate-pulse shadow-[0_0_10px_#C9FF31]" />
                <span className="text-[10px] font-black uppercase tracking-[2px] text-gray-500">Secure Correspondence Registry</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-gray-500">
             <Clock size={16} />
             <span className="text-[10px] font-black uppercase tracking-widest text-[#C9FF31]">Atelier Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        {/* Messages Archive */}
        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar bg-black/20">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={msg._id || idx}
                initial={{ opacity: 0, y: 10, x: msg.sender === 'user' ? 10 : -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[80%] flex flex-col gap-2">
                   <div className={`p-6 rounded-3xl border ${
                    msg.sender === 'user' 
                      ? 'bg-[#C9FF31] text-black border-[#C9FF31] shadow-[0_10px_30px_rgba(201,255,49,0.1)] rounded-tr-none' 
                      : 'bg-white/5 text-white border-white/10 shadow-lg rounded-tl-none'
                   }`}>
                    <p className="text-sm font-light leading-relaxed tracking-wide italic">
                      {msg.content}
                    </p>
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest text-gray-600 px-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={scrollRef} />
        </div>

        {/* Input Nexus */}
        <form onSubmit={handleSend} className="p-8 border-t border-white/5 bg-black/40 backdrop-blur-md relative z-20">
          <div className="relative flex items-center gap-6">
            <input
              type="text"
              placeholder="Transmit vision..."
              className="flex-1 bg-white/5 border border-white/10 py-5 px-8 outline-none focus:border-[#C9FF31] focus:bg-white/10 transition-all text-white font-light italic rounded-2xl"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="h-full px-10 bg-[#C9FF31] text-black py-5 font-black uppercase tracking-[3px] border border-[#C9FF31] hover:bg-white hover:border-white transition-all shadow-xl group rounded-2xl">
              <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
          <p className="mt-4 text-center text-[8px] font-black text-gray-600 uppercase tracking-widest">
            All correspondence is encrypted through proprietary atelier protocols.
          </p>
        </form>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-white/20 opacity-20 pointer-events-none" />
      </div>
    </div>
  );
};

export default Chat;
