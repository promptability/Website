'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Scale, 
  Brain, 
  Shield, 
  MessageSquare, 
  Clock, 
  DollarSign,
  ToggleLeft,
  ToggleRight,
  Copy,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const featureComparison = [
  {
    feature: 'Context Window',
    claude: '200K tokens',
    gpt4: '32K tokens',
    advantage: 'claude',
    impact: 'High',
    description: 'Claude can process 6x more content in a single conversation'
  },
  {
    feature: 'Safety Approach',
    claude: 'Constitutional AI',
    gpt4: 'RLHF',
    advantage: 'claude',
    impact: 'Medium',
    description: 'More transparent and principled safety reasoning'
  },
  {
    feature: 'Tone Mirroring',
    claude: 'Excellent',
    gpt4: 'Good',
    advantage: 'claude',
    impact: 'Medium',
    description: 'Better at matching and adapting to user communication style'
  },
  {
    feature: 'Response Speed',
    claude: 'Medium',
    gpt4: 'Fast',
    advantage: 'gpt4',
    impact: 'Low',
    description: 'GPT-4 generally provides faster response times'
  },
  {
    feature: 'Function Calling',
    claude: 'Limited',
    gpt4: 'Advanced',
    advantage: 'gpt4',
    impact: 'High',
    description: 'GPT-4 has more robust API integration capabilities'
  },
  {
    feature: 'Instruction Following',
    claude: 'Excellent',
    gpt4: 'Good',
    advantage: 'claude',
    impact: 'High',
    description: 'Better at following complex, multi-step instructions precisely'
  }
];

const reasoningExamples = {
  math: {
    problem: 'A company has 150 employees. If 40% work remotely, 35% work hybrid, and the rest work in-office, how many work in each category?',
    claudeApproach: 'I&apos;ll solve this step-by-step:\n\n1. Total employees: 150\n2. Remote workers: 150 × 40% = 150 × 0.4 = 60 employees\n3. Hybrid workers: 150 × 35% = 150 × 0.35 = 52.5 → 53 employees\n4. In-office workers: 150 - 60 - 53 = 37 employees\n\nVerification: 60 + 53 + 37 = 150 ✓',
    gptApproach: 'Remote: 150 × 0.4 = 60\nHybrid: 150 × 0.35 = 52.5 ≈ 53\nIn-office: 150 - 60 - 53 = 37\n\nAnswer: 60 remote, 53 hybrid, 37 in-office'
  },
  analysis: {
    problem: 'Analyze the pros and cons of remote work for productivity',
    claudeApproach: 'I&apos;ll provide a balanced analysis:\n\n**Productivity Benefits:**\n- Reduced commute time increases available work hours\n- Fewer office distractions can improve focus\n- Flexible scheduling allows work during peak energy\n\n**Productivity Challenges:**\n- Home distractions (family, personal tasks)\n- Reduced spontaneous collaboration\n- Potential isolation affecting motivation\n\n**Conclusion:** Impact varies by individual and role type.',
    gptApproach: 'Remote work has mixed effects on productivity:\n\nPros: No commute, fewer interruptions, flexible hours\nCons: Home distractions, less collaboration, isolation\n\nProductivity depends on individual work style and home environment setup.'
  }
};

const verbosityComparison = [
  { aspect: 'Explanation Depth', claude: 85, gpt4: 70 },
  { aspect: 'Context Awareness', claude: 90, gpt4: 75 },
  { aspect: 'Nuanced Responses', claude: 88, gpt4: 72 },
  { aspect: 'Conciseness', claude: 65, gpt4: 85 },
  { aspect: 'Direct Answers', claude: 70, gpt4: 90 }
];

