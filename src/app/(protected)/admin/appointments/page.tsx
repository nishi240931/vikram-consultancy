import React from "react";
import type { Metadata } from "next";
import { appointmentService } from "@/services/appointment.service";
import { DataTable } from "@/components/admin/DataTable";
import { AppointmentStatusBadge } from "@/components/appointments/AppointmentStatusBadge";
import { Button } from "@/design-system";
import { Calendar, Video } from "lucide-react";

export const metadata: Metadata = {
  title: "Consultation Operations | Vikram Edu Admin",
  description: "Manage virtual 1-on-1 counselling schedules and Google Meet room assignments.",
};

export default async function AdminAppointmentsPage() {
  const appointments = await appointmentService.getStudentAppointments("student-demo");

  const columns = [
    {
      header: "Booking Ref ID",
      accessorKey: "id" as const,
    },
    {
      header: "Status",
      cell: (item: typeof appointments[0]) => <AppointmentStatusBadge status={item.status} />,
    },
    {
      header: "Student",
      cell: (item: typeof appointments[0]) => (
        <span className="font-bold text-slate-800">
          {item.student?.firstName || "Student"} {item.student?.lastName || ""}
        </span>
      ),
    },
    {
      header: "Counsellor",
      cell: (item: typeof appointments[0]) => (
        <span className="font-semibold text-[#0B1B3D]">
          {item.counsellor?.firstName} {item.counsellor?.lastName}
        </span>
      ),
    },
    {
      header: "Scheduled Date & Time",
      cell: (item: typeof appointments[0]) => (
        <span className="text-xs font-mono">
          {new Date(item.scheduledAt).toLocaleString()}
        </span>
      ),
    },
    {
      header: "Meeting Link",
      cell: (item: typeof appointments[0]) =>
        item.meetingUrl ? (
          <a href={item.meetingUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1">
            <Video className="w-3.5 h-3.5" /> Virtual Room
          </a>
        ) : (
          <span className="text-xs text-slate-400">Pending</span>
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Consultation Operations</h2>
          <p className="text-xs text-slate-500">Monitor live counselling bookings, reassign senior advisors, and update session notes.</p>
        </div>
      </div>

      <DataTable columns={columns} data={appointments} keyExtractor={(item) => item.id} />
    </div>
  );
}
