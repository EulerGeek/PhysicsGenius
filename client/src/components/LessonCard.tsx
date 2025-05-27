import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
}

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  isActive: boolean;
  isLocked: boolean;
  onStart: () => void;
  score?: number;
}

export default function LessonCard({ lesson, isCompleted, isActive, isLocked, onStart, score }: LessonCardProps) {
  const getCardStyles = () => {
    if (isCompleted) return "lesson-card-completed hover:shadow-md transition-shadow cursor-pointer";
    if (isActive) return "lesson-card-active hover:shadow-md transition-all cursor-pointer";
    if (isLocked) return "lesson-card-locked";
    return "bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer";
  };

  const getIconStyles = () => {
    if (isCompleted) return "w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center";
    if (isActive) return "w-12 h-12 bg-primary rounded-lg flex items-center justify-center";
    if (isLocked) return "w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center";
    return "w-12 h-12 bg-primary rounded-lg flex items-center justify-center";
  };

  const getStatusIcon = () => {
    if (isCompleted) return "fas fa-check text-white text-lg";
    if (isActive) return "fas fa-play text-white text-lg";
    if (isLocked) return "fas fa-lock text-gray-500 text-lg";
    return "fas fa-play text-white text-lg";
  };

  const getBadgeStyles = () => {
    if (isCompleted) return "w-6 h-6 bg-green-500 rounded-full flex items-center justify-center";
    if (isActive) return "w-6 h-6 bg-primary rounded-full animate-pulse-slow";
    if (isLocked) return "w-6 h-6 bg-gray-300 rounded-full";
    return "w-6 h-6 bg-primary rounded-full";
  };

  return (
    <Card className={getCardStyles()}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={getIconStyles()}>
            <i className={getStatusIcon()}></i>
          </div>
          <div className={getBadgeStyles()}>
            {isCompleted && <i className="fas fa-check text-white text-xs"></i>}
          </div>
        </div>
        
        <h4 className={`font-semibold mb-2 ${isLocked ? 'text-gray-600 dark:text-gray-400' : 'text-neutral-900 dark:text-white'}`}>
          {lesson.title}
        </h4>
        
        <p className={`text-sm mb-4 ${isLocked ? 'text-gray-500 dark:text-gray-400' : 'text-neutral-600 dark:text-gray-300'}`}>
          {lesson.description}
        </p>
        
        <div className="flex items-center justify-between">
          {isCompleted && (
            <>
              <span className="text-xs text-green-600 font-medium">Completed</span>
              <div className="flex items-center space-x-1">
                <i className="fas fa-star text-amber-500 text-sm"></i>
                <span className="text-sm font-medium text-neutral-700">{score || 850} XP</span>
              </div>
            </>
          )}
          
          {isActive && (
            <>
              <Button 
                onClick={onStart}
                className="bg-primary text-white hover:bg-primary/90 text-sm"
              >
                Start Lesson
              </Button>
              <div className="flex items-center space-x-1">
                <i className="fas fa-clock text-neutral-400 text-sm"></i>
                <span className="text-sm text-neutral-500">{lesson.duration}</span>
              </div>
            </>
          )}
          
          {isLocked && (
            <>
              <span className="text-xs text-gray-500 font-medium">Complete previous lesson to unlock</span>
              <div className="flex items-center space-x-1">
                <i className="fas fa-lock text-gray-400 text-sm"></i>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
