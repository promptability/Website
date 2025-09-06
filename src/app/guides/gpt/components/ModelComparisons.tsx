'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Zap, DollarSign, Clock, ChevronDown, Shield, Brain, MessageSquare, ToggleLeft, ToggleRight, Copy } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const modelFeatures = [
  {
    feature: 'Context Window',
    gpt35: '16K tokens',
    gpt4: '32K tokens',
    gpt41: '128K tokens',
    winner: 'gpt41'
  },
  {
    feature: 'Cost per 1K tokens',
    gpt35: '$0.002',
    gpt4: '$0.06',
    gpt41: '$0.06',
    winner: 'gpt35'
  },
  {
    feature: 'Response Speed',
    gpt35: 'Fast',
    gpt4: 'Medium',
    gpt41: 'Medium',
    winner: 'gpt35'
  },
  {
    feature: 'Reasoning Quality',
    gpt35: 'Good',
    gpt4: 'Excellent',
    gpt41: 'Superior',
    winner: 'gpt41'
  },
  {
    feature: 'Function Calling',
    gpt35: 'Basic',
    gpt4: 'Advanced',
    gpt41: 'Advanced',
    winner: 'gpt4'
  },
  {
    feature: 'Vision Capabilities',
    gpt35: 'None',
    gpt4: 'Yes',
    gpt41: 'Enhanced',
    winner: 'gpt41'
  }
];

const useCaseRecommendations = [
  {
    scenario: 'Simple Q&A and basic tasks',
    recommended: 'GPT-3.5',
    reason: 'Cost-effective for straightforward queries'
  },
  {
    scenario: 'Complex analysis and reasoning',
    recommended: 'GPT-4',
    reason: 'Better logic and understanding'
  },
  {
    scenario: 'Long document processing',
    recommended: 'GPT-4.1',
    reason: 'Larger context window'
  },
  {
    scenario: 'Image analysis and vision tasks',
    recommended: 'GPT-4 Vision',
    reason: 'Native multimodal capabilities'
  }
];

const claudeVsGptComparison = [
  {
    aspect: 'Context Window',
    claude: '200K tokens',
    gpt4: '32K tokens',
    advantage: 'claude',
    description: 'Claude can handle much longer documents'
  },
  {
    aspect: 'Safety & Refusals',
    claude: 'Constitutional AI',
    gpt4: 'RLHF',
    advantage: 'claude',
    description: 'More nuanced safety approach'
  },
  {
    aspect: 'Tone Mirroring',
    claude: 'Excellent',
    gpt4: 'Good',
    advantage: 'claude',
    description: 'Better at matching user communication style'
  },
  {
    aspect: 'Steerability',
    claude: 'High',
    gpt4: 'Medium',
    advantage: 'claude',
    description: 'Follows complex instructions more precisely'
  },
  {
    aspect: 'Speed',
    claude: 'Medium',
    gpt4: 'Fast',
    advantage: 'gpt4',
    description: 'Generally faster response times'
  },
  {
    aspect: 'Function Calling',
    claude: 'Basic',
    gpt4: 'Advanced',
    advantage: 'gpt4',
    description: 'More robust API integration capabilities'
  }
];

const toneExamples = {
  formal: {
    input: 'Explain machine learning',
    claudeResponse: 'Machine learning constitutes a sophisticated computational methodology whereby algorithms iteratively improve performance through experience.',
    gptResponse: 'Machine learning is a method of data analysis that automates analytical model building using algorithms that learn from data.'
  },
  casual: {
    input: 'Explain machine learning',
    claudeResponse: 'So machine learning is basically teaching computers to get better at stuff by showing them lots of examples!',
    gptResponse: 'Machine learning is when you train computers to recognize patterns and make predictions from data.'
  },
  technical: {
    input: 'Explain machine learning',
    claudeResponse: 'ML leverages statistical algorithms and neural architectures to optimize objective functions through gradient descent on training datasets.',
    gptResponse: 'Machine learning uses algorithms to build mathematical models from training data to make predictions or decisions.'
  }
};

