import { useState, useEffect } from 'react';
import { Search, Filter, LayoutGrid, List } from 'lucide-react';
import Topbar from '../components/Topbar';
import ProjectCard from '../components/ProjectCard';
import api from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects/list');
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                         p.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#03040a]">
      <Topbar title="Projects" />
      
      <main className="ml-72 p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4 bg-[#161925]/50 p-2 rounded-[24px] border border-white/5">
            <button 
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-[18px] text-sm font-black transition-all ${filter === 'all' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-500 hover:text-white'}`}
            >
              All Projects
            </button>
            <button 
              onClick={() => setFilter('pending')}
              className={`px-6 py-3 rounded-[18px] text-sm font-black transition-all ${filter === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'text-gray-500 hover:text-white'}`}
            >
              Pending
            </button>
            <button 
              onClick={() => setFilter('in-progress')}
              className={`px-6 py-3 rounded-[18px] text-sm font-black transition-all ${filter === 'in-progress' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-500 hover:text-white'}`}
            >
              Active
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={`px-6 py-3 rounded-[18px] text-sm font-black transition-all ${filter === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-gray-500 hover:text-white'}`}
            >
              Completed
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-[#161925]/50 p-1.5 rounded-2xl border border-white/5">
              <button className="p-2.5 bg-indigo-600 text-white rounded-xl"><LayoutGrid size={20} /></button>
              <button className="p-2.5 text-gray-500 hover:text-white"><List size={20} /></button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-40 text-center glass rounded-[40px] border border-white/5">
              <p className="text-gray-500 font-bold text-xl uppercase tracking-widest">No matching projects found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Projects;
