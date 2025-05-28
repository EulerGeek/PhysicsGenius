import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCourses, getLessonsByCourse } from "@/lib/lessons";
import LessonIntro from "./LessonIntro";
import InteractiveLesson from "./InteractiveLesson";

interface LevelMapProps {
  progress: any;
  onLessonComplete: (lessonId: string, score: number) => void;
}

export default function LevelMap({ progress, onLessonComplete }: LevelMapProps) {
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [showLessonIntro, setShowLessonIntro] = useState(false);
  const [showInteractiveLesson, setShowInteractiveLesson] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("classical-mechanics");

  const courses = getCourses();
  const lessons = getLessonsByCourse(selectedCourse);

  const isLessonCompleted = (lessonId: string) => {
    return progress.completedLessons[lessonId] !== undefined;
  };

  const getLessonScore = (lessonId: string) => {
    return progress.scores[lessonId] || 0;
  };

  const isLessonUnlocked = (lessonIndex: number) => {
    if (lessonIndex === 0) return true;
    const previousLessonId = lessons[lessonIndex - 1]?.id;
    return previousLessonId ? isLessonCompleted(previousLessonId) : false;
  };

  const handleLessonClick = (lesson: any, index: number) => {
    if (!isLessonUnlocked(index)) return;
    
    setSelectedLesson(lesson);
    setShowLessonIntro(true);
  };

  const handleStartLesson = () => {
    setShowLessonIntro(false);
    setShowInteractiveLesson(true);
  };

  const handleLessonComplete = (score: number) => {
    setShowInteractiveLesson(false);
    onLessonComplete(selectedLesson.id, score);
  };

  const getStarCount = (score: number) => {
    if (score >= 90) return 3;
    if (score >= 70) return 2;
    if (score >= 50) return 1;
    return 0;
  };

  const getLevelIcon = (courseId: string, index: number) => {
    const icons = {
      'classical-mechanics': ['🚀', '⚖️', '⚡', '💫', '🌀', '🌊', '💧', '🔥', '🌡️', '🔋', '🌍', '🪐', '⭐', '🌟', '✨'],
      'general-relativity': ['🕳️', '🌌', '⚫', '🌊', '🌍', '📡', '🕰️', '🔍', '🧪', '🎯'],
      'quantum-mechanics': ['⚛️', '🔬', '💎', '🔗', '🌀', '💻', '🌈', '🎭', '🎯', '🔮', '📡', '🚀']
    };
    return icons[courseId as keyof typeof icons]?.[index] || '📚';
  };

  return (
    <div className="space-y-6">
      {/* Course Selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {courses.map((course) => (
          <Button
            key={course.id}
            variant={selectedCourse === course.id ? "default" : "outline"}
            onClick={() => setSelectedCourse(course.id)}
            className="whitespace-nowrap flex items-center gap-2"
          >
            <span className="text-lg">{course.icon}</span>
            {course.title}
          </Button>
        ))}
      </div>

      {/* Level Map */}
      <div className="relative min-h-[600px] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-pink-300 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-green-300 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-18 h-18 bg-blue-300 rounded-full"></div>
        </div>

        {/* Lesson Path */}
        <div className="relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {lessons.map((lesson, index) => {
              const isCompleted = isLessonCompleted(lesson.id);
              const isUnlocked = isLessonUnlocked(index);
              const score = getLessonScore(lesson.id);
              const stars = getStarCount(score);

              return (
                <div key={lesson.id} className="relative">
                  {/* Connection Line */}
                  {index > 0 && (
                    <div className="absolute -top-6 left-1/2 w-0.5 h-6 bg-gray-300 dark:bg-gray-600 transform -translate-x-1/2"></div>
                  )}
                  
                  {/* Level Bubble */}
                  <Card 
                    className={`relative transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                      !isUnlocked 
                        ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800' 
                        : isCompleted 
                          ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-green-300 shadow-lg shadow-green-200/50' 
                          : 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-300 hover:shadow-lg hover:shadow-blue-200/50'
                    }`}
                    onClick={() => handleLessonClick(lesson, index)}
                  >
                    <CardContent className="p-4 text-center">
                      {/* Level Number & Icon */}
                      <div className="relative mb-3">
                        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold ${
                          !isUnlocked 
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400' 
                            : isCompleted 
                              ? 'bg-green-500 text-white shadow-lg' 
                              : 'bg-blue-500 text-white shadow-lg'
                        }`}>
                          {isUnlocked ? getLevelIcon(selectedCourse, index) : '🔒'}
                        </div>
                        
                        {/* Level Number Badge */}
                        <Badge 
                          className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                            isCompleted ? 'bg-green-600' : 'bg-blue-600'
                          }`}
                        >
                          {index + 1}
                        </Badge>
                      </div>

                      {/* Lesson Title */}
                      <h3 className={`text-sm font-semibold mb-2 ${
                        !isUnlocked ? 'text-gray-400' : 'text-gray-800 dark:text-white'
                      }`}>
                        {lesson.title}
                      </h3>

                      {/* Stars (if completed) */}
                      {isCompleted && (
                        <div className="flex justify-center gap-1 mb-2">
                          {[1, 2, 3].map((star) => (
                            <span key={star} className={`text-lg ${star <= stars ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ⭐
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Score */}
                      {isCompleted && (
                        <Badge variant="outline" className="text-xs">
                          {score}% Complete
                        </Badge>
                      )}

                      {/* Duration */}
                      <div className={`text-xs mt-2 ${
                        !isUnlocked ? 'text-gray-400' : 'text-gray-600 dark:text-gray-300'
                      }`}>
                        {lesson.duration}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Summary */}
        <div className="mt-8 text-center">
          <Card className="inline-block bg-white/80 dark:bg-gray-800/80 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <span className="font-semibold">Progress:</span> {Object.keys(progress.completedLessons).length}/{lessons.length} lessons
                </div>
                <div className="text-sm">
                  <span className="font-semibold">Average:</span> {Math.round(Object.values(progress.scores as Record<string, number>).reduce((a: number, b: number) => a + b, 0) / Math.max(Object.values(progress.scores as Record<string, number>).length, 1))}%
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lesson Intro Modal */}
      {showLessonIntro && selectedLesson && (
        <LessonIntro
          lesson={selectedLesson}
          onStartLesson={handleStartLesson}
          onClose={() => setShowLessonIntro(false)}
        />
      )}

      {/* Interactive Lesson Modal */}
      {showInteractiveLesson && selectedLesson && (
        <InteractiveLesson
          lessonId={selectedLesson.id}
          title={selectedLesson.title}
          onComplete={handleLessonComplete}
          onClose={() => setShowInteractiveLesson(false)}
        />
      )}
    </div>
  );
}