import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface DevPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSetProgress: (progress: any) => void;
}

export default function DevPanel({ isOpen, onClose, onSetProgress }: DevPanelProps) {
  const [progressValue, setProgressValue] = useState([50]);
  
  if (!isOpen) return null;

  const generateProgressFromSlider = (percentage: number) => {
    const totalLessons = 37; // 15 CM + 10 REL + 12 QM
    const completedCount = Math.floor((percentage / 100) * totalLessons);
    
    // Distribute lessons across courses
    const cmLessons = Math.min(15, Math.floor(completedCount * 0.4));
    const relLessons = Math.min(10, Math.floor((completedCount - cmLessons) * 0.5));
    const qmLessons = Math.min(12, completedCount - cmLessons - relLessons);
    
    const scores: Record<string, number> = {};
    
    // Add CM scores
    for (let i = 1; i <= cmLessons; i++) {
      scores[`cm-${i}`] = 80 + Math.floor(Math.random() * 20);
    }
    
    // Add REL scores
    for (let i = 1; i <= relLessons; i++) {
      scores[`rel-${i}`] = 80 + Math.floor(Math.random() * 20);
    }
    
    // Add QM scores
    for (let i = 1; i <= qmLessons; i++) {
      scores[`qm-${i}`] = 80 + Math.floor(Math.random() * 20);
    }
    
    return {
      streak: Math.floor(percentage / 5), // Rough correlation
      overallProgress: percentage,
      totalLessonsCompleted: completedCount,
      completedLessons: {
        classical: cmLessons,
        relativity: relLessons,
        quantum: qmLessons
      },
      scores
    };
  };

  const applySliderProgress = () => {
    const progress = generateProgressFromSlider(progressValue[0]);
    onSetProgress(progress);
    onClose();
  };

  const resetProgress = () => {
    const emptyProgress = {
      streak: 0,
      overallProgress: 0,
      totalLessonsCompleted: 0,
      completedLessons: { classical: 0, relativity: 0, quantum: 0 },
      scores: {}
    };
    onSetProgress(emptyProgress);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white dark:bg-gray-900">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Dev Panel</h2>
                <p className="text-purple-100">Quick development shortcuts</p>
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
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <i className="fas fa-code text-xs mr-1"></i>
              Development Only
            </Badge>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Progress Shortcuts</h3>
              <div className="space-y-2">
                <Button
                  onClick={setFullProgress}
                  className="w-full bg-green-600 text-white hover:bg-green-700"
                >
                  <i className="fas fa-trophy text-xs mr-2"></i>
                  Set 100% Progress (All Lessons Complete)
                </Button>
                <Button
                  onClick={setPartialProgress}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  <i className="fas fa-chart-line text-xs mr-2"></i>
                  Set 45% Progress (Partial Complete)
                </Button>
                <Button
                  onClick={resetProgress}
                  variant="outline"
                  className="w-full text-red-600 border-red-600 hover:bg-red-50"
                >
                  <i className="fas fa-redo text-xs mr-2"></i>
                  Reset to 0% Progress
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Available Lessons</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div><strong>Classical Mechanics:</strong> cm-1 through cm-15 (15 lessons)</div>
                <div><strong>General Relativity:</strong> rel-1 through rel-10 (10 lessons)</div>
                <div><strong>Quantum Mechanics:</strong> qm-1 through qm-12 (12 lessons)</div>
                <div className="pt-2 text-xs text-green-600">
                  <i className="fas fa-info-circle mr-1"></i>
                  Each lesson has 12+ interactive questions
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 text-center">
                Use these shortcuts to quickly test different progress states
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}