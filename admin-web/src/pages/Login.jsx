import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Shield, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { login as authLogin } from '../services/authApi';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await authLogin(formData.email, formData.password);
      if (data.user.role !== 'admin') {
        setError('Access Denied: Administrative credentials required.');
        setLoading(false);
        return;
      }
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#03040a] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-0" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl p-12 rounded-[48px] glass border border-white/5 relative z-10"
      >
        <div className="w-20 h-20 bg-indigo-600 rounded-[24px] flex items-center justify-center mb-8 mx-auto shadow-2xl shadow-indigo-600/40">
          <Shield size={40} className="text-white" />
        </div>
        
        <h2 className="text-4xl font-black mb-4 text-center text-white">Admin Control</h2>
        <p className="text-gray-500 text-center mb-10 font-medium">
          Enter your administrative credentials to manage the platform.
        </p>

        {error && (
          <div className="mb-8 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 uppercase tracking-widest px-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                required
                type="email"
                placeholder="admin@sitecraft.ai"
                className="w-full bg-[#161925]/50 border border-white/5 rounded-3xl py-5 pl-16 pr-6 outline-none focus:border-indigo-500/50 transition-all font-medium text-white"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 uppercase tracking-widest px-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#161925]/50 border border-white/5 rounded-3xl py-5 pl-16 pr-6 outline-none focus:border-indigo-500/50 transition-all font-medium text-white"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-3xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-600/30 disabled:opacity-50 mt-10"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                Access Admin Portal
                <ArrowRight size={22} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
