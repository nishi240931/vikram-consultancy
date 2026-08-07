import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { adminService } from "@/services/admin.service";
import { AnalyticsCard } from "@/components/admin/AnalyticsCard";
import { Card, Button, Badge } from "@/design-system";
import { Users, UserCheck, GraduationCap, Award, Calendar, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Control Center | Vikram Edu Consultants",
  description: "Enterprise operations dashboard for Vikram Edu Consultants.",
};

export default async function AdminDashboardOverviewPage() {
  const overview = await adminService.getDashboardOverview();
  const students = await adminService.getStudents();
  const counsellors = await adminService.getCounsellors();

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col gap-1">
          <Badge variant="gold" size="sm" className="w-fit">
            <ShieldCheck className="w-3 h-3 mr-1" /> Platform Control Room
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] font-['Outfit']">
            Operations & Content Overview
          </h2>
          <p className="text-xs text-slate-500">
            Real-time telemetry across student registrations, applications, consultation calendar, and CMS records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="success" size="md">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> All Systems Operational
          </Badge>
        </div>
      </div>

      {/* Analytics Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard
          title="Total Registered Students"
          value={overview.totalStudents}
          change="14%"
          isPositive={true}
          icon={<Users className="w-5 h-5 text-[#D4AF37]" />}
          borderAccent="border-l-4 border-l-[#D4AF37]"
        />
        <AnalyticsCard
          title="Active Applications"
          value={overview.totalApplications}
          change="8%"
          isPositive={true}
          icon={<GraduationCap className="w-5 h-5 text-indigo-500" />}
          borderAccent="border-l-4 border-l-indigo-500"
        />
        <AnalyticsCard
          title="Upcoming Consultations"
          value={overview.upcomingConsultations}
          change="22%"
          isPositive={true}
          icon={<Calendar className="w-5 h-5 text-emerald-500" />}
          borderAccent="border-l-4 border-l-emerald-500"
        />
        <AnalyticsCard
          title="Partner Universities"
          value={overview.totalUniversities}
          change="5%"
          isPositive={true}
          icon={<Award className="w-5 h-5 text-amber-500" />}
          borderAccent="border-l-4 border-l-amber-500"
        />
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Student Activity */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#0B1B3D] font-['Outfit']">Recent Student Registrations</h3>
            <Link href="/admin/students" className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1">
              View CRM <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <Card variant="flat" padding="none" className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100">
              {students.map((st) => (
                <div key={st.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0B1B3D]/5 text-[#D4AF37] flex items-center justify-center font-bold text-xs border border-slate-200">
                      {st.firstName[0]}
                      {st.lastName[0]}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 text-sm">{st.firstName} {st.lastName}</span>
                      <span className="text-xs text-slate-400">{st.email} • Target: {st.targetCountry}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <Badge variant="outline" size="sm">
                      GPA {st.gpa}
                    </Badge>
                    <Link href="/admin/students">
                      <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Audit
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Senior Counsellor Roster */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#0B1B3D] font-['Outfit']">Counsellor Workload Roster</h3>
            <Link href="/admin/counsellors" className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1">
              Manage Roster <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {counsellors.map((c) => (
              <Card key={c.id} variant="flat" padding="md" className="bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-[#D4AF37]" />
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800 text-sm">{c.firstName} {c.lastName}</span>
                    <span className="text-xs text-slate-400">{c.counsellorProfile.yearsExperience}+ Yrs • Rating {c.counsellorProfile.rating}★</span>
                  </div>
                </div>

                <Badge variant="gold" size="sm">
                  Active Counsellor
                </Badge>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
