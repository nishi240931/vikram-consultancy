import React from "react";
import Link from "next/link";
import { CheckCircle2, Calendar, Video, ArrowRight, User } from "lucide-react";
import { Card, Button, Badge } from "@/design-system";

export interface ConfirmationCardProps {
  appointment: {
    id: string;
    scheduledAt: Date;
    counsellorName: string;
    meetingUrl?: string | null;
    studentName: string;
    studentEmail: string;
  };
}

export const ConfirmationCard: React.FC<ConfirmationCardProps> = ({ appointment }) => {
  const formattedDate = new Date(appointment.scheduledAt).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = new Date(appointment.scheduledAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card variant="glass" padding="xl" className="max-w-2xl mx-auto border-2 border-emerald-400/40 shadow-2xl bg-white text-slate-800 rounded-3xl">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="p-4 rounded-full bg-emerald-50 text-emerald-500 w-fit">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <Badge variant="gold" size="md">
          Consultation Booking Confirmed
        </Badge>

        <h2 className="text-3xl font-black text-[#0B1B3D] font-['Outfit']">
          You&apos;re All Set for Overseas Counselling!
        </h2>

        <p className="text-slate-600 text-sm max-w-md">
          A confirmation email and calendar invitation have been sent to{" "}
          <strong className="text-slate-900">{appointment.studentEmail}</strong>.
        </p>

        {/* Appointment Details Box */}
        <div className="w-full rounded-2xl bg-slate-50 border border-slate-200 p-6 flex flex-col gap-4 text-left text-xs my-2">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-slate-400 font-medium">Booking ID</span>
            <span className="font-mono font-bold text-slate-800 uppercase">{appointment.id}</span>
          </div>

          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-[#D4AF37]" />
            <div className="flex flex-col">
              <span className="text-slate-400">Senior Counsellor</span>
              <span className="font-bold text-slate-900 text-sm">{appointment.counsellorName}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <div className="flex flex-col">
              <span className="text-slate-400">Date & Time</span>
              <span className="font-bold text-slate-900 text-sm">{formattedDate} at {formattedTime} (IST)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Video className="w-4 h-4 text-[#D4AF37]" />
            <div className="flex flex-col">
              <span className="text-slate-400">Meeting Mode</span>
              <span className="font-bold text-emerald-600 text-sm">Google Meet Virtual Session</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
          <a
            href={appointment.meetingUrl || "https://meet.google.com/vikram-edu-consultation"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1"
          >
            <Button variant="primary" size="md" leftIcon={<Video className="w-4 h-4" />} className="w-full justify-center">
              Join Meeting Room
            </Button>
          </a>
          <Link href="/appointments" className="w-full sm:w-auto flex-1">
            <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />} className="w-full justify-center">
              View All Appointments
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
