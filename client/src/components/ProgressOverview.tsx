import { Card, CardContent } from "@/components/ui/card";

interface Course {
  id: string;
  title: string;
  icon: string;
  color: string;
  totalLessons: number;
}

interface ProgressOverviewProps {
  progress: {
    overallProgress: number;
    totalLessonsCompleted: number;
    completedLessons: Record<string, number>;
  };
  courses: Course[];
}

export default function ProgressOverview({ progress, courses }: ProgressOverviewProps) {
  const progressPercentage = (progress.overallProgress / 100) * 251.2;
  const strokeDashoffset = 251.2 - progressPercentage;

  return (
    <section className="mb-8">
      <Card className="p-6">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Welcome back!</h2>
              <p className="text-neutral-600">Continue your physics journey</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <div className="text-center">
                <div className="w-16 h-16 relative">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none"/>
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth="8" 
                      fill="none" 
                      strokeDasharray="251.2" 
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-neutral-900">{progress.overallProgress}%</span>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mt-1">Overall Progress</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{progress.totalLessonsCompleted}</div>
                <p className="text-xs text-neutral-500">Lessons Completed</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {courses.map((course) => (
              <div key={course.id} className={`text-center p-3 ${course.color} rounded-lg`}>
                <i className={`${course.icon} text-lg mb-2`}></i>
                <div className="text-sm font-medium text-neutral-900">
                  {progress.completedLessons[course.id] || 0}/{course.totalLessons}
                </div>
                <div className="text-xs text-neutral-500">{course.title.split(' ')[0]}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
