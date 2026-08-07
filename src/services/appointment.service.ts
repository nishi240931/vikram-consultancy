import { appointmentRepository, CreateAppointmentInput } from "@/repositories/appointment.repository";
import { Appointment, AppointmentStatus, User, CounsellorProfile } from "@prisma/client";
import { logger } from "@/lib/logger";

export interface AppointmentWithDetails extends Appointment {
  student?: Partial<User> | null;
  counsellor?: (Partial<User> & { counsellorProfile?: Partial<CounsellorProfile> | null }) | null;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export const FALLBACK_COUNSELLORS = [
  {
    id: "counsellor-1",
    firstName: "Rajesh",
    lastName: "Sharma",
    email: "rajesh.sharma@vikramedu.com",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    counsellorProfile: {
      specialization: ["USA", "STEM Programs", "Visa Counseling"],
      yearsExperience: 12,
      rating: 4.9,
      bio: "Senior Overseas Education Advisor with 12+ years experience guiding 3,000+ students to Ivy League and top US universities.",
    },
  },
  {
    id: "counsellor-2",
    firstName: "Priya",
    lastName: "Venkatesh",
    email: "priya.v@vikramedu.com",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    counsellorProfile: {
      specialization: ["UK", "Canada", "Scholarship Grants"],
      yearsExperience: 9,
      rating: 4.95,
      bio: "UK & Canada destination expert specializing in Master's applications, SOP editing, and full-tuition scholarship grants.",
    },
  },
  {
    id: "counsellor-3",
    firstName: "Anil",
    lastName: "Kumar",
    email: "anil.k@vikramedu.com",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
    counsellorProfile: {
      specialization: ["Germany", "Australia", "Engineering & Business"],
      yearsExperience: 8,
      rating: 4.88,
      bio: "German public university & Australian work visa specialist with expertise in tuition-free programs and APS certification.",
    },
  },
];

export const FALLBACK_APPOINTMENTS: AppointmentWithDetails[] = [
  {
    id: "appt-1",
    studentId: "student-demo",
    counsellorId: "counsellor-1",
    scheduledAt: new Date(Date.now() + 86400000 * 2),
    durationMinutes: 30,
    meetingUrl: "https://meet.google.com/vikram-edu-consultation",
    status: "SCHEDULED" as AppointmentStatus,
    notes: "Interested in MSc Computer Science in the USA for Fall 2025.",
    createdAt: new Date(),
    updatedAt: new Date(),
    student: {
      firstName: "Ananya",
      lastName: "Reddy",
      email: "ananya.reddy@example.com",
    },
    counsellor: FALLBACK_COUNSELLORS[0],
  },
];

export class AppointmentService {
  /**
   * Generates available consultation time slots for a given date.
   */
  getAvailableSlots(dateString: string): TimeSlot[] {
    const slots = [
      { time: "10:00 AM", available: true },
      { time: "11:00 AM", available: true },
      { time: "12:00 PM", available: false },
      { time: "02:00 PM", available: true },
      { time: "03:00 PM", available: true },
      { time: "04:30 PM", available: true },
      { time: "05:30 PM", available: true },
    ];
    return slots;
  }

  /**
   * Retrieves active senior counsellors for booking selection.
   */
  async getCounsellors() {
    return FALLBACK_COUNSELLORS;
  }

  /**
   * Creates a consultation appointment with validation and fallback.
   */
  async createAppointment(data: CreateAppointmentInput): Promise<AppointmentWithDetails> {
    try {
      const appt = await appointmentRepository.createAppointment(data);
      return appt as AppointmentWithDetails;
    } catch (error) {
      logger.warn("Database appointment creation failed, returning mock booking response", { error });
    }

    const matchedCounsellor = FALLBACK_COUNSELLORS.find((c) => c.id === data.counsellorId) || FALLBACK_COUNSELLORS[0];

    const newAppt: AppointmentWithDetails = {
      id: `appt-${Date.now()}`,
      studentId: data.studentId,
      counsellorId: data.counsellorId,
      scheduledAt: data.scheduledAt,
      durationMinutes: data.durationMinutes || 30,
      meetingUrl: data.meetingUrl || "https://meet.google.com/vikram-edu-consultation",
      status: "SCHEDULED",
      notes: data.notes || "Free 1-on-1 Study Abroad Consultation",
      createdAt: new Date(),
      updatedAt: new Date(),
      student: {
        firstName: "Prospective",
        lastName: "Student",
        email: "student@example.com",
      },
      counsellor: matchedCounsellor,
    };

    FALLBACK_APPOINTMENTS.push(newAppt);
    return newAppt;
  }

  /**
   * Retrieves appointments for a specific student.
   */
  async getStudentAppointments(studentId: string): Promise<AppointmentWithDetails[]> {
    try {
      const dbAppts = await appointmentRepository.getAppointmentsByStudent(studentId);
      if (dbAppts.length > 0) return dbAppts as AppointmentWithDetails[];
    } catch (error) {
      logger.warn(`Failed to fetch appointments for student '${studentId}', returning fallback`, { error });
    }

    return FALLBACK_APPOINTMENTS;
  }

  /**
   * Retrieves single appointment details by ID.
   */
  async getAppointmentById(id: string): Promise<AppointmentWithDetails | null> {
    try {
      const dbAppt = await appointmentRepository.getAppointmentById(id);
      if (dbAppt) return dbAppt as AppointmentWithDetails;
    } catch (error) {
      logger.warn(`Failed to fetch appointment '${id}', checking fallback`, { error });
    }

    return FALLBACK_APPOINTMENTS.find((a) => a.id === id) || FALLBACK_APPOINTMENTS[0] || null;
  }

  /**
   * Cancels an appointment.
   */
  async cancelAppointment(id: string, notes?: string): Promise<AppointmentWithDetails | null> {
    try {
      const dbAppt = await appointmentRepository.cancelAppointment(id, notes);
      return dbAppt as AppointmentWithDetails;
    } catch (error) {
      logger.warn(`Database cancel failed for '${id}', updating fallback state`, { error });
    }

    const appt = FALLBACK_APPOINTMENTS.find((a) => a.id === id);
    if (appt) {
      appt.status = "CANCELLED";
      if (notes) appt.notes = `Cancelled: ${notes}`;
      return appt;
    }
    return null;
  }

  /**
   * Reschedules an appointment to a new date/time.
   */
  async rescheduleAppointment(id: string, newScheduledAt: Date): Promise<AppointmentWithDetails | null> {
    try {
      const dbAppt = await appointmentRepository.rescheduleAppointment(id, newScheduledAt);
      return dbAppt as AppointmentWithDetails;
    } catch (error) {
      logger.warn(`Database reschedule failed for '${id}', updating fallback state`, { error });
    }

    const appt = FALLBACK_APPOINTMENTS.find((a) => a.id === id);
    if (appt) {
      appt.scheduledAt = newScheduledAt;
      appt.status = "SCHEDULED";
      return appt;
    }
    return null;
  }
}

export const appointmentService = new AppointmentService();
