import React from "react";
import { BookOpen, Wifi, Shield, Cpu, Utensils, Compass } from "lucide-react";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/design-system";

export const UniversityFacilities: React.FC = () => {
  const facilities = [
    { icon: <BookOpen className="w-6 h-6 text-[#D4AF37]" />, title: "24/7 Digital Library", desc: "Access millions of e-journals, research papers, and quiet study hubs." },
    { icon: <Cpu className="w-6 h-6 text-[#D4AF37]" />, title: "Advanced Innovation Labs", desc: "High-performance computing clusters and robotics testing facilities." },
    { icon: <Wifi className="w-6 h-6 text-[#D4AF37]" />, title: "Campus-Wide High-Speed Wi-Fi", desc: "Seamless connectivity across all lecture halls and student dorms." },
    { icon: <Utensils className="w-6 h-6 text-[#D4AF37]" />, title: "Multicultural Dining & Cafes", desc: "Diverse international food courts catering to halal, vegan, and Asian diets." },
    { icon: <Shield className="w-6 h-6 text-[#D4AF37]" />, title: "24/7 On-Campus Security", desc: "Safe learning environment with CCTV monitoring and emergency security escorts." },
    { icon: <Compass className="w-6 h-6 text-[#D4AF37]" />, title: "Career & Placement Center", desc: "Dedicated placement cell organizing campus job fairs and internship drives." },
  ];

  return (
    <section className="py-16 bg-[#FAF9F5] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Campus Life"
          title="World-Class Campus"
          highlightText="Facilities & Infrastructure"
          subtitle="Discover state-of-the-art academic and recreational amenities provided to international students."
          align="center"
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac, idx) => (
            <Card key={idx} variant="flat" padding="md" className="flex items-start gap-4 hover:border-[#D4AF37] transition-all">
              <div className="p-3 rounded-xl bg-[#0B1B3D]/5 flex-shrink-0">{fac.icon}</div>
              <div className="flex flex-col">
                <h4 className="font-bold text-slate-800 text-base font-['Outfit']">{fac.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{fac.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
