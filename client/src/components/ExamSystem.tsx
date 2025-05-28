import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ExamSession, ExamQuestion, getExamForCourse } from '@/lib/examSystem';

interface ExamSystemProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  onExamPass: (courseId: string, score: number) => void;
}

interface ExamResult {
  score: number;
  passed: boolean;
  incorrectQuestions: string[];
}

export default function ExamSystem({ isOpen, onClose, courseId, onExamPass }: ExamSystemProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const exam = getExamForCourse(courseId);

  useEffect(() => {
    if (examStarted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (examStarted && timeRemaining === 0) {
      completeExam();
    }
  }, [timeRemaining, examStarted]);

  const startExam = () => {
    if (!exam) return;
    setTimeRemaining(exam.timeLimit * 60);
    setExamStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setExamCompleted(false);
    setExamResult(null);
  };

  const submitAnswer = () => {
    if (!exam || selectedAnswer === '') return;
    
    const currentQuestion = exam.questions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer
    }));
    
    setSelectedAnswer('');
    
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeExam();
    }
  };

  const completeExam = () => {
    if (!exam) return;
    
    let totalPoints = 0;
    let earnedPoints = 0;
    const incorrectQuestions: string[] = [];

    exam.questions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      
      if (userAnswer !== undefined) {
        if (String(userAnswer) === String(question.correctAnswer)) {
          earnedPoints += question.points;
        } else {
          incorrectQuestions.push(question.id);
        }
      } else {
        incorrectQuestions.push(question.id);
      }
    });

    const score = Math.round((earnedPoints / totalPoints) * 100);
    const passed = score >= exam.passingScore;
    
    const result: ExamResult = {
      score,
      passed,
      incorrectQuestions
    };

    setExamResult(result);
    setExamCompleted(true);
    setExamStarted(false);
    
    if (passed) {
      onExamPass(courseId, score);
    }
  };

  const resetExam = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeRemaining(0);
    setExamStarted(false);
    setExamCompleted(false);
    setExamResult(null);
    setSelectedAnswer('');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !exam) return null;

  const currentQuestion = exam.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
      <Card className="w-[95vw] sm:w-[85vw] md:w-[75vw] lg:w-[65vw] max-w-4xl h-[90vh] overflow-y-auto">
        <CardHeader className="pb-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">{exam.title}</h2>
              <p className="text-xs sm:text-sm text-gray-600">{exam.description}</p>
            </div>
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="h-6 w-6 sm:h-8 sm:w-8 p-0"
            >
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
          {!examStarted && !examCompleted && (
            <div className="text-center space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">📋 Exam Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>⏱️ Time Limit: {exam.timeLimit} minutes</div>
                  <div>🎯 Passing Score: {exam.passingScore}%</div>
                  <div>❓ Questions: {exam.questions.length}</div>
                  <div>📚 Prerequisites: {exam.prerequisites.length > 0 ? exam.prerequisites.join(', ') : 'None'}</div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm">⚠️ Once started, you cannot pause the exam. Make sure you have a stable internet connection.</p>
              </div>
              
              <Button 
                onClick={startExam}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              >
                🚀 Start Exam
              </Button>
            </div>
          )}

          {examStarted && currentQuestion && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">
                  Question {currentQuestionIndex + 1} of {exam.questions.length}
                </div>
                <div className={`text-sm font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-blue-600'}`}>
                  ⏰ {formatTime(timeRemaining)}
                </div>
              </div>
              
              <Progress value={progress} className="w-full" />
              
              <div className="bg-white border rounded-lg p-4">
                <h3 className="text-base sm:text-lg font-semibold mb-3">
                  {currentQuestion.question}
                </h3>
                
                <div className="space-y-2">
                  {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                    currentQuestion.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === option ? "default" : "outline"}
                        className="w-full text-left justify-start p-3"
                        onClick={() => setSelectedAnswer(option)}
                      >
                        {String.fromCharCode(65 + index)}. {option}
                      </Button>
                    ))
                  )}
                  
                  {currentQuestion.type === 'true-false' && (
                    <>
                      <Button
                        variant={selectedAnswer === 'true' ? "default" : "outline"}
                        className="w-full text-left justify-start p-3"
                        onClick={() => setSelectedAnswer('true')}
                      >
                        ✅ True
                      </Button>
                      <Button
                        variant={selectedAnswer === 'false' ? "default" : "outline"}
                        className="w-full text-left justify-start p-3"
                        onClick={() => setSelectedAnswer('false')}
                      >
                        ❌ False
                      </Button>
                    </>
                  )}
                  
                  {currentQuestion.type === 'numerical' && (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Enter your answer"
                        value={selectedAnswer}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        className="flex-1 p-3 border rounded-lg"
                      />
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                    disabled={currentQuestionIndex === 0}
                  >
                    ← Previous
                  </Button>
                  
                  <Button
                    onClick={submitAnswer}
                    disabled={selectedAnswer === ''}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {currentQuestionIndex === exam.questions.length - 1 ? '🏁 Finish Exam' : 'Next →'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {examCompleted && examResult && (
            <div className="text-center space-y-4">
              <div className={`p-6 rounded-lg ${examResult.passed ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="text-4xl mb-2">
                  {examResult.passed ? '🎉' : '😞'}
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {examResult.passed ? 'Congratulations! You Passed!' : 'Exam Not Passed'}
                </h3>
                <div className="text-2xl font-bold mb-2">
                  Score: {examResult.score}%
                </div>
                <div className="text-sm">
                  Required: {exam.passingScore}%
                </div>
              </div>
              
              {examResult.passed ? (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm">✅ You have successfully unlocked the {exam.title.replace(' Exam', '')} course!</p>
                </div>
              ) : (
                <div className="bg-yellow-50 p-4 rounded-lg space-y-2">
                  <p className="text-sm">📚 Review the following topics and try again:</p>
                  <div className="text-xs">
                    {examResult.incorrectQuestions.map(qId => {
                      const question = exam.questions.find(q => q.id === qId);
                      return question ? question.topic : '';
                    }).filter(Boolean).join(', ')}
                  </div>
                </div>
              )}
              
              <div className="flex gap-3 justify-center">
                <Button onClick={onClose} variant="outline">
                  Close
                </Button>
                {!examResult.passed && (
                  <Button onClick={resetExam} className="bg-blue-600 hover:bg-blue-700 text-white">
                    🔄 Retake Exam
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}