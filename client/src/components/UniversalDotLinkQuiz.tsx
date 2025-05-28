import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface DotItem {
  id: string;
  x: number;
  y: number;
  content: string;
  type: 'question' | 'answer';
  color: string;
  isConnected: boolean;
  connectedTo?: string;
}

interface Connection {
  from: string;
  to: string;
  isCorrect: boolean;
}

interface DotLinkQuestion {
  id: string;
  leftItems: { id: string; content: string; color: string }[];
  rightItems: { id: string; content: string; color: string }[];
  correctConnections: Record<string, string>;
  topic: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  instructions: string;
}

interface UniversalDotLinkQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
  subject: 'physics' | 'mathematics' | 'general';
}

export default function UniversalDotLinkQuiz({ isOpen, onClose, onComplete, subject }: UniversalDotLinkQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [draggedDot, setDraggedDot] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [temporaryLine, setTemporaryLine] = useState<{ from: DotItem, to: { x: number, y: number } } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const questionSets = {
    physics: [
      {
        id: "forces",
        leftItems: [
          { id: "f1", content: "Gravitational Force", color: "#3B82F6" },
          { id: "f2", content: "Electromagnetic Force", color: "#8B5CF6" },
          { id: "f3", content: "Nuclear Strong Force", color: "#10B981" },
          { id: "f4", content: "Nuclear Weak Force", color: "#F59E0B" }
        ],
        rightItems: [
          { id: "a1", content: "Holds protons together", color: "#10B981" },
          { id: "a2", content: "Causes radioactive decay", color: "#F59E0B" },
          { id: "a3", content: "Attracts masses", color: "#3B82F6" },
          { id: "a4", content: "Between charged particles", color: "#8B5CF6" }
        ],
        correctConnections: {
          "f1": "a3",
          "f2": "a4", 
          "f3": "a1",
          "f4": "a2"
        },
        topic: "Fundamental Forces",
        subject: "Physics",
        difficulty: "medium" as const,
        instructions: "Match each fundamental force with its primary effect"
      },
      {
        id: "waves",
        leftItems: [
          { id: "f1", content: "Frequency", color: "#EF4444" },
          { id: "f2", content: "Wavelength", color: "#06B6D4" },
          { id: "f3", content: "Amplitude", color: "#84CC16" },
          { id: "f4", content: "Period", color: "#F97316" }
        ],
        rightItems: [
          { id: "a1", content: "Height of wave", color: "#84CC16" },
          { id: "a2", content: "Time for one cycle", color: "#F97316" },
          { id: "a3", content: "Distance between peaks", color: "#06B6D4" },
          { id: "a4", content: "Cycles per second", color: "#EF4444" }
        ],
        correctConnections: {
          "f1": "a4",
          "f2": "a3",
          "f3": "a1",
          "f4": "a2"
        },
        topic: "Wave Properties",
        subject: "Physics",
        difficulty: "easy" as const,
        instructions: "Connect wave properties with their definitions"
      },
      {
        id: "energy",
        leftItems: [
          { id: "f1", content: "Kinetic Energy", color: "#8B5CF6" },
          { id: "f2", content: "Potential Energy", color: "#3B82F6" },
          { id: "f3", content: "Thermal Energy", color: "#EF4444" },
          { id: "f4", content: "Chemical Energy", color: "#10B981" }
        ],
        rightItems: [
          { id: "a1", content: "Stored in bonds", color: "#10B981" },
          { id: "a2", content: "Random molecular motion", color: "#EF4444" },
          { id: "a3", content: "Energy of position", color: "#3B82F6" },
          { id: "a4", content: "Energy of motion", color: "#8B5CF6" }
        ],
        correctConnections: {
          "f1": "a4",
          "f2": "a3",
          "f3": "a2",
          "f4": "a1"
        },
        topic: "Forms of Energy",
        subject: "Physics",
        difficulty: "easy" as const,
        instructions: "Match energy types with their descriptions"
      },
      {
        id: "quantum",
        leftItems: [
          { id: "f1", content: "Photon", color: "#F59E0B" },
          { id: "f2", content: "Electron", color: "#8B5CF6" },
          { id: "f3", content: "Proton", color: "#EF4444" },
          { id: "f4", content: "Neutron", color: "#06B6D4" }
        ],
        rightItems: [
          { id: "a1", content: "No electric charge", color: "#06B6D4" },
          { id: "a2", content: "Positive charge", color: "#EF4444" },
          { id: "a3", content: "Light particle", color: "#F59E0B" },
          { id: "a4", content: "Negative charge", color: "#8B5CF6" }
        ],
        correctConnections: {
          "f1": "a3",
          "f2": "a4",
          "f3": "a2",
          "f4": "a1"
        },
        topic: "Subatomic Particles",
        subject: "Physics",
        difficulty: "medium" as const,
        instructions: "Connect particles with their properties"
      }
    ],
    mathematics: [
      {
        id: "derivatives",
        leftItems: [
          { id: "f1", content: "d/dx[x³]", color: "#3B82F6" },
          { id: "f2", content: "d/dx[cos(x)]", color: "#8B5CF6" },
          { id: "f3", content: "d/dx[ln(x)]", color: "#10B981" },
          { id: "f4", content: "d/dx[eˣ]", color: "#F59E0B" }
        ],
        rightItems: [
          { id: "a1", content: "eˣ", color: "#F59E0B" },
          { id: "a2", content: "1/x", color: "#10B981" },
          { id: "a3", content: "3x²", color: "#3B82F6" },
          { id: "a4", content: "-sin(x)", color: "#8B5CF6" }
        ],
        correctConnections: {
          "f1": "a3",
          "f2": "a4",
          "f3": "a2",
          "f4": "a1"
        },
        topic: "Derivatives",
        subject: "Mathematics",
        difficulty: "medium" as const,
        instructions: "Match functions with their derivatives"
      },
      {
        id: "geometry",
        leftItems: [
          { id: "f1", content: "Circle Area", color: "#EF4444" },
          { id: "f2", content: "Triangle Area", color: "#06B6D4" },
          { id: "f3", content: "Rectangle Area", color: "#84CC16" },
          { id: "f4", content: "Sphere Volume", color: "#F97316" }
        ],
        rightItems: [
          { id: "a1", content: "4/3 πr³", color: "#F97316" },
          { id: "a2", content: "length × width", color: "#84CC16" },
          { id: "a3", content: "½ × base × height", color: "#06B6D4" },
          { id: "a4", content: "πr²", color: "#EF4444" }
        ],
        correctConnections: {
          "f1": "a4",
          "f2": "a3",
          "f3": "a2",
          "f4": "a1"
        },
        topic: "Geometry Formulas",
        subject: "Mathematics",
        difficulty: "easy" as const,
        instructions: "Match shapes with their area/volume formulas"
      },
      {
        id: "trigonometry",
        leftItems: [
          { id: "f1", content: "sin(60°)", color: "#8B5CF6" },
          { id: "f2", content: "cos(60°)", color: "#3B82F6" },
          { id: "f3", content: "tan(45°)", color: "#10B981" },
          { id: "f4", content: "sin(45°)", color: "#F59E0B" }
        ],
        rightItems: [
          { id: "a1", content: "√2/2", color: "#F59E0B" },
          { id: "a2", content: "1", color: "#10B981" },
          { id: "a3", content: "1/2", color: "#3B82F6" },
          { id: "a4", content: "√3/2", color: "#8B5CF6" }
        ],
        correctConnections: {
          "f1": "a4",
          "f2": "a3",
          "f3": "a2",
          "f4": "a1"
        },
        topic: "Trigonometric Values",
        subject: "Mathematics",
        difficulty: "medium" as const,
        instructions: "Match trigonometric functions with their exact values"
      },
      {
        id: "algebra",
        leftItems: [
          { id: "f1", content: "x² - 9", color: "#EF4444" },
          { id: "f2", content: "x² + 4x + 4", color: "#06B6D4" },
          { id: "f3", content: "x² - 6x + 9", color: "#84CC16" },
          { id: "f4", content: "x² + 2x", color: "#F97316" }
        ],
        rightItems: [
          { id: "a1", content: "x(x + 2)", color: "#F97316" },
          { id: "a2", content: "(x - 3)²", color: "#84CC16" },
          { id: "a3", content: "(x + 2)²", color: "#06B6D4" },
          { id: "a4", content: "(x - 3)(x + 3)", color: "#EF4444" }
        ],
        correctConnections: {
          "f1": "a4",
          "f2": "a3",
          "f3": "a2",
          "f4": "a1"
        },
        topic: "Factoring",
        subject: "Mathematics",
        difficulty: "medium" as const,
        instructions: "Match expressions with their factored forms"
      }
    ],
    general: [
      {
        id: "scientists",
        leftItems: [
          { id: "f1", content: "Albert Einstein", color: "#3B82F6" },
          { id: "f2", content: "Isaac Newton", color: "#8B5CF6" },
          { id: "f3", content: "Marie Curie", color: "#10B981" },
          { id: "f4", content: "Nikola Tesla", color: "#F59E0B" }
        ],
        rightItems: [
          { id: "a1", content: "Electricity & Magnetism", color: "#F59E0B" },
          { id: "a2", content: "Radioactivity", color: "#10B981" },
          { id: "a3", content: "Laws of Motion", color: "#8B5CF6" },
          { id: "a4", content: "Theory of Relativity", color: "#3B82F6" }
        ],
        correctConnections: {
          "f1": "a4",
          "f2": "a3",
          "f3": "a2",
          "f4": "a1"
        },
        topic: "Famous Scientists",
        subject: "Science History",
        difficulty: "easy" as const,
        instructions: "Match scientists with their major contributions"
      }
    ]
  };

  const questions = questionSets[subject] || questionSets.general;
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Generate dot positions
  const generateDotPositions = (): DotItem[] => {
    const leftDots: DotItem[] = currentQ.leftItems.map((item, index) => ({
      id: item.id,
      x: 80,
      y: 100 + index * 90,
      content: item.content,
      type: 'question',
      color: item.color,
      isConnected: false
    }));

    const rightDots: DotItem[] = currentQ.rightItems.map((item, index) => ({
      id: item.id,
      x: 450,
      y: 100 + index * 90,
      content: item.content,
      type: 'answer',
      color: item.color,
      isConnected: false
    }));

    return [...leftDots, ...rightDots];
  };

  const [dots, setDots] = useState<DotItem[]>(generateDotPositions());

  useEffect(() => {
    setDots(generateDotPositions());
    setConnections([]);
    setShowResults(false);
  }, [currentQuestion]);

  // Prevent body scrolling when quiz is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  const handleMouseDown = (dotId: string) => {
    setDraggedDot(dotId);
    const dot = dots.find(d => d.id === dotId);
    if (dot) {
      setTemporaryLine({ from: dot, to: mousePos });
    }
  };

  const handleMouseUp = (targetDotId?: string) => {
    if (draggedDot && targetDotId && draggedDot !== targetDotId) {
      const fromDot = dots.find(d => d.id === draggedDot);
      const toDot = dots.find(d => d.id === targetDotId);

      if (fromDot && toDot && fromDot.type !== toDot.type) {
        setConnections(prev => prev.filter(conn => 
          conn.from !== draggedDot && conn.to !== draggedDot &&
          conn.from !== targetDotId && conn.to !== targetDotId
        ));

        const newConnection: Connection = {
          from: draggedDot,
          to: targetDotId,
          isCorrect: (currentQ.correctConnections as any)[draggedDot] === targetDotId ||
                    (currentQ.correctConnections as any)[targetDotId] === draggedDot
        };

        setConnections(prev => [...prev, newConnection]);
      }
    }

    setDraggedDot(null);
    setTemporaryLine(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const newPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setMousePos(newPos);

      if (draggedDot && temporaryLine) {
        setTemporaryLine(prev => prev ? { ...prev, to: newPos } : null);
      }
    }
  };

  const checkAnswers = () => {
    const correctCount = connections.filter(conn => conn.isCorrect).length;
    const totalQuestions = Object.keys(currentQ.correctConnections).length;
    const questionScore = Math.round((correctCount / totalQuestions) * 100);
    
    setScore(prev => prev + questionScore);
    setShowResults(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const finalScore = Math.round(score / questions.length);
      onComplete(finalScore);
      onClose();
    }
  };

  const getDotPosition = (dotId: string) => {
    return dots.find(d => d.id === dotId);
  };

  const getSubjectIcon = () => {
    switch (subject) {
      case 'physics': return '⚛️';
      case 'mathematics': return '📐';
      default: return '🧠';
    }
  };

  const getSubjectColor = () => {
    switch (subject) {
      case 'physics': return 'from-blue-600 to-purple-600';
      case 'mathematics': return 'from-green-600 to-blue-600';
      default: return 'from-purple-600 to-pink-600';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50 overflow-hidden">
      <Card className="w-full max-w-6xl max-h-[90vh] flex flex-col bg-white dark:bg-gray-900 shadow-2xl rounded-3xl border-4 border-blue-200 dark:border-blue-800 bounce-in overflow-hidden">
        {/* Header */}
        <CardHeader className={`bg-gradient-to-r ${getSubjectColor()} text-white flex-shrink-0`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{getSubjectIcon()}</span>
              <div>
                <CardTitle className="text-2xl font-bold">Dot Link Challenge</CardTitle>
                <p className="text-blue-100">{currentQ.instructions}</p>
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
                <span className="text-lg">🎯</span>
                {currentQ.topic} - Question {currentQuestion + 1} of {questions.length}
              </span>
              <Badge className="bg-white/20 px-3 py-1 rounded-full">
                {Math.round(progress)}% Complete
              </Badge>
            </div>
          </div>
        </CardHeader>

        {/* Main Content */}
        <CardContent className="flex-1 overflow-hidden p-8 relative">
          <div
            ref={containerRef}
            className="relative w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border-2 border-dashed border-blue-300 dark:border-blue-600"
            onMouseMove={handleMouseMove}
            onMouseUp={() => handleMouseUp()}
          >
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {connections.map((conn, index) => {
                const fromDot = getDotPosition(conn.from);
                const toDot = getDotPosition(conn.to);
                if (!fromDot || !toDot) return null;

                return (
                  <line
                    key={index}
                    x1={fromDot.x + 60}
                    y1={fromDot.y + 25}
                    x2={toDot.x + 60}
                    y2={toDot.y + 25}
                    stroke={conn.isCorrect ? "#10B981" : "#EF4444"}
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="drop-shadow-lg"
                  />
                );
              })}

              {temporaryLine && (
                <line
                  x1={temporaryLine.from.x + 60}
                  y1={temporaryLine.from.y + 25}
                  x2={temporaryLine.to.x}
                  y2={temporaryLine.to.y}
                  stroke="#94A3B8"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  strokeLinecap="round"
                />
              )}
            </svg>

            {/* Dots */}
            {dots.map((dot) => (
              <div
                key={dot.id}
                className="absolute cursor-pointer transition-all duration-300 hover:scale-110 group"
                style={{
                  left: `${dot.x}px`,
                  top: `${dot.y}px`,
                  zIndex: 10
                }}
                onMouseDown={() => handleMouseDown(dot.id)}
                onMouseUp={() => handleMouseUp(dot.id)}
              >
                <div
                  className="w-32 h-12 rounded-2xl flex items-center justify-center shadow-lg border-3 border-white text-white font-bold text-sm group-hover:shadow-2xl group-hover:border-yellow-300 transition-all duration-300 px-2"
                  style={{
                    backgroundColor: dot.color,
                    boxShadow: `0 4px 15px ${dot.color}40`
                  }}
                >
                  <span className="text-center text-xs leading-tight">{dot.content}</span>
                </div>
                
                <div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold transition-all duration-300"
                  style={{
                    backgroundColor: connections.some(c => c.from === dot.id || c.to === dot.id) ? '#10B981' : '#94A3B8'
                  }}
                >
                  {connections.some(c => c.from === dot.id || c.to === dot.id) ? '✓' : '○'}
                </div>
              </div>
            ))}

            {/* Results Section */}
            {showResults && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center" style={{ zIndex: 20 }}>
                <Card className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border-4 border-blue-300 max-w-md">
                  <CardContent className="text-center space-y-6">
                    <div className="text-6xl">
                      {connections.every(c => c.isCorrect) ? '🎉' : '💪'}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {connections.every(c => c.isCorrect) ? 'Perfect Match!' : 'Good Effort!'}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      You connected {connections.filter(c => c.isCorrect).length} out of {Object.keys(currentQ.correctConnections).length} correctly!
                    </p>
                    <Button
                      onClick={handleNext}
                      className={`bg-gradient-to-r ${getSubjectColor()} hover:opacity-90 rounded-xl px-8 py-3 text-lg font-semibold`}
                    >
                      {currentQuestion < questions.length - 1 ? 'Next Challenge →' : '🎯 Complete Quiz'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Action Buttons */}
            {!showResults && (
              <div className="absolute bottom-6 right-6 flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setConnections([])}
                  className="bg-white/90 hover:bg-white rounded-xl px-6 py-3"
                >
                  🔄 Clear All
                </Button>
                <Button
                  onClick={checkAnswers}
                  disabled={connections.length === 0}
                  className={`bg-gradient-to-r ${getSubjectColor()} hover:opacity-90 rounded-xl px-8 py-3 text-lg font-semibold`}
                >
                  ✨ Check Answers
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}