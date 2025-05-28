import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavigationMenu from './NavigationMenu';
import Visual3DCourses from './Visual3DCourses';

interface ConceptsPageProps {
  onStartConcept: (courseId: string, conceptId: string) => void;
  onNavigate?: (page: string) => void;
  progress?: any;
}

export default function ConceptsPage({ onStartConcept, onNavigate, progress }: ConceptsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("physics");
  const [showVisual3DCourses, setShowVisual3DCourses] = useState(false);

  const physicsConceptCategories = [
    {
      id: "mechanics",
      title: "Classical Mechanics",
      icon: "⚙️",
      description: "Motion, forces, and energy",
      color: "bg-amber-50 border-amber-200",
      concepts: [
        {
          id: "kinematics",
          title: "Kinematics",
          description: "Study of motion without considering forces",
          difficulty: "Beginner",
          duration: "15 min",
          keyPoints: ["Position", "Velocity", "Acceleration", "Time"]
        },
        {
          id: "dynamics",
          title: "Dynamics", 
          description: "Forces and their effects on motion",
          difficulty: "Intermediate",
          duration: "20 min",
          keyPoints: ["Newton's Laws", "Force", "Mass", "Acceleration"]
        },
        {
          id: "energy",
          title: "Energy & Work",
          description: "Energy conservation and work-energy theorem",
          difficulty: "Intermediate", 
          duration: "18 min",
          keyPoints: ["Kinetic Energy", "Potential Energy", "Work", "Conservation"]
        },
        {
          id: "momentum",
          title: "Momentum",
          description: "Conservation of momentum and collisions",
          difficulty: "Intermediate",
          duration: "16 min", 
          keyPoints: ["Linear Momentum", "Impulse", "Collisions", "Conservation"]
        }
      ]
    },
    {
      id: "electromagnetics",
      title: "Electromagnetic Fields",
      icon: "⚡",
      description: "Electric and magnetic phenomena",
      color: "bg-green-50 border-green-200",
      concepts: [
        {
          id: "electrostatics",
          title: "Electrostatics",
          description: "Static electric fields and charges",
          difficulty: "Intermediate",
          duration: "22 min",
          keyPoints: ["Electric Charge", "Electric Field", "Potential", "Gauss's Law"]
        },
        {
          id: "magnetism",
          title: "Magnetism",
          description: "Magnetic fields and their sources",
          difficulty: "Intermediate", 
          duration: "20 min",
          keyPoints: ["Magnetic Field", "Lorentz Force", "Ampère's Law", "Induction"]
        },
        {
          id: "waves",
          title: "Electromagnetic Waves",
          description: "Light and electromagnetic radiation",
          difficulty: "Advanced",
          duration: "25 min",
          keyPoints: ["Maxwell Equations", "Wave Propagation", "Spectrum", "Polarization"]
        }
      ]
    },
    {
      id: "modern",
      title: "Modern Physics",
      icon: "🔬",
      description: "Relativity and quantum mechanics",
      color: "bg-amber-50 border-amber-200",
      concepts: [
        {
          id: "relativity",
          title: "Special Relativity",
          description: "Space, time, and the speed of light",
          difficulty: "Advanced",
          duration: "30 min",
          keyPoints: ["Time Dilation", "Length Contraction", "Mass-Energy", "Spacetime"]
        },
        {
          id: "quantum",
          title: "Quantum Mechanics",
          description: "The physics of atoms and particles",
          difficulty: "Advanced",
          duration: "35 min",
          keyPoints: ["Wave-Particle Duality", "Uncertainty", "Superposition", "Entanglement"]
        },
        {
          id: "atomic",
          title: "Atomic Physics",
          description: "Structure and behavior of atoms",
          difficulty: "Advanced",
          duration: "28 min",
          keyPoints: ["Electron Orbitals", "Energy Levels", "Spectroscopy", "Laser Physics"]
        }
      ]
    }
  ];

  const mathConceptCategories = [
    {
      id: "algebra",
      title: "Algebra",
      icon: "📐",
      description: "Equations and functions", 
      color: "bg-green-50 border-green-200",
      concepts: [
        {
          id: "linear-equations",
          title: "Linear Equations",
          description: "Solving equations with one variable",
          difficulty: "Beginner",
          duration: "12 min",
          keyPoints: ["Variables", "Coefficients", "Solution Methods", "Applications"]
        },
        {
          id: "quadratic",
          title: "Quadratic Functions",
          description: "Parabolas and second-degree equations",
          difficulty: "Intermediate",
          duration: "18 min",
          keyPoints: ["Vertex Form", "Factoring", "Quadratic Formula", "Graphing"]
        },
        {
          id: "systems",
          title: "Systems of Equations",
          description: "Multiple equations with multiple variables",
          difficulty: "Intermediate",
          duration: "20 min",
          keyPoints: ["Substitution", "Elimination", "Graphical Method", "Applications"]
        }
      ]
    },
    {
      id: "calculus",
      title: "Calculus",
      icon: "∫",
      description: "Derivatives and integrals",
      color: "bg-slate-50 border-slate-200", 
      concepts: [
        {
          id: "limits",
          title: "Limits",
          description: "Approaching values and continuity",
          difficulty: "Intermediate",
          duration: "22 min",
          keyPoints: ["Definition", "Properties", "Continuity", "Infinite Limits"]
        },
        {
          id: "derivatives",
          title: "Derivatives",
          description: "Rates of change and slopes",
          difficulty: "Intermediate",
          duration: "25 min",
          keyPoints: ["Definition", "Rules", "Applications", "Optimization"]
        },
        {
          id: "integrals",
          title: "Integrals",
          description: "Areas under curves and accumulation",
          difficulty: "Advanced",
          duration: "28 min",
          keyPoints: ["Antiderivatives", "Fundamental Theorem", "Techniques", "Applications"]
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const currentCategories = selectedCategory === "physics" ? physicsConceptCategories : mathConceptCategories;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
      {/* Navigation Menu */}
      {onNavigate && progress && (
        <NavigationMenu currentPage="concepts" onNavigate={onNavigate} progress={progress} />
      )}
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-6">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            🎯 Interactive Concepts
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore fundamental concepts through interactive explanations, visualizations, and guided learning experiences
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full mb-4 sm:mb-6">
          <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 h-8 sm:h-10">
            <TabsTrigger value="physics" className="text-xs sm:text-sm">🔬 Physics Concepts</TabsTrigger>
            <TabsTrigger value="math" className="text-xs sm:text-sm">📐 Math Concepts</TabsTrigger>
          </TabsList>

          <TabsContent value="physics" className="space-y-4 sm:space-y-6">
            {physicsConceptCategories.map((category) => (
              <div key={category.id} className={`p-3 sm:p-6 rounded-lg ${category.color}`}>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">{category.icon}</span>
                  <div>
                    <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900">{category.title}</h2>
                    <p className="text-xs sm:text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {category.concepts.map((concept) => (
                    <Card key={concept.id} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
                      <CardHeader className="pb-2 sm:pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xs sm:text-sm md:text-base">{concept.title}</CardTitle>
                          <Badge className={`text-[8px] sm:text-xs ${getDifficultyColor(concept.difficulty)}`}>
                            {concept.difficulty}
                          </Badge>
                        </div>
                        <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">{concept.description}</p>
                      </CardHeader>
                      <CardContent className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-xs text-gray-500">
                          <span>⏱️ {concept.duration}</span>
                        </div>
                        
                        <div className="space-y-1 sm:space-y-2">
                          <h4 className="font-semibold text-[8px] sm:text-xs">Key Topics:</h4>
                          <div className="flex flex-wrap gap-1">
                            {concept.keyPoints.map((point, idx) => (
                              <Badge key={idx} variant="outline" className="text-[8px] sm:text-xs">
                                {point}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => onStartConcept(category.id, concept.id)}
                          className="w-full text-[8px] sm:text-xs"
                          size="sm"
                        >
                          🚀 Explore Concept
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="math" className="space-y-4 sm:space-y-6">
            {mathConceptCategories.map((category) => (
              <div key={category.id} className={`p-3 sm:p-6 rounded-lg ${category.color}`}>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">{category.icon}</span>
                  <div>
                    <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900">{category.title}</h2>
                    <p className="text-xs sm:text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {category.concepts.map((concept) => (
                    <Card key={concept.id} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
                      <CardHeader className="pb-2 sm:pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xs sm:text-sm md:text-base">{concept.title}</CardTitle>
                          <Badge className={`text-[8px] sm:text-xs ${getDifficultyColor(concept.difficulty)}`}>
                            {concept.difficulty}
                          </Badge>
                        </div>
                        <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">{concept.description}</p>
                      </CardHeader>
                      <CardContent className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-xs text-gray-500">
                          <span>⏱️ {concept.duration}</span>
                        </div>
                        
                        <div className="space-y-1 sm:space-y-2">
                          <h4 className="font-semibold text-[8px] sm:text-xs">Key Topics:</h4>
                          <div className="flex flex-wrap gap-1">
                            {concept.keyPoints.map((point, idx) => (
                              <Badge key={idx} variant="outline" className="text-[8px] sm:text-xs">
                                {point}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => onStartConcept(category.id, concept.id)}
                          className="w-full text-[8px] sm:text-xs"
                          size="sm"
                        >
                          🚀 Explore Concept
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* NEW: 3D Visual Courses Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl text-white shadow-2xl">
          <div className="text-center space-y-4">
            <div className="text-4xl animate-bounce">🎯</div>
            <h2 className="text-2xl md:text-3xl font-bold">3D Visual Physics Courses</h2>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Experience physics like never before with interactive 3D visualizations! Watch pendulums swing, 
              orbits form, waves propagate, and quantum particles dance in real-time simulations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl mb-2">⚙️</div>
                <h3 className="font-semibold">Classical Mechanics</h3>
                <p className="text-sm text-purple-100">Pendulums, springs, orbital motion</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl mb-2">🌊</div>
                <h3 className="font-semibold">Wave Physics</h3>
                <p className="text-sm text-purple-100">Wave propagation and interference</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-semibold">Electromagnetic Fields</h3>
                <p className="text-sm text-purple-100">Electric fields and force lines</p>
              </div>
            </div>

            <Button 
              onClick={() => setShowVisual3DCourses(true)}
              className="mt-6 bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              🚀 Launch 3D Physics Experience
            </Button>
          </div>
        </div>
      </div>

      {/* 3D Visual Courses Modal */}
      {showVisual3DCourses && (
        <Visual3DCourses
          isOpen={showVisual3DCourses}
          onClose={() => setShowVisual3DCourses(false)}
          onComplete={(courseId: string, score: number) => {
            console.log(`Completed 3D course ${courseId} with score ${score}`);
            setShowVisual3DCourses(false);
          }}
        />
      )}
    </div>
  );
}