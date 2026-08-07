import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Vikram Edu Consultants",
  description: "Learn about cookie usage and session management at Vikram Edu Consultants.",
};

export default function CookiePolicyPage() {
  return (
    <section className="py-16 bg-[#FAF9F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-6 text-slate-700 text-sm leading-relaxed">
        <h1 className="text-3xl font-black text-[#0B1B3D] font-['Outfit']">Cookie Policy</h1>
        <p className="text-xs text-slate-400">Last Updated: January 2025</p>

        <h2 className="text-lg font-bold text-[#0B1B3D] pt-2">1. Essential Authentication Cookies</h2>
        <p>
          We use essential session cookies strictly necessary to authenticate your student and administrator workspace sessions via Clerk Single Sign-On.
        </p>

        <h2 className="text-lg font-bold text-[#0B1B3D] pt-2">2. Performance & Preference Cookies</h2>
        <p>
          Performance cookies store your preferred study destinations and search filter preferences to deliver personalized university and scholarship recommendations across sessions.
        </p>
      </div>
    </section>
  );
}
