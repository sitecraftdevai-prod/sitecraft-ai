import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import RequirementForm from '../components/RequirementForm';
import Footer from '../components/Footer';
import API from '../services/api';

const StartProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleProjectSubmit = async (formData) => {
    setLoading(true);
    try {
      const { data } = await API.post('/projects/create', formData);
      
      // Trigger AI Analysis
      await API.post('/ai/analyze', { 
        projectId: data._id, 
        description: data.description 
      });

      setSuccess(true);
      setTimeout(() => {
        navigate(`/project/${data._id}`);
      }, 2000);
    } catch (err) {
      console.error(err);
      alert('Failed to start project. Please log in first.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-48 bg-black selection:bg-[#C9FF31] selection:text-black">
      <div className="max-w-4xl mx-auto px-10 mb-32">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-24">
                <h4 className="text-[10px] font-black uppercase tracking-[5px] text-[#C9FF31] mb-6 font-bold">Initiation Phase</h4>
                <h1 className="text-7xl font-bold mb-10 luxury-serif text-white uppercase tracking-tighter leading-tight">Forge Your <span className="lime-text-gradient italic">Genesis</span></h1>
                <p className="text-gray-400 text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed italic">
                  Provide the core vision for your digital asset. Our AI atelier will synthesize the definitive technical foundation.
                </p>
              </div>
              
              <div className="p-16 rounded-[48px] bg-surface border border-white/10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-white/20 -mr-8 -mt-8" />
                <RequirementForm onSubmit={handleProjectSubmit} loading={loading} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-40 border border-white/10 bg-surface rounded-[48px] relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-white/20 -mr-8 -mt-8" />
              <div className="w-24 h-24 border border-[#C9FF31] text-[#C9FF31] bg-[#C9FF31]/10 flex items-center justify-center mx-auto mb-10 rotate-45 shadow-lg">
                <div className="-rotate-45">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-5xl font-bold mb-6 text-white luxury-serif tracking-tight uppercase">Committed to Registry</h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[3px] mb-8 max-w-sm mx-auto">
                Your vision has been successfully archived. The AI atelier is finalizing documentation...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default StartProject;
