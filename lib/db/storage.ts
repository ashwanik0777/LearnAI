import { eq, and, desc, asc, sql } from 'drizzle-orm';
import { db } from './index';
import * as schema from './schema';
import type { DashboardStats, ChartData, StudySession } from '@/lib/types';

export class Storage {
  // Quiz methods
  async getQuizzesBySubject(subjectId: number): Promise<schema.Quiz[]> {
    return await db.select().from(schema.quizzes).where(eq(schema.quizzes.subjectId, subjectId));
  }

  async getQuizById(id: number): Promise<schema.Quiz | undefined> {
    const quizzes = await db.select().from(schema.quizzes).where(eq(schema.quizzes.id, id));
    return quizzes[0];
  }

  async createQuiz(insertQuiz: schema.InsertQuiz): Promise<schema.Quiz> {
    const result = await db.insert(schema.quizzes).values(insertQuiz).returning();
    return result[0];
  }

  async getQuizQuestions(quizId: number): Promise<schema.QuizQuestion[]> {
    return await db.select()
      .from(schema.quizQuestions)
      .where(eq(schema.quizQuestions.quizId, quizId))
      .orderBy(asc(schema.quizQuestions.order));
  }

  async createQuizQuestion(insertQuestion: schema.InsertQuizQuestion): Promise<schema.QuizQuestion> {
    const result = await db.insert(schema.quizQuestions).values(insertQuestion).returning();
    return result[0];
  }

  async getQuizAttemptsByUser(userId: number, quizId?: number): Promise<schema.QuizAttempt[]> {
    if (quizId) {
      return await db.select()
        .from(schema.quizAttempts)
        .where(and(
          eq(schema.quizAttempts.userId, userId),
          eq(schema.quizAttempts.quizId, quizId)
        ))
        .orderBy(desc(schema.quizAttempts.startedAt));
    } else {
      return await db.select()
        .from(schema.quizAttempts)
        .where(eq(schema.quizAttempts.userId, userId))
        .orderBy(desc(schema.quizAttempts.startedAt));
    }
  }

  async createQuizAttempt(insertAttempt: schema.InsertQuizAttempt): Promise<schema.QuizAttempt> {
    const result = await db.insert(schema.quizAttempts).values(insertAttempt).returning();
    return result[0];
  }

  async updateQuizAttempt(id: number, data: Partial<schema.QuizAttempt>): Promise<schema.QuizAttempt | undefined> {
    const result = await db.update(schema.quizAttempts)
      .set({ ...data, completedAt: data.completed ? new Date() : undefined })
      .where(eq(schema.quizAttempts.id, id))
      .returning();
    return result[0];
  }

  async getRecommendedQuizzes(userId: number): Promise<schema.Quiz[]> {
    const progress = await this.getProgressByUser(userId);
    
    if (progress.length === 0) {
      return await db.select().from(schema.quizzes).limit(5);
    }
    
    const sortedProgress = [...progress].sort((a, b) => a.percentComplete - b.percentComplete);
    const weakSubjects = sortedProgress.slice(0, 2).map(p => p.subjectId);
    
    if (weakSubjects.length > 0) {
      const subjectQuizzes = await db.select()
        .from(schema.quizzes)
        .where(sql`${schema.quizzes.subjectId} IN (${sql.join(weakSubjects, sql`, `)})`)
        .limit(5);
      if (subjectQuizzes.length > 0) return subjectQuizzes;
    }
    
    return await db.select().from(schema.quizzes).limit(5);
  }

  // User methods
  async getUser(id: number): Promise<schema.User | undefined> {
    const users = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return users[0];
  }

  async getUserByUsername(username: string): Promise<schema.User | undefined> {
    const users = await db.select().from(schema.users).where(eq(schema.users.username, username));
    return users[0];
  }

  async getUserByEmail(email: string): Promise<schema.User | undefined> {
    const users = await db.select().from(schema.users).where(eq(schema.users.email, email));
    return users[0];
  }

