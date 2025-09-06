'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutButtonProps {
  priceId?: string;
  planName: string;
  planType?: string;
  billingCycle?: 'monthly' | 'yearly';
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  children?: React.ReactNode;
}

export function CheckoutButton({ 
  priceId, 
  planName, 
  planType,
  billingCycle = 'monthly',
  className = '',
  variant = 'primary',
  children 
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      // Call your API
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          priceId,
          planType,
          billingCycle 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      const { sessionId, url } = await response.json();
      
      if (url) {
        // Direct redirect to Stripe Checkout URL
        window.location.href = url;
      } else if (sessionId) {
        // Fallback to Stripe.js redirect
        const stripe = await stripePromise;
        const result = await stripe?.redirectToCheckout({ sessionId });
        
        if (result?.error) {
          throw new Error(result.error.message);
        }
      } else {
        throw new Error('No session ID or URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const getButtonStyles = () => {
    const base = 'font-semibold py-3 px-6 rounded-lg transition-all duration-300 relative overflow-hidden';
    
    switch (variant) {
      case 'primary':
        return `${base} bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/25`;
      case 'secondary':
        return `${base} bg-white text-black hover:bg-white/90`;
      case 'outline':
        return `${base} bg-white/10 text-white hover:bg-white/20 border border-white/20`;
      default:
        return base;
    }
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCheckout}
      disabled={isLoading}
      className={`${getButtonStyles()} ${className} ${isLoading ? 'opacity-75 cursor-wait' : ''}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Processing...</span>
        </div>
      ) : (
        children || `Subscribe to ${planName}`
      )}
    </motion.button>
  );
}