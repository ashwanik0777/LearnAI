'use client';

import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  PieChart, 
  ArrowUp 
} from "lucide-react";
import { DashboardStats } from "@/lib/types";

interface QuickStatsProps {
  stats: DashboardStats;
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="border-gray-100">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Courses in Progress</p>
              <h3 className="text-2xl font-bold mt-1">{stats.coursesInProgress}</h3>
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <BookOpen className="text-primary-600 h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-xs font-medium text-green-600 flex items-center">
                <ArrowUp className="mr-1 text-xs h-3 w-3" /> 12% 
              </span>
              <span className="text-xs text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-gray-100">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Weekly Study Hours</p>
              <h3 className="text-2xl font-bold mt-1">{stats.weeklyStudyHours}</h3>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <Clock className="text-emerald-600 h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-xs font-medium text-green-600 flex items-center">
                <ArrowUp className="mr-1 text-xs h-3 w-3" /> 8% 
              </span>
              <span className="text-xs text-gray-500 ml-2">from last week</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-gray-100">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Topics Mastered</p>
              <h3 className="text-2xl font-bold mt-1">{stats.topicsMastered}</h3>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <Trophy className="text-amber-600 h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-xs font-medium text-green-600 flex items-center">
                <ArrowUp className="mr-1 text-xs h-3 w-3" /> 18% 
              </span>
              <span className="text-xs text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-gray-100">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overall Progress</p>
              <h3 className="text-2xl font-bold mt-1">{stats.overallProgress}%</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <PieChart className="text-blue-600 h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-xs font-medium text-green-600 flex items-center">
                <ArrowUp className="mr-1 text-xs h-3 w-3" /> 5% 
              </span>
              <span className="text-xs text-gray-500 ml-2">from last week</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default QuickStats;
