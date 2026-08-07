import React from "react";
import { UserCheck, Search, FileEdit, ShieldCheck, Award, GraduationCap, CheckCircle2, ArrowRight } from "lucide-react";
import { Card, Badge } from "@/design-system";
import { ServiceItem } from "@/data/services";

const ICON_MAP: Record<string, React.ReactNode> = {
  UserCheck: <UserCheck className="w-6 h-6 text-[#D4AF37]" />,
  Search: <Search className="w-6 h-6 text-[#D4AF37]" />,
  FileEdit: <FileEdit className="w-6 h-6 text-[#D4AF37]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
  Award: <Award className="w-6 h-6 text-[#D4AF37]" />,
  GraduationCap: <GraduationCap className="w-6 h-6 text-[#D4AF37]" />,
};

export interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Card
      variant="flat"
      padding="lg"
      className="group flex flex-col justify-between h-full hover:border-[#D4AF37] hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-2xl bg-[#0B1B3D]/5 text-[#D4AF37] group-hover:bg-[#0B1B3D] transition-colors">
            {ICON_MAP[service.iconName] || <GraduationCap className="w-6 h-6 text-[#D4AF37]" />}
          </div>
          {service.badge && (
            <Badge variant="gold" size="sm">
              {service.badge}
            </Badge>
          )}
        </div>

        <h3 className="text-xl font-bold text-[#0B1B3D] mb-2 font-['Outfit'] group-hover:text-[#C5A059] transition-colors">
          {service.title}
        </h3>
        
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        <ul className="flex flex-col gap-2 pt-4 border-t border-slate-100 mb-6">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center text-xs font-bold text-[#0B1B3D] group-hover:text-[#D4AF37] transition-colors pt-2">
        <span>Learn More About This Service</span>
        <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Card>
  );
};
