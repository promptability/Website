'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Zap, Brain, Clock, ChevronRight, Check, X, 
  Sparkles, Settings, BarChart3, ArrowRight, 
  Play, Copy, Star, Target, Globe, Shield, Search,
  FileText, Code, Microscope, PenTool, Sliders, MessageSquare,
  GitBranch, Database, Network, Archive, Tag, Share2,
  Lock, Download, Plus, RotateCcw, ChevronDown, Bell,
  Eye, Edit, UserPlus, Crown, AtSign, Activity,
  BookOpen, Award, TrendingUp, Calendar, Folder,
  Filter, SortAsc, Heart, Flag, Timer
} from 'lucide-react';
import { fadeInUp, staggerContainer, liquidButton, glassCard, cardTilt } from '@/lib/animations';

export default function TeamCollaborationPage() {
  const [teamSize, setTeamSize] = useState(10);
  const [activeUseCase, setActiveUseCase] = useState('marketing');
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState('admin');
  const [teamMembers] = useState([
    { name: 'Alex Chen', role: 'Admin', avatar: '👨‍💻', activity: 'Created prompt template', time: '2 min ago', online: true },
    { name: 'Sarah Kim', role: 'Editor', avatar: '👩‍🎨', activity: 'Optimized marketing prompt', time: '5 min ago', online: true },
    { name: 'Mike Johnson', role: 'Contributor', avatar: '👨‍💼', activity: 'Suggested improvement', time: '10 min ago', online: false },
    { name: 'Emma Davis', role: 'Viewer', avatar: '👩‍🔬', activity: 'Viewed research prompts', time: '15 min ago', online: true }
  ]);

  const useCases = {
    marketing: {
      title: 'Marketing Teams',
      description: 'Brand voice consistency and campaign coordination',
      example: 'Social media posts, email campaigns, content calendars'
    },
    development: {
      title: 'Development Teams',
      description: 'Code documentation and API consistency',
      example: 'Technical docs, code reviews, architecture decisions'
    },
    research: {
      title: 'Research Teams',
      description: 'Methodology alignment and data query standards',
      example: 'Data analysis, literature reviews, report generation'
    },
    agency: {
      title: 'Agency Teams',
      description: 'Client separation and project templates',
      example: 'Client work, project deliverables, quality control'
    }
  };

  const roles = {
    admin: {
      title: 'Admin',
      permissions: ['Full workspace control', 'Manage team members', 'Edit all prompts', 'View analytics', 'Export data'],
      color: 'red'
    },
    editor: {
      title: 'Editor',
      permissions: ['Create prompts', 'Edit own prompts', 'Comment on all', 'View team library', 'Tag content'],
      color: 'blue'
    },
    contributor: {
      title: 'Contributor',
      permissions: ['Suggest prompts', 'Comment on prompts', 'View library', 'Submit for review', 'Basic analytics'],
      color: 'green'
    },
    viewer: {
      title: 'Viewer',
      permissions: ['View prompts', 'Search library', 'Basic comments', 'Download approved', 'Read-only access'],
      color: 'gray'
    }
  };

  const faqs = [
    {
      id: 'team-members',
      question: 'How many team members can we have?',
      answer: 'Depends on your plan: Starter (5), Professional (20), Enterprise (unlimited).'
    },
    {
      id: 'multiple-workspaces',
      question: 'Can we have multiple workspaces?',
      answer: 'Yes, create separate workspaces for different projects or departments with isolated access.'
    },
    {
      id: 'approval-system',
      question: 'Is there an approval system?',
      answer: 'Full workflow system with review, approval, and publishing stages for quality control.'
    },
    {
      id: 'data-segregation',
      question: 'How is data segregated?',
      answer: 'Complete isolation between workspaces with role-based access within each workspace.'
    },
    {
      id: 'ip-ownership',
      question: 'What about IP ownership?',
      answer: 'Your organization owns all content with full export and deletion rights.'
    }
  ];

  const calculateROI = () => {
    const monthlyROI = teamSize * 40 * 4; // $40/hour saved per member per week
    return monthlyROI.toLocaleString();
  };

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
            <span className="bg-purple-500/20 border border-purple-500/30 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold">
              TEAM FEATURE
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold text-center mb-6"
          >
            Team
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Collaboration
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mx-auto mb-12"
          >
            Build a shared knowledge base of optimized prompts together
          </motion.p>

          {/* Team Workspace Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Team Workspace</h3>
                <p className="text-gray-400">Collaborative prompt optimization in action...</p>
              </div>

              {/* Team Members Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {teamMembers.map((member, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="relative">
                        <span className="text-2xl">{member.avatar}</span>
                        {member.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{member.name}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            member.role === 'Admin' ? 'bg-red-500/20 text-red-400' :
                            member.role === 'Editor' ? 'bg-blue-500/20 text-blue-400' :
                            member.role === 'Contributor' ? 'bg-green-500/20 text-green-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {member.role}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">{member.activity} • {member.time}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Active Collaboration Indicator */}
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-purple-400 font-semibold">Live Collaboration</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-400">{teamMembers.filter(m => m.online).length} online</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {['Shared prompt library active', 'Real-time updates syncing', 'Team knowledge growing', 'Best practices emerging'].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.2 }}
                      className="flex items-center gap-3"
                    >
                      <Check className="w-4 h-4 text-green-400" />
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
              Start Team Workspace
            </button>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
              See Pricing
            </button>
          </motion.div>
        </div>
      </section>

      {/* VALUE METRICS */}
      <section className="bg-black/60 backdrop-blur-xl border-y border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Users className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <p className="font-semibold">Unlimited team members</p>
            </div>
            <div>
              <Database className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <p className="font-semibold">Shared prompt library</p>
            </div>
            <div>
              <Zap className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <p className="font-semibold">Real-time sync</p>
            </div>
            <div>
              <Shield className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <p className="font-semibold">Role-based access</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE PROBLEM */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Stop Reinventing
            <span className="block bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              the Wheel
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Current Team Challenges */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
                <X className="w-6 h-6" />
                Current Team Challenges
              </h3>
              <div className="space-y-4">
                {[
                  'Everyone writes different prompts',
                  'No knowledge sharing',
                  'Inconsistent quality',
                  'Duplicated effort',
                  'Learning curve repeated'
                ].map((issue, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-black/40 rounded-lg p-3"
                  >
                    <X className="w-4 h-4 text-red-400" />
                    <span className="text-gray-300">{issue}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* With Team Collaboration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                <Check className="w-6 h-6" />
                With Team Collaboration
              </h3>
              <div className="space-y-4">
                {[
                  'Centralized prompt library',
                  'Best practices shared',
                  'Consistent excellence',
                  'Collective improvement',
                  'Accelerated learning'
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
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>

          {/* Step-by-step Process */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                step: 1,
                title: 'Create Workspace',
                description: 'Set up team space and invite members',
                icon: <UserPlus className="w-8 h-8" />
              },
              {
                step: 2,
                title: 'Share & Collaborate',
                description: 'Share prompts and build together',
                icon: <Share2 className="w-8 h-8" />
              },
              {
                step: 3,
                title: 'Build Knowledge Base',
                description: 'Organize and categorize content',
                icon: <Database className="w-8 h-8" />
              },
              {
                step: 4,
                title: 'Collective Learning',
                description: 'Analyze and improve together',
                icon: <TrendingUp className="w-8 h-8" />
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
                  <div className="text-purple-400 mb-4 flex justify-center">
                    {item.icon}
                  </div>
                  <div className="text-sm text-purple-400 font-semibold mb-2">STEP {item.step}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-5 h-5 text-purple-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CORE FEATURES */}
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
              Core
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Features
              </span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Everything your team needs for seamless prompt collaboration
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
                icon: Database,
                title: 'Shared Library',
                description: 'Centralized prompts with categories, tags, and powerful search functionality.',
                gradient: 'from-blue-400 to-cyan-500',
              },
              {
                icon: Zap,
                title: 'Real-time Sync',
                description: 'Instant updates across all team members with conflict resolution.',
                gradient: 'from-purple-400 to-pink-500',
              },
              {
                icon: Shield,
                title: 'Permission System',
                description: 'Granular access controls with admin, editor, contributor, and viewer roles.',
                gradient: 'from-green-400 to-emerald-500',
              },
              {
                icon: GitBranch,
                title: 'Version History',
                description: 'Track all changes with ability to restore previous versions and see contributors.',
                gradient: 'from-orange-400 to-red-500',
              },
              {
                icon: BarChart3,
                title: 'Team Analytics',
                description: 'Usage statistics, performance metrics, and ROI tracking for your team.',
                gradient: 'from-cyan-400 to-blue-500',
              },
              {
                icon: Settings,
                title: 'Workflow Integration',
                description: 'Built-in approval process with review system and quality standards.',
                gradient: 'from-indigo-400 to-purple-500',
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

      {/* SECTION 4: WORKSPACE INTERFACE */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Team
            <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-8"
          >
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">Team Workspace</h3>
              <div className="flex gap-4">
                <button className="bg-purple-500/20 border border-purple-500/30 text-purple-400 px-4 py-2 rounded-xl hover:bg-purple-500/30 transition-all duration-300 flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Invite
                </button>
                <button className="bg-blue-500/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-xl hover:bg-blue-500/30 transition-all duration-300 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Prompt
                </button>
              </div>
            </div>

            {/* Team Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Team Members', value: '12', icon: <Users className="w-5 h-5" />, color: 'purple' },
                { label: 'Shared Prompts', value: '247', icon: <Database className="w-5 h-5" />, color: 'blue' },
                { label: 'This Month', value: '89', icon: <TrendingUp className="w-5 h-5" />, color: 'green' },
                { label: 'Success Rate', value: '94%', icon: <Award className="w-5 h-5" />, color: 'orange' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-black/40 border border-white/10 rounded-xl p-4 text-center"
                >
                  <div className={`text-${stat.color}-400 mb-2 flex justify-center`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-400" />
                Recent Activity
              </h4>
              <div className="space-y-3">
                {[
                  { user: 'Alex Chen', action: 'created', item: 'Marketing Email Template', time: '2 min ago', type: 'create' },
                  { user: 'Sarah Kim', action: 'optimized', item: 'Product Description Prompt', time: '5 min ago', type: 'edit' },
                  { user: 'Mike Johnson', action: 'commented on', item: 'SEO Content Strategy', time: '10 min ago', type: 'comment' },
                  { user: 'Emma Davis', action: 'approved', item: 'Customer Support Scripts', time: '15 min ago', type: 'approve' }
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'create' ? 'bg-green-400' :
                      activity.type === 'edit' ? 'bg-blue-400' :
                      activity.type === 'comment' ? 'bg-yellow-400' :
                      'bg-purple-400'
                    }`} />
                    <div className="flex-1">
                      <span className="text-white font-medium">{activity.user}</span>
                      <span className="text-gray-300 mx-1">{activity.action}</span>
                      <span className="text-blue-400">{activity.item}</span>
                      <div className="text-xs text-gray-400">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
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
            <span className="block bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Every Team
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

      {/* SECTION 6: ROLES & PERMISSIONS */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Roles &
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Permissions
            </span>
          </motion.h2>

          {/* Role Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(roles).map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedRole === role
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {role === 'admin' && <Crown className="w-4 h-4" />}
                {role === 'editor' && <Edit className="w-4 h-4" />}
                {role === 'contributor' && <UserPlus className="w-4 h-4" />}
                {role === 'viewer' && <Eye className="w-4 h-4" />}
                {roles[role as keyof typeof roles].title}
              </button>
            ))}
          </div>

          {/* Role Permissions Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                {roles[selectedRole as keyof typeof roles].title} Permissions
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roles[selectedRole as keyof typeof roles].permissions.map((permission, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-black/40 rounded-lg p-3"
                  >
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">{permission}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 7: COLLABORATION TOOLS */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Collaboration
            <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
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
                icon: MessageSquare,
                title: 'Comments System',
                description: 'Thread-based discussions on any prompt with rich text support.',
                gradient: 'from-blue-400 to-cyan-500',
              },
              {
                icon: AtSign,
                title: '@Mentions',
                description: 'Tag team members to get their attention and notify about updates.',
                gradient: 'from-purple-400 to-pink-500',
              },
              {
                icon: Bell,
                title: 'Notifications',
                description: 'Stay updated with real-time notifications for all team activity.',
                gradient: 'from-green-400 to-emerald-500',
              },
              {
                icon: Activity,
                title: 'Activity Feed',
                description: 'Track all team actions with detailed activity history.',
                gradient: 'from-orange-400 to-red-500',
              },
              {
                icon: Flag,
                title: 'Approval Workflow',
                description: 'Submit prompts for review with approval and rejection system.',
                gradient: 'from-cyan-400 to-blue-500',
              },
              {
                icon: Heart,
                title: 'Favorites & Ratings',
                description: 'Like and rate prompts to surface the best content for the team.',
                gradient: 'from-indigo-400 to-purple-500',
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

      {/* SECTION 8: SECURITY */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Enterprise
            <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Security
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-green-400 mb-6">Security Features</h3>
              <div className="space-y-4">
                {[
                  'SSO integration (SAML/OAuth)',
                  'End-to-end encryption',
                  'SOC 2 Type II compliant',
                  'GDPR compliance',
                  'Data residency options'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-400" />
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
              <h3 className="text-2xl font-bold text-blue-400 mb-6">Admin Controls</h3>
              <div className="space-y-4">
                {[
                  'Detailed audit logs',
                  'Automated backups',
                  'Custom retention policies',
                  'IP whitelisting',
                  'Two-factor authentication'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 9: TEAM SIZE CALCULATOR */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Calculate Your
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              ROI
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Team Size Calculator</h3>
              <p className="text-gray-300">See how much your team could save with collaborative prompting</p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Number of team members: {teamSize}
                </label>
                <input
                  type="range"
                  min="2"
                  max="100"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(teamSize-2)/98*100}%, #374151 ${(teamSize-2)/98*100}%, #374151 100%)`
                  }}
                />
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>2 members</span>
                  <span>50 members</span>
                  <span>100+ members</span>
                </div>
              </div>

              <div className="bg-black/40 border border-white/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  ${calculateROI()}
                </div>
                <div className="text-sm text-gray-400 mb-4">Estimated monthly savings</div>
                <div className="text-xs text-gray-500">
                  Based on 10 hours saved per team member per month at $40/hour
                </div>
              </div>
            </div>
          </motion.div>
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
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
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
            className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Empower Your Team Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start building your shared knowledge base of optimized prompts
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                Start Free Trial
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                Book Demo
              </button>
            </div>

            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      </div>
    </main>
  );
}