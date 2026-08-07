"use client";

import React, { useState } from "react";
import { CounsellorCard } from "./CounsellorCard";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { ConfirmationCard } from "./ConfirmationCard";
import { appointmentService, FALLBACK_COUNSELLORS, AppointmentWithDetails } from "@/services/appointment.service";
import { Button, Input, Card } from "@/design-system";
import { Calendar, User, Mail, Phone, ArrowRight } from "lucide-react";
import { APP_CONFIG } from "@/config/app.config";

export interface ConfirmedAppointmentPayload {
  id: string;
  scheduledAt: Date;
  counsellorName: string;
  meetingUrl?: string | null;
  studentName: string;
  studentEmail: string;
}

export const BookingForm: React.FC = () => {
  const counsellors = FALLBACK_COUNSELLORS;
  const [selectedCounsellorId, setSelectedCounsellorId] = useState(counsellors[0].id);
  const [selectedDate, setSelectedDate] = useState("2025-10-15");
  const [selectedSlot, setSelectedSlot] = useState("11:00 AM");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [targetCountry, setTargetCountry] = useState("United States");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmedAppt, setConfirmedAppt] = useState<ConfirmedAppointmentPayload | null>(null);

  const slots = appointmentService.getAvailableSlots(selectedDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail || !studentPhone) {
      alert("Please fill in your name, email, and phone number.");
      return;
    }

    setLoading(true);
    try {
      const scheduledDateTime = new Date(`${selectedDate} ${selectedSlot}`);
      const newAppt: AppointmentWithDetails = await appointmentService.createAppointment({
        studentId: "student-anon",
        counsellorId: selectedCounsellorId,
        scheduledAt: scheduledDateTime,
        durationMinutes: 30,
        notes: `Country: ${targetCountry}. ${notes}`,
      });

      const counsellorObj = counsellors.find((c) => c.id === selectedCounsellorId);

      setConfirmedAppt({
        id: newAppt.id,
        scheduledAt: scheduledDateTime,
        counsellorName: `${counsellorObj?.firstName} ${counsellorObj?.lastName}`,
        meetingUrl: newAppt.meetingUrl,
        studentName,
        studentEmail,
      });
    } catch (err) {
      console.error("Booking failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (confirmedAppt) {
    return <ConfirmationCard appointment={confirmedAppt} />;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Step 1: Select Senior Counsellor */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] font-[#Outfit]">
          Step 1 — Select Overseas Education Specialist
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {counsellors.map((c) => (
            <CounsellorCard
              key={c.id}
              counsellor={c}
              selected={selectedCounsellorId === c.id}
              onSelect={() => setSelectedCounsellorId(c.id)}
            />
          ))}
        </div>
      </div>

      {/* Step 2: Date & Time Selection */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] font-[#Outfit]">
          Step 2 — Pick Date & Time Slot
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-600">Consultation Date</label>
            <input
              type="date"
              value={selectedDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-xl border border-slate-200 p-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="md:col-span-2">
            <TimeSlotSelector
              slots={slots}
              selectedSlot={selectedSlot}
              onSelectSlot={(slot) => setSelectedSlot(slot)}
            />
          </div>
        </div>
      </div>

      {/* Step 3: Student Information */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] font-[#Outfit]">
          Step 3 — Your Contact Information
        </h3>
        <Card variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name *"
            placeholder="John Doe"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            leftIcon={<User className="w-4 h-4 text-slate-400" />}
            required
          />
          <Input
            label="Email Address *"
            type="email"
            placeholder="john@example.com"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
            required
          />
          <Input
            label="Phone Number (WhatsApp) *"
            type="tel"
            placeholder="+91 98765 43210"
            value={studentPhone}
            onChange={(e) => setStudentPhone(e.target.value)}
            leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
            required
          />
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-700">Preferred Target Destination</label>
            <select
              value={targetCountry}
              onChange={(e) => setTargetCountry(e.target.value)}
              className="rounded-xl border border-slate-200 p-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-[#D4AF37]"
            >
              {APP_CONFIG.destinations.map((d) => (
                <option key={d.slug} value={d.name}>
                  {d.flag} Study in {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-700">Specific Queries / Target Degree (Optional)</label>
            <textarea
              rows={3}
              placeholder="Tell us about your target degree, GPA, or budget constraints..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="rounded-xl border border-slate-200 p-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </Card>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          variant="primary"
          size="xl"
          isLoading={loading}
          leftIcon={<Calendar className="w-5 h-5" />}
          rightIcon={<ArrowRight className="w-5 h-5" />}
          className="w-full md:w-auto shadow-2xl"
        >
          Confirm Free 1-on-1 Consultation
        </Button>
      </div>
    </form>
  );
};
