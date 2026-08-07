import React from "react";
import type { Metadata } from "next";
import { studentService } from "@/services/student.service";
import { Card, Button, Input } from "@/design-system";
import { User, Mail, Phone, Globe, Award, DollarSign, Save } from "lucide-react";

export const metadata: Metadata = {
  title: "Student Profile | Vikram Edu Consultants",
  description: "Manage your student profile, academic background, and study preferences.",
};

export default async function StudentProfilePage() {
  const profile = await studentService.getStudentProfile();

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Student Profile</h2>
        <p className="text-xs text-slate-500">Update your contact details, academic background, and study preferences.</p>
      </div>

      <form className="flex flex-col gap-6">
        {/* Personal & Contact Details */}
        <Card variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] font-['Outfit']">
            Personal Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="First Name" defaultValue={profile.firstName || ""} leftIcon={<User className="w-4 h-4 text-slate-400" />} />
            <Input label="Last Name" defaultValue={profile.lastName || ""} leftIcon={<User className="w-4 h-4 text-slate-400" />} />
            <Input label="Email Address" type="email" defaultValue={profile.email} leftIcon={<Mail className="w-4 h-4 text-slate-400" />} disabled />
            <Input label="Phone Number" type="tel" defaultValue={profile.phone || ""} leftIcon={<Phone className="w-4 h-4 text-slate-400" />} />
          </div>
        </Card>

        {/* Academic Profile */}
        <Card variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] font-['Outfit']">
            Academic Background & Preferences
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Undergraduate GPA (0-4.0)" type="number" step="0.1" defaultValue={profile.gpa || 3.8} leftIcon={<Award className="w-4 h-4 text-slate-400" />} />
            <Input label="Target Country" defaultValue={profile.targetCountry || "United States"} leftIcon={<Globe className="w-4 h-4 text-slate-400" />} />
            <Input label="Max Budget (USD / yr)" type="number" defaultValue={profile.budgetMax || 50000} leftIcon={<DollarSign className="w-4 h-4 text-slate-400" />} />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button variant="primary" size="lg" leftIcon={<Save className="w-4 h-4" />}>
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
