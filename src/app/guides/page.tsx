'use client';

import { useState } from 'react';
import { 
  Search, Filter, Grid3X3, List, BarChart3, Clock, Star, 
  ChevronDown, ArrowRight, BookOpen, Users, Award, Target,
  MessageSquare, Image, Code, Video, Mic, FileText, Zap,
  Brain, Globe, Shield, Sparkles, TrendingUp, Play, Download
} from 'lucide-react';
import Link from 'next/link';

const platformCategories = [
  { id: 'all', label: 'All', icon: Grid3X3, count: 45 },
  { id: 'chat', label: 'Chat AI', icon: MessageSquare, count: 15 },
  { id: 'image', label: 'Image AI', icon: Image, count: 12 },
  { id: 'code', label: 'Code AI', icon: Code, count: 8 },
  { id: 'video', label: 'Video AI', icon: Video, count: 6 },
  { id: 'audio', label: 'Audio AI', icon: Mic, count: 4 },
];

const sortOptions = [
  { id: 'popular', label: 'Popular', icon: Star },
  { id: 'updated', label: 'Recently Updated', icon: Clock },
  { id: 'alphabetical', label: 'A-Z', icon: BarChart3 },
];

const featuredGuides = [
  {
    title: 'ChatGPT/GPT-4 Guide',
    description: '32K context | Function calling | Most popular',
    topics: ['System messages', 'Temperature control', 'Chain-of-thought'],
    difficulty: 'Beginner to Advanced',
    readTime: '15 min',
    href: '/guides/gpt',
    gradient: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
    status: 'available'
  },
  {
    title: 'Claude 3 Guide',
    description: '200K context | Constitutional AI | XML formatting',
    topics: ['Long context', 'Tone mirroring', 'Safety principles'],
    difficulty: 'Intermediate',
    readTime: '12 min',
    href: '/guides/claude',
    gradient: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30',
    status: 'available'
  },
  {
    title: 'Gemini Guide',
    description: 'Multimodal | Web search | Google integration',
    topics: ['Image+text', 'Grounding', 'Few-shot'],
    difficulty: 'Beginner to Advanced',
    readTime: '18 min',
    href: '/guides/gemini',
    gradient: 'from-blue-500/20 to-purple-500/20',
    borderColor: 'border-blue-500/30',
    status: 'available'
  },
  {
    title: 'Midjourney Guide',
    description: 'Image generation | Parameters | Styles',
    topics: ['Composition', 'Lighting', 'Parameters'],
    difficulty: 'Beginner',
    readTime: '10 min',
    href: '#',
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    status: 'coming-soon'
  }
];

const allPlatforms = {
  'Chat & Text AI': [
    { name: 'Perplexity', focus: 'Web search', status: 'coming-soon', color: 'blue' },
    { name: 'Mistral', focus: 'Open source', status: 'coming-soon', color: 'orange' },
    { name: 'Llama', focus: 'Meta model', status: 'coming-soon', color: 'blue' },
    { name: 'Cohere', focus: 'Enterprise', status: 'coming-soon', color: 'purple' },
    { name: 'Character.AI', focus: 'Personality', status: 'coming-soon', color: 'pink' },
    { name: 'Poe', focus: 'Multi-model', status: 'coming-soon', color: 'gray' },
    { name: 'HuggingChat', focus: 'Open source', status: 'coming-soon', color: 'yellow' },
  ],
  'Image Generation': [
    { name: 'DALL-E 3', focus: 'OpenAI', status: 'coming-soon', color: 'green' },
    { name: 'Stable Diffusion', focus: 'Open source', status: 'coming-soon', color: 'blue' },
    { name: 'Leonardo AI', focus: 'Game assets', status: 'coming-soon', color: 'purple' },
    { name: 'Ideogram', focus: 'Text in images', status: 'coming-soon', color: 'orange' },
    { name: 'Adobe Firefly', focus: 'Creative suite', status: 'coming-soon', color: 'red' },
    { name: 'Playground AI', focus: 'Free tier', status: 'coming-soon', color: 'green' },
  ],
  'Code Assistants': [
    { name: 'GitHub Copilot', focus: 'VS Code', status: 'coming-soon', color: 'gray' },
    { name: 'Cursor', focus: 'AI-first IDE', status: 'coming-soon', color: 'blue' },
    { name: 'Codeium', focus: 'Free alternative', status: 'coming-soon', color: 'green' },
    { name: 'Tabnine', focus: 'Enterprise', status: 'coming-soon', color: 'purple' },
    { name: 'Amazon CodeWhisperer', focus: 'AWS', status: 'coming-soon', color: 'orange' },
  ],
  'Video & Animation': [
    { name: 'Runway', focus: 'Video editing', status: 'coming-soon', color: 'green' },
    { name: 'Pika Labs', focus: 'Video generation', status: 'coming-soon', color: 'purple' },
    { name: 'Synthesia', focus: 'AI avatars', status: 'coming-soon', color: 'blue' },
    { name: 'HeyGen', focus: 'Video translation', status: 'coming-soon', color: 'orange' },
  ],
  'Audio & Voice': [
    { name: 'ElevenLabs', focus: 'Voice cloning', status: 'coming-soon', color: 'purple' },
    { name: 'Murf', focus: 'Voiceovers', status: 'coming-soon', color: 'blue' },
    { name: 'Play.ht', focus: 'Text-to-speech', status: 'coming-soon', color: 'green' },
    { name: 'Resemble AI', focus: 'Voice synthesis', status: 'coming-soon', color: 'orange' },
  ]
};

