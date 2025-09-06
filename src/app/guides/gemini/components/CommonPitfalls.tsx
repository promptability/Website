'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { AlertTriangle, ChevronDown, Copy, CheckCircle } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface Pitfall {
  id: string;
  problem: string;
  why: string;
  solution: string;
  badExample: string;
  goodExample: string;
}

const pitfalls: Pitfall[] = [
  {
    id: 'vague-prompts',
    problem: 'Vague or Ambiguous Prompts',
    why: 'Gemini needs clear direction to provide useful responses. Vague prompts lead to generic, unhelpful answers.',
    solution: 'Be specific about what you want, include context, and define success criteria.',
    badExample: 'Help me with my business',
    goodExample: 'Help me create a marketing strategy for my SaaS startup targeting small businesses. Include budget allocation, channel recommendations, and 90-day milestones.'
  },
  {
    id: 'missing-context',
    problem: 'Missing Important Context',
    why: 'Without context, Gemini makes assumptions that might not match your needs or situation.',
    solution: 'Provide relevant background, constraints, audience, and goal information upfront.',
    badExample: 'Write an email to the team',
    goodExample: 'Write a professional email to my 12-person engineering team announcing a new project deadline that\'s been moved up by 2 weeks. Keep the tone positive and include next steps.'
  },
  {
    id: 'multi-image-memory',
    problem: 'Multi-Image Memory Issues',
    why: 'Gemini can only process one image at a time and doesn\'t remember previous images in the conversation.',
    solution: 'Process images individually or combine multiple images into one before uploading.',
    badExample: 'Compare these three screenshots I just sent',
    goodExample: 'Analyze this combined image showing three different UI designs and compare their usability, highlighting strengths and weaknesses of each.'
  },
  {
    id: 'not-using-search',
    problem: 'Not Leveraging Web Search',
    why: 'Missing out on Gemini\'s real-time search capability means getting outdated or incomplete information.',
    solution: 'Use "search the web" or "using current information" for time-sensitive queries.',
    badExample: 'What\'s the latest news in AI?',
    goodExample: 'Search the web for the latest AI news from this week and summarize the 5 most significant developments with their implications.'
  },
  {
    id: 'long-unstructured',
    problem: 'Long, Unstructured Prompts',
    why: 'Wall-of-text prompts are hard for Gemini to parse and may miss important details.',
    solution: 'Use numbered lists, clear sections, and structured formatting.',
    badExample: 'I need help with my website it\'s not converting well and the design looks outdated and users are complaining about navigation and the loading speed is slow and I want to improve SEO too',
    goodExample: 'Help improve my website with these specific issues:\n1. Low conversion rate (current: 2%)\n2. Outdated design (last updated 2019)\n3. Navigation complaints from users\n4. Slow loading (3+ seconds)\n5. Poor SEO rankings\n\nPrioritize these by impact and provide specific action items.'
  },
  {
    id: 'triggering-safeguards',
    problem: 'Accidentally Triggering Safety Safeguards',
    why: 'Certain words or phrases can trigger Gemini\'s safety filters, even for legitimate use cases.',
    solution: 'Rephrase sensitive topics using neutral language and clear educational context.',
    badExample: 'How to hack into systems for security testing',
    goodExample: 'Explain ethical penetration testing methodologies used by cybersecurity professionals to identify vulnerabilities in authorized systems.'
  }
];

export default function CommonPitfalls() {
  const [expandedPitfall, setExpandedPitfall] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const togglePitfall = (id: string) => {
    setExpandedPitfall(expandedPitfall === id ? null : id);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <section id="pitfalls" className="py-16">
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
          Common Pitfalls
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 mb-12 text-lg"
        >
          Avoid these mistakes to get better results from Gemini every time.
        </motion.p>

        <div className="space-y-4">
          {pitfalls.map((pitfall, index) => (
            <motion.div
              key={pitfall.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => togglePitfall(pitfall.id)}
                className="w-full flex items-center gap-4 p-6 text-left hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{pitfall.problem}</h3>
                  <p className="text-gray-400 text-sm">Click to see solution and examples</p>
                </div>
                <motion.div
                  animate={{ rotate: expandedPitfall === pitfall.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedPitfall === pitfall.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10"
                  >
                    <div className="p-6 space-y-6">
                      {/* Why This Happens */}
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                        <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Why This Happens
                        </h4>
                        <p className="text-yellow-300 text-sm">{pitfall.why}</p>
                      </div>

                      {/* Solution */}
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          How to Fix
                        </h4>
                        <p className="text-green-300 text-sm">{pitfall.solution}</p>
                      </div>

                      {/* Examples */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Bad Example */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500/60 rounded-full"></div>
                            <span className="text-red-400 text-sm font-semibold">Problematic</span>
                          </div>
                          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                            <code className="text-red-300 text-sm">{pitfall.badExample}</code>
                            <button
                              onClick={() => handleCopy(pitfall.badExample)}
                              className="ml-2 p-1 hover:bg-red-500/20 rounded transition-colors"
                            >
                              <Copy className="w-3 h-3 text-red-400" />
                            </button>
                          </div>
                        </div>

                        {/* Good Example */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500/60 rounded-full"></div>
                            <span className="text-green-400 text-sm font-semibold">Improved</span>
                          </div>
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                            <code className="text-green-300 text-sm">{pitfall.goodExample}</code>
                            <button
                              onClick={() => handleCopy(pitfall.goodExample)}
                              className="ml-2 p-1 hover:bg-green-500/20 rounded transition-colors"
                            >
                              <Copy className="w-3 h-3 text-green-400" />
                            </button>
                          </div>
                        </div>
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