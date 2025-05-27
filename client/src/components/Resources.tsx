import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const resources = [
  {
    title: "MIT 8.01 Physics I",
    description: "Classical Mechanics - Professor Walter Lewin",
    icon: "fas fa-university",
    color: "bg-red-100",
    iconColor: "text-red-600",
    url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/",
    badge: "Video Lectures"
  },
  {
    title: "MIT 8.012 Advanced",
    description: "Advanced Classical Mechanics with calculus",
    icon: "fas fa-graduation-cap",
    color: "bg-blue-100", 
    iconColor: "text-blue-600",
    url: "https://ocw.mit.edu/courses/8-012-physics-i-classical-mechanics-fall-2008/",
    badge: "Advanced"
  },
  {
    title: "Feynman Lectures",
    description: "Six Easy Pieces - intuitive physics explanations",
    icon: "fas fa-user-graduate",
    color: "bg-green-100",
    iconColor: "text-green-600",
    url: "https://www.feynmanlectures.caltech.edu/",
    badge: "Free Online"
  },
  {
    title: "Khan Academy Physics",
    description: "Interactive lessons and practice problems",
    icon: "fas fa-play-circle",
    color: "bg-purple-100",
    iconColor: "text-purple-600",
    url: "https://www.khanacademy.org/science/physics",
    badge: "Interactive"
  },
  {
    title: "MIT Physics YouTube",
    description: "Complete lecture series and demonstrations",
    icon: "fab fa-youtube",
    color: "bg-red-100",
    iconColor: "text-red-600",
    url: "https://www.youtube.com/user/MIT",
    badge: "Video"
  },
  {
    title: "Griffiths QM Online",
    description: "Quantum Mechanics textbook resources",
    icon: "fas fa-wave-square",
    color: "bg-amber-100",
    iconColor: "text-amber-600",
    url: "https://physicscourses.colorado.edu/phys5250/",
    badge: "Textbook"
  }
];

export default function Resources() {
  return (
    <section className="mb-8">
      <h3 className="text-xl font-bold text-neutral-900 mb-6">Free Learning Resources</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${resource.color} rounded-lg flex items-center justify-center`}>
                  <i className={`${resource.icon} ${resource.iconColor}`}></i>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {resource.badge}
                </Badge>
              </div>
              <h4 className="font-semibold text-neutral-900 mb-1">{resource.title}</h4>
              <p className="text-sm text-neutral-600 mb-3">{resource.description}</p>
              <div className="flex items-center text-xs text-neutral-500">
                <i className="fas fa-external-link-alt mr-1"></i>
                <span>Free Access</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
