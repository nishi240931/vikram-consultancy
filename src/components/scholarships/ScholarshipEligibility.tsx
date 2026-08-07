import React from "react";
import { CheckCircle2, ShieldCheck, FileText, Award } from "lucide-react";
import { Card } from "@/design-system";

export interface ScholarshipEligibilityProps {
  eligibilityCriteria?: string | null;
  countryName: string;
}

export const ScholarshipEligibility: React.FC<ScholarshipEligibilityProps> = ({
  eligibilityCriteria,
  countryName,
}) => {
  return (
    <section id="eligibility" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-5">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
              Evaluation Criteria
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] font-['Outfit']">
              Scholarship <span className="text-[#C5A059]">Eligibility Standards</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {eligibilityCriteria ||
                `Applicants must demonstrate outstanding academic performance, leadership capability, and community involvement. Candidates applying for degree programs in ${countryName} are evaluated holistically.`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Academic Record (First Class / High GPA)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Valid Admission Offer Letter</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Statement of Purpose / Essay Submission</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Recommendation Letters (2-3 LORs)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card variant="glass" padding="lg" className="border-[#D4AF37]/30 shadow-xl flex flex-col gap-5">
              <h3 className="text-xl font-bold text-[#0B1B3D] font-['Outfit'] border-b border-slate-200 pb-3">
                Scholarship Application Support
              </h3>
              
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Essay & SOP Editing</span>
                  <span className="font-bold text-slate-800 text-sm">Tailored Scholarship Essay Guidance</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-[#D4AF37]" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Document Verification</span>
                  <span className="font-bold text-slate-800 text-sm">Complete Dossier Pre-Submission Audit</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#D4AF37]" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Interviews</span>
                  <span className="font-bold text-slate-800 text-sm">Mock Interview Preparation Sessions</span>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
};
