import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Award, Users, Globe2, ShieldCheck, CheckCircle, Calendar } from "lucide-react";
import { Card, Badge, Button } from "@/design-system";
import { APP_CONFIG } from "@/config/app.config";

export const metadata: Metadata = {
  title: "About Us | Vikram Edu Consultants",
  description: "Discover Vikram Edu Consultants — premier AI-powered study abroad consultancy with 12+ years of global education excellence.",
};

const STATS = [
  { label: "Students Placed", value: "10,000+" },
  { label: "Partner Universities", value: "850+" },
  { label: "Visa Approval Rate", value: "98%" },
  { label: "Scholarships Secured", value: "$12M+" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F5]">
      {/* Hero Section */}
      <section className="relative bg-[#0A192F] text-white py-20 overflow-hidden border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <Badge variant="gold" size="md">
            12+ Years of Overseas Education Excellence
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black font-['Outfit'] text-white max-w-3xl leading-tight">
            Empowering Students to Study at World-Class Global Universities
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Vikram Edu Consultants is a premier AI-powered study abroad advisory platform. We combine human expertise with predictive AI analytics to match students with target universities and secure full-tuition scholarships.
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-white py-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-3xl sm:text-4xl font-black text-[#0B1B3D] font-['Outfit']">{stat.value}</span>
              <span className="text-xs text-slate-500 font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-3xl flex flex-col gap-4">
            <div className="p-3 rounded-2xl bg-[#0B1B3D]/5 text-[#D4AF37] w-fit">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#0B1B3D] font-['Outfit']">Our Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To democratize access to global higher education by providing ethical, transparent, and data-driven counselling that empowers ambitious students to achieve their academic potential abroad.
            </p>
          </Card>

          <Card variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-3xl flex flex-col gap-4">
            <div className="p-3 rounded-2xl bg-[#0B1B3D]/5 text-[#D4AF37] w-fit">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#0B1B3D] font-['Outfit']">Our Vision</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To be the world&apos;s most trusted AI-powered study abroad consultancy platform, bridging global talent with top-ranked universities across the USA, UK, Canada, Australia, Ireland, and Germany.
            </p>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <div className="text-center flex flex-col items-center gap-2">
            <Badge variant="gold" size="sm">Why Choose Vikram Edu</Badge>
            <h2 className="text-3xl font-black text-[#0B1B3D] font-['Outfit']">Built on Trust, Precision & Success</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-3">
              <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
              <h4 className="font-bold text-lg text-[#0B1B3D]">100% Ethical Advisory</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Zero hidden fees or false promises. Clear guidance on admission requirements, visa conditions, and tuition costs.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-3">
              <Users className="w-8 h-8 text-[#D4AF37]" />
              <h4 className="font-bold text-lg text-[#0B1B3D]">Certified Advisors</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Our counsellors hold international certifications (ICEF, USATC, British Council) with 10+ years of university admissions experience.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-3">
              <Award className="w-8 h-8 text-[#D4AF37]" />
              <h4 className="font-bold text-lg text-[#0B1B3D]">AI Intelligence Studio</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Predictive AI algorithms evaluate your GPA, IELTS score, and budget to calculate admission likelihood and scholarship matches.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0B1B3D] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl font-black font-['Outfit'] text-white">Start Your Overseas Journey With Us</h2>
          <p className="text-slate-300 text-sm max-w-xl">Connect with our senior counsellors for a free profile assessment and university shortlisting session.</p>
          <Link href="/book-consultation">
            <Button variant="primary" size="lg" leftIcon={<Calendar className="w-5 h-5" />}>
              Schedule Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
