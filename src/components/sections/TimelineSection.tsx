"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Globe,
  GraduationCap,
  ClipboardCheck,
  IndianRupee,
  Mail,
  FileCheck,
  Home,
  Plane,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  HeartHandshake,
} from "lucide-react";
import { Logo } from "@/design-system";

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  desktopPos: { x: number; y: number };
  iconSide: "left" | "right";
}

// 9 Exact Process Steps mathematically positioned around (0, 0)
const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Confused?",
    description: "Not sure which country, course or university is right for you?",
    icon: HelpCircle,
    desktopPos: { x: 0, y: -275 },
    iconSide: "right",
  },
  {
    number: "02",
    title: "Choose Your Country",
    description: "Explore the best destinations that fit your goals, budget and future.",
    icon: Globe,
    desktopPos: { x: 285, y: -205 },
    iconSide: "left",
  },
  {
    number: "03",
    title: "Shortlist Universities",
    description: "We help you find and shortlist the right universities & courses.",
    icon: GraduationCap,
    desktopPos: { x: 435, y: -40 },
    iconSide: "left",
  },
  {
    number: "04",
    title: "Check Requirements",
    description: "Understand eligibility, exams, documents & admission requirements.",
    icon: ClipboardCheck,
    desktopPos: { x: 385, y: 135 },
    iconSide: "left",
  },
  {
    number: "05",
    title: "Funding & Education Loan",
    description: "Plan your finances, explore scholarships and get help with education loans.",
    icon: IndianRupee,
    desktopPos: { x: 155, y: 265 },
    iconSide: "left",
  },
  {
    number: "06",
    title: "Apply & Get Your Offer",
    description: "We assist in applications, SOP, LORs and help you receive your offer letter.",
    icon: Mail,
    desktopPos: { x: -155, y: 265 },
    iconSide: "right",
  },
  {
    number: "07",
    title: "Visa Preparation",
    description: "Complete your visa process with the right guidance and documentation.",
    icon: FileCheck,
    desktopPos: { x: -385, y: 135 },
    iconSide: "right",
  },
  {
    number: "08",
    title: "Accommodation",
    description: "We help you find the best and safest stay options abroad.",
    icon: Home,
    desktopPos: { x: -435, y: -40 },
    iconSide: "right",
  },
  {
    number: "09",
    title: "Fly Abroad",
    description: "Pack your bags! Your dream journey begins now.",
    icon: Plane,
    desktopPos: { x: -285, y: -205 },
    iconSide: "right",
  },
];

// Bottom Benefits Strip Items
const BENEFIT_ITEMS = [
  { label: "Personalized Guidance", icon: UserCheck },
  { label: "Expert Counselors", icon: ShieldCheck },
  { label: "End-to-End Support", icon: CheckCircle2 },
  { label: "Timely Updates", icon: Clock },
  { label: "Financial Assistance", icon: IndianRupee },
  { label: "Post-Arrival Support", icon: HeartHandshake },
];

