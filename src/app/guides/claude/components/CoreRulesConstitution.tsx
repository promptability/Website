'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Shield, 
  Heart, 
  Eye, 
  CheckCircle, 
  XCircle, 
  ToggleLeft, 
  ToggleRight,
  ArrowRight,
  Brain,
  AlertTriangle,
  Copy
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const threeHs = [
  {
    id: 'helpful',
    title: 'Helpful',
    icon: Heart,
    color: 'green',
    description: 'Claude aims to be useful, informative, and genuinely assist with your goals',
    principles: [
      'Provides comprehensive, accurate information',
      'Offers practical solutions and actionable advice',
      'Adapts communication style to user needs',
      'Goes beyond basic responses to add value'
    ],
    example: {
      prompt: 'Help me understand quantum computing',
      response: 'I&apos;ll explain quantum computing using analogies and build up complexity gradually. Think of classical computers as light switches (on/off), while quantum computers use dimmer switches (multiple states simultaneously)...'
    }
  },
  {
    id: 'harmless',
    title: 'Harmless',
    icon: Shield,
    color: 'blue',
    description: 'Claude prioritizes safety and refuses harmful requests while explaining why',
    principles: [
      'Refuses to create dangerous or illegal content',
      'Protects privacy and personal information',
      'Avoids bias and discrimination',
      'Explains safety reasoning transparently'
    ],
    example: {
      prompt: 'Help me hack into my neighbor&apos;s wifi',
      response: 'I can&apos;t help with unauthorized network access as that would violate privacy and potentially break laws. Instead, I can help you: 1) Improve your own wifi security, 2) Troubleshoot connectivity issues, or 3) Find legitimate ways to access internet.'
    }
  },
  {
    id: 'honest',
    title: 'Honest',
    icon: Eye,
    color: 'gold',
    description: 'Claude admits limitations, expresses uncertainty, and provides balanced perspectives',
    principles: [
      'Acknowledges knowledge limitations and uncertainty',
      'Provides balanced viewpoints on controversial topics',
      'Corrects mistakes when identified',
      'Distinguishes between facts and opinions'
    ],
    example: {
      prompt: 'What will the stock market do tomorrow?',
      response: 'I cannot predict specific stock market movements as they depend on countless unpredictable factors. However, I can explain factors that influence markets, help you understand risk management, or discuss general investment principles.'
    }
  }
];

const safetyExamples = [
  {
    type: 'safe',
    prompt: 'Help me write a persuasive essay about renewable energy',
    explanation: 'Educational content that promotes positive environmental action',
    response: 'Accepted - This promotes learning and environmental awareness'
  },
  {
    type: 'unsafe',
    prompt: 'Write propaganda to manipulate people into buying my product',
    explanation: 'Request for manipulative content that could harm consumers',
    response: 'Declined - I can help with ethical marketing instead'
  },
  {
    type: 'safe',
    prompt: 'Explain how encryption works for my computer science class',
    explanation: 'Educational content about cybersecurity fundamentals',
    response: 'Accepted - Educational content about legitimate security concepts'
  },
  {
    type: 'unsafe',
    prompt: 'Help me write a fake news article to spread misinformation',
    explanation: 'Request to create harmful misinformation',
    response: 'Declined - I can help with factual journalism techniques instead'
  }
];

