"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ShieldCheck, Sparkles, Globe2, Award, Star } from "lucide-react";
import { Button, Badge, Card } from "@/design-system";
import { ANIMATION_VARIANTS } from "@/design-system/animations/variants";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#0A192F] via-[#0B1B3D] to-[#0A192F] text-white pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden border-b border-[#D4AF37]/20">
      {/* Background Decorative Ambient Gold Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#D4AF37]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Floating Destination Pills Background Graphic */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <motion.div
            variants={ANIMATION_VARIANTS.staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6"
          >
            {/* Top Badge */}
            <motion.div variants={ANIMATION_VARIANTS.fadeUp}>
              <Badge variant="gold" size="md" className="shadow-lg backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> #1 AI-Powered Study Abroad Platform
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={ANIMATION_VARIANTS.fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Outfit'] tracking-tight leading-[1.1]"
            >
              Empowering Your Dream to Study at{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4E8C1] to-[#C5A059] bg-clip-text text-transparent">
                Top Global Universities
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              variants={ANIMATION_VARIANTS.fadeUp}
              className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal"
            >
              AI-driven program matching, 1-on-1 expert mentorship, SOP editing, and a{" "}
              <strong className="text-white font-semibold">99.2% visa success rate</strong> for USA, UK,
              Canada, Australia, Germany & Ireland.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={ANIMATION_VARIANTS.fadeUp}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 w-full sm:w-auto"
            >
              <Link href="/appointments">
                <Button
                  variant="primary"
                  size="xl"
                  leftIcon={<Calendar className="w-5 h-5" />}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Book Free Consultation
                </Button>
              </Link>

              <Link href="#destinations">
                <Button
                  variant="glass"
                  size="xl"
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  Explore Destinations
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={ANIMATION_VARIANTS.fadeUp}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 border-t border-slate-800/80 text-xs text-slate-300 w-full"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Certified Education Counsellors</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>$12M+ Scholarships Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                <span>4.9/5 Student Rating (2,500+ Reviews)</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Hero Interactive Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <Card
              variant="dark"
              padding="lg"
              className="w-full max-w-md border border-[#D4AF37]/30 shadow-2xl backdrop-blur-xl relative overflow-hidden"
            >
              {/* Floating Pill Elements */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-bold text-sm font-['Outfit']">Target Destination Match</span>
                </div>
                <Badge variant="gold" size="sm">
                  AI Match score: 98%
                </Badge>
              </div>

              {/* Sample AI University Card Showcase */}
              <div className="flex flex-col gap-4 my-6">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇬🇧</span>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-bold text-white">University of Oxford</span>
                      <span className="text-xs text-slate-400">MSc in Computer Science</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded-md">
                    Admit Eligible
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇺🇸</span>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-bold text-white">Harvard University</span>
                      <span className="text-xs text-slate-400">Master of Public Policy</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
                    $25k Grant
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇨🇦</span>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-bold text-white">University of Toronto</span>
                      <span className="text-xs text-slate-400">Management Analytics</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sky-400 bg-sky-400/10 px-2 py-1 rounded-md">
                    3 Yr PGWP
                  </span>
                </div>
              </div>

              {/* Card Footer Callout */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/30 text-xs flex items-center justify-between">
                <span className="text-slate-200">Want your customized shortlist?</span>
                <Link href="/appointments" className="text-[#D4AF37] font-bold hover:underline flex items-center gap-1">
                  Check Match <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
