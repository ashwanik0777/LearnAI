'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Book, Clock, Award, BrainCircuit, BookOpen, Target, TrendingUp, Layers, Check } from 'lucide-react';
import { Subject } from '@/lib/db/schema';

interface SubjectAnalyticsProps {
  subjects: {
    id: number;
    name: string;
    progress: number;
    color: string;
    score?: number;
    studyTime?: number;
    quizzes?: number;
    strength?: string;
    weakness?: string;
  }[];
}

export function SubjectAnalytics({ subjects }: SubjectAnalyticsProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>(subjects[0]?.name || '');
  const [selectedView, setSelectedView] = useState<'overview' | 'details' | 'recommendations'>('overview');

  // Get the selected subject data
  const currentSubject = subjects.find(s => s.name === selectedSubject) || subjects[0];

  // Format data for the pie chart
  const pieData = subjects.map(subject => ({
    name: subject.name,
    value: subject.progress,
    color: subject.color
  }));

  // Format data for comparison chart
  const comparisonData = [
    { name: 'Quiz Scores', current: currentSubject?.score || 75, average: 68 },
    { name: 'Study Time', current: currentSubject?.studyTime || 14, average: 12 },
    { name: 'Completed Quizzes', current: currentSubject?.quizzes || 8, average: 6 },
  ];

  // Mock topic data for the selected subject
  const getTopicsData = () => {
    const topics = [
      { name: 'Algebra', progress: 85, status: 'mastered' },
      { name: 'Calculus', progress: 70, status: 'in-progress' },
      { name: 'Geometry', progress: 60, status: 'in-progress' },
      { name: 'Statistics', progress: 45, status: 'struggling' },
      { name: 'Trigonometry', progress: 30, status: 'new' },
    ];

    const physicsTopics = [
      { name: 'Mechanics', progress: 75, status: 'in-progress' },
      { name: 'Thermodynamics', progress: 50, status: 'in-progress' },
      { name: 'Optics', progress: 65, status: 'in-progress' },
      { name: 'Electromagnetism', progress: 40, status: 'struggling' },
      { name: 'Quantum Physics', progress: 20, status: 'new' },
    ];

    const chemistryTopics = [
      { name: 'Organic Chemistry', progress: 80, status: 'mastered' },
      { name: 'Inorganic Chemistry', progress: 65, status: 'in-progress' },
      { name: 'Physical Chemistry', progress: 55, status: 'in-progress' },
      { name: 'Biochemistry', progress: 35, status: 'struggling' },
      { name: 'Analytical Chemistry', progress: 25, status: 'new' },
    ];

    const bioTopics = [
      { name: 'Cell Biology', progress: 70, status: 'in-progress' },
      { name: 'Genetics', progress: 60, status: 'in-progress' },
      { name: 'Physiology', progress: 80, status: 'mastered' },
      { name: 'Ecology', progress: 45, status: 'struggling' },
      { name: 'Evolution', progress: 55, status: 'in-progress' },
    ];

    if (currentSubject?.name === 'Physics') {
      return physicsTopics;
    } else if (currentSubject?.name === 'Chemistry') {
      return chemistryTopics;
    } else if (currentSubject?.name === 'Biology') {
      return bioTopics;
    }

    return topics;
  };

  const topicsData = getTopicsData();

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'mastered': return 'bg-green-100 text-green-600';
      case 'in-progress': return 'bg-blue-100 text-blue-600';
      case 'struggling': return 'bg-amber-100 text-amber-600';
      case 'new': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center">
          <Book className="mr-2 h-5 w-5" />
          Subject Analytics
        </CardTitle>
        <Select
          value={selectedSubject}
          onValueChange={setSelectedSubject}
        >
          <SelectTrigger className="h-8 w-[180px]">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map(subject => (
              <SelectItem key={subject.id} value={subject.name}>{subject.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <Tabs value={selectedView} onValueChange={(v) => setSelectedView(v as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Progress Distribution</h3>
                <div className="h-[280px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Subject Comparison</h3>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={comparisonData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="current" fill="#4f46e5" name={`Your ${currentSubject?.name}`} />
                      <Bar dataKey="average" fill="#94a3b8" name="Class Average" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">{currentSubject?.name} Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-blue-500 mr-2" />
                    <div className="font-medium mb-1">Mastery Level</div>
                  </div>
                  <div className="text-2xl font-bold">{currentSubject?.progress || 0}%</div>
                  <div className="text-sm text-gray-600 mt-1">Overall progress</div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="flex items-center">
                    <Target className="h-5 w-5 text-green-500 mr-2" />
                    <div className="font-medium mb-1">Strength</div>
                  </div>
                  <div className="text-lg font-bold">{currentSubject?.strength || topicsData[0]?.name}</div>
                  <div className="text-sm text-gray-600 mt-1">Highest performance area</div>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-amber-500 mr-2" />
                    <div className="font-medium mb-1">Focus Needed</div>
                  </div>
                  <div className="text-lg font-bold">{currentSubject?.weakness || topicsData[topicsData.length - 1]?.name}</div>
                  <div className="text-sm text-gray-600 mt-1">Area for improvement</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Topic Breakdown</h3>
                <div className="space-y-3">
                  {topicsData.map((topic, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{topic.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(topic.status)}`}>
                          {topic.status.charAt(0).toUpperCase() + topic.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={topic.progress} className="flex-1" />
                        <span className="text-sm font-medium">{topic.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="text-lg font-semibold mb-3">Learning Patterns</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border">
                    <div className="flex items-center text-blue-600 mb-2">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="font-medium">Best Study Time</span>
                    </div>
                    <div className="text-sm">
                      You perform best when studying <span className="font-medium">morning hours (8AM-11AM)</span>. Consider scheduling important topics during this time.
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="flex items-center text-green-600 mb-2">
                      <Layers className="h-4 w-4 mr-2" />
                      <span className="font-medium">Session Effectiveness</span>
                    </div>
                    <div className="text-sm">
                      Your optimal study session length is <span className="font-medium">45-60 minutes</span> with short breaks, showing 30% higher retention.
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="flex items-center text-amber-600 mb-2">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      <span className="font-medium">Progress Pattern</span>
                    </div>
                    <div className="text-sm">
                      You improve most quickly with <span className="font-medium">practice exercises</span> compared to passive reading or video content.
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="flex items-center text-purple-600 mb-2">
                      <BrainCircuit className="h-4 w-4 mr-2" />
                      <span className="font-medium">Retention Factor</span>
                    </div>
                    <div className="text-sm">
                      Your retention is highest when using <span className="font-medium">visual learning tools</span> and interactive exercises.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-semibold flex items-center text-blue-700 mb-2">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Study Recommendations
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-2 flex-shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Focus on <strong>{topicsData.filter(t => t.status === 'struggling')[0]?.name || 'Statistics'}</strong> which needs the most improvement</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-2 flex-shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Schedule a 45-minute focused study session on key concepts in the morning</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-2 flex-shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Use practice quizzes more frequently to improve retention of formulas</span>
                  </li>
                </ul>
                <Button className="mt-3 bg-blue-600 hover:bg-blue-700">Generate Study Plan</Button>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-semibold flex items-center text-green-700 mb-2">
                  <Target className="h-5 w-5 mr-2" />
                  Resource Recommendations
                </h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <div className="font-medium">Interactive {topicsData[3]?.name || 'Statistics'} Tutorial</div>
                    <div className="text-sm text-gray-600 mt-1">Hands-on visualization of concepts with practice problems</div>
                    <Button variant="outline" size="sm" className="mt-2">View Resource</Button>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="font-medium">{topicsData[1]?.name || 'Calculus'} Problem Solving Workshop</div>
                    <div className="text-sm text-gray-600 mt-1">Step-by-step guide to complex problem solving</div>
                    <Button variant="outline" size="sm" className="mt-2">View Resource</Button>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="font-medium">Test Preparation Guide</div>
                    <div className="text-sm text-gray-600 mt-1">Comprehensive guide with practice questions</div>
                    <Button variant="outline" size="sm" className="mt-2">View Resource</Button>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <h3 className="font-semibold flex items-center text-purple-700 mb-2">
                  <BrainCircuit className="h-5 w-5 mr-2" />
                  AI-Powered Personalization
                </h3>
                <p className="text-sm mb-3">Get AI recommendations tailored specifically to your learning style and challenges in {currentSubject?.name}.</p>
                <Button className="bg-purple-600 hover:bg-purple-700">Generate AI Recommendations</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}