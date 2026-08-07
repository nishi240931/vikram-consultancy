import { prisma } from "@/lib/prisma";
import type { Country, CountryStatus } from "@prisma/client";

export class CountryRepository {
  async getAllCountries(status: CountryStatus = "PUBLISHED"): Promise<Country[]> {
    return prisma.country.findMany({
      where: { status },
      include: { universities: true, scholarships: true },
      orderBy: { name: "asc" },
    });
  }

  async getFeaturedCountries(limit: number = 6): Promise<Country[]> {
    return prisma.country.findMany({
      where: { status: "PUBLISHED" },
      include: { universities: true, scholarships: true },
      take: limit,
      orderBy: { visaSuccessRate: "desc" },
    });
  }

  async getCountryBySlug(slug: string): Promise<Country | null> {
    return prisma.country.findUnique({
      where: { slug },
      include: {
        universities: {
          where: { status: "PUBLISHED" },
          take: 6,
          orderBy: { rankingGlobal: "asc" },
        },
        scholarships: {
          take: 4,
          orderBy: { amount: "desc" },
        },
      },
    });
  }

  async getCountryByCode(code: string): Promise<Country | null> {
    return prisma.country.findUnique({ where: { code } });
  }

  async searchCountries(query: string): Promise<Country[]> {
    return prisma.country.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { code: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { name: "asc" },
    });
  }

  async getCountryStatistics() {
    const [totalCountries, totalUniversities] = await Promise.all([
      prisma.country.count({ where: { status: "PUBLISHED" } }),
      prisma.university.count({ where: { status: "PUBLISHED" } }),
    ]);

    return {
      totalCountries,
      totalUniversities,
    };
  }
}

export const countryRepository = new CountryRepository();
