'use client';

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  BookOpen, Plus, Search, Eye, Edit, Trash2, 
  BarChart, Sparkles, CheckCircle2, Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function AdminCoursesPage() {
  const [search, setSearch] = useState("");

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["adminCoursesList"],
    queryFn: async () => {
      const res = await fetch("/api/courses");
      if (!res.ok) return [];
      return res.json();
    },
  });

  const displayCourses = courses.length > 0 ? courses : [
    { id: 1, title: "Advanced Calculus & Real Analysis", difficulty: "advanced", estimatedDuration: 180, isPublished: true, contentType: "interactive" },
    { id: 2, title: "Foundations of Quantum Mechanics", difficulty: "intermediate", estimatedDuration: 150, isPublished: true, contentType: "standard" },
    { id: 3, title: "Machine Learning with Python", difficulty: "intermediate", estimatedDuration: 240, isPublished: true, contentType: "hands-on" },
    { id: 4, title: "Organic Chemistry Mechanisms", difficulty: "advanced", estimatedDuration: 160, isPublished: true, contentType: "standard" },
    { id: 5, title: "Cellular Biology & Genetics", difficulty: "beginner", estimatedDuration: 120, isPublished: true, contentType: "visual" },
  ];

  const filtered = displayCourses.filter((c: any) => 
    (c.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Course Catalog & Curriculum</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage course modules, difficulty settings, and AI learning content.
          </p>
        </div>
        <Link href="/courses">
          <Button className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold">
            <Plus className="h-4 w-4 mr-1.5" /> Create Course
          </Button>
        </Link>
      </div>

      <Card className="bg-slate-800/60 border-slate-700/60 text-slate-100 shadow-lg">
        <CardHeader className="pb-4 border-b border-slate-700/40">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700/60 text-xs text-slate-400 bg-slate-900/50">
                  <th className="py-3 px-4 font-semibold">Course Title</th>
                  <th className="py-3 px-4 font-semibold">Difficulty</th>
                  <th className="py-3 px-4 font-semibold">Est. Duration</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {filtered.map((course: any) => (
                  <tr key={course.id} className="hover:bg-slate-700/20 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-white">{course.title}</div>
                      <div className="text-xs text-slate-400 capitalize">{course.contentType || "Standard"} Module</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge 
                        variant="outline" 
                        className={`capitalize text-xs ${
                          course.difficulty === "advanced" 
                            ? "border-rose-500/40 text-rose-300 bg-rose-500/10"
                            : course.difficulty === "intermediate"
                            ? "border-amber-500/40 text-amber-300 bg-amber-500/10"
                            : "border-emerald-500/30 text-emerald-300 bg-emerald-500/10"
                        }`}
                      >
                        {course.difficulty}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-300">
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                        {course.estimatedDuration || 60} mins
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Published
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link href={`/courses/${course.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
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
