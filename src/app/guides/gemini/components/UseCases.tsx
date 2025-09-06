'use client';

import { motion } from 'framer-motion';
import { 
  Globe, 
  Eye, 
  FileText, 
  Code, 
  GraduationCap, 
  Workflow,
  TrendingUp,
  Play
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface UseCase {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  prompt: string;
  metrics: string;
}

const useCases: UseCase[] = [
  {
    id: 'real-time-info',
    icon: Globe,
    title: 'Real-time Information',
    description: 'Get the latest data and current events with built-in web search',
    prompt: 'Using web search, what are the current stock prices for Apple, Google, and Microsoft? Include percentage changes from yesterday and any major news affecting these stocks today.',
    metrics: '95% accuracy • Real-time data • Cited sources'
  },
  {
    id: 'image-understanding',
    icon: Eye,
    title: 'Image Understanding',
    description: 'Analyze images, extract text, and understand visual content',
    prompt: 'Analyze this screenshot of my website and provide specific UX improvements. Focus on layout, color scheme, and user flow issues.',
    metrics: '90% detail recognition • Text extraction • Visual analysis'
  },
  {
    id: 'document-analysis',
    icon: FileText,
    title: 'Document Analysis',
    description: 'Process PDFs, contracts, and long-form content efficiently',
    prompt: 'Read this contract and create a summary table with: key terms, obligations for each party, important dates, and potential risks or concerns.',
    metrics: '85% accuracy • Structured output • Key insights'
  },
  {
    id: 'coding-assistant',
    icon: Code,
    title: 'Coding Assistant',
    description: 'Debug code, explain algorithms, and generate solutions',
    prompt: 'Debug this Python function and explain why it\'s failing. Then provide a corrected version with comments explaining the fixes.',
    metrics: '88% bug detection • Clear explanations • Best practices'
  },
  {
    id: 'multimodal-education',
    icon: GraduationCap,
    title: 'Multimodal Education',
    description: 'Learn from images, diagrams, and visual content',
    prompt: 'Look at this physics diagram and explain the concept it illustrates. Then create 3 practice problems based on the same principle.',
    metrics: '92% concept accuracy • Interactive learning • Practice generation'
  },
  {
    id: 'workflow-automation',
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Create systematic processes and repeatable workflows',
    prompt: 'Design a content creation workflow for social media. Include research, writing, approval, and posting steps. Format as a checklist with time estimates.',
    metrics: '80% time savings • Systematic approach • Scalable processes'
  }
];

export default function UseCases() {
  const handleTryInTester = (prompt: string) => {
    // Scroll to interactive tester and populate with prompt
    const testerElement = document.getElementById('try-live');
    if (testerElement) {
      testerElement.scrollIntoView({ behavior: 'smooth' });
      // Could dispatch custom event to populate tester
      window.dispatchEvent(new CustomEvent('populateTester', { detail: { prompt } }));
    }
  };

  return (
    <section id="use-cases" className="py-16">
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
          Best Use Cases
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 mb-12 text-lg"
        >
          Discover where Gemini excels and learn proven prompts for each scenario.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            
            return (
              <motion.div
                key={useCase.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                {/* Icon and Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/15 transition-colors">
                    <IconComponent className="w-6 h-6 text-white/80" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{useCase.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {useCase.description}
                </p>

                {/* Example Prompt */}
                <div className="bg-black/20 border border-white/10 rounded-lg p-4 mb-4">
                  <div className="text-xs text-gray-400 mb-2">Example Prompt:</div>
                  <code className="text-white text-sm leading-relaxed">
                    {useCase.prompt}
                  </code>
                </div>

                {/* Metrics */}
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">{useCase.metrics}</span>
                </div>

                {/* Try Button */}
                <button
                  onClick={() => handleTryInTester(useCase.prompt)}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg border border-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Try in Tester
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}