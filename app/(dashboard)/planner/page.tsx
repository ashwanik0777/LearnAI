'use client';

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { Calendar as CalendarIcon, PlusCircle, Clock, AlertCircle, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { DashboardData, StudySession } from "@/lib/types";

export default function PlannerPage() {
  const { user, loading: authLoading } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: dashboardData, isLoading, error } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
    enabled: !!user,
  });

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-3" />
          <p className="text-sm font-medium text-gray-500">Loading your study calendar...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-red-100 max-w-md">
          <h1 className="text-lg font-semibold text-red-600 mb-2">Error loading planner</h1>
          <p className="text-sm text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  const subjects = dashboardData?.subjects || [];
  const studyPlan: StudySession[] = dashboardData?.studyPlan || [];

  const getTimeSlots = () => {
    const slots = [];
    for (let i = 8; i <= 20; i++) {
      slots.push(`${i}:00`);
      slots.push(`${i}:30`);
    }
    return slots;
  };

  const timeSlots = getTimeSlots();

  const getSessionForTimeSlot = (timeSlot: string) => {
    return studyPlan.find((session) => session.startTime === timeSlot);
  };

  const formatDate = (date: Date) => {
    return format(date, 'EEEE, MMMM d, yyyy');
  };

  const generateWeekDays = () => {
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const weekDays = [];
    
    for (let i = 0; i < 7; i++) {
      const day = addDays(startDate, i);
      weekDays.push({
        date: day,
        dayName: format(day, 'EEE'),
        dayNumber: format(day, 'd'),
        isToday: isSameDay(day, new Date())
      });
    }
    
    return weekDays;
  };

  const weekDays = generateWeekDays();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Study Planner</h1>
            <p className="mt-1 text-sm text-gray-600">Plan and optimize your daily and weekly study routines</p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[220px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Study Session
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Study Session</DialogTitle>
                  <DialogDescription>
                    Create a new study session for your schedule.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right text-xs">
                      Subject
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.name}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="topic" className="text-right text-xs">
                      Topic
                    </Label>
                    <Input
                      id="topic"
                      placeholder="e.g., Differential Equations"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="start-time" className="text-right text-xs">
                      Start Time
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="duration" className="text-right text-xs">
                      Duration
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priority" className="text-right text-xs">
                      Priority
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right text-xs">
                      Notes
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Objectives and chapters to cover"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={() => setDialogOpen(false)}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Session
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{formatDate(selectedDate)}</CardTitle>
            <CardDescription>
              Your planned study timeline for the day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studyPlan.length === 0 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    No study sessions scheduled for today. Use the "Add Study Session" button to create a new session.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-2">
                  {timeSlots.map((timeSlot) => {
                    const session = getSessionForTimeSlot(timeSlot);
                    
                    return (
                      <div 
                        key={timeSlot} 
                        className={`grid grid-cols-12 py-2.5 px-4 rounded-xl text-sm transition-colors ${
                          session ? 'bg-indigo-50/70 border border-indigo-200' : 'border border-gray-100 hover:bg-gray-50'
                        }`}
                      >
                        <div className="col-span-2 font-medium text-gray-700">
                          {timeSlot}
                        </div>
                        
                        {session ? (
                          <div className="col-span-10 flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">{session.subject}: {session.topic}</h4>
                              <div className="flex items-center text-gray-500 text-xs mt-0.5">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{session.duration} min</span>
                              </div>
                            </div>
                            <Badge variant={
                              session.priority === 'high' ? 'destructive' : 
                              session.priority === 'medium' ? 'default' : 'secondary'
                            }>
                              {session.priority}
                            </Badge>
                          </div>
                        ) : (
                          <div className="col-span-10 text-gray-400 italic text-xs flex items-center">
                            Free slot
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
            <CardDescription>
              Study workload distribution across the current week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {weekDays.map((day, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-xl text-center transition-all ${
                    day.isToday 
                      ? 'bg-indigo-50 border-2 border-indigo-600 shadow-sm' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="font-medium text-xs text-gray-500">{day.dayName}</div>
                  <div className={`text-xl font-bold my-1 ${day.isToday ? 'text-indigo-600' : 'text-gray-900'}`}>
                    {day.dayNumber}
                  </div>
                  <div className="mt-2 text-xs">
                    {index === 0 ? (
                      <Badge variant="outline" className="text-[10px]">3 sessions</Badge>
                    ) : index === 2 ? (
                      <Badge variant="outline" className="text-[10px]">2 sessions</Badge>
                    ) : index === 4 ? (
                      <Badge variant="outline" className="text-[10px]">1 session</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px] text-gray-400">Rest</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" size="sm">Previous Week</Button>
            <Button variant="outline" size="sm">Next Week</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
