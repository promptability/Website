'use client';

import { motion } from 'framer-motion';
import { 
  Download, 
  BookOpen, 
  Mail, 
  Twitter, 
  Linkedin, 
  Share2,
  ArrowRight
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function GuideFooter() {
  const relatedGuides = [
    { title: 'Master ChatGPT Prompts', url: '/guides/chatgpt', status: 'Available' },
    { title: 'Claude AI Complete Guide', url: '/guides/claude', status: 'Coming Soon' },
    { title: 'Prompt Engineering Fundamentals', url: '/guides/fundamentals', status: 'Coming Soon' }
  ];

  return (
    <section id="download" className="py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Main CTA */}
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Take This Guide With You
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Download the complete PDF guide with all examples, templates, and checklists for offline reference.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                  Email Me Updates
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Related Guides */}
          <motion.div
            variants={fadeInUp}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Related Guides</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedGuides.map((guide, index) => (
                <motion.div
                  key={guide.title}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-5 h-5 text-white/80" />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{guide.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        guide.status === 'Available' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {guide.status}
                      </span>
                    </div>
                  </div>
                  
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

          {/* Newsletter Signup */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center mb-12"
          >
            <h3 className="text-xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">
              Get notified when we publish new guides and AI platform updates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button className="bg-white text-black font-semibold px-6 py-2 rounded-lg hover:bg-white/90 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>

          {/* Share */}
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