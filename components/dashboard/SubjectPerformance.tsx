'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Beaker, Book, TrendingUp, Globe } from "lucide-react";
import { Subject } from "@/lib/db/schema";
import { Progress } from "@/components/ui/progress";

interface SubjectWithProgress extends Subject {
  progress: number;
}

interface SubjectPerformanceProps {
  subjects: SubjectWithProgress[];
}

export function SubjectPerformance({ subjects }: SubjectPerformanceProps) {
  // Helper function to get icon based on subject name
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'mathematics':
        return Calculator;
      case 'science':
        return Beaker;
      case 'literature':
        return Book;
      case 'economics':
        return TrendingUp;
      case 'geography':
        return Globe;
      default:
        return Book;
    }
  };

  return (
    <Card className="border-gray-100">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Performance by Subject</h3>
          <Button variant="link" className="text-primary-600 p-0 h-auto">Details</Button>
        </div>
        
        <div className="space-y-4">
          {subjects.map((subject) => {
            const Icon = getIcon(subject.name);
            
            return (
              <div key={subject.id}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <Icon className="text-[${subject.color}] mr-2 h-4 w-4" style={{ color: subject.color }} />
                    <span className="font-medium text-gray-800">{subject.name}</span>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: subject.color }}>{subject.progress}%</span>
                </div>
                <Progress 
                  value={subject.progress} 
                  className="h-1.5 bg-gray-200" 
                  style={{ 
                    "--progress-background": subject.color 
                  } as React.CSSProperties} 
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default SubjectPerformance;
