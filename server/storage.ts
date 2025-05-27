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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private lessons: Map<number, Lesson>;
  private userProgress: Map<number, UserProgress>;
  private userStats: Map<number, UserStats>;
  private currentUserId: number;
  private currentCourseId: number;
  private currentLessonId: number;
  private currentProgressId: number;
  private currentStatsId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.lessons = new Map();
    this.userProgress = new Map();
    this.userStats = new Map();
    this.currentUserId = 1;
    this.currentCourseId = 1;
    this.currentLessonId = 1;
    this.currentProgressId = 1;
    this.currentStatsId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize courses
    const coursesData = [
      { title: "Classical Mechanics", description: "Master the fundamentals of motion and forces", icon: "fas fa-rocket", color: "bg-blue-50", totalLessons: 15 },
      { title: "General Relativity", description: "Explore spacetime and gravity", icon: "fas fa-infinity", color: "bg-purple-50", totalLessons: 10 },
      { title: "Quantum Mechanics", description: "Discover the quantum world", icon: "fas fa-wave-square", color: "bg-amber-50", totalLessons: 12 }
    ];

    coursesData.forEach(courseData => {
      const course: Course = { ...courseData, id: this.currentCourseId++ };
      this.courses.set(course.id, course);
    });

    // Initialize lessons for Classical Mechanics
    const classicalLessons = [
      { courseId: 1, title: "Introduction to Motion", description: "Understanding position, velocity, and acceleration in one dimension", content: {}, order: 1, duration: "15 min", xpReward: 100 },
      { courseId: 1, title: "Forces and Newton's Laws", description: "Explore the fundamental laws that govern motion and interactions", content: {}, order: 2, duration: "20 min", xpReward: 120 },
      { courseId: 1, title: "Work and Energy", description: "Understand the relationship between work, kinetic and potential energy", content: {}, order: 3, duration: "18 min", xpReward: 110 }
    ];

    classicalLessons.forEach(lessonData => {
      const lesson: Lesson = { ...lessonData, id: this.currentLessonId++ };
      this.lessons.set(lesson.id, lesson);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Course methods
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentCourseId++;
    const course: Course = { ...insertCourse, id };
    this.courses.set(id, course);
    return course;
  }

  // Lesson methods
  async getLessons(): Promise<Lesson[]> {
    return Array.from(this.lessons.values());
  }

  async getLessonsByCourse(courseId: number): Promise<Lesson[]> {
    return Array.from(this.lessons.values()).filter(lesson => lesson.courseId === courseId);
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const id = this.currentLessonId++;
    const lesson: Lesson = { ...insertLesson, id };
    this.lessons.set(id, lesson);
    return lesson;
  }

  // Progress methods
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(progress => progress.userId === userId);
  }

  async getUserProgressByLesson(userId: number, lessonId: number): Promise<UserProgress | undefined> {
    return Array.from(this.userProgress.values()).find(
      progress => progress.userId === userId && progress.lessonId === lessonId
    );
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = this.currentProgressId++;
    const progress: UserProgress = { ...insertProgress, id };
    this.userProgress.set(id, progress);
    return progress;
  }

  async updateUserProgress(id: number, updates: Partial<UserProgress>): Promise<UserProgress | undefined> {
    const existing = this.userProgress.get(id);
    if (!existing) return undefined;
    
    const updated: UserProgress = { ...existing, ...updates };
    this.userProgress.set(id, updated);
    return updated;
  }

  // Stats methods
  async getUserStats(userId: number): Promise<UserStats | undefined> {
    return Array.from(this.userStats.values()).find(stats => stats.userId === userId);
  }

  async createUserStats(insertStats: InsertUserStats): Promise<UserStats> {
    const id = this.currentStatsId++;
    const stats: UserStats = { ...insertStats, id };
    this.userStats.set(id, stats);
    return stats;
  }

  async updateUserStats(userId: number, updates: Partial<UserStats>): Promise<UserStats | undefined> {
    const existing = Array.from(this.userStats.values()).find(stats => stats.userId === userId);
    if (!existing) return undefined;
    
    const updated: UserStats = { ...existing, ...updates };
    this.userStats.set(existing.id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
