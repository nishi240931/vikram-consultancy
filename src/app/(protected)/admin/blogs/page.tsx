import React from "react";
import type { Metadata } from "next";
import { adminService } from "@/services/admin.service";
import { Card, Badge, Button } from "@/design-system";
import { FileText, Plus, Edit } from "lucide-react";

export const metadata: Metadata = {
  title: "Blogs CMS | Vikram Edu Admin",
  description: "Create and publish study abroad articles, visa guides, and scholarship posts.",
};

export default async function AdminBlogsPage() {
  const blogs = await adminService.getBlogs();

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Blog Content Engine CMS</h2>
          <p className="text-xs text-slate-500">Publish visa guide articles, country application tips, and scholarship insights.</p>
        </div>

        <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
          Write New Article
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {blogs.map((b) => (
          <Card key={b.id} variant="flat" padding="md" className="bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-[#0B1B3D]/5 text-[#D4AF37]">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800 text-sm font-['Outfit']">{b.title}</h3>
                  <Badge variant="gold" size="sm">
                    {b.category}
                  </Badge>
                </div>
                <span className="text-xs text-slate-400">
                  Slug: /{b.slug} • Published: {new Date(b.publishedAt).toLocaleDateString()} • Author: {b.authorName}
                </span>
              </div>
            </div>

            <Button variant="outline" size="sm" leftIcon={<Edit className="w-3.5 h-3.5" />}>
              Edit Article
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
