export const BRAND_COLORS = {
  navy: {
    dark: "#0A192F",       // Deep Obsidian Navy - Header/Footer/Primary Text
    main: "#0B1B3D",       // Imperial Royal Navy - Hero Backgrounds & Core Accents
    light: "#162C5B",      // Light Royal Navy - Cards in Dark Mode
    surface: "#1E3A75",    // Hover state for Navy Elements
  },
  gold: {
    primary: "#D4AF37",    // Metallic Trophy Gold - Primary CTA & Highlights
    warm: "#C5A059",       // Royal Gold - Secondary Accent & Borders
    light: "#F4E8C1",      // Soft Gold Tint - Pill Backgrounds
    glow: "rgba(212, 175, 55, 0.3)", // Ambient Gold Glow
  },
  neutral: {
    alabaster: "#FAF9F5",  // Warm Alabaster Parchment - Canvas Background
    surface: "#FFFFFF",    // Card Surface
    slateDark: "#1E293B",  // Body Text
    slateMuted: "#64748B", // Muted Copy
    border: "#E2E8F0",     // Border Lines
    divider: "#F1F5F9",    // Dividers
  },
  feedback: {
    success: "#10B981",    // Visa Approved / Offer Received
    warning: "#F59E0B",    // Application Pending / Info Needed
    error: "#EF4444",      // Action Required / Deadline Passed
    info: "#3B82F6",       // General Notification
  },
  gradients: {
    goldGradient: "linear-gradient(135deg, #D4AF37 0%, #C5A059 100%)",
    navyGradient: "linear-gradient(135deg, #0A192F 0%, #0B1B3D 100%)",
    heroOverlay: "linear-gradient(180deg, rgba(10, 25, 47, 0.95) 0%, rgba(11, 27, 61, 0.98) 100%)",
    goldGlowCard: "linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(197, 160, 89, 0.02) 100%)",
  },
} as const;

export type BrandColors = typeof BRAND_COLORS;
