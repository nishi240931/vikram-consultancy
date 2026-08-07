import React from "react";
import type { Metadata } from "next";
import { adminService } from "@/services/admin.service";
import { Card, Badge, Button } from "@/design-system";
import { Star, MessageSquare, Plus, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Testimonials CMS | Vikram Edu Admin",
  description: "Manage student success stories, reviews, and featured ratings.",
};

export default async function AdminTestimonialsPage() {
  const testimonials = await adminService.getTestimonials();

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Student Testimonials CMS</h2>
          <p className="text-xs text-slate-500">Approve and feature student success reviews, university admit stories, and ratings.</p>
        </div>

        <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
          Add Testimonial
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <Card key={t.id} variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{t.rating} / 5.0 Rating</span>
              </div>
              <Badge variant="gold" size="sm">
                Featured Homepage Review
              </Badge>
            </div>

            <p className="text-xs text-slate-700 italic leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              &quot;{t.reviewText}&quot;
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <div className="flex flex-col">
                <span className="font-bold text-slate-900">{t.studentName}</span>
                <span className="text-slate-400">{t.courseName} • {t.universityName}</span>
              </div>
              <Button variant="outline" size="sm">
                Edit Record
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
