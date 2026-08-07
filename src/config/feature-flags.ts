export const FEATURE_FLAGS = {
  enableAiAssistant: true,
  enableSopReviewer: true,
  enableDirectScholarshipMatching: true,
  enableVirtualCounselingSlots: true,
  enableWhatsAppNotifications: true,
  enableUniversityVirtualTours: true,
  enableLiveApplicationTracking: true,
  maintenanceMode: false,
} as const;

export type FeatureFlags = typeof FEATURE_FLAGS;
