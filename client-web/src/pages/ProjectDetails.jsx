import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Cpu, Layers, Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';
import API from '../services/api';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [insight, setInsight] = useState(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [insightRes, projectsRes] = await Promise.all([
          API.get(`/ai/${projectId}`),
          API.get('/projects/list')
        ]);
        
        setInsight(insightRes.data);
        const currentProject = projectsRes.data.find(p => p._id === projectId);
        setProject(currentProject);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [projectId]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[#C9FF31]/10 border-t-[#C9FF31] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen pt-48 px-10 max-w-5xl mx-auto bg-black selection:bg-[#C9FF31] selection:text-black">
      <Link to="/dashboard" className="flex items-center gap-3 text-gray-500 hover:text-[#C9FF31] mb-16 group transition-colors font-black text-[10px] uppercase tracking-[2px]">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Registry
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-16 rounded-[48px] border border-white/10 bg-surface relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-20 h-20 border-r border-t border-white/20 -mr-10 -mt-10" />
        
        <div className="flex items-center gap-8 mb-16">
          <div className="w-20 h-20 bg-[#C9FF31]/10 rounded-3xl border border-[#C9FF31]/20 flex items-center justify-center text-[#C9FF31]">
            <Sparkles size={40} strokeWidth={1} />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[5px] text-[#C9FF31] mb-2 font-bold">Technical Synthesis</h4>
            <h1 className="text-4xl font-bold text-white luxury-serif tracking-tight uppercase">Atelier <span className="lime-text-gradient italic">Intelligence</span></h1>
          </div>
        </div>

        {insight ? (
          <div className="space-y-16">
            <section>
              <h3 className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[3px] text-gray-500 mb-8 pb-2 border-b border-white/5">
                <Layers className="text-[#C9FF31]" size={16} /> Curated Tech Stack
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {insight.techStack?.map((tech, i) => (
                  <div key={i} className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black text-white tracking-widest uppercase flex items-center justify-center text-center italic shadow-sm hover:border-[#C9FF31]/50 transition-all">
                    {tech}
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <section>
                <h3 className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[3px] text-gray-500 mb-8 pb-2 border-b border-white/5">
                  <Calendar className="text-[#C9FF31]" size={16} /> Delivery Horizon
                </h3>
                <div className="p-10 rounded-[48px] bg-black/40 border border-white/10 flex flex-col items-center justify-center gap-4 shadow-xl">
                  <div className="text-5xl font-black text-white italic luxury-serif">{insight.estimatedTimeline}</div>
                  <div className="text-[10px] text-gray-500 font-black uppercase tracking-[4px]">Sovereign Delivery Window</div>
                </div>
              </section>

              <section>
                <h3 className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[3px] text-gray-500 mb-8 pb-2 border-b border-white/5">
                  <Cpu className="text-[#C9FF31]" size={16} /> Analyst Summary
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm font-light tracking-wide italic p-6 border border-dashed border-white/10 rounded-3xl">
                  "{insight.analysisSummary || insight.summary}"
                </p>
              </section>
            </div>
            
            <section className="border-t border-white/5 pt-16">
              <h3 className="text-[10px] font-black uppercase tracking-[3px] text-gray-500 mb-12 flex items-center gap-4">
                <CheckCircle2 className="text-white" size={16} /> The Sovereignty Roadmap
              </h3>
              <div className="space-y-12 max-w-2xl mx-auto">
                {[
                  { stage: 'pending', label: 'Vision Committed', desc: 'Requirements have been archived in our secure registry.' },
                  { stage: 'analyzing', label: 'Intelligence Synthesis', desc: 'AI atelier is designing your proprietary architecture.' },
                  { stage: 'developer-assigned', label: 'Crafting Phase', desc: 'Master architects are forging your digital asset.' },
                  { stage: 'completed', label: 'Sovereign Delivery', desc: 'Your platform has reached definitive excellence.' }
                ].map((s, idx) => {
                  const statusOrder = ['pending', 'analyzing', 'developer-assigned', 'completed'];
                  const projectStatusIdx = statusOrder.indexOf(project?.status || 'pending');
                  const stageIdx = idx;
                  const isCompleted = projectStatusIdx >= stageIdx;
                  const isCurrent = project?.status === s.stage;
                  
                  return (
                    <div key={idx} className="flex gap-10 relative group">
                      {idx !== 3 && <div className={`absolute left-[19px] top-10 w-[1px] h-full ${isCompleted ? 'bg-[#C9FF31]' : 'bg-white/10'}`} />}
                      <div className={`w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center shrink-0 z-10 transition-all duration-700 ${
                        isCompleted ? 'bg-[#C9FF31] text-black rotate-45 shadow-xl' : 'bg-white/5 text-gray-600'
                      }`}>
                        <div className={isCompleted ? '-rotate-45' : ''}>
                          {isCompleted ? <CheckCircle2 size={16} strokeWidth={3} /> : <div className="w-1.5 h-1.5 bg-gray-800" />}
                        </div>
                      </div>
                      <div className={`transition-all duration-700 ${isCurrent ? 'scale-105 origin-left' : isCompleted ? 'opacity-80' : 'opacity-30'}`}>
                        <h4 className={`text-sm font-black uppercase tracking-[2px] ${isCompleted ? 'text-white' : 'text-gray-600'}`}>{s.label}</h4>
                        <p className="text-xs text-gray-500 mt-2 font-light tracking-wide italic">{s.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
            
            <div className="pt-10 flex gap-6">
               <button className="flex-1 bg-[#C9FF31] text-black py-5 rounded-[48px] font-black uppercase tracking-[2px] transition-all hover:bg-white hover:text-black shadow-2xl">
                Secure Full Report
              </button>
              <Link to={`/chat/${projectId}`} className="flex-1 border border-white/20 text-white py-5 rounded-[48px] font-black uppercase tracking-[2px] transition-all hover:bg-white hover:text-black text-center">
                Contact Atelier
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-40 border border-dashed border-white/10">
            <p className="text-gray-500 font-black uppercase tracking-[5px] text-xs">Synthesis in progress...</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
