import React from "react";
import type { Metadata } from "next";
import { universityService } from "@/services/university.service";
import { DataTable } from "@/components/admin/DataTable";
import { Badge, Button } from "@/design-system";
import { GraduationCap, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Universities CMS | Vikram Edu Admin",
  description: "Manage global university profiles, global rankings, and tuition fees.",
};

export default async function AdminUniversitiesPage() {
  const { universities } = await universityService.filterUniversities({});

  const columns = [
    {
      header: "University Name",
      cell: (item: typeof universities[0]) => (
        <div className="flex items-center gap-3">
          <GraduationCap className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-slate-800">{item.name}</span>
            <span className="text-[10px] text-slate-400">{item.city}, {item.country?.name || "Global"}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Global Rank",
      cell: (item: typeof universities[0]) => (
        <span className="font-bold text-slate-800">#{item.rankingGlobal || "N/A"}</span>
      ),
    },
    {
      header: "Acceptance Rate",
      cell: (item: typeof universities[0]) => (
        <Badge variant="outline" size="sm">
          {item.acceptanceRate || 15}%
        </Badge>
      ),
    },
    {
      header: "Actions",
      cell: () => (
        <Button variant="ghost" size="sm">
          Edit Record
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Partner Universities CMS</h2>
          <p className="text-xs text-slate-500">Manage university profiles, global QS/Times rankings, admission rates, and logos.</p>
        </div>

        <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
          Add New University
        </Button>
      </div>

      <DataTable columns={columns} data={universities} keyExtractor={(item) => item.id} />
    </div>
  );
}
