import React from "react";
import Link from "next/link";
import { Clock, DollarSign, Award, Calendar, ArrowRight, GraduationCap, MapPin } from "lucide-react";
import { Badge, Button } from "@/design-system";

export interface CourseHeroProps {
  course: {
    name: string;
    degreeLevel: string;
    durationMonths: number;
    tuitionTotal: number;
    currency: string;
    minIeltsScore?: number | null;
    intakes: string[];
    universityName: string;
    universityCity: string;
    countryName: string;
    countryFlag: string;
    overview?: string | null;
  };
}

export const CourseHero: React.FC<CourseHeroProps> = ({ course }) => {
  return (
    <section className="relative bg-[#0A192F] text-white pt-12 pb-20 overflow-hidden border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-6 max-w-3xl">
          
          <div className="flex items-center gap-3">
            <Badge variant="gold" size="md">
              {course.degreeLevel} Program
            </Badge>
            <span className="text-xs text-slate-300 flex items-center gap-1">
              <span>{course.countryFlag}</span> {course.countryName}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] tracking-tight">
            {course.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300 font-medium">
            <span className="flex items-center gap-1.5 text-[#D4AF37]">
              <GraduationCap className="w-4 h-4" /> {course.universityName}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <MapPin className="w-4 h-4" /> {course.universityCity}
            </span>
          </div>

          <p className="text-slate-300 text-base leading-relaxed font-normal">
            {course.overview ||
              `Comprehensive ${course.degreeLevel} program in ${course.name} at ${course.universityName}, designed for international students looking to advance their technical skills and career prospects.`}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <Clock className="w-5 h-5 text-[#D4AF37]" />
              <div className="flex flex-col">
                <span className="text-slate-400">Program Duration</span>
                <span className="font-bold text-white text-sm">
                  {Math.round((course.durationMonths / 12) * 10) / 10} Years ({course.durationMonths} Mos)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <div className="flex flex-col">
                <span className="text-slate-400">Total Tuition Fee</span>
                <span className="font-bold text-white text-sm">
                  {course.currency} {course.tuitionTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <Award className="w-5 h-5 text-[#D4AF37]" />
              <div className="flex flex-col">
                <span className="text-slate-400">IELTS Requirement</span>
                <span className="font-bold text-white text-sm">{course.minIeltsScore || 6.5} Overall</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link href="/book-consultation">
              <Button variant="primary" size="lg" leftIcon={<Calendar className="w-4 h-4" />}>
                Apply for Course
              </Button>
            </Link>
            <Link href="#requirements">
              <Button variant="glass" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View Admission Requirements
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
