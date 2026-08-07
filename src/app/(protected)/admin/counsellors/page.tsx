import React from "react";
import type { Metadata } from "next";
import { adminService } from "@/services/admin.service";
import { Card, Badge, Button } from "@/design-system";
import { UserCheck, Star, Award, Plus, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Counsellor Roster | Vikram Edu Admin",
  description: "Manage senior education advisors and workload assignments.",
};

export default async function AdminCounsellorsPage() {
  const counsellors = await adminService.getCounsellors();

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Senior Counsellors Roster</h2>
          <p className="text-xs text-slate-500">Oversee advisory team profiles, specializations, ratings, and student workloads.</p>
        </div>

        <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
          Add Senior Counsellor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {counsellors.map((c) => (
          <Card key={c.id} variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-2xl flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-2xl bg-[#0B1B3D]/5 text-[#D4AF37] border border-slate-200">
                <UserCheck className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-900 text-base font-['Outfit']">{c.firstName} {c.lastName}</h3>
                <span className="text-xs text-slate-500">{c.email}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {c.counsellorProfile.rating} Rating
              </span>
              <span className="flex items-center gap-1 font-semibold">
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                {c.counsellorProfile.yearsExperience}+ Yrs Experience
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
              {c.counsellorProfile.bio}
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <Badge variant="gold" size="sm">
                Active Advisor
              </Badge>
              <Button variant="outline" size="sm">
                Edit Roster Profile
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
