import { prisma } from "@/lib/prisma";
import type { Scholarship, ScholarshipType } from "@prisma/client";

export interface ScholarshipFilterQuery {
  query?: string;
  countrySlug?: string;
  universitySlug?: string;
  type?: ScholarshipType;
  minAmount?: number;
  maxAmount?: number;
  upcomingOnly?: boolean;
  page?: number;
  limit?: number;
  sortBy?: "amount" | "deadline" | "title" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export class ScholarshipRepository {
  async getAllScholarships(): Promise<Scholarship[]> {
    return prisma.scholarship.findMany({
      include: { country: true, university: true },
      orderBy: { amount: "desc" },
    });
  }

  async getFeaturedScholarships(limit: number = 6): Promise<Scholarship[]> {
    return prisma.scholarship.findMany({
      include: { country: true, university: true },
      take: limit,
      orderBy: { amount: "desc" },
    });
  }

  async getUpcomingDeadlines(limit: number = 6): Promise<Scholarship[]> {
    return prisma.scholarship.findMany({
      where: {
        deadline: { gte: new Date() },
      },
      include: { country: true, university: true },
      take: limit,
      orderBy: { deadline: "asc" },
    });
  }

  async getScholarshipBySlug(slug: string): Promise<Scholarship | null> {
    return prisma.scholarship.findUnique({
      where: { slug },
      include: {
        country: true,
        university: true,
      },
    });
  }

  async getScholarshipsByCountry(countryId: string): Promise<Scholarship[]> {
    return prisma.scholarship.findMany({
      where: { countryId },
      include: { country: true, university: true },
      orderBy: { amount: "desc" },
    });
  }

  async getScholarshipsByUniversity(universityId: string): Promise<Scholarship[]> {
    return prisma.scholarship.findMany({
      where: { universityId },
      include: { country: true, university: true },
      orderBy: { amount: "desc" },
    });
  }

  async searchScholarships(query: string): Promise<Scholarship[]> {
    return prisma.scholarship.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { coverageDetails: { contains: query, mode: "insensitive" } },
          { eligibilityCriteria: { contains: query, mode: "insensitive" } },
        ],
      },
      include: { country: true, university: true },
      orderBy: { amount: "desc" },
    });
  }

  async filterScholarships(params: ScholarshipFilterQuery) {
    const page = params.page || 1;
    const limit = params.limit || 12;
    const skip = (page - 1) * limit;
    const sortBy = params.sortBy || "amount";
    const sortOrder = params.sortOrder || "desc";

    const where = {
      ...(params.query && {
        OR: [
          { title: { contains: params.query, mode: "insensitive" as const } },
          { coverageDetails: { contains: params.query, mode: "insensitive" as const } },
        ],
      }),
      ...(params.type && { type: params.type }),
      ...(params.countrySlug && { country: { slug: params.countrySlug } }),
      ...(params.universitySlug && { university: { slug: params.universitySlug } }),
      ...(params.minAmount && { amount: { gte: params.minAmount } }),
      ...(params.maxAmount && { amount: { lte: params.maxAmount } }),
      ...(params.upcomingOnly && { deadline: { gte: new Date() } }),
    };

    const [scholarships, total] = await Promise.all([
      prisma.scholarship.findMany({
        where,
        include: { country: true, university: true },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.scholarship.count({ where }),
    ]);

    return {
      scholarships,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + scholarships.length < total,
    };
  }

  async getScholarshipStatistics() {
    const [totalScholarships, fullTuitionCount] = await Promise.all([
      prisma.scholarship.count(),
      prisma.scholarship.count({ where: { type: "FULL_TUITION" } }),
    ]);

    return {
      totalScholarships,
      fullTuitionCount,
    };
  }
}

export const scholarshipRepository = new ScholarshipRepository();
