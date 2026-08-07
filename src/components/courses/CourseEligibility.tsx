import React from "react";
import { CheckCircle2, Award, FileText, Globe2 } from "lucide-react";
import { Card } from "@/design-system";

export interface CourseEligibilityProps {
  minIeltsScore?: number | null;
  minGpa?: number | null;
  greRequired?: boolean;
  intakes: string[];
}

export const CourseEligibility: React.FC<CourseEligibilityProps> = ({
  minIeltsScore = 6.5,
  minGpa = 3.0,
  greRequired = false,
  intakes = ["Fall (Sept)", "Spring (Jan)"],
}) => {
  return (
    <section id="requirements" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-5">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
              Entry Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] font-['Outfit']">
              Admission Requirements & <span className="text-[#C5A059]">Eligibility Criteria</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Applicants must hold an accredited bachelor&apos;s or equivalent high-school diploma depending on degree level. 
              Our senior counsellors review your academic transcripts to verify course equivalency before submission.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Minimum GPA: {minGpa} / 4.0</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>IELTS Score: {minIeltsScore} (TOEFL / PTE Accepted)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>GRE / GMAT: {greRequired ? "Required" : "Not Required / Waived"}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Letters of Recommendation (2-3 LORs)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card variant="glass" padding="lg" className="border-[#D4AF37]/30 shadow-xl flex flex-col gap-5">
              <h3 className="text-xl font-bold text-[#0B1B3D] font-['Outfit'] border-b border-slate-200 pb-3">
                Intake Deadlines
              </h3>
              
              <div className="flex items-center gap-3">
                <Globe2 className="w-5 h-5 text-[#D4AF37]" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Available Intakes</span>
                  <span className="font-bold text-slate-800 text-sm">{intakes.join(", ")}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-[#D4AF37]" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Application Fee Waiver</span>
                  <span className="font-bold text-slate-800 text-sm">Available via Vikram Edu Referral</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#D4AF37]" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">SOP & LOR Editing</span>
                  <span className="font-bold text-slate-800 text-sm">100% Comprehensive Review</span>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
};
