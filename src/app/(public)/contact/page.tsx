import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Send, Calendar } from "lucide-react";
import { Card, Badge, Button } from "@/design-system";
import { APP_CONFIG } from "@/config/app.config";

export const metadata: Metadata = {
  title: "Contact Us | Vikram Edu Consultants",
  description: "Get in touch with Vikram Edu Consultants. Visit our branch offices or book a virtual 1-on-1 consultation.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F5]">
      {/* Hero Section */}
      <section className="relative bg-[#0A192F] text-white py-16 overflow-hidden border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-3">
          <Badge variant="gold" size="md">Get In Touch</Badge>
          <h1 className="text-4xl font-black font-['Outfit'] text-white">We Are Here To Help You Succeed</h1>
          <p className="text-slate-300 text-sm max-w-xl">Have questions about university admissions, visa applications, or scholarships? Contact our team today.</p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#0B1B3D] font-['Outfit']">Our Headquarters & Contact Info</h2>

            <Card variant="flat" padding="md" className="bg-white border border-slate-200 rounded-2xl flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#0B1B3D]/5 text-[#D4AF37]">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-xs">
                <span className="text-slate-400 font-bold uppercase">Phone / WhatsApp</span>
                <span className="text-slate-900 font-bold text-sm">{APP_CONFIG.contact.phone}</span>
              </div>
            </Card>

            <Card variant="flat" padding="md" className="bg-white border border-slate-200 rounded-2xl flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#0B1B3D]/5 text-[#D4AF37]">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-xs">
                <span className="text-slate-400 font-bold uppercase">Admissions Email</span>
                <span className="text-slate-900 font-bold text-sm">{APP_CONFIG.contact.email}</span>
              </div>
            </Card>

            <Card variant="flat" padding="md" className="bg-white border border-slate-200 rounded-2xl flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#0B1B3D]/5 text-[#D4AF37]">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-xs">
                <span className="text-slate-400 font-bold uppercase">Office Hours</span>
                <span className="text-slate-900 font-bold text-sm">Monday - Saturday: 9:30 AM - 6:30 PM (IST)</span>
              </div>
            </Card>

            {/* Branch Offices */}
            <h3 className="text-lg font-bold text-[#0B1B3D] pt-4 font-['Outfit']">Branch Offices</h3>
            <div className="flex flex-col gap-3">
              {APP_CONFIG.branches.map((b) => (
                <div key={b.city} className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col text-xs">
                    <strong className="text-slate-900 text-sm font-['Outfit']">{b.city} Office</strong>
                    <span className="text-slate-500 leading-relaxed">{b.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="lg:col-span-7">
            <Card variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-3xl shadow-xl flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-[#0B1B3D] font-['Outfit']">Send Us a Direct Message</h3>
                <p className="text-xs text-slate-500">Fill out your details and an education advisor will call you within 2 business hours.</p>
              </div>

              <form className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-xs">
                    <label className="font-bold text-slate-700">Full Name *</label>
                    <input type="text" placeholder="e.g. Ananya Reddy" className="p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#D4AF37]" required />
                  </div>

                  <div className="flex flex-col gap-1.5 text-xs">
                    <label className="font-bold text-slate-700">Email Address *</label>
                    <input type="email" placeholder="ananya@example.com" className="p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#D4AF37]" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-xs">
                    <label className="font-bold text-slate-700">Phone Number *</label>
                    <input type="tel" placeholder="+91 98765 43210" className="p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#D4AF37]" required />
                  </div>

                  <div className="flex flex-col gap-1.5 text-xs">
                    <label className="font-bold text-slate-700">Target Destination</label>
                    <select className="p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#D4AF37]">
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>Germany</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-xs">
                  <label className="font-bold text-slate-700">Your Inquiry / Message *</label>
                  <textarea rows={4} placeholder="Tell us about your target degree, GPA, budget, or preferred intake..." className="p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#D4AF37]" required />
                </div>

                <Button variant="primary" size="md" className="w-full justify-center" rightIcon={<Send className="w-4 h-4" />}>
                  Submit Inquiry
                </Button>
              </form>
            </Card>
          </div>

        </div>
      </section>
    </div>
  );
}
