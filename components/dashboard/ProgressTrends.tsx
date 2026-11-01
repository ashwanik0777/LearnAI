'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartData } from '@/lib/types';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CalendarIcon, TrendingUp, Clock, Book } from 'lucide-react';

interface ProgressTrendsProps {
  weeklyData: ChartData;
  subjects: {
    id: number;
    name: string;
    progress: number;
    color: string;
  }[];
}

export function ProgressTrends({ weeklyData, subjects }: ProgressTrendsProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [selectedMetric, setSelectedMetric] = useState<'progress' | 'studyTime' | 'quizScores'>('progress');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Generate sample progress data based on weekly data
  const generateProgressData = () => {
    // Base it on the provided weekly data
    if (selectedTimeframe === 'weekly') {
      return weeklyData;
    } else if (selectedTimeframe === 'monthly') {
      // Transform data for monthly view
      const monthlyData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].slice(0, 6),
        datasets: [
          {
            label: 'Overall Progress',
            data: [65, 70, 74, 81, 85, 90],
            borderColor: '#4f46e5',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
          }
        ]
      };
      return monthlyData;
    } else {
      // Transform data for yearly view
      const yearlyData = {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [
          {
            label: 'Overall Progress',
            data: [30, 45, 60, 75, 85, 90],
            borderColor: '#4f46e5',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
          }
        ]
      };
      return yearlyData;
    }
  };

  // Format data for Recharts (compatible with ChartData format)
  const formatDataForRecharts = (data: ChartData) => {
    return data.labels.map((label, index) => {
      const item: any = { name: label };
      
      data.datasets.forEach(dataset => {
        item[dataset.label] = dataset.data[index];
      });
      
      return item;
    });
  };

  // Get chart data based on selected metric
  const getChartData = () => {
    const baseData = generateProgressData();
    
    if (selectedMetric === 'studyTime') {
      return {
        ...baseData,
        datasets: [
          {
            label: 'Study Hours',
            data: baseData.datasets[0].data.map(val => Math.round(val / 10)),
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
          }
        ]
      };
    } else if (selectedMetric === 'quizScores') {
      return {
        ...baseData,
        datasets: [
          {
            label: 'Quiz Scores',
            data: baseData.datasets[0].data.map(val => Math.min(100, val + 5)),
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
          }
        ]
      };
    }
    
    return baseData;
  };

  const chartData = getChartData();
  const formattedData = formatDataForRecharts(chartData);

  // Get line color based on selected metric
  const getLineColor = () => {
    switch (selectedMetric) {
      case 'progress': return '#4f46e5';
      case 'studyTime': return '#10b981';
      case 'quizScores': return '#f59e0b';
      default: return '#4f46e5';
    }
  };

  // Get bar colors for subject performance
  const getBarColors = () => {
    return subjects.map(subject => subject.color || '#4f46e5');
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Progress Trends
        </CardTitle>
        <div className="flex space-x-2">
          <Select
            value={selectedMetric}
            onValueChange={(value: 'progress' | 'studyTime' | 'quizScores') => setSelectedMetric(value)}
          >
            <SelectTrigger className="h-8 w-[130px]">
              <SelectValue placeholder="Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="studyTime">Study Time</SelectItem>
              <SelectItem value="quizScores">Quiz Scores</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={selectedSubject}
            onValueChange={setSelectedSubject}
          >
            <SelectTrigger className="h-8 w-[130px]">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject.id} value={subject.name}>{subject.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={selectedTimeframe} 
          onValueChange={(value: string) => setSelectedTimeframe(value as 'weekly' | 'monthly' | 'yearly')}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="w-full">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={formattedData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={chartData.datasets[0].label} 
                    stroke={getLineColor()} 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="w-full">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={formattedData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={chartData.datasets[0].label} 
                    stroke={getLineColor()} 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="yearly" className="w-full">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={formattedData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={chartData.datasets[0].label} 
                    stroke={getLineColor()} 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Subject Performance</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={subjects.map(subject => ({
                  name: subject.name,
                  progress: subject.progress
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="progress" fill={getLineColor()} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
              <div className="font-medium mb-1">Overall Growth</div>
            </div>
            <div className="text-2xl font-bold">+22%</div>
            <div className="text-sm text-gray-600 mt-1">From previous period</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-green-500 mr-2" />
              <div className="font-medium mb-1">Study Consistency</div>
            </div>
            <div className="text-2xl font-bold">87%</div>
            <div className="text-sm text-gray-600 mt-1">Weekly goal achievement</div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-center">
              <Book className="h-5 w-5 text-amber-500 mr-2" />
              <div className="font-medium mb-1">Most Improved</div>
            </div>
            <div className="text-2xl font-bold">{subjects[0]?.name || "Mathematics"}</div>
            <div className="text-sm text-gray-600 mt-1">+30% improvement</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}