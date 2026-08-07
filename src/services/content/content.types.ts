import { DegreeLevel, ScholarshipType, CountryStatus, UniversityStatus } from "@prisma/client";

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CountryFilterParams extends PaginationParams, SortParams {
  query?: string;
  status?: CountryStatus;
  minWorkPermitYears?: number;
}

export interface UniversityFilterParams extends PaginationParams, SortParams {
  query?: string;
  countrySlug?: string;
  countryId?: string;
  status?: UniversityStatus;
  maxRankingGlobal?: number;
  maxTuitionFee?: number;
  city?: string;
}

export interface CourseFilterParams extends PaginationParams, SortParams {
  query?: string;
  universitySlug?: string;
  universityId?: string;
  degreeLevel?: DegreeLevel;
  majorCategory?: string;
  maxTuitionTotal?: number;
  greRequired?: boolean;
  maxIeltsScore?: number;
}

export interface ScholarshipFilterParams extends PaginationParams, SortParams {
  query?: string;
  countrySlug?: string;
  countryId?: string;
  universitySlug?: string;
  type?: ScholarshipType;
  minAmount?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
  };
}
