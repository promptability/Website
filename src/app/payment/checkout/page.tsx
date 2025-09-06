'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Shield, CreditCard, Star, CheckCircle, ChevronDown,
  HelpCircle, MessageSquare, ArrowLeft, Users, Crown,
  Smartphone, Globe, Calendar, AlertCircle, Info
} from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import FloatingCard from '@/components/ui/FloatingCard';
import Link from 'next/link';

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'team'>('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    country: 'US',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    saveCard: false,
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = {
    pro: {
      name: 'Pro Plan',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      savings: 20,
      features: [
        'Unlimited optimizations',
        'All AI platforms',
        'Advanced modes',
        'Custom templates',
        'Priority support',
        'API access'
      ]
    },
    team: {
      name: 'Team Plan',
      monthlyPrice: 49.99,
      yearlyPrice: 499.99,
      savings: 17,
      features: [
        'Everything in Pro',
        'Up to 10 team members',
        'Team workspace',
        'Shared templates',
        'Admin dashboard',
        'SSO ready'
      ]
    }
  };

  const currentPlan = plans[selectedPlan];
  const currentPrice = billingCycle === 'monthly' ? currentPlan.monthlyPrice : currentPlan.yearlyPrice;
  const savings = billingCycle === 'yearly' ? currentPlan.savings : 0;

  const progressSteps = [
    { name: 'Account', completed: true },
    { name: 'Plan', completed: true },
    { name: 'Payment', current: true },
    { name: 'Confirmation', completed: false }
  ];

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' }
  ];

  const faqItems = [
    {
      question: 'Is it really unlimited?',
      answer: 'Yes! Pro plan includes unlimited prompt optimizations with no daily limits.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely. Cancel your subscription anytime from your account settings.'
    },
    {
      question: 'When will I be charged?',
      answer: 'You\'ll be charged today, then on the same date each billing cycle.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes. We use 256-bit SSL encryption and never store your payment details.'
    }
  ];

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateCardNumber = (number: string) => {
    // Basic Luhn algorithm
    const digits = number.replace(/\D/g, '');
    return digits.length >= 13 && digits.length <= 19;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      window.location.href = '/payment/success';
    }, 3000);
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative">
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

      {/* Simplified Header */}
      <header className="border-b border-white/10 px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Promptability AI logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-white font-semibold text-lg">Promptability</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="border-b border-white/10 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            {progressSteps.map((step, index) => (
              <div key={step.name} className="flex items-center">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  step.current ? 'bg-blue-500/20 text-blue-400' :
                  step.completed ? 'bg-green-500/20 text-green-400' :
                  'bg-white/5 text-gray-400'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    step.current ? 'bg-blue-400' :
                    step.completed ? 'bg-green-400' :
                    'bg-gray-400'
                  }`} />
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
                {index < progressSteps.length - 1 && (
                  <div className="w-8 h-0.5 bg-white/10 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Billing Information */}
              <FloatingCard className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Billing Information</h2>
                
                <div className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="your@email.com"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">This will be your account email</p>
                  </div>

                  {/* Name */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Add company name for invoice"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Country *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      required
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code} className="bg-black">
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Address */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="Street address"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        value={formData.zip}
                        onChange={(e) => setFormData({...formData, zip: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="12345"
                        required
                      />
                    </div>
                  </div>
                </div>
              </FloatingCard>

              {/* Payment Method */}
              <FloatingCard className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
                
                <div className="space-y-6">
                  {/* Payment Tabs */}
                  <div className="flex gap-2 p-1 bg-white/5 rounded-lg">
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/20 text-blue-400 rounded-lg font-medium"
                    >
                      <CreditCard className="w-4 h-4" />
                      Credit Card
                    </button>
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-gray-400 hover:text-white transition-colors"
                    >
                      PayPal
                    </button>
                  </div>

                  {/* Card Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Card number *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                          <Shield className="w-4 h-4 text-green-400" />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Expiry date *
                        </label>
                        <input
                          type="text"
                          value={formData.expiry}
                          onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          CVC *
                          <HelpCircle className="w-3 h-3 text-gray-400" />
                        </label>
                        <input
                          type="text"
                          value={formData.cvc}
                          onChange={(e) => setFormData({...formData, cvc: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>

                    {/* Save Card */}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.saveCard}
                        onChange={(e) => setFormData({...formData, saveCard: e.target.checked})}
                        className="w-4 h-4 text-blue-500 bg-white/5 border-white/20 rounded focus:ring-blue-500/20"
                      />
                      <span className="text-gray-300">Save card for future payments</span>
                    </label>
                  </div>
                </div>
              </FloatingCard>

              {/* Promo Code */}
              <FloatingCard className="p-6">
                <button
                  type="button"
                  onClick={() => setShowPromoCode(!showPromoCode)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="text-lg font-semibold text-white">Have a promo code?</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showPromoCode ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showPromoCode && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 flex gap-3"
                    >
                      <input
                        type="text"
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="Enter promo code"
                      />
                      <button
                        type="button"
                        className="px-6 py-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                      >
                        Apply
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FloatingCard>

              {/* Terms */}
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                    className="w-4 h-4 text-blue-500 bg-white/5 border-white/20 rounded focus:ring-blue-500/20 mt-0.5"
                    required
                  />
                  <span className="text-gray-300 text-sm">
                    I agree to the <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-500 bg-white/5 border-white/20 rounded focus:ring-blue-500/20 mt-0.5"
                    required
                  />
                  <span className="text-gray-300 text-sm">
                    I understand this is a recurring subscription that can be cancelled anytime
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formData.agreeTerms || isProcessing}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Complete Purchase - ${currentPrice.toFixed(2)}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <FloatingCard className="p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

                {/* Plan Selection */}
                <div className="space-y-4 mb-6">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPlan('pro')}
                      className={`flex-1 p-4 rounded-lg border transition-all ${
                        selectedPlan === 'pro' 
                          ? 'border-blue-500/50 bg-blue-500/10' 
                          : 'border-white/10 bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="w-5 h-5 text-blue-400" />
                        <span className="font-semibold text-white">Pro</span>
                      </div>
                      <div className="text-sm text-gray-400">Perfect for individuals</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPlan('team')}
                      className={`flex-1 p-4 rounded-lg border transition-all ${
                        selectedPlan === 'team' 
                          ? 'border-blue-500/50 bg-blue-500/10' 
                          : 'border-white/10 bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-blue-400" />
                        <span className="font-semibold text-white">Team</span>
                      </div>
                      <div className="text-sm text-gray-400">For teams & companies</div>
                    </button>
                  </div>

                  {/* Billing Cycle */}
                  <div className="flex gap-2 p-1 bg-white/5 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setBillingCycle('monthly')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                        billingCycle === 'monthly' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingCycle('yearly')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                        billingCycle === 'yearly' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        Yearly
                        {savings > 0 && (
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                            Save {savings}%
                          </span>
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{currentPlan.name} ({billingCycle})</span>
                    <span className="text-white font-semibold">${currentPrice.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Discount</span>
                      <span className="text-green-400">-${((currentPlan.monthlyPrice * 12) - currentPlan.yearlyPrice).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax</span>
                    <span className="text-white">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">Today's Total</span>
                    <span className="text-white">${currentPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Recurring Notice */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 font-medium">Recurring Subscription</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Next billing: {new Date(Date.now() + (billingCycle === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Cancel anytime from your account</p>
                </div>

                {/* What's Included */}
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">What's Included</h4>
                  <div className="space-y-2">
                    {currentPlan.features.slice(0, 6).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                    <button className="text-blue-400 hover:text-blue-300 text-sm">
                      View all features →
                    </button>
                  </div>
                </div>

                {/* Trust Elements */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>SSL Secured</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>Stripe Powered</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      30-day money-back guarantee
                    </div>
                  </div>
                </div>
              </FloatingCard>

              {/* FAQ Accordion */}
              <FloatingCard className="p-6">
                <h4 className="font-semibold text-white mb-4">Frequently Asked Questions</h4>
                <div className="space-y-3">
                  {faqItems.map((item, index) => (
                    <details key={index} className="group">
                      <summary className="flex items-center justify-between cursor-pointer text-gray-300 hover:text-white transition-colors py-2">
                        <span className="text-sm font-medium">{item.question}</span>
                        <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="mt-2 pb-2 text-sm text-gray-400">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </FloatingCard>

              {/* Support */}
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">Need help?</p>
                <button className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm">
                  <MessageSquare className="w-4 h-4" />
                  Chat with support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <FloatingCard className="p-8 text-center max-w-md">
              <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Processing Payment</h3>
              <p className="text-gray-400 mb-4">Please don't refresh the page</p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Secured by Stripe</span>
              </div>
            </FloatingCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}