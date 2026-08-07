import React from "react";
import type { Metadata } from "next";
import { aiService } from "@/services/ai.service";
import { AIChatWindow } from "@/components/ai/AIChatWindow";
import { AIRecommendationCard } from "@/components/ai/AIRecommendationCard";
import { EligibilityResult } from "@/components/ai/EligibilityResult";
import { SOPReviewCard } from "@/components/ai/SOPReviewCard";

export const metadata: Metadata = {
  title: "VIKRAM AI Studio | Study Abroad Advisor",
  description: "AI-powered university recommendations, SOP reviews, eligibility checks, and 24/7 assistant.",
};

export default async function AIAssistantStudioPage() {
  const recommendations = await aiService.recommendUniversities({
    gpa: 3.8,
    budget: 50000,
    country: "United States",
    degree: "Master's",
  });

  const eligibility = await aiService.checkEligibility({
    gpa: 3.8,
    ielts: 7.5,
    degree: "Master's",
    budget: 50000,
  });

  const sopReview = await aiService.reviewSOP(
    "My interest in Computer Science stems from developing automated machine learning pipelines for medical diagnostics. I am eager to pursue an MSc in Computer Science at Oxford to study quantum computing algorithms."
  );

  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">VIKRAM AI Intelligence Studio</h2>
        <p className="text-xs text-slate-500">24/7 AI-powered recommendations, SOP review analysis, eligibility checks, and conversational assistant.</p>
      </div>

      {/* Interactive AI Chat Assistant */}
      <AIChatWindow />

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: AI Eligibility Check Result */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-[#0B1B3D] font-['Outfit']">Admission Eligibility Evaluation</h3>
          <EligibilityResult result={eligibility} />
        </div>

        {/* Right: Statement of Purpose (SOP) Audit */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-[#0B1B3D] font-['Outfit']">Statement of Purpose (SOP) AI Review</h3>
          <SOPReviewCard review={sopReview} />
        </div>

      </div>

      {/* Recommended Universities Grid */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[#0B1B3D] font-['Outfit']">AI Match Ranked University Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <AIRecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </div>
      </div>
    </div>
  );
}
