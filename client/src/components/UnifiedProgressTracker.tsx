import { useState, useEffect } from "react";

interface LessonProgress {
  lessonId: string;
  courseId: string;
  completed: boolean;
  score?: number;
  completedAt?: Date;
}

interface UnifiedProgress {
  completedLessons: LessonProgress[];
  scores: Record<string, number>;
  streak: number;
}

const defaultProgress: UnifiedProgress = {
  completedLessons: [],
  scores: {},
  streak: 0
};

export function useUnifiedProgress() {
  const [progress, setProgress] = useState<UnifiedProgress>(defaultProgress);

  useEffect(() => {
    const saved = localStorage.getItem("unified-progress");
    if (saved) {
      try {
        const parsedProgress = JSON.parse(saved);
        setProgress({ ...defaultProgress, ...parsedProgress });
      } catch (error) {
        console.error("Failed to parse saved progress:", error);
      }
    }
  }, []);

  const saveProgress = (newProgress: UnifiedProgress) => {
    localStorage.setItem("unified-progress", JSON.stringify(newProgress));
    setProgress(newProgress);
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return progress.completedLessons.some(lesson => lesson.lessonId === lessonId && lesson.completed);
  };

  const getLessonScore = (lessonId: string): number | undefined => {
    return progress.scores[lessonId];
  };

  const getCompletedLessonsForCourse = (courseId: string): string[] => {
    return progress.completedLessons
      .filter(lesson => lesson.courseId === courseId && lesson.completed)
      .map(lesson => lesson.lessonId);
  };

  const markLessonCompleted = (lessonId: string, courseId: string, score: number) => {
    const newProgress = { ...progress };
    
    // Remove existing entry if it exists
    newProgress.completedLessons = newProgress.completedLessons.filter(
      lesson => lesson.lessonId !== lessonId
    );
    
    // Add new completion record
    newProgress.completedLessons.push({
      lessonId,
      courseId,
      completed: true,
      score,
      completedAt: new Date()
    });
    
    // Update scores
    newProgress.scores[lessonId] = score;
    
    saveProgress(newProgress);
  };

  const resetProgress = () => {
    saveProgress(defaultProgress);
  };

  // Helper functions for backward compatibility
  const getLegacyProgress = () => {
    const completedByInternalCourse = {
      classical: getCompletedLessonsForCourse('classical').length,
      quantum: getCompletedLessonsForCourse('quantum').length,
      relativity: getCompletedLessonsForCourse('relativity').length
    };

    return {
      ...progress,
      completedLessons: completedByInternalCourse,
      totalLessonsCompleted: progress.completedLessons.filter(l => l.completed).length,
      overallProgress: Math.round((progress.completedLessons.filter(l => l.completed).length / 37) * 100)
    };
  };

  return {
    progress: getLegacyProgress(),
    isLessonCompleted,
    getLessonScore,
    getCompletedLessonsForCourse,
    markLessonCompleted,
    resetProgress
  };
}

// Component to check lesson completion status uniformly
export function LessonProgressChecker({ 
  lessonId, 
  courseId, 
  lessons, 
  progress 
}: {
  lessonId: string;
  courseId: string;
  lessons: any[];
  progress: any;
}) {
  const lessonIndex = lessons.findIndex(lesson => lesson.id === lessonId);
  const completedLessons = progress.getCompletedLessonsForCourse?.(courseId) || [];
  
  const isCompleted = completedLessons.includes(lessonId);
  const isActive = lessonIndex >= 0 && completedLessons.length === lessonIndex;
  const isLocked = lessonIndex >= 0 && completedLessons.length < lessonIndex;
  
  return {
    isCompleted,
    isActive,
    isLocked,
    score: progress.getLessonScore?.(lessonId)
  };
}