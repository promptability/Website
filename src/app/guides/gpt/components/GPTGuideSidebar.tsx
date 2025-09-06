'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Eye, 
  BookOpen, 
  Zap, 
  GitCompare, 
  AlertTriangle, 
  FileText,
  TestTube,
  Download
} from 'lucide-react';

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: Eye },
  { id: 'principles', label: 'Core Principles', icon: BookOpen },
  { id: 'advanced', label: 'Advanced Strategies', icon: Zap },
  { id: 'comparisons', label: 'Model Comparisons', icon: GitCompare },
  { id: 'mistakes', label: 'Common Mistakes', icon: AlertTriangle },
  { id: 'references', label: 'Best References', icon: FileText },
  { id: 'playground', label: 'Interactive Playground', icon: TestTube },
  { id: 'download', label: 'Download Guide', icon: Download },
];

export default function GPTGuideSidebar() {
  const [activeSection, setActiveSection] = useState('overview');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.id);
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-24 h-fit">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
      >
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Reading Progress</span>
            <span className="text-sm text-white">{Math.round(scrollProgress)}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white/60"
              style={{ width: `${scrollProgress}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ x: 4 }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                  isActive 
                    ? 'bg-white/10 text-white border border-white/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <IconComponent className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="gptActiveIndicator"
                    className="ml-auto w-2 h-2 bg-white rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
          <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm border border-white/20">
            Search Guide
          </button>
          <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm border border-white/20">
            Bookmark This
          </button>
        </div>
      </motion.div>
    </div>
  );
}