export default function ClaudeVsGPT() {
  const [selectedComparison, setSelectedComparison] = useState('features');
  const [selectedReasoning, setSelectedReasoning] = useState<'math' | 'analysis'>('math');
  const [showVerbosity, setShowVerbosity] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

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
    <section id="comparison" className="py-16">
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
          Claude vs GPT-4
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 mb-12 text-lg"
        >
          Understand the key differences and choose the right AI model for your specific needs.
        </motion.p>

        {/* Comparison Mode Selector */}
        <motion.div
          variants={fadeInUp}
          className="flex gap-2 mb-8 justify-center"
        >
          {[
            { id: 'features', label: 'Feature Comparison', icon: Scale },
            { id: 'reasoning', label: 'Reasoning Patterns', icon: Brain },
            { id: 'verbosity', label: 'Response Style', icon: MessageSquare }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedComparison(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedComparison === id
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedComparison === 'features' && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="grid grid-cols-5 gap-4 p-6 border-b border-white/10 bg-white/5">
                <div className="font-semibold text-white">Feature</div>
                <div className="font-semibold text-white text-center">Claude 3</div>
                <div className="font-semibold text-white text-center">GPT-4</div>
                <div className="font-semibold text-white text-center">Impact</div>
                <div className="font-semibold text-white text-center">Winner</div>
              </div>

              {/* Feature Rows */}
              <div className="divide-y divide-white/10">
                {featureComparison.map((row, index) => (
                  <motion.div
                    key={row.feature}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.05 }}
                    className="grid grid-cols-5 gap-4 p-6 hover:bg-white/5 transition-colors"
                  >
                    <div>
                      <div className="text-white font-medium">{row.feature}</div>
                      <div className="text-gray-400 text-xs">{row.description}</div>
                    </div>
                    <div className={`text-center ${row.advantage === 'claude' ? 'text-blue-400 font-semibold' : 'text-gray-300'}`}>
                      {row.claude}
                    </div>
                    <div className={`text-center ${row.advantage === 'gpt4' ? 'text-green-400 font-semibold' : 'text-gray-300'}`}>
                      {row.gpt4}
                    </div>
                    <div className="text-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        row.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                        row.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {row.impact}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className={`text-sm font-semibold ${
                        row.advantage === 'claude' ? 'text-blue-400' : 'text-green-400'
                      }`}>
                        {row.advantage === 'claude' ? 'Claude' : 'GPT-4'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {selectedComparison === 'reasoning' && (
            <motion.div
              key="reasoning"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Problem Type Selector */}
              <div className="flex gap-2 justify-center">
                {[
                  { id: 'math', label: 'Math Problem' },
                  { id: 'analysis', label: 'Analysis Task' }
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedReasoning(id as 'math' | 'analysis')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedReasoning === id
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Problem Statement */}
              <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-2">Problem:</div>
                <div className="text-white font-semibold">
                  {reasoningExamples[selectedReasoning].problem}
                </div>
              </div>

              {/* Side-by-side Reasoning */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-blue-400 text-sm font-semibold">Claude&apos;s Approach</div>
                    <button
                      onClick={() => handleCopy(reasoningExamples[selectedReasoning].claudeApproach)}
                      className="bg-blue-500/20 hover:bg-blue-500/30 p-1 rounded transition-colors"
                    >
                      <Copy className="w-3 h-3 text-blue-400" />
                    </button>
                  </div>
                  <pre className="text-blue-300 text-sm whitespace-pre-wrap">
                    {reasoningExamples[selectedReasoning].claudeApproach}
                  </pre>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-green-400 text-sm font-semibold">GPT-4&apos;s Approach</div>
                    <button
                      onClick={() => handleCopy(reasoningExamples[selectedReasoning].gptApproach)}
                      className="bg-green-500/20 hover:bg-green-500/30 p-1 rounded transition-colors"
                    >
                      <Copy className="w-3 h-3 text-green-400" />
                    </button>
                  </div>
                  <pre className="text-green-300 text-sm whitespace-pre-wrap">
                    {reasoningExamples[selectedReasoning].gptApproach}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}

          {selectedComparison === 'verbosity' && (
            <motion.div
              key="verbosity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Response Style Comparison</h3>
              
              <div className="space-y-4">
                {verbosityComparison.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white text-sm">{metric.aspect}</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-blue-400">Claude: {metric.claude}%</span>
                        <span className="text-green-400">GPT-4: {metric.gpt4}%</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-blue-500/10 rounded h-2 relative">
                        <div 
                          className="bg-blue-400 h-2 rounded"
                          style={{ width: `${metric.claude}%` }}
                        />
                      </div>
                      <div className="bg-green-500/10 rounded h-2 relative">
                        <div 
                          className="bg-green-400 h-2 rounded"
                          style={{ width: `${metric.gpt4}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                  <Brain className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <h4 className="text-blue-400 font-semibold mb-1">Claude Style</h4>
                  <p className="text-blue-300 text-sm">More thorough, explains reasoning, provides context</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                  <Zap className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <h4 className="text-green-400 font-semibold mb-1">GPT-4 Style</h4>
                  <p className="text-green-300 text-sm">More concise, direct answers, efficient communication</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Use Case Recommendations */}
        <motion.div
          variants={fadeInUp}
          className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <Target className="w-5 h-5" />
            When to Choose Each Model
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-blue-400 font-semibold text-lg">Choose Claude When:</h4>
              <div className="space-y-3">
                {[
                  'Processing long documents (50+ pages)',
                  'Need detailed explanations and reasoning',
                  'Want natural conversation flow',
                  'Require nuanced safety handling',
                  'Working with complex instructions',
                  'Need extensive context retention'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-green-400 font-semibold text-lg">Choose GPT-4 When:</h4>
              <div className="space-y-3">
                {[
                  'Need fast response times',
                  'Want concise, direct answers',
                  'Require function calling/APIs',
                  'Working with structured data',
                  'Need vision capabilities',
                  'Building automated systems'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
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