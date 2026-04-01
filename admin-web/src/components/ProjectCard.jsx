import { motion } from 'framer-motion';
import { Clock, MessageSquare, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, onStatusChange }) => {
  const statusColors = {
    pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'in-progress': 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
    completed: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 rounded-[32px] glass border border-white/5 bg-[#161925]/30 hover:bg-[#161925]/50 transition-all group"
    >
      <div className="flex justify-between items-start mb-6">
        <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${statusColors[project.status]}`}>
          {project.status}
        </span>
        <button className="text-gray-500 hover:text-white transition-colors">
          <MoreHorizontal size={24} />
        </button>
      </div>

      <h3 className="text-2xl font-black text-white mb-3 group-hover:text-indigo-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm mb-8 line-clamp-2 leading-relaxed">
        {project.description}
      </p>

      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <div className="flex -space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 border-4 border-[#0f111a] flex items-center justify-center text-xs font-bold text-white shadow-lg">
            JD
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-600 border-4 border-[#0f111a] flex items-center justify-center text-xs font-bold text-white shadow-lg">
            SK
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/messages?project=${project._id}`}
            className="p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <MessageSquare size={20} />
          </Link>
          <Link
            to={`/projects/${project._id}`}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-indigo-600/20"
          >
            Details
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
