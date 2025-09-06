import { NextRequest, NextResponse } from 'next/server';
import { optimizePrompt } from '@/lib/promptOptimizer';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

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

    // Simulate processing delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    const result = optimizePrompt(prompt);

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error optimizing prompt:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
