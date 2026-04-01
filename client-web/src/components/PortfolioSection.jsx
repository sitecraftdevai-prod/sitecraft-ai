import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PortfolioSection = () => {
  const projects = [
    { 
      title: 'Nexus Sovereign', 
      category: 'Proprietary Web Platform', 
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2026' 
    },
    { 
      title: 'Lumina Grand', 
      category: 'Bespoke Mobile Experience', 
      image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=2070' 
    },
    { 
      title: 'Aether Core', 
      category: 'Strategic Intelligence Command', 
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070' 
    }
  ];

  return (
    <section className="py-32 px-6 md:px-10 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
             <div className="badge mb-8 bg-white/5 border-white/10">
               <div className="badge-dot" />
               FEATURED WORK
             </div>
              <h2 className="text-3xl md:text-6xl font-black text-white leading-tight uppercase">
                Signature <br className="hidden md:block" />
                <span className="lime-text-gradient italic">Artifacts.</span>
              </h2>
          </div>
          <Link to="/portfolio" className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-[#C9FF31] hover:text-black hover:border-[#C9FF31] transition-all group shadow-sm">
            View Full Gallery <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-[16/10] overflow-hidden bg-white/5 border border-white/10 mb-8 relative shadow-2xl group-hover:border-[#C9FF31]/50 transition-all duration-500 rounded-[48px]">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <span className="text-[10px] font-black text-[#C9FF31] uppercase tracking-[3px]">{project.category}</span>
                <h3 className="text-2xl font-bold mt-2 text-white luxury-serif italic group-hover:text-[#C9FF31] transition-colors">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
