import React from "react";
import { ShieldCheck, FileCheck, Clock, CheckCircle2 } from "lucide-react";
import { Card, Badge } from "@/design-system";

export interface CountryVisaInfoProps {
  countryName: string;
  postStudyWorkYears: number;
  visaSuccessRate: number;
}

export const CountryVisaInfo: React.FC<CountryVisaInfoProps> = ({
  countryName,
  postStudyWorkYears,
  visaSuccessRate,
}) => {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 flex flex-col gap-5">
            <Badge variant="gold" size="md" className="w-fit">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> {visaSuccessRate}% Approval Rate
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] font-['Outfit']">
              Student Visa Requirements for <span className="text-[#C5A059]">{countryName}</span>
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              Our expert visa immigration team guides you through every step of your student visa application for{" "}
              {countryName}, ensuring flawless documentation and thorough mock interview preparation.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <FileCheck className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 text-sm">Offer / Acceptance Letter</span>
                  <span className="text-xs text-slate-500">Unconditional admit letter from a recognized university.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <Clock className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 text-sm">Post-Study Work Permit</span>
                  <span className="text-xs text-slate-500">
                    Eligible for a {postStudyWorkYears}-year stay-back visa post-graduation.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 text-sm">Financial Proof & Health Insurance</span>
                  <span className="text-xs text-slate-500">Bank statements covering 1 year of tuition and living expenses.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Card variant="dark" padding="lg" className="border-2 border-[#D4AF37]/40 shadow-2xl text-white">
              <h3 className="text-xl font-bold font-['Outfit'] mb-4 text-[#D4AF37]">
                Why Vikram Edu Visa Services?
              </h3>
              <ul className="flex flex-col gap-3.5 text-sm text-slate-200">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>Personalized Document Checklist & Audit</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>Financial Statement & Blocked Account Setup</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>1-on-1 Simulated Embassy Mock Interviews</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>99.2% Industry-Leading First-Time Approval Rate</span>
                </li>
              </ul>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
};
