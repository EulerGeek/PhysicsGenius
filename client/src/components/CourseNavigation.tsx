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
    <div className="space-y-2 sm:space-y-3">
      {/* Physics Courses */}
      <section className="mb-1 sm:mb-2">
        <h3 className="text-[8px] sm:text-xs md:text-sm font-semibold text-center mb-1 sm:mb-2 text-slate-700">
          🔬 Physics Courses
        </h3>
        <div className="flex space-x-0.5 sm:space-x-1 bg-slate-50 p-0.5 rounded-lg border border-slate-200 shadow-sm">
          {courses.filter(course => ['classical', 'relativity', 'quantum'].includes(course.id)).map((course) => {
            const locked = isCourseLocked(course.id);
            return (
              <Button
                key={course.id}
                onClick={() => !locked && onTabChange(course.id)}
                variant="ghost"
                disabled={locked}
                className={`flex-1 py-0.5 px-1 sm:py-1 sm:px-2 md:py-2 md:px-3 lg:py-3 lg:px-4 rounded-md font-medium transition-all duration-200 text-[8px] sm:text-xs md:text-sm lg:text-base relative ${
                  locked 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50 backdrop-blur-sm' 
                    : activeTab === course.id
                      ? 'bg-slate-800 text-white shadow-lg'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
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
      {/* Mathematics Courses (Optional) */}
      <section className="mb-1 sm:mb-2">
        <h3 className="text-[8px] sm:text-xs md:text-sm font-semibold text-center mb-1 sm:mb-2 text-slate-600">
          📐 Mathematics (Optional)
        </h3>
        <div className="flex space-x-0.5 sm:space-x-1 bg-slate-50 p-0.5 rounded-lg border border-slate-200 shadow-sm">
          {courses.filter(course => ['algebra', 'calculus', 'linear-algebra'].includes(course.id)).map((course) => (
            <Button
              key={course.id}
              onClick={() => onTabChange(course.id)}
              variant="ghost"
              className={`flex-1 py-0.5 px-1 sm:py-1 sm:px-2 md:py-2 md:px-3 lg:py-3 lg:px-4 rounded-md font-medium transition-all duration-200 text-[8px] sm:text-xs md:text-sm lg:text-base ${
                activeTab === course.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <i className={`${course.icon} mr-1 sm:mr-2`}></i>
              <span className="hidden sm:inline">{course.title}</span>
              <span className="sm:hidden">{course.title.split(' ')[0]}</span>
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}
