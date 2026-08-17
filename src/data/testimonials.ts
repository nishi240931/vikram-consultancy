export interface SuccessStory {
  id: string;
  studentName: string;
  qualification: string;
  cgpa: string;
  courseName: string;
  universityName: string;
  countryName: string;
  flag: string;
  avatar: string;
  status: "✓ Admitted" | "✓ Visa Approved";
}

export const SUCCESS_STORIES_DATA: SuccessStory[] = [
  {
    id: "story-1",
    studentName: "Rahul M.",
    qualification: "BCA",
    cgpa: "8.2 CGPA",
    courseName: "MSc Data Analytics",
    universityName: "University of Limerick",
    countryName: "Ireland",
    flag: "🇮🇪",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    status: "✓ Admitted",
  },
  {
    id: "story-2",
    studentName: "Sneha R.",
    qualification: "B.Tech CSE",
    cgpa: "8.5 CGPA",
    courseName: "MS in Artificial Intelligence",
    universityName: "Technical University of Munich",
    countryName: "Germany",
    flag: "🇩🇪",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    status: "✓ Visa Approved",
  },
  {
    id: "story-3",
    studentName: "Vikram J.",
    qualification: "BCA",
    cgpa: "8.0 CGPA",
    courseName: "MS in Computer Science",
    universityName: "Arizona State University",
    countryName: "USA",
    flag: "🇺🇸",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    status: "✓ Admitted",
  },
  {
    id: "story-4",
    studentName: "Aishwarya P.",
    qualification: "BBA",
    cgpa: "7.8 CGPA",
    courseName: "Master of Business Administration (MBA)",
    universityName: "Monash University",
    countryName: "Australia",
    flag: "🇦🇺",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    status: "✓ Admitted",
  },
  {
    id: "story-5",
    studentName: "Arjun S.",
    qualification: "B.Tech ECE",
    cgpa: "8.1 CGPA",
    courseName: "MSc Business Analytics",
    universityName: "University of Edinburgh",
    countryName: "UK",
    flag: "🇬🇧",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    status: "✓ Visa Approved",
  },
];

// Legacy export compatibility
export interface StudentTestimonial {
  id: string;
  studentName: string;
  universityName: string;
  courseName: string;
  countryName: string;
  flag: string;
  avatar: string;
  rating: number;
  quote: string;
  intake: string;
  scholarshipAmount?: string;
}

export const TESTIMONIALS_DATA: StudentTestimonial[] = SUCCESS_STORIES_DATA.map((s) => ({
  id: s.id,
  studentName: s.studentName,
  universityName: s.universityName,
  courseName: s.courseName,
  countryName: s.countryName,
  flag: s.flag,
  avatar: s.avatar,
  rating: 5,
  quote: `Successfully secured ${s.status.toLowerCase()} for ${s.courseName} at ${s.universityName}.`,
  intake: "Fall 2025",
}));
