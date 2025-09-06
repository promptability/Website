'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  FileText, 
  Users, 
  Mail, 
  Download,
  Star,
  Github,
  Twitter,
  Share2,
  Award,
  TrendingUp,
  Clock,
  Filter
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const officialResources = [
  {
    title: 'Anthropic Claude Documentation',
    description: 'Official documentation covering API usage, model capabilities, and safety guidelines',
    url: 'https://docs.anthropic.com/claude',
    type: 'Official',
    difficulty: 'Beginner',
    keyTakeaway: 'Authoritative source for Claude capabilities and Constitutional AI principles',
    topics: ['API Reference', 'Safety Guidelines', 'Model Comparison']
  },
  {
    title: 'Constitutional AI Research Papers',
    description: 'Academic papers explaining the theoretical foundation of Claude&apos;s training',
    url: 'https://www.anthropic.com/research',
    type: 'Research',
    difficulty: 'Expert',
    keyTakeaway: 'Deep understanding of Constitutional AI methodology and safety alignment',
    topics: ['Constitutional Training', 'AI Safety', 'Alignment Research']
  },
  {
    title: 'Claude API Cookbook',
    description: 'Practical examples and implementation patterns for developers',
    url: 'https://github.com/anthropics/anthropic-cookbook',
    type: 'Practical',
    difficulty: 'Intermediate',
    keyTakeaway: 'Ready-to-use code examples and best practices for integration',
    topics: ['Code Examples', 'Integration Patterns', 'Use Cases']
  },
  {
    title: 'Prompt Engineering with Claude',
    description: 'Comprehensive guide to effective prompting techniques for Claude models',
    url: 'https://docs.anthropic.com/claude/docs/prompt-engineering',
    type: 'Guide',
    difficulty: 'Intermediate',
    keyTakeaway: 'Claude-specific prompting strategies and optimization techniques',
    topics: ['Prompt Design', 'XML Formatting', 'Context Management']
  }
];

const communityResources = [
  {
    title: 'Claude Prompting Techniques',
    description: 'Community-discovered advanced techniques and hidden capabilities',
    source: 'Reddit r/ClaudeAI',
    votes: 847,
    difficulty: 'Advanced',
    type: 'Community'
  },
  {
    title: 'Constitutional AI Discussions',
    description: 'Deep dives into Claude&apos;s ethical reasoning and safety mechanisms',
    source: 'LessWrong',
    votes: 423,
    difficulty: 'Expert',
    type: 'Discussion'
  },
  {
    title: 'Claude vs GPT Comparison Studies',
    description: 'User-conducted comparative analysis of different AI models',
    source: 'AI Research Community',
    votes: 612,
    difficulty: 'Intermediate',
    type: 'Analysis'
  }
];

const practicalGuides = [
  {
    title: '200K Context Window Mastery',
    author: 'Promptability AI',
    downloadCount: '2.3k',
    rating: 4.8,
    description: 'Complete guide to leveraging Claude&apos;s massive context window effectively'
  },
  {
    title: 'Claude Safety Boundaries Guide',
    author: 'AI Safety Collective',
    downloadCount: '1.8k',
    rating: 4.9,
    description: 'Understanding and working within Claude&apos;s Constitutional AI framework'
  },
  {
    title: 'XML Prompt Formatting Handbook',
    author: 'Advanced Prompting',
    downloadCount: '3.1k',
    rating: 4.7,
    description: 'Master structured prompting with XML tags for better Claude responses'
  }
];

export default function ResourcesHub() {
  const [selectedTab, setSelectedTab] = useState('official');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'Advanced': return 'bg-orange-500/20 text-orange-400';
      case 'Expert': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredOfficialResources = officialResources.filter(resource =>
    filterDifficulty === 'all' || resource.difficulty === filterDifficulty
  );

  return (
    <section id="resources" className="py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-white mb-4 text-center"
          >
            Resources Hub
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-400 text-lg text-center mb-12"
          >
            Curated resources to deepen your Claude expertise and stay updated with latest developments.
          </motion.p>

          {/* Tab Navigation */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center gap-2 mb-8"
          >
            {[
              { id: 'official', label: 'Official Docs', icon: FileText },
              { id: 'community', label: 'Community', icon: Users },
              { id: 'guides', label: 'Practical Guides', icon: BookOpen }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedTab(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTab === id
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </motion.div>

          {/* Filter */}
          {selectedTab === 'official' && (
            <motion.div
              variants={fadeInUp}
              className="flex justify-center mb-6"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {selectedTab === 'official' && (
              <motion.div
                key="official"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {filteredOfficialResources.map((resource, index) => (
                  <motion.div
                    key={resource.title}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-white/80" />
                        <div>
                          <h3 className="text-white font-semibold">{resource.title}</h3>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-400">
                              {resource.type}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(resource.difficulty)}`}>
                              {resource.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {resource.description}
                    </p>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
                      <div className="text-blue-400 text-sm font-semibold mb-1">Key Takeaway:</div>
                      <div className="text-blue-300 text-sm">{resource.keyTakeaway}</div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.topics.map((topic, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-white/10 text-gray-400 rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg border border-white/20 transition-colors flex items-center justify-center gap-2">
                        Read More
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg border border-white/20 transition-colors">
                        <Star className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {selectedTab === 'community' && (
              <motion.div
                key="community"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {communityResources.map((resource, index) => (
                  <motion.div
                    key={resource.title}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4 text-white/80" />
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-400">
                        {resource.type}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(resource.difficulty)}`}>
                        {resource.difficulty}
                      </span>
                    </div>
                    
                    <h3 className="text-white font-semibold mb-2">{resource.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{resource.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{resource.source}</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        <span className="text-green-400">{resource.votes}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {selectedTab === 'guides' && (
              <motion.div
                key="guides"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {practicalGuides.map((guide, index) => (
                  <motion.div
                    key={guide.title}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-yellow-400" />
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400 text-sm">{guide.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-white font-semibold mb-2">{guide.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{guide.description}</p>
                    
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-gray-400">by {guide.author}</span>
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-400">{guide.downloadCount}</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg border border-white/20 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Guide
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Newsletter & Community */}
          <motion.div
            variants={fadeInUp}
            className="grid md:grid-cols-2 gap-8 mt-16 mb-12"
          >
            {/* Newsletter */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Claude Updates</h3>
              <p className="text-gray-400 mb-6 text-sm">
                Get notified about new Claude features, research breakthroughs, and prompting techniques.
              </p>
              
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Community */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Join Community</h3>
              <p className="text-gray-400 mb-6 text-sm">
                Connect with Claude users, share prompts, and learn advanced techniques from experts.
              </p>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg border border-white/20 transition-colors flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" />
                  Discord
                </button>
                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg border border-white/20 transition-colors flex items-center justify-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </button>
              </div>
            </div>
          </motion.div>

          {/* Download CTA */}
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Master Claude Today
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Download the complete Claude 3 mastery guide with examples, safety guidelines, and advanced techniques.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Complete Guide (PDF)
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-lg border border-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Email Course (5 Days)
                </motion.button>
              </div>

              {/* Stats */}
              <div className="flex justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>8k+ downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>4.9/5 rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Updated weekly</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Share */}
          <motion.div
            variants={fadeInUp}
            className="text-center"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Share This Guide</h3>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => handleCopy(window.location.href)}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 flex items-center justify-center transition-colors"
              >
                <Share2 className="w-4 h-4 text-white/80" />
              </button>
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 text-white/80" />
              </button>
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 flex items-center justify-center transition-colors">
                <Github className="w-4 h-4 text-white/80" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Copy Notification */}
      <AnimatePresence>
        {copiedText && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}