import React from "react";
import Image from "next/image";
import { Star, CheckCircle, Award } from "lucide-react";
import { Card, Badge } from "@/design-system";

export interface CounsellorCardProps {
  counsellor: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    avatarUrl?: string | null;
    counsellorProfile?: {
      specialization: string[];
      yearsExperience: number;
      rating: number;
      bio?: string | null;
    } | null;
  };
  selected: boolean;
  onSelect: () => void;
}

export const CounsellorCard: React.FC<CounsellorCardProps> = ({
  counsellor,
  selected,
  onSelect,
}) => {
  const name = `${counsellor.firstName || "Senior"} ${counsellor.lastName || "Counsellor"}`;
  const profile = counsellor.counsellorProfile;

  return (
    <Card
      variant="flat"
      padding="md"
      onClick={onSelect}
      className={`cursor-pointer transition-all duration-200 rounded-2xl border-2 ${
        selected
          ? "border-[#D4AF37] bg-[#0B1B3D]/5 shadow-xl"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
          <Image
            src={counsellor.avatarUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-[#0B1B3D] text-base font-['Outfit']">{name}</h4>
            {selected && <CheckCircle className="w-5 h-5 text-[#D4AF37]" />}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-amber-600 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {profile?.rating || 4.9}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              {profile?.yearsExperience || 10}+ Yrs Experience
            </span>
          </div>

          {profile?.specialization && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {profile.specialization.map((spec, i) => (
                <Badge key={i} variant="outline" size="sm" className="text-[10px] py-0 px-2">
                  {spec}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
