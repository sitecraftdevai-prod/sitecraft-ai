import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  Users, 
  LogOut,
  Code2,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Briefcase, label: 'Projects', path: '/projects' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-72 h-screen bg-[#0f111a] border-r border-white/5 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
          <Code2 className="text-white" size={24} />
        </div>
        <span className="text-xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          SitecraftDev Admin
        </span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${
              location.pathname === item.path
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={22} className={location.pathname === item.path ? 'text-white' : 'text-gray-500 group-hover:text-white'} />
            <span className="font-bold">{item.label}</span>
          </Link>
        ))}
        <a 
          href="http://localhost:5173" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-400 hover:bg-white/5 hover:text-white transition-all group mt-6 border-t border-white/5 pt-6"
        >
          <ExternalLink size={22} className="text-gray-500 group-hover:text-white" />
          <span className="font-bold uppercase text-[10px] tracking-widest">View Website</span>
        </a>
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={logout}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold"
        >
          <LogOut size={22} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
