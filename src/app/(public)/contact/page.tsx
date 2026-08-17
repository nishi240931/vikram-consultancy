"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2, Navigation } from "lucide-react";
import { Card, Badge, Button } from "@/design-system";
import { APP_CONFIG } from "@/config/app.config";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [targetDestination, setTargetDestination] = useState("United States");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!name || !email || !message) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          targetDestination,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || "Failed to submit inquiry. Please try again.");
      } else {
        setSuccessMessage(data.message || "Thank you! Your inquiry has been submitted successfully.");
        // Clear form fields after success
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      }
    } catch (err) {
      setErrorMessage("Network error occurred. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F5]">
      {/* Hero Section */}
      <section className="relative bg-[#0B2545] text-white py-16 overflow-hidden border-b border-[#C9A227]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-3">
          <Badge variant="gold" size="md">Get In Touch</Badge>
          <h1 className="text-4xl font-black font-['Outfit'] text-white">We Are Here To Help You Succeed</h1>
          <p className="text-slate-200 text-sm max-w-xl">Have questions about university admissions, visa applications, or scholarships? Contact our senior team today.</p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#0B2545] font-['Outfit']">Our Headquarters &amp; Contact Info</h2>

            <Card variant="flat" padding="md" className="bg-white border border-[#E5E0D5] rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="p-3 rounded-xl bg-[#0B2545]/5 text-[#C9A227]">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-xs">
                <span className="text-slate-400 font-bold uppercase">Phone / WhatsApp</span>
                <span className="text-[#0B2545] font-extrabold text-sm">{APP_CONFIG.contact.phone}</span>
              </div>
            </Card>

            <Card variant="flat" padding="md" className="bg-white border border-[#E5E0D5] rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="p-3 rounded-xl bg-[#0B2545]/5 text-[#C9A227]">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-xs">
                <span className="text-slate-400 font-bold uppercase">Admissions Email</span>
                <span className="text-[#0B2545] font-extrabold text-sm">{APP_CONFIG.contact.email}</span>
              </div>
            </Card>

            <Card variant="flat" padding="md" className="bg-white border border-[#E5E0D5] rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="p-3 rounded-xl bg-[#0B2545]/5 text-[#C9A227]">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-xs">
                <span className="text-slate-400 font-bold uppercase">Office Hours</span>
                <span className="text-[#0B2545] font-extrabold text-sm">Monday - Saturday: 9:30 AM - 6:30 PM (IST)</span>
              </div>
            </Card>

            {/* Headquarters Branch Office */}
            <h3 className="text-lg font-bold text-[#0B2545] pt-4 font-['Outfit']">Headquarters Location</h3>
            <div className="flex flex-col gap-3">
              {APP_CONFIG.branches.map((b) => (
                <div key={b.city} className="p-4 rounded-xl bg-white border border-[#E5E0D5] flex items-start gap-3 shadow-sm">
                  <MapPin className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col text-xs gap-1">
                    <strong className="text-[#0B2545] text-sm font-['Outfit']">{b.city} Headquarters</strong>
                    <span className="text-[#4B5563] leading-relaxed">{b.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="lg:col-span-7">
            <Card variant="flat" padding="lg" className="bg-white border border-[#E5E0D5] rounded-3xl shadow-xl flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-[#0B2545] font-['Outfit']">Send Us a Direct Message</h3>
                <p className="text-xs text-[#4B5563]">Fill out your details and a senior study abroad advisor will contact you shortly.</p>
              </div>

              {successMessage && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-sm block">Inquiry Submitted!</strong>
                    <span>{successMessage}</span>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-sm block">Submission Failed</strong>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-xs">
                    <label className="font-bold text-[#0B2545]">Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ananya Reddy"
                      className="p-3 rounded-xl border border-[#D9D9D9] text-[#0B2545] focus:outline-none focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-xs">
                    <label className="font-bold text-[#0B2545]">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ananya@example.com"
                      className="p-3 rounded-xl border border-[#D9D9D9] text-[#0B2545] focus:outline-none focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-xs">
                    <label className="font-bold text-[#0B2545]">Phone Number *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98852 98821"
                      className="p-3 rounded-xl border border-[#D9D9D9] text-[#0B2545] focus:outline-none focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-xs">
                    <label className="font-bold text-[#0B2545]">Target Destination</label>
                    <select
                      value={targetDestination}
                      onChange={(e) => setTargetDestination(e.target.value)}
                      className="p-3 rounded-xl border border-[#D9D9D9] text-[#0B2545] focus:outline-none focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                      disabled={loading}
                    >
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>New Zealand</option>
                      <option>South Korea</option>
                      <option>Japan</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-xs">
                  <label className="font-bold text-[#0B2545]">Your Inquiry / Message *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your target degree, GPA, budget, or preferred intake..."
                    className="p-3 rounded-xl border border-[#D9D9D9] text-[#0B2545] focus:outline-none focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                    required
                    disabled={loading}
                  />
                </div>

                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  disabled={loading}
                  className="w-full justify-center bg-[#C9A227] hover:bg-[#B38F1F] text-[#0B2545] font-extrabold"
                  rightIcon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 text-[#0B2545]" />}
                >
                  {loading ? "Submitting Inquiry..." : "Submit Inquiry"}
                </Button>
              </form>
            </Card>
          </div>

        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-12 bg-white border-t border-[#E5E0D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider">Visit Our Office</span>
              <h3 className="text-2xl font-extrabold text-[#0B2545] font-['Outfit']">Vijayawada Headquarters Map</h3>
            </div>
            <a
              href="https://maps.google.com/?q=Yenamalakuduru+Vijayawada+Andhra+Pradesh+520007"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0B2545] hover:bg-[#071A33] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md transition-all"
            >
              <Navigation className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Get Directions</span>
            </a>
          </div>

          <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-lg border border-[#E5E0D5]">
            <iframe
              title="Vikram Edu Consultants Vijayawada Headquarters Map"
              src="https://maps.google.com/maps?q=Seetharama+Residency+Yenamalakuduru+Vijayawada+Andhra+Pradesh+520007&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
