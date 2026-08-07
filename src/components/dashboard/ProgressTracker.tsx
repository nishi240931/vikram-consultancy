import React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { Card, Badge } from "@/design-system";

export interface ProgressTrackerProps {
  percentage: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ percentage }) => {
  const steps = [
    { label: "Profile Completion", completed: true },
    { label: "Document Verification", completed: true },
    { label: "University Shortlist", completed: true },
    { label: "Application Submission", completed: true },
    { label: "Visa Processing", completed: false },
    { label: "Pre-Departure", completed: false },
  ];

  return (
    <Card variant="dark" padding="lg" className="bg-gradient-to-r from-[#0A192F] via-[#0B1B3D] to-[#162C5B] text-white border-2 border-[#D4AF37]/40 shadow-xl rounded-3xl">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="gold" size="sm">
              Study Abroad Roadmap
            </Badge>
            <span className="text-xs text-slate-300 font-semibold">{percentage}% Completed</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">Target: Fall 2025</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden border border-white/10">
          <div
            className="bg-gradient-to-r from-[#D4AF37] to-[#F4E8C1] h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2">
          {steps.map((s, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-xs">
              {s.completed ? (
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-slate-500 flex-shrink-0" />
              )}
              <span className={s.completed ? "font-bold text-white" : "text-slate-400"}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
