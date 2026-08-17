"use client";

import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight, PhoneCall, Sparkles, CheckCircle } from "lucide-react";
import { Button, Card, Badge } from "@/design-system";
import { APP_CONFIG } from "@/config/app.config";

export const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card
          variant="dark"
          padding="xl"
          className="relative overflow-hidden bg-gradient-to-r from-[#0A192F] via-[#0B1B3D] to-[#162C5B] text-white border-2 border-[#D4AF37]/40 shadow-2xl rounded-3xl text-center md:text-left"
        >
          {/* Ambient Decorative Gold Glow Background */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <Badge variant="gold" size="md" className="w-fit mx-auto md:mx-0">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> Start Your Overseas Journey Today
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] tracking-tight leading-tight">
                Ready to Study at Your{" "}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#C5A059] bg-clip-text text-transparent">
                  Dream University?
                </span>
              </h2>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
                Book a 1-on-1 free consultation with our senior study abroad experts. Get your profile
                assessed, explore university options, and receive a customized roadmap.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#D4AF37]" /> 100% Free Consultation
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#D4AF37]" /> No Commitment Required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#D4AF37]" /> Virtual or In-Person (Vijayawada Headquarters)
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center gap-4">
              <Link href="/book-consultation" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="xl"
                  leftIcon={<Calendar className="w-5 h-5" />}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="w-full sm:w-auto justify-center shadow-2xl"
                >
                  Book Free Consultation
                </Button>
              </Link>

              <a
                href={`tel:${APP_CONFIG.contact.whatsapp}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-[#D4AF37] transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Or Call Us Directly: {APP_CONFIG.contact.formattedPhone}</span>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
