import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courseService } from "@/services/course.service";
import { seoMetadataEngine } from "@/services/seo/seo-metadata.engine";
import { CourseHero } from "@/components/courses/CourseHero";
import { CourseEligibility } from "@/components/courses/CourseEligibility";
import { CourseCareer } from "@/components/courses/CourseCareer";
import { CourseCTA } from "@/components/courses/CourseCTA";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await courseService.getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found",
      description: "The requested academic program details could not be found.",
    };
  }

  return seoMetadataEngine.generateCourseMetadata({
    name: course.name,
    degreeLevel: course.degreeLevel,
    slug: course.slug,
  });
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await courseService.getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const jsonLd = seoMetadataEngine.generateCourseJsonLd({
    name: course.name,
    overview: course.overview,
    slug: course.slug,
  });

  return (
    <>
      {/* Inject Structured JSON-LD Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CourseHero
        course={{
          name: course.name,
          degreeLevel: course.degreeLevel,
          durationMonths: course.durationMonths,
          tuitionTotal: course.tuitionFeeTotal,
          currency: course.currency,
          minIeltsScore: course.ieltsMinScore,
          intakes: course.intakeSemesters || ["Fall (Sept)", "Spring (Jan)"],
          universityName: course.university?.name || "Partner University",
          universityCity: course.university?.city || "Major City",
          countryName: course.university?.country?.name || "Global Destination",
          countryFlag: course.university?.country?.flagUrl || "🎓",
          overview: course.overview,
        }}
      />

      <CourseEligibility
        minIeltsScore={course.ieltsMinScore}
        minGpa={3.2}
        greRequired={course.greRequired}
        intakes={course.intakeSemesters || ["Fall (Sept)", "Spring (Jan)"]}
      />

      <CourseCareer
        courseName={course.name}
        careerProspects={["Senior Specialist", "Lead Engineer", "Consultant", "Director"]}
      />

      <CourseCTA courseName={course.name} />
    </>
  );
}
