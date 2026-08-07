import React from "react";
import type { Metadata } from "next";
import { studentService } from "@/services/student.service";
import { Card, Button } from "@/design-system";
import { Bell, Calendar, FileText, CheckCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Notifications | Vikram Edu Consultants",
  description: "Activity feed for appointments, documents, and application updates.",
};

export default async function StudentNotificationsPage() {
  const notifs = await studentService.getStudentNotifications();

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Activity Notifications</h2>
          <p className="text-xs text-slate-500">Live updates regarding your appointments, document verifications, and applications.</p>
        </div>

        <Button variant="outline" size="sm" leftIcon={<CheckCheck className="w-4 h-4 text-[#D4AF37]" />}>
          Mark All as Read
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {notifs.map((n) => (
          <Card
            key={n.id}
            variant="flat"
            padding="md"
            className={`rounded-2xl border transition-all flex items-start gap-4 ${
              !n.isRead ? "bg-white border-[#D4AF37]/50 shadow-md" : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="p-3 rounded-xl bg-[#0B1B3D]/5 text-[#D4AF37] flex-shrink-0 mt-0.5">
              {n.type === "APPOINTMENT_REMINDER" ? (
                <Calendar className="w-5 h-5" />
              ) : n.type === "DOCUMENT_VERIFICATION" ? (
                <FileText className="w-5 h-5" />
              ) : (
                <Bell className="w-5 h-5" />
              )}
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-800 text-sm font-['Outfit']">{n.title}</h4>
                <span className="text-[10px] text-slate-400">
                  {new Date(n.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
