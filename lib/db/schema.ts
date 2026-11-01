import { pgTable, text, serial, integer, boolean, timestamp, json, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Notification types
export const NOTIFICATION_TYPES = [
  "new_achievement", 
  "level_up", 
  "course_update", 
  "quiz_reminder", 
  "study_plan_reminder", 
  "system_update",
  "new_recommendation"
] as const;

// Quiz model types
export const QUIZ_DIFFICULTY_LEVELS = ["beginner", "intermediate", "advanced"] as const;
export const QUESTION_TYPES = ["multiple_choice", "true_false", "fill_in_blank", "short_answer"] as const;

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  academicLevel: text("academic_level").notNull(),
  role: text("role").notNull().default('user'), // 'admin', 'subadmin', 'user'
  profileCompleted: boolean("profile_completed").default(false),
  avatarUrl: text("avatar_url"),
  dashboardLayout: json("dashboard_layout"),
  createdAt: timestamp("created_at").defaultNow(),
  // Gamification fields
  level: integer("level").default(1).notNull(),
  xp: integer("xp").default(0).notNull(),
  totalPoints: integer("total_points").default(0).notNull(),
  streak: integer("streak").default(0).notNull(),
  lastActive: timestamp("last_active").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  profileCompleted: true,
  avatarUrl: true,
  dashboardLayout: true,
  level: true,
  xp: true,
  totalPoints: true,
  streak: true,
  lastActive: true,
});

// Profile details model
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  interests: text("interests").array(),
  goals: text("goals").array(),
  weaknesses: text("weaknesses").array(),
  strengths: text("strengths").array(),
  academicStream: text("academic_stream"),
  institution: text("institution"),
  boardOrUniversity: text("board_or_university"),
  graduationYear: integer("graduation_year"),
  currentGrade: text("current_grade"),
  specializationOrMajor: text("specialization_or_major"),
  showOnlyRelevantContent: boolean("show_only_relevant_content").default(true),
  educationalLevel: text("educational_level"),
  preferences: json("preferences"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
  updatedAt: true,
});

// Educational levels constants
export const EDUCATIONAL_LEVELS = [
  "elementary",
  "middle_school",
  "high_school",
  "undergraduate",
  "graduate",
  "post_graduate",
  "competitive_exams",
  "professional_certification"
] as const;

// Educational streams constants
export const EDUCATIONAL_STREAMS = [
  "general",
  "science",
  "commerce",
  "arts",
  "engineering",
  "medical",
  "law",
  "education",
  "computer_science",
  "social_sciences",
  "fine_arts",
  "vocational",
  "other"
] as const;

// Subject model
export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  educationalLevel: text("educational_level").notNull(),
  educationalStream: text("educational_stream").notNull().default("general"),
  gradeLevel: text("grade_level"),
  description: text("description"),
  orderIndex: integer("order_index").default(0),
});

export const insertSubjectSchema = createInsertSchema(subjects).omit({
  id: true,
  orderIndex: true,
});

// Course model
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  subjectId: integer("subject_id").notNull().references(() => subjects.id),
  coverImage: text("cover_image"),
  difficulty: text("difficulty").notNull(),
  estimatedDuration: integer("estimated_duration"),
  prerequisites: text("prerequisites").array(),
  learningOutcomes: text("learning_outcomes").array(),
  contentType: text("content_type").notNull(),
  isPublished: boolean("is_published").default(true),
  isFeatured: boolean("is_featured").default(false),
  contentUrl: text("content_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Progress model
export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  subjectId: integer("subject_id").notNull().references(() => subjects.id),
  percentComplete: integer("percent_complete").notNull(),
  lastActivity: timestamp("last_activity").defaultNow(),
});

export const insertProgressSchema = createInsertSchema(progress).omit({
  id: true,
  lastActivity: true,
});

// Activity model
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  subjectId: integer("subject_id").references(() => subjects.id),
  type: text("type").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  score: integer("score"),
  duration: integer("duration"),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  completedAt: true,
});

// Study Plan model
export const studyPlans = pgTable("study_plans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  date: timestamp("date").notNull(),
  sessions: json("sessions").notNull(),
});

export const insertStudyPlanSchema = createInsertSchema(studyPlans).omit({
  id: true,
});

// Assessment model
export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  subjectId: integer("subject_id").references(() => subjects.id),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date").notNull(),
  type: text("type").notNull(),
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
});

