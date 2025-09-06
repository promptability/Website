'use client';

import { useState } from 'react';
import { 
  Zap, Brain, Shield, Globe, Users, BarChart3, 
  Sparkles, Lock, Cloud, Palette, Code, Settings,
  FileText, MessageSquare, TrendingUp, Award, Layers, Timer
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Learning Engine',
    description: 'Our AI learns from every edit you make, continuously improving its understanding of your prompt style.',
    category: 'Core'
  },
  {
    icon: Zap,
    title: 'Real-time Optimization',
    description: 'Get instant suggestions as you type, with context-aware improvements tailored to your specific use case.',
    category: 'Core'
  },
  {
    icon: Globe,
    title: 'Multi-platform Support',
    description: 'Works seamlessly with ChatGPT, Claude, Gemini, Perplexity, and 15+ other AI platforms.',
    category: 'Integration'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your prompts stay private. All processing happens locally with optional cloud sync.',
    category: 'Security'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share prompt templates and best practices across your entire team.',
    category: 'Collaboration'
  },
  {
    icon: BarChart3,
    title: 'Success Analytics',
    description: 'Track which prompts work best and understand why with detailed analytics.',
    category: 'Analytics'
  },
  {
    icon: Sparkles,
    title: 'Smart Templates',
    description: 'Access hundreds of pre-built templates optimized for specific tasks and industries.',
    category: 'Productivity'
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'SSO, audit logs, and compliance certifications for enterprise deployments.',
    category: 'Security'
  },
  {
    icon: Cloud,
    title: 'Cloud Sync',
    description: 'Access your prompt history and preferences across all your devices.',
    category: 'Integration'
  },
  {
    icon: Palette,
    title: 'Custom Themes',
    description: 'Personalize your interface with custom themes and layouts.',
    category: 'Customization'
  },
  {
    icon: Code,
    title: 'API Access',
    description: 'Integrate prompt optimization into your own applications and workflows.',
    category: 'Integration'
  },
  {
    icon: Settings,
    title: 'Advanced Settings',
    description: 'Fine-tune the AI behavior to match your specific needs and preferences.',
    category: 'Customization'
  },
  {
    icon: FileText,
    title: 'Export Capabilities',
    description: 'Export your prompts and analytics in various formats for reporting.',
    category: 'Productivity'
  },
  {
    icon: MessageSquare,
    title: 'Context Memory',
    description: 'Maintains context across conversations for more coherent interactions.',
    category: 'Core'
  },
  {
    icon: TrendingUp,
    title: 'Performance Metrics',
    description: 'Track response quality, token usage, and cost optimization in real-time.',
    category: 'Analytics'
  },
  {
    icon: Award,
    title: 'Quality Scoring',
    description: 'Get instant feedback on prompt quality with our proprietary scoring system.',
    category: 'Analytics'
  },
  {
    icon: Layers,
    title: 'Version Control',
    description: 'Track changes and revert to previous versions of your prompts.',
    category: 'Productivity'
  },
  {
    icon: Timer,
    title: 'Scheduled Tasks',
    description: 'Schedule prompts to run automatically at specified times.',
    category: 'Productivity'
  }
];

const categories = ['All', 'Core', 'Integration', 'Security', 'Collaboration', 'Analytics', 'Productivity', 'Customization'];

export default function FeaturesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFeatures = selectedCategory === 'All' 
    ? features 
    : features.filter(f => f.category === selectedCategory);

  return (
    <main className="min-h-screen py-20 text-white relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.3]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 relative z-40">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Features that
            <span className="block text-white/90">
              Supercharge Your AI
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to write better prompts, get better responses, and save time with AI.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              {category}
              {category !== 'All' && (
                <span className="ml-2 text-sm opacity-70">
                  {features.filter(f => f.category === category).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <div key={index} className="group">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 h-full transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-white/80" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">{feature.description}</p>
                  
                  {/* Category Badge */}
                  <span className="inline-block px-2 py-1 bg-white/10 text-white/70 text-xs rounded-md">
                    {feature.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your AI Experience?
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              Join thousands of professionals who are already writing better prompts with Promptability AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all">
                Start Free Trial
              </button>
              <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
