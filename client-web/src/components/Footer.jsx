import { Link } from 'react-router-dom';
import { Code2, Github, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 md:px-10 py-24 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-3xl font-black mb-8 group">
              <div className="w-8 h-8 rounded-full bg-[#C9FF31] flex items-center justify-center shadow-[0_0_15px_rgba(201,255,49,0.3)]">
                 <Code2 size={16} className="text-black" />
              </div>
              <span className="text-white tracking-tight uppercase">SitecraftDev</span>
            </Link>
            <p className="text-gray-400 text-lg max-w-sm mb-10">
              Transforming your vision into digital reality with cutting-edge design and creative strategy.
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#C9FF31] hover:text-black hover:border-[#C9FF31] transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C9FF31] mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Services', 'Projects', 'Reviews', 'About'].map((item, i) => (
                <li key={i}>
                  <Link to={`/${item.toLowerCase()}`} className="text-sm font-medium text-gray-500 hover:text-[#C9FF31] transition-colors flex items-center gap-2 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C9FF31] mb-8">Contact</h4>
            <ul className="space-y-6">
              <li>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email Us</p>
                <p className="text-sm font-black text-white">hello@sitecraftdev.ai</p>
              </li>
              <li>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Visit Us</p>
                <p className="text-sm font-black text-white">Digital Arts District <br />Creative Valley, CA</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium text-gray-500">
            &copy; {new Date().getFullYear()} SitecraftDev AI Agency. All Rights Reserved.
          </p>
          <div className="flex gap-10">
            <a href="#" className="text-xs font-medium text-gray-500 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-xs font-medium text-gray-500 hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
