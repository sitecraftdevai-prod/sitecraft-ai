import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Topbar = ({ title }) => {
  const { user } = useAuth();

  return (
    <div className="h-20 bg-[#0f111a]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40 ml-72">
      <h1 className="text-2xl font-black text-white">{title}</h1>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search projects or clients..." 
            className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 outline-none focus:border-indigo-500/50 w-80 transition-all text-sm"
          />
        </div>

        <button className="p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all relative">
          <Bell size={20} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0f111a]" />
        </button>

        <div className="flex items-center gap-4 pl-6 border-l border-white/10">
          <div className="text-right">
            <p className="text-sm font-bold text-white leading-none">{user?.name}</p>
            <p className="text-xs text-indigo-400 font-medium mt-1">Administrator</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-lg">
            <User size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
