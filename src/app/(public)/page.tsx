import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { CountriesPreviewSection } from "@/components/sections/CountriesPreviewSection";
import { UniversitiesPreviewSection } from "@/components/sections/UniversitiesPreviewSection";
import { ServicesPreviewSection } from "@/components/sections/ServicesPreviewSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <WhyChooseUsSection />
      <CountriesPreviewSection />
      <UniversitiesPreviewSection />
      <ServicesPreviewSection />
      <TimelineSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
