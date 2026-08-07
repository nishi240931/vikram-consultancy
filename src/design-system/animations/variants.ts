export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  cardHover: {
    rest: { y: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" },
    hover: {
      y: -6,
      boxShadow: "0 16px 40px rgba(10, 25, 47, 0.12), 0 0 20px rgba(212, 175, 55, 0.2)",
      transition: { duration: 0.25, ease: "easeInOut" },
    },
  },
  goldPulse: {
    scale: [1, 1.03, 1],
    boxShadow: [
      "0 0 0px rgba(212, 175, 55, 0)",
      "0 0 20px rgba(212, 175, 55, 0.4)",
      "0 0 0px rgba(212, 175, 55, 0)",
    ],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
} as const;
