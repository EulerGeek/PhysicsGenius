import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Friend {
  id: string;
  username: string;
  email: string;
  streak: number;
  lessonsCompleted: number;
  isOnline: boolean;
}

interface FriendsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: { username: string; email: string; } | null;
}

export default function FriendsModal({ isOpen, onClose, user }: FriendsModalProps) {
  const [activeTab, setActiveTab] = useState<'friends' | 'add' | 'leaderboard'>('friends');
  const [searchTerm, setSearchTerm] = useState("");
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: "1",
      username: "PhysicsProf",
      email: "prof@physics.edu",
      streak: 15,
      lessonsCompleted: 34,
      isOnline: true
    },
    {
      id: "2", 
      username: "QuantumLearner",
      email: "quantum@learning.com",
      streak: 8,
      lessonsCompleted: 22,
      isOnline: false
    },
    {
      id: "3",
      username: "NewtonFan",
      email: "newton@gravity.net",
      streak: 12,
      lessonsCompleted: 28,
      isOnline: true
    }
  ]);

  if (!isOpen) return null;

  const addFriend = (username: string) => {
    if (!username.trim()) return;
    
    const newFriend: Friend = {
      id: Date.now().toString(),
      username: username,
      email: `${username}@quoma.com`,
      streak: Math.floor(Math.random() * 20),
      lessonsCompleted: Math.floor(Math.random() * 40),
      isOnline: Math.random() > 0.5
    };
    
    setFriends(prev => [...prev, newFriend]);
    setSearchTerm("");
  };

  const sortedFriends = [...friends].sort((a, b) => b.lessonsCompleted - a.lessonsCompleted);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg bg-white dark:bg-gray-900">
        <CardContent className="p-0">
          <div className="gradient-primary p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Friends</h2>
                <p className="text-blue-100">Connect with fellow physics enthusiasts</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                <i className="fas fa-times"></i>
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant={activeTab === 'friends' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('friends')}
                className={activeTab === 'friends' ? 'bg-white text-blue-600' : 'text-white hover:bg-white hover:bg-opacity-20'}
              >
                <i className="fas fa-users text-xs mr-1"></i>
                Friends ({friends.length})
              </Button>
              <Button
                variant={activeTab === 'add' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('add')}
                className={activeTab === 'add' ? 'bg-white text-blue-600' : 'text-white hover:bg-white hover:bg-opacity-20'}
              >
                <i className="fas fa-user-plus text-xs mr-1"></i>
                Add Friends
              </Button>
              <Button
                variant={activeTab === 'leaderboard' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('leaderboard')}
                className={activeTab === 'leaderboard' ? 'bg-white text-blue-600' : 'text-white hover:bg-white hover:bg-opacity-20'}
              >
                <i className="fas fa-trophy text-xs mr-1"></i>
                Leaderboard
              </Button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'friends' && (
              <div className="space-y-4">
                {friends.length === 0 ? (
                  <div className="text-center py-8">
                    <i className="fas fa-user-friends text-4xl text-gray-400 mb-4"></i>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">No friends yet</p>
                    <Button
                      onClick={() => setActiveTab('add')}
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Add Your First Friend
                    </Button>
                  </div>
                ) : (
                  friends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {friend.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {friend.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{friend.username}</p>
                          <div className="flex items-center space-x-3 text-xs text-gray-600 dark:text-gray-400">
                            <span><i className="fas fa-fire text-orange-500 mr-1"></i>{friend.streak} day streak</span>
                            <span><i className="fas fa-book text-blue-500 mr-1"></i>{friend.lessonsCompleted} lessons</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={friend.isOnline ? "secondary" : "outline"} className={friend.isOnline ? "bg-green-100 text-green-800" : ""}>
                          {friend.isOnline ? "Online" : "Offline"}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'add' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Add Friend by Username
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Enter username..."
                      className="flex-1"
                    />
                    <Button
                      onClick={() => addFriend(searchTerm)}
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <i className="fas fa-plus text-xs mr-1"></i>
                      Add
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Suggested Friends</h3>
                  <div className="space-y-2">
                    {['EinsteinFan', 'RelativityRocks', 'QuantumQueen'].map((suggestion) => (
                      <div key={suggestion} className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                              {suggestion.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-900 dark:text-white">{suggestion}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addFriend(suggestion)}
                          className="text-xs"
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'leaderboard' && (
              <div className="space-y-3">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Weekly Leaderboard</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Based on lessons completed</p>
                </div>
                
                {user && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          YOU
                        </div>
                        <div>
                          <p className="font-medium text-blue-900 dark:text-blue-100">{user.username}</p>
                          <p className="text-xs text-blue-700 dark:text-blue-300">Rank #4 • 12 lessons completed</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                        You
                      </Badge>
                    </div>
                  </div>
                )}
                
                {sortedFriends.map((friend, index) => (
                  <div key={friend.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-emerald-500 text-white' : 
                        index === 1 ? 'bg-blue-500 text-white' : 
                        index === 2 ? 'bg-purple-500 text-white' : 
                        'bg-gray-200 text-gray-700'
                      }`}>
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{friend.username}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{friend.lessonsCompleted} lessons completed</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {index < 3 && (
                        <i className={`fas fa-trophy ${
                          index === 0 ? 'text-emerald-500' : 
                          index === 1 ? 'text-blue-500' : 
                          'text-purple-500'
                        }`}></i>
                      )}
                      <Badge variant="outline">
                        <i className="fas fa-fire text-orange-500 mr-1"></i>
                        {friend.streak}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}