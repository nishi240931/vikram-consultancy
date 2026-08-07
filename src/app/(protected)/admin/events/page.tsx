import React from "react";
import type { Metadata } from "next";
import { adminService } from "@/services/admin.service";
import { Card, Badge, Button } from "@/design-system";
import { Sparkles, Calendar, MapPin, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Events CMS | Vikram Edu Admin",
  description: "Manage spot assessment fairs, university webinars, and admissions seminars.",
};

export default async function AdminEventsPage() {
  const events = await adminService.getEvents();

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Spot Fairs & Webinars CMS</h2>
          <p className="text-xs text-slate-500">Manage university spot assessment events, online webinars, and seminar schedules.</p>
        </div>

        <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
          Create New Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((ev) => (
          <Card key={ev.id} variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Badge variant="gold" size="sm">
                Spot Assessment Event
              </Badge>
              <span className="text-xs text-slate-400 font-mono">Capacity: {ev.maxAttendees} Seats</span>
            </div>

            <h3 className="font-bold text-slate-900 text-base font-['Outfit']">{ev.title}</h3>

            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {new Date(ev.eventDate).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {ev.location}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <Button variant="outline" size="sm">
                Edit Event
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
