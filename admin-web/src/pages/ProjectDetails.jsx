import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Clock, PlayCircle, ShieldCheck, ChevronRight, MessageSquare, Code } from 'lucide-react';
import Topbar from '../components/Topbar';
import api from '../services/api';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [insights, setInsights] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const { data } = await api.get(`/projects/${projectId}`);
      setProject(data);
      
      const insightRes = await api.get(`/ai/${projectId}`);
      setInsights(insightRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (newStatus) => {
    setUpdating(true);
    try {
      await api.patch(`/projects/${projectId}/status`, { status: newStatus });
      setProject({ ...project, status: newStatus });
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (!project) return null;

  const stages = [
    { id: 'pending', label: 'Analysis', icon: Clock },
    { id: 'in-progress', label: 'Development', icon: PlayCircle },
    { id: 'completed', label: 'Delivery', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-[#03040a]">
      <Topbar title="Project Command" />
      
      <main className="ml-72 p-10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 group transition-colors font-bold"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          <div className="xl:col-span-2 space-y-10">
            {/* Project Header */}
            <div className="glass p-12 rounded-[48px] border border-white/5 bg-[#161925]/30">
              <div className="flex justify-between items-start mb-8">
                <h1 className="text-4xl font-black text-white">{project.title}</h1>
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                    <MessageSquare size={18} /> Chat with Client
                  </button>
                </div>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">{project.description}</p>
              
              <div className="grid grid-cols-3 gap-6">
                {stages.map((stage) => {
                  const isActive = project.status === stage.id;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => updateStatus(stage.id)}
                      disabled={updating}
                      className={`flex flex-col items-center gap-4 p-8 rounded-[32px] border transition-all ${
                        isActive 
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-2xl shadow-indigo-600/20' 
                          : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'
                      }`}
                    >
                      <stage.icon size={32} />
                      <span className="font-black uppercase tracking-widest text-xs">{stage.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Insights Panel */}
            {insights && (
              <div className="glass p-12 rounded-[48px] border border-white/5 bg-indigo-600/5">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                    <Code size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-white">AI Technical Roadmap</h2>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="p-8 rounded-[32px] bg-white/5 border border-white/10">
                      <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Recommended Stack</p>
                      <ul className="space-y-3">
                        {insights.technicalStack?.map((tech, i) => (
                          <li key={i} className="flex items-center gap-3 text-white font-bold">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-8 rounded-[32px] bg-white/5 border border-white/10">
                      <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Estimated Timeline</p>
                      <p className="text-3xl font-black text-white">{insights.estimatedTimeline || 'Flexible'}</p>
                      <p className="text-sm text-gray-500 mt-2 font-medium">Based on project scope complexity</p>
                    </div>
                  </div>
                  
                  <div className="p-8 rounded-[32px] bg-white/5 border border-white/10">
                    <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Analysis Summary</p>
                    <p className="text-gray-300 leading-relaxed font-medium">{insights.summary}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            {/* Client Info */}
            <div className="glass p-10 rounded-[40px] border border-white/5 bg-[#161925]/30">
              <h3 className="text-xl font-black text-white mb-6">Client Profile</h3>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-[24px] bg-emerald-600/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <p className="text-lg font-black text-white">Verified Client</p>
                  <p className="text-sm text-gray-500 font-medium">Member since 2024</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Email</span>
                  <span className="text-white font-medium">client@example.com</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Projects</span>
                  <span className="text-white font-medium">3 Total</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass p-10 rounded-[40px] border border-white/5 bg-[#161925]/30">
              <h3 className="text-xl font-black text-white mb-6">Quick Actions</h3>
              <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold mb-4 transition-all shadow-lg shadow-indigo-600/20">
                Generate Quotation
              </button>
              <button className="w-full py-4 bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 rounded-2xl font-bold transition-all">
                Assign Developer
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;
