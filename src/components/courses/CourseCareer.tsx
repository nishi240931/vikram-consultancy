import React from "react";
import { TrendingUp, CheckCircle2 } from "lucide-react";
import { Card } from "@/design-system";

export interface CourseCareerProps {
  careerProspects?: string[];
  courseName: string;
}

export const CourseCareer: React.FC<CourseCareerProps> = ({
  careerProspects = ["Senior Software Engineer", "Data Scientist", "Tech Lead", "Solutions Architect"],
  courseName,
}) => {
  return (
    <section className="py-16 bg-[#FAF9F5] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
              Career Acceleration
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] font-['Outfit']">
              Career Outcomes & <span className="text-[#C5A059]">Job Opportunities</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Graduates of {courseName} enter high-demand industry sectors with competitive starting salaries, strong employer reputation, and post-study work visa eligibility.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {careerProspects.map((job, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm font-semibold text-slate-800 p-3 rounded-xl bg-white border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>{job}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card variant="dark" padding="lg" className="border-2 border-[#D4AF37]/40 shadow-xl text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Avg Graduate Starting Salary</span>
                  <span className="text-2xl font-black font-['Outfit'] text-[#D4AF37]">$85,000 - $120,000 / yr</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
                Includes OPT / STEM extension eligible job roles across Fortune 500 tech companies and high-growth startups.
              </p>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
};
