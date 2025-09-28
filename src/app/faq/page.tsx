'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Shield, Zap, Users, CreditCard, Settings } from 'lucide-react';
import Link from 'next/link';

const faqCategories = [
  { id: 'all', label: 'All Questions', icon: HelpCircle },
  { id: 'getting-started', label: 'Getting Started', icon: Zap },
  { id: 'features', label: 'Features', icon: Settings },
  { id: 'pricing', label: 'Pricing & Billing', icon: CreditCard },
  { id: 'security', label: 'Security & Privacy', icon: Shield },
  { id: 'team', label: 'Team & Enterprise', icon: Users },
];

const faqs = [
  {
    category: 'getting-started',
    question: 'How does Promptability AI work?',
    answer: 'Promptability AI is a Chrome extension that learns from your prompt editing patterns. It analyzes how you refine prompts and automatically suggests improvements based on what has worked best in the past. Simply install the extension, and it will start learning from your interactions with AI platforms.'
  },
  {
    category: 'getting-started',
    question: 'Which AI platforms does it support?',
    answer: 'We support ChatGPT, Claude, Google Gemini, Perplexity, and 15+ other popular AI platforms. The extension automatically detects which platform you&apos;re using and adapts its suggestions accordingly.'
  },
  {
    category: 'getting-started',
    question: 'Do I need technical knowledge to use it?',
    answer: 'Not at all! Promptability AI is designed for everyone, from beginners to experts. The interface is intuitive, and our AI handles all the complex optimization in the background.'
  },
  {
    category: 'features',
    question: 'What makes Promptability AI different from other prompt tools?',
    answer: 'Unlike static prompt templates, Promptability AI learns from YOUR specific writing style and use cases. It provides personalized, context-aware suggestions that improve over time as it learns your preferences.'
  },
  {
    category: 'features',
    question: 'Can I share prompts with my team?',
    answer: 'Yes! Pro and Team plans include collaboration features. You can share prompt templates, best practices, and even create team-wide prompt libraries that everyone can access and contribute to.'
  },
  {
    category: 'features',
    question: 'Does it work offline?',
    answer: 'An internet connection is required to use Promptability as it connects to our secure cloud infrastructure for prompt optimization, favorites syncing, and other features.'
  },
  {
    category: 'pricing',
    question: 'Is there a free trial?',
    answer: 'Yes! We offer a free plan with 10 prompt optimizations per day. All paid plans also come with a 7-day free trial, no credit card required.'
  },
  {
    category: 'pricing',
    question: 'Can I change or cancel my plan anytime?',
    answer: 'Absolutely. You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the next billing cycle, and we offer prorated refunds for annual plans.'
  },
  {
    category: 'pricing',
    question: 'Do you offer student discounts?',
    answer: 'Yes! Students and educators get 50% off all plans with a valid .edu email address. Contact our support team to get your discount code.'
  },
  {
    category: 'security',
    question: 'Is my data safe and private?',
    answer: 'Your privacy is our top priority. We use enterprise-grade encryption for all data storage, secure cloud infrastructure, and your data is never shared with third parties. We comply with GDPR and SOC 2 standards.'
  },
  {
    category: 'security',
    question: 'Do you train AI models on my prompts?',
    answer: 'No, we never use your prompts to train our models without explicit permission. Your prompts remain private and are only used to provide you with personalized suggestions.'
  },
  {
    category: 'security',
    question: 'What compliance certifications do you have?',
    answer: 'We are SOC 2 Type II certified and GDPR compliant. Enterprise customers can request additional compliance documentation and security audits.'
  },
  {
    category: 'team',
    question: 'How many team members can I add?',
    answer: 'The Pro plan supports up to 10 team members. The Team plan supports unlimited members. For larger organizations, we offer custom Enterprise solutions.'
  },
  {
    category: 'team',
    question: 'Do you offer training for teams?',
    answer: 'Yes! Team and Enterprise plans include onboarding sessions and ongoing training. We also provide documentation, video tutorials, and dedicated support channels.'
  },
  {
    category: 'team',
    question: 'Can we deploy on-premise?',
    answer: 'On-premise deployment is available for Enterprise customers. Contact our sales team to discuss your specific requirements and get a custom quote.'
  },
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <main className="min-h-screen pt-32 pb-20 text-white relative overflow-x-hidden">
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
      <div className="max-w-5xl mx-auto px-4 relative z-40">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">
            Frequently Asked
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Everything you need to know about Promptability AI. Can&apos;t find what you&apos;re looking for? Contact our support team.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {faqCategories.map((category) => {
            const IconComponent = category.icon;
            const count = category.id === 'all' 
              ? faqs.length 
              : faqs.filter(f => f.category === category.id).length;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.label}
                <span className="text-sm opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No questions found matching your search.</p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => {
              const isOpen = openItems.includes(index);
              
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between"
                  >
                    <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-white/10"
                      >
                        <p className="px-6 py-4 text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-20 text-center">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-300 mb-6">
              Our support team is here to help. Get in touch and we&apos;ll respond as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-6 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all">
                  Contact Support
                </button>
              </Link>
              <button className="px-6 py-2.5 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
