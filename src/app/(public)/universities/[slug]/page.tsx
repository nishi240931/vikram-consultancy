import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { universityService } from "@/services/university.service";
import { seoMetadataEngine } from "@/services/seo/seo-metadata.engine";
import { UniversityHero } from "@/components/universities/UniversityHero";
import { UniversityOverview } from "@/components/universities/UniversityOverview";
import { UniversityFacilities } from "@/components/universities/UniversityFacilities";
import { UniversityCTA } from "@/components/universities/UniversityCTA";

interface UniversityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: UniversityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const university = await universityService.getUniversityBySlug(slug);

  if (!university) {
    return {
      title: "University Not Found",
      description: "The requested university profile could not be found.",
    };
  }

  return seoMetadataEngine.generateUniversityMetadata({
    name: university.name,
    city: university.city,
    overview: university.overview,
    slug: university.slug,
  });
}

export default async function UniversityDetailPage({ params }: UniversityPageProps) {
  const { slug } = await params;
  const university = await universityService.getUniversityBySlug(slug);

  if (!university) {
    notFound();
  }

  const jsonLd = seoMetadataEngine.generateUniversityJsonLd({
    name: university.name,
    city: university.city,
    overview: university.overview,
    slug: university.slug,
    websiteUrl: university.websiteUrl,
  });

  return (
    <>
      {/* Inject Structured JSON-LD Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <UniversityHero
        university={{
          name: university.name,
          logoUrl: university.logoUrl,
          coverImageUrl: university.coverImageUrl,
          rankingGlobal: university.rankingGlobal,
          rankingNational: university.rankingNational,
          acceptanceRate: university.acceptanceRate,
          city: university.city,
          websiteUrl: university.websiteUrl,
          country: university.country,
        }}
      />

      <UniversityOverview
        name={university.name}
        overview={university.overview}
        city={university.city}
      />

      <UniversityFacilities />

      <UniversityCTA universityName={university.name} />
    </>
  );
}
