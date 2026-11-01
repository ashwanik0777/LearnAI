'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface QuizGeneratorProps {
  subjectId?: number;
  onQuizGenerated?: (quizId: number) => void;
}

export function QuizGenerator({ subjectId, onQuizGenerated }: QuizGeneratorProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [questionCount, setQuestionCount] = useState(5);
  
  // Fetch subjects if no subjectId is provided
  const { data: subjects, isLoading: subjectsLoading } = useQuery({
    queryKey: ['/api/subjects'],
    enabled: !subjectId,
  });
  
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | undefined>(subjectId);
  
  // Quiz generation mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: {
      subjectId: number;
      topicName: string | null;
      difficulty: string;
      questionCount: number;
    }) => {
      return apiRequest({
        method: 'POST',
        path: '/api/quizzes/generate',
        body: data,
      });
    },
    onSuccess: (data) => {
      toast({
        title: 'Quiz Generated',
        description: 'Your custom quiz has been created successfully!',
      });
      
      queryClient.invalidateQueries({ queryKey: [`/api/subjects/${selectedSubjectId}/quizzes`] });
      
      if (onQuizGenerated && data?.id) {
        onQuizGenerated(data.id);
      }
    },
    onError: () => {
      toast({
        title: 'Quiz Generation Failed',
        description: 'There was a problem generating your quiz. Please try again.',
        variant: 'destructive',
      });
    },
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSubjectId) {
      toast({
        title: 'Subject Required',
        description: 'Please select a subject for your quiz.',
        variant: 'destructive',
      });
      return;
    }
    
    mutate({
      subjectId: selectedSubjectId,
      topicName: topic || null,
      difficulty,
      questionCount: Math.max(1, Math.min(questionCount, 10)), // Limit between 1-10
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generate Practice Quiz</CardTitle>
        <CardDescription>
          Create a customized quiz with AI to test your knowledge
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!subjectId && (
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={selectedSubjectId?.toString() || ''}
                onValueChange={(value) => setSelectedSubjectId(Number(value))}
                disabled={subjectsLoading || isPending}
              >
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {Array.isArray(subjects) && subjects.map((subject: any) => (
                    <SelectItem key={subject.id} value={subject.id.toString()}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="topic">Topic (Optional)</Label>
            <Input
              id="topic"
              placeholder="Specific topic within the subject"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isPending}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select 
              value={difficulty} 
              onValueChange={setDifficulty}
              disabled={isPending}
            >
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="questionCount">Number of Questions</Label>
            <Input
              id="questionCount"
              type="number"
              min={1}
              max={10}
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              disabled={isPending}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedSubjectId || isPending} 
          className="w-full"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Quiz...
            </>
          ) : (
            'Generate Quiz'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}