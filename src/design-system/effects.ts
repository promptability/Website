// Promptability AI Effects & Animations System
// This file defines all visual effects, shadows, borders, and animation rules

export const effects = {
  // Glass Morphism Effects
  glass: {
    light: 'bg-white/10 backdrop-blur-sm',
    medium: 'bg-white/15 backdrop-blur-md', 
    strong: 'bg-white/20 backdrop-blur-lg',
    card: 'bg-white/10 backdrop-blur-sm border border-white/20',
    button: 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20',
  },

  // Borders
  borders: {
    light: 'border border-white/10',
    medium: 'border border-white/20',
    strong: 'border border-white/30',
    blue: 'border border-blue-300',
    gradient: 'border-2 border-white/20', // For special containers
  },

  // Shadows
  shadows: {
    sm: 'shadow-sm',
    default: 'shadow',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
    glow: 'shadow-2xl', // For glowing elements
    button: 'shadow border border-blue-200', // For primary buttons
  },

  // Gradients
  gradients: {
    background: {
      blueGlow: 'bg-gradient-to-r from-blue-500/30 via-cyan-500/20 to-purple-500/30 rounded-3xl blur-3xl',
      cardGlow: 'bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-purple-500/20 blur-xl',
    },
    text: {
      blueCyan: 'bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent',
      purpleBlue: 'bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent',
    },
    border: {
      rotating: 'bg-gradient-to-r from-transparent via-white/20 to-transparent',
    }
  },

  // Blur Effects
  blur: {
    sm: 'blur-sm',
    default: 'blur',
    md: 'blur-md',
    lg: 'blur-lg',
    xl: 'blur-xl',
    '2xl': 'blur-2xl',
    '3xl': 'blur-3xl', // For background glows
  },

  // Rounded Corners
  rounded: {
    sm: 'rounded-sm',
    default: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',  // Standard for buttons and cards
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl', // For images and special containers
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  },

  // Opacity Levels
  opacity: {
    light: 'opacity-30',
    medium: 'opacity-50',
    strong: 'opacity-70',
    glass: 'opacity-[0.3]', // For grid background
  },

  // Transforms
  transforms: {
    scale: {
      hover: 'hover:scale-105',
      tap: 'active:scale-95',
      large: 'scale-110', // For background elements
    },
    rotate: {
      slow: 'animate-spin', // For rotating borders
    }
  },

  // Filter Effects
  filters: {
    brightness: 'brightness-110 contrast-110 saturate-110',
    enhanced: 'brightness-110 contrast-110 saturate-110',
    glow: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))',
    combined: 'brightness-110 contrast-110 saturate-110 drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))',
  }
} as const;

// Animation Presets
export const animations = {
  // Hover animations
  hover: {
    scale: 'transition-transform hover:scale-105',
    glow: 'transition-all hover:shadow-xl',
    lift: 'transition-all hover:-translate-y-1 hover:shadow-lg',
    button: 'transition-colors hover:bg-white/20',
  },

  // Loading animations
  loading: {
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    bounce: 'animate-bounce',
  },

  // Background animations
  background: {
    spotlight: 'animate-spotlight',
    pulse: 'animate-pulse',
  },

  // Floating elements
  floating: {
    slow: 'animate-[float_6s_ease-in-out_infinite]',
    medium: 'animate-[float_4s_ease-in-out_infinite]',
    fast: 'animate-[float_2s_ease-in-out_infinite]',
  },

  // Scroll indicator
  scroll: {
    bounce: 'animate-[bounce_2s_infinite]',
  }
} as const;

// Background Patterns
export const patterns = {
  // Grid pattern for backgrounds
  grid: {
    className: 'absolute inset-0 opacity-[0.3]',
    style: {
      backgroundImage: "linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)",
      backgroundSize: "40px 40px",
    }
  },
} as const;

// Effect utility functions
export const getGlassEffect = (intensity: 'light' | 'medium' | 'strong' | 'card' | 'button') => {
  return effects.glass[intensity];
};

export const getBorderEffect = (type: 'light' | 'medium' | 'strong' | 'blue' | 'gradient') => {
  return effects.borders[type];
};

export const getGradientText = (type: 'blue-cyan' | 'purple-blue') => {
  return type === 'blue-cyan' ? effects.gradients.text.blueCyan : effects.gradients.text.purpleBlue;
};

// Common effect combinations
export const effectCombinations = {
  // Primary button effect
  primaryButton: `bg-blue-100 hover:bg-blue-200 text-slate-900 font-semibold ${effects.rounded.lg} ${effects.shadows.button} transition-colors`,
  
  // Secondary button effect
  secondaryButton: `${effects.glass.button} text-white font-semibold ${effects.rounded.lg} transition-colors`,
  
  // Glass card effect
  glassCard: `${effects.glass.card} ${effects.rounded.lg} ${effects.shadows.lg}`,
  
  // Hero image container
  heroImage: `relative ${effects.rounded['2xl']} overflow-hidden ${effects.borders.gradient} ${effects.shadows['2xl']}`,
  
  // Floating particle
  floatingParticle: `absolute bg-blue-400 ${effects.rounded.full} ${effects.blur.sm}`,
  
  // Background glow
  backgroundGlow: `absolute inset-0 ${effects.gradients.background.blueGlow} ${animations.background.pulse}`,
} as const;