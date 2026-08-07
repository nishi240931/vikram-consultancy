import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { appointmentService } from "@/services/appointment.service";
import { AppointmentStatusBadge } from "@/components/appointments/AppointmentStatusBadge";
import { Card, Button, Badge } from "@/design-system";
import { Calendar, Video, Clock, User, ArrowLeft, RotateCcw, XCircle, Phone } from "lucide-react";
import { APP_CONFIG } from "@/config/app.config";

interface AppointmentPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: AppointmentPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Manage Appointment #${id.slice(0, 8)} | Vikram Edu`,
    description: "Manage your scheduled 1-on-1 overseas education consultation.",
  };
}

export default async function AppointmentDetailsPage({ params }: AppointmentPageProps) {
  const { id } = await params;
  const appointment = await appointmentService.getAppointmentById(id);

  if (!appointment) {
    notFound();
  }

  const counsellorName = `${appointment.counsellor?.firstName || "Senior"} ${appointment.counsellor?.lastName || "Counsellor"}`;
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
    <section className="py-16 bg-[#FAF9F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/appointments" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#0B1B3D] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to My Appointments
        </Link>

        <Card variant="glass" padding="xl" className="bg-white border border-slate-200 rounded-3xl shadow-xl">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <AppointmentStatusBadge status={appointment.status} />
                <span className="text-xs text-slate-400 font-mono">ID: {appointment.id}</span>
              </div>
              <Badge variant="outline" size="sm">
                30-Minute Virtual Session
              </Badge>
            </div>

            {/* Counsellor Info */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="p-3 rounded-xl bg-[#0B1B3D]/5 text-[#D4AF37]">
                <User className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400">Assigned Senior Counsellor</span>
                <span className="text-lg font-bold text-[#0B1B3D] font-['Outfit']">{counsellorName}</span>
                <span className="text-xs text-slate-500">{appointment.counsellor?.email}</span>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Calendar className="w-5 h-5 text-[#D4AF37]" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Scheduled Date</span>
                  <span className="font-bold text-slate-800 text-sm">{formattedDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Time Slot (IST)</span>
                  <span className="font-bold text-slate-800 text-sm">{formattedTime}</span>
                </div>
              </div>
            </div>

            {/* Meeting Link Banner */}
            {appointment.meetingUrl && appointment.status === "SCHEDULED" && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0A192F] to-[#162C5B] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Video className="w-6 h-6 text-[#D4AF37]" />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">Google Meet Link Ready</span>
                    <span className="text-xs text-slate-300">Click below to enter virtual session room</span>
                  </div>
                </div>
                <a
                  href={appointment.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="primary" size="md" className="w-full justify-center">
                    Join Virtual Room
                  </Button>
                </a>
              </div>
            )}

            {/* Notes */}
            {appointment.notes && (
              <div className="flex flex-col gap-1 border-t border-slate-100 pt-4">
                <span className="text-xs font-bold text-slate-500 uppercase">Consultation Notes</span>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {appointment.notes}
                </p>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
                  Reschedule
                </Button>
                <Button variant="ghost" size="sm" leftIcon={<XCircle className="w-3.5 h-3.5 text-rose-500" />} className="text-rose-600">
                  Cancel Booking
                </Button>
              </div>

              <a
                href={`tel:${APP_CONFIG.contact.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#D4AF37]"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Support: {APP_CONFIG.contact.phone}</span>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
