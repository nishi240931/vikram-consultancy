"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays, Phone, ChevronRight } from "lucide-react";
import { Logo } from "@/design-system";
import { APP_CONFIG } from "@/config/app.config";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string }[];
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  navLinks,
}) => {
  const pathname = usePathname();

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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050A12]/80 backdrop-blur-md z-50 lg:hidden"
          />

          {/* Drawer Slide-in Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#050A12] text-white z-50 p-6 flex flex-col justify-between border-l border-[#C9A227]/40 shadow-2xl lg:hidden overflow-y-auto"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <Logo size="md" theme="dark" />
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-slate-400 hover:text-[#C9A227] hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex flex-col gap-1 py-6" aria-label="Mobile Navigation">
                {navLinks.map((link) => {
                  const active = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold transition-all group ${
                        active
                          ? "bg-[#C9A227]/15 text-[#C9A227] border border-[#C9A227]/30"
                          : "text-white hover:text-[#C9A227] hover:bg-white/5"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className={`w-4 h-4 transition-colors ${active ? "text-[#C9A227]" : "text-slate-500 group-hover:text-[#C9A227]"}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer Actions */}
            <div className="pt-6 border-t border-slate-800 flex flex-col gap-4">
              <Link href="/book-consultation" onClick={onClose} className="w-full">
                <button className="w-full bg-[#C9A227] hover:bg-[#B38F1F] text-[#050A12] font-extrabold text-sm py-3.5 px-6 rounded-full shadow-lg flex items-center justify-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[#050A12]" />
                  <span>Get Free Counselling</span>
                </button>
              </Link>

              <a
                href={`tel:${APP_CONFIG.contact.whatsapp}`}
                className="flex items-center justify-center gap-2.5 text-xs font-bold text-white hover:text-[#C9A227] py-2"
              >
                <div className="w-6 h-6 rounded-full border border-[#C9A227]/50 bg-[#C9A227]/10 flex items-center justify-center text-[#C9A227]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{APP_CONFIG.contact.formattedPhone}</span>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
