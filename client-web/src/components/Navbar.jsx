import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, LayoutDashboard, Code2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;
  const isDarkPage = !isActive('/') || isScrolled;

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block fixed top-6 left-0 w-full z-[1000] px-10 pointer-events-none">
        <div className="max-w-[1440px] mx-auto relative flex items-center h-16 pointer-events-auto">
          
          {/* Main Floating Pill - Fixed Width with Optimized Glassmorphism */}
          <nav className="absolute left-1/2 -translate-x-1/2 flex items-center bg-black/60 backdrop-blur-xl border border-white/20 px-10 py-2.5 rounded-full shadow-2xl w-[840px]">
            {/* Left Sector: Fixed width corner anchor */}
            <div className="w-[300px] flex items-center justify-start gap-10">
              <Link to="/about" className={`text-[11px] font-black uppercase tracking-[2px] transition-colors whitespace-nowrap ${isActive('/about') ? 'text-[#C9FF31]' : 'text-white hover:text-[#C9FF31]'}`}>About</Link>
              <Link to="/services" className={`text-[11px] font-black uppercase tracking-[2px] transition-colors whitespace-nowrap ${isActive('/services') ? 'text-[#C9FF31]' : 'text-white hover:text-[#C9FF31]'}`}>Services</Link>
            </div>

            {/* Center Logo Section - Fixed Geometric Center */}
            <div className="flex-1 flex justify-center py-1">
              <Link to="/" className="flex items-center gap-2.5 group px-10 border-x border-white/10 shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#C9FF31] flex items-center justify-center group-hover:rotate-12 transition-all shadow-[0_0_30px_rgba(255,255,255,0.6)]">
                  <Code2 size={16} className="text-black" />
                </div>
                <span className="text-lg font-black tracking-tighter text-white drop-shadow-[0_0_25px_rgba(255,255,255,1)] whitespace-nowrap">SITECRAFTDEV AI</span>
              </Link>
            </div>

            {/* Right Sector: Fixed width corner anchor */}
            <div className="w-[300px] flex items-center justify-end gap-10">
              <Link to="/portfolio" className={`text-[11px] font-black uppercase tracking-[2px] transition-colors whitespace-nowrap ${isActive('/portfolio') ? 'text-[#C9FF31]' : 'text-white hover:text-[#C9FF31]'}`}>Portfolios</Link>
              {user ? (
                <Link to="/dashboard" className={`text-[11px] font-black uppercase tracking-[2px] transition-colors flex items-center gap-1.5 whitespace-nowrap ${isActive('/dashboard') ? 'text-[#C9FF31]' : 'text-white hover:text-[#C9FF31]'}`}>
                  <LayoutDashboard size={14} className="shrink-0" /> Dashboard
                </Link>
              ) : (
                <Link to="/contact" className={`text-[11px] font-black uppercase tracking-[2px] transition-colors whitespace-nowrap ${isActive('/contact') ? 'text-[#C9FF31]' : 'text-white hover:text-[#C9FF31]'}`}>Contact</Link>
              )}
            </div>
          </nav>

          {/* Right Aligned Auth Section */}
          <div className="absolute right-0">
            {user ? (
              <button
                onClick={() => { logout(); navigate('/'); }}
                className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[2px] transition-all flex items-center gap-2 group shadow-xl ${isDarkPage
                  ? 'bg-[#C9FF31] text-black hover:bg-white shadow-[0_0_20px_rgba(201,255,49,0.3)]'
                  : 'bg-black text-white hover:bg-[#C9FF31] hover:text-black shadow-none'
                }`}
              >
                Sign Out <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <Link
                to="/login"
                className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[2px] transition-all flex items-center gap-2 group shadow-xl ${isDarkPage
                  ? 'bg-[#C9FF31] text-black hover:bg-white shadow-[0_0_30px_rgba(201,255,49,0.4)]'
                  : 'bg-black text-white hover:bg-[#C9FF31] hover:text-black shadow-none'
                }`}
              >
                Login <User size={16} className="group-hover:scale-110 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed top-0 w-full z-[100] bg-black/60 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="w-10" />
        <Link to="/" className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#C9FF31] shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
          <span className="text-white text-lg font-black tracking-tight uppercase drop-shadow-[0_0_15px_rgba(255,255,255,1)]">SitecraftDev AI</span>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white w-10 flex justify-end">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-black/80 z-[90] pt-32 px-10 flex flex-col gap-6 md:hidden"
          >
            <Link onClick={() => setIsOpen(false)} to="/dashboard" className={`text-4xl font-black uppercase tracking-tighter italic transition-colors ${isActive('/dashboard') ? 'text-[#C9FF31]' : 'text-white'}`}>Dashboard</Link>
            <Link onClick={() => setIsOpen(false)} to="/services" className={`text-4xl font-black uppercase tracking-tighter transition-colors ${isActive('/services') ? 'text-[#C9FF31]' : 'text-white'}`}>Services</Link>
            <Link onClick={() => setIsOpen(false)} to="/portfolio" className={`text-4xl font-black uppercase tracking-tighter transition-colors ${isActive('/portfolio') ? 'text-[#C9FF31]' : 'text-white'}`}>Projects</Link>
            <Link onClick={() => setIsOpen(false)} to="/about" className={`text-4xl font-black uppercase tracking-tighter transition-colors ${isActive('/about') ? 'text-[#C9FF31]' : 'text-white'}`}>About</Link>
            <Link onClick={() => setIsOpen(false)} to="/contact" className={`text-4xl font-black uppercase tracking-tighter transition-colors ${isActive('/contact') ? 'text-[#C9FF31]' : 'text-white'}`}>Contact</Link>
            <div className="mt-10 pt-10 border-t border-white/10">
              {user ? (
                <button onClick={() => { logout(); setIsOpen(false); }} className="text-left text-2xl font-black text-red-500 uppercase tracking-widest">Logout</button>
              ) : (
                <Link onClick={() => setIsOpen(false)} to="/login" className="text-2xl font-black text-[#C9FF31] uppercase tracking-widest">Login</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
