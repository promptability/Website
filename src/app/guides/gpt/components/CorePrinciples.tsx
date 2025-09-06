'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  ChevronDown, 
  Copy, 
  Play, 
  User, 
  Target, 
  List, 
  Code,
  ToggleLeft,
  ToggleRight,
  Wand2,
  AlertCircle
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const principles = [
  {
    id: 'clarity',
    title: 'Clarity and Specificity',
    description: 'Replace vague requests with precise, detailed instructions',
    vague: 'Write a poem',
    specific: 'Write a short, inspiring poem about OpenAI focusing on DALL-E, in Emily Dickinson\'s style',
    improverDemo: true,
    tips: [
      'Include word count or time limits',
      'Specify the audience and context',
      'Define the scope and boundaries',
      'Add format requirements'
    ]
  },
  {
    id: 'context',
    title: 'Provide Context',
    description: 'Give GPT the background information it needs to understand your request',
    vague: 'Review this code',
    specific: '```python\ndef calculate_roi(investment, returns):\n    return (returns - investment) / investment\n```\n\nReview this Python function for calculating ROI. Check for edge cases, error handling, and suggest improvements for a financial application.',
    contextBuilder: true,
    tips: [
      'Use triple quotes for long text',
      'Provide relevant background',
      'Include constraints and requirements',
      'Reference previous conversation if needed'
    ]
  },
  {
    id: 'roles',
    title: 'Define Roles or Personas',
    description: 'Tell GPT what perspective or expertise to adopt',
    vague: 'Explain quantum computing',
    specific: 'As a computer science professor teaching undergraduate students, explain quantum computing using simple analogies and real-world examples',
    roleSelector: ['Teacher', 'Expert', 'Analyst', 'Creative', 'Technical', 'Business'],
    tips: [
      'Match expertise level to your needs',
      'Consider the communication style',
      'Include target audience context',
      'Use system messages for persistent roles'
    ]
  },
  {
    id: 'constraints',
    title: 'Constraints and Do\'s/Don\'ts',
    description: 'Set clear boundaries and guidelines for the response',
    vague: 'Write about AI ethics',
    specific: 'Write about AI ethics. DO: Include specific examples and current regulations. DON\'T: Make predictions about future laws or use fear-mongering language. Keep under 500 words.',
    constraintBuilder: true,
    tips: [
      'Be explicit about what NOT to include',
      'Set length and format constraints',
      'Define quality standards',
      'Specify required elements'
    ]
  },
  {
    id: 'structured-output',
    title: 'Structured Output Instructions',
    description: 'Specify exactly how you want the response formatted',
    vague: 'Analyze this data',
    specific: 'Analyze this sales data and format as JSON:\n{\n  "summary": "brief overview",\n  "key_trends": ["trend1", "trend2"],\n  "recommendations": ["action1", "action2"],\n  "confidence_score": "high/medium/low"\n}',
    formatSelector: ['JSON', 'Table', 'Bulleted List', 'Markdown', 'Code Block'],
    tips: [
      'Provide exact format templates',
      'Use JSON for structured data',
      'Specify headers for tables',
      'Include example outputs'
    ]
  },
  {
    id: 'brevity',
    title: 'Brevity and Focus',
    description: 'Keep prompts focused on one clear objective',
    vague: 'Help me with my business plan and also write marketing copy and analyze my competition and suggest pricing',
    specific: 'Analyze my top 3 competitors in the SaaS project management space. For each, provide: key features, pricing model, target audience, and competitive advantages. Format as a comparison table.',
    taskSplitter: true,
    tips: [
      'One main objective per prompt',
      'Break complex tasks into steps',
      'Remove unnecessary words',
      'Use follow-up prompts for depth'
    ]
  }
];

