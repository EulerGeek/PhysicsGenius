import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

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

export default function InteractiveConceptLessonFixed({ 
  isOpen, 
  onClose, 
  courseId, 
  conceptId, 
  onComplete 
}: InteractiveConceptLessonProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const lessonData: LessonData = {
    conceptId,
    courseId,
    title: "Interactive Physics Concept",
    description: "Master physics through interactive learning",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "What is Newton's First Law of Motion?",
        options: [
          "Objects in motion stay in motion unless acted upon by a force",
          "Force equals mass times acceleration",
          "Every action has an equal and opposite reaction",
          "Energy cannot be created or destroyed"
        ],
        correctAnswer: "Objects in motion stay in motion unless acted upon by a force",
        explanation: "Newton's First Law states that objects at rest stay at rest and objects in motion stay in motion with the same speed and in the same direction unless acted upon by an unbalanced force.",
        hint: "Think about what happens when you slide a book across a table - it eventually stops due to friction."
      },
      {
        id: "q2",
        type: "multiple-choice", 
        question: "What is the formula for kinetic energy?",
        options: [
          "KE = mgh",
          "KE = ½mv²",
          "KE = mv",
          "KE = F × d"
        ],
        correctAnswer: "KE = ½mv²",
        explanation: "Kinetic energy is the energy of motion, calculated as KE = ½mv² where m is mass and v is velocity.",
        hint: "Remember that kinetic energy depends on both mass and velocity, with velocity being squared."
      }
    ],
    aiDiscussionTopics: ["Force and motion", "Energy conservation", "Real-world applications"]
  };

  const currentQ = lessonData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / lessonData.questions.length) * 100;

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) {
      alert("Please select an answer first!");
      return;
    }

    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setHearts(Math.max(0, hearts - 1));
    }

    setShowExplanation(true);
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
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🧠</span>
              <div>
                <CardTitle className="text-2xl font-bold">{lessonData.title}</CardTitle>
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
          
          <div className="mt-4 space-y-3">
            <Progress value={progress} className="h-3 bg-white/20 rounded-full" />
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2">
                <span className="text-lg">📖</span>
                Question {currentQuestion + 1} of {lessonData.questions.length}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                {Math.round(progress)}% Complete
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-xl transition-all duration-300 ${i < hearts ? '❤️' : '🤍'}`} />
                ))}
              </div>
              <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full">
                🔥 Streak: {streak}
              </Badge>
            </div>
          </div>
        </CardHeader>

        {/* Main Content */}
        <CardContent className="flex-1 overflow-y-auto p-8">
          {!showExplanation ? (
            <div className="space-y-8">
              {/* Question */}
              <div className="text-center">
                <div className="mb-6">
                  <span className="text-5xl">🤔</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {currentQ.question}
                </h2>
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full">
                  {currentQ.type.replace('-', ' ').toUpperCase()} QUESTION
                </Badge>
              </div>

              {/* Options */}
              <div className="max-w-3xl mx-auto">
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-4">
                  {currentQ.options?.map((option, index) => (
                    <div key={index} className="relative">
                      <RadioGroupItem
                        value={option}
                        id={`option-${index}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex items-center p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 peer-checked:border-blue-500 peer-checked:bg-blue-100 dark:peer-checked:bg-blue-900/40"
                      >
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 mr-4 peer-checked:border-blue-500 peer-checked:bg-blue-500 flex items-center justify-center">
                          {selectedAnswer === option && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span className="text-lg">{option}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Hint Section */}
              {showHint && (
                <div className="max-w-3xl mx-auto bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-700 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Hint:</h4>
                      <p className="text-yellow-700 dark:text-yellow-300">{currentQ.hint}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={handleHint}
                  disabled={showHint}
                  className="rounded-xl px-6 py-3"
                >
                  💡 Need a Hint?
                </Button>
                <Button
                  onClick={handleAnswerSubmit}
                  disabled={!selectedAnswer}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-8 py-3 text-lg font-semibold"
                >
                  Submit Answer
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8 text-center">
              {/* Result */}
              <div className="mb-8">
                <div className="text-6xl mb-4">
                  {selectedAnswer === currentQ.correctAnswer ? '🎉' : '😔'}
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  {selectedAnswer === currentQ.correctAnswer ? 'Correct!' : 'Not quite right'}
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {selectedAnswer === currentQ.correctAnswer 
                    ? 'Great job! You got it right!' 
                    : `The correct answer is: ${currentQ.correctAnswer}`}
                </p>
              </div>

              {/* Explanation */}
              <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-700">
                <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">📚 Explanation</h4>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{currentQ.explanation}</p>
              </div>

              {/* Next Button */}
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-xl px-8 py-4 text-lg font-semibold"
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