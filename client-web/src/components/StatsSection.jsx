import { motion } from 'framer-motion';

const StatsSection = () => {
  const stats = [
    { value: '50+', label: 'Signature Assets' },
    { value: '100%', label: 'Client Satisfaction' },
    { value: '20+', label: 'Specialized Tools' },
    { value: '24/7', label: 'Priority Support' }
  ];

  return (
    <section className="py-20 bg-transparent border-y border-white/5">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-5xl font-black text-white mb-2">{stat.value}</h2>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
