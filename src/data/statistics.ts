export interface StatisticItem {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description: string;
}

export const STATISTICS_DATA: StatisticItem[] = [
  {
    id: "students",
    label: "Students Guided",
    value: 15000,
    suffix: "+",
    description: "Successfully placed in global universities",
  },
  {
    id: "universities",
    label: "Partner Universities",
    value: 850,
    suffix: "+",
    description: "Top-ranked institutional tie-ups",
  },
  {
    id: "countries",
    label: "Study Destinations",
    value: 15,
    suffix: "+",
    description: "Popular global education hubs",
  },
  {
    id: "visa",
    label: "Visa Success Rate",
    value: 99.2,
    suffix: "%",
    description: "Industry-leading approval consistency",
  },
  {
    id: "scholarships",
    label: "Scholarships Awarded",
    value: 12,
    prefix: "$",
    suffix: "M+",
    description: "Financial aid secured for students",
  },
  {
    id: "experience",
    label: "Years of Excellence",
    value: 14,
    suffix: "+",
    description: "Dedicated study abroad mentorship",
  },
];
