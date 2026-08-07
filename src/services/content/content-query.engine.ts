import { prisma } from "@/lib/prisma";
import { FEATURED_COUNTRIES_DATA } from "@/data/countries";
import { FEATURED_UNIVERSITIES_DATA } from "@/data/universities";
import {
  CountryFilterParams,
  UniversityFilterParams,
  CourseFilterParams,
  ScholarshipFilterParams,
  PaginatedResult,
} from "./content.types";
import { Country, University, Course, Scholarship } from "@prisma/client";
import { logger } from "@/lib/logger";

export class ContentQueryEngine {
  /**
   * Fetches Countries with fallback to static seed data if database is unpopulated.
   */
  async getCountries(params: CountryFilterParams = {}): Promise<PaginatedResult<Partial<Country>>> {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

    try {
      const [dbCountries, total] = await Promise.all([
        prisma.country.findMany({
          where: {
            status: params.status || "PUBLISHED",
            ...(params.query && {
              name: { contains: params.query, mode: "insensitive" },
            }),
          },
          skip,
          take: limit,
          orderBy: { name: "asc" },
        }),
        prisma.country.count({
          where: { status: params.status || "PUBLISHED" },
        }),
      ]);

      if (dbCountries.length > 0) {
        return {
          data: dbCountries,
          meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasMore: skip + dbCountries.length < total,
          },
        };
      }
    } catch (error) {
      logger.warn("Database query for countries failed, falling back to seed data", { error });
    }

    // Fallback to static data
    const filtered = FEATURED_COUNTRIES_DATA.filter((c) =>
      params.query ? c.name.toLowerCase().includes(params.query.toLowerCase()) : true
    );
    const paginated = filtered.slice(skip, skip + limit);

    return {
      data: paginated.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        code: c.code,
        currency: "USD",
        postStudyWorkYears: 2,
        avgCostOfLivingYear: 15000,
        visaSuccessRate: 99.2,
        flagUrl: c.flag,
        heroImageUrl: c.heroImage,
        description: c.description,
        status: "PUBLISHED",
        createdAt: new Date(),
        updatedAt: new Date(),
      })) as Partial<Country>[],
      meta: {
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
        hasMore: skip + paginated.length < filtered.length,
      },
    };
  }

  /**
   * Fetches a single Country by slug with fallback.
   */
  async getCountryBySlug(slug: string) {
    try {
      const dbCountry = await prisma.country.findUnique({
        where: { slug },
        include: { universities: true, scholarships: true },
      });
      if (dbCountry) return dbCountry;
    } catch (error) {
      logger.warn(`Database lookup for country slug '${slug}' failed, checking fallback`, { error });
    }

    const fallback = FEATURED_COUNTRIES_DATA.find((c) => c.slug === slug);
    if (!fallback) return null;

    return {
      id: fallback.id,
      name: fallback.name,
      slug: fallback.slug,
      code: fallback.code,
      currency: "USD",
      postStudyWorkYears: 2,
      avgCostOfLivingYear: 15000,
      visaSuccessRate: 99.2,
      flagUrl: fallback.flag,
      heroImageUrl: fallback.heroImage,
      description: fallback.description,
      status: "PUBLISHED" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      universities: [],
      scholarships: [],
    };
  }

  /**
   * Fetches Universities with fallback to static seed data.
   */
  async getUniversities(params: UniversityFilterParams = {}): Promise<PaginatedResult<Partial<University>>> {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

    try {
      const whereClause = {
        status: params.status || ("PUBLISHED" as const),
        ...(params.query && { name: { contains: params.query, mode: "insensitive" as const } }),
        ...(params.countrySlug && { country: { slug: params.countrySlug } }),
      };

      const [dbUnis, total] = await Promise.all([
        prisma.university.findMany({
          where: whereClause,
          include: { country: true },
          skip,
          take: limit,
          orderBy: { rankingGlobal: "asc" },
        }),
        prisma.university.count({ where: whereClause }),
      ]);

      if (dbUnis.length > 0) {
        return {
          data: dbUnis,
          meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasMore: skip + dbUnis.length < total,
          },
        };
      }
    } catch (error) {
      logger.warn("Database query for universities failed, falling back to seed data", { error });
    }

    const filtered = FEATURED_UNIVERSITIES_DATA.filter((u) =>
      params.query ? u.name.toLowerCase().includes(params.query.toLowerCase()) : true
    );
    const paginated = filtered.slice(skip, skip + limit);

    return {
      data: paginated.map((u) => ({
        id: u.id,
        countryId: u.countryCode,
        name: u.name,
        slug: u.slug,
        logoUrl: u.logo,
        coverImageUrl: u.coverImage,
        rankingGlobal: u.rankingGlobal,
        acceptanceRate: 30,
        city: u.city,
        status: "PUBLISHED",
        createdAt: new Date(),
        updatedAt: new Date(),
      })) as Partial<University>[],
      meta: {
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
        hasMore: skip + paginated.length < filtered.length,
      },
    };
  }

  /**
   * Fetches Courses with filtering support.
   */
  async getCourses(params: CourseFilterParams = {}): Promise<PaginatedResult<Partial<Course>>> {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

    try {
      const whereClause = {
        ...(params.query && { name: { contains: params.query, mode: "insensitive" as const } }),
        ...(params.degreeLevel && { degreeLevel: params.degreeLevel }),
        ...(params.universitySlug && { university: { slug: params.universitySlug } }),
      };

      const [dbCourses, total] = await Promise.all([
        prisma.course.findMany({
          where: whereClause,
          include: { university: true },
          skip,
          take: limit,
          orderBy: { name: "asc" },
        }),
        prisma.course.count({ where: whereClause }),
      ]);

      return {
        data: dbCourses,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasMore: skip + dbCourses.length < total,
        },
      };
    } catch (error) {
      logger.warn("Database query for courses failed", { error });
      return {
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0, hasMore: false },
      };
    }
  }

  /**
   * Fetches Scholarships with filtering support.
   */
  async getScholarships(params: ScholarshipFilterParams = {}): Promise<PaginatedResult<Partial<Scholarship>>> {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

    try {
      const whereClause = {
        ...(params.query && { title: { contains: params.query, mode: "insensitive" as const } }),
        ...(params.type && { type: params.type }),
        ...(params.countrySlug && { country: { slug: params.countrySlug } }),
      };

      const [dbScholarships, total] = await Promise.all([
        prisma.scholarship.findMany({
          where: whereClause,
          include: { country: true, university: true },
          skip,
          take: limit,
          orderBy: { amount: "desc" },
        }),
        prisma.scholarship.count({ where: whereClause }),
      ]);

      return {
        data: dbScholarships,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasMore: skip + dbScholarships.length < total,
        },
      };
    } catch (error) {
      logger.warn("Database query for scholarships failed", { error });
      return {
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0, hasMore: false },
      };
    }
  }
}

export const contentQueryEngine = new ContentQueryEngine();
