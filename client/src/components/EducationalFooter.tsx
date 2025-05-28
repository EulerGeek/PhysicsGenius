import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EducationalFooterProps {
  isVisible?: boolean;
}

export default function EducationalFooter({ isVisible = true }: EducationalFooterProps) {
  const [selectedLecture, setSelectedLecture] = useState<string | null>(null);

  const feynmanLectures = [
    {
      volume: "Volume I: Mechanics, Radiation, and Heat",
      chapters: [
        { id: "1-1", title: "Atoms in Motion", description: "The fundamental nature of matter" },
        { id: "1-2", title: "Basic Physics", description: "Physics before 1920" },
        { id: "1-3", title: "The Relation of Physics to Other Sciences", description: "Interdisciplinary connections" },
        { id: "1-4", title: "Conservation of Energy", description: "The great conservation law" },
        { id: "1-8", title: "Motion", description: "Description of motion" },
        { id: "1-9", title: "Newton's Laws of Dynamics", description: "The laws governing motion" },
        { id: "1-10", title: "Conservation of Momentum", description: "Another conservation law" },
        { id: "1-11", title: "Vectors", description: "Mathematical tools for physics" },
        { id: "1-12", title: "Characteristics of Force", description: "What forces do" },
        { id: "1-13", title: "Work and Potential Energy", description: "Energy in mechanical systems" }
      ]
    },
    {
      volume: "Volume II: Electromagnetic Field",
      chapters: [
        { id: "2-1", title: "Electrostatics", description: "Static electric fields" },
        { id: "2-2", title: "The Electric Field", description: "Field concept in physics" },
        { id: "2-3", title: "Electrical Potential", description: "Energy and electric fields" },
        { id: "2-4", title: "Electrostatic Energy", description: "Energy stored in fields" },
        { id: "2-5", title: "Conductors", description: "Materials and electricity" },
        { id: "2-6", title: "Dielectrics", description: "Insulating materials" },
        { id: "2-13", title: "Magnetostatics", description: "Static magnetic fields" },
        { id: "2-15", title: "The Vector Potential", description: "Mathematical description of magnetism" }
      ]
    },
    {
      volume: "Volume III: Quantum Mechanics",
      chapters: [
        { id: "3-1", title: "Quantum Behavior", description: "The strange world of quantum mechanics" },
        { id: "3-2", title: "The Relation of Wave and Particle Viewpoints", description: "Wave-particle duality" },
        { id: "3-3", title: "Probability Amplitudes", description: "The heart of quantum mechanics" },
        { id: "3-4", title: "Identical Particles", description: "Quantum statistics" },
        { id: "3-8", title: "The Hamiltonian Matrix", description: "Energy in quantum systems" },
        { id: "3-9", title: "The Ammonia Maser", description: "Quantum mechanics in action" },
        { id: "3-11", title: "More Two-State Systems", description: "Simple quantum systems" }
      ]
    }
  ];

  const sampleProblems = [
    {
      title: "Classical Mechanics: Projectile Motion",
      problem: "A ball is thrown at 45° with initial speed 20 m/s. Find the maximum height and range.",
      solution: "Max height: h = v₀²sin²θ/(2g) = (20)²(0.707)²/(2×9.8) = 10.2 m\nRange: R = v₀²sin(2θ)/g = (20)²sin(90°)/9.8 = 40.8 m",
      difficulty: "Medium",
      topic: "Kinematics"
    },
    {
      title: "Electromagnetism: Electric Field",
      problem: "Find the electric field at the center of a square with charges +q at each corner (side length a).",
      solution: "By symmetry, the net field is zero. Each charge creates field E = kq/r² toward center, but opposite charges cancel out perfectly.",
      difficulty: "Hard",
      topic: "Electrostatics"
    },
    {
      title: "Quantum Mechanics: Energy Levels",
      problem: "An electron in a 1D infinite potential well (width L). Find the ground state energy.",
      solution: "E₁ = π²ℏ²/(2mL²) where m is electron mass. For L = 1 nm: E₁ ≈ 0.38 eV",
      difficulty: "Hard",
      topic: "Quantum Wells"
    },
    {
      title: "Thermodynamics: Ideal Gas",
      problem: "1 mole of ideal gas expands isothermally at 300K from 1L to 2L. Find work done.",
      solution: "W = nRT ln(Vf/Vi) = (1)(8.314)(300)ln(2) = 1729 J",
      difficulty: "Medium",
      topic: "Thermodynamics"
    }
  ];

  const additionalCourses = [
    {
      title: "Thermodynamics & Statistical Mechanics",
      description: "Heat, entropy, and molecular theory",
      topics: ["Laws of Thermodynamics", "Heat Engines", "Statistical Distributions", "Phase Transitions"],
      icon: "🌡️",
      difficulty: "Advanced"
    },
    {
      title: "Optics & Wave Physics",
      description: "Light, waves, and optical phenomena",
      topics: ["Wave Interference", "Diffraction", "Polarization", "Laser Physics"],
      icon: "🌈",
      difficulty: "Intermediate"
    },
    {
      title: "Atomic & Nuclear Physics",
      description: "Structure of atoms and nuclei",
      topics: ["Atomic Structure", "Radioactivity", "Nuclear Reactions", "Particle Physics"],
      icon: "⚛️",
      difficulty: "Advanced"
    },
    {
      title: "Solid State Physics",
      description: "Physics of materials and crystals",
      topics: ["Crystal Structure", "Band Theory", "Semiconductors", "Superconductivity"],
      icon: "💎",
      difficulty: "Advanced"
    },
    {
      title: "Astrophysics & Cosmology",
      description: "Physics of stars, galaxies, and universe",
      topics: ["Stellar Evolution", "Black Holes", "Big Bang Theory", "Dark Matter"],
      icon: "🌌",
      difficulty: "Advanced"
    },
    {
      title: "Biophysics",
      description: "Physical principles in biological systems",
      topics: ["Biomechanics", "Molecular Motors", "Membrane Physics", "Neural Networks"],
      icon: "🧬",
      difficulty: "Intermediate"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700 mt-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-6">
        <Tabs defaultValue="feynman" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-3 sm:mb-6 h-8 sm:h-10">
            <TabsTrigger value="feynman" className="text-[8px] sm:text-xs">📚 Feynman Lectures</TabsTrigger>
            <TabsTrigger value="problems" className="text-[8px] sm:text-xs">🧮 Sample Problems</TabsTrigger>
            <TabsTrigger value="courses" className="text-[8px] sm:text-xs">🎓 More Courses</TabsTrigger>
            <TabsTrigger value="resources" className="text-[8px] sm:text-xs">🔗 Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="feynman" className="space-y-2 sm:space-y-4">
            <div className="text-center mb-2 sm:mb-4">
              <h3 className="text-sm sm:text-lg md:text-xl font-bold text-blue-700 dark:text-blue-300 mb-1 sm:mb-2">
                📖 The Feynman Lectures on Physics
              </h3>
              <p className="text-[8px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Complete collection from Caltech - Interactive physics education by Nobel laureate Richard Feynman
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
              {feynmanLectures.map((volume, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-1 sm:pb-2">
                    <CardTitle className="text-[10px] sm:text-sm md:text-base">{volume.volume}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 sm:space-y-2">
                    {volume.chapters.slice(0, 5).map((chapter) => (
                      <div key={chapter.id} className="p-1 sm:p-2 bg-gray-50 dark:bg-gray-800 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-[8px] sm:text-xs">{chapter.title}</h4>
                            <p className="text-[7px] sm:text-xs text-gray-600 dark:text-gray-400">{chapter.description}</p>
                          </div>
                          <Badge variant="secondary" className="text-[6px] sm:text-xs">Ch {chapter.id.split('-')[1]}</Badge>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-[8px] sm:text-xs"
                      onClick={() => window.open('https://www.feynmanlectures.caltech.edu/', '_blank')}
                    >
                      📖 Read Full Volume
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="problems" className="space-y-2 sm:space-y-4">
            <div className="text-center mb-2 sm:mb-4">
              <h3 className="text-sm sm:text-lg md:text-xl font-bold text-green-700 dark:text-green-300 mb-1 sm:mb-2">
                🧮 Physics Problem Examples
              </h3>
              <p className="text-[8px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Step-by-step solutions to classic physics problems
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
              {sampleProblems.map((problem, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-1 sm:pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-[10px] sm:text-sm md:text-base">{problem.title}</CardTitle>
                      <div className="flex gap-1">
                        <Badge variant={problem.difficulty === 'Hard' ? 'destructive' : problem.difficulty === 'Medium' ? 'default' : 'secondary'} className="text-[6px] sm:text-xs">
                          {problem.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-[6px] sm:text-xs">{problem.topic}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 sm:space-y-3">
                    <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <h4 className="font-semibold text-[8px] sm:text-xs mb-1">Problem:</h4>
                      <p className="text-[7px] sm:text-xs">{problem.problem}</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded">
                      <h4 className="font-semibold text-[8px] sm:text-xs mb-1">Solution:</h4>
                      <pre className="text-[7px] sm:text-xs whitespace-pre-wrap font-mono">{problem.solution}</pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-2 sm:space-y-4">
            <div className="text-center mb-2 sm:mb-4">
              <h3 className="text-sm sm:text-lg md:text-xl font-bold text-purple-700 dark:text-purple-300 mb-1 sm:mb-2">
                🎓 Advanced Physics Courses
              </h3>
              <p className="text-[8px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Explore specialized areas of physics beyond the core curriculum
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
              {additionalCourses.map((course, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader className="pb-1 sm:pb-2">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-lg sm:text-2xl">{course.icon}</span>
                      <div>
                        <CardTitle className="text-[10px] sm:text-sm md:text-base">{course.title}</CardTitle>
                        <Badge variant="outline" className="text-[6px] sm:text-xs mt-1">{course.difficulty}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[8px] sm:text-xs text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">{course.description}</p>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-[8px] sm:text-xs">Key Topics:</h4>
                      <div className="flex flex-wrap gap-1">
                        {course.topics.map((topic, topicIdx) => (
                          <Badge key={topicIdx} variant="secondary" className="text-[6px] sm:text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2 sm:mt-3 text-[8px] sm:text-xs">
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-2 sm:space-y-4">
            <div className="text-center mb-2 sm:mb-4">
              <h3 className="text-sm sm:text-lg md:text-xl font-bold text-orange-700 dark:text-orange-300 mb-1 sm:mb-2">
                🔗 Learning Resources
              </h3>
              <p className="text-[8px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Additional resources for deep physics understanding
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-2 sm:p-4 text-center">
                  <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">📖</div>
                  <h4 className="font-semibold text-[10px] sm:text-sm mb-1">Feynman Lectures</h4>
                  <p className="text-[8px] sm:text-xs text-gray-600 dark:text-gray-400 mb-2">Complete online version</p>
                  <Button variant="outline" size="sm" className="text-[8px] sm:text-xs" onClick={() => window.open('https://www.feynmanlectures.caltech.edu/', '_blank')}>
                    Visit Site
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-2 sm:p-4 text-center">
                  <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">🎥</div>
                  <h4 className="font-semibold text-[10px] sm:text-sm mb-1">MIT OpenCourseWare</h4>
                  <p className="text-[8px] sm:text-xs text-gray-600 dark:text-gray-400 mb-2">Free physics courses</p>
                  <Button variant="outline" size="sm" className="text-[8px] sm:text-xs" onClick={() => window.open('https://ocw.mit.edu/courses/physics/', '_blank')}>
                    Browse Courses
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-2 sm:p-4 text-center">
                  <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">📚</div>
                  <h4 className="font-semibold text-[10px] sm:text-sm mb-1">Khan Academy</h4>
                  <p className="text-[8px] sm:text-xs text-gray-600 dark:text-gray-400 mb-2">Interactive physics lessons</p>
                  <Button variant="outline" size="sm" className="text-[8px] sm:text-xs" onClick={() => window.open('https://www.khanacademy.org/science/physics', '_blank')}>
                    Learn Physics
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-2 sm:p-4 text-center">
                  <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">🔬</div>
                  <h4 className="font-semibold text-[10px] sm:text-sm mb-1">Physics Simulations</h4>
                  <p className="text-[8px] sm:text-xs text-gray-600 dark:text-gray-400 mb-2">Interactive experiments</p>
                  <Button variant="outline" size="sm" className="text-[8px] sm:text-xs" onClick={() => window.open('https://phet.colorado.edu/en/simulations/category/physics', '_blank')}>
                    Explore PhET
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}