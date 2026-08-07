import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  GraduationCap,
  FileCheck,
  Award,
  ShieldCheck,
  CreditCard,
  Plane,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Card, Badge, Button } from "@/design-system";

export const metadata: Metadata = {
  title: "Counselling Services | Vikram Edu Consultants",
  description: "End-to-end study abroad services: university selection, SOP review, visa assistance, scholarships, and pre-departure guidance.",
};

const SERVICES_LIST = [
  {
    id: "counselling",
    title: "1-on-1 Study Abroad Counselling",
    icon: Compass,
    description:
      "Personalized career profiling and country evaluation with certified senior education consultants tailored to your academic background and career goals.",
    features: [
      "Academic GPA & IELTS/TOEFL score profile audit",
      "Country selection based on post-study work rights & PR pathways",
      "Tailored study plan for USA, UK, Canada, Australia, Ireland & Germany",
    ],
  },
  {
    id: "shortlisting",
    title: "University & Course Shortlisting",
    icon: GraduationCap,
    description:
      "Data-driven shortlisting across 850+ top global universities categorizing options into Reach, Match, and Safety brackets.",
    features: [
      "QS Global Rank & Subject Ranking analysis",
      "Tuition budget matching & living cost estimation",
      "Intake deadline tracking (Fall & Spring)",
    ],
  },
  {
    id: "admission",
    title: "End-to-End Application Guidance",
    icon: FileCheck,
    description:
      "Direct portal application submission, document formatting, transcript verification, and real-time application stage updates.",
    features: [
      "Application fee waiver support with partner universities",
      "Dossier review by senior admissions committee experts",
      "Direct liaison with university international admissions desks",
    ],
  },
  {
    id: "sop-lor",
    title: "SOP & LOR Writing Assistance",
    icon: Sparkles,
    description:
      "Ivy League & Russell Group standard Statement of Purpose (SOP) and Recommendation Letter (LOR) editing and AI structural review.",
    features: [
      "0-100 AI SOP Review for grammar, clarity, and narrative punch",
      "Academic & Professional LOR structuring guidance",
      "Personalized resume / CV optimization",
    ],
  },
  {
    id: "scholarship",
    title: "Scholarship & Funding Guidance",
    icon: Award,
    description:
      "Matching applicants with 150+ merit-based bursaries, government grants (Chevening, Fulbright), and department TA/RA assistantships.",
    features: [
      "Up to 100% full-tuition scholarship eligibility evaluation",
      "Bursary essay drafting & deadline alerts",
      "Financial aid document preparation",
    ],
  },
  {
    id: "visa",
    title: "Visa Processing & Mock Interviews",
    icon: ShieldCheck,
    description:
      "100% visa filing assistance, financial proof verification (I-20 / CAS), and rigorous 1-on-1 mock embassy interview sessions.",
    features: [
      "98% visa approval track record across major study hubs",
      "F-1, UK Student Visa, Subclass 500 & Study Permit guidance",
      "Embassy mock interview sessions with former visa officers",
    ],
  },
  {
    id: "loan",
    title: "Education Loan Assistance",
    icon: CreditCard,
    description:
      "Collateral and non-collateral education loan processing with top nationalized and private banks at competitive interest rates.",
    features: [
      "Pre-sanction loan letter before university application",
      "100% funding coverage including living expenses",
      "Fast-track approval within 7 business days",
    ],
  },
  {
    id: "pre-departure",
    title: "Pre-Departure & Forex Support",
    icon: Plane,
    description:
      "Comprehensive briefing on student travel, currency exchange (Forex), SIM card setup, flight bookings, and student housing.",
    features: [
      "On-campus & off-campus accommodation booking",
      "International student health insurance setup",
      "Alumni network connect in your destination city",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F5]">
      {/* Hero Section */}
      <section className="relative bg-[#0A192F] text-white py-20 overflow-hidden border-b border-[#D4AF37]/20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center gap-4">
          <Badge variant="gold" size="md">
            <Sparkles className="w-4 h-4 mr-1.5" /> 360° Overseas Education Solutions
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black font-['Outfit'] text-white max-w-3xl leading-tight">
            Comprehensive Services for Your Study Abroad Journey
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            From initial profile evaluation to university admits, scholarship grants, visa approval, and airport pickup — our expert team guides you every step of the way.
          </p>
          <div className="pt-4">
            <Link href="/book-consultation">
              <Button variant="primary" size="lg" leftIcon={<Calendar className="w-5 h-5" />}>
                Book Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_LIST.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                variant="flat"
                padding="lg"
                className="bg-white border border-slate-200/90 rounded-3xl hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-6"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-[#0B1B3D] text-[#D4AF37] shadow-md flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-xl text-[#0B1B3D] font-['Outfit']">{service.title}</h3>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>

                  <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <Link href="/book-consultation">
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Enquire Service
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="bg-[#0B1B3D] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl font-black font-['Outfit'] text-white">
            Ready to Begin Your Global Academic Journey?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl">
            Schedule a 1-on-1 session with our certified senior education advisors today. Free admission evaluation and profile audit included.
          </p>
          <Link href="/book-consultation">
            <Button variant="primary" size="lg" leftIcon={<Calendar className="w-5 h-5" />}>
              Schedule Free 1-on-1 Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
