'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ExternalLink } from 'lucide-react';
import { aiPlatforms, platformCategories, featureFilters } from '@/lib/platforms';
import { staggerContainer, fadeInUp, glassCard } from '@/lib/animations';
import FloatingCard from '@/components/ui/FloatingCard';

function PlatformsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
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
    let filtered = aiPlatforms.filter(platform => {
      const matchesSearch = platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           platform.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           platform.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || platform.category === selectedCategory;
      
      const matchesFeatures = selectedFeatures.length === 0 || selectedFeatures.every(feature => {
        switch (feature) {
          case 'Free tier available': return platform.freeTier;
          case 'API access': return platform.apiAccess;
          case 'Team collaboration': return platform.teamCollaboration;
          case 'No signup required': return platform.noSignup;
          case 'Open source': return platform.openSource;
          case 'Enterprise ready': return platform.enterprise;
          default: return false;
        }
      });

      return matchesSearch && matchesCategory && matchesFeatures;
    });

    // Sort platforms
    switch (sortBy) {
      case 'popular':
        return filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
      case 'alphabetical':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'category':
        return filtered.sort((a, b) => a.category.localeCompare(b.category));
      default:
        return filtered;
    }
  }, [searchQuery, selectedCategory, selectedFeatures, sortBy]);

  const paginatedPlatforms = filteredPlatforms.slice(0, currentPage * platformsPerPage);
  const hasMore = filteredPlatforms.length > currentPage * platformsPerPage;

  const toggleFeatureFilter = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };


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
      <section className="pt-32 pb-16 px-4">
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
              className="text-5xl md:text-7xl font-bold mb-8 text-white"
            >
              Works With
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                1000+ AI Platforms
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-400 max-w-3xl mx-auto mb-8"
            >
              Optimize prompts for any browser-based AI tool. From ChatGPT to Midjourney, 
              from coding assistants to research tools.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              variants={fadeInUp}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search AI platforms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                />
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50"
              >
                {platformCategories.map(category => (
                  <option key={category} value={category} className="bg-black">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50"
              >
                <option value="popular" className="bg-black">Most Popular</option>
                <option value="alphabetical" className="bg-black">Alphabetical</option>
                <option value="category" className="bg-black">Category</option>
              </select>
            </div>

            {/* Feature Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Features
              {selectedFeatures.length > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {selectedFeatures.length}
                </span>
              )}
            </button>

          </div>

          {/* Feature Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <div className="flex flex-wrap gap-2">
                  {featureFilters.map(feature => (
                    <button
                      key={feature}
                      onClick={() => toggleFeatureFilter(feature)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedFeatures.includes(feature)
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Platforms Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
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
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
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
                          <span className="text-xs text-gray-400">{platform.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-4 flex-grow">
                      {platform.description}
                    </p>

                    {/* Features */}
                    {platform.features && platform.features.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {platform.features.slice(0, 3).map(feature => (
                          <span
                            key={feature}
                            className="px-2 py-1 bg-white/10 rounded-md text-xs text-gray-300"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-white/10 space-y-2">
                      
                      <div className="grid grid-cols-1 gap-2">
                        <button 
                          onClick={() => setSelectedPlatform(platform)}
                          className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium rounded-lg hover:bg-blue-500/20 transition-colors"
                        >
                          Use Promptability on {platform.name}
                        </button>
                        
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium rounded-lg hover:bg-blue-500/20 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Open Platform
                        </a>
                        
                        {(() => {
                          const getGuideUrl = (platformId: string) => {
                            switch (platformId) {
                              case 'chatgpt': return '/guides/gpt';
                              case 'claude': return '/guides/claude';
                              case 'gemini': return '/guides/gemini';
                              default: return null;
                            }
                          };
                          
                          const guideUrl = getGuideUrl(platform.id);
                          
                          return guideUrl ? (
                            <a
                              href={guideUrl}
                              className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 border border-white/10 text-white text-xs font-medium rounded-lg hover:bg-white/10 transition-colors"
                            >
                              Learn Prompting
                            </a>
                          ) : (
                            <button 
                              disabled
                              className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 border border-white/10 text-white/50 text-xs font-medium rounded-lg cursor-not-allowed"
                            >
                              Guide Coming Soon
                            </button>
                          );
                        })()}
                      </div>
                    </div>
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
                setSelectedCategory('All');
                setSelectedFeatures([]);
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