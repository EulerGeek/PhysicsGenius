import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { getAllLessonData, type Question } from "@/lib/allLessonsData";

interface InteractiveLessonProps {
  lessonId: string;
  title: string;
  onComplete: (score: number) => void;
  onClose: () => void;
}

export default function InteractiveLesson({ lessonId, title, onComplete, onClose }: InteractiveLessonProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const lessonData = getAllLessonData(lessonId);
  const questions = lessonData?.questions || [];
  const question = questions[currentQuestion];
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  if (!lessonData || questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">Lesson Content Coming Soon</h3>
            <p className="text-neutral-600 mb-4">Interactive content for this lesson is being prepared.</p>
            <Button onClick={onClose} className="bg-primary text-white">
              Back to Lessons
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) {
      alert("Please select an answer first!");
      return;
    }



    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    setAnswers(prev => ({ ...prev, [question.id]: selectedAnswer }));
    
    if (correct) {
      setScore(prev => prev + 20);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer("");
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      const finalScore = score + (isCorrect ? 20 : 0);
      onComplete(finalScore);
    }
  };

  const handleReadContent = () => {
    const text = `Question ${currentQuestion + 1}: ${question.question}. ${question.options?.map((opt, i) => `Option ${i + 1}: ${opt.text}`).join('. ')}`;
    
    if ('speechSynthesis' in window && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      const speak = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          utterance.voice = voices.find(voice => voice.lang.startsWith('en')) || voices[0];
        }
        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = speak;
      } else {
        speak();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900">
        <CardContent className="p-0">
          <div className="gradient-primary p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2>
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

          <div className="p-6 bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Physics Concept: {question.concept}</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReadContent}
                className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400"
              >
                <i className="fas fa-volume-up text-xs mr-1"></i>
                Read Question
              </Button>
            </div>

            <Card className="mb-6 bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                  {question.question}
                </h4>
                
                {question.type === "multiple-choice" && question.options && (
                  <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                    {question.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer text-base text-gray-900 dark:text-white">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </CardContent>
            </Card>

            {showFeedback && (
              <Card className={`mb-6 ${isCorrect ? 'border-green-200 bg-green-50 dark:border-green-600 dark:bg-green-900' : 'border-red-200 bg-red-50 dark:border-red-600 dark:bg-red-900'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                      <span className="text-white text-sm">
                        {isCorrect ? '✅' : '❌'}
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
                        <div className="mt-2 flex items-center">
                          <span className="text-amber-500 text-sm mr-1">⭐</span>
                          <span className="text-sm font-medium text-amber-700 dark:text-amber-300">+20 XP</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-neutral-600 dark:text-neutral-300">
                  Score: <span className="font-semibold text-primary">{score + (showFeedback && isCorrect ? 20 : 0)}</span> XP
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
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
                      <span className="text-xs ml-2">➡️</span>
                    </>
                  ) : (
                    <>
                      Complete Lesson
                      <span className="text-xs ml-2">✅</span>
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