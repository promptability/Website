'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Brain, 
  Code, 
  MessageSquare, 
  Copy, 
  Search,
  Filter,
  Tag,
  ChevronDown,
  Play,
  Star
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const promptCategories = [
  {
    id: 'document-analysis',
    title: 'Document Summarization',
    icon: FileText,
    color: 'blue',
    description: 'Analyze and summarize long documents with Claude&apos;s 200K context',
    templates: [
      {
        title: 'Comprehensive Document Analysis',
        complexity: 'advanced',
        template: `<document>
[PASTE YOUR DOCUMENT HERE - up to 200K tokens]
</document>

<analysis_requirements>
- Executive summary (2-3 sentences)
- Key findings (top 5 points)
- Recommendations (actionable items)
- Risk assessment
- Next steps
</analysis_requirements>

Please analyze this document and provide insights in the specified format. Focus on business implications and strategic recommendations.`,
        variables: ['document', 'analysis_requirements'],
        useCase: 'Business reports, research papers, legal documents'
      },
      {
        title: 'Multi-Document Comparison',
        complexity: 'expert',
        template: `<document_1>
[FIRST DOCUMENT]
</document_1>

<document_2>
[SECOND DOCUMENT]
</document_2>

<comparison_framework>
- Similarities: What do both documents agree on?
- Differences: Where do they diverge?
- Contradictions: Any conflicting information?
- Gaps: What&apos;s missing from either document?
- Synthesis: Combined insights
</comparison_framework>

Compare these documents using the framework above and provide a unified analysis.`,
        variables: ['document_1', 'document_2', 'comparison_framework'],
        useCase: 'Research synthesis, competitive analysis, policy comparison'
      }
    ]
  },
  {
    id: 'reasoning',
    title: 'Chain-of-Thought Reasoning',
    icon: Brain,
    color: 'purple',
    description: 'Leverage Claude&apos;s reasoning capabilities with structured thinking',
    templates: [
      {
        title: 'Complex Problem Solver',
        complexity: 'intermediate',
        template: `<problem>
[DESCRIBE YOUR COMPLEX PROBLEM HERE]
</problem>

<thinking_framework>
Think through this step-by-step:
1. Problem decomposition: Break down into smaller parts
2. Key assumptions: What am I assuming?
3. Available information: What do I know?
4. Missing information: What do I need to find out?
5. Potential solutions: What are my options?
6. Evaluation criteria: How do I choose the best option?
7. Implementation plan: How do I execute?
</thinking_framework>

Work through this framework systematically and provide your reasoning and conclusion.`,
        variables: ['problem', 'thinking_framework'],
        useCase: 'Strategic planning, troubleshooting, decision making'
      },
      {
        title: 'Research Question Explorer',
        complexity: 'advanced',
        template: `<research_question>
[YOUR RESEARCH QUESTION]
</research_question>

<exploration_method>
Please explore this question using the following approach:

1. **Context Setting**: What background information is relevant?
2. **Multiple Perspectives**: What are different viewpoints on this?
3. **Evidence Analysis**: What evidence supports each perspective?
4. **Limitations**: What are the constraints or unknowns?
5. **Synthesis**: What can we conclude with confidence?
6. **Further Research**: What questions remain?
</exploration_method>

Provide a thorough academic exploration following this structure.`,
        variables: ['research_question', 'exploration_method'],
        useCase: 'Academic research, market analysis, hypothesis testing'
      }
    ]
  },
  {
    id: 'creative',
    title: 'Creative & Role-Specific',
    icon: MessageSquare,
    color: 'green',
    description: 'Creative tasks and role-based prompts using Claude&apos;s persona capabilities',
    templates: [
      {
        title: 'Expert Persona Template',
        complexity: 'beginner',
        template: `<role>
You are a [EXPERT TYPE] with [X] years of experience in [FIELD]. Your expertise includes [SPECIFIC AREAS]. You communicate in a [COMMUNICATION STYLE] manner and always provide [TYPE OF INSIGHTS].
</role>

<context>
I am a [YOUR ROLE/BACKGROUND] working on [PROJECT/SITUATION]. I need help with [SPECIFIC CHALLENGE].
</context>

<task>
[SPECIFIC REQUEST WITH DELIVERABLES]
</task>

<constraints>
- Keep response under [WORD LIMIT] words
- Use [TECHNICAL LEVEL] language
- Include [SPECIFIC REQUIREMENTS]
</constraints>`,
        variables: ['role', 'context', 'task', 'constraints'],
        useCase: 'Expert consultation, specialized advice, professional guidance'
      },
      {
        title: 'Creative Writing Director',
        complexity: 'intermediate',
        template: `<creative_brief>
Project: [PROJECT TYPE]
Genre: [GENRE/STYLE]
Target Audience: [AUDIENCE DESCRIPTION]
Tone: [EMOTIONAL TONE]
Length: [WORD COUNT/DURATION]
</creative_brief>

<inspiration>
Draw inspiration from: [REFERENCE WORKS/STYLES]
Avoid these elements: [ELEMENTS TO AVOID]
Must include: [REQUIRED ELEMENTS]
</inspiration>

<structure>
Format the output as:
- Opening hook
- Main content with [SPECIFIC STRUCTURE]
- Strong conclusion
</structure>

Create [SPECIFIC DELIVERABLE] following this brief.`,
        variables: ['creative_brief', 'inspiration', 'structure'],
        useCase: 'Content creation, storytelling, marketing copy'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Code & Technical Analysis',
    icon: Code,
    color: 'orange',
    description: 'Code review, technical documentation, and programming assistance',
    templates: [
      {
        title: 'Code Review & Optimization',
        complexity: 'advanced',
        template: `<code_review_request>
Language: [PROGRAMMING LANGUAGE]
Context: [PROJECT CONTEXT/PURPOSE]
Focus Areas: [PERFORMANCE/SECURITY/MAINTAINABILITY/etc.]
</code_review_request>

<code>
\`\`\`[LANGUAGE]
[PASTE YOUR CODE HERE]
\`\`\`
</code>

<review_criteria>
Please provide:
1. **Security Analysis**: Potential vulnerabilities
2. **Performance Review**: Bottlenecks and optimizations
3. **Code Quality**: Readability, maintainability, best practices
4. **Bug Detection**: Potential issues or edge cases
5. **Improvement Suggestions**: Specific code improvements with examples
6. **Overall Rating**: 1-10 with justification
</review_criteria>

Provide a thorough technical review following these criteria.`,
        variables: ['code_review_request', 'code', 'review_criteria'],
        useCase: 'Code reviews, optimization, debugging, best practices'
      }
    ]
  }
];

export default function ExamplePrompts() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('document-analysis');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterComplexity, setFilterComplexity] = useState('all');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'beginner': return 'bg-green-500/20 text-green-400';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced': return 'bg-orange-500/20 text-orange-400';
      case 'expert': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
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

  const filteredCategories = promptCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="examples" className="py-16">
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
          Example Prompts Library
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 mb-8 text-lg"
        >
          Copy-ready templates optimized for Claude&apos;s capabilities and limitations.
        </motion.p>

        {/* Search and Filter */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search prompts..."
              className="w-full pl-10 pr-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-400 text-sm"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterComplexity}
              onChange={(e) => setFilterComplexity(e.target.value)}
              className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </motion.div>

        {/* Category Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <motion.div
                key={category.id}
                variants={fadeInUp}
                transition={{ delay: categoryIndex * 0.1 }}
                className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all ${
                  isSelected ? 'bg-white/10 border-white/20' : ''
                }`}
              >
                {/* Category Header */}
                <button
                  onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                  className="w-full flex items-center gap-4 p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    category.color === 'blue' ? 'bg-blue-500/20 border border-blue-500/30' :
                    category.color === 'purple' ? 'bg-purple-500/20 border border-purple-500/30' :
                    category.color === 'green' ? 'bg-green-500/20 border border-green-500/30' :
                    'bg-orange-500/20 border border-orange-500/30'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      category.color === 'blue' ? 'text-blue-400' :
                      category.color === 'purple' ? 'text-purple-400' :
                      category.color === 'green' ? 'text-green-400' :
                      'text-orange-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{category.title}</h3>
                    <p className="text-gray-400 text-sm">{category.description}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: isSelected ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>

                {/* Templates */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/10"
                    >
                      <div className="p-6 space-y-4">
                        {category.templates
                          .filter(template => 
                            filterComplexity === 'all' || template.complexity === filterComplexity
                          )
                          .map((template, templateIndex) => (
                          <div
                            key={templateIndex}
                            className="bg-white/5 border border-white/10 rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <h4 className="text-white font-semibold text-sm">{template.title}</h4>
                                <span className={`text-xs px-2 py-1 rounded-full ${getComplexityColor(template.complexity)}`}>
                                  {template.complexity}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    // Populate playground with template
                                    document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' });
                                    window.dispatchEvent(new CustomEvent('populateClaudeLab', { 
                                      detail: { prompt: template.template } 
                                    }));
                                  }}
                                  className="bg-white/10 hover:bg-white/20 p-2 rounded-lg border border-white/20 transition-colors"
                                >
                                  <Play className="w-3 h-3 text-white" />
                                </button>
                                <button
                                  onClick={() => handleCopy(template.template)}
                                  className="bg-white/10 hover:bg-white/20 p-2 rounded-lg border border-white/20 transition-colors"
                                >
                                  <Copy className="w-3 h-3 text-white" />
                                </button>
                              </div>
                            </div>

                            <p className="text-gray-400 text-sm mb-3">{template.useCase}</p>

                            {/* Template Preview */}
                            <div 
                              className="bg-black/20 border border-white/10 rounded-lg p-3 cursor-pointer hover:bg-black/30 transition-colors"
                              onClick={() => setSelectedTemplate(selectedTemplate === templateIndex ? null : templateIndex)}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-white text-sm font-medium">View Template</span>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                                  selectedTemplate === templateIndex ? 'rotate-180' : ''
                                }`} />
                              </div>
                              
                              <AnimatePresence>
                                {selectedTemplate === templateIndex && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="mt-3 pt-3 border-t border-white/10"
                                  >
                                    <code className="text-white text-xs whitespace-pre-wrap block mb-3">
                                      {template.template}
                                    </code>
                                    
                                    {/* Variables Guide */}
                                    <div className="bg-white/5 border border-white/10 rounded p-2">
                                      <div className="text-gray-400 text-xs mb-1">Variables to customize:</div>
                                      <div className="flex flex-wrap gap-1">
                                        {template.variables.map((variable, idx) => (
                                          <span key={idx} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                                            {variable}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          variants={fadeInUp}
          className="mt-8 text-center"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Get More Templates</h3>
            <p className="text-gray-400 mb-6 text-sm">
              Access our complete library of 100+ Claude-optimized prompt templates
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/20 transition-colors flex items-center justify-center gap-2">
                <BookOpen className="w-4 h-4" />
                Download Complete Library
              </button>
              <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-semibold px-6 py-3 rounded-lg border border-blue-500/30 transition-colors flex items-center justify-center gap-2">
                <Star className="w-4 h-4" />
                Join Premium for More
              </button>
            </div>
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
            Template copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}