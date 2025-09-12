'use client';

import { motion } from 'framer-motion';
import { 
  RefreshCw, Send, MessageSquare, Brain, Folder, Users,
  History, BarChart3, Settings, Keyboard, FileText, Globe,
  Check, ArrowRight, Sparkles, Zap, Target
} from 'lucide-react';
import { fadeInUp, staggerContainer, cardTilt } from '@/lib/animations';

const coreFeatures = [
  {
    id: 'auto-optimize',
    icon: RefreshCw,
    badge: '✨ Your AI Autopilot',
    title: 'Auto-Optimize Mode',
    description: 'Never send a weak prompt again. Our AI watches your writing and enhances it in real-time - adding context, clarity, and structure automatically.',
    benefits: ['Zero clicks required', 'Works on every AI platform', 'Learns from your edits'],
    ctaText: 'See Live Demo',
    demoType: 'transformation'
  },
  {
    id: 'multi-broadcast',
    icon: Send,
    badge: '🚀 One Prompt, Every AI, Best Answer',
    title: 'Multi-AI Broadcasting',
    description: 'Why guess which AI gives the best answer? Send your prompt to ChatGPT, Claude, and Gemini simultaneously. Compare responses side-by-side instantly.',
    benefits: ['Up to 5 AIs at once', 'Real-time comparisons', 'Pick the best or combine'],
    ctaText: 'Try It Now',
    demoType: 'broadcast'
  },
  {
    id: 'ai-chat',
    icon: MessageSquare,
    badge: '💬 Your Prompt Gets Smarter As You Chat',
    title: 'AI Chat Enhancement',
    description: 'Start with a basic idea. Our AI asks the right questions to build the perfect prompt through natural conversation.',
    benefits: ['Interactive refinement', 'Suggests improvements', 'No prompt engineering needed'],
    ctaText: 'Start a Chat',
    demoType: 'chat'
  },
  {
    id: 'learns-style',
    icon: Brain,
    badge: '🧠 AI That Actually Knows You',
    title: 'Learns Your Style',
    description: 'Stop repeating yourself. Promptability learns your writing patterns, preferred formats, and common contexts to customize every optimization.',
    benefits: ['Adapts to your voice', 'Remembers preferences', 'Gets smarter daily'],
    ctaText: 'View Learning Stats',
    demoType: 'learning'
  },
  {
    id: 'project-memory',
    icon: Folder,
    badge: '📁 Context That Never Forgets',
    title: 'Project Memory',
    description: 'Working on a big project? Promptability remembers all context across sessions. No more copy-pasting background info.',
    benefits: ['Unlimited project spaces', 'Auto-context injection', 'Switch projects instantly'],
    ctaText: 'Manage Projects',
    demoType: 'projects'
  },
  {
    id: 'team-collaboration',
    icon: Users,
    badge: '👥 Shared AI Intelligence',
    title: 'Team Collaboration',
    description: 'Level up your entire team. Share optimized prompts, build collective knowledge, and maintain consistency across all AI usage.',
    benefits: ['Shared prompt library', 'Team analytics', 'Permission controls'],
    ctaText: 'Invite Team',
    demoType: 'team'
  }
];

const additionalFeatures = [
  {
    icon: History,
    title: 'Prompt History',
    description: 'Search all past prompts\nVersion control\nReuse favorites'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track AI usage\nROI metrics\nOptimization scores'
  },
  {
    icon: Settings,
    title: 'Custom Rules',
    description: 'Set your guidelines\nIndustry templates\nBrand voice settings'
  },
  {
    icon: Keyboard,
    title: 'Keyboard Shortcuts',
    description: 'Quick optimize: Cmd+K\nBroadcast: Cmd+B\nHistory: Cmd+H'
  },
  {
    icon: FileText,
    title: 'Export Functions',
    description: 'CSV/JSON export\nAPI integration\nBulk operations'
  },
  {
    icon: Globe,
    title: 'Platform Integrations',
    description: 'Slack/Discord\nGoogle Workspace\nMicrosoft Teams'
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
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-6 text-white"
            >
              Features that
              <span className="block">
                <span className="text-blue-400">Supercharge</span> Your AI
              </span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
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
                        <span className="text-sm text-blue-400 font-medium">{feature.badge}</span>
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
                    
                    <button className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors group">
                      {feature.ctaText}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
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

      {/* Additional Features */}
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
              More Powerful
              <span className="block text-white/90">Features</span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {additionalFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              
              return (
                <motion.div
                  key={index}
                  variants={cardTilt}
                  whileHover="hover"
                  className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 h-full hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-white/80" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  
                  <div className="space-y-2">
                    {feature.description.split('\n').map((line, i) => (
                      <p key={i} className="text-gray-400 text-sm">{line}</p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
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