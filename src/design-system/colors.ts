// Promptability AI Brand Colors
// This file defines all colors used across the application

export const colors = {
  // Primary Brand Colors
  primary: {
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',  // Main blue - used for buttons, links
      500: '#3b82f6',  // Primary blue
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    purple: {
      300: '#d8b4fe',
      400: '#c084fc',  // Used for "Power" word and gradients
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
    },
    cyan: {
      300: '#67e8f9',
      400: '#22d3ee',  // Used for "Full" word and gradients
      500: '#06b6d4',
    }
  },

  // Background Colors
  background: {
    primary: '#0a0a0a',        // Main dark background
    secondary: '#1a1a1a',      // Slightly lighter for cards
    glass: 'rgba(255, 255, 255, 0.1)',  // Glass morphism
    glassBorder: 'rgba(255, 255, 255, 0.2)',
    gradient: {
      blue: 'linear-gradient(to right, #60a5fa, #22d3ee)',  // Blue to cyan
      purple: 'linear-gradient(to right, #c084fc, #60a5fa)', // Purple to blue
      purpleBlue: 'linear-gradient(to right, #c084fc, #60a5fa)',
    }
  },

  // Text Colors
  text: {
    primary: '#ffffff',        // Main white text
    secondary: '#d1d5db',      // Gray-300 for secondary text
    muted: '#9ca3af',          // Gray-400 for muted text
    accent: '#60a5fa',         // Blue for links/accents
    dark: '#0f172a',           // For light backgrounds (slate-900)
  },

  // Status Colors
  status: {
    success: '#10b981',        // Green
    warning: '#f59e0b',        // Amber
    error: '#ef4444',          // Red
    info: '#3b82f6',           // Blue
  },

  // Interactive Colors
  interactive: {
    button: {
      primary: '#f3f4f6',      // Light gray (blue-100 equivalent)
      primaryHover: '#e5e7eb',  // Darker on hover
      secondary: 'rgba(255, 255, 255, 0.1)',
      secondaryHover: 'rgba(255, 255, 255, 0.2)',
    },
    border: {
      light: 'rgba(255, 255, 255, 0.2)',
      lighter: 'rgba(255, 255, 255, 0.1)',
      blue: '#93c5fd',         // Blue-300
    }
  },

  // Effect Colors (for glows, shadows, etc.)
  effects: {
    glow: {
      blue: 'rgba(59, 130, 246, 0.3)',
      purple: 'rgba(192, 132, 252, 0.3)',
      cyan: 'rgba(34, 211, 238, 0.2)',
    },
    shadow: {
      default: 'rgba(0, 0, 0, 0.25)',
      strong: 'rgba(0, 0, 0, 0.5)',
    }
  }
} as const;

// Color utility functions
export const getGradientText = (type: 'blue-cyan' | 'purple-blue' | 'ai-special') => {
  switch (type) {
    case 'blue-cyan':
      return 'bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent';
    case 'purple-blue':
      return 'bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent';
    case 'ai-special':
      return 'bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent';
    default:
      return 'text-white';
  }
};

// Common color combinations
export const colorCombinations = {
  heroButton: {
    primary: 'bg-blue-100 hover:bg-blue-200 text-slate-900 border-blue-200',
    secondary: 'bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20',
  },
  card: {
    glass: 'bg-white/10 backdrop-blur-sm border-white/20',
    solid: 'bg-gray-900 border-gray-800',
  }
} as const;