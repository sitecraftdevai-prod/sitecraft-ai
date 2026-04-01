import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, FileText, Layout, Megaphone, Smartphone, HelpCircle } from 'lucide-react';

const RequirementForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'web-development',
  });

  const categories = [
    { id: 'web-development', label: 'Bespoke Web', icon: Layout },
    { id: 'mobile-app', label: 'Sovereign Mobile', icon: Smartphone },
    { id: 'marketing-site', label: 'Prestige Marketing', icon: Megaphone },
    { id: 'other', label: 'Unique Inquiry', icon: HelpCircle },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setFormData({ ...formData, category: cat.id })}
            className={`flex flex-col items-center gap-4 p-8 rounded-3xl border transition-all duration-500 relative overflow-hidden group ${
              formData.category === cat.id
                ? 'bg-black text-white border-black shadow-xl'
                : 'bg-transparent border-black/10 text-gray-400 hover:border-black'
            }`}
          >
            <cat.icon size={28} strokeWidth={1} className={formData.category === cat.id ? 'animate-pulse' : ''} />
            <span className="text-[10px] font-black uppercase tracking-[2px] text-center leading-tight">{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
          <FileText size={14} className="text-[#C9FF31]" /> Vision Title
        </label>
        <input
          required
          type="text"
          placeholder="e.g., The Sterling E-commerce Architecture"
          className="w-full bg-transparent border-b border-black/20 py-5 text-xl outline-none focus:border-black transition-all text-black font-light italic"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
          <Megaphone size={14} className="text-[#C9FF31]" /> Core Requirements
        </label>
        <textarea
          required
          rows={6}
          placeholder="Articulate your vision. What frontier are you defining?"
          className="w-full bg-transparent border border-black rounded-3xl p-6 outline-none focus:border-black transition-all text-black font-light resize-none italic"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <button
        disabled={loading}
        className="w-full bg-black text-white py-6 rounded-[48px] font-black uppercase tracking-[3px] transition-all hover:bg-white hover:text-black hover:scale-[1.02] border border-black shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-50"
      >
        {loading ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Commit Vision to Registry
            <Send size={20} className="group-hover:translate-x-2 transition-transform" />
          </>
        )}
      </button>

      <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        Proprietary AI will synthesize architectural blueprints upon submission.
      </p>
    </form>
  );
};

export default RequirementForm;
