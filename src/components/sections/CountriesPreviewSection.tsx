"use client";

import React from "react";
import { motion } from "framer-motion";
import { FEATURED_COUNTRIES_DATA } from "@/data/countries";
import { CountryCard } from "./CountryCard";
import { SectionHeader } from "./SectionHeader";

export const CountriesPreviewSection: React.FC = () => {
  return (
    <section id="destinations" className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Study Destinations"
          title="Explore Premier Global"
          highlightText="Education Destinations"
          subtitle="Comprehensive country guides detailing post-study work visas, top universities, tuition costs, and permanent residency pathways."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_COUNTRIES_DATA.map((country, index) => (
            <motion.div
              key={country.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <CountryCard country={country} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
