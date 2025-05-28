import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LevelMap from "./LevelMap";
import LessonCard from "./LessonCard";
import { Question } from "@/lib/allLessonsData";

interface ConceptNote {
  title: string;
  formula: string;
  explanation: string;
  example?: string;
}

interface UnifiedLearningInterfaceProps {
  courseId: string;
  lessons: any[];
  onStartLesson: (lessonId: string) => void;
  progress: any;
  viewMode: 'list' | 'map';
  onViewModeChange: (mode: 'list' | 'map') => void;
}

export default function UnifiedLearningInterface({ 
  courseId, 
  lessons, 
  onStartLesson, 
  progress, 
  viewMode, 
  onViewModeChange 
}: UnifiedLearningInterfaceProps) {
  const [showConcepts, setShowConcepts] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [wrongAnswers, setWrongAnswers] = useState<Question[]>([]);
  const [conceptNotes, setConceptNotes] = useState<ConceptNote[]>([]);

  // Physics concept notes for different courses
  const getConceptNotes = (courseId: string, lessonId?: string): ConceptNote[] => {
    const concepts: Record<string, ConceptNote[]> = {
      'classical': [
        {
          title: "Velocity",
          formula: "v = Δx/Δt",
          explanation: "Velocity is the rate of change of position with respect to time. It's a vector quantity with both magnitude and direction.",
          example: "A car travels 100m in 10s: v = 100m/10s = 10 m/s"
        },
        {
          title: "Acceleration", 
          formula: "a = Δv/Δt",
          explanation: "Acceleration is the rate of change of velocity with respect to time. It can be positive (speeding up) or negative (slowing down).",
          example: "A car goes from 0 to 30 m/s in 10s: a = 30m/s / 10s = 3 m/s²"
        },
        {
          title: "Kinematic Equation",
          formula: "x = v₀t + ½at²",
          explanation: "This equation describes position as a function of initial velocity, time, and acceleration for constant acceleration.",
          example: "Ball dropped from rest: x = 0 + ½(9.8)t² = 4.9t²"
        },
        {
          title: "Free Fall",
          formula: "a = g = 9.8 m/s²",
          explanation: "All objects fall with the same acceleration due to gravity, regardless of mass (ignoring air resistance).",
          example: "A feather and hammer fall at same rate in vacuum"
        }
      ],
      'quantum': [
        {
          title: "Planck's Constant",
          formula: "E = hf",
          explanation: "Energy is quantized in discrete packets called quanta. The energy of a photon is proportional to its frequency.",
          example: "Blue light (f = 6×10¹⁴ Hz): E = (6.63×10⁻³⁴)(6×10¹⁴) = 4×10⁻¹⁹ J"
        },
        {
          title: "Wave-Particle Duality",
          formula: "λ = h/p",
          explanation: "Matter exhibits both wave and particle properties. The de Broglie wavelength relates momentum to wavelength.",
          example: "Electron with p = 10⁻²⁴ kg⋅m/s: λ = 6.63×10⁻³⁴ / 10⁻²⁴ = 6.63×10⁻¹⁰ m"
        }
      ],
      'relativity': [
        {
          title: "Time Dilation",
          formula: "Δt' = γΔt where γ = 1/√(1-v²/c²)",
          explanation: "Time passes slower for objects moving at high speeds relative to an observer.",
          example: "At v = 0.9c: γ = 2.29, so 1 second becomes 2.29 seconds"
        },
        {
          title: "Mass-Energy Equivalence",
          formula: "E = mc²",
          explanation: "Mass and energy are interchangeable. A small amount of mass converts to enormous energy.",
          example: "1 kg of mass = (1)(3×10⁸)² = 9×10¹⁶ J of energy"
        }
      ]
    };
    
    return concepts[courseId] || [];
  };

  const handleLessonSelect = (lesson: any) => {
    setSelectedLesson(lesson);
    setConceptNotes(getConceptNotes(courseId, lesson.id));
    setShowConcepts(true);
  };

  const handleStartLessonWithConcepts = () => {
    if (selectedLesson) {
      setShowConcepts(false);
      onStartLesson(selectedLesson.id);
    }
  };

  // Track wrong answers for review
  const addWrongAnswer = (question: Question) => {
    setWrongAnswers(prev => {
      const exists = prev.find(q => q.id === question.id);
      if (!exists) {
        return [...prev, question];
      }
      return prev;
    });
  };

  return (
    <div className="space-y-4 md:space-y-6 px-2 md:px-4">
      {/* Course Header - Mobile Responsive */}
      <div className="flex justify-center items-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white text-center">
          {courseId === 'classical' ? '🔬 Classical Mechanics' : 
           courseId === 'quantum' ? '⚛️ Quantum Mechanics' : 
           '🌌 General Relativity'}
        </h2>
      </div>

      {/* Concept Notes Modal - Mobile Responsive */}
      {showConcepts && selectedLesson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 md:p-4">
          <Card className="w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
            <CardHeader className="pb-3 md:pb-6">
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-lg md:text-xl font-bold leading-tight">
                  📚 Concept Review: {selectedLesson.title}
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowConcepts(false)}
                  className="shrink-0"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 px-3 md:px-6">
              {/* Key Concepts */}
              <div className="grid gap-4">
                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  🔬 Key Concepts & Formulas
                </h4>
                {conceptNotes.map((concept, index) => (
                  <Card key={index} className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-blue-600 text-white">{concept.title}</Badge>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg font-mono text-lg font-bold text-center border-2 border-blue-300 dark:border-blue-600">
                          {concept.formula}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{concept.explanation}</p>
                        {concept.example && (
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border-l-4 border-green-400">
                            <strong className="text-green-700 dark:text-green-400">Example:</strong>
                            <span className="ml-2 text-gray-700 dark:text-gray-300">{concept.example}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Feynman Notes */}
              {selectedLesson.feynmanNotes && (
                <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700">
                  <CardContent className="p-4">
                    <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
                      💡 Feynman's Simple Explanation
                    </h5>
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      "{selectedLesson.feynmanNotes}"
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Review Wrong Answers */}
              {wrongAnswers.length > 0 && (
                <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700">
                  <CardContent className="p-4">
                    <h5 className="font-semibold text-red-700 dark:text-red-400 mb-3">
                      🔄 Review These Concepts (Previous Mistakes)
                    </h5>
                    <div className="space-y-2">
                      {wrongAnswers.map((question, index) => (
                        <div key={index} className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>Concept:</strong> {question.concept}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowConcepts(false)}>
                  📖 Study More
                </Button>
                <Button onClick={handleStartLessonWithConcepts} className="bg-green-600 hover:bg-green-700">
                  🚀 Start Lesson
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      {/* Map View Only - Mobile Responsive */}
      <div className="space-y-4">
        <LevelMap 
          lessons={lessons}
          onLessonSelect={handleLessonSelect}
          progress={progress}
        />
      </div>
    </div>
  );
}