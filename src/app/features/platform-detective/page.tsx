'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Shield, Eye, Zap, ChevronRight, Check, 
  Sparkles, Globe, Lock, AlertCircle, TrendingUp,
  Database, Bot, Brain, Cpu, BarChart3, Activity
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function PlatformDetectivePage() {
  const [detectedPlatform, setDetectedPlatform] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState('detection');
  const [scanProgress, setScanProgress] = useState(0);

  // Simulate detection animation
  useEffect(() => {
    setTimeout(() => {
      setIsScanning(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setScanProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setDetectedPlatform('ChatGPT-4');
        }
      }, 200);
    }, 2000);
  }, []);

  const platforms = [
    {
      name: 'ChatGPT',
      versions: ['GPT-3.5', 'GPT-4', 'GPT-4 Turbo'],
      detection: 'Response patterns, formatting, capabilities',
      accuracy: '99.2%'
    },
    {
      name: 'Claude',
      versions: ['Claude 2', 'Claude 2.1', 'Claude Instant'],
      detection: 'Writing style, knowledge cutoff, XML handling',
      accuracy: '98.7%'
    },
    {
      name: 'Gemini',
      versions: ['Pro', 'Ultra', 'Nano'],
      detection: 'Multi-modal signals, response structure',
      accuracy: '97.9%'
    },
    {
      name: 'Perplexity',
      versions: ['Online', 'Pro'],
      detection: 'Citation patterns, real-time data access',
      accuracy: '99.5%'
    }
  ];

  const detectionFeatures = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Real-time Detection',
      description: 'Instantly identifies which AI model you\'re talking to'
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Version Recognition',
      description: 'Detects specific model versions and capabilities'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Optimization Engine',
      description: 'Adjusts prompts for detected platform automatically'
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Performance Tracking',
      description: 'Monitors response quality across different models'
    }
  ];

  const detectionSignals = [
    { signal: 'Response Patterns', strength: 95 },
    { signal: 'Formatting Style', strength: 88 },
    { signal: 'Knowledge Cutoff', strength: 92 },
    { signal: 'Token Limits', strength: 85 },
    { signal: 'API Signatures', strength: 98 },
    { signal: 'Error Messages', strength: 90 }
  ];

  return (
    <main className="min-h-screen text-white relative overflow-x-hidden">
      {/* Background */}
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
      <div className="relative z-40">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-32">
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
              <Search className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400">AI Detection Technology</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              Platform
              <span className="block bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
                Detective
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Automatically detects which AI you\'re using and optimizes your prompts accordingly
            </p>

            {/* Live Detection Demo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">Detection Status</span>
                    <span className={`text-sm ${isScanning ? 'text-purple-400' : 'text-blue-400'}`}>
                      {isScanning ? 'Scanning...' : detectedPlatform ? 'Detected' : 'Ready'}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-purple-500 h-2 rounded-full"
                      animate={{ width: `${scanProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Detection Result */}
                  <AnimatePresence>
                    {detectedPlatform && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-purple-500/10 to-purple-500/10 border border-purple-500/30 rounded-xl p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-purple-400 mb-1">Detected Platform</p>
                            <p className="text-2xl font-bold">{detectedPlatform}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400 mb-1">Confidence</p>
                            <p className="text-2xl font-bold text-blue-400">99.2%</p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <p className="text-sm text-gray-400">
                            ✓ Prompt optimization enabled for this platform
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Scanning Animation */}
                  {isScanning && (
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      {['Analyzing patterns...', 'Checking signatures...', 'Optimizing prompts...'].map((text, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                          className="text-xs text-gray-400 text-center"
                        >
                          {text}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="bg-gradient-to-r from-purple-500 to-purple-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                Enable Detection
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SUPPORTED PLATFORMS */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Supported
            <span className="block bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              Platforms
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-3">{platform.name}</h3>
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Versions:</p>
                  <div className="flex flex-wrap gap-1">
                    {platform.versions.map((version) => (
                      <span key={version} className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-400">
                        {version}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-2">{platform.detection}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                  <span className="text-sm text-gray-400">Accuracy</span>
                  <span className="text-sm font-bold text-blue-400">{platform.accuracy}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DETECTION FEATURES */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Detection
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Technology
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Features List */}
            <div className="space-y-6">
              {detectionFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Signal Strength Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-6">Detection Signals</h3>
              <div className="space-y-4">
                {detectionSignals.map((signal, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-300">{signal.signal}</span>
                      <span className="text-sm text-purple-400">{signal.strength}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${signal.strength}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="bg-gradient-to-r from-purple-500 to-purple-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            How It
            <span className="block bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: 1,
                title: 'Automatic Scanning',
                description: 'Monitors your AI conversations in real-time',
                icon: <Search className="w-6 h-6" />
              },
              {
                step: 2,
                title: 'Pattern Analysis',
                description: 'Analyzes response patterns and signatures',
                icon: <Activity className="w-6 h-6" />
              },
              {
                step: 3,
                title: 'Platform Identification',
                description: 'Identifies the exact AI model and version',
                icon: <Cpu className="w-6 h-6" />
              },
              {
                step: 4,
                title: 'Prompt Optimization',
                description: 'Adjusts your prompts for maximum effectiveness',
                icon: <Zap className="w-6 h-6" />
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex gap-6 mb-12"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    {item.icon}
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:flex items-center">
                    <ChevronRight className="w-6 h-6 text-purple-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '15+', label: 'AI Platforms' },
              { value: '99%', label: 'Detection Accuracy' },
              { value: '<1s', label: 'Detection Time' },
              { value: '24/7', label: 'Real-time Monitoring' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-500/20 to-purple-500/20 border border-purple-500/30 rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Never Guess Which AI Again
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Automatic detection and optimization for every conversation
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-gradient-to-r from-purple-500 to-purple-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                Enable Detection
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                View Demo
              </button>
            </div>

            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Works everywhere</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>No configuration</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Privacy focused</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      </div>
    </main>
  );
}