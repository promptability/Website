'use client';

import { motion } from 'framer-motion';
import { Brain, Folder, RefreshCw, Send, MessageSquare, Users } from 'lucide-react';
import { fadeInUp, staggerContainer, cardTilt } from '@/lib/animations';
import Link from 'next/link';

const features = [
  {
    icon: RefreshCw,
    title: 'Auto-Optimize Mode',
    description: 'Automatically optimizes every prompt before sending to any AI chat - no extra clicks needed.',
    gradient: 'from-green-400 to-emerald-500',
    href: '/features/auto-optimize',
  },
  {
    icon: Send,
    title: 'Multi-AI Broadcasting',
    description: 'Send the same prompt to multiple AI tools simultaneously and compare responses.',
    gradient: 'from-blue-400 to-cyan-500',
    href: '/features/multi-ai-broadcasting',
  },
  {
    icon: MessageSquare,
    title: 'AI Chat Enhancement',
    description: 'Improve your prompts in real-time through interactive AI chat conversations.',
    gradient: 'from-purple-400 to-pink-500',
    href: '/features/ai-chat-enhancement',
  },
  {
    icon: Brain,
    title: 'Learns Your Style',
    description: 'AI adapts to your writing patterns and preferences, getting better with every use.',
    gradient: 'from-indigo-400 to-purple-500',
    href: '/features/learns-your-style',
  },
  {
    icon: Folder,
    title: 'Project Memory',
    description: 'Remembers context across projects, maintaining consistency in your prompts.',
    gradient: 'from-orange-400 to-red-500',
    href: '/features/project-memory',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share optimized prompts with your team and build a knowledge base together.',
    gradient: 'from-pink-400 to-red-500',
    href: '/features/team-collaboration',
  },
];

export default function Features() {
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
            className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold leading-tight mb-6 text-white"
          >
            Why Your Current Prompts
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Aren't Working
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Most people write 5-word prompts and wonder why AI disappoints. 
            Promptability automatically adds the context, structure, and 
            instructions that make AI actually useful.
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
              <Link href={feature.href} className="block h-full">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 h-full hover:bg-white/10 transition-all duration-300 hover:border-white/20 cursor-pointer">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-6 flex items-center text-sm text-gray-500 group-hover:text-purple-400 transition-colors duration-300">
                    <span>Learn more</span>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      className="ml-2"
                    >
                      →
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Subtle CTA after features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-sm mb-4">See these features in action</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="/chrome-extension"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2.5 rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
            >
              Install extension
            </a>
            <a
              href="/signup"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm underline transition-colors"
            >
              Try free account
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
