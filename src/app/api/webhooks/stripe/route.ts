import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { 
  createUser, 
  updateUser, 
  getUserByEmail, 
  getUserByStripeCustomerId,
  createSubscription,
  updateSubscription,
  getSubscriptionByStripeId,
  createPayment,
  createWebhookEvent,
  getWebhookEvent,
  updateWebhookEvent
} from '@/lib/firebase/firestore';
import { sendEmail, emailTemplates } from '@/lib/email';
import { Timestamp } from 'firebase/firestore';
import { updateUserPlan } from '@/lib/usage';
import { getPlanByPriceId } from '@/lib/plans';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Helper function to get or create user
async function getOrCreateUser(customerId: string, email?: string | null) {
  // First try to find by Stripe customer ID
  let user = await getUserByStripeCustomerId(customerId);

  if (!user && email) {
    // Try to find by email
    user = await getUserByEmail(email);

    if (user) {
      // Update with Stripe customer ID
      await updateUser(user.uid, { stripeCustomerId: customerId });
      user = await getUserByStripeCustomerId(customerId);
    } else {
      // Create new user - Note: This creates a Firestore document but not Firebase Auth
      // In a real app, you'd want the user to be authenticated first
      const uid = `stripe_${customerId}`; // Temporary UID for Stripe-only users
      await createUser(uid, {
        email: email || '',
        stripeCustomerId: customerId
      });
      user = await getUserByStripeCustomerId(customerId);
    }
  }

  return user;
}

// Helper to extract plan type from price ID
function getPlanType(priceId: string): string {
  if (priceId === process.env.STRIPE_STARTER_MONTHLY_PRICE_ID || priceId === process.env.STRIPE_STARTER_YEARLY_PRICE_ID) {
    return 'starter';
  } else if (priceId === process.env.STRIPE_PRO_MONTHLY_PRICE_ID || priceId === process.env.STRIPE_PRO_YEARLY_PRICE_ID) {
    return 'pro';
  } else if (priceId === process.env.STRIPE_TEAM_MONTHLY_PRICE_ID || priceId === process.env.STRIPE_TEAM_YEARLY_PRICE_ID) {
    return 'team';
  }
  return 'unknown';
}

