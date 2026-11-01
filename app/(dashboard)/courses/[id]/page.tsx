'use client';

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedProgress } from "@/components/ui/animated-progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Book, Clock, ChevronLeft, PlayCircle, FileText, 
  CheckCircle, Bookmark, List, BrainCircuit, Star, MessageSquare, X, Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { CompletionAnimation } from "@/components/ui/completion-animation";
import { AchievementCelebration } from "@/components/ui/achievement-celebration";
import { PointsBadge } from "@/components/ui/points-badge";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Subject } from "@/lib/db/schema";

interface CourseLesson {
  id: string;
  title: string;
  description: string;
  type: "video" | "text" | "quiz" | "assignment";
  duration: number;
  order: number;
  isCompleted: boolean;
  content?: string;
}

interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: CourseLesson[];
}

interface CourseData {
  subject: Subject & { progress: number };
  modules: CourseModule[];
  enrolled: boolean;
}

function getLessonIcon(type: string, subjectColor?: string) {
  const iconColor = subjectColor || "#3b82f6";
  switch (type) {
    case 'video': return <PlayCircle className="h-4 w-4" style={{ color: iconColor }} />;
    case 'text': return <FileText className="h-4 w-4" style={{ color: iconColor }} />;
    case 'quiz': return <Star className="h-4 w-4" style={{ color: iconColor }} />;
    case 'assignment': return <Bookmark className="h-4 w-4" style={{ color: iconColor }} />;
    default: return <Book className="h-4 w-4" style={{ color: iconColor }} />;
  }
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const courseId = params?.id ? parseInt(params.id as string) : null;

  const [enrolled, setEnrolled] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState("");
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [showReadingList, setShowReadingList] = useState(false);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [discussionTitle, setDiscussionTitle] = useState("");
  const [discussionContent, setDiscussionContent] = useState("");
  
  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Fetch specific course data
  const { data: courseData, isLoading: isCourseLoading } = useQuery<CourseData>({
    queryKey: [`/api/courses/${courseId}`],
    enabled: !!user && !!courseId,
  });

  const subject = courseData?.subject;
  const [modules, setModules] = useState<CourseModule[]>([]);

  useEffect(() => {
    if (courseData) {
      setModules(courseData.modules || []);
      setEnrolled(courseData.enrolled ?? true);
      if (courseData.modules?.[0]?.lessons?.[0] && !currentLessonId) {
        setCurrentLessonId(courseData.modules[0].lessons[0].id);
      }
    }
  }, [courseData, currentLessonId]);

  // Enroll in course mutation
  const enrollMutation = useMutation({
    mutationFn: async () => {
      return apiRequest({ 
        method: "POST", 
        path: `/api/courses/${courseId}/enroll` 
      });
    },
    onSuccess: () => {
      setEnrolled(true);
      toast({
        title: "Enrolled Successfully",
        description: "You have been enrolled in this course",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${courseId}`] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
    },
    onError: () => {
      toast({
        title: "Enrollment Failed",
        description: "There was an error enrolling in this course",
        variant: "destructive",
      });
    }
  });

  // Complete lesson mutation
  const completeLessonMutation = useMutation({
    mutationFn: async (lessonId: string) => {
      return apiRequest({ 
        method: "POST", 
        path: `/api/courses/${courseId}/lessons/${lessonId}/complete` 
      });
    },
    onSuccess: (data: any, lessonId: string) => {
      setModules((prevModules) =>
        prevModules.map((module) => ({
          ...module,
          lessons: module.lessons.map((lesson) =>
            lesson.id === lessonId ? { ...lesson, isCompleted: true } : lesson
          ),
        }))
      );
      
      toast({
        title: "Lesson Completed",
        description: "Your progress has been updated",
      });
      
      if (data?.recommendation?.description) {
        setAiRecommendation(data.recommendation.description);
      } else {
        generateAiRecommendation();
      }
      
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${courseId}`] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to mark lesson as complete",
        variant: "destructive",
      });
    }
  });

  const generateAiRecommendation = () => {
    const recommendations = [
      "Based on your learning pattern, you might want to review the key terminology section again.",
      "You seem to be making great progress! Consider taking the practice quiz to test your knowledge.",
      "I noticed you're spending more time on theoretical content. Would you like more practical exercises?",
      "You're showing consistent progress! The next module builds on these concepts - you're ready to tackle it.",
      "Your quiz results show you might benefit from additional practice with the core principles."
    ];
    const randomRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
    setAiRecommendation(randomRecommendation);
  };

  const handleLessonClick = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    const allLessons = modules.flatMap((m) => m.lessons);
    const lesson = allLessons.find((l) => l.id === lessonId);
    
    if (lesson?.type === "quiz") {
      setQuizSubmitted(false);
      setQuizCompleted(false);
      setQuizAnswers({});
    }
  };

  const handleMarkComplete = (lessonId: string) => {
    completeLessonMutation.mutate(lessonId);
  };

  const handleQuizAnswer = (questionNumber: number, answer: string) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionNumber]: answer,
    }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    if (quizAnswers[1] === "a") score++;
    if (quizAnswers[2] === "b") score++;
    
    setQuizScore(score);
    setQuizSubmitted(true);
    
    toast({
      title: "Quiz Submitted",
      description: `Your score: ${score}/2`,
    });
  };

  const currentLesson = currentLessonId 
    ? modules.flatMap((m) => m.lessons).find((l) => l.id === currentLessonId)
    : modules[0]?.lessons[0];

  const handleCompleteQuiz = () => {
    if (currentLesson) {
      setQuizCompleted(true);
      handleMarkComplete(currentLesson.id);
    }
  };

  const getAnswerClass = (questionNumber: number, option: string) => {
    if (!quizSubmitted) return "";
    const correctAnswers: { [key: number]: string } = { 1: "a", 2: "b" };
    if (correctAnswers[questionNumber] === option) {
      return "text-green-600 font-medium";
    } else if (quizAnswers[questionNumber] === option) {
      return "text-red-600 line-through";
    }
    return "";
  };

  const getNextLessonId = (): string => {
    if (!currentLesson) return "";
    const allLessons = modules.flatMap((m) => m.lessons);
    const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
    if (currentIndex < allLessons.length - 1) {
      return allLessons[currentIndex + 1].id;
    }
    return currentLesson.id;
  };

  if (authLoading || isCourseLoading || !subject) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-3" />
          <p className="text-sm font-medium text-gray-500">Loading course curriculum...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2"
            onClick={() => router.push("/courses")}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Courses
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div 
              className="p-3.5 rounded-xl flex-shrink-0 text-white shadow-sm" 
              style={{ backgroundColor: subject.color || "#4f46e5" }}
            >
              <Book className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{subject.name}</h1>
              <p className="text-gray-600 mt-1">Comprehensive learning path for mastering {subject.name}</p>
              
              <div className="flex items-center mt-3 space-x-4">
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>12 weeks</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <List className="mr-1 h-3.5 w-3.5" />
                  <span>{modules.length} modules</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <PlayCircle className="mr-1 h-3.5 w-3.5" />
                  <span>{modules.flatMap((m) => m.lessons).length} lessons</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            {!enrolled ? (
              <Button 
                className="w-full md:w-auto"
                disabled={enrollMutation.isPending}
                onClick={() => enrollMutation.mutate()}
              >
                {enrollMutation.isPending ? "Enrolling..." : "Enroll in Course"}
              </Button>
            ) : (
              <div className="flex flex-col items-end">
                <div className="flex items-center mb-1">
                  <span className="text-xs font-medium text-gray-600 mr-2">Course Progress:</span>
                  <span className="text-xs font-bold text-gray-900">{subject.progress}%</span>
                </div>
                <AnimatedProgress 
                  value={subject.progress} 
                  className="w-full md:w-40 h-2.5" 
                  color={subject.color}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Course Content */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <List className="h-4 w-4 mr-2 text-indigo-600" />
                Course Curriculum
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {modules.map((module) => (
                  <div key={module.id} className="py-3 px-4">
                    <div className="font-semibold text-sm text-gray-900 mb-1">
                      {module.title}
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      {module.description}
                    </div>
                    <div className="space-y-1.5 pl-1">
                      {module.lessons.map((lesson) => (
                        <div 
                          key={lesson.id} 
                          className={`flex items-start p-2 rounded-lg cursor-pointer transition-colors ${
                            currentLessonId === lesson.id 
                              ? 'bg-indigo-50 border border-indigo-200' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => handleLessonClick(lesson.id)}
                        >
                          <div className="mr-2.5 mt-0.5">
                            {lesson.isCompleted ? (
                              <CompletionAnimation 
                                isComplete={true} 
                                size="sm" 
                                color={subject?.color} 
                              />
                            ) : getLessonIcon(lesson.type, subject?.color)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-xs text-gray-800 truncate">
                              {lesson.title}
                            </div>
                            <div className="text-[11px] text-gray-400 flex items-center mt-0.5">
                              <Clock className="h-3 w-3 mr-1" />
                              {lesson.duration} min
                              <Badge variant="outline" className="ml-2 text-[10px] py-0 h-4">
                                {lesson.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* AI Assistant */}
          {aiRecommendation && (
            <Card className="bg-indigo-50/70 border-indigo-200">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm font-semibold text-indigo-950">
                  <BrainCircuit className="h-4 w-4 mr-2 text-indigo-600" />
                  AI Learning Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-indigo-800 leading-relaxed italic">{aiRecommendation}</p>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Main content column */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="lesson">
                <TabsList className="mb-4">
                  <TabsTrigger value="lesson">Lesson Content</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="lesson">
                  {currentLesson ? (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900">{currentLesson.title}</h2>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Bookmark className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          {!currentLesson.isCompleted && (
                            <Button 
                              size="sm" 
                              onClick={() => handleMarkComplete(currentLesson.id)}
                              disabled={completeLessonMutation.isPending}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              {completeLessonMutation.isPending ? "Marking..." : "Mark Complete"}
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      {currentLesson.type === 'video' && (
                        <div>
                          <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center mb-4 shadow-inner">
                            <PlayCircle className="h-16 w-16 text-white opacity-80 cursor-pointer hover:scale-110 transition-transform" />
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {currentLesson.content || "Video content for this lesson."}
                          </p>
                        </div>
                      )}
                      
                      {currentLesson.type === 'text' && (
                        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                          <p>{currentLesson.content}</p>
                          <h3 className="font-semibold text-base text-gray-900 pt-2">Key Takeaways</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Understand the core mechanism and theoretical foundation.</li>
                            <li>Explore key terminology, formulas, and working examples.</li>
                            <li>Practice applying the solution to standard exercises.</li>
                          </ul>
                        </div>
                      )}
                      
                      {currentLesson.type === 'quiz' && (
                        <div>
                          <p className="text-sm text-gray-600 mb-4">
                            Assess your comprehension of the concepts covered in this module:
                          </p>
                          
                          {!quizCompleted ? (
                            <div className="space-y-6">
                              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
                                <h4 className="font-medium text-sm text-gray-900 mb-3">
                                  Question 1: What is the primary concept covered in this module?
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                    <input 
                                      type="radio" 
                                      name="q1" 
                                      value="a"
                                      onChange={(e) => handleQuizAnswer(1, e.target.value)}
                                      disabled={quizSubmitted}
                                    />
                                    <span className={getAnswerClass(1, 'a')}>Foundational principles and core models</span>
                                  </label>
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                    <input 
                                      type="radio" 
                                      name="q1" 
                                      value="b"
                                      onChange={(e) => handleQuizAnswer(1, e.target.value)}
                                      disabled={quizSubmitted}
                                    />
                                    <span className={getAnswerClass(1, 'b')}>Advanced edge cases</span>
                                  </label>
                                </div>
                              </div>
                              
                              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
                                <h4 className="font-medium text-sm text-gray-900 mb-3">
                                  Question 2: Which benefit is most impactful when applying these methods?
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                    <input 
                                      type="radio" 
                                      name="q2" 
                                      value="a"
                                      onChange={(e) => handleQuizAnswer(2, e.target.value)}
                                      disabled={quizSubmitted}
                                    />
                                    <span className={getAnswerClass(2, 'a')}>Reduced memory usage</span>
                                  </label>
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                    <input 
                                      type="radio" 
                                      name="q2" 
                                      value="b"
                                      onChange={(e) => handleQuizAnswer(2, e.target.value)}
                                      disabled={quizSubmitted}
                                    />
                                    <span className={getAnswerClass(2, 'b')}>Enhanced conceptual retention</span>
                                  </label>
                                </div>
                              </div>
                              
                              <div className="text-center pt-2">
                                {!quizSubmitted ? (
                                  <Button 
                                    onClick={handleSubmitQuiz}
                                    disabled={!quizAnswers[1] || !quizAnswers[2]}
                                  >
                                    Submit Quiz
                                  </Button>
                                ) : (
                                  <div className="space-y-4">
                                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                                      <h3 className="text-base font-semibold">Quiz Result</h3>
                                      <div className="text-2xl font-bold my-1 text-indigo-600">{quizScore} / 2</div>
                                    </div>
                                    <Button onClick={handleCompleteQuiz}>
                                      Complete and Continue
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
                              <AchievementCelebration 
                                show={true}
                                title="Quiz Completed!"
                                description={`You scored ${quizScore} out of 2!`}
                                type="milestone"
                                className="mb-4"
                              />
                              <div className="mt-4">
                                <PointsBadge
                                  value={quizScore * 10}
                                  icon="star"
                                  label="Points earned"
                                  animate={true}
                                  className="mx-auto mb-4"
                                />
                                <Button onClick={() => handleLessonClick(getNextLessonId())}>
                                  Continue to Next Lesson
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {currentLesson.type === 'assignment' && (
                        <div>
                          <p className="text-sm text-gray-700 mb-4">
                            Complete this hands-on assignment to demonstrate mastery:
                          </p>
                          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4 text-sm text-gray-700">
                            <h4 className="font-semibold text-gray-900 mb-2">Assignment Instructions:</h4>
                            <p>Apply the concepts discussed in this module to build or solve a practical challenge.</p>
                          </div>
                          <Button>Submit Assignment</Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-sm text-gray-500">
                      Select a lesson from the curriculum to begin learning
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="discussion">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-900">Discussion Forum</h3>
                      <Button size="sm" onClick={() => setShowDiscussionModal(true)}>
                        Start a Discussion
                      </Button>
                    </div>
                    <Card>
                      <CardContent className="p-4 text-sm">
                        <div className="flex items-start space-x-3">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-xs">
                            JS
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">Understanding Core Principles</h4>
                            <p className="text-xs text-gray-600 mt-1">
                              Could someone explain the practical applications in more detail?
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="resources">
                  <div className="space-y-4 text-sm">
                    <h3 className="font-semibold text-gray-900">Additional Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <div className="flex items-start space-x-3">
                          <FileText className="h-6 w-6 text-indigo-600 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium">Course Syllabus</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Comprehensive curriculum notes</p>
                            <Button 
                              variant="link" 
                              className="px-0 h-auto text-xs text-indigo-600 mt-1"
                              onClick={() => toast({ title: "Downloading Syllabus..." })}
                            >
                              Download PDF
                            </Button>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="flex items-start space-x-3">
                          <Book className="h-6 w-6 text-green-600 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium">Recommended Readings</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Supplementary textbooks</p>
                            <Button 
                              variant="link" 
                              className="px-0 h-auto text-xs text-indigo-600 mt-1"
                              onClick={() => setShowReadingList((prev) => !prev)}
                            >
                              {showReadingList ? "Hide List" : "View List"}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Discussion Modal */}
      {showDiscussionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold">Start a Discussion</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => setShowDiscussionModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Discussion title"
                  value={discussionTitle}
                  onChange={(e) => setDiscussionTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[100px]"
                  placeholder="What would you like to discuss?"
                  value={discussionContent}
                  onChange={(e) => setDiscussionContent(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setShowDiscussionModal(false)}>
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={() => {
                    toast({ title: "Discussion posted successfully!" });
                    setShowDiscussionModal(false);
                    setDiscussionTitle("");
                    setDiscussionContent("");
                  }}
                  disabled={!discussionTitle || !discussionContent}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
