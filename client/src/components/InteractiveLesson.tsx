import { useState, useEffect } from "react";
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

  // Prevent body scrolling when lesson is open
  useEffect(() => {
    if (lessonData && questions.length > 0) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [lessonData, questions.length]);

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50 overflow-hidden">
      <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-gray-900 shadow-2xl rounded-3xl border-4 border-blue-200 dark:border-blue-800 bounce-in overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-5xl float-animation">🎯</span>
                <div>
                  <h2 className="text-3xl font-bold mb-2 text-white">{title}</h2>
                  <p className="text-blue-100 text-lg">🚀 Interactive Physics Lesson</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-sm shadow-lg">
                  📖 Question {currentQuestion + 1} of {questions.length}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClose}
                  className="text-white hover:bg-red-500/20 rounded-full p-3 transition-all duration-300 hover:scale-110 group"
                >
                  <span className="text-2xl group-hover:wiggle">✕</span>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Progress value={progress} className="h-4 bg-white/20 rounded-full overflow-hidden" />
              <div className="flex justify-between text-sm font-semibold">
                <span>Physics Mastery Progress</span>
                <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  {Math.round(progress)}% Complete
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 max-h-[60vh]">
            <div className="flex items-center justify-between mb-8 slide-up">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🧠</span>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Physics Concept: {question.concept}
                </h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReadContent}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
              >
                <span className="text-lg mr-2 group-hover:wiggle">🔊</span>
                Read Question
              </Button>
            </div>

            <Card className="mb-8 glass dark:glass-dark backdrop-blur-lg shadow-2xl border-2 border-white/20 bounce-in">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <span className="text-6xl float-animation mb-4 block">🤔</span>
                  <h4 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                    {question.question}
                  </h4>
                </div>
                
                {question.type === "multiple-choice" && question.options && (
                  <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-4">
                    {question.options.map((option, index) => (
                      <div key={option.value} className={`group cursor-pointer transition-all duration-500 hover-lift ${selectedAnswer === option.value ? 'transform scale-105' : ''}`} style={{animationDelay: `${index * 0.1}s`}}>
                        <div className={`flex items-center space-x-4 p-6 border-3 rounded-3xl transition-all duration-300 ${
                          selectedAnswer === option.value 
                            ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white border-green-500 shadow-2xl pulse-glow' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:scale-102'
                        }`}>
                          <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                            selectedAnswer === option.value 
                              ? 'bg-white/20 text-white' 
                              : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 group-hover:scale-110'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <Label htmlFor={option.value} className="flex-1 cursor-pointer text-lg text-gray-900 dark:text-white leading-relaxed">
                            {option.text}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </CardContent>
            </Card>

            {showFeedback && (
              <Card className={`mb-8 bounce-in border-3 shadow-2xl ${isCorrect ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 border-green-400' : 'bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900 dark:to-pink-900 border-red-400'}`}>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-xl ${isCorrect ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-pink-500'} float-animation`}>
                      <span className="text-white">
                        {isCorrect ? '🎉' : '🤔'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h5 className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                        {isCorrect ? '🌟 Excellent! You got it right!' : '💡 Good attempt! Let\'s learn together.'}
                      </h5>
                      <p className={`text-lg leading-relaxed ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                        {question.explanation}
                      </p>
                      {isCorrect && (
                        <div className="mt-4 flex items-center bg-amber-100 dark:bg-amber-900 px-4 py-3 rounded-2xl shadow-lg pulse-glow">
                          <span className="text-3xl mr-3 float-animation">🏆</span>
                          <span className="text-xl font-bold text-amber-700 dark:text-amber-300">+20 XP Earned!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-3xl border-2 border-gray-200 dark:border-gray-600 shadow-xl">
              <div className="flex items-center space-x-6">
                <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-600">
                  <div className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
                    🏆 Score: <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-xl">
                      {score + (showFeedback && isCorrect ? 20 : 0)}
                    </span> XP
                  </div>
                </div>
                <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold pulse-glow">
                  🎁 100% FREE
                </Badge>
              </div>
              
              {!showFeedback ? (
                <Button 
                  onClick={handleAnswerSubmit}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 text-lg font-semibold group"
                  disabled={!selectedAnswer}
                >
                  <span className="mr-2 group-hover:wiggle">🎯</span>
                  Check Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 text-lg font-semibold group"
                >
                  {currentQuestion < questions.length - 1 ? (
                    <>
                      <span className="mr-2 group-hover:wiggle">🚀</span>
                      Next Question
                    </>
                  ) : (
                    <>
                      <span className="mr-2 group-hover:wiggle">🎉</span>
                      Complete Lesson
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