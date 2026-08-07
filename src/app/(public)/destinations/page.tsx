import React from "react";
import type { Metadata } from "next";
import { countryService } from "@/services/country.service";
import { CountryCard } from "@/components/sections/CountryCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CtaSection } from "@/components/sections/CtaSection";
import { SEO_CONFIG } from "@/config/seo.config";

export const metadata: Metadata = {
  title: "Study Destinations | Explore USA, UK, Canada, Australia & Europe",
  description:
    "Discover top global study abroad destinations. Compare tuition costs, post-study work permits, living expenses, and university rankings with Vikram Edu Consultants.",
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/destinations`,
  },
};

export default async function DestinationsPage() {
  const countries = await countryService.getAllCountries();

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
            {countries.map((country) => (
              <CountryCard
                key={country.id}
                country={{
                  id: country.id,
                  name: country.name,
                  slug: country.slug,
                  code: country.code,
                  flag: country.flagUrl || "🌍",
                  postStudyWork: `${country.postStudyWorkYears} Years Permit`,
                  avgCost: `$${country.avgCostOfLivingYear.toLocaleString()} / yr`,
                  topCities: ["Major Cities"],
                  heroImage:
                    country.heroImageUrl ||
                    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
                  description:
                    country.description ||
                    `Explore higher education, post-study work rights, and top universities in ${country.name}.`,
                  popularMajors: ["STEM", "Business", "Health"],
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
