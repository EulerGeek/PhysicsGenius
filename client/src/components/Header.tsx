import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  progress: {
    streak: number;
  };
}

export default function Header({ progress }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-atom text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">QUOMA</h1>
              <p className="text-xs text-neutral-500">Your Personal Physics Geek</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
              <i className="fas fa-fire text-amber-500 text-sm"></i>
              <span className="text-sm font-medium text-neutral-700">{progress.streak} day streak</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                <i className="fas fa-gift text-xs mr-1"></i>
                100% FREE
              </Badge>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-neutral-600 hover:text-neutral-900"
                onClick={() => {
                  const text = "Welcome to QUOMA, your personal physics geek. Learn physics through interactive, bite-sized lessons covering Classical Mechanics, General Relativity, and Quantum Mechanics. This platform is completely free to use.";
                  if ('speechSynthesis' in window && window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.rate = 0.8;
                    utterance.pitch = 1;
                    utterance.volume = 1;
                    
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
                }}
              >
                <i className="fas fa-universal-access text-xs mr-1"></i>
                Read Mode
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
