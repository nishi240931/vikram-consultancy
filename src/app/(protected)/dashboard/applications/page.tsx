import React from "react";
import type { Metadata } from "next";
import { studentService } from "@/services/student.service";
import { ApplicationTimeline } from "@/components/dashboard/ApplicationTimeline";

export const metadata: Metadata = {
  title: "My Applications | Vikram Edu Consultants",
  description: "Track the live status of your university applications.",
};

export default async function StudentApplicationsPage() {
  const applications = await studentService.getStudentApplications();

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Applications Workspace</h2>
        <p className="text-xs text-slate-500">Track application stages, submission milestones, and admissions feedback.</p>
      </div>

      <div className="flex flex-col gap-6">
        {applications.map((app) => (
          <ApplicationTimeline
            key={app.id}
            application={{
              id: app.id,
              courseName: app.course?.name || "MSc Computer Science",
              universityName: app.course?.university?.name || "University of Oxford",
              countryName: app.course?.university?.country?.name || "United Kingdom",
              status: app.status,
              stages: app.stages || [],
            }}
          />
        ))}
      </div>
    </div>
  );
}