export default function ModelComparisons() {
  const [selectedModel, setSelectedModel] = useState('');
  const [costInputs, setCostInputs] = useState({ tokens: 1000, requests: 100 });
  const [expandedUseCase, setExpandedUseCase] = useState<string | null>(null);
  const [showClaudeComparison, setShowClaudeComparison] = useState(false);
  const [selectedTone, setSelectedTone] = useState<'formal' | 'casual' | 'technical'>('formal');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const calculateCost = (model: string) => {
    const rates = {
      'gpt35': 0.002,
      'gpt4': 0.06,
      'gpt41': 0.06
    };
    const rate = rates[model as keyof typeof rates] || 0;
    return ((costInputs.tokens / 1000) * rate * costInputs.requests).toFixed(2);
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
    <section id="comparisons" className="py-16">
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
          Model Comparisons
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 mb-12 text-lg"
        >
          Choose the right model for your specific needs and budget.
        </motion.p>

        {/* Feature Comparison Table */}
        <motion.div
          variants={fadeInUp}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden mb-8"
        >
          <div className="grid grid-cols-4 gap-4 p-6 border-b border-white/10 bg-white/5">
            <div className="font-semibold text-white">Feature</div>
            <div className="font-semibold text-white text-center">GPT-3.5</div>
            <div className="font-semibold text-white text-center">GPT-4</div>
            <div className="font-semibold text-white text-center">GPT-4.1</div>
          </div>

          <div className="divide-y divide-white/10">
            {modelFeatures.map((row, index) => (
              <motion.div
                key={row.feature}
                variants={fadeInUp}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-4 gap-4 p-6 hover:bg-white/5 transition-colors"
              >
                <div className="text-white font-medium">{row.feature}</div>
                <div className={`text-center ${row.winner === 'gpt35' ? 'text-green-400 font-semibold' : 'text-gray-300'}`}>
                  {row.gpt35}
                </div>
                <div className={`text-center ${row.winner === 'gpt4' ? 'text-green-400 font-semibold' : 'text-gray-300'}`}>
                  {row.gpt4}
                </div>
                <div className={`text-center ${row.winner === 'gpt41' ? 'text-green-400 font-semibold' : 'text-gray-300'}`}>
                  {row.gpt41}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cost Calculator */}
        <motion.div
          variants={fadeInUp}
          className="grid md:grid-cols-2 gap-8 mb-8"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white">Cost Calculator</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-white text-sm mb-2 block">Tokens per request</label>
                <input
                  type="number"
                  value={costInputs.tokens}
                  onChange={(e) => setCostInputs(prev => ({ ...prev, tokens: parseInt(e.target.value) || 0 }))}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Requests per month</label>
                <input
                  type="number"
                  value={costInputs.requests}
                  onChange={(e) => setCostInputs(prev => ({ ...prev, requests: parseInt(e.target.value) || 0 }))}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-white text-sm font-semibold mb-2">Monthly Costs:</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">GPT-3.5:</span>
                    <span className="text-green-400">${calculateCost('gpt35')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">GPT-4:</span>
                    <span className="text-yellow-400">${calculateCost('gpt4')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">GPT-4.1:</span>
                    <span className="text-red-400">${calculateCost('gpt41')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* When to Use Each */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white">When to Use Each</h3>
            </div>

            <div className="space-y-3">
              {useCaseRecommendations.map((useCase, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium text-sm">{useCase.scenario}</h4>
                    <span className="text-green-400 text-sm font-semibold">{useCase.recommended}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{useCase.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Claude vs GPT-4 Toggle */}
        <motion.div
          variants={fadeInUp}
          className="text-center mb-8"
        >
          <button
            onClick={() => setShowClaudeComparison(!showClaudeComparison)}
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/20 transition-colors mx-auto"
          >
            <Brain className="w-5 h-5" />
            Claude vs GPT-4 Comparison
            {showClaudeComparison ? (
              <ToggleRight className="w-6 h-6 text-green-400" />
            ) : (
              <ToggleLeft className="w-6 h-6 text-gray-400" />
            )}
          </button>
        </motion.div>

        {/* Claude vs GPT-4 Detailed Comparison */}
        <AnimatePresence>
          {showClaudeComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 mb-8"
            >
              {/* Key Differences Dashboard */}
              <motion.div
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6" />
                  Key Differences Dashboard
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {claudeVsGptComparison.map((comparison, index) => (
                    <div
                      key={index}
                      className="bg-white/5 border border-white/10 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-semibold">{comparison.aspect}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          comparison.advantage === 'claude' 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-green-500/20 text-green-400'
                        }`}>
                          {comparison.advantage === 'claude' ? 'Claude' : 'GPT-4'} advantage
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-gray-400 text-sm mb-1">Claude</div>
                          <div className={`text-sm font-semibold ${
                            comparison.advantage === 'claude' ? 'text-blue-400' : 'text-gray-300'
                          }`}>
                            {comparison.claude}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400 text-sm mb-1">GPT-4</div>
                          <div className={`text-sm font-semibold ${
                            comparison.advantage === 'gpt4' ? 'text-green-400' : 'text-gray-300'
                          }`}>
                            {comparison.gpt4}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-sm">{comparison.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tone Mirroring Demo */}
              <motion.div
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Tone Mirroring Demonstration</h3>
                
                {/* Tone Selector */}
                <div className="flex gap-2 mb-6">
                  {(Object.keys(toneExamples) as Array<keyof typeof toneExamples>).map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSelectedTone(tone)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                        selectedTone === tone
                          ? 'bg-white/20 text-white border border-white/30'
                          : 'bg-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>

                {/* Input Prompt */}
                <div className="bg-black/20 border border-white/10 rounded-lg p-4 mb-4">
                  <div className="text-gray-400 text-sm mb-2">Input Prompt:</div>
                  <div className="text-white font-semibold">{toneExamples[selectedTone].input}</div>
                </div>

                {/* Response Comparison */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-blue-400 text-sm font-semibold">Claude Response</div>
                      <button
                        onClick={() => handleCopy(toneExamples[selectedTone].claudeResponse)}
                        className="bg-blue-500/20 hover:bg-blue-500/30 p-1 rounded transition-colors"
                      >
                        <Copy className="w-3 h-3 text-blue-400" />
                      </button>
                    </div>
                    <div className="text-blue-300 text-sm">{toneExamples[selectedTone].claudeResponse}</div>
                  </div>
                  
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-green-400 text-sm font-semibold">GPT-4 Response</div>
                      <button
                        onClick={() => handleCopy(toneExamples[selectedTone].gptResponse)}
                        className="bg-green-500/20 hover:bg-green-500/30 p-1 rounded transition-colors"
                      >
                        <Copy className="w-3 h-3 text-green-400" />
                      </button>
                    </div>
                    <div className="text-green-300 text-sm">{toneExamples[selectedTone].gptResponse}</div>
                  </div>
                </div>
              </motion.div>

              {/* Safety & Constitutional AI */}
              <motion.div
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6" />
                  Safety & Constitutional AI vs RLHF
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold text-lg">Claude (Constitutional AI)</h4>
                    <div className="space-y-3">
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                        <div className="text-blue-400 text-sm font-semibold mb-1">Approach:</div>
                        <div className="text-blue-300 text-sm">Uses a set of principles to guide behavior and explain reasoning</div>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                        <div className="text-blue-400 text-sm font-semibold mb-1">Refusal Style:</div>
                        <div className="text-blue-300 text-sm">More contextual, explains why something might be harmful</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold text-lg">GPT-4 (RLHF)</h4>
                    <div className="space-y-3">
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <div className="text-green-400 text-sm font-semibold mb-1">Approach:</div>
                        <div className="text-green-300 text-sm">Trained using human feedback to align with preferences</div>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <div className="text-green-400 text-sm font-semibold mb-1">Refusal Style:</div>
                        <div className="text-green-300 text-sm">More direct, often suggests alternative approaches</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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