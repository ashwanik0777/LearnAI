'use client';

import React, { useState } from 'react';
import { format, subDays, isSameDay, addDays, parseISO } from 'date-fns';
import { Calendar, Clock, BookOpen, Award, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define the types
interface StudyActivity {
  date: string;
  subject: string;
  intensity: number; // 1-5 scale
  duration: number; // in minutes
  progress: number; // percentage completion of a study goal
  topics: string[];
}

interface LearningHeatmapProps {
  activities: StudyActivity[];
}

export function LearningHeatmap({ activities }: LearningHeatmapProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year'>('month');
  const [selectedView, setSelectedView] = useState<'intensity' | 'progress'>('intensity');
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [filterSubject, setFilterSubject] = useState<string>('all');

  const today = new Date();
  const daysToShow = selectedTimeframe === 'week' ? 7 : selectedTimeframe === 'month' ? 30 : 365;
  
  // Generate days array for the heatmap
  const generateDaysArray = () => {
    const days = [];
    for (let i = daysToShow - 1; i >= 0; i--) {
      days.push(subDays(today, i));
    }
    return days;
  };
  
  const days = generateDaysArray();
  
  // Helper to get date string in ISO format
  const getDateString = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
  };
  
  // Filter activities based on selected subject
  const filteredActivities = filterSubject === 'all' 
    ? activities 
    : activities.filter(activity => activity.subject === filterSubject);
  
  // Get all unique subjects for filter
  const subjects = Array.from(new Set(activities.map(activity => activity.subject)));
  
  // Get activities for a specific day
  const getActivitiesForDay = (date: Date): StudyActivity[] => {
    return filteredActivities.filter(activity => {
      const activityDate = parseISO(activity.date);
      return isSameDay(activityDate, date);
    });
  };
  
  // Calculate the intensity level for a specific day
  const getDayIntensity = (date: Date): number => {
    const dayActivities = getActivitiesForDay(date);
    
    if (dayActivities.length === 0) return 0;
    
    if (selectedView === 'intensity') {
      // Calculate average intensity (1-5)
      return Math.round(
        dayActivities.reduce((sum, activity) => sum + activity.intensity, 0) / dayActivities.length
      );
    } else {
      // Calculate average progress (0-100%)
      return Math.round(
        dayActivities.reduce((sum, activity) => sum + activity.progress, 0) / dayActivities.length
      );
    }
  };
  
  // Get color based on intensity/progress level
  const getColorForLevel = (level: number): string => {
    if (selectedView === 'intensity') {
      // Intensity color scale (1-5)
      switch (level) {
        case 0: return 'bg-gray-100';
        case 1: return 'bg-green-100';
        case 2: return 'bg-green-200';
        case 3: return 'bg-green-300';
        case 4: return 'bg-green-400';
        case 5: return 'bg-green-500';
        default: return 'bg-gray-100';
      }
    } else {
      // Progress color scale (0-100%)
      if (level === 0) return 'bg-gray-100';
      if (level < 20) return 'bg-blue-100';
      if (level < 40) return 'bg-blue-200';
      if (level < 60) return 'bg-blue-300';
      if (level < 80) return 'bg-blue-400';
      return 'bg-blue-500';
    }
  };
  
  // Group days by weeks for easier rendering
  const groupDaysByWeeks = () => {
    const weeks = [];
    let currentWeek = [];
    
    for (const day of days) {
      currentWeek.push(day);
      
      // Start a new week on Sundays or at the end
      if (day.getDay() === 0 || day === days[days.length - 1]) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }
    
    return weeks;
  };
  
  const weeks = groupDaysByWeeks();
  
  // Render days as month view
  const renderMonthView = () => {
    return (
      <div className="grid grid-cols-7 gap-1 mt-2">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
          <div key={day} className="text-xs text-center font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {/* Calendar cells */}
        {weeks.map((week, weekIndex) => (
          <React.Fragment key={`week-${weekIndex}`}>
            {Array(7).fill(null).map((_, dayIndex) => {
              const day = week.find(d => d.getDay() === dayIndex);
              
              if (!day) {
                return <div key={`empty-${dayIndex}`} className="aspect-square" />;
              }
              
              const intensity = getDayIntensity(day);
              const isToday = isSameDay(day, today);
              const isSelected = selectedDay ? isSameDay(day, selectedDay) : false;
              
              return (
                <TooltipProvider key={getDateString(day)}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div 
                        className={`
                          aspect-square rounded-md flex items-center justify-center text-xs
                          ${getColorForLevel(intensity)}
                          ${isToday ? 'ring-2 ring-primary' : ''}
                          ${isSelected ? 'ring-2 ring-primary-500' : ''}
                          ${intensity > 0 ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}
                        `}
                        onClick={() => {
                          if (intensity > 0) {
                            setSelectedDay(isSelected ? null : day);
                          }
                        }}
                      >
                        {format(day, 'd')}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-xs">
                        <div className="font-medium">{format(day, 'MMM d, yyyy')}</div>
                        {intensity > 0 ? (
                          <div>
                            {selectedView === 'intensity' 
                              ? `Study Intensity: ${intensity}/5` 
                              : `Progress: ${intensity}%`
                            }
                          </div>
                        ) : (
                          <div>No study activity</div>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    );
  };
  
  // Render day details when a day is selected
  const renderDayDetails = () => {
    if (!selectedDay) return null;
    
    const dayActivities = getActivitiesForDay(selectedDay);
    
    if (dayActivities.length === 0) return null;
    
    const totalDuration = dayActivities.reduce((sum, a) => sum + a.duration, 0);
    const avgProgress = Math.round(
      dayActivities.reduce((sum, a) => sum + a.progress, 0) / dayActivities.length
    );
    
    return (
      <div className="mt-4 p-4 rounded-lg border bg-gray-50">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">{format(selectedDay, 'MMMM d, yyyy')}</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 text-xs"
            onClick={() => setSelectedDay(null)}
          >
            Close
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="flex flex-col items-center justify-center p-2 bg-white rounded border">
            <Clock className="h-4 w-4 text-gray-500 mb-1" />
            <span className="text-xs text-gray-500">Duration</span>
            <span className="font-medium">{totalDuration} min</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-white rounded border">
            <BookOpen className="h-4 w-4 text-gray-500 mb-1" />
            <span className="text-xs text-gray-500">Activities</span>
            <span className="font-medium">{dayActivities.length}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-white rounded border">
            <Award className="h-4 w-4 text-gray-500 mb-1" />
            <span className="text-xs text-gray-500">Progress</span>
            <span className="font-medium">{avgProgress}%</span>
          </div>
        </div>
        
        <h4 className="text-sm font-medium mb-2">Study Sessions</h4>
        <div className="space-y-2">
          {dayActivities.map((activity, i) => (
            <div 
              key={i} 
              className="p-2 bg-white rounded border text-sm"
            >
              <div className="flex justify-between">
                <span className="font-medium">{activity.subject}</span>
                <span className="text-gray-500">{activity.duration} min</span>
              </div>
              <div className="mt-1 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full" 
                    style={{ width: `${activity.progress}%` }}
                  />
                </div>
                <span className="ml-2 text-xs">{activity.progress}%</span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {activity.topics.map((topic, j) => (
                  <Badge key={j} variant="outline" className="text-xs py-0">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-lg">
            <Calendar className="h-5 w-5 mr-2" />
            Learning Activity Heatmap
          </CardTitle>
          <div className="flex space-x-2">
            <Select
              value={selectedView}
              onValueChange={(value: 'intensity' | 'progress') => setSelectedView(value)}
            >
              <SelectTrigger className="h-8 w-[120px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="intensity">Intensity</SelectItem>
                <SelectItem value="progress">Progress</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={filterSubject}
              onValueChange={(value) => setFilterSubject(value)}
            >
              <SelectTrigger className="h-8 w-[120px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={selectedTimeframe} 
          onValueChange={(v: string) => setSelectedTimeframe(v as 'week' | 'month' | 'year')}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
          <TabsContent value="week">
            {renderMonthView()}
          </TabsContent>
          <TabsContent value="month">
            {renderMonthView()}
          </TabsContent>
          <TabsContent value="year">
            {renderMonthView()}
          </TabsContent>
        </Tabs>
        
        {/* Legend for the heatmap */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-gray-600">
            <span>Less</span>
            {[0, 1, 2, 3, 4, 5].map(level => (
              <div 
                key={level} 
                className={`w-4 h-4 ${getColorForLevel(level)} rounded`}
              />
            ))}
            <span>More</span>
          </div>
          <div className="text-xs text-gray-500">
            {selectedView === 'intensity' ? 'Study Intensity' : 'Learning Progress'}
          </div>
        </div>
        
        {/* Selected day details */}
        {renderDayDetails()}
      </CardContent>
    </Card>
  );
}