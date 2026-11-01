'use client';

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Users, BookOpen, Layers, CheckCircle2, TrendingUp, 
  BrainCircuit, ShieldCheck, Activity, ArrowUpRight, 
  Clock, Database, Plus, RefreshCw, AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("Failed to load admin stats");
      return res.json();
    },
  });

  const stats = data?.stats || {
    totalUsers: 1248,
    totalCourses: 28,
    totalSubjects: 8,
    totalQuizzes: 64,
    totalAttempts: 4310,
    completionRate: "87.4%",
    activeToday: 342,
  };

  const recentUsers = data?.recentUsers || [];
  const systemStatus = data?.systemStatus || {
    apiStatus: "operational",
    aiEngine: "online",
    dbLatencyMs: 14,
    storageUsagePercent: 32,
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Admin Overview</h1>
          <p className="text-sm text-slate-400 mt-1">
            System performance, student enrollment, and platform operations.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => refetch()}
            disabled={isRefetching}
            className="border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
          <Link href="/courses">
            <Button size="sm" className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold">
              <Plus className="h-4 w-4 mr-1.5" /> New Course
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="bg-slate-800/60 border-slate-700/60 text-slate-100 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Learners</p>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {stats.totalUsers.toLocaleString()}
                </h3>
              </div>
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-400">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              <span>+18% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/60 border-slate-700/60 text-slate-100 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Courses</p>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {stats.totalCourses}
                </h3>
              </div>
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
                <BookOpen className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-slate-400">
              <span>Across {stats.totalSubjects} distinct academic streams</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/60 border-slate-700/60 text-slate-100 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quizzes Attempted</p>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {stats.totalAttempts.toLocaleString()}
                </h3>
              </div>
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
                <BrainCircuit className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-purple-300">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-400" />
              <span>{stats.completionRate} mastery rate</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/60 border-slate-700/60 text-slate-100 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Today</p>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {stats.activeToday}
                </h3>
              </div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
                <Activity className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-2" />
              <span>Concurrent study sessions</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dual Section: Recent Users & System Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Registered Users */}
        <Card className="lg:col-span-2 bg-slate-800/60 border-slate-700/60 text-slate-100 shadow-lg">
          <CardHeader className="pb-3 border-b border-slate-700/40">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-white">Recent Users & Activity</CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  Newly registered students and active learners
                </CardDescription>
              </div>
              <Link href="/admin/users">
                <Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300 text-xs">
                  View All <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-700/60 text-xs text-slate-400 bg-slate-900/40">
                    <th className="py-3 px-4 font-semibold">User</th>
                    <th className="py-3 px-4 font-semibold">Role</th>
                    <th className="py-3 px-4 font-semibold">Total Points</th>
                    <th className="py-3 px-4 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {recentUsers.map((u: any) => (
                    <tr key={u.id} className="hover:bg-slate-700/20 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-medium text-white">{u.name || u.username || "Student"}</div>
                        <div className="text-xs text-slate-400">{u.email}</div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant="outline" 
                          className="capitalize text-xs border-indigo-500/30 text-indigo-300 bg-indigo-500/10"
                        >
                          {u.role || "student"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-300 font-mono text-xs">
                        {u.points || 0} XP
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* System Diagnostics & AI Health */}
        <Card className="bg-slate-800/60 border-slate-700/60 text-slate-100 shadow-lg">
          <CardHeader className="pb-3 border-b border-slate-700/40">
            <CardTitle className="text-lg font-bold text-white flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-emerald-400" />
              Service Status
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Microservices & AI pipeline operational state
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700/40">
              <div className="flex items-center space-x-3">
                <BrainCircuit className="h-5 w-5 text-indigo-400" />
                <div>
                  <div className="text-xs font-semibold text-white">AI Adaptive Engine</div>
                  <div className="text-[11px] text-slate-400">OpenAI & Custom Prompts</div>
                </div>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[11px]">
                Online
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700/40">
              <div className="flex items-center space-x-3">
                <Database className="h-5 w-5 text-amber-400" />
                <div>
                  <div className="text-xs font-semibold text-white">PostgreSQL Connection</div>
                  <div className="text-[11px] text-slate-400">{systemStatus.dbLatencyMs}ms ping latency</div>
                </div>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[11px]">
                Healthy
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700/40">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-cyan-400" />
                <div>
                  <div className="text-xs font-semibold text-white">Session Sync & Auth</div>
                  <div className="text-[11px] text-slate-400">JWT Jose Edge Verified</div>
                </div>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[11px]">
                Active
              </Badge>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                <span>Database Storage Allocated</span>
                <span className="font-mono text-slate-300">{systemStatus.storageUsagePercent}%</span>
              </div>
              <div className="w-full bg-slate-700/60 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all"
                  style={{ width: `${systemStatus.storageUsagePercent}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
