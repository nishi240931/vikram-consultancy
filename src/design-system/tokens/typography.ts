export const TYPOGRAPHY = {
  fontFamily: {
    heading: "'Outfit', 'Plus Jakarta Sans', sans-serif",
    body: "'Inter', system-ui, sans-serif",
    brand: "'Outfit', sans-serif",
  },
  fontSize: {
    xs: "0.75rem",    // 12px
    sm: "0.875rem",   // 14px
    md: "1rem",       // 16px
    lg: "1.125rem",   // 18px
    xl: "1.25rem",    // 20px
    "2xl": "1.5rem",   // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem",  // 36px
    "5xl": "3rem",     // 48px
    "6xl": "3.75rem",  // 60px
    "7xl": "4.5rem",   // 72px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    tight: 1.15,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.625,
  },
  letterSpacing: {
    tight: "-0.02em",
    normal: "0em",
    wide: "0.05em",
    widest: "0.15em",
  },
} as const;

export type Typography = typeof TYPOGRAPHY;
