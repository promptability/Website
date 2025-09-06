'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Image as ImageIcon, 
  Video, 
  Code, 
  Search, 
  Brain, 
  FileText,
  Upload,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  Copy
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function GeminiTricks() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('text');
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

  const multimodalExamples = {
    image: 'Analyze this image and identify all the objects, people, and text visible. Provide a detailed description including colors, positioning, and any notable details.',
    video: 'Watch this video and create a summary including: key events, main characters, visual style, and overall message or theme.',
    document: 'Read this document and extract: main arguments, supporting evidence, conclusion, and any action items or recommendations.'
  };

  const codeExamples = {
    function: 'Create a Python function that takes a list of dictionaries and returns the top 3 items sorted by a specified key. Include error handling and type hints.',
    debug: 'Review this code and identify potential bugs, performance issues, and suggest improvements with explanations.',
    explain: 'Explain this code step-by-step, focusing on the algorithm and why each part is necessary.'
  };

  return (
    <section id="gemini-tricks" className="py-16">
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
          Gemini-Specific Tricks
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 mb-12 text-lg"
        >
          Leverage Gemini's unique capabilities for maximum effectiveness.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Multimodal Magic */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <ImageIcon className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white">Multimodal Magic</h3>
            </div>

            <div className="space-y-4">
              {/* Image Upload Zone */}
              <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/30 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Drop an image here to analyze</p>
              </div>

              {/* Media Type Selector */}
              <div className="flex gap-2">
                {Object.keys(multimodalExamples).map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveDemo(type)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeDemo === type
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/15'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              {/* Example Prompt */}
              {activeDemo && (
                <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Example Prompt:</span>
                    <button
                      onClick={() => handleCopy(multimodalExamples[activeDemo as keyof typeof multimodalExamples])}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      <Copy className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                  <code className="text-white text-sm">
                    {multimodalExamples[activeDemo as keyof typeof multimodalExamples]}
                  </code>
                </div>
              )}

              {/* Warning */}
              <div className="flex items-start gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-yellow-300 text-sm">
                  <strong>Limitation:</strong> Gemini can only process one image at a time per conversation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Code Mode */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white">Code Mode</h3>
            </div>

            <div className="space-y-4">
              {/* Mode Toggle */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-gray-400">Mode:</span>
                <button
                  onClick={() => setSelectedFormat(selectedFormat === 'text' ? 'code' : 'text')}
                  className="flex items-center gap-2"
                >
                  {selectedFormat === 'code' ? (
                    <ToggleRight className="w-5 h-5 text-white" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="text-sm text-white">{selectedFormat === 'code' ? 'Code' : 'Text'}</span>
                </button>
              </div>

              {/* Code Examples */}
              <div className="space-y-3">
                {Object.entries(codeExamples).map(([type, example]) => (
                  <div key={type} className="bg-black/20 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400 capitalize">{type} Example:</span>
                      <button
                        onClick={() => handleCopy(example)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        <Copy className="w-3 h-3 text-gray-400" />
                      </button>
                    </div>
                    <code className="text-white text-sm">{example}</code>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Web Search Grounding */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Search className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white">Web Search Grounding</h3>
            </div>

            <div className="space-y-4">
              {/* Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-white">Enable Real-time Search</span>
                <button
                  onClick={() => setWebSearchEnabled(!webSearchEnabled)}
                  className="flex items-center gap-2"
                >
                  {webSearchEnabled ? (
                    <ToggleRight className="w-6 h-6 text-green-400" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Example */}
              <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Search-Enhanced Prompt:</span>
                  <button
                    onClick={() => handleCopy('Using web search, find the latest news about AI regulation in the EU from the past month and summarize the key policy changes.')}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    <Copy className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
                <code className="text-white text-sm">
                  Using web search, find the latest news about AI regulation in the EU from the past month and summarize the key policy changes.
                </code>
              </div>

              {/* Citation Preview */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <div className="text-sm text-blue-300 mb-2">Citations will appear like:</div>
                <div className="text-xs text-gray-300">
                  "According to recent reports [1], the EU has implemented..." 
                  <br />
                  <span className="text-blue-400">[1] europa.eu - AI Act Implementation Guidelines</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Prompt Reflection Trick */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white">Prompt Reflection</h3>
            </div>

            <div className="space-y-4">
              <p className="text-gray-400 text-sm">
                Add "Does that make sense?" to get Gemini to double-check its work.
              </p>

              {/* Before/After */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="text-red-400 text-sm mb-2">Without Reflection:</div>
                  <code className="text-red-300 text-sm">
                    "Calculate the ROI for this marketing campaign"
                  </code>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="text-green-400 text-sm mb-2">With Reflection:</div>
                  <code className="text-green-300 text-sm">
                    "Calculate the ROI for this marketing campaign. Show your work step-by-step and double-check the math. Does that make sense?"
                  </code>
                  <button
                    onClick={() => handleCopy('Calculate the ROI for this marketing campaign. Show your work step-by-step and double-check the math. Does that make sense?')}
                    className="ml-2 p-1 hover:bg-green-500/20 rounded transition-colors"
                  >
                    <Copy className="w-3 h-3 text-green-400" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}