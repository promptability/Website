'use client';

import { motion } from 'framer-motion';
import { Chrome, Play, ArrowRight } from 'lucide-react';
import { wordAnimation, buttonHover, staggerContainer, fadeInUp } from '@/lib/animations';

export default function Hero() {

  const words = ["Use", "The", "Full", "Power", "Of", "AI"];

  const getWordStyle = (word: string) => {
    switch (word) {
      case "Use":
      case "The":
      case "Of":
        return "text-white";
      case "Full":
        return "bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent";
      case "Power":
        return "text-purple-400";
      case "AI":
        return "bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-bold";
      default:
        return "text-white";
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-0 sm:pt-0 sm:-mt-20 pb-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px] lg:min-h-[700px]">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center lg:text-left order-1"
          >

            {/* Word-by-word animated headline */}
            <div className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordAnimation}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.3 }}
                  className={`inline-block mr-2 sm:mr-3 ${getWordStyle(word)}`}
                  style={{ transformOrigin: 'center bottom' }}
                >
                  {word}
                  {index === 2 && <br />}
                </motion.span>
              ))}
            </div>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl font-normal leading-normal px-4 sm:px-0 mt-6 mb-0"
            >
              The Chrome extension that watches how you write prompts and 
              automatically optimizes them. <br />
              Getting you 10x better AI responses 
              without the guesswork.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="hidden lg:flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 md:mb-16 px-4 sm:px-0 mt-8"
            >
              <motion.a
                href="/signup"
                variants={buttonHover}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="bg-blue-100 hover:bg-blue-200 text-slate-900 font-semibold rounded-lg shadow border border-blue-200 transition-all hover:scale-105 hover:shadow-2xl px-10 sm:px-12 py-3 sm:py-4 text-base sm:text-lg gap-2 sm:gap-3 flex items-center justify-center"
              >
                <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                Start Free
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>

              <motion.a
                href="/chrome-extension"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold rounded-lg transition-all hover:scale-105 px-10 sm:px-12 py-3 sm:py-4 text-base sm:text-lg gap-2 sm:gap-3 flex items-center justify-center"
              >
                <Chrome className="w-4 h-4 sm:w-5 sm:h-5" />
                Install Extension
              </motion.a>
            </motion.div>

            {/* Stats section removed per request */}
          </motion.div>

          {/* Right Content - Enhanced Animated GIF */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative flex items-center justify-center my-8 lg:my-0 lg:mt-0 px-4 sm:px-0 order-2 lg:order-2"
          >
            {/* Background Glow Effects */}
            <div className="absolute inset-0 scale-110">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-cyan-500/20 to-purple-500/30 rounded-3xl blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl"></div>
            </div>


            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full blur-sm"
              />
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full blur-sm"
              />
              <motion.div
                animate={{ 
                  y: [0, -25, 0],
                  opacity: [0.2, 0.7, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-purple-400 rounded-full blur-sm"
              />
            </div>

            {/* Main GIF Container */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative z-10"
            >
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl max-w-sm sm:max-w-md lg:max-w-lg">
                {/* Enhanced backdrop */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40 z-10 pointer-events-none"></div>
                
                {/* Shining border effect */}
                <div className="absolute inset-0 rounded-2xl">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 70%, rgba(255, 255, 255, 0.3) 80%, transparent 90%)'
                    }}
                  />
                </div>

                {/* GIF with enhanced styling */}
                <img 
                  src="/hero-animation.gif" 
                  alt="Promptability AI Demo"
                  className="relative z-20 w-full h-auto brightness-110 contrast-110 saturate-110"
                  style={{ 
                    filter: 'brightness(1.2) contrast(1.15) saturate(1.1) drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))',
                    transform: 'scale(1.05)'
                  }}
                />
              </div>

              {/* Additional Glow Layer */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-purple-500/20 blur-xl scale-110 -z-10"></div>
            </motion.div>
          </motion.div>

          {/* Mobile Buttons - Show only on mobile, after GIF */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="flex lg:hidden flex-col sm:flex-row gap-4 w-full order-3 px-4 sm:px-0"
          >
            <motion.a
              href="/signup"
              variants={buttonHover}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="bg-blue-100 hover:bg-blue-200 text-slate-900 font-semibold rounded-lg shadow border border-blue-200 transition-all hover:scale-105 hover:shadow-2xl px-10 sm:px-12 py-3 sm:py-4 text-base sm:text-lg gap-2 sm:gap-3 flex items-center justify-center"
            >
              <Play className="w-5 h-5 sm:w-6 sm:h-6" />
              Start Free
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>

            <motion.a
              href="/chrome-extension"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold rounded-lg transition-all hover:scale-105 px-10 sm:px-12 py-3 sm:py-4 text-base sm:text-lg gap-2 sm:gap-3 flex items-center justify-center"
            >
              <Chrome className="w-4 h-4 sm:w-5 sm:h-5" />
              Install Extension
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}