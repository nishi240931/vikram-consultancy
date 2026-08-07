import { prisma } from "@/lib/prisma";
import type { Course, DegreeLevel } from "@prisma/client";

export interface CourseFilterQuery {
  query?: string;
  countrySlug?: string;
  universitySlug?: string;
  universityId?: string;
  degreeLevel?: DegreeLevel;
  majorCategory?: string;
  maxTuitionTotal?: number;
  durationYears?: number;
  maxIeltsScore?: number;
  intakeMonth?: string;
  page?: number;
  limit?: number;
  sortBy?: "tuitionFeeTotal" | "name" | "durationMonths" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export class CourseRepository {
  async getAllCourses(): Promise<Course[]> {
    return prisma.course.findMany({
      include: {
        university: { include: { country: true } },
      },
      orderBy: { name: "asc" },
    });
  }

  async getFeaturedCourses(limit: number = 6): Promise<Course[]> {
    return prisma.course.findMany({
      include: {
        university: { include: { country: true } },
      },
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }

  async getPopularCourses(limit: number = 10): Promise<Course[]> {
    return prisma.course.findMany({
      include: {
        university: { include: { country: true } },
      },
      take: limit,
      orderBy: { name: "asc" },
    });
  }

  async getCourseBySlug(slug: string): Promise<Course | null> {
    return prisma.course.findUnique({
      where: { slug },
      include: {
        university: {
          include: {
            country: true,
            scholarships: true,
          },
        },
      },
    });
  }

  async getCoursesByUniversity(universityId: string): Promise<Course[]> {
    return prisma.course.findMany({
      where: { universityId },
      include: { university: { include: { country: true } } },
      orderBy: { name: "asc" },
    });
  }

  async getCoursesByCountry(countryId: string): Promise<Course[]> {
    return prisma.course.findMany({
      where: { university: { countryId } },
      include: { university: { include: { country: true } } },
      orderBy: { name: "asc" },
    });
  }

  async getCoursesByDegree(degreeLevel: DegreeLevel): Promise<Course[]> {
    return prisma.course.findMany({
      where: { degreeLevel },
      include: { university: { include: { country: true } } },
      orderBy: { name: "asc" },
    });
  }

  async searchCourses(query: string): Promise<Course[]> {
    return prisma.course.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { majorCategory: { contains: query, mode: "insensitive" } },
          { overview: { contains: query, mode: "insensitive" } },
        ],
      },
      include: { university: { include: { country: true } } },
      orderBy: { name: "asc" },
    });
  }

  async filterCourses(params: CourseFilterQuery) {
    const page = params.page || 1;
    const limit = params.limit || 12;
    const skip = (page - 1) * limit;
    const sortBy = params.sortBy || "name";
    const sortOrder = params.sortOrder || "asc";

    const where = {
      ...(params.query && {
        OR: [
          { name: { contains: params.query, mode: "insensitive" as const } },
          { majorCategory: { contains: params.query, mode: "insensitive" as const } },
        ],
      }),
      ...(params.degreeLevel && { degreeLevel: params.degreeLevel }),
      ...(params.majorCategory && {
        majorCategory: { contains: params.majorCategory, mode: "insensitive" as const },
      }),
      ...(params.universitySlug && { university: { slug: params.universitySlug } }),
      ...(params.universityId && { universityId: params.universityId }),
      ...(params.countrySlug && { university: { country: { slug: params.countrySlug } } }),
      ...(params.maxTuitionTotal && { tuitionFeeTotal: { lte: params.maxTuitionTotal } }),
      ...(params.maxIeltsScore && { ieltsMinScore: { lte: params.maxIeltsScore } }),
    };

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: { university: { include: { country: true } } },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.course.count({ where }),
    ]);

    return {
      courses,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + courses.length < total,
    };
  }

  async getCourseStatistics() {
    const [totalCourses, bachelorsCount, mastersCount] = await Promise.all([
      prisma.course.count(),
      prisma.course.count({ where: { degreeLevel: "BACHELORS" } }),
      prisma.course.count({ where: { degreeLevel: "MASTERS" } }),
    ]);

    return {
      totalCourses,
      bachelorsCount,
      mastersCount,
    };
  }
}

export const courseRepository = new CourseRepository();
