import assert from "node:assert/strict";
import { courseService } from "@/services/course.service";
import { scholarshipService } from "@/services/scholarship.service";
import { appointmentService } from "@/services/appointment.service";
import { studentService } from "@/services/student.service";
import { aiService } from "@/services/ai.service";

export async function runUnitTests() {
  // 1. Course Service Test
  const courseResult = await courseService.filterCourses({});
  assert.ok(courseResult.courses.length > 0, "Course service should return courses");

  // 2. Scholarship Service Test
  const scholarshipResult = await scholarshipService.filterScholarships({});
  assert.ok(scholarshipResult.scholarships.length > 0, "Scholarship service should return scholarships");

  // 3. Appointment Service Test
  const slots = appointmentService.getAvailableSlots("2025-10-15");
  assert.ok(slots.length > 0, "Appointment service should return available slots");

  // 4. Student Service Test
  const summary = await studentService.getDashboardSummary("student-demo");
  assert.equal(summary.profileProgress, 85, "Student progress should equal 85%");

  // 5. AI Service Test
  const budget = aiService.calculateStudyBudget({ country: "United States", tuition: 40000 });
  assert.equal(budget.totalEstimatedAnnualCost, 54300, "Calculated study budget should equal 54,300");

  console.log("✅ All unit & service integration tests passed successfully.");
}
