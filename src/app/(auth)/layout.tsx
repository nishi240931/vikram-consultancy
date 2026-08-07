import React from "react";
import { Logo } from "@/design-system";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col items-center justify-center p-4">
      <div className="mb-6">
        <Logo size="lg" />
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
