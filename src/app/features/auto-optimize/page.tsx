'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RefreshCw, Zap, Brain, Clock, ChevronRight, Check, X, 
  Sparkles, Settings, BarChart3, Users, ArrowRight, 
  Play, Pause, Sliders, Globe, Shield, Timer
} from 'lucide-react';
import { fadeInUp, staggerContainer, liquidButton } from '@/lib/animations';

export default function AutoOptimizePage() {
  const [typedText, setTypedText] = useState('');
  const [optimizedText, setOptimizedText] = useState('');
  const [optimizationLevel, setOptimizationLevel] = useState(70);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [activeScenario, setActiveScenario] = useState('developer');
  const [demoInput, setDemoInput] = useState('');
  const [stats, setStats] = useState({
    optimized: 0,
    timeSaved: 0,
    quality: 0
  });

  // Typing animation for hero
  useEffect(() => {
    const text = 'write blog about productivity';
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setTypedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        // Start optimization animation
        setTimeout(() => {
          setIsOptimizing(true);
          setTimeout(() => {
            setOptimizedText('Create a comprehensive blog post about productivity techniques for remote workers, including time management strategies, tool recommendations, and work-life balance tips. Format with engaging headers and actionable bullet points.');
            setIsOptimizing(false);
          }, 1500);
        }, 500);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Animate stats
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        optimized: 2847,
        timeSaved: 473,
        quality: 94
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const scenarios = {
    developer: {
      original: 'fix this bug',
      optimized: 'Debug this Python function that throws TypeError when processing null values. Identify the issue, provide a fix with error handling, and explain the solution step-by-step.'
    },
    writer: {
      original: 'write article about AI',
      optimized: 'Write a 1500-word article exploring AI\'s impact on creative industries. Include current examples, expert opinions, ethical considerations, and future predictions. Target audience: tech-savvy professionals.'
    },
    student: {
      original: 'help with essay',
      optimized: 'Review my essay on climate change and provide feedback on thesis clarity, argument structure, evidence usage, and citation format (APA 7th edition). Suggest specific improvements.'
    },
    researcher: {
      original: 'analyze this data',
      optimized: 'Perform statistical analysis on this dataset: identify trends, outliers, and correlations. Provide visualizations, confidence intervals, and actionable insights for decision-making.'
    }
  };

  const optimizeDemo = (text: string) => {
    if (!text) return '';
    // Simple demo optimization
    const optimizations = {
      'write': 'Create a comprehensive',
      'help': 'Provide detailed assistance',
      'fix': 'Debug and resolve',
      'make': 'Design and implement',
      'analyze': 'Perform in-depth analysis'
    };
    
    let result = text;
    Object.entries(optimizations).forEach(([key, value]) => {
      if (result.toLowerCase().includes(key)) {
        result = result.replace(new RegExp(key, 'gi'), value);
      }
    });
    
    if (result.length < 50) {
      result += ' with detailed explanations, examples, and best practices.';
    }
    
    return result;
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
      <div className="relative z-40">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-32">
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold text-center mb-6"
          >
            Auto-Optimize
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Mode
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mx-auto mb-12"
          >
            Your AI copilot that perfects every prompt automatically
          </motion.p>

          {/* Split-screen Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12"
          >
            {/* Left: User typing */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="ml-2 text-sm text-gray-400">You Type</span>
              </div>
              <div className="font-mono text-lg text-gray-300">
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  |
                </motion.span>
              </div>
            </div>

            {/* Right: Optimized prompt */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw className={`w-4 h-4 text-blue-400 ${isOptimizing ? 'animate-spin' : ''}`} />
                <span className="text-sm text-blue-400">Auto-Optimized</span>
              </div>
              <AnimatePresence mode="wait">
                {optimizedText && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-lg text-white"
                  >
                    {optimizedText}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
              Enable Auto-Optimize
            </button>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
              See It In Action
            </button>
          </motion.div>
        </div>
      </section>


      {/* SECTION 1: THE PROBLEM IT SOLVES */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            The Problem It
            <span className="block bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent">
              Solves
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                <X className="w-6 h-6" />
                Before Auto-Optimize
              </h3>
              <div className="space-y-4">
                {[
                  { time: '2 min', task: 'Write prompt', status: 'waiting' },
                  { time: '+1 min', task: 'Get weak response', status: 'failed' },
                  { time: '+3 min', task: 'Rewrite prompt', status: 'waiting' },
                  { time: '+2 min', task: 'Try again', status: 'failed' },
                  { time: '+5 min', task: 'Still not right', status: 'failed' },
                  { time: '13 min', task: 'Frustration builds', status: 'failed' }
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-purple-400 font-mono text-sm w-16">{step.time}</span>
                    <div className="flex-1 bg-black/40 rounded-lg p-3">
                      <p className="text-gray-300">{step.task}</p>
                    </div>
                    {step.status === 'failed' && <X className="w-5 h-5 text-purple-400" />}
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-3xl font-bold text-purple-400">13+ minutes</p>
                <p className="text-gray-400">per prompt</p>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                <Check className="w-6 h-6" />
                After Auto-Optimize
              </h3>
              <div className="space-y-4">
                {[
                  { time: '30 sec', task: 'Write naturally', status: 'success' },
                  { time: '0 sec', task: 'Auto-optimization happens', status: 'auto' },
                  { time: '+0 sec', task: 'Perfect response first time', status: 'success' }
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-blue-400 font-mono text-sm w-16">{step.time}</span>
                    <div className="flex-1 bg-black/40 rounded-lg p-3">
                      <p className="text-gray-300">{step.task}</p>
                    </div>
                    {step.status === 'success' && <Check className="w-5 h-5 text-blue-400" />}
                    {step.status === 'auto' && <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />}
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-3xl font-bold text-blue-400">30 seconds</p>
                <p className="text-gray-400">total time</p>
              </div>
              
              {/* Celebration effect */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className="mt-8 text-center"
              >
                <Sparkles className="w-16 h-16 mx-auto text-purple-400 animate-pulse" />
                <p className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text mt-2">
                  26x Faster!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            How It
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>

          {/* Step-by-step Process */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                step: 1,
                title: 'You Type Naturally',
                description: 'No special formatting needed',
                icon: <span className="text-2xl">✍️</span>
              },
              {
                step: 2,
                title: 'AI Analyzes Intent',
                description: 'Understands your context',
                icon: <Brain className="w-8 h-8" />
              },
              {
                step: 3,
                title: 'Instant Optimization',
                description: 'Enhances clarity & structure',
                icon: <RefreshCw className="w-8 h-8" />
              },
              {
                step: 4,
                title: 'Seamless Delivery',
                description: 'Better results every time',
                icon: <Sparkles className="w-8 h-8" />
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="text-blue-400 mb-4 flex justify-center">
                    {item.icon}
                  </div>
                  <div className="text-sm text-blue-400 font-semibold mb-2">STEP {item.step}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-blue-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/20 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Try It Yourself</h3>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Prompt</label>
                <textarea
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  placeholder="Type any prompt here..."
                  className="w-full h-32 bg-black/40 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Auto-Optimized Result</label>
                <div className="w-full h-32 bg-black/40 border border-blue-500/30 rounded-xl p-4 text-white overflow-y-auto">
                  {demoInput ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-blue-400"
                    >
                      {optimizeDemo(demoInput)}
                    </motion.div>
                  ) : (
                    <span className="text-gray-500">Optimized prompt will appear here...</span>
                  )}
                </div>
              </div>
            </div>

            {/* Optimization Level Slider */}
            <div className="mt-8">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Optimization Level</label>
                <span className="text-sm text-blue-400">{optimizationLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={optimizationLevel}
                onChange={(e) => setOptimizationLevel(Number(e.target.value))}
                className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${optimizationLevel}%, #374151 ${optimizationLevel}%, #374151 100%)`
                }}
              />
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>Light touch</span>
                <span>Balanced</span>
                <span>Heavy optimization</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: REAL-WORLD SCENARIOS */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Real-World
            <span className="block bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent">
              Scenarios
            </span>
          </motion.h2>

          {/* Scenario Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(scenarios).map((scenario) => (
              <button
                key={scenario}
                onClick={() => setActiveScenario(scenario)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeScenario === scenario
                    ? 'bg-gradient-to-r from-blue-500 to-blue-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
              </button>
            ))}
          </div>

          {/* Scenario Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScenario}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Original */}
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <X className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-semibold">Original Prompt</span>
                </div>
                <p className="text-xl text-gray-300 font-mono">
                  "{scenarios[activeScenario as keyof typeof scenarios].original}"
                </p>
              </div>

              {/* Optimized */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Check className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 font-semibold">Auto-Optimized</span>
                </div>
                <p className="text-xl text-white font-mono">
                  "{scenarios[activeScenario as keyof typeof scenarios].optimized}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-8 mt-12 text-center"
          >
            <div>
              <Timer className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="text-3xl font-bold text-blue-400">8 min</p>
              <p className="text-gray-400">Time saved</p>
            </div>
            <div>
              <Zap className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="text-3xl font-bold text-blue-400">3x</p>
              <p className="text-gray-400">Quality boost</p>
            </div>
            <div>
              <BarChart3 className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="text-3xl font-bold text-blue-400">95%</p>
              <p className="text-gray-400">Success rate</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500/20 to-blue-500/20 border border-blue-500/30 rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Enable Auto-Optimize Now
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start saving 10 minutes per prompt
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                Get Started Free
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                View Documentation
              </button>
            </div>

            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>30-day guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      </div>
    </main>
  );
}