import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const AnimatedBackground = () => {
  const { scrollYProgress } = useScroll();
  
  // Create parallax movements for different elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* Dynamic Grid */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 opacity-[0.15]"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="200%" fill="url(#grid)" />
        </svg>
      </motion.div>

      {/* Floating Vector Shapes */}
      <motion.div
        style={{ y: y2, rotate: rotate1, scale }}
        className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl"
      />
      
      <motion.div
        style={{ y: y1, rotate: rotate2 }}
        className="absolute top-[60%] right-[15%] w-96 h-96 rounded-full bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 blur-3xl"
      />

      {/* Vector Line Art */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M0 20 Q 25 10 50 20 T 100 20"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="0.1"
          style={{ pathLength: scrollYProgress }}
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Orbital Circles */}
      <motion.div 
        style={{ rotate: rotate1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"
      />
      <motion.div 
        style={{ rotate: rotate2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"
      />
    </div>
  );
};

export default AnimatedBackground;
