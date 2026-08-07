import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Vikram Edu Consultants",
  description: "Terms and conditions governing the use of Vikram Edu Consultants platform.",
};

export default function TermsOfServicePage() {
  return (
    <section className="py-16 bg-[#FAF9F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-6 text-slate-700 text-sm leading-relaxed">
        <h1 className="text-3xl font-black text-[#0B1B3D] font-['Outfit']">Terms of Service</h1>
        <p className="text-xs text-slate-400">Last Updated: January 2025</p>

        <h2 className="text-lg font-bold text-[#0B1B3D] pt-2">1. Acceptance of Terms</h2>
        <p>
          By accessing and using Vikram Edu Consultants website, student workspace portal, or AI intelligence tools, you agree to comply with and be bound by these Terms of Service.
        </p>

        <h2 className="text-lg font-bold text-[#0B1B3D] pt-2">2. Advisory Services Disclaimer</h2>
        <p>
          Vikram Edu Consultants provides overseas education counselling, university shortlisting, and SOP feedback. While we maintain a 98% visa approval rate, final university admission decisions and visa grants remain under the sole jurisdiction of respective university admissions boards and government embassy officials.
        </p>
      </div>
    </section>
  );
}
