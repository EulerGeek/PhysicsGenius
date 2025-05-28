import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface QuomaCharacterProps {
  isActive: boolean;
  isListening: boolean;
  onClose: () => void;
}

export default function QuomaCharacter({ isActive, isListening, onClose }: QuomaCharacterProps) {
  const [animation, setAnimation] = useState('idle');
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState('');

  useEffect(() => {
    if (isActive) {
      setAnimation('appear');
      setBubbleText('Hi! I\'m Quoma, your physics learning assistant!');
      setShowBubble(true);
      
      setTimeout(() => {
        setAnimation(isListening ? 'listening' : 'idle');
      }, 1000);
    } else {
      setAnimation('disappear');
      setShowBubble(false);
    }
  }, [isActive, isListening]);

  if (!isActive && animation !== 'disappear') return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
      {/* Speech Bubble */}
      {showBubble && (
        <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 mb-4 bounce-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl px-6 py-4 shadow-2xl border-4 border-blue-200 dark:border-blue-600 max-w-xs relative">
            <p className="text-sm font-semibold text-gray-800 dark:text-white text-center">
              {bubbleText}
            </p>
            {/* Speech bubble tail */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-blue-200 dark:border-t-blue-600"></div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800 mt-0.5"></div>
            
            {/* Close button */}
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white pointer-events-auto"
            >
              ×
            </Button>
          </div>
        </div>
      )}

      {/* Quoma Character */}
      <div className={`character-container ${animation} ${isListening ? 'listening-pulse' : ''}`}>
        {/* Character Body */}
        <div className="relative">
          {/* Main Body - Friendly Robot/Atom Design */}
          <div className="w-32 h-32 bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center border-4 border-white relative">
            
            {/* Eyes */}
            <div className="absolute top-8 left-8 w-4 h-4 bg-white rounded-full shadow-lg">
              <div className={`w-2 h-2 bg-blue-600 rounded-full mt-1 ml-1 transition-all duration-300 ${isListening ? 'animate-pulse' : ''}`}></div>
            </div>
            <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full shadow-lg">
              <div className={`w-2 h-2 bg-blue-600 rounded-full mt-1 ml-1 transition-all duration-300 ${isListening ? 'animate-pulse' : ''}`}></div>
            </div>

            {/* Mouth */}
            <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
              isListening 
                ? 'w-6 h-6 bg-yellow-400 rounded-full animate-pulse' 
                : 'w-8 h-4 bg-yellow-400 rounded-full'
            }`}>
              {isListening && (
                <div className="absolute inset-0 rounded-full bg-yellow-300 animate-ping"></div>
              )}
            </div>

            {/* Physics Symbol in Center */}
            <div className="text-4xl text-white font-bold animate-pulse">⚛️</div>

            {/* Orbiting Particles */}
            <div className="absolute inset-0 rounded-full">
              <div className="absolute w-2 h-2 bg-yellow-400 rounded-full orbit-1 shadow-lg"></div>
              <div className="absolute w-2 h-2 bg-green-400 rounded-full orbit-2 shadow-lg"></div>
              <div className="absolute w-2 h-2 bg-red-400 rounded-full orbit-3 shadow-lg"></div>
            </div>

            {/* Sound Waves when Listening */}
            {isListening && (
              <>
                <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-4 h-1 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
                <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-6 h-1 bg-blue-300 rounded-full opacity-50 animate-pulse delay-100"></div>
                <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 w-8 h-1 bg-blue-300 rounded-full opacity-30 animate-pulse delay-200"></div>
                
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-4 h-1 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
                <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 w-6 h-1 bg-blue-300 rounded-full opacity-50 animate-pulse delay-100"></div>
                <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 w-8 h-1 bg-blue-300 rounded-full opacity-30 animate-pulse delay-200"></div>
              </>
            )}
          </div>

          {/* Character Name */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg border-2 border-blue-200 dark:border-blue-600">
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400">QUOMA</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .character-container {
          transition: all 0.5s ease-in-out;
        }

        .appear {
          animation: bounceIn 1s ease-out;
        }

        .disappear {
          animation: fadeOut 0.5s ease-in-out;
        }

        .idle {
          animation: float 3s ease-in-out infinite;
        }

        .listening-pulse {
          animation: float 3s ease-in-out infinite, glow 1s ease-in-out infinite alternate;
        }

        .orbit-1 {
          animation: orbit 4s linear infinite;
          transform-origin: 64px 64px;
        }

        .orbit-2 {
          animation: orbit 3s linear infinite reverse;
          transform-origin: 64px 64px;
        }

        .orbit-3 {
          animation: orbit 5s linear infinite;
          transform-origin: 64px 64px;
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0.3) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(5deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(0.3) rotate(10deg);
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }

        @keyframes glow {
          0% {
            filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
          }
          100% {
            filter: drop-shadow(0 0 20px rgba(59, 130, 246, 1));
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(50px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(50px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}