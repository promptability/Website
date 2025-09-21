'use client';

import { motion } from 'framer-motion';
import { Chrome, Play, ArrowRight } from 'lucide-react';
import { wordAnimation, liquidButton, chromeFloat, gradientMesh, particleFloat, staggerContainer, fadeInUp, counterAnimation } from '@/lib/animations';
import { useState, useEffect } from 'react';

export default function AutoOptimizeHero() {
  const [counters, setCounters] = useState({ optimized: 0, timeSaved: 0, accuracy: 0 });

  useEffect(() => {
    // Animate counters on mount
    const animateCounter = (key: string, target: number) => {
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 50);
    };

    setTimeout(() => {
      animateCounter('optimized', 50000);
      animateCounter('timeSaved', 85);
      animateCounter('accuracy', 95);
    }, 1000);
  }, []);

  const words = ["Auto", "Optimize", "Mode"];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-32">

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center lg:text-left"
          >

            {/* Word-by-word animated headline */}
            <div className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordAnimation}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.3 }}
                  className={`inline-block mr-4 ${
                    word === "Auto" ? "text-white" :
                    word === "Optimize" ? "bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent" :
                    "bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent text-8xl"
                  }`}
                  style={{ transformOrigin: 'center bottom' }}
                >
                  {word}
                  {index === 1 && <br />}
                </motion.span>
              ))}
            </div>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 max-w-2xl"
            >
              Your AI copilot that perfects every prompt automatically. 
              Zero clicks required - optimization happens seamlessly as you type.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <motion.button
                variants={liquidButton}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="bg-gradient-to-r from-blue-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-lg flex items-center justify-center gap-3 text-lg shadow-lg shadow-blue-500/25"
              >
                <Play className="w-6 h-6" />
                Enable Auto-Optimize
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-4 rounded-lg flex items-center justify-center gap-3 text-lg hover:bg-white/20 transition-colors"
              >
                <Chrome className="w-5 h-5" />
                See Demo
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-8 text-sm text-gray-400"
            >
              <motion.div 
                variants={counterAnimation}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>{counters.optimized.toLocaleString()}+ Prompts Optimized</span>
              </motion.div>
              <motion.div 
                variants={counterAnimation}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>{counters.timeSaved}% Time Saved</span>
              </motion.div>
              <motion.div 
                variants={counterAnimation}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>{counters.accuracy}% Accuracy</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced Animated GIF */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative flex items-center justify-center"
          >
            {/* Background Glow Effects */}
            <div className="absolute inset-0 scale-110">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-blue-500/20 to-blue-500/30 rounded-3xl blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl"></div>
            </div>


            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full blur-sm"
              />
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full blur-sm"
              />
              <motion.div
                animate={{ 
                  y: [0, -25, 0],
                  opacity: [0.2, 0.7, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-cyan-400 rounded-full blur-sm"
              />
            </div>

            {/* Main GIF Container */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative z-10"
            >
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                {/* Enhanced backdrop */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40 z-10 pointer-events-none"></div>
                
                {/* Shining border effect */}
                <div className="absolute inset-0 rounded-2xl">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 70%, rgba(16, 185, 129, 0.3) 80%, transparent 90%)'
                    }}
                  />
                </div>

                {/* GIF with enhanced styling */}
                <img 
                  src="/hero-animation.gif" 
                  alt="Auto-Optimize Mode Demo"
                  className="relative z-20 w-full h-auto max-w-lg brightness-110 contrast-110 saturate-110"
                  style={{ 
                    filter: 'brightness(1.2) contrast(1.15) saturate(1.1) drop-shadow(0 0 20px rgba(16, 185, 129, 0.3))',
                    transform: 'scale(1.05)'
                  }}
                />
              </div>

              {/* Additional Glow Layer */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-blue-500/20 blur-xl scale-110 -z-10"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}