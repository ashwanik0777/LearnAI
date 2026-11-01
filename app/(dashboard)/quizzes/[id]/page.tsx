'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { apiRequest } from '@/lib/queryClient';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  AlertTriangle,
  Check,
  Loader2
} from 'lucide-react';

interface QuizData {
  id?: number;
  title?: string;
  description?: string | null;
  difficulty?: string;
  timeLimit?: number | null;
  passingScore?: number | null;
  questions?: QuizQuestion[];
  subjectId?: number | null;
}

interface QuizQuestion {
  id: number;
  questionText: string;
  questionType: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation?: string | null;
  order?: number | null;
  points?: number | null;
}

interface QuizOption {
  id: string;
  text: string;
}

interface QuizResults {
  percentageScore: number;
  passed: boolean;
  attempt: {
    answers: Array<{
      questionId: number;
      answer: string;
      correct: boolean;
    }>;
  };
}

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export default function QuizDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  
  // Fetch quiz data
  const { data: quiz = {} as QuizData, isLoading, error } = useQuery<QuizData>({
    queryKey: [`/api/quizzes/${id}`],
  });
  
  // Initialize timer when quiz loads
  useEffect(() => {
    if (quiz && quiz.timeLimit !== undefined && quiz.timeLimit !== null && !startTime) {
      setTimeRemaining((quiz.timeLimit || 15) * 60);
      setStartTime(new Date());
    }
  }, [quiz, startTime]);
  
  // Timer countdown
  useEffect(() => {
    if (!timeRemaining || timeRemaining <= 0 || quizResults) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev && prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeRemaining, quizResults]);
  
  // Submit quiz mutation
  const { mutate: submitQuiz } = useMutation<QuizResults, Error, { 
    answers: { questionId: number, answer: string }[],
    timeSpent: number 
  }>({
    mutationFn: async (data) => {
      return apiRequest<QuizResults>({
        method: 'POST',
        path: `/api/quizzes/${id}/submit`,
        body: data,
      });
    },
    onSuccess: (data) => {
      setQuizResults(data);
      toast({
        title: 'Quiz Submitted',
        description: `You scored ${data.percentageScore}%. ${data.passed ? 'You passed!' : 'Keep practicing!'}`,
      });
      queryClient.invalidateQueries({ queryKey: [`/api/quizzes/${id}`] });
    },
    onError: () => {
      setIsSubmitting(false);
      toast({
        title: 'Submission Failed',
        description: 'There was a problem submitting your quiz. Please try again.',
        variant: 'destructive',
      });
    },
  });

  function calculateTimeSpent() {
    if (!startTime) return 0;
    const now = new Date();
    return Math.floor((now.getTime() - startTime.getTime()) / 1000);
  }
  
  function handleSubmitQuiz() {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    const answers = Object.entries(selectedAnswers).map(([questionId, answer]) => ({
      questionId: parseInt(questionId),
      answer,
    }));
    
    submitQuiz({
      answers,
      timeSpent: calculateTimeSpent(),
    });
  }

  // Auto-submit when time expires
  useEffect(() => {
    if (timeRemaining === 0 && !quizResults && !isSubmitting) {
      handleSubmitQuiz();
    }
  }, [timeRemaining, quizResults, isSubmitting]);
  
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }
  
  if (error || !quiz) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Could not load the quiz. Please try again later or select another quiz.
          </AlertDescription>
        </Alert>
        <Button className="mt-4" onClick={() => router.push('/quizzes')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> 
          Back to Quizzes
        </Button>
      </div>
    );
  }
  
  const questions: QuizQuestion[] = quiz.questions || [];
  const currentQuestion: QuizQuestion | undefined = questions[currentQuestionIndex];
  
  function formatTimeRemaining() {
    if (!timeRemaining && timeRemaining !== 0) return '--:--';
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  function handleAnswerSelect(questionId: number, answer: string) {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  }
  
  function handleNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }
  
  function handlePreviousQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }
  
  // Results view
  if (quizResults) {
    const { percentageScore, passed, attempt } = quizResults;
    const gradedAnswers = attempt?.answers || [];
    
    return (
      <div className="max-w-4xl mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => router.push('/quizzes')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> 
            Back to Quizzes
          </Button>
          <Badge 
            className={passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
          >
            {passed ? 'Passed' : 'Failed'}
          </Badge>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{quiz.title}</CardTitle>
            <CardDescription>{quiz.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">
                Score: {percentageScore}%
              </div>
              <div className="text-sm text-muted-foreground">
                Passing score: {quiz.passingScore || 70}%
              </div>
            </div>
            <Progress 
              value={percentageScore} 
              className={`h-3 ${passed ? 'bg-green-100' : 'bg-red-100'}`} 
            />
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Question Review</h2>
          
          {questions.map((question: QuizQuestion, index: number) => {
            const questionId = question.id;
            const userAnswer = selectedAnswers[questionId];
            const gradedAnswer = gradedAnswers.find((a) => a.questionId === questionId);
            const isCorrect = gradedAnswer?.correct || false;
            
            return (
              <Card key={questionId} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-base">Question {index + 1}</CardTitle>
                    {isCorrect ? (
                      <Badge className="bg-green-100 text-green-800">Correct</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">Incorrect</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm font-medium">{question.questionText}</p>
                  
                  {question.options && (
                    <RadioGroup 
                      value={userAnswer} 
                      className="space-y-2"
                      disabled 
                    >
                      {question.options.map((option: QuizOption) => (
                        <div 
                          key={option.id} 
                          className={`flex items-center space-x-2 p-2 rounded-md text-sm ${
                            option.id === question.correctAnswer 
                              ? 'bg-green-50 border border-green-200' 
                              : option.id === userAnswer && option.id !== question.correctAnswer
                              ? 'bg-red-50 border border-red-200'
                              : ''
                          }`}
                        >
                          <RadioGroupItem value={option.id} id={`q${questionId}-${option.id}`} />
                          <Label htmlFor={`q${questionId}-${option.id}`} className="flex-1">
                            {option.text}
                          </Label>
                          {option.id === question.correctAnswer && (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          )}
                          {option.id === userAnswer && option.id !== question.correctAnswer && (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  
                  {question.explanation && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-md">
                      <p className="text-xs font-semibold text-blue-800">Explanation:</p>
                      <p className="text-xs text-blue-700 mt-1">{question.explanation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={() => router.push('/quizzes')}>
            Back to Quizzes
          </Button>
          <Button onClick={() => window.location.reload()}>
            Retake Quiz
          </Button>
        </div>
      </div>
    );
  }
  
  // Quiz taking view
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => router.push('/quizzes')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> 
          Exit Quiz
        </Button>
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className={`font-mono text-sm ${timeRemaining && timeRemaining < 60 ? 'text-red-600 font-bold' : ''}`}>
            {formatTimeRemaining()}
          </span>
        </div>
      </div>
      
      <div>
        <Progress 
          value={questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0} 
          className="h-2"
        />
        <div className="mt-2 text-xs text-muted-foreground text-right">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>
      
      {currentQuestion && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              <span className="text-muted-foreground font-normal mr-2">
                Q{currentQuestionIndex + 1}.
              </span>
              {currentQuestion.questionText}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            {currentQuestion.options && (
              <RadioGroup 
                value={selectedAnswers[currentQuestion.id] || ''} 
                onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
                className="space-y-3"
              >
                {currentQuestion.options.map((option: QuizOption) => (
                  <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent transition-colors">
                    <RadioGroupItem value={option.id} id={`q${currentQuestion.id}-${option.id}`} />
                    <Label htmlFor={`q${currentQuestion.id}-${option.id}`} className="flex-1 cursor-pointer text-sm">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </CardContent>
          
          <Separator />
          
          <CardFooter className="flex justify-between pt-6">
            <Button 
              variant="outline" 
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> 
              Previous
            </Button>
            
            {currentQuestionIndex < questions.length - 1 ? (
              <Button 
                onClick={handleNextQuestion}
                disabled={!selectedAnswers[currentQuestion.id]}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmitQuiz}
                disabled={
                  isSubmitting || 
                  Object.keys(selectedAnswers).length < questions.length
                }
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Quiz <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
      
      {Object.keys(selectedAnswers).length < questions.length && (
        <Alert>
          <HelpCircle className="h-4 w-4" />
          <AlertTitle>Answer all questions</AlertTitle>
          <AlertDescription>
            You need to answer all {questions.length} questions before submitting the quiz.
            {questions.length - Object.keys(selectedAnswers).length} questions remaining.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
