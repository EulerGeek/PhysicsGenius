import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLessonData } from "@/lib/lessonsData";

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

export default function LessonIntro({ lesson, onStartLesson, onClose }: LessonIntroProps) {
  const [showNotes, setShowNotes] = useState(false);
  const [isReading, setIsReading] = useState(false);
  
  const lessonData = getLessonData(lesson.id);
  
  const handleReadNotes = () => {
    if (!lessonData?.feynmanNotes) return;
    
    setIsReading(true);
    
    if ('speechSynthesis' in window && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(lessonData.feynmanNotes);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);
      
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
    }
    
    setShowNotes(true);
  };

  const stopReading = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsReading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900">
        <CardContent className="p-0">
          <div className="gradient-primary p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-white">{lesson.title}</h2>
                <p className="text-blue-100">{lesson.description}</p>
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
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-white bg-opacity-20 text-white">
                <i className="fas fa-clock text-xs mr-1"></i>
                {lesson.duration}
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <i className="fas fa-gift text-xs mr-1"></i>
                100% FREE
              </Badge>
            </div>
          </div>

          <div className="p-6">
            {lessonData?.videoId && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Video Introduction</h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${lessonData.videoId}`}
                    title={lesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>
            )}

            {lessonData?.feynmanNotes && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Insights from Physics</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReadNotes}
                      disabled={isReading}
                      className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400"
                    >
                      <i className="fas fa-volume-up text-xs mr-1"></i>
                      {isReading ? "Reading..." : "Read Notes"}
                    </Button>
                    {isReading && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={stopReading}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <i className="fas fa-stop text-xs mr-1"></i>
                        Stop
                      </Button>
                    )}
                  </div>
                </div>
                
                {showNotes && (
                  <Card className="bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700">
                    <CardContent className="p-4">
                      <p className="text-sm text-blue-900 dark:text-blue-100 leading-relaxed italic">
                        "{lessonData.feynmanNotes}"
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">What You'll Learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check-circle text-green-500 text-sm"></i>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Core physics concepts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check-circle text-green-500 text-sm"></i>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Interactive problem solving</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check-circle text-green-500 text-sm"></i>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Real-world applications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check-circle text-green-500 text-sm"></i>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Mathematical understanding</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <i className="fas fa-question-circle text-primary mr-1"></i>
                {lessonData?.questions?.length || 12} interactive questions
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={onClose}>
                  Maybe Later
                </Button>
                <Button 
                  onClick={onStartLesson}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Start Learning
                  <i className="fas fa-arrow-right text-xs ml-2"></i>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}