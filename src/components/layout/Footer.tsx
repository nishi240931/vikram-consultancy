import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight, ArrowUpRight, Globe } from "lucide-react";
import { Logo, Button } from "@/design-system";
import { APP_CONFIG } from "@/config/app.config";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A192F] text-white pt-16 pb-12 border-t border-[#D4AF37]/20 relative overflow-hidden">
      {/* Ambient Gold Glow Header Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#D4AF37]/10 to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 4-Column Responsive Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* COLUMN 1 — BRAND & HEADQUARTERS ADDRESS */}
          <div className="flex flex-col gap-5">
            <Logo size="lg" theme="dark" />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Your trusted partner for studying abroad, providing personalized guidance for universities, courses, applications, visas, and your complete overseas education journey.
            </p>

            <div className="flex flex-col gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-white font-medium">Phone:</strong> {APP_CONFIG.contact.formattedPhone}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-white font-medium">Email:</strong> {APP_CONFIG.contact.email}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <strong className="text-white font-medium">Headquarters:</strong>
                  <span className="text-slate-400 leading-snug">
                    FF 1, Seetharama Residency, Yenamalakuduru, Vijayawada, Andhra Pradesh – 520007
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2 — NAVIGATION */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-300">
              <li>
                <Link href="/about" className="hover:text-[#D4AF37] transition-colors">
                  About Vikram Edu
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#D4AF37] transition-colors">
                  Our Counselling Services
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-[#D4AF37] transition-colors">
                  Study Destinations
                </Link>
              </li>
              <li>
                <Link href="/universities" className="hover:text-[#D4AF37] transition-colors">
                  University Directory
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="hover:text-[#D4AF37] transition-colors">
                  Scholarships Explorer
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-[#D4AF37] transition-colors">
                  Study Abroad Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 — DESTINATIONS (7 COUNTRIES - NO GERMANY) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
              Destinations
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-300">
              {APP_CONFIG.destinations.map((dest) => (
                <li key={dest.slug}>
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="hover:text-[#D4AF37] transition-colors flex items-center justify-between group py-0.5"
                  >
                    <span>
                      {dest.flag} Study in {dest.name}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4 — NEED HELP / CONTACT CTA */}
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
              Need Help?
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our team is ready to help you plan your dream study-abroad journey.
            </p>

            <div className="flex flex-col gap-2.5 text-xs text-slate-300 bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <a href={`tel:${APP_CONFIG.contact.whatsapp}`} className="hover:text-[#D4AF37] font-semibold text-white transition-colors">
                  {APP_CONFIG.contact.formattedPhone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <a href={`mailto:${APP_CONFIG.contact.email}`} className="hover:text-[#D4AF37] transition-colors">
                  {APP_CONFIG.contact.email}
                </a>
              </div>
            </div>

            <Link href="/book-consultation" className="w-full">
              <Button variant="primary" size="md" className="w-full justify-center">
                Get Free Counselling &rarr;
              </Button>
            </Link>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {APP_CONFIG.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <div className="flex items-center gap-1.5 text-[#D4AF37] font-medium">
              <Globe className="w-3.5 h-3.5" /> Global Education Excellence
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
