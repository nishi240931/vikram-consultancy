import React from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Card } from "@/design-system";

export interface UniversityOverviewProps {
  name: string;
  overview?: string | null;
  city: string;
}

export const UniversityOverview: React.FC<UniversityOverviewProps> = ({
  name,
  overview,
  city,
}) => {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
              Institutional Profile
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] font-['Outfit']">
              About <span className="text-[#C5A059]">{name}</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {overview ||
                `${name} is a world-class higher education institution situated in ${city}. It provides rigorous academic programs, groundbreaking research facilities, and robust international career support.`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Accredited Academic Degrees</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Global Alumni Network</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>State-of-the-Art Research Labs</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>International Scholarship Awards</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card variant="glass" padding="lg" className="border-[#D4AF37]/30 shadow-xl flex flex-col gap-5">
              <h3 className="text-xl font-bold text-[#0B1B3D] font-['Outfit'] border-b border-slate-200 pb-3">
                Admissions Guidance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applying to {name} requires careful preparation of transcripts, Statements of Purpose,
                and English proficiency scores. Our senior counsellors provide end-to-end guidance to maximize
                your admit chances.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B1B3D] bg-[#0B1B3D]/5 p-3 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>100% Application Submission Auditing</span>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
};
