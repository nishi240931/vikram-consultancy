import React from "react";
import Link from "next/link";
import { Clock, DollarSign, Award, ArrowRight, GraduationCap, MapPin } from "lucide-react";
import { Card, Badge, Button } from "@/design-system";

export interface CourseCardProps {
  course: {
    id: string;
    name: string;
    slug: string;
    degreeLevel: string;
    durationMonths: number;
    tuitionTotal: number;
    currency: string;
    minIeltsScore?: number | null;
    majorCategory: string;
    universityName: string;
    universityCity: string;
    countryName: string;
    countryFlag: string;
  };
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Card
      variant="flat"
      padding="lg"
      className="flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 group bg-white border border-slate-200/80 rounded-2xl"
    >
      <div className="flex flex-col gap-4">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant="gold" size="sm">
            {course.degreeLevel}
          </Badge>
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <span>{course.countryFlag}</span> {course.countryName}
          </span>
        </div>

        {/* Course Title & University */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-[#0B1B3D] group-hover:text-[#C5A059] transition-colors line-clamp-2 font-['Outfit']">
            {course.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="line-clamp-1">{course.universityName}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3" /> {course.universityCity}
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50">
            <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
            <span>{Math.round(course.durationMonths / 12 * 10) / 10} Years ({course.durationMonths} Mos)</span>
          </div>
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50">
            <DollarSign className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="font-bold text-slate-800">
              {course.currency} {course.tuitionTotal.toLocaleString()} Total
            </span>
          </div>
        </div>

        {/* IELTS requirement pill */}
        {course.minIeltsScore && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Min. IELTS: <strong className="text-slate-800">{course.minIeltsScore}</strong></span>
          </div>
        )}
      </div>

      {/* Action CTA */}
      <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
          {course.majorCategory}
        </span>
        <Link href={`/courses/${course.slug}`}>
          <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};
