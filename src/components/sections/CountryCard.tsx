import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, DollarSign, MapPin } from "lucide-react";
import { Card, Badge } from "@/design-system";
import { FeaturedCountry } from "@/data/countries";

export interface CountryCardProps {
  country: FeaturedCountry;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <Card
      variant="glass"
      padding="none"
      className="group flex flex-col h-full hover:border-[#D4AF37] transition-all duration-300"
    >
      {/* Country Hero Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={country.heroImage}
          alt={`Study in ${country.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/30 to-transparent" />
        
        {/* Country Flag & Name Overlay */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{country.flag}</span>
            <h3 className="text-xl font-bold font-['Outfit'] text-white drop-shadow-md">
              {country.name}
            </h3>
          </div>
          <Badge variant="navy" size="sm">
            {country.code}
          </Badge>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-6 flex flex-col flex-grow justify-between gap-4">
        <div className="flex flex-col gap-3">
          <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {country.description}
          </p>

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-semibold">{country.postStudyWork}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#D4AF37]" />
              <span>{country.avgCost}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-slate-500">{country.topCities.join(", ")}</span>
            </div>
          </div>
        </div>

        {/* Action Link */}
        <Link
          href={`/destinations/${country.slug}`}
          className="inline-flex items-center justify-between text-sm font-bold text-[#0B1B3D] group-hover:text-[#D4AF37] pt-3 border-t border-slate-100 transition-colors"
        >
          <span>Explore Destination Guide</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </Card>
  );
};
