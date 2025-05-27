import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAudio } from "@/hooks/useAudio";

interface CustomAudioSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomAudioSettings({ isOpen, onClose }: CustomAudioSettingsProps) {
  const { playSound, uploadCustomSound, removeCustomSound, customSounds: savedCustomSounds } = useAudio();
  const [customSounds, setCustomSounds] = useState(() => {
    const saved = localStorage.getItem('quoma-custom-sounds');
    return saved ? JSON.parse(saved) : {
      correct: '',
      incorrect: '',
      complete: '',
      click: '',
      notification: ''
    };
  });

  if (!isOpen) return null;

  const handleFileUpload = (soundType: string, file: File) => {
    // Use the uploadCustomSound function from useAudio hook
    uploadCustomSound(soundType, file);
    
    // Update local state for UI
    const url = URL.createObjectURL(file);
    setCustomSounds((prev: any) => ({ ...prev, [soundType]: url }));
  };

  const testSound = (soundType: string) => {
    const customUrl = customSounds[soundType as keyof typeof customSounds];
    if (customUrl) {
      const audio = new Audio(customUrl);
      audio.play().catch(() => {
        alert('Could not play custom sound. Please check the file format.');
      });
    } else {
      playSound(soundType as any);
    }
  };

  const resetToDefault = (soundType: string) => {
    // Use the removeCustomSound function from useAudio hook
    removeCustomSound(soundType);
    
    // Update local state for UI
    setCustomSounds((prev: any) => ({ ...prev, [soundType]: '' }));
  };

  const soundTypes = [
    { key: 'correct', label: 'Correct Answer', emoji: '✅' },
    { key: 'incorrect', label: 'Incorrect Answer', emoji: '❌' },
    { key: 'complete', label: 'Lesson Complete', emoji: '🎉' },
    { key: 'click', label: 'Button Click', emoji: '👆' },
    { key: 'notification', label: 'Notification', emoji: '🔔' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2">
              🎵 Custom Sound Effects
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onClose}>
              ✕ Close
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">
              📁 How to Add Custom Sounds
            </h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Upload audio files in MP3, WAV, or OGG format</li>
              <li>• Keep files under 1MB for best performance</li>
              <li>• Short sounds (0.5-3 seconds) work best</li>
              <li>• Test each sound after uploading</li>
              <li>• Reset to default anytime</li>
            </ul>
          </div>

          <Separator />

          {/* Sound Upload Settings */}
          <div className="space-y-4">
            {soundTypes.map((sound) => (
              <Card key={sound.key} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{sound.emoji}</span>
                      <div>
                        <Label className="font-medium">{sound.label}</Label>
                        <div className="text-xs text-gray-500">
                          {customSounds[sound.key as keyof typeof customSounds] ? 'Custom sound loaded' : 'Using default sound'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => testSound(sound.key)}
                      >
                        🔊 Test
                      </Button>
                      
                      {customSounds[sound.key as keyof typeof customSounds] && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => resetToDefault(sound.key)}
                        >
                          Reset
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <Input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload(sound.key, file);
                      }
                    }}
                    className="text-sm"
                  />
                </div>
              </Card>
            ))}
          </div>

          <Separator />

          {/* Tips */}
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">
              💡 Sound Effect Tips
            </h3>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• <strong>Correct Answer:</strong> Upbeat, positive sounds (chime, bell)</li>
              <li>• <strong>Incorrect Answer:</strong> Gentle, non-harsh sounds (soft buzz)</li>
              <li>• <strong>Lesson Complete:</strong> Celebratory sounds (fanfare, applause)</li>
              <li>• <strong>Button Click:</strong> Short, crisp sounds (pop, click)</li>
              <li>• <strong>Notification:</strong> Attention-getting but pleasant sounds</li>
            </ul>
          </div>

          {/* Test All Sounds */}
          <div className="text-center">
            <Button 
              onClick={() => {
                soundTypes.forEach((sound, index) => {
                  setTimeout(() => testSound(sound.key), index * 500);
                });
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              🎵 Test All Sounds
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}