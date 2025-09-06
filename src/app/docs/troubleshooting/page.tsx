'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, AlertTriangle, CheckCircle, XCircle, 
  Wrench, Zap, Wifi, RefreshCw, Settings, Chrome, 
  ArrowRight, ExternalLink, HelpCircle, MessageSquare
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import Link from 'next/link';

interface TroubleshootingItem {
  id: string;
  title: string;
  problem: string;
  solution: string[];
  category: 'Extension' | 'Performance' | 'Sync' | 'Integration' | 'Account';
  severity: 'low' | 'medium' | 'high';
  icon: React.ComponentType<{ className?: string }>;
}

const troubleshootingData: TroubleshootingItem[] = [
  {
    id: '1',
    title: 'Extension Not Showing Up',
    problem: 'The Promptability extension icon is not visible in my browser toolbar.',
    solution: [
      'Click the puzzle piece icon in Chrome toolbar',
      'Find Promptability AI in the list',
      'Click the pin icon to pin it to toolbar',
      'Refresh any open AI platform tabs',
      'If still not working, try disabling and re-enabling the extension'
    ],
    category: 'Extension',
    severity: 'medium',
    icon: Chrome
  },
  {
    id: '2',
    title: 'Slow Optimization Speed',
    problem: 'Prompts are taking too long to optimize or the interface feels sluggish.',
    solution: [
      'Check your internet connection speed',
      'Clear browser cache and cookies',
      'Disable other extensions temporarily',
      'Restart your browser',
      'Lower optimization quality in settings if needed',
      'Contact support if issue persists'
    ],
    category: 'Performance',
    severity: 'low',
    icon: Zap
  },
  {
    id: '3',
    title: 'Prompts Not Syncing',
    problem: 'My optimized prompts are not syncing between devices or sessions.',
    solution: [
      'Verify you\'re logged into the same account',
      'Check internet connection on both devices',
      'Force sync by clicking Settings > Sync Now',
      'Log out and log back in',
      'Check if sync is enabled in extension settings',
      'Contact support if data appears to be lost'
    ],
    category: 'Sync',
    severity: 'high',
    icon: RefreshCw
  },
  {
    id: '4',
    title: 'ChatGPT Integration Issues',
    problem: 'Promptability is not working on ChatGPT or optimizations are not appearing.',
    solution: [
      'Refresh the ChatGPT page',
      'Make sure you\'re on chat.openai.com',
      'Check if extension permissions include OpenAI domains',
      'Disable other ChatGPT extensions temporarily',
      'Clear ChatGPT site data and refresh',
      'Update to the latest extension version'
    ],
    category: 'Integration',
    severity: 'medium',
    icon: Settings
  },
  {
    id: '5',
    title: 'Account Login Problems',
    problem: 'Cannot log into my Promptability account or getting authentication errors.',
    solution: [
      'Check if caps lock is on',
      'Try resetting your password',
      'Clear browser cookies for promptability.ai',
      'Try logging in with incognito/private mode',
      'Check if your email is verified',
      'Contact support if you suspect account issues'
    ],
    category: 'Account',
    severity: 'high',
    icon: AlertTriangle
  },
  {
    id: '6',
    title: 'Extension Permissions Error',
    problem: 'Getting permission denied errors or extension requests additional permissions.',
    solution: [
      'Go to chrome://extensions in your browser',
      'Find Promptability AI extension',
      'Click "Details"',
      'Enable "Allow on all sites"',
      'Refresh AI platform tabs',
      'Contact support if permissions seem excessive'
    ],
    category: 'Extension',
    severity: 'medium',
    icon: Settings
  }
];

const categories = ['All', 'Extension', 'Performance', 'Sync', 'Integration', 'Account'];

