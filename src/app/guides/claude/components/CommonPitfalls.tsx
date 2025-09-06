'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  AlertTriangle, 
  Shield, 
  FileX, 
  Code, 
  ChevronDown, 
  Copy, 
  CheckCircle,
  XCircle,
  Scan,
  RotateCcw,
  Target
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const claudePitfalls = [
  {
    id: 'safety-triggers',
    title: 'Accidental Safety Triggers',
    severity: 'high',
    description: 'Unintentionally triggering Claude&apos;s safety responses with legitimate requests',
    why: 'Claude&apos;s Constitutional AI is very sensitive to potential harm, sometimes flagging innocent requests.',
    triggers: [
      'Using words like "hack", "attack", "manipulate" even in legitimate contexts',
      'Requesting content about sensitive topics without proper framing',
      'Asking for "ways to defeat/overcome" something',
      'Using imperative language that sounds coercive'
    ],
    solutions: [
      'Frame requests academically: "For educational purposes..."',
      'Add context: "I&apos;m a cybersecurity professional studying..."',
      'Use neutral language: "analyze" instead of "attack"',
      'Explain legitimate use case upfront'
    ],
    example: {
      bad: 'How can I hack this system?',
      good: 'As a cybersecurity professional, I need to understand common vulnerabilities in web applications for defensive purposes. Can you explain typical security weaknesses that ethical hackers look for during penetration testing?'
    }
  },
  {
    id: 'context-overflow',
    title: 'Context Window Mismanagement',
    severity: 'medium',
    description: 'Inefficiently using Claude&apos;s 200K context window',
    why: 'Even with 200K tokens, poor organization can lead to degraded performance and higher costs.',
    triggers: [
      'Dumping entire documents without structure',
      'Repeating information across the conversation',
      'Not prioritizing important information',
      'Mixing different topics in one long context'
    ],
    solutions: [
      'Use XML tags to structure large inputs',
      'Summarize previous context when starting new topics',
      'Put most important info at the beginning and end',
      'Break very long tasks into focused segments'
    ],
    example: {
      bad: '[Paste entire 50-page document] Please analyze this.',
      good: '<document>\n[Structured content with key sections tagged]\n</document>\n\n<focus_areas>\n- Financial performance\n- Market trends\n- Risk factors\n</focus_areas>\n\nPlease analyze the focus areas based on the document.'
    }
  },
  {
    id: 'xml-misuse',
    title: 'XML/HTML Formatting Errors',
    severity: 'medium',
    description: 'Incorrect use of XML tags leading to parsing issues',
    why: 'Claude excels with structured input, but malformed XML can confuse the model.',
    triggers: [
      'Unclosed or mismatched XML tags',
      'Using reserved XML characters without escaping',
      'Mixing HTML and XML inconsistently',
      'Nested tags without clear hierarchy'
    ],
    solutions: [
      'Always close XML tags properly',
      'Use consistent tag naming conventions',
      'Escape special characters (&lt; &gt; &amp;)',
      'Keep nesting logical and readable'
    ],
    example: {
      bad: '<task>Analyze data\n<data>Raw information</task>',
      good: '<task>\nAnalyze the following data\n</task>\n\n<data>\nRaw information goes here\n</data>'
    }
  },
  {
    id: 'constitutional-conflict',
    title: 'Constitutional Principle Conflicts',
    severity: 'high',
    description: 'Creating prompts that put Claude&apos;s principles in conflict',
    why: 'When helpfulness conflicts with harmlessness, Claude may refuse or give suboptimal responses.',
    triggers: [
      'Asking for help with legally gray areas',
      'Requesting biased or one-sided content',
      'Asking Claude to roleplay harmful characters',
      'Requesting content that could mislead others'
    ],
    solutions: [
      'Acknowledge ethical considerations upfront',
      'Request balanced perspectives explicitly',
      'Clarify legitimate educational or professional purpose',
      'Ask for analysis rather than advocacy'
    ],
    example: {
      bad: 'Write persuasive content to convince people vaccines are dangerous.',
      good: 'I&apos;m researching vaccine hesitancy for a public health course. Can you explain the common concerns people have about vaccines and the scientific responses to those concerns, presented in a balanced way?'
    }
  }
];

const safetyAnalyzer = {
  checkPrompt: (prompt: string) => {
    const triggers = [
      { word: 'hack', risk: 'high', suggestion: 'Use "analyze security" or "penetration test"' },
      { word: 'manipulate', risk: 'medium', suggestion: 'Use "influence" or "persuade ethically"' },
      { word: 'attack', risk: 'high', suggestion: 'Use "analyze" or "test"' },
      { word: 'defeat', risk: 'medium', suggestion: 'Use "overcome" or "solve"' },
      { word: 'trick', risk: 'medium', suggestion: 'Use "technique" or "method"' }
    ];

    const foundTriggers = triggers.filter(trigger => 
      prompt.toLowerCase().includes(trigger.word)
    );

    const riskLevel = foundTriggers.some(t => t.risk === 'high') ? 'high' :
                     foundTriggers.some(t => t.risk === 'medium') ? 'medium' : 'low';

    return {
      riskLevel,
      triggers: foundTriggers,
      score: Math.max(20, 100 - (foundTriggers.length * 25)),
      isLikelySafe: riskLevel === 'low'
    };
  }
};

