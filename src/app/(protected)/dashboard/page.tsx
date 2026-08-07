import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { studentService } from "@/services/student.service";
import { ProgressTracker } from "@/components/dashboard/ProgressTracker";
import { StatisticsCards } from "@/components/dashboard/StatisticsCards";
import { ApplicationTimeline } from "@/components/dashboard/ApplicationTimeline";
import { Card, Button, Badge } from "@/design-system";
import { GraduationCap, Calendar, FileText, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Student Dashboard | Vikram Edu Consultants",
  description: "Personalized student study abroad workspace.",
};

export default async function DashboardHomePage() {
  const summary = await studentService.getDashboardSummary();
  const profile = await studentService.getStudentProfile();
  const applications = await studentService.getStudentApplications();

  const primaryApp = applications[0];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col gap-1">
          <Badge variant="gold" size="sm" className="w-fit">
            <Sparkles className="w-3 h-3 mr-1" /> Active Applicant
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] font-['Outfit']">
            Welcome back, {profile.firstName || "Ananya"}!
          </h2>
          <p className="text-xs text-slate-500">
            Target Destination: <strong className="text-slate-800">{profile.targetCountry || "United States"}</strong> • GPA: <strong className="text-slate-800">{profile.gpa || 3.8}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/book-consultation">
            <Button variant="primary" size="md" leftIcon={<Calendar className="w-4 h-4" />}>
              Schedule Consultation
            </Button>
          </Link>
        </div>
      </div>

      {/* Progress Tracker */}
      <ProgressTracker percentage={summary.profileProgress} />

      {/* Statistics Cards */}
      <StatisticsCards summary={summary} />

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Live Application & Document Vault Preview */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#0B1B3D] font-['Outfit']">Active Application Status</h3>
            <Link href="/dashboard/applications" className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {primaryApp && (
            <ApplicationTimeline
              application={{
                id: primaryApp.id,
                courseName: primaryApp.course?.name || "MSc Computer Science",
                universityName: primaryApp.course?.university?.name || "University of Oxford",
                countryName: primaryApp.course?.university?.country?.name || "United Kingdom",
                status: primaryApp.status,
                stages: primaryApp.stages || [],
              }}
            />
          )}

          {/* Action Callout */}
          <Card variant="glass" padding="md" className="bg-[#0B1B3D]/5 border-[#D4AF37]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0B1B3D]">3 Documents Uploaded</span>
                <span className="text-[11px] text-slate-500">2 Documents Verified by Admission Desk</span>
              </div>
            </div>
            <Link href="/dashboard/documents">
              <Button variant="outline" size="sm">
                Document Vault
              </Button>
            </Link>
          </Card>
        </div>

        {/* Right Column: Quick Actions & Recommended Next Steps */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h3 className="text-lg font-bold text-[#0B1B3D] font-['Outfit']">Quick Workspace Actions</h3>

          <div className="flex flex-col gap-3">
            <Link href="/universities">
              <Card variant="flat" padding="md" className="bg-white border border-slate-200 rounded-2xl hover:border-[#D4AF37] transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 text-[#D4AF37] group-hover:bg-[#0B1B3D] group-hover:text-white transition-colors">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#0B1B3D]">Explore Universities</span>
                    <span className="text-xs text-slate-500">Browse 850+ global partner institutions</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#D4AF37]" />
              </Card>
            </Link>

            <Link href="/courses">
              <Card variant="flat" padding="md" className="bg-white border border-slate-200 rounded-2xl hover:border-[#D4AF37] transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 text-[#D4AF37] group-hover:bg-[#0B1B3D] group-hover:text-white transition-colors">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#0B1B3D]">Search Programs</span>
                    <span className="text-xs text-slate-500">Find Bachelor&apos;s and Master&apos;s degrees</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#D4AF37]" />
              </Card>
            </Link>

            <Link href="/scholarships">
              <Card variant="flat" padding="md" className="bg-white border border-slate-200 rounded-2xl hover:border-[#D4AF37] transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 text-[#D4AF37] group-hover:bg-[#0B1B3D] group-hover:text-white transition-colors">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#0B1B3D]">Explore Scholarships</span>
                    <span className="text-xs text-slate-500">Discover full tuition funding & grants</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#D4AF37]" />
              </Card>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
