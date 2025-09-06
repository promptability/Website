'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Building2 } from 'lucide-react';
import { cardTilt, liquidButton, fadeInUp, staggerContainer, buttonHover } from '@/lib/animations';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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
    description: 'Perfect for trying out Promptability AI',
    features: [
      '10 prompts per day',
      'Basic optimization',
      'Chrome extension',
      'Community support',
      'Basic analytics'
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
      '150 prompts per day',
      'Advanced AI learning',
      'Project memory & context',
      'Success analytics in account',
      'Priority support',
      'Custom prompt templates',
      'Export capabilities',
      'API access (limited)'
    ],
    popular: false,
    cta: 'Get Started',
    gradient: 'from-white/30 to-white/20',
    icon: Star,
    planType: 'starter',
    stripePriceId: 'price_starter_monthly'
  },
  {
    name: 'Pro',
    price: '$32',
    period: 'per month',
    description: 'For teams and power users',
    features: [
      'Unlimited prompts',
      'Team collaboration',
      'Advanced analytics & insights',
      'Custom AI model training',
      'Full API access',
      'White-label options',
      'Dedicated account manager',
      'SSO integration',
      'Custom integrations'
    ],
    popular: true,
    cta: 'Get Started',
    gradient: 'from-white/20 to-white/10',
    icon: Crown,
    planType: 'pro',
    stripePriceId: 'price_pro_monthly'
  },
  {
    name: 'Team',
    price: '$99',
    period: 'per month',
    description: 'Enterprise-grade solution for larger teams',
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'SSO & advanced security',
      'Custom integrations',
      'SLA guarantees',
      'On-premise deployment',
      'Dedicated training sessions',
      'Custom AI workflows',
      'Priority roadmap input',
      'Quarterly business reviews'
    ],
    popular: false,
    cta: 'Contact Enterprise',
    gradient: 'from-white/25 to-white/15',
    icon: Building2,
    planType: 'team',
    stripePriceId: 'price_team_monthly'
  }
];

export default function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);

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

    if (plan.cta === 'Contact Enterprise') {
      // Redirect to contact form for enterprise
      window.location.href = '/contact';
      return;
    }

    setIsLoading(plan.name);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType: plan.planType,
          billingCycle: isAnnual ? 'yearly' : 'monthly',
        }),
      });

      const { sessionId, url } = await response.json();
      
      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      } else {
        // Fallback to Stripe.js redirect
        const stripe = await stripePromise;
        if (stripe && sessionId) {
          await stripe.redirectToCheckout({ sessionId });
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <section className="py-20 px-4 relative">
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
            className="text-5xl md:text-6xl font-bold mb-6 text-white"
          >
            Simple, Transparent
            <span className="block text-white/90">
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
                  relative bg-white/5 backdrop-blur-xl border rounded-2xl p-6 h-full transition-all duration-300
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
                        <span className="text-3xl font-bold text-white">{displayPrice}</span>
                        <span className="text-gray-400 text-sm">/{displayPeriod}</span>
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
                  <div className="space-y-3 mb-6 flex-1">
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

                  {/* CTA Button */}
                  <motion.button
                    variants={plan.cta === 'Contact Enterprise' ? buttonHover : liquidButton}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleCheckout(plan)}
                    disabled={isLoading === plan.name}
                    className={`
                      w-full font-semibold py-2.5 px-5 rounded-lg transition-all duration-300 relative overflow-hidden
                      ${plan.cta === 'Contact Enterprise'
                        ? 'bg-purple-500 hover:bg-purple-600 text-white'
                        : (
                          isPopular 
                            ? 'bg-white text-black hover:bg-white/90' 
                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                        )
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
          className="mt-16 text-center"
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
