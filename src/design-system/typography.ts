// Promptability AI Typography System
// This file defines all typography rules, fonts, and text styles

export const typography = {
  // Font Families
  fonts: {
    sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
    mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Consolas', 'monospace'],
  },

  // Font Sizes (Mobile-first responsive)
  sizes: {
    // Heading Sizes
    heading: {
      h1: {
        mobile: 'text-3xl',      // 30px
        tablet: 'text-4xl',     // 36px  
        desktop: 'text-5xl',    // 48px
        large: 'text-6xl',      // 60px
        xl: 'text-7xl',         // 72px
      },
      h2: {
        mobile: 'text-2xl',     // 24px
        tablet: 'text-3xl',    // 30px
        desktop: 'text-4xl',   // 36px
        large: 'text-5xl',     // 48px
      },
      h3: {
        mobile: 'text-xl',      // 20px
        tablet: 'text-2xl',    // 24px
        desktop: 'text-3xl',   // 30px
      },
      h4: {
        mobile: 'text-lg',      // 18px
        tablet: 'text-xl',     // 20px
        desktop: 'text-2xl',   // 24px
      },
    },

    // Body Text Sizes
    body: {
      large: {
        mobile: 'text-base',    // 16px
        tablet: 'text-lg',     // 18px
        desktop: 'text-xl',    // 20px
      },
      normal: {
        mobile: 'text-sm',      // 14px
        tablet: 'text-base',   // 16px
        desktop: 'text-lg',    // 18px
      },
      small: {
        mobile: 'text-xs',      // 12px
        tablet: 'text-sm',     // 14px
        desktop: 'text-base',  // 16px
      },
    },

    // Special AI Word (hero)
    aiWord: {
      mobile: 'text-4xl',      // 36px
      tablet: 'text-5xl',     // 48px
      desktop: 'text-6xl',    // 60px
      large: 'text-7xl',      // 72px
      xl: 'text-8xl',         // 96px
    },

    // Button Text
    button: {
      mobile: 'text-base',     // 16px
      desktop: 'text-lg',     // 18px
    }
  },

  // Font Weights
  weights: {
    light: 'font-light',       // 300
    normal: 'font-normal',     // 400
    medium: 'font-medium',     // 500
    semibold: 'font-semibold', // 600
    bold: 'font-bold',         // 700
    extrabold: 'font-extrabold', // 800
  },

  // Line Heights
  lineHeight: {
    tight: 'leading-tight',    // 1.25
    normal: 'leading-normal',  // 1.5
    relaxed: 'leading-relaxed', // 1.625
  },

  // Letter Spacing
  letterSpacing: {
    tighter: 'tracking-tighter', // -0.05em
    tight: 'tracking-tight',     // -0.025em
    normal: 'tracking-normal',   // 0em
    wide: 'tracking-wide',       // 0.025em
    wider: 'tracking-wider',     // 0.05em
  },
} as const;

// Typography utility functions
export const getResponsiveText = (
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'body-large' | 'body-normal' | 'body-small' | 'ai-word' | 'button'
) => {
  switch (type) {
    case 'h1':
      return `${typography.sizes.heading.h1.mobile} sm:${typography.sizes.heading.h1.tablet} md:${typography.sizes.heading.h1.desktop} lg:${typography.sizes.heading.h1.large} xl:${typography.sizes.heading.h1.xl}`;
    case 'h2':
      return `${typography.sizes.heading.h2.mobile} sm:${typography.sizes.heading.h2.tablet} md:${typography.sizes.heading.h2.desktop} lg:${typography.sizes.heading.h2.large}`;
    case 'h3':
      return `${typography.sizes.heading.h3.mobile} sm:${typography.sizes.heading.h3.tablet} md:${typography.sizes.heading.h3.desktop}`;
    case 'h4':
      return `${typography.sizes.heading.h4.mobile} sm:${typography.sizes.heading.h4.tablet} md:${typography.sizes.heading.h4.desktop}`;
    case 'body-large':
      return `${typography.sizes.body.large.mobile} sm:${typography.sizes.body.large.tablet} md:${typography.sizes.body.large.desktop}`;
    case 'body-normal':
      return `${typography.sizes.body.normal.mobile} sm:${typography.sizes.body.normal.tablet} md:${typography.sizes.body.normal.desktop}`;
    case 'body-small':
      return `${typography.sizes.body.small.mobile} sm:${typography.sizes.body.small.tablet} md:${typography.sizes.body.small.desktop}`;
    case 'ai-word':
      return `${typography.sizes.aiWord.mobile} sm:${typography.sizes.aiWord.tablet} md:${typography.sizes.aiWord.desktop} lg:${typography.sizes.aiWord.large} xl:${typography.sizes.aiWord.xl}`;
    case 'button':
      return `${typography.sizes.button.mobile} sm:${typography.sizes.button.desktop}`;
    default:
      return 'text-base';
  }
};

// Common typography combinations
export const textStyles = {
  heroTitle: `${getResponsiveText('h1')} ${typography.weights.bold} ${typography.lineHeight.tight}`,
  heroSubtitle: `${getResponsiveText('body-large')} ${typography.weights.normal} ${typography.lineHeight.normal}`,
  sectionTitle: `${getResponsiveText('h2')} ${typography.weights.bold} ${typography.lineHeight.tight}`,
  cardTitle: `${getResponsiveText('h3')} ${typography.weights.semibold} ${typography.lineHeight.tight}`,
  bodyText: `${getResponsiveText('body-normal')} ${typography.weights.normal} ${typography.lineHeight.relaxed}`,
  button: `${getResponsiveText('button')} ${typography.weights.semibold}`,
  aiWord: `${getResponsiveText('ai-word')} ${typography.weights.bold}`,
} as const;