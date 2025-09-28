'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Brain, Target, Sparkles, ChevronRight, Check, X, 
  ArrowRight, Code, Layers, Globe, BookOpen, Lightbulb,
  Wand2, MessageSquare, Copy, Settings, BarChart3, Shield
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function PromptEngineeringPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('chatgpt');
  const [highlightedText, setHighlightedText] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformedPrompt, setTransformedPrompt] = useState('');
  const [activeExample, setActiveExample] = useState(0);

  // Demo animation
  useEffect(() => {
    const text = 'explain quantum computing';
    setHighlightedText(text);
    
    setTimeout(() => {
      setIsTransforming(true);
      setTimeout(() => {
        setTransformedPrompt('Explain quantum computing in detail, covering: 1) Basic principles using analogies for a non-technical audience, 2) How qubits differ from classical bits with examples, 3) Key quantum phenomena (superposition, entanglement) with real-world applications, 4) Current limitations and future potential. Format as structured sections with clear headers.');
        setIsTransforming(false);
      }, 1500);
    }, 2000);
  }, []);

  const platforms = {
    chatgpt: {
      name: 'ChatGPT',
      icon: '🤖',
      color: 'from-blue-400 to-blue-500',
      guidelines: ['Clear context setting', 'Structured output format', 'Step-by-step reasoning']
    },
    claude: {
      name: 'Claude',
      icon: '🧠',
      color: 'from-purple-400 to-purple-500',
      guidelines: ['Detailed task description', 'Expected output examples', 'Edge case handling']
    },
    gemini: {
      name: 'Gemini',
      icon: '✨',
      color: 'from-blue-400 to-cyan-500',
      guidelines: ['Multi-modal instructions', 'Creative constraints', 'Iterative refinement']
    },
    perplexity: {
      name: 'Perplexity',
      icon: '🔍',
      color: 'from-purple-400 to-purple-500',
      guidelines: ['Research depth levels', 'Source requirements', 'Fact verification']
    }
  };

  const transformationExamples = [
    {
      before: 'write code for login',
      after: 'Create a secure login system with: 1) Input validation for email/password, 2) Password hashing using bcrypt, 3) JWT token generation, 4) Error handling with specific messages, 5) Rate limiting for brute force protection. Use TypeScript and include comments.',
      category: 'Development'
    },
    {
      before: 'analyze this data',
      after: 'Perform comprehensive data analysis: 1) Statistical summary (mean, median, std dev), 2) Identify patterns and anomalies using visualization, 3) Correlation analysis between variables, 4) Predictive insights with confidence intervals, 5) Actionable recommendations. Present findings in executive summary format.',
      category: 'Analytics'
    },
    {
      before: 'help with marketing',
      after: 'Develop a marketing strategy covering: 1) Target audience analysis with personas, 2) Competitive positioning and USP, 3) Channel-specific tactics (social, email, content), 4) KPIs and success metrics, 5) 90-day implementation roadmap with milestones. Include budget allocation recommendations.',
      category: 'Business'
    },
    {
      before: 'teach me Spanish',
      after: 'Create a personalized Spanish learning plan: 1) Assess current level with diagnostic questions, 2) Focus on conversational phrases for daily use, 3) Grammar rules with mnemonic devices, 4) Cultural context and common mistakes to avoid, 5) Practice exercises with immediate feedback. Adapt to visual/auditory learning style.',
      category: 'Education'
    }
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400">Revolutionary AI Enhancement</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              Prompt Engineering
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Technology
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Transform any text into professional-grade AI prompts optimized for each platform's unique capabilities
            </p>

            {/* Live Demo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-5xl mx-auto mb-12"
            >
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <div className="text-left mb-4">
                  <span className="text-sm text-gray-400">You highlight:</span>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                  <p className="text-lg font-mono text-blue-400">"{highlightedText}"</p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        scale: isTransforming ? [1, 1.2, 1] : 1,
                        rotate: isTransforming ? [0, 360] : 0 
                      }}
                      transition={{ duration: 1.5, repeat: isTransforming ? Infinity : 0 }}
                    >
                      <Wand2 className="w-8 h-8 text-cyan-400" />
                    </motion.div>
                  </div>
                  <div className="h-16" />
                </div>

                <div className="text-left mb-4">
                  <span className="text-sm text-gray-400">AI transforms to:</span>
                </div>
                <AnimatePresence>
                  {transformedPrompt && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/30 rounded-lg p-4"
                    >
                      <p className="text-lg text-white">{transformedPrompt}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                Start Free Trial
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                Watch Demo
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PLATFORM OPTIMIZATION */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Optimized for Every
            <span className="block bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent">
              AI Platform
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-4 gap-4 mb-12">
            {Object.entries(platforms).map(([key, platform]) => (
              <motion.button
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setSelectedPlatform(key)}
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  selectedPlatform === key
                    ? 'bg-gradient-to-br ' + platform.color + ' border-transparent'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="text-3xl mb-2">{platform.icon}</div>
                <h3 className="font-bold">{platform.name}</h3>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPlatform}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">{platforms[selectedPlatform as keyof typeof platforms].icon}</span>
                {platforms[selectedPlatform as keyof typeof platforms].name} Optimization
              </h3>
              <div className="space-y-4">
                {platforms[selectedPlatform as keyof typeof platforms].guidelines.map((guideline, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span className="text-gray-300">{guideline}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* TRANSFORMATION EXAMPLES */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            See the
            <span className="block bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              Transformation
            </span>
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {transformationExamples.map((example, i) => (
              <button
                key={i}
                onClick={() => setActiveExample(i)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeExample === i
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {example.category}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeExample}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Before */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <X className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-semibold">Basic Input</span>
                </div>
                <p className="text-xl text-gray-300 font-mono">
                  "{transformationExamples[activeExample].before}"
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  • Vague and unclear
                  • No structure
                  • Missing context
                  • Weak results
                </div>
              </div>

              {/* After */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Check className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 font-semibold">AI-Enhanced</span>
                </div>
                <p className="text-lg text-white">
                  "{transformationExamples[activeExample].after}"
                </p>
                <div className="mt-4 text-sm text-blue-400">
                  ✓ Crystal clear intent
                  ✓ Structured output
                  ✓ Complete context
                  ✓ Professional results
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Core
            <span className="block bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent">
              Features
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: 'Context Intelligence',
                description: 'Automatically understands your domain and adds relevant context'
              },
              {
                icon: <Layers className="w-8 h-8" />,
                title: 'Multi-Layer Enhancement',
                description: 'Applies structure, clarity, and detail in perfect balance'
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: 'Precision Targeting',
                description: 'Optimizes for your specific use case and desired outcome'
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Universal Compatibility',
                description: 'Works with all major AI platforms seamlessly'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Privacy First',
                description: 'Your prompts are encrypted and secure, never shared with third parties'
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: 'Learning System',
                description: 'Improves based on your preferences and feedback'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-cyan-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
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
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: 1,
                title: 'Highlight Any Text',
                description: 'Select text on any webpage or document',
                icon: <MessageSquare className="w-6 h-6" />
              },
              {
                step: 2,
                title: 'AI Analyzes Intent',
                description: 'Our AI understands what you want to achieve',
                icon: <Brain className="w-6 h-6" />
              },
              {
                step: 3,
                title: 'Instant Transformation',
                description: 'Text is enhanced with professional prompt engineering',
                icon: <Wand2 className="w-6 h-6" />
              },
              {
                step: 4,
                title: 'Copy & Use',
                description: 'Enhanced prompt is ready for any AI platform',
                icon: <Copy className="w-6 h-6" />
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
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
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
                    <ChevronRight className="w-6 h-6 text-cyan-400" />
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
              { value: '10x', label: 'Better Responses' },
              { value: '5 sec', label: 'Transform Time' },
              { value: '100+', label: 'Prompt Templates' },
              { value: '99%', label: 'Success Rate' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
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
            className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your AI Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands who are getting 10x better AI responses
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                Start Free Trial
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                Learn More
              </button>
            </div>

            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Instant access</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      </div>
    </main>
  );
}