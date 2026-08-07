"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FileText,
  Bookmark,
  Calendar,
  Bell,
  Settings,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Logo, Badge } from "@/design-system";

export const DashboardSidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard Home", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "My Applications", href: "/dashboard/applications", icon: <GraduationCap className="w-4 h-4" /> },
    { label: "Document Vault", href: "/dashboard/documents", icon: <FileText className="w-4 h-4" /> },
    { label: "Saved Programs", href: "/dashboard/saved", icon: <Bookmark className="w-4 h-4" /> },
    { label: "Consultations", href: "/appointments", icon: <Calendar className="w-4 h-4" /> },
    { label: "Notifications", href: "/dashboard/notifications", icon: <Bell className="w-4 h-4" /> },
    { label: "Student Profile", href: "/dashboard/profile", icon: <User className="w-4 h-4" /> },
    { label: "Account Settings", href: "/dashboard/settings", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-[#0A192F] text-white flex flex-col justify-between p-4 border-r border-[#D4AF37]/20 min-h-screen">
      <div className="flex flex-col gap-6">
        <div className="px-2 pt-2">
          <Logo size="md" theme="dark" />
        </div>

        <div className="px-2">
          <Badge variant="gold" size="sm" className="w-fit">
            <Sparkles className="w-3 h-3 mr-1" /> Student Portal
          </Badge>
        </div>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#D4AF37] text-[#0A192F] font-bold shadow-md"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 flex flex-col gap-1">
        <span className="font-bold text-white">Need Advisory Help?</span>
        <span className="text-[11px] text-slate-400">Connect with your assigned counsellor anytime.</span>
      </div>
    </aside>
  );
};
