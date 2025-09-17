'use client';

import { motion } from 'framer-motion';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';
import Link from 'next/link';

export default function DocsFaqPage() {
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

      <div className="relative z-40 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                <HelpCircle className="w-10 h-10 text-blue-400" />
              </div>
            </div>

            {/* Title */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold text-white"
            >
              FAQ
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Coming Soon
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 leading-relaxed"
            >
              Frequently asked questions are being compiled. 
              For immediate help, contact our support team.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Contact Support
              </Link>
              <Link
                href="/docs"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Docs
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}