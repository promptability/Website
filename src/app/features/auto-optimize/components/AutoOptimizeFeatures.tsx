'use client';

import { motion } from 'framer-motion';
import { RefreshCw, Zap, Globe, Brain, Shield, Settings } from 'lucide-react';
import { fadeInUp, staggerContainer, cardTilt } from '@/lib/animations';

const features = [
  {
    icon: RefreshCw,
    title: 'Automatic Enhancement',
    description: 'Every prompt is automatically optimized before sending - no clicks required.',
    gradient: 'from-blue-400 to-blue-500',
  },
  {
    icon: Zap,
    title: 'Instant Processing',
    description: 'Optimization happens in milliseconds, maintaining your natural workflow.',
    gradient: 'from-purple-400 to-purple-500',
  },
  {
    icon: Globe,
    title: 'Universal Compatibility',
    description: 'Works seamlessly with ChatGPT, Claude, Gemini, and all AI platforms.',
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    icon: Brain,
    title: 'Context Awareness',
    description: 'Understands your intent and optimizes based on the specific AI platform.',
    gradient: 'from-purple-400 to-purple-500',
  },
  {
    icon: Shield,
    title: 'Privacy Protected',
    description: 'All processing happens locally - your prompts never leave your device.',
    gradient: 'from-purple-400 to-purple-500',
  },
  {
    icon: Settings,
    title: 'Customizable Levels',
    description: 'Adjust optimization intensity from light touch to comprehensive enhancement.',
    gradient: 'from-purple-400 to-purple-500',
  },
];

export default function AutoOptimizeFeatures() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            How Auto-Optimize
            <span className="block bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Experience seamless prompt enhancement that works invisibly in the background, 
            making every AI interaction more effective without changing your workflow.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardTilt}
              initial="initial"
              whileHover="hover"
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 h-full hover:bg-white/10 transition-all duration-300 hover:border-white/20">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}