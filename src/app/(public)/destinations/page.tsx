import React from "react";
import type { Metadata } from "next";
import { FEATURED_COUNTRIES_DATA } from "@/data/countries";
import { CountryCard } from "@/components/sections/CountryCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CtaSection } from "@/components/sections/CtaSection";
import { SEO_CONFIG } from "@/config/seo.config";

export const metadata: Metadata = {
  title: "Study Destinations | Explore USA, UK, Canada, Australia & Asia",
  description:
    "Discover top global study abroad destinations. Compare tuition costs, post-study work permits, living expenses, and university rankings with Vikram Edu Consultants.",
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/destinations`,
  },
};

export default function DestinationsPage() {
  return (
    <>
      <section className="py-16 bg-[#FAF9F5] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Global Study Destinations"
            title="Explore Premier Global"
            highlightText="Education Destinations"
            subtitle="Comprehensive guides covering tuition fees, post-study work visas, top universities, living costs, and permanent residency opportunities."
            align="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_COUNTRIES_DATA.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
