'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Copy, Play, User, Target, List, Code } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface Principle {
  id: string;
  title: string;
  description: string;
  badExample: string;
  goodExample: string;
  explanation: string;
  tips: string[];
}

const principles: Principle[] = [
  {
    id: 'clear-instructions',
    title: 'Clear, Specific Instructions',
    description: 'Provide detailed, unambiguous directions for what you want Gemini to do',
    badExample: 'Tell me about climate change',
    goodExample: 'Write a 200-word summary on how climate change affects polar ice caps, including recent data from 2023-2024 and potential solutions',
    explanation: 'Specific instructions help Gemini understand exactly what you need, leading to more relevant and useful responses.',
    tips: [
      'Include word count or length requirements',
      'Specify the audience or reading level',
      'Add format preferences (bullet points, paragraphs, etc.)',
      'Mention any specific angles or perspectives'
    ]
  },
  {
    id: 'context-roles',
    title: 'Use Context and Roles',
    description: 'Give Gemini a role or persona to adopt for better, more focused responses',
    badExample: 'Explain quantum computing',
    goodExample: 'As a computer science professor teaching undergraduate students, explain quantum computing using simple analogies and real-world examples',
    explanation: 'Roles help Gemini adjust its language, depth, and approach to match your specific needs.',
    tips: [
      'Choose appropriate expertise levels (beginner, expert, etc.)',
      'Specify the context (business meeting, academic paper, casual conversation)',
      'Include the target audience in the role definition',
      'Use personas like "data scientist," "marketing manager," or "teacher"'
    ]
  },
  {
    id: 'few-shot',
    title: 'Few-Shot Examples',
    description: 'Show Gemini examples of the input-output pattern you want',
    badExample: 'Summarize these articles',
    goodExample: 'Summarize articles in this format:\n\nArticle: "Title Here"\nKey Points: • Point 1 • Point 2 • Point 3\nImplication: One sentence takeaway\n\nExample:\nArticle: "AI Advances in 2024"\nKey Points: • GPT-4 improvements • New coding models • Regulatory changes\nImplication: AI development is accelerating while facing increased oversight.',
    explanation: 'Examples teach Gemini the exact format and style you want for consistent results.',
    tips: [
      'Provide 1-3 clear examples',
      'Show the exact format you want',
      'Include edge cases if relevant',
      'Use consistent formatting patterns'
    ]
  },
  {
    id: 'step-by-step',
    title: 'Step-by-Step Reasoning',
    description: 'Ask Gemini to think through problems methodically',
    badExample: 'What should our marketing budget be?',
    goodExample: 'Help me determine our marketing budget by thinking through this step-by-step:\n1. Analyze our current revenue and growth targets\n2. Research industry benchmarks for marketing spend\n3. Consider our customer acquisition costs\n4. Factor in seasonal trends and campaign timing\n5. Provide a recommended budget with rationale',
    explanation: 'Breaking down complex tasks helps Gemini provide more thorough and logical responses.',
    tips: [
      'Number your steps clearly',
      'Build complexity gradually',
      'Ask for reasoning at each step',
      'Include validation or checking steps'
    ]
  },
  {
    id: 'output-format',
    title: 'Specify Output Format',
    description: 'Tell Gemini exactly how you want the response structured',
    badExample: 'Analyze this data',
    goodExample: 'Analyze this sales data and provide results in this JSON format:\n{\n  "summary": "brief overview",\n  "trends": ["trend1", "trend2"],\n  "recommendations": ["rec1", "rec2"],\n  "confidence": "high/medium/low"\n}',
    explanation: 'Structured formats make responses easier to use and integrate into workflows.',
    tips: [
      'Use JSON for structured data',
      'Request tables for comparisons',
      'Ask for bullet points for lists',
      'Specify code block formatting when needed'
    ]
  }
];

export default function CorePrinciples() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <section id="core-principles" className="py-16">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Core Principles
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 mb-12 text-lg"
        >
          Master these fundamental techniques to get better results from every Gemini interaction.
        </motion.p>

        <div className="space-y-4">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Card Header */}
              <button
                onClick={() => toggleCard(principle.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{principle.title}</h3>
                  <p className="text-gray-400">{principle.description}</p>
                </div>
                <motion.div
                  animate={{ rotate: expandedCard === principle.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedCard === principle.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10"
                  >
                    <div className="p-6 space-y-6">
                      {/* Examples */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Bad Example */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500/60 rounded-full"></div>
                            <span className="text-sm font-semibold text-red-400">Don't Do This</span>
                          </div>
                          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                            <code className="text-red-300 text-sm">{principle.badExample}</code>
                            <button
                              onClick={() => handleCopy(principle.badExample, `bad-${principle.id}`)}
                              className="ml-2 p-1 hover:bg-red-500/20 rounded transition-colors"
                            >
                              <Copy className="w-3 h-3 text-red-400" />
                            </button>
                          </div>
                        </div>

                        {/* Good Example */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500/60 rounded-full"></div>
                            <span className="text-sm font-semibold text-green-400">Do This Instead</span>
                          </div>
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                            <code className="text-green-300 text-sm">{principle.goodExample}</code>
                            <button
                              onClick={() => handleCopy(principle.goodExample, `good-${principle.id}`)}
                              className="ml-2 p-1 hover:bg-green-500/20 rounded transition-colors"
                            >
                              <Copy className="w-3 h-3 text-green-400" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Explanation */}
                      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <p className="text-gray-300 text-sm leading-relaxed">{principle.explanation}</p>
                      </div>

                      {/* Tips */}
                      <div>
                        <h4 className="text-white font-semibold mb-3">Pro Tips:</h4>
                        <ul className="space-y-2">
                          {principle.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-400 text-sm">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Interactive Demo Button */}
                      <div className="flex justify-center">
                        <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2 rounded-lg border border-white/20 transition-colors flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Try This in Live Tester
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>

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