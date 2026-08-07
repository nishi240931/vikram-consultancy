"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { Button, Card } from "@/design-system";

export default function StudentAppointmentsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Student appointments route error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center p-6 text-center">
      <Card variant="glass" padding="xl" className="max-w-md w-full border-rose-200">
        <div className="p-4 rounded-full bg-rose-50 text-rose-500 w-fit mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-[#0B1B3D] mb-2 font-['Outfit']">
          Appointments Error
        </h2>
        <p className="text-slate-600 text-sm mb-6">
          We encountered an issue loading your consultation appointments. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => reset()}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Try Again
          </Button>
          <Link href="/">
            <Button variant="ghost" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Go to Homepage
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
