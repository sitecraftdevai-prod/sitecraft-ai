import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      id: '01',
      title: 'A CREATIVE DESIGN AGENCY',
      desc: 'Collaborative ideation and strategy',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: '02',
      title: 'EXECUTION & REFINEMENT',
      desc: 'Bringing visions to life with precision',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  return (
    <section className="py-32 px-6 md:px-10 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
             <div className="badge mb-8 bg-white/5 border-white/10">
               <Sparkles size={14} className="text-[#C9FF31]" />
               OUR PROCESS
             </div>
             <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
               Turning Ideas <br /> Into Masterpieces
             </h2>
          </div>
          <p className="text-gray-500 max-w-sm text-base">
             We believe the best designs emerge from collaborative brainstorming. Our creative process is designed to turn your ideas into polished final products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {steps.map((step) => (
            <motion.div 
              key={step.id}
              whileHover={{ y: -10 }}
              className="relative rounded-[40px] overflow-hidden group aspect-[1.2/1] shadow-2xl"
            >
               <img src={step.image} alt={step.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
               
               <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-[#C9FF31] p-8 rounded-3xl flex items-center justify-between">
                     <div>
                        <span className="text-[10px] font-bold text-black opacity-70 uppercase tracking-widest">Step {step.id}</span>
                        <h3 className="text-xl font-black text-black mt-2">{step.title}</h3>
                        <p className="text-sm font-medium text-black/60 mt-1">{step.desc}</p>
                     </div>
                     <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-[#C9FF31] group-hover:rotate-[-45deg] transition-transform">
                        <ArrowRight size={24} />
                     </div>
                  </div>
               </div>
            </motion.div>
          ))}
        </div>
        
        {/* Banner Text from Image 4 */}
        <div className="mt-40 text-center border-t border-white/5 pt-40">
           <h2 className="text-5xl md:text-[90px] font-black text-white tracking-tighter leading-none [text-shadow:0_0_30px_rgba(255,255,255,0.25)]">
             Innovate <span className="text-[#C9FF31] [text-shadow:0_0_40px_rgba(201,255,49,0.6)] animate-pulse">+</span> Inspire <span className="text-[#C9FF31] [text-shadow:0_0_40px_rgba(201,255,49,0.6)] animate-pulse">+</span> Create
           </h2>
           <div className="w-32 h-1 bg-[#C9FF31] mx-auto mt-12 rounded-full shadow-[0_4px_20px_rgba(201,255,49,0.3)]" />
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
