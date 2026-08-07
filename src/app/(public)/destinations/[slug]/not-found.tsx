import React from "react";
import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";
import { Button, Card } from "@/design-system";

export default function CountryNotFound() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center p-6 text-center">
      <Card variant="glass" padding="xl" className="max-w-md w-full border-[#D4AF37]/40 shadow-xl">
        <div className="p-4 rounded-full bg-[#0B1B3D]/5 text-[#D4AF37] w-fit mx-auto mb-4">
          <Compass className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-[#0B1B3D] mb-2 font-['Outfit']">
          Destination Not Found
        </h2>
        <p className="text-slate-600 text-sm mb-6">
          The requested study destination guide could not be found or is currently being updated.
        </p>
        <Link href="/destinations">
          <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Explore All Study Destinations
          </Button>
        </Link>
      </Card>
    </div>
  );
}
