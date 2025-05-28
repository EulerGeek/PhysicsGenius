import { useState, useEffect } from 'react';
import AdaptiveLearningEngine from '@/components/AdaptiveLearningEngine';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserPerformance {
  userId: string;
  lessonId: string;
  score: number;
  timeSpent: number;
  attempts: number;
  mistakePatterns: string[];
  completedAt: Date;
}

export default function AdaptiveLearning() {
  const [userPerformance, setUserPerformance] = useState<UserPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate user performance data (in real app, this would come from your database)
  useEffect(() => {
    // Generate realistic performance data based on actual lesson completion
    const mockPerformance: UserPerformance[] = [
      {
        userId: 'user-1',
        lessonId: 'cm-1',
        score: 85,
        timeSpent: 240,
        attempts: 1,
        mistakePatterns: ['kinematics-confusion'],
        completedAt: new Date(Date.now() - 86400000 * 3)
      },
      {
        userId: 'user-1',
        lessonId: 'cm-2',
        score: 92,
        timeSpent: 180,
        attempts: 1,
        mistakePatterns: [],
        completedAt: new Date(Date.now() - 86400000 * 2)
      },
      {
        userId: 'user-1',
        lessonId: 'alg-1',
        score: 78,
        timeSpent: 320,
        attempts: 2,
        mistakePatterns: ['variable-substitution', 'equation-solving'],
        completedAt: new Date(Date.now() - 86400000 * 1)
      },
      {
        userId: 'user-1',
        lessonId: 'cm-3',
        score: 88,
        timeSpent: 200,
        attempts: 1,
        mistakePatterns: ['energy-conservation'],
        completedAt: new Date()
      }
    ];

    // Simulate loading delay
    setTimeout(() => {
      setUserPerformance(mockPerformance);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleRecommendationSelect = (lessonId: string) => {
    alert(`Starting recommended lesson: ${lessonId}`);
    // In real app, this would navigate to the lesson
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="text-6xl mb-6 animate-bounce">🧠</div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Analyzing Your Learning Journey...
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Creating your personalized adaptive learning path
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🎯 Adaptive Learning
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Experience personalized education that adapts to your unique learning style, strengths, and areas for improvement.
          </p>
        </div>

        {/* Learning Analytics Overview */}
        <Card className="mb-8 glass dark:glass-dark backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <span>📊</span>
              Your Learning Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {userPerformance.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {Math.round(userPerformance.reduce((sum, p) => sum + p.score, 0) / userPerformance.length)}%
                </div>
                <div className="text-gray-600 dark:text-gray-400">Average Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {Math.round(userPerformance.reduce((sum, p) => sum + p.timeSpent, 0) / userPerformance.length / 60)}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Avg. Minutes per Lesson</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {userPerformance.reduce((sum, p) => sum + p.attempts, 0)}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Total Attempts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Adaptive Learning Engine */}
        <AdaptiveLearningEngine
          userPerformance={userPerformance}
          currentUserId="user-1"
          onRecommendationSelect={handleRecommendationSelect}
        />

        {/* How It Works */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <span>🔬</span>
              How Adaptive Learning Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-semibold mb-2">Performance Analysis</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We analyze your scores, time spent, and mistake patterns to understand your learning style.
                </p>
              </div>
              <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Personalized Path</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Based on your strengths and weaknesses, we create a custom learning path just for you.
                </p>
              </div>
              <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-2">Dynamic Adaptation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  As you progress, the system continuously adjusts to optimize your learning experience.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}