'use client';

import { motion } from 'framer-motion';
import { 
  RefreshCw, Send, MessageSquare, Brain, Folder, Users,
  Check, ArrowRight, Sparkles, Zap, Star, Search
} from 'lucide-react';
import { fadeInUp, staggerContainer, cardTilt } from '@/lib/animations';

const coreFeatures = [
  // Free Features
  {
    id: 'prompt-engineering',
    icon: Zap,
    badge: '',
    title: 'Prompt Engineering Technology',
    description: 'Transforms any highlighted web text into optimized, professional-grade AI prompts tailored to each platform\'s specific guidelines and best practices.',
    benefits: ['Platform-specific optimization', 'Professional-grade results', 'Works with highlighted text'],
    ctaText: '',
    demoType: 'engineering',
    plan: 'free'
  },
  // Starter Features
  {
    id: 'project-memory',
    icon: Folder,
    badge: '',
    title: 'Project Memory',
    description: 'Remembers context across projects, maintaining consistency in your prompts.',
    benefits: ['Unlimited project spaces', 'Auto-context injection', 'Switch projects instantly'],
    ctaText: '',
    demoType: 'projects',
    plan: 'starter'
  },
  {
    id: 'smart-favorites',
    icon: Star,
    badge: '',
    title: 'Favorites Instructions',
    description: 'Save your most effective instruction templates as favorites and quickly reuse them whenever needed.',
    benefits: ['Quick access to best prompts', 'Organize by category', 'One-click reuse'],
    ctaText: '',
    demoType: 'favorites',
    plan: 'starter'
  },
  {
    id: 'auto-optimize',
    icon: RefreshCw,
    badge: '',
    title: 'Auto-Optimize Mode',
    description: 'Automatically optimizes every prompt before sending to any AI chat - no extra clicks needed.',
    benefits: ['Zero clicks required', 'Works on every AI platform', 'Learns from your edits'],
    ctaText: '',
    demoType: 'transformation',
    plan: 'starter'
  },
  {
    id: 'learns-style',
    icon: Brain,
    badge: '',
    title: 'Learns Your Style',
    description: 'AI adapts to your writing patterns and preferences, getting better with every use.',
    benefits: ['Adapts to your voice', 'Remembers preferences', 'Gets smarter daily'],
    ctaText: '',
    demoType: 'learning',
    plan: 'starter'
  },
  {
    id: 'multi-broadcast',
    icon: Send,
    badge: '',
    title: 'Multi-AI Broadcasting',
    description: 'Send the same prompt to multiple AI tools simultaneously and compare responses.',
    benefits: ['Up to 5 AIs at once', 'Real-time comparisons', 'Pick the best or combine'],
    ctaText: '',
    demoType: 'broadcast',
    plan: 'starter'
  },
  // Pro Features (Coming Soon)
  {
    id: 'ai-chat',
    icon: MessageSquare,
    badge: '',
    title: 'AI Chat Enhancement',
    description: 'Improve your prompts in real-time through interactive AI chat conversations.',
    benefits: ['Interactive refinement', 'Suggests improvements', 'No prompt engineering needed'],
    ctaText: '',
    demoType: 'chat',
    plan: 'pro',
    comingSoon: true
  },
  {
    id: 'team-collaboration',
    icon: Users,
    badge: '',
    title: 'Team Collaboration',
    description: 'Share optimized prompts with your team and build a knowledge base together.',
    benefits: ['Shared prompt library', 'Team analytics', 'Permission controls'],
    ctaText: '',
    demoType: 'team',
    plan: 'pro',
    comingSoon: true
  },
  {
    id: 'platform-detective',
    icon: Search,
    badge: '',
    title: 'Platform Detective',
    description: 'Intelligently broadcasts your prompts to the best AI platforms based on your specific needs. Find the perfect AI for every task automatically.',
    benefits: ['Smart platform matching', 'Automatic AI selection', 'Best results every time'],
    ctaText: '',
    demoType: 'detective',
    plan: 'pro',
    comingSoon: true
  }
];


export default function FeaturesPage() {
  const DemoComponent = ({ type, isVisible }: { type: string; isVisible: boolean }) => {
    if (!isVisible) return null;
    
    switch (type) {
      case 'transformation':
        return (
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-2">You type:</p>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-300">
                  "write email"
                </div>
              </div>
              <div className="flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </motion.div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Auto-enhanced to:</p>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-300 text-sm">
                  "Write a professional email response to a client inquiry about project delays, maintaining a helpful tone while setting clear expectations"
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'broadcast':
        return (
          <div className="grid grid-cols-1 gap-4">
            {['ChatGPT', 'Claude', 'Gemini'].map((ai, i) => (
              <motion.div
                key={ai}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="font-medium text-white">{ai}</span>
                </div>
                <p className="text-sm text-gray-300">Response generating...</p>
              </motion.div>
            ))}
          </div>
        );
      
      case 'chat':
        return (
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="bg-blue-500/20 rounded-lg px-3 py-2 text-sm">
                  User: "Help with marketing"
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="bg-white/10 rounded-lg px-3 py-2 text-sm">
                  AI: "What's your product?"
                </div>
              </div>
              <div className="flex gap-2">
                <div className="bg-blue-500/20 rounded-lg px-3 py-2 text-sm">
                  User: "SaaS tool"
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="bg-white/10 rounded-lg px-3 py-2 text-sm">
                  AI: "Target audience?"
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-xs text-green-400 mb-1">Building your prompt...</p>
                <div className="h-2 bg-green-500/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500"
                    animate={{ width: ['0%', '75%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex items-center justify-center">
            <p className="text-gray-400">Interactive demo coming soon</p>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen text-white relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.3]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 pb-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center mb-16"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
            >
              Features that
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Supercharge Your AI
              </span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4"
            >
              Every feature is designed to make AI work harder for you, not the other way around
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Core Features - Split Screen */}
      <section className="px-4 relative">
        <div className="max-w-7xl mx-auto">
          {coreFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={feature.id}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className={`grid lg:grid-cols-5 gap-8 lg:gap-12 items-center mb-20 ${
                  isEven ? '' : 'lg:grid-flow-col-dense'
                }`}
              >
                {/* Feature Info */}
                <div className={`lg:col-span-2 ${isEven ? '' : 'lg:col-start-4'}`}>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white/80" />
                        </div>
                        {feature.badge && <span className="text-sm text-blue-400 font-medium">{feature.badge}</span>}
                        {/* Plan Badge */}
                        {feature.plan === 'free' ? (
                          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                            Free
                          </span>
                        ) : feature.plan === 'starter' ? (
                          <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                            Starter
                          </span>
                        ) : feature.comingSoon ? (
                          <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                            Pro • Coming Soon
                          </span>
                        ) : null}
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-4">{feature.title}</h2>
                      <p className="text-gray-300 text-lg leading-relaxed mb-6">{feature.description}</p>
                    </div>
                    
                    <div className="space-y-3">
                      {feature.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    {feature.ctaText && (
                      <button className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors group">
                        {feature.ctaText}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Demo/Visual */}
                <div className={`lg:col-span-3 ${isEven ? 'lg:col-start-3' : 'lg:col-start-1'}`}>
                  <motion.div
                    variants={cardTilt}
                    whileHover="hover"
                    className="relative"
                  >
                    <DemoComponent type={feature.demoType} isVisible={true} />
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/5 to-purple-500/10 rounded-xl blur-xl -z-10" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>


      {/* Bottom CTA */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your AI Experience?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join 10,000+ professionals saving 10+ hours weekly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Add to Chrome - Free
              </button>
              <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}