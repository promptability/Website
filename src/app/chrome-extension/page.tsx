'use client';

import { useState } from 'react';
import { 
  Shield, Star, Play, Users, Clock, Globe,
  Check, ChevronDown, ArrowRight, Zap, Brain,
  BarChart3, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const installSteps = [
  {
    step: 1,
    title: 'Click Install',
    description: 'Takes you to official Chrome Web Store',
    details: 'We redirect you to the official Chrome Web Store where you can safely install the extension.',
    image: '/screenshots/chrome-store.png'
  },
  {
    step: 2,
    title: 'Confirm Permissions',
    description: 'Each permission explained below',
    details: 'We only request the minimum permissions needed for core functionality.',
    permissions: [
      { name: 'Read text selection', reason: 'To optimize highlighted text on any website' },
      { name: 'Context menus', reason: 'To add right-click optimization option' },
      { name: 'Storage', reason: 'To save your preferences locally on your device' }
    ]
  },
  {
    step: 3,
    title: 'Pin to Toolbar',
    description: 'Optional but recommended for quick access',
    details: 'Pinning makes the extension easily accessible from any webpage.',
    image: '/screenshots/pin-extension.gif'
  },
  {
    step: 4,
    title: 'You\'re Ready!',
    description: 'Try it now with our interactive demo',
    details: 'Start optimizing prompts immediately - no account required.',
    demo: true
  }
];

const features = [
  {
    icon: Zap,
    title: 'Instant Optimization',
    description: 'Select any text, right-click, and get AI-optimized prompts in seconds',
    demo: 'instant-optimization.gif',
    before: 'write a story',
    after: 'Write a compelling 500-word short story in the mystery genre, focusing on character development and atmospheric tension. Include a surprising plot twist and vivid sensory details.',
    timeSaved: '2-5 minutes per prompt'
  },
  {
    icon: Brain,
    title: 'Learning Engine',
    description: 'Adapts to your writing style and gets smarter with every use',
    demo: 'learning-engine.gif',
    features: ['Personalized suggestions', 'Style adaptation', 'Context memory'],
    improvement: '40% better results after 10 uses'
  },
  {
    icon: Globe,
    title: 'Multi-Platform Support',
    description: 'Works seamlessly with ChatGPT, Claude, Gemini, and 40+ AI platforms',
    platforms: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Midjourney', 'DALL-E'],
    coverage: '95% of popular AI tools'
  },
  {
    icon: MessageSquare,
    title: 'Project Workspaces',
    description: 'Organize prompts by project and share with your team',
    demo: 'workspaces.gif',
    features: ['Project organization', 'Team sharing', 'Version control'],
    productivity: '60% faster project workflow'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track prompt performance and optimize your AI workflow',
    metrics: ['Response quality', 'Token usage', 'Time saved', 'Success rate'],
    insights: 'Detailed performance insights'
  }
];



const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" },
  hover: { 
    scale: 1.02, 
    y: -5, 
    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)"
  }
};

