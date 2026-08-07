import React from "react";
import type { Metadata } from "next";
import { scholarshipService } from "@/services/scholarship.service";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ScholarshipCard } from "@/components/scholarships/ScholarshipCard";
import { ScholarshipSearchBar } from "@/components/scholarships/ScholarshipSearchBar";
import { ScholarshipTypeCard } from "@/components/scholarships/ScholarshipTypeCard";
import { CtaSection } from "@/components/sections/CtaSection";
import { SEO_CONFIG } from "@/config/seo.config";
import { ScholarshipType } from "@prisma/client";
import { Award, DollarSign, HeartHandshake, Gift } from "lucide-react";

export const metadata: Metadata = {
  title: "Scholarships & Financial Aid Explorer | Study Abroad Funding",
  description:
    "Discover full tuition scholarships, research stipends, and merit grants across USA, UK, Canada, Australia, Germany & Europe with Vikram Edu Consultants.",
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/scholarships`,
  },
};

interface ScholarshipsPageProps {
  searchParams: Promise<{
    query?: string;
    type?: string;
    countrySlug?: string;
    page?: string;
  }>;
}

export default async function ScholarshipsPage({ searchParams }: ScholarshipsPageProps) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1", 10);
  const query = resolvedParams.query || "";
  const type = resolvedParams.type as ScholarshipType | undefined;
  const countrySlug = resolvedParams.countrySlug || "";

  const result = await scholarshipService.filterScholarships({
    query,
    type,
    countrySlug,
    page,
    limit: 12,
  });

  const types = [
    { title: "Full Tuition Waivers", count: "45+", type: "FULL_TUITION", icon: <Award className="w-5 h-5" /> },
    { title: "Partial Grants", count: "60+", type: "PARTIAL_TUITION", icon: <DollarSign className="w-5 h-5" /> },
    { title: "Living Stipends", count: "35+", type: "STIPEND", icon: <HeartHandshake className="w-5 h-5" /> },
    { title: "One-Time Bursaries", count: "25+", type: "ONE_TIME_GRANT", icon: <Gift className="w-5 h-5" /> },
  ];

  return (
    <>
      <section className="py-16 bg-[#FAF9F5] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Global Financial Aid & Grants"
            title="Scholarship Discovery &"
            highlightText="Funding Platform"
            subtitle="Explore fully funded scholarships, university bursaries, research stipends, and government grants across top global destinations."
            align="center"
            className="mb-10"
          />

          <div className="max-w-4xl mx-auto mb-12">
            <ScholarshipSearchBar />
          </div>

          {/* Funding Categories */}
          <div className="mb-12">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 font-['Outfit']">
              Funding Categories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {types.map((t, idx) => (
                <ScholarshipTypeCard
                  key={idx}
                  title={t.title}
                  count={t.count}
                  type={t.type}
                  icon={t.icon}
                />
              ))}
            </div>
          </div>

          {/* Active Filter Counter */}
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 text-xs font-semibold text-slate-600">
            <span>
              Showing {result.scholarships.length} of {result.total} Funding Opportunities
            </span>
            {(query || type || countrySlug) && (
              <span className="text-[#D4AF37]">
                Filters active: {query && `"${query}" `} {type && `[${type}] `} {countrySlug && `[${countrySlug.toUpperCase()}]`}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {result.scholarships.map((schol) => (
              <ScholarshipCard
                key={schol.id}
                scholarship={{
                  id: schol.id,
                  title: schol.title,
                  slug: schol.slug,
                  type: schol.type,
                  amount: schol.amount,
                  currency: schol.currency,
                  coverageDetails: schol.coverageDetails,
                  deadline: schol.deadline,
                  universityName: schol.university?.name,
                  countryName: schol.country?.name || "Global Destination",
                  countryFlag: schol.country?.flagUrl || "🎓",
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
