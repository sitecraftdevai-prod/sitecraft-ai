import { motion } from 'framer-motion';
import { Globe, Shield, Rocket, Cpu, Layers, Database } from 'lucide-react';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
  const serviceList = [
    { icon: Globe, title: 'Bespoke Web Platforms', desc: 'Proprietary architectures designed for definitive digital authority and massive scale.' },
    { icon: Shield, title: 'Fortress Intelligence', desc: 'Sovereign security protocols synthesized to protect your most critical infrastructure.' },
    { icon: Rocket, title: 'Strategic Acceleration', desc: 'Accelerate your digital horizon with master-crafted deployment pipelines.' },
    { icon: Cpu, title: 'AI Synthesis', desc: 'Integrate proprietary AI models directly into your operational workflow for predictive success.' },
    { icon: Layers, title: 'Atelier UI/UX', desc: 'Bespoke design experiences that embody technical sovereignty and aesthetic elegance.' },
    { icon: Database, title: 'Data Sovereignty', desc: 'Architectural database designs that ensure your proprietary information is secured and localized.' },
  ];

  return (
    <div className="min-h-screen bg-black pt-32 md:pt-48 selection:bg-[#C9FF31] selection:text-black">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-20 md:mb-32">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-32 text-center"
        >
          <h4 className="text-[10px] font-black uppercase tracking-[5px] text-[#C9FF31] mb-6 font-bold">The Registry of Capabilities</h4>
          <h1 className="text-4xl md:text-7xl font-bold mb-8 md:mb-10 luxury-serif text-white uppercase tracking-tighter leading-tight">Proprietary <br className="hidden md:block" /><span className="lime-text-gradient italic">Engineering</span></h1>
          <p className="text-gray-400 text-sm md:text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed italic px-4">
            A comprehensive suite of bespoke digital solutions, each defined by technical excellence and uncompromising quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {serviceList.map((service, i) => (
            <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
            >
              <ServiceCard 
                icon={service.icon}
                title={service.title}
                description={service.desc}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Philosophy Callout */}
      <section className="py-24 md:py-40 bg-white/5 border-y border-white/5 mb-20 md:mb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(201,255,49,0.05),transparent_50%)]" />
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center relative z-10">
          <h2 className="text-2xl md:text-5xl font-black luxury-serif text-white mb-8 md:mb-12 tracking-tight uppercase leading-tight italic">"True technical sovereignty is the <br className="hidden md:block" /><span className="not-italic text-[#C9FF31] border-b-2 border-[#C9FF31]">synthesis</span> of art and logic."</h2>
          <div className="w-16 h-[2px] lime-gradient mx-auto mb-8 md:mb-10" />
          <p className="text-gray-500 font-black uppercase tracking-[4px] text-[10px] md:text-xs">The Atelier Manifesto</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
