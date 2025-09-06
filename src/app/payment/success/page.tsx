'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Download, Users, BookOpen, Headphones, 
  ExternalLink, Lock, Share2, Mail, Printer, ChevronDown,
  Chrome, Smartphone, Copy, Star, Shield
} from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import FloatingCard from '@/components/ui/FloatingCard';

export default function PaymentSuccessPage() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [orderDetails, setOrderDetails] = useState({
    orderId: 'PMT-2024-001234',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    plan: 'Premium',
    amount: '$19.99',
    billing: 'Monthly',
    nextBilling: 'February 1, 2025',
    paymentMethod: '**** 4242',
    email: 'user@example.com'
  });

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const premiumFeatures = [
    { name: 'Unlimited prompt optimizations', description: 'No daily limits on improvements' },
    { name: 'All AI platform support', description: 'Works on 1000+ AI platforms' },
    { name: 'Advanced optimization modes', description: 'Context, style, and goal-based optimization' },
    { name: 'Custom templates', description: 'Save and reuse your best prompts' },
    { name: 'Priority support', description: '24/7 chat and email support' },
    { name: 'API access', description: 'Integrate with your applications' },
    { name: 'Team collaboration', description: 'Share prompts with your team' },
    { name: 'Analytics dashboard', description: 'Track your optimization success' }
  ];

  const gettingStartedSteps = [
    {
      number: 1,
      title: 'Install Extension',
      description: 'Download from Chrome Web Store',
      time: '30 seconds',
      details: ['Download from store', 'Click "Add to Chrome"', 'Grant permissions']
    },
    {
      number: 2,
      title: 'Sign In',
      description: 'Use your account credentials',
      time: '15 seconds',
      details: ['Click extension icon', 'Use same email', 'Auto-activation']
    },
    {
      number: 3,
      title: 'Start Optimizing',
      description: 'Visit any AI platform and begin',
      time: '0 seconds',
      details: ['Visit any AI platform', 'Type your prompt', 'Watch the magic']
    }
  ];

  return (
    <main className="min-h-screen text-white overflow-x-hidden relative">
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

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full"
                initial={{ 
                  x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0, 
                  y: -20,
                  rotate: 0 
                }}
                animate={{ 
                  y: typeof window !== 'undefined' ? window.innerHeight + 20 : 1000,
                  rotate: 360 
                }}
                transition={{ 
                  duration: 3,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Success Animation Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-8"
          >
            <div className="relative inline-flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mb-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
              </motion.div>
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Payment Successful!
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-400 mb-6"
          >
            Welcome to Promptability Premium
          </motion.p>

          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <span className="text-blue-400">Order:</span>
              <span className="font-mono">{orderDetails.orderId}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full" />
            <div>
              {orderDetails.date} at {orderDetails.time}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mt-4"
          >
            <CheckCircle className="w-4 h-4" />
            Premium Activated
          </motion.div>
        </motion.div>

        {/* Purchase Summary Card */}
        <motion.div
          variants={fadeInUp}
          className="mb-16"
        >
          <FloatingCard className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Purchase Summary</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Plan</span>
                  <span className="text-white font-semibold">{orderDetails.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount Paid</span>
                  <span className="text-white font-semibold">{orderDetails.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Billing Cycle</span>
                  <span className="text-white">{orderDetails.billing}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Next Billing</span>
                  <span className="text-white">{orderDetails.nextBilling}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment Method</span>
                  <span className="text-white">{orderDetails.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email</span>
                  <span className="text-white">{orderDetails.email}</span>
                </div>
              </div>
            </div>
          </FloatingCard>
        </motion.div>

        {/* What's Included Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Everything in Your Plan</h2>
            <p className="text-gray-400">All premium features are now unlocked</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {premiumFeatures.map((feature, index) => (
              <motion.div
                key={feature.name}
                variants={fadeInUp}
                className="group"
              >
                <FloatingCard className="p-6 h-full hover:border-green-500/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{feature.name}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </FloatingCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Download Extension Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Get Started in 30 Seconds</h2>
            <p className="text-gray-400">Download the extension to start optimizing your prompts</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center mb-8">
            <a
              href="/chrome-extension"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-lg"
            >
              <Download className="w-6 h-6" />
              Download Chrome Extension
            </a>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex justify-center gap-6 text-sm text-gray-400 mb-6">
            <button className="hover:text-white transition-colors">Firefox</button>
            <button className="hover:text-white transition-colors">Safari</button>
            <button className="hover:text-white transition-colors">Edge</button>
            <button className="hover:text-white transition-colors">Brave</button>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center">
            <button className="text-blue-400 hover:text-blue-300 text-sm">
              Already installed? Sign in to extension →
            </button>
          </motion.div>
        </motion.div>

        {/* Getting Started Steps */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Quick Start Guide</h2>
          </motion.div>

          <div className="relative">
            {/* Progress Line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {gettingStartedSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <FloatingCard className="p-6 h-full">
                    <div className="mb-6">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      >
                        {step.number}
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-400 mb-2">{step.description}</p>
                      <span className="text-xs text-blue-400">Est. {step.time}</span>
                    </div>
                    
                    <div className="space-y-2">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </FloatingCard>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Invoice/Receipt Section */}
        <motion.div
          variants={fadeInUp}
          className="mb-16"
        >
          <FloatingCard className="p-6">
            <button
              onClick={() => setShowInvoice(!showInvoice)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-semibold text-white">Invoice & Receipt</h3>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showInvoice ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showInvoice && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-6 border-t border-white/10 pt-6"
                >
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Promptability Premium</span>
                      <span className="text-white">{orderDetails.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white">{orderDetails.amount}</span>
                    </div>
                    <div className="border-t border-white/10 pt-4 flex justify-between font-semibold">
                      <span className="text-white">Total</span>
                      <span className="text-white">{orderDetails.amount}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors">
                      <Mail className="w-4 h-4" />
                      Email Receipt
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors">
                      <Printer className="w-4 h-4" />
                      Print
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </FloatingCard>
        </motion.div>

        {/* Quick Actions Bar */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div variants={fadeInUp}>
              <FloatingCard className="p-6 text-center hover:border-blue-500/30 transition-colors group cursor-pointer">
                <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-2">Read the Docs</h3>
                <p className="text-gray-400 text-sm">Learn advanced features</p>
              </FloatingCard>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <FloatingCard className="p-6 text-center hover:border-blue-500/30 transition-colors group cursor-pointer">
                <Headphones className="w-8 h-8 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-2">Need Help?</h3>
                <p className="text-gray-400 text-sm">Chat with our team</p>
              </FloatingCard>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <FloatingCard className="p-6 text-center hover:border-blue-500/30 transition-colors group cursor-pointer">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-2">Join Community</h3>
                <p className="text-gray-400 text-sm">Connect with users</p>
              </FloatingCard>
            </motion.div>
          </div>
        </motion.div>

        {/* Email Confirmation Notice */}
        <motion.div
          variants={fadeInUp}
          className="mb-16"
        >
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-medium">Receipt sent to {orderDetails.email}</span>
            </div>
            <button className="text-blue-400 hover:text-blue-300 text-sm">
              Didn't receive it? Resend email
            </button>
          </div>
        </motion.div>

        {/* Security & Social Proof */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <motion.div variants={fadeInUp}>
            <FloatingCard className="p-6 text-center">
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Secure Payment</h3>
              <p className="text-gray-400 text-sm mb-3">Processed by Stripe</p>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Lock className="w-3 h-3" />
                <span>256-bit SSL encryption</span>
              </div>
            </FloatingCard>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <FloatingCard className="p-6 text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Join 50,000+ Users</h3>
              <p className="text-gray-400 text-sm mb-3">"Best prompt optimization tool I've used"</p>
              <div className="flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </FloatingCard>
          </motion.div>
        </motion.div>

        {/* Referral Prompt */}
        <motion.div
          variants={fadeInUp}
          className="text-center"
        >
          <FloatingCard className="p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Love Promptability?</h3>
            <p className="text-gray-400 mb-6">Refer friends and get rewards</p>
            <div className="flex justify-center gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors">
                <Share2 className="w-4 h-4" />
                Share with Friends
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors">
                <Copy className="w-4 h-4" />
                Copy Referral Link
              </button>
            </div>
          </FloatingCard>
        </motion.div>
      </div>
    </main>
  );
}