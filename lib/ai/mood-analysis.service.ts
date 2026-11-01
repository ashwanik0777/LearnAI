import { InsertRecommendation, InsertUserMood } from "@/lib/db/schema";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey || "dummy-key" });

export type MoodInput = {
  moodDescription: string;
  recentActivities?: string;
  sleepQuality?: string;
  stressLevel?: string;
  learningGoal?: string;
};

export type MoodAnalysisResult = {
  mood: string;
  energy: number;
  focus: number;
  stress: number;
  receptiveness: number;
  suggestedActivities: string[];
  contentType: 'video' | 'text' | 'interactive' | 'mixed';
  difficultyPreference: 'easier' | 'moderate' | 'challenging';
  sessionDuration: 'short' | 'medium' | 'long';
  learningMode: 'exploratory' | 'focused' | 'review' | 'practice';
};

export const moodAnalysisService = {
  async analyzeMood(moodInput: MoodInput): Promise<MoodAnalysisResult> {
    if (!apiKey) {
      return this.getDefaultMoodAnalysis(moodInput.moodDescription);
    }

    try {
      const context = `
        Mood Description: ${moodInput.moodDescription}
        ${moodInput.recentActivities ? `Recent Activities: ${moodInput.recentActivities}` : ''}
        ${moodInput.sleepQuality ? `Sleep Quality: ${moodInput.sleepQuality}` : ''}
        ${moodInput.stressLevel ? `Stress Level: ${moodInput.stressLevel}` : ''}
        ${moodInput.learningGoal ? `Learning Goal: ${moodInput.learningGoal}` : ''}
      `;

      const prompt = `
        Analyze the following user's mood and learning state. 
        Determine their overall mood, energy level, focus ability, stress level, and receptiveness to learning.
        Also suggest appropriate learning activities, content types, difficulty level, session duration, and learning mode.
        
        Format your response as a JSON object:
        {
          "mood": "specific mood string",
          "energy": number between 1-10,
          "focus": number between 1-10,
          "stress": number between 1-10,
          "receptiveness": number between 1-10,
          "suggestedActivities": ["activity1", "activity2", "activity3"],
          "contentType": "video" | "text" | "interactive" | "mixed",
          "difficultyPreference": "easier" | "moderate" | "challenging",
          "sessionDuration": "short" | "medium" | "long",
          "learningMode": "exploratory" | "focused" | "review" | "practice"
        }
        
        User context:
        ${context}
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an educational psychology AI assistant specializing in analyzing mood and recommending optimal learning conditions."
          },
          {
            role: "user", 
            content: prompt
          }
        ],
        response_format: { type: "json_object" }
      });
      
      const content = response.choices[0].message.content || '{}';
      const parsedResponse = JSON.parse(content);
      
      return {
        mood: parsedResponse.mood || "neutral",
        energy: this.ensureNumberInRange(parsedResponse.energy, 1, 10, 5),
        focus: this.ensureNumberInRange(parsedResponse.focus, 1, 10, 5),
        stress: this.ensureNumberInRange(parsedResponse.stress, 1, 10, 5),
        receptiveness: this.ensureNumberInRange(parsedResponse.receptiveness, 1, 10, 5),
        suggestedActivities: Array.isArray(parsedResponse.suggestedActivities) 
          ? parsedResponse.suggestedActivities
          : ["Read short articles", "Watch educational videos", "Do simple practice exercises"],
        contentType: this.validateContentType(parsedResponse.contentType),
        difficultyPreference: this.validateDifficulty(parsedResponse.difficultyPreference),
        sessionDuration: this.validateDuration(parsedResponse.sessionDuration),
        learningMode: this.validateLearningMode(parsedResponse.learningMode)
      };
    } catch (error) {
      console.error("Mood analysis error, using default fallback:", error);
      return this.getDefaultMoodAnalysis(moodInput.moodDescription);
    }
  },

  ensureNumberInRange(value: any, min: number, max: number, defaultValue: number): number {
    if (typeof value !== 'number' || isNaN(value)) {
      return defaultValue;
    }
    return Math.max(min, Math.min(max, Math.round(value)));
  },
  
  validateContentType(value: any): 'video' | 'text' | 'interactive' | 'mixed' {
    const validValues = ['video', 'text', 'interactive', 'mixed'];
    return validValues.includes(value) ? value : 'mixed';
  },
  
  validateDifficulty(value: any): 'easier' | 'moderate' | 'challenging' {
    const validValues = ['easier', 'moderate', 'challenging'];
    return validValues.includes(value) ? value : 'moderate';
  },
  
  validateDuration(value: any): 'short' | 'medium' | 'long' {
    const validValues = ['short', 'medium', 'long'];
    return validValues.includes(value) ? value : 'medium';
  },
  
  validateLearningMode(value: any): 'exploratory' | 'focused' | 'review' | 'practice' {
    const validValues = ['exploratory', 'focused', 'review', 'practice'];
    return validValues.includes(value) ? value : 'focused';
  },
  
  getDefaultMoodAnalysis(moodDescription: string): MoodAnalysisResult {
    const lowercaseMood = moodDescription.toLowerCase();
    const baseMood: MoodAnalysisResult = {
      mood: "neutral",
      energy: 5,
      focus: 5,
      stress: 5,
      receptiveness: 5,
      suggestedActivities: ["Read short articles", "Watch educational videos", "Complete interactive quizzes"],
      contentType: 'mixed',
      difficultyPreference: 'moderate',
      sessionDuration: 'medium',
      learningMode: 'focused'
    };
    
    if (lowercaseMood.includes('tired') || lowercaseMood.includes('exhausted') || lowercaseMood.includes('sleepy')) {
      return {
        ...baseMood,
        mood: "tired",
        energy: 3,
        focus: 4,
        contentType: 'video',
        difficultyPreference: 'easier',
        sessionDuration: 'short',
        suggestedActivities: ["Watch short educational videos", "Review simple concepts"]
      };
    } else if (lowercaseMood.includes('stressed') || lowercaseMood.includes('anxious') || lowercaseMood.includes('overwhelmed')) {
      return {
        ...baseMood,
        mood: "stressed",
        stress: 8,
        focus: 4,
        receptiveness: 4,
        contentType: 'interactive',
        difficultyPreference: 'easier',
        learningMode: 'review',
        suggestedActivities: ["Review familiar material", "Practice with interactive exercises", "Take short breaks"]
      };
    } else if (lowercaseMood.includes('happy') || lowercaseMood.includes('energetic') || lowercaseMood.includes('motivated')) {
      return {
        ...baseMood,
        mood: "energetic",
        energy: 8,
        focus: 7,
        stress: 3,
        receptiveness: 8,
        contentType: 'interactive',
        difficultyPreference: 'challenging',
        sessionDuration: 'long',
        learningMode: 'exploratory',
        suggestedActivities: ["Tackle challenging problems", "Explore new advanced topics"]
      };
    }
    
    return baseMood;
  },
  
  async generateMoodBasedRecommendations(
    userId: number,
    moodId: number,
    moodAnalysis: MoodAnalysisResult,
    subjects: string[]
  ): Promise<InsertRecommendation[]> {
    if (!apiKey) {
      return this.generateDefaultMoodRecommendations(userId, moodId, moodAnalysis);
    }

    try {
      const prompt = `
        Generate personalized learning recommendations based on the following mood analysis:
        Mood: ${moodAnalysis.mood}
        Energy Level: ${moodAnalysis.energy}/10
        Focus Level: ${moodAnalysis.focus}/10
        Stress Level: ${moodAnalysis.stress}/10
        Learning Receptiveness: ${moodAnalysis.receptiveness}/10
        Preferred Content Type: ${moodAnalysis.contentType}
        Difficulty Preference: ${moodAnalysis.difficultyPreference}
        Session Duration: ${moodAnalysis.sessionDuration}
        Learning Mode: ${moodAnalysis.learningMode}
        Subject Areas: ${subjects.join(', ')}
        
        Generate 3-4 personalized recommendations in JSON:
        {
          "recommendations": [
            {
              "title": "Title",
              "description": "Why suitable",
              "type": "activity" | "resource" | "exercise" | "media",
              "category": "mood_based" | "focus_enhancing" | "stress_reducing" | "energy_matching",
              "contentType": "video" | "text" | "interactive" | "mixed",
              "difficulty": "easier" | "moderate" | "challenging"
            }
          ]
        }
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are an educational AI assistant specializing in mood-based learning recommendations." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      });
      
      const content = response.choices[0].message.content || '{}';
      const aiResponse = JSON.parse(content);
      
      if (Array.isArray(aiResponse.recommendations)) {
        return aiResponse.recommendations.map((rec: any) => ({
          userId,
          moodId,
          title: rec.title || "Mood-based Recommendation",
          description: rec.description || "Personalized recommendation based on your current mood.",
          type: rec.type || "activity",
          category: rec.category || "mood_based",
          contentType: rec.contentType || moodAnalysis.contentType,
          difficulty: rec.difficulty || moodAnalysis.difficultyPreference,
          resourceUrl: null
        }));
      }

      return this.generateDefaultMoodRecommendations(userId, moodId, moodAnalysis);
    } catch (error) {
      console.error("OpenAI mood recommendation error, using fallback:", error);
      return this.generateDefaultMoodRecommendations(userId, moodId, moodAnalysis);
    }
  },
  
  generateDefaultMoodRecommendations(
    userId: number,
    moodId: number,
    moodAnalysis: MoodAnalysisResult
  ): InsertRecommendation[] {
    const recommendations: InsertRecommendation[] = [
      {
        userId,
        moodId,
        title: "Focus-Enhancing Session",
        description: "A tailored activity to support your current energy and learning focus.",
        type: "activity",
        category: "focus_enhancing",
        contentType: moodAnalysis.contentType,
        difficulty: moodAnalysis.difficultyPreference,
        resourceUrl: null
      },
      {
        userId,
        moodId,
        title: "Balanced Learning Module",
        description: "Engaging step-by-step module aligned with your study objectives.",
        type: "exercise",
        category: "mood_based",
        contentType: "interactive",
        difficulty: "moderate",
        resourceUrl: null
      },
      {
        userId,
        moodId,
        title: "Adaptive Concept Review",
        description: "Quick concept reinforcement suited to your session pacing.",
        type: "resource",
        category: "energy_matching",
        contentType: "video",
        difficulty: "easier",
        resourceUrl: null
      }
    ];
    return recommendations;
  },
  
  formatUserMood(
    userId: number, 
    moodInput: MoodInput, 
    moodAnalysis: MoodAnalysisResult
  ): InsertUserMood {
    return {
      userId,
      mood: moodAnalysis.mood,
      description: moodInput.moodDescription,
      energy: moodAnalysis.energy,
      focus: moodAnalysis.focus,
      stress: moodAnalysis.stress,
      receptiveness: moodAnalysis.receptiveness,
      suggestedActivities: moodAnalysis.suggestedActivities,
      contentType: moodAnalysis.contentType,
      difficultyPreference: moodAnalysis.difficultyPreference,
      sessionDuration: moodAnalysis.sessionDuration,
      learningMode: moodAnalysis.learningMode
    };
  }
};
