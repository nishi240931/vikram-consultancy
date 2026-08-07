import React from "react";
import Link from "next/link";
import { Sparkles, GraduationCap, Award, ArrowRight } from "lucide-react";
import { Card, Badge, Button } from "@/design-system";
import { UniversityRecommendation } from "@/ai/schemas/recommendation.schema";

export interface AIRecommendationCardProps {
  recommendation: UniversityRecommendation;
}

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({ recommendation }) => {
  return (
    <Card variant="dark" padding="md" className="bg-[#0A192F] text-white border-2 border-[#D4AF37]/40 shadow-xl rounded-2xl flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Badge variant="gold" size="sm">
            <Sparkles className="w-3.5 h-3.5 mr-1" /> {recommendation.matchScorePercentage}% AI Match
          </Badge>
          <span className="text-xs text-slate-300 font-mono">Rank #{recommendation.globalRank}</span>
        </div>

        <h4 className="font-bold text-lg text-white font-['Outfit']">{recommendation.name}</h4>
        <span className="text-xs text-slate-300 flex items-center gap-1">
          <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" /> {recommendation.country}
        </span>

        <p className="text-xs text-slate-300 leading-relaxed pt-1 bg-white/5 p-3 rounded-xl border border-white/10">
          {recommendation.reason}
        </p>
      </div>

      <div className="pt-2 border-t border-slate-800 flex justify-end">
        <Link href={`/universities`}>
          <Button variant="gold" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            View University
          </Button>
        </Link>
      </div>
    </Card>
  );
};
