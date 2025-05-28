import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface UserPerformance {
  userId: string;
  lessonId: string;
  score: number;
  timeSpent: number;
  attempts: number;
  mistakePatterns: string[];
  completedAt: Date;
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  recommendedLessons: string[];
  strengthAreas: string[];
  weaknessAreas: string[];
  estimatedTime: string;
}

interface AdaptiveRecommendation {
  type: 'review' | 'advance' | 'practice' | 'challenge';
  lessonId: string;
  reason: string;
  priority: number;
  estimatedDifficulty: number;
}

interface AdaptiveLearningEngineProps {
  userPerformance: UserPerformance[];
  currentUserId: string;
  onRecommendationSelect: (lessonId: string) => void;
}

export default function AdaptiveLearningEngine({ 
  userPerformance, 
  currentUserId, 
  onRecommendationSelect 
}: AdaptiveLearningEngineProps) {
  const [adaptivePath, setAdaptivePath] = useState<LearningPath | null>(null);
  const [recommendations, setRecommendations] = useState<AdaptiveRecommendation[]>([]);
  const [learningInsights, setLearningInsights] = useState<any>(null);

  // Analyze user performance and generate adaptive path
  useEffect(() => {
    if (userPerformance.length > 0) {
      const insights = analyzeUserPerformance(userPerformance);
      setLearningInsights(insights);
      
      const path = generateAdaptivePath(insights);
      setAdaptivePath(path);
      
      const recs = generateRecommendations(insights);
      setRecommendations(recs);
    }
  }, [userPerformance]);

  const analyzeUserPerformance = (performance: UserPerformance[]) => {
    const totalLessons = performance.length;
    const averageScore = performance.reduce((sum, p) => sum + p.score, 0) / totalLessons;
    const averageTime = performance.reduce((sum, p) => sum + p.timeSpent, 0) / totalLessons;
    const totalAttempts = performance.reduce((sum, p) => sum + p.attempts, 0);
    
    // Identify strength and weakness areas
    const subjectPerformance: Record<string, number[]> = {};
    performance.forEach(p => {
      const subject = p.lessonId.split('-')[0]; // Extract subject from lesson ID
      if (!subjectPerformance[subject]) subjectPerformance[subject] = [];
      subjectPerformance[subject].push(p.score);
    });

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    
    Object.entries(subjectPerformance).forEach(([subject, scores]) => {
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      if (avgScore >= 80) strengths.push(subject);
      if (avgScore < 60) weaknesses.push(subject);
    });

    // Determine learning style
    const learningStyle = averageTime > 300 ? 'thorough' : averageTime < 120 ? 'quick' : 'balanced';
    
    // Calculate difficulty preference
    const difficultyPreference = averageScore > 85 ? 'challenge-seeking' : 
                                averageScore < 65 ? 'support-needed' : 'standard';

    return {
      totalLessons,
      averageScore,
      averageTime,
      totalAttempts,
      strengths,
      weaknesses,
      learningStyle,
      difficultyPreference,
      consistencyScore: calculateConsistency(performance),
      improvementTrend: calculateTrend(performance)
    };
  };

  const calculateConsistency = (performance: UserPerformance[]) => {
    if (performance.length < 3) return 100;
    const scores = performance.map(p => p.score);
    const mean = scores.reduce((a, b) => a + b) / scores.length;
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
    return Math.max(0, 100 - variance);
  };

  const calculateTrend = (performance: UserPerformance[]) => {
    if (performance.length < 3) return 'stable';
    const recent = performance.slice(-3).map(p => p.score);
    const earlier = performance.slice(0, -3).map(p => p.score);
    
    const recentAvg = recent.reduce((a, b) => a + b) / recent.length;
    const earlierAvg = earlier.reduce((a, b) => a + b) / earlier.length;
    
    const diff = recentAvg - earlierAvg;
    if (diff > 10) return 'improving';
    if (diff < -10) return 'declining';
    return 'stable';
  };

  const generateAdaptivePath = (insights: any): LearningPath => {
    let difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate';
    
    if (insights.averageScore < 60 || insights.difficultyPreference === 'support-needed') {
      difficulty = 'beginner';
    } else if (insights.averageScore > 85 && insights.difficultyPreference === 'challenge-seeking') {
      difficulty = 'advanced';
    }

    const pathName = `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Adaptive Path`;
    
    return {
      id: `adaptive-${difficulty}-${Date.now()}`,
      name: pathName,
      description: generatePathDescription(insights, difficulty),
      difficulty,
      recommendedLessons: generateLessonSequence(insights, difficulty),
      strengthAreas: insights.strengths,
      weaknessAreas: insights.weaknesses,
      estimatedTime: calculateEstimatedTime(insights, difficulty)
    };
  };

  const generatePathDescription = (insights: any, difficulty: string) => {
    let description = `Personalized ${difficulty} learning path based on your performance. `;
    
    if (insights.strengths.length > 0) {
      description += `Building on your strengths in ${insights.strengths.join(', ')}. `;
    }
    
    if (insights.weaknesses.length > 0) {
      description += `Extra practice provided for ${insights.weaknesses.join(', ')}. `;
    }
    
    description += `Optimized for your ${insights.learningStyle} learning style.`;
    
    return description;
  };

  const generateLessonSequence = (insights: any, difficulty: string) => {
    const baseLessons = ['cm-1', 'cm-2', 'cm-3', 'alg-1', 'alg-2'];
    
    if (difficulty === 'beginner') {
      return ['foundation-1', 'foundation-2', ...baseLessons, 'review-1'];
    } else if (difficulty === 'advanced') {
      return [...baseLessons, 'calc-1', 'calc-2', 'challenge-1', 'challenge-2'];
    }
    
    return baseLessons;
  };

  const calculateEstimatedTime = (insights: any, difficulty: string) => {
    const baseTime = difficulty === 'beginner' ? 60 : difficulty === 'advanced' ? 90 : 75;
    const adjustedTime = insights.learningStyle === 'thorough' ? baseTime * 1.3 : 
                        insights.learningStyle === 'quick' ? baseTime * 0.8 : baseTime;
    return `${Math.round(adjustedTime)} minutes`;
  };

  const generateRecommendations = (insights: any): AdaptiveRecommendation[] => {
    const recs: AdaptiveRecommendation[] = [];
    
    // Weakness-based recommendations
    insights.weaknesses.forEach((weakness: string, index: number) => {
      recs.push({
        type: 'review',
        lessonId: `${weakness}-review`,
        reason: `Strengthen your understanding of ${weakness} concepts`,
        priority: 10 - index,
        estimatedDifficulty: 3
      });
    });
    
    // Strength-based advancement
    insights.strengths.forEach((strength: string, index: number) => {
      recs.push({
        type: 'challenge',
        lessonId: `${strength}-advanced`,
        reason: `Take on advanced ${strength} challenges`,
        priority: 8 - index,
        estimatedDifficulty: 8
      });
    });
    
    // Trend-based recommendations
    if (insights.improvementTrend === 'improving') {
      recs.push({
        type: 'advance',
        lessonId: 'next-level',
        reason: 'You\'re improving! Ready for the next level',
        priority: 9,
        estimatedDifficulty: 6
      });
    } else if (insights.improvementTrend === 'declining') {
      recs.push({
        type: 'practice',
        lessonId: 'fundamentals-review',
        reason: 'Let\'s reinforce the fundamentals',
        priority: 10,
        estimatedDifficulty: 4
      });
    }
    
    return recs.sort((a, b) => b.priority - a.priority).slice(0, 5);
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'review': return '📚';
      case 'advance': return '🚀';
      case 'practice': return '💪';
      case 'challenge': return '🎯';
      default: return '📖';
    }
  };

  const getRecommendationColor = (type: string) => {
    switch (type) {
      case 'review': return 'from-yellow-500 to-orange-500';
      case 'advance': return 'from-green-500 to-blue-500';
      case 'practice': return 'from-purple-500 to-pink-500';
      case 'challenge': return 'from-red-500 to-orange-500';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  if (!adaptivePath || !learningInsights) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="text-4xl mb-4">🧠</div>
          <h3 className="text-xl font-semibold mb-2">Analyzing Your Learning Pattern...</h3>
          <p className="text-gray-600">Complete a few lessons to unlock personalized recommendations!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Adaptive Path Overview */}
      <Card className="w-full max-w-4xl mx-auto glass dark:glass-dark backdrop-blur-xl shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            <div>
              <CardTitle className="text-2xl">{adaptivePath.name}</CardTitle>
              <p className="text-blue-100">Personalized just for you</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {adaptivePath.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl text-center">
              <div className="text-2xl mb-2">📈</div>
              <div className="font-semibold text-blue-700 dark:text-blue-300">Average Score</div>
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                {Math.round(learningInsights.averageScore)}%
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl text-center">
              <div className="text-2xl mb-2">⏱️</div>
              <div className="font-semibold text-green-700 dark:text-green-300">Learning Style</div>
              <div className="text-lg font-bold text-green-800 dark:text-green-200 capitalize">
                {learningInsights.learningStyle}
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl text-center">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold text-purple-700 dark:text-purple-300">Consistency</div>
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                {Math.round(learningInsights.consistencyScore)}%
              </div>
            </div>
          </div>
          
          {/* Strengths and Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adaptivePath.strengthAreas.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
                  <span>💪</span> Your Strengths
                </h4>
                <div className="space-y-2">
                  {adaptivePath.strengthAreas.map((strength, index) => (
                    <Badge key={index} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mr-2 mb-2">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {adaptivePath.weaknessAreas.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-orange-700 dark:text-orange-300 mb-3 flex items-center gap-2">
                  <span>🎯</span> Focus Areas
                </h4>
                <div className="space-y-2">
                  {adaptivePath.weaknessAreas.map((weakness, index) => (
                    <Badge key={index} className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 mr-2 mb-2">
                      {weakness}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Personalized Recommendations */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <span>🎨</span>
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {recommendations.map((rec, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-2xl bg-gradient-to-r ${getRecommendationColor(rec.type)} text-white transition-all duration-300 hover:scale-105 cursor-pointer`}
              onClick={() => onRecommendationSelect(rec.lessonId)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getRecommendationIcon(rec.type)}</span>
                  <div>
                    <div className="font-semibold capitalize">{rec.type} Lesson</div>
                    <div className="text-sm opacity-90">{rec.reason}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm opacity-75">Difficulty</div>
                  <Progress value={rec.estimatedDifficulty * 10} className="w-20 h-2" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}