# Extracted Style System

We have analyzed specific artifacts from the `ui-vault` to derive a comprehensive design system. This system balances the high-impact marketing aesthetics of Stripe/Linear with the functional density of Ant Design.

**Source Artifacts:**

- `web/landing-pages/stripe-home-web-clean-fintech-medium.png` (Layout, Typography, Primary Colors)
- `web/auth/linear-login-web-dark-saas-airy.png` (Dark Mode, Radius, Spacing)
- `components/tables/ant-table-web-clean-focus.png` (Data Density, Component Structure)

---

## 1. Layout & Structure

The system follows a responsive, fluid container model typical of modern SaaS.

### Grid & Containers

- **Max Width**: `1200px` (Standard), `1440px` (Dashboard/Wide).
- **Grid**: 12-column grid.
  - **Gutter**: `24px` (Desktop), `16px` (Mobile).
  - **Margin**: `32px` (standard).
- **Sections**:
  - **Hero**: Full width background, centered or split (50/50) content.
  - **Feature Grid**: 3-column cards (Stripe style) or 33/66 bentos.
  - **Dashboard**: Sidebar (240px fixed) + Fluid Content Area.

### Reusable Component Patterns

Based on the screenshots, the following core components are identified:

- **Card**: The fundamental building block. Used for features, login forms, and dashboards.
  - _Style_: White background, subtle shadow (`box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)`), rounded corners.
- **Data Table**: High-density information display (Ant Design influence).
  - _Style_: Clean rows, defined headers, pill-shaped status tags.
- **Feature Block**: Icon + Title + Description + Link.
- **Auth Container**: Centered card on a muted/gradient background.

---

## 2. Design Tokens (JSON)

Top-level definitions for direct implementation in React/React Native themes.

```json
{
  "system": {
    "name": "Vault UI System",
    "base": "4px"
  },
  "spacing": {
    "description": "Base 4px scale",
    "xs": 4,
    "sm": 8,
    "md": 12,
    "lg": 16,
    "xl": 24,
    "2xl": 32,
    "3xl": 48,
    "4xl": 64,
    "section": 96
  },
  "radius": {
    "description": "Smooth rounded corners",
    "sm": 4,
    "md": 8,
    "lg": 12,
    "xl": 16,
    "full": 9999
  },
  "typography": {
    "fontFamily": "Inter, system-ui, -apple-system, sans-serif",
    "weights": {
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    },
    "scale": {
      "h1": { "size": 48, "lineHeight": 1.1, "tracking": "-0.02em" },
      "h2": { "size": 36, "lineHeight": 1.2, "tracking": "-0.02em" },
      "h3": { "size": 24, "lineHeight": 1.3, "tracking": "-0.01em" },
      "h4": { "size": 20, "lineHeight": 1.4, "tracking": "0em" },
      "body-lg": { "size": 18, "lineHeight": 1.6 },
      "body": { "size": 16, "lineHeight": 1.5 },
      "small": { "size": 14, "lineHeight": 1.5 },
      "caption": { "size": 12, "lineHeight": 1.4 }
    }
  },
  "colors": {
    "brand": {
      "primary": "#635BFF", // Stripe Blurple
      "accent": "#0A2540", // Deep Navy
      "highlight": "#00D4FF" // Cyan accent
    },
    "surface": {
      "base": "#FFFFFF",
      "subtle": "#F7F9FC", // Light Gray background
      "overlay": "#FFFFFF",
      "dark": "#1A1D21" // Linear Dark
    },
    "text": {
      "primary": "#1F2937", // Gray-900
      "secondary": "#4B5563", // Gray-600
      "tertiary": "#9CA3AF", // Gray-400
      "onBrand": "#FFFFFF"
    },
    "border": {
      "default": "#E5E7EB",
      "subtle": "#F3F4F6",
      "focus": "#635BFF"
    },
    "state": {
      "success": "#10B981", // Emerald
      "warning": "#F59E0B", // Amber
      "error": "#EF4444", // Red
      "info": "#3B82F6" // Blue
    }
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "brand": "0 4px 14px 0 rgba(99, 91, 255, 0.39)" // Colored glow
  },
  "density": "medium"
}
```

## 3. Implementation Guidelines

### React / Next.js

- Use **Tailwind CSS** or **CSS Modules** configured with these tokens.
- **Component Strategy**:
  - Build `Box`, `Stack`, and `Text` primitives first.
  - Compose `Card` and `Button` using the `brand` and `surface` tokens.
  - For `Tables`, follows the Ant Design density (padding `md` for cells) but use the `border.subtle` color.

### React Native

- Map `typography.scale` to scaling logic.
- Use `spacing` for visual margins/padding to ensure touch targets (min `44px` -> `spacing.3xl` + `sm` padding) are met.
