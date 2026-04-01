import { motion } from 'framer-motion';

const StatsCard = ({ label, value, icon: Icon, colorClass, trend }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 rounded-[32px] glass border border-white/5 bg-[#161925]/50"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${colorClass}`}>
        <Icon size={28} />
      </div>
      <p className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-2">{label}</p>
      <div className="flex items-end gap-3">
        <h3 className="text-4xl font-black text-white">{value}</h3>
        {trend && (
          <span className="text-emerald-400 text-sm font-bold mb-1.5 flex items-center gap-1">
            ↑ {trend}%
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
