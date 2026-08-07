import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "flat" | "elevated" | "glass" | "goldBorder" | "dark";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "flat",
  padding = "md",
  hoverEffect = true,
  className = "",
  ...props
}) => {
  const baseStyles = "rounded-2xl transition-all duration-300 relative overflow-hidden";

  const paddingStyles = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const variantStyles = {
    flat: "bg-white border border-slate-200/80 shadow-sm",
    elevated: "bg-white border border-slate-100 shadow-xl shadow-slate-900/5",
    glass:
      "bg-white/80 backdrop-blur-md border border-[#D4AF37]/20 shadow-lg shadow-slate-900/5",
    goldBorder:
      "bg-white border-2 border-[#D4AF37] shadow-xl shadow-amber-500/10",
    dark: "bg-[#0A192F] text-white border border-slate-800 shadow-2xl",
  };

  const hoverStyles = hoverEffect
    ? "hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#D4AF37]/50"
    : "";

  return (
    <div
      className={`${baseStyles} ${paddingStyles[padding]} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
