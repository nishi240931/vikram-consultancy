import { universityRepository, UniversityFilterQuery } from "@/repositories/university.repository";
import { FEATURED_UNIVERSITIES_DATA, FeaturedUniversity } from "@/data/universities";
import { University, Country, Course, Scholarship, Review } from "@prisma/client";
import { logger } from "@/lib/logger";

export interface UniversityWithDetails extends University {
  country?: Partial<Country> | null;
  courses?: Partial<Course>[];
  scholarships?: Partial<Scholarship>[];
  reviews?: Partial<Review>[];
}

export interface UniversityPaginatedResult {
  universities: UniversityWithDetails[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export class UniversityService {
  /**
   * Retrieves paginated & filtered universities with fallback to seed data.
   */
  async filterUniversities(params: UniversityFilterQuery): Promise<UniversityPaginatedResult> {
    try {
      const result = await universityRepository.filterUniversities(params);
      if (result.universities.length > 0) {
        return result as UniversityPaginatedResult;
      }
    } catch (error) {
      logger.warn("Failed to filter universities from DB, falling back to seed data", { error });
    }

    // Fallback filtering over static dataset
    let filtered = [...FEATURED_UNIVERSITIES_DATA];

    if (params.query) {
      const q = params.query.toLowerCase();
      filtered = filtered.filter(
        (u) => u.name.toLowerCase().includes(q) || u.city.toLowerCase().includes(q)
      );
    }

    if (params.countrySlug) {
      filtered = filtered.filter((u) => u.countryName.toLowerCase() === params.countrySlug?.toLowerCase());
    }

    if (params.maxRankingGlobal) {
      filtered = filtered.filter((u) => u.rankingGlobal <= (params.maxRankingGlobal || 1000));
    }

    const page = params.page || 1;
    const limit = params.limit || 12;
    const skip = (page - 1) * limit;
    const paginated = filtered.slice(skip, skip + limit);

    return {
      universities: paginated.map((u) => this.mapFallbackToUniversityModel(u)),
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
      hasMore: skip + paginated.length < filtered.length,
    };
  }

  /**
   * Retrieves a single university by slug with fallback.
   */
  async getUniversityBySlug(slug: string): Promise<UniversityWithDetails | null> {
    try {
      const dbUni = await universityRepository.getUniversityBySlug(slug);
      if (dbUni) return dbUni as UniversityWithDetails;
    } catch (error) {
      logger.warn(`Failed to fetch university '${slug}' from DB, checking fallback`, { error });
    }

    const fallback = FEATURED_UNIVERSITIES_DATA.find((u) => u.slug === slug);
    if (!fallback) return null;

    return this.mapFallbackToUniversityModel(fallback);
  }

  /**
   * Retrieves featured universities for showcase grids.
   */
  async getFeaturedUniversities(limit: number = 6): Promise<UniversityWithDetails[]> {
    try {
      const dbUnis = await universityRepository.getFeaturedUniversities(limit);
      if (dbUnis.length > 0) return dbUnis as UniversityWithDetails[];
    } catch (error) {
      logger.warn("Failed to fetch featured universities, returning fallback", { error });
    }

    return FEATURED_UNIVERSITIES_DATA.slice(0, limit).map((u) =>
      this.mapFallbackToUniversityModel(u)
    );
  }

  private mapFallbackToUniversityModel(u: FeaturedUniversity): UniversityWithDetails {
    return {
      id: u.id,
      countryId: u.countryCode,
      name: u.name,
      slug: u.slug,
      logoUrl: u.logo,
      coverImageUrl: u.coverImage,
      rankingGlobal: u.rankingGlobal,
      rankingNational: 1,
      acceptanceRate: parseFloat(u.acceptanceRate.replace("%", "")) || 30,
      avgTuitionFeeYear: 25000,
      city: u.city,
      websiteUrl: "https://university-example.edu",
      overview: `${u.name} is a premier global institution located in ${u.city}, ${u.countryName}. Ranked #${u.rankingGlobal} globally, it offers top-tier academic programs, cutting-edge research facilities, and generous international scholarships.`,
      status: "PUBLISHED",
      createdAt: new Date(),
      updatedAt: new Date(),
      country: {
        id: u.countryCode,
        name: u.countryName,
        code: u.countryCode,
        flagUrl: u.flag,
      },
      courses: [],
      scholarships: [],
      reviews: [],
    };
  }
}

export const universityService = new UniversityService();
