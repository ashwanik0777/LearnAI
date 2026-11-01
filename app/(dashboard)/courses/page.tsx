'use client';

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Book, Clock, Award, ChevronRight, Users, Loader2 } from "lucide-react";
import type { Subject } from "@/lib/db/schema";

export default function CoursesPage() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("all");

  // Fetch subjects query
  const { data, isLoading } = useQuery<{ subjects: (Subject & { progress: number })[] }>({
    queryKey: ["/api/dashboard"],
    enabled: !!user,
  });

  if (isLoading || authLoading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-3" />
          <p className="text-sm font-medium text-gray-500">Loading courses...</p>
        </div>
      </div>
    );
  }

  const subjects = data?.subjects || [];

  // Filter subjects based on active tab
  const filteredSubjects = (() => {
    if (activeTab === "all") return subjects;
    if (activeTab === "enrolled") return subjects.filter((s) => s.progress > 0);
    if (activeTab === "completed") return subjects.filter((s) => s.progress === 100);
    if (activeTab === "in-progress") return subjects.filter((s) => s.progress > 0 && s.progress < 100);
    return subjects;
  })();

  // Group subjects by category
  const categorizedSubjects: Record<string, Array<Subject & { progress: number }>> = {};
  subjects.forEach((subject) => {
    const category = (subject as any).category || "General";
    if (!categorizedSubjects[category]) {
      categorizedSubjects[category] = [];
    }
    categorizedSubjects[category].push(subject);
  });

  const sortedCategories = Object.keys(categorizedSubjects).sort();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-white px-6 py-6 rounded-xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Courses</h1>
        <p className="mt-1 text-sm text-gray-600">
          Browse our extensive catalog of courses designed to help you achieve your learning goals
        </p>

        {/* Filter tabs */}
        <div className="mt-6 border-b border-gray-200">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "all"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => setActiveTab("enrolled")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "enrolled"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              My Courses
            </button>
            <button
              onClick={() => setActiveTab("in-progress")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "in-progress"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "completed"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div>
        {activeTab === "all" ? (
          <div className="space-y-10">
            {sortedCategories.map((category) => (
              <div key={category}>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">{category} Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categorizedSubjects[category].map((subject) => (
                    <CourseCard
                      key={subject.id}
                      subject={subject}
                      showContinue={subject.progress > 0}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              {activeTab === "enrolled" && "My Courses"}
              {activeTab === "in-progress" && "Courses In Progress"}
              {activeTab === "completed" && "Completed Courses"}
            </h2>

            {filteredSubjects.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-50">
                  <Book className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="mt-3 text-sm font-medium text-gray-900">No courses found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  {activeTab === "enrolled" && "You haven't enrolled in any courses yet."}
                  {activeTab === "in-progress" && "You don't have any courses in progress."}
                  {activeTab === "completed" && "You haven't completed any courses yet."}
                </p>
                <div className="mt-6">
                  <Button onClick={() => setActiveTab("all")}>
                    Browse All Courses
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubjects.map((subject) => (
                  <CourseCard
                    key={subject.id}
                    subject={subject}
                    showContinue={subject.progress > 0}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface CourseCardProps {
  subject: Subject & { progress: number };
  showContinue?: boolean;
}

function CourseCard({ subject, showContinue = false }: CourseCardProps) {
  const difficulty = "Intermediate";
  const studentCount = 3400;

  const formatStudentCount = (count: number) => {
    if (count > 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count.toString();
  };

  return (
    <Link href={`/courses/${subject.id}`} className="block h-full group">
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col border-gray-200/80">
        <CardHeader className="pb-3" style={{ backgroundColor: (subject.color || "#4f46e5") + "15" }}>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div
                className="p-2.5 rounded-xl shadow-sm text-white"
                style={{ backgroundColor: subject.color || "#4f46e5" }}
              >
                <Book className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg group-hover:text-indigo-600 transition-colors">
                {subject.name}
              </CardTitle>
            </div>

            {subject.progress > 0 && (
              <Badge
                variant="outline"
                className={
                  subject.progress === 100
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                }
              >
                {subject.progress === 100 ? "Completed" : `${subject.progress}% Complete`}
              </Badge>
            )}
          </div>
          <CardDescription className="pt-2">
            <div className="mb-1.5 flex justify-between text-xs font-medium">
              <span className="text-gray-500">Progress</span>
              <span className="text-gray-800">{subject.progress}%</span>
            </div>
            <Progress value={subject.progress} className="h-2" />
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 flex-1">
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            Master the fundamentals of {subject.name} through interactive lessons, hands-on projects, and personalized guidance.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              {difficulty}
            </Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              12 weeks
            </Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              24 lessons
            </Badge>
          </div>
          <div className="space-y-2 text-xs text-gray-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="mr-1.5 h-3.5 w-3.5" />
                <span>3 hours/week</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-1.5 h-3.5 w-3.5" />
                <span>{formatStudentCount(studentCount)} students</span>
              </div>
            </div>
            <div className="flex items-center">
              <Award className="mr-1.5 h-3.5 w-3.5" />
              <span>4 achievements available</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50/70 px-6 py-3">
          <Button
            variant={showContinue ? "default" : "secondary"}
            className="w-full justify-between"
          >
            {showContinue ? "Continue Learning" : "View Course"}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
