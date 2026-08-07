import { prisma } from "@/lib/prisma";
import type { User, Role, Application, Document, Notification } from "@prisma/client";

export interface UpdateStudentProfileInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  targetCountry?: string;
  gpa?: number;
  budgetMax?: number;
  avatarUrl?: string;
}

export interface CreateClerkUserData {
  clerkUserId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
  role?: Role;
}

export class UserRepository {
  async findByClerkUserId(clerkUserId: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { clerkUserId },
      include: {
        counsellorProfile: true,
        documents: true,
        studentApplications: {
          include: {
            course: { include: { university: { include: { country: true } } } },
            stages: true,
          },
        },
        notifications: { orderBy: { createdAt: "desc" } },
      },
    });
  }

  async findByClerkId(clerkUserId: string): Promise<User | null> {
    return this.findByClerkUserId(clerkUserId);
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: CreateClerkUserData): Promise<User> {
    return prisma.user.create({
      data: {
        clerkUserId: data.clerkUserId,
        email: data.email,
        firstName: data.firstName || undefined,
        lastName: data.lastName || undefined,
        avatarUrl: data.avatarUrl || undefined,
        role: data.role || "STUDENT",
      },
    });
  }

  async upsertFromClerk(data: CreateClerkUserData): Promise<User> {
    return prisma.user.upsert({
      where: { clerkUserId: data.clerkUserId },
      update: {
        email: data.email,
        firstName: data.firstName || undefined,
        lastName: data.lastName || undefined,
        avatarUrl: data.avatarUrl || undefined,
      },
      create: {
        clerkUserId: data.clerkUserId,
        email: data.email,
        firstName: data.firstName || undefined,
        lastName: data.lastName || undefined,
        avatarUrl: data.avatarUrl || undefined,
        role: data.role || "STUDENT",
      },
    });
  }

  async deleteByClerkId(clerkUserId: string): Promise<User | null> {
    try {
      return await prisma.user.delete({ where: { clerkUserId } });
    } catch {
      return null;
    }
  }

  async updateStudentProfile(userId: string, data: UpdateStudentProfileInput): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async getStudentApplications(studentId: string): Promise<Application[]> {
    return prisma.application.findMany({
      where: { studentId },
      include: {
        course: { include: { university: { include: { country: true } } } },
        stages: { orderBy: { createdAt: "asc" } },
        documents: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getStudentDocuments(studentId: string): Promise<Document[]> {
    return prisma.document.findMany({
      where: { studentId },
      orderBy: { createdAt: "desc" },
    });
  }

  async getStudentNotifications(userId: string): Promise<Notification[]> {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }
}

export const userRepository = new UserRepository();