// Achievement model
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(),
  points: integer("points").notNull(),
  xpReward: integer("xp_reward").default(0).notNull(),
  tier: text("tier").default("bronze").notNull(),
  badgeColor: text("badge_color").default("#CD7F32").notNull(),
  criteria: json("criteria").notNull(),
  requiredLevel: integer("required_level").default(1),
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  xpReward: true,
  tier: true,
  badgeColor: true,
  requiredLevel: true,
});

// User Achievements model
export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  achievementId: integer("achievement_id").notNull().references(() => achievements.id),
  progress: integer("progress").notNull().default(0),
  isCompleted: boolean("is_completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({
  id: true,
  completedAt: true,
  updatedAt: true,
});

// User Mood model
export const userMoods = pgTable("user_moods", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  mood: text("mood").notNull(),
  energy: integer("energy").notNull(),
  focus: integer("focus").notNull(),
  stress: integer("stress").notNull(),
  receptiveness: integer("receptiveness").notNull(),
  description: text("description"),
  suggestedActivities: text("suggested_activities").array(),
  contentType: text("content_type").notNull(),
  difficultyPreference: text("difficulty_preference").notNull(),
  sessionDuration: text("session_duration").notNull(),
  learningMode: text("learning_mode").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserMoodSchema = createInsertSchema(userMoods).omit({
  id: true,
  createdAt: true,
});

// Recommendations model
export const recommendations = pgTable("recommendations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  subjectId: integer("subject_id").references(() => subjects.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  category: text("category").notNull(),
  resourceUrl: text("resource_url"),
  moodId: integer("mood_id").references(() => userMoods.id),
  contentType: text("content_type"),
  difficulty: text("difficulty"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRecommendationSchema = createInsertSchema(recommendations).omit({
  id: true,
  createdAt: true,
});

// Quiz model
export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  subjectId: integer("subject_id").references(() => subjects.id),
  topicName: text("topic_name"),
  difficulty: text("difficulty").notNull(),
  timeLimit: integer("time_limit"),
  passingScore: integer("passing_score").default(70),
  createdBy: integer("created_by").references(() => users.id),
  isAiGenerated: boolean("is_ai_generated").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertQuizSchema = createInsertSchema(quizzes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Quiz Question model
export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").notNull().references(() => quizzes.id),
  questionText: text("question_text").notNull(),
  questionType: text("question_type").notNull(),
  options: jsonb("options"),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation"),
  points: integer("points").default(1),
  order: integer("order").default(0),
});

export const insertQuizQuestionSchema = createInsertSchema(quizQuestions).omit({
  id: true,
});

// Quiz Attempt model
export const quizAttempts = pgTable("quiz_attempts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  quizId: integer("quiz_id").notNull().references(() => quizzes.id),
  score: integer("score"),
  maxScore: integer("max_score"),
  percentageScore: integer("percentage_score"),
  timeSpent: integer("time_spent"),
  completed: boolean("completed").default(false),
  answers: jsonb("answers"),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const insertQuizAttemptSchema = createInsertSchema(quizAttempts).omit({
  id: true,
  completedAt: true,
  startedAt: true,
});

// Notes model
export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  subjectId: integer("subject_id").references(() => subjects.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  sessionId: text("session_id"),
  isAiGenerated: boolean("is_ai_generated").default(false),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertNoteSchema = createInsertSchema(notes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Notifications model
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  type: text("type").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  relatedId: integer("related_id"),
  relatedType: text("related_type"),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  read: true,
  createdAt: true,
});

// Types export
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;

export type Subject = typeof subjects.$inferSelect;
export type InsertSubject = z.infer<typeof insertSubjectSchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type Progress = typeof progress.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;

export type StudyPlan = typeof studyPlans.$inferSelect;
export type InsertStudyPlan = z.infer<typeof insertStudyPlanSchema>;

export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;

export type UserMood = typeof userMoods.$inferSelect;
export type InsertUserMood = z.infer<typeof insertUserMoodSchema>;

export type Recommendation = typeof recommendations.$inferSelect;
export type InsertRecommendation = z.infer<typeof insertRecommendationSchema>;

export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;

export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;

export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type InsertQuizAttempt = z.infer<typeof insertQuizAttemptSchema>;

export type Note = typeof notes.$inferSelect;
export type InsertNote = z.infer<typeof insertNoteSchema>;

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
