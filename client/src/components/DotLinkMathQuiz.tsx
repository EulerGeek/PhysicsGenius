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

interface MathQuestion {
  id: string;
  leftItems: { id: string; content: string; color: string }[];
  rightItems: { id: string; content: string; color: string }[];
  correctConnections: { [key: string]: string };
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface DotLinkMathQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
}

export default function DotLinkMathQuiz({ isOpen, onClose, onComplete }: DotLinkMathQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [draggedDot, setDraggedDot] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [temporaryLine, setTemporaryLine] = useState<{ from: DotItem, to: { x: number, y: number } } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mathQuestions: MathQuestion[] = [
    {
      id: "derivatives",
      leftItems: [
        { id: "f1", content: "d/dx[x²]", color: "#3B82F6" },
        { id: "f2", content: "d/dx[sin(x)]", color: "#8B5CF6" },
        { id: "f3", content: "d/dx[eˣ]", color: "#10B981" },
        { id: "f4", content: "d/dx[ln(x)]", color: "#F59E0B" }
      ],
      rightItems: [
        { id: "a1", content: "eˣ", color: "#10B981" },
        { id: "a2", content: "1/x", color: "#F59E0B" },
        { id: "a3", content: "2x", color: "#3B82F6" },
        { id: "a4", content: "cos(x)", color: "#8B5CF6" }
      ],
      correctConnections: {
        "f1": "a3", // x² → 2x
        "f2": "a4", // sin(x) → cos(x)
        "f3": "a1", // eˣ → eˣ
        "f4": "a2"  // ln(x) → 1/x
      },
      topic: "Derivatives",
      difficulty: "medium"
    },
    {
      id: "algebra",
      leftItems: [
        { id: "f1", content: "x² - 4", color: "#EF4444" },
        { id: "f2", content: "x² + 6x + 9", color: "#06B6D4" },
        { id: "f3", content: "x² - 1", color: "#84CC16" },
        { id: "f4", content: "2x² + 8x", color: "#F97316" }
      ],
      rightItems: [
        { id: "a1", content: "(x+3)²", color: "#06B6D4" },
        { id: "a2", content: "2x(x+4)", color: "#F97316" },
        { id: "a3", content: "(x-1)(x+1)", color: "#84CC16" },
        { id: "a4", content: "(x-2)(x+2)", color: "#EF4444" }
      ],
      correctConnections: {
        "f1": "a4", // x² - 4 → (x-2)(x+2)
        "f2": "a1", // x² + 6x + 9 → (x+3)²
        "f3": "a3", // x² - 1 → (x-1)(x+1)
        "f4": "a2"  // 2x² + 8x → 2x(x+4)
      },
      topic: "Algebraic Factoring",
      difficulty: "easy"
    },
    {
      id: "trigonometry",
      leftItems: [
        { id: "f1", content: "sin(90°)", color: "#8B5CF6" },
        { id: "f2", content: "cos(0°)", color: "#3B82F6" },
        { id: "f3", content: "tan(45°)", color: "#10B981" },
        { id: "f4", content: "sin(30°)", color: "#F59E0B" }
      ],
      rightItems: [
        { id: "a1", content: "1/2", color: "#F59E0B" },
        { id: "a2", content: "1", color: "#8B5CF6" },
        { id: "a3", content: "1", color: "#3B82F6" },
        { id: "a4", content: "1", color: "#10B981" }
      ],
      correctConnections: {
        "f1": "a2", // sin(90°) → 1
        "f2": "a3", // cos(0°) → 1
        "f3": "a4", // tan(45°) → 1
        "f4": "a1"  // sin(30°) → 1/2
      },
      topic: "Trigonometric Values",
      difficulty: "easy"
    }
  ];

  const currentQ = mathQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / mathQuestions.length) * 100;

  // Generate dot positions
  const generateDotPositions = (): DotItem[] => {
    const leftDots: DotItem[] = currentQ.leftItems.map((item, index) => ({
      id: item.id,
      x: 100,
      y: 120 + index * 80,
      content: item.content,
      type: 'question',
      color: item.color,
      isConnected: false
    }));

    const rightDots: DotItem[] = currentQ.rightItems.map((item, index) => ({
      id: item.id,
      x: 500,
      y: 120 + index * 80,
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
        // Remove existing connections from these dots
        setConnections(prev => prev.filter(conn => 
          conn.from !== draggedDot && conn.to !== draggedDot &&
          conn.from !== targetDotId && conn.to !== targetDotId
        ));

        // Add new connection
        const newConnection: Connection = {
          from: draggedDot,
          to: targetDotId,
          isCorrect: currentQ.correctConnections[draggedDot] === targetDotId ||
                    currentQ.correctConnections[targetDotId] === draggedDot
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
    if (currentQuestion < mathQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const finalScore = Math.round(score / mathQuestions.length);
      onComplete(finalScore);
      onClose();
    }
  };

  const getDotPosition = (dotId: string) => {
    return dots.find(d => d.id === dotId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50 overflow-hidden">
      <Card className="w-full max-w-6xl max-h-[90vh] flex flex-col bg-white dark:bg-gray-900 shadow-2xl rounded-3xl border-4 border-green-200 dark:border-green-800 bounce-in overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🔗</span>
              <div>
                <CardTitle className="text-2xl font-bold">Dot Link Math Quiz</CardTitle>
                <p className="text-green-100">Connect the dots to match problems with solutions!</p>
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
                <span className="text-lg">📐</span>
                {currentQ.topic} - Question {currentQuestion + 1} of {mathQuestions.length}
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
            className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border-2 border-dashed border-blue-300 dark:border-blue-600"
            onMouseMove={handleMouseMove}
            onMouseUp={() => handleMouseUp()}
          >
            {/* Instructions */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg border-2 border-blue-200 dark:border-blue-600">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                🎯 Drag from left dots to right dots to make connections
              </p>
            </div>

            {/* Topic Badge */}
            <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-lg">
              📚 {currentQ.topic}
            </Badge>

            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {connections.map((conn, index) => {
                const fromDot = getDotPosition(conn.from);
                const toDot = getDotPosition(conn.to);
                if (!fromDot || !toDot) return null;

                return (
                  <line
                    key={index}
                    x1={fromDot.x + 40}
                    y1={fromDot.y + 25}
                    x2={toDot.x + 40}
                    y2={toDot.y + 25}
                    stroke={conn.isCorrect ? "#10B981" : "#EF4444"}
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="drop-shadow-lg"
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                      animation: 'drawLine 0.5s ease-out'
                    }}
                  />
                );
              })}

              {/* Temporary line while dragging */}
              {temporaryLine && (
                <line
                  x1={temporaryLine.from.x + 40}
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
                  className="w-20 h-12 rounded-2xl flex items-center justify-center shadow-lg border-3 border-white text-white font-bold text-sm group-hover:shadow-2xl group-hover:border-yellow-300 transition-all duration-300"
                  style={{
                    backgroundColor: dot.color,
                    boxShadow: `0 4px 15px ${dot.color}40`
                  }}
                >
                  {dot.content}
                </div>
                
                {/* Connection indicator */}
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
                      {connections.every(c => c.isCorrect) ? 'Perfect!' : 'Good Try!'}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      You got {connections.filter(c => c.isCorrect).length} out of {Object.keys(currentQ.correctConnections).length} connections correct!
                    </p>
                    <Button
                      onClick={handleNext}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-xl px-8 py-3 text-lg font-semibold"
                    >
                      {currentQuestion < mathQuestions.length - 1 ? 'Next Challenge →' : '🎯 Complete Quiz'}
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
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-8 py-3 text-lg font-semibold"
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