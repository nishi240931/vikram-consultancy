export interface PostStudyWorkInfo {
  title: string;
  subtitle: string;
}

export interface FeaturedCountry {
  id: string;
  name: string;
  slug: string;
  code: string;
  flag: string;
  postStudyWork: string;
  postStudyWorkDetail: PostStudyWorkInfo;
  visaSuccessRateText: string;
  avgCost: string;
  topCities: string[];
  heroImage: string;
  description: string;
  popularMajors: string[];
  scholarshipOpportunities?: string;
}

export const FEATURED_COUNTRIES_DATA: FeaturedCountry[] = [
  {
    id: "usa",
    name: "United States",
    slug: "usa",
    code: "US",
    flag: "🇺🇸",
    postStudyWork: "12 Months OPT / Up to 36 Months for STEM",
    postStudyWorkDetail: {
      title: "12 Months OPT",
      subtitle: "Up to 36 Months for STEM*",
    },
    visaSuccessRateText: "High Eligibility (F-1)",
    avgCost: "US$ 18,000 - 25,000 / yr",
    topCities: ["Boston", "New York", "San Francisco", "Chicago"],
    heroImage: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80",
    description: "The global leader in higher education offering Ivy League institutions, world-class research labs, and STEM OPT extensions.",
    popularMajors: ["Computer Science", "Engineering", "Business Analytics", "AI"],
    scholarshipOpportunities: "Merit-based, Ivy League & Fulbright Grants Available",
  },
  {
    id: "uk",
    name: "United Kingdom",
    slug: "uk",
    code: "GB",
    flag: "🇬🇧",
    postStudyWork: "Graduate Visa (2 Years* / 18 Months*)",
    postStudyWorkDetail: {
      title: "Graduate Visa",
      subtitle: "2 Years* (18 Mos from 2027)",
    },
    visaSuccessRateText: "High Approval Rate",
    avgCost: "£ 12,000 - 15,000 / yr",
    topCities: ["London", "Manchester", "Edinburgh", "Birmingham"],
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    description: "Home to Oxford & Cambridge with 1-year Master's programs and post-study work authorization.",
    popularMajors: ["Business & Finance", "Data Science", "Law", "Medicine"],
    scholarshipOpportunities: "Chevening, GREAT & University Bursaries",
  },
  {
    id: "canada",
    name: "Canada",
    slug: "canada",
    code: "CA",
    flag: "🇨🇦",
    postStudyWork: "PGWP (Up to 3 Years*)",
    postStudyWorkDetail: {
      title: "PGWP",
      subtitle: "Up to 3 Years*",
    },
    visaSuccessRateText: "High Eligibility",
    avgCost: "CAD 18,000 - 24,000 / yr",
    topCities: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
    heroImage: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80",
    description: "Welcoming immigration pathways, high quality of life, and generous post-graduation work permits.",
    popularMajors: ["Software Engineering", "Management", "Biotechnology", "Fintech"],
    scholarshipOpportunities: "Vanier, Entrance Grants & TA/RA Support",
  },
  {
    id: "australia",
    name: "Australia",
    slug: "australia",
    code: "AU",
    flag: "🇦🇺",
    postStudyWork: "Temporary Graduate Visa (Duration Varies)",
    postStudyWorkDetail: {
      title: "Temporary Graduate Visa",
      subtitle: "Duration Varies by Stream",
    },
    visaSuccessRateText: "High Eligibility (Subclass 500)",
    avgCost: "AUD 22,000 - 29,000 / yr",
    topCities: ["Sydney", "Melbourne", "Brisbane", "Perth"],
    heroImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    description: "World-class Group of Eight universities, vibrant multicultural lifestyle, and post-study work streams.",
    popularMajors: ["Information Technology", "Accounting", "Nursing", "Engineering"],
    scholarshipOpportunities: "Australia Awards & Destination Australia Bursaries",
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    slug: "new-zealand",
    code: "NZ",
    flag: "🇳🇿",
    postStudyWork: "Post Study Work Visa (Up to 3 Years*)",
    postStudyWorkDetail: {
      title: "Post Study Work Visa",
      subtitle: "Up to 3 Years*",
    },
    visaSuccessRateText: "High Eligibility",
    avgCost: "NZD 20,000 - 25,000 / yr",
    topCities: ["Auckland", "Wellington", "Christchurch", "Hamilton"],
    heroImage: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80",
    description: "Safe, pristine environment with world-ranked universities and post-study open work rights.",
    popularMajors: ["Environmental Science", "Agriculture", "IT", "Engineering"],
    scholarshipOpportunities: "Manaaki NZ & University Excellence Grants",
  },
  {
    id: "south-korea",
    name: "South Korea",
    slug: "south-korea",
    code: "KR",
    flag: "🇰🇷",
    postStudyWork: "D-10 Job-Seeking Visa (Subject to Eligibility)",
    postStudyWorkDetail: {
      title: "D-10 Job-Seeking Visa",
      subtitle: "Subject to Eligibility",
    },
    visaSuccessRateText: "High Eligibility",
    avgCost: "KRW 8,000,000 - 12,000,000 / yr",
    topCities: ["Seoul", "Daejeon", "Busan", "Incheon"],
    heroImage: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80",
    description: "Global tech hub home to Samsung, Hyundai & LG with generous GKS government scholarships.",
    popularMajors: ["Robotics", "Semiconductors", "Digital Media", "International Trade"],
    scholarshipOpportunities: "GKS (Global Korea Scholarship) & Uni Grants",
  },
  {
    id: "japan",
    name: "Japan",
    slug: "japan",
    code: "JP",
    flag: "🇯🇵",
    postStudyWork: "Designated Activities (Job Hunting Transition)",
    postStudyWorkDetail: {
      title: "Designated Activities",
      subtitle: "Job Hunting Transition",
    },
    visaSuccessRateText: "High Eligibility",
    avgCost: "JPY 1,200,000 - 1,800,000 / yr",
    topCities: ["Tokyo", "Kyoto", "Osaka", "Tohoku"],
    heroImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    description: "Pioneer in innovation, high safety index, MEXT scholarships, and booming tech job opportunities.",
    popularMajors: ["Automotive Tech", "AI & Quantum", "Robotics", "Business"],
    scholarshipOpportunities: "MEXT Government & JASSO Scholarships",
  },
];
