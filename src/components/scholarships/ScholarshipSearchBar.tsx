"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Award, MapPin, Filter, X } from "lucide-react";
import { Button, Input } from "@/design-system";
import { APP_CONFIG } from "@/config/app.config";

export const ScholarshipSearchBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [countrySlug, setCountrySlug] = useState(searchParams.get("countrySlug") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (type) params.set("type", type);
    if (countrySlug) params.set("countrySlug", countrySlug);
    router.push(`/scholarships?${params.toString()}`);
  };

  const handleClear = () => {
    setQuery("");
    setType("");
    setCountrySlug("");
    router.push("/scholarships");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full bg-white border border-slate-200 shadow-xl rounded-2xl p-4 flex flex-col md:flex-row items-center gap-3"
    >
      <div className="flex-1 w-full">
        <Input
          placeholder="Search by scholarship title, sponsor, or keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          className="border-slate-200"
        />
      </div>

      <div className="w-full md:w-52 relative flex items-center">
        <Award className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-xl bg-white border border-slate-200 text-slate-900 text-sm pl-10 pr-4 py-3 appearance-none focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
        >
          <option value="">All Funding Types</option>
          <option value="FULL_TUITION">100% Full Tuition</option>
          <option value="PARTIAL_TUITION">Partial Grant</option>
          <option value="STIPEND">Living Stipend</option>
          <option value="ONE_TIME_GRANT">One-Time Award</option>
        </select>
      </div>

      <div className="w-full md:w-48 relative flex items-center">
        <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
        <select
          value={countrySlug}
          onChange={(e) => setCountrySlug(e.target.value)}
          className="w-full rounded-xl bg-white border border-slate-200 text-slate-900 text-sm pl-10 pr-4 py-3 appearance-none focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
        >
          <option value="">All Countries</option>
          {APP_CONFIG.destinations.map((dest) => (
            <option key={dest.slug} value={dest.slug}>
              {dest.flag} {dest.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <Button
          type="submit"
          variant="primary"
          size="md"
          leftIcon={<Filter className="w-4 h-4" />}
          className="w-full md:w-auto justify-center"
        >
          Search Funding
        </Button>

        {(query || type || countrySlug) && (
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={handleClear}
            className="text-slate-500 hover:text-slate-800"
            aria-label="Clear Search Filters"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </form>
  );
};
