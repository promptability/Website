'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Content Marketing Manager',
    company: 'TechFlow',
    image: '/api/placeholder/64/64',
    rating: 5,
    text: "Promptability AI has completely transformed how I work with ChatGPT. What used to take me 10 minutes of prompt refinement now happens automatically. My content quality has improved dramatically.",
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Senior Developer',
    company: 'StartupCorp',
    image: '/api/placeholder/64/64',
    rating: 5,
    text: "As a developer, I was skeptical about AI prompt tools. But this extension actually learns my coding style and suggests better prompts for debugging and code reviews. It's like having a senior dev mentor.",
  },
  {
    name: 'Emily Watson',
    role: 'UX Designer',
    company: 'DesignStudio',
    image: '/api/placeholder/64/64',
    rating: 5,
    text: "The project memory feature is incredible. It remembers the design system I'm working on and automatically includes relevant context in my prompts. Saves me hours every week.",
  },
  {
    name: 'David Kim',
    role: 'Marketing Director',
    company: 'GrowthLab',
    image: '/api/placeholder/64/64',
    rating: 5,
    text: "I've tried every AI productivity tool out there. Promptability AI is the first one that actually delivers on its promises. The ROI is insane - we've cut our content creation time by 60%.",
  },
  {
    name: 'Lisa Thompson',
    role: 'Freelance Writer',
    company: 'Independent',
    image: '/api/placeholder/64/64',
    rating: 5,
    text: "This extension has made me a better prompt engineer without even trying. It shows me exactly what makes a prompt effective, and I'm learning something new every day.",
  },
  {
    name: 'Alex Johnson',
    role: 'Product Manager',
    company: 'InnovateTech',
    image: '/api/placeholder/64/64',
    rating: 5,
    text: "The team collaboration features are game-changing. We now have a shared library of optimized prompts that everyone can use. No more reinventing the wheel for every project.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleTestimonials = () => {
    const start = currentIndex * 3;
    return testimonials.slice(start, start + 3);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Loved by
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              2,000+ Professionals
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            See what our users are saying about their experience with Promptability AI
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {getVisibleTestimonials().map((testimonial, index) => (
              <motion.div
                key={`${currentIndex}-${index}`}
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:border-white/20"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-purple-400 opacity-50" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-purple-400 w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '2,000+', label: 'Active Users' },
            { number: '50,000+', label: 'Prompts Optimized' },
            { number: '60%', label: 'Time Saved' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* social proof removed */}
      </div>
    </section>
  );
}
