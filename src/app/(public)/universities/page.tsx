import React from "react";
import type { Metadata } from "next";
import { universityService } from "@/services/university.service";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { UniversityCard } from "@/components/sections/UniversityCard";
import { UniversitySearchBar } from "@/components/universities/UniversitySearchBar";
import { CtaSection } from "@/components/sections/CtaSection";
import { SEO_CONFIG } from "@/config/seo.config";

export const metadata: Metadata = {
  title: "Global University Directory | Search 850+ Partner Universities",
  description:
    "Explore global university rankings, acceptance rates, tuition fees, and admission requirements across USA, UK, Canada, Australia, Germany & Europe.",
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/universities`,
  },
};

interface UniversitiesPageProps {
  searchParams: Promise<{
    query?: string;
    countrySlug?: string;
    page?: string;
    maxRankingGlobal?: string;
  }>;
}

export default async function UniversitiesPage({ searchParams }: UniversitiesPageProps) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1", 10);
  const query = resolvedParams.query || "";
  const countrySlug = resolvedParams.countrySlug || "";
  const maxRankingGlobal = resolvedParams.maxRankingGlobal
    ? parseInt(resolvedParams.maxRankingGlobal, 10)
    : undefined;

  const result = await universityService.filterUniversities({
    query,
    countrySlug,
    maxRankingGlobal,
    page,
    limit: 12,
  });

  return (
    <>
      <section className="py-16 bg-[#FAF9F5] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Partner Institution Directory"
            title="Global University"
            highlightText="Discovery Platform"
            subtitle="Explore world-ranked partner universities, acceptance rates, tuition costs, and admission requirements."
            align="center"
            className="mb-10"
          />

          <div className="max-w-3xl mx-auto mb-12">
            <UniversitySearchBar />
          </div>

          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 text-xs font-semibold text-slate-600">
            <span>
              Showing {result.universities.length} of {result.total} Partner Universities
            </span>
            {(query || countrySlug) && (
              <span className="text-[#D4AF37]">
                Filters active: {query && `"${query}" `} {countrySlug && `[${countrySlug.toUpperCase()}]`}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {result.universities.map((uni) => (
              <UniversityCard
                key={uni.id}
                university={{
                  id: uni.id,
                  name: uni.name,
                  slug: uni.slug,
                  countryName: uni.country?.name || "Global",
                  countryCode: uni.country?.code || "INT",
                  flag: uni.country?.flagUrl || "🏛️",
                  logo: uni.logoUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=200&q=80",
                  coverImage: uni.coverImageUrl || "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80",
                  rankingGlobal: uni.rankingGlobal || 100,
                  acceptanceRate: `${uni.acceptanceRate || 35}%`,
                  avgTuition: `$${(uni.avgTuitionFeeYear || 25000).toLocaleString()} / yr`,
                  city: uni.city,
                  badge: uni.rankingGlobal && uni.rankingGlobal <= 50 ? "Top 50 QS" : "Partner University",
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
