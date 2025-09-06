'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  TestTube, 
  Brain, 
  Zap, 
  Clock, 
  Send, 
  Copy, 
  RotateCcw,
  Download,
  Share2,
  Settings,
  BarChart3,
  FileText,
  Code,
  MessageSquare,
  Target,
  Sliders,
  ChevronDown
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const claudeModels = [
  {
    id: 'opus',
    name: 'Claude 3 Opus',
    description: 'Most capable model for complex tasks',
    speed: 'Slow',
    capability: 'Highest',
    cost: 'High',
    bestFor: 'Research, analysis, creative writing'
  },
  {
    id: 'sonnet',
    name: 'Claude 3 Sonnet',
    description: 'Balanced performance and speed',
    speed: 'Medium',
    capability: 'High',
    cost: 'Medium',
    bestFor: 'General tasks, coding, conversations'
  },
  {
    id: 'haiku',
    name: 'Claude 3 Haiku',
    description: 'Fastest model for quick tasks',
    speed: 'Fast',
    capability: 'Good',
    cost: 'Low',
    bestFor: 'Simple queries, quick summaries'
  }
];

const templateCategories = [
  {
    name: 'Analysis',
    templates: [
      'Document summarization with key insights',
      'Competitive analysis framework',
      'Risk assessment template'
    ]
  },
  {
    name: 'Creative',
    templates: [
      'Story writing with character development',
      'Marketing copy with persuasive elements',
      'Blog post with SEO optimization'
    ]
  },
  {
    name: 'Technical',
    templates: [
      'Code review with security focus',
      'API documentation generator',
      'Technical specification writer'
    ]
  }
];

const contextLevels = [
  { size: '1K', tokens: 1000, description: 'Short prompt' },
  { size: '10K', tokens: 10000, description: 'Medium document' },
  { size: '50K', tokens: 50000, description: 'Long document' },
  { size: '100K', tokens: 100000, description: 'Very long document' },
  { size: '200K', tokens: 200000, description: 'Maximum context' }
];

