import React from "react";
import type { Metadata } from "next";
import { AnalyticsCard } from "@/components/admin/AnalyticsCard";
import { Card, Badge } from "@/design-system";
import { BarChart3, TrendingUp, Users, Globe, Award, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Platform Analytics | Vikram Edu Admin",
  description: "Conversion funnels, destination trends, and scholarship engagement metrics.",
};

export default function AdminAnalyticsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Platform Conversion Analytics</h2>
        <p className="text-xs text-slate-500">Track student registration pipelines, booking conversion rates, and popular study destinations.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard title="Registration Conversion" value="68.4%" change="4.2%" isPositive={true} icon={<TrendingUp className="w-5 h-5 text-emerald-500" />} borderAccent="border-l-4 border-l-emerald-500" />
        <AnalyticsCard title="Consultation Bookings" value="240 / mo" change="18%" isPositive={true} icon={<Users className="w-5 h-5 text-[#D4AF37]" />} borderAccent="border-l-4 border-l-[#D4AF37]" />
        <AnalyticsCard title="Top Destination" value="USA (42%)" change="6%" isPositive={true} icon={<Globe className="w-5 h-5 text-indigo-500" />} borderAccent="border-l-4 border-l-indigo-500" />
        <AnalyticsCard title="Scholarship Applications" value="185" change="12%" isPositive={true} icon={<Award className="w-5 h-5 text-amber-500" />} borderAccent="border-l-4 border-l-amber-500" />
      </div>

      {/* Conversion Funnel Widget */}
      <Card variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-2xl flex flex-col gap-6">
        <h3 className="font-bold text-lg text-[#0B1B3D] font-['Outfit']">Student Journey Conversion Pipeline</h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
            <span className="text-xs text-slate-500">1. Website Visitors</span>
            <span className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">24,500</span>
            <span className="text-[10px] text-emerald-600 font-bold">100% Top of Funnel</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
            <span className="text-xs text-slate-500">2. Registered Accounts</span>
            <span className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">1,480</span>
            <span className="text-[10px] text-emerald-600 font-bold">6.0% Conversion</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
            <span className="text-xs text-slate-500">3. Booked Consultation</span>
            <span className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">540</span>
            <span className="text-[10px] text-emerald-600 font-bold">36.4% Conversion</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
            <span className="text-xs text-slate-500">4. Submitted Admit Packet</span>
            <span className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">320</span>
            <span className="text-[10px] text-emerald-600 font-bold">59.2% Final Conversion</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
