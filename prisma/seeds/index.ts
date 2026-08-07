import { PrismaClient } from "@prisma/client";
import { seedCountries } from "./countries";
import { seedUniversities } from "./universities";
import { seedCourses } from "./courses";
import { seedScholarships } from "./scholarships";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Database Seed Infrastructure execution...");
  await seedCountries(prisma);
  await seedUniversities(prisma);
  await seedCourses(prisma);
  await seedScholarships(prisma);
  console.log("✅ Seed Infrastructure Execution Completed.");
}

main()
  .catch((e) => {
    console.error("❌ Seed execution error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
