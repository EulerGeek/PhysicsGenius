import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { classicalMechanicsLessons, type Level, type Lesson } from '@/lib/classicalMechanicsData';

interface CandyCrushLevelMapProps {
  onLevelSelect: (level: Level) => void;
  progress: any;
}

export default function CandyCrushLevelMap({ onLevelSelect, progress }: CandyCrushLevelMapProps) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'gradient-green';
      case 'medium': return 'gradient-blue';
      case 'hard': return 'gradient-orange';
      case 'expert': return 'gradient-triadic';
      default: return 'gradient-green';
    }
  };

  const getStarDisplay = (stars: number) => {
    return '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
  };

  if (!selectedLesson) {
    return (
      <div className="min-h-screen bg-gradient-triadic p-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold mb-4 text-black bg-white/90 rounded-lg p-4 mx-auto inline-block">
              🚀 Classical Mechanics Adventure
            </h1>
            <p className="text-xl text-black bg-white/80 rounded-lg p-3 mx-auto inline-block">
              Choose your physics journey and master motion, forces, and energy!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classicalMechanicsLessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedLesson(lesson)}
                className={`
                  ${lesson.color} p-6 rounded-xl cursor-pointer
                  border-4 border-white shadow-2xl
                  transform transition-all duration-300
                  hover:shadow-3xl hover:border-yellow-300
                  ${!lesson.isUnlocked ? 'opacity-60 grayscale' : ''}
                `}
              >
                <div className="text-center">
                  <div className="text-6xl mb-3">{lesson.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2 text-shadow-strong">
                    {lesson.title}
                  </h3>
                  <p className="text-white/90 mb-4 font-semibold">
                    {lesson.description}
                  </p>
                  
                  <div className="bg-white/20 rounded-lg p-3 mb-4">
                    <div className="text-sm text-white font-bold mb-1">Progress</div>
                    <div className="w-full bg-white/30 rounded-full h-3">
                      <div 
                        className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${lesson.overallProgress}%` }}
                      />
                    </div>
                    <div className="text-xs text-white mt-1">
                      {lesson.levels.filter(l => l.isCompleted).length}/{lesson.levels.length} levels
                    </div>
                  </div>

                  <div className="flex justify-center space-x-2">
                    {lesson.levels.slice(0, 3).map((level, i) => (
                      <div
                        key={i}
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                          ${level.isCompleted ? 'bg-emerald-500 text-white' : 
                            level.isLocked ? 'bg-gray-400 text-gray-600' : 'bg-white text-black'}
                        `}
                      >
                        {level.isCompleted ? '✓' : level.number}
                      </div>
                    ))}
                    {lesson.levels.length > 3 && (
                      <div className="text-white font-bold">
                        +{lesson.levels.length - 3}
                      </div>
                    )}
                  </div>

                  {!lesson.isUnlocked && (
                    <div className="mt-3 text-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        🔒 Complete previous lessons
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-triadic p-4 relative overflow-hidden">
      {/* Candy Crush Style Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-16 h-16 bg-pink-400 rounded-full animate-bounce" />
        <div className="absolute top-20 right-20 w-12 h-12 bg-yellow-400 rounded-full animate-bounce delay-300" />
        <div className="absolute bottom-20 left-20 w-14 h-14 bg-green-400 rounded-full animate-bounce delay-500" />
        <div className="absolute bottom-10 right-10 w-10 h-10 bg-blue-400 rounded-full animate-bounce delay-700" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <button
            onClick={() => setSelectedLesson(null)}
            className="btn-blue mb-4 px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
          >
            ← Back to Lessons
          </button>
          
          <h1 className="text-4xl font-bold mb-2 text-black bg-white/90 rounded-lg p-4 inline-block">
            {selectedLesson.icon} {selectedLesson.title}
          </h1>
          <p className="text-xl text-black bg-white/80 rounded-lg p-3 inline-block">
            {selectedLesson.description}
          </p>
        </motion.div>

        {/* Candy Crush Style Level Path */}
        <div className="relative">
          {/* Winding Path Background */}
          <svg className="absolute inset-0 w-full h-full" style={{ height: `${selectedLesson.levels.length * 120 + 200}px` }}>
            <path
              d={`M 50 100 Q 300 80 350 150 Q 400 220 150 240 Q 50 260 100 320 Q 150 380 350 400 Q 500 420 450 480 Q 400 540 200 560 Q 50 580 100 640`}
              stroke="#3b82f6"
              strokeWidth="20"
              fill="none"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
          </svg>

          {/* Level Nodes */}
          <div className="relative z-20" style={{ height: `${selectedLesson.levels.length * 120 + 200}px` }}>
            {selectedLesson.levels.map((level, index) => {
              const isEven = index % 2 === 0;
              const topPosition = 100 + (index * 120);
              const leftPosition = isEven ? '10%' : '60%';

              return (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="absolute"
                  style={{ 
                    top: `${topPosition}px`,
                    left: leftPosition,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => !level.isLocked && onLevelSelect(level)}
                    className={`
                      relative w-24 h-24 rounded-full cursor-pointer
                      flex items-center justify-center
                      border-4 border-white shadow-2xl
                      transition-all duration-300
                      ${getDifficultyColor(level.difficulty)}
                      ${level.isLocked ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:shadow-3xl'}
                      ${level.isCompleted ? 'ring-4 ring-yellow-400' : ''}
                    `}
                  >
                    {/* Level Number */}
                    <div className="text-2xl font-bold text-white text-shadow-strong">
                      {level.isCompleted ? '✓' : level.number}
                    </div>

                    {/* Lock Icon */}
                    {level.isLocked && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">🔒</span>
                      </div>
                    )}

                    {/* Stars */}
                    {level.isCompleted && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="bg-yellow-400 rounded-full px-2 py-1 text-xs font-bold text-black">
                          {getStarDisplay(level.stars)}
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Level Info Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    className={`
                      absolute top-0 w-48 bg-white/95 rounded-lg p-3 border-2 border-blue-300
                      ${isEven ? 'left-32' : 'right-32'}
                    `}
                  >
                    <h4 className="font-bold text-black text-sm mb-1">{level.title}</h4>
                    <p className="text-xs text-gray-700 mb-2">{level.description}</p>
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className={`
                        px-2 py-1 rounded-full font-bold
                        ${level.difficulty === 'easy' ? 'bg-green-200 text-green-800' :
                          level.difficulty === 'medium' ? 'bg-blue-200 text-blue-800' :
                          level.difficulty === 'hard' ? 'bg-orange-200 text-orange-800' :
                          'bg-purple-200 text-purple-800'}
                      `}>
                        {level.difficulty.toUpperCase()}
                      </span>
                      <span className="text-yellow-600 font-bold">+{level.xpReward} XP</span>
                    </div>

                    {level.isCompleted && (
                      <div className="mt-2 text-center">
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          ✅ COMPLETED
                        </span>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}