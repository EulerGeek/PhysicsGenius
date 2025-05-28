import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'lessons' | 'streak' | 'score' | 'exploration' | 'mastery' | 'social';
  requirement: number;
  currentProgress: number;
  reward: {
    type: 'badge' | 'points' | 'unlock' | 'customization';
    value: string;
    description: string;
  };
  isCompleted: boolean;
  isNew: boolean;
  difficulty: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
}

interface MilestoneRewardsProps {
  userProgress: {
    lessonsCompleted: number;
    currentStreak: number;
    totalScore: number;
    conceptsExplored: number;
    perfectScores: number;
    friendsHelped: number;
  };
  onClaimReward: (milestoneId: string) => void;
}

export default function MilestoneRewards({ userProgress, onClaimReward }: MilestoneRewardsProps) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [showCelebration, setShowCelebration] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'available' | 'completed'>('all');

  const createMilestones = (): Milestone[] => [
    // Lesson Completion Milestones
    {
      id: 'first-lesson',
      title: 'First Steps',
      description: 'Complete your first physics lesson',
      icon: '🌟',
      category: 'lessons',
      requirement: 1,
      currentProgress: userProgress.lessonsCompleted,
      reward: {
        type: 'badge',
        value: 'Physics Explorer',
        description: 'Unlock your journey badge'
      },
      isCompleted: userProgress.lessonsCompleted >= 1,
      isNew: userProgress.lessonsCompleted === 1,
      difficulty: 'bronze'
    },
    {
      id: 'lesson-master-5',
      title: 'Getting Started',
      description: 'Complete 5 lessons in total',
      icon: '🎯',
      category: 'lessons',
      requirement: 5,
      currentProgress: userProgress.lessonsCompleted,
      reward: {
        type: 'points',
        value: '50',
        description: 'Earn 50 bonus XP points'
      },
      isCompleted: userProgress.lessonsCompleted >= 5,
      isNew: userProgress.lessonsCompleted === 5,
      difficulty: 'bronze'
    },
    {
      id: 'lesson-master-10',
      title: 'Knowledge Seeker',
      description: 'Complete 10 lessons in total',
      icon: '📚',
      category: 'lessons',
      requirement: 10,
      currentProgress: userProgress.lessonsCompleted,
      reward: {
        type: 'unlock',
        value: 'Advanced Topics',
        description: 'Unlock quantum mechanics preview'
      },
      isCompleted: userProgress.lessonsCompleted >= 10,
      isNew: userProgress.lessonsCompleted === 10,
      difficulty: 'silver'
    },
    {
      id: 'lesson-master-25',
      title: 'Physics Scholar',
      description: 'Complete 25 lessons across all topics',
      icon: '🔬',
      category: 'lessons',
      requirement: 25,
      currentProgress: userProgress.lessonsCompleted,
      reward: {
        type: 'badge',
        value: 'Physics Scholar',
        description: 'Prestigious scholar badge'
      },
      isCompleted: userProgress.lessonsCompleted >= 25,
      isNew: userProgress.lessonsCompleted === 25,
      difficulty: 'gold'
    },

    // Streak Milestones
    {
      id: 'streak-3',
      title: 'Momentum Builder',
      description: 'Maintain a 3-day learning streak',
      icon: '🔥',
      category: 'streak',
      requirement: 3,
      currentProgress: userProgress.currentStreak,
      reward: {
        type: 'points',
        value: '25',
        description: 'Streak bonus XP'
      },
      isCompleted: userProgress.currentStreak >= 3,
      isNew: userProgress.currentStreak === 3,
      difficulty: 'bronze'
    },
    {
      id: 'streak-7',
      title: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      icon: '⚡',
      category: 'streak',
      requirement: 7,
      currentProgress: userProgress.currentStreak,
      reward: {
        type: 'customization',
        value: 'Flame Theme',
        description: 'Unlock fire-themed interface'
      },
      isCompleted: userProgress.currentStreak >= 7,
      isNew: userProgress.currentStreak === 7,
      difficulty: 'silver'
    },
    {
      id: 'streak-30',
      title: 'Consistency Champion',
      description: 'Maintain a 30-day learning streak',
      icon: '👑',
      category: 'streak',
      requirement: 30,
      currentProgress: userProgress.currentStreak,
      reward: {
        type: 'badge',
        value: 'Consistency Champion',
        description: 'Elite dedication badge'
      },
      isCompleted: userProgress.currentStreak >= 30,
      isNew: userProgress.currentStreak === 30,
      difficulty: 'platinum'
    },

    // Score Milestones
    {
      id: 'score-1000',
      title: 'Point Collector',
      description: 'Earn 1,000 total points',
      icon: '💎',
      category: 'score',
      requirement: 1000,
      currentProgress: userProgress.totalScore,
      reward: {
        type: 'unlock',
        value: 'Bonus Questions',
        description: 'Access to challenge questions'
      },
      isCompleted: userProgress.totalScore >= 1000,
      isNew: userProgress.totalScore >= 1000 && userProgress.totalScore < 1100,
      difficulty: 'silver'
    },
    {
      id: 'score-5000',
      title: 'Score Master',
      description: 'Earn 5,000 total points',
      icon: '🏆',
      category: 'score',
      requirement: 5000,
      currentProgress: userProgress.totalScore,
      reward: {
        type: 'badge',
        value: 'Score Master',
        description: 'Master achievement badge'
      },
      isCompleted: userProgress.totalScore >= 5000,
      isNew: userProgress.totalScore >= 5000 && userProgress.totalScore < 5100,
      difficulty: 'gold'
    },

    // Exploration Milestones
    {
      id: 'explorer-5',
      title: 'Curious Mind',
      description: 'Explore 5 different physics concepts',
      icon: '🌍',
      category: 'exploration',
      requirement: 5,
      currentProgress: userProgress.conceptsExplored,
      reward: {
        type: 'points',
        value: '75',
        description: 'Exploration bonus XP'
      },
      isCompleted: userProgress.conceptsExplored >= 5,
      isNew: userProgress.conceptsExplored === 5,
      difficulty: 'bronze'
    },
    {
      id: 'explorer-15',
      title: 'Knowledge Explorer',
      description: 'Explore 15 different physics concepts',
      icon: '🗺️',
      category: 'exploration',
      requirement: 15,
      currentProgress: userProgress.conceptsExplored,
      reward: {
        type: 'unlock',
        value: 'Concept Map',
        description: 'Unlock interactive concept map'
      },
      isCompleted: userProgress.conceptsExplored >= 15,
      isNew: userProgress.conceptsExplored === 15,
      difficulty: 'gold'
    },

    // Mastery Milestones
    {
      id: 'perfect-3',
      title: 'Perfectionist',
      description: 'Achieve perfect scores on 3 lessons',
      icon: '✨',
      category: 'mastery',
      requirement: 3,
      currentProgress: userProgress.perfectScores,
      reward: {
        type: 'badge',
        value: 'Perfectionist',
        description: 'Excellence achievement badge'
      },
      isCompleted: userProgress.perfectScores >= 3,
      isNew: userProgress.perfectScores === 3,
      difficulty: 'silver'
    },
    {
      id: 'perfect-10',
      title: 'Physics Virtuoso',
      description: 'Achieve perfect scores on 10 lessons',
      icon: '🎭',
      category: 'mastery',
      requirement: 10,
      currentProgress: userProgress.perfectScores,
      reward: {
        type: 'customization',
        value: 'Golden Theme',
        description: 'Unlock prestigious gold theme'
      },
      isCompleted: userProgress.perfectScores >= 10,
      isNew: userProgress.perfectScores === 10,
      difficulty: 'platinum'
    },

    // Social Milestones
    {
      id: 'helper-5',
      title: 'Team Player',
      description: 'Help 5 friends with physics problems',
      icon: '🤝',
      category: 'social',
      requirement: 5,
      currentProgress: userProgress.friendsHelped,
      reward: {
        type: 'badge',
        value: 'Team Player',
        description: 'Community helper badge'
      },
      isCompleted: userProgress.friendsHelped >= 5,
      isNew: userProgress.friendsHelped === 5,
      difficulty: 'silver'
    },
    {
      id: 'mentor',
      title: 'Physics Mentor',
      description: 'Help 20 friends master difficult concepts',
      icon: '🎓',
      category: 'social',
      requirement: 20,
      currentProgress: userProgress.friendsHelped,
      reward: {
        type: 'badge',
        value: 'Physics Mentor',
        description: 'Elite mentor status badge'
      },
      isCompleted: userProgress.friendsHelped >= 20,
      isNew: userProgress.friendsHelped === 20,
      difficulty: 'diamond'
    }
  ];

  useEffect(() => {
    const newMilestones = createMilestones();
    setMilestones(newMilestones);

    // Check for newly completed milestones
    const newlyCompleted = newMilestones.find(m => m.isNew && m.isCompleted);
    if (newlyCompleted) {
      setShowCelebration(newlyCompleted.id);
      setTimeout(() => setShowCelebration(null), 5000);
    }
  }, [userProgress]);

  const handleClaimReward = (milestoneId: string) => {
    onClaimReward(milestoneId);
    setMilestones(prev => 
      prev.map(m => 
        m.id === milestoneId 
          ? { ...m, isNew: false }
          : m
      )
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'bronze': return 'bg-amber-600';
      case 'silver': return 'bg-gray-400';
      case 'gold': return 'bg-yellow-500';
      case 'platinum': return 'bg-purple-600';
      case 'diamond': return 'bg-blue-400';
      default: return 'bg-gray-400';
    }
  };

  const getDifficultyGradient = (difficulty: string) => {
    switch (difficulty) {
      case 'bronze': return 'from-amber-500 to-orange-600';
      case 'silver': return 'from-gray-300 to-gray-500';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'platinum': return 'from-purple-400 to-purple-700';
      case 'diamond': return 'from-blue-300 to-blue-600';
      default: return 'from-gray-300 to-gray-500';
    }
  };

  const filteredMilestones = milestones.filter(milestone => {
    if (filter === 'available') return !milestone.isCompleted && milestone.currentProgress > 0;
    if (filter === 'completed') return milestone.isCompleted;
    return true;
  });

  const completedCount = milestones.filter(m => m.isCompleted).length;
  const availableCount = milestones.filter(m => !m.isCompleted && m.currentProgress > 0).length;

  return (
    <div className="space-y-6">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <Card className="w-full max-w-md bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-2xl animate-bounce">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-2">Milestone Achieved!</h2>
              <p className="text-lg mb-4">
                {milestones.find(m => m.id === showCelebration)?.title}
              </p>
              <Button
                onClick={() => setShowCelebration(null)}
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                Awesome! ✨
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-3">
            <span className="text-4xl">🏆</span>
            Milestone Rewards
          </CardTitle>
          <p className="text-purple-100">
            Unlock amazing rewards as you progress through your physics journey!
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/20 rounded-xl p-4">
              <div className="text-2xl font-bold">{completedCount}</div>
              <div className="text-sm text-purple-100">Completed</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <div className="text-2xl font-bold">{availableCount}</div>
              <div className="text-sm text-purple-100">In Progress</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <div className="text-2xl font-bold">{milestones.length}</div>
              <div className="text-sm text-purple-100">Total</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Buttons */}
      <div className="flex gap-3 justify-center">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          className="rounded-full"
        >
          All Milestones
        </Button>
        <Button
          variant={filter === 'available' ? 'default' : 'outline'}
          onClick={() => setFilter('available')}
          className="rounded-full"
        >
          In Progress ({availableCount})
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
          className="rounded-full"
        >
          Completed ({completedCount})
        </Button>
      </div>

      {/* Milestones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMilestones.map((milestone) => (
          <Card
            key={milestone.id}
            className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
              milestone.isCompleted 
                ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-300' 
                : milestone.currentProgress > 0
                ? 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-300'
                : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300'
            }`}
          >
            {/* Difficulty Badge */}
            <div className={`absolute top-3 right-3 w-6 h-6 rounded-full ${getDifficultyColor(milestone.difficulty)}`}></div>
            
            {/* New Badge */}
            {milestone.isNew && milestone.isCompleted && (
              <Badge className="absolute top-3 left-3 bg-red-500 text-white animate-pulse">
                NEW!
              </Badge>
            )}

            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{milestone.icon}</div>
                <div>
                  <CardTitle className="text-lg">{milestone.title}</CardTitle>
                  <p className="text-sm text-gray-600">{milestone.description}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span className="font-bold">
                    {Math.min(milestone.currentProgress, milestone.requirement)}/{milestone.requirement}
                  </span>
                </div>
                <Progress 
                  value={(milestone.currentProgress / milestone.requirement) * 100}
                  className="h-2"
                />
              </div>

              {/* Reward */}
              <div className={`p-3 rounded-lg bg-gradient-to-r ${getDifficultyGradient(milestone.difficulty)} text-white`}>
                <div className="text-sm font-semibold">Reward:</div>
                <div className="text-sm">
                  {milestone.reward.type === 'points' && `${milestone.reward.value} XP`}
                  {milestone.reward.type === 'badge' && `${milestone.reward.value} Badge`}
                  {milestone.reward.type === 'unlock' && `Unlock: ${milestone.reward.value}`}
                  {milestone.reward.type === 'customization' && milestone.reward.value}
                </div>
                <div className="text-xs opacity-90 mt-1">
                  {milestone.reward.description}
                </div>
              </div>

              {/* Action Button */}
              {milestone.isCompleted ? (
                <Button
                  onClick={() => handleClaimReward(milestone.id)}
                  className={`w-full ${milestone.isNew ? 'bg-green-600 hover:bg-green-700 animate-pulse' : 'bg-gray-400'}`}
                  disabled={!milestone.isNew}
                >
                  {milestone.isNew ? '✨ Claim Reward!' : '✅ Completed'}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  disabled
                >
                  {milestone.currentProgress === 0 ? '🔒 Locked' : '⏳ In Progress'}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMilestones.length === 0 && (
        <Card className="text-center p-8">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-bold mb-2">No milestones in this category</h3>
          <p className="text-gray-600">
            {filter === 'completed' && 'Complete some lessons to earn your first milestones!'}
            {filter === 'available' && 'Start learning to make progress on milestones!'}
          </p>
        </Card>
      )}
    </div>
  );
}