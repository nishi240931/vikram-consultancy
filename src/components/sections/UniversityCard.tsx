import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy, GraduationCap, MapPin } from "lucide-react";
import { Card, Badge } from "@/design-system";
import { FeaturedUniversity } from "@/data/universities";

export interface UniversityCardProps {
  university: FeaturedUniversity;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({ university }) => {
  return (
    <Card
      variant="flat"
      padding="none"
      className="group flex flex-col h-full hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 border border-slate-200/80"
    >
      {/* Cover Image & Ranking Badge */}
      <div className="relative h-40 w-full overflow-hidden bg-slate-900">
        <Image
          src={university.coverImage}
          alt={university.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        
        {university.badge && (
          <div className="absolute top-3 right-3">
            <Badge variant="gold" size="sm" className="shadow-md">
              {university.badge}
            </Badge>
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium">
            <span>{university.flag}</span>
            <span>{university.countryName}</span>
            <span>•</span>
            <span className="flex items-center gap-0.5">
              <MapPin className="w-3 h-3 text-[#D4AF37]" /> {university.city}
            </span>
          </div>

          <h3 className="text-lg font-bold text-[#0B1B3D] group-hover:text-[#C5A059] transition-colors line-clamp-1">
            {university.name}
          </h3>

          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
            <div className="flex flex-col">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Trophy className="w-3 h-3 text-[#D4AF37]" /> Global Rank
              </span>
              <span className="font-bold text-slate-800 text-sm">#{university.rankingGlobal}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-[#D4AF37]" /> Acceptance
              </span>
              <span className="font-bold text-slate-800 text-sm">{university.acceptanceRate}</span>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <Link
          href={`/universities/${university.slug}`}
          className="inline-flex items-center justify-between text-xs font-bold text-[#0B1B3D] group-hover:text-[#D4AF37] pt-3 border-t border-slate-100 transition-colors"
        >
          <span>View Programs & Entry Requirements</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </Card>
  );
};
