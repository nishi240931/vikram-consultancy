import React from "react";
import { Card } from "@/design-system";

export interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  borderAccent?: string;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  borderAccent = "border-l-4 border-l-[#D4AF37]",
}) => {
  return (
    <Card variant="flat" padding="md" className={`bg-white border border-slate-200 rounded-2xl ${borderAccent}`}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-slate-500 font-medium">{title}</span>
          <span className="text-2xl sm:text-3xl font-black text-[#0B1B3D] font-['Outfit'] mt-1">
            {typeof value === "number" ? value.toLocaleString() : value}
          </span>
          {change && (
            <span className={`text-[11px] font-bold mt-1 ${isPositive ? "text-emerald-600" : "text-rose-600"}`}>
              {isPositive ? "↑" : "↓"} {change} vs last month
            </span>
          )}
        </div>
        <div className="p-3 rounded-xl bg-slate-50">{icon}</div>
      </div>
    </Card>
  );
};
