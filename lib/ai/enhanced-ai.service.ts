import { InsertRecommendation, Subject, Profile, User, Activity } from "@/lib/db/schema";
import OpenAI from "openai";
import { storage } from "@/lib/db/storage";
import { openaiService } from "./openai.service";

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey || "dummy-key" });

export type LearningStyle = 'visual' | 'auditory' | 'reading_writing' | 'kinesthetic' | 'mixed';

export const enhancedAiService = {
  async determineLearningStyle(
    userId: number,
    activities: Activity[],
    profile: Profile | undefined
  ): Promise<LearningStyle> {
    try {
      if (activities.length < 5) {
        const preferences = (profile?.preferences as Record<string, any>) || {};
        return (preferences.preferredLearningStyle as LearningStyle) || 'mixed';
      }
      
      const videoActivities = activities.filter(a => a.type === 'video');
      const readingActivities = activities.filter(a => a.type === 'reading');
      const quizActivities = activities.filter(a => a.type === 'quiz');
      const interactiveActivities = activities.filter(a => 
        a.type === 'interactive' || a.type === 'simulation' || a.type === 'game'
      );
      
      const videoAvgScore = this.calculateAvgScore(videoActivities);
      const readingAvgScore = this.calculateAvgScore(readingActivities);
      const quizAvgScore = this.calculateAvgScore(quizActivities);
      const interactiveAvgScore = this.calculateAvgScore(interactiveActivities);
      
      const scores = [
        { type: 'visual', score: videoAvgScore, count: videoActivities.length },
        { type: 'reading_writing', score: readingAvgScore, count: readingActivities.length },
        { type: 'kinesthetic', score: interactiveAvgScore, count: interactiveActivities.length },
        { type: 'reading_writing', score: quizAvgScore * 0.7, count: quizActivities.length }
      ].filter(s => s.count > 0);
      
      if (scores.length === 0) {
        const preferences = (profile?.preferences as Record<string, any>) || {};
        return (preferences.preferredLearningStyle as LearningStyle) || 'mixed';
      }
      
      scores.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return b.count - a.count;
      });
      
      return scores[0].type as LearningStyle;
    } catch {
      return 'mixed';
    }
  },
  
  calculateAvgScore(activities: Activity[]): number {
    if (activities.length === 0) return 0;
    const validScores = activities.filter(a => a.score !== null && a.score !== undefined);
    if (validScores.length === 0) return 0;
    const sum = validScores.reduce((acc, curr) => acc + (curr.score || 0), 0);
    return sum / validScores.length;
  },

  async generateComprehensiveRecommendations(userId: number): Promise<InsertRecommendation[]> {
    try {
      const user = await storage.getUser(userId);
      if (!user) throw new Error("User not found");
      
      const profile = await storage.getProfile(userId);
      const subjects = await storage.getSubjects();
      const progressData = await storage.getProgressByUser(userId);
      
      const subjectsWithProgress = subjects.map(subject => {
        const subjectProgress = progressData.find(p => p.subjectId === subject.id);
        return {
          ...subject,
          progress: subjectProgress?.percentComplete || 0
        };
      });
      
      const activities = await storage.getActivitiesByUser(userId, 50);
      const learningStyle = await this.determineLearningStyle(userId, activities, profile);
      
      const videoRecommendations = await this.generateVideoRecommendations(
        userId,
        user,
        profile,
        learningStyle,
        subjectsWithProgress
      );
      
      const quizRecommendations = await this.generateQuizRecommendations(
        userId,
        user,
        profile, 
        learningStyle,
        subjectsWithProgress
      );
      
      return [...videoRecommendations, ...quizRecommendations];
    } catch (error) {
      console.error("Error generating comprehensive recommendations:", error);
      const user = await storage.getUser(userId);
      const subjects = await storage.getSubjects();
      const progressData = await storage.getProgressByUser(userId);
      
      const subjectsWithProgress = subjects.map(subject => {
        const subjectProgress = progressData.find(p => p.subjectId === subject.id);
        return {
          ...subject,
          progress: subjectProgress?.percentComplete || 0
        };
      });
      
      return openaiService.generateRecommendations(
        userId,
        user?.academicLevel || 'undergraduate',
        subjectsWithProgress
      );
    }
  },

  async generateVideoRecommendations(
    userId: number,
    user: User,
    profile: Profile | undefined,
    learningStyle: LearningStyle,
    subjects: (Subject & { progress: number })[]
  ): Promise<InsertRecommendation[]> {
    if (!apiKey) {
      return this.generateDefaultVideoRecommendations(userId, user, profile, learningStyle, subjects);
    }

    try {
      const sortedSubjects = [...subjects].sort((a, b) => a.progress - b.progress);
      const weakestSubjects = sortedSubjects.slice(0, Math.min(2, sortedSubjects.length));
      const strongestSubjects = sortedSubjects.slice(-Math.min(2, sortedSubjects.length));
      
      const prompt = `
        Generate personalized video learning recommendations for:
        Academic Level: ${user.academicLevel}
        Academic Stream: ${profile?.academicStream || 'Not specified'}
        Learning Style: ${learningStyle}
        Weaknesses: ${weakestSubjects.map(s => s.name).join(', ')}
        Strengths: ${strongestSubjects.map(s => s.name).join(', ')}
        
        Generate 3-4 video recommendations in JSON:
        {
          "recommendations": [
            {
              "title": "Title",
              "description": "Why suitable",
              "subjectName": "Subject",
              "category": "weak_area" | "strength" | "recommended"
            }
          ]
        }
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are an educational AI recommender." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content || '{}';
      const aiResponse = JSON.parse(content);
      
      if (Array.isArray(aiResponse.recommendations)) {
        return aiResponse.recommendations.map((rec: any) => ({
          userId,
          subjectId: this.findSubjectIdByName(rec.subjectName || '', subjects),
          title: rec.title || "Video Learning Resource",
          description: rec.description || "Personalized video recommendation.",
          type: 'video',
          category: rec.category || "recommended",
          resourceUrl: `/courses`
        }));
      }

      return this.generateDefaultVideoRecommendations(userId, user, profile, learningStyle, subjects);
    } catch {
      return this.generateDefaultVideoRecommendations(userId, user, profile, learningStyle, subjects);
    }
  },

  async generateQuizRecommendations(
    userId: number,
    user: User,
    profile: Profile | undefined,
    learningStyle: LearningStyle,
    subjects: (Subject & { progress: number })[]
  ): Promise<InsertRecommendation[]> {
    const sortedSubjects = [...subjects].sort((a, b) => a.progress - b.progress);
    const weakSubjects = sortedSubjects.filter(s => s.progress < 60);
    const strongSubjects = sortedSubjects.filter(s => s.progress >= 85);
    
    const recommendations: InsertRecommendation[] = [];
    
    if (weakSubjects.length > 0) {
      const weak = weakSubjects[0];
      recommendations.push({
        userId,
        subjectId: weak.id,
        title: `${weak.name} Fundamentals Quiz`,
        description: `Strengthen your baseline understanding with a focused practice quiz.`,
        type: 'quiz',
        category: 'weak_area',
        resourceUrl: `/quizzes`
      });
    }

    if (strongSubjects.length > 0) {
      const strong = strongSubjects[0];
      recommendations.push({
        userId,
        subjectId: strong.id,
        title: `${strong.name} Mastery Challenge`,
        description: `Push your limits with advanced problem solving.`,
        type: 'quiz',
        category: 'strength',
        resourceUrl: `/quizzes`
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        userId,
        subjectId: null,
        title: "Adaptive Practice Quiz",
        description: "Test your broad concept retention across active topics.",
        type: 'quiz',
        category: 'recommended',
        resourceUrl: `/quizzes`
      });
    }

    return recommendations;
  },

  findSubjectIdByName(name: string, subjects: (Subject & { progress: number })[]): number | null {
    const subject = subjects.find(s => 
      s.name.toLowerCase() === name.toLowerCase() || 
      s.name.toLowerCase().includes(name.toLowerCase())
    );
    return subject?.id || null;
  },

  generateDefaultVideoRecommendations(
    userId: number,
    user: User,
    profile: Profile | undefined,
    learningStyle: LearningStyle,
    subjects: (Subject & { progress: number })[]
  ): InsertRecommendation[] {
    const sortedSubjects = [...subjects].sort((a, b) => a.progress - b.progress);
    const weakestSubject = sortedSubjects[0];
    const strongestSubject = sortedSubjects[sortedSubjects.length - 1];
    
    const recommendations: InsertRecommendation[] = [];
    
    if (weakestSubject) {
      recommendations.push({
        userId,
        subjectId: weakestSubject.id,
        title: `${weakestSubject.name} Concept Deep Dive`,
        description: `Visual walkthrough simplifying complex mechanisms in ${weakestSubject.name}.`,
        type: 'video',
        category: 'weak_area',
        resourceUrl: `/courses`
      });
    }
    
    if (strongestSubject && strongestSubject.id !== weakestSubject?.id) {
      recommendations.push({
        userId,
        subjectId: strongestSubject.id,
        title: `Advanced ${strongestSubject.name} Applications`,
        description: `Explore higher-order case studies and industry best practices.`,
        type: 'video',
        category: 'strength',
        resourceUrl: `/courses`
      });
    }
    
    return recommendations;
  },

  capitalizeFirstLetter(string: string): string {
    return string.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
};
