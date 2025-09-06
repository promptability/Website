'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Play, Clock, Users, Star, Search, Filter,
  ArrowRight, ExternalLink, BookOpen, Zap, Settings,
  Eye, ThumbsUp, MessageSquare
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import Link from 'next/link';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: string;
  likes: string;
  category: 'Getting Started' | 'Features' | 'Tips & Tricks' | 'Webinars';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  videoUrl: string;
  transcript?: boolean;
}

const videoData: Video[] = [
  {
    id: '1',
    title: 'Getting Started with Promptability AI',
    description: 'Complete walkthrough from installation to your first optimized prompt',
    duration: '8:24',
    views: '12.5k',
    likes: '987',
    category: 'Getting Started',
    level: 'Beginner',
    thumbnail: '/thumbnails/getting-started.jpg',
    videoUrl: '/videos/getting-started.mp4',
    transcript: true
  },
  {
    id: '2',
    title: 'Auto-Optimize Mode Deep Dive',
    description: 'Master automatic prompt optimization and customize settings for best results',
    duration: '12:15',
    views: '8.2k',
    likes: '654',
    category: 'Features',
    level: 'Intermediate',
    thumbnail: '/thumbnails/auto-optimize.jpg',
    videoUrl: '/videos/auto-optimize.mp4',
    transcript: true
  },
  {
    id: '3',
    title: 'Multi-AI Broadcasting Tutorial',
    description: 'Send prompts to multiple AI platforms simultaneously and compare results',
    duration: '15:30',
    views: '6.8k',
    likes: '543',
    category: 'Features',
    level: 'Advanced',
    thumbnail: '/thumbnails/multi-ai.jpg',
    videoUrl: '/videos/multi-ai.mp4',
    transcript: false
  },
  {
    id: '4',
    title: '10 Pro Tips for Better Prompts',
    description: 'Expert techniques to get better results from any AI platform',
    duration: '18:45',
    views: '15.3k',
    likes: '1.2k',
    category: 'Tips & Tricks',
    level: 'Intermediate',
    thumbnail: '/thumbnails/pro-tips.jpg',
    videoUrl: '/videos/pro-tips.mp4',
    transcript: true
  },
  {
    id: '5',
    title: 'Team Collaboration Setup',
    description: 'Configure team workspaces, shared libraries, and permissions',
    duration: '22:10',
    views: '4.1k',
    likes: '312',
    category: 'Features',
    level: 'Advanced',
    thumbnail: '/thumbnails/team-collaboration.jpg',
    videoUrl: '/videos/team-collaboration.mp4',
    transcript: true
  },
  {
    id: '6',
    title: 'Project Memory & Context Management',
    description: 'Maintain context across projects and organize your prompt library',
    duration: '14:20',
    views: '7.6k',
    likes: '578',
    category: 'Features',
    level: 'Intermediate',
    thumbnail: '/thumbnails/project-memory.jpg',
    videoUrl: '/videos/project-memory.mp4',
    transcript: true
  },
  {
    id: '7',
    title: 'Monthly Product Webinar - December 2024',
    description: 'Latest features, roadmap updates, and Q&A with the team',
    duration: '45:30',
    views: '2.8k',
    likes: '189',
    category: 'Webinars',
    level: 'Beginner',
    thumbnail: '/thumbnails/webinar-dec.jpg',
    videoUrl: '/videos/webinar-dec.mp4',
    transcript: true
  },
  {
    id: '8',
    title: 'Advanced Prompt Engineering Techniques',
    description: 'Chain-of-thought, few-shot learning, and advanced optimization strategies',
    duration: '28:15',
    views: '9.4k',
    likes: '756',
    category: 'Tips & Tricks',
    level: 'Advanced',
    thumbnail: '/thumbnails/advanced-techniques.jpg',
    videoUrl: '/videos/advanced-techniques.mp4',
    transcript: true
  }
];

