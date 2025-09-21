'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Home, BookOpen, Star, DollarSign, Puzzle, 
  MessageSquare, ArrowRight, Zap
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import Link from 'next/link';

export default function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMessage, setCurrentMessage] = useState(0);

  const humorMessages = [
    "Looks like this prompt needs optimization too",
    "Even AI couldn't find this page", 
    "This page is still learning",
    "404 - Prompt not found"
  ];

  const quickLinks = [
    {
      href: '/account',
      icon: <Home className="w-6 h-6" />,
      title: 'Go to Account',
      description: 'Access your account',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/30'
    },
    {
      href: '/docs',
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Documentation',
      description: 'Browse help articles',
      gradient: 'from-green-500/20 to-emerald-500/20',
      border: 'border-green-500/30'
    },
    {
      href: '/features',
      icon: <Star className="w-6 h-6" />,
      title: 'Features',
      description: 'Explore capabilities',
      gradient: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-500/30'
    },
    {
      href: '/pricing',
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Pricing',
      description: 'View plans',
      gradient: 'from-yellow-500/20 to-orange-500/20',
      border: 'border-yellow-500/30'
    },
    {
      href: '/chrome-extension',
      icon: <Puzzle className="w-6 h-6" />,
      title: 'Get Extension',
      description: 'Install Promptability',
      gradient: 'from-indigo-500/20 to-purple-500/20',
      border: 'border-indigo-500/30'
    },
    {
      href: '/contact',
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Get Help',
      description: 'Contact our team',
      gradient: 'from-red-500/20 to-pink-500/20',
      border: 'border-red-500/30'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % humorMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="relative z-40 w-full max-w-4xl mx-auto px-4 pt-32 pb-20">
        
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center space-y-12"
        >
          
          {/* 404 Display */}
          <motion.div 
            variants={fadeInUp}
            className="relative"
          >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl -rotate-2" />
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotateX: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              404
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div 
            variants={fadeInUp}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Oops! Page Not Found
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The page you're looking for seems to have vanished into the AI void
            </p>
            
            {/* Rotating Humor Messages */}
            <motion.p 
              key={currentMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-gray-400 italic"
            >
              {humorMessages[currentMessage]}
            </motion.p>
          </motion.div>

          {/* Search Section */}
          <motion.div 
            variants={fadeInUp}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Let's help you find what you need:
              </h2>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation, features, or guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl pl-14 pr-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-lg"
                />
              </div>
            </div>
          </motion.div>

          {/* Quick Links Grid */}
          <motion.div 
            variants={fadeInUp}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-white">Popular Pages</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    className={`block bg-white/5 backdrop-blur-xl border ${link.border} rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group h-full`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.gradient} border ${link.border} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform`}>
                      {link.icon}
                    </div>
                    <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {link.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-3">
                      {link.description}
                    </p>
                    <div className="flex items-center text-blue-400 text-sm group-hover:text-blue-300 transition-colors">
                      <span>Visit page</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>



        </motion.div>
      </div>
    </main>
  );
}