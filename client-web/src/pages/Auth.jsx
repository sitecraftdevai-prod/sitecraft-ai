import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User as UserIcon, ArrowRight, Loader2, Shield } from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const AIGraphic = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Dynamic Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#C9FF31]/5 rounded-full blur-[120px] animate-pulse" />
      
      {/* Neural Network Simulation */}
      <div className="relative w-[400px] h-[400px]">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              width: Math.random() * 150 + 50,
              height: '1px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              rotate: Math.random() * 360 + 'deg',
            }}
          />
        ))}

        {/* Floating Data Nodes */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#C9FF31] rounded-full"
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              boxShadow: '0 0 10px #C9FF31',
            }}
          />
        ))}

        {/* Central Core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-48 h-48 border border-white/5 rounded-full flex items-center justify-center relative"
          >
            <div className="w-40 h-40 border border-[#C9FF31]/10 rounded-full animate-ping absolute" />
            <Shield className="text-[#C9FF31] opacity-20 w-16 h-16" strokeWidth={1} />
          </motion.div>
        </div>
      </div>

    </div>
  );
};

const Auth = ({ type }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Check for tokens in the URL (coming back from Google)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userStr = urlParams.get('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        login(user, token);
        if (user.role === 'admin') {
          window.location.href = 'http://localhost:5174';
        } else {
          navigate('/');
        }
      } catch (err) {
        console.error('Error parsing Google user:', err);
        setError('Google login failed. Please try again.');
      }
    }
  }, [login, navigate]);

  const isLogin = type === 'login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const { data } = await API.post(endpoint, formData);

      if (isLogin) {
        login(data.user, data.token);
        if (data.user.role === 'admin') {
          window.location.href = 'http://localhost:5174';
        } else {
          navigate('/');
        }
      } else {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to the backend Google Auth endpoint via API Gateway (dynamic hostname)
    window.location.href = `http://${window.location.hostname}:5000/api/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-start bg-black selection:bg-[#C9FF31] selection:text-black overflow-hidden relative">
      {/* Expansive Graphic Section */}
      <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full bg-white/[0.01] pointer-events-none z-0">
        <AIGraphic />
      </div>

      {/* Form Section - Left Aligned */}
      <div className="relative z-10 w-full lg:w-[45%] h-full flex flex-col justify-center px-6 md:px-12 lg:pl-24 lg:pr-10 py-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[450px] glass-card p-8 md:p-12 border-white/5 bg-white/[0.02] shadow-2xl backdrop-blur-sm"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-[#C9FF31]/10 flex items-center justify-center mb-8 mx-auto text-[#C9FF31]">
            <Shield size={isLogin ? 24 : 32} />
          </div>

          <h2 className="text-2xl md:text-4xl font-black mb-3 text-center text-white tracking-tight">
            {isLogin ? 'Welcome Back' : 'Get Started'}
          </h2>
          <p className="text-gray-500 text-center mb-10 text-xs md:text-sm font-medium max-w-[280px] mx-auto">
            {isLogin ? 'Enter your credentials to access your portal' : 'Create an account to begin your project'}
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold text-center uppercase tracking-widest"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#C9FF31] transition-colors" size={16} />
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-[#C9FF31] focus:bg-white/10 transition-all text-white placeholder:text-gray-600 text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#C9FF31] transition-colors" size={16} />
                <input
                  type="email"
                  placeholder="hello@example.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-[#C9FF31] focus:bg-white/10 transition-all text-white placeholder:text-gray-600 text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#C9FF31] transition-colors" size={16} />
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-[#C9FF31] focus:bg-white/10 transition-all text-white placeholder:text-gray-600 text-sm"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#C9FF31] text-black hover:bg-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 mt-6 shadow-[0_0_30px_rgba(201,255,49,0.2)]"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : (
                <>
                  {isLogin ? 'Login' : 'Create Account'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="relative flex items-center gap-4 my-8">
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="text-[8px] font-bold text-gray-600 uppercase tracking-[3px] whitespace-nowrap">Secure Access Protocols</span>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-xl py-3.5 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
            </svg>
            Continue with Neural Key
          </button>

          <p className="mt-8 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            {isLogin ? "New to the atelier? " : "Authorized before? "}
            <Link to={isLogin ? '/register' : '/login'} className="text-[#C9FF31] hover:text-white transition-colors">
              {isLogin ? 'Initialize' : 'Authorize'}
            </Link>
          </p>

          <Link to="/" className="block mt-12 text-center text-[8px] font-black uppercase tracking-[4px] text-white/30 hover:text-[#C9FF31] transition-colors">
            Return to Main Terminal
          </Link>
        </motion.div>
      </div>

      {/* Background Decor Layer */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C9FF31]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
      </div>
    </div>
  );
};

export default Auth;