  async createUser(insertUser: schema.InsertUser): Promise<schema.User> {
    const [user] = await db.insert(schema.users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<schema.User>): Promise<schema.User | undefined> {
    const [user] = await db.update(schema.users)
      .set(userData)
      .where(eq(schema.users.id, id))
      .returning();
    return user;
  }

  async updateDashboardLayout(userId: number, layout: any): Promise<schema.User | undefined> {
    return this.updateUser(userId, { dashboardLayout: layout });
  }

  // Profile methods
  async getProfile(userId: number): Promise<schema.Profile | undefined> {
    const profiles = await db.select().from(schema.profiles).where(eq(schema.profiles.userId, userId));
    return profiles[0];
  }

  async createProfile(insertProfile: schema.InsertProfile): Promise<schema.Profile> {
    const [profile] = await db.insert(schema.profiles).values(insertProfile).returning();
    return profile;
  }

  async updateProfile(userId: number, profileData: Partial<schema.Profile>): Promise<schema.Profile | undefined> {
    const existing = await this.getProfile(userId);
    if (!existing) {
      return this.createProfile({ ...profileData, userId } as schema.InsertProfile);
    }
    const [profile] = await db.update(schema.profiles)
      .set({ ...profileData, updatedAt: new Date() })
      .where(eq(schema.profiles.userId, userId))
      .returning();
    return profile;
  }

  // Subject methods
  async getSubjects(): Promise<schema.Subject[]> {
    return db.select().from(schema.subjects).orderBy(asc(schema.subjects.orderIndex), asc(schema.subjects.name));
  }

  async getSubjectsByEducationalLevel(level: string): Promise<schema.Subject[]> {
    return db.select().from(schema.subjects)
      .where(eq(schema.subjects.educationalLevel, level))
      .orderBy(asc(schema.subjects.orderIndex), asc(schema.subjects.name));
  }

  async getSubjectsByStream(stream: string): Promise<schema.Subject[]> {
    return db.select().from(schema.subjects)
      .where(eq(schema.subjects.educationalStream, stream))
      .orderBy(asc(schema.subjects.orderIndex), asc(schema.subjects.name));
  }

  async getSubjectsByGradeLevel(grade: string): Promise<schema.Subject[]> {
    return db.select().from(schema.subjects)
      .where(eq(schema.subjects.gradeLevel, grade))
      .orderBy(asc(schema.subjects.orderIndex), asc(schema.subjects.name));
  }

  async getRelevantSubjectsForUser(userId: number): Promise<schema.Subject[]> {
    const user = await this.getUser(userId);
    if (!user) return this.getSubjects();

    const profile = await this.getProfile(userId);
    if (!profile) return this.getSubjectsByEducationalLevel(user.academicLevel);
    if (profile.showOnlyRelevantContent === false) return this.getSubjects();

    const conditions = [eq(schema.subjects.educationalLevel, user.academicLevel)];
    if (profile.academicStream) {
      conditions.push(eq(schema.subjects.educationalStream, profile.academicStream));
    }
    if (profile.currentGrade) {
      conditions.push(eq(schema.subjects.gradeLevel, profile.currentGrade));
    }

    const matched = await db.select()
      .from(schema.subjects)
      .where(and(...conditions))
      .orderBy(asc(schema.subjects.orderIndex), asc(schema.subjects.name));

    return matched.length > 0 ? matched : this.getSubjects();
  }

  async getSubject(id: number): Promise<schema.Subject | undefined> {
    const subjects = await db.select().from(schema.subjects).where(eq(schema.subjects.id, id));
    return subjects[0];
  }

  async createSubject(insertSubject: schema.InsertSubject): Promise<schema.Subject> {
    const [sub] = await db.insert(schema.subjects).values(insertSubject).returning();
    return sub;
  }

  // Course methods
  async getCourses(): Promise<schema.Course[]> {
    return db.select().from(schema.courses).orderBy(desc(schema.courses.isFeatured), desc(schema.courses.createdAt));
  }

  async getCoursesBySubject(subjectId: number): Promise<schema.Course[]> {
    return db.select().from(schema.courses)
      .where(eq(schema.courses.subjectId, subjectId))
      .orderBy(desc(schema.courses.isFeatured), desc(schema.courses.createdAt));
  }

  async getCourse(id: number): Promise<schema.Course | undefined> {
    const courses = await db.select().from(schema.courses).where(eq(schema.courses.id, id));
    return courses[0];
  }

  async getFeaturedCourses(): Promise<schema.Course[]> {
    return db.select().from(schema.courses)
      .where(eq(schema.courses.isFeatured, true))
      .orderBy(desc(schema.courses.createdAt));
  }

  async getRelevantCoursesForUser(userId: number): Promise<schema.Course[]> {
    const subjects = await this.getRelevantSubjectsForUser(userId);
    if (subjects.length === 0) return this.getCourses();

    const subjectIds = subjects.map(s => s.id);
    return db.select()
      .from(schema.courses)
      .where(sql`${schema.courses.subjectId} IN (${sql.join(subjectIds, sql`, `)})`)
      .orderBy(desc(schema.courses.isFeatured), desc(schema.courses.createdAt));
  }

  async createCourse(insertCourse: schema.InsertCourse): Promise<schema.Course> {
    const [course] = await db.insert(schema.courses).values(insertCourse).returning();
    return course;
  }

  async updateCourse(id: number, courseData: Partial<schema.Course>): Promise<schema.Course | undefined> {
    const [course] = await db.update(schema.courses)
      .set({ ...courseData, updatedAt: new Date() })
      .where(eq(schema.courses.id, id))
      .returning();
    return course;
  }

  // Progress methods
  async getProgressByUser(userId: number): Promise<schema.Progress[]> {
    return db.select().from(schema.progress).where(eq(schema.progress.userId, userId));
  }

  async getProgressByUserAndSubject(userId: number, subjectId: number): Promise<schema.Progress | undefined> {
    const result = await db.select().from(schema.progress)
      .where(and(eq(schema.progress.userId, userId), eq(schema.progress.subjectId, subjectId)));
    return result[0];
  }

  async createProgress(insertProgress: schema.InsertProgress): Promise<schema.Progress> {
    const [p] = await db.insert(schema.progress).values(insertProgress).returning();
    return p;
  }

  async updateProgress(userId: number, subjectId: number, percentComplete: number): Promise<schema.Progress | undefined> {
    const existing = await this.getProgressByUserAndSubject(userId, subjectId);
    if (!existing) {
      return this.createProgress({ userId, subjectId, percentComplete });
    }
    const [p] = await db.update(schema.progress)
      .set({ percentComplete, lastActivity: new Date() })
      .where(and(eq(schema.progress.userId, userId), eq(schema.progress.subjectId, subjectId)))
      .returning();
    return p;
  }

  // Activity methods
  async getActivitiesByUser(userId: number, limit?: number): Promise<schema.Activity[]> {
    if (limit) {
      return db.select().from(schema.activities)
        .where(eq(schema.activities.userId, userId))
        .orderBy(desc(schema.activities.completedAt))
        .limit(limit);
    }
    return db.select().from(schema.activities)
      .where(eq(schema.activities.userId, userId))
      .orderBy(desc(schema.activities.completedAt));
  }

  async createActivity(insertActivity: schema.InsertActivity): Promise<schema.Activity> {
    const [act] = await db.insert(schema.activities).values(insertActivity).returning();
    return act;
  }

  // Study Plan methods
  async getStudyPlanByUserAndDate(userId: number, date: Date): Promise<schema.StudyPlan | undefined> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const plans = await db.select().from(schema.studyPlans)
      .where(
        and(
          eq(schema.studyPlans.userId, userId),
          sql`${schema.studyPlans.date} >= ${startOfDay.toISOString()}::timestamp`,
          sql`${schema.studyPlans.date} <= ${endOfDay.toISOString()}::timestamp`
        )
      );
    return plans[0];
  }

