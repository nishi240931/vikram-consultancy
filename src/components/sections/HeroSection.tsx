"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ShieldCheck, Sparkles, Award, Star } from "lucide-react";
import { Button, Badge } from "@/design-system";
import { ANIMATION_VARIANTS } from "@/design-system/animations/variants";
import { CounsellingFormCard } from "@/components/forms/CounsellingFormCard";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#FAF9F5] text-[#0B2545] pt-10 pb-20 lg:pt-16 lg:pb-28 overflow-hidden border-b border-[#C9A227]/20">
      {/* Background Decorative Ambient Gold Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#C9A227]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Floating Grid Background Graphic */}
      <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <motion.div
            variants={ANIMATION_VARIANTS.staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-6"
          >
            {/* Top Badge */}
            <motion.div variants={ANIMATION_VARIANTS.fadeUp}>
              <Badge variant="gold" size="md" className="shadow-sm backdrop-blur-md bg-[#C9A227]/15 text-[#0B2545] border border-[#C9A227]/30">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-[#C9A227]" /> #1 Study Abroad Consultancy in Vijayawada &amp; Telangana
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={ANIMATION_VARIANTS.fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Outfit'] tracking-tight leading-[1.1] text-[#0B2545]"
            >
              Confused Which{" "}
              <span className="text-[#C9A227]">
                Country to Go?
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              variants={ANIMATION_VARIANTS.fadeUp}
              className="text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-xl font-normal"
            >
              Let&apos;s find the right country, course &amp; university that fits your profile, budget and career ambitions with a{" "}
              <strong className="text-[#0B2545] font-bold">99.2% visa success rate</strong> for USA, UK,
              Canada, Australia, New Zealand, South Korea, Japan, Germany &amp; Ireland.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={ANIMATION_VARIANTS.fadeUp}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 w-full sm:w-auto"
            >
              <Link href="/book-consultation">
                <Button
                  variant="primary"
                  size="xl"
                  leftIcon={<Calendar className="w-5 h-5 text-[#0B2545]" />}
                  rightIcon={<ArrowRight className="w-5 h-5 text-[#0B2545]" />}
                  className="bg-[#C9A227] hover:bg-[#B38F1F] text-[#0B2545] font-extrabold shadow-lg rounded-full px-8 py-4"
                >
                  Get Free Counselling
                </Button>
              </Link>

              <Link href="#destinations">
                <Button
                  variant="glass"
                  size="xl"
                  className="bg-white hover:bg-[#F5F1E8] border border-[#C9A227] text-[#0B2545] font-bold rounded-full px-8 py-4 shadow-sm"
                >
                  Explore Destinations
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={ANIMATION_VARIANTS.fadeUp}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 border-t border-slate-200/80 text-xs text-[#4B5563] font-medium w-full"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                <span>Certified Education Advisors</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C9A227]" />
                <span>$12M+ Scholarships Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#C9A227] fill-[#C9A227]" />
                <span>4.9/5 Student Rating (2,500+ Reviews)</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Hero Column — Premium Light Counselling Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 relative w-full max-w-lg mx-auto lg:max-w-none"
          >
            <CounsellingFormCard theme="light" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
