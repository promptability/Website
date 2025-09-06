'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Check, Play, Download, Chrome, Settings, 
  Zap, ArrowRight, Clock, Star, Copy, CheckCircle,
  Monitor, Smartphone, Tablet, ExternalLink, X, FileText, BookOpen, Code
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import Link from 'next/link';

export default function GettingStartedPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copiedCode, setCopiedCode] = useState('');

  const steps = [
    {
      id: 1,
      title: 'Install the Chrome Extension',
      time: '2 min',
      description: 'Get the Promptability extension from the Chrome Web Store',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            The Chrome extension is the fastest way to start optimizing your AI prompts across all platforms.
          </p>
          <div className="bg-black/40 border border-white/20 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-3">Installation Steps:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-xs text-blue-400 font-bold">1</div>
                <span className="text-gray-300">Visit the Chrome Web Store</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-xs text-blue-400 font-bold">2</div>
                <span className="text-gray-300">Click "Add to Chrome"</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-xs text-blue-400 font-bold">3</div>
                <span className="text-gray-300">Pin the extension to your toolbar</span>
              </div>
            </div>
          </div>
          <Link
            href="/chrome-extension"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            <Chrome className="w-5 h-5" />
            Install Extension
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      )
    },
    {
      id: 2,
      title: 'Create Your Account',
      time: '1 min',
      description: 'Sign up for free to sync your optimizations across devices',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Create a free account to save your optimized prompts and access advanced features.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-black/40 border border-white/20 rounded-xl p-4 text-center">
              <Monitor className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h4 className="text-white font-medium mb-1">Desktop</h4>
              <p className="text-gray-400 text-xs">Full feature access</p>
            </div>
            <div className="bg-black/40 border border-white/20 rounded-xl p-4 text-center">
              <Smartphone className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h4 className="text-white font-medium mb-1">Mobile</h4>
              <p className="text-gray-400 text-xs">On-the-go optimization</p>
            </div>
            <div className="bg-black/40 border border-white/20 rounded-xl p-4 text-center">
              <Tablet className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h4 className="text-white font-medium mb-1">Tablet</h4>
              <p className="text-gray-400 text-xs">Seamless sync</p>
            </div>
          </div>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )
    },
    {
      id: 3,
      title: 'Your First Optimization',
      time: '3 min',
      description: 'Learn how to optimize your first prompt with our AI',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Let's optimize your first prompt! Here's a simple example to get you started.
          </p>
          
          <div className="space-y-4">
            <div className="bg-black/40 border border-red-500/30 rounded-xl p-4">
              <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <X className="w-4 h-4" />
                Before (Generic)
              </h4>
              <div className="bg-black/60 rounded-lg p-3 font-mono text-sm text-gray-300">
                "Write me an email"
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </div>
            </div>

            <div className="bg-black/40 border border-green-500/30 rounded-xl p-4">
              <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                After (Optimized)
              </h4>
              <div className="bg-black/60 rounded-lg p-3 font-mono text-sm text-gray-300 relative">
                "Write a professional follow-up email to a client regarding project timeline delays. Include an apology, revised timeline, and proactive solutions. Tone: apologetic but confident. Length: 150-200 words."
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("Write a professional follow-up email to a client regarding project timeline delays. Include an apology, revised timeline, and proactive solutions. Tone: apologetic but confident. Length: 150-200 words.");
                    setCopiedCode('example');
                    setTimeout(() => setCopiedCode(''), 2000);
                  }}
                  className="absolute top-2 right-2 p-1 bg-white/10 rounded hover:bg-white/20 transition-colors"
                >
                  {copiedCode === 'example' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <h4 className="text-blue-400 font-semibold mb-2">💡 Pro Tip</h4>
            <p className="text-gray-300 text-sm">
              The more specific you are about context, tone, and desired outcome, the better your results will be!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: 'Explore Key Features',
      time: '5 min',
      description: 'Discover the most powerful features to boost your productivity',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Now that you're set up, explore these game-changing features:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/features/auto-optimize"
              className="bg-black/40 border border-white/20 rounded-xl p-4 hover:bg-white/5 hover:border-white/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h4 className="text-white font-semibold group-hover:text-blue-400 transition-colors">Auto-Optimize</h4>
              </div>
              <p className="text-gray-400 text-sm">AI automatically improves your prompts in real-time</p>
            </Link>

            <Link
              href="/features/multi-ai-broadcasting"
              className="bg-black/40 border border-white/20 rounded-xl p-4 hover:bg-white/5 hover:border-white/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <Settings className="w-6 h-6 text-blue-400" />
                <h4 className="text-white font-semibold group-hover:text-blue-400 transition-colors">Multi-AI Broadcasting</h4>
              </div>
              <p className="text-gray-400 text-sm">Send prompts to multiple AI platforms simultaneously</p>
            </Link>

            <Link
              href="/features/learns-your-style"
              className="bg-black/40 border border-white/20 rounded-xl p-4 hover:bg-white/5 hover:border-white/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-6 h-6 text-purple-400" />
                <h4 className="text-white font-semibold group-hover:text-blue-400 transition-colors">Learns Your Style</h4>
              </div>
              <p className="text-gray-400 text-sm">AI adapts to your unique writing preferences</p>
            </Link>

            <Link
              href="/features/project-memory"
              className="bg-black/40 border border-white/20 rounded-xl p-4 hover:bg-white/5 hover:border-white/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-6 h-6 text-green-400" />
                <h4 className="text-white font-semibold group-hover:text-blue-400 transition-colors">Project Memory</h4>
              </div>
              <p className="text-gray-400 text-sm">Maintains context across different projects</p>
            </Link>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: 'Next Steps',
      time: '2 min',
      description: 'Continue your journey with advanced tutorials and community',
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
              <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Video Tutorials
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                Visual learning with step-by-step video guides covering all features.
              </p>
              <Link
                href="/docs/videos"
                className="text-blue-400 hover:text-blue-300 text-sm underline"
              >
                Browse Videos →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
              <h4 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Join the Community
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                Connect with other users, share prompts, and get expert tips.
              </p>
              <Link
                href="/community"
                className="text-purple-400 hover:text-purple-300 text-sm underline"
              >
                Join Community →
              </Link>
            </div>
          </div>

          <div className="bg-black/40 border border-white/20 rounded-xl p-6 text-center">
            <h4 className="text-white font-semibold mb-3">🎉 Congratulations!</h4>
            <p className="text-gray-300 mb-4">
              You're now ready to transform your AI interactions with Promptability.
            </p>
            <Link
              href="/account"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Go to Account
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )
    }
  ];

  const toggleStep = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const progress = (completedSteps.length / steps.length) * 100;
  const totalTime = steps.reduce((sum, step) => sum + parseInt(step.time), 0);

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
        
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <Link href="/docs" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Docs</span>
          </Link>
          <div className="text-xl font-bold">Promptability AI</div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          
          {/* Page Header */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center mb-12"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              Getting Started Guide
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-6"
            >
              Master Promptability AI in just {totalTime} minutes
            </motion.p>

            {/* Progress Bar */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm text-blue-400">{completedSteps.length}/{steps.length} completed</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Start</span>
                <span className={progress >= 50 ? 'text-blue-400' : ''}>Halfway</span>
                <span className={progress === 100 ? 'text-green-400' : ''}>Complete</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              
              return (
                <motion.div
                  key={step.id}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white/5 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isCompleted ? 'border-green-500/30 bg-green-500/5' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Step Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-bold transition-all ${
                          isCompleted 
                            ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                            : 'bg-white/10 border-white/30 text-white'
                        }`}>
                          {isCompleted ? <Check className="w-6 h-6" /> : step.id}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                          <p className="text-gray-400 text-sm">{step.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          {step.time}
                        </div>
                        <button
                          onClick={() => toggleStep(step.id)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            isCompleted
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                          }`}
                        >
                          {isCompleted ? 'Completed' : 'Mark Complete'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="p-6">
                    {step.content}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Completion CTA */}
          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                🎉 Setup Complete!
              </h3>
              <p className="text-gray-300 mb-6">
                You're now ready to supercharge your AI interactions. Explore advanced features or dive into our comprehensive guides.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/account"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Go to Account
                </Link>
                <Link
                  href="/docs/guides"
                  className="bg-white/10 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  Explore Guides
                </Link>
              </div>
            </motion.div>
          )}

          {/* Next Steps */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mt-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">What's Next?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/docs/guides"
                className="bg-black/40 border border-white/20 rounded-xl p-4 hover:bg-white/5 hover:border-white/30 transition-all duration-300 group text-center"
              >
                <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">User Guides</h4>
                <p className="text-gray-400 text-sm">Detailed tutorials for every feature</p>
              </Link>

              <Link
                href="/docs/videos"
                className="bg-black/40 border border-white/20 rounded-xl p-4 hover:bg-white/5 hover:border-white/30 transition-all duration-300 group text-center"
              >
                <Play className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">Video Tutorials</h4>
                <p className="text-gray-400 text-sm">Learn visually with our video library</p>
              </Link>

              <Link
                href="/docs/api"
                className="bg-black/40 border border-white/20 rounded-xl p-4 hover:bg-white/5 hover:border-white/30 transition-all duration-300 group text-center"
              >
                <Code className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">API Docs</h4>
                <p className="text-gray-400 text-sm">Integrate with your applications</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}