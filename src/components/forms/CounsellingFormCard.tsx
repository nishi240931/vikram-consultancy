"use client";

import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/design-system";

export interface CounsellingFormCardProps {
  className?: string;
  theme?: "light" | "dark";
}

const STUDY_FIELDS = [
  "Computer Science & IT",
  "Business & Management",
  "Engineering & Tech",
  "Data Science & AI",
  "Healthcare & Medicine",
  "Finance & Accounting",
  "Arts, Design & Media",
  "Law & Public Policy",
  "Not Sure / Need Guidance",
];

const DESTINATION_OPTIONS = [
  "Not Sure",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "New Zealand",
  "South Korea",
  "Japan",
];

export const CounsellingFormCard: React.FC<CounsellingFormCardProps> = ({
  className = "",
  theme = "light",
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [studyField, setStudyField] = useState(STUDY_FIELDS[0]);
  const [targetDestination, setTargetDestination] = useState(DESTINATION_OPTIONS[0]);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateWhatsAppPhone = (num: string): boolean => {
    const cleaned = num.replace(/\D/g, "");
    return cleaned.length >= 10 && cleaned.length <= 15;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!validateWhatsAppPhone(phone)) {
      setErrorMessage("Please enter a valid 10-digit WhatsApp phone number.");
      return;
    }

    setLoading(true);

    try {
      // Form submission connects to existing POST /api/contact endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: `${name.trim().toLowerCase().replace(/\s+/g, ".")}@applicant.vikramedu.com`,
          phone: phone.trim(),
          targetDestination,
          message: `Target Major / Field: ${studyField}. Preferred Destination: ${targetDestination}.`,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || "Submission failed. Please check your information.");
      } else {
        setSuccessMessage("Thank you! Your request has been received. Our senior advisor will WhatsApp/call you shortly.");
        setName("");
        setPhone("");
        setStudyField(STUDY_FIELDS[0]);
        setTargetDestination(DESTINATION_OPTIONS[0]);
      }
    } catch (err) {
      setErrorMessage("Network connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
        isDark
          ? "bg-[#050B14] border border-[#C9A227]/40 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(201,162,39,0.15)] text-white"
          : "bg-white border border-[#C9A227]/30 shadow-[0_20px_50px_rgba(11,37,69,0.08)] text-[#0B2545]"
      } ${className}`}
    >
      <div className="flex flex-col gap-2 pb-5 mb-5 border-b border-slate-200/80">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C9A227]">
          <Sparkles className="w-3.5 h-3.5" /> 100% Free Consultation
        </div>
        <h3
          className={`text-xl sm:text-2xl font-extrabold font-['Outfit'] tracking-tight ${
            isDark ? "text-white" : "text-[#0B2545]"
          }`}
        >
          Let&apos;s Find Your Best Study-Abroad Path
        </h3>
        <p className="text-xs sm:text-sm text-[#4B5563]">
          Get personalized guidance on universities, courses &amp; visa processes.
        </p>
      </div>

      {successMessage && (
        <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-sm block">Guidance Request Sent!</strong>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mb-5 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-sm block font-['Outfit']">Submission Notice</strong>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name Field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="counselling-name" className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
            Full Name <span className="text-[#C9A227]">*</span>
          </label>
          <input
            id="counselling-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Vikram Reddy"
            required
            disabled={loading}
            className={`w-full p-3.5 rounded-xl text-sm font-medium transition-all focus:outline-none focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20 ${
              isDark
                ? "bg-slate-900 border border-slate-800 text-white placeholder-slate-500"
                : "bg-white border border-[#D9D9D9] text-[#0B2545] placeholder-slate-400"
            }`}
          />
        </div>

        {/* WhatsApp Number Field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="counselling-phone" className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
            WhatsApp Number <span className="text-[#C9A227]">*</span>
          </label>
          <input
            id="counselling-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98852 98821"
            required
            disabled={loading}
            className={`w-full p-3.5 rounded-xl text-sm font-medium transition-all focus:outline-none focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20 ${
              isDark
                ? "bg-slate-900 border border-slate-800 text-white placeholder-slate-500"
                : "bg-white border border-[#D9D9D9] text-[#0B2545] placeholder-slate-400"
            }`}
          />
        </div>

        {/* What do you want to study? */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="counselling-field" className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
            What do you want to study? <span className="text-[#C9A227]">*</span>
          </label>
          <select
            id="counselling-field"
            value={studyField}
            onChange={(e) => setStudyField(e.target.value)}
            disabled={loading}
            className={`w-full p-3.5 rounded-xl text-sm font-medium transition-all focus:outline-none focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20 cursor-pointer ${
              isDark
                ? "bg-slate-900 border border-slate-800 text-white"
                : "bg-white border border-[#D9D9D9] text-[#0B2545]"
            }`}
          >
            {STUDY_FIELDS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Which country are you considering? ("Not Sure" available) */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="counselling-country" className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
            Which country are you considering? <span className="text-[#C9A227]">*</span>
          </label>
          <select
            id="counselling-country"
            value={targetDestination}
            onChange={(e) => setTargetDestination(e.target.value)}
            disabled={loading}
            className={`w-full p-3.5 rounded-xl text-sm font-medium transition-all focus:outline-none focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20 cursor-pointer ${
              isDark
                ? "bg-slate-900 border border-slate-800 text-white"
                : "bg-white border border-[#D9D9D9] text-[#0B2545]"
            }`}
          >
            {DESTINATION_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c === "Not Sure" ? "🤔 Not Sure (Help Me Choose)" : c}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button CTA */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="w-full justify-center bg-[#C9A227] hover:bg-[#B38F1F] text-[#0B2545] font-extrabold text-sm sm:text-base py-3.5 rounded-xl shadow-md transition-all"
            rightIcon={
              loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-[#0B2545]" />
              )
            }
          >
            {loading ? "Sending Request..." : "Get My Personalized Guidance →"}
          </Button>
        </div>
      </form>
    </div>
  );
};
