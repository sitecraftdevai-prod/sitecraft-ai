import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const Portfolio = () => {
  const projects = [
    { title: 'Nexus Sovereign', category: 'Proprietary Web Platform', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2026' },
    { title: 'Lumina Grand', category: 'Bespoke Mobile Experience', image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=2070' },
    { title: 'Aether Core', category: 'Strategic Intelligence Command', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070' },
    { title: 'Zenith Prime', category: 'High-Performance Ecosystem', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072' },
  ];

  return (
    <div className="min-h-screen pt-48 bg-black selection:bg-[#C9FF31] selection:text-black">
      <div className="max-w-7xl mx-auto px-10 mb-32">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-32 text-center"
        >
          <h4 className="text-[10px] font-black uppercase tracking-[5px] text-[#C9FF31] mb-6 font-bold">Signature Showcase</h4>
          <h1 className="text-4xl md:text-7xl font-bold mb-10 luxury-serif text-white uppercase tracking-tighter leading-none">The Gallery of <span className="lime-text-gradient italic">Craft</span></h1>
          <p className="text-gray-400 text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed italic">
            A curated selection of digital assets defined by technical sovereignty and uncompromising elegance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] rounded-[48px] overflow-hidden bg-white/5 border border-white/10 mb-8 relative shadow-2xl group-hover:border-[#C9FF31]/50 transition-all duration-500">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-700 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0 rounded-[48px]"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-20" />
              </div>
              <div className="flex justify-between items-end px-2">
                 <div>
                    <span className="text-[10px] font-black text-[#C9FF31] uppercase tracking-[3px] font-bold">{project.category}</span>
                    <h3 className="text-3xl font-bold mt-2 text-white luxury-serif tracking-tight group-hover:text-[#C9FF31] transition-colors italic">{project.title}</h3>
                 </div>
                 <div className="w-12 h-[1px] bg-white/20 group-hover:w-24 group-hover:bg-[#C9FF31] transition-all duration-700 mb-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;
