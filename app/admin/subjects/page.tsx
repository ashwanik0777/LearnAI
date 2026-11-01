'use client';

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Layers, Plus, BookOpen, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminSubjectsPage() {
  const { data: subjects = [], isLoading } = useQuery({
    queryKey: ["adminSubjectsList"],
    queryFn: async () => {
      const res = await fetch("/api/subjects");
      if (!res.ok) return [];
      return res.json();
    },
  });

  const displaySubjects = subjects.length > 0 ? subjects : [
    { id: 1, name: "Mathematics", educationalStream: "science", color: "#6366f1", description: "Algebra, Calculus, and Statistics" },
    { id: 2, name: "Physics", educationalStream: "science", color: "#3b82f6", description: "Mechanics, Electromagnetism, and Modern Physics" },
    { id: 3, name: "Chemistry", educationalStream: "science", color: "#ec4899", description: "Organic, Inorganic, and Physical Chemistry" },
    { id: 4, name: "Computer Science", educationalStream: "technology", color: "#10b981", description: "Algorithms, Data Structures, and AI Foundations" },
    { id: 5, name: "Economics", educationalStream: "commerce", color: "#f59e0b", description: "Microeconomics, Macroeconomics, and Finance" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Subject & Stream Architecture</h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure educational tracks, themes, and syllabus categories.
          </p>
        </div>
        <Button className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold">
          <Plus className="h-4 w-4 mr-1.5" /> Add Subject
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displaySubjects.map((sub: any) => (
          <Card key={sub.id} className="bg-slate-800/60 border-slate-700/60 text-slate-100 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md"
                  style={{ backgroundColor: sub.color || "#6366f1" }}
                >
                  <BookOpen className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="border-slate-700 capitalize text-slate-300">
                  {sub.educationalStream || "General"}
                </Badge>
              </div>
              <CardTitle className="text-lg font-bold text-white mt-3">{sub.name}</CardTitle>
              <CardDescription className="text-slate-400 text-xs">
                {sub.description || "Core academic subject with adaptive quiz modules."}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-700/40 pt-3 mt-1">
                <span>Color Accent: <code className="text-amber-300 font-mono">{sub.color}</code></span>
                <span className="text-emerald-400 font-medium">Active</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