export default function CommonPitfalls() {
  const [expandedPitfall, setExpandedPitfall] = useState<string | null>(null);
  const [analyzerInput, setAnalyzerInput] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const togglePitfall = (id: string) => {
    setExpandedPitfall(expandedPitfall === id ? null : id);
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

  const runSafetyCheck = () => {
    const result = safetyAnalyzer.checkPrompt(analyzerInput);
    setAnalysis(result);
  };

  return (
    <section id="pitfalls" className="py-16">
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
          Common Pitfalls
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 mb-8 text-lg"
        >
          Avoid these Claude-specific issues to get consistently better results.
        </motion.p>

        {/* Safety Prompt Checker */}
        <motion.div
          variants={fadeInUp}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-white/80" />
            <h3 className="text-xl font-semibold text-white">Safety Prompt Checker</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <textarea
                value={analyzerInput}
                onChange={(e) => setAnalyzerInput(e.target.value)}
                placeholder="Enter your prompt to check for potential safety triggers..."
                className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 text-sm resize-none"
              />
              
              <button
                onClick={runSafetyCheck}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg border border-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <Scan className="w-4 h-4" />
                Check Safety Compliance
              </button>
            </div>

            <div className="space-y-4">
              {analysis ? (
                <>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-semibold">Safety Score</span>
                      <span className={`text-2xl font-bold ${
                        analysis.riskLevel === 'low' ? 'text-green-400' : 
                        analysis.riskLevel === 'medium' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {analysis.score}/100
                      </span>
                    </div>
                    
                    <div className="w-full bg-white/10 rounded-full h-2 mb-3">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          analysis.riskLevel === 'low' ? 'bg-green-400' : 
                          analysis.riskLevel === 'medium' ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${analysis.score}%` }}
                      />
                    </div>
                    
                    <div className={`text-sm flex items-center gap-2 ${
                      analysis.isLikelySafe ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {analysis.isLikelySafe ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      {analysis.isLikelySafe ? 'Likely to be accepted' : 'May trigger safety response'}
                    </div>
                  </div>

                  {analysis.triggers.length > 0 && (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Potential Triggers Found
                      </h4>
                      <div className="space-y-2">
                        {analysis.triggers.map((trigger: any, index: number) => (
                          <div key={index} className="text-yellow-300 text-sm">
                            <span className="font-semibold">&quot;{trigger.word}&quot;</span> - {trigger.suggestion}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                  <div className="text-gray-400 text-sm">
                    Enter a prompt above to see safety analysis and improvement suggestions.
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Pitfall Cards */}
        <div className="space-y-4">
          {claudePitfalls.map((pitfall, index) => (
            <motion.div
              key={pitfall.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Pitfall Header */}
              <button
                onClick={() => togglePitfall(pitfall.id)}
                className="w-full flex items-center gap-4 p-6 text-left hover:bg-white/5 transition-colors"
              >
                <div className={`w-8 h-8 border rounded-lg flex items-center justify-center flex-shrink-0 ${
                  pitfall.severity === 'high' 
                    ? 'bg-red-500/20 border-red-500/30' 
                    : 'bg-yellow-500/20 border-yellow-500/30'
                }`}>
                  <AlertTriangle className={`w-4 h-4 ${
                    pitfall.severity === 'high' ? 'text-red-400' : 'text-yellow-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-white">{pitfall.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      pitfall.severity === 'high' 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {pitfall.severity} risk
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{pitfall.description}</p>
                </div>
                <motion.div
                  animate={{ rotate: expandedPitfall === pitfall.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedPitfall === pitfall.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10"
                  >
                    <div className="p-6 space-y-6">
                      {/* Why This Happens */}
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                        <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Why This Happens
                        </h4>
                        <p className="text-yellow-300 text-sm">{pitfall.why}</p>
                      </div>

                      {/* Common Triggers */}
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Common Triggers
                        </h4>
                        <ul className="space-y-1">
                          {pitfall.triggers.map((trigger, index) => (
                            <li key={index} className="text-red-300 text-sm flex items-start gap-2">
                              <XCircle className="w-3 h-3 mt-1 flex-shrink-0" />
                              {trigger}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Solutions */}
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Solutions
                        </h4>
                        <ul className="space-y-1">
                          {pitfall.solutions.map((solution, index) => (
                            <li key={index} className="text-green-300 text-sm flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 mt-1 flex-shrink-0" />
                              {solution}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Before/After Examples */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500/60 rounded-full" />
                            <span className="text-red-400 text-sm font-semibold">Problematic</span>
                          </div>
                          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                            <code className="text-red-300 text-sm">{pitfall.example.bad}</code>
                            <button
                              onClick={() => handleCopy(pitfall.example.bad)}
                              className="ml-2 p-1 hover:bg-red-500/20 rounded transition-colors"
                            >
                              <Copy className="w-3 h-3 text-red-400" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500/60 rounded-full" />
                            <span className="text-green-400 text-sm font-semibold">Improved</span>
                          </div>
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                            <code className="text-green-300 text-sm">{pitfall.example.good}</code>
                            <button
                              onClick={() => handleCopy(pitfall.example.good)}
                              className="ml-2 p-1 hover:bg-green-500/20 rounded transition-colors"
                            >
                              <Copy className="w-3 h-3 text-green-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
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