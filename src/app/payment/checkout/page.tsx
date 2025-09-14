'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Shield, CreditCard, Star, CheckCircle, ChevronDown,
  HelpCircle, MessageSquare, ArrowLeft, Users, Crown,
  Calendar, AlertCircle
} from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import FloatingCard from '@/components/ui/FloatingCard';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm() {
  const searchParams = useSearchParams();
  const stripe = useStripe();
  const elements = useElements();
  
  const planType = searchParams.get('plan') || 'pro';
  const billingCycle = searchParams.get('billing') || 'monthly';
  const seats = parseInt(searchParams.get('seats') || '1');
  
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro' | 'team'>(planType as any);
  const [selectedBilling, setSelectedBilling] = useState(billingCycle);
  const [teamSeats, setTeamSeats] = useState(seats);
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
    saveCard: false,
    agreeTerms: false
  });
  const [errors, setErrors] = useState<any>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = {
    starter: {
      name: 'Starter Plan',
      monthlyPrice: 9,
      yearlyPrice: 86,
      savings: 20,
      features: [
        '150 daily optimizations',
        'All AI platforms',
        'Advanced optimization',
        'Export capabilities',
        'Priority support',
        '5 active projects'
      ]
    },
    pro: {
      name: 'Pro Plan',
      monthlyPrice: 32,
      yearlyPrice: 307,
      savings: 20,
      features: [
        'UNLIMITED optimizations',
        'All AI platforms',
        'Expert optimization',
        'Export capabilities',
        'Priority support',
        'Unlimited projects'
      ]
    },
    team: {
      name: 'Team Plan',
      monthlyPrice: 49,
      yearlyPrice: 470,
      savings: 20,
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Shared workspace',
        'Admin dashboard',
        'Priority support',
        'Custom integrations'
      ]
    }
  };

  const currentPlan = plans[selectedPlan];
  const basePrice = selectedBilling === 'monthly' ? currentPlan.monthlyPrice : currentPlan.yearlyPrice;
  const currentPrice = selectedPlan === 'team' ? basePrice * teamSeats : basePrice;
  const savings = selectedBilling === 'yearly' ? currentPlan.savings : 0;

  const progressSteps = [
    { name: 'Plan', completed: true },
    { name: 'Details', current: true },
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
      answer: 'Yes. We use 256-bit SSL encryption and Stripe for secure payment processing.'
    }
  ];

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zip) newErrors.zip = 'ZIP code is required';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!stripe || !elements) return;
    
    setIsProcessing(true);
    
    try {
      // Create payment intent on the server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType: selectedPlan,
          billingCycle: selectedBilling,
          quantity: selectedPlan === 'team' ? teamSeats : 1,
          email: formData.email,
          metadata: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            company: formData.company,
          }
        }),
      });

      const { clientSecret, subscriptionId } = await response.json();

      // Confirm payment with Stripe
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              postal_code: formData.zip,
              country: formData.country,
            }
          }
        }
      });

      if (error) {
        console.error('Payment error:', error);
        alert(error.message);
      } else if (paymentIntent?.status === 'succeeded') {
        // Redirect to success page
        window.location.href = `/payment/success?session_id=${subscriptionId}`;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
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
              alt="Promptability logo"
              width={32}
              height={32}
              className="rounded-lg"
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
                      className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all ${
                        errors.email ? 'border-red-500/50' : 'border-white/10'
                      }`}
                      placeholder="your@email.com"
                      required
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
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
                        className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all ${
                          errors.firstName ? 'border-red-500/50' : 'border-white/10'
                        }`}
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
                        className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all ${
                          errors.lastName ? 'border-red-500/50' : 'border-white/10'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-4">
                    <div>
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
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
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
                    </div>
                  </div>
                </div>
              </FloatingCard>

              {/* Payment Method */}
              <FloatingCard className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
                
                <div className="space-y-6">
                  {/* Card Element */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Card details *
                    </label>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#ffffff',
                              '::placeholder': {
                                color: '#9ca3af',
                              },
                            },
                            invalid: {
                              color: '#ef4444',
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                      <Shield className="w-3 h-3 text-green-400" />
                      <span>Your payment info is encrypted and secure</span>
                    </div>
                  </div>
                </div>
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
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formData.agreeTerms || isProcessing || !stripe}
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
                    {selectedPlan === 'team' && ` for ${teamSeats} users`}
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
                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value as any)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50"
                  >
                    <option value="starter" className="bg-black">Starter Plan</option>
                    <option value="pro" className="bg-black">Pro Plan</option>
                    <option value="team" className="bg-black">Team Plan</option>
                  </select>

                  {/* Team Seats Selector */}
                  {selectedPlan === 'team' && (
                    <div>
                      <label className="text-sm text-gray-400 block mb-2">Number of team members:</label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setTeamSeats(Math.max(3, teamSeats - 1))}
                          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={teamSeats}
                          onChange={(e) => setTeamSeats(Math.min(100, Math.max(3, parseInt(e.target.value) || 3)))}
                          className="w-20 px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-center"
                          min="3"
                          max="100"
                        />
                        <button
                          type="button"
                          onClick={() => setTeamSeats(Math.min(100, teamSeats + 1))}
                          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Billing Cycle */}
                  <div className="flex gap-2 p-1 bg-white/5 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setSelectedBilling('monthly')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedBilling === 'monthly' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedBilling('yearly')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedBilling === 'yearly' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Yearly {savings > 0 && <span className="text-xs">(Save {savings}%)</span>}
                    </button>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      {currentPlan.name} ({selectedBilling})
                      {selectedPlan === 'team' && ` × ${teamSeats} users`}
                    </span>
                    <span className="text-white font-semibold">${currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-white">${currentPrice.toFixed(2)}/{selectedBilling === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                </div>

                {/* What's Included */}
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">What's Included</h4>
                  <div className="space-y-2">
                    {currentPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust Elements */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    30-day money-back guarantee
                  </div>
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white">Loading checkout...</div>
        </div>
      }>
        <CheckoutForm />
      </Suspense>
    </Elements>
  );
}