// Helper to get billing cycle from price ID
function getBillingCycle(priceId: string): string {
  if (priceId === process.env.STRIPE_STARTER_YEARLY_PRICE_ID || 
      priceId === process.env.STRIPE_PRO_YEARLY_PRICE_ID || 
      priceId === process.env.STRIPE_TEAM_YEARLY_PRICE_ID) {
    return 'yearly';
  }
  return 'monthly';
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Check if we've already processed this event
  const existingEvent = await getWebhookEvent(event.id);

  if (existingEvent?.processed) {
    return NextResponse.json({ received: true, message: 'Event already processed' });
  }

  // Record the event
  let eventDocId: string;
  try {
    if (!existingEvent) {
      eventDocId = await createWebhookEvent({
        stripeEventId: event.id,
        type: event.type,
        processed: false
      });
    } else {
      eventDocId = existingEvent.id;
    }
  } catch (error) {
    console.error('Failed to create webhook event:', error);
    return NextResponse.json({ error: 'Failed to log webhook event' }, { status: 500 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Get full session details with line items
        const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items', 'customer', 'subscription']
        });

        const customer = fullSession.customer as Stripe.Customer;
        const subscription = fullSession.subscription as Stripe.Subscription;
        
        if (customer && subscription) {
          // Get or create user
          const user = await getOrCreateUser(customer.id, customer.email);
          
          if (user) {
            // Update user details if provided
            if (fullSession.customer_details && fullSession.customer_details.name) {
              const nameParts = fullSession.customer_details.name.split(' ');
              await updateUser(user.uid, {
                firstName: nameParts[0] || user.firstName,
                lastName: nameParts.slice(1).join(' ') || user.lastName,
              });
            }

            // Send welcome email
            const planType = getPlanType(subscription.items.data[0].price.id);
            const planName = planType.charAt(0).toUpperCase() + planType.slice(1);
            const emailTemplate = emailTemplates.welcomeEmail(
              user.firstName || 'Customer',
              planName
            );
            
            await sendEmail({
              to: user.email,
              ...emailTemplate
            });
          }
        }
        
        console.log('Checkout session completed:', session.id);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Get customer
        const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;
        const user = await getOrCreateUser(customer.id, customer.email);
        
        if (user) {
          const priceId = subscription.items.data[0].price.id;
          const planType = getPlanType(priceId);
          const billingCycle = getBillingCycle(priceId);
          
          // Check if subscription exists
          const existingSubscription = await getSubscriptionByStripeId(subscription.id);
          
          const subscriptionData = {
            userId: user.uid,
            stripeSubscriptionId: subscription.id,
            stripePriceId: priceId,
            status: subscription.status,
            planType,
            billingCycle,
            quantity: subscription.items.data[0].quantity || 1,
            currentPeriodStart: (subscription as any).current_period_start ? 
              Timestamp.fromDate(new Date((subscription as any).current_period_start * 1000)) : 
              Timestamp.now(),
            currentPeriodEnd: (subscription as any).current_period_end ? 
              Timestamp.fromDate(new Date((subscription as any).current_period_end * 1000)) : 
              Timestamp.now(),
            cancelAtPeriodEnd: subscription.cancel_at_period_end || false,
          };

          if (existingSubscription) {
            // Update existing subscription
            await updateSubscription(existingSubscription.id, subscriptionData);
          } else {
            // Create new subscription
            await createSubscription({
              id: '', // Firestore will generate this
              ...subscriptionData
            });
          }
          
          // Update user's usage plan based on their subscription
          const planFromPriceId = getPlanByPriceId(priceId);
          if (planFromPriceId && subscription.status === 'active') {
            await updateUserPlan(user.uid, planFromPriceId);
            console.log(`Updated user ${user.uid} to plan: ${planFromPriceId}`);
          }
        }
        
        console.log('Subscription created/updated:', subscription.id);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Update subscription status
        const sub = await getSubscriptionByStripeId(subscription.id);
        
        if (sub) {
          await updateSubscription(sub.id, { status: 'canceled' });
          
          // Get user to send email
          const user = await getUser(sub.userId);
          if (user) {
            // Send cancellation email
            const emailTemplate = emailTemplates.subscriptionCanceled(
              user.firstName || 'Customer'
            );
            
            await sendEmail({
              to: user.email,
              ...emailTemplate
            });
          }
        }
        
        console.log('Subscription cancelled:', subscription.id);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if ((invoice as any).subscription && (invoice as any).payment_intent) {
          const customer = await stripe.customers.retrieve(invoice.customer as string) as Stripe.Customer;
          const user = await getOrCreateUser(customer.id, customer.email);
          
          if (user) {
            // Record payment
            await createPayment({
              id: '', // Firestore will generate this
              userId: user.uid,
              stripePaymentIntentId: (invoice as any).payment_intent as string,
              amount: (invoice as any).amount_paid,
              currency: invoice.currency,
              status: 'succeeded',
              description: `Subscription payment for ${(invoice as any).period_start ? new Date((invoice as any).period_start * 1000).toLocaleDateString() : 'N/A'}`
            });
            
            // Send receipt email
            const amount = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: invoice.currency.toUpperCase()
            }).format((invoice as any).amount_paid / 100);
            
            const emailTemplate = emailTemplates.invoiceReceipt(
              user.firstName || 'Customer',
              amount,
              new Date().toLocaleDateString()
            );
            
            await sendEmail({
              to: user.email,
              ...emailTemplate
            });
          }
        }
        
        console.log('Invoice payment succeeded:', invoice.id);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if ((invoice as any).subscription) {
          const sub = await getSubscriptionByStripeId((invoice as any).subscription as string);
          
          if (sub) {
            // Update subscription status
            await updateSubscription(sub.id, { status: 'past_due' });
            
            // Get user to send email
            const user = await getUser(sub.userId);
            if (user) {
              // Send payment failed email
              const emailTemplate = emailTemplates.paymentFailed(
                user.firstName || 'Customer'
              );
              
              await sendEmail({
                to: user.email,
                ...emailTemplate
              });
            }
          }
        }
        
        console.log('Invoice payment failed:', invoice.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Mark event as processed
    await updateWebhookEvent(eventDocId, { processed: true });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    
    // Record error
    try {
      await updateWebhookEvent(eventDocId, { 
        processed: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } catch (updateError) {
      console.error('Failed to update webhook event with error:', updateError);
    }
    
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

// Helper function to get user - add this if not imported
async function getUser(uid: string) {
  const { getUser } = await import('@/lib/firebase/firestore');
  return getUser(uid);
}