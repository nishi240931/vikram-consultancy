import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "navy" | "success" | "warning" | "error" | "info" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "gold",
  size = "md",
  dot = false,
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full tracking-wide";

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs gap-1.5",
    md: "px-3.5 py-1 text-xs font-semibold gap-2",
  };

  const variantStyles = {
    gold: "bg-[#F4E8C1] text-[#0B1B3D] border border-[#D4AF37]/40",
    navy: "bg-[#0B1B3D] text-[#D4AF37] border border-slate-700",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    error: "bg-rose-50 text-rose-700 border border-rose-200",
    info: "bg-sky-50 text-sky-700 border border-sky-200",
    outline: "bg-transparent text-slate-700 border border-slate-300",
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            variant === "success"
              ? "bg-emerald-500"
              : variant === "warning"
              ? "bg-amber-500"
              : variant === "error"
              ? "bg-rose-500"
              : "bg-[#D4AF37]"
          }`}
        />
      )}
      {children}
    </span>
  );
};
