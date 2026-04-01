import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Briefcase, MessageSquare, ExternalLink, Clock, Trash2 } from 'lucide-react';
import API from '../services/api';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await API.get('/projects/list');
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Archive this project?')) return;
    try {
      await API.delete(`/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-48 px-6 md:px-10 selection:bg-[#C9FF31] selection:text-black">
      <div className="max-w-7xl mx-auto mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20 border-b border-white/5 pb-10">
          <div>
            <div className="badge mb-4">
               <div className="badge-dot" />
               CLIENT PORTAL
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight">Your <span className="text-[#C9FF31]">Projects</span></h1>
          </div>
          <Link 
            to="/start" 
            className="neon-btn text-sm px-10 py-5 group"
          >
            Start New Project <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="py-40 text-center">
            <div className="w-12 h-12 border-2 border-[#C9FF31]/10 border-t-[#C9FF31] rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(projects) && projects.map((project) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className="glass-card p-8 relative overflow-hidden group"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#C9FF31]/10 flex items-center justify-center text-[#C9FF31] group-hover:bg-[#C9FF31] group-hover:text-black transition-all">
                    <Briefcase size={22} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white mb-4 group-hover:text-[#C9FF31] transition-colors">{project.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-8 font-medium">
                  {project.description}
                </p>

                <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                  <Link to={`/project/${project._id}`} className="flex-1 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C9FF31] bg-[#C9FF31]/5 py-3 rounded-xl hover:bg-[#C9FF31] hover:text-black transition-all">
                    Details <ExternalLink size={14} />
                  </Link>
                  <Link to={`/chat/${project._id}`} className="p-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all">
                    <MessageSquare size={16} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(project._id)}
                    className="p-3 bg-white/5 text-red-500 rounded-xl hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}

            {(!projects || projects.length === 0) && (
              <div className="col-span-full py-40 text-center border border-dashed border-white/10 rounded-[40px]">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Your registry is empty</p>
                <Link to="/start" className="text-[#C9FF31] text-[10px] font-black uppercase mt-4 inline-block hover:underline">Launch your first vision</Link>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
