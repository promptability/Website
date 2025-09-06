import { Variants } from 'framer-motion';

// Premium easing curves
const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;
const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
const EASE_IN_OUT_CUBIC = [0.4, 0, 0.2, 1] as const;

// Word-by-word text animation
export const wordAnimation: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    rotateX: -90,
  },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT_EXPO,
    },
  },
};

// Liquid button hover effect
export const liquidButton: Variants = {
  initial: {
    scale: 1,
    background: 'linear-gradient(135deg, #0066FF 0%, #00BBFF 100%)',
  },
  hover: {
    scale: 1.02,
    background: [
      'linear-gradient(135deg, #0066FF 0%, #00BBFF 100%)',
      'linear-gradient(135deg, #00BBFF 0%, #0066FF 100%)',
      'linear-gradient(135deg, #0066FF 0%, #00BBFF 100%)',
    ],
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
      background: {
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  },
  tap: {
    scale: 0.98,
  },
};

// 3D card tilt effect
export const cardTilt: Variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  },
  hover: {
    rotateX: 5,
    rotateY: 10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: EASE_OUT_QUART,
    },
  },
};

// Glassmorphism card
export const glassCard: Variants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: EASE_OUT_EXPO,
    },
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.2,
      ease: EASE_OUT_QUART,
    },
  },
};

// Floating 3D Chrome extension
export const chromeFloat: Variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
    y: 0,
  },
  animate: {
    rotateY: [0, 360],
    y: [-10, 10, -10],
    transition: {
      rotateY: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      },
      y: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
};

// Animated counter
export const counterAnimation: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: EASE_OUT_EXPO,
    },
  },
};

// Circular progress animation
export const circularProgress: Variants = {
  initial: {
    pathLength: 0,
    opacity: 0,
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 2,
        ease: EASE_OUT_EXPO,
      },
      opacity: {
        duration: 0.3,
      },
    },
  },
};

// Stagger container with premium timing
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Fade in up with premium easing
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE_OUT_EXPO,
    },
  },
};

// Scale in with bounce
export const scaleInBounce: Variants = {
  initial: {
    opacity: 0,
    scale: 0.3,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.68, -0.55, 0.265, 1.55],
    },
  },
};

// Ripple effect
export const rippleEffect: Variants = {
  initial: {
    scale: 0,
    opacity: 1,
  },
  animate: {
    scale: 4,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT_QUART,
    },
  },
};

// Skeleton loading
export const skeletonPulse: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: [1, 0.5, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Success animation
export const successCheck: Variants = {
  initial: {
    pathLength: 0,
    opacity: 0,
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 0.5,
        ease: EASE_OUT_EXPO,
      },
      opacity: {
        duration: 0.2,
      },
    },
  },
};

// Particle animation
export const particleFloat: Variants = {
  initial: {
    y: 0,
    x: 0,
    opacity: 0,
  },
  animate: {
    y: [-20, -40, -20],
    x: [-10, 10, -10],
    opacity: [0, 1, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Gradient mesh animation
export const gradientMesh: Variants = {
  initial: {
    background: 'radial-gradient(circle at 20% 50%, #0066FF 0%, transparent 50%)',
  },
  animate: {
    background: [
      'radial-gradient(circle at 20% 50%, #0066FF 0%, transparent 50%)',
      'radial-gradient(circle at 80% 20%, #00BBFF 0%, transparent 50%)',
      'radial-gradient(circle at 40% 80%, #0066FF 0%, transparent 50%)',
      'radial-gradient(circle at 20% 50%, #0066FF 0%, transparent 50%)',
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Button hover animation
export const buttonHover: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: EASE_OUT_QUART,
    },
  },
  tap: {
    scale: 0.95,
  },
};
