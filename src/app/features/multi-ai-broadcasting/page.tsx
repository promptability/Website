'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Zap, Brain, Clock, ChevronRight, Check, X, 
  Sparkles, Settings, BarChart3, Users, ArrowRight, 
  Play, Copy, Star, Target, Globe, Shield
} from 'lucide-react';
import { fadeInUp, staggerContainer, liquidButton, glassCard, cardTilt } from '@/lib/animations';

export default function MultiAIBroadcastingPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState(['chatgpt', 'claude', 'gemini']);
  const [broadcastInput, setBroadcastInput] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [responses, setResponses] = useState<any[]>([]);
  const [activeUseCase, setActiveUseCase] = useState('research');

  const platforms = [
    { id: 'chatgpt', name: 'ChatGPT', status: 'online', color: 'blue' },
    { id: 'claude', name: 'Claude', status: 'online', color: 'purple' },
    { id: 'gemini', name: 'Gemini', status: 'online', color: 'blue' },
    { id: 'perplexity', name: 'Perplexity', status: 'online', color: 'purple' },
    { id: 'mistral', name: 'Mistral', status: 'online', color: 'cyan' },
    { id: 'llama', name: 'Llama', status: 'online', color: 'purple' }
  ];

  const useCases = {
    research: {
      title: 'Research & Fact-Checking',
      description: 'Compare multiple sources for accuracy',
      example: 'What are the latest developments in quantum computing?'
    },
    creative: {
      title: 'Creative Brainstorming',
      description: 'Generate diverse creative perspectives',
      example: 'Create a marketing campaign for sustainable fashion'
    },
    code: {
      title: 'Code Solution Finding',
      description: 'Compare different coding approaches',
      example: 'Optimize this React component for better performance'
    },
    content: {
      title: 'Content Generation',
      description: 'Generate varied content styles',
      example: 'Write a blog post about AI ethics'
    }
  };

  const simulateBroadcast = () => {
    if (!broadcastInput.trim() || selectedPlatforms.length === 0) return;
    
    setIsSimulating(true);
    setResponses([]);
    
    // Simulate responses from selected platforms
    setTimeout(() => {
      const mockResponses = selectedPlatforms.map((platformId, index) => ({
        platform: platforms.find(p => p.id === platformId),
        response: `This is a simulated response from ${platforms.find(p => p.id === platformId)?.name} for your prompt: "${broadcastInput}". Each AI provides a unique perspective and approach to your query.`,
        score: Math.floor(Math.random() * 20) + 80,
        responseTime: Math.floor(Math.random() * 2000) + 500
      }));
      setResponses(mockResponses);
      setIsSimulating(false);
    }, 2000);
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
            Multi-AI
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Broadcasting
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mx-auto mb-12"
          >
            One prompt, multiple AIs, instant comparison
          </motion.p>

          {/* Interactive Demo Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Prompt</label>
                <textarea
                  value={broadcastInput}
                  onChange={(e) => setBroadcastInput(e.target.value)}
                  placeholder="Type your prompt here to broadcast to multiple AIs..."
                  className="w-full h-32 bg-black/40 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => {
                      setSelectedPlatforms(prev => 
                        prev.includes(platform.id) 
                          ? prev.filter(id => id !== platform.id)
                          : [...prev, platform.id]
                      );
                    }}
                    className={`p-3 rounded-xl border transition-all duration-300 ${
                      selectedPlatforms.includes(platform.id)
                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-2 h-2 rounded-full mx-auto mb-2 ${
                        platform.status === 'online' ? 'bg-blue-400' : 'bg-purple-400'
                      }`} />
                      <span className="text-xs font-medium">{platform.name}</span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={simulateBroadcast}
                disabled={!broadcastInput.trim() || selectedPlatforms.length === 0 || isSimulating}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                {isSimulating ? (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5 animate-pulse" />
                    Broadcasting to {selectedPlatforms.length} AIs...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Broadcast to {selectedPlatforms.length} AIs
                  </span>
                )}
              </button>
            </div>

            {/* Simulated Responses */}
            {responses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
              >
                {responses.map((response, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-semibold">{response.platform?.name}</span>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-400">{response.score}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">{response.response}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{response.responseTime}ms</span>
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <Copy className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
              Enable Broadcasting
            </button>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
              See Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1: THE CHALLENGE */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            The Challenge of
            <span className="block bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent">
              AI Shopping
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
                Traditional Approach
              </h3>
              <div className="space-y-4">
                {[
                  { task: 'Ask ChatGPT', time: '2 min', result: 'Good response' },
                  { task: 'Try Claude for comparison', time: '+3 min', result: 'Different angle' },
                  { task: 'Test Gemini too', time: '+2 min', result: 'Another perspective' },
                  { task: 'Compare manually', time: '+5 min', result: 'Confusion' },
                  { task: 'Choose best answer', time: '+3 min', result: 'Uncertainty' }
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-black/40 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{step.task}</span>
                      <span className="text-purple-400 text-sm font-mono">{step.time}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{step.result}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-3xl font-bold text-purple-400">15+ minutes</p>
                <p className="text-gray-400">per comparison</p>
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
                Multi-AI Broadcasting
              </h3>
              <div className="space-y-4">
                {[
                  { task: 'Write prompt once', time: '1 min', result: 'Clear input' },
                  { task: 'Select AIs to query', time: '10 sec', result: '6 platforms selected' },
                  { task: 'Broadcast simultaneously', time: '0 sec', result: 'All queried at once' },
                  { task: 'Compare responses', time: '30 sec', result: 'Side-by-side view' },
                  { task: 'Choose best answer', time: '15 sec', result: 'Clear winner' }
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-black/40 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{step.task}</span>
                      <span className="text-blue-400 text-sm font-mono">{step.time}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{step.result}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-3xl font-bold text-blue-400">2 minutes</p>
                <p className="text-gray-400">total time</p>
              </div>
              
              {/* Success effect */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className="mt-8 text-center"
              >
                <Sparkles className="w-16 h-16 mx-auto text-blue-400 animate-pulse" />
                <p className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mt-2">
                  7.5x Faster!
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
            <span className="block bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>

          {/* Step-by-step Process */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                step: 1,
                title: 'Write Your Prompt Once',
                description: 'Single input field for all AIs',
                icon: <span className="text-2xl">✍️</span>
              },
              {
                step: 2,
                title: 'Select Your AI Platforms',
                description: 'Choose which AIs to query',
                icon: <Target className="w-8 h-8" />
              },
              {
                step: 3,
                title: 'Broadcast Simultaneously',
                description: 'Send to all platforms at once',
                icon: <Send className="w-8 h-8" />
              },
              {
                step: 4,
                title: 'Compare All Responses',
                description: 'Side-by-side analysis',
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

      {/* SECTION 3: KEY CAPABILITIES */}
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
              Key
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Capabilities
              </span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Everything you need to harness the collective intelligence of multiple AI platforms
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
                icon: Send,
                title: 'Instant Broadcasting',
                description: 'Send prompts to multiple AIs simultaneously with zero latency.',
                gradient: 'from-blue-400 to-cyan-500',
              },
              {
                icon: BarChart3,
                title: 'Response Scoring',
                description: 'Automatic quality assessment and ranking of all responses.',
                gradient: 'from-blue-400 to-blue-500',
              },
              {
                icon: Settings,
                title: 'Format Standardization',
                description: 'Consistent formatting across different AI platform responses.',
                gradient: 'from-purple-400 to-purple-500',
              },
              {
                icon: Clock,
                title: 'History Tracking',
                description: 'Save and review all broadcast sessions for future reference.',
                gradient: 'from-purple-400 to-purple-500',
              },
              {
                icon: Users,
                title: 'Team Sharing',
                description: 'Share broadcast results with team members instantly.',
                gradient: 'from-purple-400 to-purple-500',
              },
              {
                icon: Globe,
                title: 'API Integration',
                description: 'Connect broadcasting capabilities to your existing workflows.',
                gradient: 'from-cyan-400 to-blue-500',
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

      {/* SECTION 4: USE CASES */}
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
              Every Use Case
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
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {useCases[activeUseCase as keyof typeof useCases].title}
              </h3>
              <p className="text-gray-300 mb-6">
                {useCases[activeUseCase as keyof typeof useCases].description}
              </p>
              <div className="bg-black/40 border border-white/20 rounded-xl p-6 font-mono text-blue-400">
                "{useCases[activeUseCase as keyof typeof useCases].example}"
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
              Ready to Amplify Your AI Workflow?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Stop switching between AI platforms. Start broadcasting.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                Enable Broadcasting
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                See All Features
              </button>
            </div>

            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>6 AI platforms supported</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Unlimited broadcasts</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Team collaboration</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      </div>
    </main>
  );
}