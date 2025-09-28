'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, X, Download } from 'lucide-react';
import { aiPlatforms } from '@/lib/platforms';
import { glassCard, staggerContainer, fadeInUp } from '@/lib/animations';

export default function PlatformsShowcase() {
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  const visibleCount = 32;
  const mobileVisibleCount = 6; // Only show 6 on mobile

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold leading-tight mb-6 text-white"
          >
            Works with
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              1000+ AI Platforms
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-8"
          >
            From chat AI to image generation, code assistance to video creation, <br />
            Promptability works seamlessly across all major AI platforms
          </motion.p>
        </motion.div>

        {/* Platforms Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-8"
        >
          {/* Mobile Grid - Show only 6 platforms */}
          <div className="md:hidden grid grid-cols-3 gap-3 mb-6">
            <AnimatePresence mode="wait">
              {aiPlatforms.slice(0, mobileVisibleCount).map((platform, index) => (
              <motion.div
                key={platform.id}
                onClick={() => setSelectedPlatform(platform)}
                variants={glassCard}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover="hover"
                transition={{ delay: index * 0.05 }}
                className="group bg-black/40 backdrop-blur-sm border border-white/5 rounded-lg p-3 hover:bg-black/60 hover:border-white/10 transition-all duration-300 cursor-pointer relative"
              >
                {/* External link icon on hover */}
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-3 h-3 text-white/50" />
                </div>
                
                {/* Platform Icon */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                    {platform.logo ? (
                      <img 
                        src={platform.logo} 
                        alt={`${platform.name} logo`}
                        className="w-10 h-10 object-contain"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm border border-white/20"
                      style={{ 
                        display: platform.logo ? 'none' : 'flex',
                        backgroundColor: platform.color || '#6B7280'
                      }}
                    >
                      {platform.name.charAt(0)}
                    </div>
                  </div>
                  <h3 className="font-medium text-white text-xs truncate w-full">{platform.name}</h3>
                </div>

                {/* Hover Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl pointer-events-none"
                  style={{ backgroundColor: platform.color }}
                />
              </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile "See More" Button */}
          <div className="md:hidden text-center">
            <a
              href="/platforms"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium"
            >
              See All Platforms
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Desktop Grid - Show more platforms */}
          <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            <AnimatePresence mode="wait">
              {aiPlatforms.slice(0, visibleCount).map((platform, index) => (
                <motion.div
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform)}
                  variants={glassCard}
                  initial="initial"
                  animate="animate"
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover="hover"
                  transition={{ delay: index * 0.05 }}
                  className="group bg-black/40 backdrop-blur-sm border border-white/5 rounded-lg p-3 hover:bg-black/60 hover:border-white/10 transition-all duration-300 cursor-pointer relative"
                >
                  {/* External link icon on hover */}
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-3 h-3 text-white/50" />
                  </div>
                  
                  {/* Platform Icon */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                      {platform.logo ? (
                        <img 
                          src={platform.logo} 
                          alt={`${platform.name} logo`}
                          className="w-10 h-10 object-contain"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm border border-white/20"
                        style={{ 
                          display: platform.logo ? 'none' : 'flex',
                          backgroundColor: platform.color || '#6B7280'
                        }}
                      >
                        {platform.name.charAt(0)}
                      </div>
                    </div>
                    <h3 className="font-medium text-white text-xs truncate w-full">{platform.name}</h3>
                  </div>

                  {/* Hover Glow Effect */}
                  <div 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl pointer-events-none"
                    style={{ backgroundColor: platform.color }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Subtle CTA after platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-sm mb-3">Ready to optimize across all platforms?</p>
          <a
            href="/signup"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
          >
            Start for free
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Use Promptability Modal */}
      <AnimatePresence>
        {selectedPlatform && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedPlatform(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gradient-to-br from-black/95 to-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                    {selectedPlatform.logo ? (
                      <img 
                        src={selectedPlatform.logo} 
                        alt={`${selectedPlatform.name} logo`}
                        className="w-8 h-8 object-contain filter brightness-0 invert"
                      />
                    ) : (
                      <span className="text-white font-bold">{selectedPlatform.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Use Promptability on {selectedPlatform.name}</h2>
                    <p className="text-gray-400">Get started in 3 simple steps</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPlatform(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Steps */}
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-semibold">
                    1
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-white mb-2">Install Chrome Extension</h3>
                    <p className="text-gray-300 mb-4">Get the Promptability extension from Chrome Web Store</p>
                    <div className="flex gap-3">
                      <a
                        href="https://chrome.google.com/webstore/detail/promptability/your-extension-id"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Install Extension
                      </a>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-semibold">
                    2
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-white mb-2">Sign Up for Free</h3>
                    <p className="text-gray-300 mb-4">Create your free account to start optimizing prompts</p>
                    <a
                      href="/signup"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                    >
                      Create Account
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-semibold">
                    3
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-white mb-2">Start Using on {selectedPlatform.name}</h3>
                    <p className="text-gray-300 mb-4">Open {selectedPlatform.name} and watch Promptability enhance your prompts</p>
                    <a
                      href={selectedPlatform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                    >
                      Open {selectedPlatform.name}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}