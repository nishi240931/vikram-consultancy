import React from "react";
import type { Metadata } from "next";
import { courseService } from "@/services/course.service";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CourseCard } from "@/components/courses/CourseCard";
import { CourseSearchBar } from "@/components/courses/CourseSearchBar";
import { CourseCategoryCard } from "@/components/courses/CourseCategoryCard";
import { CtaSection } from "@/components/sections/CtaSection";
import { SEO_CONFIG } from "@/config/seo.config";
import { DegreeLevel } from "@prisma/client";
import { Cpu, Briefcase, Database, Activity, Landmark, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Course Discovery & Program Finder | Search Global Degrees",
  description:
    "Discover Bachelor's, Master's, and Doctorate degrees across top global universities in USA, UK, Canada, Australia & Europe with Vikram Edu Consultants.",
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/courses`,
  },
};

interface CoursesPageProps {
  searchParams: Promise<{
    query?: string;
    degreeLevel?: string;
    countrySlug?: string;
    page?: string;
  }>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1", 10);
  const query = resolvedParams.query || "";
  const degreeLevel = resolvedParams.degreeLevel as DegreeLevel | undefined;
  const countrySlug = resolvedParams.countrySlug || "";

  const result = await courseService.filterCourses({
    query,
    degreeLevel,
    countrySlug,
    page,
    limit: 12,
  });

  const categories = [
    { title: "Computer Science & AI", count: "120+", slug: "Computer Science", icon: <Cpu className="w-5 h-5" /> },
    { title: "Business & MBA", count: "95+", slug: "Business & Management", icon: <Briefcase className="w-5 h-5" /> },
    { title: "Data Science & Analytics", count: "80+", slug: "Data Science", icon: <Database className="w-5 h-5" /> },
    { title: "Engineering & Robotics", count: "110+", slug: "Engineering", icon: <Landmark className="w-5 h-5" /> },
    { title: "Health & Medical Sciences", count: "65+", slug: "Health Sciences", icon: <Activity className="w-5 h-5" /> },
    { title: "Law & International Relations", count: "45+", slug: "Law", icon: <Scale className="w-5 h-5" /> },
  ];

  return (
    <>
      <section className="py-16 bg-[#FAF9F5] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Academic Program Directory"
            title="Global Course Discovery &"
            highlightText="Program Finder"
            subtitle="Search accredited Bachelor's, Master's, and Doctorate programs. Compare tuition costs, duration, IELTS requirements, and career prospects."
            align="center"
            className="mb-10"
          />

          <div className="max-w-4xl mx-auto mb-12">
            <CourseSearchBar />
          </div>

          {/* Popular Major Categories */}
          <div className="mb-12">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 font-['Outfit']">
              Popular Study Fields
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat, idx) => (
                <CourseCategoryCard
                  key={idx}
                  title={cat.title}
                  count={cat.count}
                  slug={cat.slug}
                  icon={cat.icon}
                />
              ))}
            </div>
          </div>

          {/* Active Filter Counter */}
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 text-xs font-semibold text-slate-600">
            <span>
              Showing {result.courses.length} of {result.total} Academic Programs
            </span>
            {(query || degreeLevel || countrySlug) && (
              <span className="text-[#D4AF37]">
                Filters active: {query && `"${query}" `} {degreeLevel && `[${degreeLevel}] `} {countrySlug && `[${countrySlug.toUpperCase()}]`}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {result.courses.map((course) => (
              <CourseCard
                key={course.id}
                course={{
                  id: course.id,
                  name: course.name,
                  slug: course.slug,
                  degreeLevel: course.degreeLevel,
                  durationMonths: course.durationMonths,
                  tuitionTotal: course.tuitionFeeTotal,
                  currency: course.currency,
                  minIeltsScore: course.ieltsMinScore,
                  majorCategory: course.majorCategory,
                  universityName: course.university?.name || "Partner University",
                  universityCity: course.university?.city || "Global City",
                  countryName: course.university?.country?.name || "Global Destination",
                  countryFlag: course.university?.country?.flagUrl || "🎓",
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
