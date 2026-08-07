import React from "react";
import type { Metadata } from "next";
import { countryService } from "@/services/country.service";
import { Card, Badge, Button } from "@/design-system";
import { Plus, Edit } from "lucide-react";

export const metadata: Metadata = {
  title: "Destinations CMS | Vikram Edu Admin",
  description: "Manage global country study destinations, statistics, and guide pages.",
};

export default async function AdminCountriesPage() {
  const countries = await countryService.getAllCountries();

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Study Abroad Destinations CMS</h2>
          <p className="text-xs text-slate-500">Manage country destination guides, hero content, visa statistics, and featured flags.</p>
        </div>

        <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
          Add Study Destination
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map((c) => (
          <Card key={c.id} variant="flat" padding="md" className="bg-white border border-slate-200 rounded-2xl flex flex-col justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{c.flagUrl || "🎓"}</span>
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-900 text-base font-['Outfit']">{c.name}</h3>
                <span className="text-xs text-slate-400">ISO Code: {c.code} • Slug: /{c.slug}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {c.description}
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <Badge variant={c.status === "PUBLISHED" ? "gold" : "outline"} size="sm">
                {c.status === "PUBLISHED" ? "Published Destination" : "Draft Destination"}
              </Badge>
              <Button variant="ghost" size="sm" leftIcon={<Edit className="w-3.5 h-3.5" />}>
                Edit CMS
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
