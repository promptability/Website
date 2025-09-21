'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, Zap, Brain, Clock, ChevronRight, Check, X, 
  Sparkles, Settings, BarChart3, Users, ArrowRight, 
  Play, Copy, Star, Target, Globe, Shield, Search,
  FileText, Code, Microscope, PenTool, Sliders, MessageSquare,
  GitBranch, Database, Network, Archive, Tag, Share2,
  Lock, Download, Plus, RotateCcw, ChevronDown
} from 'lucide-react';
import { fadeInUp, staggerContainer, liquidButton, glassCard, cardTilt } from '@/lib/animations';

export default function ProjectMemoryPage() {
  const [selectedProject, setSelectedProject] = useState('project-alpha');
  const [activeUseCase, setActiveUseCase] = useState('development');
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [projects, setProjects] = useState([
    { id: 'project-alpha', name: 'E-commerce Platform', prompts: 47, lastActive: '2 min ago', status: 'active' },
    { id: 'project-beta', name: 'AI Research Paper', prompts: 23, lastActive: '1 hour ago', status: 'archived' },
    { id: 'project-gamma', name: 'Marketing Campaign', prompts: 89, lastActive: '3 hours ago', status: 'active' }
  ]);

  const useCases = {
    development: {
      title: 'Software Development',
      description: 'Multiple codebases with framework consistency',
      example: 'React components, API documentation, testing strategies'
    },
    content: {
      title: 'Content Creation',
      description: 'Brand voices and campaign themes',
      example: 'Blog posts, social media, marketing materials'
    },
    research: {
      title: 'Research Projects',
      description: 'Topic separation and methodology consistency',
      example: 'Academic papers, data analysis, literature reviews'
    },
    client: {
      title: 'Client Work',
      description: 'Account separation and brand guidelines',
      example: 'Multiple clients, deliverable tracking, brand consistency'
    }
  };

  const faqs = [
    {
      id: 'supported-projects',
      question: 'How many projects are supported?',
      answer: 'Unlimited projects with no restrictions on size or complexity.'
    },
    {
      id: 'merge-projects',
      question: 'Can I merge projects?',
      answer: 'Yes, you can merge related projects while preserving all context and history.'
    },
    {
      id: 'data-isolation',
      question: 'Is data isolated between projects?',
      answer: 'Complete isolation ensures no context bleeding between different projects.'
    },
    {
      id: 'export-projects',
      question: 'Can I export projects?',
      answer: 'Full export capabilities including context, history, and project settings.'
    },
    {
      id: 'context-determination',
      question: 'How is context determined?',
      answer: 'AI analyzes prompt patterns, keywords, and relationships to automatically group content.'
    }
  ];

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
      <div className="relative z-40">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-32">
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <span className="bg-blue-500/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
              CONTEXT AWARE
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold text-center mb-6"
          >
            Project
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Memory
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mx-auto mb-12"
          >
            Maintains context across all your projects automatically
          </motion.p>

          {/* Project Workspace Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Your Project Workspace</h3>
                <p className="text-gray-400">Smart organization in action...</p>
              </div>

              {/* Project Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {projects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    onClick={() => setSelectedProject(project.id)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
                      selectedProject === project.id
                        ? 'bg-blue-500/20 border-blue-500/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Folder className={`w-5 h-5 ${selectedProject === project.id ? 'text-blue-400' : 'text-gray-400'}`} />
                      <span className="font-semibold text-sm">{project.name}</span>
                    </div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>{project.prompts} prompts</div>
                      <div>{project.lastActive}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Context Connection Visualization */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-400 font-semibold">Active Context</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-400">Connected</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {['Project requirements loaded', 'Style preferences active', 'Previous decisions remembered', 'Team context synchronized'].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.2 }}
                      className="flex items-center gap-3"
                    >
                      <Check className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
              Enable Project Memory
            </button>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
              View Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* VALUE METRICS */}
      <section className="bg-black/60 backdrop-blur-xl border-y border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Folder className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="font-semibold">Unlimited projects</p>
            </div>
            <div>
              <Settings className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="font-semibold">Auto-organization</p>
            </div>
            <div>
              <GitBranch className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="font-semibold">Context switching</p>
            </div>
            <div>
              <Zap className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="font-semibold">Zero manual setup</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE CHALLENGE */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Context Switching
            <span className="block bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent">
              Chaos
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Without Project Memory */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                <X className="w-6 h-6" />
                Without Project Memory
              </h3>
              <div className="space-y-4">
                {[
                  'Lost context between sessions',
                  'Repetitive explanations',
                  'Inconsistent outputs',
                  'Manual organization',
                  'Context confusion'
                ].map((issue, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-black/40 rounded-lg p-3"
                  >
                    <X className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300">{issue}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* With Project Memory */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                <Check className="w-6 h-6" />
                With Project Memory
              </h3>
              <div className="space-y-4">
                {[
                  'Continuous context',
                  'Automatic recall',
                  'Consistent voice',
                  'Smart organization',
                  'Perfect separation'
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-black/40 rounded-lg p-3"
                  >
                    <Check className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            How It
            <span className="block bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>

          {/* Step-by-step Process */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                step: 1,
                title: 'Automatic Detection',
                description: 'Identifies project context and groups related prompts',
                icon: <Target className="w-8 h-8" />
              },
              {
                step: 2,
                title: 'Context Building',
                description: 'Creates project profile and maps relationships',
                icon: <Brain className="w-8 h-8" />
              },
              {
                step: 3,
                title: 'Smart Recall',
                description: 'Retrieves relevant context and applies project rules',
                icon: <Database className="w-8 h-8" />
              },
              {
                step: 4,
                title: 'Continuous Learning',
                description: 'Updates project knowledge and refines understanding',
                icon: <BarChart3 className="w-8 h-8" />
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="text-blue-400 mb-4 flex justify-center">
                    {item.icon}
                  </div>
                  <div className="text-sm text-blue-400 font-semibold mb-2">STEP {item.step}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-5 h-5 text-blue-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: KEY FEATURES */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Key
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Features
              </span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Everything you need to organize and maintain context across all your projects
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: GitBranch,
                title: 'Automatic Grouping',
                description: 'Smart project detection with related prompt clustering and topic identification.',
                gradient: 'from-blue-400 to-cyan-500',
              },
              {
                icon: Database,
                title: 'Context Persistence',
                description: 'Session memory with cross-platform sync and historical reference.',
                gradient: 'from-purple-400 to-purple-500',
              },
              {
                icon: Settings,
                title: 'Project Profiles',
                description: 'Custom settings per project with style guidelines and terminology consistency.',
                gradient: 'from-blue-400 to-blue-500',
              },
              {
                icon: RotateCcw,
                title: 'Smart Switching',
                description: 'Instant context swap with no confusion and maintained separation.',
                gradient: 'from-purple-400 to-purple-500',
              },
              {
                icon: Network,
                title: 'Knowledge Graph',
                description: 'Visual project map with relationship tracking and insight discovery.',
                gradient: 'from-cyan-400 to-blue-500',
              },
              {
                icon: Users,
                title: 'Team Alignment',
                description: 'Shared project context with consistent outputs and collaborative memory.',
                gradient: 'from-purple-400 to-purple-500',
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardTilt}
                initial="initial"
                whileHover="hover"
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 h-full hover:bg-white/10 transition-all duration-300 hover:border-white/20">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: PROJECT DASHBOARD */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Project
            <span className="block bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8"
          >
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">My Projects</h3>
              <button className="bg-blue-500/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-xl hover:bg-blue-500/30 transition-all duration-300 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Project
              </button>
            </div>

            {/* Project Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { name: 'E-commerce Platform', prompts: 47, progress: 85, color: 'blue' },
                { name: 'AI Research Paper', prompts: 23, progress: 60, color: 'purple' },
                { name: 'Marketing Campaign', prompts: 89, progress: 95, color: 'blue' }
              ].map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-black/40 border border-white/10 rounded-xl p-6 hover:bg-black/60 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Folder className="w-6 h-6 text-blue-400" />
                    <span className="font-semibold">{project.name}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{project.prompts} prompts</span>
                      <span className="text-gray-400">{project.progress}% complete</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r from-${project.color}-400 to-${project.color}-500`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">Search projects</span>
              </button>
              <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <Archive className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">Archive</span>
              </button>
              <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">Tags</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: USE CASES */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Perfect For
            <span className="block bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent">
              Every Industry
            </span>
          </motion.h2>

          {/* Use Case Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(useCases).map((useCase) => (
              <button
                key={useCase}
                onClick={() => setActiveUseCase(useCase)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeUseCase === useCase
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {useCases[useCase as keyof typeof useCases].title}
              </button>
            ))}
          </div>

          {/* Use Case Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeUseCase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {useCases[activeUseCase as keyof typeof useCases].title}
              </h3>
              <p className="text-gray-300 mb-6">
                {useCases[activeUseCase as keyof typeof useCases].description}
              </p>
              <div className="bg-black/40 border border-white/20 rounded-xl p-6 font-mono text-blue-400">
                "Example: {useCases[activeUseCase as keyof typeof useCases].example}"
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 6: ORGANIZATION FEATURES */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Organization
            <span className="block bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              Tools
            </span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: FileText,
                title: 'Project Templates',
                description: 'Pre-configured project setups for common use cases and workflows.',
                gradient: 'from-blue-400 to-cyan-500',
              },
              {
                icon: Folder,
                title: 'Custom Categories',
                description: 'Organize projects with flexible categorization and nested structures.',
                gradient: 'from-purple-400 to-purple-500',
              },
              {
                icon: Tag,
                title: 'Tag System',
                description: 'Advanced tagging with autocomplete and smart suggestions.',
                gradient: 'from-blue-400 to-blue-500',
              },
              {
                icon: Archive,
                title: 'Archive Function',
                description: 'Store completed projects while maintaining searchable history.',
                gradient: 'from-purple-400 to-purple-500',
              },
              {
                icon: Search,
                title: 'Search Capability',
                description: 'Powerful search across all projects with context-aware results.',
                gradient: 'from-cyan-400 to-blue-500',
              },
              {
                icon: Star,
                title: 'Favorites & Pins',
                description: 'Quick access to most important projects and frequent contexts.',
                gradient: 'from-purple-400 to-purple-500',
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardTilt}
                initial="initial"
                whileHover="hover"
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 h-full hover:bg-white/10 transition-all duration-300 hover:border-white/20">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: PRIVACY & ISOLATION */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Privacy &
            <span className="block bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              Isolation
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6">Security Features</h3>
              <div className="space-y-4">
                {[
                  'Complete project isolation',
                  'No context bleeding',
                  'Encrypted project data',
                  'Secure access controls',
                  'Privacy-first architecture'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6">Data Control</h3>
              <div className="space-y-4">
                {[
                  'Export all project data',
                  'Selective deletion options',
                  'Backup and restore',
                  'Data portability',
                  'Complete ownership'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 8: COLLABORATION */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Team
            <span className="block bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent">
              Collaboration
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Share Projects',
                description: 'Invite team members to collaborate on projects with controlled access',
                icon: <Share2 className="w-8 h-8" />,
                features: ['Invitation system', 'Access control', 'Real-time sync']
              },
              {
                title: 'Permission Levels',
                description: 'Granular control over who can view, edit, or manage projects',
                icon: <Lock className="w-8 h-8" />,
                features: ['View only', 'Edit access', 'Admin control']
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8"
              >
                <div className="text-purple-400 mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-300 mb-6">{item.description}</p>
                <div className="space-y-2">
                  {item.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: INTEGRATION */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Seamless
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Integration
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'All AI Platforms', icon: <Brain className="w-8 h-8" />, color: 'blue' },
              { name: 'Cloud Storage', icon: <Database className="w-8 h-8" />, color: 'blue' },
              { name: 'Project Management', icon: <Settings className="w-8 h-8" />, color: 'purple' },
              { name: 'Version Control', icon: <GitBranch className="w-8 h-8" />, color: 'purple' }
            ].map((integration, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className={`text-${integration.color}-400 mb-4 flex justify-center`}>
                  {integration.icon}
                </div>
                <h3 className="font-bold text-white">{integration.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Frequently Asked
            <span className="block bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition-all duration-300"
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    activeFaq === faq.id ? 'rotate-180' : ''
                  }`} />
                </button>
                <AnimatePresence>
                  {activeFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-300">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Never Lose Context Again
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start organizing your AI workflow with intelligent project memory
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                Start Organizing
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                See All Features
              </button>
            </div>

            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Unlimited projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Auto-organization</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Privacy protected</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      </div>
    </main>
  );
}