export const APP_CONFIG = {
  name: "VIKRAM EDU CONSULTANTS",
  legalName: "Vikram Edu Consultants Private Limited",
  tagline: "Empowering Global Education & Future Leaders",
  description:
    "Your trusted partner for studying abroad, providing personalized guidance for universities, courses, applications, visas, and your complete overseas education journey.",
  url: "https://vikramedu.com",
  logoUrl: "/logo.png",
  contact: {
    phone: "98852 98821",
    formattedPhone: "+91 98852 98821",
    tollFree: "1800-123-4567",
    email: "info@vikrameduconsultants.com",
    supportEmail: "info@vikrameduconsultants.com",
    whatsapp: "+919885298821",
    address: "FF 1, Seetharama Residency, Yenamalakuduru, Vijayawada, Andhra Pradesh – 520007",
  },
  branches: [
    {
      city: "Vijayawada (Headquarters)",
      address: "FF 1, Seetharama Residency, Yenamalakuduru, Vijayawada, Andhra Pradesh – 520007",
      phone: "+91 98852 98821",
      email: "info@vikrameduconsultants.com",
    },
  ],
  socials: {
    instagram: "https://instagram.com/vikrameduconsultants",
    linkedin: "https://linkedin.com/company/vikram-edu-consultants",
    youtube: "https://youtube.com/@vikrameduconsultants",
    facebook: "https://facebook.com/vikrameduconsultants",
    twitter: "https://twitter.com/vikramedu",
  },
  destinations: [
    { code: "US", name: "United States", flag: "🇺🇸", slug: "usa" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧", slug: "uk" },
    { code: "CA", name: "Canada", flag: "🇨🇦", slug: "canada" },
    { code: "AU", name: "Australia", flag: "🇦🇺", slug: "australia" },
    { code: "NZ", name: "New Zealand", flag: "🇳🇿", slug: "new-zealand" },
    { code: "KR", name: "South Korea", flag: "🇰🇷", slug: "south-korea" },
    { code: "JP", name: "Japan", flag: "🇯🇵", slug: "japan" },
  ],
  stats: {
    studentsGuided: "15,000+",
    visaSuccessRate: "99.2%",
    partnerUniversities: "850+",
    scholarshipsSecured: "$12M+",
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
