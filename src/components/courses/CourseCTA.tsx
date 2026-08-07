import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { Button, Card, Badge } from "@/design-system";
import { APP_CONFIG } from "@/config/app.config";

export interface CourseCTAProps {
  courseName: string;
}

export const CourseCTA: React.FC<CourseCTAProps> = ({ courseName }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card
          variant="dark"
          padding="xl"
          className="relative overflow-hidden bg-gradient-to-r from-[#0A192F] via-[#0B1B3D] to-[#162C5B] text-white border-2 border-[#D4AF37]/40 shadow-2xl rounded-3xl text-center md:text-left"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <Badge variant="gold" size="md" className="w-fit mx-auto md:mx-0">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> Program Admission Specialist
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight">
                Apply for <span className="text-[#D4AF37]">{courseName}</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
                Connect with our academic advisors to evaluate your GPA, obtain fee waivers, and prepare your application packet.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center gap-3">
              <Link href="/appointments">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Calendar className="w-4 h-4" />}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="shadow-xl"
                >
                  Book Free Consultation
                </Button>
              </Link>
              <a
                href={`tel:${APP_CONFIG.contact.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-[#D4AF37] transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Admissions Hotline: {APP_CONFIG.contact.phone}</span>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
