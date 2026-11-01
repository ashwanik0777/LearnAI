'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pen, Plus, X, AlarmClock, FileText, Loader2 } from "lucide-react";
import { StudySession } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
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

interface TodayStudyPlanProps {
  sessions: StudySession[];
}

export function TodayStudyPlan({ sessions }: TodayStudyPlanProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isGeneratingNote, setIsGeneratingNote] = useState<string | null>(null);
  const [newSession, setNewSession] = useState({
    subject: "",
    topic: "",
    startTime: "",
    endTime: "",
    priority: "medium",
    duration: 30
  });
  const { toast } = useToast();

  // Helper function to get priority badge color
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-amber-100 text-amber-600';
      case 'medium':
        return 'bg-blue-100 text-blue-600';
      case 'low':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleAddSession = () => {
    // In a real implementation, this would send data to the server
    // For now, just show a success message
    toast({
      title: "Study session added",
      description: "Your new study session has been added to today's plan."
    });
    setIsAddDialogOpen(false);
  };

  const handleEditPlan = () => {
    // In a real implementation, this would save changes to the server
    toast({
      title: "Study plan updated",
      description: "Your study plan changes have been saved."
    });
    setIsEditDialogOpen(false);
  };

  const handleStartSession = (session: StudySession) => {
    toast({
      title: "Study session started",
      description: `You're now studying ${session.subject}: ${session.topic}`
    });
  };
  
  const handleGenerateNote = async (session: StudySession) => {
    try {
      setIsGeneratingNote(session.id);
      
      const response = await apiRequest({
        method: 'POST',
        path: '/api/notes/generate',
        body: {
          sessionId: session.id,
          subject: session.subject,
          topic: session.topic
        }
      });
      
      setIsGeneratingNote(null);
      
      toast({
        title: "Note generated",
        description: "Your study note has been created successfully."
      });
      
      // In a real implementation, you might want to redirect to the note editor
      // or show a modal with the generated note content
    } catch (error) {
      setIsGeneratingNote(null);
      
      toast({
        title: "Failed to generate note",
        description: "There was an error creating your study note. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="border-gray-100">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Today's Study Plan</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm text-primary-600 p-0 h-auto"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Pen className="h-3.5 w-3.5 mr-1" />
            Edit
          </Button>
        </div>
        
        <div className="space-y-3">
          {sessions && sessions.length > 0 ? (
            sessions.map((session) => (
              <div key={session.id}>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  <p className="text-sm font-medium">{session.startTime} - {session.endTime}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 ml-4 mt-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-800">{session.subject}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityBadge(session.priority)}`}>
                      {session.priority.charAt(0).toUpperCase() + session.priority.slice(1)} Priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{session.topic}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-gray-500">{session.duration} minutes</span>
                    <div className="flex space-x-2 items-center">
                      <Button 
                        variant="ghost"
                        size="sm"
                        className="text-primary-600 text-xs p-0.5 h-auto"
                        onClick={() => handleGenerateNote(session)}
                        disabled={isGeneratingNote === session.id}
                      >
                        {isGeneratingNote === session.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                        ) : (
                          <FileText className="h-3.5 w-3.5 mr-1" />
                        )}
                        {isGeneratingNote === session.id ? 'Generating...' : 'Generate Note'}
                      </Button>
                      <Button 
                        variant="link" 
                        className="text-primary-600 text-sm p-0 h-auto"
                        onClick={() => handleStartSession(session)}
                      >
                        Start
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <AlarmClock className="h-10 w-10 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600">No study sessions planned for today</p>
              <p className="text-sm text-gray-500 mt-1">Add a session to start planning your day</p>
            </div>
          )}
          
          <div className="mt-4 pt-3 border-t border-gray-100">
            <Button 
              variant="outline" 
              className="w-full bg-primary-50 hover:bg-primary-100 text-primary-600 py-2"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Study Session
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Edit Study Plan Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Today's Study Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 my-4">
            {sessions && sessions.length > 0 ? (
              sessions.map((session, index) => (
                <div key={`edit-${session.id}`} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div>
                    <p className="font-medium">{session.subject}</p>
                    <p className="text-sm text-gray-600">{session.startTime} - {session.endTime}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No sessions to edit</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditPlan}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Study Session Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Study Session</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={newSession.startTime}
                  onChange={(e) => setNewSession({...newSession, startTime: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={newSession.endTime}
                  onChange={(e) => setNewSession({...newSession, endTime: e.target.value})}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="e.g. Mathematics, Physics"
                value={newSession.subject}
                onChange={(e) => setNewSession({...newSession, subject: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                placeholder="e.g. Calculus, Quantum Mechanics"
                value={newSession.topic}
                onChange={(e) => setNewSession({...newSession, topic: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={newSession.priority}
                onValueChange={(value) => setNewSession({...newSession, priority: value as 'high' | 'medium' | 'low'})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="5"
                max="360"
                value={newSession.duration}
                onChange={(e) => setNewSession({...newSession, duration: parseInt(e.target.value)})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddSession}>Add Session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default TodayStudyPlan;
