import { PrismaClient } from "@prisma/client";
import { FEATURED_COUNTRIES_DATA } from "../../src/data/countries";

export async function seedCountries(prisma: PrismaClient) {
  console.log("🌱 Seeding Country data...");

  for (const c of FEATURED_COUNTRIES_DATA) {
    const currency =
      c.code === "US"
        ? "USD"
        : c.code === "GB"
        ? "GBP"
        : c.code === "CA"
        ? "CAD"
        : c.code === "AU"
        ? "AUD"
        : c.code === "NZ"
        ? "NZD"
        : c.code === "KR"
        ? "KRW"
        : c.code === "JP"
        ? "JPY"
        : "EUR";

    await prisma.country.upsert({
      where: { code: c.code },
      update: {
        name: c.name,
        slug: c.slug,
        currency,
        postStudyWorkYears: c.postStudyWork.includes("3") ? 3 : 2,
        flagUrl: c.flag,
        heroImageUrl: c.heroImage,
        description: c.description,
        status: "PUBLISHED",
      },
      create: {
        id: c.id,
        name: c.name,
        slug: c.slug,
        code: c.code,
        currency,
        postStudyWorkYears: c.postStudyWork.includes("3") ? 3 : 2,
        avgCostOfLivingYear: 15000,
        visaSuccessRate: 99.2,
        flagUrl: c.flag,
        heroImageUrl: c.heroImage,
        description: c.description,
        status: "PUBLISHED",
      },
    });
  }

  console.log(`✅ Seeded ${FEATURED_COUNTRIES_DATA.length} Countries.`);
}
