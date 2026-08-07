import React from "react";
import Link from "next/link";
import { Calendar, Video, Clock, ArrowRight, User } from "lucide-react";
import { Card, Button } from "@/design-system";
import { AppointmentStatusBadge } from "./AppointmentStatusBadge";
import { AppointmentWithDetails } from "@/services/appointment.service";

export interface AppointmentCardProps {
  appointment: AppointmentWithDetails;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const counsellorName = `${appointment.counsellor?.firstName || "Senior"} ${appointment.counsellor?.lastName || "Counsellor"}`;
  const formattedDate = new Date(appointment.scheduledAt).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = new Date(appointment.scheduledAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card
      variant="flat"
      padding="lg"
      className="flex flex-col justify-between bg-white border border-slate-200/80 rounded-2xl hover:border-[#D4AF37] hover:shadow-xl transition-all"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <AppointmentStatusBadge status={appointment.status} />
          <span className="text-xs text-slate-400 font-mono">ID: {appointment.id.slice(0, 8)}</span>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <User className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium">Assigned Counsellor</span>
            <span className="font-bold text-slate-800 text-sm font-['Outfit']">{counsellorName}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{formattedTime}</span>
          </div>
        </div>

        {appointment.notes && (
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-1">
            Notes: {appointment.notes}
          </p>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        {appointment.meetingUrl && appointment.status === "SCHEDULED" ? (
          <a
            href={appointment.meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="primary" size="sm" leftIcon={<Video className="w-3.5 h-3.5" />} className="w-full justify-center">
              Join Virtual Session
            </Button>
          </a>
        ) : (
          <span className="text-xs text-slate-400">30-Min Consultation</span>
        )}

        <Link href={`/appointments/${appointment.id}`}>
          <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            Manage
          </Button>
        </Link>
      </div>
    </Card>
  );
};
