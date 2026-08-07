import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ShieldCheck, DollarSign, Calendar, ArrowRight } from "lucide-react";
import { Badge, Button } from "@/design-system";

export interface CountryHeroProps {
  country: {
    name: string;
    flagUrl?: string | null;
    heroImageUrl?: string | null;
    postStudyWorkYears: number;
    visaSuccessRate: number;
    currency: string;
    avgCostOfLivingYear: number;
    description?: string | null;
  };
}

export const CountryHero: React.FC<CountryHeroProps> = ({ country }) => {
  return (
    <section className="relative bg-[#0A192F] text-white pt-12 pb-20 overflow-hidden border-b border-[#D4AF37]/20">
      {/* Background Image Overlay */}
      {country.heroImageUrl && (
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src={country.heroImageUrl}
            alt={`Study in ${country.name}`}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/80 to-transparent" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-6 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{country.flagUrl || "🌍"}</span>
            <Badge variant="gold" size="md">
              Official Destination Guide
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Outfit'] tracking-tight">
            Study in{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4E8C1] to-[#C5A059] bg-clip-text text-transparent">
              {country.name}
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            {country.description ||
              `Complete guide to higher education, top universities, visa requirements, and career opportunities in ${country.name}.`}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <Clock className="w-5 h-5 text-[#D4AF37]" />
              <div className="flex flex-col">
                <span className="text-slate-400">Post-Study Work</span>
                <span className="font-bold text-white text-sm">{country.postStudyWorkYears} Years Permit</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div className="flex flex-col">
                <span className="text-slate-400">Visa Success Rate</span>
                <span className="font-bold text-white text-sm">{country.visaSuccessRate}% Approval</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <DollarSign className="w-5 h-5 text-[#D4AF37]" />
              <div className="flex flex-col">
                <span className="text-slate-400">Avg Cost of Living</span>
                <span className="font-bold text-white text-sm">${country.avgCostOfLivingYear.toLocaleString()}/yr</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link href="/appointments">
              <Button variant="primary" size="lg" leftIcon={<Calendar className="w-4 h-4" />}>
                Book {country.name} Consultation
              </Button>
            </Link>
            <Link href="#universities">
              <Button variant="glass" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View Partner Universities
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
