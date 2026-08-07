import { scholarshipRepository, ScholarshipFilterQuery } from "@/repositories/scholarship.repository";
import { Scholarship, Country, University, ScholarshipType } from "@prisma/client";
import { logger } from "@/lib/logger";

export interface ScholarshipWithDetails extends Scholarship {
  country?: Partial<Country> | null;
  university?: Partial<University> | null;
}

export interface ScholarshipPaginatedResult {
  scholarships: ScholarshipWithDetails[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export const FALLBACK_SCHOLARSHIPS_DATA: ScholarshipWithDetails[] = [
  {
    id: "schol-1",
    countryId: "uk",
    universityId: "uni-oxford",
    title: "Clarendon International Postgraduate Scholarship",
    slug: "clarendon-scholarship-oxford",
    type: "FULL_TUITION" as ScholarshipType,
    amount: 45000,
    currency: "GBP",
    coverageDetails: "Covers 100% of tuition fees plus an annual living stipend of £18,622 for full duration of study.",
    eligibilityCriteria: "Open to all international graduate applicants with outstanding academic performance (First Class Honours equivalent).",
    deadline: new Date("2025-12-15"),
    createdAt: new Date(),
    updatedAt: new Date(),
    country: { id: "uk", name: "United Kingdom", code: "GB", flagUrl: "🇬🇧" },
    university: { id: "uni-oxford", name: "University of Oxford", slug: "university-of-oxford", city: "Oxford" },
  },
  {
    id: "schol-2",
    countryId: "us",
    universityId: "uni-harvard",
    title: "Harvard Global Leadership Merit Grant",
    slug: "harvard-global-leadership-grant",
    type: "FULL_TUITION" as ScholarshipType,
    amount: 75000,
    currency: "USD",
    coverageDetails: "Full tuition coverage plus campus housing grant for outstanding international STEM & Business candidates.",
    eligibilityCriteria: "Top 5% class rank, GRE 325+ or GMAT 730+, demonstrated leadership capability.",
    deadline: new Date("2025-11-01"),
    createdAt: new Date(),
    updatedAt: new Date(),
    country: { id: "us", name: "United States", code: "US", flagUrl: "🇺🇸" },
    university: { id: "uni-harvard", name: "Harvard University", slug: "harvard-university", city: "Cambridge, MA" },
  },
  {
    id: "schol-3",
    countryId: "ca",
    universityId: "uni-toronto",
    title: "Lester B. Pearson International Scholarship",
    slug: "lester-b-pearson-scholarship-toronto",
    type: "FULL_TUITION" as ScholarshipType,
    amount: 52000,
    currency: "CAD",
    coverageDetails: "Covers tuition, books, incidental fees, and full residence support for four years.",
    eligibilityCriteria: "Nominated by secondary school, exceptional academic achievement and community engagement.",
    deadline: new Date("2025-11-30"),
    createdAt: new Date(),
    updatedAt: new Date(),
    country: { id: "ca", name: "Canada", code: "CA", flagUrl: "🇨🇦" },
    university: { id: "uni-toronto", name: "University of Toronto", slug: "university-of-toronto", city: "Toronto" },
  },
  {
    id: "schol-4",
    countryId: "au",
    universityId: "uni-melbourne",
    title: "Melbourne International Graduate Research Scholarship",
    slug: "melbourne-graduate-research-scholarship",
    type: "STIPEND" as ScholarshipType,
    amount: 37000,
    currency: "AUD",
    coverageDetails: "Provides 100% fee offset plus living allowance stipend of $37,000 per year.",
    eligibilityCriteria: "High honours degree or master's degree by research with proven research output.",
    deadline: new Date("2025-10-31"),
    createdAt: new Date(),
    updatedAt: new Date(),
    country: { id: "au", name: "Australia", code: "AU", flagUrl: "🇦🇺" },
    university: { id: "uni-melbourne", name: "University of Melbourne", slug: "university-of-melbourne", city: "Melbourne" },
  },
  {
    id: "schol-5",
    countryId: "de",
    universityId: "uni-tum",
    title: "DAAD Development-Related Postgraduate Scholarship",
    slug: "daad-scholarship-germany",
    type: "FULL_TUITION" as ScholarshipType,
    amount: 14000,
    currency: "EUR",
    coverageDetails: "Monthly stipend of €934, travel allowance, health insurance, and study research grant.",
    eligibilityCriteria: "Bachelor's degree with at least 2 years of professional work experience.",
    deadline: new Date("2025-09-30"),
    createdAt: new Date(),
    updatedAt: new Date(),
    country: { id: "de", name: "Germany", code: "DE", flagUrl: "🇩🇪" },
    university: { id: "uni-tum", name: "Technical University of Munich", slug: "technical-university-of-munich", city: "Munich" },
  },
  {
    id: "schol-6",
    countryId: "ie",
    universityId: "uni-tcd",
    title: "Government of Ireland International Education Scholarship",
    slug: "government-of-ireland-scholarship",
    type: "ONE_TIME_GRANT" as ScholarshipType,
    amount: 10000,
    currency: "EUR",
    coverageDetails: "€10,000 stipend for 1 year of study plus full tuition fee waiver by host higher education institution.",
    eligibilityCriteria: "High-performing non-EU/EEA national admitted to a Irish master's or PhD program.",
    deadline: new Date("2025-03-25"),
    createdAt: new Date(),
    updatedAt: new Date(),
    country: { id: "ie", name: "Ireland", code: "IE", flagUrl: "🇮🇪" },
    university: { id: "uni-tcd", name: "Trinity College Dublin", slug: "trinity-college-dublin", city: "Dublin" },
  },
];

export class ScholarshipService {
  /**
   * Retrieves paginated and filtered scholarships with fallback safety.
   */
  async filterScholarships(params: ScholarshipFilterQuery): Promise<ScholarshipPaginatedResult> {
    try {
      const result = await scholarshipRepository.filterScholarships(params);
      if (result.scholarships.length > 0) {
        return result as ScholarshipPaginatedResult;
      }
    } catch (error) {
      logger.warn("Failed to filter scholarships from DB, falling back to static scholarship data", { error });
    }

    let filtered = [...FALLBACK_SCHOLARSHIPS_DATA];

    if (params.query) {
      const q = params.query.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          (s.coverageDetails && s.coverageDetails.toLowerCase().includes(q)) ||
          (s.university?.name && s.university.name.toLowerCase().includes(q))
      );
    }

    if (params.type) {
      filtered = filtered.filter((s) => s.type === params.type);
    }

    if (params.countrySlug) {
      filtered = filtered.filter(
        (s) => s.country?.name?.toLowerCase() === params.countrySlug?.toLowerCase()
      );
    }

    if (params.minAmount) {
      filtered = filtered.filter((s) => s.amount >= (params.minAmount || 0));
    }

    const page = params.page || 1;
    const limit = params.limit || 12;
    const skip = (page - 1) * limit;
    const paginated = filtered.slice(skip, skip + limit);

    return {
      scholarships: paginated,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
      hasMore: skip + paginated.length < filtered.length,
    };
  }

  /**
   * Retrieves a single scholarship by slug with fallback.
   */
  async getScholarshipBySlug(slug: string): Promise<ScholarshipWithDetails | null> {
    try {
      const dbScholarship = await scholarshipRepository.getScholarshipBySlug(slug);
      if (dbScholarship) return dbScholarship as ScholarshipWithDetails;
    } catch (error) {
      logger.warn(`Failed to fetch scholarship '${slug}' from DB, checking fallback`, { error });
    }

    return FALLBACK_SCHOLARSHIPS_DATA.find((s) => s.slug === slug) || null;
  }

  /**
   * Retrieves featured scholarships.
   */
  async getFeaturedScholarships(limit: number = 6): Promise<ScholarshipWithDetails[]> {
    try {
      const dbScholarships = await scholarshipRepository.getFeaturedScholarships(limit);
      if (dbScholarships.length > 0) return dbScholarships as ScholarshipWithDetails[];
    } catch (error) {
      logger.warn("Failed to fetch featured scholarships from DB, using fallback", { error });
    }

    return FALLBACK_SCHOLARSHIPS_DATA.slice(0, limit);
  }
}

export const scholarshipService = new ScholarshipService();
