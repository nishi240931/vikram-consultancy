import React from "react";
import type { Metadata } from "next";
import { TimelineSection } from "@/components/sections/TimelineSection";

export const metadata: Metadata = {
  title: "Our Process | Vikram Edu Consultants",
  description:
    "The Vikram Process: From Confusion to Take-off. Your end-to-end 9-step study abroad journey, made simple with Vikram Edu Consultants.",
};

export default function ProcessServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F5]">
      {/* 9-Step Circular Process Journey (The Vikram Process) */}
      <TimelineSection />
    </div>
  );
}
