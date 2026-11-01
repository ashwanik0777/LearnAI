'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuizGenerator } from '@/components/quiz/QuizGenerator';
import { RecommendedQuizzes } from '@/components/quiz/RecommendedQuizzes';
import { QuizCard } from '@/components/quiz/QuizCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';

export default function QuizzesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('recommended');
  const [activeSubject, setActiveSubject] = useState<number | null>(null);
  
  // Fetch all subjects
  const { data: subjects, isLoading: subjectsLoading } = useQuery({
    queryKey: ['/api/subjects'],
  });
  
  // Fetch quizzes for active subject
  const { data: subjectQuizzes, isLoading: quizzesLoading } = useQuery({
    queryKey: [`/api/subjects/${activeSubject}/quizzes`],
    enabled: !!activeSubject,
  });
  
  const handleGeneratedQuiz = (quizId: number) => {
    router.push(`/quizzes/${quizId}`);
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Practice Quizzes</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Test your knowledge with AI-powered personalized quizzes and assessments
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1">
          <QuizGenerator onQuizGenerated={handleGeneratedQuiz} />
        </div>
        
        <div className="col-span-1 lg:col-span-2">
          <Tabs defaultValue="recommended" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="subjects">By Subject</TabsTrigger>
              <TabsTrigger value="history">My History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommended" className="mt-0">
              <RecommendedQuizzes />
            </TabsContent>
            
            <TabsContent value="subjects" className="mt-0">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Subject Quizzes</CardTitle>
                  <CardDescription>
                    Browse quizzes by academic subject
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {subjectsLoading ? (
                    <div className="flex justify-center items-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary/70" />
                    </div>
                  ) : (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(subjects) && subjects.map((subject: any) => (
                          <button
                            key={subject.id}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
                              ${activeSubject === subject.id 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                              }`}
                            onClick={() => setActiveSubject(subject.id)}
                          >
                            {subject.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activeSubject ? (
                    quizzesLoading ? (
                      <div className="flex justify-center items-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary/70" />
                      </div>
                    ) : (Array.isArray(subjectQuizzes) && subjectQuizzes.length > 0) ? (
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Array.isArray(subjectQuizzes) && subjectQuizzes.map((quiz: any) => (
                            <QuizCard
                              key={quiz.id}
                              quiz={{
                                id: quiz.id,
                                title: quiz.title,
                                description: quiz.description,
                                difficulty: quiz.difficulty,
                                subjectId: quiz.subjectId,
                                subjectName: Array.isArray(subjects) ? subjects.find((s: any) => s.id === quiz.subjectId)?.name : undefined,
                                questionCount: quiz.questionCount,
                                timeLimit: quiz.timeLimit,
                                isCompleted: quiz.isCompleted,
                                bestScore: quiz.bestScore,
                              }}
                              variant="compact"
                            />
                          ))}
                        </div>
                      </ScrollArea>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        <p>No quizzes available for this subject.</p>
                        <p className="mt-2">Generate a custom quiz using the form on the left.</p>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      <p>Select a subject from above to see available quizzes.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>My Quiz History</CardTitle>
                  <CardDescription>
                    Review your previous quiz attempts and performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    <p>Your completed quizzes will appear here.</p>
                    <p className="mt-2">Try taking a quiz to see your history!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
