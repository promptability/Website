'use client';

import { useState } from 'react';
import { 
  Chrome, Download, Shield, Star, Play, Users, Clock, Globe,
  Check, ChevronRight, ChevronDown, ArrowRight, Zap, Brain,
  Lock, Settings, BarChart3, MessageSquare, FileText, Award,
  Search, HelpCircle, Video, ExternalLink, Monitor, Smartphone
} from 'lucide-react';
import Link from 'next/link';

const installSteps = [
  {
    step: 1,
    title: 'Click Install',
    description: 'Takes you to official Chrome Web Store',
    details: 'We redirect you to the official Chrome Web Store where you can safely install the extension.',
    image: '/screenshots/chrome-store.png'
  },
  {
    step: 2,
    title: 'Confirm Permissions',
    description: 'Each permission explained below',
    details: 'We only request the minimum permissions needed for core functionality.',
    permissions: [
      { name: 'Read text selection', reason: 'To optimize highlighted text on any website' },
      { name: 'Context menus', reason: 'To add right-click optimization option' },
      { name: 'Storage', reason: 'To save your preferences locally on your device' }
    ]
  },
  {
    step: 3,
    title: 'Pin to Toolbar',
    description: 'Optional but recommended for quick access',
    details: 'Pinning makes the extension easily accessible from any webpage.',
    image: '/screenshots/pin-extension.gif'
  },
  {
    step: 4,
    title: 'You\'re Ready!',
    description: 'Try it now with our interactive demo',
    details: 'Start optimizing prompts immediately - no account required.',
    demo: true
  }
];

const features = [
  {
    icon: Zap,
    title: 'Instant Optimization',
    description: 'Select any text, right-click, and get AI-optimized prompts in seconds',
    demo: 'instant-optimization.gif',
    before: 'write a story',
    after: 'Write a compelling 500-word short story in the mystery genre, focusing on character development and atmospheric tension. Include a surprising plot twist and vivid sensory details.',
    timeSaved: '2-5 minutes per prompt'
  },
  {
    icon: Brain,
    title: 'Learning Engine',
    description: 'Adapts to your writing style and gets smarter with every use',
    demo: 'learning-engine.gif',
    features: ['Personalized suggestions', 'Style adaptation', 'Context memory'],
    improvement: '40% better results after 10 uses'
  },
  {
    icon: Globe,
    title: 'Multi-Platform Support',
    description: 'Works seamlessly with ChatGPT, Claude, Gemini, and 40+ AI platforms',
    platforms: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Midjourney', 'DALL-E'],
    coverage: '95% of popular AI tools'
  },
  {
    icon: MessageSquare,
    title: 'Project Workspaces',
    description: 'Organize prompts by project and share with your team',
    demo: 'workspaces.gif',
    features: ['Project organization', 'Team sharing', 'Version control'],
    productivity: '60% faster project workflow'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track prompt performance and optimize your AI workflow',
    metrics: ['Response quality', 'Token usage', 'Time saved', 'Success rate'],
    insights: 'Detailed performance insights'
  }
];

const supportedBrowsers = [
  { name: 'Chrome', version: '89+', support: 'full', icon: Chrome },
  { name: 'Edge', version: '89+', support: 'full', icon: Globe },
  { name: 'Brave', version: 'All', support: 'full', icon: Shield },
  { name: 'Opera', version: 'Coming', support: 'planned', icon: Globe },
  { name: 'Firefox', version: 'In Dev', support: 'development', icon: Globe },
  { name: 'Safari', version: '2025', support: 'planned', icon: Globe }
];

const troubleshootingItems = [
  {
    question: 'Extension not appearing after installation?',
    answer: 'Make sure you\'re using Chrome 89+ and restart your browser. If issues persist, try disabling other extensions temporarily.',
    steps: ['Check Chrome version', 'Restart browser', 'Check extensions page', 'Reinstall if needed']
  },
  {
    question: 'Right-click option not showing?',
    answer: 'Some websites block context menus. Try using the toolbar icon instead, or check if other extensions are interfering.',
    steps: ['Try different website', 'Use toolbar icon', 'Check permissions', 'Disable conflicting extensions']
  },
  {
    question: 'Optimization seems slow?',
    answer: 'Performance depends on your internet connection and text length. Try shorter text selections for faster results.',
    steps: ['Check internet connection', 'Try shorter text', 'Clear extension cache', 'Update extension']
  }
];

