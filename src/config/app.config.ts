export const APP_CONFIG = {
  name: "VIKRAM EDU CONSULTANTS",
  legalName: "Vikram Edu Consultants Private Limited",
  tagline: "Empowering Global Education & Future Leaders",
  description:
    "Premium AI-powered study abroad consultancy platform guiding students to top global universities across USA, UK, Canada, Australia, Germany, Ireland, and Singapore.",
  url: "https://vikramedu.com",
  logoUrl: "/logo.png",
  contact: {
    phone: "+91 98765 43210",
    tollFree: "1800-123-4567",
    email: "admissions@vikramedu.com",
    supportEmail: "support@vikramedu.com",
    whatsapp: "+919876543210",
  },
  branches: [
    {
      city: "Hyderabad (Headquarters)",
      address: "Suite 401, Platinum Towers, Jubilee Hills, Hyderabad, Telangana 500033",
      phone: "+91 40 1234 5678",
    },
    {
      city: "Bengaluru",
      address: "Level 3, Prestige Meridian, M.G. Road, Bengaluru, Karnataka 560001",
      phone: "+91 80 8765 4321",
    },
    {
      city: "Mumbai",
      address: "7th Floor, Maker Chambers V, Nariman Point, Mumbai, Maharashtra 400021",
      phone: "+91 22 4321 8765",
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
    { code: "DE", name: "Germany", flag: "🇩🇪", slug: "germany" },
    { code: "IE", name: "Ireland", flag: "🇮🇪", slug: "ireland" },
    { code: "SG", name: "Singapore", flag: "🇸🇬", slug: "singapore" },
  ],
  stats: {
    studentsGuided: "15,000+",
    visaSuccessRate: "99.2%",
    partnerUniversities: "850+",
    scholarshipsSecured: "$12M+",
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
