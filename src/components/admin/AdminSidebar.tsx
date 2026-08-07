"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Globe,
  GraduationCap,
  BookOpen,
  Award,
  Calendar,
  FileText,
  Sparkles,
  BarChart3,
  Settings,
  MessageSquare,
} from "lucide-react";
import { Logo, Badge } from "@/design-system";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Student CRM", href: "/admin/students", icon: <Users className="w-4 h-4" /> },
    { label: "Counsellor Roster", href: "/admin/counsellors", icon: <UserCheck className="w-4 h-4" /> },
    { label: "Destinations CMS", href: "/admin/countries", icon: <Globe className="w-4 h-4" /> },
    { label: "Universities CMS", href: "/admin/universities", icon: <GraduationCap className="w-4 h-4" /> },
    { label: "Courses CMS", href: "/admin/courses", icon: <BookOpen className="w-4 h-4" /> },
    { label: "Scholarships CMS", href: "/admin/scholarships", icon: <Award className="w-4 h-4" /> },
    { label: "Appointments Operations", href: "/admin/appointments", icon: <Calendar className="w-4 h-4" /> },
    { label: "Blogs CMS", href: "/admin/blogs", icon: <FileText className="w-4 h-4" /> },
    { label: "Spot Events CMS", href: "/admin/events", icon: <Sparkles className="w-4 h-4" /> },
    { label: "Testimonials CMS", href: "/admin/testimonials", icon: <MessageSquare className="w-4 h-4" /> },
    { label: "Platform Analytics", href: "/admin/analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "System Settings", href: "/admin/settings", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-[#0A192F] text-white flex flex-col justify-between p-4 border-r border-[#D4AF37]/20 min-h-screen">
      <div className="flex flex-col gap-6">
        <div className="px-2 pt-2">
          <Logo size="md" theme="dark" />
        </div>

        <div className="px-2">
          <Badge variant="gold" size="sm" className="w-fit">
            <Sparkles className="w-3 h-3 mr-1" /> Admin Control CRM
          </Badge>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
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

      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-slate-300 flex flex-col gap-1">
        <span className="font-bold text-white">System Status: Operational</span>
        <span className="text-slate-400">PostgreSQL • Prisma ORM • Next.js 15</span>
      </div>
    </aside>
  );
};