export const TimelineSection: React.FC = () => {
  return (
    <section
      id="process"
      className="py-20 bg-[#FAF9F5] text-slate-900 relative overflow-hidden border-b border-slate-200/80"
    >
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ==========================================
            SECTION HEADER
           ========================================== */}
        <div className="flex flex-col items-center text-center gap-3 mb-12 sm:mb-16">
          <div className="border border-[#D4AF37] text-[#D4AF37] text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest bg-[#D4AF37]/5 shadow-sm">
            THE VIKRAM PROCESS
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-['Outfit']">
            <span className="text-[#0B1B3D]">From </span>
            <span className="text-[#D4AF37]">Confusion </span>
            <span className="text-[#0B1B3D]">to </span>
            <span className="text-[#D4AF37]">Take-off</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
            Your end-to-end study abroad journey, made simple with{" "}
            <strong className="text-[#0B1B3D] font-bold">Vikram Edu Consultants.</strong>
          </p>
        </div>

        {/* ==========================================
            DESKTOP CIRCULAR JOURNEY DIAGRAM (>= 1200px)
           ========================================== */}
        <div className="hidden xl:block relative w-full max-w-[1240px] h-[720px] mx-auto my-4 overflow-visible">
          
          {/* Circular Connecting Ellipse & Directional Arrow Loop */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 1240 720">
            <defs>
              <marker
                id="navy-arrow"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#0B1B3D" />
              </marker>
            </defs>

            {/* Orbit Ellipse mathematically centered at (620, 360) */}
            <ellipse
              cx="620"
              cy="360"
              rx="420"
              ry="260"
              fill="none"
              stroke="#0B1B3D"
              strokeWidth="2"
              strokeDasharray="6 4"
              opacity="0.3"
            />
          </svg>

          {/* ABSOLUTELY MATHEMATICALLY CENTERED EMBLEM CIRCLE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
            className="absolute w-[310px] h-[310px] rounded-full bg-white border-2 border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(11,27,61,0.08)] flex flex-col items-center justify-center text-center p-6 z-20 hover:border-[#D4AF37] transition-all duration-300 pointer-events-auto"
          >
            <Logo variant="emblem" size="md" className="mb-2" />

            <span className="text-xs font-bold tracking-widest text-[#0B1B3D] uppercase">
              YOUR
            </span>
            <span className="text-sm font-black tracking-wider text-[#0B1B3D] uppercase font-['Outfit'] leading-none mt-0.5">
              STUDY ABROAD
            </span>
            <span className="text-xl font-black tracking-widest text-[#D4AF37] uppercase font-['Outfit'] leading-tight">
              JOURNEY
            </span>

            <div className="w-12 h-[2px] bg-[#D4AF37] my-2.5 rounded-full" />

            <p className="text-slate-500 text-xs font-medium leading-tight max-w-[160px]">
              We guide you at every step of the way
            </p>
          </motion.div>

          {/* 9 PROCESS CARDS ORBITING MATHEMATICALLY AROUND (50%, 50%) */}
          {PROCESS_STEPS.map((step, idx) => {
            const IconComponent = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                style={{
                  left: `calc(50% + ${step.desktopPos.x}px)`,
                  top: `calc(50% + ${step.desktopPos.y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute w-[260px] bg-white border border-slate-200/90 hover:border-[#D4AF37] rounded-[24px] shadow-[0_8px_25px_rgba(11,27,61,0.06)] hover:shadow-[0_15px_35px_rgba(212,175,55,0.2)] transition-all duration-300 p-3.5 flex items-center gap-3 z-10 group"
              >
                {step.iconSide === "right" ? (
                  <>
                    <div className="flex flex-col flex-grow text-left">
                      <div className="flex items-baseline gap-1.5 mb-0.5">
                        <span className="text-lg font-black text-[#0B1B3D] font-['Outfit']">
                          {step.number}
                        </span>
                        <h3 className="text-xs font-bold text-[#0B1B3D] font-['Outfit'] line-clamp-1">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-slate-500 text-[11px] leading-tight line-clamp-2">
                        {step.description}
                      </p>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-[#0B1B3D] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-[#0B1B3D] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="flex flex-col flex-grow text-left">
                      <div className="flex items-baseline gap-1.5 mb-0.5">
                        <span className="text-lg font-black text-[#0B1B3D] font-['Outfit']">
                          {step.number}
                        </span>
                        <h3 className="text-xs font-bold text-[#0B1B3D] font-['Outfit'] line-clamp-1">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-slate-500 text-[11px] leading-tight line-clamp-2">
                        {step.description}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ==========================================
            TABLET & MOBILE RESPONSIVE LAYOUT (< 1200px)
           ========================================== */}
        <div className="xl:hidden flex flex-col gap-6">
          {/* Mobile/Tablet Center Banner */}
          <div className="w-full max-w-md mx-auto bg-white border border-[#D4AF37]/40 rounded-3xl p-6 shadow-md text-center flex flex-col items-center justify-center gap-2 mb-4">
            <Logo variant="emblem" size="md" />
            <span className="text-xs font-bold tracking-widest text-[#0B1B3D] uppercase">
              YOUR STUDY ABROAD JOURNEY
            </span>
            <p className="text-slate-500 text-xs">We guide you at every step of the way</p>
          </div>

          {/* Vertical Timeline / Grid for Mobile/Tablet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative">
            {PROCESS_STEPS.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white border border-slate-200/90 hover:border-[#D4AF37] rounded-2xl shadow-sm p-4 sm:p-5 flex items-start gap-4 transition-all group"
                >
                  <div className="w-11 h-11 rounded-full bg-[#0B1B3D] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-md flex-shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-[#0B1B3D] font-['Outfit']">
                        {step.number}
                      </span>
                      <h3 className="text-base font-bold text-[#0B1B3D] font-['Outfit']">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            BOTTOM BENEFITS BAR (ALL SCREEN SIZES)
           ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 sm:mt-20 bg-white border border-slate-200/90 rounded-2xl sm:rounded-full p-4 sm:p-5 shadow-lg"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-slate-100 items-center justify-between text-center">
            {BENEFIT_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-2.5 pt-2 sm:pt-0 px-2 group"
                >
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0 group-hover:bg-[#D4AF37] group-hover:text-[#0B1B3D] transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#0B1B3D] whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
