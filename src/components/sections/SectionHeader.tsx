import React from "react";
import { Badge } from "@/design-system";

export interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlightText?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  highlightText,
  subtitle,
  align = "center",
  className = "",
}) => {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div className={`flex flex-col gap-3 max-w-3xl ${alignStyles[align]} ${className}`}>
      {badge && (
        <Badge variant="gold" size="md">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0B1B3D]">
        {title}{" "}
        {highlightText && (
          <span className="bg-gradient-to-r from-[#D4AF37] to-[#C5A059] bg-clip-text text-transparent">
            {highlightText}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
};
