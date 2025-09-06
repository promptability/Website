'use client';

import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out Promptability AI',
    features: [
      '10 prompt optimizations per day',
      'Basic prompt suggestions',
      'Chrome extension access',
      'Community support',
    ],
    buttonText: 'Get Started Free',
    buttonStyle: 'bg-white/10 hover:bg-white/20 border border-white/20',
    popular: false,
  },
  {
    name: 'Starter',
    price: '$9',
    period: 'per month',
    description: 'Ideal for professionals and content creators',
    features: [
      '150 prompt optimizations per day',
      'Advanced AI learning',
      'Project memory & context',
      'Success analytics in account',
      'Priority support',
      'Custom prompt templates',
    ],
    buttonText: 'Get Started',
    buttonStyle: 'bg-white/10 hover:bg-white/20 border border-white/20',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$32',
    period: 'per month',
    description: 'For teams and power users',
    features: [
      'Unlimited prompt optimizations',
      'Team collaboration features',
      'Advanced analytics & insights',
      'Custom AI model training',
      'API access',
      'White-label options',
      'Dedicated account manager',
    ],
    buttonText: 'Contact Sales',
    buttonStyle: 'bg-white text-black hover:bg-white/90',
    popular: true,
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
      'On-premise deployment option',
      'Dedicated training sessions',
      'Custom AI workflows',
    ],
    buttonText: 'Contact Enterprise',
    buttonStyle: 'bg-white/10 hover:bg-white/20 border border-white/20',
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Simple, Transparent
            <span className="block text-white/90">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="relative group">
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-white/10 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className={`
                bg-white/5 backdrop-blur-xl rounded-2xl border p-6 h-full transition-all duration-300
                ${plan.popular 
                  ? 'border-white/30' 
                  : 'border-white/10 hover:border-white/20'
                }
                group-hover:bg-white/10
              `}>
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-3">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-1 text-sm">/{plan.period}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                        <Check className="w-2.5 h-2.5 text-white/70" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button
                  className={`
                    w-full font-semibold py-2.5 px-5 rounded-lg transition-all duration-300
                    ${plan.buttonStyle}
                  `}
                >
                  {plan.buttonText}
                </button>

                {/* 3D Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h4 className="text-lg font-semibold text-white mb-2">Is there a free trial?</h4>
              <p className="text-gray-400">Yes! All paid plans come with a 7-day free trial. No credit card required.</p>
            </div>
            <div className="text-left">
              <h4 className="text-lg font-semibold text-white mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-400">Absolutely. Cancel your subscription anytime with no questions asked.</p>
            </div>
            <div className="text-left">
              <h4 className="text-lg font-semibold text-white mb-2">Do you offer team discounts?</h4>
              <p className="text-gray-400">Yes! Contact us for custom pricing for teams of 10+ users.</p>
            </div>
            <div className="text-left">
              <h4 className="text-lg font-semibold text-white mb-2">What AI platforms do you support?</h4>
              <p className="text-gray-400">ChatGPT, Claude, Gemini, Perplexity, and 15+ other popular AI platforms.</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators removed per request */}
      </div>
    </section>
  );
}
