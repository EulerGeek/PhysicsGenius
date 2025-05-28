import { useState } from "react";
import Header from "@/components/Header";
import ProgressOverview from "@/components/ProgressOverview";
import CourseNavigation from "@/components/CourseNavigation";
import LessonCard from "@/components/LessonCard";
import LessonPreview from "@/components/LessonPreview";
import LessonIntro from "@/components/LessonIntro";
import InteractiveLesson from "@/components/InteractiveLesson";
import LevelMap from "@/components/LevelMap";
import QuickTest from "@/components/QuickTest";
import Resources from "@/components/Resources";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProgress } from "@/hooks/useProgress";
import { getCourses, getLessonsByCourse } from "@/lib/lessons";

export default function Home() {
  const [activeTab, setActiveTab] = useState("classical");
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [showLessonIntro, setShowLessonIntro] = useState(false);
  const [showInteractiveLesson, setShowInteractiveLesson] = useState(false);
  const [showQuickTest, setShowQuickTest] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');
  const { progress, updateProgress, resetProgress } = useProgress();
  
  const courses = getCourses();
  const activeCourse = courses.find(course => course.id === activeTab);
  const lessons = getLessonsByCourse(activeTab);

  const handleStartLesson = (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      setSelectedLesson(lesson);
      setShowLessonIntro(true);
    }
  };

  const handleActualStartLesson = () => {
    setShowLessonIntro(false);
    setShowInteractiveLesson(true);
  };

  const handleLessonComplete = (score: number) => {
    if (selectedLesson) {
      updateProgress(selectedLesson.id, true, score);
      setShowInteractiveLesson(false);
      setSelectedLesson(null);
    }
  };

  const handleCloseLessonIntro = () => {
    setShowLessonIntro(false);
    setSelectedLesson(null);
  };

  const handleCloseInteractiveLesson = () => {
    setShowInteractiveLesson(false);
    setSelectedLesson(null);
  };

  const handleCompleteLesson = (lessonId: string, score: number) => {
    updateProgress(lessonId, true, score);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header progress={progress} resetProgress={resetProgress} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressOverview progress={progress} courses={courses} />
        
        <CourseNavigation 
          courses={courses}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-neutral-900">{activeCourse?.title}</h3>
              <p className="text-neutral-600">{activeCourse?.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowQuickTest(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                🧪 Quick Test
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  🗺️ Map
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  📋 List
                </Button>
              </div>
            </div>
          </div>

          {viewMode === 'map' ? (
            <LevelMap
              progress={progress}
              onLessonComplete={handleCompleteLesson}
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {lessons.map((lesson, index) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  isCompleted={progress.completedLessons[activeTab] > index}
                  isActive={progress.completedLessons[activeTab] === index}
                  isLocked={progress.completedLessons[activeTab] < index}
                  onStart={() => handleStartLesson(lesson.id)}
                  score={progress.scores[lesson.id]}
                />
              ))}
            </div>
          )}
        </section>

        <LessonPreview onComplete={handleCompleteLesson} />
        <Resources />
      </main>

      <Footer />

      {showLessonIntro && selectedLesson && (
        <LessonIntro
          lesson={selectedLesson}
          onStartLesson={handleActualStartLesson}
          onClose={handleCloseLessonIntro}
        />
      )}

      {showInteractiveLesson && selectedLesson && (
        <InteractiveLesson
          lessonId={selectedLesson.id}
          title={selectedLesson.title}
          onComplete={handleLessonComplete}
          onClose={handleCloseInteractiveLesson}
        />
      )}
    </div>
  );
}
