'use client';

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart2, TrendingUp, Calendar, Download, Filter, Loader2 } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import type { DashboardData } from "@/lib/types";

export default function ProgressAnalyticsPage() {
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
          <p className="text-sm font-medium text-gray-500">Loading progress analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-red-100 max-w-md">
          <h1 className="text-lg font-semibold text-red-600 mb-2">Error loading analytics</h1>
          <p className="text-sm text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  const weeklyData = dashboardData?.weeklyData || { labels: [], datasets: [] };
  const subjectProgress = dashboardData?.subjects || [];

  const weeklyChartData = weeklyData.labels.map((label, index) => {
    const dataPoint: any = { name: label };
    weeklyData.datasets.forEach((dataset) => {
      dataPoint[dataset.label] = dataset.data[index];
    });
    return dataPoint;
  });

  const subjectPieData = subjectProgress.map((subject) => ({
    name: subject.name,
    value: subject.progress,
    color: subject.color,
  }));

  const weeklyDistributionData = [
    { day: 'Mon', study: 2.5, quiz: 0.5, practice: 1.0 },
    { day: 'Tue', study: 1.5, quiz: 1.0, practice: 0.5 },
    { day: 'Wed', study: 3.0, quiz: 0.0, practice: 1.5 },
    { day: 'Thu', study: 2.0, quiz: 1.0, practice: 1.0 },
    { day: 'Fri', study: 1.0, quiz: 2.0, practice: 0.5 },
    { day: 'Sat', study: 3.5, quiz: 0.5, practice: 2.0 },
    { day: 'Sun', study: 1.5, quiz: 0.0, practice: 0.5 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Progress Analytics</h1>
            <p className="mt-1 text-sm text-gray-600">Track your learning journey with detailed statistical breakdowns</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 w-full sm:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">By Subject</TabsTrigger>
          <TabsTrigger value="time">Time Distribution</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Progress Chart */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base flex items-center font-semibold text-gray-900">
                  <TrendingUp className="mr-2 h-5 w-5 text-indigo-600" />
                  Weekly Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {weeklyData.datasets.map((dataset, index) => (
                        <Area 
                          key={index}
                          type="monotone" 
                          dataKey={dataset.label} 
                          stroke={dataset.borderColor} 
                          fill={dataset.backgroundColor} 
                          stackId="1"
                        />
                      ))}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Subject Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center font-semibold text-gray-900">
                  <BarChart2 className="mr-2 h-5 w-5 text-indigo-600" />
                  Subject Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={subjectPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {subjectPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Distribution */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base flex items-center font-semibold text-gray-900">
                <Calendar className="mr-2 h-5 w-5 text-indigo-600" />
                Weekly Activity Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="study" name="Study Time" stackId="a" fill="#6366f1" />
                    <Bar dataKey="quiz" name="Quizzes" stackId="a" fill="#10b981" />
                    <Bar dataKey="practice" name="Practice" stackId="a" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Subject Tab */}
        <TabsContent value="subjects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjectProgress.map((subject) => (
              <Card key={subject.id}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center font-semibold" style={{ color: subject.color }}>
                    {subject.name} Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={weeklyChartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey={subject.name}
                          stroke={subject.color}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Time Distribution Tab */}
        <TabsContent value="time">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center font-semibold text-gray-900">
                <Calendar className="mr-2 h-5 w-5 text-indigo-600" />
                Time Distribution by Activity Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyDistributionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="study" name="Study" fill="#6366f1" />
                    <Bar dataKey="quiz" name="Quiz" fill="#10b981" />
                    <Bar dataKey="practice" name="Practice" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Trends Tab */}
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center font-semibold text-gray-900">
                <TrendingUp className="mr-2 h-5 w-5 text-indigo-600" />
                Overall Learning Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weeklyChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {weeklyData.datasets.map((dataset, index) => (
                      <Line
                        key={index}
                        type="monotone"
                        dataKey={dataset.label}
                        stroke={dataset.borderColor}
                        activeDot={{ r: 8 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