export default function CorePrinciples() {
  const [expandedPrinciple, setExpandedPrinciple] = useState<string | null>(null);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [improvedText, setImprovedText] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const togglePrinciple = (id: string) => {
    setExpandedPrinciple(expandedPrinciple === id ? null : id);
  };

  const handleImprove = (vague: string) => {
    setInputText(vague);
    // Simulate improvement
    setTimeout(() => {
      setImprovedText(`Improved version: ${vague} with specific context, clear objectives, and structured format requirements.`);
    }, 1000);
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

  const generateRolePrompt = (basePrompt: string, role: string) => {
    return `As a ${role.toLowerCase()}, ${basePrompt}`;
  };

  return (
    <section id="principles" className="py-16">
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
          Core Principles
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 mb-12 text-lg"
        >
          Master these fundamental techniques to dramatically improve your GPT-4 and ChatGPT results.
        </motion.p>


        {/* Interactive Principles */}
        <div className="space-y-4">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Principle Header */}
              <button
                onClick={() => togglePrinciple(principle.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{principle.title}</h3>
                  <p className="text-gray-400">{principle.description}</p>
                </div>
                <motion.div
                  animate={{ rotate: expandedPrinciple === principle.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedPrinciple === principle.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10"
                  >
                    <div className="p-6 space-y-6">
                      {/* Before/After Examples */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500/60 rounded-full"></div>
                            <span className="text-red-400 text-sm font-semibold">Vague Prompt</span>
                          </div>
                          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                            <code className="text-red-300 text-sm">{principle.vague}</code>
                            <button
                              onClick={() => handleCopy(principle.vague)}
                              className="ml-2 p-1 hover:bg-red-500/20 rounded transition-colors"
                            >
                              <Copy className="w-3 h-3 text-red-400" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500/60 rounded-full"></div>
                            <span className="text-green-400 text-sm font-semibold">Specific Prompt</span>
                          </div>
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                            <code className="text-green-300 text-sm">{principle.specific}</code>
                            <button
                              onClick={() => handleCopy(principle.specific)}
                              className="ml-2 p-1 hover:bg-green-500/20 rounded transition-colors"
                            >
                              <Copy className="w-3 h-3 text-green-400" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Elements */}
                      {principle.improverDemo && (
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <Wand2 className="w-4 h-4" />
                            Interactive Improver
                          </h4>
                          <div className="space-y-3">
                            <textarea
                              value={inputText}
                              onChange={(e) => setInputText(e.target.value)}
                              placeholder="Type a vague prompt here..."
                              className="w-full h-20 bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 text-sm"
                            />
                            <button
                              onClick={() => handleImprove(inputText)}
                              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2 rounded-lg border border-white/20 transition-colors flex items-center gap-2"
                            >
                              <Wand2 className="w-4 h-4" />
                              Improve This Prompt
                            </button>
                            {improvedText && (
                              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                                <div className="text-green-400 text-sm mb-2">Improved:</div>
                                <div className="text-green-300 text-sm">{improvedText}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {principle.roleSelector && (
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Role Selector
                          </h4>
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            {principle.roleSelector.map((role) => (
                              <button
                                key={role}
                                onClick={() => setSelectedRole(role)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  selectedRole === role
                                    ? 'bg-white/20 text-white border border-white/30'
                                    : 'bg-white/10 text-gray-400 hover:text-white'
                                }`}
                              >
                                {role}
                              </button>
                            ))}
                          </div>
                          {selectedRole && (
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                              <div className="text-blue-400 text-sm mb-2">With {selectedRole} role:</div>
                              <code className="text-blue-300 text-sm">
                                {generateRolePrompt(principle.specific, selectedRole)}
                              </code>
                            </div>
                          )}
                        </div>
                      )}

                      {principle.formatSelector && (
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            Format Selector
                          </h4>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {principle.formatSelector.map((format) => (
                              <button
                                key={format}
                                onClick={() => setSelectedFormat(format)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  selectedFormat === format
                                    ? 'bg-white/20 text-white border border-white/30'
                                    : 'bg-white/10 text-gray-400 hover:text-white'
                                }`}
                              >
                                {format}
                              </button>
                            ))}
                          </div>
                          {selectedFormat && (
                            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                              <div className="text-purple-400 text-sm mb-2">{selectedFormat} Format:</div>
                              <code className="text-purple-300 text-sm">
                                {getFormatExample(selectedFormat)}
                              </code>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Pro Tips */}
                      <div>
                        <h4 className="text-white font-semibold mb-3">Pro Tips:</h4>
                        <ul className="space-y-2">
                          {principle.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-400 text-sm">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Try in Playground */}
                      <div className="flex justify-center">
                        <button 
                          onClick={() => {
                            // Scroll to playground and populate with example
                            document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' });
                            window.dispatchEvent(new CustomEvent('populatePlayground', { 
                              detail: { prompt: principle.specific } 
                            }));
                          }}
                          className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2 rounded-lg border border-white/20 transition-colors flex items-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          Test This in Playground
                        </button>
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

function generateRolePrompt(basePrompt: string, role: string): string {
  const rolePrompts = {
    'Teacher': `As an experienced educator, ${basePrompt.toLowerCase()} in a way that's easy to understand with examples`,
    'Expert': `As a leading expert in this field, ${basePrompt.toLowerCase()} with deep technical insights`,
    'Analyst': `As a data analyst, ${basePrompt.toLowerCase()} with evidence-based reasoning and metrics`,
    'Creative': `As a creative professional, ${basePrompt.toLowerCase()} with innovative and original approaches`,
    'Technical': `As a technical specialist, ${basePrompt.toLowerCase()} with precise technical details`,
    'Business': `As a business consultant, ${basePrompt.toLowerCase()} focusing on practical business value`
  };
  
  return rolePrompts[role as keyof typeof rolePrompts] || basePrompt;
}

function getFormatExample(format: string): string {
  const examples = {
    'JSON': '{\n  "key": "value",\n  "list": ["item1", "item2"],\n  "nested": { "property": "value" }\n}',
    'Table': '| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Data 1   | Data 2   | Data 3   |',
    'Bulleted List': '• Main point one\n• Main point two\n  - Sub-point\n  - Sub-point\n• Main point three',
    'Markdown': '# Heading\n\n**Bold text** and *italic text*\n\n```code block```\n\n> Blockquote',
    'Code Block': '```python\ndef example_function(param):\n    """Docstring here"""\n    return processed_result\n```'
  };
  
  return examples[format as keyof typeof examples] || 'Example format will appear here';
}