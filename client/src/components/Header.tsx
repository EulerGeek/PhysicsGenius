import { Button } from "@/components/ui/button";

interface HeaderProps {
  progress: {
    streak: number;
  };
}

export default function Header({ progress }: HeaderProps) {
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
            <div className="hidden sm:flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
              <i className="fas fa-fire text-amber-500 text-sm"></i>
              <span className="text-sm font-medium text-neutral-700">{progress.streak} day streak</span>
            </div>
            <Button className="bg-primary text-white hover:bg-primary/90">
              Sign Up Free
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
