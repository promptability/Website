// Promptability AI Spacing & Layout System
// This file defines all spacing, padding, margins, and layout rules

export const spacing = {
  // Container Widths
  container: {
    sm: 'max-w-sm',      // 384px
    md: 'max-w-md',      // 448px
    lg: 'max-w-lg',      // 512px
    xl: 'max-w-xl',      // 576px
    '2xl': 'max-w-2xl',  // 672px
    '3xl': 'max-w-3xl',  // 768px
    '4xl': 'max-w-4xl',  // 896px
    '5xl': 'max-w-5xl',  // 1024px
    '6xl': 'max-w-6xl',  // 1152px
    '7xl': 'max-w-7xl',  // 1280px - Main container width
    full: 'max-w-full',
  },

  // Responsive Padding (Mobile-first)
  padding: {
    // Section padding
    section: {
      mobile: 'px-4 py-8',     // 16px horizontal, 32px vertical
      tablet: 'sm:px-6 sm:py-12', // 24px horizontal, 48px vertical
      desktop: 'lg:px-8 lg:py-16', // 32px horizontal, 64px vertical
      all: 'px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16'
    },

    // Container padding
    container: {
      mobile: 'px-4',
      tablet: 'sm:px-6', 
      desktop: 'lg:px-8',
      all: 'px-4 sm:px-6 lg:px-8'
    },

    // Card padding
    card: {
      small: 'p-4',       // 16px all around
      medium: 'p-6',      // 24px all around
      large: 'p-8',       // 32px all around
      responsive: 'p-4 sm:p-6 lg:p-8'
    },

    // Button padding
    button: {
      small: 'px-4 py-2',     // 16px horizontal, 8px vertical
      medium: 'px-6 py-3',    // 24px horizontal, 12px vertical (mobile)
      large: 'px-8 py-4',     // 32px horizontal, 16px vertical (desktop)
      responsive: 'px-6 sm:px-8 py-3 sm:py-4'
    }
  },

  // Margins
  margin: {
    // Section margins
    section: {
      bottom: 'mb-8 sm:mb-12 lg:mb-16',
      top: 'mt-8 sm:mt-12 lg:mt-16',
      vertical: 'my-8 sm:my-12 lg:my-16'
    },

    // Element margins
    element: {
      small: 'mb-4',      // 16px
      medium: 'mb-6',     // 24px
      large: 'mb-8',      // 32px
      responsive: 'mb-4 md:mb-6 lg:mb-8'
    },

    // Title margins
    title: {
      bottom: 'mb-4 md:mb-6', // Space after titles
      heroBottom: 'mb-6 md:mb-8', // Space after hero title
    }
  },

  // Gaps (for flexbox/grid)
  gap: {
    // Grid gaps
    grid: {
      small: 'gap-4',         // 16px
      medium: 'gap-6',        // 24px
      large: 'gap-8',         // 32px
      xl: 'gap-12',           // 48px
      responsive: 'gap-8 lg:gap-12' // Hero grid gap
    },

    // Flex gaps
    flex: {
      small: 'gap-2',         // 8px
      medium: 'gap-3 sm:gap-4', // 12px mobile, 16px desktop
      large: 'gap-4 sm:gap-6',  // 16px mobile, 24px desktop
    }
  },

  // Heights
  height: {
    screen: 'min-h-screen',   // Full viewport height
    hero: 'min-h-screen',     // Hero section height
    section: 'min-h-[400px]', // Minimum section height
  }
} as const;

// Layout utility functions
export const getResponsivePadding = (type: 'section' | 'container' | 'card' | 'button') => {
  switch (type) {
    case 'section':
      return spacing.padding.section.all;
    case 'container':
      return spacing.padding.container.all;
    case 'card':
      return spacing.padding.card.responsive;
    case 'button':
      return spacing.padding.button.responsive;
    default:
      return 'p-4';
  }
};

export const getResponsiveMargin = (type: 'section' | 'element' | 'title' | 'hero-title') => {
  switch (type) {
    case 'section':
      return spacing.margin.section.bottom;
    case 'element':
      return spacing.margin.element.responsive;
    case 'title':
      return spacing.margin.title.bottom;
    case 'hero-title':
      return spacing.margin.title.heroBottom;
    default:
      return 'mb-4';
  }
};

// Common layout patterns
export const layouts = {
  // Main page container
  pageContainer: `${spacing.container['7xl']} mx-auto ${spacing.padding.container.all}`,
  
  // Hero section layout
  heroSection: `relative ${spacing.height.hero} flex items-center justify-center overflow-hidden -mt-32 pt-16 md:pt-0`,
  
  // Hero grid
  heroGrid: `grid lg:grid-cols-2 ${spacing.gap.grid.responsive} items-center`,
  
  // Section layout
  section: `${spacing.padding.section.all} ${spacing.margin.section.bottom}`,
  
  // Card layout
  card: `${spacing.padding.card.responsive} rounded-lg`,
  
  // Button layout
  buttonPrimary: `${spacing.padding.button.responsive} rounded-lg flex items-center justify-center`,
  
  // Flex layouts
  flexColumn: `flex flex-col`,
  flexRow: `flex flex-col sm:flex-row`,
  flexCenter: `flex items-center justify-center`,
} as const;