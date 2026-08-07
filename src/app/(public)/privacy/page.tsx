import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Vikram Edu Consultants",
  description: "Learn how Vikram Edu Consultants protects and processes your personal student data.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 bg-[#FAF9F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-6 text-slate-700 text-sm leading-relaxed">
        <h1 className="text-3xl font-black text-[#0B1B3D] font-['Outfit']">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last Updated: January 2025</p>

        <h2 className="text-lg font-bold text-[#0B1B3D] pt-2">1. Information We Collect</h2>
        <p>
          At Vikram Edu Consultants, we collect information you provide directly when registering for an account, booking 1-on-1 overseas education consultations, submitting Statement of Purpose (SOP) documents, or searching for university programs and scholarships.
        </p>

        <h2 className="text-lg font-bold text-[#0B1B3D] pt-2">2. How We Use Your Information</h2>
        <p>
          We use your contact details, academic GPA, English test scores, and study preferences to match you with partner universities, audit admission eligibility, deliver AI recommendations, and schedule consultation sessions with senior education advisors.
        </p>

        <h2 className="text-lg font-bold text-[#0B1B3D] pt-2">3. Data Security & Third Parties</h2>
        <p>
          Your authentication data is managed securely via Clerk Single Sign-On. We do not sell or rent your personal information to third-party marketers. Data is disclosed only to accredited partner universities upon your explicit application submission request.
        </p>
      </div>
    </section>
  );
}
