export interface FeaturedCountry {
  id: string;
  name: string;
  slug: string;
  code: string;
  flag: string;
  postStudyWork: string;
  avgCost: string;
  topCities: string[];
  heroImage: string;
  description: string;
  popularMajors: string[];
}

export const FEATURED_COUNTRIES_DATA: FeaturedCountry[] = [
  {
    id: "uk",
    name: "United Kingdom",
    slug: "uk",
    code: "GB",
    flag: "🇬🇧",
    postStudyWork: "2 - 3 Years Graduate Visa",
    avgCost: "£12,000 - £22,000 / yr",
    topCities: ["London", "Manchester", "Edinburgh", "Birmingham"],
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    description: "Home to Oxford & Cambridge with 1-year Master's programs and 2-year post-study work rights.",
    popularMajors: ["Business & Finance", "Data Science", "Law", "Medicine"],
  },
  {
    id: "usa",
    name: "United States",
    slug: "usa",
    code: "US",
    flag: "🇺🇸",
    postStudyWork: "Up to 3 Years OPT (STEM)",
    avgCost: "$25,000 - $45,000 / yr",
    topCities: ["Boston", "New York", "San Francisco", "Chicago"],
    heroImage: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80",
    description: "The global leader in higher education offering Ivy League institutions and STEM OPT extensions.",
    popularMajors: ["Computer Science", "Engineering", "Business Analytics", "AI"],
  },
  {
    id: "canada",
    name: "Canada",
    slug: "canada",
    code: "CA",
    flag: "🇨🇦",
    postStudyWork: "3 Years PGWP",
    avgCost: "CAD 18,000 - 35,000 / yr",
    topCities: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
    heroImage: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80",
    description: "Welcoming immigration pathways, high quality of life, and generous post-graduation work permits.",
    popularMajors: ["Software Engineering", "Management", "Biotechnology", "Fintech"],
  },
  {
    id: "australia",
    name: "Australia",
    slug: "australia",
    code: "AU",
    flag: "🇦🇺",
    postStudyWork: "2 - 4 Years Temporary Graduate Visa",
    avgCost: "AUD 22,000 - 42,000 / yr",
    topCities: ["Sydney", "Melbourne", "Brisbane", "Perth"],
    heroImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    description: "World-class Group of Eight universities, vibrant multicultural lifestyle, and excellent PR prospects.",
    popularMajors: ["Information Technology", "Accounting", "Nursing", "Engineering"],
  },
  {
    id: "germany",
    name: "Germany",
    slug: "germany",
    code: "DE",
    flag: "🇩🇪",
    postStudyWork: "18 Months Job Seeking Visa",
    avgCost: "Zero Tuition (Public) / €10,000 Living",
    topCities: ["Munich", "Berlin", "Aachen", "Frankfurt"],
    heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
    description: "Tuition-free education at public universities and Europe's largest industrial economy for STEM.",
    popularMajors: ["Automotive Engineering", "Data Analytics", "Robotics", "Renewables"],
  },
  {
    id: "ireland",
    name: "Ireland",
    slug: "ireland",
    code: "IE",
    flag: "🇮🇪",
    postStudyWork: "2 Years Stamp 1G Stay Back",
    avgCost: "€11,000 - €20,000 / yr",
    topCities: ["Dublin", "Cork", "Galway", "Limerick"],
    heroImage: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=800&q=80",
    description: "The Tech Hub of Europe housing Google, Apple, Meta, and Pfizer European headquarters.",
    popularMajors: ["Cloud Computing", "Cybersecurity", "Pharma Science", "Finance"],
  },
];
