import React from "react";
import { CheckCircle2, Globe, Building2, Landmark } from "lucide-react";
import { Card } from "@/design-system";

export interface CountryOverviewProps {
  countryName: string;
  currency: string;
  postStudyWorkYears: number;
}

export const CountryOverview: React.FC<CountryOverviewProps> = ({
  countryName,
  currency,
  postStudyWorkYears,
}) => {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-5">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
              Destination Insights
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] font-['Outfit']">
              Why Choose <span className="text-[#C5A059]">{countryName}</span> for Your Higher Education?
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {countryName} is internationally recognized for academic excellence, innovative research facilities,
              and a welcoming multicultural environment. Graduates benefit from globally accepted degrees and
              strong employment pathways.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Top Ranked World Universities</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>{postStudyWorkYears}-Year Post Study Work Rights</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Flexible Part-Time Work Allowed</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Generous Merit Scholarships</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card variant="glass" padding="lg" className="border-[#D4AF37]/30 shadow-xl flex flex-col gap-6">
              <h3 className="text-xl font-bold text-[#0B1B3D] font-['Outfit'] border-b border-slate-200 pb-3">
                Key Destination Facts
              </h3>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#0B1B3D]/5 text-[#D4AF37]">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-medium">Official Currency</span>
                  <span className="font-bold text-slate-800 text-sm">{currency}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#0B1B3D]/5 text-[#D4AF37]">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-medium">Primary Intakes</span>
                  <span className="font-bold text-slate-800 text-sm">Fall (Sept) & Spring (Jan)</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#0B1B3D]/5 text-[#D4AF37]">
                  <Landmark className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-medium">Language Requirement</span>
                  <span className="font-bold text-slate-800 text-sm">IELTS / TOEFL / PTE (Waivers Available)</span>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
};
