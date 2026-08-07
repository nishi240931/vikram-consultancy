import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { appointmentService } from "@/services/appointment.service";
import { AppointmentCard } from "@/components/appointments/AppointmentCard";
import { Button } from "@/design-system";
import { Calendar, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "My Consultation Appointments | Vikram Edu Consultants",
  description: "View and manage your scheduled overseas education counselling appointments.",
};

export default async function StudentAppointmentsPage() {
  const appointments = await appointmentService.getStudentAppointments("student-demo");

  return (
    <section className="py-16 bg-[#FAF9F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] font-['Outfit']">
              Student Workspace
            </span>
            <h1 className="text-3xl font-black text-[#0B1B3D] font-['Outfit']">
              My Consultation Appointments
            </h1>
          </div>

          <Link href="/book-consultation">
            <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
              Book New Consultation
            </Button>
          </Link>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#0B1B3D] mb-2 font-['Outfit']">
              No Appointments Found
            </h3>
            <p className="text-slate-600 text-sm mb-6">
              You haven&apos;t scheduled any 1-on-1 consultations yet. Book a free session with a senior study abroad expert.
            </p>
            <Link href="/book-consultation">
              <Button variant="primary" size="md">
                Schedule Consultation Now
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appt) => (
              <AppointmentCard key={appt.id} appointment={appt} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
