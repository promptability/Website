import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

// Get price IDs from environment variables
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
    const { planType, billingCycle, quantity = 1, email, metadata } = await req.json();
    
    // Get the correct price ID
    const priceKey = `${planType}_${billingCycle}` as keyof typeof PRICE_IDS;
    const priceId = PRICE_IDS[priceKey];
    
    if (!priceId) {
      return NextResponse.json(
        { error: 'Invalid plan or billing cycle' },
        { status: 400 }
      );
    }

    // Create or get customer
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: email,
        metadata: metadata || {}
      });
    }

    // Create subscription with trial (first payment)
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        price: priceId,
        quantity: quantity
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: { 
        save_default_payment_method: 'on_subscription' 
      },
      expand: ['latest_invoice.payment_intent']
    });

    // Get the payment intent from the expanded invoice
    const expandedInvoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = expandedInvoice?.payment_intent as Stripe.PaymentIntent;

    if (!paymentIntent || !paymentIntent.client_secret) {
      console.error('Payment intent details:', {
        hasInvoice: !!expandedInvoice,
        hasPaymentIntent: !!paymentIntent,
        invoiceStatus: expandedInvoice?.status,
        subscriptionStatus: subscription.status
      });
      
      return NextResponse.json(
        { error: 'Failed to get payment intent. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      subscriptionId: subscription.id,
      customerId: customer.id
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}