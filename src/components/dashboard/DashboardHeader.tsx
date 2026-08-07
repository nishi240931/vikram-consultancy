"use client";

import React from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { Bell, Search } from "lucide-react";
import { Input } from "@/design-system";

export interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
  const { user } = useUser();

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
      <div className="flex flex-col">
        <h1 className="text-xl font-black text-[#0B1B3D] font-['Outfit']">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 font-normal">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block w-64">
          <Input
            placeholder="Search workspace..."
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            className="py-1.5 text-xs border-slate-200"
          />
        </div>

        <Link
          href="/dashboard/notifications"
          className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          aria-label="View Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D4AF37]" />
        </Link>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <UserButton afterSignOutUrl="/" />
          <div className="hidden lg:flex flex-col text-xs">
            <span className="font-bold text-[#0B1B3D] line-clamp-1">
              {user?.fullName || "Student Portal"}
            </span>
            <span className="text-[10px] text-slate-400">Authenticated Student</span>
          </div>
        </div>
      </div>
    </header>
  );
};
