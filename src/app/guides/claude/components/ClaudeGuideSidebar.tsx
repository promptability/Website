'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Scale, 
  AlertTriangle, 
  BookOpen, 
  ExternalLink, 
  TestTube,
  ChevronRight
} from 'lucide-react';

const sections = [
  {
    id: 'constitution',
    title: 'Core Rules & Constitution',
    icon: Shield,
    subsections: ['Three Hs Framework', 'Constitutional AI', 'Safety Principles']
  },
  {
    id: 'advanced',
    title: 'Advanced Tricks',
    icon: Zap,
    subsections: ['200K Context', 'Chain-of-Thought', 'XML Formatting']
  },
  {
    id: 'comparison',
    title: 'Claude vs GPT-4',
    icon: Scale,
    subsections: ['Feature Comparison', 'Tone Mirroring', 'Use Case Guide']
  },
  {
    id: 'pitfalls',
    title: 'Common Pitfalls',
    icon: AlertTriangle,
    subsections: ['Safety Triggers', 'Context Limits', 'Format Issues']
  },
  {
    id: 'examples',
    title: 'Example Prompts',
    icon: BookOpen,
    subsections: ['Templates', 'Real-world Cases', 'Best Practices']
  },
  {
    id: 'lab',
    title: 'Claude Lab',
    icon: TestTube,
    subsections: ['Live Testing', 'Prompt Optimizer', 'Compare Models']
  },
  {
    id: 'resources',
    title: 'Resources',
    icon: ExternalLink,
    subsections: ['Documentation', 'Research Papers', 'Community']
  }
];

export default function ClaudeGuideSidebar() {
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Update active section based on scroll position
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="hidden lg:block w-80 sticky top-20 h-fit">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm font-semibold">Guide Progress</span>
            <span className="text-gray-400 text-sm">{Math.round(scrollProgress)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
              style={{ width: `${scrollProgress}%` }}
              transition={{ type: 'spring', stiffness: 100 }}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            const isExpanded = expandedSection === section.id;
            
            return (
              <div key={section.id}>
                <button
                  onClick={() => {
                    scrollToSection(section.id);
                    setExpandedSection(isExpanded ? null : section.id);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    isActive 
                      ? 'bg-white/20 text-white border border-white/30' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium text-sm flex-1">{section.title}</span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Subsections */}
                <motion.div
                  initial={false}
                  animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="ml-7 mt-1 space-y-1">
                    {section.subsections.map((subsection, index) => (
                      <button
                        key={index}
                        className="block w-full text-left px-2 py-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {subsection}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-white font-semibold text-sm mb-3">Claude 3 Models</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Opus</span>
              <span className="text-white">Most Capable</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Sonnet</span>
              <span className="text-white">Balanced</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Haiku</span>
              <span className="text-white">Fastest</span>
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <button 
            onClick={() => scrollToSection('lab')}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <TestTube className="w-4 h-4" />
            Try Claude Lab
          </button>
        </div>
      </div>
    </aside>
  );
}