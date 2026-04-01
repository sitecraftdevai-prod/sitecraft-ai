import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    { id: '01', title: 'UI/UX Design', desc: 'Creating intuitive and beautiful user experiences' },
    { id: '02', title: 'Web Development', desc: 'Building responsive and scalable web applications' },
    { id: '03', title: '3D Designs', desc: 'Crafting immersive three-dimensional visuals' },
    { id: '04', title: 'Motion Graphics', desc: 'Bringing your brand to life with animation' }
  ];

  return (
    <section className="py-32 px-6 md:px-10 bg-transparent text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <div className="badge mb-8 bg-white/5 border-white/10">
              <div className="badge-dot" />
              OUR SERVICES
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight">
              Our <span className="bg-[#C9FF31] text-black px-4 rounded-xl">Services</span>
            </h2>
            <p className="text-gray-400 max-w-lg mb-16 text-base">
               We offer a range of creative and digital services designed to help your business grow. Here's what we can do for you:
            </p>

            <div className="space-y-4">
              {services.map((service) => (
                <motion.div 
                  key={service.id}
                  whileHover={{ x: 10 }}
                  className="glass-card bg-white/5 border border-white/10 p-6 md:p-8 flex items-center justify-between cursor-pointer group rounded-[48px] hover:bg-[#C9FF31]/5 hover:border-[#C9FF31]/30 transition-all shadow-xl"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-bold text-gray-500">{service.id}</span>
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-[#C9FF31] transition-colors">{service.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{service.desc}</p>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-gray-500 group-hover:text-[#C9FF31] transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="w-full aspect-[4/5] rounded-[40px] overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" 
                 alt="Project Showcase" 
                 className="w-full h-full object-cover grayscale"
               />
            </div>
            {/* Overlay Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="absolute bottom-10 right-10 left-10 md:left-auto md:w-80 bg-[#C9FF31] text-black p-8 rounded-3xl"
            >
               <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Excellence</span>
               <h3 className="text-2xl font-black mt-2 mb-4">Meet our Project</h3>
               <p className="text-sm font-medium mb-6 opacity-80">Discover how we transform ideas into reality</p>
               <button className="bg-black text-[#C9FF31] px-6 py-3 rounded-full text-xs font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                 View More <ArrowRight size={14} />
               </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