  async createStudyPlan(insertPlan: schema.InsertStudyPlan): Promise<schema.StudyPlan> {
    const [plan] = await db.insert(schema.studyPlans).values(insertPlan).returning();
    return plan;
  }

  async updateStudyPlan(id: number, sessions: any): Promise<schema.StudyPlan | undefined> {
    const [plan] = await db.update(schema.studyPlans).set({ sessions }).where(eq(schema.studyPlans.id, id)).returning();
    return plan;
  }

  // Assessment methods
  async getAssessmentsByUser(userId: number): Promise<schema.Assessment[]> {
    return db.select().from(schema.assessments).where(eq(schema.assessments.userId, userId));
  }

  async createAssessment(insertAssessment: schema.InsertAssessment): Promise<schema.Assessment> {
    const [ass] = await db.insert(schema.assessments).values(insertAssessment).returning();
    return ass;
  }

  // Achievement methods
  async getAchievements(): Promise<schema.Achievement[]> {
    return db.select().from(schema.achievements);
  }

  async getAchievement(id: number): Promise<schema.Achievement | undefined> {
    const achs = await db.select().from(schema.achievements).where(eq(schema.achievements.id, id));
    return achs[0];
  }

  async createAchievement(insertAchievement: schema.InsertAchievement): Promise<schema.Achievement> {
    const [ach] = await db.insert(schema.achievements).values(insertAchievement).returning();
    return ach;
  }

  async getUserAchievements(userId: number): Promise<(schema.UserAchievement & { achievement: schema.Achievement })[]> {
    const uachs = await db.select().from(schema.userAchievements).where(eq(schema.userAchievements.userId, userId));
    const allAchievements = await this.getAchievements();

    return uachs.map(ua => ({
      ...ua,
      achievement: allAchievements.find(a => a.id === ua.achievementId) || {
        id: ua.achievementId,
        name: "Achievement",
        description: "Completed milestone",
        icon: "award",
        category: "learning",
        points: 50,
        xpReward: 100,
        tier: "bronze",
        badgeColor: "#CD7F32",
        criteria: {},
        requiredLevel: 1,
      }
    }));
  }

