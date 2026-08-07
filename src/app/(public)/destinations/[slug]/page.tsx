import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { countryService } from "@/services/country.service";
import { seoMetadataEngine } from "@/services/seo/seo-metadata.engine";
import { CountryHero } from "@/components/destinations/CountryHero";
import { CountryOverview } from "@/components/destinations/CountryOverview";
import { CountryUniversitiesPreview } from "@/components/destinations/CountryUniversitiesPreview";
import { CountryVisaInfo } from "@/components/destinations/CountryVisaInfo";
import { CountryFAQ } from "@/components/destinations/CountryFAQ";
import { CountryCTA } from "@/components/destinations/CountryCTA";

interface CountryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = await countryService.getCountryBySlug(slug);

  if (!country) {
    return {
      title: "Destination Not Found",
      description: "The requested study destination guide could not be found.",
    };
  }

  return seoMetadataEngine.generateCountryMetadata({
    name: country.name,
    description: country.description,
    slug: country.slug,
  });
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = await countryService.getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

  const jsonLd = seoMetadataEngine.generateCountryJsonLd({
    name: country.name,
    description: country.description,
    slug: country.slug,
  });

  const formattedUniversities = (country.universities || []).map((u) => ({
    id: u.id || "uni-id",
    name: u.name || "University Name",
    slug: u.slug || "university-slug",
    logoUrl: u.logoUrl,
    coverImageUrl: u.coverImageUrl,
    rankingGlobal: u.rankingGlobal,
    acceptanceRate: u.acceptanceRate,
    city: u.city || "Major City",
  }));

  return (
    <>
      {/* Inject Structured JSON-LD Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CountryHero
        country={{
          name: country.name,
          flagUrl: country.flagUrl,
          heroImageUrl: country.heroImageUrl,
          postStudyWorkYears: country.postStudyWorkYears,
          visaSuccessRate: country.visaSuccessRate,
          currency: country.currency,
          avgCostOfLivingYear: country.avgCostOfLivingYear,
          description: country.description,
        }}
      />

      <CountryOverview
        countryName={country.name}
        currency={country.currency}
        postStudyWorkYears={country.postStudyWorkYears}
      />

      <CountryUniversitiesPreview
        countryName={country.name}
        universities={formattedUniversities}
      />

      <CountryVisaInfo
        countryName={country.name}
        postStudyWorkYears={country.postStudyWorkYears}
        visaSuccessRate={country.visaSuccessRate}
      />

      <CountryFAQ countryName={country.name} />

      <CountryCTA countryName={country.name} />
    </>
  );
}
