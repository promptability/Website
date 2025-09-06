'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const insightCards = [
  {
    id: 'why-prompts-matter',
    icon: AlertCircle,
    title: 'Why Prompts Matter',
    stat: '73%',
    description: 'of users get poor results due to ineffective prompting',
    details: 'Most people treat AI like a search engine, leading to generic responses. Proper prompting can improve output quality by 5-10x.',
    color: 'red'
  },
  {
    id: 'good-prompt-elements',
    icon: CheckCircle,
    title: 'What Makes a Good Prompt',
    stat: '6',
    description: 'key elements separate great prompts from mediocre ones',
    details: 'Clear intent, specific context, desired format, constraints, examples, and role definition create consistently better results.',
    color: 'green'
  },
  {
    id: 'quick-wins',
    icon: TrendingUp,
    title: 'Quick Start Examples',
    stat: '3x',
    description: 'better results with simple improvements',
    details: 'Adding just "Be specific and detailed" to your prompts can triple output quality. Small changes, massive improvements.',
    color: 'blue'
  }
];

const beforeAfterExamples = [
  {
    before: 'Write a blog post about AI',
    after: 'Write a 1,200-word blog post about AI\'s impact on healthcare for medical professionals. Include recent case studies, ethical considerations, and practical implementation steps.',
    improvement: '+340% specificity'
  },
  {
    before: 'Help me with my resume',
    after: 'As a senior HR manager, review my software engineer resume and provide specific feedback on: technical skills presentation, project descriptions, and overall structure. Format as a bulleted action plan.',
    improvement: '+250% relevance'
  }
];

export default function Overview() {
  return (
    <section id="overview" className="py-16">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {/* Opening Statement */}
        <motion.div
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Why This Guide Exists
          </h2>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-lg text-gray-300 leading-relaxed">
              Most people use ChatGPT like a search engine, typing quick questions and getting mediocre results. 
              But with the right prompting techniques, you can unlock GPT-4's full potential and get responses 
              that are more accurate, creative, and useful than you ever thought possible.
            </p>
          </div>
        </motion.div>

        {/* Insight Cards */}
        <motion.div
          variants={fadeInUp}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {insightCards.map((card, index) => {
            const IconComponent = card.icon;
            const colorClasses = {
              red: 'bg-red-500/10 border-red-500/20',
              green: 'bg-green-500/10 border-green-500/20',
              blue: 'bg-blue-500/10 border-blue-500/20'
            };
            
            return (
              <motion.div
                key={card.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className={`${colorClasses[card.color as keyof typeof colorClasses]} backdrop-blur-xl rounded-2xl p-6 hover:bg-white/5 transition-all duration-300 group`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white/80" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-3xl font-bold text-white mb-1">{card.stat}</div>
                  <div className="text-sm text-gray-400">{card.description}</div>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {card.details}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Before/After Showcase */}
        <motion.div
          variants={fadeInUp}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">See the Difference</h3>
            <p className="text-gray-400">Small changes in prompting technique create dramatically better results</p>
          </div>

          <div className="space-y-8">
            {beforeAfterExamples.map((example, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-6">
                {/* Before */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500/60 rounded-full"></div>
                    <span className="text-red-400 text-sm font-semibold">Typical Prompt</span>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <code className="text-red-300 text-sm">{example.before}</code>
                  </div>
                </div>

                {/* After */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500/60 rounded-full"></div>
                    <span className="text-green-400 text-sm font-semibold">Optimized Prompt</span>
                    <span className="ml-auto text-xs text-green-400">{example.improvement}</span>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <code className="text-green-300 text-sm">{example.after}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}