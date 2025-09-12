// Promptability AI Design System
// Main export file for all design system tokens and utilities
// Fixed: Import modules before using them in exports

import { colors, getGradientText as getColorGradientText, colorCombinations } from './colors';
import { typography, getResponsiveText, textStyles } from './typography';
import { spacing, getResponsivePadding, getResponsiveMargin, layouts } from './spacing';
import { effects, animations, patterns, getGlassEffect, getBorderEffect, getGradientText, effectCombinations } from './effects';

// Re-export everything
export { colors, getColorGradientText, colorCombinations };
export { typography, getResponsiveText, textStyles };
export { spacing, getResponsivePadding, getResponsiveMargin, layouts };
export { effects, animations, patterns, getGlassEffect, getBorderEffect, getGradientText, effectCombinations };

// Combined utility functions for common use cases
export const designTokens = {
  // Hero section tokens
  hero: {
    container: layouts.heroSection,
    grid: layouts.heroGrid,
    title: textStyles.heroTitle,
    subtitle: textStyles.heroSubtitle,
    aiWord: textStyles.aiWord,
    buttonPrimary: effectCombinations.primaryButton,
    buttonSecondary: effectCombinations.secondaryButton,
  },

  // Section tokens
  section: {
    container: layouts.section,
    title: textStyles.sectionTitle,
    text: textStyles.bodyText,
  },

  // Card tokens
  card: {
    container: effectCombinations.glassCard,
    title: textStyles.cardTitle,
    text: textStyles.bodyText,
  },

  // Common component tokens
  components: {
    pageContainer: layouts.pageContainer,
    button: textStyles.button,
    heroImage: effectCombinations.heroImage,
  }
} as const;

// Brand guidelines object for documentation
export const brandGuidelines = {
  colors: {
    primary: 'Blue (#60a5fa) - Main brand color for buttons and links',
    secondary: 'Purple (#c084fc) - For accents and the "Power" word',
    accent: 'Cyan (#22d3ee) - For the "Full" word and highlights',
    background: 'Dark (#0a0a0a) - Main background',
    text: 'White (#ffffff) - Primary text color',
  },
  typography: {
    family: 'System fonts (system-ui, -apple-system, etc.)',
    heroTitle: '3xl mobile → 7xl desktop, bold, tight leading',
    aiWord: '4xl mobile → 8xl desktop, bold, gradient',
    body: 'base mobile → xl desktop, normal weight',
  },
  spacing: {
    containers: 'max-w-7xl with responsive padding (px-4 → px-8)',
    sections: 'py-8 → py-16 vertical spacing',
    buttons: 'px-6 py-3 → px-8 py-4 responsive padding',
  },
  effects: {
    glass: 'bg-white/10 backdrop-blur-sm for modern glass look',
    gradients: 'Blue-to-cyan for highlights, purple-to-blue for AI word',
    borders: 'white/20 opacity for subtle separation',
    shadows: 'Use sparingly, mainly for buttons and elevated cards',
  }
} as const;

// Quick access functions
export const getHeroTitleClasses = () => designTokens.hero.title;
export const getHeroButtonClasses = (type: 'primary' | 'secondary') => 
  type === 'primary' ? designTokens.hero.buttonPrimary : designTokens.hero.buttonSecondary;
export const getPageContainerClasses = () => designTokens.components.pageContainer;
export const getGlassCardClasses = () => designTokens.card.container;

// Usage examples (for documentation)
export const usageExamples = {
  heroTitle: `className="${getHeroTitleClasses()}"`,
  primaryButton: `className="${getHeroButtonClasses('primary')}"`,
  glassCard: `className="${getGlassCardClasses()}"`,
  pageContainer: `className="${getPageContainerClasses()}"`,
  gradientText: 'Use getGradientText("blue-cyan") for text gradients',
} as const;