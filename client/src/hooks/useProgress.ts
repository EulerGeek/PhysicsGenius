
import { useState, useEffect } from "react";

interface UserProgress {
  streak: number;
  overallProgress: number;
  totalLessonsCompleted: number;
  completedLessons: Record<string, number>;
  scores: Record<string, number>;
}

const defaultProgress: UserProgress = {
  streak: 7,
  overallProgress: 30,
  totalLessonsCompleted: 12,
  completedLessons: {
    classical: 4,
    relativity: 1,
    quantum: 0
  },
  scores: {
    "cm-1": 850,
    "cm-2": 920,
    "cm-3": 780,
    "cm-4": 890,
    "rel-1": 750
  }
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);

  useEffect(() => {
    const saved = localStorage.getItem("quoma-progress");
    if (saved) {
      try {
        const parsedProgress = JSON.parse(saved);
        setProgress({ ...defaultProgress, ...parsedProgress });
      } catch (error) {
        console.error("Failed to parse saved progress:", error);
      }
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    localStorage.setItem("quoma-progress", JSON.stringify(newProgress));
    setProgress(newProgress);
  };

  const updateProgress = (lessonId: string, completed: boolean, score?: number) => {
    const newProgress = { ...progress };
    
    if (completed && score) {
      newProgress.scores[lessonId] = score;
      newProgress.totalLessonsCompleted = Object.keys(newProgress.scores).length;
      
      // Update course-specific progress
      const courseId = lessonId.split('-')[0];
      const courseMapping: Record<string, string> = {
        'cm': 'classical',
        'rel': 'relativity',
        'qm': 'quantum'
      };
      
      const course = courseMapping[courseId];
      if (course) {
        const courseScores = Object.keys(newProgress.scores).filter(id => id.startsWith(courseId));
        newProgress.completedLessons[course] = courseScores.length;
      }
      
      // Calculate overall progress (simplified)
      const totalPossibleLessons = 37; // 15 + 10 + 12
      newProgress.overallProgress = Math.round((newProgress.totalLessonsCompleted / totalPossibleLessons) * 100);
    }
    
    saveProgress(newProgress);
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.setItem("quoma-progress", JSON.stringify(defaultProgress));
  };

  return { progress, updateProgress, resetProgress };
}
