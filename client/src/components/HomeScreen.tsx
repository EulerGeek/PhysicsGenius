import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HomeScreenProps {
  progress: any;
  onNavigate: (page: string) => void;
  onStartQuickTest: () => void;
}

export default function HomeScreen({ progress, onNavigate, onStartQuickTest }: HomeScreenProps) {
  const totalLessons = 37;
  const completedLessons = Object.keys(progress.completedLessons).length;
  const averageScore = Math.round(Object.values(progress.scores as Record<string, number>).reduce((a: number, b: number) => a + b, 0) / Math.max(Object.values(progress.scores as Record<string, number>).length, 1));

  const quickActions = [
    { 
      id: 'continue', 
      title: 'Continue Learning', 
      description: 'Resume your physics journey',
      icon: '📖',
      color: 'from-blue-500 to-cyan-500',
      action: () => onNavigate('courses')
    },
    { 
      id: 'test', 
      title: 'Quick Test', 
      description: 'Test your knowledge',
      icon: '🧪',
      color: 'from-purple-500 to-pink-500',
      action: onStartQuickTest
    },
    { 
      id: 'progress', 
      title: 'View Progress', 
      description: 'Check your achievements',
      icon: '📊',
      color: 'from-green-500 to-emerald-500',
      action: () => onNavigate('progress')
    },
    { 
      id: 'friends', 
      title: 'Study Together', 
      description: 'Connect with friends',
      icon: '👥',
      color: 'from-orange-500 to-red-500',
      action: () => onNavigate('friends')
    }
  ];

  const achievements = [
    { 
      icon: '🚀', 
      title: 'First Steps', 
      description: 'Started your physics journey',
      unlocked: completedLessons >= 1
    },
    { 
      icon: '⭐', 
      title: 'Rising Star', 
      description: 'Completed 5 lessons',
      unlocked: completedLessons >= 5
    },
    { 
      icon: '🎯', 
      title: 'Sharp Shooter', 
      description: 'Average score above 80%',
      unlocked: averageScore >= 80
    },
    { 
      icon: '🔬', 
      title: 'Quantum Explorer', 
      description: 'Entered quantum mechanics',
      unlocked: completedLessons >= 25
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Welcome to QUOMA
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your personal physics learning companion. Master Classical Mechanics, General Relativity, and Quantum Mechanics through interactive lessons.
            </p>
          </div>
          
          {/* Progress Ring */}
          <div className="relative inline-block mb-8">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(completedLessons / totalLessons) * 314} 314`}
                className="text-blue-500 transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{Math.round((completedLessons / totalLessons) * 100)}%</div>
                <div className="text-xs text-gray-500">Complete</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action) => (
            <Card key={action.id} className="hover:scale-105 transition-transform duration-200 cursor-pointer border-0 shadow-lg overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${action.color}`}></div>
              <CardContent className="p-6" onClick={action.action}>
                <div className="text-center">
                  <div className="text-4xl mb-3">{action.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats and Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Stats */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📈</span>
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Lessons Completed</span>
                <Badge variant="secondary">{completedLessons} / {totalLessons}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Average Score</span>
                <Badge variant={averageScore >= 80 ? "default" : "secondary"}>{averageScore}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Current Streak</span>
                <Badge variant="outline">{progress.streak} days</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Physics Level</span>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                  Level {Math.floor(completedLessons / 5) + 1}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    achievement.unlocked 
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' 
                      : 'bg-gray-50 dark:bg-gray-800 opacity-50'
                  }`}
                >
                  <span className={`text-2xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                    {achievement.icon}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium">{achievement.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</div>
                  </div>
                  {achievement.unlocked && (
                    <Badge className="bg-green-500">✓</Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Course Overview */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              Course Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="font-semibold mb-2">Classical Mechanics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Master the foundations of motion and forces</p>
                <Badge variant="outline">15 Lessons</Badge>
              </div>
              <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-4xl mb-3">🌌</div>
                <h3 className="font-semibold mb-2">General Relativity</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Explore spacetime and gravity</p>
                <Badge variant="outline">10 Lessons</Badge>
              </div>
              <div className="text-center p-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <div className="text-4xl mb-3">⚛️</div>
                <h3 className="font-semibold mb-2">Quantum Mechanics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Discover the quantum world</p>
                <Badge variant="outline">12 Lessons</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Quote */}
        <div className="text-center mt-12">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-8">
              <blockquote className="text-xl italic mb-4">
                "Physics is not a religion. If it were, we'd have a much easier time raising money."
              </blockquote>
              <cite className="text-sm opacity-90">— Leon Lederman, Nobel Prize Winner</cite>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}