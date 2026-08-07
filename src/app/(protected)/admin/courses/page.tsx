import React from "react";
import type { Metadata } from "next";
import { courseService } from "@/services/course.service";
import { DataTable } from "@/components/admin/DataTable";
import { Badge, Button } from "@/design-system";
import { BookOpen, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Course Programs CMS | Vikram Edu Admin",
  description: "Manage academic degree programs, tuition fees, and IELTS requirements.",
};

export default async function AdminCoursesPage() {
  const { courses } = await courseService.filterCourses({});

  const columns = [
    {
      header: "Program Title",
      cell: (item: typeof courses[0]) => (
        <div className="flex items-center gap-3">
          <BookOpen className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-slate-800">{item.name}</span>
            <span className="text-[10px] text-slate-400">{item.university?.name || "University"}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Degree Level",
      cell: (item: typeof courses[0]) => (
        <Badge variant="gold" size="sm">
          {item.degreeLevel}
        </Badge>
      ),
    },
    {
      header: "Tuition Fee",
      cell: (item: typeof courses[0]) => (
        <span className="font-bold text-emerald-800">
          {item.currency} {item.tuitionFeeTotal?.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Min IELTS",
      cell: (item: typeof courses[0]) => <span className="font-semibold">{item.ieltsMinScore}</span>,
    },
    {
      header: "Actions",
      cell: () => (
        <Button variant="ghost" size="sm">
          Edit Course
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Academic Programs CMS</h2>
          <p className="text-xs text-slate-500">Manage Bachelor&apos;s & Master&apos;s degree programs, tuition fees, and entry requirements.</p>
        </div>

        <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
          Add Program
        </Button>
      </div>

      <DataTable columns={columns} data={courses} keyExtractor={(item) => item.id} />
    </div>
  );
}
