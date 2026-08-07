import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/design-system/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        brand: {
          navy: {
            dark: "var(--brand-navy-dark, #0A192F)",
            main: "var(--brand-navy-main, #0B1B3D)",
            light: "var(--brand-navy-light, #162C5B)",
            surface: "var(--brand-navy-surface, #1E3A75)",
          },
          gold: {
            primary: "var(--brand-gold-primary, #D4AF37)",
            warm: "var(--brand-gold-warm, #C5A059)",
            light: "var(--brand-gold-light, #F4E8C1)",
            glow: "rgba(212, 175, 55, 0.3)",
          },
          alabaster: "#FAF9F5",
        },
        border: "hsl(var(--border, 214.3 31.8% 91.4%))",
        input: "hsl(var(--input, 214.3 31.8% 91.4%))",
        ring: "hsl(var(--ring, 43 65% 52%))",
        background: "hsl(var(--background, 40 20% 97%))",
        foreground: "hsl(var(--foreground, 222.2 84% 4.9%))",
        primary: {
          DEFAULT: "#0B1B3D",
          foreground: "#D4AF37",
        },
        secondary: {
          DEFAULT: "#D4AF37",
          foreground: "#0A192F",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 84.2% 60.2%))",
          foreground: "hsl(var(--destructive-foreground, 210 40% 98%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 210 40% 96.1%))",
          foreground: "hsl(var(--muted-foreground, 215.4 16.3% 46.9%))",
        },
        accent: {
          DEFAULT: "#F4E8C1",
          foreground: "#0B1B3D",
        },
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "Outfit", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
        secondary: ["var(--font-jakarta)", "Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius, 0.75rem)",
        md: "calc(var(--radius, 0.75rem) - 2px)",
        sm: "calc(var(--radius, 0.75rem) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "gold-shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gold-shimmer": "gold-shimmer 3s infinite linear",
      },
    },
  },
  plugins: [],
};

export default config;
