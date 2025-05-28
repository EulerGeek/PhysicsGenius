import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function FeynmanLecturesPage() {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [readingMode, setReadingMode] = useState(false);

  const feynmanVolumes = [
    {
      id: "volume1",
      title: "Volume I: Mechanics, Radiation, and Heat",
      description: "The fundamental principles of physics - motion, forces, energy, and thermodynamics",
      color: "from-blue-500 to-cyan-500",
      chapters: [
        {
          id: "1-1",
          title: "Atoms in Motion",
          description: "All things are made of atoms - little particles that move around in perpetual motion, attracting each other when they are a little distance apart, but repelling upon being squeezed into one another.",
          topics: ["Atomic Theory", "States of Matter", "Molecular Motion"],
          duration: "45 min",
          difficulty: "Beginner",
          content: `
# Chapter 1-1: Atoms in Motion

*"If, in some cataclysm, all of scientific knowledge were to be destroyed, and only one sentence passed on to the next generations of creatures, what statement would contain the most information in the fewest words? I believe it is the atomic hypothesis (or the atomic fact, or whatever you wish to call it) that all things are made of atoms—little particles that move around in perpetual motion, attracting each other when they are a little distance apart, but repelling upon being squeezed into one another."*

## Introduction

This is our first venture into the world of physics. We begin with one of the most important concepts in all of science: the atomic theory of matter. This single idea, properly understood, contains an enormous amount of information about the world around us.

## The Atomic Hypothesis

Everything is made of atoms. This seems like a simple statement, but let us explore what it means. Atoms are extremely small particles, far too small to see with the naked eye or even with ordinary microscopes. Yet these tiny building blocks make up everything we see around us—the air we breathe, the water we drink, the food we eat, our own bodies.

### What Are Atoms Like?

Imagine atoms as tiny spheres, constantly in motion. They attract each other when they are a small distance apart, but if you try to squeeze them too close together, they repel each other strongly. This simple picture can explain an enormous number of phenomena.

## States of Matter

Let's consider water as an example. In ice, the water molecules (each made of two hydrogen atoms and one oxygen atom) are locked in a rigid pattern, vibrating in place but not moving around much. As we heat the ice, the molecules vibrate more and more until they break free from their rigid positions—the ice melts into liquid water.

In liquid water, the molecules are still close together and attracting each other, but they can slide past one another. They are in constant motion, jiggling and tumbling about.

If we heat the water further, the molecules move so fast that they overcome the attractive forces entirely and escape into the air as water vapor or steam. In this gaseous state, the molecules are flying around freely, only occasionally bumping into each other.

## Brownian Motion

One of the most beautiful demonstrations of atomic motion was discovered by the botanist Robert Brown in 1827. When he looked at tiny pollen grains suspended in water under a microscope, he saw them jiggling around in an irregular, never-ending dance.

This motion, now called Brownian motion, is caused by the water molecules constantly bombarding the pollen grains from all sides. Since the bombardment is random, sometimes more molecules hit one side than the other, causing the grain to move. This was one of the first direct pieces of evidence for the reality of atoms and their constant motion.

## Chemical Reactions

The atomic theory also explains chemical reactions. When we burn wood, for example, the complex molecules that make up the wood (mostly cellulose) combine with oxygen molecules from the air. The atoms rearrange themselves into new combinations—carbon dioxide and water vapor—which escape into the air. The atoms themselves are not destroyed; they simply form new partnerships.

## The Salt Crystal

Consider a crystal of salt. If we could see the individual atoms, we would find them arranged in a perfectly regular pattern: sodium atoms and chlorine atoms alternating in a three-dimensional checkerboard. The forces between these atoms hold the crystal together and give it its characteristic cubic shape.

When we dissolve salt in water, the water molecules surround the sodium and chlorine atoms and pull them away from the crystal structure. The atoms don't disappear—they're still there, just spread throughout the water instead of being locked in the crystal.

## Conclusion

The atomic hypothesis is the key that unlocks our understanding of the physical world. From this one idea—that matter is made of atoms in constant motion—we can understand phase changes, chemical reactions, the behavior of gases, and countless other phenomena.

In the words of Richard Feynman: "The world is a dynamic mess of jiggling things." This jiggling, this constant atomic motion, is the hidden reality behind all the apparent stillness and solidity of the world around us.

As we continue our study of physics, we will return again and again to this fundamental insight. Whether we are studying heat, pressure, chemical bonds, or the properties of materials, we will find that the behavior of atoms provides the underlying explanation.

Remember: everything is made of atoms, and atoms are always moving. From this simple truth flows much of our understanding of the natural world.
          `
        },
        {
          id: "1-2", 
          title: "Basic Physics",
          description: "What physics is about and how it relates to other sciences. The scientific method and the nature of physical laws.",
          topics: ["Scientific Method", "Physical Laws", "Measurement"],
          duration: "35 min",
          difficulty: "Beginner"
        },
        {
          id: "1-3",
          title: "The Relation of Physics to Other Sciences",
          description: "How physics connects to chemistry, biology, astronomy, geology, psychology, and other fields of human knowledge.",
          topics: ["Interdisciplinary Science", "Reductionism", "Emergence"],
          duration: "40 min",
          difficulty: "Beginner"
        },
        {
          id: "1-4",
          title: "Conservation of Energy",
          description: "The great conservation principle - energy cannot be created or destroyed, only transformed from one form to another.",
          topics: ["Energy Conservation", "Kinetic Energy", "Potential Energy", "Work"],
          duration: "50 min",
          difficulty: "Intermediate"
        },
        {
          id: "1-8",
          title: "Motion",
          description: "The description of motion - position, velocity, acceleration, and how they relate to each other mathematically.",
          topics: ["Kinematics", "Velocity", "Acceleration", "Derivatives"],
          duration: "55 min",
          difficulty: "Intermediate"
        },
        {
          id: "1-9",
          title: "Newton's Laws of Dynamics",
          description: "The three fundamental laws that govern all motion in the classical world, from falling apples to orbiting planets.",
          topics: ["Newton's Laws", "Force", "Mass", "Inertia"],
          duration: "60 min",
          difficulty: "Intermediate"
        },
        {
          id: "1-10",
          title: "Conservation of Momentum",
          description: "Another great conservation law - the total momentum of an isolated system remains constant over time.",
          topics: ["Momentum", "Impulse", "Collisions", "Conservation Laws"],
          duration: "45 min",
          difficulty: "Intermediate"
        }
      ]
    },
    {
      id: "volume2",
      title: "Volume II: The Electromagnetic Field",
      description: "Electricity, magnetism, and the electromagnetic field - the foundation of modern technology",
      color: "from-yellow-500 to-orange-500",
      chapters: [
        {
          id: "2-1",
          title: "Electrostatics",
          description: "The study of electric charges at rest - Coulomb's law, electric fields, and the principles that govern static electricity.",
          topics: ["Electric Charge", "Coulomb's Law", "Electric Field", "Gauss's Law"],
          duration: "50 min",
          difficulty: "Intermediate"
        },
        {
          id: "2-2",
          title: "The Electric Field",
          description: "A revolutionary concept - the idea that charges create fields in space that can exert forces on other charges.",
          topics: ["Field Concept", "Field Lines", "Superposition", "Point Charges"],
          duration: "45 min",
          difficulty: "Intermediate"
        },
        {
          id: "2-4",
          title: "Electrostatic Energy",
          description: "The energy stored in electric fields and how it relates to the work needed to assemble configurations of charges.",
          topics: ["Electric Potential Energy", "Energy Density", "Capacitors", "Field Energy"],
          duration: "55 min",
          difficulty: "Advanced"
        },
        {
          id: "2-13",
          title: "Magnetostatics",
          description: "Magnetic fields produced by steady currents - the magnetic analog of electrostatics.",
          topics: ["Magnetic Field", "Current Sources", "Ampère's Law", "Magnetic Dipoles"],
          duration: "50 min",
          difficulty: "Advanced"
        },
        {
          id: "2-18",
          title: "The Maxwell Equations",
          description: "The four equations that describe all of electromagnetism - arguably the most beautiful equations in physics.",
          topics: ["Maxwell's Equations", "Electromagnetic Waves", "Light", "Field Unification"],
          duration: "70 min",
          difficulty: "Advanced"
        }
      ]
    },
    {
      id: "volume3",
      title: "Volume III: Quantum Mechanics", 
      description: "The strange and wonderful world of quantum physics - where particles behave like waves",
      color: "from-purple-500 to-pink-500",
      chapters: [
        {
          id: "3-1",
          title: "Quantum Behavior",
          description: "The mysterious behavior of matter and light at the atomic scale - the double-slit experiment and wave-particle duality.",
          topics: ["Wave-Particle Duality", "Double-Slit Experiment", "Probability", "Quantum Superposition"],
          duration: "60 min",
          difficulty: "Advanced"
        },
        {
          id: "3-2",
          title: "The Relation of Wave and Particle Viewpoints",
          description: "How to reconcile the seemingly contradictory wave and particle descriptions of quantum objects.",
          topics: ["Complementarity", "De Broglie Waves", "Uncertainty Principle", "Wave Functions"],
          duration: "55 min",
          difficulty: "Advanced"
        },
        {
          id: "3-3",
          title: "Probability Amplitudes",
          description: "The heart of quantum mechanics - complex probability amplitudes that determine the likelihood of quantum events.",
          topics: ["Probability Amplitudes", "Complex Numbers", "Interference", "Quantum States"],
          duration: "65 min",
          difficulty: "Advanced"
        },
        {
          id: "3-8",
          title: "The Hamiltonian Matrix",
          description: "How energy and time evolution work in quantum mechanics - the Schrödinger equation in matrix form.",
          topics: ["Hamiltonian", "Energy Eigenstates", "Time Evolution", "Matrix Mechanics"],
          duration: "70 min",
          difficulty: "Expert"
        },
        {
          id: "3-11",
          title: "More Two-State Systems",
          description: "Simple quantum systems with just two possible states - the building blocks for understanding quantum computation.",
          topics: ["Two-Level Systems", "Spin", "Polarization", "Quantum Bits"],
          duration: "50 min",
          difficulty: "Advanced"
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 border-green-300";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Advanced": return "bg-orange-100 text-orange-800 border-orange-300";
      case "Expert": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-12">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl sm:text-2xl">🎓</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                The Feynman Lectures on Physics
              </h1>
              <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
                "If you want to learn about nature, to appreciate nature, it is necessary to understand the language that she speaks in."
              </p>
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              These lectures by Nobel Prize winner <strong>Richard Feynman</strong> are considered among the finest physics 
              textbooks ever written. Originally delivered at Caltech from 1961-1963, they present physics with 
              unmatched clarity, insight, and infectious enthusiasm for understanding the natural world.
            </p>
          </div>
        </div>

        {/* Volume Tabs */}
        <Tabs defaultValue="volume1" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8 h-12 sm:h-14 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger value="volume1" className="text-xs sm:text-sm font-medium">
              📚 Volume I
            </TabsTrigger>
            <TabsTrigger value="volume2" className="text-xs sm:text-sm font-medium">
              ⚡ Volume II
            </TabsTrigger>
            <TabsTrigger value="volume3" className="text-xs sm:text-sm font-medium">
              🔬 Volume III
            </TabsTrigger>
          </TabsList>

          {feynmanVolumes.map((volume) => (
            <TabsContent key={volume.id} value={volume.id} className="space-y-4 sm:space-y-6">
              {/* Volume Header */}
              <div className={`bg-gradient-to-r ${volume.color} rounded-2xl p-4 sm:p-8 text-white shadow-2xl`}>
                <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3">{volume.title}</h2>
                <p className="text-sm sm:text-lg opacity-90 max-w-3xl">{volume.description}</p>
                <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {volume.chapters.length} Chapters
                  </Badge>
                  <Button 
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    onClick={() => window.open('https://feynmanlectures.caltech.edu/', '_blank')}
                  >
                    📖 Read on Caltech Site
                  </Button>
                </div>
              </div>

              {/* Chapters Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {volume.chapters.map((chapter) => (
                  <Card 
                    key={chapter.id} 
                    className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50"
                  >
                    <CardHeader className="pb-3 sm:pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="text-xs font-mono">
                          Chapter {chapter.id}
                        </Badge>
                        <Badge className={`text-xs ${getDifficultyColor(chapter.difficulty)}`}>
                          {chapter.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-sm sm:text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {chapter.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-3 sm:space-y-4">
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {chapter.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                        <span>⏱️ {chapter.duration}</span>
                        <span>•</span>
                        <span>📚 Interactive</span>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-xs sm:text-sm">Key Topics:</h4>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {chapter.topics.map((topic, idx) => (
                            <Badge 
                              key={idx} 
                              variant="outline" 
                              className="text-[10px] sm:text-xs bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          className="flex-1 text-xs sm:text-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          onClick={() => {
                            setSelectedChapter(chapter.id);
                            setReadingMode(true);
                          }}
                        >
                          📖 Read Chapter
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs sm:text-sm"
                          onClick={() => setSelectedChapter(selectedChapter === chapter.id ? null : chapter.id)}
                        >
                          {selectedChapter === chapter.id ? '🔽' : 'ℹ️'}
                        </Button>
                      </div>
                      
                      {selectedChapter === chapter.id && !readingMode && (
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                          <h5 className="font-semibold text-sm mb-2">Chapter Summary:</h5>
                          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-3">
                            {chapter.description}
                          </p>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            <strong>Key Topics Covered:</strong>
                            <ul className="mt-2 space-y-1 ml-4">
                              {chapter.topics.map((topic, idx) => (
                                <li key={idx}>• {topic}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Reading Mode Modal */}
        {readingMode && selectedChapter && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Reader Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-heading font-bold">
                      {feynmanVolumes.flatMap(v => v.chapters).find(ch => ch.id === selectedChapter)?.title}
                    </h2>
                    <p className="text-sm opacity-90">
                      The Feynman Lectures on Physics
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setReadingMode(false);
                      setSelectedChapter(null);
                    }}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    ✕ Close
                  </Button>
                </div>
              </div>

              {/* Reader Content */}
              <ScrollArea className="h-[calc(90vh-120px)]">
                <div className="p-6 sm:p-8">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {feynmanVolumes.flatMap(v => v.chapters).find(ch => ch.id === selectedChapter)?.content?.split('\n').map((line, idx) => {
                      if (line.startsWith('# ')) {
                        return <h1 key={idx} className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-6">{line.substring(2)}</h1>;
                      } else if (line.startsWith('## ')) {
                        return <h2 key={idx} className="font-heading text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">{line.substring(3)}</h2>;
                      } else if (line.startsWith('### ')) {
                        return <h3 key={idx} className="font-heading text-xl font-medium text-gray-700 dark:text-gray-300 mt-6 mb-3">{line.substring(4)}</h3>;
                      } else if (line.startsWith('*') && line.endsWith('*')) {
                        return <p key={idx} className="italic text-gray-600 dark:text-gray-400 my-4 pl-4 border-l-4 border-blue-200 dark:border-blue-800">{line.substring(1, line.length - 1)}</p>;
                      } else if (line.trim() === '') {
                        return <div key={idx} className="my-4"></div>;
                      } else {
                        return <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed my-3">{line}</p>;
                      }
                    })}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        )}

        {/* Quote Section */}
        <div className="mt-8 sm:mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <blockquote className="text-lg sm:text-xl italic text-gray-700 dark:text-gray-300 mb-4">
              "I learned very early the difference between knowing the name of something and knowing something."
            </blockquote>
            <cite className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400">
              — Richard P. Feynman
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
}