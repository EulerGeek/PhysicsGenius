import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface VoiceNavigationAssistantProps {
  onNavigate: (command: string) => void;
  onVoiceCommand: (command: string, action: string) => void;
  currentPage?: string;
}

export default function VoiceNavigationAssistant({ 
  onNavigate, 
  onVoiceCommand, 
  currentPage = 'home' 
}: VoiceNavigationAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastCommand, setLastCommand] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isWakeWordListening, setIsWakeWordListening] = useState(true);
  const [showCharacter, setShowCharacter] = useState(false);
  const recognitionRef = useRef<any>(null);
  const wakeWordRef = useRef<any>(null);

  // Voice commands mapping
  const voiceCommands = {
    navigation: {
      'go home': () => onNavigate('/'),
      'home page': () => onNavigate('/'),
      'classical mechanics': () => onNavigate('/classical-mechanics'),
      'quantum mechanics': () => onNavigate('/quantum-mechanics'),
      'general relativity': () => onNavigate('/general-relativity'),
      'mathematics': () => onNavigate('/mathematics'),
      'algebra': () => onNavigate('/algebra'),
      'calculus': () => onNavigate('/calculus'),
      'physics': () => onNavigate('/physics'),
      'settings': () => onNavigate('/settings'),
      'about': () => onNavigate('/about')
    },
    actions: {
      'start lesson': () => onVoiceCommand('start_lesson', 'Starting lesson...'),
      'next question': () => onVoiceCommand('next_question', 'Moving to next question...'),
      'previous question': () => onVoiceCommand('prev_question', 'Going back to previous question...'),
      'read question': () => onVoiceCommand('read_question', 'Reading question aloud...'),
      'repeat': () => onVoiceCommand('repeat', 'Repeating current content...'),
      'help': () => onVoiceCommand('help', 'Here are available voice commands...'),
      'pause': () => onVoiceCommand('pause', 'Pausing current activity...'),
      'resume': () => onVoiceCommand('resume', 'Resuming activity...'),

      'ai tutor': () => onVoiceCommand('ai_tutor', 'Opening AI tutor assistant...'),
      'close': () => onVoiceCommand('close', 'Closing current window...'),
      'show progress': () => onVoiceCommand('show_progress', 'Displaying your progress...'),
      'reset progress': () => onVoiceCommand('reset_progress', 'Resetting your progress...')
    },
    answers: {
      'option a': () => onVoiceCommand('select_answer', 'a'),
      'option b': () => onVoiceCommand('select_answer', 'b'),
      'option c': () => onVoiceCommand('select_answer', 'c'),
      'option d': () => onVoiceCommand('select_answer', 'd'),
      'answer a': () => onVoiceCommand('select_answer', 'a'),
      'answer b': () => onVoiceCommand('select_answer', 'b'),
      'answer c': () => onVoiceCommand('select_answer', 'c'),
      'answer d': () => onVoiceCommand('select_answer', 'd'),
      'submit answer': () => onVoiceCommand('submit_answer', 'Submitting your answer...'),
      'check answer': () => onVoiceCommand('check_answer', 'Checking your answer...')
    }
  };

  // Wake word detection function
  const startWakeWordListening = () => {
    if (!isSupported || wakeWordRef.current) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const wakeWordRecognition = new SpeechRecognition();
    
    wakeWordRecognition.continuous = true;
    wakeWordRecognition.interimResults = true;
    wakeWordRecognition.lang = 'en-US';

    wakeWordRecognition.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript.toLowerCase();
        
        if (transcript.includes('hey quoma') || transcript.includes('quoma')) {
          // Wake word detected! Show Quoma character and start voice recognition
          setIsWakeWordListening(false);
          setShowCharacter(true);
          speak('Hi! I\'m Quoma, your physics learning assistant! How can I help you today?');
          startListening();
          
          // Auto-hide character and restart wake word listening after 10 seconds
          setTimeout(() => {
            if (!isListening) {
              setShowCharacter(false);
              setIsWakeWordListening(true);
            }
          }, 10000);
          break;
        }
      }
    };

    wakeWordRecognition.onerror = () => {
      // Silently restart wake word listening
      setTimeout(startWakeWordListening, 1000);
    };

    wakeWordRecognition.onend = () => {
      // Automatically restart wake word listening
      if (isWakeWordListening) {
        setTimeout(startWakeWordListening, 500);
      }
    };

    try {
      wakeWordRecognition.start();
      wakeWordRef.current = wakeWordRecognition;
    } catch (error) {
      console.log('Wake word recognition not available');
    }
  };

  useEffect(() => {
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const confidence = event.results[i][0].confidence;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            setConfidence(confidence);
          } else {
            interimTranscript += transcript;
          }
        }

        const fullTranscript = finalTranscript || interimTranscript;
        setTranscript(fullTranscript);

        if (finalTranscript) {
          processVoiceCommand(finalTranscript.toLowerCase().trim());
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'not-allowed') {
          speak('Please allow microphone access to use voice commands.');
        } else if (event.error === 'no-speech') {
          speak('No speech detected. Please try again.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      
      // Start wake word listening automatically
      startWakeWordListening();
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (wakeWordRef.current) {
        wakeWordRef.current.abort();
      }
    };
  }, []);

  const processVoiceCommand = (command: string) => {
    setLastCommand(command);
    setShowFeedback(true);
    
    // Remove common words and normalize
    const normalizedCommand = command
      .replace(/^(hey|ok|please|can you|could you|quoma)/i, '')
      .trim();

    // Check all command categories
    const allCommands = {
      ...voiceCommands.navigation,
      ...voiceCommands.actions,
      ...voiceCommands.answers
    };

    // Find exact match first
    if (allCommands[normalizedCommand]) {
      allCommands[normalizedCommand]();
      speak(`Executing: ${normalizedCommand}`);
      return;
    }

    // Find partial matches
    const matches = Object.keys(allCommands).filter(cmd => 
      normalizedCommand.includes(cmd) || cmd.includes(normalizedCommand)
    );

    if (matches.length > 0) {
      const bestMatch = matches[0];
      allCommands[bestMatch]();
      speak(`Executing: ${bestMatch}`);
      return;
    }

    // Special number handling for lessons
    const lessonMatch = normalizedCommand.match(/lesson (\d+)/);
    if (lessonMatch) {
      const lessonNumber = lessonMatch[1];
      onVoiceCommand('open_lesson', lessonNumber);
      speak(`Opening lesson ${lessonNumber}`);
      return;
    }

    // No command found
    speak('Sorry, I didn\'t understand that command. Try saying "help" for available commands.');
    
    setTimeout(() => setShowFeedback(false), 3000);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Prefer female voice for better accessibility
        const preferredVoice = voices.find(voice => 
          voice.name.includes('Female') || 
          voice.name.includes('Samantha') ||
          voice.name.includes('Victoria')
        ) || voices[0];
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (!isSupported) {
      speak('Voice recognition is not supported in this browser.');
      return;
    }

    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const speakHelp = () => {
    const helpText = `Available voice commands: 
    Navigation: Say "go home", "classical mechanics", "quantum mechanics", or "mathematics".
    Actions: Say "start lesson", "next question", "read question", "connect dots", or "help".
    Answers: Say "option A", "option B", "option C", or "option D" to select answers.
    You can also say "lesson" followed by a number to open specific lessons.`;
    
    speak(helpText);
  };

  if (!isSupported) {
    return (
      <div className="fixed bottom-4 left-4 z-40">
        <Card className="bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700">
          <CardContent className="p-4">
            <p className="text-sm text-red-700 dark:text-red-300">
              🎤 Voice navigation not supported in this browser
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-40">
      {/* Simple Voice Button */}
      <Button
        onClick={isListening ? stopListening : startListening}
        className={`w-14 h-14 rounded-full transition-all duration-300 ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white shadow-lg hover:shadow-xl hover:scale-110`}
      >
        <span className="text-2xl">
          {isListening ? '🔴' : '🎤'}
        </span>
      </Button>
    </div>
  );
}