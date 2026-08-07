"use client";

import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShieldCheck, Search, Bell } from "lucide-react";
import { Input, Badge } from "@/design-system";

export interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle }) => {
  const { user } = useUser();

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-black text-[#0B1B3D] font-['Outfit']">{title}</h1>
          <Badge variant="gold" size="sm">
            <ShieldCheck className="w-3 h-3 mr-1" /> Super Admin
          </Badge>
        </div>
        {subtitle && <p className="text-xs text-slate-500 font-normal">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block w-64">
          <Input
            placeholder="Search CRM..."
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            className="py-1.5 text-xs border-slate-200"
          />
        </div>

        <button className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors" aria-label="Admin Alerts">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <UserButton afterSignOutUrl="/" />
          <div className="hidden lg:flex flex-col text-xs">
            <span className="font-bold text-[#0B1B3D] line-clamp-1">
              {user?.fullName || "Operations Admin"}
            </span>
            <span className="text-[10px] text-slate-400">Platform Executive</span>
          </div>
        </div>
      </div>
    </header>
  );
};
