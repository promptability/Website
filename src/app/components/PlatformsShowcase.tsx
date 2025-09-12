'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { aiPlatforms } from '@/lib/platforms';
import { glassCard, staggerContainer, fadeInUp } from '@/lib/animations';

export default function PlatformsShowcase() {
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
              <motion.a
                key={platform.id}
                href={`/platforms?platform=${platform.id}`}
                variants={glassCard}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover="hover"
                transition={{ delay: index * 0.05 }}
                className="group bg-black/40 backdrop-blur-sm border border-white/5 rounded-lg p-3 hover:bg-black/60 hover:border-white/10 transition-all duration-300 cursor-pointer relative block"
              >
                {/* External link icon on hover */}
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-3 h-3 text-white/50" />
                </div>
                
                {/* Platform Icon */}
                <div className="flex flex-col items-center text-center">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 border border-white/20"
                    style={{ backgroundColor: platform.color || '#6B7280' }}
                  >
                    {platform.logo ? (
                      <img 
                        src={platform.logo} 
                        alt={`${platform.name} logo`}
                        className="w-5 h-5 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className="w-5 h-5 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                      style={{ 
                        display: platform.logo ? 'none' : 'flex'
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
              </motion.a>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile "See More" Button */}
          <div className="md:hidden text-center mb-8">
            <a
              href="/platforms"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium"
            >
              See All {aiPlatforms.length} Platforms
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Desktop Grid - Show more platforms */}
          <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            <AnimatePresence mode="wait">
              {aiPlatforms.slice(0, visibleCount).map((platform, index) => (
                <motion.a
                  key={platform.id}
                  href={`/platforms?platform=${platform.id}`}
                  variants={glassCard}
                  initial="initial"
                  animate="animate"
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover="hover"
                  transition={{ delay: index * 0.05 }}
                  className="group bg-black/40 backdrop-blur-sm border border-white/5 rounded-lg p-3 hover:bg-black/60 hover:border-white/10 transition-all duration-300 cursor-pointer relative block"
                >
                  {/* External link icon on hover */}
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-3 h-3 text-white/50" />
                  </div>
                  
                  {/* Platform Icon */}
                  <div className="flex flex-col items-center text-center">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 border border-white/20"
                      style={{ backgroundColor: platform.color || '#6B7280' }}
                    >
                      {platform.logo ? (
                        <img 
                          src={platform.logo} 
                          alt={`${platform.name} logo`}
                          className="w-5 h-5 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="w-5 h-5 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                        style={{ 
                          display: platform.logo ? 'none' : 'flex'
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
                </motion.a>
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
    </section>
  );
}