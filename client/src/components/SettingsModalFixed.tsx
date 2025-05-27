import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/contexts/ThemeContext";
import { useAudio } from "@/hooks/useAudio";
import StudyRemindersPanel from "./StudyRemindersPanel";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetProgress: () => void;
  user?: { username: string; email: string; } | null;
  onSignOut?: () => void;
}

export default function SettingsModal({ isOpen, onClose, onResetProgress, user, onSignOut }: SettingsModalProps) {
  const { theme, toggleTheme } = useTheme();
  const { settings, updateSettings, toggleBackgroundMusic, toggleSoundEffects, playSound } = useAudio();
  const [speechRate, setSpeechRate] = useState(0.8);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showStudyReminders, setShowStudyReminders] = useState(false);

  if (!isOpen) return null;

  const handleResetProgress = () => {
    if (confirm("Are you sure you want to reset all your progress? This action cannot be undone.")) {
      onResetProgress();
      playSound('click');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            ⚙️ Settings
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Audio Settings */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                🎵 Audio Settings
              </h3>
              
              {/* Background Music */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Background Music</span>
                  <span className="text-sm text-gray-500">Ambient music while studying</span>
                </div>
                <Switch
                  checked={settings.backgroundMusicEnabled}
                  onCheckedChange={() => {
                    toggleBackgroundMusic();
                    playSound('click');
                  }}
                />
              </div>

              {/* Music Volume */}
              {settings.backgroundMusicEnabled && (
                <div className="space-y-2 ml-4">
                  <div className="flex justify-between">
                    <Label className="text-sm">Music Volume</Label>
                    <span className="text-sm text-gray-500">{Math.round(settings.musicVolume * 100)}%</span>
                  </div>
                  <Slider
                    value={[settings.musicVolume * 100]}
                    onValueChange={([value]) => updateSettings({ musicVolume: value / 100 })}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              )}

              {/* Sound Effects */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Sound Effects</span>
                  <span className="text-sm text-gray-500">Button clicks and notifications</span>
                </div>
                <Switch
                  checked={settings.soundEffectsEnabled}
                  onCheckedChange={() => {
                    toggleSoundEffects();
                    playSound('click');
                  }}
                />
              </div>

              {/* Sound Effects Volume */}
              {settings.soundEffectsEnabled && (
                <div className="space-y-2 ml-4">
                  <div className="flex justify-between">
                    <Label className="text-sm">Effects Volume</Label>
                    <span className="text-sm text-gray-500">{Math.round(settings.soundVolume * 100)}%</span>
                  </div>
                  <Slider
                    value={[settings.soundVolume * 100]}
                    onValueChange={([value]) => {
                      updateSettings({ soundVolume: value / 100 });
                      playSound('click');
                    }}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            <Separator />

            {/* Appearance Settings */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                🎨 Appearance
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Dark Mode</span>
                  <span className="text-sm text-gray-500">Toggle between light and dark themes</span>
                </div>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={() => {
                    toggleTheme();
                    playSound('click');
                  }}
                />
              </div>
            </div>

            <Separator />

            {/* Accessibility Settings */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                ♿ Accessibility
              </h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm">Text-to-Speech Speed</Label>
                  <span className="text-sm text-gray-500">{speechRate.toFixed(1)}x</span>
                </div>
                <Slider
                  value={[speechRate]}
                  onValueChange={([value]) => setSpeechRate(value)}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Study Reminders</span>
                  <span className="text-sm text-gray-500">Daily notifications and progress tracking</span>
                </div>
                <Button 
                  size="sm"
                  onClick={() => {
                    setShowStudyReminders(true);
                    playSound('click');
                  }}
                >
                  ⏰ Manage Reminders
                </Button>
              </div>
            </div>

            <Separator />

            {/* Account Settings */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                👤 Account
              </h3>
              
              {user ? (
                <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{user.username}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </div>
                  
                  {onSignOut && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        onSignOut();
                        playSound('click');
                        onClose();
                      }}
                    >
                      Sign Out
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Sign in to save your progress</p>
                  <Badge variant="secondary">Guest Mode</Badge>
                </div>
              )}
            </div>

            <Separator />

            {/* Danger Zone */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-red-600">
                ⚠️ Danger Zone
              </h3>
              
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="space-y-3">
                  <div>
                    <div className="font-medium text-red-800 dark:text-red-200">Reset All Progress</div>
                    <div className="text-sm text-red-600 dark:text-red-300">
                      This will permanently delete all your lesson progress, scores, and streaks.
                    </div>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={handleResetProgress}
                  >
                    Reset Progress
                  </Button>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                ℹ️ About QUOMA
              </h3>
              
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-purple-600">QUOMA</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Your Personal Physics Learning Platform
                </div>
                <div className="text-xs text-gray-500">
                  Version 1.0.0 • Made with ❤️ for physics learners
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Study Reminders Panel */}
      <StudyRemindersPanel
        isOpen={showStudyReminders}
        onClose={() => setShowStudyReminders(false)}
      />
    </div>
  );
}