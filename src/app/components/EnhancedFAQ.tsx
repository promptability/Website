'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, HelpCircle, DollarSign, Settings } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface FAQItem {
  id: string;
  question: string;
  shortQuestion?: string; // For mobile
  answer: string;
  shortAnswer?: string; // For mobile
  category: 'General' | 'Pricing' | 'Technical';
  icon: React.ComponentType<{ className?: string }>;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'Is my data secure?',
    shortQuestion: 'Data security?',
    answer: 'Yes, your data is completely secure. We use enterprise-grade encryption, never store your prompts or AI conversations, and comply with GDPR and SOC 2 standards. Read our <a href="/privacy" class="text-purple-400 hover:text-purple-300 underline">Privacy Policy</a> for full details.',
    shortAnswer: 'Yes! Enterprise encryption, GDPR compliant, prompts never stored.',
    category: 'General',
    icon: Settings
  },
  {
    id: '2',
    question: 'Can I cancel anytime?',
    shortQuestion: 'Cancel anytime?',
    answer: 'Absolutely! You can cancel your subscription at any time with no questions asked. There are no long-term contracts or cancellation fees. Manage your subscription in your <a href="/account" class="text-purple-400 hover:text-purple-300 underline">Account Settings</a>.',
    shortAnswer: 'Yes! Cancel anytime, no fees or contracts.',
    category: 'Pricing',
    icon: DollarSign
  },
  {
    id: '4',
    question: 'Which AI platforms do you support?',
    shortQuestion: 'Supported platforms?',
    answer: 'We support ChatGPT, Claude, Gemini, and <a href="/platforms" class="text-purple-400 hover:text-purple-300 underline">1000+ other AI platforms</a>. Promptability works seamlessly with any AI tool you use - just install our <a href="/chrome-extension" class="text-purple-400 hover:text-purple-300 underline">Chrome extension</a> and you\'re ready to go.',
    shortAnswer: 'ChatGPT, Claude, Gemini + 1000+ platforms via Chrome extension.',
    category: 'Technical',
    icon: Settings
  },
  {
    id: '5',
    question: 'Who needs Promptability?',
    shortQuestion: 'Who uses this?',
    answer: 'Promptability is perfect for professionals, content creators, developers, researchers, and anyone who uses AI daily. If you want better AI responses in less time, Promptability is for you. See <a href="/usecases" class="text-purple-400 hover:text-purple-300 underline">real use cases</a> from our users.',
    shortAnswer: 'Professionals, creators, developers - anyone using AI daily.',
    category: 'General',
    icon: HelpCircle
  },
  {
    id: '6',
    question: 'Do I need technical knowledge?',
    shortQuestion: 'Need tech skills?',
    answer: 'Not at all! Promptability is designed to be simple and intuitive. Just type naturally and our AI does the optimization for you. No prompt engineering skills required. Watch our <a href="/docs/getting-started" class="text-purple-400 hover:text-purple-300 underline">quick start guide</a> to see how easy it is.',
    shortAnswer: 'No! Just type naturally, AI optimizes automatically.',
    category: 'Technical',
    icon: Settings
  },
  {
    id: '7',
    question: 'Is there a free trial?',
    shortQuestion: 'Free trial?',
    answer: 'Yes! Start with our <a href="/signup" class="text-purple-400 hover:text-purple-300 underline">free plan</a> that gives you 10 optimized prompts daily forever. No credit card required. Upgrade to Starter ($9/month) for 150 daily prompts when you need more. See all <a href="/pricing" class="text-purple-400 hover:text-purple-300 underline">pricing options</a>.',
    shortAnswer: 'Yes! Free plan with 10 daily prompts forever, no card needed.',
    category: 'Pricing',
    icon: DollarSign
  },
  {
    id: '8',
    question: 'How quickly will I see results?',
    shortQuestion: 'Quick results?',
    answer: 'Immediately! From your very first prompt, you\'ll get better AI responses. Users report 10x better results and 75% time savings on average. The AI also learns your style over time for even better results. <a href="/signup" class="text-purple-400 hover:text-purple-300 underline">Try it free now</a>.',
    shortAnswer: 'Immediate! 10x better results from first use.',
    category: 'General',
    icon: HelpCircle
  },
  {
    id: '9',
    question: 'What happens to my data if I cancel?',
    shortQuestion: 'Data after cancel?',
    answer: 'If you cancel, your account data is retained for 30 days in case you want to reactivate. After that, all data is permanently deleted. You can also request immediate deletion at any time through <a href="/contact" class="text-purple-400 hover:text-purple-300 underline">support</a>.',
    shortAnswer: 'Kept 30 days, then deleted. Instant deletion available.',
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

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 sm:mb-4 md:mb-6 text-white"
          >
            Frequently Asked
            <span className="block text-white/80">
              Questions
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
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
          className="mb-6 sm:mb-8 md:mb-12"
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filter - Mobile optimized */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => {
                const IconComponent = getCategoryIcon(category);
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
                      selectedCategory === category
                        ? 'bg-white/15 text-white shadow'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* FAQ Items - Mobile optimized single column */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-3 sm:space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0"
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
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg md:rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-3 sm:p-4 text-left flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-white transition-colors truncate">
                        {/* Show short question on mobile, full on desktop */}
                        <span className="md:hidden">{faq.shortQuestion || faq.question}</span>
                        <span className="hidden md:inline">{faq.question}</span>
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-2"
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
                        <div className="px-3 pb-3 sm:px-4 sm:pb-4 pl-8 sm:pl-15">
                          {/* Show short answer on mobile, full on desktop */}
                          <div className="md:hidden">
                            <div className="text-gray-300 leading-relaxed text-xs sm:text-sm">
                              {faq.shortAnswer || faq.answer.replace(/<[^>]*>/g, '')}
                            </div>
                          </div>
                          <div className="hidden md:block">
                            <div 
                              className="text-gray-300 leading-relaxed text-sm"
                              dangerouslySetInnerHTML={{ __html: faq.answer }}
                            />
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
            className="text-center py-8 sm:py-12"
          >
            <div className="text-gray-400 mb-4">
              <HelpCircle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-50" />
              <p className="text-base sm:text-lg">No questions found</p>
              <p className="text-sm">Try adjusting your search or filter</p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="text-white/80 hover:text-white transition-colors text-sm sm:text-base"
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
          className="mt-16 sm:mt-20 md:mt-24 text-center"
        >
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">
              Still Have Questions?
            </h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
              Our support team is here to help. Get in touch and we'll respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="/contact" 
                className="bg-white/10 border border-white/20 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-white/20 transition-colors text-sm sm:text-base"
              >
                Contact Support
              </a>
              <a
                href="/signup"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
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