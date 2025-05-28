import { useState } from "react";
import Header from "@/components/Header";
import HomeScreen from "@/components/HomeScreen";
import AboutPage from "@/components/AboutPage";
import NavigationMenu from "@/components/NavigationMenu";
import ProgressOverview from "@/components/ProgressOverview";
import CourseNavigation from "@/components/CourseNavigation";
import LessonCard from "@/components/LessonCard";
import LessonPreview from "@/components/LessonPreview";
import LessonIntro from "@/components/LessonIntro";
import InteractiveLesson from "@/components/InteractiveLesson";
import LevelMap from "@/components/LevelMap";
import QuickTest from "@/components/QuickTest";
import UnifiedLearningInterface from "@/components/UnifiedLearningInterface";
import Resources from "@/components/Resources";
import Footer from "@/components/Footer";
import ConceptMenu from "@/components/ConceptMenu";
import InteractiveConceptLesson from "@/components/InteractiveConceptLesson";
import FloatingAIButton from "@/components/FloatingAIButton";
import VoiceNavigationAssistant from "@/components/VoiceNavigationAssistant";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProgress } from "@/hooks/useProgress";
import { getCourses, getLessonsByCourse } from "@/lib/lessons";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("home");
  const [activeTab, setActiveTab] = useState("classical");
  const [showConceptMenu, setShowConceptMenu] = useState(false);
  const [showConceptLesson, setShowConceptLesson] = useState(false);
  const [currentConcept, setCurrentConcept] = useState<{courseId: string, conceptId: string} | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [showLessonIntro, setShowLessonIntro] = useState(false);
  const [showInteractiveLesson, setShowInteractiveLesson] = useState(false);
  const [showQuickTest, setShowQuickTest] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');
  const [wrongAnswers, setWrongAnswers] = useState<any[]>([]);
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

  const handleNavigate = (page: string) => {
    if (page === 'concepts') {
      setShowConceptMenu(true);
    } else {
      setCurrentPage(page);
    }
  };

  const handleStartConcept = (courseId: string, conceptId: string) => {
    setCurrentConcept({ courseId, conceptId });
    setShowConceptLesson(true);
  };

  const handleCompleteConceptLesson = (score: number) => {
    console.log(`Concept lesson completed with score: ${score}`);
    setShowConceptLesson(false);
    setCurrentConcept(null);
  };

  const handleCompleteLesson = (lessonId: string, score: number) => {
    updateProgress(lessonId, true, score);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeScreen progress={progress} onNavigate={setCurrentPage} onStartQuickTest={() => setShowQuickTest(true)} />;
      case 'about':
        return <AboutPage />;
      case 'progress':
        return (
          <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ProgressOverview progress={progress} courses={courses} />
            </div>
          </div>
        );
      case 'courses':
      default:
        return (
          <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
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
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{activeCourse?.title}</h3>
                    <p className="text-neutral-600 dark:text-gray-400">{activeCourse?.description}</p>
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
          </div>
        );
    }
  };

  return (
    <div className="relative">
      <NavigationMenu
        currentPage={currentPage}
        onNavigate={handleNavigate}
        progress={progress}
      />
      
      {renderCurrentPage()}

      {/* Floating AI Button */}
      <FloatingAIButton 
        currentContext={{
          courseId: activeTab,
          conceptId: currentPage,
          title: `${activeCourse?.title || 'Physics'} Learning Assistant`,
          description: `Get help with ${activeCourse?.title || 'physics'} concepts and problems`
        }}
      />

      {/* Concept Menu */}
      <ConceptMenu
        isOpen={showConceptMenu}
        onClose={() => setShowConceptMenu(false)}
        onStartConcept={handleStartConcept}
      />

      {/* Interactive Concept Lesson */}
      {showConceptLesson && currentConcept && (
        <InteractiveConceptLesson
          isOpen={showConceptLesson}
          onClose={() => setShowConceptLesson(false)}
          courseId={currentConcept.courseId}
          conceptId={currentConcept.conceptId}
          onComplete={handleCompleteConceptLesson}
        />
      )}

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

      <QuickTest
        isOpen={showQuickTest}
        onClose={() => setShowQuickTest(false)}
      />

      {/* Voice Navigation Assistant */}
      <VoiceNavigationAssistant 
        onNavigate={(path) => {
          if (path === '/') setCurrentPage('home');
          else if (path.includes('classical-mechanics')) setCurrentPage('classical-mechanics');
          else if (path.includes('quantum-mechanics')) setCurrentPage('quantum-mechanics');
          else if (path.includes('general-relativity')) setCurrentPage('general-relativity');
          else if (path.includes('mathematics')) setCurrentPage('mathematics');
        }}
        onVoiceCommand={(command, action) => {
          console.log('Voice command:', command, action);
        }}
        currentPage={currentPage}
      />
    </div>
  );
}
