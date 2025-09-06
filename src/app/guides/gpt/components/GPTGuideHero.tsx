'use client';

import { motion } from 'framer-motion';
import { Badge, Brain, Eye, Zap, ArrowRight, Play } from 'lucide-react';
import { fadeInUp, staggerContainer, counterAnimation } from '@/lib/animations';
import { useState, useEffect } from 'react';

const quickNavSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'principles', label: 'Principles' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'playground', label: 'Playground' }
];

export default function GPTGuideHero() {
  const [counters, setCounters] = useState({ gpt4: 0, gpt35: 0, functions: 0 });

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
      animateCounter('gpt4', 32);
      animateCounter('gpt35', 16);
      animateCounter('functions', 100);
    }, 1000);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
            <span className="text-sm font-semibold text-white/90">OPENAI GPT GUIDE</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
          >
            Master GPT-4 &
            <span className="block text-white/90">ChatGPT Prompts</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto"
          >
            The definitive guide to prompt engineering for OpenAI's most powerful models
          </motion.p>

          {/* Key Metrics Bar */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <motion.div 
              variants={counterAnimation}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-4 py-3"
            >
              <Brain className="w-5 h-5 text-white/80" />
              <div>
                <div className="text-xl font-bold text-white">GPT-4: {counters.gpt4}K</div>
                <div className="text-xs text-gray-400">Context</div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={counterAnimation}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-4 py-3"
            >
              <Brain className="w-5 h-5 text-white/80" />
              <div>
                <div className="text-xl font-bold text-white">GPT-3.5: {counters.gpt35}K</div>
                <div className="text-xs text-gray-400">Context</div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={counterAnimation}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-4 py-3"
            >
              <Zap className="w-5 h-5 text-white/80" />
              <div>
                <div className="text-xl font-bold text-white">{counters.functions}%</div>
                <div className="text-xs text-gray-400">Function Calling</div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={counterAnimation}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-4 py-3"
            >
              <Eye className="w-5 h-5 text-white/80" />
              <div>
                <div className="text-xl font-bold text-white">Vision</div>
                <div className="text-xs text-gray-400">Capable</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Navigation Pills */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {quickNavSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-full border border-white/20 transition-colors text-sm"
              >
                {section.label}
              </button>
            ))}
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
              <Play className="w-5 h-5" />
              Try Interactive Demo
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              Download Complete Guide
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}