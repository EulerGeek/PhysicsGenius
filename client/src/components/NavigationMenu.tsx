import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NavigationMenuProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  progress: any;
}

export default function NavigationMenu({ currentPage, onNavigate, progress }: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠', description: 'Main dashboard' },
    { id: 'concepts', label: 'Concepts', icon: '🎯', description: 'Interactive physics concepts' },
    { id: 'courses', label: 'Courses', icon: '📚', description: 'Physics lessons' },
    { id: 'progress', label: 'Progress', icon: '📊', description: 'Your achievements' },
    { id: 'test', label: 'Quick Test', icon: '🧪', description: 'Random questions' },
    { id: 'friends', label: 'Friends', icon: '👥', description: 'Study together' },
    { id: 'settings', label: 'Settings', icon: '⚙️', description: 'Preferences' },
    { id: 'about', label: 'About', icon: 'ℹ️', description: 'About QUOMA' },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsOpen(false); // Close menu after navigation
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <div 
        className="relative group"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Menu Button */}
        <Button
          className={`w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-2xl transition-all duration-500 ${
            isOpen ? 'scale-125 rotate-90 pulse-glow' : 'scale-100 float-animation hover-glow'
          } relative overflow-hidden group`}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
          
          <span className={`text-2xl relative z-10 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>☰</span>
        </Button>

        {/* Invisible bridge to prevent menu from closing */}
        <div className="absolute top-12 left-0 w-12 h-6 bg-transparent" />
        
        {/* Hover Menu - Extended hover area */}
        <div 
          className={`absolute top-14 left-0 transition-all duration-300 ${
            isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl border-0 min-w-[240px]">
            <CardContent className="p-2">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    className={`w-full justify-start text-left h-auto p-3 transition-all duration-200 ${
                      currentPage === item.id 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => handleNavigate(item.id)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <span className="text-lg">{item.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs opacity-70">{item.description}</div>
                      </div>
                      {item.id === 'progress' && (
                        <Badge variant="secondary" className="text-xs">
                          {Object.keys(progress.completedLessons).length}
                        </Badge>
                      )}
                    </div>
                  </Button>
                ))}
              </div>

              {/* User Info */}
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="font-medium">Physics Explorer</div>
                  <div className="text-xs">Level {Math.floor(Object.keys(progress.completedLessons).length / 5) + 1}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}