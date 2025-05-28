import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  const features = [
    { icon: '🎓', title: 'Interactive Learning', description: 'Engage with physics through interactive lessons and visual explanations' },
    { icon: '🎮', title: 'Gamified Experience', description: 'Level up, earn achievements, and track your progress' },
    { icon: '🎵', title: 'Custom Audio', description: 'Personalized sound effects and background music' },
    { icon: '🧪', title: 'Quick Tests', description: 'Random questions from all physics topics' },
    { icon: '👥', title: 'Collaborative Learning', description: 'Study with friends in real-time' },
    { icon: '🌙', title: 'Dark Mode', description: 'Study comfortably in any lighting condition' },
    { icon: '♿', title: 'Accessibility', description: 'Text-to-speech and screen reader support' },
    { icon: '💾', title: 'Progress Sync', description: 'Your progress is automatically saved' }
  ];

  const subjects = [
    { 
      icon: '🚀', 
      title: 'Classical Mechanics', 
      lessons: 15,
      topics: ['Motion in 1D', 'Newton\'s Laws', 'Energy & Work', 'Momentum', 'Rotation', 'Oscillations', 'Waves']
    },
    { 
      icon: '🌌', 
      title: 'General Relativity', 
      lessons: 10,
      topics: ['Special Relativity', 'Spacetime', 'Black Holes', 'Gravitational Waves', 'Cosmology']
    },
    { 
      icon: '⚛️', 
      title: 'Quantum Mechanics', 
      lessons: 12,
      topics: ['Wave-Particle Duality', 'Schrödinger Equation', 'Entanglement', 'Quantum Computing']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            About QUOMA
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your personal physics geek companion - making complex physics concepts accessible and enjoyable through cutting-edge interactive learning technology.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="border-0 shadow-lg mb-12">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
              QUOMA transforms complex scientific concepts into engaging, gamified educational experiences. 
              We believe physics should be accessible, enjoyable, and free for everyone who wants to understand 
              the fundamental laws that govern our universe.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:scale-105 transition-transform duration-200">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Course Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Complete Physics Curriculum</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {subjects.map((subject, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{subject.icon}</div>
                  <CardTitle>{subject.title}</CardTitle>
                  <Badge variant="outline">{subject.lessons} Lessons</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {subject.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="border-0 shadow-lg mb-12">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <span className="text-2xl">⚡</span>
              Built with Modern Technology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <div className="text-2xl mb-2">⚛️</div>
                <div className="font-medium">React</div>
                <div className="text-sm text-gray-500">Interactive UI</div>
              </div>
              <div className="p-4">
                <div className="text-2xl mb-2">🎨</div>
                <div className="font-medium">Tailwind CSS</div>
                <div className="text-sm text-gray-500">Beautiful Design</div>
              </div>
              <div className="p-4">
                <div className="text-2xl mb-2">🔤</div>
                <div className="font-medium">TypeScript</div>
                <div className="text-sm text-gray-500">Type Safety</div>
              </div>
              <div className="p-4">
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-medium">Vite</div>
                <div className="text-sm text-gray-500">Fast Performance</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">37</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Lessons</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Physics Questions</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Free Forever</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">∞</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Learning Potential</div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Message */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">🌟</div>
            <h2 className="text-2xl font-bold mb-4">Join the Physics Revolution</h2>
            <p className="text-lg opacity-90 mb-4">
              QUOMA is completely free and will always remain so. Our mission is to democratize physics education 
              and make it accessible to learners worldwide.
            </p>
            <p className="text-sm opacity-75">
              "The important thing is not to stop questioning. Curiosity has its own reason for existing." - Albert Einstein
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}