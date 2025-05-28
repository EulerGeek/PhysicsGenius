import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
// import InteractiveConceptLessonFixed from "./InteractiveConceptLessonFixed";

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50 overflow-y-auto">
      <Card className="w-full max-w-5xl max-h-[90vh] flex flex-col bg-white dark:bg-gray-900 shadow-2xl rounded-3xl border-4 border-purple-200 dark:border-purple-800 bounce-in overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🧠</span>
              <div>
                <h2 className="text-2xl font-bold">{lessonData.title}</h2>
                <p className="text-purple-100">Interactive Concept Learning</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 group"
            >
              <span className="text-2xl group-hover:wiggle">✕</span>
            </Button>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
            <Progress value={progress} className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden" />
            <div className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2">
              <span className="flex items-center gap-2">
                <span className="text-lg">📖</span>
                Question {currentQuestion + 1} of {lessonData.questions.length}
              </span>
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                {Math.round(progress)}% Complete
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-full">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-2xl transition-all duration-300 ${i < hearts ? '❤️ bounce-in' : '🤍'}`} />
              ))}
            </div>
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg pulse-glow">
              🔥 Streak: {streak}
            </Badge>
          </div>
        </div>
      </div>

        {/* Main Content */}
        <CardContent className="flex-1 overflow-y-auto p-8">
            {!showExplanation ? (
              <div className="space-y-10">
                {/* Question */}
                <div className="text-center slide-up">
                  <div className="mb-6">
                    <span className="text-6xl float-animation">🧠</span>
                  </div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-6 leading-tight">
                    {currentQ.question}
                  </h2>
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {currentQ.type.replace('-', ' ').toUpperCase()} QUESTION
                  </Badge>
                </div>

                {/* Question Content */}
                <div className="min-h-[300px] flex items-center justify-center">
                  {currentQ.type === 'multiple-choice' && (
                    <div className="grid gap-6 w-full max-w-3xl">
                      {currentQ.options?.map((option, index) => (
                        <Button
                          key={index}
                          variant={selectedAnswer === option ? "default" : "outline"}
                          className={`p-8 text-left justify-start text-lg rounded-3xl border-3 transition-all duration-500 hover-lift group ${
                            selectedAnswer === option 
                              ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white border-green-500 transform scale-105 shadow-2xl pulse-glow' 
                              : 'hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 border-gray-300 dark:border-gray-600 hover:scale-102'
                          }`}
                          onClick={() => handleAnswerSelect(option)}
                          style={{animationDelay: `${index * 0.1}s`}}
                        >
                          <div className="flex items-center gap-4 w-full">
                            <span className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                              selectedAnswer === option 
                                ? 'bg-white/20 text-white' 
                                : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 group-hover:scale-110'
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="flex-1 leading-relaxed">{option}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  )}

                  {currentQ.type === 'fill-blank' && (
                    <div className="text-center space-y-8 slide-up">
                      <div className="mb-4">
                        <span className="text-5xl float-animation">✍️</span>
                      </div>
                      <Input
                        type="text"
                        placeholder="Type your answer here..."
                        value={selectedAnswer}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        className="text-3xl text-center p-8 border-3 border-gray-300 dark:border-gray-600 rounded-3xl focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 max-w-2xl mx-auto"
                      />
                      <p className="text-gray-600 dark:text-gray-400 text-lg">
                        💡 Take your time and think carefully!
                      </p>
                    </div>
                  )}

                  {currentQ.type === 'simulation' && (
                    <div className="text-center space-y-8 w-full bounce-in">
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-10 border-3 border-dashed border-blue-300 dark:border-blue-600 hover:border-blue-500 transition-all duration-300 hover:scale-105 group">
                        <div className="text-8xl mb-6 float-animation group-hover:wiggle">🏀</div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Interactive Physics Simulation</h3>
                        <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto mb-8">
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg">
                            <label className="block text-sm font-bold mb-3 text-blue-600 dark:text-blue-400">Initial Velocity (m/s)</label>
                            <Input type="number" placeholder="5" className="text-center text-xl p-3 border-2 rounded-xl" />
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg">
                            <label className="block text-sm font-bold mb-3 text-purple-600 dark:text-purple-400">Acceleration (m/s²)</label>
                            <Input type="number" placeholder="2" className="text-center text-xl p-3 border-2 rounded-xl" />
                          </div>
                        </div>
                        <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 text-lg font-semibold">
                          🚀 Run Simulation
                        </Button>
                      </div>
                      <Input
                        placeholder="Enter your calculated values (e.g., v₀=5, a=2)"
                        value={selectedAnswer}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        className="text-center p-6 border-3 border-gray-300 dark:border-gray-600 rounded-2xl text-lg max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300"
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
  );
}