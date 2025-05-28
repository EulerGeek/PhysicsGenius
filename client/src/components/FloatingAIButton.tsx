import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomAITutor from "./CustomAITutor";

interface FloatingAIButtonProps {
  currentContext?: {
    courseId?: string;
    conceptId?: string;
    title?: string;
    description?: string;
  };
}

export default function FloatingAIButton({ currentContext }: FloatingAIButtonProps) {
  const [showAITutor, setShowAITutor] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  console.log('FloatingAIButton render - showAITutor:', showAITutor);

  const defaultContext = {
    courseId: 'general',
    conceptId: 'physics-help',
    title: 'Physics Learning Assistant',
    description: 'Get help with any physics concept or problem',
    currentQuestion: {
      id: 'general',
      type: 'discussion' as const,
      question: 'What would you like to learn about physics today?',
      correctAnswer: '',
      explanation: 'I\'m here to help you understand any physics concept!'
    }
  };

  const context = { 
    ...defaultContext, 
    ...currentContext,
    currentQuestion: defaultContext.currentQuestion
  };

  return (
    <>
      {/* Floating AI Button */}
      <div 
        className="fixed bottom-6 right-6 z-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          {/* Tooltip */}
          <div className={`absolute bottom-16 right-0 bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}>
            Ask your AI Physics Tutor! 🤖
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
          </div>

          {/* AI Button */}
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('AI Button clicked!');
              setShowAITutor(true);
            }}
            className={`w-18 h-18 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white shadow-2xl transition-all duration-500 ${
              isHovered ? 'scale-125 shadow-purple-500/40 hover-glow' : 'scale-100 float-animation'
            } flex items-center justify-center relative overflow-hidden group cursor-pointer z-50`}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
            
            <div className="text-center relative z-10">
              <div className={`text-3xl mb-1 transition-transform duration-300 ${isHovered ? 'wiggle' : ''}`}>🤖</div>
              <div className="text-xs font-bold tracking-wide">AI</div>
            </div>
          </Button>

          {/* Multi-layer Pulse Animation */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-1000 ${
            isHovered ? 'animate-ping opacity-30' : 'opacity-0'
          }`}></div>
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-1500 ${
            isHovered ? 'animate-ping opacity-20' : 'opacity-0'
          }`} style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>

      {/* AI Tutor Modal */}
      <CustomAITutor
        isOpen={showAITutor}
        onClose={() => setShowAITutor(false)}
        currentQuestion={defaultContext.currentQuestion}
        context={context}
      />
    </>
  );
}