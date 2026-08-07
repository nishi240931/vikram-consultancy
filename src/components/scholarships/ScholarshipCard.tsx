import React from "react";
import Link from "next/link";
import { DollarSign, Calendar, ArrowRight, GraduationCap, Award } from "lucide-react";
import { Card, Badge, Button } from "@/design-system";

export interface ScholarshipCardProps {
  scholarship: {
    id: string;
    title: string;
    slug: string;
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

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  const formattedDeadline = scholarship.deadline
    ? new Date(scholarship.deadline).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Rolling Basis";

  const typeLabel =
    scholarship.type === "FULL_TUITION"
      ? "Full Tuition Coverage"
      : scholarship.type === "PARTIAL_TUITION"
      ? "Partial Tuition Grant"
      : scholarship.type === "STIPEND"
      ? "Annual Living Stipend"
      : "One-Time Award";

  return (
    <Card
      variant="flat"
      padding="lg"
      className="flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 group bg-white border border-slate-200/80 rounded-2xl"
    >
      <div className="flex flex-col gap-4">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant="gold" size="sm">
            <Award className="w-3.5 h-3.5 mr-1" /> {typeLabel}
          </Badge>
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <span>{scholarship.countryFlag}</span> {scholarship.countryName}
          </span>
        </div>

        {/* Title & Host Institution */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-[#0B1B3D] group-hover:text-[#C5A059] transition-colors line-clamp-2 font-['Outfit']">
            {scholarship.title}
          </h3>
          {scholarship.universityName && (
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="line-clamp-1">{scholarship.universityName}</span>
            </div>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 p-2.5 rounded-lg bg-emerald-50 text-emerald-800">
            <DollarSign className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] text-emerald-600 uppercase font-bold">Award Value</span>
              <span className="font-extrabold text-sm text-emerald-900">
                {scholarship.currency} {scholarship.amount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-2.5 rounded-lg bg-amber-50 text-amber-800">
            <Calendar className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] text-amber-600 uppercase font-bold">Deadline</span>
              <span className="font-bold text-xs text-amber-900">{formattedDeadline}</span>
            </div>
          </div>
        </div>

        {scholarship.coverageDetails && (
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-1">
            {scholarship.coverageDetails}
          </p>
        )}
      </div>

      {/* Action CTA */}
      <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
          <Award className="w-3 h-3" /> Verified Funding Opportunity
        </span>
        <Link href={`/scholarships/${scholarship.slug}`}>
          <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            View Award Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};