  async updateUserAchievement(userId: number, achievementId: number, progress: number, isCompleted?: boolean): Promise<schema.UserAchievement | undefined> {
    const existing = await db.select().from(schema.userAchievements)
      .where(and(eq(schema.userAchievements.userId, userId), eq(schema.userAchievements.achievementId, achievementId)));

    if (existing.length === 0) {
      const [ua] = await db.insert(schema.userAchievements).values({
        userId,
        achievementId,
        progress,
        isCompleted: isCompleted || progress >= 100,
        completedAt: isCompleted || progress >= 100 ? new Date() : null,
      }).returning();
      return ua;
    }

    const [ua] = await db.update(schema.userAchievements).set({
      progress,
      isCompleted: isCompleted ?? (progress >= 100),
      completedAt: isCompleted || progress >= 100 ? new Date() : null,
      updatedAt: new Date(),
    }).where(eq(schema.userAchievements.id, existing[0].id)).returning();
    return ua;
  }

  // Mood methods
  async getUserMoods(userId: number, limit?: number): Promise<schema.UserMood[]> {
    if (limit) {
      return db.select().from(schema.userMoods)
        .where(eq(schema.userMoods.userId, userId))
        .orderBy(desc(schema.userMoods.createdAt))
        .limit(limit);
    }
    return db.select().from(schema.userMoods)
      .where(eq(schema.userMoods.userId, userId))
      .orderBy(desc(schema.userMoods.createdAt));
  }

  async getCurrentUserMood(userId: number): Promise<schema.UserMood | undefined> {
    const moods = await db.select().from(schema.userMoods)
      .where(eq(schema.userMoods.userId, userId))
      .orderBy(desc(schema.userMoods.createdAt))
      .limit(1);
    return moods[0];
  }

  async createUserMood(insertMood: schema.InsertUserMood): Promise<schema.UserMood> {
    const [mood] = await db.insert(schema.userMoods).values(insertMood).returning();
    return mood;
  }

  // Recommendations
  async getRecommendationsByUser(userId: number): Promise<schema.Recommendation[]> {
    return db.select().from(schema.recommendations)
      .where(eq(schema.recommendations.userId, userId))
      .orderBy(desc(schema.recommendations.createdAt));
  }

  async getMoodBasedRecommendations(userId: number, moodId: number): Promise<schema.Recommendation[]> {
    return db.select().from(schema.recommendations)
      .where(and(eq(schema.recommendations.userId, userId), eq(schema.recommendations.moodId, moodId)))
      .orderBy(desc(schema.recommendations.createdAt));
  }

  async createRecommendation(rec: schema.InsertRecommendation): Promise<schema.Recommendation> {
    const [newRec] = await db.insert(schema.recommendations).values(rec).returning();
    return newRec;
  }

  // Notes
  async getNotesByUser(userId: number): Promise<schema.Note[]> {
    return db.select().from(schema.notes).where(eq(schema.notes.userId, userId)).orderBy(desc(schema.notes.createdAt));
  }

  async getNoteById(id: number): Promise<schema.Note | undefined> {
    const n = await db.select().from(schema.notes).where(eq(schema.notes.id, id));
    return n[0];
  }

  async createNote(insertNote: schema.InsertNote): Promise<schema.Note> {
    const [note] = await db.insert(schema.notes).values(insertNote).returning();
    return note;
  }

  async updateNote(id: number, data: Partial<schema.Note>): Promise<schema.Note | undefined> {
    const [note] = await db.update(schema.notes).set({ ...data, updatedAt: new Date() }).where(eq(schema.notes.id, id)).returning();
    return note;
  }

  async deleteNote(id: number): Promise<boolean> {
    const res = await db.delete(schema.notes).where(eq(schema.notes.id, id)).returning();
    return res.length > 0;
  }

  // Notifications
  async getNotificationsByUser(userId: number, options?: { limit?: number; onlyUnread?: boolean }): Promise<schema.Notification[]> {
    const conditions = [eq(schema.notifications.userId, userId)];
    if (options?.onlyUnread) conditions.push(eq(schema.notifications.read, false));

    return db.select().from(schema.notifications)
      .where(and(...conditions))
      .orderBy(desc(schema.notifications.createdAt))
      .limit(options?.limit || 100);
  }

