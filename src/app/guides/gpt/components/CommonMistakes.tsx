'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  AlertTriangle, 
  ChevronDown, 
  Copy, 
  CheckCircle,
  Scan,
  Split,
  Plus,
  Minus,
  RotateCcw,
  Shield,
  Target,
  Zap
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const mistakes = [
  {
    id: 'vague',
    title: 'Being Too Vague',
    description: 'Generic prompts lead to generic responses',
    why: 'GPT needs specific direction to provide valuable, targeted responses instead of broad generalizations.',
    fix: 'Add specific details, context, constraints, and desired outcomes to every prompt.',
    badExample: 'Help me with marketing',
    goodExample: 'Create a 30-day social media marketing plan for a B2B SaaS startup targeting small businesses. Include platform recommendations, content themes, and posting schedule.',
    tool: 'specificity-scorer'
  },
  {
    id: 'overloading',
    title: 'Overloading Prompts',
    description: 'Trying to accomplish too many tasks in one prompt',
    why: 'Complex multi-task prompts confuse GPT and lead to incomplete or poor-quality responses.',
    fix: 'Break complex requests into focused, single-objective prompts that build on each other.',
    badExample: 'Write a business plan and design a logo and create a marketing strategy and build a website',
    goodExample: 'Write a comprehensive business plan executive summary for a fintech startup. Focus on market opportunity, business model, and financial projections.',
    tool: 'prompt-splitter'
  },
  {
    id: 'missing-context',
    title: 'Missing Context',
    description: 'Not providing necessary background information',
    why: 'Without context, GPT makes assumptions that may not match your specific situation or needs.',
    fix: 'Include relevant background, constraints, audience, and goal information upfront.',
    badExample: 'Write an email to the team',
    goodExample: 'Write a professional email to my 15-person remote development team announcing a product launch delay. Keep tone positive, explain the 2-week delay, and outline revised timeline.',
    tool: 'context-checker'
  },
  {
    id: 'no-examples',
    title: 'No Examples for Complex Tasks',
    description: 'Not showing GPT the pattern or style you want',
    why: 'Complex or creative tasks benefit greatly from examples that demonstrate the desired output format and quality.',
    fix: 'Provide 1-3 examples of the input-output pattern you want GPT to follow.',
    badExample: 'Convert these product descriptions to marketing copy',
    goodExample: 'Convert product descriptions to marketing copy using this format:\n\nInput: "Bluetooth headphones with 20-hour battery"\nOutput: "Experience freedom with our premium wireless headphones. Enjoy uninterrupted music for 20 hours straight - perfect for long flights, workouts, and daily commutes."',
    tool: 'example-generator'
  },
  {
    id: 'only-negative',
    title: 'Only Negative Instructions',
    description: 'Telling GPT what NOT to do without positive guidance',
    why: 'Negative instructions alone don\'t give GPT clear direction on what you actually want.',
    fix: 'Balance "don\'t do this" with clear "do this instead" instructions.',
    badExample: 'Don\'t be boring, don\'t use jargon, don\'t make it too long',
    goodExample: 'Write in a conversational, engaging tone using simple language. Keep under 200 words and include specific examples.',
    tool: 'positive-converter'
  },
  {
    id: 'not-iterating',
    title: 'Not Iterating',
    description: 'Accepting the first response instead of refining',
    why: 'The best results often come from refining prompts based on initial outputs and iterating.',
    fix: 'Treat prompting as a conversation. Refine, add detail, and build on previous responses.',
    badExample: 'Using the first response even if it\'s not quite right',
    goodExample: 'That\'s good, but can you make it more technical and add specific metrics? Also format it as a bulleted list.',
    tool: 'iteration-tracker'
  },
  {
    id: 'wrong-model',
    title: 'Wrong Model Selection',
    description: 'Using the wrong GPT model for your specific task',
    why: 'Each model has strengths and weaknesses. Choosing the wrong one wastes money or gives poor results.',
    fix: 'Match model capabilities to task requirements using our model selector.',
    badExample: 'Using GPT-4 for simple translations',
    goodExample: 'Using GPT-3.5 for basic tasks, GPT-4 for complex reasoning, GPT-4.1 for long documents',
    tool: 'model-recommender'
  }
];

