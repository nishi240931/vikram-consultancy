"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#0B1B3D] text-[#D4AF37] border-2 border-[#D4AF37] shadow-2xl hover:bg-[#D4AF37] hover:text-[#0A192F] transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none"
      aria-label="Scroll to Top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
