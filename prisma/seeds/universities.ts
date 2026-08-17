import { PrismaClient } from "@prisma/client";
import { FEATURED_UNIVERSITIES_DATA } from "../../src/data/universities";

export async function seedUniversities(prisma: PrismaClient) {
  console.log("🌱 Seeding University records...");

  // Fetch created countries map
  const countries = await prisma.country.findMany();
  const countryCodeToIdMap = new Map(countries.map((c) => [c.code, c.id]));

  for (const u of FEATURED_UNIVERSITIES_DATA) {
    const countryId = countryCodeToIdMap.get(u.countryCode) || u.countryCode.toLowerCase();

    await prisma.university.upsert({
      where: { slug: u.slug },
      update: {
        name: u.name,
        countryId,
        logoUrl: u.logo,
        coverImageUrl: u.coverImage,
        rankingGlobal: u.rankingGlobal,
        city: u.city,
        status: "PUBLISHED",
      },
      create: {
        id: u.id,
        countryId,
        name: u.name,
        slug: u.slug,
        logoUrl: u.logo,
        coverImageUrl: u.coverImage,
        rankingGlobal: u.rankingGlobal,
        rankingNational: 1,
        acceptanceRate: 35.0,
        avgTuitionFeeYear: 25000,
        city: u.city,
        status: "PUBLISHED",
      },
    });
  }

  console.log(`✅ Seeded ${FEATURED_UNIVERSITIES_DATA.length} Universities into Database.`);
}
