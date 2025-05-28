import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface DuolingoQuestion {
  id: string;
  type: 'multiple_choice' | 'drag_drop' | 'fill_blank' | 'true_false' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  concept: string;
}

interface DuolingoStyleLessonProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  lessonId: string;
  onComplete: (score: number) => void;
}

export default function DuolingoStyleLesson({ isOpen, onClose, courseId, lessonId, onComplete }: DuolingoStyleLessonProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [streak, setStreak] = useState(0);
  const [draggedItems, setDraggedItems] = useState<string[]>([]);

  // Vibrant Duolingo-style physics questions
  const physicsQuestions: DuolingoQuestion[] = [
    {
      id: "1",
      type: "multiple_choice",
      question: "What happens to the kinetic energy of an object when its velocity doubles?",
      options: ["Doubles", "Quadruples", "Triples", "Stays the same"],
      correctAnswer: "Quadruples",
      explanation: "Kinetic energy = ½mv². When velocity doubles, KE = ½m(2v)² = 4 × ½mv²",
      difficulty: "medium",
      concept: "Energy"
    },
    {
      id: "2",
      type: "drag_drop",
      question: "Arrange Newton's Laws in the correct order:",
      options: ["An object at rest stays at rest", "F = ma", "For every action, there's an equal and opposite reaction"],
      correctAnswer: ["An object at rest stays at rest", "F = ma", "For every action, there's an equal and opposite reaction"],
      explanation: "Newton's three laws form the foundation of classical mechanics!",
      difficulty: "easy",
      concept: "Forces"
    },
    {
      id: "3",
      type: "fill_blank",
      question: "The force of gravity between two objects depends on their _____ and the distance between them.",
      options: ["mass", "volume", "speed", "temperature"],
      correctAnswer: "mass",
      explanation: "Newton's law of universal gravitation: F = G(m₁m₂)/r²",
      difficulty: "easy",
      concept: "Gravity"
    },
    {
      id: "4",
      type: "true_false",
      question: "Sound travels faster in air than in water.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Sound travels about 4 times faster in water (1500 m/s) than in air (343 m/s)!",
      difficulty: "medium",
      concept: "Waves"
    },
    {
      id: "5",
      type: "matching",
      question: "Match the physics concept with its unit:",
      options: ["Force → Newton", "Energy → Joule", "Power → Watt", "Pressure → Pascal"],
      correctAnswer: ["Force → Newton", "Energy → Joule", "Power → Watt", "Pressure → Pascal"],
      explanation: "These are the fundamental SI units for these physical quantities!",
      difficulty: "hard",
      concept: "Units"
    }
  ];

  const currentQuestion = physicsQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / physicsQuestions.length) * 100;

  const checkAnswer = () => {
    const correct = Array.isArray(currentQuestion.correctAnswer) 
      ? JSON.stringify(selectedAnswer) === JSON.stringify(currentQuestion.correctAnswer)
      : selectedAnswer === currentQuestion.correctAnswer;
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setHearts(Math.max(0, hearts - 1));
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < physicsQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setShowResult(false);
      setDraggedItems([]);
    } else {
      onComplete(score);
      onClose();
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? "default" : "outline"}
                className={`w-full p-4 h-auto text-left justify-start transition-all duration-200 hover:scale-105 ${
                  selectedAnswer === option 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                    : "bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400"
                }`}
                onClick={() => setSelectedAnswer(option)}
              >
                <span className={`w-8 h-8 rounded-full border-2 mr-3 flex items-center justify-center ${
                  selectedAnswer === option ? "bg-white text-blue-600" : "border-blue-300"
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </Button>
            ))}
          </div>
        );

      case 'true_false':
        return (
          <div className="flex space-x-4">
            {currentQuestion.options?.map((option) => (
              <Button
                key={option}
                variant={selectedAnswer === option ? "default" : "outline"}
                className={`flex-1 p-6 text-xl font-bold transition-all duration-200 hover:scale-105 ${
                  selectedAnswer === option 
                    ? option === "True" 
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" 
                      : "bg-gradient-to-r from-red-500 to-pink-600 text-white"
                    : "bg-white hover:bg-gray-50 border-2 border-gray-200"
                }`}
                onClick={() => setSelectedAnswer(option)}
              >
                {option === "True" ? "✓ TRUE" : "✗ FALSE"}
              </Button>
            ))}
          </div>
        );

      case 'fill_blank':
        return (
          <div className="space-y-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
              <p className="text-lg">{currentQuestion.question}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className={`p-4 transition-all duration-200 hover:scale-105 ${
                    selectedAnswer === option 
                      ? "bg-gradient-to-r from-orange-500 to-yellow-600 text-white shadow-lg" 
                      : "bg-white hover:bg-orange-50 border-2 border-orange-200"
                  }`}
                  onClick={() => setSelectedAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Question type not implemented yet!</div>;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Physics Lesson</CardTitle>
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex space-x-1">
              {Array.from({length: 5}).map((_, i) => (
                <span key={i} className={`text-2xl ${i < hearts ? "text-red-400" : "text-gray-400"}`}>
                  ❤️
                </span>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-yellow-300">🔥</span>
              <span className="font-bold">{streak}</span>
            </div>
            
            <div className="flex-1">
              <Progress value={progress} className="h-3 bg-white/20" />
              <p className="text-sm mt-1">{currentQuestionIndex + 1} of {physicsQuestions.length}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {!showResult ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Badge className={`px-3 py-1 ${
                  currentQuestion.difficulty === 'easy' ? 'bg-green-500' :
                  currentQuestion.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                  {currentQuestion.difficulty.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="px-3 py-1 border-purple-300 text-purple-700">
                  {currentQuestion.concept}
                </Badge>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {currentQuestion.question}
              </h3>

              {renderQuestion()}

              <Button
                onClick={checkAnswer}
                disabled={!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)}
                className="w-full p-4 text-lg font-bold bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
              >
                CHECK ANSWER
              </Button>
            </div>
          ) : (
            <div className={`text-center p-8 rounded-lg ${
              isCorrect 
                ? "bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300" 
                : "bg-gradient-to-br from-red-100 to-pink-100 border-2 border-red-300"
            }`}>
              <div className="text-6xl mb-4">
                {isCorrect ? "🎉" : "💔"}
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 ${
                isCorrect ? "text-green-700" : "text-red-700"
              }`}>
                {isCorrect ? "Excellent!" : "Not quite right"}
              </h3>
              
              <p className="text-gray-700 mb-6 text-lg">
                {currentQuestion.explanation}
              </p>
              
              <Button
                onClick={nextQuestion}
                className={`px-8 py-3 text-lg font-bold transition-all duration-200 hover:scale-105 ${
                  isCorrect 
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" 
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                }`}
              >
                {currentQuestionIndex < physicsQuestions.length - 1 ? "CONTINUE" : "FINISH LESSON"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}