import React from "react";
import { CheckCircle2, GraduationCap } from "lucide-react";
import { Card, Badge } from "@/design-system";

export interface ApplicationTimelineProps {
  application: {
    id: string;
    courseName: string;
    universityName: string;
    countryName: string;
    status: string;
    stages: Array<{
      id: string;
      status: string;
      comment?: string | null;
      createdAt: Date;
    }>;
  };
}

export const ApplicationTimeline: React.FC<ApplicationTimelineProps> = ({ application }) => {
  return (
    <Card variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-2xl flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex flex-col">
          <Badge variant="gold" size="sm" className="w-fit mb-1">
            Application Status: {application.status}
          </Badge>
          <h4 className="font-bold text-lg text-[#0B1B3D] font-['Outfit']">{application.courseName}</h4>
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" /> {application.universityName} • {application.countryName}
          </span>
        </div>
      </div>

      {/* Stage Progression List */}
      <div className="flex flex-col gap-3 pt-1">
        {application.stages.map((st) => (
          <div key={st.id} className="flex items-start gap-3 text-xs">
            <div className="p-1 rounded-full bg-emerald-50 text-emerald-500 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-800 text-sm">{st.status}</span>
              {st.comment && <span className="text-slate-500">{st.comment}</span>}
              <span className="text-[10px] text-slate-400 mt-0.5">
                {new Date(st.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
