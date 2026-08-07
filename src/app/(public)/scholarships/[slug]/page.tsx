import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { scholarshipService } from "@/services/scholarship.service";
import { ScholarshipHero } from "@/components/scholarships/ScholarshipHero";
import { ScholarshipEligibility } from "@/components/scholarships/ScholarshipEligibility";
import { ScholarshipCTA } from "@/components/scholarships/ScholarshipCTA";
import { APP_CONFIG } from "@/config/app.config";

interface ScholarshipPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ScholarshipPageProps): Promise<Metadata> {
  const { slug } = await params;
  const scholarship = await scholarshipService.getScholarshipBySlug(slug);

  if (!scholarship) {
    return {
      title: "Scholarship Not Found",
      description: "The requested scholarship funding guide could not be found.",
    };
  }

  const title = `${scholarship.title} | ${scholarship.currency} ${scholarship.amount.toLocaleString()} Award`;
  const description =
    scholarship.coverageDetails ||
    `Apply for ${scholarship.title}. Check eligibility, funding amount, application deadline, and document requirements.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${APP_CONFIG.url}/scholarships/${scholarship.slug}`,
    },
  };
}

export default async function ScholarshipDetailPage({ params }: ScholarshipPageProps) {
  const { slug } = await params;
  const scholarship = await scholarshipService.getScholarshipBySlug(slug);

  if (!scholarship) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: scholarship.title,
    description: scholarship.coverageDetails,
    url: `${APP_CONFIG.url}/scholarships/${scholarship.slug}`,
    amount: {
      "@type": "MonetaryAmount",
      currency: scholarship.currency,
      value: scholarship.amount,
    },
  };

  return (
    <>
      {/* Inject Structured JSON-LD Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ScholarshipHero
        scholarship={{
          title: scholarship.title,
          type: scholarship.type,
          amount: scholarship.amount,
          currency: scholarship.currency,
          coverageDetails: scholarship.coverageDetails,
          deadline: scholarship.deadline,
          universityName: scholarship.university?.name,
          countryName: scholarship.country?.name || "Global Destination",
          countryFlag: scholarship.country?.flagUrl || "🎓",
        }}
      />

      <ScholarshipEligibility
        eligibilityCriteria={scholarship.eligibilityCriteria}
        countryName={scholarship.country?.name || "Global Destination"}
      />

      <ScholarshipCTA scholarshipTitle={scholarship.title} />
    </>
  );
}
