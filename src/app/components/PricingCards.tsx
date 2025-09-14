'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Building2 } from 'lucide-react';
import { cardTilt, liquidButton, fadeInUp, staggerContainer, buttonHover } from '@/lib/animations';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
  gradient: string;
  icon: React.ComponentType<{ className?: string }>;
  stripePriceId?: string;
  planType?: string;
}

const plans: PricingPlan[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out Promptability',
    features: [
      '10 AI-optimized prompts daily',
      'Works with all major AI platforms',
      'Auto-Optimize Mode (basic optimization)',
      'Multi-AI Broadcasting',
      'AI Chat Enhancement',
      'Project Memory'
    ],
    cta: 'Get Started Free',
    gradient: 'from-white/20 to-white/10',
    icon: Zap,
    planType: 'free'
  },
  {
    name: 'Starter',
    price: '$9',
    period: 'per month',
    description: 'Ideal for professionals and content creators',
    features: [
      '150 daily prompt optimizations',
      'Works with all major AI platforms',
      'Auto-Optimize Mode (advanced optimization)',
      'Multi-AI Broadcasting',
      'AI Chat Enhancement',
      'Learns Your Style',
      'Project Memory (5 active projects)',
      'Export capabilities',
      'Priority support'
    ],
    popular: false,
    cta: 'Get Started',
    gradient: 'from-white/30 to-white/20',
    icon: Star,
    planType: 'starter',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PRICE_ID
  },
  {
    name: 'Pro',
    price: '$32',
    period: 'per month',
    description: 'For teams and power users',
    features: [
      'UNLIMITED prompt optimizations',
      'Works with all major AI platforms',
      'Auto-Optimize Mode (expert optimization)',
      'Multi-AI Broadcasting',
      'AI Chat Enhancement',
      'Learns Your Style',
      'Project Memory (unlimited projects)',
      'Export capabilities',
      'Priority support'
    ],
    popular: true,
    cta: 'Get Started',
    gradient: 'from-white/20 to-white/10',
    icon: Crown,
    planType: 'pro',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID
  },
  {
    name: 'Team',
    price: '$49',
    period: 'per user/month',
    description: 'Enterprise-grade solution for larger teams',
    features: [
      'UNLIMITED prompt optimizations',
      'Works with all major AI platforms',
      'Auto-Optimize Mode (expert optimization)',
      'Multi-AI Broadcasting',
      'AI Chat Enhancement',
      'Learns Your Style',
      'Project Memory (unlimited projects)',
      'Team Collaboration & sharing',
      'Export capabilities',
      'Priority support'
    ],
    popular: false,
    cta: 'Get Started',
    gradient: 'from-white/25 to-white/15',
    icon: Building2,
    planType: 'team',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_TEAM_MONTHLY_PRICE_ID
  }
];

