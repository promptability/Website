'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, HelpCircle, DollarSign, Settings } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Pricing' | 'Technical';
  icon: React.ComponentType<{ className?: string }>;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'Is my data secure?',
    answer: 'Yes, your data is completely secure. We use enterprise-grade encryption, never store your prompts or AI conversations, and comply with GDPR and SOC 2 standards. Read our <a href="/privacy" class="text-purple-400 hover:text-purple-300 underline">Privacy Policy</a> for full details.',
    category: 'General',
    icon: Settings
  },
  {
    id: '2',
    question: 'Can I cancel anytime?',
    answer: 'Absolutely! You can cancel your subscription at any time with no questions asked. There are no long-term contracts or cancellation fees. Manage your subscription in your <a href="/account" class="text-purple-400 hover:text-purple-300 underline">Account Settings</a>.',
    category: 'Pricing',
    icon: DollarSign
  },
  {
    id: '4',
    question: 'Which AI platforms do you support?',
    answer: 'We support ChatGPT, Claude, Gemini, and <a href="/platforms" class="text-purple-400 hover:text-purple-300 underline">1000+ other AI platforms</a>. Promptability works seamlessly with any AI tool you use - just install our <a href="/chrome-extension" class="text-purple-400 hover:text-purple-300 underline">Chrome extension</a> and you\'re ready to go.',
    category: 'Technical',
    icon: Settings
  },
  {
    id: '5',
    question: 'Who needs Promptability?',
    answer: 'Promptability is perfect for professionals, content creators, developers, researchers, and anyone who uses AI daily. If you want better AI responses in less time, Promptability is for you. See <a href="/usecases" class="text-purple-400 hover:text-purple-300 underline">real use cases</a> from our users.',
    category: 'General',
    icon: HelpCircle
  },
  {
    id: '6',
    question: 'Do I need technical knowledge?',
    answer: 'Not at all! Promptability is designed to be simple and intuitive. Just type naturally and our AI does the optimization for you. No prompt engineering skills required. Watch our <a href="/docs/getting-started" class="text-purple-400 hover:text-purple-300 underline">quick start guide</a> to see how easy it is.',
    category: 'Technical',
    icon: Settings
  },
  {
    id: '7',
    question: 'Is there a free trial?',
    answer: 'Yes! Start with our <a href="/signup" class="text-purple-400 hover:text-purple-300 underline">free plan</a> that gives you 10 optimized prompts daily forever. No credit card required. Upgrade to Starter ($9/month) for 150 daily prompts when you need more. See all <a href="/pricing" class="text-purple-400 hover:text-purple-300 underline">pricing options</a>.',
    category: 'Pricing',
    icon: DollarSign
  },
  {
    id: '8',
    question: 'How quickly will I see results?',
    answer: 'Immediately! From your very first prompt, you\'ll get better AI responses. Users report 10x better results and 75% time savings on average. The AI also learns your style over time for even better results. <a href="/signup" class="text-purple-400 hover:text-purple-300 underline">Try it free now</a>.',
    category: 'General',
    icon: HelpCircle
  },
  {
    id: '9',
    question: 'What happens to my data if I cancel?',
    answer: 'If you cancel, your account data is retained for 30 days in case you want to reactivate. After that, all data is permanently deleted. You can also request immediate deletion at any time through <a href="/contact" class="text-purple-400 hover:text-purple-300 underline">support</a>.',
    category: 'Pricing',
    icon: DollarSign
  },
];

const categories = ['All', 'General', 'Pricing', 'Technical'];

export default function EnhancedFAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? [] // Close all items if clicking on the open one
        : [id] // Open only the clicked item, close all others
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'General': return HelpCircle;
      case 'Pricing': return DollarSign;
      case 'Technical': return Settings;
      default: return HelpCircle;
    }
  };

  // All colors removed for grayscale theme
  const getCategoryColor = (_category: string) => '';

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold leading-tight mb-6 text-white"
          >
            Frequently Asked
            <span className="block text-white/80">
              Questions
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Everything you need to know about Promptability AI
          </motion.p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => {
                const IconComponent = getCategoryIcon(category);
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-white/15 text-white shadow'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 text-white/80" />
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* FAQ Items - Compact Grid Layout */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 items-start"
        >
          <AnimatePresence>
            {filteredFAQs.map((faq, index) => {
              const isOpen = openItems.includes(faq.id);
              const IconComponent = faq.icon;
              
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
                    className="w-full p-4 text-left flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-base font-semibold text-white group-hover:text-white transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
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
                        <div className="px-4 pb-4 pl-15">
                          <div 
                            className="text-gray-300 leading-relaxed text-sm"
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
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
            <div className="text-gray-400 mb-4">
              <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No questions found</p>
              <p className="text-sm">Try adjusting your search or filter</p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="text-white/80 hover:text-white transition-colors"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Contact Support */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-300 mb-6">
              Our support team is here to help. Get in touch and we'll respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact" 
                className="bg-white/10 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/signup"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
