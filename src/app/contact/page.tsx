'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, HelpCircle, Bug, 
  Zap, Building2, Send, Check, Star
} from 'lucide-react';
import Link from 'next/link';

const contactReasons = [
  { 
    icon: HelpCircle, 
    title: 'General Support',
    description: 'Get help with your account or extension',
    selected: true
  },
  { 
    icon: Bug, 
    title: 'Report a Bug',
    description: 'Something not working correctly?',
    selected: false
  },
  { 
    icon: Zap, 
    title: 'Feature Request',
    description: 'Have an idea to make Promptability better?',
    selected: false
  },
  { 
    icon: Building2, 
    title: 'Enterprise Sales',
    description: 'Need a custom solution for your team?',
    selected: false
  }
];


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: 'General Support',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedReason, setSelectedReason] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        reason: 'General Support',
        message: ''
      });
    }, 5000);
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

      <div className="max-w-6xl mx-auto px-4 pt-32 pb-20 relative z-40">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-white"
          >
            Get in Touch
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            We're here to help. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>


        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                {/* Reason Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    How can we help?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {contactReasons.map((reason, index) => {
                      const IconComponent = reason.icon;
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setSelectedReason(index);
                            setFormData({...formData, reason: reason.title});
                          }}
                          className={`p-3 rounded-lg border transition-all text-left ${
                            selectedReason === index
                              ? 'bg-blue-500/20 border-blue-400/50 text-white'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <IconComponent className="w-5 h-5 mb-2" />
                          <div className="text-sm font-medium">{reason.title}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    isSubmitted 
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & FAQ Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Direct Contact */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Other ways to reach us</h2>
              
              <div className="space-y-4">
                <a 
                  href="mailto:support@promptability.ai"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                >
                  <Mail className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Email Support</div>
                    <div className="text-gray-400 text-sm">support@promptability.ai</div>
                  </div>
                </a>

              </div>
            </div>


            {/* Quick Links */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Before you contact us</h3>
              <p className="text-gray-300 mb-4">You might find your answer here:</p>
              
              <div className="space-y-3">
                <Link 
                  href="/#faq"
                  className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                >
                  <div className="text-white font-medium">Frequently Asked Questions</div>
                  <div className="text-gray-400 text-sm">Quick answers to common questions</div>
                </Link>
                
                
                <Link 
                  href="/pricing"
                  className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                >
                  <div className="text-white font-medium">Pricing & Plans</div>
                  <div className="text-gray-400 text-sm">Compare features and pricing</div>
                </Link>
              </div>
            </div>

            {/* Leave a Review Section */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Love Promptability?</h3>
              <p className="text-gray-300 mb-6">Share your experience and help others discover better AI prompts</p>
              
              <a 
                href="https://chromewebstore.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-lg hover:from-blue-500/30 hover:to-cyan-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium flex items-center gap-2">
                      Leave us a Review
                    </div>
                    <div className="text-gray-400 text-sm mt-1">Help us reach more users on Chrome Web Store</div>
                  </div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 text-white fill-current" />
                    ))}
                  </div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </main>
  );
}