export default function TroubleshootingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const filteredItems = troubleshootingData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.problem.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <XCircle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
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
        
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <Link href="/docs" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Docs</span>
          </Link>
          <div className="text-xl font-bold">Promptability AI</div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          
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
              Troubleshooting Guide
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8"
            >
              Quick solutions for common issues and problems
            </motion.p>

            {/* Quick Diagnostic */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-8"
            >
              <h3 className="text-lg font-semibold text-white mb-4">🔍 Quick Diagnostic</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href="/docs/troubleshooting#extension"
                  className="bg-black/40 border border-white/20 rounded-lg p-4 hover:bg-white/5 hover:border-white/30 transition-all group"
                >
                  <Chrome className="w-6 h-6 text-blue-400 mb-2" />
                  <h4 className="text-white font-medium mb-1 group-hover:text-blue-400 transition-colors">Extension Issues</h4>
                  <p className="text-gray-400 text-xs">Not working, missing, or errors</p>
                </Link>
                
                <Link
                  href="/docs/troubleshooting#performance"
                  className="bg-black/40 border border-white/20 rounded-lg p-4 hover:bg-white/5 hover:border-white/30 transition-all group"
                >
                  <Zap className="w-6 h-6 text-yellow-400 mb-2" />
                  <h4 className="text-white font-medium mb-1 group-hover:text-blue-400 transition-colors">Performance</h4>
                  <p className="text-gray-400 text-xs">Slow, laggy, or unresponsive</p>
                </Link>
                
                <Link
                  href="/docs/troubleshooting#sync"
                  className="bg-black/40 border border-white/20 rounded-lg p-4 hover:bg-white/5 hover:border-white/30 transition-all group"
                >
                  <RefreshCw className="w-6 h-6 text-green-400 mb-2" />
                  <h4 className="text-white font-medium mb-1 group-hover:text-blue-400 transition-colors">Sync Problems</h4>
                  <p className="text-gray-400 text-xs">Data not syncing between devices</p>
                </Link>
              </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
              variants={fadeInUp}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search troubleshooting guides..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
              </div>
            </motion.div>

            {/* Category Filters */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-2"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-white/15 text-white shadow border border-white/20'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {category}
                  {category !== 'All' && (
                    <span className="ml-2 text-xs bg-white/20 rounded-full px-2 py-0.5">
                      {troubleshootingData.filter(item => item.category === category).length}
                    </span>
                  )}
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* Troubleshooting Items */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => {
                const isExpanded = expandedItems.includes(item.id);
                const IconComponent = item.icon;
                
                return (
                  <motion.div
                    key={item.id}
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full p-6 text-left flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                              {item.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(item.severity)}`}>
                              {getSeverityIcon(item.severity)}
                              <span className="ml-1 capitalize">{item.severity}</span>
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {item.problem}
                          </p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-white/10">
                            <div className="pt-6">
                              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <Wrench className="w-4 h-4 text-blue-400" />
                                Solution Steps:
                              </h4>
                              <div className="space-y-3 mb-6">
                                {item.solution.map((step, stepIndex) => (
                                  <div key={stepIndex} className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-xs text-blue-400 font-bold mt-0.5 flex-shrink-0">
                                      {stepIndex + 1}
                                    </div>
                                    <span className="text-gray-300 text-sm leading-relaxed">
                                      {step}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              
                              {/* Action Buttons */}
                              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <div className="flex items-center gap-3">
                                  <span className="text-sm text-gray-400">Was this helpful?</span>
                                  <div className="flex items-center gap-2">
                                    <button className="p-2 bg-white/5 rounded-lg hover:bg-green-500/20 hover:text-green-400 transition-all">
                                      <CheckCircle className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 bg-white/5 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all">
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                                
                                <Link
                                  href="/support"
                                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                  <MessageSquare className="w-4 h-4" />
                                  Still need help?
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-6">
                <Wrench className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-white mb-2">No solutions found</h3>
                <p className="text-sm">Try different keywords or browse all categories</p>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="bg-white/10 border border-white/20 text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  Clear filters
                </button>
                <Link
                  href="/support"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Contact Support
                </Link>
              </div>
            </motion.div>
          )}

          {/* Emergency Support */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Critical Issue?
                </h3>
                <p className="text-gray-300 mb-4">
                  If you're experiencing a critical issue that's blocking your work, our priority support team can help immediately.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/support/priority"
                    className="bg-red-500/20 border border-red-500/30 text-red-400 font-semibold py-2 px-4 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                  >
                    Priority Support
                  </Link>
                  <a
                    href="https://status.promptability.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 border border-white/20 text-white font-semibold py-2 px-4 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                  >
                    Check System Status
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Resources */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <Link
              href="/docs/getting-started"
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group text-center"
            >
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">Getting Started</h4>
              <p className="text-gray-400 text-sm">New to Promptability? Start here</p>
            </Link>

            <Link
              href="/community"
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group text-center"
            >
              <MessageSquare className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">Community Help</h4>
              <p className="text-gray-400 text-sm">Get help from other users</p>
            </Link>

            <Link
              href="/docs/videos"
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group text-center"
            >
              <Wrench className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">Video Guides</h4>
              <p className="text-gray-400 text-sm">Visual troubleshooting tutorials</p>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}