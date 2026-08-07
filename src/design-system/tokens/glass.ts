export const GLASS_TOKENS = {
  light: {
    background: "rgba(255, 255, 255, 0.85)",
    backdropBlur: "blur(16px)",
    border: "1px solid rgba(212, 175, 55, 0.25)",
    boxShadow: "0 8px 32px 0 rgba(10, 25, 47, 0.08)",
  },
  dark: {
    background: "rgba(10, 25, 47, 0.85)",
    backdropBlur: "blur(20px)",
    border: "1px solid rgba(212, 175, 55, 0.35)",
    boxShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.4)",
  },
  goldGlow: {
    boxShadow: "0 0 25px rgba(212, 175, 55, 0.25), inset 0 0 15px rgba(212, 175, 55, 0.1)",
  },
} as const;

export type GlassTokens = typeof GLASS_TOKENS;
