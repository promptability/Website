'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, BookOpen, Play, Wrench, Code, HelpCircle, 
  FileText, Zap, ArrowRight, Clock, Users, Shield,
  Keyboard, ExternalLink, Star, TrendingUp
} from 'lucide-react';
import { fadeInUp, staggerContainer, cardTilt } from '@/lib/animations';
import Link from 'next/link';

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const quickLinks = [
    { href: '/docs/getting-started', label: 'Getting Started', icon: <Zap className="w-4 h-4" /> },
    { href: '/docs/faq', label: 'FAQs', icon: <HelpCircle className="w-4 h-4" /> },
    { href: '/docs/api', label: 'API Docs', icon: <Code className="w-4 h-4" /> },
    { href: '/docs/videos', label: 'Video Tutorials', icon: <Play className="w-4 h-4" /> }
  ];

  const docCategories = [
    {
      title: 'Getting Started',
      description: 'Everything you need to begin your AI optimization journey',
      icon: <Zap className="w-8 h-8" />,
      href: '/docs/getting-started',
      gradient: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30',
      articles: [
        'Installation Guide',
        'Your First Prompt',
        'Basic Features',
        'Quick Wins'
      ]
    },
    {
      title: 'User Guides',
      description: 'Comprehensive tutorials and best practices for power users',
      icon: <BookOpen className="w-8 h-8" />,
      href: '/docs/guides',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      articles: [
        'Feature Tutorials',
        'Best Practices',
        'Advanced Techniques',
        'Workflows'
      ]
    },
    {
      title: 'Troubleshooting',
      description: 'Solutions for common issues and error messages',
      icon: <Wrench className="w-8 h-8" />,
      href: '/docs/troubleshooting',
      gradient: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30',
      articles: [
        'Common Issues',
        'Error Messages',
        'Performance Tips',
        'Bug Fixes'
      ]
    },
    {
      title: 'API Documentation',
      description: 'Complete reference for developers and integrations',
      icon: <Code className="w-8 h-8" />,
      href: '/docs/api',
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      articles: [
        'Authentication',
        'Endpoints',
        'Examples',
        'Rate Limits'
      ]
    },
    {
      title: 'Video Tutorials',
      description: 'Visual learning with step-by-step video guides',
      icon: <Play className="w-8 h-8" />,
      href: '/docs/videos',
      gradient: 'from-indigo-500/20 to-purple-500/20',
      borderColor: 'border-indigo-500/30',
      articles: [
        'Quick Starts',
        'Feature Demos',
        'Tips & Tricks',
        'Webinars'
      ]
    },
    {
      title: 'Reference',
      description: 'Quick reference guides and technical specifications',
      icon: <FileText className="w-8 h-8" />,
      href: '/docs/reference',
      gradient: 'from-gray-500/20 to-slate-500/20',
      borderColor: 'border-gray-500/30',
      articles: [
        'Keyboard Shortcuts',
        'Glossary',
        'System Requirements',
        'Release Notes'
      ]
    }
  ];

  const popularArticles = [
    { title: 'How to Write Better Prompts', views: '12.5k', href: '/docs/guides/better-prompts' },
    { title: 'Setting Up Auto-Optimize', views: '8.2k', href: '/docs/getting-started/auto-optimize' },
    { title: 'Team Collaboration Guide', views: '6.1k', href: '/docs/guides/team-collaboration' },
    { title: 'API Quick Start', views: '4.8k', href: '/docs/api/quickstart' }
  ];

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
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-8"
            >
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-6xl font-bold text-white"
              >
                Documentation &
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Help Center
                </span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-300 max-w-2xl mx-auto"
              >
                Everything you need to master Promptability AI and optimize your workflow
              </motion.p>

              {/* Search Bar */}
              <motion.div 
                variants={fadeInUp}
                className="max-w-2xl mx-auto"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search docs, guides, or FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl pl-14 pr-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-lg"
                  />
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-wrap justify-center gap-3"
              >
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                Popular Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularArticles.map((article, index) => (
                  <Link
                    key={index}
                    href={article.href}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{article.views} views</span>
                      <ArrowRight className="w-3 h-3 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Categories */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {docCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={cardTilt}
                  initial="initial"
                  whileHover="hover"
                  className="group"
                >
                  <Link
                    href={category.href}
                    className={`block bg-white/5 backdrop-blur-xl border ${category.borderColor} rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 h-full`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.gradient} border ${category.borderColor} flex items-center justify-center text-white`}>
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {category.articles.map((article, articleIndex) => (
                        <div key={articleIndex} className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          <div className="w-1 h-1 bg-gray-500 rounded-full" />
                          {article}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                      <span className="text-xs text-gray-400">{category.articles.length} articles</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl font-bold text-white mb-4"
              >
                Still Need Help?
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-gray-300 mb-8"
              >
                Can't find what you're looking for? Our team is here to help.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="grid md:grid-cols-3 gap-6"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
                  <p className="text-gray-400 text-sm mb-4">Join thousands of users sharing tips and solutions</p>
                  <Link href="/community" className="text-blue-400 hover:text-blue-300 text-sm underline">
                    Join Community
                  </Link>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
                  <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Support</h3>
                  <p className="text-gray-400 text-sm mb-4">Get help from our expert support team</p>
                  <Link href="/support" className="text-blue-400 hover:text-blue-300 text-sm underline">
                    Contact Support
                  </Link>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Feedback</h3>
                  <p className="text-gray-400 text-sm mb-4">Help us improve by sharing your thoughts</p>
                  <Link href="/feedback" className="text-blue-400 hover:text-blue-300 text-sm underline">
                    Give Feedback
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Quick Access */}
        <section className="py-12 px-4 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <motion.div variants={fadeInUp}>
                <Link
                  href="/docs/shortcuts"
                  className="block bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <Keyboard className="w-6 h-6 text-blue-400 mb-3" />
                  <h3 className="text-white font-semibold mb-1">Shortcuts</h3>
                  <p className="text-gray-400 text-sm">Master keyboard shortcuts</p>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors mt-2" />
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Link
                  href="/docs/changelog"
                  className="block bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <Clock className="w-6 h-6 text-green-400 mb-3" />
                  <h3 className="text-white font-semibold mb-1">Changelog</h3>
                  <p className="text-gray-400 text-sm">Latest updates & features</p>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors mt-2" />
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Link
                  href="/docs/glossary"
                  className="block bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <FileText className="w-6 h-6 text-purple-400 mb-3" />
                  <h3 className="text-white font-semibold mb-1">Glossary</h3>
                  <p className="text-gray-400 text-sm">AI & prompt terminology</p>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors mt-2" />
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <a
                  href="https://status.promptability.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm font-medium">All systems operational</span>
                  </div>
                  <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                    System Status
                    <ExternalLink className="w-3 h-3" />
                  </h3>
                  <p className="text-gray-400 text-sm">Check service status</p>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}