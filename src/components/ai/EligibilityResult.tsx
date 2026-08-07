import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Sparkles } from "lucide-react";
import { Card, Badge } from "@/design-system";
import { EligibilityCheckResult } from "@/ai/schemas/eligibility.schema";

export interface EligibilityResultProps {
  result: EligibilityCheckResult;
}

export const EligibilityResult: React.FC<EligibilityResultProps> = ({ result }) => {
  const isEligible = result.status === "ELIGIBLE";
  const isConditional = result.status === "CONDITIONALLY_ELIGIBLE";

  return (
    <Card
      variant="flat"
      padding="lg"
      className={`rounded-2xl border-2 shadow-xl bg-white ${
        isEligible
          ? "border-emerald-400/60"
          : isConditional
          ? "border-amber-400/60"
          : "border-rose-400/60"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isEligible ? (
              <div className="p-2 rounded-full bg-emerald-50 text-emerald-500">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            ) : isConditional ? (
              <div className="p-2 rounded-full bg-amber-50 text-amber-500">
                <AlertTriangle className="w-6 h-6" />
              </div>
            ) : (
              <div className="p-2 rounded-full bg-rose-50 text-rose-500">
                <XCircle className="w-6 h-6" />
              </div>
            )}
            <div className="flex flex-col">
              <h3 className="font-bold text-slate-900 text-lg font-['Outfit']">
                {isEligible ? "High Admission Likelihood" : isConditional ? "Conditional Entry" : "Low Match"}
              </h3>
              <span className="text-xs text-slate-500">AI Confidence: {result.overallConfidencePercentage}%</span>
            </div>
          </div>

          <Badge variant={isEligible ? "success" : isConditional ? "warning" : "error"} size="md">
            {result.status.replace("_", " ")}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-slate-100">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Academic GPA</span>
            <span className="text-slate-800 font-medium">{result.gpaAssessment}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">English Test</span>
            <span className="text-slate-800 font-medium">{result.englishScoreAssessment}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Budget Capacity</span>
            <span className="text-slate-800 font-medium">{result.budgetAssessment}</span>
          </div>
        </div>

        {result.recommendations.length > 0 && (
          <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100 text-xs">
            <span className="font-bold text-[#0B1B3D] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> AI Recommended Actions:
            </span>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              {result.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};
