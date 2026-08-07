"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

export function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#D4AF37",
          colorBackground: "#FFFFFF",
          colorText: "#0B1B3D",
          borderRadius: "0.75rem",
        },
        elements: {
          card: "shadow-xl border border-slate-200/80 rounded-2xl",
          buttonPrimary:
            "bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A192F] font-bold hover:brightness-105 shadow-md",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
