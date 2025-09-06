'use client';

import { motion } from 'framer-motion';
import { Badge, Brain, Search, Eye, Zap } from 'lucide-react';
import { fadeInUp, staggerContainer, counterAnimation } from '@/lib/animations';
import { useState, useEffect } from 'react';

export default function GeminiGuideHero() {
  const [counters, setCounters] = useState({ context: 0, multimodal: 0, search: 0 });

  useEffect(() => {
    const animateCounter = (key: string, target: number) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 40);
    };

    setTimeout(() => {
      animateCounter('context', 32);
      animateCounter('multimodal', 100);
      animateCounter('search', 100);
    }, 1000);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <Badge className="w-4 h-4 text-white/80" />
            <span className="text-sm font-semibold text-white/90">AI PLATFORM GUIDE</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
          >
            Master Google
            <span className="block text-white/90">Gemini Prompts</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto"
          >
            The complete guide to getting exceptional results from Google's most powerful AI
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-8 mb-16"
          >
            <motion.div 
              variants={counterAnimation}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-6 py-3"
            >
              <Brain className="w-5 h-5 text-white/80" />
              <div>
                <div className="text-2xl font-bold text-white">{counters.context}K</div>
                <div className="text-sm text-gray-400">Context Window</div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={counterAnimation}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-6 py-3"
            >
              <Eye className="w-5 h-5 text-white/80" />
              <div>
                <div className="text-2xl font-bold text-white">{counters.multimodal}%</div>
                <div className="text-sm text-gray-400">Multimodal</div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={counterAnimation}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-6 py-3"
            >
              <Search className="w-5 h-5 text-white/80" />
              <div>
                <div className="text-2xl font-bold text-white">{counters.search}%</div>
                <div className="text-sm text-gray-400">Real-time Search</div>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-black font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Try Live Tester
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/20 transition-colors"
            >
              Download PDF Guide
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}