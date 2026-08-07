import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass" | "gold";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs font-semibold gap-1.5",
    md: "px-4 py-2 text-sm font-semibold gap-2",
    lg: "px-6 py-3 text-base font-bold gap-2.5",
    xl: "px-8 py-4 text-lg font-bold gap-3 rounded-xl",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A192F] shadow-md hover:shadow-lg hover:brightness-105 border border-amber-300/40",
    gold: "bg-[#D4AF37] text-[#0A192F] hover:bg-[#C5A059] font-bold shadow-md",
    secondary:
      "bg-[#0B1B3D] text-white hover:bg-[#162C5B] border border-slate-700/50 shadow-md",
    outline:
      "bg-transparent text-[#0B1B3D] border-2 border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#C5A059]",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]",
    glass:
      "bg-white/80 backdrop-blur-md text-[#0B1B3D] border border-[#D4AF37]/30 hover:bg-white hover:border-[#D4AF37] shadow-sm",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
