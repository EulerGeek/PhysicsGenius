import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Level, type Question } from '@/lib/classicalMechanicsData';

interface CandyCrushLevelPlayerProps {
  level: Level;
  onComplete: (score: number, stars: number) => void;
  onClose: () => void;
}

export default function CandyCrushLevelPlayer({ level, onComplete, onClose }: CandyCrushLevelPlayerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);
  const [showConceptFirst, setShowConceptFirst] = useState(true);

  const currentQuestion = level.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === level.questions.length - 1;
  const totalQuestions = level.questions.length;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-400 to-green-600';
      case 'medium': return 'from-blue-400 to-blue-600';
      case 'hard': return 'from-orange-400 to-orange-600';
      case 'expert': return 'from-purple-400 to-purple-600';
      default: return 'from-green-400 to-green-600';
    }
  };

  const handleAnswerSubmit = () => {
    const answer = selectedAnswer || userAnswer;
    const isCorrect = Array.isArray(currentQuestion.correctAnswer) 
      ? currentQuestion.correctAnswer.includes(answer)
      : currentQuestion.correctAnswer === answer;

    if (isCorrect) {
      setScore(score + currentQuestion.points);
      setCompletedQuestions([...completedQuestions, currentQuestion.id]);
    } else {
      setHearts(hearts - 1);
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer('');
    setUserAnswer('');
    setShowHint(false);

    if (isLastQuestion) {
      const finalStars = hearts === 3 ? 3 : hearts === 2 ? 2 : hearts >= 1 ? 1 : 0;
      onComplete(score, finalStars);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleStartLevel = () => {
    setShowConceptFirst(false);
  };

  if (hearts === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-xl p-8 text-center max-w-md mx-auto"
        >
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-3xl font-bold text-red-600 mb-4">Game Over!</h2>
          <p className="text-gray-700 mb-6">Don't worry! Every physicist learns from mistakes.</p>
          
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="btn-orange w-full py-3 rounded-lg font-bold"
            >
              🔄 Try Again
            </button>
            <button
              onClick={onClose}
              className="btn-blue w-full py-3 rounded-lg font-bold"
            >
              📚 Back to Levels
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (showConceptFirst) {
    return (
      <div className="min-h-screen bg-gradient-triadic flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-xl p-8 max-w-2xl mx-auto border-4 border-blue-500"
        >
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-3xl font-bold text-black mb-2">
              Level {level.number}: {level.title}
            </h2>
            <p className="text-gray-700 mb-4">{level.description}</p>
            
            <div className={`
              inline-block px-4 py-2 rounded-full font-bold text-white mb-4
              ${level.difficulty === 'easy' ? 'bg-green-500' :
                level.difficulty === 'medium' ? 'bg-blue-500' :
                level.difficulty === 'hard' ? 'bg-orange-500' : 'bg-purple-500'}
            `}>
              {level.difficulty.toUpperCase()} • +{level.xpReward} XP
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-black mb-3">💡 Key Concept</h3>
            <p className="text-gray-800 mb-4">{level.concept}</p>
            
            {level.formula && (
              <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                <h4 className="font-bold text-black mb-2">📐 Formula:</h4>
                <div className="text-lg font-mono text-blue-800">{level.formula}</div>
              </div>
            )}
          </div>

          {level.tips && level.tips.length > 0 && (
            <div className="bg-yellow-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-black mb-3">💡 Pro Tips</h3>
              <ul className="space-y-2">
                {level.tips.map((tip, index) => (
                  <li key={index} className="flex items-start text-gray-800">
                    <span className="text-yellow-500 mr-2">★</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={handleStartLevel}
              className="btn-triadic px-8 py-4 rounded-lg font-bold text-xl"
            >
              🚀 Start Level!
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getDifficultyColor(level.difficulty)} p-4`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
        <button
          onClick={onClose}
          className="btn-blue px-4 py-2 rounded-lg font-bold"
        >
          ← Back
        </button>

        <div className="flex items-center space-x-4">
          {/* Hearts */}
          <div className="flex space-x-1">
            {[1, 2, 3].map((heart) => (
              <motion.div
                key={heart}
                animate={hearts < heart ? { scale: 0.5, opacity: 0.3 } : { scale: 1, opacity: 1 }}
                className="text-2xl"
              >
                {hearts >= heart ? '❤️' : '🤍'}
              </motion.div>
            ))}
          </div>

          {/* Progress */}
          <div className="bg-white/20 rounded-full px-4 py-2">
            <span className="text-white font-bold">
              {currentQuestionIndex + 1}/{totalQuestions}
            </span>
          </div>

          {/* Score */}
          <div className="bg-emerald-500 rounded-full px-4 py-2">
            <span className="text-white font-bold">⭐ {score}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="w-full bg-white/30 rounded-full h-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            className="bg-yellow-400 h-4 rounded-full transition-all duration-500"
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white rounded-xl p-8 border-4 border-yellow-400 shadow-2xl"
          >
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🤔</div>
              <h3 className="text-2xl font-bold text-black mb-4">
                {currentQuestion.question}
              </h3>
            </div>

            {!showExplanation && (
              <>
                {/* Multiple Choice */}
                {currentQuestion.type === 'multiple_choice' && (
                  <div className="space-y-4 mb-6">
                    {currentQuestion.options?.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedAnswer(option)}
                        className={`
                          w-full p-4 rounded-lg border-2 font-bold text-left transition-all
                          ${selectedAnswer === option 
                            ? 'border-blue-500 bg-blue-100 text-blue-800' 
                            : 'border-gray-300 bg-gray-50 text-gray-800 hover:border-blue-300'}
                        `}
                      >
                        <span className="text-blue-600 font-bold mr-3">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        {option}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Calculation Input */}
                {currentQuestion.type === 'calculation' && (
                  <div className="mb-6">
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Enter your answer..."
                      className="w-full p-4 border-2 border-gray-300 rounded-lg text-xl font-bold text-center focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                )}

                {/* True/False */}
                {currentQuestion.type === 'true_false' && (
                  <div className="flex space-x-4 mb-6 justify-center">
                    {['True', 'False'].map((option) => (
                      <motion.button
                        key={option}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedAnswer(option)}
                        className={`
                          px-8 py-4 rounded-lg border-2 font-bold text-xl transition-all
                          ${selectedAnswer === option 
                            ? 'border-blue-500 bg-blue-100 text-blue-800' 
                            : 'border-gray-300 bg-gray-50 text-gray-800 hover:border-blue-300'}
                        `}
                      >
                        {option === 'True' ? '✅ True' : '❌ False'}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="btn-orange px-4 py-2 rounded-lg font-bold"
                    disabled={!currentQuestion.hint}
                  >
                    💡 Hint
                  </button>

                  <button
                    onClick={handleAnswerSubmit}
                    disabled={!selectedAnswer && !userAnswer}
                    className="btn-green px-8 py-3 rounded-lg font-bold text-xl disabled:opacity-50"
                  >
                    Submit Answer
                  </button>
                </div>

                {/* Hint */}
                {showHint && currentQuestion.hint && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4"
                  >
                    <div className="flex items-start">
                      <span className="text-yellow-500 text-xl mr-2">💡</span>
                      <p className="text-yellow-800 font-semibold">{currentQuestion.hint}</p>
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {/* Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">
                    {(selectedAnswer || userAnswer) === (Array.isArray(currentQuestion.correctAnswer) 
                      ? currentQuestion.correctAnswer[0] 
                      : currentQuestion.correctAnswer) ? '🎉' : '😞'}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">
                    {(selectedAnswer || userAnswer) === (Array.isArray(currentQuestion.correctAnswer) 
                      ? currentQuestion.correctAnswer[0] 
                      : currentQuestion.correctAnswer) 
                      ? 'Correct!' : 'Not quite right...'}
                  </h3>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <h4 className="font-bold text-black mb-2">💡 Explanation:</h4>
                  <p className="text-gray-800">{currentQuestion.explanation}</p>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleNextQuestion}
                    className="btn-triadic px-8 py-3 rounded-lg font-bold text-xl"
                  >
                    {isLastQuestion ? '🏆 Complete Level!' : '➡️ Next Question'}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}