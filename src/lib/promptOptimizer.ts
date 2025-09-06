export interface OptimizationResult {
  originalPrompt: string;
  optimizedPrompt: string;
  improvements: {
    clarity: number;
    tokensSaved: number;
    improvementScore: number;
  };
  changes: string[];
}

export interface ExampleTransformation {
  input: string;
  output: string;
  category: string;
}

export const exampleTransformations: ExampleTransformation[] = [
  {
    input: "write about AI",
    output: "Write a comprehensive 1500-word article about artificial intelligence, covering current applications in healthcare, finance, and education. Include 3 case studies, future predictions for the next 5 years, and address ethical considerations. Target audience: business executives. Tone: professional yet accessible.",
    category: "Content Creation"
  },
  {
    input: "help with code",
    output: "Debug and optimize the following code snippet. Identify potential issues, suggest performance improvements, and provide commented explanations for each change. Include best practices and alternative approaches where applicable.",
    category: "Development"
  },
  {
    input: "make a website",
    output: "Create a responsive website using modern web technologies (HTML5, CSS3, JavaScript). Include: navigation menu, hero section with CTA, features grid, testimonials, contact form, and footer. Implement mobile-first design, accessibility standards (WCAG 2.1), and SEO optimization.",
    category: "Web Development"
  },
  {
    input: "create content",
    output: "Develop a content strategy for [platform] including content calendar, post templates, engagement tactics, and performance metrics. Define target audience, content pillars, posting frequency, and KPIs for success measurement.",
    category: "Marketing"
  },
  {
    input: "analyze data",
    output: "Perform comprehensive data analysis on the provided dataset. Include: descriptive statistics, correlation analysis, trend identification, outlier detection, and visualization recommendations. Provide actionable insights and recommendations based on findings. Format: executive summary + detailed analysis.",
    category: "Data Analysis"
  },
  {
    input: "write email",
    output: "Compose a professional email with clear subject line, personalized greeting, concise body paragraphs, specific call-to-action, and appropriate closing. Maintain [tone] throughout and ensure mobile-friendly formatting. Include follow-up timeline if applicable.",
    category: "Communication"
  },
  {
    input: "design logo",
    output: "Create a modern, scalable logo design that reflects [brand values]. Provide 3 concept variations with different typography approaches, color schemes, and symbolic elements. Include vector files, style guide with color codes, typography specifications, and usage guidelines.",
    category: "Design"
  },
  {
    input: "plan project",
    output: "Develop a comprehensive project plan including: scope definition, timeline with milestones, resource allocation, risk assessment, stakeholder communication plan, and success metrics. Use project management best practices and include contingency planning.",
    category: "Project Management"
  },
  {
    input: "research topic",
    output: "Conduct thorough research on [topic] using credible sources. Provide: executive summary, key findings, methodology, source analysis, comparative insights, and recommendations. Include proper citations and identify knowledge gaps for future research.",
    category: "Research"
  },
  {
    input: "fix bug",
    output: "Systematically debug the issue by: reproducing the error, analyzing error logs, identifying root cause, implementing fix with proper testing, documenting changes, and preventing similar issues. Include before/after code comparison and testing strategy.",
    category: "Development"
  }
];

export function optimizePrompt(prompt: string): OptimizationResult {
  const trimmedPrompt = prompt.trim().toLowerCase();
  
  // Find matching example or create optimization
  const matchingExample = exampleTransformations.find(example => 
    trimmedPrompt.includes(example.input.toLowerCase()) || 
    example.input.toLowerCase().includes(trimmedPrompt)
  );

  let optimizedPrompt: string;
  let changes: string[] = [];

  if (matchingExample) {
    optimizedPrompt = matchingExample.output;
    changes = [
      "Added specific deliverables and scope",
      "Defined target audience and tone",
      "Included measurable outcomes",
      "Enhanced clarity and structure"
    ];
  } else {
    // Generic optimization rules
    optimizedPrompt = enhancePrompt(prompt);
    changes = getOptimizationChanges(prompt, optimizedPrompt);
  }

  // Calculate metrics
  const originalLength = prompt.length;
  const optimizedLength = optimizedPrompt.length;
  const clarityImprovement = Math.min(95, 60 + (optimizedLength - originalLength) / originalLength * 100);
  const tokensSaved = Math.max(0, Math.floor((originalLength - optimizedLength) / 4));
  const improvementScore = Math.min(98, 70 + Math.floor(Math.random() * 25));

  return {
    originalPrompt: prompt,
    optimizedPrompt,
    improvements: {
      clarity: Math.round(clarityImprovement),
      tokensSaved,
      improvementScore
    },
    changes
  };
}

function enhancePrompt(prompt: string): string {
  let enhanced = prompt;

  // Add context and specificity
  if (enhanced.length < 50) {
    enhanced = `Please provide a detailed and comprehensive response to: ${enhanced}. Include specific examples, actionable steps, and relevant context. Structure your response clearly with appropriate headings or bullet points where helpful.`;
  }

  // Add role specification if missing
  if (!enhanced.toLowerCase().includes('act as') && !enhanced.toLowerCase().includes('you are')) {
    enhanced = `Acting as an expert in the relevant field, ${enhanced}`;
  }

  // Add output format specification
  if (!enhanced.toLowerCase().includes('format') && !enhanced.toLowerCase().includes('structure')) {
    enhanced += ` Please structure your response in a clear, organized format with proper headings and sections.`;
  }

  return enhanced;
}

function getOptimizationChanges(original: string, optimized: string): string[] {
  const changes: string[] = [];
  
  if (optimized.length > original.length * 1.5) {
    changes.push("Enhanced specificity and detail");
  }
  
  if (optimized.toLowerCase().includes('expert') || optimized.toLowerCase().includes('act as')) {
    changes.push("Added role specification");
  }
  
  if (optimized.toLowerCase().includes('format') || optimized.toLowerCase().includes('structure')) {
    changes.push("Specified output format");
  }
  
  if (optimized.toLowerCase().includes('example') || optimized.toLowerCase().includes('step')) {
    changes.push("Requested examples and actionable steps");
  }

  if (changes.length === 0) {
    changes.push("Improved clarity and structure");
  }

  return changes;
}
