import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import ExamSystem from './ExamSystem';
import InteractiveConceptLesson from './InteractiveConceptLesson';
import { allCourses, Course, Lesson } from '@/lib/courseData';
import { getExamForCourse } from '@/lib/examSystem';

interface ComprehensiveLearningSystemProps {
  progress: any;
  onProgressUpdate: (courseId: string, lessonId: string, score: number) => void;
}

export default function ComprehensiveLearningSystem({ progress, onProgressUpdate }: ComprehensiveLearningSystemProps) {
  const [selectedCategory, setSelectedCategory] = useState<'mathematics' | 'physics'>('mathematics');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showExam, setShowExam] = useState(false);
  const [examCourseId, setExamCourseId] = useState('');
  const [completedExams, setCompletedExams] = useState<string[]>(['algebra']); // Algebra unlocked by default
  const [showLesson, setShowLesson] = useState(false);

  const getAvailableCourses = () => {
    return allCourses.filter(course => {
      if (course.category !== selectedCategory) return false;
      
      // Check if all prerequisites are completed
      const hasCompletedPrereqs = course.prerequisites.every(prereq => 
        completedExams.includes(prereq)
      );
      
      return hasCompletedPrereqs;
    });
  };

  const getLockedCourses = () => {
    return allCourses.filter(course => {
      if (course.category !== selectedCategory) return false;
      
      const hasCompletedPrereqs = course.prerequisites.every(prereq => 
        completedExams.includes(prereq)
      );
      
      return !hasCompletedPrereqs;
    });
  };

  const handleStartExam = (courseId: string) => {
    setExamCourseId(courseId);
    setShowExam(true);
  };

  const handleExamPass = (courseId: string, score: number) => {
    setCompletedExams(prev => [...prev, courseId]);
    setShowExam(false);
  };

  const handleStartLesson = (course: Course, lesson: Lesson) => {
    setSelectedCourse(course);
    setSelectedLesson(lesson);
    setShowLesson(true);
  };

  const availableCourses = getAvailableCourses();
  const lockedCourses = getLockedCourses();

  return (
    <div className="space-y-2 sm:space-y-4 md:space-y-6">
      {/* Category Selection */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-0.5 sm:p-1 rounded-lg flex">
          <Button
            variant={selectedCategory === 'mathematics' ? 'default' : 'ghost'}
            onClick={() => setSelectedCategory('mathematics')}
            className="text-[8px] sm:text-xs md:text-sm px-2 sm:px-4 py-1 sm:py-2"
          >
            📐 Mathematics
          </Button>
          <Button
            variant={selectedCategory === 'physics' ? 'default' : 'ghost'}
            onClick={() => setSelectedCategory('physics')}
            className="text-[8px] sm:text-xs md:text-sm px-2 sm:px-4 py-1 sm:py-2"
          >
            🔬 Physics
          </Button>
        </div>
      </div>

      {/* Available Courses */}
      <div className="grid gap-2 sm:gap-3 md:gap-4">
        <h3 className="text-[10px] sm:text-sm md:text-lg font-bold text-center">
          Available Courses
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {availableCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-all duration-200 border-2">
              <CardHeader className="pb-1 sm:pb-2 px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-xs sm:text-base md:text-lg">{course.icon}</span>
                    <CardTitle className="text-[8px] sm:text-xs md:text-sm lg:text-base">{course.title}</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-[6px] sm:text-[8px] md:text-xs">
                    {course.difficulty}
                  </Badge>
                </div>
                <p className="text-[6px] sm:text-[8px] md:text-xs text-gray-600 hidden sm:block">
                  {course.description}
                </p>
              </CardHeader>
              
              <CardContent className="px-2 sm:px-3 md:px-4 pb-2 sm:pb-3 md:pb-4">
                <div className="space-y-1 sm:space-y-2">
                  <div className="text-[6px] sm:text-[8px] md:text-xs text-gray-500">
                    📚 {course.lessons.length} lessons • ⏱️ ~{course.estimatedHours}h
                  </div>
                  
                  {completedExams.includes(course.id) ? (
                    <div className="space-y-1 sm:space-y-2">
                      <div className="bg-green-50 p-1 sm:p-2 rounded text-center">
                        <span className="text-[8px] sm:text-xs text-green-700">✅ Unlocked!</span>
                      </div>
                      
                      <div className="grid gap-1">
                        <h4 className="text-[8px] sm:text-xs font-semibold">Lessons:</h4>
                        {course.lessons.slice(0, 3).map((lesson) => (
                          <Button
                            key={lesson.id}
                            variant="outline"
                            size="sm"
                            onClick={() => handleStartLesson(course, lesson)}
                            className="h-5 sm:h-6 md:h-8 text-[6px] sm:text-[8px] md:text-xs justify-start px-1 sm:px-2"
                          >
                            {lesson.title}
                          </Button>
                        ))}
                        {course.lessons.length > 3 && (
                          <div className="text-[6px] sm:text-[8px] text-center text-gray-500">
                            +{course.lessons.length - 3} more lessons
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 sm:space-y-2">
                      <div className="bg-blue-50 p-1 sm:p-2 rounded text-center">
                        <span className="text-[8px] sm:text-xs text-blue-700">🎯 Take exam to unlock</span>
                      </div>
                      <Button
                        onClick={() => handleStartExam(course.id)}
                        className="w-full h-5 sm:h-6 md:h-8 text-[6px] sm:text-[8px] md:text-xs bg-blue-600 hover:bg-blue-700"
                      >
                        📝 Take Placement Exam
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Locked Courses */}
      {lockedCourses.length > 0 && (
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-[10px] sm:text-sm md:text-lg font-bold text-center text-gray-600">
            🔒 Locked Courses
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {lockedCourses.map((course) => (
              <Card key={course.id} className="opacity-60 border-gray-300">
                <CardHeader className="pb-1 sm:pb-2 px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-xs sm:text-base md:text-lg grayscale">{course.icon}</span>
                      <CardTitle className="text-[8px] sm:text-xs md:text-sm lg:text-base text-gray-500">
                        {course.title}
                      </CardTitle>
                    </div>
                    <Badge variant="secondary" className="text-[6px] sm:text-[8px] md:text-xs">
                      Locked
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="px-2 sm:px-3 md:px-4 pb-2 sm:pb-3 md:pb-4">
                  <div className="bg-yellow-50 p-1 sm:p-2 rounded">
                    <div className="text-[6px] sm:text-[8px] md:text-xs text-yellow-700">
                      📋 Complete: {course.prerequisites.join(', ')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Exam System */}
      {showExam && (
        <ExamSystem
          isOpen={showExam}
          onClose={() => setShowExam(false)}
          courseId={examCourseId}
          onExamPass={handleExamPass}
        />
      )}

      {/* Lesson System */}
      {showLesson && selectedCourse && selectedLesson && (
        <InteractiveConceptLesson
          isOpen={showLesson}
          onClose={() => setShowLesson(false)}
          courseId={selectedCourse.id}
          conceptId={selectedLesson.id}
          onComplete={(score) => {
            onProgressUpdate(selectedCourse.id, selectedLesson.id, score);
            setShowLesson(false);
          }}
        />
      )}
    </div>
  );
}