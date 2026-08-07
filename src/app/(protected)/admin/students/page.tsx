import React from "react";
import type { Metadata } from "next";
import { adminService } from "@/services/admin.service";
import { DataTable } from "@/components/admin/DataTable";
import { Badge, Button } from "@/design-system";
import { User, Mail, Phone, Globe, Award, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Student CRM Directory | Vikram Edu Admin",
  description: "Manage student profiles, target destinations, and assigned counsellors.",
};

export default async function AdminStudentsPage() {
  const students = await adminService.getStudents();

  const columns = [
    {
      header: "Student Name",
      cell: (item: typeof students[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0B1B3D]/5 text-[#D4AF37] flex items-center justify-center font-bold text-xs">
            {item.firstName[0]}
            {item.lastName[0]}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-800">{item.firstName} {item.lastName}</span>
            <span className="text-[10px] text-slate-400">{item.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Phone / WhatsApp",
      accessorKey: "phone" as const,
    },
    {
      header: "Target Country",
      cell: (item: typeof students[0]) => (
        <Badge variant="outline" size="sm">
          {item.targetCountry}
        </Badge>
      ),
    },
    {
      header: "GPA",
      cell: (item: typeof students[0]) => <span className="font-bold text-slate-800">{item.gpa}</span>,
    },
    {
      header: "Assigned Counsellor",
      cell: (item: typeof students[0]) => (
        <span className="text-xs font-semibold text-[#0B1B3D]">{item.assignedCounsellor}</span>
      ),
    },
    {
      header: "Actions",
      cell: () => (
        <Button variant="ghost" size="sm">
          Manage Profile
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Student CRM Directory</h2>
          <p className="text-xs text-slate-500">Manage prospective applicants, verify profiles, and assign senior counsellors.</p>
        </div>

        <Badge variant="gold" size="md">
          {students.length} Registered Students
        </Badge>
      </div>

      <DataTable columns={columns} data={students} keyExtractor={(item) => item.id} />
    </div>
  );
}
