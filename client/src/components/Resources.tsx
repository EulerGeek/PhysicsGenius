
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Resources() {
  const resources = {
    books: [
      {
        title: "Fundamentals of Physics",
        author: "Halliday, Resnick & Walker",
        description: "Comprehensive textbook covering all areas of physics",
        url: "https://www.wiley.com/en-us/Fundamentals+of+Physics%2C+11th+Edition-p-9781119306856",
        category: "Classical"
      },
      {
        title: "Introduction to Electrodynamics",
        author: "David J. Griffiths",
        description: "Essential text for understanding electromagnetic theory",
        url: "https://www.cambridge.org/core/books/introduction-to-electrodynamics/A6C2EB9A0C08F6E93ED8F87E7E7A8F4F",
        category: "Classical"
      },
      {
        title: "Spacetime and Geometry",
        author: "Sean Carroll",
        description: "Modern introduction to general relativity",
        url: "https://www.cambridge.org/core/books/spacetime-and-geometry/A8B7C56B8D90C8E7F9E8F7E8F7E8F7E8",
        category: "Relativity"
      },
      {
        title: "Introduction to Quantum Mechanics",
        author: "David J. Griffiths",
        description: "Clear and accessible quantum mechanics textbook",
        url: "https://www.cambridge.org/core/books/introduction-to-quantum-mechanics/B9A8C7D6E5F4G3H2I1J0K9L8M7N6O5P4",
        category: "Quantum"
      }
    ],
    videos: [
      {
        title: "Khan Academy Physics",
        description: "Free comprehensive physics video lectures",
        url: "https://www.khanacademy.org/science/physics",
        category: "All"
      },
      {
        title: "MIT 8.01 Classical Mechanics",
        description: "MIT OpenCourseWare classical mechanics course",
        url: "https://ocw.mit.edu/courses/physics/8-01sc-classical-mechanics-fall-2016/",
        category: "Classical"
      },
      {
        title: "Stanford Relativity Course",
        description: "Leonard Susskind's general relativity lectures",
        url: "https://www.youtube.com/playlist?list=PLpGHT1n4-mAvcXwzOIz3dHnGZaQP1LEib",
        category: "Relativity"
      },
      {
        title: "Quantum Mechanics and Quantum Computation",
        description: "UC Berkeley quantum mechanics course",
        url: "https://www.edx.org/course/quantum-mechanics-quantum-computation-uc-berkeleyx-cs-191x",
        category: "Quantum"
      }
    ],
    tools: [
      {
        title: "PhET Interactive Simulations",
        description: "Interactive physics simulations from University of Colorado",
        url: "https://phet.colorado.edu/",
        category: "All"
      },
      {
        title: "Wolfram Alpha",
        description: "Computational engine for physics calculations",
        url: "https://www.wolframalpha.com/",
        category: "All"
      },
      {
        title: "GeoGebra",
        description: "Dynamic mathematics and physics visualization",
        url: "https://www.geogebra.org/",
        category: "All"
      },
      {
        title: "Desmos Graphing Calculator",
        description: "Advanced online graphing calculator",
        url: "https://www.desmos.com/calculator",
        category: "All"
      }
    ]
  };

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Learning Resources</h2>
        <p className="text-neutral-600 dark:text-gray-300">Expand your physics knowledge with these curated resources</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Books */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-lg dark:text-white">
              <i className="fas fa-book text-blue-600 mr-2"></i>
              Textbooks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resources.books.map((book, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">{book.title}</h4>
                <p className="text-xs text-neutral-600 dark:text-gray-300 mb-1">by {book.author}</p>
                <p className="text-xs text-neutral-500 dark:text-gray-400 mb-2">{book.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                    {book.category}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => window.open(book.url, '_blank')}
                    className="text-xs"
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Videos */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-lg dark:text-white">
              <i className="fas fa-video text-red-600 mr-2"></i>
              Video Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resources.videos.map((video, index) => (
              <div key={index} className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">{video.title}</h4>
                <p className="text-xs text-neutral-500 dark:text-gray-400 mb-2">{video.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                    {video.category}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => window.open(video.url, '_blank')}
                    className="text-xs"
                  >
                    Watch
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tools */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-lg dark:text-white">
              <i className="fas fa-tools text-green-600 mr-2"></i>
              Interactive Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resources.tools.map((tool, index) => (
              <div key={index} className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">{tool.title}</h4>
                <p className="text-xs text-neutral-500 dark:text-gray-400 mb-2">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                    {tool.category}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => window.open(tool.url, '_blank')}
                    className="text-xs"
                  >
                    Use
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
