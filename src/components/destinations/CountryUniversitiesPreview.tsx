import React from "react";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { UniversityCard } from "@/components/sections/UniversityCard";

export interface CountryUniversitiesPreviewProps {
  countryName: string;
  universities: Array<{
    id: string;
    name: string;
    slug: string;
    logoUrl?: string | null;
    coverImageUrl?: string | null;
    rankingGlobal?: number | null;
    acceptanceRate?: number | null;
    city: string;
  }>;
}

export const CountryUniversitiesPreview: React.FC<CountryUniversitiesPreviewProps> = ({
  countryName,
  universities,
}) => {
  // Enforce EXACTLY 6 universities for the destination
  const topSixUniversities = (universities || []).slice(0, 6);

  if (topSixUniversities.length === 0) return null;

  return (
    <section id="universities" className="py-16 bg-[#FAF9F5] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Partner Institutions"
          title={`Top-Ranked Global Partner Universities in`}
          highlightText={countryName}
          subtitle={`Explore world-ranked institutions, course offerings, and entry requirements in ${countryName}.`}
          align="center"
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topSixUniversities.map((uni) => (
            <UniversityCard
              key={uni.id}
              university={{
                id: uni.id,
                name: uni.name,
                slug: uni.slug,
                countryName: countryName,
                countryCode: "INT",
                flag: "🏛️",
                logo: uni.logoUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=200&q=80",
                coverImage: uni.coverImageUrl || "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80",
                rankingGlobal: uni.rankingGlobal || 100,
                acceptanceRate: `${uni.acceptanceRate || 35}%`,
                avgTuition: "Tuition Varies",
                city: uni.city,
                badge: "Partner University",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
