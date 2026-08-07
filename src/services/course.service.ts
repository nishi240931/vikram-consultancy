import { courseRepository, CourseFilterQuery } from "@/repositories/course.repository";
import { Course, University, Country, DegreeLevel } from "@prisma/client";
import { logger } from "@/lib/logger";

export interface CourseWithDetails extends Course {
  university?: (Partial<University> & { country?: Partial<Country> | null }) | null;
}

export interface CoursePaginatedResult {
  courses: CourseWithDetails[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export const FALLBACK_COURSES_DATA: CourseWithDetails[] = [
  {
    id: "course-1",
    universityId: "uni-oxford",
    name: "MSc in Advanced Computer Science",
    slug: "msc-advanced-computer-science-oxford",
    degreeLevel: "MASTERS" as DegreeLevel,
    durationMonths: 12,
    tuitionFeeTotal: 38500,
    currency: "GBP",
    intakeSemesters: ["September 2025"],
    ieltsMinScore: 7.5,
    greRequired: false,
    majorCategory: "Computer Science",
    overview: "Advanced study in machine learning, artificial intelligence, software engineering, and quantum computing at Oxford.",
    createdAt: new Date(),
    updatedAt: new Date(),
    university: {
      id: "uni-oxford",
      name: "University of Oxford",
      slug: "university-of-oxford",
      city: "Oxford",
      country: { name: "United Kingdom", code: "GB", flagUrl: "🇬🇧" },
    },
  },
  {
    id: "course-2",
    universityId: "uni-harvard",
    name: "Master of Business Administration (MBA)",
    slug: "mba-harvard-business-school",
    degreeLevel: "MASTERS" as DegreeLevel,
    durationMonths: 24,
    tuitionFeeTotal: 73440,
    currency: "USD",
    intakeSemesters: ["August 2025"],
    ieltsMinScore: 7.5,
    greRequired: true,
    majorCategory: "Business & Management",
    overview: "World-leading general management program focused on leadership, strategy, corporate finance, and global business transformation.",
    createdAt: new Date(),
    updatedAt: new Date(),
    university: {
      id: "uni-harvard",
      name: "Harvard University",
      slug: "harvard-university",
      city: "Cambridge, MA",
      country: { name: "United States", code: "US", flagUrl: "🇺🇸" },
    },
  },
  {
    id: "course-3",
    universityId: "uni-toronto",
    name: "MSc in Data Science & Machine Learning",
    slug: "msc-data-science-toronto",
    degreeLevel: "MASTERS" as DegreeLevel,
    durationMonths: 16,
    tuitionFeeTotal: 46000,
    currency: "CAD",
    intakeSemesters: ["September 2025", "January 2026"],
    ieltsMinScore: 7.0,
    greRequired: false,
    majorCategory: "Data Science",
    overview: "Comprehensive program covering deep learning, big data analytics, statistical modeling, and AI ethics in Toronto's tech hub.",
    createdAt: new Date(),
    updatedAt: new Date(),
    university: {
      id: "uni-toronto",
      name: "University of Toronto",
      slug: "university-of-toronto",
      city: "Toronto",
      country: { name: "Canada", code: "CA", flagUrl: "🇨🇦" },
    },
  },
  {
    id: "course-4",
    universityId: "uni-melbourne",
    name: "Bachelor of Information Technology",
    slug: "bachelor-information-technology-melbourne",
    degreeLevel: "BACHELORS" as DegreeLevel,
    durationMonths: 36,
    tuitionFeeTotal: 44000,
    currency: "AUD",
    intakeSemesters: ["February 2025", "July 2025"],
    ieltsMinScore: 6.5,
    greRequired: false,
    majorCategory: "Computer Science",
    overview: "Undergraduate degree preparing students for full-stack software development, cybersecurity, cloud architecture, and IT management.",
    createdAt: new Date(),
    updatedAt: new Date(),
    university: {
      id: "uni-melbourne",
      name: "University of Melbourne",
      slug: "university-of-melbourne",
      city: "Melbourne",
      country: { name: "Australia", code: "AU", flagUrl: "🇦🇺" },
    },
  },
  {
    id: "course-5",
    universityId: "uni-tum",
    name: "MSc in Robotics, Cognition & Intelligence",
    slug: "msc-robotics-cognition-tum",
    degreeLevel: "MASTERS" as DegreeLevel,
    durationMonths: 24,
    tuitionFeeTotal: 12000,
    currency: "EUR",
    intakeSemesters: ["October 2025"],
    ieltsMinScore: 6.5,
    greRequired: false,
    majorCategory: "Engineering",
    overview: "Pioneering interdisciplinary Master's degree combining mechanical engineering, computer vision, autonomous systems, and AI.",
    createdAt: new Date(),
    updatedAt: new Date(),
    university: {
      id: "uni-tum",
      name: "Technical University of Munich",
      slug: "technical-university-of-munich",
      city: "Munich",
      country: { name: "Germany", code: "DE", flagUrl: "🇩🇪" },
    },
  },
  {
    id: "course-6",
    universityId: "uni-tcd",
    name: "MSc in Digital Health & Biomedical Engineering",
    slug: "msc-digital-health-trinity",
    degreeLevel: "MASTERS" as DegreeLevel,
    durationMonths: 12,
    tuitionFeeTotal: 26500,
    currency: "EUR",
    intakeSemesters: ["September 2025"],
    ieltsMinScore: 6.5,
    greRequired: false,
    majorCategory: "Health Sciences",
    overview: "Cutting-edge degree at Trinity College Dublin focusing on medical device innovation, health data analytics, and digital therapeutics.",
    createdAt: new Date(),
    updatedAt: new Date(),
    university: {
      id: "uni-tcd",
      name: "Trinity College Dublin",
      slug: "trinity-college-dublin",
      city: "Dublin",
      country: { name: "Ireland", code: "IE", flagUrl: "🇮🇪" },
    },
  },
];

export class CourseService {
  /**
   * Retrieves paginated and filtered courses with fallback safety.
   */
  async filterCourses(params: CourseFilterQuery): Promise<CoursePaginatedResult> {
    try {
      const result = await courseRepository.filterCourses(params);
      if (result.courses.length > 0) {
        return result as CoursePaginatedResult;
      }
    } catch (error) {
      logger.warn("Failed to filter courses from DB, falling back to static course data", { error });
    }

    let filtered = [...FALLBACK_COURSES_DATA];

    if (params.query) {
      const q = params.query.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.majorCategory.toLowerCase().includes(q) ||
          (c.university?.name && c.university.name.toLowerCase().includes(q))
      );
    }

    if (params.degreeLevel) {
      filtered = filtered.filter((c) => c.degreeLevel === params.degreeLevel);
    }

    if (params.countrySlug) {
      filtered = filtered.filter(
        (c) => c.university?.country?.name?.toLowerCase() === params.countrySlug?.toLowerCase()
      );
    }

    if (params.maxTuitionTotal) {
      filtered = filtered.filter((c) => c.tuitionFeeTotal <= (params.maxTuitionTotal || 100000));
    }

    const page = params.page || 1;
    const limit = params.limit || 12;
    const skip = (page - 1) * limit;
    const paginated = filtered.slice(skip, skip + limit);

    return {
      courses: paginated,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
      hasMore: skip + paginated.length < filtered.length,
    };
  }

  /**
   * Retrieves a single course by slug with fallback.
   */
  async getCourseBySlug(slug: string): Promise<CourseWithDetails | null> {
    try {
      const dbCourse = await courseRepository.getCourseBySlug(slug);
      if (dbCourse) return dbCourse as CourseWithDetails;
    } catch (error) {
      logger.warn(`Failed to fetch course '${slug}' from DB, checking fallback`, { error });
    }

    return FALLBACK_COURSES_DATA.find((c) => c.slug === slug) || null;
  }

  /**
   * Retrieves featured courses.
   */
  async getFeaturedCourses(limit: number = 6): Promise<CourseWithDetails[]> {
    try {
      const dbCourses = await courseRepository.getFeaturedCourses(limit);
      if (dbCourses.length > 0) return dbCourses as CourseWithDetails[];
    } catch (error) {
      logger.warn("Failed to fetch featured courses from DB, using fallback", { error });
    }

    return FALLBACK_COURSES_DATA.slice(0, limit);
  }
}

export const courseService = new CourseService();
