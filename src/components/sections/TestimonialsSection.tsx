"use client";

import React from "react";
import { motion } from "framer-motion";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import { TestimonialCard } from "./TestimonialCard";
import { SectionHeader } from "./SectionHeader";

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF9F5] border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Verified Student Reviews"
          title="Loved by 15,000+ Students"
          highlightText="Across the Globe"
          subtitle="Real stories of students who achieved their dream university admissions and scholarships with Vikram Edu Consultants."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
