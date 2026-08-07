import { prisma } from "@/lib/prisma";
import type { Appointment, AppointmentStatus } from "@prisma/client";

export interface CreateAppointmentInput {
  studentId: string;
  counsellorId: string;
  scheduledAt: Date;
  durationMinutes?: number;
  notes?: string;
  meetingUrl?: string;
}

export class AppointmentRepository {
  async getAppointments(): Promise<Appointment[]> {
    return prisma.appointment.findMany({
      include: {
        student: true,
        counsellor: { include: { counsellorProfile: true } },
      },
      orderBy: { scheduledAt: "desc" },
    });
  }

  async getAppointmentById(id: string): Promise<Appointment | null> {
    return prisma.appointment.findUnique({
      where: { id },
      include: {
        student: true,
        counsellor: { include: { counsellorProfile: true } },
      },
    });
  }

  async getAppointmentsByStudent(studentId: string): Promise<Appointment[]> {
    return prisma.appointment.findMany({
      where: { studentId },
      include: {
        counsellor: { include: { counsellorProfile: true } },
      },
      orderBy: { scheduledAt: "desc" },
    });
  }

  async getAppointmentsByCounsellor(counsellorId: string): Promise<Appointment[]> {
    return prisma.appointment.findMany({
      where: { counsellorId },
      include: { student: true },
      orderBy: { scheduledAt: "desc" },
    });
  }

  async createAppointment(data: CreateAppointmentInput): Promise<Appointment> {
    return prisma.appointment.create({
      data: {
        studentId: data.studentId,
        counsellorId: data.counsellorId,
        scheduledAt: data.scheduledAt,
        durationMinutes: data.durationMinutes || 30,
        notes: data.notes,
        meetingUrl: data.meetingUrl || "https://meet.google.com/vikram-edu-consultation",
        status: "SCHEDULED",
      },
      include: {
        student: true,
        counsellor: { include: { counsellorProfile: true } },
      },
    });
  }

  async updateAppointment(id: string, data: Partial<Appointment>): Promise<Appointment> {
    return prisma.appointment.update({
      where: { id },
      data,
      include: {
        student: true,
        counsellor: { include: { counsellorProfile: true } },
      },
    });
  }

  async cancelAppointment(id: string, notes?: string): Promise<Appointment> {
    return prisma.appointment.update({
      where: { id },
      data: {
        status: "CANCELLED",
        ...(notes && { notes: `Cancelled: ${notes}` }),
      },
      include: {
        student: true,
        counsellor: { include: { counsellorProfile: true } },
      },
    });
  }

  async rescheduleAppointment(id: string, newScheduledAt: Date): Promise<Appointment> {
    return prisma.appointment.update({
      where: { id },
      data: {
        scheduledAt: newScheduledAt,
        status: "SCHEDULED",
      },
      include: {
        student: true,
        counsellor: { include: { counsellorProfile: true } },
      },
    });
  }

  async getUpcomingAppointments(limit: number = 5): Promise<Appointment[]> {
    return prisma.appointment.findMany({
      where: {
        scheduledAt: { gte: new Date() },
        status: "SCHEDULED",
      },
      include: {
        student: true,
        counsellor: { include: { counsellorProfile: true } },
      },
      take: limit,
      orderBy: { scheduledAt: "asc" },
    });
  }
}

export const appointmentRepository = new AppointmentRepository();
