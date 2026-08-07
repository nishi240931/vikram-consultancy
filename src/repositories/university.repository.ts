import { prisma } from "@/lib/prisma";
import type { University, UniversityStatus } from "@prisma/client";

export interface UniversityFilterQuery {
  query?: string;
  countrySlug?: string;
  countryId?: string;
  status?: UniversityStatus;
  maxRankingGlobal?: number;
  maxTuitionFee?: number;
  city?: string;
  page?: number;
  limit?: number;
  sortBy?: "rankingGlobal" | "name" | "avgTuitionFeeYear";
  sortOrder?: "asc" | "desc";
}

export class UniversityRepository {
  async getAllUniversities(status: UniversityStatus = "PUBLISHED"): Promise<University[]> {
    return prisma.university.findMany({
      where: { status },
      include: { country: true },
      orderBy: { rankingGlobal: "asc" },
    });
  }

  async getFeaturedUniversities(limit: number = 6): Promise<University[]> {
    return prisma.university.findMany({
      where: { status: "PUBLISHED" },
      include: { country: true },
      take: limit,
      orderBy: { rankingGlobal: "asc" },
    });
  }

  async getTopRankedUniversities(limit: number = 10): Promise<University[]> {
    return prisma.university.findMany({
      where: { status: "PUBLISHED" },
      include: { country: true },
      take: limit,
      orderBy: { rankingGlobal: "asc" },
    });
  }

  async getUniversityBySlug(slug: string): Promise<University | null> {
    return prisma.university.findUnique({
      where: { slug },
      include: {
        country: true,
        courses: { take: 6, orderBy: { name: "asc" } },
        scholarships: { take: 4, orderBy: { amount: "desc" } },
        reviews: { take: 4, orderBy: { createdAt: "desc" } },
      },
    });
  }

  async getUniversitiesByCountry(countryId: string): Promise<University[]> {
    return prisma.university.findMany({
      where: { countryId, status: "PUBLISHED" },
      include: { country: true },
      orderBy: { rankingGlobal: "asc" },
    });
  }

  async searchUniversities(query: string): Promise<University[]> {
    return prisma.university.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { city: { contains: query, mode: "insensitive" } },
          { overview: { contains: query, mode: "insensitive" } },
        ],
      },
      include: { country: true },
      orderBy: { rankingGlobal: "asc" },
    });
  }

  async filterUniversities(params: UniversityFilterQuery) {
    const page = params.page || 1;
    const limit = params.limit || 12;
    const skip = (page - 1) * limit;
    const sortBy = params.sortBy || "rankingGlobal";
    const sortOrder = params.sortOrder || "asc";

    const where = {
      status: params.status || ("PUBLISHED" as const),
      ...(params.query && {
        OR: [
          { name: { contains: params.query, mode: "insensitive" as const } },
          { city: { contains: params.query, mode: "insensitive" as const } },
        ],
      }),
      ...(params.countrySlug && { country: { slug: params.countrySlug } }),
      ...(params.countryId && { countryId: params.countryId }),
      ...(params.maxRankingGlobal && { rankingGlobal: { lte: params.maxRankingGlobal } }),
      ...(params.maxTuitionFee && { avgTuitionFeeYear: { lte: params.maxTuitionFee } }),
      ...(params.city && { city: { contains: params.city, mode: "insensitive" as const } }),
    };

    const [universities, total] = await Promise.all([
      prisma.university.findMany({
        where,
        include: { country: true },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.university.count({ where }),
    ]);

    return {
      universities,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + universities.length < total,
    };
  }

  async getUniversityStatistics() {
    const [totalUniversities, top100Count] = await Promise.all([
      prisma.university.count({ where: { status: "PUBLISHED" } }),
      prisma.university.count({
        where: { status: "PUBLISHED", rankingGlobal: { lte: 100 } },
      }),
    ]);

    return {
      totalUniversities,
      top100Count,
    };
  }
}

export const universityRepository = new UniversityRepository();
