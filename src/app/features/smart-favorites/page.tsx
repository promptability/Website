'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Bookmark, Heart, Zap, ChevronRight, Check, 
  Sparkles, Search, Filter, Clock, TrendingUp, 
  Folder, Tag, Copy, Settings, Grid, List
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function SmartFavoritesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Templates', count: 156 },
    { id: 'development', name: 'Development', count: 42 },
    { id: 'writing', name: 'Writing', count: 38 },
    { id: 'analysis', name: 'Analysis', count: 27 },
    { id: 'creative', name: 'Creative', count: 31 },
    { id: 'business', name: 'Business', count: 18 }
  ];

  const favoriteTemplates = [
    {
      id: '1',
      title: 'Code Review Assistant',
      description: 'Comprehensive code review with security, performance, and best practices analysis',
      category: 'development',
      uses: 234,
      lastUsed: '2 hours ago',
      tags: ['typescript', 'review', 'quality'],
      prompt: 'Review this code for: 1) Security vulnerabilities, 2) Performance issues, 3) Code style and best practices, 4) Potential bugs. Provide specific line numbers and improvement suggestions.'
    },
    {
      id: '2',
      title: 'Blog Post Optimizer',
      description: 'Transform ideas into SEO-optimized, engaging blog posts',
      category: 'writing',
      uses: 189,
      lastUsed: '1 day ago',
      tags: ['seo', 'content', 'marketing'],
      prompt: 'Create an SEO-optimized blog post about [TOPIC]. Include: engaging intro, structured headings, keyword optimization for [KEYWORDS], meta description, and call-to-action.'
    },
    {
      id: '3',
      title: 'Data Analysis Framework',
      description: 'Statistical analysis with visualizations and insights',
      category: 'analysis',
      uses: 156,
      lastUsed: '3 days ago',
      tags: ['data', 'statistics', 'insights'],
      prompt: 'Analyze this dataset: provide statistical summary, identify patterns, create visualization recommendations, highlight anomalies, and suggest actionable insights.'
    }
  ];

  const handleCopy = (id: string, prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredTemplates = favoriteTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              <Star className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400">Smart Template Library</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              Favorites
              <span className="block bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
                Instructions
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Save and organize your most effective prompts. Access them instantly across all your projects.
            </p>

            {/* Interactive Demo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-5xl mx-auto mb-12"
            >
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <div className="grid lg:grid-cols-3 gap-6">
                  {[
                    { icon: '⚡', title: 'Quick Access', desc: 'One-click to use any template' },
                    { icon: '🎯', title: 'Smart Organization', desc: 'Auto-categorized and tagged' },
                    { icon: '📈', title: 'Usage Analytics', desc: 'Track your most effective prompts' }
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-4xl mb-3">{feature.icon}</div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="bg-gradient-to-r from-purple-500 to-purple-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                Start Organizing
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                Browse Templates
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TEMPLATE LIBRARY */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Your Template
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Library
            </span>
          </motion.h2>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                      : 'bg-white/10 text-gray-400 border border-white/20'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === 'list' 
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                      : 'bg-white/10 text-gray-400 border border-white/20'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-purple-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid/List */}
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredTemplates.map((template, i) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 ${
                  viewMode === 'list' ? 'flex items-center gap-6' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold">{template.title}</h3>
                    <Star className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-gray-400 mb-4">{template.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {template.uses} uses
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {template.lastUsed}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(template.id, template.prompt)}
                      className="flex items-center gap-1 text-purple-400 hover:text-purple-300"
                    >
                      {copiedId === template.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Smart
            <span className="block bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              Features
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Bookmark className="w-8 h-8" />,
                title: 'One-Click Save',
                description: 'Save any prompt as a favorite instantly while working'
              },
              {
                icon: <Folder className="w-8 h-8" />,
                title: 'Smart Collections',
                description: 'Organize templates into collections for different projects'
              },
              {
                icon: <Tag className="w-8 h-8" />,
                title: 'Auto-Tagging',
                description: 'AI automatically tags and categorizes your templates'
              },
              {
                icon: <Search className="w-8 h-8" />,
                title: 'Instant Search',
                description: 'Find any template instantly with smart search'
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Usage Analytics',
                description: 'Track which templates get the best results'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Quick Actions',
                description: 'Use, edit, or share templates with keyboard shortcuts'
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
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
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
              { value: '5x', label: 'Faster Prompting' },
              { value: '1000+', label: 'Templates Saved' },
              { value: '89%', label: 'Time Saved' },
              { value: '24/7', label: 'Instant Access' }
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
              Start Building Your Library
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Save hours every week with organized prompt templates
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-gradient-to-r from-purple-500 to-purple-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                Get Started Free
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                View Templates
              </button>
            </div>

            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Unlimited templates</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Smart organization</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Sync across devices</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      </div>
    </main>
  );
}