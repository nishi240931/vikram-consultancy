"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, GraduationCap, ArrowRight, Star } from "lucide-react";
import { SUCCESS_STORIES_DATA } from "@/data/testimonials";
import { SuccessStoryCard } from "./SuccessStoryCard";
import { Button } from "@/design-system";

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalStories = SUCCESS_STORIES_DATA.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(totalStories - 1, prev + 1));
  };

  return (
    <section className="py-20 bg-[#FAF9F5] border-y border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER (EXACTLY MATCHING REFERENCE IMAGE) */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          {/* Eyebrow: -- SUCCESS ★ STORIES -- */}
          <div className="flex items-center justify-center gap-3 text-xs font-bold tracking-widest uppercase text-[#C5A059] mb-1">
            <span className="w-8 h-[2px] bg-[#C5A059]/60" />
            <div className="flex items-center gap-1.5">
              <span>SUCCESS</span>
              <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
              <span>STORIES</span>
            </div>
            <span className="w-8 h-[2px] bg-[#C5A059]/60" />
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1B3D] font-['Outfit'] tracking-tight">
            From <span className="text-[#C5A059]">Dreams</span> to University Campus.
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base font-normal mt-1">
            Real students. Real journeys. Real destinations.
          </p>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div className="relative group/carousel px-2 sm:px-4">
          {/* Left Navigation Arrow (Mobile & Tablet only) */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous Student Success Story"
            className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 z-20 w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-md flex items-center justify-center text-[#0B1B3D] hover:bg-[#0B1B3D] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Navigation Arrow (Mobile & Tablet only) */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= totalStories - 1}
            aria-label="Next Student Success Story"
            className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 z-20 w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-md flex items-center justify-center text-[#0B1B3D] hover:bg-[#0B1B3D] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Desktop 5-Card View Grid — Renders exactly 5 unique cards once */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-4 items-stretch">
            {SUCCESS_STORIES_DATA.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <SuccessStoryCard story={story} />
              </motion.div>
            ))}
          </div>

          {/* Mobile & Tablet Slider Track — Finite slice without duplicate looping */}
          <div className="lg:hidden overflow-hidden py-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
              >
                {SUCCESS_STORIES_DATA.slice(currentIndex, currentIndex + 3).map((story) => (
                  <SuccessStoryCard key={story.id} story={story} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA BANNER BELOW CAROUSEL (EXACT MATCHING REFERENCE IMAGE) */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-[#FAF9F5] border border-amber-200/70 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-full bg-[#0B1B3D]/5 border border-[#0B1B3D]/10 flex items-center justify-center text-[#0B1B3D] flex-shrink-0">
                <GraduationCap className="w-8 h-8 text-[#0B1B3D]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-[#0B1B3D]">
                  Your story could be next.
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-0.5 font-medium">
                  Take the first step towards your dream university.
                </p>
              </div>
            </div>

            <Link href="/book-consultation" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto justify-center shadow-md rounded-full px-7 py-3 text-sm font-bold"
              >
                Get Free Counselling
              </Button>
            </Link>
          </div>
        </div>

        {/* BOTTOM LINK */}
        <div className="text-center mt-8">
          <p className="text-xs sm:text-sm font-normal text-slate-600">
            Want to know more about our students&apos; journeys?{" "}
            <Link
              href="/about"
              className="font-bold text-[#C5A059] hover:underline inline-flex items-center gap-1 ml-1"
            >
              <span>View All Success Stories</span>
              <span>&rarr;</span>
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
};