  async createNotification(notification: schema.InsertNotification): Promise<schema.Notification> {
    const [n] = await db.insert(schema.notifications).values(notification).returning();
    return n;
  }

  async markNotificationAsRead(id: number): Promise<schema.Notification | undefined> {
    const [n] = await db.update(schema.notifications).set({ read: true }).where(eq(schema.notifications.id, id)).returning();
    return n;
  }

  async markAllNotificationsAsRead(userId: number): Promise<boolean> {
    await db.update(schema.notifications).set({ read: true }).where(and(eq(schema.notifications.userId, userId), eq(schema.notifications.read, false)));
    return true;
  }

  async deleteNotification(id: number): Promise<boolean> {
    const res = await db.delete(schema.notifications).where(eq(schema.notifications.id, id)).returning();
    return res.length > 0;
  }

  async getUnreadNotificationCount(userId: number): Promise<number> {
    const res = await db.select({ count: sql<number>`count(*)` })
      .from(schema.notifications)
      .where(and(eq(schema.notifications.userId, userId), eq(schema.notifications.read, false)));
    return Number(res[0]?.count || 0);
  }

  // Dashboard Stats
  async getDashboardStats(userId: number): Promise<DashboardStats> {
    const progressList = await this.getProgressByUser(userId);
    const coursesInProgress = progressList.length;
    const topicsMastered = progressList.filter(p => p.percentComplete >= 80).length;

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);

    const recentActivities = await db.select()
      .from(schema.activities)
      .where(
        and(
          eq(schema.activities.userId, userId),
          sql`${schema.activities.completedAt} >= ${weekStart.toISOString()}::timestamp`
        )
      );

    const weeklyStudyHours = recentActivities
      .filter(a => a.duration !== null)
      .reduce((total, a) => total + (a.duration || 0), 0) / 60;

    const overallProgress = progressList.length > 0
      ? progressList.reduce((sum, p) => sum + p.percentComplete, 0) / progressList.length
      : 0;

    return {
      coursesInProgress,
      weeklyStudyHours: Math.round(weeklyStudyHours * 10) / 10,
      topicsMastered,
      overallProgress: Math.round(overallProgress),
    };
  }

  async getWeeklyChartData(userId: number): Promise<ChartData> {
    const dates: Date[] = [];
    const labels: string[] = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      date.setHours(0, 0, 0, 0);
      dates.push(date);
      labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
    }

    const startDateStr = dates[0].toISOString();
    const activities = await db.select()
      .from(schema.activities)
      .where(
        and(
          eq(schema.activities.userId, userId),
          sql`${schema.activities.completedAt} >= ${startDateStr}::timestamp`
        )
      );

    const activityCounts = Array(7).fill(0);
    const studyHours = Array(7).fill(0);

    activities.forEach(activity => {
      if (!activity.completedAt) return;
      const activityDate = new Date(activity.completedAt);
      activityDate.setHours(0, 0, 0, 0);

      const dateIndex = dates.findIndex(d => d.getTime() === activityDate.getTime());
      if (dateIndex !== -1) {
        activityCounts[dateIndex]++;
        if (activity.duration) {
          studyHours[dateIndex] += activity.duration / 60;
        }
      }
    });

    return {
      labels,
      datasets: [
        {
          label: 'Activities',
          data: activityCounts,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderWidth: 2,
        },
        {
          label: 'Study Hours',
          data: studyHours.map(h => Math.round(h * 10) / 10),
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.5)',
          borderWidth: 2,
        },
      ],
    };
  }

  async getTodayStudyPlan(userId: number): Promise<StudySession[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const plan = await this.getStudyPlanByUserAndDate(userId, today);

    if (plan && plan.sessions && Array.isArray(plan.sessions)) {
      return plan.sessions as StudySession[];
    }

    const subjects = await this.getSubjects();
    if (subjects.length === 0) return [];

    const profile = await this.getProfile(userId);
    const weaknesses = profile?.weaknesses || [];
    const morningSubject = subjects[0];

    return [
      {
        id: '1',
        startTime: '9:00 AM',
        endTime: '10:30 AM',
        subject: morningSubject.name,
        topic: weaknesses.length > 0 ? `Improving ${weaknesses[0]}` : 'Core Fundamentals',
        priority: 'high',
        duration: 90,
      },
      {
        id: '2',
        startTime: '2:00 PM',
        endTime: '3:00 PM',
        subject: subjects.length > 1 ? subjects[1].name : morningSubject.name,
        topic: 'Review & Practice Exercises',
        priority: 'medium',
        duration: 60,
      }
    ];
  }
}

export const storage = new Storage();
