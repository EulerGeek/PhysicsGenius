import { useState } from "react";
import Header from "@/components/Header";
import HomeScreen from "@/components/HomeScreen";
import AboutPage from "@/components/AboutPage";
import NavigationMenu from "@/components/NavigationMenu";
import ProgressOverview from "@/components/ProgressOverview";
import CourseNavigation from "@/components/CourseNavigation";
import UnifiedLearningInterface from "@/components/UnifiedLearningInterface";
import InteractiveConceptLesson from "@/components/InteractiveConceptLesson";
import ExamSystem from "@/components/ExamSystem";
import QuickTest from "@/components/QuickTest";
import FloatingAIButton from "@/components/FloatingAIButton";
import ConceptMenu from "@/components/ConceptMenu";
import EducationalFooter from "@/components/EducationalFooter";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/useProgress";
import { getCourses, getLessonsByCourse } from "@/lib/lessons";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("courses");
  const [activeTab, setActiveTab] = useState("classical");
  const [showConceptMenu, setShowConceptMenu] = useState(false);
  const [showConceptLesson, setShowConceptLesson] = useState(false);
  const [showExam, setShowExam] = useState(false);
  const [examCourseId, setExamCourseId] = useState('');
  const [currentConcept, setCurrentConcept] = useState<{courseId: string, conceptId: string} | null>(null);
  const [showQuickTest, setShowQuickTest] = useState(false);
  const { progress, updateProgress, resetProgress } = useProgress();
  
  const courses = getCourses();
  const activeCourse = courses.find(course => course.id === activeTab);
  const lessons = getLessonsByCourse(activeTab);

  const handleStartConceptLesson = (courseId: string, conceptId: string) => {
    setCurrentConcept({ courseId, conceptId });
    setShowConceptLesson(true);
  };

  const handleLessonComplete = (score: number) => {
    if (currentConcept) {
      updateProgress(currentConcept.conceptId, score);
    }
    setShowConceptLesson(false);
    setCurrentConcept(null);
  };

  const handleExamPass = (courseId: string, score: number) => {
    console.log(`Exam passed for ${courseId} with score ${score}`);
    setShowExam(false);
  };

  // Render different pages based on currentPage state
  switch (currentPage) {
    case 'home':
      return (
        <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
          <Header progress={progress} resetProgress={resetProgress} />
          <HomeScreen progress={progress} onNavigate={setCurrentPage} onStartQuickTest={() => setShowQuickTest(true)} />
          <FloatingAIButton />
        </div>
      );
    case 'about':
      return (
        <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
          <Header progress={progress} resetProgress={resetProgress} />
          <AboutPage />
          <FloatingAIButton />
        </div>
      );
    case 'courses':
    default:
      return (
        <div className="h-screen overflow-hidden bg-neutral-50 dark:bg-gray-900">
          <Header progress={progress} resetProgress={resetProgress} />
          
          <main className="max-w-6xl mx-auto px-0.5 sm:px-1 md:px-3 lg:px-6 py-0.5 sm:py-1 md:py-3 lg:py-6 h-[calc(100vh-1.5rem)] sm:h-[calc(100vh-2rem)] md:h-[calc(100vh-2.5rem)] lg:h-[calc(100vh-3rem)] overflow-y-auto">
            <ProgressOverview progress={progress} courses={courses} />
            
            <CourseNavigation 
              courses={courses}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              progress={progress}
            />

            <section className="mb-1 sm:mb-2 md:mb-4">
              <div className="flex items-center justify-between mb-1 sm:mb-2 md:mb-3">
                <div>
                  <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-lg font-bold text-neutral-900 dark:text-white">{activeCourse?.title}</h3>
                  <p className="text-[8px] sm:text-xs md:text-sm text-neutral-600 dark:text-gray-400 hidden sm:block">{activeCourse?.description}</p>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button
                    onClick={() => setShowQuickTest(true)}
                    className="h-5 sm:h-6 md:h-8 px-1 sm:px-2 md:px-3 text-[8px] sm:text-xs md:text-sm bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    🧪
                  </Button>
                  <Button
                    onClick={() => { setExamCourseId(activeTab); setShowExam(true); }}
                    className="h-5 sm:h-6 md:h-8 px-1 sm:px-2 md:px-3 text-[8px] sm:text-xs md:text-sm bg-gradient-to-r from-green-600 to-blue-600"
                  >
                    📝 Exam
                  </Button>
                </div>
              </div>

              <UnifiedLearningInterface
                courseId={activeTab}
                lessons={lessons}
                onStartLesson={handleStartConceptLesson}
                progress={progress}
                viewMode="map"
                onViewModeChange={() => {}}
              />
            </section>
          </main>

          {/* Navigation Menu */}
          <NavigationMenu
            currentPage={currentPage}
            onNavigate={(page) => setCurrentPage(page)}
            progress={progress}
          />

          {/* Concept Menu */}
          <ConceptMenu
            isOpen={showConceptMenu}
            onClose={() => setShowConceptMenu(false)}
            onStartConcept={handleStartConceptLesson}
          />

          {/* Interactive Concept Lesson */}
          {showConceptLesson && currentConcept && (
            <InteractiveConceptLesson
              isOpen={showConceptLesson}
              onClose={() => setShowConceptLesson(false)}
              courseId={currentConcept.courseId}
              conceptId={currentConcept.conceptId}
              onComplete={handleLessonComplete}
            />
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

          {/* Quick Test Modal */}
          {showQuickTest && (
            <QuickTest
              isOpen={showQuickTest}
              onClose={() => setShowQuickTest(false)}
            />
          )}

          {/* Floating AI Assistant */}
          <FloatingAIButton />

          {/* Educational Resources Footer */}
          <EducationalFooter />
        </div>
      );
  }
}