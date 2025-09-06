'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gift, Download, Users, BookOpen, ExternalLink, 
  CheckCircle, Circle, Play, Star, Sparkles, Chrome, 
  FileText, MessageSquare, TrendingUp, Zap
} from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import FloatingCard from '@/components/ui/FloatingCard';

export default function FreeStarterWelcomePage() {
  const [showSparkles, setShowSparkles] = useState(true);
  const [userDetails, setUserDetails] = useState({
    userId: 'USR-2024-001234',
    email: 'user@example.com',
    joinDate: new Date().toLocaleDateString(),
    usageCount: 0,
    usageLimit: 50
  });

  useEffect(() => {
    // Hide sparkles after 4 seconds
    const timer = setTimeout(() => setShowSparkles(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const freeFeatures = [
    { name: '50 optimizations/month', description: 'Perfect for getting started', available: true },
    { name: 'Basic AI platform support', description: 'Works with popular AI tools', available: true },
    { name: 'Standard optimization', description: 'Core prompt improvements', available: true },
    { name: 'Chrome extension', description: 'Easy browser integration', available: true },
    { name: 'Community support', description: 'Help from our community', available: true },
    { name: 'Basic templates', description: 'Pre-made prompt templates', available: true },
    { name: 'Advanced modes', description: 'Context-aware optimization', available: false },
    { name: 'API access', description: 'Developer integration', available: false }
  ];

  const quickStartSteps = [
    {
      number: 1,
      title: 'Install',
      description: 'Add to browser - It\'s 100% free',
      icon: <Download className="w-6 h-6" />
    },
    {
      number: 2,
      title: 'Try It',
      description: 'Visit ChatGPT or Claude - Click extension icon',
      icon: <Zap className="w-6 h-6" />
    },
    {
      number: 3,
      title: 'Optimize',
      description: 'Type any prompt - Get instant improvements',
      icon: <Star className="w-6 h-6" />
    }
  ];

  const resources = [
    {
      title: 'Getting Started Video',
      description: 'Watch how to use Promptability',
      icon: <Play className="w-5 h-5" />,
      href: '/docs/videos'
    },
    {
      title: 'Documentation',
      description: 'Complete feature guide',
      icon: <BookOpen className="w-5 h-5" />,
      href: '/docs'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users',
      icon: <Users className="w-5 h-5" />,
      href: '#'
    },
    {
      title: 'Free Templates',
      description: 'Ready-to-use prompts',
      icon: <FileText className="w-5 h-5" />,
      href: '#'
    }
  ];

  return (
    <main className="min-h-screen text-white overflow-x-hidden relative">
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

      {/* Sparkle Effect */}
      <AnimatePresence>
        {showSparkles && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ 
                  x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0, 
                  y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
                  scale: 0,
                  rotate: 0 
                }}
                animate={{ 
                  scale: [0, 1, 0],
                  rotate: 360 
                }}
                transition={{ 
                  duration: 2,
                  delay: Math.random() * 3,
                  repeat: 2
                }}
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Welcome Animation Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-8"
          >
            <div className="relative inline-flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mb-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                >
                  <Gift className="w-12 h-12 text-white" />
                </motion.div>
              </motion.div>
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Welcome to Promptability!
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-400 mb-6"
          >
            Your Free Starter account is ready
          </motion.p>

          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <span className="text-blue-400">Account ID:</span>
              <span className="font-mono">{userDetails.userId}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full" />
            <div>
              Joined {userDetails.joinDate}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mt-4"
          >
            <Gift className="w-4 h-4" />
            Free Tier
          </motion.div>
        </motion.div>

        {/* Account Created Card */}
        <motion.div
          variants={fadeInUp}
          className="mb-16"
        >
          <FloatingCard className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Account Created Successfully</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Plan</span>
                  <span className="text-white font-semibold">Starter (Free)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email</span>
                  <span className="text-white">{userDetails.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400 font-semibold">Active</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Usage</span>
                  <span className="text-white">{userDetails.usageCount}/{userDetails.usageLimit} optimizations</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(userDetails.usageCount / userDetails.usageLimit) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">Resets monthly</p>
              </div>
            </div>
          </FloatingCard>
        </motion.div>

        {/* Free Features Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What You Get for Free</h2>
            <p className="text-gray-400">All these features are included in your starter account</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {freeFeatures.map((feature, index) => (
              <motion.div
                key={feature.name}
                variants={fadeInUp}
                className="group"
              >
                <FloatingCard className={`p-6 h-full transition-colors ${
                  feature.available 
                    ? 'hover:border-green-500/30' 
                    : 'hover:border-white/20 opacity-60'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {feature.available ? (
                        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                          <Circle className="w-5 h-5 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-2 ${
                        feature.available ? 'text-white' : 'text-gray-500'
                      }`}>
                        {feature.name}
                        {!feature.available && <span className="text-blue-400 text-xs ml-2">(Pro)</span>}
                      </h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </FloatingCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Download Extension Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Install Your Free Extension</h2>
            <p className="text-gray-400">Start optimizing prompts in seconds</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center mb-8">
            <a
              href="/chrome-extension"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-lg"
            >
              <Chrome className="w-6 h-6" />
              Download Chrome Extension
            </a>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex justify-center gap-6 text-sm text-gray-400 mb-6">
            <button className="hover:text-white transition-colors">Firefox</button>
            <button className="hover:text-white transition-colors">Safari</button>
            <button className="hover:text-white transition-colors">Edge</button>
            <button className="hover:text-white transition-colors">Brave</button>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center">
            <button className="text-gray-500 hover:text-gray-400 text-sm">
              Skip for now (you can install later)
            </button>
          </motion.div>
        </motion.div>

        {/* Quick Start Guide */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Get Started in 3 Simple Steps</h2>
          </motion.div>

          <div className="relative">
            {/* Progress Line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {quickStartSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <FloatingCard className="p-6 h-full">
                    <div className="mb-6">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      >
                        {step.number}
                      </motion.div>
                      <div className="w-8 h-8 text-blue-400 mx-auto mb-4">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </FloatingCard>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Resources Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Free Resources to Get You Started</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <motion.div variants={fadeInUp} key={resource.title}>
                <a href={resource.href}>
                  <FloatingCard className="p-6 text-center hover:border-blue-500/30 transition-colors group cursor-pointer h-full">
                    <div className="text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform">
                      {resource.icon}
                    </div>
                    <h3 className="font-semibold text-white mb-2">{resource.title}</h3>
                    <p className="text-gray-400 text-sm">{resource.description}</p>
                  </FloatingCard>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Subtle Upgrade Prompt */}
        <motion.div
          variants={fadeInUp}
          className="mb-16"
        >
          <FloatingCard className="p-6 text-center border-blue-500/20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Want Unlimited Optimizations?</h3>
            </div>
            <p className="text-gray-400 mb-6">Upgrade to Pro for unlimited prompts, advanced features, and priority support</p>
            <div className="flex justify-center gap-4">
              <a
                href="/pricing"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Upgrade to Pro
              </a>
              <button className="px-6 py-3 text-gray-400 hover:text-white transition-colors">
                Maybe later
              </button>
            </div>
          </FloatingCard>
        </motion.div>

        {/* Account Actions */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeInUp}>
              <a href="/account">
                <FloatingCard className="p-6 text-center hover:border-blue-500/30 transition-colors group cursor-pointer">
                  <MessageSquare className="w-8 h-8 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-white mb-2">Go to Account</h3>
                  <p className="text-gray-400 text-sm">Manage your profile and settings</p>
                </FloatingCard>
              </a>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <a href="/platforms">
                <FloatingCard className="p-6 text-center hover:border-blue-500/30 transition-colors group cursor-pointer">
                  <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-white mb-2">Explore Platforms</h3>
                  <p className="text-gray-400 text-sm">See all supported AI platforms</p>
                </FloatingCard>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}