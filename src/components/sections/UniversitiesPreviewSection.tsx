"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FEATURED_UNIVERSITIES_DATA } from "@/data/universities";
import { UniversityCard } from "./UniversityCard";
import { SectionHeader } from "./SectionHeader";
import { Button } from "@/design-system";

export const UniversitiesPreviewSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Partner Institutions"
          title="Top-Ranked Global"
          highlightText="Partner Universities"
          subtitle="Explore entry requirements, tuition fee ranges, acceptance rates, and scholarship options across 850+ global universities."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_UNIVERSITIES_DATA.map((uni, index) => (
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

        <div className="flex justify-center mt-12">
          <Link href="/universities">
            <Button
              variant="outline"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore All 850+ Partner Universities
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