const learningPaths = [
  {
    title: 'Beginner Path',
    description: 'Start your AI journey',
    steps: ['ChatGPT basics', 'Claude safety', 'Midjourney creativity'],
    progress: 0,
    color: 'green'
  },
  {
    title: 'Professional Path',
    description: 'Advanced techniques',
    steps: ['GPT-4 mastery', 'Claude documents', 'Gemini research'],
    progress: 33,
    color: 'blue'
  },
  {
    title: 'Creative Path',
    description: 'Visual content creation',
    steps: ['Midjourney mastery', 'DALL-E variations', 'Style development'],
    progress: 0,
    color: 'purple'
  },
  {
    title: 'Developer Path',
    description: 'Code and integration',
    steps: ['Copilot setup', 'API integration', 'Custom workflows'],
    progress: 0,
    color: 'orange'
  }
];

export default function GuidesHubPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="min-h-screen text-white relative overflow-x-hidden">
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
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-20 relative z-40">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
            🎯 PROMPT MASTERY HUB
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">
            Master Every
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Platform
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Complete prompt engineering guides for ChatGPT, Claude, Gemini, Midjourney, and 40+ AI platforms
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search guides, tips, or platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <Globe className="w-4 h-4" />
              <span className="font-semibold text-white">45</span> Platforms
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Brain className="w-4 h-4" />
              <span className="font-semibold text-white">200+</span> Techniques
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <FileText className="w-4 h-4" />
              <span className="font-semibold text-white">500+</span> Examples
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {platformCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-white text-black'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.label}
                    <span className="text-sm opacity-70">({category.count})</span>
                  </button>
                );
              })}
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/40"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-black">
                    {option.label}
                  </option>
                ))}
              </select>
              
              <div className="flex bg-white/10 border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-white/20' : 'hover:bg-white/10'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-white/20' : 'hover:bg-white/10'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Guides Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-400" />
            Featured Guides
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGuides.map((guide, index) => (
              <div key={index} className="group relative">
                <div className={`bg-white/5 backdrop-blur-xl rounded-2xl border ${guide.borderColor} p-6 h-full transition-all duration-300 hover:bg-white/10 hover:border-white/30 ${guide.gradient} bg-gradient-to-br`}>
                  
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${
                      guide.status === 'available' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    }`}>
                      {guide.status === 'available' ? 'Available' : 'Coming Soon'}
                    </span>
                    
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <Clock className="w-3 h-3" />
                      {guide.readTime}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2">{guide.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{guide.description}</p>
                  
                  {/* Topics */}
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-400 text-xs font-medium">Key Topics:</p>
                    <div className="flex flex-wrap gap-1">
                      {guide.topics.map((topic, topicIndex) => (
                        <span key={topicIndex} className="bg-white/10 text-white/80 px-2 py-1 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">{guide.difficulty}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  {guide.status === 'available' ? (
                    <Link href={guide.href}>
                      <button className="w-full bg-white text-black font-semibold py-2.5 px-4 rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2 group-hover:scale-105">
                        Start Learning
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  ) : (
                    <button className="w-full bg-white/10 text-white/60 font-semibold py-2.5 px-4 rounded-lg border border-white/20 cursor-not-allowed">
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Platforms Grid */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Grid3X3 className="w-8 h-8 text-blue-400" />
            All Platforms
          </h2>
          
          {Object.entries(allPlatforms).map(([categoryName, platforms]) => (
            <div key={categoryName} className="mb-12">
              <h3 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
                {categoryName}
              </h3>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {platforms.map((platform, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-xl rounded-lg border border-white/10 p-4 hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{platform.name}</h4>
                      <span className={`w-2 h-2 rounded-full ${
                        platform.status === 'available' ? 'bg-green-400' : 'bg-orange-400'
                      }`}></span>
                    </div>
                    <p className="text-gray-400 text-sm">{platform.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Learning Paths */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Target className="w-8 h-8 text-purple-400" />
            Learning Paths
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.map((path, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-${path.color}-500/20 border border-${path.color}-500/30 flex items-center justify-center`}>
                    <BookOpen className={`w-6 h-6 text-${path.color}-400`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{path.title}</h3>
                    <p className="text-gray-400 text-sm">{path.description}</p>
                  </div>
                </div>
                
                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Progress</span>
                    <span className="text-white text-sm font-medium">{path.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`bg-${path.color}-400 h-2 rounded-full transition-all`}
                      style={{ width: `${path.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-2 mb-6">
                  {path.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center gap-2 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full ${stepIndex < path.progress / 33 ? `bg-${path.color}-400` : 'bg-white/30'}`}></div>
                      <span className="text-gray-300">{step}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full bg-${path.color}-500/20 text-${path.color}-400 font-semibold py-2 px-4 rounded-lg border border-${path.color}-500/30 hover:bg-${path.color}-500/30 transition-all`}>
                  Start Path
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Tools */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-400" />
            Interactive Tools
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Universal Prompt Optimizer</h3>
              <p className="text-gray-400 text-sm mb-4">Auto-optimize prompts for any platform with intelligent suggestions</p>
              <button className="w-full bg-blue-500/20 text-blue-400 font-semibold py-2 px-4 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all">
                Try Tool
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Platform Recommender</h3>
              <p className="text-gray-400 text-sm mb-4">Find the perfect AI platform for your specific needs</p>
              <button className="w-full bg-purple-500/20 text-purple-400 font-semibold py-2 px-4 rounded-lg border border-purple-500/30 hover:bg-purple-500/30 transition-all">
                Get Recommendation
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Prompt Translator</h3>
              <p className="text-gray-400 text-sm mb-4">Convert prompts between different AI platforms seamlessly</p>
              <button className="w-full bg-green-500/20 text-green-400 font-semibold py-2 px-4 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-all">
                Translate Now
              </button>
            </div>
          </div>
        </section>

        {/* Community & Updates */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Users className="w-8 h-8 text-green-400" />
            Community & Updates
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Latest Updates
              </h3>
              <div className="space-y-3">
                <div className="border-l-2 border-green-400 pl-3">
                  <p className="text-white text-sm font-medium">New: Claude 3.5 Sonnet Guide</p>
                  <p className="text-gray-400 text-xs">2 days ago</p>
                </div>
                <div className="border-l-2 border-blue-400 pl-3">
                  <p className="text-white text-sm font-medium">Updated: GPT-4 Advanced Techniques</p>
                  <p className="text-gray-400 text-xs">1 week ago</p>
                </div>
                <div className="border-l-2 border-purple-400 pl-3">
                  <p className="text-white text-sm font-medium">New: Gemini Pro Vision Tips</p>
                  <p className="text-gray-400 text-xs">2 weeks ago</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Community Prompts
              </h3>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white text-sm font-medium">Creative Writing Assistant</p>
                  <p className="text-gray-400 text-xs mb-2">Works with ChatGPT, Claude</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span className="text-gray-400 text-xs">4.8/5 (124 votes)</span>
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white text-sm font-medium">Code Review Helper</p>
                  <p className="text-gray-400 text-xs mb-2">Optimized for Copilot</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span className="text-gray-400 text-xs">4.9/5 (89 votes)</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 bg-purple-500/20 text-purple-400 font-medium py-2 px-4 rounded-lg border border-purple-500/30 hover:bg-purple-500/30 transition-all text-sm">
                Browse All
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Download className="w-5 h-5 text-blue-400" />
                Quick Resources
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-white/10 text-white p-3 rounded-lg hover:bg-white/20 transition-all text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Platform Comparison Chart</span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-xs mt-1">PDF • Updated weekly</p>
                </button>
                
                <button className="w-full bg-white/10 text-white p-3 rounded-lg hover:bg-white/20 transition-all text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Universal Cheat Sheet</span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-xs mt-1">PDF • 1-page reference</p>
                </button>
                
                <button className="w-full bg-white/10 text-white p-3 rounded-lg hover:bg-white/20 transition-all text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Prompt Templates Pack</span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-xs mt-1">JSON • 100+ templates</p>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="text-center">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              Get weekly tips, new guide announcements, and exclusive techniques delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
              />
              <button className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all">
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-3">
              Join 10,000+ prompt engineers. Unsubscribe anytime.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}