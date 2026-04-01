import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Clock, CheckCircle, TrendingUp, Filter } from 'lucide-react';
import Topbar from '../components/Topbar';
import StatsCard from '../components/StatsCard';
import ProjectCard from '../components/ProjectCard';
import api from '../services/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    active: 0,
    completed: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await api.get('/projects/list'); // Using general list for now
      if (data && Array.isArray(data)) {
        setProjects(data.slice(0, 6)); // Show latest 6
        
        const counts = {
          total: data.length,
          pending: data.filter(p => p.status === 'pending').length,
          active: data.filter(p => p.status === 'in-progress').length,
          completed: data.filter(p => p.status === 'completed').length
        };
        setStats(counts);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#03040a]">
      <Topbar title="Overview" />
      
      <main className="ml-72 p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <StatsCard 
            label="Total Projects" 
            value={stats.total} 
            icon={Briefcase} 
            colorClass="bg-indigo-600/10 text-indigo-400"
            trend="12"
          />
          <StatsCard 
            label="Pending Approval" 
            value={stats.pending} 
            icon={Clock} 
            colorClass="bg-yellow-500/10 text-yellow-500"
          />
          <StatsCard 
            label="Active Builds" 
            value={stats.active} 
            icon={TrendingUp} 
            colorClass="bg-emerald-500/10 text-emerald-400"
            trend="5"
          />
          <StatsCard 
            label="Completed" 
            value={stats.completed} 
            icon={CheckCircle} 
            colorClass="bg-purple-500/10 text-purple-400"
          />
        </div>

        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-white mb-2">Recent Projects</h2>
            <p className="text-gray-500 font-medium">Monitoring the latest client requirements</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 font-bold hover:bg-white/10 transition-all text-sm">
            <Filter size={18} />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
          {projects.length === 0 && (
            <div className="col-span-full py-20 text-center glass rounded-[40px] border border-white/5">
              <p className="text-gray-500 font-bold text-xl">No active projects found.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
