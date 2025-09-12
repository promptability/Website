# Promptability AI Design System

This design system contains all the brand colors, typography, spacing, and visual effects for the Promptability AI application. Use these tokens consistently across all components to maintain design consistency.

## 📁 File Structure

```
src/design-system/
├── colors.ts       # All brand colors and gradients
├── typography.ts   # Font sizes, weights, and text styles
├── spacing.ts      # Padding, margins, gaps, and layouts
├── effects.ts      # Shadows, borders, glass effects, animations
├── index.ts        # Main export file with utilities
└── README.md       # This documentation
```

## 🎨 Colors

### Primary Brand Colors
- **Blue**: `#60a5fa` - Main brand color for buttons, links
- **Purple**: `#c084fc` - For the "Power" word and accents
- **Cyan**: `#22d3ee` - For the "Full" word and highlights

### Usage
```typescript
import { colors, getGradientText } from '@/design-system';

// Use brand colors
className="text-blue-400"  // colors.primary.blue[400]

// Use gradient text
className={getGradientText('blue-cyan')}  // For "Full" word
className={getGradientText('purple-blue')} // For "AI" word
```

## ✏️ Typography

### Responsive Text Sizes
- **Hero Title**: `text-3xl` → `text-7xl` (mobile to desktop)
- **AI Word**: `text-4xl` → `text-8xl` (special scaling)
- **Body Text**: `text-base` → `text-xl` (responsive)

### Usage
```typescript
import { getResponsiveText, textStyles } from '@/design-system';

// Get responsive classes
className={getResponsiveText('h1')}  // Full responsive heading

// Use predefined styles
className={textStyles.heroTitle}     // Complete hero title styling
className={textStyles.aiWord}        // Special AI word styling
```

## 📏 Spacing & Layout

### Container Widths
- **Main Container**: `max-w-7xl` (1280px)
- **Page Padding**: `px-4 sm:px-6 lg:px-8` (responsive)

### Section Spacing
- **Vertical Padding**: `py-8 sm:py-12 lg:py-16`
- **Bottom Margin**: `mb-8 sm:mb-12 lg:mb-16`

### Usage
```typescript
import { layouts, getResponsivePadding } from '@/design-system';

// Use layout presets
className={layouts.pageContainer}   // Main page container
className={layouts.heroSection}    // Hero section layout

// Get responsive padding
className={getResponsivePadding('section')}  // Section padding
```

## ✨ Effects & Animations

### Glass Morphism
- **Light Glass**: `bg-white/10 backdrop-blur-sm`
- **Card Glass**: `bg-white/10 backdrop-blur-sm border border-white/20`

### Shadows & Borders
- **Button Shadow**: `shadow border border-blue-200`
- **Card Border**: `border border-white/20`

### Usage
```typescript
import { getGlassEffect, effectCombinations } from '@/design-system';

// Use glass effects
className={getGlassEffect('card')}  // Glass card effect

// Use combinations
className={effectCombinations.primaryButton}   // Complete button styling
className={effectCombinations.glassCard}       // Complete card styling
```

## 🚀 Quick Start Examples

### Hero Component
```typescript
import { designTokens, getGradientText } from '@/design-system';

// Hero container
<section className={designTokens.hero.container}>
  
  // Page container
  <div className={designTokens.components.pageContainer}>
    
    // Hero grid
    <div className={designTokens.hero.grid}>
      
      // Hero title
      <h1 className={designTokens.hero.title}>
        Use The Full 
        <span className={getGradientText('blue-cyan')}>Power</span> 
        Of 
        <span className={designTokens.hero.aiWord}>AI</span>
      </h1>
      
      // Buttons
      <a className={designTokens.hero.buttonPrimary}>Primary Button</a>
      <a className={designTokens.hero.buttonSecondary}>Secondary Button</a>
    </div>
  </div>
</section>
```

### Card Component
```typescript
import { designTokens } from '@/design-system';

<div className={designTokens.card.container}>
  <h3 className={designTokens.card.title}>Card Title</h3>
  <p className={designTokens.card.text}>Card content text</p>
</div>
```

## 🎯 Word-Specific Styling

### Hero Words
- **"Use", "The", "Of"**: `text-white`
- **"Full"**: Blue-to-cyan gradient
- **"Power"**: `text-purple-400`
- **"AI"**: Purple-to-blue gradient with special sizing

```typescript
const wordStyles = {
  "Use": "text-white",
  "The": "text-white", 
  "Full": getGradientText('blue-cyan'),
  "Power": "text-purple-400",
  "Of": "text-white",
  "AI": `${getGradientText('purple-blue')} ${textStyles.aiWord}`
};
```

## 📱 Mobile Responsiveness

All design tokens are mobile-first and responsive:

- **Text**: Scales from mobile to desktop automatically
- **Spacing**: Responsive padding and margins
- **Buttons**: Smaller on mobile, larger on desktop
- **Containers**: Fluid with max-widths

## 🔄 Usage Rules

1. **Always import from design system**: Don't hardcode values
2. **Use predefined combinations**: `effectCombinations`, `textStyles`, `layouts`
3. **Follow mobile-first approach**: All tokens are responsive
4. **Maintain consistency**: Use the same tokens across similar components
5. **Document new additions**: Add new tokens to appropriate files

## 📖 Examples in Components

See these files for real-world usage:
- `/src/app/components/Hero.tsx` - Hero section implementation
- `/src/components/ui/` - UI component examples

---

**Need to add new design tokens?** 
1. Add to the appropriate file (`colors.ts`, `typography.ts`, etc.)
2. Export from `index.ts`
3. Update this README with usage examples
4. Update existing components to use the new tokens