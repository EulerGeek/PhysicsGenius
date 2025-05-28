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
  progress?: any;
}

export default function CourseNavigation({ courses, activeTab, onTabChange, progress }: CourseNavigationProps) {
  const isCourseLocked = (courseId: string) => {
    if (courseId === 'classical') return false; // Always unlocked
    if (courseId === 'relativity') return !progress?.completedLessons?.classical || progress.completedLessons.classical < 5;
    if (courseId === 'quantum') return !progress?.completedLessons?.relativity || progress.completedLessons.relativity < 3;
    return false;
  };

  return (
    <section className="mb-2 sm:mb-4 md:mb-6 lg:mb-8">
      <div className="flex space-x-0.5 sm:space-x-1 bg-gray-100 p-0.5 sm:p-1 rounded-lg">
        {courses.map((course) => {
          const locked = isCourseLocked(course.id);
          return (
            <Button
              key={course.id}
              onClick={() => !locked && onTabChange(course.id)}
              variant="ghost"
              disabled={locked}
              className={`flex-1 py-1 px-2 sm:py-2 sm:px-3 md:py-3 md:px-4 rounded-md font-medium transition-all duration-200 text-xs sm:text-sm md:text-base relative ${
                locked 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50 backdrop-blur-sm' 
                  : activeTab === course.id
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
              } ${locked ? 'after:content-["🔒"] after:absolute after:top-1 after:right-1 after:text-xs after:opacity-60' : ''}`}
            >
              <span className={locked ? 'blur-sm' : ''}>
                <i className={`${course.icon} mr-1 sm:mr-2`}></i>
                <span className="hidden sm:inline">{course.title}</span>
                <span className="sm:hidden">{course.title.split(' ')[0]}</span>
              </span>
              {locked && (
                <div className="absolute inset-0 bg-gray-300/50 backdrop-blur-[1px] rounded-md flex items-center justify-center">
                  <span className="text-xs text-gray-500">🌫️</span>
                </div>
              )}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
