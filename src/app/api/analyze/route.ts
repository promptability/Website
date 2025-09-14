import { NextRequest, NextResponse } from 'next/server';
import { checkUsageLimit, incrementUsage } from '@/lib/usage';

interface AnalysisResult {
  prompt: string;
  platform: string;
  strengthScore: number;
  suggestions: string[];
  metrics: {
    clarity: number;
    specificity: number;
    context: number;
    actionability: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, platform, userId } = await request.json();

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
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result = analyzePromptStrength(prompt, platform || 'chatgpt');

    // Track usage after successful analysis
    await incrementUsage(userId, 'analysis', {
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
    console.error('Error analyzing prompt:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function analyzePromptStrength(prompt: string, platform: string): AnalysisResult {
  const words = prompt.trim().split(/\s+/);
  const length = prompt.length;
  
  // Calculate individual metrics
  const clarity = calculateClarity(prompt);
  const specificity = calculateSpecificity(prompt);
  const context = calculateContext(prompt);
  const actionability = calculateActionability(prompt);
  
  // Overall strength score (weighted average)
  const strengthScore = Math.round(
    (clarity * 0.3 + specificity * 0.3 + context * 0.2 + actionability * 0.2)
  );
  
  // Generate suggestions based on weaknesses
  const suggestions = generateSuggestions(prompt, { clarity, specificity, context, actionability });
  
  return {
    prompt,
    platform,
    strengthScore,
    suggestions,
    metrics: {
      clarity,
      specificity,
      context,
      actionability
    }
  };
}

function calculateClarity(prompt: string): number {
  let score = 50; // Base score
  
  // Check for clear instructions
  const instructionWords = ['write', 'create', 'analyze', 'explain', 'describe', 'generate', 'provide', 'list'];
  if (instructionWords.some(word => prompt.toLowerCase().includes(word))) {
    score += 20;
  }
  
  // Check for question marks or clear structure
  if (prompt.includes('?') || prompt.includes(':')) {
    score += 15;
  }
  
  // Penalize for vague words
  const vagueWords = ['something', 'anything', 'stuff', 'things', 'good', 'nice', 'better'];
  const vagueCount = vagueWords.filter(word => prompt.toLowerCase().includes(word)).length;
  score -= vagueCount * 10;
  
  // Length consideration
  if (prompt.length < 20) {
    score -= 20;
  } else if (prompt.length > 100) {
    score += 10;
  }
  
  return Math.max(0, Math.min(100, score));
}

function calculateSpecificity(prompt: string): number {
  let score = 40; // Base score
  
  // Check for specific details
  const specificWords = ['exactly', 'specifically', 'detailed', 'comprehensive', 'step-by-step', 'include', 'format', 'style'];
  const specificCount = specificWords.filter(word => prompt.toLowerCase().includes(word)).length;
  score += specificCount * 15;
  
  // Check for numbers or quantities
  if (/\d+/.test(prompt)) {
    score += 20;
  }
  
  // Check for examples or constraints
  if (prompt.toLowerCase().includes('example') || prompt.toLowerCase().includes('like')) {
    score += 15;
  }
  
  // Check for format specifications
  if (prompt.toLowerCase().includes('format') || prompt.toLowerCase().includes('structure')) {
    score += 15;
  }
  
  return Math.max(0, Math.min(100, score));
}

function calculateContext(prompt: string): number {
  let score = 45; // Base score
  
  // Check for context-providing words
  const contextWords = ['for', 'audience', 'purpose', 'goal', 'target', 'background', 'context', 'situation'];
  const contextCount = contextWords.filter(word => prompt.toLowerCase().includes(word)).length;
  score += contextCount * 12;
  
  // Check for role specification
  if (prompt.toLowerCase().includes('act as') || prompt.toLowerCase().includes('you are')) {
    score += 25;
  }
  
  // Check for domain/field specification
  const domains = ['business', 'technical', 'academic', 'creative', 'professional', 'marketing', 'sales'];
  if (domains.some(domain => prompt.toLowerCase().includes(domain))) {
    score += 15;
  }
  
  return Math.max(0, Math.min(100, score));
}

function calculateActionability(prompt: string): number {
  let score = 50; // Base score
  
  // Check for action verbs
  const actionVerbs = ['create', 'write', 'generate', 'analyze', 'design', 'build', 'develop', 'plan', 'optimize'];
  const actionCount = actionVerbs.filter(verb => prompt.toLowerCase().includes(verb)).length;
  score += actionCount * 15;
  
  // Check for deliverable specification
  if (prompt.toLowerCase().includes('deliverable') || prompt.toLowerCase().includes('output')) {
    score += 20;
  }
  
  // Check for constraints or requirements
  const constraintWords = ['must', 'should', 'need', 'require', 'ensure', 'avoid'];
  const constraintCount = constraintWords.filter(word => prompt.toLowerCase().includes(word)).length;
  score += constraintCount * 10;
  
  return Math.max(0, Math.min(100, score));
}

function generateSuggestions(prompt: string, metrics: { clarity: number; specificity: number; context: number; actionability: number }): string[] {
  const suggestions: string[] = [];
  
  if (metrics.clarity < 70) {
    suggestions.push("Make your request more clear and direct. Use specific action words like 'write', 'create', or 'analyze'.");
  }
  
  if (metrics.specificity < 70) {
    suggestions.push("Add specific details like word count, format requirements, or examples of what you want.");
  }
  
  if (metrics.context < 70) {
    suggestions.push("Provide more context about your audience, purpose, or the situation you're addressing.");
  }
  
  if (metrics.actionability < 70) {
    suggestions.push("Include clear deliverables and constraints to make your prompt more actionable.");
  }
  
  if (prompt.length < 30) {
    suggestions.push("Consider expanding your prompt with more details and requirements.");
  }
  
  if (!prompt.toLowerCase().includes('tone') && !prompt.toLowerCase().includes('style')) {
    suggestions.push("Specify the tone or style you want (e.g., professional, casual, technical).");
  }
  
  // If no suggestions, add a general one
  if (suggestions.length === 0) {
    suggestions.push("Your prompt is already quite strong! Consider adding examples or edge cases to handle.");
  }
  
  return suggestions.slice(0, 4); // Limit to 4 suggestions
}
