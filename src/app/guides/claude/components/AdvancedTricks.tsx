'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  FileText, 
  Brain, 
  Code, 
  Upload, 
  BarChart3, 
  Plus, 
  Minus,
  Copy,
  Layers,
  Tag,
  ChevronDown,
  Zap
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const contextBestPractices = [
  {
    title: 'Reference at Start',
    description: 'Place important reference material at the beginning of your prompt',
    example: '<document>\n[Long reference text here]\n</document>\n\nQuestion: Based on the document above, what are the key findings?',
    benefit: 'Better recall and accuracy'
  },
  {
    title: 'Question at End',
    description: 'Put your specific question or task at the end for better focus',
    example: '<context>\nProject background and requirements...\n</context>\n\nCreate a project timeline based on this context.',
    benefit: 'Clearer task understanding'
  },
  {
    title: 'XML Structure',
    description: 'Use XML tags to organize different parts of your prompt',
    example: '<role>Expert analyst</role>\n<task>Analyze data</task>\n<format>JSON output</format>',
    benefit: 'Better instruction following'
  },
  {
    title: 'Progressive Detail',
    description: 'Start broad, then add specific details and constraints',
    example: 'Write a blog post about AI.\n\nSpecifics:\n- Target: Business executives\n- Length: 1000 words\n- Tone: Professional but accessible',
    benefit: 'More targeted responses'
  }
];

const xmlTags = [
  { tag: 'document', purpose: 'Wrap reference documents', example: '<document>\nReference text here\n</document>' },
  { tag: 'question', purpose: 'Highlight the main question', example: '<question>\nWhat are the key insights?\n</question>' },
  { tag: 'context', purpose: 'Provide background information', example: '<context>\nProject background...\n</context>' },
  { tag: 'role', purpose: 'Define Claude&apos;s persona', example: '<role>\nExpert data analyst\n</role>' },
  { tag: 'task', purpose: 'Specify the exact task', example: '<task>\nAnalyze the following data\n</task>' },
  { tag: 'format', purpose: 'Specify output format', example: '<format>\nJSON with summary and insights\n</format>' },
  { tag: 'examples', purpose: 'Provide example patterns', example: '<examples>\nInput: X\nOutput: Y\n</examples>' },
  { tag: 'constraints', purpose: 'Set boundaries and limits', example: '<constraints>\nKeep under 500 words\n</constraints>' }
];

const chainOfThoughtTemplates = [
  {
    name: 'Problem Solving',
    template: 'Let me think through this step by step:\n\n<thinking>\n1. First, I need to understand...\n2. Then I should consider...\n3. The key factors are...\n4. Therefore...\n</thinking>\n\nBased on this analysis:'
  },
  {
    name: 'Analysis Task',
    template: 'I&apos;ll analyze this systematically:\n\n<analysis>\n- Data review: [findings]\n- Pattern identification: [patterns]\n- Key insights: [insights]\n- Implications: [implications]\n</analysis>\n\nConclusion:'
  },
  {
    name: 'Creative Task',
    template: 'Let me approach this creatively:\n\n<creative_process>\n- Understanding the goal: [goal]\n- Brainstorming ideas: [ideas]\n- Evaluating options: [evaluation]\n- Refining the best approach: [refinement]\n</creative_process>\n\nFinal creative output:'
  }
];

