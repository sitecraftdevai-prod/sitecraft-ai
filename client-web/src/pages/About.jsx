import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Layout, MessageSquare, Heart, Shield, Zap, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import API from '../services/api';

const About = () => {
  const { user } = useAuth();
  const [activeProject, setActiveProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchProject = async () => {
        setLoading(true);
        try {
          const { data } = await API.get('/projects/list');
          if (data && data.length > 0) {
            setActiveProject(data[0]); // Show the most recent project
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [user]);

  const roadmapStages = [
    { stage: 'pending', label: 'Vision Committed', desc: 'Requirements archived.' },
    { stage: 'analyzing', label: 'Intelligence Synthesis', desc: 'AI designing architecture.' },
    { stage: 'developer-assigned', label: 'Crafting Phase', desc: 'Architects forging asset.' },
    { stage: 'completed', label: 'Sovereign Delivery', desc: 'Reached definitive excellence.' }
  ];

  return (
    <div className="min-h-screen bg-black pt-48 selection:bg-[#C9FF31] selection:text-black text-white">
      <div className="max-w-7xl mx-auto px-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32 text-center"
        >
          <h4 className="text-[10px] font-black uppercase tracking-[5px] text-[#C9FF31] mb-6 font-bold">The Atelier Manifesto</h4>
          <h1 className="text-4xl md:text-7xl font-bold mb-10 luxury-serif text-white uppercase tracking-tighter leading-[1.1]">
            Engineering <span className="lime-text-gradient italic">Sovereignty</span> <br className="hidden md:block" /> In a Digital Age
          </h1>
          <p className="text-gray-400 text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed italic">
            SitecraftDev AI is not just an agency; it is a proprietary atelier where logic meets art, and every line of code is a stroke of master craftsmanship.
          </p>
        </motion.div>

        {/* Client Portal Section - The "Live" Feature */}
        <section className="mb-48">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h4 className="text-[10px] font-black uppercase tracking-[5px] text-[#C9FF31] mb-6 font-bold">Integrated Experience</h4>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase">Your Private <span className="lime-text-gradient italic">Atelier Portal</span></h2>
            </div>
            <p className="text-gray-500 max-w-sm text-sm italic font-light">
              Experience technical transparency. High-fidelity tracking of your digital asset from genesis to delivery.
            </p>
          </div>

          <div className="glass-card p-12 relative overflow-hidden group border-white/5 bg-surface rounded-[48px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9FF31]/5 rounded-full blur-[100px] -mr-32 -mt-32" />
            
            {user ? (
              loading ? (
                <div className="py-20 text-center">
                   <div className="w-10 h-10 border-2 border-[#C9FF31]/10 border-t-[#C9FF31] rounded-full animate-spin mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-6">Retrieving Registry...</p>
                </div>
              ) : activeProject ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                  {/* Website Life Cycle */}
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                       <Clock className="text-[#C9FF31]" size={20} />
                       <h3 className="text-xl font-black uppercase tracking-widest text-white">Live Life Cycle</h3>
                    </div>
                    
                    <div className="space-y-10">
                      {roadmapStages.map((s, idx) => {
                        const statusOrder = ['pending', 'analyzing', 'developer-assigned', 'completed'];
                        const projectStatusIdx = statusOrder.indexOf(activeProject.status || 'pending');
                        const isCompleted = projectStatusIdx >= idx;
                        const isCurrent = activeProject.status === s.stage;

                        return (
                          <div key={idx} className="flex gap-8 relative group">
                            {idx !== 3 && <div className={`absolute left-[15px] top-8 w-[1px] h-[calc(100%+40px)] ${isCompleted ? 'bg-[#C9FF31]' : 'bg-white/10'}`} />}
                            <div className={`w-8 h-8 rounded-none border border-white/10 flex items-center justify-center shrink-0 z-10 transition-all duration-700 ${
                              isCompleted ? 'bg-[#C9FF31] text-black rotate-45' : 'bg-white/5 text-gray-700'
                            }`}>
                              <div className={isCompleted ? '-rotate-45' : ''}>
                                {isCompleted ? <CheckCircle2 size={14} strokeWidth={3} /> : <div className="w-1 h-1 bg-gray-800" />}
                              </div>
                            </div>
                            <div className={`transition-all duration-700 ${isCurrent ? 'scale-105 origin-left' : isCompleted ? 'opacity-80' : 'opacity-30'}`}>
                              <h4 className={`text-[11px] font-black uppercase tracking-[2px] ${isCompleted ? 'text-white' : 'text-gray-500'}`}>{s.label}</h4>
                              <p className="text-[10px] text-gray-500 mt-1 font-light italic">{s.desc}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Actions & Feedback */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-black text-white luxury-serif italic mb-6">{activeProject.title}</h3>
                      <p className="text-gray-400 text-sm font-light leading-relaxed italic mb-10 leading-relaxed">
                        Currently in the <span className="text-[#C9FF31] font-bold uppercase">{activeProject.status}</span> phase. Our architects are focusing on {activeProject.category || 'your requirement'}.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link to={`/chat/${activeProject._id}`} className="bg-white/5 border border-white/10 p-6 flex flex-col items-center gap-4 hover:border-[#C9FF31] hover:bg-[#C9FF31]/10 transition-all group">
                          <MessageSquare className="text-[#C9FF31] group-hover:scale-110 transition-transform" size={24} />
                          <span className="text-[10px] font-black uppercase tracking-[3px]">Secure Chat</span>
                        </Link>
                        <Link to={`/project/${activeProject._id}`} className="bg-white/5 border border-white/10 p-6 flex flex-col items-center gap-4 hover:border-[#C9FF31] hover:bg-[#C9FF31]/10 transition-all group">
                          <Layout className="text-[#C9FF31] group-hover:scale-110 transition-transform" size={24} />
                          <span className="text-[10px] font-black uppercase tracking-[3px]">Project Details</span>
                        </Link>
                      </div>
                    </div>

                    <div className="mt-12 pt-10 border-t border-white/5">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-[4px] mb-6 text-center">Protocol Feedback Loop</p>
                      <div className="flex gap-4">
                        <input 
                          type="text" 
                          placeholder="Provide immediate architectural feedback..."
                          className="flex-1 bg-black/40 border border-white/10 px-6 py-4 outline-none focus:border-[#C9FF31] transition-all text-xs font-light italic"
                        />
                        <button className="bg-[#C9FF31] text-black px-6 py-4 font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all">Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center">
                   <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">Your Registry is Empty</h3>
                   <p className="text-gray-500 text-sm mb-10 italic max-w-sm mx-auto">Commit your first vision to the registry to unlock the atelier experience.</p>
                   <Link to="/start" className="neon-btn px-10 py-5 mx-auto">Forge Your Genesis</Link>
                </div>
              )
            ) : (
              <div className="py-20 text-center">
                <div className="w-20 h-20 bg-[#C9FF31]/10 border border-[#C9FF31]/20 flex items-center justify-center text-[#C9FF31] mx-auto mb-10 rotate-45">
                   <Shield className="-rotate-45" size={32} />
                </div>
                <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter italic">Access Restricted</h3>
                <p className="text-gray-500 text-sm mb-10 italic max-w-md mx-auto">
                  The Client Portal is reserved for authorized visions. Log in to track your website life cycle and communicate with our master architects.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Link to="/login" className="bg-[#C9FF31] text-black px-10 py-5 rounded-none font-black uppercase tracking-[3px] hover:bg-white transition-all">Login</Link>
                   <Link to="/register" className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-none font-black uppercase tracking-[3px] hover:bg-white hover:text-black transition-all">Register Vision</Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Agency Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-48">
          {[
            { icon: Sparkles, title: 'Master Craftsmanship', desc: 'Every project is handled with surgical precision and artistic intent.' },
            { icon: Shield, title: 'Technical Sovereignty', desc: 'We build proprietary foundations that serve your long-term vision.' },
            { icon: Zap, title: 'Strategic Intelligence', desc: 'Integrating AI and logic to propel your brand beyond the frontier.' }
          ].map((val, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-10 border border-white/5 bg-surface rounded-[48px]"
            >
              <val.icon className="text-[#C9FF31] mb-8" size={32} strokeWidth={1} />
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{val.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed italic">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
