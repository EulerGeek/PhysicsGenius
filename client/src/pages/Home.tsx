import { useState } from "react";
import Header from "@/components/Header";
import ComprehensiveLearningSystem from "@/components/ComprehensiveLearningSystem";
import QuickTest from "@/components/QuickTest";
import FloatingAIButton from "@/components/FloatingAIButton";
import { useProgress } from "@/hooks/useProgress";

export default function Home() {
  const [showQuickTest, setShowQuickTest] = useState(false);
  const { progress, updateProgress, resetProgress } = useProgress();

  const handleLessonComplete = (courseId: string, lessonId: string, score: number) => {
    updateProgress(lessonId, score);
  };

  return (
    <div className="h-screen overflow-hidden bg-neutral-50 dark:bg-gray-900">
      <Header progress={progress} resetProgress={resetProgress} />
      
      <main className="max-w-6xl mx-auto px-0.5 sm:px-1 md:px-3 lg:px-6 py-0.5 sm:py-1 md:py-3 lg:py-6 h-[calc(100vh-1.5rem)] sm:h-[calc(100vh-2rem)] md:h-[calc(100vh-2.5rem)] lg:h-[calc(100vh-3rem)] overflow-y-auto">
        <div className="text-center mb-2 sm:mb-4">
          <h1 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
            🎓 QUOMA Learning Platform
          </h1>
          <p className="text-[8px] sm:text-xs md:text-sm text-gray-600">
            Master mathematics and physics through interactive lessons and exams
          </p>
        </div>

        <ComprehensiveLearningSystem
          progress={progress}
          onProgressUpdate={handleLessonComplete}
        />
      </main>

      {/* Quick Test Modal */}
      {showQuickTest && (
        <QuickTest
          isOpen={showQuickTest}
          onClose={() => setShowQuickTest(false)}
          onComplete={(score) => {
            console.log('Quick test completed with score:', score);
            setShowQuickTest(false);
          }}
        />
      )}

      {/* Floating AI Assistant */}
      <FloatingAIButton />
    </div>
  );
}