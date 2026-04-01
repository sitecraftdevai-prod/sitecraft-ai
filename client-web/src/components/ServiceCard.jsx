import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const ServiceCard = ({ title, description, icon: Icon, colorClass }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="p-6 md:p-10 rounded-[32px] md:rounded-[48px] bg-white/5 border border-white/10 hover:border-[#C9FF31]/30 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden backdrop-blur-sm"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9FF31]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#C9FF31]/10 transition-all" />
      
      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-10 transition-all duration-700 group-hover:bg-[#C9FF31] group-hover:text-black border border-white/10 bg-white/5 text-white`}>
        <Icon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1} />
      </div>
      
      <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white luxury-serif tracking-tight group-hover:text-[#C9FF31] transition-colors">{title}</h3>
      <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 font-light tracking-wide italic">
        {description}
      </p>
      
      <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-[3px] text-gray-500 border-t border-white/5 pt-4 md:pt-6 group-hover:text-[#C9FF31]">
        Discover More <ChevronRight size={14} className="text-[#C9FF31]" />
      </div>

      {/* Decorative Corner */}
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/20 opacity-40 group-hover:opacity-100 group-hover:border-[#C9FF31]" />
    </motion.div>
  );
};

export default ServiceCard;
