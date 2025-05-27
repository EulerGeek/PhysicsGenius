import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import { useAudio } from "@/hooks/useAudio";

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

  if (!isOpen) return null;

  const handleResetProgress = () => {
    if (confirm("Are you sure you want to reset all your progress? This action cannot be undone.")) {
      onResetProgress();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white dark:bg-gray-900">
        <CardContent className="p-0">
          <div className="gradient-primary p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Settings</h2>
                <p className="text-blue-100">Customize your QUOMA experience</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                <i className="fas fa-times"></i>
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {user && (
              <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Account</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.username}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <i className="fas fa-gift text-xs mr-1"></i>
                    FREE
                  </Badge>
                </div>
                {onSignOut && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onSignOut}
                    className="mt-3 text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </Button>
                )}
              </div>
            )}

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Toggle between light and dark theme</p>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Accessibility</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Text-to-Speech Speed</p>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{speechRate}x</span>
                  </div>
                  <Slider
                    value={[speechRate]}
                    onValueChange={(value) => setSpeechRate(value[0])}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Sound Effects</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Play sounds for interactions</p>
                  </div>
                  <Switch
                    checked={settings.soundEffectsEnabled}
                    onCheckedChange={toggleSoundEffects}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Learning</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Study Reminders</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Get notified to continue learning</p>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Progress</h3>
              <Button
                variant="destructive"
                onClick={handleResetProgress}
                className="w-full"
              >
                <i className="fas fa-redo text-xs mr-2"></i>
                Reset All Progress
              </Button>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
                This will permanently delete all your learning progress
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center text-xs text-gray-600 dark:text-gray-400">
                <p>QUOMA v1.0 - 100% Free Physics Education</p>
                <p className="mt-1">Made with ❤️ for physics learners everywhere</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}