// client/src/components/Header.tsx

import { useProgress } from "@/hooks/useProgress";

interface HeaderProps {
  progress: {
    streak: number;
  };
}

export default function Header({ progress }: HeaderProps) {
  const { resetProgress } = useProgress();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-atom text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">QUOMA</h1>
              <p className="text-xs text-neutral-500">
                Your Personal Physics Geek
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={resetProgress}
            >
              Reset Progress
            </button>
            <div className="hidden sm:flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
              <i className="fas fa-fire text-amber-500 text-sm"></i>
              <span className="text-sm font-medium text-neutral-700">
                {progress.streak} day streak
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 hover:bg-green-100"
              >
                <i className="fas fa-gift text-xs mr-1"></i>
                100% FREE
              </Badge>
              <Button
                size="sm"
                variant="outline"
                className="text-neutral-600 hover:text-neutral-900"
                onClick={() => {
                  // Additional button functionality if needed
                }}
              >
                Another Action
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}// client/src/components/Header.tsx

import { useProgress } from "@/hooks/useProgress";

interface HeaderProps {
  progress: {
    streak: number;
  };
}

export default function Header({ progress }: HeaderProps) {
  const { resetProgress } = useProgress();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-atom text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">QUOMA</h1>
              <p className="text-xs text-neutral-500">Your Personal Physics Geek</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={resetProgress}
            >
              Reset Progress
            </button>
            <div className="hidden sm:flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
              <i className="fas fa-fire text-amber-500 text-sm"></i>
              <span className="text-sm font-medium text-neutral-700">{progress.streak} day streak</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                <i className="fas fa-gift text-xs mr-1"></i>
                100% FREE
              </Badge>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-neutral-600 hover:text-neutral-900"
                onClick={() => {
                  // Additional button functionality if needed
                }}
              >
                Another Action
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}// client/src/components/Header.tsx

import { useProgress } from "@/hooks/useProgress";

interface HeaderProps {
  progress: {
    streak: number;
  };
}

export default function Header({ progress }: HeaderProps) {
  const { resetProgress } = useProgress(); // Ensure resetProgress is correctly accessed

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-atom text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">QUOMA</h1>
              <p className="text-xs text-neutral-500">Your Personal Physics Geek</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={resetProgress} // Call resetProgress on click
            >
              Reset Progress
            </button>
            <div className="hidden sm:flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
              <i className="fas fa-fire text-amber-500 text-sm"></i>
              <span className="text-sm font-medium text-neutral-700">
                {progress.streak} day streak
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 hover:bg-green-100"
              >
                <i className="fas fa-gift text-xs mr-1"></i>
                100% FREE
              </Badge>
              <Button
                size="sm"
                variant="outline"
                className="text-neutral-600 hover:text-neutral-900"
                onClick={() => {
                  // Additional button functionality if needed
                }}
              >
                Another Action
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}const resetProgress = () => {
  setProgress(defaultProgress);
  localStorage.setItem("quoma-progress", JSON.stringify(defaultProgress));
};
