import { prisma } from "@/lib/prisma";
import type { Application, ApplicationStatus } from "@prisma/client";

export class ApplicationRepository {
  async findById(id: string): Promise<Application | null> {
    return prisma.application.findUnique({
      where: { id },
      include: {
        student: true,
        course: { include: { university: true } },
        counsellor: true,
        stages: true,
        documents: true,
      },
    });
  }

  async findByStudent(studentId: string): Promise<Application[]> {
    return prisma.application.findMany({
      where: { studentId },
      include: { course: { include: { university: true } }, stages: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findByCounsellor(counsellorId: string): Promise<Application[]> {
    return prisma.application.findMany({
      where: { counsellorId },
      include: { student: true, course: true },
      orderBy: { updatedAt: "desc" },
    });
  }

  async findByStatus(status: ApplicationStatus): Promise<Application[]> {
    return prisma.application.findMany({
      where: { status },
      include: { student: true, course: true },
    });
  }
}

export const applicationRepository = new ApplicationRepository();
