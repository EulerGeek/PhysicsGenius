import { 
  users, 
  courses, 
  lessons, 
  userProgress, 
  userStats,
  type User, 
  type Course, 
  type Lesson, 
  type UserProgress, 
  type UserStats,
  type InsertUser, 
  type InsertCourse, 
  type InsertLesson, 
  type InsertUserProgress, 
  type InsertUserStats 
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Course methods
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Lesson methods
  getLessons(): Promise<Lesson[]>;
  getLessonsByCourse(courseId: number): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  
  // Progress methods
  getUserProgress(userId: number): Promise<UserProgress[]>;
  getUserProgressByLesson(userId: number, lessonId: number): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(id: number, progress: Partial<UserProgress>): Promise<UserProgress | undefined>;
  
  // Stats methods
  getUserStats(userId: number): Promise<UserStats | undefined>;
  createUserStats(stats: InsertUserStats): Promise<UserStats>;
  updateUserStats(userId: number, stats: Partial<UserStats>): Promise<UserStats | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course || undefined;
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const [course] = await db
      .insert(courses)
      .values(insertCourse)
      .returning();
    return course;
  }

  async getLessons(): Promise<Lesson[]> {
    return await db.select().from(lessons);
  }

  async getLessonsByCourse(courseId: number): Promise<Lesson[]> {
    return await db.select().from(lessons).where(eq(lessons.courseId, courseId));
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    return lesson || undefined;
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const [lesson] = await db
      .insert(lessons)
      .values(insertLesson)
      .returning();
    return lesson;
  }

  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return await db.select().from(userProgress).where(eq(userProgress.userId, userId));
  }

  async getUserProgressByLesson(userId: number, lessonId: number): Promise<UserProgress | undefined> {
    const [progress] = await db
      .select()
      .from(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.lessonId, lessonId)));
    return progress || undefined;
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const [progress] = await db
      .insert(userProgress)
      .values(insertProgress)
      .returning();
    return progress;
  }

  async updateUserProgress(id: number, updates: Partial<UserProgress>): Promise<UserProgress | undefined> {
    const [updated] = await db
      .update(userProgress)
      .set(updates)
      .where(eq(userProgress.id, id))
      .returning();
    return updated || undefined;
  }

  async getUserStats(userId: number): Promise<UserStats | undefined> {
    const [stats] = await db.select().from(userStats).where(eq(userStats.userId, userId));
    return stats || undefined;
  }

  async createUserStats(insertStats: InsertUserStats): Promise<UserStats> {
    const [stats] = await db
      .insert(userStats)
      .values(insertStats)
      .returning();
    return stats;
  }

  async updateUserStats(userId: number, updates: Partial<UserStats>): Promise<UserStats | undefined> {
    const [updated] = await db
      .update(userStats)
      .set(updates)
      .where(eq(userStats.userId, userId))
      .returning();
    return updated || undefined;
  }
}

export const storage = new DatabaseStorage();
