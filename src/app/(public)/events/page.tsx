import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, Clock, Users, ArrowRight, Sparkles } from "lucide-react";
import { Card, Badge, Button } from "@/design-system";

export const metadata: Metadata = {
  title: "Events & Spot Assessment Fairs | Vikram Edu Consultants",
  description: "Attend university spot assessment fairs, virtual webinars, and 1-on-1 interaction sessions with overseas admissions officers.",
};

const UPCOMING_EVENTS = [
  {
    id: "evt-1",
    title: "USA Universities Fall 2025 Spot Assessment & Application Fee Waiver Fair",
    type: "In-Person Spot Assessment",
    date: "Feb 15, 2025",
    time: "10:00 AM - 4:00 PM IST",
    location: "Park Hyatt, Hyderabad",
    description: "Meet official admissions delegates from 25+ top US universities. On-the-spot application evaluation, GRE/GMAT fee waiver vouchers, and scholarship assessments.",
  },
  {
    id: "evt-2",
    title: "UK Russell Group Masters Admission & Chevening Scholarship Webinar",
    type: "Virtual Webinar",
    date: "Feb 22, 2025",
    time: "5:00 PM - 7:00 PM IST",
    location: "Online Zoom Live",
    description: "Interactive session with Oxford and Imperial College London alumni detailing UK Graduate Route visas, CAS statements, and Chevening grant applications.",
  },
  {
    id: "evt-3",
    title: "Canada & Australia STEM Degree Admission Workshop",
    type: "In-Person Workshop",
    date: "Mar 01, 2025",
    time: "11:00 AM - 3:00 PM IST",
    location: "Vikram Edu Center, Bangalore",
    description: "Deep dive into Canadian PGWP PR pathways, Australian Subclass 500 visas, work rights, and co-op internship programs for Computer Science & Engineering students.",
  },
];

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F5]">
      {/* Hero Section */}
      <section className="relative bg-[#0A192F] text-white py-16 overflow-hidden border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-3">
          <Badge variant="gold" size="md">
            <Calendar className="w-4 h-4 mr-1.5" /> University Fairs & Fairs
          </Badge>
          <h1 className="text-4xl font-black font-['Outfit'] text-white">Spot Assessment Fairs & Global Seminars</h1>
          <p className="text-slate-300 text-sm max-w-xl">Meet international university admissions directors directly, receive instant offer letters, and claim application fee waivers.</p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          {UPCOMING_EVENTS.map((event) => (
            <Card key={event.id} variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-3xl hover:border-[#D4AF37] hover:shadow-xl transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Badge variant="gold" size="sm">{event.type}</Badge>
                  <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {event.date}
                  </span>
                </div>

                <h3 className="font-bold text-xl text-[#0B1B3D] font-['Outfit']">{event.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{event.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {event.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {event.location}</span>
                </div>
              </div>

              <div className="flex-shrink-0">
                <Link href="/book-consultation">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Register Free Pass
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
