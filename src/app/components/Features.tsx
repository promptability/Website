'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Folder, RefreshCw, Send, MessageSquare, Users, Star, Zap, Search } from 'lucide-react';
import { fadeInUp, staggerContainer, cardTilt } from '@/lib/animations';
import Link from 'next/link';

const features = [
  {
    icon: Zap,
    title: 'Prompt Engineering Technology',
    shortTitle: 'Prompt Engineering',
    description: 'Transforms any highlighted web text into optimized, professional-grade AI prompts tailored to each platform\'s specific guidelines and best practices.',
    shortDescription: 'Optimize prompts for any AI platform',
    gradient: 'from-cyan-400 to-blue-500',
    href: '/features/prompt-engineering',
    plan: 'free',
    badge: 'Free'
  },
  {
    icon: Star,
    title: 'Favorites Instructions',
    shortTitle: 'Smart Favorites',
    description: 'Save your most effective instruction templates as favorites and quickly reuse them whenever needed.',
    shortDescription: 'Save & reuse prompt templates',
    gradient: 'from-yellow-400 to-orange-500',
    href: '/features/smart-favorites',
    plan: 'starter',
    badge: 'Starter'
  },
  {
    icon: Folder,
    title: 'Project Memory',
    shortTitle: 'Project Memory',
    description: 'Remembers context across projects, maintaining consistency in your prompts.',
    shortDescription: 'Maintain context across projects',
    gradient: 'from-orange-400 to-red-500',
    href: '/features/project-memory',
    plan: 'starter',
    badge: 'Starter'
  },
  {
    icon: RefreshCw,
    title: 'Auto-Optimize Mode',
    shortTitle: 'Auto-Optimize',
    description: 'Automatically optimizes every prompt before sending to any AI chat - no extra clicks needed.',
    shortDescription: 'Auto-enhance every prompt',
    gradient: 'from-green-400 to-emerald-500',
    href: '/features/auto-optimize',
    plan: 'starter',
    badge: 'Starter'
  },
  {
    icon: Brain,
    title: 'Learns Your Style',
    shortTitle: 'Learn Your Style',
    description: 'AI adapts to your writing patterns and preferences, getting better with every use.',
    shortDescription: 'Adapts to your writing style',
    gradient: 'from-indigo-400 to-purple-500',
    href: '/features/learns-your-style',
    plan: 'starter',
    badge: 'Starter'
  },
  {
    icon: Send,
    title: 'Multi-AI Broadcasting',
    shortTitle: 'Multi-AI Send',
    description: 'Send the same prompt to multiple AI tools simultaneously and compare responses.',
    shortDescription: 'Send to multiple AIs at once',
    gradient: 'from-blue-400 to-cyan-500',
    href: '/features/multi-ai-broadcasting',
    plan: 'starter',
    badge: 'Starter'
  },
  {
    icon: MessageSquare,
    title: 'AI Chat Enhancement',
    shortTitle: 'Chat Enhancement',
    description: 'Improve your prompts in real-time through interactive AI chat conversations.',
    shortDescription: 'Real-time prompt improvement',
    gradient: 'from-purple-400 to-pink-500',
    href: '/features/ai-chat-enhancement',
    plan: 'pro',
    badge: 'Pro',
    comingSoon: true
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    shortTitle: 'Team Collab',
    description: 'Share optimized prompts with your team and build a knowledge base together.',
    shortDescription: 'Share prompts with team',
    gradient: 'from-pink-400 to-red-500',
    href: '/features/team-collaboration',
    plan: 'pro',
    badge: 'Pro',
    comingSoon: true
  },
  {
    icon: Search,
    title: 'Platform Detective',
    shortTitle: 'AI Detective',
    description: 'Intelligently broadcasts your prompts to the best AI platforms based on your specific needs. Find the perfect AI for every task automatically.',
    shortDescription: 'Find the best AI for each task',
    gradient: 'from-purple-400 to-blue-400',
    href: '/features/platform-detective',
    plan: 'pro',
    badge: 'Pro',
    comingSoon: true
  },
];

