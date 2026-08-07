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

export const TESTIMONIALS_DATA: StudentTestimonial[] = [
  {
    id: "1",
    studentName: "Ananya Sharma",
    universityName: "University of Oxford",
    courseName: "MSc in Computer Science",
    countryName: "United Kingdom",
    flag: "🇬🇧",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "Vikram Edu Consultants transformed my dream into reality. From SOP editing to Oxford mock interviews, their guidance was world-class!",
    intake: "Fall 2025",
    scholarshipAmount: "£15,000 Award",
  },
  {
    id: "2",
    studentName: "Rohan Verma",
    universityName: "Harvard University",
    courseName: "Master of Public Policy",
    countryName: "United States",
    flag: "🇺🇸",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "The AI university matchmaker shortlisted programs I hadn't even considered. Secured admission to Harvard with a partial scholarship!",
    intake: "Fall 2025",
    scholarshipAmount: "$25,000 Fellowship",
  },
  {
    id: "3",
    studentName: "Kavya Reddy",
    universityName: "University of Toronto",
    courseName: "Master of Management Analytics",
    countryName: "Canada",
    flag: "🇨🇦",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "Their Canadian visa preparation team is bulletproof. My PGWP path and student visa were approved in less than 3 weeks!",
    intake: "Spring 2025",
  },
  {
    id: "4",
    studentName: "Aditya Patel",
    universityName: "Technical University of Munich",
    courseName: "MSc in Robotics & AI",
    countryName: "Germany",
    flag: "🇩🇪",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "Studying tuition-free in Germany seemed complex, but Vikram Edu guided me through APS certification and blocked accounts smoothly.",
    intake: "Fall 2024",
  },
];