export default function ChromeExtensionPage() {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  const [installationStep, setInstallationStep] = useState(0);

  return (
    <main className="min-h-screen text-white relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-spotlight" />
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
      
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-20 relative z-40">
        
        {/* Hero Section */}
        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center mb-32"
        >
          
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-8 text-white"
          >
            Add Promptability
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              to Chrome
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Transform any text into optimized AI prompts with one click. <br></br>Works on 1000+ AI platforms, no credit card required.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl"
            >
              <Globe className="w-6 h-6" />
              Add to Chrome - It's Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-800 font-semibold rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center justify-center gap-3"
            >
              <Play className="w-5 h-5" />
              Watch 2-min Demo
            </motion.button>
          </motion.div>

          {/* Live Stats */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-8 text-sm mb-12"
          >
            <div className="flex items-center gap-2 text-blue-400">
              <Users className="w-4 h-4" />
              <span className="font-semibold">2,847</span> users installed today
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <Star className="w-4 h-4" />
              <span className="font-semibold">4.9★</span> rating
            </div>
            <div className="flex items-center gap-2 text-white">
              <Shield className="w-4 h-4" />
              100% Privacy Safe
            </div>
          </motion.div>

          {/* Quick Stats Bar */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Clock, color: 'blue', title: '2 minutes', subtitle: 'to install' },
              { icon: Globe, color: 'purple', title: 'Chrome only', subtitle: 'for now' },
              { icon: Zap, color: 'blue', title: '5x better', subtitle: 'prompt results' },
              { icon: Star, color: 'purple', title: 'Right-click', subtitle: 'to optimize' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <stat.icon className={`w-8 h-8 ${stat.color === 'blue' ? 'text-blue-400' : 'text-purple-400'} mx-auto mb-3`} />
                <p className="text-white font-semibold text-lg">{stat.title}</p>
                <p className="text-gray-300 text-sm">{stat.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Installation Guide */}
        <section className="mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-16 text-center"
          >
            Install in 4 Simple Steps
          </motion.h2>
          
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {installSteps.map((step, index) => (
              <motion.div 
                key={index}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`bg-white/5 backdrop-blur-xl border-2 rounded-2xl p-8 cursor-pointer transition-all ${
                  installationStep === index ? 'border-blue-400 bg-blue-500/10' : 'border-white/10 hover:border-blue-400/50'
                }`}
                onClick={() => setInstallationStep(index)}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-white text-lg">{step.title}</h3>
                </div>
                
                <p className="text-gray-300 mb-4">{step.description}</p>
                <p className="text-gray-400 text-sm">{step.details}</p>
                
                {step.permissions && (
                  <div className="mt-6 space-y-3">
                    {step.permissions.map((perm, permIndex) => (
                      <div key={permIndex} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-white font-medium">{perm.name}:</span>
                          <span className="text-gray-300 ml-1">{perm.reason}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {step.demo && (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium transition-all"
                  >
                    Try Interactive Demo
                  </motion.button>
                )}
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="bg-blue-500/10 border border-blue-400/30 rounded-2xl p-8 max-w-3xl mx-auto">
              <div className="flex items-center gap-2 justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <span className="text-blue-300 font-semibold text-lg">Security Note</span>
              </div>
              <p className="text-gray-300">
                We never access browsing history, passwords, or personal data. All processing happens locally on your device.
              </p>
            </div>
          </motion.div>
        </section>

        {/* How It Works */}
        <section className="mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-16 text-center"
          >
            How It Works
          </motion.h2>
          
          {/* Live Demo Area */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 mb-16 max-w-5xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Try It Yourself</h3>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6">
              <p className="text-gray-200 leading-relaxed text-lg">
                Write a comprehensive guide about renewable energy sources including solar, wind, and hydroelectric power. 
                Make sure to cover environmental benefits and economic considerations for each type.
              </p>
            </div>
            <div className="text-center text-gray-300 mb-6">
              👆 Try highlighting this text, then right-click and select "Optimize Prompt"
            </div>
            <div className="flex justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
              >
                Simulate Optimization
              </motion.button>
            </div>
          </motion.div>

        </section>

        {/* Features Showcase */}
        <section className="mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-16 text-center"
          >
            Features That Save Hours
          </motion.h2>
          
          <div className="space-y-4">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const isExpanded = expandedFeature === index;
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
                >
                  <motion.button
                    onClick={() => setExpandedFeature(isExpanded ? null : index)}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    className="w-full p-8 text-left flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-300 text-lg">{feature.description}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="border-t border-white/10 bg-white/5"
                      >
                        <div className="p-8">
                          {feature.before && (
                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                              <div>
                                <h4 className="text-gray-200 font-semibold mb-3">Before:</h4>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                  <p className="text-gray-300">{feature.before}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-gray-200 font-semibold mb-3">After:</h4>
                                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-4">
                                  <p className="text-gray-200">{feature.after}</p>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {feature.platforms && (
                            <div className="mb-6">
                              <h4 className="text-gray-200 font-semibold mb-4">Supported Platforms:</h4>
                              <div className="flex flex-wrap gap-3">
                                {feature.platforms.map((platform, pIndex) => (
                                  <span key={pIndex} className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-400/30">
                                    {platform}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {feature.timeSaved && (
                            <div className="flex items-center gap-2 text-blue-400">
                              <Clock className="w-5 h-5" />
                              <span className="font-medium">Saves {feature.timeSaved}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>


        {/* Final CTA */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-16 max-w-5xl mx-auto text-white">
            <h2 className="text-5xl font-bold mb-6">
              Ready to Transform Your AI Prompts?
            </h2>
            <p className="text-blue-100 mb-10 text-xl max-w-3xl mx-auto">
              Join thousands of professionals saving hours every week with better prompts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group px-10 py-5 bg-white text-blue-400 font-bold rounded-xl transition-all flex items-center justify-center gap-3 text-lg shadow-xl hover:shadow-2xl"
              >
                <Globe className="w-6 h-6" />
                Add to Chrome - It's Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <Link href="/pricing">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-400 transition-all"
                >
                  View Pricing Plans
                </motion.button>
              </Link>
            </div>
            
            <p className="text-blue-100 opacity-80">
              Free forever tier • No credit card required • Install in 10 seconds
            </p>
          </div>
        </motion.section>

      </div>
    </main>
  );
}