import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/contexts/ThemeContext";
import AuthModal from "./AuthModal";
import SettingsModalFixed from "./SettingsModalFixed";
import FriendsModal from "./FriendsModal";
import DevPanel from "./DevPanel";

interface HeaderProps {
  progress: {
    streak: number;
  };
  resetProgress: () => void;
  setProgress?: (progress: any) => void;
}

export default function Header({ progress, resetProgress, setProgress }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<{ username: string; email: string; } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [showDevPanel, setShowDevPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSignIn = (userData: { username: string; email: string; }) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleSignOut = () => {
    setUser(null);
    setShowSettingsModal(false);
  };

  const handleWikipediaSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(searchQuery.trim())}`;
      window.open(searchUrl, '_blank');
      setSearchQuery("");
    }
  };

  return (
    <>
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

            {/* Wikipedia Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <form onSubmit={handleWikipediaSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search Wikipedia for physics topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-sm">🔍</span>
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="absolute inset-y-0 right-0 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg"
                >
                  📖
                </Button>
              </form>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Dev Panel Button - Double click to access */}
              <Button
                variant="outline"
                size="sm"
                onDoubleClick={() => setShowDevPanel(true)}
                onClick={toggleTheme}
                className="text-gray-700 dark:text-gray-300"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode (Double-click for dev panel)`}
              >
                <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-sm`}></i>
              </Button>

              {user && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFriendsModal(true)}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400"
                  title="Friends & Leaderboard"
                >
                  <i className="fas fa-users text-sm"></i>
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettingsModal(true)}
                className="text-gray-700 dark:text-gray-300"
                title="Settings"
              >
                <i className="fas fa-cog text-sm"></i>
              </Button>

              <div className="hidden sm:flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                <i className="fas fa-fire text-amber-500 text-sm"></i>
                <span className="text-sm font-medium text-neutral-700 dark:text-gray-300">{progress.streak} day streak</span>
              </div>

              {user ? (
                <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900 px-3 py-1 rounded-full">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{user.username}</span>
                </div>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  size="sm"
                >
                  <i className="fas fa-sign-in-alt text-xs mr-1"></i>
                  Sign In
                </Button>
              )}

              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200">
                <i className="fas fa-gift text-xs mr-1"></i>
                100% FREE
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSignIn={handleSignIn}
      />

      <SettingsModalFixed
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        onResetProgress={resetProgress}
        user={user}
        onSignOut={handleSignOut}
      />

      <FriendsModal
        isOpen={showFriendsModal}
        onClose={() => setShowFriendsModal(false)}
        user={user}
      />

      {setProgress && (
        <DevPanel
          isOpen={showDevPanel}
          onClose={() => setShowDevPanel(false)}
          onSetProgress={setProgress}
        />
      )}
    </>
  );
}