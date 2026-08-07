import React from "react";
import type { Metadata } from "next";
import { Card, Badge, Button } from "@/design-system";
import { Settings, ShieldCheck, Database, Server, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "System Settings | Vikram Edu Admin",
  description: "Platform system health, database connections, and role-based access settings.",
};

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Platform System Settings</h2>
        <p className="text-xs text-slate-500">Configure system parameters, role-based security policies, and PostgreSQL pool connections.</p>
      </div>

      <div className="flex flex-col gap-6">
        <Card variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-[#D4AF37]" />
            <div className="flex flex-col">
              <h3 className="font-bold text-slate-800 text-sm font-['Outfit']">PostgreSQL Database Connection</h3>
              <span className="text-xs text-slate-500">Prisma ORM connected to production cluster.</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <Badge variant="success" size="sm">
              Healthy • Pool Size 10
            </Badge>
            <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
              Test Connection
            </Button>
          </div>
        </Card>

        <Card variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <div className="flex flex-col">
              <h3 className="font-bold text-slate-800 text-sm font-['Outfit']">Role-Based Access Control (RBAC)</h3>
              <span className="text-xs text-slate-500">Clerk authentication middleware permissions active.</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="gold" size="sm">SUPER_ADMIN (Full Access)</Badge>
            <Badge variant="navy" size="sm">ADMIN (Operations)</Badge>
            <Badge variant="outline" size="sm">COUNSELLOR (Assigned Students)</Badge>
            <Badge variant="info" size="sm">STUDENT (Workspace)</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}
