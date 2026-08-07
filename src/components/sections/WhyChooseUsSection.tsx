"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Award, Sparkles, HeartHandshake, Compass } from "lucide-react";
import { Card } from "@/design-system";
import { SectionHeader } from "./SectionHeader";

const REASONS = [
  {
    icon: <Target className="w-6 h-6 text-[#D4AF37]" />,
    title: "AI University Matcher",
    description: "Our proprietary algorithm predicts your admit probabilities across top universities based on your GPA, GRE, IELTS, and budget.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
    title: "99.2% Visa Approval Success",
    description: "Rigorous document verification and simulated mock interviews led by former embassy experts ensure flawless visa filings.",
  },
  {
    icon: <Award className="w-6 h-6 text-[#D4AF37]" />,
    title: "$12M+ Scholarships Secured",
    description: "We help identify merit awards, need-based bursaries, and assistantships to significantly reduce your tuition burden.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
    title: "Ivy-League SOP Editing",
    description: "Professional editors refine your Statement of Purpose and Resumes into compelling, narrative-driven applications.",
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-[#D4AF37]" />,
    title: "1-on-1 Dedicated Counsellors",
    description: "Direct access to senior education mentors who guide you through shortlisting, applications, and housing arrangements.",
  },
  {
    icon: <Compass className="w-6 h-6 text-[#D4AF37]" />,
    title: "End-to-End Overseas Support",
    description: "From education loans and forex transfers to pre-departure briefings and airport pickups, we support you every step.",
  },
];

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF9F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Why Vikram Edu Consultants"
          title="The Unrivaled Advantage in"
          highlightText="Global Overseas Education"
          subtitle="Combining advanced AI technology with personalized human mentorship to maximize your university admissions success."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REASONS.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                variant="flat"
                padding="lg"
                className="h-full hover:border-[#D4AF37] hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="p-3 rounded-2xl bg-[#0B1B3D]/5 w-fit mb-5 group-hover:bg-[#0B1B3D] transition-colors">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0B1B3D] font-['Outfit'] mb-3 group-hover:text-[#C5A059] transition-colors">
                  {reason.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  {reason.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
