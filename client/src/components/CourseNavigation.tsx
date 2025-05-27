import { Button } from "@/components/ui/button";

interface Course {
  id: string;
  title: string;
  icon: string;
}

interface CourseNavigationProps {
  courses: Course[];
  activeTab: string;
  onTabChange: (courseId: string) => void;
}

export default function CourseNavigation({ courses, activeTab, onTabChange }: CourseNavigationProps) {
  return (
    <section className="mb-8">
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {courses.map((course) => (
          <Button
            key={course.id}
            onClick={() => onTabChange(course.id)}
            variant="ghost"
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
              activeTab === course.id
                ? 'bg-white text-primary shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <i className={`${course.icon} mr-2`}></i>
            {course.title}
          </Button>
        ))}
      </div>
    </section>
  );
}
