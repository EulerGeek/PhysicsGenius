import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Concept {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  prerequisites: string[];
  isCompleted: boolean;
  progress: number;
  icon: string;
  topics: string[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  concepts: Concept[];
}

interface ConceptMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onStartConcept: (courseId: string, conceptId: string) => void;
}

export default function ConceptMenu({ isOpen, onClose, onStartConcept }: ConceptMenuProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courses: Course[] = [
    {
      id: 'classical-mechanics',
      title: 'Classical Mechanics',
      description: 'Master the fundamentals of motion, forces, and energy',
      color: 'from-blue-500 to-blue-700',
      icon: '🍎',
      concepts: [
        {
          id: 'kinematics',
          title: 'Kinematics',
          description: 'Study motion without considering forces',
          difficulty: 'beginner',
          estimatedTime: '45 min',
          prerequisites: [],
          isCompleted: false,
          progress: 0,
          icon: '🏃',
          topics: ['Position', 'Velocity', 'Acceleration', 'Motion Graphs', 'Projectile Motion']
        },
        {
          id: 'forces',
          title: 'Forces and Newton\'s Laws',
          description: 'Understand how forces cause motion',
          difficulty: 'beginner',
          estimatedTime: '60 min',
          prerequisites: ['kinematics'],
          isCompleted: false,
          progress: 0,
          icon: '💪',
          topics: ['Force', 'Newton\'s Laws', 'Free Body Diagrams', 'Friction', 'Tension']
        },
        {
          id: 'energy',
          title: 'Energy and Work',
          description: 'Explore the relationship between work and energy',
          difficulty: 'intermediate',
          estimatedTime: '50 min',
          prerequisites: ['forces'],
          isCompleted: false,
          progress: 0,
          icon: '⚡',
          topics: ['Work', 'Kinetic Energy', 'Potential Energy', 'Conservation of Energy', 'Power']
        },
        {
          id: 'momentum',
          title: 'Momentum and Collisions',
          description: 'Study conservation of momentum in collisions',
          difficulty: 'intermediate',
          estimatedTime: '55 min',
          prerequisites: ['energy'],
          isCompleted: false,
          progress: 0,
          icon: '💥',
          topics: ['Momentum', 'Impulse', 'Elastic Collisions', 'Inelastic Collisions', 'Center of Mass']
        },
        {
          id: 'rotation',
          title: 'Rotational Motion',
          description: 'Understand rotation and angular motion',
          difficulty: 'advanced',
          estimatedTime: '70 min',
          prerequisites: ['momentum'],
          isCompleted: false,
          progress: 0,
          icon: '🌀',
          topics: ['Angular Velocity', 'Torque', 'Rotational Inertia', 'Angular Momentum', 'Rolling Motion']
        }
      ]
    },
    {
      id: 'general-relativity',
      title: 'General Relativity',
      description: 'Explore Einstein\'s theory of gravity and spacetime',
      color: 'from-purple-500 to-purple-700',
      icon: '🌌',
      concepts: [
        {
          id: 'special-relativity',
          title: 'Special Relativity',
          description: 'Foundation concepts of space and time',
          difficulty: 'intermediate',
          estimatedTime: '60 min',
          prerequisites: [],
          isCompleted: false,
          progress: 0,
          icon: '⚡',
          topics: ['Time Dilation', 'Length Contraction', 'Lorentz Transformation', 'Mass-Energy Equivalence']
        },
        {
          id: 'spacetime',
          title: 'Spacetime Geometry',
          description: 'Understanding curved spacetime',
          difficulty: 'advanced',
          estimatedTime: '75 min',
          prerequisites: ['special-relativity'],
          isCompleted: false,
          progress: 0,
          icon: '📐',
          topics: ['Minkowski Space', 'Curvature', 'Geodesics', 'Metric Tensor']
        },
        {
          id: 'black-holes',
          title: 'Black Holes',
          description: 'Explore the most extreme objects in the universe',
          difficulty: 'advanced',
          estimatedTime: '80 min',
          prerequisites: ['spacetime'],
          isCompleted: false,
          progress: 0,
          icon: '🕳️',
          topics: ['Event Horizon', 'Schwarzschild Radius', 'Hawking Radiation', 'Singularities']
        }
      ]
    },
    {
      id: 'quantum-mechanics',
      title: 'Quantum Mechanics',
      description: 'Dive into the strange world of quantum physics',
      color: 'from-green-500 to-green-700',
      icon: '⚛️',
      concepts: [
        {
          id: 'wave-particle',
          title: 'Wave-Particle Duality',
          description: 'The fundamental nature of quantum objects',
          difficulty: 'beginner',
          estimatedTime: '50 min',
          prerequisites: [],
          isCompleted: false,
          progress: 0,
          icon: '🌊',
          topics: ['Photons', 'De Broglie Wavelength', 'Double-Slit Experiment', 'Complementarity']
        },
        {
          id: 'uncertainty',
          title: 'Uncertainty Principle',
          description: 'Heisenberg\'s famous principle',
          difficulty: 'intermediate',
          estimatedTime: '45 min',
          prerequisites: ['wave-particle'],
          isCompleted: false,
          progress: 0,
          icon: '❓',
          topics: ['Position-Momentum Uncertainty', 'Energy-Time Uncertainty', 'Measurement Problem']
        },
        {
          id: 'schrodinger',
          title: 'Schrödinger Equation',
          description: 'The fundamental equation of quantum mechanics',
          difficulty: 'advanced',
          estimatedTime: '90 min',
          prerequisites: ['uncertainty'],
          isCompleted: false,
          progress: 0,
          icon: '🧮',
          topics: ['Wave Function', 'Probability Density', 'Operators', 'Eigenvalues', 'Time Evolution']
        }
      ]
    }
  ];

  const handleStartConcept = (courseId: string, conceptId: string) => {
    onStartConcept(courseId, conceptId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 overflow-y-auto">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🎯 Physics Concepts</h1>
                <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                  Interactive Learning Path
                </Badge>
              </div>
              <Button
                variant="outline"
                onClick={onClose}
                className="border-2 border-gray-300 dark:border-gray-600 hover:border-red-400 dark:hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl px-6 py-3"
              >
                <span className="text-lg mr-2">✕</span>
                Close
              </Button>
            </div>
          </div>
        </div>

        {/* Course Selection */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {!selectedCourse ? (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Choose Your Physics Journey 🚀
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Master physics through interactive, bite-sized concepts. Each course builds progressively 
                  with hands-on exercises, visual simulations, and AI-powered discussions.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <Card 
                    key={course.id}
                    className="cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-gray-200 dark:border-gray-600 rounded-2xl overflow-hidden"
                    onClick={() => setSelectedCourse(course.id)}
                  >
                    <CardHeader className={`bg-gradient-to-r ${course.color} text-white p-6`}>
                      <div className="text-center">
                        <div className="text-6xl mb-4">{course.icon}</div>
                        <CardTitle className="text-2xl font-bold">{course.title}</CardTitle>
                        <p className="text-lg opacity-90 mt-2">{course.description}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 bg-white dark:bg-gray-800">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Concepts: {course.concepts.length}
                          </span>
                          <Badge variant="outline" className="border-green-300 text-green-700 dark:border-green-600 dark:text-green-400">
                            Free
                          </Badge>
                        </div>
                        <Progress value={0} className="h-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Start your journey with {course.concepts[0]?.title}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            // Concept List for Selected Course
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCourse(null)}
                  className="rounded-xl"
                >
                  ← Back to Courses
                </Button>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {courses.find(c => c.id === selectedCourse)?.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {courses.find(c => c.id === selectedCourse)?.description}
                  </p>
                </div>
              </div>

              <div className="grid gap-6">
                {courses.find(c => c.id === selectedCourse)?.concepts.map((concept, index) => (
                  <Card 
                    key={concept.id}
                    className="border-2 border-gray-200 dark:border-gray-600 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <div className="text-5xl">{concept.icon}</div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {concept.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {concept.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {concept.topics.slice(0, 3).map((topic) => (
                                  <Badge 
                                    key={topic}
                                    variant="secondary" 
                                    className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                                  >
                                    {topic}
                                  </Badge>
                                ))}
                                {concept.topics.length > 3 && (
                                  <Badge variant="outline">
                                    +{concept.topics.length - 3} more
                                  </Badge>
                                )}
                              </div>

                              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                  ⏱️ {concept.estimatedTime}
                                </span>
                                <span className="flex items-center gap-1">
                                  📊 {concept.difficulty}
                                </span>
                                {concept.prerequisites.length > 0 && (
                                  <span className="flex items-center gap-1">
                                    🔗 Prerequisites: {concept.prerequisites.length}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="text-center">
                              <Button
                                onClick={() => handleStartConcept(selectedCourse, concept.id)}
                                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                              >
                                🚀 Start Learning
                              </Button>
                              
                              {concept.progress > 0 && (
                                <div className="mt-3">
                                  <Progress value={concept.progress} className="w-24 h-2" />
                                  <span className="text-xs text-gray-500 mt-1 block">
                                    {concept.progress}% complete
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}