import React from "react";
import { GraduationCap, Bookmark, FileText, Calendar } from "lucide-react";
import { Card } from "@/design-system";

export interface StatisticsCardsProps {
  summary: {
    totalApplications: number;
    savedUniversitiesCount: number;
    savedCoursesCount: number;
    savedScholarshipsCount: number;
    upcomingAppointmentsCount: number;
  };
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({ summary }) => {
  const stats = [
    {
      title: "Active Applications",
      value: summary.totalApplications,
      subtitle: "1 Submitted to Portal",
      icon: <GraduationCap className="w-5 h-5 text-[#D4AF37]" />,
      border: "border-l-4 border-l-[#D4AF37]",
    },
    {
      title: "Saved Programs",
      value: summary.savedCoursesCount + summary.savedUniversitiesCount,
      subtitle: `${summary.savedUniversitiesCount} Unis • ${summary.savedCoursesCount} Courses`,
      icon: <Bookmark className="w-5 h-5 text-emerald-500" />,
      border: "border-l-4 border-l-emerald-500",
    },
    {
      title: "Document Vault",
      value: 3,
      subtitle: "2 Verified by Team",
      icon: <FileText className="w-5 h-5 text-indigo-500" />,
      border: "border-l-4 border-l-indigo-500",
    },
    {
      title: "Consultations",
      value: summary.upcomingAppointmentsCount,
      subtitle: "Next: 15 Oct, 11:00 AM",
      icon: <Calendar className="w-5 h-5 text-amber-500" />,
      border: "border-l-4 border-l-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((st, idx) => (
        <Card key={idx} variant="flat" padding="md" className={`bg-white border border-slate-200 rounded-2xl ${st.border}`}>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-medium">{st.title}</span>
              <span className="text-3xl font-black text-[#0B1B3D] font-['Outfit'] mt-1">{st.value}</span>
              <span className="text-[11px] text-slate-400 font-normal mt-1">{st.subtitle}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">{st.icon}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};
