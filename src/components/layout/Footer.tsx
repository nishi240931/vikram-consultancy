import React from "react";
import Link from "next/link";
import { Phone, Mail, Clock, Globe, ArrowUpRight } from "lucide-react";
import { Logo } from "@/design-system";
import { APP_CONFIG } from "@/config/app.config";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A192F] text-white pt-16 pb-12 border-t border-[#D4AF37]/20 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#D4AF37]/10 to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Logo size="lg" theme="dark" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {APP_CONFIG.description}
            </p>

            <div className="flex flex-col gap-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Call Us: {APP_CONFIG.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span>Admissions: {APP_CONFIG.contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>Mon - Sat: 9:30 AM - 6:30 PM (IST)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
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

          {/* Popular Destinations */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
              Destinations
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-300">
              {APP_CONFIG.destinations.map((dest) => (
                <li key={dest.slug}>
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="hover:text-[#D4AF37] transition-colors flex items-center justify-between group"
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

          {/* Office Branches */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
              Branch Offices
            </h4>
            <div className="flex flex-col gap-3 text-xs text-slate-300">
              {APP_CONFIG.branches.map((branch) => (
                <div key={branch.city} className="flex flex-col gap-1 border-l-2 border-[#D4AF37]/50 pl-3">
                  <span className="font-bold text-white">{branch.city}</span>
                  <span className="text-slate-400 line-clamp-2">{branch.address}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {APP_CONFIG.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <div className="flex items-center gap-1 text-[#D4AF37]">
              <Globe className="w-3.5 h-3.5" /> Global Education Excellence
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
