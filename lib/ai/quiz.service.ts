import { 
  InsertQuiz, 
  InsertQuizQuestion, 
  Subject, 
  QUIZ_DIFFICULTY_LEVELS, 
  QUESTION_TYPES 
} from "@/lib/db/schema";
import OpenAI from "openai";
import { storage } from "@/lib/db/storage";

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey || "dummy-key" });

export const quizService = {
  async generatePracticeQuiz(
    userId: number,
    subjectId: number,
    topicName: string | null,
    difficulty: string,
    questionCount: number = 5
  ): Promise<{ quiz: InsertQuiz; questions: InsertQuizQuestion[] }> {
    if (!QUIZ_DIFFICULTY_LEVELS.includes(difficulty as any)) {
      throw new Error(`Invalid difficulty level. Must be one of: ${QUIZ_DIFFICULTY_LEVELS.join(', ')}`);
    }
    
    const subject = await storage.getSubject(subjectId);
    if (!subject) {
      throw new Error("Subject not found");
    }
    
    if (!apiKey) {
      return this.generateFallbackQuiz(userId, subject, topicName, difficulty, questionCount);
    }

    try {
      const prompt = this.createQuizGenerationPrompt(subject, topicName, difficulty, questionCount);
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an experienced teacher specializing in ${subject.name}. Your task is to create challenging but fair quiz questions that accurately test a student's knowledge.`
          },
          {
            role: "user", 
            content: prompt
          }
        ],
        response_format: { type: "json_object" }
      });
      
      const content = response.choices[0].message.content || '{}';
      const quizData = JSON.parse(content);
      
      const quiz: InsertQuiz = {
        title: quizData.title || `${subject.name} ${topicName ? `- ${topicName} ` : ''}Quiz`,
        description: quizData.description || `A practice quiz on ${subject.name}${topicName ? ` focused on ${topicName}` : ''}.`,
        subjectId,
        topicName: topicName || undefined,
        difficulty,
        timeLimit: Math.floor(questionCount * 1.5),
        passingScore: 70,
        createdBy: userId,
        isAiGenerated: true
      };
      
      const questions: InsertQuizQuestion[] = [];
      
      if (Array.isArray(quizData.questions)) {
        quizData.questions.forEach((q: any, index: number) => {
          let questionType = 'multiple_choice';
          if (q.type && QUESTION_TYPES.includes(q.type as any)) {
            questionType = q.type;
          }
          
          let options = null;
          if (questionType === 'multiple_choice' && Array.isArray(q.options)) {
            options = q.options.map((opt: string, i: number) => ({
              id: String.fromCharCode(65 + i),
              text: opt
            }));
          }
          
          const question: InsertQuizQuestion = {
            quizId: 0,
            questionText: q.question,
            questionType,
            options,
            correctAnswer: q.answer,
            explanation: q.explanation || '',
            points: q.points || 1,
            order: index
          };
          
          questions.push(question);
        });
      }
      
      return { quiz, questions };
    } catch (error) {
      console.error("Error generating practice quiz with AI, using fallback:", error);
      return this.generateFallbackQuiz(userId, subject, topicName, difficulty, questionCount);
    }
  },
  
  createQuizGenerationPrompt(
    subject: Subject,
    topicName: string | null,
    difficulty: string,
    questionCount: number
  ): string {
    return `
      Create a ${difficulty} level quiz about ${subject.name}${topicName ? ` focusing on ${topicName}` : ''}.
      
      Generate ${questionCount} multiple-choice questions with 4 options each.
      
      For each question, include:
      1. The question text
      2. Four options (make sure only one is correct)
      3. The correct answer (specify option letter like A, B, C, or D)
      4. A brief explanation of why the answer is correct
      
      Format your response as a JSON object:
      {
        "title": "Quiz title",
        "description": "Brief description",
        "questions": [
          {
            "question": "Question text",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer": "A", 
            "explanation": "Why A is correct",
            "type": "multiple_choice",
            "points": 1
          }
        ]
      }
    `;
  },

  generateFallbackQuiz(
    userId: number,
    subject: Subject,
    topicName: string | null,
    difficulty: string,
    questionCount: number
  ): { quiz: InsertQuiz; questions: InsertQuizQuestion[] } {
    const quiz: InsertQuiz = {
      title: `${subject.name} - ${topicName || 'Practice'} Quiz`,
      description: `Diagnostic practice quiz covering fundamental principles of ${subject.name}.`,
      subjectId: subject.id,
      topicName: topicName || undefined,
      difficulty,
      timeLimit: Math.max(5, questionCount * 2),
      passingScore: 70,
      createdBy: userId,
      isAiGenerated: true,
    };

    const questions: InsertQuizQuestion[] = [];
    for (let i = 0; i < questionCount; i++) {
      questions.push({
        quizId: 0,
        questionText: `Which of the following is a primary principle in ${subject.name} regarding concept #${i + 1}?`,
        questionType: "multiple_choice",
        options: [
          { id: "A", text: "Fundamental rule and consistent foundation" },
          { id: "B", text: "Secondary observation with limited scope" },
          { id: "C", text: "Random non-deterministic variation" },
          { id: "D", text: "Unsupported assumption" },
        ],
        correctAnswer: "A",
        explanation: "Option A is correct because foundational principles dictate the core concepts in this topic.",
        points: 1,
        order: i,
      });
    }

    return { quiz, questions };
  },

  determinePreferredDifficulty(quizAttempts: any[]): string {
    if (quizAttempts.length === 0) return 'intermediate';
    
    const difficultyCounts: Record<string, number> = {
      beginner: 0,
      intermediate: 0,
      advanced: 0
    };
    
    const successCounts: Record<string, number> = {
      beginner: 0,
      intermediate: 0,
      advanced: 0
    };
    
    quizAttempts.forEach(attempt => {
      if (!attempt.completed) return;
      const difficulty = attempt.quiz?.difficulty || 'intermediate';
      if (difficulty in difficultyCounts) {
        difficultyCounts[difficulty] = (difficultyCounts[difficulty] || 0) + 1;
        if ((attempt.percentageScore || 0) >= 70) {
          successCounts[difficulty] = (successCounts[difficulty] || 0) + 1;
        }
      }
    });
    
    if (successCounts.advanced > 0 && (successCounts.advanced / Math.max(difficultyCounts.advanced, 1)) >= 0.6) {
      return 'advanced';
    }
    if (successCounts.intermediate > 0 && (successCounts.intermediate / Math.max(difficultyCounts.intermediate, 1)) >= 0.7) {
      return 'intermediate';
    }
    return 'beginner';
  },
  
  determineStudyHabit(activities: any[]): string {
    if (activities.length < 5) return 'irregular';
    const dates = activities.map(a => new Date(a.completedAt || a.createdAt).toDateString());
    const uniqueDates = Array.from(new Set(dates));
    const frequency = uniqueDates.length / 14;
    
    if (frequency >= 0.7) return 'daily';
    if (frequency >= 0.3) return 'regular';
    return 'irregular';
  }
};
