import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getUserByEmail } from '@/lib/firebase/firestore';

export async function POST(req: Request) {
  try {
    const { email, userId } = await req.json();
    
    if (!email && !userId) {
      return NextResponse.json(
        { error: 'Email or userId is required' },
        { status: 400 }
      );
    }

    let user;
    
    // Find user by email or userId
    if (userId) {
      const { getUser } = await import('@/lib/firebase/firestore');
      user = await getUser(userId);
    } else if (email) {
      user = await getUserByEmail(email);
    }

    if (!user || !user.stripeCustomerId) {
      return NextResponse.json(
        { error: 'No subscription found for this user' },
        { status: 404 }
      );
    }

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/account`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Portal session error:', error);
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST method to create portal session' });
}