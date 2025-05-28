import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { getAllLessonData } from "@/lib/allLessonsData";
import { useAudio } from "@/hooks/useAudio";

interface QuickTestProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickTest({ isOpen, onClose }: QuickTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions] = useState(5);
  const [questions, setQuestions] = useState<any[]>([]);
  const [testComplete, setTestComplete] = useState(false);
  const { playSound } = useAudio();

  useEffect(() => {
    if (isOpen) {
      generateRandomQuestions();
    }
  }, [isOpen]);

  const generateRandomQuestions = () => {
    // Get all available lessons
    const allLessons = ['cm-1', 'cm-2', 'cm-3', 'cm-4', 'cm-5', 'cm-6', 'cm-7', 'cm-8', 'cm-9', 'cm-10', 'cm-11', 'cm-12', 'cm-13', 'cm-14', 'cm-15', 'rel-1', 'rel-2', 'rel-3', 'rel-4', 'rel-5', 'rel-6', 'rel-7', 'rel-8', 'rel-9', 'rel-10', 'qm-1', 'qm-2', 'qm-3', 'qm-4', 'qm-5', 'qm-6', 'qm-7', 'qm-8', 'qm-9', 'qm-10', 'qm-11', 'qm-12'];
    
    const randomQuestions: any[] = [];
    
    while (randomQuestions.length < totalQuestions) {
      const randomLesson = allLessons[Math.floor(Math.random() * allLessons.length)];
      const lessonData = getAllLessonData(randomLesson);
      
      if (lessonData && lessonData.questions.length > 0) {
        const randomQuestion = lessonData.questions[Math.floor(Math.random() * lessonData.questions.length)];
        
        // Add lesson info to question
        const questionWithLesson = {
          ...randomQuestion,
          lessonTitle: lessonData.title,
          lessonId: randomLesson
        };
        
        randomQuestions.push(questionWithLesson);
      }
    }
    
    setQuestions(randomQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setTestComplete(false);
    setShowFeedback(false);
    setSelectedAnswer("");
  };

  if (!isOpen) return null;

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) {
      alert("Please select an answer first!");
      return;
    }

    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(prev => prev + 20);
      playSound('correct');
    } else {
      playSound('incorrect');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer("");
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      setTestComplete(true);
      playSound('complete');
    }
  };

  const handleRestart = () => {
    generateRandomQuestions();
  };

  if (testComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              🎉 Test Complete!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-6xl font-bold text-primary">{score}%</div>
            <p className="text-lg">
              {score >= 80 ? "Excellent work! You're mastering physics!" :
               score >= 60 ? "Good job! Keep practicing!" :
               "Keep studying! You'll get there!"}
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={handleRestart} className="bg-blue-600 hover:bg-blue-700">
                🔄 Try Again
              </Button>
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Generating random questions...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2">
              🧪 Quick Physics Test
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onClose}>
              ✕ Close
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestion + 1} of {totalQuestions}</span>
              <span>Score: {score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <Badge variant="outline" className="mb-4">
              {question.lessonTitle}
            </Badge>
            
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-4">
                  {question.question}
                </h4>
                
                {question.type === "multiple-choice" && question.options && (
                  <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                    {question.options.map((option: any) => (
                      <div key={option.value} className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors">
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
              <Card className={`${isCorrect ? 'border-green-200 bg-green-50 dark:border-green-600 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-600 dark:bg-red-900/20'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                      <span className="text-white text-sm">
                        {isCorrect ? '✓' : '✗'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h5 className={`font-semibold mb-2 ${isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                        {isCorrect ? 'Correct! Great job!' : 'Not quite right.'}
                      </h5>
                      <p className={`text-sm ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                        {question.explanation}
                      </p>
                      {isCorrect && (
                        <div className="mt-2">
                          <Badge className="bg-amber-100 text-amber-800">
                            +20 points
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-3 justify-end">
              {!showFeedback ? (
                <Button 
                  onClick={handleAnswerSubmit}
                  disabled={!selectedAnswer}
                  className="bg-primary hover:bg-primary/90"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                  className="bg-primary hover:bg-primary/90"
                >
                  {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'Finish Test'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}