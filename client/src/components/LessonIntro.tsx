import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LessonIntroProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    duration: string;
  };
  onStartLesson: () => void;
  onClose: () => void;
}

const videoSources = [
  { value: "mit-801", label: "MIT 8.01 - Classical Mechanics", icon: "fas fa-university" },
  { value: "mit-8012", label: "MIT 8.012 - Advanced Classical", icon: "fas fa-graduation-cap" },
  { value: "feynman", label: "Feynman Lectures", icon: "fas fa-user-graduate" },
  { value: "khan", label: "Khan Academy", icon: "fas fa-play-circle" }
];

export default function LessonIntro({ lesson, onStartLesson, onClose }: LessonIntroProps) {
  const [selectedSource, setSelectedSource] = useState("mit-801");
  const [isReadMode, setIsReadMode] = useState(false);

  // Publicly accessible physics education videos
  const getVideoId = (source: string, lessonId: string) => {
    const videoMap: Record<string, Record<string, string>> = {
      "mit-801": {
        "cm-1": "wWnfJ0-xXRE", // MIT Physics: Introduction to Classical Mechanics
        "cm-2": "ZM8ECpBuQYE", // MIT Physics: Forces and Newton's Laws
        "cm-3": "w4QFJb9a8vo", // MIT Physics: Work and Energy
        "cm-4": "9wzqXHsLIQI", // MIT Physics: Momentum
        "cm-5": "Oh4m8Ees-3Q"  // MIT Physics: Rotational Motion
      },
      "feynman": {
        "cm-1": "j3mhkYbznBk", // Feynman Physics: Motion
        "cm-2": "QRE0GxT6Zbw", // Feynman Physics: Forces
        "cm-3": "w4QFJb9a8vo", // Physics: Energy concepts
        "cm-4": "9wzqXHsLIQI", // Physics: Momentum
        "cm-5": "Oh4m8Ees-3Q"  // Physics: Rotation
      },
      "khan": {
        "cm-1": "VqK0s5dWagg", // Khan Academy: Introduction to Physics
        "cm-2": "kKKM8Y-u7ds", // Khan Academy: Newton's Laws
        "cm-3": "w4QFJb9a8vo", // Khan Academy: Work and Energy
        "cm-4": "9wzqXHsLIQI", // Khan Academy: Momentum
        "cm-5": "Oh4m8Ees-3Q"  // Khan Academy: Rotational Motion
      },
      "mit-8012": {
        "cm-1": "wWnfJ0-xXRE", // Advanced Classical Mechanics
        "cm-2": "ZM8ECpBuQYE", 
        "cm-3": "w4QFJb9a8vo",
        "cm-4": "9wzqXHsLIQI",
        "cm-5": "Oh4m8Ees-3Q"
      }
    };
    return videoMap[source]?.[lessonId] || "wWnfJ0-xXRE";
  };

  const readContent = () => {
    const text = `Lesson: ${lesson.title}. ${lesson.description}. This lesson will take approximately ${lesson.duration}. Click start lesson to begin the interactive content.`;
    
    if ('speechSynthesis' in window && window.speechSynthesis) {
      // Stop any currently playing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Wait for voices to load
      const speak = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          utterance.voice = voices.find(voice => voice.lang.startsWith('en')) || voices[0];
        }
        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = speak;
      } else {
        speak();
      }
    } else {
      alert("Speech synthesis is not supported in your browser. Please try using a modern browser like Chrome or Firefox.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-0">
          <div className="gradient-primary p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
                <p className="text-blue-100 mb-3">{lesson.description}</p>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="bg-white bg-opacity-20 text-white">
                    <i className="fas fa-clock text-xs mr-1"></i>
                    {lesson.duration}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    <i className="fas fa-gift text-xs mr-1"></i>
                    100% FREE
                  </Badge>
                </div>
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

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Watch Introduction Video</h3>
              <div className="flex items-center space-x-3">
                <Select value={selectedSource} onValueChange={setSelectedSource}>
                  <SelectTrigger className="w-56">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {videoSources.map((source) => (
                      <SelectItem key={source.value} value={source.value}>
                        <div className="flex items-center space-x-2">
                          <i className={`${source.icon} text-sm`}></i>
                          <span>{source.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsReadMode(!isReadMode);
                    if (!isReadMode) readContent();
                  }}
                  className={isReadMode ? "bg-blue-50 text-blue-600" : ""}
                >
                  <i className="fas fa-universal-access text-xs mr-1"></i>
                  Read Mode
                </Button>
              </div>
            </div>

            {!isReadMode ? (
              <div className="aspect-video bg-gray-100 rounded-lg mb-6 overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getVideoId(selectedSource, lesson.id)}?rel=0`}
                  title={`${lesson.title} - Introduction`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            ) : (
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-volume-up text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Audio Mode Active</h4>
                    <p className="text-blue-800 mb-3 leading-relaxed">
                      <strong>{lesson.title}</strong><br/>
                      {lesson.description}<br/>
                      Duration: {lesson.duration}
                    </p>
                    <Button
                      onClick={readContent}
                      size="sm"
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <i className="fas fa-play text-xs mr-1"></i>
                      Read Again
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <i className="fas fa-university text-primary text-xl mb-2"></i>
                <div className="text-sm font-medium">MIT Quality</div>
                <div className="text-xs text-gray-600">University-level content</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <i className="fas fa-gamepad text-green-600 text-xl mb-2"></i>
                <div className="text-sm font-medium">Interactive</div>
                <div className="text-xs text-gray-600">Hands-on learning</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <i className="fas fa-infinity text-purple-600 text-xl mb-2"></i>
                <div className="text-sm font-medium">Always Free</div>
                <div className="text-xs text-gray-600">No payment required</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="text-gray-600"
              >
                <i className="fas fa-arrow-left text-xs mr-2"></i>
                Back to Lessons
              </Button>
              <Button 
                onClick={onStartLesson}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                Start Interactive Lesson
                <i className="fas fa-arrow-right text-xs ml-2"></i>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}