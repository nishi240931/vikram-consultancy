export interface TimelineStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export const TIMELINE_STEPS_DATA: TimelineStep[] = [
  {
    stepNumber: 1,
    title: "Free Profile Consultation",
    subtitle: "Step 01",
    description: "Meet your dedicated senior counsellor to evaluate your academic profile, test scores, career ambitions, and financial budget.",
    iconName: "Calendar",
  },
  {
    stepNumber: 2,
    title: "AI University Shortlisting",
    subtitle: "Step 02",
    description: "Receive a tailored list of Ambitious, Target, and Safe global universities matching your criteria with fee breakdowns.",
    iconName: "Compass",
  },
  {
    stepNumber: 3,
    title: "Documentation & SOP Crafting",
    subtitle: "Step 03",
    description: "Work with expert editors to polish your Statements of Purpose, Resumes, and Recommendation letters to perfection.",
    iconName: "FileCheck",
  },
  {
    stepNumber: 4,
    title: "Application Submission",
    subtitle: "Step 04",
    description: "Direct university submission with fee waiver support, application tracking, and prompt admission department follow-ups.",
    iconName: "Send",
  },
  {
    stepNumber: 5,
    title: "Offer Acceptance & Visa Mastery",
    subtitle: "Step 05",
    description: "Secure your admit letter, apply for financial grants, and undergo rigorous mock interviews for 99.2% visa approval.",
    iconName: "Award",
  },
  {
    stepNumber: 6,
    title: "Pre-Departure & Flying Abroad",
    subtitle: "Step 06",
    description: "Attend pre-departure briefings, connect with alumni networks, secure student housing, and embark on your international journey.",
    iconName: "PlaneTakeoff",
  },
];
