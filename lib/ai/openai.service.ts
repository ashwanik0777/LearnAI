import { InsertRecommendation, Subject } from "@/lib/db/schema";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.warn('OPENAI_API_KEY not found in environment. AI features will use fallback methods.');
}
const openai = new OpenAI({ apiKey: apiKey || "dummy-key" });

export const openaiService = {
  async generateRecommendations(
    userId: number,
    academicLevel: string,
    subjects: (Subject & { progress: number })[]
  ): Promise<InsertRecommendation[]> {
    if (!apiKey) {
      return this.generateDefaultRecommendations(userId, academicLevel, subjects);
    }

    try {
      const sortedSubjects = [...subjects].sort((a, b) => a.progress - b.progress);
      const weakestSubject = sortedSubjects[0] || { name: "General Knowledge", progress: 50, id: null };
      const strongestSubject = sortedSubjects[sortedSubjects.length - 1] || { name: "General Knowledge", progress: 75, id: null };
      
      const prompt = `
        Generate personalized learning recommendations for a student with the following profile:
        
        Academic Level: ${academicLevel}
        
        Subjects Progress:
        ${subjects.map(s => `- ${s.name}: ${s.progress}% mastery`).join('\n')}
        
        Weakest Subject: ${weakestSubject.name} (${weakestSubject.progress}%)
        Strongest Subject: ${strongestSubject.name} (${strongestSubject.progress}%)
        
        Generate 3-4 personalized learning recommendations. Each recommendation should include:
        - A title (concise, engaging)
        - A description (personalized explanation why this is recommended)
        - Type (one of: 'improvement', 'course', 'exercise', 'resource')
        - Category (one of: 'weak_area', 'strength', 'recommended')
        - Related subject ID (can be null for general recommendations)
        - Resource URL (in format: /resources/subject-name, /courses/subject-name/level, or /exercises/subject-name)
        
        Format your response as a JSON object with an array of recommendations.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an educational AI assistant that specializes in creating personalized learning recommendations for students based on their academic profile."
          },
          {
            role: "user", 
            content: prompt
          }
        ],
        response_format: { type: "json_object" }
      });
      
      let recommendations: InsertRecommendation[] = [];
      
      try {
        const content = response.choices[0].message.content || '{}';
        const aiResponse = JSON.parse(content);
        
        if (Array.isArray(aiResponse.recommendations)) {
          recommendations = aiResponse.recommendations.map((rec: any) => ({
            userId,
            subjectId: rec.subjectId || null,
            title: rec.title || "AI Recommendation",
            description: rec.description || "Personalized recommendation for your learning journey.",
            type: rec.type || "course",
            category: rec.category || "recommended",
            resourceUrl: rec.resourceUrl || "/resources/general"
          }));
        }
      } catch (error) {
        console.error("Error parsing OpenAI response:", error);
        return this.generateDefaultRecommendations(userId, academicLevel, subjects);
      }
      
      if (recommendations.length === 0) {
        return this.generateDefaultRecommendations(userId, academicLevel, subjects);
      }
      
      return recommendations;
    } catch (error) {
      console.error("OpenAI API error:", error);
      return this.generateDefaultRecommendations(userId, academicLevel, subjects);
    }
  },
  
  generateDefaultRecommendations(
    userId: number,
    academicLevel: string,
    subjects: (Subject & { progress: number })[]
  ): InsertRecommendation[] {
    const sortedSubjects = [...subjects].sort((a, b) => a.progress - b.progress);
    const weakestSubject = sortedSubjects[0];
    const strongestSubject = sortedSubjects[sortedSubjects.length - 1];
    
    const recommendations: InsertRecommendation[] = [];
    
    if (weakestSubject && weakestSubject.progress < 65) {
      recommendations.push({
        userId,
        subjectId: weakestSubject.id,
        title: `${weakestSubject.name} Improvement Plan`,
        description: `Based on your recent assessments, we've identified ${weakestSubject.name} as an area that needs attention. We've created a customized study plan to help you improve.`,
        type: 'improvement',
        category: 'weak_area',
        resourceUrl: `/resources/${weakestSubject.name.toLowerCase()}`
      });
    }
    
    if (strongestSubject && strongestSubject.progress > 70) {
      recommendations.push({
        userId,
        subjectId: strongestSubject.id,
        title: `Advanced ${strongestSubject.name} Course`,
        description: `You're excelling in ${strongestSubject.name}! Take your skills to the next level with this advanced course tailored to your current proficiency level.`,
        type: 'course',
        category: 'strength',
        resourceUrl: `/courses/${strongestSubject.name.toLowerCase()}/advanced`
      });
    }
    
    const midLevelSubject = subjects.find(s => s.progress >= 65 && s.progress <= 80);
    if (midLevelSubject) {
      recommendations.push({
        userId,
        subjectId: midLevelSubject.id,
        title: `Interactive ${midLevelSubject.name} Exercises`,
        description: `These interactive exercises complement your current ${midLevelSubject.name} curriculum and will help reinforce key concepts through practical applications.`,
        type: 'exercise',
        category: 'recommended',
        resourceUrl: `/exercises/${midLevelSubject.name.toLowerCase()}`
      });
    }
    
    let levelSpecificRec: InsertRecommendation;
    
    switch (academicLevel) {
      case 'elementary':
      case 'middle_school':
        levelSpecificRec = {
          userId,
          subjectId: null,
          title: 'Fun Learning Games',
          description: 'Engaging educational games that make learning enjoyable while reinforcing important concepts across all subjects.',
          type: 'exercise',
          category: 'recommended',
          resourceUrl: '/resources/learning-games'
        };
        break;
        
      case 'high_school':
        levelSpecificRec = {
          userId,
          subjectId: null,
          title: 'SAT/ACT Preparation Resources',
          description: 'Start preparing for college entrance exams with these specialized resources designed to boost your scores.',
          type: 'course',
          category: 'recommended',
          resourceUrl: '/courses/test-prep'
        };
        break;
        
      case 'undergraduate':
      case 'graduate':
      case 'postgraduate':
        levelSpecificRec = {
          userId,
          subjectId: null,
          title: 'Research Methodology Workshop',
          description: 'Enhance your research skills with this comprehensive workshop on methodology, data analysis, and paper writing.',
          type: 'course',
          category: 'recommended',
          resourceUrl: '/courses/research-methods'
        };
        break;
        
      default:
        levelSpecificRec = {
          userId,
          subjectId: null,
          title: 'Study Skills Masterclass',
          description: 'Learn effective study techniques that can be applied to any subject to maximize your learning efficiency.',
          type: 'course',
          category: 'recommended',
          resourceUrl: '/courses/study-skills'
        };
    }
    
    recommendations.push(levelSpecificRec);
    return recommendations;
  }
};
