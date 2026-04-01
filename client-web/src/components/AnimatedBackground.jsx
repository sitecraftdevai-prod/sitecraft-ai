import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const { scrollYProgress } = useScroll();
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Smooth spring-based transforms for the "Morph" effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 800]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const x1 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotateS = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const smoothY1 = useSpring(y1, { stiffness: 50, damping: 20 });
  const smoothY2 = useSpring(y2, { stiffness: 50, damping: 20 });
  const smoothX1 = useSpring(x1, { stiffness: 50, damping: 20 });
  const smoothRotate = useSpring(rotateS, { stiffness: 50, damping: 20 });

  return (
    <div className="fixed inset-0 -z-20 bg-black overflow-hidden pointer-events-none">
      {/* Dynamic Morphing Blobs - Always work while scrolling */}
      <motion.div 
        style={{ y: smoothY1, x: smoothX1, rotate: smoothRotate }}
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#C9FF31]/10 rounded-full blur-[120px] mix-blend-screen"
      />
      <motion.div 
        style={{ y: smoothY2, x: x2, rotate: -45 }}
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] mix-blend-screen"
      />
      <motion.div 
        style={{ x: useTransform(scrollYProgress, [0, 1], [-100, 200]), y: useTransform(scrollYProgress, [0, 1], [400, -200]) }}
        className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-[#C9FF31]/5 rounded-full blur-[150px] mix-blend-screen"
      />

      {/* Reduced Subtle Particles for Performance */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-black/5 rounded-full"
          style={{
            left: (i * 7) % 100 + '%',
            top: (i * 13) % 100 + '%',
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 15 + (i % 10),
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Scattered Lime Sparks */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`lime-${i}`}
          className="absolute w-0.5 h-0.5 bg-[#C9FF31]/20 rounded-full"
          style={{
            left: (i * 17) % 100 + '%',
            top: (i * 23) % 100 + '%',
          }}
          animate={{
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 8 + (i % 5),
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Soft Luxury Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,255,49,0.03),transparent_70%)]" />
    </div>
  );
};

export default AnimatedBackground;
