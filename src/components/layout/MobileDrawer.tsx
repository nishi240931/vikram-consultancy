"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, PhoneCall, ChevronRight } from "lucide-react";
import { Logo, Button } from "@/design-system";
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
            className="fixed inset-0 bg-[#0A192F]/60 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Drawer Slide-in Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#0B1B3D] text-white z-50 p-6 flex flex-col justify-between border-l border-[#D4AF37]/30 shadow-2xl lg:hidden overflow-y-auto"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <Logo size="md" theme="dark" />
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex flex-col gap-1 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold text-slate-200 hover:text-[#D4AF37] hover:bg-slate-800/60 transition-all group"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#D4AF37] transition-colors" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Footer Actions */}
            <div className="pt-6 border-t border-slate-800 flex flex-col gap-4">
              <Link href="/appointments" onClick={onClose} className="w-full">
                <Button variant="primary" size="lg" className="w-full justify-center">
                  <Calendar className="w-4 h-4 mr-2" /> Book Consultation
                </Button>
              </Link>
              <a
                href={`tel:${APP_CONFIG.contact.phone}`}
                className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-300 hover:text-[#D4AF37] py-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Call Us: {APP_CONFIG.contact.phone}</span>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
