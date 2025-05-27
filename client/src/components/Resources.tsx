import { Card, CardContent } from "@/components/ui/card";

const resources = [
  {
    title: "MIT OpenCourseWare",
    description: "8.01 Physics I lectures and materials",
    icon: "fas fa-university",
    color: "bg-red-100",
    iconColor: "text-red-600",
    url: "https://ocw.mit.edu/courses/physics/8-01sc-classical-mechanics-fall-2016/"
  },
  {
    title: "Feynman Lectures",
    description: "Six Easy Pieces for intuitive understanding",
    icon: "fas fa-book",
    color: "bg-blue-100",
    iconColor: "text-blue-600",
    url: "https://www.feynmanlectures.caltech.edu/"
  },
  {
    title: "Spacetime & Geometry",
    description: "Carroll's guide to General Relativity",
    icon: "fas fa-infinity",
    color: "bg-purple-100",
    iconColor: "text-purple-600",
    url: "#"
  },
  {
    title: "Griffiths QM",
    description: "Introduction to Quantum Mechanics",
    icon: "fas fa-wave-square",
    color: "bg-amber-100",
    iconColor: "text-amber-600",
    url: "#"
  }
];

export default function Resources() {
  return (
    <section className="mb-8">
      <h3 className="text-xl font-bold text-neutral-900 mb-6">Learning Resources</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((resource, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className={`w-10 h-10 ${resource.color} rounded-lg flex items-center justify-center mb-3`}>
                <i className={`${resource.icon} ${resource.iconColor}`}></i>
              </div>
              <h4 className="font-semibold text-neutral-900 mb-1">{resource.title}</h4>
              <p className="text-sm text-neutral-600">{resource.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
