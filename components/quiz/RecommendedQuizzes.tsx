'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Loader2, ExternalLink, Info } from 'lucide-react';
import { QuizCard } from './QuizCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function RecommendedQuizzes() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  
  // Fetch recommended quizzes
  const { data: recommendations, isLoading, error } = useQuery({
    queryKey: ['/api/quizzes/recommendations'],
  });
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recommended Quizzes</CardTitle>
          <CardDescription>
            Personalized quiz recommendations based on your learning progress
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary/70" />
        </CardContent>
      </Card>
    );
  }
  
  if (error || !recommendations || !Array.isArray(recommendations) || recommendations.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recommended Quizzes</CardTitle>
          <CardDescription>
            Personalized quiz recommendations based on your learning progress
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            No quiz recommendations available at the moment.
          </p>
          <Button onClick={() => router.push('/quizzes')}>
            Generate a Custom Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  // Filter recommendations by category for tabs
  const weakAreaQuizzes = Array.isArray(recommendations) ? recommendations.filter((rec: any) => rec.category === 'weak_area') : [];
  const strengthQuizzes = Array.isArray(recommendations) ? recommendations.filter((rec: any) => rec.category === 'strength') : [];
  const generalQuizzes = Array.isArray(recommendations) ? recommendations.filter((rec: any) => rec.category === 'recommended') : [];
  
  const hasMultipleCategories = 
    (weakAreaQuizzes.length > 0 ? 1 : 0) + 
    (strengthQuizzes.length > 0 ? 1 : 0) + 
    (generalQuizzes.length > 0 ? 1 : 0) > 1;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              Recommended Quizzes
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>
                      These quiz recommendations are personalized based on your learning progress, strengths, 
                      weaknesses, and study habits using AI analysis.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>
              Personalized quiz recommendations based on your learning progress
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => router.push('/quizzes/generate')}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Create Custom Quiz
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {hasMultipleCategories ? (
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Recommendations</TabsTrigger>
              {weakAreaQuizzes.length > 0 && (
                <TabsTrigger value="weak_area">Areas for Improvement</TabsTrigger>
              )}
              {strengthQuizzes.length > 0 && (
                <TabsTrigger value="strength">Based on Strengths</TabsTrigger>
              )}
              {generalQuizzes.length > 0 && (
                <TabsTrigger value="recommended">General Recommendations</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <ScrollArea className="h-[420px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.isArray(recommendations) && recommendations.map((quiz: any) => (
                    <QuizCard
                      key={`${quiz.type}-${quiz.subjectId}-${quiz.title}`}
                      quiz={{
                        id: quiz.id || 0,
                        title: quiz.title,
                        description: quiz.description,
                        difficulty: quiz.difficulty || 'intermediate',
                        subjectId: quiz.subjectId,
                        subjectName: quiz.subject,
                        timeLimit: quiz.estimatedTime || 15,
                      }}
                      variant="compact"
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            {weakAreaQuizzes.length > 0 && (
              <TabsContent value="weak_area" className="mt-0">
                <ScrollArea className="h-[420px] pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {weakAreaQuizzes.map((quiz: any) => (
                      <QuizCard
                        key={`${quiz.type}-${quiz.subjectId}-${quiz.title}`}
                        quiz={{
                          id: quiz.id || 0,
                          title: quiz.title,
                          description: quiz.description,
                          difficulty: quiz.difficulty || 'beginner',
                          subjectId: quiz.subjectId,
                          subjectName: quiz.subject,
                          timeLimit: quiz.estimatedTime || 15,
                        }}
                        variant="compact"
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            )}
            
            {strengthQuizzes.length > 0 && (
              <TabsContent value="strength" className="mt-0">
                <ScrollArea className="h-[420px] pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {strengthQuizzes.map((quiz: any) => (
                      <QuizCard
                        key={`${quiz.type}-${quiz.subjectId}-${quiz.title}`}
                        quiz={{
                          id: quiz.id || 0,
                          title: quiz.title,
                          description: quiz.description,
                          difficulty: quiz.difficulty || 'advanced',
                          subjectId: quiz.subjectId,
                          subjectName: quiz.subject,
                          timeLimit: quiz.estimatedTime || 15,
                        }}
                        variant="compact"
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            )}
            
            {generalQuizzes.length > 0 && (
              <TabsContent value="recommended" className="mt-0">
                <ScrollArea className="h-[420px] pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {generalQuizzes.map((quiz: any) => (
                      <QuizCard
                        key={`${quiz.type}-${quiz.subjectId}-${quiz.title}`}
                        quiz={{
                          id: quiz.id || 0,
                          title: quiz.title,
                          description: quiz.description,
                          difficulty: quiz.difficulty || 'intermediate',
                          subjectId: quiz.subjectId,
                          subjectName: quiz.subject,
                          timeLimit: quiz.estimatedTime || 15,
                        }}
                        variant="compact"
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            )}
          </Tabs>
        ) : (
          <ScrollArea className="h-[420px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.isArray(recommendations) && recommendations.map((quiz: any) => (
                <QuizCard
                  key={`${quiz.type}-${quiz.subjectId}-${quiz.title}`}
                  quiz={{
                    id: quiz.id || 0,
                    title: quiz.title,
                    description: quiz.description,
                    difficulty: quiz.difficulty || 'intermediate',
                    subjectId: quiz.subjectId,
                    subjectName: quiz.subject,
                    timeLimit: quiz.estimatedTime || 15,
                  }}
                  variant="compact"
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}