export default function CommonMistakes() {
  const [expandedMistake, setExpandedMistake] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [toolInput, setToolInput] = useState('');
  const [toolOutput, setToolOutput] = useState('');
  const [promptAnalysis, setPromptAnalysis] = useState<any>(null);
  const [analyzerInput, setAnalyzerInput] = useState('');

  const toggleMistake = (id: string) => {
    setExpandedMistake(expandedMistake === id ? null : id);
  };

  const runTool = (toolType: string, input: string) => {
    // Simulate tool functionality
    const toolResults = {
      'specificity-scorer': `Specificity Score: 35/100\nSuggestions:\n• Add specific metrics or quantities\n• Define the target audience\n• Include format requirements\n• Specify timeframe or scope`,
      'prompt-splitter': `Split into 3 focused prompts:\n1. ${input.slice(0, 30)}...\n2. [Next logical step]\n3. [Final integration step]`,
      'context-checker': `Missing context:\n• Who is the audience?\n• What's the purpose?\n• Any constraints or requirements?\n• Previous relevant information?`,
      'example-generator': `Generated example pattern:\nInput: [Your input format]\nOutput: [Desired output format]\n\nTry this pattern with your data.`,
      'positive-converter': `Positive version:\n"${input.replace(/don't|not|avoid/g, 'please')}" \n\nConverted to actionable guidance.`,
      'model-recommender': `Recommended: GPT-4\nReason: Complex reasoning required\nAlternative: GPT-3.5 for simpler version`
    };

    setToolOutput(toolResults[toolType as keyof typeof toolResults] || 'Tool result will appear here');
  };

  const analyzePrompt = (prompt: string) => {
    // Comprehensive prompt analysis
    const wordCount = prompt.split(' ').length;
    const hasContext = /context|background|situation|scenario/i.test(prompt);
    const hasConstraints = /format|length|style|don't|avoid|must|should/i.test(prompt);
    const hasExamples = /example|like|such as|e\.g\.|for instance/i.test(prompt);
    const hasSpecifics = /specific|exactly|precisely|detailed|comprehensive/i.test(prompt);
    
    const issues = [];
    if (wordCount < 10) issues.push('vague');
    if (wordCount > 200) issues.push('overloading');
    if (!hasContext) issues.push('missing-context');
    if (!hasExamples && wordCount > 50) issues.push('no-examples');
    if (!/do |create |write |analyze /i.test(prompt)) issues.push('only-negative');

    const score = Math.max(20, Math.min(100, 
      (wordCount > 10 ? 20 : 0) +
      (hasContext ? 20 : 0) +
      (hasConstraints ? 20 : 0) +
      (hasExamples ? 20 : 0) +
      (hasSpecifics ? 20 : 0)
    ));

    setPromptAnalysis({
      score,
      wordCount,
      issues,
      suggestions: [
        score < 40 ? 'Add more specific details and context' : null,
        !hasExamples ? 'Consider adding examples for clarity' : null,
        !hasConstraints ? 'Specify format or length requirements' : null
      ].filter(Boolean)
    });
  };

  return (
    <section id="mistakes" className="py-16">
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
          Common Mistakes
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 mb-8 text-lg"
        >
          Avoid these pitfalls to get consistently better results from GPT models.
        </motion.p>

        {/* Comprehensive Prompt Analyzer */}
        <motion.div
          variants={fadeInUp}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-white/80" />
            <h3 className="text-xl font-semibold text-white">Smart Prompt Analyzer</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm mb-2 block">Paste your prompt for analysis:</label>
                <textarea
                  value={analyzerInput}
                  onChange={(e) => setAnalyzerInput(e.target.value)}
                  placeholder="Enter your prompt here to get instant feedback on potential issues..."
                  className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 text-sm resize-none"
                />
              </div>
              
              <button
                onClick={() => analyzePrompt(analyzerInput)}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg border border-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <Scan className="w-4 h-4" />
                Analyze Prompt
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {promptAnalysis ? (
                <>
                  {/* Score Display */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-semibold">Prompt Quality Score</span>
                      <span className={`text-2xl font-bold ${
                        promptAnalysis.score >= 80 ? 'text-green-400' : 
                        promptAnalysis.score >= 60 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {promptAnalysis.score}/100
                      </span>
                    </div>
                    
                    <div className="w-full bg-white/10 rounded-full h-2 mb-3">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          promptAnalysis.score >= 80 ? 'bg-green-400' : 
                          promptAnalysis.score >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${promptAnalysis.score}%` }}
                      ></div>
                    </div>
                    
                    <div className="text-gray-400 text-sm">
                      Words: {promptAnalysis.wordCount} | 
                      {promptAnalysis.score >= 80 ? ' Excellent' : 
                       promptAnalysis.score >= 60 ? ' Good' : ' Needs Improvement'}
                    </div>
                  </div>

                  {/* Issues Found */}
                  {promptAnalysis.issues.length > 0 && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Issues Detected
                      </h4>
                      <div className="space-y-1">
                        {promptAnalysis.issues.map((issue: string, index: number) => (
                          <div key={index} className="text-red-300 text-sm flex items-center gap-2">
                            <Target className="w-3 h-3" />
                            {mistakes.find(m => m.id === issue)?.title || issue}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions */}
                  {promptAnalysis.suggestions.length > 0 && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Improvement Suggestions
                      </h4>
                      <div className="space-y-1">
                        {promptAnalysis.suggestions.map((suggestion: string, index: number) => (
                          <div key={index} className="text-blue-300 text-sm">• {suggestion}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                  <div className="text-gray-400 text-sm">
                    Enter a prompt above to see detailed analysis and improvement suggestions.
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {mistakes.map((mistake, index) => (
            <motion.div
              key={mistake.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Mistake Header */}
              <button
                onClick={() => toggleMistake(mistake.id)}
                className="w-full flex items-center gap-4 p-6 text-left hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{mistake.title}</h3>
                  <p className="text-gray-400 text-sm">{mistake.description}</p>
                </div>
                <motion.div
                  animate={{ rotate: expandedMistake === mistake.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedMistake === mistake.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10"
                  >
                    <div className="p-6 space-y-6">
                      {/* Why This Fails */}
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                        <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Why This Fails
                        </h4>
                        <p className="text-yellow-300 text-sm">{mistake.why}</p>
                      </div>

                      {/* How to Fix */}
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          How to Fix
                        </h4>
                        <p className="text-green-300 text-sm">{mistake.fix}</p>
                      </div>

                      {/* Examples */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500/60 rounded-full"></div>
                            <span className="text-red-400 text-sm font-semibold">Problem</span>
                          </div>
                          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                            <code className="text-red-300 text-sm">{mistake.badExample}</code>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500/60 rounded-full"></div>
                            <span className="text-green-400 text-sm font-semibold">Solution</span>
                          </div>
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                            <code className="text-green-300 text-sm">{mistake.goodExample}</code>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Tool */}
                      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-3">Interactive Fixer Tool</h4>
                        <div className="space-y-3">
                          <textarea
                            value={toolInput}
                            onChange={(e) => setToolInput(e.target.value)}
                            placeholder="Paste your prompt here to analyze..."
                            className="w-full h-20 bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 text-sm"
                          />
                          <button
                            onClick={() => runTool(mistake.tool, toolInput)}
                            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2 rounded-lg border border-white/20 transition-colors flex items-center gap-2"
                          >
                            <Scan className="w-4 h-4" />
                            Analyze & Fix
                          </button>
                          {toolOutput && (
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                              <div className="text-blue-400 text-sm mb-2">Analysis:</div>
                              <pre className="text-blue-300 text-sm whitespace-pre-wrap">{toolOutput}</pre>
                            </div>
                          )}
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
    </section>
  );
}