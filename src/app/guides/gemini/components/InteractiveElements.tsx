'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  TestTube, 
  Copy, 
  Upload, 
  Search, 
  Zap, 
  Settings,
  BookOpen,
  Download
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const promptTemplates = [
  {
    id: 'analysis',
    name: 'Analysis Template',
    template: 'Analyze [TOPIC] and provide:\n1. Current state overview\n2. Key trends and patterns\n3. Potential challenges\n4. Recommended actions\n5. Success metrics to track'
  },
  {
    id: 'creative',
    name: 'Creative Brief',
    template: 'Create [CONTENT TYPE] for [AUDIENCE] about [TOPIC] that:\n- Matches [BRAND VOICE] tone\n- Includes [KEY MESSAGES]\n- Follows [FORMAT REQUIREMENTS]\n- Achieves [SPECIFIC GOAL]'
  },
  {
    id: 'technical',
    name: 'Technical Explanation',
    template: 'Explain [TECHNICAL CONCEPT] for [SKILL LEVEL] audience:\n1. Simple definition\n2. How it works (step-by-step)\n3. Real-world applications\n4. Common misconceptions\n5. Further learning resources'
  }
];

export default function InteractiveElements() {
  const [prompt, setPrompt] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [result, setResult] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // Listen for custom events from other components
  useEffect(() => {
    const handlePopulateTester = (event: CustomEvent) => {
      setPrompt(event.detail.prompt);
    };

    window.addEventListener('populateTester', handlePopulateTester as EventListener);
    return () => {
      window.removeEventListener('populateTester', handlePopulateTester as EventListener);
    };
  }, []);

  const handleOptimize = () => {
    setIsOptimizing(true);
    // Simulate optimization
    setTimeout(() => {
      setResult(`Optimized version of your prompt:\n\n${prompt}\n\nImprovements:\n• Added specific context\n• Included output format\n• Enhanced clarity\n• Better structure`);
      setIsOptimizing(false);
    }, 2000);
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

  const loadTemplate = (template: string) => {
    setPrompt(template);
    setSelectedTemplate(template);
  };

  return (
    <section id="try-live" className="py-16">
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
          Try It Live
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 mb-12 text-lg"
        >
          Test Gemini prompts with our interactive tools and see the difference.
        </motion.p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Tester */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <TestTube className="w-6 h-6 text-white/80" />
                <h3 className="text-xl font-semibold text-white">Gemini Prompt Tester</h3>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Web Search:</span>
                  <button
                    onClick={() => setSearchEnabled(!searchEnabled)}
                    className={`w-12 h-6 rounded-full border transition-colors ${
                      searchEnabled 
                        ? 'bg-green-500/20 border-green-500/40' 
                        : 'bg-white/10 border-white/20'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      searchEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Input Area */}
              <div className="space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your Gemini prompt here..."
                  className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-white/30"
                />

                <div className="flex gap-3">
                  <button
                    onClick={handleOptimize}
                    disabled={!prompt.trim() || isOptimizing}
                    className="bg-white text-black font-semibold px-6 py-2 rounded-lg disabled:opacity-50 flex items-center gap-2 hover:bg-white/90 transition-colors"
                  >
                    {isOptimizing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></div>
                        Testing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Test Prompt
                      </>
                    )}
                  </button>

                  <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2 rounded-lg border border-white/20 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Add Image
                  </button>
                </div>
              </div>

              {/* Results */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-black/20 border border-white/10 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Optimization Results:</span>
                    <button
                      onClick={() => handleCopy(result)}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  <pre className="text-white text-sm whitespace-pre-wrap">{result}</pre>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Sidebar Tools */}
          <motion.div
            variants={fadeInUp}
            className="space-y-6"
          >
            {/* Template Library */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-white/80" />
                <h4 className="text-lg font-semibold text-white">Quick Templates</h4>
              </div>
              <div className="space-y-3">
                {promptTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => loadTemplate(template.template)}
                    className="w-full text-left p-3 bg-black/20 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                  >
                    <div className="text-white text-sm font-medium mb-1">{template.name}</div>
                    <div className="text-gray-400 text-xs">Click to load template</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Reference */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-5 h-5 text-white/80" />
                <h4 className="text-lg font-semibold text-white">Quick Reference</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Context Limit:</span>
                  <span className="text-white">32K tokens</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Images:</span>
                  <span className="text-white">1 per conversation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Web Search:</span>
                  <span className="text-white">Real-time</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Languages:</span>
                  <span className="text-white">100+</span>
                </div>
              </div>
            </div>

            {/* Download Cheat Sheet */}
            <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg border border-white/20 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download Cheat Sheet
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}