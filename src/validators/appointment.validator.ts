import { z } from "zod";

export const appointmentBookingSchema = z.object({
  counsellorId: z.string().min(1, "Please select a counsellor"),
  date: z.string().min(1, "Please select a consultation date"),
  timeSlot: z.string().min(1, "Please select a time slot"),
  studentName: z.string().min(2, "Full name is required"),
  studentEmail: z.string().email("Valid email address is required"),
  studentPhone: z.string().min(10, "Valid phone number is required"),
  targetCountry: z.string().optional(),
  targetDegree: z.string().optional(),
  notes: z.string().optional(),
});

export const appointmentRescheduleSchema = z.object({
  appointmentId: z.string().min(1, "Appointment ID is required"),
  newDate: z.string().min(1, "Please select a new date"),
  newTimeSlot: z.string().min(1, "Please select a new time slot"),
});

export const appointmentCancelSchema = z.object({
  appointmentId: z.string().min(1, "Appointment ID is required"),
  reason: z.string().optional(),
});

export type AppointmentBookingInput = z.infer<typeof appointmentBookingSchema>;
export type AppointmentRescheduleInput = z.infer<typeof appointmentRescheduleSchema>;
export type AppointmentCancelInput = z.infer<typeof appointmentCancelSchema>;
