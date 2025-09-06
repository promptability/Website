'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Zap, User, Clock, ChevronRight, Check, X, 
  Sparkles, Settings, BarChart3, Users, ArrowRight, 
  Play, Copy, Star, Target, Globe, Shield, Send, 
  FileText, Code, Microscope, PenTool, Sliders, MessageSquare
} from 'lucide-react';
import { fadeInUp, staggerContainer, liquidButton, glassCard, cardTilt } from '@/lib/animations';

export default function LearnsYourStylePage() {
  const [learningProgress, setLearningProgress] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [activeUseCase, setActiveUseCase] = useState('technical');
  const [styleMetrics, setStyleMetrics] = useState({
    consistency: 0,
    adaptation: 0,
    accuracy: 0
  });

  // Animate learning progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setStyleMetrics({
        consistency: 99,
        adaptation: 85,
        accuracy: 94
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const learningExamples = {
    1: {
      title: 'Week 1: Generic Optimization',
      prompt: 'write documentation',
      optimized: 'Create comprehensive documentation that covers all features and includes examples.',
      style: 'Basic improvements'
    },
    2: {
      title: 'Week 2: Recognizes Patterns',
      prompt: 'write documentation',
      optimized: 'Write technical documentation following your established style: clear headings, code examples, and step-by-step instructions.',
      style: 'Better alignment'
    },
    4: {
      title: 'Week 4: Fully Personalized',
      prompt: 'write documentation',
      optimized: 'Create API documentation using your preferred format: concise descriptions, TypeScript examples, error handling patterns, and integration guides with your standard terminology.',
      style: 'Perfect style match'
    }
  };

  const useCases = {
    technical: {
      title: 'Technical Writer',
      description: 'Maintains documentation style and consistent terminology',
      features: ['Technical accuracy', 'Consistent terminology', 'Documentation style']
    },
    content: {
      title: 'Content Creator',
      description: 'Preserves brand voice and audience alignment',
      features: ['Brand voice', 'Audience alignment', 'Creative freedom']
    },
    academic: {
      title: 'Academic Researcher',
      description: 'Academic tone preserved with discipline-specific terms',
      features: ['Academic tone', 'Citation style', 'Discipline terms']
    },
    developer: {
      title: 'Developer',
      description: 'Code context understood with language preferences',
      features: ['Code context', 'Language preferences', 'Framework specifics']
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
      <div className="relative z-40">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-32">
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <span className="bg-purple-500/20 border border-purple-500/30 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold">
              ADAPTIVE AI
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold text-center mb-6"
          >
            Learns Your
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Style
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mx-auto mb-12"
          >
            AI that adapts to your unique voice and preferences
          </motion.p>

          {/* Neural Network Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Your Personal AI Profile</h3>
                <p className="text-gray-400">Building your style signature...</p>
              </div>

              {/* Style Metrics */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-400 mb-1">{styleMetrics.consistency}%</div>
                  <div className="text-sm text-gray-300">Voice Consistency</div>
                </div>
                <div className="text-center bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-400 mb-1">{styleMetrics.adaptation}%</div>
                  <div className="text-sm text-gray-300">Style Adaptation</div>
                </div>
                <div className="text-center bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">{styleMetrics.accuracy}%</div>
                  <div className="text-sm text-gray-300">Pattern Accuracy</div>
                </div>
              </div>

              {/* Learning Visualization */}
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-purple-400 font-semibold">Learning Progress</span>
                  <span className="text-sm text-gray-400">5 prompts analyzed</span>
                </div>
                <div className="space-y-3">
                  {['Writing tone detected', 'Formality level identified', 'Domain expertise mapped', 'Output preferences learned', 'Style profile complete'].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.2 }}
                      className="flex items-center gap-3"
                    >
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
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
              Start Personalization
            </button>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
              See How It Works
            </button>
          </motion.div>
        </div>
      </section>

      {/* VALUE METRICS */}
      <section className="bg-black/60 backdrop-blur-xl border-y border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Zap className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <p className="font-semibold">Adapts in 5 prompts</p>
            </div>
            <div>
              <User className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <p className="font-semibold">99% voice consistency</p>
            </div>
            <div>
              <Brain className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <p className="font-semibold">Personal AI profile</p>
            </div>
            <div>
              <Settings className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <p className="font-semibold">Zero setup required</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE PROBLEM */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            One Size Doesn't
            <span className="block bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Fit All
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Generic Tools */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
                <X className="w-6 h-6" />
                Generic AI Tools
              </h3>
              <div className="space-y-4">
                {[
                  'Same suggestions for everyone',
                  'Ignores your expertise level',
                  'No memory of preferences',
                  'Loses your unique voice',
                  'One-size-fits-all approach'
                ].map((issue, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-black/40 rounded-lg p-3"
                  >
                    <X className="w-4 h-4 text-red-400" />
                    <span className="text-gray-300">{issue}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Promptability Learning */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                <Check className="w-6 h-6" />
                Promptability's Learning
              </h3>
              <div className="space-y-4">
                {[
                  'Personalized to your style',
                  'Knows your domain expertise',
                  'Remembers your patterns',
                  'Preserves your unique voice',
                  'Adapts to your workflow'
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-black/40 rounded-lg p-3"
                  >
                    <Check className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW LEARNING WORKS */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            How Learning
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>

          {/* Step-by-step Process */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {[
              {
                step: 1,
                title: 'Observe Your Patterns',
                description: 'Tracks word choices and structure',
                icon: <Target className="w-8 h-8" />
              },
              {
                step: 2,
                title: 'Identify Your Style',
                description: 'Formal vs casual detection',
                icon: <User className="w-8 h-8" />
              },
              {
                step: 3,
                title: 'Build Your Profile',
                description: 'Domain expertise mapping',
                icon: <Brain className="w-8 h-8" />
              },
              {
                step: 4,
                title: 'Apply Intelligence',
                description: 'Personalized enhancements',
                icon: <Sparkles className="w-8 h-8" />
              },
              {
                step: 5,
                title: 'Continuous Improvement',
                description: 'Evolution over time',
                icon: <BarChart3 className="w-8 h-8" />
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
                  <div className="text-purple-400 mb-4 flex justify-center">
                    {item.icon}
                  </div>
                  <div className="text-sm text-purple-400 font-semibold mb-2">STEP {item.step}</div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
                {i < 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-5 h-5 text-purple-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT IT LEARNS */}
      <section className="py-20 px-4">
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
              What It
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Learns
              </span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Six key areas where AI adapts to your unique communication style
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: PenTool,
                title: 'Writing Style',
                description: 'Tone, voice, formality level, sentence structure, and vocabulary preferences.',
                gradient: 'from-blue-400 to-cyan-500',
              },
              {
                icon: Brain,
                title: 'Domain Expertise',
                description: 'Technical depth, industry jargon, specific terminology, and knowledge level.',
                gradient: 'from-purple-400 to-pink-500',
              },
              {
                icon: Settings,
                title: 'Output Preferences',
                description: 'Format choices, length preferences, structure patterns, and detail level.',
                gradient: 'from-green-400 to-emerald-500',
              },
              {
                icon: Globe,
                title: 'Platform Patterns',
                description: 'ChatGPT habits, Claude preferences, Gemini specifics, cross-platform trends.',
                gradient: 'from-orange-400 to-red-500',
              },
              {
                icon: FileText,
                title: 'Project Context',
                description: 'Recurring themes, common tasks, workflow patterns, and goal alignment.',
                gradient: 'from-cyan-400 to-blue-500',
              },
              {
                icon: MessageSquare,
                title: 'Communication Style',
                description: 'Question phrasing, instruction format, clarification style, feedback patterns.',
                gradient: 'from-indigo-400 to-purple-500',
              }
            ].map((feature, index) => (
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

      {/* SECTION 4: LEARNING EXAMPLES */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Learning
            <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Evolution
            </span>
          </motion.h2>

          {/* Week Selector */}
          <div className="flex justify-center gap-4 mb-12">
            {[1, 2, 4].map((week) => (
              <button
                key={week}
                onClick={() => setCurrentWeek(week)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentWeek === week
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Week {week}
              </button>
            ))}
          </div>

          {/* Learning Example */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWeek}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  {learningExamples[currentWeek as keyof typeof learningExamples].title}
                </h3>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Your Input</div>
                    <div className="bg-black/40 border border-white/20 rounded-xl p-4 font-mono text-gray-300">
                      "{learningExamples[currentWeek as keyof typeof learningExamples].prompt}"
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-blue-400 mb-2">AI Enhancement</div>
                    <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4 font-mono text-white">
                      "{learningExamples[currentWeek as keyof typeof learningExamples].optimized}"
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <span className="inline-block bg-purple-500/20 border border-purple-500/30 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold">
                    {learningExamples[currentWeek as keyof typeof learningExamples].style}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 5: USE CASES */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Perfect For Every
            <span className="block bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Professional
            </span>
          </motion.h2>

          {/* Use Case Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(useCases).map(([key, useCase]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Object.keys(useCases).indexOf(key) * 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-center mb-4">
                  {key === 'technical' && <FileText className="w-12 h-12 mx-auto text-blue-400" />}
                  {key === 'content' && <PenTool className="w-12 h-12 mx-auto text-green-400" />}
                  {key === 'academic' && <Microscope className="w-12 h-12 mx-auto text-purple-400" />}
                  {key === 'developer' && <Code className="w-12 h-12 mx-auto text-cyan-400" />}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 text-center">{useCase.title}</h3>
                <p className="text-gray-300 text-sm mb-4 text-center">{useCase.description}</p>
                
                <div className="space-y-2">
                  {useCase.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-3 h-3 text-green-400" />
                      <span className="text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: PRIVACY & CONTROL */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Your Data,
            <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Your Control
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-green-400 mb-6">Privacy Protection</h3>
              <div className="space-y-4">
                {[
                  'Data stored locally on your device',
                  'No cloud storage of personal patterns',
                  'End-to-end encryption',
                  'Complete data ownership',
                  'GDPR compliant'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6">Full Control</h3>
              <div className="space-y-4">
                {[
                  'Enable/disable learning anytime',
                  'Export your style profile',
                  'Reset learning data',
                  'Selective category learning',
                  'Granular privacy controls'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready for AI That Knows You?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start building your personalized AI assistant today
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                Start Learning
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                Privacy Policy
              </button>
            </div>

            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Privacy protected</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Always in control</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Instant adaptation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      </div>
    </main>
  );
}