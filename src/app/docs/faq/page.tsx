'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, ChevronDown, HelpCircle, DollarSign, 
  Settings, Users, Shield, ThumbsUp, ThumbsDown, MessageSquare
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import Link from 'next/link';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Technical' | 'Billing' | 'Features' | 'Privacy';
  icon: React.ComponentType<{ className?: string }>;
  helpful?: number;
  views?: number;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'What is Promptability AI?',
    answer: 'Promptability AI is an intelligent assistant that automatically optimizes your prompts for better AI interactions. It works across 30+ AI platforms including ChatGPT, Claude, Gemini, and more, helping you get better results with less effort.',
    category: 'General',
    icon: HelpCircle,
    helpful: 245,
    views: 1820
  },
  {
    id: '2',
    question: 'Is there a free plan available?',
    answer: 'Yes! Our Free plan includes 10 prompts per day, basic optimization, Chrome extension access, and community support. It\'s perfect for trying out Promptability AI with no commitment required.',
    category: 'Billing',
    icon: DollarSign,
    helpful: 198,
    views: 1456
  },
  {
    id: '3',
    question: 'Which AI platforms do you support?',
    answer: 'We support 30+ AI platforms including ChatGPT, Claude, Google Gemini, Perplexity, GitHub Copilot, Midjourney, and many more. Our Multi-AI Broadcasting feature lets you send optimized prompts to multiple platforms simultaneously.',
    category: 'Technical',
    icon: Settings,
    helpful: 167,
    views: 1203
  },
  {
    id: '4',
    question: 'How does the AI learn my writing style?',
    answer: 'Our AI analyzes patterns in your prompts, preferred language, tone, and successful outcomes. Over time, it adapts to match your unique style while maintaining effectiveness. You can also manually adjust preferences in your settings.',
    category: 'Features',
    icon: Settings,
    helpful: 189,
    views: 987
  },
  {
    id: '5',
    question: 'Is my data secure and private?',
    answer: 'Absolutely. We use 256-bit encryption, are SOC 2 compliant, and follow GDPR guidelines. Your prompts and data are never used to train other models or shared with third parties. You can delete your data at any time.',
    category: 'Privacy',
    icon: Shield,
    helpful: 234,
    views: 1678
  },
  {
    id: '6',
    question: 'Can I use Promptability with my team?',
    answer: 'Yes! Our Team and Pro plans include collaboration features like shared prompt libraries, team analytics, role-based permissions, and centralized billing. Perfect for agencies, startups, and enterprises.',
    category: 'Features',
    icon: Users,
    helpful: 156,
    views: 823
  },
  {
    id: '7',
    question: 'What browsers are supported?',
    answer: 'Currently, we support Chrome, Edge, and other Chromium-based browsers. Firefox and Safari support are coming soon. The extension works on Windows, Mac, and Linux.',
    category: 'Technical',
    icon: Settings,
    helpful: 143,
    views: 756
  },
  {
    id: '8',
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel anytime from your account settings. Go to Billing > Manage Subscription > Cancel. You\'ll continue to have access until your current billing period ends. No cancellation fees.',
    category: 'Billing',
    icon: DollarSign,
    helpful: 98,
    views: 567
  },
  {
    id: '9',
    question: 'Does it work offline?',
    answer: 'Basic optimization works offline using cached models, but advanced features like Multi-AI Broadcasting and real-time learning require an internet connection. Your prompts are saved locally and sync when you\'re back online.',
    category: 'Technical',
    icon: Settings,
    helpful: 134,
    views: 645
  },
  {
    id: '10',
    question: 'What\'s the difference between Auto and Manual mode?',
    answer: 'Auto mode continuously optimizes your prompts as you type, while Manual mode lets you review and approve changes before applying them. You can switch between modes anytime or customize the optimization level.',
    category: 'Features',
    icon: Settings,
    helpful: 176,
    views: 891
  }
];

const categories = ['All', 'General', 'Technical', 'Billing', 'Features', 'Privacy'];

export default function DocsFAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ [key: string]: 'helpful' | 'not-helpful' | null }>({});

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => (b.helpful || 0) - (a.helpful || 0)); // Sort by helpfulness

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleFeedback = (faqId: string, isHelpful: boolean) => {
    setFeedback(prev => ({
      ...prev,
      [faqId]: isHelpful ? 'helpful' : 'not-helpful'
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'General': return HelpCircle;
      case 'Technical': return Settings;
      case 'Billing': return DollarSign;
      case 'Features': return Settings;
      case 'Privacy': return Shield;
      default: return HelpCircle;
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
              Frequently Asked Questions
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8"
            >
              Quick answers to common questions about Promptability AI
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              variants={fadeInUp}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
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
              {categories.map((category) => {
                const IconComponent = getCategoryIcon(category);
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-white/15 text-white shadow border border-white/20'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category}
                    {category !== 'All' && (
                      <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">
                        {faqData.filter(faq => faq.category === category).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </motion.div>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <AnimatePresence>
              {filteredFAQs.map((faq, index) => {
                const isOpen = openItems.includes(faq.id);
                const IconComponent = faq.icon;
                const userFeedback = feedback[faq.id];
                
                return (
                  <motion.div
                    key={faq.id}
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors mb-1">
                            {faq.question}
                          </h3>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span>{faq.views} views</span>
                            <span>•</span>
                            <span>{faq.helpful} found helpful</span>
                          </div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-white/10">
                            <div className="pt-4">
                              <div className="text-gray-300 leading-relaxed mb-6">
                                {faq.answer}
                              </div>
                              
                              {/* Feedback Section */}
                              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-400">Was this helpful?</span>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => handleFeedback(faq.id, true)}
                                      className={`p-2 rounded-lg transition-all ${
                                        userFeedback === 'helpful' 
                                          ? 'bg-green-500/20 text-green-400' 
                                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-green-400'
                                      }`}
                                    >
                                      <ThumbsUp className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleFeedback(faq.id, false)}
                                      className={`p-2 rounded-lg transition-all ${
                                        userFeedback === 'not-helpful' 
                                          ? 'bg-red-500/20 text-red-400' 
                                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-red-400'
                                      }`}
                                    >
                                      <ThumbsDown className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                                
                                <button className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                  <MessageSquare className="w-4 h-4" />
                                  Add comment
                                </button>
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
          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-6">
                <HelpCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-white mb-2">No questions found</h3>
                <p className="text-sm">Try adjusting your search or browse different categories</p>
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

          {/* Contact Support */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mt-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Still Need Help?
            </h3>
            <p className="text-gray-300 mb-6">
              Can't find the answer you're looking for? Our support team responds within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/support"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Contact Support
              </Link>
              <Link
                href="/community"
                className="bg-white/10 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                Join Community
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-3 gap-6 text-center"
          >
            <div>
              <div className="text-2xl font-bold text-white">{faqData.length}</div>
              <div className="text-sm text-gray-400">Questions Answered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-sm text-gray-400">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">24h</div>
              <div className="text-sm text-gray-400">Response Time</div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}