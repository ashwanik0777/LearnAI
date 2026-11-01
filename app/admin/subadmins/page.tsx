'use client';

import React from "react";
import { UserCheck, Plus, Shield, Key, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminStaffPage() {
  const staff = [
    { id: 1, name: "Dr. Arvind Rao", email: "arvind@example.com", role: "Super Admin", access: "Full System Access", lastActive: "10 mins ago" },
    { id: 2, name: "Sneha Kapoor", email: "sneha@example.com", role: "Curriculum Manager", access: "Courses & Quizzes", lastActive: "1 hour ago" },
    { id: 3, name: "Vikram Malhotra", email: "vikram@example.com", role: "Moderator", access: "User Discussions & Support", lastActive: "Yesterday" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Staff & Sub-Admins</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage administrative privileges, role-based access control, and audit logs.
          </p>
        </div>
        <Button className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold">
          <Plus className="h-4 w-4 mr-1.5" /> Add Staff Member
        </Button>
      </div>

      <Card className="bg-slate-800/60 border-slate-700/60 text-slate-100 shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700/60 text-xs text-slate-400 bg-slate-900/50">
                  <th className="py-3 px-4 font-semibold">Staff Member</th>
                  <th className="py-3 px-4 font-semibold">Role</th>
                  <th className="py-3 px-4 font-semibold">Access Scope</th>
                  <th className="py-3 px-4 font-semibold">Last Active</th>
                  <th className="py-3 px-4 font-semibold text-right">Security</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {staff.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-700/20 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-white">{s.name}</div>
                      <div className="text-xs text-slate-400">{s.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge className="bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs">
                        {s.role}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-300">
                      {s.access}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">
                      {s.lastActive}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center text-xs text-emerald-400">
                        <Key className="h-3 w-3 mr-1" /> 2FA Enabled
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
