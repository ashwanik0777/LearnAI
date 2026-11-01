'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, Users, BookOpen, Layers, UserCheck, LogOut, 
  Menu, X, Shield, ExternalLink, Bell, Search, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Dashboard", icon: Home, href: "/admin" },
  { label: "User Management", icon: Users, href: "/admin/users" },
  { label: "Courses & Content", icon: BookOpen, href: "/admin/courses" },
  { label: "Subjects & Streams", icon: Layers, href: "/admin/subjects" },
  { label: "Staff & Admins", icon: UserCheck, href: "/admin/subadmins" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const initials = (user?.fullName || "Admin")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside 
        className={`transition-all duration-300 bg-slate-950 border-r border-slate-800 flex flex-col z-30 shrink-0 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Brand / Logo */}
        <div className="h-16 px-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="p-2 bg-gradient-to-tr from-amber-500 to-amber-400 rounded-xl shadow-lg shrink-0 text-slate-950 font-bold">
              <Shield className="h-5 w-5" />
            </div>
            {sidebarOpen && (
              <div className="truncate">
                <span className="font-extrabold text-lg text-white tracking-tight">LearnAI</span>
                <span className="text-[10px] block uppercase font-mono tracking-widest text-amber-400 font-semibold">Admin Portal</span>
              </div>
            )}
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Toggle Sidebar"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-amber-400/10 text-amber-300 border border-amber-400/20 shadow-sm" 
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-900"
                } ${sidebarOpen ? "" : "justify-center"}`}
              >
                <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                {sidebarOpen && <span className="ml-3 truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Return to student dashboard / switch view */}
        <div className="p-3 border-t border-slate-800/80 space-y-2">
          <Link
            href="/dashboard"
            className={`flex items-center px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-900 transition-colors ${
              sidebarOpen ? "" : "justify-center"
            }`}
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span className="ml-3 truncate">Student Platform</span>}
          </Link>
          <button
            type="button"
            onClick={logout}
            className={`w-full flex items-center px-3.5 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors ${
              sidebarOpen ? "" : "justify-center"
            }`}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span className="ml-3 truncate">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-900">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-950/70 backdrop-blur-md px-6 flex items-center justify-between z-20">
          <div className="flex items-center space-x-3">
            <h1 className="text-sm font-medium text-slate-400 hidden sm:block">Control Center</h1>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-xs">
              System Live
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-amber-400 flex items-center justify-center text-xs font-bold text-white shadow-md">
                {initials}
              </div>
              <div className="hidden md:block text-left text-xs">
                <div className="font-semibold text-white">
                  {user?.fullName || "Administrator"}
                  {user?.role && <span className="ml-1.5 text-[10px] uppercase text-amber-400">{user.role}</span>}
                </div>
                <div className="text-slate-400">{user?.email}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic page content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
