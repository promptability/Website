'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Users, Zap, Star, Clock, Globe, ArrowRight, MapPin } from 'lucide-react';

const storySteps = [
  {
    id: 'start',
    title: 'It Started Small',
    metric: { label: 'Active Users', value: 2000, suffix: '+', color: 'blue' },
    story: 'From our first user to a thriving community',
    examples: [
      { name: 'Sarah', location: 'San Francisco', action: 'saved 12 minutes on a prompt' },
      { name: 'Dev Team', location: 'Tokyo', action: 'optimized 50 prompts today' },
      { name: 'Research Lab', location: 'London', action: 'achieved 10x better results' }
    ]
  },
  {
    id: 'magic',
    title: 'Then Magic Happened',
    metric: { label: 'Prompts Transformed', value: 50000, suffix: '+', color: 'green' },
    story: 'Watch prompts evolve from weak to powerful',
    transformations: [
      { before: 'write about AI', after: 'Create a comprehensive 2000-word analysis exploring the transformative impact of artificial intelligence...' },
      { before: 'help with code', after: 'Debug this React component by identifying the root cause of the state update issue and provide...' },
      { before: 'design logo', after: 'Design a minimalist, memorable logo for a tech startup that conveys innovation, trust...' }
    ]
  },
  {
    id: 'excellence',
    title: 'Excellence Became Standard',
    metric: { label: 'Satisfaction', value: 4.9, suffix: '/5', color: 'yellow' },
    story: 'Real feedback from real professionals',
    reviews: [
      { text: 'Changed my workflow completely', author: 'Marketing Director' },
      { text: 'Can\'t imagine working without it', author: 'Software Engineer' },
      { text: '10x productivity boost', author: 'Content Creator' },
      { text: 'Game-changer for our team', author: 'Product Manager' }
    ]
  },
  {
    id: 'impact',
    title: 'Time Became Abundant',
    metric: { label: 'Time Saved', value: 60, suffix: '%', color: 'purple' },
    story: 'Hours returned to focus on what matters',
    impacts: [
      { role: 'Content Creator', before: '45 min per prompt', after: '5 min', savings: '40 min' },
      { role: 'Developer', before: 'Constant debugging', after: '85% first-try success', savings: '3 hours/day' },
      { role: 'Researcher', before: 'Vague queries', after: 'Precise results', savings: '2 hours/day' }
    ]
  }
];

const liveActivities = [
  'Sarah just saved 12 minutes on a blog prompt',
  'Tokyo dev team optimized 47 prompts today',
  'New milestone: 1M tokens saved this week',
  'London researchers achieved 95% accuracy',
  'Startup in Berlin cut prompt time by 70%',
  'Content team shipped 3x faster with AI'
];

