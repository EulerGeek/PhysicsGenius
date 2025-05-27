
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Option {
  value: string;
  text: string;
}

interface Question {
  id: string;
  type: "multiple-choice";
  question: string;
  options: Option[];
  correctAnswer: string;
  explanation: string;
  concept: string;
}

interface InteractiveLessonProps {
  lessonId: string;
  onComplete: (score: number) => void;
}

const lessonQuestions: Record<string, Question[]> = {
  // Classical Mechanics Questions
  "cm-1": [
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
    }
  ],
  "cm-2": [
    {
      id: "forces-1",
      type: "multiple-choice",
      question: "What is Newton's First Law of Motion?",
      options: [
        { value: "a", text: "F = ma" },
        { value: "b", text: "An object at rest stays at rest unless acted upon by a force" },
        { value: "c", text: "For every action, there's an equal and opposite reaction" },
        { value: "d", text: "Force equals mass times velocity" }
      ],
      correctAnswer: "b",
      explanation: "Newton's First Law states that an object at rest will stay at rest, and an object in motion will stay in motion at constant velocity, unless acted upon by an unbalanced force.",
      concept: "Law of Inertia"
    },
    {
      id: "forces-2",
      type: "multiple-choice",
      question: "If a 10 kg object has an acceleration of 5 m/s², what is the net force?",
      options: [
        { value: "a", text: "2 N" },
        { value: "b", text: "15 N" },
        { value: "c", text: "50 N" },
        { value: "d", text: "500 N" }
      ],
      correctAnswer: "c",
      explanation: "Using Newton's Second Law: F = ma = 10 kg × 5 m/s² = 50 N",
      concept: "F = ma"
    },
    {
      id: "forces-3",
      type: "multiple-choice",
      question: "What is Newton's Third Law?",
      options: [
        { value: "a", text: "Objects in motion stay in motion" },
        { value: "b", text: "F = ma" },
        { value: "c", text: "For every action, there's an equal and opposite reaction" },
        { value: "d", text: "Energy cannot be created or destroyed" }
      ],
      correctAnswer: "c",
      explanation: "Newton's Third Law states that for every action force, there is an equal and opposite reaction force.",
      concept: "Action-Reaction Pairs"
    }
  ],
  "cm-3": [
    {
      id: "energy-1",
      type: "multiple-choice",
      question: "What is kinetic energy?",
      options: [
        { value: "a", text: "Energy due to position" },
        { value: "b", text: "Energy due to motion" },
        { value: "c", text: "Energy due to temperature" },
        { value: "d", text: "Energy due to chemical bonds" }
      ],
      correctAnswer: "b",
      explanation: "Kinetic energy is the energy an object possesses due to its motion. It's calculated as KE = ½mv².",
      concept: "KE = ½mv²"
    },
    {
      id: "energy-2",
      type: "multiple-choice",
      question: "A 2 kg object moving at 4 m/s has what kinetic energy?",
      options: [
        { value: "a", text: "8 J" },
        { value: "b", text: "16 J" },
        { value: "c", text: "32 J" },
        { value: "d", text: "64 J" }
      ],
      correctAnswer: "b",
      explanation: "KE = ½mv² = ½ × 2 kg × (4 m/s)² = ½ × 2 × 16 = 16 J",
      concept: "Kinetic Energy Calculation"
    },
    {
      id: "energy-3",
      type: "multiple-choice",
      question: "What is the work-energy theorem?",
      options: [
        { value: "a", text: "Work equals force times distance" },
        { value: "b", text: "Work done equals change in kinetic energy" },
        { value: "c", text: "Energy cannot be created or destroyed" },
        { value: "d", text: "Potential energy equals mgh" }
      ],
      correctAnswer: "b",
      explanation: "The work-energy theorem states that the work done on an object equals the change in its kinetic energy: W = ΔKE.",
      concept: "W = ΔKE"
    }
  ],
  "cm-7": [
    {
      id: "waves-1",
      type: "multiple-choice",
      question: "What is the relationship between wave speed, frequency, and wavelength?",
      options: [
        { value: "a", text: "v = f × λ" },
        { value: "b", text: "v = f / λ" },
        { value: "c", text: "v = λ / f" },
        { value: "d", text: "v = f + λ" }
      ],
      correctAnswer: "a",
      explanation: "Wave speed equals frequency times wavelength: v = f × λ. This fundamental wave equation relates these three important wave properties.",
      concept: "v = fλ (Wave Equation)"
    },
    {
      id: "waves-2",
      type: "multiple-choice",
      question: "What is the amplitude of a wave?",
      options: [
        { value: "a", text: "The distance between two consecutive peaks" },
        { value: "b", text: "The maximum displacement from equilibrium" },
        { value: "c", text: "The number of waves per second" },
        { value: "d", text: "The speed of the wave" }
      ],
      correctAnswer: "b",
      explanation: "Amplitude is the maximum displacement of a wave from its equilibrium position. It determines the wave's intensity or energy.",
      concept: "Amplitude = Maximum Displacement"
    },
    {
      id: "waves-3",
      type: "multiple-choice",
      question: "What is the difference between transverse and longitudinal waves?",
      options: [
        { value: "a", text: "Transverse waves are faster" },
        { value: "b", text: "Longitudinal waves have higher frequency" },
        { value: "c", text: "Transverse waves vibrate perpendicular to direction of travel" },
        { value: "d", text: "Longitudinal waves don't transfer energy" }
      ],
      correctAnswer: "c",
      explanation: "In transverse waves, particles vibrate perpendicular to the direction of wave travel. In longitudinal waves, particles vibrate parallel to the direction of travel.",
      concept: "Wave Types and Particle Motion"
    }
  ]
};

