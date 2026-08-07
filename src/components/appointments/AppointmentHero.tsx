import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { Badge } from "@/design-system";

export const AppointmentHero: React.FC = () => {
  return (
    <section className="relative bg-[#0A192F] text-white pt-12 pb-16 overflow-hidden border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center gap-4">
        <Badge variant="gold" size="md">
          <Sparkles className="w-3.5 h-3.5 mr-1" /> Free 1-on-1 Overseas Education Session
        </Badge>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Outfit'] tracking-tight max-w-4xl leading-tight">
          Book Your Free{" "}
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4E8C1] to-[#C5A059] bg-clip-text text-transparent">
            Study Abroad Consultation
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
          Schedule a personalized 30-minute virtual session with senior overseas education advisors at Vikram Edu Consultants.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> 100% Free Consultation
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Profile & Admit Audit
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> University & Scholarship Selection
          </span>
        </div>
      </div>
    </section>
  );
};