export default function TrustMetrics() {
  const [counters, setCounters] = useState<Record<string, number>>({});
  const [currentActivity, setCurrentActivity] = useState(0);
  const [typedText, setTypedText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Typing animation for subtitle
  useEffect(() => {
    const text = 'Watch how Promptability transforms workflows across the globe';
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setTypedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Live activity ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity(prev => (prev + 1) % liveActivities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animate counters when in view
  useEffect(() => {
    if (isInView) {
      storySteps.forEach((step, index) => {
        setTimeout(() => {
          animateCounter(step.id, step.metric.value);
        }, index * 1000);
      });
    }
  }, [isInView]);

  const animateCounter = (id: string, targetValue: number) => {
    const duration = 1500;
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, targetValue);
      
      setCounters(prev => ({
        ...prev,
        [id]: current
      }));

      if (step >= steps) {
        clearInterval(timer);
        setCounters(prev => ({
          ...prev,
          [id]: targetValue
        }));
      }
    }, duration / steps);
  };

  const formatNumber = (value: number, suffix: string) => {
    if (suffix === '/5') return value.toFixed(1);
    if (value >= 1000) return (value / 1000).toFixed(value >= 10000 ? 0 : 1) + 'k';
    return Math.round(value).toString();
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-400 to-cyan-400';
      case 'green': return 'from-green-400 to-emerald-400';
      case 'yellow': return 'from-yellow-400 to-orange-400';
      case 'purple': return 'from-purple-400 to-pink-400';
      default: return 'from-blue-400 to-cyan-400';
    }
  };

  return (
    <section ref={containerRef} className="py-32 px-4 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Title with Typing Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Real Impact,
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Real Numbers
            </span>
          </h2>
          
          <div className="text-xl text-gray-300 h-8 max-w-4xl mx-auto">
            {typedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-1"
            >
              |
            </motion.span>
          </div>
        </motion.div>

        {/* Live Activity Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-16 overflow-hidden"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white font-semibold text-sm">LIVE</span>
            </div>
            <div className="flex-1 relative h-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentActivity}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center text-gray-300"
                >
                  {liveActivities[currentActivity]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Story Steps */}
        <div className="space-y-32">
          {storySteps.map((step, stepIndex) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, delay: stepIndex * 0.2 }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              {/* Story Content */}
              <div className={stepIndex % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
                <motion.h3 
                  className="text-4xl md:text-5xl font-bold text-white mb-6"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: stepIndex * 0.3 }}
                >
                  {step.title}
                </motion.h3>
                
                <motion.p 
                  className="text-xl text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: stepIndex * 0.3 + 0.2 }}
                >
                  {step.story}
                </motion.p>

                {/* Step-specific content */}
                {step.id === 'start' && (
                  <div className="space-y-4">
                    {step.examples?.map((example, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: stepIndex * 0.3 + 0.4 + i * 0.1 }}
                        className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10"
                      >
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span className="text-white font-medium">{example.name}</span>
                        <span className="text-gray-400">in {example.location}</span>
                        <span className="text-green-400">{example.action}</span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {step.id === 'magic' && (
                  <div className="space-y-6">
                    {step.transformations?.map((transform, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: stepIndex * 0.3 + 0.4 + i * 0.2 }}
                        className="bg-gradient-to-r from-red-500/10 to-green-500/10 border border-white/10 rounded-xl p-6"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-red-400 text-sm font-mono">BEFORE:</div>
                          <div className="text-gray-400">&quot;{transform.before}&quot;</div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-blue-400 mx-auto mb-4" />
                        <div className="flex items-start gap-4">
                          <div className="text-green-400 text-sm font-mono">AFTER:</div>
                          <div className="text-white font-medium">&quot;{transform.after.slice(0, 80)}...&quot;</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {step.id === 'excellence' && (
                  <div className="space-y-4">
                    {step.reviews?.map((review, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: stepIndex * 0.3 + 0.4 + i * 0.15 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-6"
                      >
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, starIndex) => (
                            <Star key={starIndex} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-white font-medium mb-2">&quot;{review.text}&quot;</p>
                        <p className="text-gray-400 text-sm">— {review.author}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {step.id === 'impact' && (
                  <div className="space-y-6">
                    {step.impacts?.map((impact, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: stepIndex * 0.3 + 0.4 + i * 0.2 }}
                        className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/20 rounded-xl p-6"
                      >
                        <h4 className="text-white font-bold mb-3">{impact.role}</h4>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-red-400 text-sm">Before</p>
                            <p className="text-white font-medium">{impact.before}</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-blue-400 mx-auto mt-4" />
                          <div>
                            <p className="text-green-400 text-sm">After</p>
                            <p className="text-white font-medium">{impact.after}</p>
                          </div>
                        </div>
                        <div className="text-center mt-4 pt-4 border-t border-white/10">
                          <p className="text-purple-400 font-bold">Saves {impact.savings}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Metric Visualization */}
              <div className={stepIndex % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: stepIndex * 0.3 + 0.5 }}
                  className="relative"
                >
                  {/* Main Metric Circle */}
                  <div className="relative w-80 h-80 mx-auto">
                    {/* Outer Ring */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getColorClasses(step.metric.color)} opacity-20 blur-xl animate-pulse`} />
                    
                    {/* Main Circle */}
                    <div className="absolute inset-8 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <motion.div
                          className={`text-6xl md:text-7xl font-bold bg-gradient-to-r ${getColorClasses(step.metric.color)} bg-clip-text text-transparent mb-2`}
                        >
                          {formatNumber(counters[step.id] || 0, step.metric.suffix)}{step.metric.suffix}
                        </motion.div>
                        <div className="text-white font-semibold text-lg">
                          {step.metric.label}
                        </div>
                      </div>
                    </div>

                    {/* Floating Icons */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0"
                    >
                      {[Users, Zap, Star, Clock, Globe].map((Icon, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                          style={{
                            top: `${20 + Math.sin((i * 2 * Math.PI) / 5) * 30 + 30}%`,
                            left: `${50 + Math.cos((i * 2 * Math.PI) / 5) * 40}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          whileHover={{ scale: 1.2 }}
                        >
                          <Icon className="w-6 h-6 text-white/80" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Success Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-32 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              See Your Potential Impact
            </h3>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join 2,000+ professionals transforming their AI workflow
            </p>

            {/* Quick Impact Preview */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-6"
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">5-10x</div>
                <div className="text-white font-medium">Faster Prompting</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-green-500/10 border border-green-400/20 rounded-xl p-6"
              >
                <div className="text-3xl font-bold text-green-400 mb-2">85%</div>
                <div className="text-white font-medium">Better Results</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-purple-500/10 border border-purple-400/20 rounded-xl p-6"
              >
                <div className="text-3xl font-bold text-purple-400 mb-2">$2,400</div>
                <div className="text-white font-medium">Annual Savings</div>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white font-bold py-4 px-12 rounded-xl text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
            >
              Start Your Transformation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}3