export default function AdvancedTricks() {
  const [selectedPractice, setSelectedPractice] = useState<number | null>(null);
  const [contextTokens, setContextTokens] = useState(50000);
  const [selectedXmlTag, setSelectedXmlTag] = useState<number | null>(null);
  const [builtPrompt, setBuiltPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
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

  const addXmlTag = (tag: string, example: string) => {
    setBuiltPrompt(prev => prev + (prev ? '\n\n' : '') + example);
  };

  return (
    <section id="advanced" className="py-16">
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
          Advanced Tricks
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 mb-12 text-lg"
        >
          Master Claude&apos;s unique capabilities with these advanced prompting techniques.
        </motion.p>

        {/* 200K Context Window Master */}
        <motion.div
          variants={fadeInUp}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-white/80" />
            <h3 className="text-xl font-semibold text-white">200K Context Window Mastery</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Token Visualizer */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Context Usage</span>
                <span className="text-gray-400 text-sm">{contextTokens.toLocaleString()} / 200,000 tokens</span>
              </div>
              
              <div className="w-full bg-white/10 rounded-lg h-4 relative overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg"
                  style={{ width: `${(contextTokens / 200000) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 100 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {Math.round((contextTokens / 200000) * 100)}%
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setContextTokens(Math.max(1000, contextTokens - 10000))}
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-lg border border-white/20 transition-colors"
                >
                  <Minus className="w-4 h-4 text-white" />
                </button>
                <input
                  type="range"
                  min="1000"
                  max="200000"
                  step="1000"
                  value={contextTokens}
                  onChange={(e) => setContextTokens(parseInt(e.target.value))}
                  className="flex-1"
                />
                <button
                  onClick={() => setContextTokens(Math.min(200000, contextTokens + 10000))}
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-lg border border-white/20 transition-colors"
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Document Upload Simulator */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Document Upload Simulator</h4>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-white/60 mx-auto mb-2" />
                <div className="text-white/80 text-sm mb-2">Drop documents here</div>
                <div className="text-gray-400 text-xs">Up to 200K tokens (~150,000 words)</div>
              </div>
              
              <div className="text-center">
                <div className="text-white text-sm font-semibold mb-1">Capacity</div>
                <div className="text-gray-400 text-xs">
                  ≈ 150,000 words | ≈ 400 pages | ≈ 1.5MB text
                </div>
              </div>
            </div>
          </div>

          {/* Best Practices Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {contextBestPractices.map((practice, index) => (
              <div
                key={index}
                className={`bg-white/5 border border-white/10 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedPractice === index ? 'bg-white/10 border-white/20' : 'hover:bg-white/10'
                }`}
                onClick={() => setSelectedPractice(selectedPractice === index ? null : index)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold text-sm">{practice.title}</h4>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                    selectedPractice === index ? 'rotate-180' : ''
                  }`} />
                </div>
                
                <p className="text-gray-400 text-sm mb-2">{practice.description}</p>
                
                <AnimatePresence>
                  {selectedPractice === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <div className="bg-black/20 border border-white/10 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-400">Example:</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(practice.example);
                            }}
                            className="bg-white/10 hover:bg-white/20 p-1 rounded transition-colors"
                          >
                            <Copy className="w-3 h-3 text-white" />
                          </button>
                        </div>
                        <code className="text-white text-xs whitespace-pre-wrap">{practice.example}</code>
                      </div>
                      <div className="text-green-400 text-xs">
                        ✓ {practice.benefit}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* XML/HTML Tag Formatter */}
        <motion.div
          variants={fadeInUp}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-6 h-6 text-white/80" />
            <h3 className="text-xl font-semibold text-white">XML/HTML Tag Formatter</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Tag Library */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Common Tags Library</h4>
              <div className="grid grid-cols-2 gap-2">
                {xmlTags.map((tagInfo, index) => (
                  <button
                    key={index}
                    onClick={() => addXmlTag(tagInfo.tag, tagInfo.example)}
                    className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-3 py-2 rounded-lg border border-white/20 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="w-3 h-3" />
                      &lt;{tagInfo.tag}&gt;
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{tagInfo.purpose}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Builder */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-semibold">Built Prompt</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(builtPrompt)}
                    className="bg-white/10 hover:bg-white/20 p-2 rounded-lg border border-white/20 transition-colors"
                  >
                    <Copy className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => setBuiltPrompt('')}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded-lg border border-red-500/30 transition-colors text-sm"
                  >
                    Clear
                  </button>
                </div>
              </div>
              
              <textarea
                value={builtPrompt}
                onChange={(e) => setBuiltPrompt(e.target.value)}
                placeholder="Click tags above to build your structured prompt..."
                className="w-full h-48 bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 text-sm font-mono resize-none"
              />
              
              <div className="text-xs text-gray-400">
                Tokens: ~{Math.ceil(builtPrompt.length / 4)} | Words: ~{builtPrompt.split(' ').length}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chain-of-Thought Interface */}
        <motion.div
          variants={fadeInUp}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-white/80" />
            <h3 className="text-xl font-semibold text-white">Chain-of-Thought Templates</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {chainOfThoughtTemplates.map((template, index) => (
              <div
                key={index}
                className={`bg-white/5 border border-white/10 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedTemplate === index ? 'bg-white/10 border-white/20' : 'hover:bg-white/10'
                }`}
                onClick={() => setSelectedTemplate(selectedTemplate === index ? null : index)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-semibold text-sm">{template.name}</h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(template.template);
                    }}
                    className="bg-white/10 hover:bg-white/20 p-2 rounded-lg border border-white/20 transition-colors"
                  >
                    <Copy className="w-4 h-4 text-white" />
                  </button>
                </div>
                
                {selectedTemplate === index && (
                  <div className="bg-black/20 border border-white/10 rounded-lg p-3 mt-3">
                    <code className="text-white text-xs whitespace-pre-wrap">
                      {template.template}
                    </code>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Performance Visualization */}
          <div className="mt-6 bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-white/80" />
              <span className="text-white text-sm font-semibold">Chain-of-Thought Performance</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-white">85%</div>
                <div className="text-xs text-gray-400">Reasoning Accuracy</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">92%</div>
                <div className="text-xs text-gray-400">Step Clarity</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">78%</div>
                <div className="text-xs text-gray-400">Error Detection</div>
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