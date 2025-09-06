'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check, X, Minus, ChevronDown } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface ComparisonFeature {
  feature: string;
  gemini: 'full' | 'partial' | 'none';
  gpt4: 'full' | 'partial' | 'none';
  claude: 'full' | 'partial' | 'none';
  details?: {
    gemini?: string;
    gpt4?: string;
    claude?: string;
  };
}

const comparisonData: ComparisonFeature[] = [
  {
    feature: 'Context Length',
    gemini: 'full',
    gpt4: 'partial',
    claude: 'full',
    details: {
      gemini: '32K tokens',
      gpt4: '8K-128K tokens',
      claude: '200K tokens'
    }
  },
  {
    feature: 'Image Understanding',
    gemini: 'full',
    gpt4: 'full',
    claude: 'full',
    details: {
      gemini: 'Native multimodal, single image',
      gpt4: 'Vision API, multiple images',
      claude: 'Vision, multiple images'
    }
  },
  {
    feature: 'Real-time Web Search',
    gemini: 'full',
    gpt4: 'none',
    claude: 'none',
    details: {
      gemini: 'Built-in Google Search',
      gpt4: 'No real-time search',
      claude: 'No real-time search'
    }
  },
  {
    feature: 'Code Generation',
    gemini: 'full',
    gpt4: 'full',
    claude: 'full',
    details: {
      gemini: 'Good for most languages',
      gpt4: 'Excellent across all languages',
      claude: 'Strong code reasoning'
    }
  },
  {
    feature: 'Document Analysis',
    gemini: 'partial',
    gpt4: 'full',
    claude: 'full',
    details: {
      gemini: 'Basic PDF/text processing',
      gpt4: 'Advanced document understanding',
      claude: 'Excellent long-form analysis'
    }
  },
  {
    feature: 'Function Calling',
    gemini: 'full',
    gpt4: 'full',
    claude: 'partial',
    details: {
      gemini: 'Native function calling',
      gpt4: 'Robust function calling',
      claude: 'Tool use capabilities'
    }
  }
];

const getIcon = (status: 'full' | 'partial' | 'none') => {
  switch (status) {
    case 'full':
      return <Check className="w-4 h-4 text-green-400" />;
    case 'partial':
      return <Minus className="w-4 h-4 text-yellow-400" />;
    case 'none':
      return <X className="w-4 h-4 text-red-400" />;
  }
};

const getStatusColor = (status: 'full' | 'partial' | 'none') => {
  switch (status) {
    case 'full':
      return 'bg-green-500/10 border-green-500/20';
    case 'partial':
      return 'bg-yellow-500/10 border-yellow-500/20';
    case 'none':
      return 'bg-red-500/10 border-red-500/20';
  }
};

export default function ComparisonTable() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (feature: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(feature)) {
      newExpanded.delete(feature);
    } else {
      newExpanded.add(feature);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <section id="comparison" className="py-16">
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
          Gemini vs Others
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 mb-12 text-lg"
        >
          See how Gemini compares to other leading AI models across key features.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 p-6 border-b border-white/10 bg-white/5">
            <div className="font-semibold text-white">Feature</div>
            <div className="font-semibold text-white text-center">Gemini</div>
            <div className="font-semibold text-white text-center">GPT-4</div>
            <div className="font-semibold text-white text-center">Claude</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/10">
            {comparisonData.map((row, index) => (
              <motion.div
                key={row.feature}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => toggleRow(row.feature)}
                  className="w-full grid grid-cols-4 gap-4 p-6 hover:bg-white/5 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-white">{row.feature}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedRows.has(row.feature) ? 'rotate-180' : ''
                    }`} />
                  </div>
                  
                  <div className="flex justify-center">
                    <div className={`p-2 rounded-lg border ${getStatusColor(row.gemini)}`}>
                      {getIcon(row.gemini)}
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className={`p-2 rounded-lg border ${getStatusColor(row.gpt4)}`}>
                      {getIcon(row.gpt4)}
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className={`p-2 rounded-lg border ${getStatusColor(row.claude)}`}>
                      {getIcon(row.claude)}
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {expandedRows.has(row.feature) && row.details && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-4 gap-4 px-6 pb-6 bg-white/5"
                  >
                    <div></div>
                    <div className="text-sm text-gray-300">{row.details.gemini}</div>
                    <div className="text-sm text-gray-300">{row.details.gpt4}</div>
                    <div className="text-sm text-gray-300">{row.details.claude}</div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}