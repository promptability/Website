'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Users, Building2, Mail, User, UserPlus, 
  Check, X, Shield, Zap, Clock, Crown, Settings, Globe
} from 'lucide-react';
import Link from 'next/link';

export default function TeamSignUpPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    adminEmail: '',
    adminName: '',
    teamSize: '',
    department: '',
    useCase: '',
    budget: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const teamSizes = [
    '2-5 people', '6-15 people', '16-50 people', '51-200 people', '200+ people'
  ];

  const departments = [
    'Engineering', 'Marketing', 'Sales', 'Design', 'Product', 'Customer Success', 'Other'
  ];

  const useCases = [
    'Code documentation', 'Content creation', 'Customer support', 
    'Research & analysis', 'Training & education', 'Other'
  ];

  const budgets = [
    'Under $500/month', '$500-$2,000/month', '$2,000-$10,000/month', '$10,000+/month'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const canProceedStep1 = formData.companyName && formData.adminEmail && formData.adminName;
  const canProceedStep2 = formData.teamSize && formData.department && formData.useCase;

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
            
            {/* Left Side - Team Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Scale AI Excellence
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Across Your Team
                  </span>
                </h1>
                <p className="text-xl text-gray-300">
                  Empower your entire team with collaborative AI optimization
                </p>
              </div>

              {/* Team Benefits */}
              <div className="space-y-4">
                {[
                  { icon: <Users className="w-5 h-5" />, text: 'Shared prompt libraries' },
                  { icon: <Shield className="w-5 h-5" />, text: 'Enterprise security' },
                  { icon: <Clock className="w-5 h-5" />, text: 'Centralized billing' },
                  { icon: <Crown className="w-5 h-5" />, text: 'Priority support' }
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="text-blue-400">{benefit.icon}</div>
                    <span className="text-gray-300">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-white/10">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">500+</div>
                    <div className="text-xs text-gray-400">Teams</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">Enterprise</div>
                    <div className="text-xs text-gray-400">Ready</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">24/7</div>
                    <div className="text-xs text-gray-400">Support</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Team Sign Up Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-lg mx-auto">
                
                {/* Progress Indicator */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep >= 1 ? 'bg-blue-500 border-blue-500 text-white' : 'border-white/30 text-gray-400'
                    }`}>
                      1
                    </div>
                    <div className={`w-16 h-0.5 transition-all ${currentStep > 1 ? 'bg-blue-500' : 'bg-white/20'}`} />
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep >= 2 ? 'bg-blue-500 border-blue-500 text-white' : 'border-white/30 text-gray-400'
                    }`}>
                      2
                    </div>
                    <div className={`w-16 h-0.5 transition-all ${currentStep > 2 ? 'bg-blue-500' : 'bg-white/20'}`} />
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep >= 3 ? 'bg-blue-500 border-blue-500 text-white' : 'border-white/30 text-gray-400'
                    }`}>
                      3
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  {currentStep === 1 && 'Team Information'}
                  {currentStep === 2 && 'Team Details'}
                  {currentStep === 3 && 'Review & Submit'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* STEP 1 - Basic Info */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      {/* Company Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Company Name
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                            className="w-full bg-black/40 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            placeholder="Your company name"
                            required
                          />
                        </div>
                      </div>

                      {/* Admin Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Team Admin Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={formData.adminEmail}
                            onChange={(e) => setFormData({...formData, adminEmail: e.target.value})}
                            className="w-full bg-black/40 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            placeholder="admin@company.com"
                            required
                          />
                        </div>
                      </div>

                      {/* Admin Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Your Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.adminName}
                            onChange={(e) => setFormData({...formData, adminName: e.target.value})}
                            className="w-full bg-black/40 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            placeholder="Your full name"
                            required
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2 - Team Details */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      {/* Team Size */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Team Size
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {teamSizes.map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setFormData({...formData, teamSize: size})}
                              className={`p-3 rounded-xl border text-center transition-all ${
                                formData.teamSize === size
                                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                              }`}
                            >
                              <span className="text-sm font-medium">{size}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Department */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Primary Department
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {departments.map((dept) => (
                            <button
                              key={dept}
                              type="button"
                              onClick={() => setFormData({...formData, department: dept})}
                              className={`p-3 rounded-xl border text-center transition-all ${
                                formData.department === dept
                                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                              }`}
                            >
                              <span className="text-sm font-medium">{dept}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Primary Use Case */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Primary Use Case
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {useCases.map((useCase) => (
                            <button
                              key={useCase}
                              type="button"
                              onClick={() => setFormData({...formData, useCase})}
                              className={`p-3 rounded-xl border text-center transition-all ${
                                formData.useCase === useCase
                                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                              }`}
                            >
                              <span className="text-sm font-medium">{useCase}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3 - Budget & Review */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      {/* Budget Range */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Monthly Budget Range
                        </label>
                        <div className="space-y-3">
                          {budgets.map((budget) => (
                            <button
                              key={budget}
                              type="button"
                              onClick={() => setFormData({...formData, budget})}
                              className={`w-full p-3 rounded-xl border text-left transition-all ${
                                formData.budget === budget
                                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                              }`}
                            >
                              <span className="text-sm font-medium">{budget}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="bg-black/40 border border-white/20 rounded-xl p-4">
                        <h3 className="text-lg font-bold text-white mb-3">Team Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Company:</span>
                            <span className="text-white">{formData.companyName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Admin:</span>
                            <span className="text-white">{formData.adminName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Team Size:</span>
                            <span className="text-white">{formData.teamSize}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Department:</span>
                            <span className="text-white">{formData.department}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-3">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="flex-1 bg-white/10 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition-all duration-300"
                      >
                        Back
                      </button>
                    )}
                    
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(currentStep + 1)}
                        disabled={
                          (currentStep === 1 && !canProceedStep1) ||
                          (currentStep === 2 && !canProceedStep2)
                        }
                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isLoading || !formData.budget}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Creating Team...
                          </div>
                        ) : (
                          'Create Team Account'
                        )}
                      </button>
                    )}
                  </div>
                </form>

                {/* Enterprise Note */}
                <div className="mt-6 p-4 bg-black/40 border border-white/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-white font-medium mb-1">Need Enterprise Features?</p>
                      <p className="text-gray-400 mb-2">
                        Custom integrations, SSO, dedicated support, and more.
                      </p>
                      <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">
                        Contact Enterprise Sales
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Bottom Links */}
                <div className="mt-6 text-center space-y-2">
                  <p className="text-sm text-gray-400">
                    Individual account?{' '}
                    <Link href="/signup" className="text-blue-400 hover:text-blue-300 underline">
                      Personal sign up
                    </Link>
                  </p>
                  <p className="text-sm text-gray-400">
                    Already have a team?{' '}
                    <Link href="/signin" className="text-blue-400 hover:text-blue-300 underline">
                      Sign in
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