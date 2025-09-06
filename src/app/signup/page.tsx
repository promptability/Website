'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Eye, EyeOff, Check, X, Chrome, Github, 
  Mail, Lock, User, Shield, Users, Clock, Zap
} from 'lucide-react';
import { fadeInUp, staggerContainer, liquidButton } from '@/lib/animations';
import Link from 'next/link';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'One number', met: /\d/.test(formData.password) },
    { text: 'One special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/signup/verify';
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
            
            {/* Left Side - Value Props */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Start Optimizing
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    in Seconds
                  </span>
                </h1>
                <p className="text-xl text-gray-300">
                  Join thousands of users who've transformed their AI workflow
                </p>
              </div>

              {/* Value Props */}
              <div className="space-y-4">
                {[
                  { icon: <Zap className="w-5 h-5" />, text: 'Free forever plan' },
                  { icon: <Clock className="w-5 h-5" />, text: '2-minute setup' },
                  { icon: <Shield className="w-5 h-5" />, text: 'No credit card required' }
                ].map((prop, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="text-blue-400">{prop.icon}</div>
                    <span className="text-gray-300">{prop.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-white/10">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">2,000+</div>
                    <div className="text-xs text-gray-400">Active Users</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">SOC 2</div>
                    <div className="text-xs text-gray-400">Compliant</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">256-bit</div>
                    <div className="text-xs text-gray-400">Encryption</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Sign Up Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Create Your Account
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
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
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
                        placeholder="Create a password"
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
                    
                    {/* Password Requirements */}
                    {formData.password && (
                      <div className="mt-2 space-y-1">
                        {passwordRequirements.map((req, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs">
                            {req.met ? (
                              <Check className="w-3 h-3 text-green-400" />
                            ) : (
                              <X className="w-3 h-3 text-red-400" />
                            )}
                            <span className={req.met ? 'text-green-400' : 'text-gray-400'}>
                              {req.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="w-full bg-black/40 border border-white/20 rounded-xl pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-red-400 text-xs mt-1">Passwords don't match</p>
                    )}
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => setAgreedToTerms(!agreedToTerms)}
                      className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        agreedToTerms 
                          ? 'bg-blue-500 border-blue-500' 
                          : 'border-white/30 hover:border-white/50'
                      }`}
                    >
                      {agreedToTerms && <Check className="w-3 h-3 text-white" />}
                    </button>
                    <p className="text-sm text-gray-300">
                      I agree to the{' '}
                      <Link href="/terms" className="text-blue-400 hover:text-blue-300 underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!agreedToTerms || isLoading || !passwordRequirements.every(req => req.met) || formData.password !== formData.confirmPassword}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>

                {/* Bottom Links */}
                <div className="mt-6 text-center space-y-2">
                  <p className="text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link href="/signin" className="text-blue-400 hover:text-blue-300 underline">
                      Sign in
                    </Link>
                  </p>
                  <p className="text-sm text-gray-400">
                    Join with a team?{' '}
                    <Link href="/signup/team" className="text-blue-400 hover:text-blue-300 underline">
                      Team signup
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