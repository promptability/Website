'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Zap, Clock, History, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer, buttonHover } from '@/lib/animations';
import { exampleTransformations, OptimizationResult } from '@/lib/promptOptimizer';

interface HistoryItem extends OptimizationResult {
  id: string;
  timestamp: Date;
}

export default function PromptTester() {
  const [inputPrompt, setInputPrompt] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleOptimize = async () => {
    if (!inputPrompt.trim()) return;

    setIsOptimizing(true);
    setResult(null);

    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputPrompt }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
        
        // Add to history
        const historyItem: HistoryItem = {
          ...data.data,
          id: Date.now().toString(),
          timestamp: new Date(),
        };
        setHistory(prev => [historyItem, ...prev.slice(0, 9)]);
      }
    } catch (error) {
      console.error('Error optimizing prompt:', error);
    } finally {
      setIsOptimizing(false);
    }
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

  const loadExample = (example: typeof exampleTransformations[0]) => {
    setInputPrompt(example.input);
    setResult(null);
  };

  const loadFromHistory = (item: HistoryItem) => {
    setInputPrompt(item.originalPrompt);
    setResult(item);
    setShowHistory(false);
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Try It Live
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Experience the power of AI prompt optimization. Type your prompt and watch it transform.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Tester */}
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Input Side */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">Your Prompt</span>
                  </div>
                  <textarea
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    placeholder="Type your prompt here..."
                    className="w-full h-48 bg-black/20 border border-white/10 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                  <motion.button
                    variants={buttonHover}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleOptimize}
                    disabled={!inputPrompt.trim() || isOptimizing}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isOptimizing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Optimizing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Optimize Prompt
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Output Side */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">Optimized Result</span>
                    {result && (
                      <button
                        onClick={() => handleCopy(result.optimizedPrompt, 'result')}
                        className="ml-auto p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        <Copy className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                  <div className="h-48 bg-black/20 border border-white/10 rounded-lg p-4 overflow-y-auto">
                    <AnimatePresence mode="wait">
                      {result ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="text-white text-sm leading-relaxed"
                        >
                          {result.optimizedPrompt}
                        </motion.div>
                      ) : (
                        <div className="text-gray-500 text-sm">
                          Your optimized prompt will appear here...
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-white/10"
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">
                          {result.improvements.clarity}%
                        </div>
                        <div className="text-sm text-gray-400">Clarity Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">
                          {result.improvements.tokensSaved}
                        </div>
                        <div className="text-sm text-gray-400">Tokens Saved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">
                          {result.improvements.improvementScore}%
                        </div>
                        <div className="text-sm text-gray-400">Improvement</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Example Prompts */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Try These Examples
              </h3>
              <div className="space-y-3">
                {exampleTransformations.slice(0, 5).map((example, index) => (
                  <button
                    key={index}
                    onClick={() => loadExample(example)}
                    className="w-full text-left p-3 bg-black/20 hover:bg-white/10 rounded-lg border border-white/5 transition-colors group"
                  >
                    <div className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      "{example.input}"
                    </div>
                    <div className="text-xs text-purple-400 mt-1">
                      {example.category}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* History */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full flex items-center justify-between text-lg font-semibold text-white mb-4"
              >
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-purple-400" />
                  Recent Tests ({history.length})
                </div>
                <div className={`transform transition-transform ${showHistory ? 'rotate-180' : ''}`}>
                  ↓
                </div>
              </button>
              
              <AnimatePresence>
                {showHistory && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 max-h-64 overflow-y-auto"
                  >
                    {history.length > 0 ? (
                      history.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => loadFromHistory(item)}
                          className="w-full text-left p-3 bg-black/20 hover:bg-white/10 rounded-lg border border-white/5 transition-colors"
                        >
                          <div className="text-sm text-gray-300 truncate">
                            "{item.originalPrompt}"
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">
                              {item.timestamp.toLocaleTimeString()}
                            </span>
                            <span className="text-xs text-green-400 ml-auto">
                              {item.improvements.improvementScore}% better
                            </span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500 text-center py-4">
                        No tests yet. Try optimizing a prompt!
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Copy notification */}
        <AnimatePresence>
          {copiedText && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
            >
              Copied to clipboard!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
