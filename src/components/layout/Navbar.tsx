"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, CalendarDays, Phone, User } from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";
import { Logo } from "@/design-system";
import { MobileDrawer } from "./MobileDrawer";
import { APP_CONFIG } from "@/config/app.config";

// Main Desktop Navigation Links matching the reference UI exactly
const PRIMARY_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our Process" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "Success Stories" },
  { href: "/contact", label: "Contact" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/destinations") {
      return pathname.startsWith("/destinations");
    }
    if (href === "/services") {
      return pathname.startsWith("/services");
    }
    if (href === "/about") {
      return pathname.startsWith("/about") || pathname.startsWith("/success-stories");
    }
    if (href === "/contact") {
      return pathname.startsWith("/contact");
    }
    return false;
  };

  return (
    <>
      <header className="sticky top-3 sm:top-5 z-40 w-full px-3 sm:px-6 lg:px-8 transition-all duration-300">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`w-full max-w-[1280px] mx-auto rounded-full border border-[#C9A227]/40 transition-all duration-300 ${
            isScrolled
              ? "bg-[#050A12]/95 backdrop-blur-md shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(201,162,39,0.15)] py-2.5 px-4 sm:px-6 lg:px-8"
              : "bg-[#050A12] shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_15px_rgba(201,162,39,0.12)] py-3 px-4 sm:px-7 lg:px-8"
          }`}
        >
          <div className="flex items-center justify-between gap-3 lg:gap-6">
            {/* 1. Logo (Left) */}
            <Link href="/" className="flex items-center flex-shrink-0 group">
              <Logo size="md" theme="dark" className="transition-transform group-hover:scale-[1.02]" />
            </Link>

            {/* 2. Primary Navigation (Center) - ONLY 5 LINKS */}
            <nav
              className="hidden lg:flex items-center gap-5 xl:gap-8"
              aria-label="Main Navigation"
            >
              {PRIMARY_NAV_LINKS.map((link) => {
                const active = isLinkActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-1 py-1.5 text-sm xl:text-[15px] font-bold transition-colors duration-200 whitespace-nowrap ${
                      active
                        ? "text-[#C9A227]"
                        : "text-white hover:text-[#C9A227]"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <span>{link.label}</span>
                    {active && (
                      <motion.div
                        layoutId="activeUnderline"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[#C9A227] rounded-full shadow-[0_0_8px_rgba(201,162,39,0.8)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* 3. Right Area: Vertical Divider + Phone + Gold CTA + Auth */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-5 flex-shrink-0">
              {/* Subtle Vertical Divider */}
              <div className="h-6 w-[1px] bg-slate-700/80" />

              {/* Phone Link */}
              <a
                href={`tel:${APP_CONFIG.contact.whatsapp}`}
                className="flex items-center gap-2.5 text-white hover:text-[#C9A227] transition-colors group"
                aria-label={`Call Vikram Edu Consultants at ${APP_CONFIG.contact.formattedPhone}`}
              >
                <div className="w-8 h-8 rounded-full border border-[#C9A227]/50 bg-[#C9A227]/10 flex items-center justify-center text-[#C9A227] group-hover:bg-[#C9A227] group-hover:text-[#050A12] transition-all">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs xl:text-sm font-extrabold tracking-wide whitespace-nowrap">
                  {APP_CONFIG.contact.formattedPhone}
                </span>
              </a>

              {/* Get Free Counselling CTA Button */}
              <Link href="/book-consultation">
                <button className="bg-[#C9A227] hover:bg-[#B38F1F] text-[#050A12] font-extrabold text-xs xl:text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 whitespace-nowrap">
                  <CalendarDays className="w-4 h-4 text-[#050A12]" />
                  <span>Get Free Counselling</span>
                </button>
              </Link>

              {/* Clerk Auth / Dashboard */}
              {isSignedIn && (
                <div className="flex items-center gap-2 pl-1 border-l border-slate-700/80">
                  <Link
                    href="/dashboard"
                    className="p-2 text-slate-300 hover:text-[#C9A227] hover:bg-white/10 rounded-full transition-colors"
                    title="Student Dashboard"
                  >
                    <User className="w-4 h-4" />
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              )}
            </div>

            {/* Mobile / Tablet Actions (< 1024px) */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${APP_CONFIG.contact.whatsapp}`}
                className="w-8 h-8 rounded-full border border-[#C9A227]/50 bg-[#C9A227]/10 flex items-center justify-center text-[#C9A227]"
                aria-label="Call Us"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>

              <Link href="/book-consultation">
                <button className="bg-[#C9A227] text-[#050A12] font-extrabold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>Counselling</span>
                </button>
              </Link>

              <button
                onClick={() => setIsMobileOpen(true)}
                className="p-2 rounded-full text-white hover:text-[#C9A227] hover:bg-white/10 focus:outline-none transition-colors"
                aria-label="Open Mobile Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navLinks={PRIMARY_NAV_LINKS}
      />
    </>
  );
};
