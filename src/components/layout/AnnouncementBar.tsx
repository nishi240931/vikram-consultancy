"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, X, ArrowRight } from "lucide-react";

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[#0A192F] via-[#0B1B3D] to-[#162C5B] text-white text-xs font-medium py-2.5 px-4 relative border-b border-[#D4AF37]/30 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto md:mx-0">
          <span className="inline-flex items-center gap-1 bg-[#D4AF37] text-[#0A192F] px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> Live Spot Assessments
          </span>
          <span className="hidden sm:inline text-slate-300">
            Meet UK & USA University Delegates in Hyderabad & Bengaluru.
          </span>
          <Link
            href="/events"
            className="text-[#D4AF37] font-bold hover:underline inline-flex items-center gap-1 ml-1"
          >
            Register Free <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors hidden md:block"
          aria-label="Close Announcement Bar"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
