import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAudio } from "@/hooks/useAudio";

interface Friend {
  id: string;
  username: string;
  email: string;
  avatar: string;
  streak: number;
  lessonsCompleted: number;
  currentLesson: string;
  isOnline: boolean;
  lastActive: Date;
  rank: number;
  totalScore: number;
}

interface Challenge {
  id: string;
  from: string;
  lessonId: string;
  lessonTitle: string;
  message: string;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
}

interface FriendsSystemProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCollaborative: (lessonId: string, friendIds: string[]) => void;
}

export default function FriendsSystem({ isOpen, onClose, onStartCollaborative }: FriendsSystemProps) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'friends' | 'leaderboard' | 'challenges'>('friends');
  const { playSound } = useAudio();

  useEffect(() => {
    // Initialize with sample data
    setFriends([
      {
        id: "1",
        username: "PhysicsExplorer",
        email: "explorer@example.com",
        avatar: "🔬",
        streak: 15,
        lessonsCompleted: 28,
        currentLesson: "Quantum Mechanics",
        isOnline: true,
        lastActive: new Date(),
        rank: 1,
        totalScore: 2840
      },
      {
        id: "2", 
        username: "QuantumLearner",
        email: "quantum@example.com",
        avatar: "⚛️",
        streak: 12,
        lessonsCompleted: 22,
        currentLesson: "Special Relativity",
        isOnline: true,
        lastActive: new Date(),
        rank: 2,
        totalScore: 2200
      },
      {
        id: "3",
        username: "NewtonFan",
        email: "newton@example.com", 
        avatar: "🍎",
        streak: 8,
        lessonsCompleted: 18,
        currentLesson: "Classical Mechanics",
        isOnline: false,
        lastActive: new Date(Date.now() - 3600000),
        rank: 3,
        totalScore: 1800
      }
    ]);

    setChallenges([
      {
        id: "1",
        from: "PhysicsExplorer",
        lessonId: "qm-1",
        lessonTitle: "Wave-Particle Duality",
        message: "Hey! Want to tackle quantum mechanics together? 🚀",
        timestamp: new Date(Date.now() - 1800000),
        status: 'pending'
      },
      {
        id: "2",
        from: "QuantumLearner", 
        lessonId: "cm-3",
        lessonTitle: "Work and Energy",
        message: "Race me through this energy lesson! 💪",
        timestamp: new Date(Date.now() - 3600000),
        status: 'pending'
      }
    ]);
  }, []);

  if (!isOpen) return null;

  const handleAcceptChallenge = (challenge: Challenge) => {
    playSound('notification');
    onStartCollaborative(challenge.lessonId, [challenge.from]);
    setChallenges(prev => prev.map(c => 
      c.id === challenge.id ? { ...c, status: 'accepted' } : c
    ));
  };

  const handleDeclineChallenge = (challengeId: string) => {
    playSound('click');
    setChallenges(prev => prev.map(c => 
      c.id === challengeId ? { ...c, status: 'declined' } : c
    ));
  };

  const sendChallenge = (friend: Friend) => {
    playSound('notification');
    // In a real app, this would send an actual challenge
    alert(`Challenge sent to ${friend.username}! 🎯`);
  };

  const filteredFriends = friends.filter(friend => 
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const leaderboard = [...friends].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2">
              👥 Physics Friends & Challenges
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onClose}>
              ✕ Close
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={activeTab === 'friends' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('friends')}
            >
              Friends ({friends.length})
            </Button>
            <Button 
              variant={activeTab === 'leaderboard' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('leaderboard')}
            >
              🏆 Leaderboard
            </Button>
            <Button 
              variant={activeTab === 'challenges' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('challenges')}
            >
              ⚡ Challenges ({challenges.filter(c => c.status === 'pending').length})
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-6">
          {activeTab === 'friends' && (
            <div className="space-y-4 h-full">
              <Input
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
              
              <ScrollArea className="flex-1">
                <div className="space-y-3">
                  {filteredFriends.map(friend => (
                    <Card key={friend.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="text-lg">
                                {friend.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                              friend.isOnline ? 'bg-green-500' : 'bg-gray-400'
                            }`}></div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="font-semibold flex items-center gap-2">
                              {friend.username}
                              {friend.rank <= 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  #{friend.rank}
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {friend.lessonsCompleted} lessons • {friend.streak} day streak
                            </div>
                            <div className="text-xs text-gray-500">
                              Currently: {friend.currentLesson}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => sendChallenge(friend)}
                          >
                            ⚡ Challenge
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => onStartCollaborative('cm-1', [friend.id])}
                          >
                            🤝 Study Together
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <ScrollArea className="h-full">
              <div className="space-y-3">
                {leaderboard.map((friend, index) => (
                  <Card key={friend.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-purple-600">
                        #{index + 1}
                      </div>
                      
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{friend.avatar}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="font-semibold">{friend.username}</div>
                        <div className="text-sm text-gray-600">
                          {friend.totalScore} points • {friend.lessonsCompleted} lessons
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge variant={index < 3 ? 'default' : 'secondary'}>
                          {friend.streak} day streak
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}

          {activeTab === 'challenges' && (
            <ScrollArea className="h-full">
              <div className="space-y-4">
                {challenges.filter(c => c.status === 'pending').length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">🎯</div>
                    <p>No pending challenges</p>
                    <p className="text-sm">Challenge your friends to study together!</p>
                  </div>
                ) : (
                  challenges.filter(c => c.status === 'pending').map(challenge => (
                    <Card key={challenge.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-semibold flex items-center gap-2">
                              ⚡ Challenge from {challenge.from}
                              <Badge variant="secondary">New</Badge>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {challenge.lessonTitle}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {challenge.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-800 rounded p-3 text-sm">
                          {challenge.message}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            onClick={() => handleAcceptChallenge(challenge)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            ✅ Accept Challenge
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeclineChallenge(challenge.id)}
                          >
                            ❌ Decline
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}