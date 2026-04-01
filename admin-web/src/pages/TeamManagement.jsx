import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Check, Linkedin, Users } from 'lucide-react';
import API from '../services/api';
import Topbar from '../components/Topbar';

const TeamManagement = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    linkedinUrl: '',
    imageUrl: '',
    order: 0
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const { data } = await API.get('/team/list');
      setTeam(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await API.put(`/team/${editingMember._id}`, formData);
      } else {
        await API.post('/team/add', formData);
      }
      fetchTeam();
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this team member?')) {
      try {
        await API.delete(`/team/${id}`);
        fetchTeam();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      description: member.description,
      linkedinUrl: member.linkedinUrl,
      imageUrl: member.imageUrl,
      order: member.order || 0
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMember(null);
    setFormData({ name: '', role: '', description: '', linkedinUrl: '', imageUrl: '', order: 0 });
  };

  return (
    <div className="min-h-screen bg-[#03040a]">
      <Topbar title="Team Management" />
      
      <main className="ml-72 p-10">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">THE ARCHITECTS</h2>
            <p className="text-gray-500 mt-2 text-sm font-medium">Manage agency members and their public presence</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#C9FF31] text-black px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-white transition-all shadow-[0_0_30px_rgba(201,255,49,0.2)] uppercase tracking-widest text-xs"
          >
            <Plus size={18} /> ADD NEW ARCHITECT
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 text-white">
        {loading ? (
          <div className="col-span-full py-20 text-center text-gray-500 uppercase tracking-widest font-black">Loading Registry...</div>
        ) : team.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-500 uppercase tracking-widest font-black">No team members registered.</div>
        ) : (
          team.map((member) => (
            <motion.div 
              key={member._id}
              layout
              className="bg-[#111] border border-white/5 rounded-3xl p-6 group hover:border-[#C9FF31]/30 transition-all hover:bg-[#151515]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                  <img 
                    src={member.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{member.name}</h3>
                  <p className="text-[#C9FF31] text-[10px] font-black uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
              
              <p className="text-gray-500 text-sm italic mb-6 line-clamp-2">{member.description}</p>
              
              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <div className="flex gap-2">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-[#C9FF31] transition-colors">
                    <Linkedin size={16} />
                  </a>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(member)}
                    className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(member._id)}
                    className="p-2 bg-red-500/10 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
      </main>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#151515] border border-white/10 rounded-[40px] p-10 w-full max-w-xl shadow-2xl overflow-hidden relative"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {editingMember ? 'EDIT MEMBER' : 'ADD NEW MEMBER'}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-500 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#C9FF31] transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Role</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Creative Director"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#C9FF31] transition-all"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Description</label>
                  <textarea 
                    required
                    placeholder="Brief bio or description..."
                    rows="3"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#C9FF31] transition-all resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">LinkedIn URL</label>
                  <input 
                    type="text" 
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#C9FF31] transition-all"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1 block">Team Photo</label>
                    <div className="flex flex-col gap-4">
                      {formData.imageUrl && (
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10">
                          <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        id="image-upload"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          
                          const uploadData = new FormData();
                          uploadData.append('image', file);
                          
                          try {
                            const { data } = await API.post('/team/upload', uploadData, {
                              headers: { 'Content-Type': 'multipart/form-data' }
                            });
                            setFormData({...formData, imageUrl: data.imageUrl});
                          } catch (err) {
                            alert('Upload Failed');
                            console.error(err);
                          }
                        }}
                      />
                      <label 
                        htmlFor="image-upload"
                        className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-xs font-bold text-gray-400 hover:text-white hover:border-[#C9FF31] transition-all cursor-pointer"
                      >
                        <ImageIcon size={16} /> UPLOAD PHOTO
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Image URL (Fallback)</label>
                    <input 
                      type="text" 
                      placeholder="Unsplash URL..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-white outline-none focus:border-[#C9FF31] transition-all text-xs"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Display Order</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#C9FF31] transition-all"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                  />
                </div>

                <div className="pt-6">
                  <button className="w-full bg-[#C9FF31] text-black py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all shadow-xl">
                    <Check size={20} /> {editingMember ? 'UPDATE RECORD' : 'SAVE RECORD'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamManagement;
