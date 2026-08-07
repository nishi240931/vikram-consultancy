"use client";

import React from "react";
import { motion } from "framer-motion";
import { SERVICES_DATA } from "@/data/services";
import { ServiceCard } from "./ServiceCard";
import { SectionHeader } from "./SectionHeader";

export const ServicesPreviewSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="End-to-End Solutions"
          title="Comprehensive Study Abroad"
          highlightText="Counselling Services"
          subtitle="From initial profile evaluation and AI shortlisting to visa approval and pre-departure briefings, we support your entire overseas journey."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
