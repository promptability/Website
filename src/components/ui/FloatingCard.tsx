'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  glowColor?: string;
}

export default function FloatingCard({ 
  children, 
  className = '',
  hoverScale = 1.02,
  glowColor = 'blue'
}: FloatingCardProps) {
  const glowColors = {
    blue: 'shadow-blue-500/20 hover:shadow-blue-500/40',
    cyan: 'shadow-cyan-500/20 hover:shadow-cyan-500/40',
    purple: 'shadow-purple-500/20 hover:shadow-purple-500/40',
    green: 'shadow-green-500/20 hover:shadow-green-500/40'
  };

  return (
    <motion.div
      whileHover={{ 
        scale: hoverScale,
        rotateX: 2,
        rotateY: 2
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
      className={`
        relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl
        shadow-xl ${glowColors[glowColor as keyof typeof glowColors]}
        transition-all duration-300 hover:border-white/20
        ${className}
      `}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0"
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at center, ${
            glowColor === 'blue' ? '#3b82f6' :
            glowColor === 'cyan' ? '#06b6d4' :
            glowColor === 'purple' ? '#8b5cf6' :
            '#10b981'
          }, transparent 70%)`
        }}
      />
    </motion.div>
  );
}