export default function ChromeExtensionPage() {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  const [expandedTrouble, setExpandedTrouble] = useState<number | null>(null);
  const [installationStep, setInstallationStep] = useState(0);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

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
      <div className="max-w-7xl mx-auto px-4 py-20 relative z-40">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-500/30">
            <Chrome className="w-4 h-4 inline mr-2" />
            CHROME EXTENSION
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Add Promptability
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              to Chrome
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Transform any text into optimized AI prompts with one click. Works on every website, no login required.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-3 text-lg">
              <Chrome className="w-6 h-6" />
              Add to Chrome - It's Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => setShowDemo(true)}
              className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-3"
            >
              <Play className="w-5 h-5" />
              Watch 2-min Demo
            </button>
          </div>

          {/* Live Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm mb-6">
            <div className="flex items-center gap-2 text-green-400">
              <Users className="w-4 h-4" />
              <span className="font-semibold">2,847</span> users installed today
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <Star className="w-4 h-4" />
              <span className="font-semibold">4.9★</span> rating
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <Shield className="w-4 h-4" />
              100% Privacy Safe
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <Check className="w-4 h-4" />
              No Login Required
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4 text-center">
              <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-medium">10 seconds</p>
              <p className="text-gray-400 text-sm">to install</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4 text-center">
              <Globe className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-white font-medium">All websites</p>
              <p className="text-gray-400 text-sm">works everywhere</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4 text-center">
              <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-medium">10+ minutes</p>
              <p className="text-gray-400 text-sm">saved per prompt</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4 text-center">
              <Star className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-medium">Free forever</p>
              <p className="text-gray-400 text-sm">tier available</p>
            </div>
          </div>
        </div>

        {/* Installation Guide */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Install in 4 Simple Steps
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {installSteps.map((step, index) => (
              <div 
                key={index} 
                className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer transition-all ${
                  installationStep === index ? 'border-blue-500/50 bg-blue-500/10' : 'hover:bg-white/10'
                }`}
                onClick={() => setInstallationStep(index)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-sm">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-white">{step.title}</h3>
                </div>
                
                <p className="text-gray-400 text-sm mb-3">{step.description}</p>
                <p className="text-gray-300 text-xs">{step.details}</p>
                
                {step.permissions && (
                  <div className="mt-4 space-y-2">
                    {step.permissions.map((perm, permIndex) => (
                      <div key={permIndex} className="flex items-start gap-2 text-xs">
                        <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-white font-medium">{perm.name}:</span>
                          <span className="text-gray-400 ml-1">{perm.reason}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {step.demo && (
                  <button className="mt-4 w-full bg-blue-500/20 text-blue-400 py-2 px-4 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all text-sm">
                    Try Interactive Demo
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 justify-center mb-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">Security Note</span>
              </div>
              <p className="text-gray-300 text-sm">
                We never access browsing history, passwords, or personal data. All processing happens locally on your device.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            How It Works
          </h2>
          
          {/* Live Demo Area */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Try It Yourself</h3>
            <div className="bg-white/10 border border-white/20 rounded-lg p-4 mb-4">
              <p className="text-gray-300 leading-relaxed">
                Write a comprehensive guide about renewable energy sources including solar, wind, and hydroelectric power. 
                Make sure to cover environmental benefits and economic considerations for each type.
              </p>
            </div>
            <div className="text-center text-sm text-gray-400 mb-4">
              👆 Try highlighting this text, then right-click and select "Optimize Prompt"
            </div>
            <div className="flex justify-center">
              <button className="px-6 py-3 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all">
                Simulate Optimization
              </button>
            </div>
          </div>

          {/* Three Ways to Use */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Right-Click Method</h3>
              <p className="text-gray-400 text-sm mb-3">Select text → Right-click → Optimize Prompt</p>
              <p className="text-green-400 text-xs font-medium">Best for: Quick optimization</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-4">
                <Chrome className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Toolbar Icon</h3>
              <p className="text-gray-400 text-sm mb-3">Click extension icon → Open prompt builder</p>
              <p className="text-green-400 text-xs font-medium">Best for: Full prompt builder</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Keyboard Shortcut</h3>
              <p className="text-gray-400 text-sm mb-3">Cmd+Shift+P (Mac) / Ctrl+Shift+P (Win)</p>
              <p className="text-green-400 text-xs font-medium">Best for: Power users</p>
            </div>
          </div>
        </section>

        {/* Features Showcase */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Features That Save Hours
          </h2>
          
          <div className="space-y-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const isExpanded = expandedFeature === index;
              
              return (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFeature(isExpanded ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                        <p className="text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isExpanded && (
                    <div className="border-t border-white/10 p-6 bg-white/5">
                      {feature.before && (
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="text-red-400 font-medium mb-2">Before:</h4>
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                              <p className="text-gray-300 text-sm">{feature.before}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-green-400 font-medium mb-2">After:</h4>
                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                              <p className="text-gray-300 text-sm">{feature.after}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {feature.platforms && (
                        <div className="mb-4">
                          <h4 className="text-white font-medium mb-3">Supported Platforms:</h4>
                          <div className="flex flex-wrap gap-2">
                            {feature.platforms.map((platform, pIndex) => (
                              <span key={pIndex} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {feature.timeSaved && (
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>Saves {feature.timeSaved}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Browser Compatibility */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Browser Compatibility
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {supportedBrowsers.map((browser, index) => {
              const IconComponent = browser.icon;
              return (
                <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <IconComponent className="w-8 h-8 text-white" />
                    <div>
                      <h3 className="font-bold text-white">{browser.name}</h3>
                      <p className="text-gray-400 text-sm">{browser.version}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {browser.support === 'full' && (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm font-medium">Full Support</span>
                      </>
                    )}
                    {browser.support === 'planned' && (
                      <>
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 text-sm font-medium">Coming Soon</span>
                      </>
                    )}
                    {browser.support === 'development' && (
                      <>
                        <Settings className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 text-sm font-medium">In Development</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Note */}
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6 text-center max-w-3xl mx-auto">
            <div className="flex items-center gap-2 justify-center mb-2">
              <Smartphone className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400 font-medium">Desktop Only</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Currently available for desktop browsers only. Mobile support coming in 2025.
            </p>
            <button className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg border border-orange-500/30 hover:bg-orange-500/30 transition-all text-sm">
              Get Notified for Mobile Launch
            </button>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Troubleshooting & Support
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {troubleshootingItems.map((item, index) => {
              const isExpanded = expandedTrouble === index;
              
              return (
                <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg">
                  <button
                    onClick={() => setExpandedTrouble(isExpanded ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-white/10 transition-all"
                  >
                    <h3 className="font-medium text-white">{item.question}</h3>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isExpanded && (
                    <div className="border-t border-white/10 p-4">
                      <p className="text-gray-300 mb-4">{item.answer}</p>
                      <div className="space-y-2">
                        <h4 className="text-white font-medium text-sm">Steps to fix:</h4>
                        {item.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">
                              {stepIndex + 1}
                            </div>
                            <span className="text-gray-300">{step}</span>
                          </div>
                        ))}
                      </div>
                      <button className="mt-4 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all text-sm">
                        Still need help? Contact Support
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Video Tutorials
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <Play className="w-12 h-12 text-white/80" />
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">2:15</div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white mb-2">Quick Start Guide</h3>
                <p className="text-gray-400 text-sm">Installation and first optimization</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center">
                <Play className="w-12 h-12 text-white/80" />
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">5:30</div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white mb-2">Advanced Features</h3>
                <p className="text-gray-400 text-sm">Workspaces, analytics, and power tips</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Play className="w-12 h-12 text-white/80" />
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">3:45</div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white mb-2">Tips & Tricks</h3>
                <p className="text-gray-400 text-sm">Hidden features and productivity hacks</p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Privacy & Security
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Local Processing</h3>
              <p className="text-gray-400 text-sm mb-4">
                All optimization happens on your device. Your prompts never leave your browser unless you explicitly enable cloud sync.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <Check className="w-3 h-3" />
                  <span>No server processing</span>
                </div>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <Check className="w-3 h-3" />
                  <span>Works offline</span>
                </div>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <Check className="w-3 h-3" />
                  <span>Zero tracking</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Minimal Permissions</h3>
              <p className="text-gray-400 text-sm mb-4">
                We request only essential permissions and explain exactly why each one is needed.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-400 text-sm">
                  <Check className="w-3 h-3" />
                  <span>No browsing history</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400 text-sm">
                  <Check className="w-3 h-3" />
                  <span>No personal data</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400 text-sm">
                  <Check className="w-3 h-3" />
                  <span>No passwords</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Certified Secure</h3>
              <p className="text-gray-400 text-sm mb-4">
                SOC 2 Type II certified and GDPR compliant with regular security audits.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-400 text-sm">
                  <Check className="w-3 h-3" />
                  <span>SOC 2 certified</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400 text-sm">
                  <Check className="w-3 h-3" />
                  <span>GDPR compliant</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400 text-sm">
                  <Check className="w-3 h-3" />
                  <span>Open source</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Options */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Need Help?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/guides">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all text-center">
                <FileText className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">Documentation</h3>
                <p className="text-gray-400 text-sm">Complete guides and tutorials</p>
              </div>
            </Link>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all text-center cursor-pointer">
              <Video className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Video Tutorials</h3>
              <p className="text-gray-400 text-sm">Step-by-step video guides</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all text-center cursor-pointer">
              <MessageSquare className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Community Forum</h3>
              <p className="text-gray-400 text-sm">Get help from other users</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all text-center cursor-pointer">
              <HelpCircle className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Direct Support</h3>
              <p className="text-gray-400 text-sm">Email or live chat help</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your AI Prompts?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join thousands of professionals saving hours every week with better prompts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-3 text-lg">
                <Chrome className="w-6 h-6" />
                Add to Chrome - It's Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <Link href="/pricing">
                <button className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                  View Pricing Plans
                </button>
              </Link>
            </div>
            
            <p className="text-gray-400 text-sm">
              Free forever tier • No credit card required • Install in 10 seconds
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}