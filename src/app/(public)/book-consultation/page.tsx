import React from "react";
import type { Metadata } from "next";
import { AppointmentHero } from "@/components/appointments/AppointmentHero";
import { BookingForm } from "@/components/appointments/BookingForm";
import { SEO_CONFIG } from "@/config/seo.config";

export const metadata: Metadata = {
  title: "Book Free 1-on-1 Overseas Education Consultation",
  description:
    "Schedule a free 30-minute virtual consultation with senior study abroad advisors at Vikram Edu Consultants. Profile assessment, university shortlisting & scholarship guidance.",
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/book-consultation`,
  },
};

export default function BookConsultationPage() {
  return (
    <>
      <AppointmentHero />
      <section className="py-16 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
