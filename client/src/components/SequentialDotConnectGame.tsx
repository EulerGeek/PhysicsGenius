import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface DotPoint {
  id: number;
  x: number;
  y: number;
  label: string;
  isConnected: boolean;
  concept: string;
}

interface Connection {
  from: number;
  to: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface DotConnectPuzzle {
  id: string;
  title: string;
  subject: string;
  description: string;
  dots: Omit<DotPoint, 'isConnected'>[];
  correctSequence: number[];
  concept: string;
  explanation: string;
}

interface SequentialDotConnectGameProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
  subject: 'physics' | 'mathematics' | 'general';
}

export default function SequentialDotConnectGame({ isOpen, onClose, onComplete, subject }: SequentialDotConnectGameProps) {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [dots, setDots] = useState<DotPoint[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [currentDot, setCurrentDot] = useState<number | null>(null);
  const [nextExpected, setNextExpected] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [temporaryLine, setTemporaryLine] = useState<{ from: DotPoint, to: { x: number, y: number } } | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const puzzleSets = {
    physics: [
      {
        id: "forces-sequence",
        title: "Forces in Motion",
        subject: "Physics",
        description: "Connect the dots to show how forces create motion",
        dots: [
          { id: 1, x: 100, y: 200, label: "1", concept: "Object at Rest" },
          { id: 2, x: 200, y: 150, label: "2", concept: "Force Applied" },
          { id: 3, x: 300, y: 100, label: "3", concept: "Acceleration Begins" },
          { id: 4, x: 400, y: 80, label: "4", concept: "Velocity Increases" },
          { id: 5, x: 500, y: 120, label: "5", concept: "Constant Velocity" },
          { id: 6, x: 600, y: 180, label: "6", concept: "Force Removed" },
          { id: 7, x: 700, y: 220, label: "7", concept: "Inertia Continues" }
        ],
        correctSequence: [1, 2, 3, 4, 5, 6, 7],
        concept: "Newton's Laws of Motion",
        explanation: "This sequence shows how Newton's laws govern motion: inertia, force causing acceleration, and action-reaction."
      },
      {
        id: "wave-sequence",
        title: "Wave Properties",
        subject: "Physics", 
        description: "Connect the wave properties in order",
        dots: [
          { id: 1, x: 120, y: 180, label: "1", concept: "Wavelength λ" },
          { id: 2, x: 220, y: 120, label: "2", concept: "Frequency f" },
          { id: 3, x: 320, y: 160, label: "3", concept: "Period T" },
          { id: 4, x: 420, y: 100, label: "4", concept: "Amplitude A" },
          { id: 5, x: 520, y: 140, label: "5", concept: "Wave Speed v" },
          { id: 6, x: 620, y: 200, label: "6", concept: "Energy E" }
        ],
        correctSequence: [1, 2, 3, 4, 5, 6],
        concept: "Wave Physics",
        explanation: "Wave properties are interconnected: wavelength and frequency determine speed, amplitude affects energy."
      },
      {
        id: "energy-sequence",
        title: "Energy Transformations",
        subject: "Physics",
        description: "Show energy transformation in a pendulum",
        dots: [
          { id: 1, x: 150, y: 100, label: "1", concept: "Maximum Potential Energy" },
          { id: 2, x: 250, y: 150, label: "2", concept: "PE → KE Conversion" },
          { id: 3, x: 350, y: 200, label: "3", concept: "Maximum Kinetic Energy" },
          { id: 4, x: 450, y: 150, label: "4", concept: "KE → PE Conversion" },
          { id: 5, x: 550, y: 100, label: "5", concept: "Maximum Potential Energy" }
        ],
        correctSequence: [1, 2, 3, 4, 5],
        concept: "Conservation of Energy",
        explanation: "Energy transforms between potential and kinetic but total energy remains constant in a pendulum."
      },
      {
        id: "quantum-sequence",
        title: "Quantum Energy Levels",
        subject: "Physics",
        description: "Connect electron energy transitions",
        dots: [
          { id: 1, x: 140, y: 220, label: "1", concept: "Ground State n=1" },
          { id: 2, x: 240, y: 180, label: "2", concept: "Energy Absorbed" },
          { id: 3, x: 340, y: 120, label: "3", concept: "Excited State n=2" },
          { id: 4, x: 440, y: 80, label: "4", concept: "Higher State n=3" },
          { id: 5, x: 540, y: 120, label: "5", concept: "Photon Emission" },
          { id: 6, x: 640, y: 180, label: "6", concept: "Return to Ground" }
        ],
        correctSequence: [1, 2, 3, 4, 5, 6],
        concept: "Quantum Mechanics",
        explanation: "Electrons absorb energy to jump to higher levels, then emit photons to return to lower energy states."
      }
    ],
    mathematics: [
      {
        id: "function-sequence",
        title: "Function Transformations",
        subject: "Mathematics",
        description: "Connect function transformation steps",
        dots: [
          { id: 1, x: 130, y: 180, label: "1", concept: "f(x) = x²" },
          { id: 2, x: 230, y: 140, label: "2", concept: "f(x-2) = (x-2)²" },
          { id: 3, x: 330, y: 100, label: "3", concept: "2f(x-2) = 2(x-2)²" },
          { id: 4, x: 430, y: 120, label: "4", concept: "2f(x-2)+3 = 2(x-2)²+3" },
          { id: 5, x: 530, y: 160, label: "5", concept: "Final Form" }
        ],
        correctSequence: [1, 2, 3, 4, 5],
        concept: "Function Transformations",
        explanation: "Functions transform through horizontal shifts, vertical stretches, and vertical shifts in sequence."
      }
    ],
    general: [
      {
        id: "scientific-method",
        title: "Scientific Method",
        subject: "Science",
        description: "Connect the steps of scientific investigation",
        dots: [
          { id: 1, x: 120, y: 200, label: "1", concept: "Observation" },
          { id: 2, x: 220, y: 160, label: "2", concept: "Question" },
          { id: 3, x: 320, y: 120, label: "3", concept: "Hypothesis" },
          { id: 4, x: 420, y: 100, label: "4", concept: "Experiment" },
          { id: 5, x: 520, y: 140, label: "5", concept: "Analysis" },
          { id: 6, x: 620, y: 180, label: "6", concept: "Conclusion" }
        ],
        correctSequence: [1, 2, 3, 4, 5, 6],
        concept: "Scientific Method",
        explanation: "Science follows a systematic approach from observation through experimentation to conclusion."
      }
    ]
  };

  const puzzles = puzzleSets[subject] || puzzleSets.general;
  const currentPuzzleData = puzzles[currentPuzzle];
  const progress = ((currentPuzzle + 1) / puzzles.length) * 100;

  // Initialize dots only when puzzle changes
  useEffect(() => {
    if (currentPuzzleData && currentPuzzleData.dots) {
      const initialDots = currentPuzzleData.dots.map(dot => ({ 
        ...dot, 
        isConnected: false 
      }));
      setDots(initialDots);
      setConnections([]);
      setCurrentDot(null);
      setNextExpected(1);
      setIsComplete(false);
      setShowResults(false);
      setMistakes(0);
    }
  }, [currentPuzzle, isOpen]); // Only re-run when puzzle changes or modal opens

  // Prevent body scrolling when game is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  const handleDotClick = (dotId: number) => {
    if (isComplete) return;

    if (dotId === nextExpected) {
      // Correct sequence
      if (currentDot !== null) {
        // Create connection from previous dot
        const fromDot = dots.find(d => d.id === currentDot);
        const toDot = dots.find(d => d.id === dotId);
        
        if (fromDot && toDot) {
          const newConnection: Connection = {
            from: currentDot,
            to: dotId,
            x1: fromDot.x + 25,
            y1: fromDot.y + 25,
            x2: toDot.x + 25,
            y2: toDot.y + 25
          };
          setConnections(prev => [...prev, newConnection]);
        }
      }

      // Mark dot as connected
      setDots(prev => prev.map(dot => 
        dot.id === dotId ? { ...dot, isConnected: true } : dot
      ));

      setCurrentDot(dotId);
      setNextExpected(dotId + 1);

      // Check if puzzle is complete
      if (dotId === currentPuzzleData.correctSequence[currentPuzzleData.correctSequence.length - 1]) {
        setIsComplete(true);
        setShowResults(true);
        const puzzleScore = Math.max(0, 100 - (mistakes * 10));
        setScore(prev => prev + puzzleScore);
      }
    } else {
      // Wrong sequence
      setMistakes(prev => prev + 1);
      
      // Visual feedback for wrong choice
      const wrongDot = document.getElementById(`dot-${dotId}`);
      if (wrongDot) {
        wrongDot.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          wrongDot.style.animation = '';
        }, 500);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const newPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setMousePos(newPos);

      if (currentDot && !isComplete) {
        const fromDot = dots.find(d => d.id === currentDot);
        if (fromDot) {
          setTemporaryLine({ from: fromDot, to: newPos });
        }
      }
    }
  };

  const handleNext = () => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(prev => prev + 1);
    } else {
      const finalScore = Math.round(score / puzzles.length);
      onComplete(finalScore);
      onClose();
    }
  };

  const resetPuzzle = () => {
    if (currentPuzzleData) {
      setDots(currentPuzzleData.dots.map(dot => ({ ...dot, isConnected: false })));
      setConnections([]);
      setCurrentDot(null);
      setNextExpected(1);
      setIsComplete(false);
      setShowResults(false);
      setTemporaryLine(null);
    }
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
                <CardTitle className="text-2xl font-bold">Connect the Dots Game</CardTitle>
                <p className="text-blue-100">{currentPuzzleData.description}</p>
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
                {currentPuzzleData.title} - Puzzle {currentPuzzle + 1} of {puzzles.length}
              </span>
              <div className="flex gap-2">
                <Badge className="bg-white/20 px-3 py-1 rounded-full">
                  Next: {nextExpected > currentPuzzleData.correctSequence.length ? 'Complete!' : nextExpected}
                </Badge>
                <Badge className="bg-red-500/20 px-3 py-1 rounded-full">
                  Mistakes: {mistakes}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Main Game Area */}
        <CardContent className="flex-1 overflow-hidden p-8 relative">
          <div
            ref={containerRef}
            className="relative w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border-2 border-dashed border-blue-300 dark:border-blue-600"
            onMouseMove={handleMouseMove}
          >
            {/* Instructions and Debug */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg border-2 border-blue-200 dark:border-blue-600">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                🎯 Click dots in order: {nextExpected > currentPuzzleData.correctSequence.length ? 'Complete!' : `Next is ${nextExpected}`}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Debug: {dots.length} dots loaded
              </p>
            </div>

            {/* Concept Badge */}
            <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-lg">
              📚 {currentPuzzleData.concept}
            </Badge>

            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {connections.map((conn, index) => (
                <line
                  key={index}
                  x1={conn.x1}
                  y1={conn.y1}
                  x2={conn.x2}
                  y2={conn.y2}
                  stroke="#10B981"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="drop-shadow-lg"
                  style={{
                    animation: `drawLine 0.5s ease-out ${index * 0.1}s both`
                  }}
                />
              ))}

              {/* Temporary line while next connection */}
              {temporaryLine && (
                <line
                  x1={temporaryLine.from.x + 25}
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

            {/* Manual Test Dots - Let's add some fixed dots for testing */}
            <div
              className="absolute cursor-pointer transition-all duration-300 hover:scale-110 group ring-4 ring-yellow-400 ring-opacity-75 animate-pulse"
              style={{ left: '100px', top: '200px', zIndex: 10 }}
              onClick={() => console.log('Dot 1 clicked!')}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-3 border-white font-bold text-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-bounce">
                1
              </div>
              <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap">
                Object at Rest
              </div>
            </div>

            <div
              className="absolute cursor-pointer transition-all duration-300 hover:scale-110 group"
              style={{ left: '200px', top: '150px', zIndex: 10 }}
              onClick={() => console.log('Dot 2 clicked!')}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-3 border-white font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                2
              </div>
              <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap">
                Force Applied
              </div>
            </div>

            <div
              className="absolute cursor-pointer transition-all duration-300 hover:scale-110 group"
              style={{ left: '300px', top: '100px', zIndex: 10 }}
              onClick={() => console.log('Dot 3 clicked!')}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-3 border-white font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                3
              </div>
              <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap">
                Acceleration Begins
              </div>
            </div>

            <div
              className="absolute cursor-pointer transition-all duration-300 hover:scale-110 group"
              style={{ left: '400px', top: '80px', zIndex: 10 }}
              onClick={() => console.log('Dot 4 clicked!')}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-3 border-white font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                4
              </div>
              <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap">
                Velocity Increases
              </div>
            </div>

            <div
              className="absolute cursor-pointer transition-all duration-300 hover:scale-110 group"
              style={{ left: '500px', top: '120px', zIndex: 10 }}
              onClick={() => console.log('Dot 5 clicked!')}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-3 border-white font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                5
              </div>
              <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap">
                Constant Velocity
              </div>
            </div>

            {/* Results Section */}
            {showResults && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center" style={{ zIndex: 20 }}>
                <Card className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border-4 border-green-300 max-w-md">
                  <CardContent className="text-center space-y-6">
                    <div className="text-6xl">
                      {mistakes === 0 ? '🎉' : mistakes <= 2 ? '🌟' : '💪'}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {mistakes === 0 ? 'Perfect Connection!' : mistakes <= 2 ? 'Great Job!' : 'Good Effort!'}
                    </h3>
                    <div className="space-y-2">
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        Puzzle completed with {mistakes} mistakes!
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                        {currentPuzzleData.explanation}
                      </p>
                    </div>
                    <Button
                      onClick={handleNext}
                      className={`bg-gradient-to-r ${getSubjectColor()} hover:opacity-90 rounded-xl px-8 py-3 text-lg font-semibold`}
                    >
                      {currentPuzzle < puzzles.length - 1 ? 'Next Puzzle →' : '🎯 Complete Game'}
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
                  onClick={resetPuzzle}
                  className="bg-white/90 hover:bg-white rounded-xl px-6 py-3"
                >
                  🔄 Reset
                </Button>
                <Button
                  variant="outline"
                  disabled={!isComplete}
                  className="bg-white/90 hover:bg-white rounded-xl px-6 py-3"
                >
                  ✨ Score: {Math.max(0, 100 - (mistakes * 10))}%
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>


    </div>
  );
}