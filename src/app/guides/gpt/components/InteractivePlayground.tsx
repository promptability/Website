'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  TestTube, 
  Copy, 
  Play, 
  Settings, 
  BookOpen,
  Save,
  Share2,
  RotateCcw,
  Zap,
  Brain,
  Code,
  MessageSquare
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const promptTemplates = [
  {
    id: 'analysis',
    category: 'Analysis',
    name: 'Data Analysis Template',
    template: 'Analyze the following data and provide:\n1. Key insights and patterns\n2. Statistical significance\n3. Actionable recommendations\n4. Potential limitations\n\nData: [INSERT DATA]'
  },
  {
    id: 'creative',
    category: 'Creative',
    name: 'Content Creation',
    template: 'Create [CONTENT TYPE] for [TARGET AUDIENCE] about [TOPIC] that:\n- Matches [BRAND VOICE] tone\n- Includes [KEY MESSAGES]\n- Follows [FORMAT] structure\n- Achieves [SPECIFIC GOAL]'
  },
  {
    id: 'technical',
    category: 'Technical',
    name: 'Code Review',
    template: 'Review this code and provide:\n1. Code quality assessment\n2. Potential bugs or issues\n3. Performance improvements\n4. Best practice recommendations\n5. Refactored version if needed\n\n```[LANGUAGE]\n[CODE_HERE]\n```'
  },
  {
    id: 'business',
    category: 'Business',
    name: 'Strategic Planning',
    template: 'Develop a strategic plan for [OBJECTIVE] considering:\n- Current market conditions\n- Available resources: [RESOURCES]\n- Timeline: [TIMEFRAME]\n- Success metrics: [METRICS]\n- Risk factors and mitigation'
  }
];

const parameterPresets = {
  'Creative Writing': { temperature: 0.9, top_p: 1.0, model: 'gpt-4' },
  'Code Generation': { temperature: 0.3, top_p: 0.8, model: 'gpt-4' },
  'Data Analysis': { temperature: 0.2, top_p: 0.7, model: 'gpt-4' },
  'General Purpose': { temperature: 0.7, top_p: 0.9, model: 'gpt-3.5' }
};

