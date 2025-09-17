'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { glassCard, liquidButton, skeletonPulse, buttonHover } from '@/lib/animations';
import { getPlatformOptions } from '@/lib/platforms';
import { OptimizationResult } from '@/lib/promptOptimizer';
import { ChevronDown, Zap, Loader2, Check, Copy, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AnalysisResult {
  prompt: string;
  platform: string;
  strengthScore: number;
  suggestions: string[];
  metrics: {
    clarity: number;
    specificity: number;
    context: number;
    actionability: number;
  };
}

const examplePrompts = [
  {
    title: "Healthcare AI Blog",
    prompt: "Write a comprehensive blog post about how artificial intelligence is transforming modern healthcare, including specific examples of diagnostic tools and patient care improvements"
  },
  {
    title: "Debug Python Code",
    prompt: "Help me debug this Python function that processes customer data and explain why it's returning incorrect results when handling duplicate entries"
  },
  {
    title: "Social Media Content",
    prompt: "Create engaging social media content for a sustainable fashion brand launching their new eco-friendly collection, targeting environmentally conscious millennials"
  },
  {
    title: "Sales Data Analysis",
    prompt: "Analyze this quarterly sales dataset to identify trends, seasonal patterns, and provide actionable insights for improving revenue in the next quarter"
  },
  {
    title: "Logo Design Brief",
    prompt: "Design a modern, minimalist logo for a tech startup focused on renewable energy solutions, incorporating solar and wind elements with a professional color scheme"
  },
  {
    title: "Project Migration Plan",
    prompt: "Develop a detailed 6-month project plan for migrating our company's legacy CRM system to a cloud-based solution, including timeline, resources, and risk mitigation strategies"
  }
];

export default function DualPromptTester() {
  const { user } = useAuth();
  
  // Optimizer state
  const [optimizerInput, setOptimizerInput] = useState('');
  const [optimizerPlatform, setOptimizerPlatform] = useState('chatgpt');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizerResult, setOptimizerResult] = useState<OptimizationResult | null>(null);

  // Strength checker state
  const [checkerInput, setCheckerInput] = useState('');
  const [checkerPlatform, setCheckerPlatform] = useState('chatgpt');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // UI state
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showOptimizerDropdown, setShowOptimizerDropdown] = useState(false);
  const [showCheckerDropdown, setShowCheckerDropdown] = useState(false);

  const platformOptions = getPlatformOptions();

  const handleOptimize = async () => {
    if (!optimizerInput.trim()) return;
    
    if (!user?.uid) {
      alert('Please sign in to use the prompt optimizer');
      return;
    }

    setIsOptimizing(true);
    setOptimizerResult(null);

    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: optimizerInput, 
          platform: optimizerPlatform,
          userId: user.uid 
        }),
      });

      const data = await response.json();
      if (data.success) {
        setOptimizerResult(data.data);
      } else {
        alert(data.error || 'Failed to optimize prompt');
      }
    } catch (error) {
      console.error('Error optimizing prompt:', error);
      alert('Failed to optimize prompt');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleAnalyze = async () => {
    if (!checkerInput.trim()) return;
    
    if (!user?.uid) {
      alert('Please sign in to use the prompt analyzer');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: checkerInput, 
          platform: checkerPlatform,
          userId: user.uid 
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAnalysisResult(data.data);
      } else {
        alert(data.error || 'Failed to analyze prompt');
      }
    } catch (error) {
      console.error('Error analyzing prompt:', error);
      alert('Failed to analyze prompt');
    } finally {
      setIsAnalyzing(false);
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

  const loadExample = (example: string, tool: 'optimizer' | 'checker') => {
    if (tool === 'optimizer') {
      setOptimizerInput(example);
      setOptimizerResult(null);
    } else {
      setCheckerInput(example);
      setAnalysisResult(null);
    }
  };

  const CircularProgressBar = ({ value, size = 120 }: { value: number; size?: number }) => {
    const radius = (size - 8) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={value >= 80 ? "#00FF88" : value >= 60 ? "#00BBFF" : "#FF3366"}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {value}
            </motion.div>
            <div className="text-xs text-gray-400">Score</div>
          </div>
        </div>
      </div>
    );
  };

  const PlatformDropdown = ({ 
    value, 
    onChange, 
    isOpen, 
    setIsOpen 
  }: { 
    value: string; 
    onChange: (value: string) => void; 
    isOpen: boolean; 
    setIsOpen: (open: boolean) => void; 
  }) => {
    const selectedPlatform = platformOptions.find(p => p.value === value);
    // Get only the first 6 popular platforms for mobile
    const mobilePlatforms = [
      { value: 'chatgpt', label: 'ChatGPT', category: 'Chat AI', color: '#10A37F', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/13/ChatGPT-Logo.png' },
      { value: 'claude', label: 'Claude', category: 'Chat AI', color: '#D97706', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Claude_AI_logo.png' },
      { value: 'gemini', label: 'Gemini', category: 'Chat AI', color: '#4285F4', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/1024px-Google_Gemini_logo.svg.png' },
      { value: 'perplexity', label: 'Perplexity', category: 'Chat AI', color: '#1FB6FF', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Perplexity_AI_logo.svg/1024px-Perplexity_AI_logo.svg.png' },
      { value: 'mistral', label: 'Mistral', category: 'Chat AI', color: '#FF6B35', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Mistral_AI_logo_(2025%E2%80%93).svg/1024px-Mistral_AI_logo_(2025%E2%80%93).svg.png' },
      { value: 'llama', label: 'Llama', category: 'Chat AI', color: '#1877F2', logo: 'https://custom.typingmind.com/assets/models/llama.png' }
    ];
    
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            {selectedPlatform && (
              selectedPlatform.logo ? (
                <img
                  src={selectedPlatform.logo}
                  alt={`${selectedPlatform.label} logo`}
                  className="w-5 h-5 object-contain"
                />
              ) : (
                <div 
                  className="w-5 h-5 rounded-full border border-white/20"
                  style={{ backgroundColor: selectedPlatform.color || '#6B7280' }}
                />
              )
            )}
            <span>{selectedPlatform?.label}</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl z-50 max-h-60 overflow-y-auto"
            >
              {/* Mobile: Show first 6 platforms */}
              <div className="md:hidden">
                {mobilePlatforms.map((platform) => (
                  <button
                    key={platform.value}
                    onClick={() => {
                      onChange(platform.value);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0 flex items-center gap-3"
                  >
                    {platform.logo ? (
                      <img
                        src={platform.logo}
                        alt={`${platform.label} logo`}
                        className="w-5 h-5 object-contain flex-shrink-0"
                      />
                    ) : (
                      <div 
                        className="w-5 h-5 rounded-full border border-white/20 flex-shrink-0"
                        style={{ backgroundColor: platform.color || '#6B7280' }}
                      />
                    )}
                    <div className="flex-1">
                      <div className="font-medium">{platform.label}</div>
                      <div className="text-xs text-gray-400">{platform.category}</div>
                    </div>
                  </button>
                ))}
                
                {/* "See All" button on mobile */}
                <a
                  href="/platforms"
                  className="w-full px-4 py-3 text-left text-blue-400 hover:text-blue-300 hover:bg-white/5 transition-colors border-t border-white/10 flex items-center gap-3 font-medium"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                  <span>See All {platformOptions.length} Platforms →</span>
                </a>
              </div>

              {/* Desktop: Show same 6 popular platforms as mobile */}
              <div className="hidden md:block">
                {mobilePlatforms.map((platform) => (
                  <button
                    key={platform.value}
                    onClick={() => {
                      onChange(platform.value);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0 flex items-center gap-3"
                  >
                    {platform.logo ? (
                      <img
                        src={platform.logo}
                        alt={`${platform.label} logo`}
                        className="w-5 h-5 object-contain flex-shrink-0"
                      />
                    ) : (
                      <div 
                        className="w-5 h-5 rounded-full border border-white/20 flex-shrink-0"
                        style={{ backgroundColor: platform.color || '#6B7280' }}
                      />
                    )}
                    <div className="flex-1">
                      <div className="font-medium">{platform.label}</div>
                      <div className="text-xs text-gray-400">{platform.category}</div>
                    </div>
                  </button>
                ))}
                
                {/* "See All" button on desktop */}
                <a
                  href="/platforms"
                  className="w-full px-4 py-3 text-left text-blue-400 hover:text-blue-300 hover:bg-white/5 transition-colors border-t border-white/10 flex items-center gap-3 font-medium"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                  <span>See All {platformOptions.length} Platforms →</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section className="py-12 md:py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold leading-tight mb-3 sm:mb-4 md:mb-8">
            <span className="text-white">Test Your </span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Prompts</span>
            <br />
            <span className="text-white">Online and </span>
            <span className="text-purple-400">Free!</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-normal leading-normal text-white max-w-4xl mx-auto mt-6">
            Experience the power of AI-driven prompt optimization with our interactive demo. <br />
            Optimize weak prompts or analyze existing ones for strength in real-time.
          </p>
          
          {/* Blue spotlight effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-400/3 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-cyan-400/4 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 relative">
          {/* Central connecting element */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-blue-400/50 to-transparent z-10 hidden lg:block"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full z-20 hidden lg:block animate-pulse"></div>
          {/* TOOL 1 - PROMPT OPTIMIZER */}
          <motion.div
            variants={glassCard}
            initial="initial"
            whileInView="animate"
            whileHover="hover"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/25 transition-all duration-500"
          >
            <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-8 relative">
              <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-white/10 relative border border-white/20">
                <Zap className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-0.5 md:mb-1">Prompt Optimizer</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium">Transform weak prompts into powerful ones</p>
              </div>
            </div>

            {/* Platform Selector */}
            <div className="mb-2 md:mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">AI Platform</label>
              <PlatformDropdown
                value={optimizerPlatform}
                onChange={setOptimizerPlatform}
                isOpen={showOptimizerDropdown}
                setIsOpen={setShowOptimizerDropdown}
              />
            </div>

            {/* Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Enter your weak prompt</label>
              <textarea
                value={optimizerInput}
                onChange={(e) => setOptimizerInput(e.target.value)}
                placeholder="Type your prompt here..."
                className="w-full h-36 bg-gradient-to-br from-black/30 to-black/20 border border-white/20 rounded-xl p-5 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500/50 focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300 font-medium"
              />
            </div>

            {/* Optimize Button */}
            <motion.button
              variants={liquidButton}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={handleOptimize}
              disabled={!optimizerInput.trim() || isOptimizing}
              className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mb-6 sm:mb-8 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 text-base sm:text-lg"
            >
              {isOptimizing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Optimize Prompt
                </>
              )}
            </motion.button>

            {/* Results */}
            <AnimatePresence mode="wait">
              {isOptimizing ? (
                <motion.div
                  variants={skeletonPulse}
                  initial="initial"
                  animate="animate"
                  className="space-y-3"
                >
                  <div className="h-4 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-4 bg-white/10 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded animate-pulse w-1/2"></div>
                </motion.div>
              ) : optimizerResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-400/30 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/5 rounded-full blur-2xl"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm font-bold text-green-400 uppercase tracking-wide">Optimized Result</span>
                      </div>
                      <button
                        onClick={() => handleCopy(optimizerResult.optimizedPrompt, 'optimizer')}
                        className="p-3 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 bg-white/10"
                      >
                        {copiedText === 'optimizer' ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-300" />
                        )}
                      </button>
                    </div>
                    <p className="text-white leading-relaxed font-medium relative z-10">{optimizerResult.optimizedPrompt}</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center bg-blue-500/10 border border-blue-400/20 rounded-xl p-4">
                      <div className="text-2xl font-bold text-blue-400 mb-1">{optimizerResult.improvements.clarity}%</div>
                      <div className="text-sm text-gray-300 font-medium">Clarity</div>
                    </div>
                    <div className="text-center bg-green-500/10 border border-green-400/20 rounded-xl p-4">
                      <div className="text-2xl font-bold text-green-400 mb-1">{optimizerResult.improvements.tokensSaved}</div>
                      <div className="text-sm text-gray-300 font-medium">Tokens Saved</div>
                    </div>
                    <div className="text-center bg-cyan-500/10 border border-cyan-400/20 rounded-xl p-4">
                      <div className="text-2xl font-bold text-cyan-400 mb-1">{optimizerResult.improvements.improvementScore}%</div>
                      <div className="text-sm text-gray-300 font-medium">Better</div>
                    </div>
                  </div>

                  {/* Subtle CTA in optimizer results */}
                  <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400 mb-2">Love this optimization?</p>
                    <a
                      href="/chrome-extension"
                      className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm underline transition-colors"
                    >
                      Get instant optimization with our extension
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Your optimized prompt will appear here
                </div>
              )}
            </AnimatePresence>

            {/* Example Prompts */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.slice(0, 3).map((example, index) => (
                  <button
                    key={index}
                    onClick={() => loadExample(example.prompt, 'optimizer')}
                    className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 text-gray-300 transition-colors"
                    title={example.prompt}
                  >
                    {example.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* TOOL 2 - PROMPT STRENGTH CHECKER */}
          <motion.div
            variants={glassCard}
            initial="initial"
            whileInView="animate"
            whileHover="hover"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-xl shadow-purple-500/10 hover:shadow-purple-500/25 transition-all duration-500"
          >
            <div className="flex items-center gap-4 mb-8 relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-2xl flex items-center justify-center shadow-lg shadow-white/10 relative border border-white/20">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Strength Checker</h3>
                <p className="text-sm sm:text-base text-gray-300 font-medium">Analyze prompt effectiveness and clarity</p>
              </div>
            </div>

            {/* Platform Selector */}
            <div className="mb-2 md:mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">AI Platform</label>
              <PlatformDropdown
                value={checkerPlatform}
                onChange={setCheckerPlatform}
                isOpen={showCheckerDropdown}
                setIsOpen={setShowCheckerDropdown}
              />
            </div>

            {/* Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Test your prompt strength</label>
              <textarea
                value={checkerInput}
                onChange={(e) => setCheckerInput(e.target.value)}
                placeholder="Paste your prompt here to analyze..."
                className="w-full h-36 bg-gradient-to-br from-black/30 to-black/20 border border-white/20 rounded-xl p-5 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-green-500/70 focus:border-green-500/50 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 font-medium"
              />
            </div>

            {/* Analyze Button */}
            <motion.button
              variants={buttonHover}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={handleAnalyze}
              disabled={!checkerInput.trim() || isAnalyzing}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mb-6 sm:mb-8 shadow-lg transition-colors duration-300 text-base sm:text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Target className="w-5 h-5" />
                  Analyze Strength
                </>
              )}
            </motion.button>

            {/* Results */}
            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <motion.div
                  variants={skeletonPulse}
                  initial="initial"
                  animate="animate"
                  className="space-y-4"
                >
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-white/10 rounded animate-pulse"></div>
                    <div className="h-3 bg-white/10 rounded animate-pulse w-3/4"></div>
                  </div>
                </motion.div>
              ) : analysisResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Circular Progress */}
                  <div className="flex justify-center">
                    <CircularProgressBar value={analysisResult.strengthScore} />
                  </div>

                  {/* Metrics Breakdown */}
                  <div className="space-y-3">
                    {Object.entries(analysisResult.metrics).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300 capitalize">{key}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${value >= 80 ? 'bg-green-400' : value >= 60 ? 'bg-blue-400' : 'bg-red-400'}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                            />
                          </div>
                          <span className="text-sm text-white w-8">{value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Suggestions */}
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-blue-400/5 rounded-full blur-xl"></div>
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      Suggestions for Improvement
                    </h4>
                    <ul className="space-y-3 relative z-10">
                      {analysisResult.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-gray-200 flex items-start gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
                          <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          </div>
                          <span className="font-medium leading-relaxed">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Subtle CTA in results */}
                  <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400 mb-3">Want automatic optimization like this?</p>
                    <a
                      href="/signup"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm underline transition-colors"
                    >
                      Start optimizing for free
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Your strength analysis will appear here
                </div>
              )}
            </AnimatePresence>

            {/* Example Prompts */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.slice(3, 6).map((example, index) => (
                  <button
                    key={index}
                    onClick={() => loadExample(example.prompt, 'checker')}
                    className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 text-gray-300 transition-colors"
                    title={example.prompt}
                  >
                    {example.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copy Success Notification */}
        <AnimatePresence>
          {copiedText && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl z-50 flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              Copied to clipboard!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
