import React from "react";
import type { Metadata } from "next";
import { scholarshipService } from "@/services/scholarship.service";
import { DataTable } from "@/components/admin/DataTable";
import { Badge, Button } from "@/design-system";
import { Award, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Scholarships CMS | Vikram Edu Admin",
  description: "Manage scholarship grants, full tuition waivers, and deadlines.",
};

export default async function AdminScholarshipsPage() {
  const { scholarships } = await scholarshipService.filterScholarships({});

  const columns = [
    {
      header: "Scholarship Award Title",
      cell: (item: typeof scholarships[0]) => (
        <div className="flex items-center gap-3">
          <Award className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-slate-800">{item.title}</span>
            <span className="text-[10px] text-slate-400">{item.country?.name || "Global"}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Funding Type",
      cell: (item: typeof scholarships[0]) => (
        <Badge variant="gold" size="sm">
          {item.type}
        </Badge>
      ),
    },
    {
      header: "Award Value",
      cell: (item: typeof scholarships[0]) => (
        <span className="font-bold text-emerald-800">
          {item.currency} {item.amount.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Deadline",
      cell: (item: typeof scholarships[0]) => (
        <span className="text-xs text-slate-600">
          {item.deadline ? new Date(item.deadline).toLocaleDateString() : "Rolling"}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: () => (
        <Button variant="ghost" size="sm">
          Edit Award
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Scholarship Funding CMS</h2>
          <p className="text-xs text-slate-500">Manage full tuition grants, living stipends, eligibility criteria, and deadlines.</p>
        </div>

        <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
          Add Scholarship Grant
        </Button>
      </div>

      <DataTable columns={columns} data={scholarships} keyExtractor={(item) => item.id} />
    </div>
  );
}
