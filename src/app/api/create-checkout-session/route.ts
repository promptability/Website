import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: '2025-08-27.basil',
}) : null;

// Stripe price IDs - you'll need to create these in your Stripe dashboard
const PRICE_IDS = {
  starter_monthly: 'price_starter_monthly', // $9/month
  starter_yearly: 'price_starter_yearly',   // $86/year (20% off)
  pro_monthly: 'price_pro_monthly',         // $32/month
  pro_yearly: 'price_pro_yearly',           // $307/year (20% off)
  team_monthly: 'price_team_monthly',       // $99/month
  team_yearly: 'price_team_yearly',         // $950/year (20% off)
};

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please check environment variables.' },
        { status: 500 }
      );
    }

    const { priceId, planType, billingCycle } = await req.json();
    
    // Map plan and billing to actual Stripe price IDs
    let stripePriceId = priceId;
    if (!priceId && planType && billingCycle) {
      const key = `${planType}_${billingCycle}` as keyof typeof PRICE_IDS;
      stripePriceId = PRICE_IDS[key];
    }

    if (!stripePriceId) {
      return NextResponse.json(
        { error: 'Invalid price configuration' },
        { status: 400 }
      );
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: stripePriceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pricing`,
      metadata: {
        planType,
        billingCycle
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_email: undefined, // You can pass user email if available
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST method to create checkout session' });
}