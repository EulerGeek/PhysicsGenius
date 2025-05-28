import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/contexts/ThemeContext";
import AuthModal from "./AuthModal";
import SettingsModalFixed from "./SettingsModalFixed";
import FriendsModal from "./FriendsModal";
import DevPanel from "./DevPanel";
import WikipediaPanel from "./WikipediaPanel";

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
  const [showWikipediaPanel, setShowWikipediaPanel] = useState(false);

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
      setShowWikipediaPanel(true);
    }
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-500 to-emerald-500 shadow-lg border-b border-blue-300">
        <div className="w-full px-1 sm:px-2 md:px-4 lg:px-6">
          <div className="flex justify-between items-center h-6 sm:h-8 md:h-10 lg:h-12">
            <div className="flex items-center space-x-0.5 sm:space-x-1 md:space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-[8px] sm:text-xs md:text-sm lg:text-base">⚛️</span>
              </div>
              <h1 className="text-[10px] sm:text-xs md:text-sm lg:text-lg font-bold text-blue-600">QUOMA</h1>
            </div>

            {/* Search - Hidden on mobile */}
            <div className="hidden sm:flex flex-1 max-w-xs mx-2">
              <form onSubmit={handleWikipediaSearch} className="relative group">
                <Input
                  type="text"
                  placeholder="Search physics topics on Wikipedia..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-16 py-3 text-sm border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/90 backdrop-blur-sm transition-all duration-200 group-hover:border-blue-400 shadow-md placeholder-blue-600"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-blue-600 text-lg">🔍</span>
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="absolute inset-y-0 right-1 my-1 px-3 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white rounded-lg shadow-md transition-all duration-200 hover:shadow-lg flex items-center justify-center"
                >
                  <span className="text-lg">🔍</span>
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

              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowFriendsModal(true);
                }}
                className="text-blue-700 border-blue-600 hover:bg-blue-50 bg-white/80"
                title="Friends & Leaderboard"
              >
                👥 Friends
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowSettingsModal(true);
                }}
                className="text-gray-700 dark:text-gray-300"
                title="Settings"
              >
                ⚙️ Settings
              </Button>

              <div className="hidden sm:flex items-center space-x-2 bg-white/90 px-3 py-1 rounded-full shadow-md border border-blue-300">
                <i className="fas fa-fire text-emerald-500 text-sm"></i>
                <span className="text-sm font-medium text-blue-800">{progress.streak} day streak</span>
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

      <WikipediaPanel
        isOpen={showWikipediaPanel}
        onClose={() => setShowWikipediaPanel(false)}
        initialQuery={searchQuery}
      />
    </>
  );
}