'use client';

import { 
  Shield, Download, ArrowRight,
  Users, Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import DualPromptTester from '../components/DualPromptTester';
import EnhancedFAQ from '../components/EnhancedFAQ';

const steps = [
  {
    number: '01',
    title: 'Install Extension',
    description: 'Click the button below to go to Chrome Web Store'
  },
  {
    number: '02', 
    title: 'Choose Your Plan',
    description: 'Sign up for the plan that fits your needs'
  },
  {
    number: '03',
    title: 'Start Using Promptability',
    description: 'Unleash the full power of AI with optimized prompts'
  }
];

const features = [
  {
    title: 'One-Click Optimization',
    description: 'Select text, right-click, get better prompts instantly'
  },
  {
    title: 'Works Everywhere', 
    description: 'ChatGPT, Claude, Gemini, and 1000+ AI platforms'
  },
  {
    title: 'Completely Private',
    description: 'All processing happens locally on your device'
  }
];

export default function ChromeExtensionPage() {

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
      
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-20 relative z-40">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-white"
          >
            Get the Chrome Extension
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Transform any text into optimized AI prompts with one click. Works on any website.
          </motion.p>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <button className="group px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-3 text-lg mx-auto">
              <Download className="w-5 h-5" />
              Add to Chrome - It's Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>2,000+ users</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>4.9★ rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>100% private</span>
            </div>
          </motion.div>
        </div>

        {/* How it works */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            How it works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Why you'll love it
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center"
              >
                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Live Demo */}
        <DualPromptTester />

        {/* FAQ */}
        <EnhancedFAQ />

        {/* Final CTA */}
        <section className="text-center">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who save time every day with better AI prompts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Add to Chrome - It's Free
              </button>
              
              <Link href="/pricing">
                <button className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-lg transition-all">
                  View pricing plans
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}