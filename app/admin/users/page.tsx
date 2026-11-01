'use client';

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Users, Search, Filter, Shield, MoreVertical, 
  UserCheck, UserX, Mail, ArrowUpDown, Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const { data } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("Failed to load users");
      return res.json();
    },
  });

  const allUsers = data?.recentUsers || [
    { id: 1, name: "Priya Sharma", email: "priya@example.com", role: "student", points: 840, createdAt: new Date() },
    { id: 2, name: "Rahul Verma", email: "rahul@example.com", role: "student", points: 1220, createdAt: new Date() },
    { id: 3, name: "Ananya Patel", email: "ananya@example.com", role: "student", points: 650, createdAt: new Date() },
    { id: 4, name: "Aditya Singh", email: "aditya@example.com", role: "teacher", points: 2100, createdAt: new Date() },
    { id: 5, name: "Neha Gupta", email: "neha@example.com", role: "student", points: 910, createdAt: new Date() },
    { id: 6, name: "Dr. Arvind Rao", email: "arvind@example.com", role: "admin", points: 3500, createdAt: new Date() },
  ];

  const filteredUsers = allUsers.filter((u: any) => {
    const matchesSearch = 
      (u.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Learners & Staff Management</h1>
          <p className="text-sm text-slate-400 mt-1">Manage user roles, permissions, and academic records.</p>
        </div>
        <Button className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold">
          <Plus className="h-4 w-4 mr-1.5" /> Invite New User
        </Button>
      </div>

      <Card className="bg-slate-800/60 border-slate-700/60 text-slate-100 shadow-lg">
        <CardHeader className="pb-4 border-b border-slate-700/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant={roleFilter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setRoleFilter("all")}
                className={roleFilter === "all" ? "bg-slate-700" : "border-slate-700 text-slate-300"}
              >
                All
              </Button>
              <Button 
                variant={roleFilter === "student" ? "default" : "outline"} 
                size="sm"
                onClick={() => setRoleFilter("student")}
                className={roleFilter === "student" ? "bg-slate-700" : "border-slate-700 text-slate-300"}
              >
                Students
              </Button>
              <Button 
                variant={roleFilter === "teacher" ? "default" : "outline"} 
                size="sm"
                onClick={() => setRoleFilter("teacher")}
                className={roleFilter === "teacher" ? "bg-slate-700" : "border-slate-700 text-slate-300"}
              >
                Teachers
              </Button>
              <Button 
                variant={roleFilter === "admin" ? "default" : "outline"} 
                size="sm"
                onClick={() => setRoleFilter("admin")}
                className={roleFilter === "admin" ? "bg-slate-700" : "border-slate-700 text-slate-300"}
              >
                Admins
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700/60 text-xs text-slate-400 bg-slate-900/50">
                  <th className="py-3 px-4 font-semibold">User Details</th>
                  <th className="py-3 px-4 font-semibold">Role</th>
                  <th className="py-3 px-4 font-semibold">Total Points</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {filteredUsers.map((u: any) => (
                  <tr key={u.id} className="hover:bg-slate-700/20 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-white">{u.name}</div>
                      <div className="text-xs text-slate-400">{u.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant="outline" 
                        className={`capitalize text-xs ${
                          u.role === "admin" 
                            ? "border-amber-500/40 text-amber-300 bg-amber-500/10"
                            : u.role === "teacher"
                            ? "border-purple-500/40 text-purple-300 bg-purple-500/10"
                            : "border-indigo-500/30 text-indigo-300 bg-indigo-500/10"
                        }`}
                      >
                        {u.role || "student"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-slate-300">
                      {u.points} XP
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Active
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
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