export default function InteractivePlayground() {
  const [systemMessage, setSystemMessage] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [parameters, setParameters] = useState(parameterPresets['General Purpose']);
  const [selectedPreset, setSelectedPreset] = useState('General Purpose');
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState('');
  const [outputMetrics, setOutputMetrics] = useState({ tokens: 0, time: 0, cost: 0 });
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // Listen for custom events from other components
  useEffect(() => {
    const handlePopulatePlayground = (event: CustomEvent) => {
      setUserMessage(event.detail.prompt);
    };

    window.addEventListener('populatePlayground', handlePopulatePlayground as EventListener);
    return () => {
      window.removeEventListener('populatePlayground', handlePopulatePlayground as EventListener);
    };
  }, []);

  const handleGenerate = () => {
    if (!userMessage.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setOutput(`Generated response based on your prompt:\n\n"${userMessage}"\n\nThis would be the actual GPT response with your specified parameters and system message.`);
      setOutputMetrics({
        tokens: Math.floor(Math.random() * 500) + 100,
        time: Math.floor(Math.random() * 3) + 1,
        cost: parseFloat((Math.random() * 0.1).toFixed(4))
      });
      setIsGenerating(false);
    }, 2000);
  };

  const loadTemplate = (template: string) => {
    setUserMessage(template);
    setSelectedTemplate(template);
  };

  const savePrompt = () => {
    if (userMessage.trim() && !savedPrompts.includes(userMessage)) {
      setSavedPrompts(prev => [...prev, userMessage]);
    }
  };

  const loadPreset = (presetName: string) => {
    setParameters(parameterPresets[presetName as keyof typeof parameterPresets]);
    setSelectedPreset(presetName);
    setSelectedModel(parameterPresets[presetName as keyof typeof parameterPresets].model);
  };

  return (
    <section id="playground" className="py-16">
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
          Interactive Playground
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 mb-12 text-lg"
        >
          Test your prompts with full parameter control and real-time feedback.
        </motion.p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Laboratory */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <TestTube className="w-6 h-6 text-white/80" />
                  <h3 className="text-xl font-semibold text-white">GPT Prompt Laboratory</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={savePrompt}
                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg border border-white/20 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg border border-white/20 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Model Selector */}
              <div className="flex gap-2 mb-6">
                {['gpt-3.5', 'gpt-4', 'gpt-4.1'].map((model) => (
                  <button
                    key={model}
                    onClick={() => setSelectedModel(model)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedModel === model
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {model.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* System Message */}
              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-2 text-white text-sm font-medium">
                  <MessageSquare className="w-4 h-4" />
                  System Message (Optional)
                </label>
                <textarea
                  value={systemMessage}
                  onChange={(e) => setSystemMessage(e.target.value)}
                  placeholder="You are a helpful assistant that..."
                  className="w-full h-20 bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 text-sm"
                />
              </div>

              {/* User Message */}
              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-2 text-white text-sm font-medium">
                  <Brain className="w-4 h-4" />
                  Your Prompt
                </label>
                <textarea
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Enter your prompt here..."
                  className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 text-sm"
                />
              </div>

              {/* Controls */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleGenerate}
                  disabled={!userMessage.trim() || isGenerating}
                  className="bg-white text-black font-semibold px-6 py-2 rounded-lg disabled:opacity-50 flex items-center gap-2 hover:bg-white/90 transition-colors"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Generate Response
                    </>
                  )}
                </button>

                <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2 rounded-lg border border-white/20 transition-colors flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Clear All
                </button>
              </div>

              {/* Output */}
              {output && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-semibold">Generated Response:</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(output)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        <Copy className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <pre className="text-white text-sm whitespace-pre-wrap">{output}</pre>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                      <div className="text-white font-bold">{outputMetrics.tokens}</div>
                      <div className="text-gray-400 text-xs">Tokens</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                      <div className="text-white font-bold">{outputMetrics.time}s</div>
                      <div className="text-gray-400 text-xs">Response Time</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                      <div className="text-white font-bold">${outputMetrics.cost}</div>
                      <div className="text-gray-400 text-xs">Cost</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Sidebar Tools */}
          <motion.div
            variants={fadeInUp}
            className="space-y-6"
          >
            {/* Parameter Controls */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-5 h-5 text-white/80" />
                <h4 className="text-lg font-semibold text-white">Parameters</h4>
              </div>

              {/* Presets */}
              <div className="grid grid-cols-1 gap-2 mb-4">
                {Object.keys(parameterPresets).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => loadPreset(preset)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                      selectedPreset === preset
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Temperature Slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white text-sm">Temperature</span>
                  <span className="text-gray-400 text-sm">{parameters.temperature}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={parameters.temperature}
                  onChange={(e) => setParameters(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none"
                />
              </div>
            </div>

            {/* Template Library */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-white/80" />
                <h4 className="text-lg font-semibold text-white">Templates</h4>
              </div>
              <div className="space-y-3">
                {promptTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => loadTemplate(template.template)}
                    className="w-full text-left p-3 bg-black/20 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                  >
                    <div className="text-white text-sm font-medium mb-1">{template.name}</div>
                    <div className="text-gray-400 text-xs">{template.category}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Saved Prompts */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Save className="w-5 h-5 text-white/80" />
                <h4 className="text-lg font-semibold text-white">Saved Prompts</h4>
                <span className="text-gray-400 text-sm">({savedPrompts.length})</span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {savedPrompts.length > 0 ? (
                  savedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setUserMessage(prompt)}
                      className="w-full text-left p-2 bg-black/20 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                    >
                      <div className="text-white text-sm truncate">
                        "{prompt.slice(0, 50)}{prompt.length > 50 ? '...' : ''}"
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-gray-500 text-sm text-center py-4">
                    No saved prompts yet
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Session Stats</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Prompts Tested:</span>
                  <span className="text-white">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Tokens:</span>
                  <span className="text-white">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Cost:</span>
                  <span className="text-white">$0.00</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}