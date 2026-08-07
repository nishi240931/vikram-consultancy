import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/design-system";

export interface ScholarshipTypeCardProps {
  title: string;
  count: string;
  type: string;
  icon: React.ReactNode;
}

export const ScholarshipTypeCard: React.FC<ScholarshipTypeCardProps> = ({
  title,
  count,
  type,
  icon,
}) => {
  return (
    <Link href={`/scholarships?type=${type}`}>
      <Card
        variant="flat"
        padding="md"
        className="flex items-center justify-between hover:border-[#D4AF37] hover:shadow-lg transition-all group bg-white border border-slate-200/80 rounded-2xl"
      >
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-[#0B1B3D] group-hover:text-white transition-colors">
            {icon}
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-slate-800 text-sm group-hover:text-[#C5A059] transition-colors font-['Outfit']">
              {title}
            </h4>
            <span className="text-xs text-slate-400 font-medium">{count} Awards</span>
          </div>
        </div>
        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#D4AF37] transition-colors" />
      </Card>
    </Link>
  );
};
