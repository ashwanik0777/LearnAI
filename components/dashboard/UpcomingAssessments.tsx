'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ClipboardCheck, 
  FileText, 
  Clipboard, 
  Calendar, 
  Plus, 
  GraduationCap, 
  Clock,
  BookOpen 
} from "lucide-react";
import { Assessment } from "@/lib/db/schema";
import { format, addDays } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface UpcomingAssessmentsProps {
  assessments: Assessment[];
}

export function UpcomingAssessments({ assessments = [] }: UpcomingAssessmentsProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewAllDialogOpen, setIsViewAllDialogOpen] = useState(false);
  const [newAssessment, setNewAssessment] = useState({
    title: "",
    description: "",
    subjectId: "",
    type: "quiz",
    dueDate: format(addDays(new Date(), 7), "yyyy-MM-dd'T'HH:mm")
  });
  const { toast } = useToast();

  // Helper function to get icon based on assessment type
  const getIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return ClipboardCheck;
      case 'exam':
        return FileText;
      case 'assignment':
        return Clipboard;
      default:
        return ClipboardCheck;
    }
  };

  // Helper function to determine action button text
  const getActionText = (type: string, dueDate: Date | string) => {
    // Convert string date to Date object if needed
    const dueDateObj = dueDate instanceof Date ? dueDate : new Date(dueDate);
    
    if (!isValidDate(dueDateObj)) {
      return 'Prepare'; // Default if date is invalid
    }
    
    const daysUntilDue = Math.floor((dueDateObj.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue <= 1) {
      return 'Prepare';
    } else if (type === 'exam') {
      return 'Review';
    } else if (type === 'assignment') {
      return 'Start';
    } else {
      return 'Prepare';
    }
  };
  
  // Helper function to check if date is valid
  const isValidDate = (date: any): boolean => {
    return date instanceof Date && !isNaN(date.getTime());
  };
  
  // Helper function to format the due date
  const formatDueDate = (date: Date | string) => {
    // Convert string date to Date object if needed
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (!isValidDate(dateObj)) {
      return 'Date not available'; // Default if date is invalid
    }
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (dateObj.toDateString() === today.toDateString()) {
      return `Today, ${format(dateObj, 'h:mm a')}`;
    } else if (dateObj.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${format(dateObj, 'h:mm a')}`;
    } else {
      return format(dateObj, 'MMM d, h:mm a');
    }
  };
  
  // Helper function to get background style based on due date
  const getBackgroundStyle = (dueDate: Date | string) => {
    // Convert string date to Date object if needed
    const dueDateObj = dueDate instanceof Date ? dueDate : new Date(dueDate);
    
    if (!isValidDate(dueDateObj)) {
      return 'bg-gray-50 border-gray-100'; // Default if date is invalid
    }
    
    const daysUntilDue = Math.floor((dueDateObj.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue <= 1) {
      return 'bg-indigo-50 border-indigo-100';
    } else {
      return 'bg-gray-50 border-gray-100';
    }
  };

  const handleAddAssessment = () => {
    // In a real implementation, this would send data to the server
    // For now, just show a success message
    toast({
      title: "Assessment added",
      description: `${newAssessment.title} has been added to your schedule.`
    });
    setIsAddDialogOpen(false);
  };

  const handleActionClick = (assessment: Assessment) => {
    const actionText = getActionText(assessment.type, assessment.dueDate);
    toast({
      title: `${actionText} ${assessment.type}`,
      description: `You're now preparing for "${assessment.title}"`
    });
  };

  return (
    <Card className="border-gray-100">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Upcoming Assessments</h3>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-8"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add
            </Button>
            <Button 
              variant="link" 
              className="text-primary-600 p-0 h-auto"
              onClick={() => setIsViewAllDialogOpen(true)}
            >
              View All
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          {assessments.length > 0 ? (
            assessments.slice(0, 3).map((assessment) => {
              const Icon = getIcon(assessment.type);
              const actionText = getActionText(assessment.type, assessment.dueDate);
              const iconColor = assessment.type === 'quiz' ? 'text-primary-600' :
                              assessment.type === 'exam' ? 'text-emerald-600' : 'text-amber-600';
              
              return (
                <div 
                  key={assessment.id} 
                  className={`flex items-start p-3 rounded-lg border ${getBackgroundStyle(assessment.dueDate)}`}
                >
                  <div className="p-2 bg-white rounded-lg mr-3">
                    <Icon className={`h-4 w-4 ${iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{assessment.title}</h4>
                    <p className="text-sm text-gray-600">{assessment.description}</p>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDueDate(assessment.dueDate)}
                    </div>
                  </div>
                  <Button 
                    variant="link" 
                    className="text-primary-600 text-sm p-0 h-auto whitespace-nowrap"
                    onClick={() => handleActionClick(assessment)}
                  >
                    {actionText}
                  </Button>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <GraduationCap className="h-10 w-10 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600">No upcoming assessments</p>
              <p className="text-sm text-gray-500 mt-1">Add an assessment to track your upcoming tests and assignments</p>
            </div>
          )}

          {assessments.length > 3 && !isViewAllDialogOpen && (
            <div className="text-center text-sm text-gray-500 pt-2">
              <Button 
                variant="link" 
                className="text-primary-600"
                onClick={() => setIsViewAllDialogOpen(true)}
              >
                +{assessments.length - 3} more assessments
              </Button>
            </div>
          )}
        </div>
      </CardContent>

      {/* Add Assessment Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Assessment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="assessment-title">Title</Label>
              <Input
                id="assessment-title"
                placeholder="e.g. Midterm Exam, Weekly Quiz"
                value={newAssessment.title}
                onChange={(e) => setNewAssessment({...newAssessment, title: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assessment-description">Description (optional)</Label>
              <Textarea
                id="assessment-description"
                placeholder="e.g. Covers chapters 1-5"
                value={newAssessment.description}
                onChange={(e) => setNewAssessment({...newAssessment, description: e.target.value})}
                className="resize-none"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assessment-subject">Subject</Label>
              <Select
                value={newAssessment.subjectId}
                onValueChange={(value) => setNewAssessment({...newAssessment, subjectId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Mathematics</SelectItem>
                  <SelectItem value="2">Physics</SelectItem>
                  <SelectItem value="3">Computer Science</SelectItem>
                  <SelectItem value="4">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assessment-type">Type</Label>
              <Select
                value={newAssessment.type}
                onValueChange={(value) => setNewAssessment({...newAssessment, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select assessment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assessment-due-date">Due Date</Label>
              <Input
                id="assessment-due-date"
                type="datetime-local"
                value={newAssessment.dueDate}
                onChange={(e) => setNewAssessment({...newAssessment, dueDate: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddAssessment}>Add Assessment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View All Assessments Dialog */}
      <Dialog open={isViewAllDialogOpen} onOpenChange={setIsViewAllDialogOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>All Upcoming Assessments</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 my-4 max-h-[60vh] overflow-y-auto pr-2">
            {assessments.length > 0 ? (
              assessments.map((assessment) => {
                const Icon = getIcon(assessment.type);
                const actionText = getActionText(assessment.type, assessment.dueDate);
                const iconColor = assessment.type === 'quiz' ? 'text-primary-600' :
                                 assessment.type === 'exam' ? 'text-emerald-600' : 'text-amber-600';
                
                return (
                  <div 
                    key={`view-all-${assessment.id}`} 
                    className={`flex items-start p-4 rounded-lg border ${getBackgroundStyle(assessment.dueDate)}`}
                  >
                    <div className="p-2 bg-white rounded-lg mr-3">
                      <Icon className={`h-5 w-5 ${iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">{assessment.title}</h4>
                          <p className="text-sm text-gray-600">{assessment.description}</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                          {assessment.type.charAt(0).toUpperCase() + assessment.type.slice(1)}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center text-xs text-gray-500">
                        <div className="flex items-center mr-4">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {formatDueDate(assessment.dueDate)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {isValidDate(new Date(assessment.dueDate)) 
                            ? `${Math.max(0, Math.floor((new Date(assessment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days left` 
                            : 'Date not available'}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleActionClick(assessment)}
                      >
                        {actionText}
                      </Button>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-700 font-medium">No assessments scheduled</p>
                <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                  You don't have any upcoming quizzes, exams, or assignments. Add an assessment to keep track of your academic schedule.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setIsViewAllDialogOpen(false);
                    setIsAddDialogOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Assessment
                </Button>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewAllDialogOpen(false)}>Close</Button>
            <Button 
              variant="default"
              onClick={() => {
                setIsViewAllDialogOpen(false);
                setIsAddDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add New
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default UpcomingAssessments;
