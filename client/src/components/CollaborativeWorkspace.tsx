import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAudio } from "@/hooks/useAudio";

interface CollaborativeSession {
  id: string;
  lessonId: string;
  lessonTitle: string;
  participants: Participant[];
  currentQuestion: number;
  totalQuestions: number;
  answers: Record<string, string>;
  isActive: boolean;
}

interface Participant {
  id: string;
  username: string;
  avatar: string;
  isOnline: boolean;
  score: number;
  currentAnswer?: string;
}

interface CollaborativeWorkspaceProps {
  lessonId: string;
  lessonTitle: string;
  questions: any[];
  onComplete: (score: number) => void;
  onClose: () => void;
}

export default function CollaborativeWorkspace({ 
  lessonId, 
  lessonTitle, 
  questions, 
  onComplete, 
  onClose 
}: CollaborativeWorkspaceProps) {
  const [session, setSession] = useState<CollaborativeSession | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    username: string;
    message: string;
    timestamp: Date;
  }>>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { playSound } = useAudio();
  const wsRef = useRef<WebSocket | null>(null);

  // Initialize collaborative session
  useEffect(() => {
    // Create mock session for demo
    const mockSession: CollaborativeSession = {
      id: `session-${Date.now()}`,
      lessonId,
      lessonTitle,
      participants: [
        {
          id: "user-1",
          username: "You",
          avatar: "👤",
          isOnline: true,
          score: 0
        },
        {
          id: "user-2", 
          username: "PhysicsExplorer",
          avatar: "🔬",
          isOnline: true,
          score: 0
        },
        {
          id: "user-3",
          username: "QuantumLearner", 
          avatar: "⚛️",
          isOnline: true,
          score: 0
        }
      ],
      currentQuestion: 0,
      totalQuestions: questions.length,
      answers: {},
      isActive: true
    };

    setSession(mockSession);

    // Add welcome messages
    setChatMessages([
      {
        id: "1",
        username: "System",
        message: `Welcome to collaborative solving! Working together on "${lessonTitle}"`,
        timestamp: new Date()
      },
      {
        id: "2", 
        username: "PhysicsExplorer",
        message: "Hey! Ready to tackle some physics problems together? 🚀",
        timestamp: new Date()
      },
      {
        id: "3",
        username: "QuantumLearner", 
        message: "This is going to be fun! Let's help each other learn 💪",
        timestamp: new Date()
      }
    ]);

    playSound('notification');

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [lessonId, lessonTitle, questions.length]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    playSound('click');
    
    // Simulate other participants selecting answers
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: Date.now().toString(),
        username: "PhysicsExplorer",
        message: `I'm thinking ${answer === 'a' ? 'B' : 'A'}... what do you all think?`,
        timestamp: new Date()
      }]);
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) return;

    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    if (isCorrect) {
      playSound('correct');
      // Update score for current user
      setSession(prev => prev ? {
        ...prev,
        participants: prev.participants.map(p => 
          p.id === "user-1" ? { ...p, score: p.score + 10 } : p
        )
      } : null);
    } else {
      playSound('incorrect');
    }

    // Add result message to chat
    setChatMessages(prev => [...prev, {
      id: Date.now().toString(),
      username: "System",
      message: `Question ${currentQuestion + 1}: ${isCorrect ? 'Correct! 🎉' : 'Incorrect 😅'} Answer was ${question.correctAnswer.toUpperCase()}`,
      timestamp: new Date()
    }]);

    setSelectedAnswer("");
    
    if (currentQuestion + 1 >= questions.length) {
      // End of lesson
      setShowResults(true);
      playSound('complete');
      setTimeout(() => {
        onComplete(80); // Mock score
      }, 3000);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    setChatMessages(prev => [...prev, {
      id: Date.now().toString(),
      username: "You",
      message: newMessage,
      timestamp: new Date()
    }]);
    
    setNewMessage("");
    playSound('click');

    // Simulate responses
    setTimeout(() => {
      const responses = [
        "Great point!",
        "I agree with that approach",
        "That makes sense to me",
        "Good thinking!",
        "I was thinking the same thing"
      ];
      
      setChatMessages(prev => [...prev, {
        id: Date.now().toString(),
        username: Math.random() > 0.5 ? "PhysicsExplorer" : "QuantumLearner",
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      }]);
    }, 1500);
  };

  if (!session) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Connecting to collaborative session...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center">🎉 Lesson Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-lg font-semibold">Final Scores:</p>
              {session.participants.map(participant => (
                <div key={participant.id} className="flex justify-between items-center py-2">
                  <span className="flex items-center gap-2">
                    <span>{participant.avatar}</span>
                    <span>{participant.username}</span>
                  </span>
                  <Badge variant="secondary">{participant.score} pts</Badge>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600">Great job working together! 🤝</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-6xl h-[90vh] grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Main Question Area */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Collaborative Physics Solving</CardTitle>
                <Button variant="outline" size="sm" onClick={onClose}>
                  ✕ Close
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">
                  Question {currentQuestion + 1} of {questions.length}
                </Badge>
                <div className="flex -space-x-2">
                  {session.participants.map(participant => (
                    <div 
                      key={participant.id}
                      className={`w-8 h-8 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-sm ${
                        participant.isOnline ? 'border-green-400' : 'border-gray-400'
                      }`}
                      title={`${participant.username} - ${participant.score} pts`}
                    >
                      {participant.avatar}
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col justify-center p-6">
              {currentQ && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-center">
                    {currentQ.question}
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {currentQ.options?.map((option: any) => (
                      <Button
                        key={option.value}
                        variant={selectedAnswer === option.value ? "default" : "outline"}
                        className="text-left justify-start h-auto p-4"
                        onClick={() => handleAnswerSelect(option.value)}
                      >
                        <span className="font-bold mr-3">{option.value.toUpperCase()})</span>
                        {option.text}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      onClick={handleNextQuestion}
                      disabled={!selectedAnswer}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {currentQuestion + 1 >= questions.length ? 'Finish Lesson' : 'Next Question'} →
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Chat Sidebar */}
        <div className="flex flex-col">
          {/* Participants */}
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Participants ({session.participants.length})</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              {session.participants.map(participant => (
                <div key={participant.id} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{participant.avatar}</span>
                    <div>
                      <div className="text-sm font-medium">{participant.username}</div>
                      <div className="text-xs text-gray-500">{participant.score} pts</div>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${participant.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chat */}
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Team Chat</CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 px-4">
                {chatMessages.map(msg => (
                  <div key={msg.id} className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">
                      {msg.username} • {msg.timestamp.toLocaleTimeString()}
                    </div>
                    <div className="text-sm bg-gray-50 dark:bg-gray-800 rounded p-2">
                      {msg.message}
                    </div>
                  </div>
                ))}
              </ScrollArea>
              
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="text-sm"
                  />
                  <Button size="sm" onClick={sendMessage}>
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}