const categories = ['All', 'Getting Started', 'Features', 'Tips & Tricks', 'Webinars'];
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export default function VideoTutorialsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const filteredVideos = videoData.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || video.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
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
      <div className="relative z-40">
        
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <Link href="/docs" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Docs</span>
          </Link>
          <div className="text-xl font-bold">Promptability AI</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          
          {/* Page Header */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center mb-12"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              Video Tutorials
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8"
            >
              Learn visually with our comprehensive video library
            </motion.p>

            {/* Stats */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{videoData.length}</div>
                <div className="text-sm text-gray-400">Videos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.8★</div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50k+</div>
                <div className="text-sm text-gray-400">Views</div>
              </div>
            </motion.div>

            {/* Search and Filters */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col md:flex-row gap-4 items-center mb-8"
            >
              {/* Search */}
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-black">
                      {category}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {levels.map(level => (
                    <option key={level} value={level} className="bg-black">
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          </motion.div>

          {/* Video Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/40" />
                  <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getLevelColor(video.level)}`}>
                      {video.level}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded">
                      {video.category}
                    </span>
                    {video.transcript && (
                      <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">
                        Transcript
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {video.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        {video.likes}
                      </span>
                    </div>
                    <ArrowRight className="w-3 h-3 group-hover:text-blue-400 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Featured Playlist */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Star className="w-7 h-7 text-yellow-400" />
              Featured Playlist
            </h2>
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Complete Beginner Course
                  </h3>
                  <p className="text-gray-300 mb-4">
                    A comprehensive 6-part series taking you from installation to advanced optimization techniques. Perfect for new users.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                    <span className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      6 videos
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      1h 24m total
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      5.2k enrolled
                    </span>
                  </div>
                  <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Start Course
                  </button>
                </div>
                
                <div className="bg-black/40 border border-white/20 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-4">Course Outline:</h4>
                  <div className="space-y-2 text-sm">
                    {[
                      'Getting Started (8:24)',
                      'Basic Optimization (12:15)', 
                      'Platform Integration (15:30)',
                      'Advanced Features (18:45)',
                      'Team Setup (22:10)',
                      'Best Practices (14:20)'
                    ].map((lesson, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-300">
                        <div className="w-4 h-4 bg-yellow-500/20 border border-yellow-500/30 rounded-full flex items-center justify-center text-xs text-yellow-400 font-bold">
                          {i + 1}
                        </div>
                        {lesson}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Learning Paths */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Learning Paths</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Beginner Path</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Start here if you're new to AI prompting or Promptability
                </p>
                <div className="text-xs text-gray-400 mb-4">
                  4 videos • 45 minutes • 8.2k learners
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-sm underline">
                  Start Learning →
                </button>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Power User Path</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Advanced features and optimization techniques
                </p>
                <div className="text-xs text-gray-400 mb-4">
                  6 videos • 1h 20m • 3.1k learners
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-sm underline">
                  Start Learning →
                </button>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Team Leader Path</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Setup and manage team collaboration features
                </p>
                <div className="text-xs text-gray-400 mb-4">
                  5 videos • 1h 5m • 1.8k learners
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-sm underline">
                  Start Learning →
                </button>
              </div>
            </div>
          </motion.div>

          {/* No Results */}
          {filteredVideos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Play className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
              <h3 className="text-xl font-semibold text-white mb-2">No videos found</h3>
              <p className="text-gray-400 text-sm mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedLevel('All Levels');
                }}
                className="bg-white/10 border border-white/20 text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}

          {/* Additional Resources */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Want More Learning Resources?
            </h3>
            <p className="text-gray-300 mb-6">
              Explore our written guides, join live sessions, or request specific tutorials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs/guides"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Written Guides
              </Link>
              <Link
                href="/webinars"
                className="bg-white/10 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                Live Sessions
              </Link>
              <Link
                href="/support"
                className="bg-white/10 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Request Tutorial
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
              >
                ×
              </button>
            </div>
            
            {/* Video Player Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-6">
              <div className="text-center">
                <Play className="w-16 h-16 text-white opacity-60 mx-auto mb-4" />
                <p className="text-gray-400">Video Player</p>
                <p className="text-xs text-gray-500">{selectedVideo.videoUrl}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <p className="text-gray-300 mb-4">{selectedVideo.description}</p>
                {selectedVideo.transcript && (
                  <div className="bg-black/40 border border-white/20 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-2">Transcript Available</h4>
                    <p className="text-gray-400 text-sm">
                      Full transcript with timestamps and searchable content.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="bg-black/40 border border-white/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-3">Video Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white">{selectedVideo.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Level:</span>
                      <span className="text-white">{selectedVideo.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Views:</span>
                      <span className="text-white">{selectedVideo.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Likes:</span>
                      <span className="text-white">{selectedVideo.likes}</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Video
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}