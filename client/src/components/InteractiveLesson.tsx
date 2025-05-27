import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: string;
  type: "multiple-choice" | "drag-drop" | "fill-blank";
  question: string;
  options?: { value: string; text: string; }[];
  correctAnswer: string;
  explanation: string;
  concept: string;
}

interface InteractiveLessonProps {
  lessonId: string;
  title: string;
  onComplete: (score: number) => void;
  onClose: () => void;
}

const introductionToMotionQuestions: Question[] = [
  {
    id: "motion-1",
    type: "multiple-choice",
    question: "What is the definition of velocity?",
    options: [
      { value: "a", text: "The distance traveled by an object" },
      { value: "b", text: "The rate of change of position with respect to time" },
      { value: "c", text: "The force acting on an object" },
      { value: "d", text: "The mass times acceleration" }
    ],
    correctAnswer: "b",
    explanation: "Velocity is defined as the rate of change of position with respect to time. It's a vector quantity that includes both magnitude (speed) and direction.",
    concept: "Velocity = displacement/time"
  },
  {
    id: "motion-2", 
    type: "multiple-choice",
    question: "If a car travels 100 meters in 10 seconds, what is its average speed?",
    options: [
      { value: "a", text: "5 m/s" },
      { value: "b", text: "10 m/s" },
      { value: "c", text: "15 m/s" },
      { value: "d", text: "20 m/s" }
    ],
    correctAnswer: "b",
    explanation: "Average speed = total distance / total time = 100 meters / 10 seconds = 10 m/s",
    concept: "Speed = distance/time"
  },
  {
    id: "motion-3",
    type: "multiple-choice", 
    question: "What is acceleration?",
    options: [
      { value: "a", text: "The speed of an object" },
      { value: "b", text: "The distance traveled per unit time" },
      { value: "c", text: "The rate of change of velocity" },
      { value: "d", text: "The position of an object" }
    ],
    correctAnswer: "c",
    explanation: "Acceleration is the rate of change of velocity with respect to time. When velocity changes (either in magnitude or direction), acceleration occurs.",
    concept: "Acceleration = change in velocity/time"
  },
  {
    id: "motion-4",
    type: "multiple-choice",
    question: "A ball is thrown upward. At the highest point of its trajectory, what is its velocity?",
    options: [
      { value: "a", text: "Maximum upward velocity" },
      { value: "b", text: "Zero" },
      { value: "c", text: "Maximum downward velocity" },
      { value: "d", text: "Cannot be determined" }
    ],
    correctAnswer: "b",
    explanation: "At the highest point, the ball momentarily stops before falling back down. Therefore, its velocity is zero at that instant.",
    concept: "At maximum height, vertical velocity = 0"
  },
  {
    id: "motion-5",
    type: "multiple-choice",
    question: "Which of the following is a vector quantity?",
    options: [
      { value: "a", text: "Speed" },
      { value: "b", text: "Distance" },
      { value: "c", text: "Displacement" },
      { value: "d", text: "Time" }
    ],
    correctAnswer: "c",
    explanation: "Displacement is a vector quantity because it has both magnitude and direction. Speed and distance are scalar quantities (magnitude only).",
    concept: "Vector quantities have both magnitude and direction"
  }
];

export default function InteractiveLesson({ lessonId, title, onComplete, onClose }: InteractiveLessonProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = introductionToMotionQuestions;
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) {
      alert("Please select an answer first!");
      return;
    }

    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Record the answer
    setAnswers(prev => ({ ...prev, [question.id]: selectedAnswer }));
    
    if (correct) {
      setScore(prev => prev + 20); // 20 points per question
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer("");
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      // Lesson complete
      const finalScore = score + (isCorrect ? 20 : 0);
      onComplete(finalScore);
    }
  };

  const handleReadContent = () => {
    const text = `Question ${currentQuestion + 1}: ${question.question}. ${question.options?.map((opt, i) => `Option ${i + 1}: ${opt.text}`).join('. ')}`;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-0">
          <div className="gradient-primary p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-blue-100">Interactive Physics Lesson</p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="bg-white bg-opacity-20 text-white">
                  Question {currentQuestion + 1} of {questions.length}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClose}
                  className="text-white hover:bg-white hover:bg-opacity-20"
                >
                  <i className="fas fa-times"></i>
                </Button>
              </div>
            </div>
            <Progress value={progress} className="h-2 bg-white bg-opacity-20" />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Physics Concept: {question.concept}</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReadContent}
                className="text-blue-600"
              >
                <i className="fas fa-volume-up text-xs mr-1"></i>
                Read Question
              </Button>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-neutral-900 mb-4">
                  {question.question}
                </h4>
                
                {question.type === "multiple-choice" && question.options && (
                  <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                    {question.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer text-base">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </CardContent>
            </Card>

            {showFeedback && (
              <Card className={`mb-6 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                      <i className={`fas ${isCorrect ? 'fa-check' : 'fa-times'} text-white text-sm`}></i>
                    </div>
                    <div className="flex-1">
                      <h5 className={`font-semibold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        {isCorrect ? 'Correct! Great job!' : 'Not quite right.'}
                      </h5>
                      <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        {question.explanation}
                      </p>
                      {isCorrect && (
                        <div className="mt-2 flex items-center">
                          <i className="fas fa-star text-amber-500 text-sm mr-1"></i>
                          <span className="text-sm font-medium text-amber-700">+20 XP</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-neutral-600">
                  Score: <span className="font-semibold text-primary">{score + (showFeedback && isCorrect ? 20 : 0)}</span> XP
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <i className="fas fa-gift text-xs mr-1"></i>
                  100% FREE
                </Badge>
              </div>
              
              {!showFeedback ? (
                <Button 
                  onClick={handleAnswerSubmit}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  disabled={!selectedAnswer}
                >
                  Check Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  {currentQuestion < questions.length - 1 ? (
                    <>
                      Next Question
                      <i className="fas fa-arrow-right text-xs ml-2"></i>
                    </>
                  ) : (
                    <>
                      Complete Lesson
                      <i className="fas fa-check text-xs ml-2"></i>
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}