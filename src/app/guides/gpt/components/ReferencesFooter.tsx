'use client';

import { motion } from 'framer-motion';
import { 
  Download, 
  BookOpen, 
  ExternalLink, 
  Mail, 
  Twitter, 
  Linkedin, 
  Share2,
  ArrowRight,
  Star,
  Users,
  FileText
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const references = [
  {
    title: 'OpenAI Official Documentation',
    description: 'Complete API reference and best practices directly from OpenAI',
    url: 'https://platform.openai.com/docs',
    type: 'Official',
    keyTakeaway: 'Authoritative source for technical specifications and parameter details'
  },
  {
    title: 'Prompt Engineering Guide by DAIR.AI',
    description: 'Comprehensive academic approach to prompt engineering techniques',
    url: 'https://www.promptingguide.ai',
    type: 'Academic',
    keyTakeaway: 'Research-backed strategies and systematic approaches to prompting'
  },
  {
    title: 'OpenAI Cookbook',
    description: 'Practical examples and code snippets for real-world applications',
    url: 'https://cookbook.openai.com',
    type: 'Practical',
    keyTakeaway: 'Ready-to-use code examples and implementation patterns'
  },
  {
    title: 'Anthropic Prompt Engineering',
    description: 'Cross-platform insights and comparative techniques',
    url: 'https://docs.anthropic.com/claude/docs/prompt-engineering',
    type: 'Comparative',
    keyTakeaway: 'Understanding differences between AI models and when to use each'
  }
];

const relatedGuides = [
  { 
    title: 'Master Google Gemini Prompts', 
    url: '/guides/gemini', 
    status: 'Available',
    description: 'Learn Gemini-specific techniques and multimodal capabilities'
  },
  { 
    title: 'Claude AI Complete Guide', 
    url: '/guides/claude', 
    status: 'Coming Soon',
    description: 'Advanced prompting for Anthropic\'s constitutional AI'
  },
  { 
    title: 'Prompt Engineering Fundamentals', 
    url: '/guides/fundamentals', 
    status: 'Coming Soon',
    description: 'Universal principles that work across all AI models'
  }
];

export default function ReferencesFooter() {
  return (
    <section id="references" className="py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* References Section */}
          <motion.div
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Best References & Resources
            </h2>
            <p className="text-gray-400 text-lg text-center mb-12">
              Continue learning with these curated resources from experts and practitioners.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {references.map((reference, index) => (
                <motion.div
                  key={reference.title}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-white/80" />
                      <div>
                        <h3 className="text-white font-semibold">{reference.title}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-400">
                          {reference.type}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {reference.description}
                  </p>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
                    <div className="text-blue-400 text-sm font-semibold mb-1">Key Takeaway:</div>
                    <div className="text-blue-300 text-sm">{reference.keyTakeaway}</div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg border border-white/20 transition-colors flex items-center justify-center gap-2">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg border border-white/20 transition-colors">
                      <Star className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Download CTA */}
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Master GPT Prompting Today
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Download the complete guide with all examples, templates, checklists, and advanced techniques for offline reference.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-black font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-2"
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
                  Email Course (7 Days)
                </motion.button>
              </div>

              {/* Stats */}
              <div className="flex justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>12k+ downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>4.9/5 rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>85 pages</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Related Guides */}
          <motion.div
            variants={fadeInUp}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">More AI Guides</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedGuides.map((guide, index) => (
                <motion.div
                  key={guide.title}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-5 h-5 text-white/80" />
                    <div>
                      <h4 className="text-white font-semibold text-sm">{guide.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        guide.status === 'Available' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {guide.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">
                    {guide.description}
                  </p>
                  
                  <button 
                    className={`w-full font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      guide.status === 'Available'
                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                        : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
                    }`}
                    disabled={guide.status !== 'Available'}
                  >
                    {guide.status === 'Available' ? (
                      <>
                        Read Guide
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      'Notify Me'
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter & Community */}
          <motion.div
            variants={fadeInUp}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            {/* Newsletter */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-6 text-sm">
                Get weekly AI prompting tips, new guides, and platform updates delivered to your inbox.
              </p>
              
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button className="bg-white text-black font-semibold px-4 py-2 rounded-lg hover:bg-white/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Community */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Join Community</h3>
              <p className="text-gray-400 mb-6 text-sm">
                Connect with other prompt engineers, share techniques, and get help with your projects.
              </p>
              
              <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg border border-white/20 transition-colors flex items-center justify-center gap-2">
                <Users className="w-4 h-4" />
                Join Discord Community
              </button>
            </div>
          </motion.div>

          {/* Social Share */}
          <motion.div
            variants={fadeInUp}
            className="text-center"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Share This Guide</h3>
            <div className="flex justify-center gap-4">
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 text-white/80" />
              </button>
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4 text-white/80" />
              </button>
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 flex items-center justify-center transition-colors">
                <Share2 className="w-4 h-4 text-white/80" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}