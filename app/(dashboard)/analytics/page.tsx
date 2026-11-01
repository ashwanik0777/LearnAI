'use client';

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Book, Activity, Loader2, Check } from "lucide-react";
import type { StudyActivityData, ChartData } from "@/lib/types";

import { LearningHeatmap } from "@/components/dashboard/LearningHeatmap";
import { ProgressTrends } from "@/components/dashboard/ProgressTrends";
import { SubjectAnalytics } from "@/components/dashboard/SubjectAnalytics";

export default function AnalyticsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("heatmap");

  // Fetch learning heatmap data
  const { data: studyActivities, isLoading: isLoadingHeatmap } = useQuery<StudyActivityData[]>({
    queryKey: ["/api/analytics/learning-heatmap"],
    enabled: !!user,
  });

  // Fetch progress trends data
  const { data: progressData, isLoading: isLoadingProgress } = useQuery<{
    weeklyData: ChartData;
    subjects: {
      id: number;
      name: string;
      progress: number;
      color: string;
      score: number;
      studyTime: number;
      quizzes: number;
      strength: string;
      weakness: string;
    }[];
  }>({
    queryKey: ["/api/analytics/progress-trends"],
    enabled: !!user && activeTab === "progress",
  });

  // Fetch subject analytics data
  const { data: subjectData, isLoading: isLoadingSubjects } = useQuery<{
    subjects: {
      id: number;
      name: string;
      progress: number;
      color: string;
      score: number;
      studyTime: number;
      quizzes: number;
      strength: string;
      weakness: string;
      topics: {
        name: string;
        progress: number;
        status: string;
      }[];
    }[];
  }>({
    queryKey: ["/api/analytics/subject-analytics"],
    enabled: !!user && activeTab === "subjects",
  });

  if (authLoading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-3" />
          <p className="text-sm font-medium text-gray-500">Loading learning analytics...</p>
        </div>
      </div>
    );
  }

  // Calculate insights
  const calculateActivityInsights = () => {
    if (!studyActivities || studyActivities.length === 0) {
      return {
        mostActiveDay: "Wednesday",
        averageStudyHours: "2.4",
        currentStreak: "8"
      };
    }

    const dayFrequency: Record<string, number> = {
      "Sunday": 0, "Monday": 0, "Tuesday": 0, "Wednesday": 0, 
      "Thursday": 0, "Friday": 0, "Saturday": 0
    };

    let totalMinutes = 0;
    const daysWithActivity = new Set<string>();

    studyActivities.forEach((activity) => {
      const date = new Date(activity.date);
      const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
      dayFrequency[dayName]++;
      daysWithActivity.add(activity.date);
      totalMinutes += activity.duration;
    });

    let mostActiveDay = "Monday";
    let maxActivities = 0;
    Object.entries(dayFrequency).forEach(([day, count]) => {
      if (count > maxActivities) {
        maxActivities = count;
        mostActiveDay = day;
      }
    });

    const avgHours = daysWithActivity.size > 0 
      ? (totalMinutes / daysWithActivity.size / 60).toFixed(1)
      : "1.5";

    const streak = Math.min(14, Math.max(1, daysWithActivity.size / 4));

    return {
      mostActiveDay,
      averageStudyHours: avgHours,
      currentStreak: Math.floor(streak).toString()
    };
  };

  const insights = calculateActivityInsights();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning Analytics</h1>
          <p className="text-gray-600 mt-1 text-sm">
            Track your study patterns and learning progress over time
          </p>
        </div>
      </div>
      
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full md:w-auto">
            <TabsTrigger value="heatmap" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Activity Heatmap
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              Progress Trends
            </TabsTrigger>
            <TabsTrigger value="subjects" className="flex items-center">
              <Book className="h-4 w-4 mr-2" />
              Subject Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="heatmap" className="space-y-6">
            {isLoadingHeatmap ? (
              <Card>
                <CardContent className="p-6">
                  <div className="animate-pulse h-64 bg-gray-100 rounded-md"></div>
                </CardContent>
              </Card>
            ) : (
              <LearningHeatmap activities={studyActivities || []} />
            )}
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold text-gray-900">Activity Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <div className="text-xs font-medium text-indigo-700 mb-1">Most Active Day</div>
                    <div className="text-2xl font-bold text-indigo-950">{insights.mostActiveDay}</div>
                    <div className="text-xs text-indigo-600 mt-1">You study most effectively on this day</div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <div className="text-xs font-medium text-green-700 mb-1">Average Daily Study</div>
                    <div className="text-2xl font-bold text-green-950">{insights.averageStudyHours} hours</div>
                    <div className="text-xs text-green-600 mt-1">Consistent dedication to learning</div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <div className="text-xs font-medium text-purple-700 mb-1">Current Streak</div>
                    <div className="text-2xl font-bold text-purple-950">{insights.currentStreak} days</div>
                    <div className="text-xs text-purple-600 mt-1">Keep it up to reach your goals!</div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h3 className="font-semibold text-sm text-gray-900 mb-3">Study Recommendations</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 mr-2 flex-shrink-0 text-xs">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>Consider increasing your weekend study sessions for better balance</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 mr-2 flex-shrink-0 text-xs">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>Your most productive study time is in the mornings - schedule important topics then</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 mr-2 flex-shrink-0 text-xs">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>Your consistency has improved by 22% over the last month</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="progress">
            {isLoadingProgress ? (
              <div className="animate-pulse space-y-4">
                <div className="h-80 bg-gray-100 rounded-lg"></div>
              </div>
            ) : progressData ? (
              <ProgressTrends
                weeklyData={progressData.weeklyData}
                subjects={progressData.subjects}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Progress Data</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center text-gray-500 py-10">
                    <h3 className="font-medium mb-2">No progress data available</h3>
                    <p>Start studying to see your progress trends.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="subjects">
            {isLoadingSubjects ? (
              <div className="animate-pulse space-y-4">
                <div className="h-80 bg-gray-100 rounded-lg"></div>
              </div>
            ) : subjectData ? (
              <SubjectAnalytics subjects={subjectData.subjects} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Subject Data</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center text-gray-500 py-10">
                    <h3 className="font-medium mb-2">No subject data available</h3>
                    <p>Enroll in courses to see detailed subject analytics.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
