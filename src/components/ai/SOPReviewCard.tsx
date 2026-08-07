import React from "react";
import { Award, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { Card, Badge } from "@/design-system";
import { SOPReviewResult } from "@/ai/schemas/sop.schema";

export interface SOPReviewCardProps {
  review: SOPReviewResult;
}

export const SOPReviewCard: React.FC<SOPReviewCardProps> = ({ review }) => {
  return (
    <Card variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-2xl flex flex-col gap-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#0B1B3D]/5 text-[#D4AF37]">
            <FileText className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-900 text-lg font-['Outfit']">Statement of Purpose Review</h3>
            <span className="text-xs text-slate-500">Evaluated against Ivy League & Russell Group admission benchmarks</span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-3xl font-black text-[#0B1B3D] font-['Outfit']">{review.overallScore} / 100</span>
          <Badge variant="gold" size="sm">
            AI Score
          </Badge>
        </div>
      </div>

      {/* Ratings */}
      <div className="grid grid-cols-3 gap-3 text-xs text-center">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
          <span className="text-slate-400 font-bold">Grammar</span>
          <span className="font-bold text-emerald-600">{review.grammarRating}</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
          <span className="text-slate-400 font-bold">Clarity</span>
          <span className="font-bold text-emerald-600">{review.clarityRating}</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
          <span className="text-slate-400 font-bold">Structure</span>
          <span className="font-bold text-indigo-600">{review.structureRating}</span>
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="flex flex-col gap-2 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
          <span className="font-bold text-emerald-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Strengths
          </span>
          <ul className="list-disc list-inside text-emerald-800 space-y-1">
            {review.keyStrengths.map((str, i) => (
              <li key={i}>{str}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 p-4 rounded-xl bg-amber-50/60 border border-amber-200">
          <span className="font-bold text-amber-900 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-600" /> Improvement Areas
          </span>
          <ul className="list-disc list-inside text-amber-800 space-y-1">
            {review.suggestionsForImprovement.map((sug, i) => (
              <li key={i}>{sug}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detailed Feedback */}
      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
        {review.detailedFeedback}
      </p>
    </Card>
  );
};
