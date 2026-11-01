'use client';

import { useRouter } from 'next/navigation';
import { Clock, Award, ArrowRight, Book, BookOpen, FileQuestion } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QuizCardProps {
  quiz: {
    id: number;
    title: string;
    description: string | null;
    difficulty: string;
    subjectId: number | null;
    subjectName?: string;
    questionCount?: number;
    timeLimit?: number | null;
    isCompleted?: boolean;
    bestScore?: number | null;
  };
  variant?: 'default' | 'compact';
}

export function QuizCard({ quiz, variant = 'default' }: QuizCardProps) {
  const router = useRouter();
  
  function getDifficultyColor(difficulty: string) {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  }
  
  function getSubjectIcon() {
    return quiz.subjectId ? <Book className="h-4 w-4 mr-1" /> : <BookOpen className="h-4 w-4 mr-1" />;
  }
  
  function startQuiz() {
    router.push(`/quizzes/${quiz.id}`);
  }
  
  if (variant === 'compact') {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base">{quiz.title}</CardTitle>
            <Badge className={`${getDifficultyColor(quiz.difficulty)} capitalize text-xs`}>
              {quiz.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 pb-2">
          <div className="flex items-center text-sm text-muted-foreground">
            {getSubjectIcon()}
            <span>{quiz.subjectName || 'General Knowledge'}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          {quiz.timeLimit && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{quiz.timeLimit} min</span>
            </div>
          )}
          <Button size="sm" variant="ghost" className="p-0" onClick={startQuiz}>
            Start <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-5 pb-3">
        <div className="flex justify-between items-start">
          <CardTitle>{quiz.title}</CardTitle>
          <Badge className={`${getDifficultyColor(quiz.difficulty)} capitalize`}>
            {quiz.difficulty}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2 mt-1">
          {quiz.description || `A ${quiz.difficulty} level quiz ${quiz.subjectName ? `on ${quiz.subjectName}` : ''}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 pt-0 pb-3">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            {getSubjectIcon()}
            <span>{quiz.subjectName || 'General Knowledge'}</span>
          </div>
          
          {quiz.questionCount && (
            <div className="flex items-center text-muted-foreground">
              <FileQuestion className="h-4 w-4 mr-1" />
              <span>{quiz.questionCount} questions</span>
            </div>
          )}
          
          {quiz.timeLimit && (
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{quiz.timeLimit} minutes</span>
            </div>
          )}
          
          {quiz.bestScore !== undefined && quiz.bestScore !== null && (
            <div className="flex items-center text-muted-foreground">
              <Award className="h-4 w-4 mr-1" />
              <span>Best: {quiz.bestScore}%</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex justify-between">
        <div>
          {quiz.isCompleted && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
              Completed
            </Badge>
          )}
        </div>
        <Button onClick={startQuiz}>
          {quiz.isCompleted ? 'Retry Quiz' : 'Start Quiz'}
        </Button>
      </CardFooter>
    </Card>
  );
}