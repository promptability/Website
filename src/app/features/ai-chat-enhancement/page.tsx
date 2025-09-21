'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Zap, Brain, Clock, ChevronRight, Check, X, 
  Sparkles, Settings, BarChart3, Users, ArrowRight, 
  Play, Copy, Star, Target, Globe, Shield, Send, Loader2
} from 'lucide-react';
import { fadeInUp, staggerContainer, liquidButton, glassCard, cardTilt } from '@/lib/animations';

export default function AIChatEnhancementPage() {
  const [chatMessages, setChatMessages] = useState([
    { type: 'user', text: 'Help me write about climate change', timestamp: '2:30 PM' },
    { type: 'ai', text: "I'll help optimize this. What specific aspect of climate change interests you most?", timestamp: '2:30 PM' },
    { type: 'user', text: 'Business impact', timestamp: '2:31 PM' },
    { type: 'ai', text: "Perfect! Here's your enhanced prompt: 'Analyze the comprehensive business impact of climate change on Fortune 500 companies, including financial risks, adaptation strategies, and market opportunities. Focus on quantifiable metrics and case studies from 2020-2024.'", timestamp: '2:31 PM', enhanced: true }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [enhancementMode, setEnhancementMode] = useState('collaborative');
  const [activeUseCase, setActiveUseCase] = useState('academic');
  const [isTyping, setIsTyping] = useState(false);

  const enhancementModes = {
    guided: {
      title: 'Guided Mode',
      description: 'Step-by-step assistance with questions and suggestions',
      icon: <Target className="w-6 h-6" />
    },
    collaborative: {
      title: 'Collaborative Mode',
      description: 'Work together to co-create perfect prompts',
      icon: <Users className="w-6 h-6" />
    },
    expert: {
      title: 'Expert Mode',
      description: 'Minimal intervention with quick optimizations',
      icon: <Zap className="w-6 h-6" />
    }
  };

  const useCases = {
    academic: {
      title: 'Academic Research',
      description: 'Refine research queries and maintain academic tone',
      example: 'Research impact of social media on mental health'
    },
    creative: {
      title: 'Creative Writing',
      description: 'Develop story prompts while preserving your voice',
      example: 'Create a character for my sci-fi novel'
    },
    technical: {
      title: 'Technical Documentation',
      description: 'Precise specifications with consistent formatting',
      example: 'Document API endpoint requirements'
    },
    business: {
      title: 'Business Analysis',
      description: 'Strategic queries with professional tone',
      example: 'Analyze market trends for Q4 planning'
    }
  };

  const sendMessage = () => {
    if (!currentInput.trim()) return;
    
    setIsTyping(true);
    setChatMessages(prev => [...prev, { 
      type: 'user', 
      text: currentInput, 
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
    }]);
    setCurrentInput('');

    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        type: 'ai',
        text: "I can help enhance that prompt. Let me suggest some improvements to make it more specific and effective. Would you like me to add more context or focus on a particular aspect?",
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
      setIsTyping(false);
    }, 1500);
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
            AI Chat
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Enhancement
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mx-auto mb-12"
          >
            Transform your prompts through intelligent conversation
          </motion.p>

          {/* Chat Interface Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-semibold">Enhanced Chat Session</span>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-400">Active</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {chatMessages.map((message, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-md p-4 rounded-xl ${
                      message.type === 'user' 
                        ? 'bg-blue-500/20 border border-blue-500/30 text-white' 
                        : message.enhanced
                        ? 'bg-gradient-to-br from-blue-500/20 to-blue-500/20 border border-blue-500/30 text-white'
                        : 'bg-white/5 border border-white/10 text-gray-300'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs text-gray-400 mt-2 block">{message.timestamp}</span>
                      {message.enhanced && (
                        <div className="flex items-center gap-1 mt-2">
                          <Sparkles className="w-3 h-3 text-blue-400" />
                          <span className="text-xs text-blue-400">Enhanced</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                        <span className="text-gray-400 text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat Input */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Continue the conversation..."
                  className="flex-1 bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!currentInput.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                </button>
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
              Start Enhanced Chat
            </button>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
              Try Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1: THE EVOLUTION */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            From Static to
            <span className="block bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent">
              Dynamic
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Traditional */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                <X className="w-6 h-6" />
                Traditional Prompting
              </h3>
              <div className="space-y-4">
                {[
                  'Write prompt',
                  'Get response',
                  'Start over if wrong',
                  'No learning between attempts',
                  'Context gets lost'
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-black/40 rounded-lg p-3"
                  >
                    <X className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300">{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                <Check className="w-6 h-6" />
                Enhanced Chat
              </h3>
              <div className="space-y-4">
                {[
                  'Conversational refinement',
                  'Builds on context',
                  'Iterative improvement',
                  'Continuous learning',
                  'Memory of full conversation'
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-black/40 rounded-lg p-3"
                  >
                    <Check className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">{step}</span>
                  </motion.div>
                ))}
              </div>
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
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>

          {/* Step-by-step Process */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                step: 1,
                title: 'Start Naturally',
                description: 'Begin with natural conversation',
                icon: <MessageSquare className="w-8 h-8" />
              },
              {
                step: 2,
                title: 'AI Understands Context',
                description: 'Builds conversation memory',
                icon: <Brain className="w-8 h-8" />
              },
              {
                step: 3,
                title: 'Interactive Refinement',
                description: 'Back-and-forth improvement',
                icon: <Settings className="w-8 h-8" />
              },
              {
                step: 4,
                title: 'Perfect Output',
                description: 'Optimized final result',
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
        </div>
      </section>

      {/* SECTION 3: CORE CAPABILITIES */}
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
              Core
              <span className="block bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
                Capabilities
              </span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Everything you need for intelligent, contextual prompt enhancement
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
                icon: MessageSquare,
                title: 'Interactive Refinement',
                description: 'AI asks clarifying questions and suggests improvements in real-time.',
                gradient: 'from-blue-400 to-cyan-500',
              },
              {
                icon: Brain,
                title: 'Context Memory',
                description: 'Remembers full conversation and maintains topic consistency.',
                gradient: 'from-purple-400 to-purple-500',
              },
              {
                icon: Sparkles,
                title: 'Smart Suggestions',
                description: 'Proactive enhancement tips and alternative phrasings.',
                gradient: 'from-purple-400 to-purple-500',
              },
              {
                icon: Settings,
                title: 'Multi-Turn Optimization',
                description: 'Each exchange improves the prompt iteratively.',
                gradient: 'from-blue-400 to-blue-500',
              },
              {
                icon: Globe,
                title: 'Platform Adaptation',
                description: 'Adjusts for target AI with optimal formatting.',
                gradient: 'from-cyan-400 to-blue-500',
              },
              {
                icon: Shield,
                title: 'Learning Integration',
                description: 'Saves successful patterns for future conversations.',
                gradient: 'from-purple-400 to-purple-500',
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

      {/* SECTION 4: ENHANCEMENT MODES */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Enhancement
            <span className="block bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent">
              Modes
            </span>
          </motion.h2>

          {/* Mode Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(enhancementModes).map((mode) => (
              <button
                key={mode}
                onClick={() => setEnhancementMode(mode)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  enhancementMode === mode
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {enhancementModes[mode as keyof typeof enhancementModes].icon}
                {enhancementModes[mode as keyof typeof enhancementModes].title}
              </button>
            ))}
          </div>

          {/* Mode Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={enhancementMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8 text-center max-w-2xl mx-auto"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {enhancementModes[enhancementMode as keyof typeof enhancementModes].title}
              </h3>
              <p className="text-gray-300">
                {enhancementModes[enhancementMode as keyof typeof enhancementModes].description}
              </p>
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
            Perfect For
            <span className="block bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              Every Scenario
            </span>
          </motion.h2>

          {/* Use Case Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(useCases).map((useCase) => (
              <button
                key={useCase}
                onClick={() => setActiveUseCase(useCase)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeUseCase === useCase
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {useCases[useCase as keyof typeof useCases].title}
              </button>
            ))}
          </div>

          {/* Use Case Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeUseCase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {useCases[activeUseCase as keyof typeof useCases].title}
              </h3>
              <p className="text-gray-300 mb-6">
                {useCases[activeUseCase as keyof typeof useCases].description}
              </p>
              <div className="bg-black/40 border border-white/20 rounded-xl p-6 font-mono text-blue-400">
                "Start with: {useCases[activeUseCase as keyof typeof useCases].example}"
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready for Smarter Conversations?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Transform every prompt through intelligent dialogue
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                Start Enhanced Chat
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                See All Features
              </button>
            </div>

            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Unlimited conversations</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Context memory</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Privacy protected</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      </div>
    </main>
  );
}