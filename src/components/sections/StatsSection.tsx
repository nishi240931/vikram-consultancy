"use client";

import React from "react";
import { motion } from "framer-motion";
import { STATISTICS_DATA } from "@/data/statistics";
import { AnimatedCounter } from "./AnimatedCounter";

export const StatsSection: React.FC = () => {
  return (
    <section className="py-12 bg-[#0B2545] border-b border-[#C9A227]/20 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {STATISTICS_DATA.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center gap-1 hover:border-[#C9A227]/50 transition-colors"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-['Outfit'] text-[#C9A227]">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="text-[11px] text-slate-300 font-normal hidden sm:block">
                {stat.description}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
