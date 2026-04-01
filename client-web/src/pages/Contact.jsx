import { motion } from 'framer-motion';
import { Mail, Globe, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen pt-48 bg-black selection:bg-[#C9FF31] selection:text-black">
      <div className="max-w-7xl mx-auto px-10 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-[10px] font-black uppercase tracking-[5px] text-[#C9FF31] mb-6 font-bold">Inquiries</h4>
            <h1 className="text-6xl font-black mb-10 text-white luxury-serif tracking-tighter leading-tight uppercase">
              Initiate <br />
              <span className="lime-text-gradient italic">Dialogue.</span>
            </h1>
            <p className="text-gray-400 text-lg font-light tracking-wide mb-16 leading-relaxed italic">
              We operate at the intersection of master craftsmanship and technical sovereignty. <br />
              Secure your place in the digital future.
            </p>

            <div className="space-y-12">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-white group-hover:bg-[#C9FF31] group-hover:text-black transition-all duration-500">
                  <Mail size={24} strokeWidth={1} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-[3px] mb-1">Electronic Correspondence</p>
                  <p className="text-xl font-bold text-white luxury-serif group-hover:text-[#C9FF31] transition-colors italic">atelier@sitecraft.ai</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-white group-hover:bg-[#C9FF31] group-hover:text-black transition-all duration-500">
                  <Globe size={24} strokeWidth={1} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-[3px] mb-1">Global Presence</p>
                  <p className="text-xl font-bold text-white luxury-serif group-hover:text-[#C9FF31] transition-colors italic">Unified Digital Atelier</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="p-16 rounded-[48px] bg-surface border border-white/10 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-20 h-20 border-r border-t border-white/20 -mr-10 -mt-10" />
            
            <form className="space-y-10">
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[3px]">Given Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#C9FF31] transition-all text-white font-light" placeholder="Alexander" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[3px]">Surname</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#C9FF31] transition-all text-white font-light" placeholder="Sterling" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[3px]">Email coordinates</label>
                <input type="email" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#C9FF31] transition-all text-white font-light" placeholder="identity@domain.com" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[3px]">Project Vision</label>
                <textarea rows={4} className="w-full bg-transparent border border-white/10 rounded-2xl p-6 outline-none focus:border-[#C9FF31] transition-all text-white font-light resize-none" placeholder="Describe the architectural ambition..." />
              </div>
              <button className="w-full bg-[#C9FF31] text-black py-6 rounded-[48px] font-black uppercase tracking-[3px] transition-all hover:bg-white hover:text-black hover:scale-[1.02] border border-[#C9FF31] shadow-2xl flex items-center justify-center gap-4 group">
                Transmit Inquiry <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
