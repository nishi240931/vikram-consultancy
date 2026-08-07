import type { Metadata } from "next";
import { APP_CONFIG } from "@/config/app.config";

export class SeoMetadataEngine {
  /**
   * Generates dynamic Next.js Metadata for Country pages.
   */
  generateCountryMetadata(country: { name: string; description?: string | null; slug: string }): Metadata {
    const title = `Study in ${country.name} | Universities, Visa & Fees`;
    const description =
      country.description ||
      `Complete guide to studying in ${country.name}. Explore top universities, tuition fees, post-study work visas, and scholarships with Vikram Edu Consultants.`;
    const url = `${APP_CONFIG.url}/destinations/${country.slug}`;

    return {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: APP_CONFIG.name,
        type: "website",
      },
    };
  }

  /**
   * Generates JSON-LD Place / Country Schema.
   */
  generateCountryJsonLd(country: { name: string; description?: string | null; slug: string }) {
    return {
      "@context": "https://schema.org",
      "@type": "Place",
      name: country.name,
      description: country.description,
      url: `${APP_CONFIG.url}/destinations/${country.slug}`,
    };
  }

  /**
   * Generates dynamic Next.js Metadata for University pages.
   */
  generateUniversityMetadata(university: { name: string; city: string; overview?: string | null; slug: string }): Metadata {
    const title = `${university.name} (${university.city}) | Admissions, Rankings & Fees`;
    const description =
      university.overview ||
      `Explore admission requirements, world rankings, tuition fees, and courses at ${university.name} in ${university.city}. Apply with Vikram Edu Consultants.`;
    const url = `${APP_CONFIG.url}/universities/${university.slug}`;

    return {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: APP_CONFIG.name,
        type: "website",
      },
    };
  }

  /**
   * Generates JSON-LD CollegeOrUniversity Schema.
   */
  generateUniversityJsonLd(university: { name: string; city: string; overview?: string | null; slug: string; websiteUrl?: string | null }) {
    return {
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      name: university.name,
      description: university.overview,
      url: `${APP_CONFIG.url}/universities/${university.slug}`,
      sameAs: university.websiteUrl || undefined,
      address: {
        "@type": "PostalAddress",
        addressLocality: university.city,
      },
    };
  }

  /**
   * Generates dynamic Next.js Metadata for Course pages.
   */
  generateCourseMetadata(course: { name: string; degreeLevel: string; slug: string }): Metadata {
    const title = `${course.name} (${course.degreeLevel}) | Curriculum & Eligibility`;
    const description = `Apply for ${course.name} (${course.degreeLevel}). Check entry requirements, tuition fees, IELTS score, and career prospects.`;
    const url = `${APP_CONFIG.url}/courses/${course.slug}`;

    return {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: APP_CONFIG.name,
        type: "website",
      },
    };
  }

  /**
   * Generates JSON-LD Course Schema.
   */
  generateCourseJsonLd(course: { name: string; overview?: string | null; slug: string }) {
    return {
      "@context": "https://schema.org",
      "@type": "Course",
      name: course.name,
      description: course.overview,
      url: `${APP_CONFIG.url}/courses/${course.slug}`,
      provider: {
        "@type": "Organization",
        name: APP_CONFIG.name,
        sameAs: APP_CONFIG.url,
      },
    };
  }
}

export const seoMetadataEngine = new SeoMetadataEngine();
