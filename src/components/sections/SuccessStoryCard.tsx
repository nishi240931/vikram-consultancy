import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { SuccessStory } from "@/data/testimonials";

export interface SuccessStoryCardProps {
  story: SuccessStory;
}

export const SuccessStoryCard: React.FC<SuccessStoryCardProps> = ({ story }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group h-[410px] w-full">
      {/* 1. Student Photograph Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 flex-shrink-0">
        <Image
          src={story.avatar}
          alt={`${story.studentName} - ${story.universityName}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* 2. Country Badge (Positioned at bottom-left of image boundary) */}
        <div className="absolute -bottom-3.5 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-bold text-slate-800 shadow-md border border-slate-100 whitespace-nowrap">
          <span className="text-sm">{story.flag}</span>
          <span className="font-semibold text-slate-900">{story.countryName}</span>
        </div>
      </div>

      {/* 3. Card Body Content (Left-aligned as in reference) */}
      <div className="pt-6 px-5 pb-5 flex flex-col flex-grow justify-between text-left gap-2">
        <div className="flex flex-col gap-1">
          {/* Student Name */}
          <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-['Outfit']">
            {story.studentName}
          </h4>

          {/* Academic Qualification & CGPA */}
          <p className="text-xs font-semibold text-slate-500">
            {story.qualification} &nbsp;&bull;&nbsp; {story.cgpa}
          </p>

          {/* Light Divider Line */}
          <div className="w-full h-[1px] bg-slate-100 my-2" />

          {/* Course / Program */}
          <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-1">
            {story.courseName}
          </p>

          {/* University Name */}
          <p className="text-xs text-slate-500 font-medium line-clamp-1">
            {story.universityName}
          </p>
        </div>

        {/* 4. Success Status Badge (Green pill with checkmark) */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70 w-fit mt-1">
          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
          <span>{story.status.replace(/^✓\s*/, "")}</span>
        </div>
      </div>
    </div>
  );
};
