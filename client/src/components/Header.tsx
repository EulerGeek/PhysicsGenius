import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

interface HeaderProps {
  progress: {
    streak: number;
  };
  resetProgress: () => void;
}

export default function Header({ progress, resetProgress }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-atom text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">QUOMA</h1>
              <p className="text-xs text-neutral-500 dark:text-gray-400">
                Your Personal Physics Geek
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-sm`}></i>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={resetProgress}
              title="Reset Progress"
            >
              <i className="fas fa-redo text-xs mr-2"></i>
              Reset Progress
            </Button>
            <div className="hidden sm:flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              <i className="fas fa-fire text-amber-500 text-sm"></i>
              <span className="text-sm font-medium text-neutral-700 dark:text-gray-300">{progress.streak} day streak</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200">
              <i className="fas fa-gift text-xs mr-1"></i>
              100% FREE
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
}