import React from "react";
import Link from "next/link";
import { DollarSign, Calendar, ArrowRight, GraduationCap, Award } from "lucide-react";
import { Badge, Button } from "@/design-system";

export interface ScholarshipHeroProps {
  scholarship: {
    title: string;
    type: string;
    amount: number;
    currency: string;
    coverageDetails?: string | null;
    deadline?: Date | string | null;
    universityName?: string | null;
    countryName: string;
    countryFlag: string;
  };
}

export const ScholarshipHero: React.FC<ScholarshipHeroProps> = ({ scholarship }) => {
  const formattedDeadline = scholarship.deadline
    ? new Date(scholarship.deadline).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Rolling Applications";

  return (
    <section className="relative bg-[#0A192F] text-white pt-12 pb-20 overflow-hidden border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-6 max-w-3xl">
          
          <div className="flex items-center gap-3">
            <Badge variant="gold" size="md">
              <Award className="w-3.5 h-3.5 mr-1" /> {scholarship.type.replace("_", " ")}
            </Badge>
            <span className="text-xs text-slate-300 flex items-center gap-1">
              <span>{scholarship.countryFlag}</span> {scholarship.countryName}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] tracking-tight">
            {scholarship.title}
          </h1>

          {scholarship.universityName && (
            <div className="flex items-center gap-1.5 text-sm text-slate-300 font-medium">
              <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
              <span>Host Institution: {scholarship.universityName}</span>
            </div>
          )}

          <p className="text-slate-300 text-base leading-relaxed font-normal">
            {scholarship.coverageDetails ||
              `Prestigious financial grant awarded to outstanding international students pursuing higher education in ${scholarship.countryName}.`}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <DollarSign className="w-6 h-6 text-emerald-400" />
              <div className="flex flex-col">
                <span className="text-slate-400">Total Award Value</span>
                <span className="font-extrabold text-white text-base">
                  {scholarship.currency} {scholarship.amount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <Calendar className="w-6 h-6 text-amber-400" />
              <div className="flex flex-col">
                <span className="text-slate-400">Application Deadline</span>
                <span className="font-bold text-white text-base">{formattedDeadline}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link href="/book-consultation">
              <Button variant="primary" size="lg" leftIcon={<Calendar className="w-4 h-4" />}>
                Apply for Scholarship
              </Button>
            </Link>
            <Link href="#eligibility">
              <Button variant="glass" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Check Scholarship Eligibility
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
