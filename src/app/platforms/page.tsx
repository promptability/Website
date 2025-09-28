'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink } from 'lucide-react';
import { aiPlatforms } from '@/lib/platforms';
import { staggerContainer, fadeInUp, glassCard } from '@/lib/animations';
import FloatingCard from '@/components/ui/FloatingCard';

function PlatformsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);

  const platformsPerPage = 50;

  // Auto-open popup if platform parameter is provided
  useEffect(() => {
    const platformParam = searchParams.get('platform');
    if (platformParam) {
      const platform = aiPlatforms.find(p => p.id === platformParam);
      if (platform) {
        setSelectedPlatform(platform);
      }
    }
  }, [searchParams]);

  const filteredPlatforms = useMemo(() => {
    // Get only popular platforms
    let popularPlatforms = aiPlatforms.filter(platform => platform.popular);
    
    // Filter by category if not 'All'
    if (selectedCategory !== 'All') {
      popularPlatforms = popularPlatforms.filter(platform => 
        platform.category === selectedCategory
      );
    }
    
    // Filter by search if there's a query
    if (searchQuery) {
      popularPlatforms = popularPlatforms.filter(platform => 
        platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        platform.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Return filtered platforms (no limit when category is selected)
    return popularPlatforms;
  }, [searchQuery, selectedCategory]);

  const paginatedPlatforms = filteredPlatforms.slice(0, currentPage * platformsPerPage);
  const hasMore = filteredPlatforms.length > currentPage * platformsPerPage;


  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
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

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 pb-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center mb-16"
          >

            {/* Title */}
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
            >
              Popular
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                AI Platforms
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4 mb-8"
            >
              Works seamlessly with the most popular AI platforms. 
              Promptability supports 1000+ AI tools in total.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              variants={fadeInUp}
              className="max-w-2xl mx-auto mb-2"
            >
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search AI platforms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                />
              </div>
              
              {/* How to Install Button */}
              <div className="text-center mb-6">
                <a
                  href="/chrome-extension"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl transition-all duration-300 font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  How to Install Promptability
                </a>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === 'All'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  All Platforms
                </button>
                <button
                  onClick={() => setSelectedCategory('Chat AI')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === 'Chat AI'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Chat AI
                </button>
                <button
                  onClick={() => setSelectedCategory('Image Generation')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === 'Image Generation'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Image
                </button>
                <button
                  onClick={() => setSelectedCategory('Video Generation')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === 'Video Generation'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Video
                </button>
                <button
                  onClick={() => setSelectedCategory('Code Assistants')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === 'Code Assistants'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Code
                </button>
                <button
                  onClick={() => setSelectedCategory('Audio/Music')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === 'Audio/Music'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Audio
                </button>
                <button
                  onClick={() => setSelectedCategory('Business')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === 'Business'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Business
                </button>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Platforms Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="wait">
            {paginatedPlatforms.map((platform, index) => (
              <motion.div
                key={platform.id}
                variants={glassCard}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.02 }}
                className=""
              >
                <FloatingCard className="p-6 h-full">
                    <div className="flex flex-col h-full relative">
                    {/* External Link Icon in Corner */}
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-0 right-0 p-2 text-gray-400 hover:text-white transition-colors z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      {/* Platform Icon */}
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                        {platform.logo ? (
                          <img 
                            src={platform.logo} 
                            alt={`${platform.name} logo`}
                            className="w-8 h-8 object-contain filter brightness-0 invert"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <span 
                          className="text-lg text-white"
                          style={{ display: platform.logo ? 'none' : 'block' }}
                        >
                          {platform.name.charAt(0)}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-white text-lg">{platform.name}</h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-4 flex-grow">
                      {platform.description}
                    </p>


                    {/* Guide Button - Only show if guide exists */}
                    {(() => {
                      const getGuideUrl = (platformId: string) => {
                        switch (platformId) {
                          case 'chatgpt': return '/guides/gpt';
                          case 'claude': return '/guides/claude';
                          case 'gemini': return '/guides/gemini';
                          case 'perplexity': return '/guides/perplexity';
                          case 'midjourney': return '/guides/midjourney';
                          case 'runway': return '/guides/runway';
                          default: return null;
                        }
                      };
                      
                      const guideUrl = getGuideUrl(platform.id);
                      
                      return guideUrl ? (
                        <div className="pt-4 border-t border-white/10">
                          <a
                            href={guideUrl}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 border border-white/10 text-white text-xs font-medium rounded-lg hover:bg-white/10 transition-colors w-full"
                          >
                            Learn Prompting Guide
                          </a>
                        </div>
                      ) : null;
                    })()}
                    </div>
                  </FloatingCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <motion.button
              onClick={() => setCurrentPage(prev => prev + 1)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-400 font-medium rounded-xl hover:bg-blue-500/20 transition-all duration-300"
            >
              Load More Platforms
            </motion.button>
          </div>
        )}

        {/* No Results */}
        {filteredPlatforms.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No platforms found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search criteria or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8">
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
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Steps */}
              <div className="space-y-8">
                {/* Step 1: Download Extension */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-white mb-2">Download the Extension</h3>
                    <p className="text-gray-300 mb-4">Install Promptability browser extension to get started</p>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                      <img 
                        src="/hero-animation.gif" 
                        alt="How to download extension"
                        className="w-full rounded-lg"
                      />
                    </div>
                    <a
                      href="/chrome-extension"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                    >
                      Download Extension
                    </a>
                  </div>
                </div>

                {/* Step 2: Sign Up */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-white mb-2">Create Your Account</h3>
                    <p className="text-gray-300 mb-4">Sign up for free to unlock prompt optimization</p>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                      <img 
                        src="/hero-animation.gif" 
                        alt="How to sign up"
                        className="w-full rounded-lg"
                      />
                    </div>
                    <a
                      href="/signup"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                    >
                      Sign Up Free
                    </a>
                  </div>
                </div>

                {/* Step 3: Use on Platform */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-white mb-2">Start Using on {selectedPlatform.name}</h3>
                    <p className="text-gray-300 mb-4">Open {selectedPlatform.name} and watch Promptability enhance your prompts</p>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                      <img 
                        src="/hero-animation.gif" 
                        alt={`How Promptability works on ${selectedPlatform.name}`}
                        className="w-full rounded-lg"
                      />
                    </div>
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
    </div>
  );
}

export default function PlatformsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlatformsContent />
    </Suspense>
  );
}