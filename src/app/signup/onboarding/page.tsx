'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Code, PenTool, GraduationCap, Search, ChevronRight, 
  ArrowLeft, Check, Settings, Bell, BellOff, Sparkles,
  Brain, Zap, Play, Download, Chrome, ArrowRight
} from 'lucide-react';
import { fadeInUp, staggerContainer, liquidButton } from '@/lib/animations';
import Link from 'next/link';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    platform: '',
    experience: 50,
    useCases: [] as string[],
    optimizationLevel: 70,
    learningSpeed: 'balanced',
    notifications: true
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const roles = [
    { id: 'developer', label: 'Developer', icon: <Code className="w-6 h-6" /> },
    { id: 'writer', label: 'Writer', icon: <PenTool className="w-6 h-6" /> },
    { id: 'student', label: 'Student', icon: <GraduationCap className="w-6 h-6" /> },
    { id: 'researcher', label: 'Researcher', icon: <Search className="w-6 h-6" /> },
    { id: 'other', label: 'Other', icon: <User className="w-6 h-6" /> }
  ];

  const platforms = [
    'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Copilot', 'Other'
  ];

  const useCases = [
    'Code documentation', 'Creative writing', 'Research papers', 
    'Business emails', 'Social media', 'Technical specs'
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleUseCase = (useCase: string) => {
    setFormData(prev => ({
      ...prev,
      useCases: prev.useCases.includes(useCase)
        ? prev.useCases.filter(uc => uc !== useCase)
        : [...prev.useCases, useCase]
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.name.trim() && formData.role;
      case 2: return formData.platform;
      case 3: return true;
      case 4: return true;
      default: return false;
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
        

        {/* Progress Bar */}
        <div className="px-6 mb-8 pt-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2 text-sm text-gray-400">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span className={currentStep >= 1 ? 'text-blue-400' : ''}>Welcome</span>
              <span className={currentStep >= 2 ? 'text-blue-400' : ''}>Setup</span>
              <span className={currentStep >= 3 ? 'text-blue-400' : ''}>Customize</span>
              <span className={currentStep >= 4 ? 'text-blue-400' : ''}>Ready</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 pb-8">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              
              {/* STEP 1 - WELCOME */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
                >
                  <h2 className="text-3xl font-bold text-white mb-2 text-center">
                    Welcome to Promptability
                  </h2>
                  <p className="text-gray-300 text-center mb-8">
                    Let's personalize your AI experience
                  </p>

                  <div className="space-y-6">
                    {/* Name Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        What's your name?
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* Role Selector */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        What's your role?
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {roles.map((role) => (
                          <button
                            key={role.id}
                            onClick={() => setFormData({...formData, role: role.id})}
                            className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2 ${
                              formData.role === role.id
                                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <div className="text-current">{role.icon}</div>
                            <span className="text-sm font-medium">{role.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 - SETUP */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
                >
                  <h2 className="text-3xl font-bold text-white mb-2 text-center">
                    Set Your Preferences
                  </h2>
                  <p className="text-gray-300 text-center mb-8">
                    Help us customize your experience
                  </p>

                  <div className="space-y-6">
                    {/* Platform Selector */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Which AI platform do you use most?
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {platforms.map((platform) => (
                          <button
                            key={platform}
                            onClick={() => setFormData({...formData, platform})}
                            className={`p-3 rounded-xl border transition-all duration-300 text-center ${
                              formData.platform === platform
                                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <span className="text-sm font-medium">{platform}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Experience Level */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        AI Experience Level: {formData.experience}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: Number(e.target.value)})}
                        className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${formData.experience}%, #374151 ${formData.experience}%, #374151 100%)`
                        }}
                      />
                      <div className="flex justify-between mt-2 text-xs text-gray-400">
                        <span>Beginner</span>
                        <span>Intermediate</span>
                        <span>Expert</span>
                      </div>
                    </div>

                    {/* Use Cases */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        What will you use AI for? (select all that apply)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {useCases.map((useCase) => (
                          <button
                            key={useCase}
                            onClick={() => toggleUseCase(useCase)}
                            className={`p-3 rounded-xl border transition-all duration-300 text-left ${
                              formData.useCases.includes(useCase)
                                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {formData.useCases.includes(useCase) && (
                                <Check className="w-4 h-4 text-blue-400" />
                              )}
                              <span className="text-sm font-medium">{useCase}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 - CUSTOMIZE */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
                >
                  <h2 className="text-3xl font-bold text-white mb-2 text-center">
                    Personalize Your Experience
                  </h2>
                  <p className="text-gray-300 text-center mb-8">
                    Fine-tune how AI assists you
                  </p>

                  <div className="space-y-6">
                    {/* Optimization Level */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Optimization Level: {formData.optimizationLevel}%
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={formData.optimizationLevel}
                        onChange={(e) => setFormData({...formData, optimizationLevel: Number(e.target.value)})}
                        className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #10b981 0%, #10b981 ${formData.optimizationLevel}%, #374151 ${formData.optimizationLevel}%, #374151 100%)`
                        }}
                      />
                      <div className="flex justify-between mt-2 text-xs text-gray-400">
                        <span>Light touch</span>
                        <span>Balanced</span>
                        <span>Heavy optimization</span>
                      </div>
                    </div>

                    {/* Learning Speed */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Learning Speed Preference
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'conservative', label: 'Conservative', desc: 'Careful adaptation' },
                          { id: 'balanced', label: 'Balanced', desc: 'Standard learning' },
                          { id: 'aggressive', label: 'Aggressive', desc: 'Fast adaptation' }
                        ].map((speed) => (
                          <button
                            key={speed.id}
                            onClick={() => setFormData({...formData, learningSpeed: speed.id})}
                            className={`p-4 rounded-xl border transition-all duration-300 text-center ${
                              formData.learningSpeed === speed.id
                                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <div className="font-medium text-sm">{speed.label}</div>
                            <div className="text-xs mt-1 opacity-80">{speed.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notifications */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Notification Preferences
                      </label>
                      <div className="bg-black/40 border border-white/20 rounded-xl p-4">
                        <button
                          onClick={() => setFormData({...formData, notifications: !formData.notifications})}
                          className="flex items-center justify-between w-full"
                        >
                          <div className="flex items-center gap-3">
                            {formData.notifications ? (
                              <Bell className="w-5 h-5 text-blue-400" />
                            ) : (
                              <BellOff className="w-5 h-5 text-gray-400" />
                            )}
                            <div className="text-left">
                              <div className="text-white font-medium">Learning Updates</div>
                              <div className="text-gray-400 text-xs">Get notified when AI learns something new</div>
                            </div>
                          </div>
                          <div className={`w-12 h-6 rounded-full border-2 transition-all ${
                            formData.notifications ? 'bg-blue-500 border-blue-500' : 'bg-gray-600 border-gray-600'
                          }`}>
                            <motion.div
                              className="w-4 h-4 bg-white rounded-full mt-0.5"
                              animate={{ x: formData.notifications ? 24 : 2 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4 - READY */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center"
                >
                  {/* Success Animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="mb-6 flex justify-center"
                  >
                    <div className="relative">
                      <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center">
                        <Sparkles className="w-10 h-10 text-green-400" />
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>

                  <h2 className="text-3xl font-bold text-white mb-3">
                    You're All Set!
                  </h2>
                  <p className="text-gray-300 mb-8">
                    Your AI assistant is now personalized and ready to optimize your prompts
                  </p>

                  {/* Setup Summary */}
                  <div className="bg-black/40 border border-white/20 rounded-xl p-6 mb-8 text-left">
                    <h3 className="text-lg font-bold text-white mb-4">Your Setup:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Name:</span>
                        <span className="text-white">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Role:</span>
                        <span className="text-white capitalize">{formData.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Primary Platform:</span>
                        <span className="text-white">{formData.platform}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Optimization:</span>
                        <span className="text-white">{formData.optimizationLevel}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <Link
                      href="/chrome-extension"
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 inline-block"
                    >
                      Install Extension
                    </Link>
                    
                    <button className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                      <Chrome className="w-5 h-5" />
                      Install Extension
                    </button>

                    <button className="text-blue-400 hover:text-blue-300 text-sm underline">
                      Take a quick tutorial (2 min)
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mt-8"
              >
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-8 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2"
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}