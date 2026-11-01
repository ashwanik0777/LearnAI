'use client';

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Activity, Loader2 } from "lucide-react";

import { QuickStats } from "@/components/dashboard/QuickStats";
import ProgressChart from "@/components/dashboard/ProgressChart";
import { AiRecommendations } from "@/components/dashboard/AiRecommendations";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TodayStudyPlan } from "@/components/dashboard/TodayStudyPlan";
import { SubjectPerformance } from "@/components/dashboard/SubjectPerformance";
import { UpcomingAssessments } from "@/components/dashboard/UpcomingAssessments";

import type { DashboardData } from "@/lib/types";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();

  const { data: dashboardData, isLoading, error } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
    enabled: !!user,
  });

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-3" />
          <p className="text-sm font-medium text-gray-500">Loading your learning workspace...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-red-100 max-w-md">
          <h2 className="text-lg font-semibold text-red-600 mb-2">Error loading dashboard</h2>
          <p className="text-sm text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (!user || !dashboardData) {
    return null;
  }

  const subjectProgress = dashboardData.subjects?.map((subject) => ({
    name: subject.name,
    progress: subject.progress,
    color: subject.color,
  })) || [];

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back, {user.fullName.split(" ")[0]}!
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Here&apos;s an overview of your learning progress and recommendations.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link href="/planner">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add New Goal
            </Button>
          </Link>
          <Link href="/analytics">
            <Button variant="outline">
              <Activity className="mr-2 h-4 w-4" /> View Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      {dashboardData.stats && <QuickStats stats={dashboardData.stats} />}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <ProgressChart
            weeklyData={dashboardData.weeklyData}
            subjectProgress={subjectProgress}
          />

          <AiRecommendations recommendations={dashboardData.recommendations || []} />

          <RecentActivity activities={dashboardData.activities || []} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <TodayStudyPlan sessions={dashboardData.studyPlan || []} />

          <SubjectPerformance subjects={dashboardData.subjects || []} />

          <UpcomingAssessments assessments={dashboardData.assessments || []} />
        </div>
      </div>
    </div>
  );
}
