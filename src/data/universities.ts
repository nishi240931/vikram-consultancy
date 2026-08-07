export interface FeaturedUniversity {
  id: string;
  name: string;
  slug: string;
  countryName: string;
  countryCode: string;
  flag: string;
  logo: string;
  coverImage: string;
  rankingGlobal: number;
  acceptanceRate: string;
  avgTuition: string;
  city: string;
  badge?: string;
}

export const FEATURED_UNIVERSITIES_DATA: FeaturedUniversity[] = [
  {
    id: "oxford",
    name: "University of Oxford",
    slug: "university-of-oxford",
    countryName: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80",
    rankingGlobal: 1,
    acceptanceRate: "17.5%",
    avgTuition: "£28,000 / yr",
    city: "Oxford",
    badge: "QS #1 World",
  },
  {
    id: "harvard",
    name: "Harvard University",
    slug: "harvard-university",
    countryName: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?auto=format&fit=crop&w=800&q=80",
    rankingGlobal: 4,
    acceptanceRate: "4.0%",
    avgTuition: "$54,000 / yr",
    city: "Cambridge, MA",
    badge: "Ivy League",
  },
  {
    id: "toronto",
    name: "University of Toronto",
    slug: "university-of-toronto",
    countryName: "Canada",
    countryCode: "CA",
    flag: "🇨🇦",
    logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1569420035978-77ce893d6915?auto=format&fit=crop&w=800&q=80",
    rankingGlobal: 21,
    acceptanceRate: "43%",
    avgTuition: "CAD 45,000 / yr",
    city: "Toronto",
    badge: "#1 in Canada",
  },
  {
    id: "melbourne",
    name: "University of Melbourne",
    slug: "university-of-melbourne",
    countryName: "Australia",
    countryCode: "AU",
    flag: "🇦🇺",
    logo: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    rankingGlobal: 14,
    acceptanceRate: "70%",
    avgTuition: "AUD 38,000 / yr",
    city: "Melbourne",
    badge: "Group of Eight",
  },
  {
    id: "tum",
    name: "Technical University of Munich",
    slug: "technical-university-of-munich",
    countryName: "Germany",
    countryCode: "DE",
    flag: "🇩🇪",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=800&q=80",
    rankingGlobal: 28,
    acceptanceRate: "8%",
    avgTuition: "Free (Public)",
    city: "Munich",
    badge: "TU9 STEM Leader",
  },
  {
    id: "tcd",
    name: "Trinity College Dublin",
    slug: "trinity-college-dublin",
    countryName: "Ireland",
    countryCode: "IE",
    flag: "🇮🇪",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=800&q=80",
    rankingGlobal: 81,
    acceptanceRate: "33%",
    avgTuition: "€18,000 / yr",
    city: "Dublin",
    badge: "#1 in Ireland",
  },
];
