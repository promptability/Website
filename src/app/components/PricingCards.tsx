'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { cardTilt, liquidButton, fadeInUp, staggerContainer } from '@/lib/animations';
import { useAuth } from '@/contexts/AuthContext';

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
      'Prompt Engineering Technology',
      'Works with all major AI platforms'
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
      '50 AI-optimized prompts daily',
      'Prompt Engineering Technology',
      'Project Memory',
      'Favorites Instructions',
      'Auto-Optimize Mode',
      'Learns Your Style',
      'Multi-AI Broadcasting',
      'Works with all major AI platforms'
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
    description: 'For power users',
    features: [
      'Unlimited AI-optimized prompts',
      'Prompt Engineering Technology',
      'Project Memory',
      'Favorites Instructions',
      'Auto-Optimize Mode',
      'Learns Your Style',
      'Multi-AI Broadcasting',
      'AI Chat Enhancement',
      'Platform Detective',
      'Works with all major AI platforms'
    ],
    popular: true,
    cta: 'Coming Soon',
    gradient: 'from-white/20 to-white/10',
    icon: Crown,
    planType: 'pro',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID
  }
];

export default function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [teamSeats, setTeamSeats] = useState(1); // Default 1 seat minimum for team plan
  
  // Get user authentication and plan info
  const { user, userProfile } = useAuth();
  const currentPlan = userProfile?.planType || 'free';
  
  // Plan hierarchy for upgrade/downgrade logic
  const planHierarchy = { 'free': 0, 'starter': 1, 'pro': 2 };
  
  const getPlanAction = (planType: string) => {
    if (!user) return 'Get Started';
    
    const currentLevel = planHierarchy[currentPlan as keyof typeof planHierarchy] || 0;
    const targetLevel = planHierarchy[planType as keyof typeof planHierarchy] || 0;
    
    if (currentLevel === targetLevel) return 'Current Plan';
    if (targetLevel > currentLevel) return 'Upgrade';
    if (targetLevel < currentLevel) return 'Downgrade';
    return 'Get Started';
  };
  
  const isCurrentPlan = (planType: string) => {
    return user && currentPlan === planType;
  };

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
    // Don't allow clicking on current plan
    if (isCurrentPlan(plan.planType || '')) {
      return;
    }
    
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
    <section className="pt-4 sm:pt-8 pb-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center mb-16"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            Simple, Transparent
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4 mb-8"
          >
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </motion.p>

          {/* Billing Toggle - Mobile optimized */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-1"
          >
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-all text-sm sm:text-base ${
                !isAnnual 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-all text-sm sm:text-base ${
                isAnnual 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual
            </button>
          </motion.div>
        </motion.div>

        {/* Mobile Pricing Cards - Single Column */}
        <div className="md:hidden">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-4 max-w-sm mx-auto"
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
                  variants={fadeInUp}
                  className="relative group"
                >
                  {/* Mobile Badge */}
                  {(isPopular || plan.cta === 'Coming Soon') && (
                    <div className="absolute -top-2 right-3 z-20">
                      <div className={`text-white text-xs font-semibold px-2 py-1 rounded-full border ${
                        plan.cta === 'Coming Soon' 
                          ? 'bg-gray-600/50 border-gray-500/50'
                          : 'bg-blue-500/80 border-blue-400/50'
                      }`}>
                        {plan.cta === 'Coming Soon' ? 'Soon' : 'Popular'}
                      </div>
                    </div>
                  )}

                  <div className={`
                    relative bg-white/5 backdrop-blur-xl border rounded-xl p-4 transition-all duration-300 flex flex-col
                    ${plan.cta === 'Coming Soon'
                      ? 'border-gray-500/50 opacity-75'
                      : isPopular 
                        ? 'border-white/30' 
                        : 'border-white/10'
                    }
                  `}>
                    {/* Mobile Card Header - Horizontal Layout */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white/80" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-white">
                              {plan.planType === 'team' && plan.price !== '$0' 
                                ? `$${parseInt(displayPrice.replace('$', '')) * teamSeats}` 
                                : displayPrice}
                            </span>
                            <span className="text-gray-400 text-xs">
                              {plan.planType === 'team' 
                                ? `/${isAnnual ? 'year' : 'month'}` 
                                : `/${displayPeriod}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile Description */}
                    <p className="text-gray-400 text-xs mb-3">{plan.description}</p>
                    
                    {/* Mobile Savings/Benefits */}
                    <div className="mb-3">
                      {plan.planType === 'free' && (
                        <div className="text-blue-400 text-xs font-medium">✓ No credit card required</div>
                      )}
                      {savings && (
                        <div className="text-green-400 text-xs font-medium">
                          {savings}
                        </div>
                      )}
                      {!isAnnual && plan.price !== '$0' && (
                        <button
                          onClick={() => setIsAnnual(true)}
                          className="text-blue-400 hover:text-blue-300 text-xs underline transition-colors"
                        >
                          Save 20% annually
                        </button>
                      )}
                    </div>

                    {/* Mobile Features - Show top 3 only */}
                    <div className="space-y-2 mb-4 flex-grow">
                      {plan.features.slice(0, 3).map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-2"
                        >
                          <div className="flex-shrink-0 w-3 h-3 rounded-full bg-white/10 flex items-center justify-center">
                            <Check className="w-2 h-2 text-white/70" />
                          </div>
                          <span className="text-gray-300 text-xs">{feature}</span>
                        </div>
                      ))}
                      {plan.features.length > 3 && (
                        <div className="text-gray-400 text-xs ml-5">
                          +{plan.features.length - 3} more features
                        </div>
                      )}
                    </div>

                  {/* Team Seat Selector */}
                  {plan.planType === 'team' && (
                    <div className="mb-4">
                      <label className="text-sm text-gray-400 block mb-2">Number of team members:</label>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => setTeamSeats(Math.max(1, teamSeats - 1))}
                          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={teamSeats}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            setTeamSeats(Math.min(100, Math.max(1, value)));
                          }}
                          className="w-20 px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:outline-none focus:border-blue-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          min="1"
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

                    {/* Mobile CTA Button */}
                    <button
                      onClick={() => !isCurrentPlan(plan.planType || '') && plan.cta !== 'Coming Soon' && handleCheckout(plan)}
                      disabled={Boolean(isLoading === plan.name) || plan.cta === 'Coming Soon' || isCurrentPlan(plan.planType || '')}
                      className={`
                        w-full font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 text-sm text-white
                        ${plan.cta === 'Coming Soon' 
                          ? 'bg-gray-600/50 cursor-not-allowed opacity-75'
                          : isCurrentPlan(plan.planType || '')
                            ? 'bg-green-600/50 cursor-not-allowed border border-green-500/50'
                            : isPopular || plan.planType === 'team'
                              ? 'bg-blue-500 hover:bg-blue-600' 
                              : 'bg-white/10 hover:bg-white/20 border border-white/20'
                        }
                        ${isLoading === plan.name ? 'opacity-75 cursor-wait' : ''}
                      `}
                    >
                      {isLoading === plan.name ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        getPlanAction(plan.planType || '')
                      )}
                    </button>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Desktop Pricing Cards - Original 3-Column Layout */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="hidden md:grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
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
                variants={plan.cta === 'Coming Soon' ? undefined : cardTilt}
                initial="initial"
                whileHover={plan.cta === 'Coming Soon' ? undefined : "hover"}
                onHoverStart={() => plan.cta !== 'Coming Soon' && setHoveredCard(plan.name)}
                onHoverEnd={() => plan.cta !== 'Coming Soon' && setHoveredCard(null)}
                className="relative group"
                style={{ perspective: '1000px' }}
              >
                {/* Badge */}
                {(isPopular || plan.cta === 'Coming Soon') && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                  >
                    <div className={`backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border ${
                      plan.cta === 'Coming Soon' 
                        ? 'bg-gray-600/50 border-gray-500/50'
                        : 'bg-white/10 border-white/20'
                    }`}>
                      {plan.cta === 'Coming Soon' ? 'COMING SOON' : 'MOST POPULAR'}
                    </div>
                  </motion.div>
                )}

                <div className={`
                  relative bg-white/5 backdrop-blur-xl border rounded-2xl p-6 h-full transition-all duration-300 flex flex-col
                  ${plan.cta === 'Coming Soon'
                    ? 'border-gray-500/50 opacity-75'
                    : isPopular 
                      ? 'border-white/30 hover:scale-105 hover:z-10' 
                      : 'border-white/10 hover:border-white/20'
                  }
                  ${hoveredCard === plan.name && plan.cta !== 'Coming Soon' ? 'bg-white/10' : ''}
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
                      {plan.planType === 'free' && (
                        <div className="text-blue-400 text-xs font-medium mt-1">✓ No credit card required</div>
                      )}
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
                          onClick={() => setTeamSeats(Math.max(1, teamSeats - 1))}
                          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={teamSeats}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            setTeamSeats(Math.min(100, Math.max(1, value)));
                          }}
                          className="w-20 px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:outline-none focus:border-blue-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          min="1"
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
                    variants={plan.cta === 'Coming Soon' || isCurrentPlan(plan.planType || '') ? undefined : liquidButton}
                    initial="initial"
                    whileHover={plan.cta === 'Coming Soon' || isCurrentPlan(plan.planType || '') ? undefined : "hover"}
                    whileTap={plan.cta === 'Coming Soon' || isCurrentPlan(plan.planType || '') ? undefined : "tap"}
                    onClick={() => !isCurrentPlan(plan.planType || '') && plan.cta !== 'Coming Soon' && handleCheckout(plan)}
                    disabled={Boolean(isLoading === plan.name) || plan.cta === 'Coming Soon' || isCurrentPlan(plan.planType || '')}
                    className={`
                      w-full font-semibold py-3 px-5 rounded-lg transition-all duration-300 relative overflow-hidden text-white
                      ${plan.cta === 'Coming Soon' 
                        ? 'bg-gray-600/50 cursor-not-allowed opacity-75'
                        : isCurrentPlan(plan.planType || '')
                          ? 'bg-green-600/50 cursor-not-allowed border border-green-500/50'
                          : isPopular || plan.planType === 'team'
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
                        getPlanAction(plan.planType || '')
                      )}
                    </span>
                    
                    {/* Ripple Effect */}
                    {plan.cta !== 'Coming Soon' && (
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-lg"
                        initial={{ scale: 0, opacity: 0 }}
                        whileTap={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.button>

                  {/* 3D Glow Effect */}
                  {plan.cta !== 'Coming Soon' && (
                    <div className={`
                      absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                      bg-gradient-to-br from-white/5 to-transparent
                    `} />
                  )}
                  
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
          viewport={{ once: true, amount: 0.1 }}
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
