"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/sections/SectionHeader";

export interface CountryFAQProps {
  countryName: string;
}

export const CountryFAQ: React.FC<CountryFAQProps> = ({ countryName }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: `What are the tuition fees for studying in ${countryName}?`,
      a: `Tuition fees in ${countryName} vary depending on the university and degree level. Bachelor's programs range from $15,000 to $35,000 per year, while Master's programs range from $18,000 to $45,000. Scholarships and assistantships can significantly reduce these costs.`,
    },
    {
      q: `Can international students work part-time in ${countryName}?`,
      a: `Yes! International students on a valid student visa in ${countryName} are generally allowed to work up to 20 hours per week during academic semesters and full-time during official semester breaks.`,
    },
    {
      q: `What is the post-study work permit duration in ${countryName}?`,
      a: `Graduates from recognized universities in ${countryName} can apply for post-study work visas ranging from 2 to 3 years depending on the level of study and degree specialization (e.g., STEM majors).`,
    },
    {
      q: `Is IELTS / TOEFL mandatory to study in ${countryName}?`,
      a: `While English proficiency scores (IELTS/TOEFL/PTE) are standard requirements, several universities offer waivers if your previous medium of instruction was English (MOI certificate).`,
    },
  ];

  return (
    <section className="py-16 bg-[#FAF9F5] border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Frequently Asked Questions"
          title={`Common Questions About Studying in`}
          highlightText={countryName}
          subtitle={`Everything you need to know about admissions, tuition fees, visas, and part-time work in ${countryName}.`}
          align="center"
          className="mb-12"
        />

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-base text-[#0B1B3D]">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4AF37] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
