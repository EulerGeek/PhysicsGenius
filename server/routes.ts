import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all courses
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  // Get lessons by course
  app.get("/api/courses/:courseId/lessons", async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const lessons = await storage.getLessonsByCourse(courseId);
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lessons" });
    }
  });

  // Get user progress
  app.get("/api/users/:userId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  // Update user progress
  app.post("/api/users/:userId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { lessonId, completed, score } = req.body;
      
      const existingProgress = await storage.getUserProgressByLesson(userId, lessonId);
      
      if (existingProgress) {
        const updated = await storage.updateUserProgress(existingProgress.id, {
          completed,
          score,
          completedAt: completed ? new Date().toISOString() : undefined
        });
        res.json(updated);
      } else {
        const newProgress = await storage.createUserProgress({
          userId,
          lessonId,
          completed,
          score,
          completedAt: completed ? new Date().toISOString() : undefined
        });
        res.json(newProgress);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update user progress" });
    }
  });

  // Get user stats
  app.get("/api/users/:userId/stats", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const stats = await storage.getUserStats(userId);
      
      if (!stats) {
        // Create default stats if none exist
        const newStats = await storage.createUserStats({
          userId,
          streak: 0,
          totalXp: 0,
          lessonsCompleted: 0
        });
        res.json(newStats);
      } else {
        res.json(stats);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
