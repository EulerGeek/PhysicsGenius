import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
// import CustomAITutor from "./CustomAITutor";

interface Question {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'drag-drop' | 'simulation' | 'discussion';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  hint?: string;
  simulation?: {
    type: string;
    parameters: any;
  };
}

interface LessonData {
  conceptId: string;
  courseId: string;
  title: string;
  description: string;
  questions: Question[];
  aiDiscussionTopics: string[];
}

interface InteractiveConceptLessonProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  conceptId: string;
  onComplete: (score: number) => void;
}

export default function InteractiveConceptLesson({ 
  isOpen, 
  onClose, 
  courseId, 
  conceptId, 
  onComplete 
}: InteractiveConceptLessonProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [showAITutor, setShowAITutor] = useState(false);
  const [hearts, setHearts] = useState(5);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Sample lesson data - in a real app, this would come from your database
  const lessonData: LessonData = {
    conceptId,
    courseId,
    title: "Kinematics: Motion in One Dimension",
    description: "Master the fundamentals of motion, velocity, and acceleration",
    questions: [
      {
        id: "1",
        type: "multiple-choice",
        question: "What is the definition of velocity?",
        options: [
          "The rate of change of position with respect to time",
          "The total distance traveled",
          "The rate of change of acceleration",
          "The force applied to an object"
        ],
        correctAnswer: "The rate of change of position with respect to time",
        explanation: "Velocity is defined as the rate of change of position with respect to time. It's a vector quantity that includes both magnitude and direction.",
        hint: "Think about what changes when an object moves from one position to another."
      },
      {
        id: "2",
        type: "fill-blank",
        question: "If an object moves 100 meters in 20 seconds at constant speed, its velocity is ___ m/s.",
        correctAnswer: "5",
        explanation: "Velocity = distance / time = 100m / 20s = 5 m/s",
        hint: "Use the formula: velocity = distance ÷ time"
      },
      {
        id: "3",
        type: "multiple-choice",
        question: "What happens to an object's velocity when it experiences constant acceleration?",
        options: [
          "It remains constant",
          "It changes at a constant rate",
          "It becomes zero",
          "It oscillates"
        ],
        correctAnswer: "It changes at a constant rate",
        explanation: "When an object experiences constant acceleration, its velocity changes at a constant rate. This is the definition of constant acceleration.",
        hint: "Acceleration is the rate of change of velocity."
      },
      {
        id: "4",
        type: "simulation",
        question: "Adjust the initial velocity and acceleration to make the ball reach exactly 50 meters in 5 seconds.",
        correctAnswer: "v₀=5, a=2",
        explanation: "Using the equation x = v₀t + ½at², with x=50m, t=5s: 50 = 5(5) + ½a(25), so a = 2 m/s²",
        simulation: {
          type: "motion",
          parameters: { maxVelocity: 20, maxAcceleration: 5, targetDistance: 50, targetTime: 5 }
        }
      },
      {
        id: "5",
        type: "discussion",
        question: "Explain how you would calculate the velocity of a falling object after 3 seconds, ignoring air resistance.",
        correctAnswer: "v = gt = 9.8 × 3 = 29.4 m/s",
        explanation: "For free fall, we use v = gt where g = 9.8 m/s² and t = 3s, giving v = 29.4 m/s downward."
      }
    ],
    aiDiscussionTopics: [
      "Real-world applications of kinematics",
      "How GPS systems use velocity calculations",
      "Motion in sports and athletics",
      "Comparing motion on Earth vs. other planets"
    ]
  };

  const currentQ = lessonData.questions[currentQuestion];
  const progress = ((currentQuestion) / lessonData.questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    const isCorrect = Array.isArray(currentQ.correctAnswer) 
      ? currentQ.correctAnswer.includes(selectedAnswer)
      : selectedAnswer.toLowerCase().trim() === currentQ.correctAnswer.toLowerCase().trim();

    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      setShowExplanation(true);
    } else {
      setHearts(hearts - 1);
      setStreak(0);
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion < lessonData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
      setShowHint(false);
    } else {
      // Lesson complete
      const finalScore = Math.round((score / lessonData.questions.length) * 100);
      onComplete(finalScore);
      onClose();
    }
  };

  const handleHint = () => {
    setShowHint(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 z-50 overflow-hidden">
      {/* Top Bar */}
      <div className="bg-white/95 backdrop-blur-lg border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onClose}
            className="rounded-full p-3 hover:bg-gray-100"
          >
            <span className="text-xl">✕</span>
          </Button>
          
          <div className="flex-1 mx-6">
            <Progress value={progress} className="h-3 bg-gray-200" />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>Question {currentQuestion + 1} of {lessonData.questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xl ${i < hearts ? '❤️' : '🤍'}`} />
              ))}
            </div>
            <Badge className="bg-orange-100 text-orange-700">
              🔥 Streak: {streak}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-4xl bg-white/98 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            {!showExplanation ? (
              <div className="space-y-8">
                {/* Question */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {currentQ.question}
                  </h2>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {currentQ.type.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>

                {/* Question Content */}
                <div className="min-h-[300px] flex items-center justify-center">
                  {currentQ.type === 'multiple-choice' && (
                    <div className="grid gap-4 w-full max-w-2xl">
                      {currentQ.options?.map((option, index) => (
                        <Button
                          key={index}
                          variant={selectedAnswer === option ? "default" : "outline"}
                          className={`p-6 text-left justify-start text-lg rounded-2xl border-2 transition-all duration-200 ${
                            selectedAnswer === option 
                              ? 'bg-blue-600 text-white border-blue-600 transform scale-105' 
                              : 'hover:border-blue-400 hover:bg-blue-50'
                          }`}
                          onClick={() => handleAnswerSelect(option)}
                        >
                          <span className="mr-4 text-xl">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}

                  {currentQ.type === 'fill-blank' && (
                    <div className="text-center space-y-6">
                      <Input
                        type="text"
                        placeholder="Enter your answer..."
                        value={selectedAnswer}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        className="text-2xl text-center p-6 border-2 border-gray-300 rounded-2xl focus:border-blue-500"
                      />
                    </div>
                  )}

                  {currentQ.type === 'simulation' && (
                    <div className="text-center space-y-6 w-full">
                      <div className="bg-gray-100 rounded-2xl p-8 border-2 border-dashed border-gray-300">
                        <div className="text-6xl mb-4">🏀</div>
                        <p className="text-gray-600 mb-4">Interactive Physics Simulation</p>
                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                          <div>
                            <label className="block text-sm font-medium mb-2">Initial Velocity (m/s)</label>
                            <Input type="number" placeholder="5" className="text-center" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Acceleration (m/s²)</label>
                            <Input type="number" placeholder="2" className="text-center" />
                          </div>
                        </div>
                        <Button className="mt-4 bg-green-600 hover:bg-green-700">
                          🚀 Run Simulation
                        </Button>
                      </div>
                      <Input
                        placeholder="Enter your values (e.g., v₀=5, a=2)"
                        value={selectedAnswer}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        className="text-center p-4 border-2 border-gray-300 rounded-xl"
                      />
                    </div>
                  )}

                  {currentQ.type === 'discussion' && (
                    <div className="w-full space-y-6">
                      <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6">
                        <h3 className="font-bold text-lg mb-3">💭 Think & Discuss</h3>
                        <p className="text-gray-700">
                          Take your time to think through this problem. You can discuss with our AI tutor!
                        </p>
                        <Button
                          onClick={() => setShowAITutor(true)}
                          className="mt-4 bg-purple-600 hover:bg-purple-700"
                        >
                          🤖 Discuss with AI Tutor
                        </Button>
                      </div>
                      <textarea
                        placeholder="Type your explanation here..."
                        value={selectedAnswer}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        className="w-full h-32 p-4 border-2 border-gray-300 rounded-xl resize-none focus:border-blue-500"
                      />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={handleHint}
                    disabled={showHint}
                    className="rounded-xl px-6 py-3"
                  >
                    💡 {showHint ? "Hint shown" : "Get Hint"}
                  </Button>

                  <Button
                    onClick={handleSubmit}
                    disabled={!selectedAnswer.trim()}
                    className="bg-green-600 hover:bg-green-700 rounded-xl px-8 py-3 text-lg font-semibold"
                  >
                    ✓ Check Answer
                  </Button>
                </div>

                {/* Hint */}
                {showHint && currentQ.hint && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
                    <p className="text-yellow-800">
                      <span className="font-semibold">💡 Hint:</span> {currentQ.hint}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // Explanation Screen
              <div className="text-center space-y-8">
                <div className="text-8xl">
                  {userAnswers[currentQuestion]?.toLowerCase().trim() === currentQ.correctAnswer.toString().toLowerCase().trim() ? '🎉' : '😅'}
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    {userAnswers[currentQuestion]?.toLowerCase().trim() === currentQ.correctAnswer.toString().toLowerCase().trim() 
                      ? 'Excellent!' 
                      : 'Not quite right!'}
                  </h2>
                  
                  <div className="bg-blue-50 rounded-2xl p-6 max-w-2xl mx-auto">
                    <h3 className="font-semibold text-lg mb-3 text-blue-900">📖 Explanation</h3>
                    <p className="text-blue-800">{currentQ.explanation}</p>
                  </div>
                </div>

                <Button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-4 text-lg font-semibold"
                >
                  {currentQuestion < lessonData.questions.length - 1 ? 'Next Question →' : '🎯 Complete Lesson'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Tutor - Temporarily disabled, will be available through floating button */}
    </div>
  );
}