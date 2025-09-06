'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Eye, EyeOff, Chrome, Github, Mail, Lock, 
  Shield, Zap, Clock, ArrowRight, Check
} from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/account';
    }, 2000);
  };

  const handleOAuth = (provider: string) => {
    setIsLoading(true);
    // OAuth logic here
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
        

        {/* Main Content */}
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 items-center">
            
            {/* Left Side - Welcome Back */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Welcome Back to
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Your AI Journey
                  </span>
                </h1>
                <p className="text-xl text-gray-300">
                  Continue optimizing your prompts with AI-powered precision
                </p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                {[
                  { icon: <Zap className="w-5 h-5" />, text: 'Pick up where you left off' },
                  { icon: <Clock className="w-5 h-5" />, text: 'Access your saved prompts' },
                  { icon: <Shield className="w-5 h-5" />, text: 'Secure and encrypted' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="text-blue-400">{stat.icon}</div>
                    <span className="text-gray-300">{stat.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Trust Badge */}
              <div className="pt-6 border-t border-white/10">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Trusted by 2,000+ users</div>
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                    <span>SOC 2 Compliant</span>
                    <span>•</span>
                    <span>256-bit Encryption</span>
                    <span>•</span>
                    <span>GDPR Ready</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Sign In Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Sign In to Your Account
                </h2>

                {/* OAuth Buttons */}
                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => handleOAuth('google')}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-3 px-4 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <Chrome className="w-5 h-5" />
                    Continue with Google
                  </button>
                  <button
                    onClick={() => handleOAuth('github')}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-3 px-4 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <Github className="w-5 h-5" />
                    Continue with GitHub
                  </button>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-black px-4 text-gray-400">OR</span>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/40 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full bg-black/40 border border-white/20 rounded-xl pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <button
                        type="button"
                        onClick={() => setRememberMe(!rememberMe)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                          rememberMe 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'border-white/30 hover:border-white/50'
                        }`}
                      >
                        {rememberMe && <Check className="w-2.5 h-2.5 text-white" />}
                      </button>
                      <span className="text-sm text-gray-300">Remember me</span>
                    </label>
                    <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 underline">
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!formData.email || !formData.password || isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing In...
                      </div>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                {/* Bottom Links */}
                <div className="mt-6 text-center space-y-2">
                  <p className="text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-blue-400 hover:text-blue-300 underline">
                      Sign up
                    </Link>
                  </p>
                  <p className="text-sm text-gray-400">
                    Need a team account?{' '}
                    <Link href="/signup/team" className="text-blue-400 hover:text-blue-300 underline">
                      Team sign up
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}