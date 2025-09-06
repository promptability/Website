'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Layers, 
  Brain, 
  MessageSquare, 
  Code, 
  Sliders, 
  Type,
  Plus,
  Minus,
  Copy,
  Play,
  BarChart3,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const fewShotExamples = [
  {
    input: 'Product: iPhone 14',
    output: 'Category: Electronics, Brand: Apple, Price: $799, Features: A15 chip, dual camera, 6.1" display'
  },
  {
    input: 'Product: Tesla Model 3',
    output: 'Category: Automotive, Brand: Tesla, Price: $40,000, Features: Electric, autopilot, 15" touchscreen'
  }
];

const parameterPresets = {
  'Creative Writing': { temperature: 0.9, top_p: 1.0, frequency_penalty: 0.0, presence_penalty: 0.0 },
  'Technical Analysis': { temperature: 0.3, top_p: 0.8, frequency_penalty: 0.0, presence_penalty: 0.0 },
  'Balanced': { temperature: 0.7, top_p: 0.9, frequency_penalty: 0.0, presence_penalty: 0.0 },
  'Focused & Precise': { temperature: 0.2, top_p: 0.5, frequency_penalty: 0.2, presence_penalty: 0.1 }
};

const promptTemplates = [
  {
    category: 'Analysis',
    title: 'Document Analysis Template',
    template: `Analyze the following document and provide insights in JSON format:

{
  "summary": "Brief overview in 2-3 sentences",
  "key_points": ["point1", "point2", "point3"],
  "sentiment": "positive/neutral/negative",
  "action_items": ["item1", "item2"],
  "confidence": "high/medium/low"
}

Document:
[PASTE YOUR DOCUMENT HERE]`
  },
  {
    category: 'Creative',
    title: 'Story Writing Template',
    template: `Write a [LENGTH] story with the following specifications:

Setting: [TIME PERIOD/LOCATION]
Characters: [MAIN CHARACTER DESCRIPTIONS]
Tone: [SERIOUS/HUMOROUS/DRAMATIC/etc.]
Style: [AUTHOR STYLE OR SPECIFIC STYLE]
Theme: [CENTRAL MESSAGE OR THEME]

Requirements:
- Include dialogue that reveals character
- Use vivid sensory details
- Build to a clear resolution
- Stay within [WORD COUNT] words

Begin the story here:`
  },
  {
    category: 'Technical',
    title: 'Code Review Template',
    template: `Review this code and provide feedback in the following format:

## Code Review

**Overall Assessment:** [GOOD/NEEDS_IMPROVEMENT/CRITICAL_ISSUES]

**Security Issues:**
- [List any security concerns]

**Performance Issues:**
- [List performance bottlenecks]

**Best Practices:**
- [What follows/violates best practices]

**Suggestions:**
1. [Specific improvement with code example]
2. [Another improvement with rationale]

**Rating:** [1-10] with justification

\`\`\`[LANGUAGE]
[PASTE YOUR CODE HERE]
\`\`\``
  },
  {
    category: 'Business',
    title: 'Meeting Notes Template',
    template: `Transform these raw meeting notes into a structured summary:

## Meeting Summary
**Date:** [AUTO-DETECT OR ASK]
**Attendees:** [EXTRACT FROM NOTES]
**Duration:** [ESTIMATE FROM CONTENT]

## Key Decisions
- [Decision 1 with rationale]
- [Decision 2 with rationale]

## Action Items
- [ ] [Task] - Assigned to [Person] - Due: [Date]
- [ ] [Task] - Assigned to [Person] - Due: [Date]

## Discussion Points
- [Main topic 1 with summary]
- [Main topic 2 with summary]

## Next Steps
- [Immediate next action]
- [Follow-up meeting if needed]

Raw notes:
[PASTE YOUR RAW NOTES HERE]`
  }
];

