import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DevPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSetProgress: (progress: any) => void;
}

export default function DevPanel({ isOpen, onClose, onSetProgress }: DevPanelProps) {
  if (!isOpen) return null;

  const setFullProgress = () => {
    const fullProgress = {
      streak: 30,
      overallProgress: 100,
      totalLessonsCompleted: 37,
      completedLessons: {
        classical: 15,
        relativity: 10,
        quantum: 12
      },
      scores: {
        // Classical Mechanics
        'cm-1': 100, 'cm-2': 95, 'cm-3': 98, 'cm-4': 92, 'cm-5': 96,
        'cm-6': 94, 'cm-7': 99, 'cm-8': 91, 'cm-9': 97, 'cm-10': 93,
        'cm-11': 95, 'cm-12': 98, 'cm-13': 96, 'cm-14': 94, 'cm-15': 100,
        // General Relativity
        'rel-1': 88, 'rel-2': 92, 'rel-3': 95, 'rel-4': 89, 'rel-5': 96,
        'rel-6': 93, 'rel-7': 91, 'rel-8': 97, 'rel-9': 94, 'rel-10': 90,
        // Quantum Mechanics
        'qm-1': 85, 'qm-2': 92, 'qm-3': 89, 'qm-4': 94, 'qm-5': 87,
        'qm-6': 95, 'qm-7': 91, 'qm-8': 93, 'qm-9': 88, 'qm-10': 96,
        'qm-11': 92, 'qm-12': 94
      }
    };
    onSetProgress(fullProgress);
    onClose();
  };

  const setPartialProgress = () => {
    const partialProgress = {
      streak: 15,
      overallProgress: 45,
      totalLessonsCompleted: 17,
      completedLessons: {
        classical: 8,
        relativity: 5,
        quantum: 4
      },
      scores: {
        'cm-1': 95, 'cm-2': 88, 'cm-3': 92, 'cm-4': 85, 'cm-5': 91,
        'cm-6': 89, 'cm-7': 94, 'cm-8': 87,
        'rel-1': 90, 'rel-2': 85, 'rel-3': 93, 'rel-4': 88, 'rel-5': 91,
        'qm-1': 82, 'qm-2': 89, 'qm-3': 85, 'qm-4': 92
      }
    };
    onSetProgress(partialProgress);
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