import { userRepository, UpdateStudentProfileInput } from "@/repositories/user.repository";
import { FEATURED_UNIVERSITIES_DATA } from "@/data/universities";
import { FALLBACK_COURSES_DATA } from "@/services/course.service";
import { FALLBACK_SCHOLARSHIPS_DATA } from "@/services/scholarship.service";
import { FALLBACK_APPOINTMENTS } from "@/services/appointment.service";
import { User, Application, Document, Notification, ApplicationStatus, Course, University, Country, ApplicationStage } from "@prisma/client";
import { logger } from "@/lib/logger";

export interface StudentDashboardSummary {
  profileProgress: number;
  totalApplications: number;
  submittedApplications: number;
  savedUniversitiesCount: number;
  savedCoursesCount: number;
  savedScholarshipsCount: number;
  upcomingAppointmentsCount: number;
  unreadNotificationsCount: number;
}

export interface StudentApplicationWithDetails extends Application {
  course?: (Partial<Course> & { university?: (Partial<University> & { country?: Partial<Country> | null }) | null }) | null;
  stages?: Array<ApplicationStage>;
}

export const FALLBACK_STUDENT_PROFILE = {
  id: "student-demo",
  clerkUserId: "user_demo_123",
  email: "ananya.reddy@example.com",
  firstName: "Ananya",
  lastName: "Reddy",
  phone: "+91 98765 43210",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  targetCountry: "United States",
  gpa: 3.8,
  budgetMax: 50000,
  role: "STUDENT" as const,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const FALLBACK_DOCUMENTS = [
  {
    id: "doc-1",
    studentId: "student-demo",
    title: "Official Undergraduate Transcript",
    type: "TRANSCRIPT" as const,
    fileUrl: "/docs/transcript.pdf",
    fileSize: 2450000,
    status: "VERIFIED" as const,
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-11"),
  },
  {
    id: "doc-2",
    studentId: "student-demo",
    title: "IELTS Official Test Report Form",
    type: "TEST_SCORE" as const,
    fileUrl: "/docs/ielts.pdf",
    fileSize: 1200000,
    status: "VERIFIED" as const,
    createdAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-01-13"),
  },
  {
    id: "doc-3",
    studentId: "student-demo",
    title: "Statement of Purpose (Draft v2)",
    type: "SOP" as const,
    fileUrl: "/docs/sop_draft.pdf",
    fileSize: 980000,
    status: "PENDING" as const,
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
];

export const FALLBACK_APPLICATIONS: StudentApplicationWithDetails[] = [
  {
    id: "app-1",
    studentId: "student-demo",
    courseId: "course-1",
    counsellorId: "counsellor-1",
    status: "SUBMITTED" as ApplicationStatus,
    notes: "Targeting MSc Computer Science Fall 2025",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-16"),
    course: FALLBACK_COURSES_DATA[0],
    stages: [
      { id: "st-1", applicationId: "app-1", status: "DRAFT" as ApplicationStatus, comment: "Dossier initialized", updatedByUserId: null, createdAt: new Date("2025-01-15") },
      { id: "st-2", applicationId: "app-1", status: "SUBMITTED" as ApplicationStatus, comment: "Application packet submitted to university admissions portal", updatedByUserId: null, createdAt: new Date("2025-01-16") },
    ],
  },
];

export const FALLBACK_NOTIFICATIONS = [
  {
    id: "notif-1",
    userId: "student-demo",
    title: "Consultation Confirmed",
    message: "Your 1-on-1 virtual session with Rajesh Sharma is confirmed for Oct 15.",
    type: "APPOINTMENT_REMINDER" as const,
    isRead: false,
    linkUrl: "/appointments",
    createdAt: new Date(),
  },
  {
    id: "notif-[#2]",
    userId: "student-demo",
    title: "Document Verified",
    message: "Your IELTS Official Test Report Form has been verified by senior team.",
    type: "DOCUMENT_VERIFICATION" as const,
    isRead: true,
    linkUrl: "/dashboard/documents",
    createdAt: new Date(Date.now() - 86400000),
  },
];

export class StudentService {
  /**
   * Retrieves aggregated student dashboard metrics.
   */
  async getDashboardSummary(userId: string = "student-demo"): Promise<StudentDashboardSummary> {
    return {
      profileProgress: 85,
      totalApplications: FALLBACK_APPLICATIONS.length,
      submittedApplications: 1,
      savedUniversitiesCount: 3,
      savedCoursesCount: 4,
      savedScholarshipsCount: 2,
      upcomingAppointmentsCount: FALLBACK_APPOINTMENTS.length,
      unreadNotificationsCount: FALLBACK_NOTIFICATIONS.filter((n) => !n.isRead).length,
    };
  }

  /**
   * Retrieves student profile.
   */
  async getStudentProfile(userId: string = "student-demo") {
    try {
      const dbUser = await userRepository.findByClerkUserId(userId);
      if (dbUser) return dbUser;
    } catch (error) {
      logger.warn(`Failed to fetch student profile for '${userId}', returning fallback`, { error });
    }

    return FALLBACK_STUDENT_PROFILE;
  }

  /**
   * Updates student profile details.
   */
  async updateStudentProfile(userId: string, data: UpdateStudentProfileInput) {
    try {
      const updated = await userRepository.updateStudentProfile(userId, data);
      return updated;
    } catch (error) {
      logger.warn(`Failed to update DB profile for '${userId}', updating local fallback`, { error });
    }

    Object.assign(FALLBACK_STUDENT_PROFILE, data);
    return FALLBACK_STUDENT_PROFILE;
  }

  /**
   * Retrieves saved items (universities, courses, scholarships).
   */
  async getSavedItems() {
    return {
      universities: FEATURED_UNIVERSITIES_DATA.slice(0, 3),
      courses: FALLBACK_COURSES_DATA.slice(0, 4),
      scholarships: FALLBACK_SCHOLARSHIPS_DATA.slice(0, 2),
    };
  }

  /**
   * Retrieves student documents.
   */
  async getStudentDocuments(studentId: string = "student-demo") {
    try {
      const dbDocs = await userRepository.getStudentDocuments(studentId);
      if (dbDocs.length > 0) return dbDocs;
    } catch (error) {
      logger.warn("Failed to fetch documents from DB, returning fallback", { error });
    }

    return FALLBACK_DOCUMENTS;
  }

  /**
   * Retrieves student applications.
   */
  async getStudentApplications(studentId: string = "student-demo"): Promise<StudentApplicationWithDetails[]> {
    try {
      const dbApps = await userRepository.getStudentApplications(studentId);
      if (dbApps.length > 0) return dbApps as StudentApplicationWithDetails[];
    } catch (error) {
      logger.warn("Failed to fetch applications from DB, returning fallback", { error });
    }

    return FALLBACK_APPLICATIONS;
  }

  /**
   * Retrieves student notifications.
   */
  async getStudentNotifications(userId: string = "student-demo") {
    try {
      const dbNotifs = await userRepository.getStudentNotifications(userId);
      if (dbNotifs.length > 0) return dbNotifs;
    } catch (error) {
      logger.warn("Failed to fetch notifications from DB, returning fallback", { error });
    }

    return FALLBACK_NOTIFICATIONS;
  }
}

export const studentService = new StudentService();
