import { NextRequest, NextResponse } from 'next/server';
import { optimizePrompt } from '@/lib/promptOptimizer';
import { checkUsageLimit, incrementUsage } from '@/lib/usage';

export async function POST(request: NextRequest) {
  try {
    const { prompt, userId } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    if (prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Prompt cannot be empty' },
        { status: 400 }
      );
    }

    // Check if userId is provided (user is authenticated)
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in to use this feature.' },
        { status: 401 }
      );
    }

    // Check usage limits
    const usageCheck = await checkUsageLimit(userId, 'prompt');
    
    if (!usageCheck.allowed) {
      return NextResponse.json(
        { 
          error: usageCheck.reason,
          limitReached: true,
          planType: usageCheck.planType,
          remainingDaily: usageCheck.remainingDaily,
          remainingMonthly: usageCheck.remainingMonthly
        },
        { status: 429 } // Too Many Requests
      );
    }

    // Simulate processing delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    const result = optimizePrompt(prompt);

    // Track usage after successful optimization
    await incrementUsage(userId, 'prompt_enhancement', {
      promptLength: prompt.length,
      timestamp: new Date().toISOString()
    });

    // Get updated usage stats
    const updatedUsage = await checkUsageLimit(userId, 'prompt');

    return NextResponse.json({
      success: true,
      data: result,
      usage: {
        remainingDaily: updatedUsage.remainingDaily,
        remainingMonthly: updatedUsage.remainingMonthly,
        planType: updatedUsage.planType
      }
    });

  } catch (error) {
    console.error('Error optimizing prompt:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}