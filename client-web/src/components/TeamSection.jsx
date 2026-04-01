import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Loader2, Users } from 'lucide-react';
import API from '../services/api';

const TeamSection = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data } = await API.get('/team/list');
        setTeam(data);
      } catch (err) {
        console.error('Error fetching team:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const displayTeam = team;

  return (
    <section className="py-32 px-6 md:px-10 bg-transparent">
      <div className="max-w-7xl mx-auto text-center">
        <div className="badge mb-8 bg-white/5 border-white/10 mx-auto">
          <Users size={14} className="text-[#C9FF31]" />
          MEET OUR TEAM
        </div>
        <h2 className="text-3xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
          Our <span className="lime-text-gradient italic">Creative</span> Architects
        </h2>
        <p className="text-gray-500 max-w-lg mb-20 text-base mx-auto italic font-light">
           Meet the elite minds who design and engineer digital sovereignty every single day.
        </p>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#C9FF31]" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayTeam.map((member, index) => (
              <motion.div 
                key={member._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass-card bg-white/[0.02] border border-white/5 p-10 group relative overflow-hidden rounded-[48px] shadow-sm hover:shadow-2xl hover:bg-white/[0.04] hover:border-[#C9FF31]/20 transition-all text-left"
              >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9FF31]/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
                 
                 <div className="flex items-start justify-between mb-8 relative z-10">
                    <div className="w-20 h-20 rounded-3xl bg-white/5 overflow-hidden border border-white/10 group-hover:border-[#C9FF31]/30 transition-colors shadow-2xl">
                       <img 
                         src={member.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'} 
                         alt={member.name}
                         className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                       />
                    </div>
                    <a 
                      href={member.linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#C9FF31] hover:text-black hover:border-transparent transition-all shadow-lg"
                    >
                       <Linkedin size={20} />
                    </a>
                 </div>
                 
                 <div className="relative z-10">
                   <h3 className="text-2xl font-black text-white group-hover:text-[#C9FF31] transition-colors">{member.name}</h3>
                   <p className="text-[#C9FF31] text-[10px] font-black uppercase tracking-[3px] mt-2 mb-6 opacity-70">{member.role}</p>
                   <p className="text-gray-500 text-sm leading-relaxed italic font-light line-clamp-3 group-hover:text-gray-300 transition-colors">
                      {member.description}
                   </p>
                 </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
