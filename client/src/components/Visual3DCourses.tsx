import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCw, Zap, Waves, Atom } from 'lucide-react';

interface Visual3DCourse {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  concepts: Visual3DConcept[];
  category: 'mechanics' | 'waves' | 'electricity' | 'quantum' | 'relativity';
}

interface Visual3DConcept {
  id: string;
  title: string;
  description: string;
  visualization: 'pendulum' | 'wave' | 'orbit' | 'field' | 'particle' | 'spring';
  parameters: Record<string, number>;
  explanation: string;
}

interface Visual3DCoursesProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (courseId: string, score: number) => void;
}

export default function Visual3DCourses({ isOpen, onClose, onComplete }: Visual3DCoursesProps) {
  const [selectedCourse, setSelectedCourse] = useState<Visual3DCourse | null>(null);
  const [currentConcept, setCurrentConcept] = useState<Visual3DConcept | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState([1]);
  const [parameters, setParameters] = useState<Record<string, number>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const visual3DCourses: Visual3DCourse[] = [
    {
      id: 'classical-mechanics-3d',
      title: 'Classical Mechanics in 3D',
      description: 'Visualize forces, motion, and energy in three dimensions',
      icon: <RotateCw className="w-6 h-6" />,
      difficulty: 'Beginner',
      duration: '45 min',
      category: 'mechanics',
      concepts: [
        {
          id: 'pendulum',
          title: 'Simple Pendulum',
          description: 'Watch how gravity creates oscillatory motion',
          visualization: 'pendulum',
          parameters: { length: 1, mass: 1, gravity: 9.8, angle: 30 },
          explanation: 'A pendulum demonstrates the conversion between potential and kinetic energy. The restoring force is F = -mg sin(θ), creating simple harmonic motion for small angles.'
        },
        {
          id: 'orbital-motion',
          title: 'Orbital Mechanics',
          description: 'See how objects orbit under gravitational force',
          visualization: 'orbit',
          parameters: { mass1: 100, mass2: 1, distance: 5, velocity: 2 },
          explanation: 'Orbital motion occurs when the gravitational force provides the centripetal force needed for circular motion: F = GMm/r² = mv²/r'
        },
        {
          id: 'spring-system',
          title: 'Spring Oscillations',
          description: 'Explore Hooke\'s law and elastic potential energy',
          visualization: 'spring',
          parameters: { springConstant: 10, mass: 1, amplitude: 2, damping: 0.1 },
          explanation: 'Springs follow Hooke\'s law F = -kx. The system oscillates with frequency ω = √(k/m), converting between kinetic and elastic potential energy.'
        }
      ]
    },
    {
      id: 'wave-physics-3d',
      title: 'Wave Physics Visualization',
      description: 'Experience waves, interference, and wave phenomena',
      icon: <Waves className="w-6 h-6" />,
      difficulty: 'Intermediate',
      duration: '60 min',
      category: 'waves',
      concepts: [
        {
          id: 'wave-propagation',
          title: 'Wave Propagation',
          description: 'See how waves carry energy through space',
          visualization: 'wave',
          parameters: { frequency: 2, amplitude: 1, wavelength: 3, speed: 6 },
          explanation: 'Waves propagate with v = fλ, where v is speed, f is frequency, and λ is wavelength. Energy travels without matter transport.'
        }
      ]
    },
    {
      id: 'electromagnetic-3d',
      title: 'Electromagnetic Fields',
      description: 'Visualize electric and magnetic field interactions',
      icon: <Zap className="w-6 h-6" />,
      difficulty: 'Advanced',
      duration: '75 min',
      category: 'electricity',
      concepts: [
        {
          id: 'electric-field',
          title: 'Electric Field Visualization',
          description: 'See how charges create electric fields in space',
          visualization: 'field',
          parameters: { charge1: 1, charge2: -1, separation: 4 },
          explanation: 'Electric fields E = F/q represent the force per unit charge. Field lines show direction and strength of the electric field.'
        }
      ]
    },
    {
      id: 'quantum-visualization',
      title: 'Quantum Mechanics Concepts',
      description: 'Explore quantum phenomena through visual representations',
      icon: <Atom className="w-6 h-6" />,
      difficulty: 'Advanced',
      duration: '90 min',
      category: 'quantum',
      concepts: [
        {
          id: 'particle-wave',
          title: 'Wave-Particle Duality',
          description: 'Visualize the quantum nature of matter and energy',
          visualization: 'particle',
          parameters: { energy: 5, momentum: 2, wavelength: 1 },
          explanation: 'Quantum objects exhibit both wave and particle properties. De Broglie wavelength λ = h/p relates particle momentum to wave properties.'
        }
      ]
    }
  ];

  useEffect(() => {
    if (currentConcept && canvasRef.current) {
      setParameters(currentConcept.parameters);
      drawVisualization();
    }
  }, [currentConcept]);

  useEffect(() => {
    if (isPlaying) {
      animate();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, animationSpeed[0]]);

  const animate = () => {
    drawVisualization();
    animationRef.current = requestAnimationFrame(animate);
  };

  const drawVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas || !currentConcept) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const time = Date.now() * 0.001 * animationSpeed[0];

    switch (currentConcept.visualization) {
      case 'pendulum':
        drawPendulum(ctx, centerX, centerY, time);
        break;
      case 'orbit':
        drawOrbit(ctx, centerX, centerY, time);
        break;
      case 'spring':
        drawSpring(ctx, centerX, centerY, time);
        break;
      case 'wave':
        drawWave(ctx, centerX, centerY, time);
        break;
      case 'field':
        drawElectricField(ctx, centerX, centerY);
        break;
      case 'particle':
        drawQuantumParticle(ctx, centerX, centerY, time);
        break;
    }
  };

  const drawPendulum = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const length = parameters.length * 100;
    const angle = parameters.angle * Math.PI / 180 * Math.cos(time * Math.sqrt(parameters.gravity / parameters.length));
    
    const bobX = centerX + length * Math.sin(angle);
    const bobY = centerY + length * Math.cos(angle);

    // Draw pivot
    ctx.fillStyle = '#374151';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
    ctx.fill();

    // Draw string
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();

    // Draw bob
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(bobX, bobY, 15 * Math.sqrt(parameters.mass), 0, 2 * Math.PI);
    ctx.fill();

    // Draw angle arc
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, Math.PI/2, Math.PI/2 + angle, false);
    ctx.stroke();
  };

  const drawOrbit = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const orbitRadius = parameters.distance * 30;
    const angle = time * parameters.velocity / parameters.distance;
    
    // Draw central mass
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20 * Math.sqrt(parameters.mass1 / 10), 0, 2 * Math.PI);
    ctx.fill();

    // Draw orbit path
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, orbitRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw orbiting object
    const objectX = centerX + orbitRadius * Math.cos(angle);
    const objectY = centerY + orbitRadius * Math.sin(angle);
    
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(objectX, objectY, 8 * Math.sqrt(parameters.mass2), 0, 2 * Math.PI);
    ctx.fill();

    // Draw velocity vector
    const vx = -parameters.velocity * Math.sin(angle) * 10;
    const vy = parameters.velocity * Math.cos(angle) * 10;
    
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(objectX, objectY);
    ctx.lineTo(objectX + vx, objectY + vy);
    ctx.stroke();
  };

  const drawSpring = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const equilibrium = centerY;
    const displacement = parameters.amplitude * 20 * Math.cos(time * Math.sqrt(parameters.springConstant / parameters.mass)) * Math.exp(-parameters.damping * time);
    const massY = equilibrium + displacement;

    // Draw wall
    ctx.fillStyle = '#374151';
    ctx.fillRect(centerX - 150, centerY - 100, 20, 200);

    // Draw spring
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX - 130, centerY);
    
    const coils = 12;
    const springLength = 100 + displacement;
    for (let i = 0; i <= coils; i++) {
      const x = centerX - 130 + (i / coils) * springLength;
      const y = centerY + (i % 2 === 0 ? -10 : 10);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(centerX - 30, massY);
    ctx.stroke();

    // Draw mass
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(centerX - 50, massY - 15, 40, 30);

    // Draw equilibrium line
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(centerX - 80, equilibrium);
    ctx.lineTo(centerX + 50, equilibrium);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const drawWave = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const wavelength = parameters.wavelength * 50;
    const amplitude = parameters.amplitude * 30;
    const frequency = parameters.frequency;

    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let x = 0; x < 600; x += 2) {
      const y = centerY + amplitude * Math.sin(2 * Math.PI * (x / wavelength - frequency * time));
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw wavelength indicator
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, centerY + amplitude + 30);
    ctx.lineTo(50 + wavelength, centerY + amplitude + 30);
    ctx.stroke();

    // Wavelength label
    ctx.fillStyle = '#374151';
    ctx.font = '14px sans-serif';
    ctx.fillText('λ', 50 + wavelength/2, centerY + amplitude + 50);
  };

  const drawElectricField = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number) => {
    const charge1X = centerX - parameters.separation * 15;
    const charge2X = centerX + parameters.separation * 15;

    // Draw charges
    ctx.fillStyle = parameters.charge1 > 0 ? '#dc2626' : '#3b82f6';
    ctx.beginPath();
    ctx.arc(charge1X, centerY, 15, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = parameters.charge2 > 0 ? '#dc2626' : '#3b82f6';
    ctx.beginPath();
    ctx.arc(charge2X, centerY, 15, 0, 2 * Math.PI);
    ctx.fill();

    // Draw field lines
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 1;

    for (let angle = 0; angle < 2 * Math.PI; angle += Math.PI / 8) {
      ctx.beginPath();
      let x = charge1X + 20 * Math.cos(angle);
      let y = centerY + 20 * Math.sin(angle);
      ctx.moveTo(x, y);

      for (let i = 0; i < 50; i++) {
        const dx1 = x - charge1X;
        const dy1 = y - centerY;
        const r1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        
        const dx2 = x - charge2X;
        const dy2 = y - centerY;
        const r2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        const ex = parameters.charge1 * dx1 / (r1 * r1 * r1) + parameters.charge2 * dx2 / (r2 * r2 * r2);
        const ey = parameters.charge1 * dy1 / (r1 * r1 * r1) + parameters.charge2 * dy2 / (r2 * r2 * r2);

        const magnitude = Math.sqrt(ex * ex + ey * ey);
        if (magnitude > 0) {
          x += (ex / magnitude) * 2;
          y += (ey / magnitude) * 2;
          ctx.lineTo(x, y);
        }

        if (x < 0 || x > 600 || y < 0 || y > 400) break;
      }
      ctx.stroke();
    }
  };

  const drawQuantumParticle = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const wavelength = parameters.wavelength * 50;
    const amplitude = 30;

    // Draw wave function
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let x = 0; x < 600; x += 2) {
      const y = centerY + amplitude * Math.sin(2 * Math.PI * x / wavelength - parameters.energy * time);
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw probability density
    ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    for (let x = 0; x < 600; x += 2) {
      const waveValue = Math.sin(2 * Math.PI * x / wavelength - parameters.energy * time);
      const y = centerY + amplitude * waveValue * waveValue;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(600, centerY);
    ctx.closePath();
    ctx.fill();

    // Draw particle representation
    const particleX = centerX + 100 * Math.cos(parameters.momentum * time);
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(particleX, centerY - 100, 8, 0, 2 * Math.PI);
    ctx.fill();
  };

  const updateParameter = (key: string, value: number) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl h-[95vh] bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-bold">3D Visual Physics Courses</CardTitle>
              <p className="text-purple-100">Experience physics through interactive 3D visualizations</p>
            </div>
            <Button onClick={onClose} variant="ghost" className="text-white hover:bg-white/20">
              ✕ Close
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 h-full">
          {!selectedCourse ? (
            // Course Selection
            <div className="p-8 space-y-6 overflow-y-auto h-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {visual3DCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                          {course.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl">{course.title}</CardTitle>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{course.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant={course.difficulty === 'Beginner' ? 'secondary' : course.difficulty === 'Intermediate' ? 'default' : 'destructive'}>
                          {course.difficulty}
                        </Badge>
                        <Badge variant="outline">{course.duration}</Badge>
                        <Badge variant="outline">{course.concepts.length} concepts</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Concepts:</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          {course.concepts.map((concept) => (
                            <li key={concept.id} className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              {concept.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button 
                        onClick={() => setSelectedCourse(course)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Start Course
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : !currentConcept ? (
            // Concept Selection
            <div className="p-8 space-y-6 overflow-y-auto h-full">
              <div className="flex items-center gap-4 mb-6">
                <Button onClick={() => setSelectedCourse(null)} variant="outline">
                  ← Back to Courses
                </Button>
                <div>
                  <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{selectedCourse.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCourse.concepts.map((concept) => (
                  <Card key={concept.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300">
                    <CardHeader>
                      <CardTitle className="text-lg">{concept.title}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{concept.description}</p>
                    </CardHeader>
                    
                    <CardContent>
                      <Button 
                        onClick={() => setCurrentConcept(concept)}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      >
                        Explore Concept
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            // Visualization View
            <div className="flex h-full">
              {/* Visualization Canvas */}
              <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-800">
                <div className="mb-4 flex items-center justify-between">
                  <Button onClick={() => setCurrentConcept(null)} variant="outline">
                    ← Back to Concepts
                  </Button>
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => setIsPlaying(!isPlaying)}
                      variant={isPlaying ? "destructive" : "default"}
                      className="flex items-center gap-2"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Speed:</span>
                      <Slider
                        value={animationSpeed}
                        onValueChange={setAnimationSpeed}
                        max={3}
                        min={0.1}
                        step={0.1}
                        className="w-24"
                      />
                    </div>
                  </div>
                </div>

                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 shadow-lg w-full"
                />
              </div>

              {/* Controls Panel */}
              <div className="w-80 p-6 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
                <h3 className="text-xl font-bold mb-4">{currentConcept.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">{currentConcept.description}</p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Parameters</h4>
                    <div className="space-y-4">
                      {Object.entries(currentConcept.parameters).map(([key, defaultValue]) => (
                        <div key={key}>
                          <label className="block text-sm font-medium mb-1 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          <Slider
                            value={[parameters[key] || defaultValue]}
                            onValueChange={(value) => updateParameter(key, value[0])}
                            max={defaultValue * 3}
                            min={defaultValue * 0.1}
                            step={defaultValue * 0.05}
                            className="w-full"
                          />
                          <span className="text-xs text-gray-500">
                            {(parameters[key] || defaultValue).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Explanation</h4>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {currentConcept.explanation}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      onComplete(selectedCourse.id, 100);
                      setCurrentConcept(null);
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    Complete Concept
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}