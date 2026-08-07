import React from "react";
import type { Metadata } from "next";
import { Card, Badge } from "@/design-system";
import { Lock, BellRing } from "lucide-react";

export const metadata: Metadata = {
  title: "Account Settings | Vikram Edu Consultants",
  description: "Manage security, notification preferences, and privacy settings.",
};

export default function AccountSettingsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Account & Security Settings</h2>
        <p className="text-xs text-slate-500">Manage security options, Clerk authentication sessions, and notification channels.</p>
      </div>

      <div className="flex flex-col gap-6">
        <Card variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-[#D4AF37]" />
            <div className="flex flex-col">
              <h3 className="font-bold text-slate-800 text-sm font-['Outfit']">Clerk Authentication & Security</h3>
              <span className="text-xs text-slate-500">Your account is secured via Clerk Single Sign-On.</span>
            </div>
          </div>
          <div className="pt-2">
            <Badge variant="success" size="sm">
              Two-Factor Authentication Ready
            </Badge>
          </div>
        </Card>

        <Card variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <BellRing className="w-5 h-5 text-[#D4AF37]" />
            <div className="flex flex-col">
              <h3 className="font-bold text-slate-800 text-sm font-['Outfit']">Notification Preferences</h3>
              <span className="text-xs text-slate-500">Choose how you want to receive updates from your counsellor.</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2 text-xs text-slate-700">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#D4AF37]" />
              <span>Email notifications for appointment reminders and Google Meet links</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#D4AF37]" />
              <span>WhatsApp updates for application status changes and document verifications</span>
            </label>
          </div>
        </Card>
      </div>
    </div>
  );
}
