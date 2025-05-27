import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStudyReminders } from "@/hooks/useStudyReminders";
import { useAudio } from "@/hooks/useAudio";

interface StudyRemindersPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudyRemindersPanel({ isOpen, onClose }: StudyRemindersPanelProps) {
  const { 
    settings, 
    updateSettings, 
    currentStreak, 
    longestStreak, 
    getStudyStats, 
    getMotivationalMessage,
    studySessions 
  } = useStudyReminders();
  const { playSound } = useAudio();
  
  const [selectedDays, setSelectedDays] = useState(settings.customDays);
  const stats = getStudyStats();

  if (!isOpen) return null;

  const handleTimeChange = (time: string) => {
    updateSettings({ time });
    playSound('click');
  };

  const handleFrequencyChange = (frequency: 'daily' | 'weekdays' | 'custom') => {
    updateSettings({ frequency });
    playSound('click');
  };

  const handleDayToggle = (day: string) => {
    const newDays = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];
    
    setSelectedDays(newDays);
    updateSettings({ customDays: newDays });
    playSound('click');
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        playSound('notification');
      }
    }
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2">
              ⏰ Study Reminders & Progress
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onClose}>
              ✕ Close
            </Button>
          </div>
        </CardHeader>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            
            {/* Current Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{currentStreak}</div>
                <div className="text-sm text-gray-600">Current Streak</div>
                <div className="text-xs text-gray-500">days</div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{longestStreak}</div>
                <div className="text-sm text-gray-600">Longest Streak</div>
                <div className="text-xs text-gray-500">days</div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{Math.round(stats.weeklyMinutes)}</div>
                <div className="text-sm text-gray-600">This Week</div>
                <div className="text-xs text-gray-500">minutes</div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{Math.round(stats.averageScore)}%</div>
                <div className="text-sm text-gray-600">Avg Score</div>
                <div className="text-xs text-gray-500">overall</div>
              </Card>
            </div>

            {/* Motivational Message */}
            <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <div className="text-center">
                <div className="text-lg font-medium text-purple-800 dark:text-purple-200">
                  {getMotivationalMessage()}
                </div>
              </div>
            </Card>

            <Separator />

            {/* Reminder Settings */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                🔔 Reminder Settings
              </h3>

              {/* Enable/Disable */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Study Reminders</span>
                  <span className="text-sm text-gray-500">Get notified to maintain your streak</span>
                </div>
                <Switch
                  checked={settings.enabled}
                  onCheckedChange={(enabled) => {
                    updateSettings({ enabled });
                    playSound('click');
                    if (enabled) requestNotificationPermission();
                  }}
                />
              </div>

              {settings.enabled && (
                <div className="space-y-4 ml-4">
                  
                  {/* Notification Permission */}
                  {'Notification' in window && Notification.permission !== 'granted' && (
                    <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-yellow-800 dark:text-yellow-200">
                            Enable Browser Notifications
                          </div>
                          <div className="text-sm text-yellow-600 dark:text-yellow-300">
                            Allow notifications to receive study reminders
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={requestNotificationPermission}
                          className="bg-yellow-600 hover:bg-yellow-700"
                        >
                          Enable
                        </Button>
                      </div>
                    </Card>
                  )}

                  {/* Time Selection */}
                  <div className="space-y-2">
                    <Label>Reminder Time</Label>
                    <Input
                      type="time"
                      value={settings.time}
                      onChange={(e) => handleTimeChange(e.target.value)}
                      className="w-40"
                    />
                  </div>

                  {/* Frequency */}
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select value={settings.frequency} onValueChange={handleFrequencyChange}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Every Day</SelectItem>
                        <SelectItem value="weekdays">Weekdays Only</SelectItem>
                        <SelectItem value="custom">Custom Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Custom Days */}
                  {settings.frequency === 'custom' && (
                    <div className="space-y-2">
                      <Label>Select Days</Label>
                      <div className="flex gap-2 flex-wrap">
                        {days.map((day, index) => (
                          <Button
                            key={day}
                            variant={selectedDays.includes(day) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleDayToggle(day)}
                            className="w-12 h-12"
                          >
                            {dayLabels[index]}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom Message */}
                  <div className="space-y-2">
                    <Label>Reminder Message</Label>
                    <Textarea
                      value={settings.message}
                      onChange={(e) => updateSettings({ message: e.target.value })}
                      placeholder="Enter your motivational reminder message..."
                      className="resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Sound */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">Notification Sound</span>
                      <span className="text-sm text-gray-500">Play sound with reminders</span>
                    </div>
                    <Switch
                      checked={settings.sound}
                      onCheckedChange={(sound) => {
                        updateSettings({ sound });
                        if (sound) playSound('notification');
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Recent Activity */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                📈 Recent Activity
              </h3>
              
              {studySessions.length > 0 ? (
                <div className="space-y-2">
                  {studySessions
                    .slice(-7)
                    .reverse()
                    .map((session, index) => (
                    <Card key={index} className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            {new Date(session.date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            {session.lessonsCompleted} lessons • {session.duration} min
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {session.score}% avg
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📚</div>
                  <p>No study sessions yet</p>
                  <p className="text-sm">Complete some lessons to see your progress!</p>
                </div>
              )}
            </div>

            {/* Tips */}
            <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
              <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">
                💡 Study Tips
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Set a consistent study time each day</li>
                <li>• Start with just 10-15 minutes daily</li>
                <li>• Focus on understanding concepts, not just memorizing</li>
                <li>• Take breaks between lessons to process information</li>
                <li>• Review previous lessons to reinforce learning</li>
              </ul>
            </Card>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}