export default function Features() {
  const [currentFeature, setCurrentFeature] = useState(0);

  // Auto-rotate carousel every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 sm:mb-4 md:mb-6 text-white"
          >
            Why Your Current Prompts
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Aren't Working
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-2"
          >
            Most people write 5-word prompts and wonder why AI disappoints. <br className="hidden sm:block" />
            Promptability automatically adds the context, structure, and 
            instructions that make AI actually useful.
          </motion.p>
        </motion.div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          {/* Plan Indicators */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-green-400 font-medium">Free</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-blue-400 font-medium">Starter</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-purple-400 font-medium">Pro</span>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Carousel Cards */}
            <div className="overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full"
                >
                  {features[currentFeature].comingSoon ? (
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 cursor-default relative h-64">
                      {/* Plan Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                          {features[currentFeature].badge}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className="relative mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                          {(() => {
                            const IconComponent = features[currentFeature].icon;
                            return <IconComponent className="w-6 h-6 text-white" />;
                          })()}
                        </div>
                        
                        {/* Glow effect */}
                        <div className={`absolute inset-0 w-12 h-12 rounded-xl bg-gradient-to-r ${features[currentFeature].gradient} opacity-20 blur-xl`} />
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-semibold text-white mb-3">
                        {features[currentFeature].title}
                      </h3>
                      
                      <p className="text-gray-400 leading-relaxed text-sm flex-1 mb-4">
                        {features[currentFeature].description}
                      </p>

                      {/* Coming Soon */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-semibold text-sm">Coming Soon</span>
                      </div>
                    </div>
                  ) : (
                    <Link href={features[currentFeature].href} className="block">
                      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:border-white/20 cursor-pointer relative h-64">
                        {/* Plan Badge */}
                        <div className="absolute top-4 right-4">
                          {features[currentFeature].plan === 'free' ? (
                            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                              {features[currentFeature].badge}
                            </span>
                          ) : features[currentFeature].plan === 'starter' ? (
                            <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                              {features[currentFeature].badge}
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                              {features[currentFeature].badge}
                            </span>
                          )}
                        </div>

                        {/* Icon */}
                        <div className="relative mb-4">
                          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                            {(() => {
                              const IconComponent = features[currentFeature].icon;
                              return <IconComponent className="w-6 h-6 text-white" />;
                            })()}
                          </div>
                          
                          {/* Glow effect */}
                          <div className={`absolute inset-0 w-12 h-12 rounded-xl bg-gradient-to-r ${features[currentFeature].gradient} opacity-20 blur-xl`} />
                        </div>

                        {/* Content */}
                        <h3 className="text-lg font-semibold text-white mb-3">
                          {features[currentFeature].title}
                        </h3>
                        
                        <p className="text-gray-400 leading-relaxed text-sm flex-1 mb-4">
                          {features[currentFeature].description}
                        </p>

                      </div>
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Mobile View All Button */}
          <div className="mt-8 text-center">
            <Link
              href="/features"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2.5 rounded-xl hover:bg-white/20 transition-all duration-300 text-sm font-medium"
            >
              View All Features
              →
            </Link>
          </div>
        </div>

        {/* Desktop Grid - Original Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardTilt}
              initial="initial"
              whileHover={feature.comingSoon ? undefined : "hover"}
              className="group"
            >
              {feature.comingSoon ? (
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 cursor-default relative flex flex-col h-64">
                  {/* Plan Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="relative mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed text-sm flex-1">
                    {feature.description}
                  </p>

                  {/* Coming Soon */}
                  <div className="mt-4 flex items-center text-sm">
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-semibold">Coming Soon</span>
                  </div>
                </div>
              ) : (
                <Link href={feature.href} className="block">
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:border-white/20 cursor-pointer relative flex flex-col h-64">
                    {/* Plan Badge */}
                    <div className="absolute top-4 right-4">
                      {feature.plan === 'free' ? (
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                          {feature.badge}
                        </span>
                      ) : feature.plan === 'starter' ? (
                        <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                          {feature.badge}
                        </span>
                      ) : null}
                    </div>

                    {/* Icon */}
                    <div className="relative mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Glow effect */}
                      <div className={`absolute inset-0 w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 text-sm flex-1">
                      {feature.description}
                    </p>

                    {/* Hover indicator */}
                    <div className="mt-4 flex items-center text-sm text-gray-500 group-hover:text-purple-400 transition-colors duration-300">
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
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="hidden md:block text-center mt-16"
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