const messageStrategies = [
  {
    type: 'system',
    priority: 'high',
    title: 'Role Definition',
    example: 'You are an expert data analyst who explains complex statistics in simple terms for business stakeholders.',
    purpose: 'Sets the AI personality and expertise level'
  },
  {
    type: 'system',
    priority: 'high',
    title: 'Output Format',
    example: 'Always respond in JSON format with "analysis", "recommendations", and "confidence_score" fields.',
    purpose: 'Ensures consistent, parseable responses'
  },
  {
    type: 'user',
    priority: 'medium',
    title: 'Context Sharing',
    example: 'I am a startup founder analyzing user feedback for a mobile app with 10k users.',
    purpose: 'Provides background for better recommendations'
  },
  {
    type: 'user',
    priority: 'high',
    title: 'Task Instructions',
    example: 'Analyze the sentiment of these 50 customer reviews and identify the top 3 improvement areas.',
    purpose: 'Clear, specific task with measurable outcomes'
  }
];

export default function AdvancedStrategies() {
  const [exampleCount, setExampleCount] = useState(2);
  const [showChainOfThought, setShowChainOfThought] = useState(false);
  const [messageRole, setMessageRole] = useState('user');
  const [parameters, setParameters] = useState(parameterPresets['Balanced']);
  const [selectedPreset, setSelectedPreset] = useState('Balanced');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [messagePriority, setMessagePriority] = useState('all');
  const [selectedTone, setSelectedTone] = useState('professional');

  const updateParameter = (key: string, value: number) => {
    setParameters(prev => ({ ...prev, [key]: value }));
    setSelectedPreset('Custom');
  };

  const loadPreset = (presetName: string) => {
    setParameters(parameterPresets[presetName as keyof typeof parameterPresets]);
    setSelectedPreset(presetName);
  };

  const handleCopyTemplate = async (template: string) => {
    try {
      await navigator.clipboard.writeText(template);
      setCopiedTemplate(template);
      setTimeout(() => setCopiedTemplate(null), 2000);
    } catch (error) {
      console.error('Failed to copy template:', error);
    }
  };

  const getFilteredStrategies = () => {
    if (messagePriority === 'all') return messageStrategies;
    return messageStrategies.filter(strategy => strategy.priority === messagePriority);
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
          Advanced Strategies
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 mb-12 text-lg"
        >
          Unlock GPT's full potential with these advanced prompting techniques and optimizations.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Few-Shot Examples */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Layers className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white">Few-Shot Examples</h3>
            </div>

            <div className="space-y-4">
              {/* Example Builder */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-gray-400">Number of examples:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExampleCount(Math.max(1, exampleCount - 1))}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </button>
                  <span className="text-white font-semibold w-8 text-center">{exampleCount}</span>
                  <button
                    onClick={() => setExampleCount(Math.min(5, exampleCount + 1))}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Examples Display */}
              <div className="space-y-3">
                {fewShotExamples.slice(0, exampleCount).map((example, index) => (
                  <div key={index} className="bg-black/20 border border-white/10 rounded-lg p-3">
                    <div className="text-gray-400 text-xs mb-1">Example {index + 1}:</div>
                    <div className="text-white text-sm mb-2">Input: {example.input}</div>
                    <div className="text-green-300 text-sm">Output: {example.output}</div>
                  </div>
                ))}
              </div>

              {/* Performance Chart Placeholder */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-4 h-4 text-white/80" />
                  <span className="text-white text-sm font-semibold">Performance Impact</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">{exampleCount * 25}%</div>
                    <div className="text-xs text-gray-400">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{exampleCount * 15}%</div>
                    <div className="text-xs text-gray-400">Consistency</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{exampleCount * 10}%</div>
                    <div className="text-xs text-gray-400">Speed</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chain-of-Thought */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white">Chain-of-Thought</h3>
            </div>

            <div className="space-y-4">
              {/* Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-white">Show reasoning steps</span>
                <button
                  onClick={() => setShowChainOfThought(!showChainOfThought)}
                  className="flex items-center gap-2"
                >
                  {showChainOfThought ? (
                    <ToggleRight className="w-6 h-6 text-green-400" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Example Problem */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="text-blue-400 text-sm mb-2">Math Problem:</div>
                <div className="text-white text-sm mb-3">
                  "A store has 120 apples. They sell 30% in the morning and 25% of the remainder in the afternoon. How many apples are left?"
                </div>
                
                {showChainOfThought ? (
                  <div className="bg-black/20 border border-white/10 rounded-lg p-3">
                    <div className="text-green-400 text-sm mb-2">With Chain-of-Thought:</div>
                    <div className="text-green-300 text-sm space-y-1">
                      <div>1. Start: 120 apples</div>
                      <div>2. Morning sales: 120 × 30% = 36 apples</div>
                      <div>3. After morning: 120 - 36 = 84 apples</div>
                      <div>4. Afternoon sales: 84 × 25% = 21 apples</div>
                      <div>5. Final answer: 84 - 21 = 63 apples left</div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-black/20 border border-white/10 rounded-lg p-3">
                    <div className="text-red-400 text-sm mb-2">Without Chain-of-Thought:</div>
                    <div className="text-red-300 text-sm">
                      63 apples are left.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* System vs User Messages */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white">System vs User Messages</h3>
            </div>

            <div className="space-y-4">
              {/* Role Selector */}
              <div className="flex gap-2">
                <button
                  onClick={() => setMessageRole('system')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    messageRole === 'system'
                      ? 'bg-white/20 text-white border border-white/30'
                      : 'bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  System
                </button>
                <button
                  onClick={() => setMessageRole('user')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    messageRole === 'user'
                      ? 'bg-white/20 text-white border border-white/30'
                      : 'bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  User
                </button>
              </div>

              {/* Message Examples */}
              <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-2">{messageRole === 'system' ? 'System' : 'User'} Message Example:</div>
                <code className="text-white text-sm">
                  {messageRole === 'system' 
                    ? 'You are a helpful assistant that always responds in JSON format with "answer" and "confidence" fields.'
                    : 'What are the benefits of renewable energy? Please provide a detailed analysis.'
                  }
                </code>
              </div>
            </div>
          </motion.div>

          {/* Parameter Tuning */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sliders className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white">Parameter Tuning</h3>
            </div>

            <div className="space-y-4">
              {/* Preset Selector */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {Object.keys(parameterPresets).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => loadPreset(preset)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedPreset === preset
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Parameter Sliders */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white text-sm">Temperature</span>
                    <span className="text-gray-400 text-sm">{parameters.temperature}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={parameters.temperature}
                    onChange={(e) => updateParameter('temperature', parseFloat(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none slider"
                  />
                  <div className="text-xs text-gray-400">Lower = more focused, Higher = more creative</div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white text-sm">Top-p</span>
                    <span className="text-gray-400 text-sm">{parameters.top_p}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={parameters.top_p}
                    onChange={(e) => updateParameter('top_p', parseFloat(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none slider"
                  />
                  <div className="text-xs text-gray-400">Controls diversity of word choices</div>
                </div>
              </div>

              {/* Live Preview */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="text-white text-sm font-semibold mb-2">Output Preview:</div>
                <div className="text-gray-300 text-sm">
                  {parameters.temperature > 0.7 
                    ? 'Creative, varied, and experimental responses'
                    : parameters.temperature > 0.4
                    ? 'Balanced responses with good variety'
                    : 'Focused, consistent, and precise responses'
                  }
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Structured Output & JSON */}
        <motion.div
          variants={fadeInUp}
          className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-6 h-6 text-white/80" />
            <h3 className="text-xl font-semibold text-white">Structured Output & JSON</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Schema Builder */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">JSON Schema Builder</h4>
              <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                <code className="text-white text-sm">
                  {`{
  "type": "object",
  "properties": {
    "summary": {"type": "string"},
    "key_points": {
      "type": "array",
      "items": {"type": "string"}
    },
    "confidence": {
      "type": "string",
      "enum": ["high", "medium", "low"]
    }
  },
  "required": ["summary", "key_points"]
}`}
                </code>
              </div>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg border border-white/20 transition-colors">
                Generate Schema
              </button>
            </div>

            {/* Function Calling */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Function Calling</h4>
              <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                <code className="text-white text-sm">
                  {`{
  "name": "get_weather",
  "description": "Get current weather",
  "parameters": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "City name"
      }
    },
    "required": ["location"]
  }
}`}
                </code>
              </div>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg border border-white/20 transition-colors">
                Test Function
              </button>
            </div>
          </div>
        </motion.div>

        {/* Copy-Ready Templates */}
        <motion.div
          variants={fadeInUp}
          className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Type className="w-6 h-6 text-white/80" />
            <h3 className="text-xl font-semibold text-white">Copy-Ready Templates</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {promptTemplates.map((template, index) => (
              <div
                key={index}
                className={`bg-white/5 border border-white/10 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedTemplate === index ? 'bg-white/10 border-white/20' : 'hover:bg-white/10'
                }`}
                onClick={() => setSelectedTemplate(selectedTemplate === index ? null : index)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-400">
                      {template.category}
                    </span>
                    <h4 className="text-white font-semibold mt-2">{template.title}</h4>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyTemplate(template.template);
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
        </motion.div>

        {/* User vs System Message Strategy */}
        <motion.div
          variants={fadeInUp}
          className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-6 h-6 text-white/80" />
            <h3 className="text-xl font-semibold text-white">User vs System Message Strategy</h3>
          </div>

          {/* Priority Filter */}
          <div className="flex gap-2 mb-6">
            {['all', 'high', 'medium'].map((priority) => (
              <button
                key={priority}
                onClick={() => setMessagePriority(priority)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  messagePriority === priority
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {priority} Priority
              </button>
            ))}
          </div>

          {/* Message Strategy Cards */}
          <div className="space-y-4">
            {getFilteredStrategies().map((strategy, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      strategy.type === 'system' 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {strategy.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      strategy.priority === 'high' 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {strategy.priority}
                    </span>
                    <h4 className="text-white font-semibold">{strategy.title}</h4>
                  </div>
                  <button
                    onClick={() => handleCopyTemplate(strategy.example)}
                    className="bg-white/10 hover:bg-white/20 p-2 rounded-lg border border-white/20 transition-colors"
                  >
                    <Copy className="w-4 h-4 text-white" />
                  </button>
                </div>
                
                <p className="text-gray-400 text-sm mb-3">{strategy.purpose}</p>
                
                <div className="bg-black/20 border border-white/10 rounded-lg p-3">
                  <code className="text-white text-sm">{strategy.example}</code>
                </div>
              </div>
            ))}
          </div>

          {/* Message Builder */}
          <div className="mt-6 bg-white/5 border border-white/10 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Interactive Message Builder</h4>
            <div className="space-y-4">
              {/* Tone Selector */}
              <div>
                <label className="text-white text-sm mb-2 block">Select Tone:</label>
                <div className="flex gap-2">
                  {['professional', 'casual', 'technical', 'creative'].map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSelectedTone(tone)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                        selectedTone === tone
                          ? 'bg-white/20 text-white border border-white/30'
                          : 'bg-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generated Message Preview */}
              <div className="bg-black/20 border border-white/10 rounded-lg p-3">
                <div className="text-gray-400 text-sm mb-2">Generated {messageRole} message with {selectedTone} tone:</div>
                <code className="text-white text-sm">
                  {messageRole === 'system' 
                    ? `You are a ${selectedTone} assistant specialized in providing high-quality responses. Always maintain a ${selectedTone} tone and provide thorough, well-structured answers.`
                    : `Please analyze the following data using a ${selectedTone} approach. Provide insights that would be valuable for decision-making in this context.`
                  }
                </code>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Copy Notification */}
      <AnimatePresence>
        {copiedTemplate && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            Template copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}