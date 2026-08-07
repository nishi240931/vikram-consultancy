export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  badge?: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "counselling",
    title: "1-on-1 Profile Assessment & Counselling",
    description: "Personalized mentorship with certified global education experts to map your career goals and profile strengths.",
    iconName: "UserCheck",
    features: ["Personalized Career Roadmap", "Profile Evaluation", "Country & Budget Selection"],
    badge: "Most Popular",
  },
  {
    id: "shortlisting",
    title: "AI University & Course Shortlisting",
    description: "Data-driven university selection algorithm matching your GPA, test scores, financial budget, and post-study work goals.",
    iconName: "Search",
    features: ["Risk vs Safety Tiering", "Course Curriculum Analysis", "GRE/IELTS Waiver Spotting"],
  },
  {
    id: "sop-lor",
    title: "SOP & LOR Editorial Review",
    description: "Comprehensive editing and storytelling refinement for Statements of Purpose, Letters of Recommendation, and Resumes.",
    iconName: "FileEdit",
    features: ["Ivy-League Editors", "Plagiarism & AI Checks", "University-Specific Tailoring"],
  },
  {
    id: "visa-guidance",
    title: "Visa Guidance & Mock Interviews",
    description: "Meticulous visa documentation checklist, financial proof auditing, and one-on-one mock interview drills.",
    iconName: "ShieldCheck",
    features: ["99.2% Approval Rate", "Mock Interview Practice", "Financial Proof Auditing"],
    badge: "99.2% Success",
  },
  {
    id: "scholarships",
    title: "Scholarship & Financial Aid Support",
    description: "Identify and apply for government grants, university merit awards, and private scholarship funding.",
    iconName: "Award",
    features: ["$12M+ Secured", "Merit & Need-Based", "Grant Essay Drafting"],
  },
  {
    id: "test-prep",
    title: "IELTS, TOEFL & GRE Coaching",
    description: "Structured test preparation with certified tutors, timed mock exams, and score guarantee strategies.",
    iconName: "GraduationCap",
    features: ["Certified Master Tutors", "Unlimited Practice Tests", "Band 8+ Target Strategies"],
  },
];
