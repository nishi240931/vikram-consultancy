import React from "react";
import type { Metadata } from "next";
import { studentService } from "@/services/student.service";
import { UniversityCard } from "@/components/sections/UniversityCard";
import { CourseCard } from "@/components/courses/CourseCard";
import { ScholarshipCard } from "@/components/scholarships/ScholarshipCard";

export const metadata: Metadata = {
  title: "Saved Programs & Universities | Vikram Edu Consultants",
  description: "View your bookmarked universities, courses, and scholarship grants.",
};

export default async function SavedItemsPage() {
  const { universities, courses, scholarships } = await studentService.getSavedItems();

  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Saved Programs & Universities</h2>
        <p className="text-xs text-slate-500">Bookmarked opportunities for rapid comparison and application.</p>
      </div>

      {/* Saved Universities */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[#0B1B3D] font-['Outfit'] border-b border-slate-200 pb-2">
          Saved Universities ({universities.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni) => (
            <UniversityCard
              key={uni.id}
              university={{
                id: uni.id,
                name: uni.name,
                slug: uni.slug,
                countryName: uni.countryName,
                countryCode: uni.countryCode,
                flag: uni.flag,
                logo: uni.logo,
                coverImage: uni.coverImage,
                rankingGlobal: uni.rankingGlobal,
                acceptanceRate: uni.acceptanceRate,
                avgTuition: "Tuition Varies",
                city: uni.city,
                badge: "Saved Institution",
              }}
            />
          ))}
        </div>
      </div>

      {/* Saved Courses */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[#0B1B3D] font-['Outfit'] border-b border-slate-200 pb-2">
          Saved Academic Courses ({courses.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
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

      {/* Saved Scholarships */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[#0B1B3D] font-['Outfit'] border-b border-slate-200 pb-2">
          Saved Scholarships ({scholarships.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((schol) => (
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
    </div>
  );
}
