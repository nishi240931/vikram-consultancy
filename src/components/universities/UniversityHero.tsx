import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, GraduationCap, MapPin, Globe, Calendar } from "lucide-react";
import { Badge, Button } from "@/design-system";

export interface UniversityHeroProps {
  university: {
    name: string;
    logoUrl?: string | null;
    coverImageUrl?: string | null;
    rankingGlobal?: number | null;
    rankingNational?: number | null;
    acceptanceRate?: number | null;
    city: string;
    websiteUrl?: string | null;
    country?: { name?: string; flagUrl?: string | null } | null;
  };
}

export const UniversityHero: React.FC<UniversityHeroProps> = ({ university }) => {
  return (
    <section className="relative bg-[#0A192F] text-white pt-12 pb-20 overflow-hidden border-b border-[#D4AF37]/20">
      {/* Cover Image Background */}
      {university.coverImageUrl && (
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src={university.coverImageUrl}
            alt={university.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/80 to-transparent" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          <div className="flex items-center gap-4">
            {university.logoUrl && (
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white p-2 border-2 border-[#D4AF37] shadow-xl flex-shrink-0">
                <Image
                  src={university.logoUrl}
                  alt={university.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
            )}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
                <span>{university.country?.flagUrl || "🏛️"}</span>
                <span>{university.country?.name || "Global Destination"}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {university.city}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] tracking-tight">
                {university.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/appointments">
              <Button variant="primary" size="lg" leftIcon={<Calendar className="w-4 h-4" />}>
                Apply to {university.name}
              </Button>
            </Link>
            {university.websiteUrl && (
              <a href={university.websiteUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="glass" size="lg" rightIcon={<Globe className="w-4 h-4" />}>
                  Official Website
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* University Stat Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 text-xs">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <Trophy className="w-6 h-6 text-[#D4AF37]" />
            <div className="flex flex-col">
              <span className="text-slate-400">Global QS Rank</span>
              <span className="font-bold text-white text-base">#{university.rankingGlobal || "Top 100"}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-[#D4AF37]" />
            <div className="flex flex-col">
              <span className="text-slate-400">Acceptance Rate</span>
              <span className="font-bold text-white text-base">{university.acceptanceRate || 35}%</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <MapPin className="w-6 h-6 text-[#D4AF37]" />
            <div className="flex flex-col">
              <span className="text-slate-400">Campus Location</span>
              <span className="font-bold text-white text-base">{university.city}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <Badge variant="gold" size="md">
              Partner Institution
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};
