---
name: High-Precision SaaS
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#41485e'
  on-tertiary: '#ffffff'
  tertiary-container: '#586076'
  on-tertiary-container: '#d4dbf5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  stack-xl: 64px
---

## Brand & Style
The design system is engineered for a premium SaaS experience that balances high-utility with an aspirational aesthetic. It targets professional mentors and growth-oriented users who value clarity, speed, and reliability. 

The visual style is **refined minimalism** with a **technical edge**. It draws inspiration from the "utility-luxe" movement—combining the structured efficiency of developer tools (like Linear and Vercel) with the approachable elegance of high-end consumer platforms. The interface relies on generous whitespace, precise grid alignment, and subtle motion to evoke an emotional response of calm confidence and professional momentum.

## Colors
This design system utilizes a high-clarity palette focused on an Indigo primary core. 

- **Primary & Action:** Indigo (#4F46E5) serves as the primary brand touchpoint for call-to-actions. 
- **Accents:** Emerald (#10B981) is used sparingly for growth indicators, secondary highlights, or positive data visualizations.
- **Neutrals:** A sophisticated range of Blue-Grays. Headings use a deep Navy-Slate (#0F172A) for maximum contrast, while body text uses a softer Slate (#64748B) to reduce eye strain during long reading sessions.
- **Status:** Standard semantic colors for success and danger are slightly desaturated to maintain the premium feel without appearing overly aggressive.

## Typography
The system relies exclusively on **Inter**, utilizing its variable weight capabilities to create a tight hierarchical structure. 

Large headings use tight letter-spacing and heavy weights to create a "locked-in" editorial look. Body text is optimized for legibility with increased line-height (1.6) and natural tracking. For small labels and metadata, the system employs medium to semi-bold weights to ensure visibility against varied backgrounds.

## Layout & Spacing
The layout philosophy follows a **fluid-to-fixed grid** model. 

- **Desktop:** A 12-column grid with a maximum width of 1280px. Gutters are fixed at 24px to maintain a breathable, structured feel.
- **Mobile:** A 4-column grid with 16px side margins. 
- **Rhythm:** Spacing follows an 8px base unit. Vertical stack spacing is intentionally generous (32px to 64px between sections) to reinforce the minimal, premium brand positioning.
- **Safe Areas:** Content should be inset with "optical margins"—ensuring that even in compact views, the interface never feels crowded.

## Elevation & Depth
This design system uses a combination of **low-contrast outlines** and **ambient shadows** to create a multi-layered workspace.

1.  **The Base Layer:** The primary background (#FFFFFF) is flat.
2.  **The Container Layer:** Cards and sections use a thin 1px border (#E5E7EB).
3.  **The Elevated Layer:** Interactive elements and cards use a very soft, multi-stop shadow (e.g., `0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)`).
4.  **The Glass Layer:** Navigation bars and floating overlays use a backdrop filter (Blur: 12px) with a semi-transparent white tint (80% opacity) to maintain context of the content underneath.

## Shapes
The shape language is defined by high-radius geometry. 

- **Containers & Cards:** Use a significant radius (20px to 24px) to create a soft, approachable frame for content.
- **Interactive Elements:** Buttons and input fields use a slightly tighter "rounded-xl" (12px) radius to differentiate them as actionable items while remaining cohesive with the larger containers.
- **Icons:** Should follow a 2px stroke width with rounded caps and joins to match the UI's curvature.

## Components

### Buttons
Primary buttons use the Indigo fill with white text. They feature a subtle inner shadow for a tactile feel and a hover transition that deepens the background color (#4338CA) and lifts the element slightly (1px translateY).

### Cards
Cards are the primary organizational unit. They feature a 20px-24px corner radius, a 1px border (#E5E7EB), and a subtle ambient shadow. On hover, the shadow should deepen, and the card should lift 4px to signal interactivity.

### Navigation (Navbar)
The navbar is a glassmorphic element. It stays pinned to the top with a `backdrop-filter: blur(12px)` and a thin bottom border. Links use `label-md` typography with a subtle color shift to the primary indigo on hover.

### Input Fields
Inputs should have a 12px radius and a light gray background (#F8FAFC) when inactive, shifting to a white background with an Indigo border and a soft indigo glow (ring) on focus.

### Chips & Badges
Small, pill-shaped elements with 100px radius. Use low-saturation background tints (e.g., Emerald at 10% opacity) with high-saturation text for high-end status indicators.

### Progress Indicators
Thin 4px tracks with rounded ends. Use the primary Indigo or Accent Emerald to show completion, maintaining the minimal aesthetic without bulky bars.