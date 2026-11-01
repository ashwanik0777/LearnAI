import type { 
  User, Profile, Subject, Progress, 
  Activity, StudyPlan, Assessment, Recommendation 
} from "@/lib/db/schema";

// Academic Levels
export type AcademicLevel = 
  | "elementary" 
  | "middle_school" 
  | "high_school" 
  | "undergraduate" 
  | "graduate" 
  | "postgraduate";

// Academic Streams
export type AcademicStream = 
  | "general" 
  | "science" 
  | "commerce" 
  | "arts" 
  | "engineering" 
  | "medical" 
  | "law" 
  | "humanities" 
  | "business" 
  | "education" 
  | "computer_science" 
  | "other";

// Education Board Types
export type EducationBoardType =
  | "cbse"
  | "icse"
  | "state_board"
  | "igcse"
  | "ib"
  | "cambridge"
  | "other";

// Dashboard Stats
export interface DashboardStats {
  coursesInProgress: number;
  weeklyStudyHours: number;
  topicsMastered: number;
  overallProgress: number;
}

// Chart Data
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill?: boolean;
    tension?: number;
    borderWidth?: number;
  }[];
}

// Study Session
export interface StudySession {
  id: string;
  startTime: string; // in format "9:00 AM"
  endTime: string; // in format "10:30 AM"
  subject: string;
  topic: string;
  priority: "high" | "medium" | "low";
  duration: number; // in minutes
}

// Auth
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  email: string;
  fullName: string;
  academicLevel: AcademicLevel;
}

// User context
export interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<any>;
}

// Study Activity Data for Heatmap
export interface StudyActivityData {
  date: string;
  subject: string;
  intensity: number; // 1-5 scale
  duration: number; // in minutes
  progress: number; // percentage completion of a study goal
  topics: string[];
}

// Full Dashboard Data
export interface DashboardData {
  user: User;
  profile: Profile;
  stats: DashboardStats;
  subjects: (Subject & { progress: number })[];
  weeklyData: ChartData;
  recommendations: Recommendation[];
  activities: Activity[];
  studyPlan: StudySession[];
  assessments: Assessment[];
  studyActivities: StudyActivityData[];
}