// Add more lesson questions for other topics
const getDefaultQuestions = (lessonId: string): Question[] => {
  return [
    {
      id: `${lessonId}-1`,
      type: "multiple-choice",
      question: "This lesson covers fundamental physics concepts. What's the most important thing to remember?",
      options: [
        { value: "a", text: "Practice makes perfect" },
        { value: "b", text: "Understanding concepts is key" },
        { value: "c", text: "Memorizing formulas is enough" },
        { value: "d", text: "Physics is too difficult" }
      ],
      correctAnswer: "b",
      explanation: "Understanding the underlying concepts and principles is crucial for mastering physics. This allows you to apply knowledge to new situations.",
      concept: "Conceptual Understanding"
    },
    {
      id: `${lessonId}-2`,
      type: "multiple-choice",
      question: "How should you approach physics problem solving?",
      options: [
        { value: "a", text: "Guess the answer" },
        { value: "b", text: "Identify principles, set up equations, solve systematically" },
        { value: "c", text: "Use random formulas" },
        { value: "d", text: "Skip the math" }
      ],
      correctAnswer: "b",
      explanation: "Systematic problem solving involves identifying relevant physics principles, setting up the appropriate equations, and solving step by step.",
      concept: "Problem Solving Strategy"
    }
  ];
};

export default function InteractiveLesson({ lessonId, onComplete }: InteractiveLessonProps) {
  const questions = lessonQuestions[lessonId] || getDefaultQuestions(lessonId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const newAnswers = { ...answers, [question.id]: selectedAnswer };
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScore = Math.round((score / questions.length) * 1000);
      onComplete(finalScore);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
    }
  };

  const handleReadContent = () => {
    const text = `Physics concept: ${question.concept}. Question: ${question.question}. Options: ${question.options.map(opt => opt.text).join(', ')}`;
    
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="text-primary">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          <div className="text-sm text-neutral-600 dark:text-gray-400">
            Score: {score}/{questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Physics Concept: {question.concept}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReadContent}
              className="text-blue-600 dark:text-blue-400"
            >
              <i className="fas fa-volume-up text-xs mr-1"></i>
              Read Question
            </Button>
          </div>

          <h4 className="text-xl mb-6 text-neutral-900 dark:text-white">
            {question.question}
          </h4>

          <div className="space-y-3 mb-6">
            {question.options.map((option) => (
              <div 
                key={option.value}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedAnswer === option.value
                    ? showExplanation
                      ? option.value === question.correctAnswer
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-primary bg-primary/10"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                } ${showExplanation ? 'pointer-events-none' : ''}`}
                onClick={() => !showExplanation && handleAnswerSelect(option.value)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === option.value
                      ? showExplanation
                        ? option.value === question.correctAnswer
                          ? "border-green-500 bg-green-500"
                          : "border-red-500 bg-red-500"
                        : "border-primary bg-primary"
                      : "border-gray-300 dark:border-gray-600"
                  }`}>
                    {selectedAnswer === option.value && (
                      <i className={`fas fa-${
                        showExplanation
                          ? option.value === question.correctAnswer ? 'check' : 'times'
                          : 'circle'
                      } text-white text-xs`}></i>
                    )}
                  </div>
                  <span className="text-neutral-700 dark:text-gray-300">{option.text}</span>
                </div>
              </div>
            ))}
          </div>

          {showExplanation && (
            <div className={`p-4 rounded-lg mb-6 ${
              isCorrect 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}>
              <div className="flex items-start space-x-3">
                <i className={`fas fa-${isCorrect ? 'check-circle' : 'times-circle'} text-${isCorrect ? 'green' : 'red'}-500 text-lg mt-1`}></i>
                <div>
                  <h5 className={`font-medium text-${isCorrect ? 'green' : 'red'}-800 dark:text-${isCorrect ? 'green' : 'red'}-200 mb-2`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </h5>
                  <p className={`text-${isCorrect ? 'green' : 'red'}-700 dark:text-${isCorrect ? 'green' : 'red'}-300`}>
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              <i className="fas fa-arrow-left text-xs mr-2"></i>
              Previous
            </Button>

            {!showExplanation ? (
              <Button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="bg-primary text-white hover:bg-primary/90"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-primary text-white hover:bg-primary/90"
              >
                {isLastQuestion ? 'Complete Lesson' : 'Next Question'}
                <i className="fas fa-arrow-right text-xs ml-2"></i>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
