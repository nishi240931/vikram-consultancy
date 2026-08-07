"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Compass, FileCheck, Send, Award, PlaneTakeoff } from "lucide-react";
import { TIMELINE_STEPS_DATA } from "@/data/timeline";
import { SectionHeader } from "./SectionHeader";

const ICON_MAP: Record<string, React.ReactNode> = {
  Calendar: <Calendar className="w-5 h-5 text-[#D4AF37]" />,
  Compass: <Compass className="w-5 h-5 text-[#D4AF37]" />,
  FileCheck: <FileCheck className="w-5 h-5 text-[#D4AF37]" />,
  Send: <Send className="w-5 h-5 text-[#D4AF37]" />,
  Award: <Award className="w-5 h-5 text-[#D4AF37]" />,
  PlaneTakeoff: <PlaneTakeoff className="w-5 h-5 text-[#D4AF37]" />,
};

export const TimelineSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#0B1B3D] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Structured Roadmap"
          title="Your 6-Step Journey to"
          highlightText="Global Education Success"
          subtitle="A transparent, step-by-step roadmap designed to take you from initial consultation to flying abroad seamlessly."
          align="center"
          className="mb-16 [&_h2]:text-white [&_p]:text-slate-300"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {TIMELINE_STEPS_DATA.map((step, index) => (
            <motion.div
              key={step.stepNumber}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between hover:border-[#D4AF37]/50 transition-colors relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/10 text-[#D4AF37]">
                    {ICON_MAP[step.iconName] || <Calendar className="w-5 h-5 text-[#D4AF37]" />}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                    {step.subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-['Outfit'] text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
