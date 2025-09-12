import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: '2025-08-27.basil',
}) : null;

// Stripe price IDs from environment variables
const PRICE_IDS = {
  starter_monthly: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID!,
  starter_yearly: process.env.STRIPE_STARTER_YEARLY_PRICE_ID!,
  pro_monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
  pro_yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID!,
  team_monthly: process.env.STRIPE_TEAM_MONTHLY_PRICE_ID!,
  team_yearly: process.env.STRIPE_TEAM_YEARLY_PRICE_ID!,
};

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please check environment variables.' },
        { status: 500 }
      );
    }

    const { priceId, planType, billingCycle, quantity = 1 } = await req.json();
    
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

    // For team plans, allow quantity selection (number of seats)
    const lineItemQuantity = planType === 'team' ? quantity : 1;
    
    // Create checkout session
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [{
        price: stripePriceId,
        quantity: lineItemQuantity,
      }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pricing`,
      metadata: {
        planType,
        billingCycle,
        quantity: lineItemQuantity.toString()
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_email: undefined, // You can pass user email if available
    };

    // For team plans, allow adjustable quantity
    if (planType === 'team') {
      sessionConfig.line_items![0].adjustable_quantity = {
        enabled: true,
        minimum: 3, // Minimum 3 seats for team plan
        maximum: 100, // Maximum 100 seats
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

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