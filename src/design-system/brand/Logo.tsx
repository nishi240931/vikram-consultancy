import React from "react";

export interface LogoProps {
  variant?: "full" | "emblem" | "textOnly";
  theme?: "dark" | "light";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "full",
  theme = "dark",
  size = "md",
  className = "",
}) => {
  const sizeMap = {
    sm: { icon: 36, title: "text-lg", subtitle: "text-[10px]" },
    md: { icon: 48, title: "text-xl", subtitle: "text-xs" },
    lg: { icon: 64, title: "text-2xl", subtitle: "text-sm" },
    xl: { icon: 84, title: "text-4xl", subtitle: "text-base" },
  };

  const currentSize = sizeMap[size];

  const EmblemSVG = (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Outer Circle Ring */}
      <circle cx="50" cy="50" r="44" stroke="#D4AF37" strokeWidth="2.5" />

      {/* Guiding Star on Top */}
      <path
        d="M50 8 L53 18 L63 21 L53 24 L50 34 L47 24 L37 21 L47 18 Z"
        fill="#D4AF37"
      />

      {/* Globe Grid Lines */}
      <ellipse cx="50" cy="54" rx="36" ry="18" stroke="#0B1B3D" strokeWidth="1.2" strokeDasharray="3 2" />
      <path d="M50 20 V88" stroke="#0B1B3D" strokeWidth="1" strokeDasharray="3 2" />
      <path d="M16 54 H84" stroke="#0B1B3D" strokeWidth="1" strokeDasharray="3 2" />

      {/* Eagle Outstretched Wings */}
      <path
        d="M20 48 C 28 32, 40 34, 50 44 C 60 34, 72 32, 80 48 C 70 52, 62 44, 50 56 C 38 44, 30 52, 20 48 Z"
        fill="#0B1B3D"
        stroke="#D4AF37"
        strokeWidth="1.5"
      />
      <path
        d="M24 58 C 34 46, 42 48, 50 58 C 58 48, 66 46, 76 58 C 68 62, 58 54, 50 66 C 42 54, 32 62, 24 58 Z"
        fill="#D4AF37"
        opacity="0.9"
      />

      {/* Graduation Mortarboard Cap */}
      <polygon points="50,30 68,37 50,44 32,37" fill="#0A192F" stroke="#D4AF37" strokeWidth="1.2" />
      <rect x="46" y="42" width="8" height="6" fill="#0A192F" />
      <path d="M64 38 V48" stroke="#D4AF37" strokeWidth="1.5" />
      <circle cx="64" cy="49" r="1.5" fill="#D4AF37" />
    </svg>
  );

  if (variant === "emblem") {
    return <div className={`inline-flex items-center ${className}`}>{EmblemSVG}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {variant !== "textOnly" && EmblemSVG}
      <div className="flex flex-col leading-none">
        <span
          className={`font-black tracking-wider uppercase font-['Outfit'] ${
            currentSize.title
          } ${theme === "dark" ? "text-white" : "text-[#0B1B3D]"}`}
        >
          VIKRAM
        </span>
        <span
          className={`font-bold tracking-[0.25em] uppercase text-[#D4AF37] ${currentSize.subtitle}`}
        >
          EDU CONSULTANTS
        </span>
      </div>
    </div>
  );
};