export default function InteractiveClaudeLab() {
  const [selectedModel, setSelectedModel] = useState('sonnet');
  const [systemMessage, setSystemMessage] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);
  const [selectedContext, setSelectedContext] = useState(10000);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Listen for external prompt population
  useEffect(() => {
    const handlePopulate = (event: any) => {
      setUserMessage(event.detail.prompt);
    };

    window.addEventListener('populateClaudeLab', handlePopulate);
    return () => window.removeEventListener('populateClaudeLab', handlePopulate);
  }, []);

  useEffect(() => {
    const totalTokens = Math.ceil((systemMessage.length + userMessage.length) / 4);
    setTokenCount(totalTokens);
  }, [systemMessage, userMessage]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const simulateResponse = () => {
    setIsLoading(true);
    
    // Simulate API call delay based on model
    const delays = { opus: 3000, sonnet: 2000, haiku: 1000 };
    const delay = delays[selectedModel as keyof typeof delays];
    
    setTimeout(() => {
      const sampleResponses = {
        opus: 'I&apos;ll provide a thorough analysis of your request. Let me think through this systematically and provide comprehensive insights with detailed reasoning...',
        sonnet: 'I understand your request. Here&apos;s a balanced response that addresses your key points while maintaining accuracy and helpfulness...',
        haiku: 'Here&apos;s a concise response to your query. [Quick, direct answer with essential information]'
      };
      
      setResponse(sampleResponses[selectedModel as keyof typeof sampleResponses]);
      setIsLoading(false);
    }, delay);
  };

  const exportConversation = () => {
    const conversation = {
      model: selectedModel,
      systemMessage,
      userMessage,
      response,
      metadata: {
        timestamp: new Date().toISOString(),
        tokenCount,
        temperature
      }
    };
    
    const blob = new Blob([JSON.stringify(conversation, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'claude-conversation.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="lab" className="py-16">
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
          Interactive Claude Lab
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 mb-12 text-lg"
        >
          Test prompts, compare models, and optimize your Claude interactions in real-time.
        </motion.p>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Model Selection Panel */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-1 space-y-6"
          >
            {/* Model Selector */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Select Model
              </h3>
              
              <div className="space-y-3">
                {claudeModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedModel === model.id
                        ? 'bg-white/20 border-white/30 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="font-semibold text-sm mb-1">{model.name}</div>
                    <div className="text-xs mb-2">{model.description}</div>
                    <div className="flex justify-between text-xs">
                      <span>Speed: {model.speed}</span>
                      <span>Cost: {model.cost}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Context Window Meter */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Context Usage
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Current:</span>
                  <span className="text-white">{tokenCount.toLocaleString()} tokens</span>
                </div>
                
                <div className="w-full bg-white/10 rounded-lg h-3 relative overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg"
                    style={{ width: `${Math.min((tokenCount / 200000) * 100, 100)}%` }}
                    transition={{ type: 'spring', stiffness: 100 }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0</span>
                  <span>200K tokens</span>
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between text-white font-semibold mb-4"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Advanced Settings
                </div>
                <motion.div
                  animate={{ rotate: showAdvanced ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-white text-sm">Temperature</span>
                        <span className="text-gray-400 text-sm">{temperature}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="text-white text-sm mb-2 block">Context Window Limit</label>
                      <select
                        value={selectedContext}
                        onChange={(e) => setSelectedContext(parseInt(e.target.value))}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                      >
                        {contextLevels.map((level) => (
                          <option key={level.tokens} value={level.tokens}>
                            {level.size} - {level.description}
                          </option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Main Testing Interface */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <TestTube className="w-5 h-5" />
                Claude Testing Environment
              </h3>
              
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSystemMessage('');
                    setUserMessage('');
                    setResponse('');
                  }}
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-lg border border-white/20 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={exportConversation}
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-lg border border-white/20 transition-colors"
                >
                  <Download className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => handleCopy(`System: ${systemMessage}\n\nUser: ${userMessage}\n\nClaude: ${response}`)}
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-lg border border-white/20 transition-colors"
                >
                  <Share2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* System Message */}
              <div>
                <label className="text-white text-sm mb-2 block flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  System Message (Optional)
                </label>
                <textarea
                  value={systemMessage}
                  onChange={(e) => setSystemMessage(e.target.value)}
                  placeholder="You are a helpful AI assistant specialized in..."
                  className="w-full h-20 bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 text-sm resize-none"
                />
              </div>

              {/* User Message */}
              <div>
                <label className="text-white text-sm mb-2 block flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Your Prompt
                </label>
                <textarea
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Enter your prompt here. Use XML tags for structured input like <document></document> or <task></task>..."
                  className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 text-sm resize-none"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div>Model: <span className="text-white">{claudeModels.find(m => m.id === selectedModel)?.name}</span></div>
                  <div>Tokens: <span className="text-white">{tokenCount.toLocaleString()}</span></div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    tokenCount > 200000 ? 'bg-red-500/20 text-red-400' :
                    tokenCount > 150000 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {tokenCount > 200000 ? 'Over limit' : 'Within limit'}
                  </div>
                </div>
                
                <button
                  onClick={simulateResponse}
                  disabled={!userMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send to Claude
                    </>
                  )}
                </button>
              </div>

              {/* Response Area */}
              {(response || isLoading) && (
                <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-white text-sm font-semibold flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Claude&apos;s Response
                    </label>
                    {response && (
                      <button
                        onClick={() => handleCopy(response)}
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-lg border border-white/20 transition-colors"
                      >
                        <Copy className="w-4 h-4 text-white" />
                      </button>
                    )}
                  </div>
                  
                  {isLoading ? (
                    <div className="text-gray-400 text-sm italic">
                      Claude is thinking...
                    </div>
                  ) : (
                    <div className="text-white text-sm whitespace-pre-wrap">
                      {response}
                    </div>
                  )}
                </div>
              )}

              {/* Response Analysis */}
              {response && !isLoading && (
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <BarChart3 className="w-5 h-5 text-white/80 mx-auto mb-1" />
                    <div className="text-white text-sm font-semibold">Response Quality</div>
                    <div className="text-gray-400 text-xs">Analyzing...</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <Clock className="w-5 h-5 text-white/80 mx-auto mb-1" />
                    <div className="text-white text-sm font-semibold">Response Time</div>
                    <div className="text-gray-400 text-xs">
                      {selectedModel === 'opus' ? '~3s' : selectedModel === 'sonnet' ? '~2s' : '~1s'}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <Target className="w-5 h-5 text-white/80 mx-auto mb-1" />
                    <div className="text-white text-sm font-semibold">Tokens Used</div>
                    <div className="text-gray-400 text-xs">{Math.ceil(response.length / 4)}</div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Template Quick Access */}
        <motion.div
          variants={fadeInUp}
          className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Code className="w-5 h-5" />
            Quick Template Access
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            {templateCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <h4 className="text-white font-semibold text-sm">{category.name}</h4>
                <div className="space-y-1">
                  {category.templates.map((template, templateIndex) => (
                    <button
                      key={templateIndex}
                      onClick={() => {
                        // Load template example into the lab
                        const examplePrompt = `<task>\n${template}\n</task>\n\n<requirements>\n- Be specific and detailed\n- Use examples where helpful\n- Provide actionable insights\n</requirements>`;
                        setUserMessage(examplePrompt);
                      }}
                      className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-2 transition-colors"
                    >
                      <div className="text-white text-xs">{template}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
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