export default function CoreRulesConstitution() {
  const [selectedH, setSelectedH] = useState<string | null>(null);
  const [showSafetyDemo, setShowSafetyDemo] = useState(false);
  const [explanationStyle, setExplanationStyle] = useState('simple');
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
    <section id="constitution" className="py-16">
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
          Core Rules & Constitutional AI
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 mb-12 text-lg"
        >
          Understand Claude&apos;s foundational principles and how Constitutional AI shapes every interaction.
        </motion.p>

        {/* Three H's Framework */}
        <motion.div
          variants={fadeInUp}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">The Three H&apos;s Framework</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {threeHs.map((h, index) => {
              const Icon = h.icon;
              const isSelected = selectedH === h.id;
              
              return (
                <motion.div
                  key={h.id}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    isSelected ? 'scale-105' : 'hover:scale-102'
                  }`}
                  onClick={() => setSelectedH(isSelected ? null : h.id)}
                >
                  <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full ${
                    isSelected ? 'bg-white/10 border-white/20' : ''
                  }`}>
                    <div className="text-center mb-4">
                      <div className={`w-16 h-16 mx-auto rounded-full border-2 flex items-center justify-center mb-4 ${
                        h.color === 'green' ? 'border-green-400/50 bg-green-400/10' :
                        h.color === 'blue' ? 'border-blue-400/50 bg-blue-400/10' :
                        'border-yellow-400/50 bg-yellow-400/10'
                      }`}>
                        <Icon className={`w-8 h-8 ${
                          h.color === 'green' ? 'text-green-400' :
                          h.color === 'blue' ? 'text-blue-400' :
                          'text-yellow-400'
                        }`} />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">{h.title}</h4>
                      <p className="text-gray-400 text-sm">{h.description}</p>
                    </div>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          {/* Principles */}
                          <div>
                            <h5 className="text-white font-semibold mb-2">Key Principles:</h5>
                            <ul className="space-y-1">
                              {h.principles.map((principle, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 text-green-400 mt-1 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">{principle}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Example */}
                          <div className={`border rounded-lg p-3 ${
                            h.color === 'green' ? 'bg-green-500/10 border-green-500/20' :
                            h.color === 'blue' ? 'bg-blue-500/10 border-blue-500/20' :
                            'bg-yellow-500/10 border-yellow-500/20'
                          }`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-sm font-semibold ${
                                h.color === 'green' ? 'text-green-400' :
                                h.color === 'blue' ? 'text-blue-400' :
                                'text-yellow-400'
                              }`}>Example</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopy(`Prompt: ${h.example.prompt}\n\nResponse: ${h.example.response}`);
                                }}
                                className="bg-white/10 hover:bg-white/20 p-1 rounded transition-colors"
                              >
                                <Copy className="w-3 h-3 text-white" />
                              </button>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <div className="text-xs text-gray-400 mb-1">Prompt:</div>
                                <div className={`text-sm ${
                                  h.color === 'green' ? 'text-green-300' :
                                  h.color === 'blue' ? 'text-blue-300' :
                                  'text-yellow-300'
                                }`}>
                                  {h.example.prompt}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-400 mb-1">Response style:</div>
                                <div className={`text-sm ${
                                  h.color === 'green' ? 'text-green-300' :
                                  h.color === 'blue' ? 'text-blue-300' :
                                  'text-yellow-300'
                                }`}>
                                  {h.example.response}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Constitutional AI Explainer */}
        <motion.div
          variants={fadeInUp}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-white/80" />
            <h3 className="text-xl font-semibold text-white">Constitutional AI Process</h3>
          </div>

          {/* Explanation Style Toggle */}
          <div className="flex gap-2 mb-6">
            {['simple', 'technical'].map((style) => (
              <button
                key={style}
                onClick={() => setExplanationStyle(style)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  explanationStyle === style
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {style}
              </button>
            ))}
          </div>

          {/* Process Flow */}
          <div className="space-y-4">
            {explanationStyle === 'simple' ? (
              <>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center">
                    <span className="text-blue-400 font-bold text-sm">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">You send a prompt</h4>
                    <p className="text-gray-400 text-sm">Claude receives your message</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center">
                    <span className="text-purple-400 font-bold text-sm">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">Constitutional check</h4>
                    <p className="text-gray-400 text-sm">Evaluates against helpful, harmless, honest principles</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center">
                    <span className="text-green-400 font-bold text-sm">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">Response generated</h4>
                    <p className="text-gray-400 text-sm">Answer aligned with constitutional principles</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Training Process</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Self-supervised learning on diverse text corpus</li>
                    <li>• Constitutional AI fine-tuning with principle-based feedback</li>
                    <li>• Harmlessness training via AI-generated critiques</li>
                    <li>• Helpfulness optimization through constitutional principles</li>
                  </ul>
                </div>
                <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Inference Pipeline</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Input tokenization and context embedding</li>
                    <li>• Constitutional constraint evaluation</li>
                    <li>• Multi-step reasoning with principle checking</li>
                    <li>• Response generation with safety verification</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Safety Demo */}
        <motion.div
          variants={fadeInUp}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white">Safety Response Demo</h3>
            </div>
            <button
              onClick={() => setShowSafetyDemo(!showSafetyDemo)}
              className="flex items-center gap-2"
            >
              {showSafetyDemo ? (
                <ToggleRight className="w-6 h-6 text-green-400" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-gray-400" />
              )}
            </button>
          </div>

          <AnimatePresence>
            {showSafetyDemo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-4"
              >
                {safetyExamples.map((example, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${
                      example.type === 'safe' 
                        ? 'bg-green-500/10 border-green-500/20' 
                        : 'bg-red-500/10 border-red-500/20'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {example.type === 'safe' ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-sm font-semibold ${
                        example.type === 'safe' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {example.type === 'safe' ? 'Safe Request' : 'Unsafe Request'}
                      </span>
                      <button
                        onClick={() => handleCopy(example.prompt)}
                        className="ml-auto bg-white/10 hover:bg-white/20 p-1 rounded transition-colors"
                      >
                        <Copy className="w-3 h-3 text-white" />
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Prompt:</div>
                        <div className={`text-sm ${
                          example.type === 'safe' ? 'text-green-300' : 'text-red-300'
                        }`}>
                          &quot;{example.prompt}&quot;
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Analysis:</div>
                        <div className="text-gray-300 text-sm">{example.explanation}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Claude&apos;s Response:</div>
                        <div className={`text-sm ${
                          example.type === 'safe' ? 'text-green-300' : 'text-red-300'
                        }`}>
                          {example.response}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
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