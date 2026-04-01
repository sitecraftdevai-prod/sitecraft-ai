import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative bg-white pt-40 pb-20 px-6 md:px-10 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-[20%] left-10 w-20 h-20 opacity-40">
         <div className="w-full h-full border border-[#C9FF31] rounded-full flex items-center justify-center animate-spin-slow">
            <div className="w-1 h-20 bg-[#C9FF31]" />
         </div>
      </div>
      <div className="absolute top-[15%] right-20 w-16 h-16 opacity-20">
         <div className="w-full h-full border-t-2 border-l-2 border-[#C9FF31] rotate-45" />
      </div>

      <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl font-black text-black mb-8 md:mb-12 leading-[1.1] z-10"
        >
          Your Success, Our Focus. <br className="hidden md:block" /> Built with <span className="text-[#C9FF31]">Trust.</span>
        </motion.h1>

        <div className="relative w-full max-w-5xl flex flex-col items-center">
          {/* Side Info - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 text-left z-20"
          >
            <p className="text-gray-600 text-xs leading-relaxed max-w-[180px]">
              From web development to branding, we transform your vision into reality. Let's create something exceptional together.
            </p>
            <Link to="/portfolio" className="inline-flex items-center gap-2 mt-6 px-6 py-2 rounded-full border border-black/10 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-[#C9FF31] hover:text-black hover:border-[#C9FF31] transition-all">
              Innovate Your Brand
            </Link>
          </motion.div>

          {/* Center Team Image Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-2xl flex flex-col items-center justify-center py-10"
          >
            <div className="relative w-full max-w-[500px] flex justify-center mx-auto">
              <img 
                src="/hero-team.png" 
                alt="SitecraftDev AI Team" 
                className="w-full h-auto object-contain relative z-10"
              />
              
              {/* Aman Sharma Label (Left - Brown Sweater) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
                transition={{ 
                  opacity: { delay: 0.8 }, 
                  scale: { delay: 0.8, type: "spring" }, 
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 } 
                }}
                className="absolute top-[-5%] md:top-[0%] left-[10%] md:left-[15%] z-20 flex flex-col items-center"
              >
                <div className="bg-black text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-3 md:px-4 py-1.5 md:py-2 rounded-[10px] shadow-2xl border border-white/10">
                  Aman Sharma
                </div>
                <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-t-black -mt-[1px]"></div>
              </motion.div>

              {/* Nitish Yadav Label (Right - Blue Polo) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
                transition={{ 
                  opacity: { delay: 1 }, 
                  scale: { delay: 1, type: "spring" }, 
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.5 } 
                }}
                className="absolute top-[2%] md:top-[6%] right-[10%] md:right-[15%] z-20 flex flex-col items-center"
              >
                <div className="bg-[#C9FF31] text-black text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-3 md:px-4 py-1.5 md:py-2 rounded-[10px] shadow-2xl border border-black/10">
                  Nitish Yadav
                </div>
                <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#C9FF31] -mt-[1px]"></div>
              </motion.div>
            </div>
            
            {/* CTA Buttons - Floating below the characters */}
            <div className="absolute bottom-4 md:bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30 w-max">
               <button className="bg-[#C9FF31] text-black text-xs font-bold px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 border border-[#C9FF31]">
                 Start Your Project <ArrowRight size={14} />
               </button>
               <button className="bg-white text-black text-xs font-bold px-8 py-4 rounded-full shadow-xl hover:bg-gray-50 border border-black transition-all">
                 Let's Collaborate
               </button>
            </div>
          </motion.div>

          {/* Side Info - Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 text-right z-20"
          >
            <div className="flex justify-end gap-1 mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#C9FF31" className="text-[#C9FF31]" />)}
            </div>
            <h3 className="text-4xl font-black text-black">Elite</h3>
            <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-1">Craftsmanship</p>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;

