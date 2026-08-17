"use client";

import React from "react";
import { motion } from "framer-motion";
import { FEATURED_UNIVERSITIES_DATA } from "@/data/universities";
import { UniversityCard } from "./UniversityCard";
import { SectionHeader } from "./SectionHeader";

export const UniversitiesPreviewSection: React.FC = () => {
  // STRICTLY limit to exactly 6 featured partner universities
  const topSixUniversities = FEATURED_UNIVERSITIES_DATA.slice(0, 6);

  return (
    <section className="py-20 bg-[#FAF9F5] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Partner Institutions"
          title="Top-Ranked Global"
          highlightText="Partner Universities"
          subtitle="Explore entry requirements, tuition fee ranges, acceptance rates, and scholarship options across top global universities."
          align="center"
          className="mb-16"
        />

        {/* Responsive Grid displaying EXACTLY 6 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topSixUniversities.map((uni, index) => (
            <motion.div
              key={uni.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <UniversityCard university={uni} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