export default function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [teamSeats, setTeamSeats] = useState(1); // Default 1 seats minimum for team plan

  const getAnnualPrice = (monthlyPrice: string) => {
    if (monthlyPrice === '$0') return '$0';
    const monthly = parseInt(monthlyPrice.replace('$', ''));
    const annual = Math.round(monthly * 12 * 0.8); // 20% discount
    return `$${annual}`;
  };

  const getSavings = (monthlyPrice: string) => {
    if (monthlyPrice === '$0') return '';
    const monthly = parseInt(monthlyPrice.replace('$', ''));
    const savings = Math.round(monthly * 12 * 0.2);
    return `Save $${savings}`;
  };

  const handleCheckout = async (plan: PricingPlan) => {
    if (plan.planType === 'free') {
      // Redirect to signup for free plan
      window.location.href = '/signup';
      return;
    }


    setIsLoading(plan.name);
    
    // Redirect to custom checkout page with plan details
    const params = new URLSearchParams({
      plan: plan.planType || '',
      billing: isAnnual ? 'yearly' : 'monthly',
      ...(plan.planType === 'team' ? { seats: teamSeats.toString() } : {})
    });
    
    window.location.href = `/payment/checkout?${params.toString()}`;
    
    setIsLoading(null);
  };

  return (
    <section className="pt-32 pb-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-8 text-white"
          >
            Simple, Transparent
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-8"
          >
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-1"
          >
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                !isAnnual 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                isAnnual 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual
            </button>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const isPopular = plan.popular;
            const displayPrice = isAnnual ? getAnnualPrice(plan.price) : plan.price;
            const displayPeriod = isAnnual ? (plan.price === '$0' ? 'forever' : 'per year') : plan.period;
            const savings = isAnnual ? getSavings(plan.price) : '';

            return (
              <motion.div
                key={plan.name}
                variants={cardTilt}
                initial="initial"
                whileHover="hover"
                onHoverStart={() => setHoveredCard(plan.name)}
                onHoverEnd={() => setHoveredCard(null)}
                className={`relative group ${
                  isPopular ? 'md:scale-105 z-10' : ''
                }`}
                style={{ perspective: '1000px' }}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                  >
                    <div className="bg-white/10 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                      MOST POPULAR
                    </div>
                  </motion.div>
                )}

                <div className={`
                  relative bg-white/5 backdrop-blur-xl border rounded-2xl p-6 h-full transition-all duration-300 flex flex-col
                  ${isPopular 
                    ? 'border-white/30' 
                    : 'border-white/10 hover:border-white/20'
                  }
                  ${hoveredCard === plan.name ? 'bg-white/10' : ''}
                `}>
                  {/* Card Header */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white/80" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    
                    <div className="mb-3">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-bold text-white">
                          {plan.planType === 'team' && plan.price !== '$0' 
                            ? `$${parseInt(displayPrice.replace('$', '')) * teamSeats}` 
                            : displayPrice}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {plan.planType === 'team' 
                            ? `for ${teamSeats} users/${isAnnual ? 'year' : 'month'}` 
                            : `/${displayPeriod}`}
                        </span>
                      </div>
                      {savings && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-green-400 text-sm font-medium mt-1"
                        >
                          {savings}
                        </motion.div>
                      )}
                      {!isAnnual && plan.price !== '$0' && (
                        <button
                          onClick={() => setIsAnnual(true)}
                          className="text-blue-400 hover:text-blue-300 text-xs mt-1 underline transition-colors"
                        >
                          Save 20% annually
                        </button>
                      )}
                    </div>
                    
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                          <Check className="w-2.5 h-2.5 text-white/70" />
                        </div>
                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Team Seat Selector */}
                  {plan.planType === 'team' && (
                    <div className="mb-4">
                      <label className="text-sm text-gray-400 block mb-2">Number of team members:</label>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => setTeamSeats(Math.max(3, teamSeats - 1))}
                          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={teamSeats}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 3;
                            setTeamSeats(Math.min(100, Math.max(3, value)));
                          }}
                          className="w-20 px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:outline-none focus:border-blue-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          min="3"
                          max="100"
                        />
                        <button
                          onClick={() => setTeamSeats(Math.min(100, teamSeats + 1))}
                          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-xs text-gray-500 mt-2 text-center">
                        ${plan.planType === 'team' ? (isAnnual ? '470' : '49') : '0'} per user
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <motion.button
                    variants={liquidButton}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleCheckout(plan)}
                    disabled={isLoading === plan.name}
                    className={`
                      w-full font-semibold py-3 px-5 rounded-lg transition-all duration-300 relative overflow-hidden text-white
                      ${isPopular || plan.planType === 'team'
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : 'bg-white/10 hover:bg-white/20 border border-white/20'
                      }
                      ${isLoading === plan.name ? 'opacity-75 cursor-wait' : ''}
                    `}
                  >
                    <span className="relative z-10">
                      {isLoading === plan.name ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        plan.cta
                      )}
                    </span>
                    
                    {/* Ripple Effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-lg"
                      initial={{ scale: 0, opacity: 0 }}
                      whileTap={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>

                  {/* 3D Glow Effect */}
                  <div className={`
                    absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                    bg-gradient-to-br from-white/5 to-transparent
                  `} />
                  
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Indicators removed per request */}


        {/* Enterprise CTA */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-3">
              Need Something Custom?
            </h3>
            <p className="text-gray-300 mb-5 text-sm">
              Enterprise plans with custom features, dedicated support, and volume discounts available.
            </p>
            <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2.5 rounded-lg border border-white/20 transition-all duration-300">
              Contact Enterprise Sales
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
