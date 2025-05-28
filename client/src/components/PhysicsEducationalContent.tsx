import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EducationalContentProps {
  currentTopic?: string;
}

export default function PhysicsEducationalContent({ currentTopic = "general" }: EducationalContentProps) {
  const educationalSpotlights = [
    {
      id: "mit-physics",
      title: "MIT OpenCourseWare Physics",
      description: "Free physics courses from MIT including 8.01 Classical Mechanics and 8.02 Electricity & Magnetism",
      topic: "Classical Mechanics",
      type: "Course Resource",
      link: "https://ocw.mit.edu/courses/physics/",
      featured: true,
      icon: "🎓"
    },
    {
      id: "khan-physics",
      title: "Khan Academy Physics",
      description: "Comprehensive physics lessons covering mechanics, waves, thermodynamics, and modern physics",
      topic: "General Physics",
      type: "Interactive Learning",
      link: "https://www.khanacademy.org/science/physics",
      featured: true,
      icon: "📚"
    },
    {
      id: "physics-classroom",
      title: "The Physics Classroom",
      description: "High-quality physics tutorials, animations, and interactive simulations for concept building",
      topic: "Physics Education",
      type: "Tutorial Resource",
      link: "https://www.physicsclassroom.com/",
      featured: false,
      icon: "🔬"
    },
    {
      id: "phet-simulations",
      title: "PhET Interactive Simulations",
      description: "University of Colorado's research-based physics simulations for hands-on learning",
      topic: "Interactive Physics",
      type: "Simulation Platform",
      link: "https://phet.colorado.edu/en/simulations/category/physics",
      featured: true,
      icon: "⚗️"
    },
    {
      id: "feynman-lectures",
      title: "The Feynman Lectures on Physics",
      description: "Richard Feynman's legendary physics lectures, now freely available online",
      topic: "Advanced Physics",
      type: "Lecture Series",
      link: "https://www.feynmanlectures.caltech.edu/",
      featured: true,
      icon: "🧠"
    },
    {
      id: "wolfram-physics",
      title: "Wolfram Physics Demonstrations",
      description: "Interactive physics demonstrations and visualizations powered by Mathematica",
      topic: "Physics Visualization",
      type: "Interactive Demos",
      link: "https://demonstrations.wolfram.com/topics.html?topic=Physics",
      featured: false,
      icon: "📊"
    },
    {
      id: "aapt-resources",
      title: "American Association of Physics Teachers",
      description: "Professional resources, teaching materials, and physics education research",
      topic: "Physics Teaching",
      type: "Educational Organization",
      link: "https://www.aapt.org/",
      featured: false,
      icon: "👨‍🏫"
    },
    {
      id: "physics-today",
      title: "Physics Today Magazine",
      description: "Current developments in physics research, technology, and education",
      topic: "Physics News",
      type: "Scientific Publication",
      link: "https://physicstoday.scitation.org/",
      featured: false,
      icon: "📰"
    }
  ];

  const topicRecommendations = {
    "Classical Mechanics": ["mit-physics", "phet-simulations", "feynman-lectures"],
    "Quantum Mechanics": ["feynman-lectures", "mit-physics", "wolfram-physics"],
    "Relativity": ["feynman-lectures", "physics-classroom", "khan-physics"],
    "General Physics": ["khan-physics", "physics-classroom", "phet-simulations"]
  };

  const getRelevantContent = () => {
    const topicKey = Object.keys(topicRecommendations).find(key => 
      currentTopic.toLowerCase().includes(key.toLowerCase())
    );
    
    if (topicKey) {
      const relevantIds = topicRecommendations[topicKey as keyof typeof topicRecommendations];
      return educationalSpotlights.filter(content => 
        relevantIds.includes(content.id) || content.featured
      );
    }
    
    return educationalSpotlights.filter(content => content.featured);
  };

  const displayContent = getRelevantContent().slice(0, 3);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-700">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌟</span>
            <div>
              <CardTitle className="text-xl text-blue-800 dark:text-blue-200">
                Physics Learning Resources
              </CardTitle>
              <p className="text-blue-600 dark:text-blue-300 text-sm">
                Recommended educational content to enhance your physics journey
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {displayContent.map((content) => (
              <div
                key={content.id}
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl flex-shrink-0">
                  {content.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {content.title}
                    </h4>
                    <Badge 
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs flex-shrink-0"
                    >
                      {content.type}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed">
                    {content.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs">
                      {content.topic}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(content.link, '_blank')}
                      className="text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      Explore Resource →
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-700">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">💡</span>
              <h4 className="font-semibold text-amber-800 dark:text-amber-200">
                Learning Tip
              </h4>
            </div>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              These resources complement your QUOMA learning experience. Use PhET simulations for hands-on practice, 
              MIT OpenCourseWare for in-depth theory, and Khan Academy for additional explanations of challenging concepts.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}