import { countryRepository } from "@/repositories/country.repository";
import { FEATURED_COUNTRIES_DATA, FeaturedCountry } from "@/data/countries";
import { FEATURED_UNIVERSITIES_DATA } from "@/data/universities";
import { Country, University, Scholarship } from "@prisma/client";
import { logger } from "@/lib/logger";

export interface CountryWithDetails extends Country {
  universities?: Partial<University>[];
  scholarships?: Partial<Scholarship>[];
  postStudyWorkTitle?: string;
  postStudyWorkSubtitle?: string;
  visaSuccessRateText?: string;
  avgCostFormatted?: string;
}

export class CountryService {
  /**
   * Retrieves all published destination countries with fallback to seed data.
   */
  async getAllCountries(): Promise<CountryWithDetails[]> {
    try {
      const dbCountries = await countryRepository.getAllCountries("PUBLISHED");
      if (dbCountries.length > 0) {
        return dbCountries
          .filter((c) => c.slug !== "germany" && c.code !== "DE")
          .map((dbc) => this.enrichCountryModel(dbc as CountryWithDetails));
      }
    } catch (error) {
      logger.warn("Failed to fetch countries from database, executing seed fallback", { error });
    }

    return this.getFallbackCountries();
  }

  /**
   * Retrieves a destination country by slug with fallback.
   */
  async getCountryBySlug(slug: string): Promise<CountryWithDetails | null> {
    try {
      const dbCountry = await countryRepository.getCountryBySlug(slug);
      if (dbCountry) return this.enrichCountryModel(dbCountry as CountryWithDetails);
    } catch (error) {
      logger.warn(`Failed to fetch country '${slug}' from database, executing seed fallback`, { error });
    }

    const fallback = FEATURED_COUNTRIES_DATA.find((c) => c.slug === slug);
    if (!fallback) return null;

    return this.mapFallbackToCountryModel(fallback);
  }

  /**
   * Searches countries by query string.
   */
  async searchCountries(query: string): Promise<CountryWithDetails[]> {
    try {
      const dbCountries = await countryRepository.searchCountries(query);
      if (dbCountries.length > 0) {
        return dbCountries.map((dbc) => this.enrichCountryModel(dbc as CountryWithDetails));
      }
    } catch (error) {
      logger.warn(`Search for countries with query '${query}' failed, checking fallback`, { error });
    }

    return this.getFallbackCountries().filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  private getFallbackCountries(): CountryWithDetails[] {
    return FEATURED_COUNTRIES_DATA.map((c) => this.mapFallbackToCountryModel(c));
  }

  private enrichCountryModel(c: CountryWithDetails): CountryWithDetails {
    const featured = FEATURED_COUNTRIES_DATA.find((fc) => fc.code === c.code || fc.slug === c.slug);
    if (!featured) return c;

    return {
      ...c,
      postStudyWorkTitle: featured.postStudyWorkDetail.title,
      postStudyWorkSubtitle: featured.postStudyWorkDetail.subtitle,
      visaSuccessRateText: featured.visaSuccessRateText,
      avgCostFormatted: featured.avgCost,
    };
  }

  private mapFallbackToCountryModel(c: FeaturedCountry): CountryWithDetails {
    const relatedUnis = FEATURED_UNIVERSITIES_DATA.filter((u) => u.countryCode === c.code).map((u) => ({
      id: u.id,
      countryId: c.id,
      name: u.name,
      slug: u.slug,
      logoUrl: u.logo,
      coverImageUrl: u.coverImage,
      rankingGlobal: u.rankingGlobal,
      rankingNational: 1,
      acceptanceRate: 35,
      avgTuitionFeeYear: 25000,
      city: u.city,
      websiteUrl: null,
      overview: null,
      status: "PUBLISHED" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return {
      id: c.id,
      name: c.name,
      slug: c.slug,
      code: c.code,
      currency: c.code === "US" ? "USD" : c.code === "GB" ? "GBP" : c.code === "CA" ? "CAD" : c.code === "AU" ? "AUD" : c.code === "DE" ? "EUR" : "EUR",
      postStudyWorkYears: c.postStudyWork.includes("3") ? 3 : 2,
      postStudyWorkTitle: c.postStudyWorkDetail.title,
      postStudyWorkSubtitle: c.postStudyWorkDetail.subtitle,
      visaSuccessRateText: c.visaSuccessRateText,
      avgCostFormatted: c.avgCost,
      avgCostOfLivingYear: 15000,
      visaSuccessRate: 99.2,
      flagUrl: c.flag,
      heroImageUrl: c.heroImage,
      description: c.description,
      status: "PUBLISHED",
      createdAt: new Date(),
      updatedAt: new Date(),
      universities: relatedUnis,
      scholarships: [],
    };
  }
}

export const countryService = new CountryService();
