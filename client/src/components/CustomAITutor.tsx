import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'explanation' | 'question' | 'encouragement' | 'hint';
}

interface AITutorProps {
  isOpen: boolean;
  onClose: () => void;
  currentQuestion: any;
  context: any;
}

// Custom AI Brain - Rule-based intelligent responses
class PhysicsAIBrain {
  private knowledge: Record<string, any> = {
    kinematics: {
      definitions: {
        velocity: "Velocity is the rate of change of position with respect to time. It's a vector quantity.",
        acceleration: "Acceleration is the rate of change of velocity with respect to time.",
        displacement: "Displacement is the change in position of an object.",
        speed: "Speed is the magnitude of velocity, a scalar quantity."
      },
      formulas: {
        velocity: "v = Δx/Δt",
        acceleration: "a = Δv/Δt", 
        kinematic1: "v = v₀ + at",
        kinematic2: "x = v₀t + ½at²",
        kinematic3: "v² = v₀² + 2ax"
      },
      examples: [
        "A car accelerating from rest reaches 60 mph in 8 seconds",
        "A ball thrown upward reaches maximum height when velocity becomes zero",
        "Free falling objects accelerate at 9.8 m/s² on Earth"
      ]
    },
    forces: {
      definitions: {
        force: "Force is a push or pull that can change an object's motion.",
        friction: "Friction is a force that opposes motion between surfaces in contact.",
        tension: "Tension is the force transmitted through a string, rope, or cable."
      },
      laws: [
        "First Law: An object at rest stays at rest, an object in motion stays in motion",
        "Second Law: F = ma (Force equals mass times acceleration)",
        "Third Law: For every action, there is an equal and opposite reaction"
      ]
    },
    energy: {
      definitions: {
        work: "Work is done when a force causes displacement: W = F·d",
        kinetic: "Kinetic energy is energy of motion: KE = ½mv²",
        potential: "Potential energy is stored energy: PE = mgh"
      }
    }
  };

  private responsePatterns = [
    {
      triggers: ["what is", "define", "definition"],
      responses: ["Let me explain that concept!", "Great question! Here's the definition:", "I'd be happy to define that for you!"]
    },
    {
      triggers: ["how to", "calculate", "solve"],
      responses: ["Let's work through this step by step!", "Here's how to approach this problem:", "Let me guide you through the solution!"]
    },
    {
      triggers: ["why", "reason", "because"],
      responses: ["That's a thoughtful question!", "Let me explain the reasoning:", "The key insight here is:"]
    },
    {
      triggers: ["example", "show me", "demonstrate"],
      responses: ["Here's a great example:", "Let me demonstrate with a real-world scenario:", "Consider this situation:"]
    }
  ];

  private encouragements = [
    "You're doing great! Keep thinking!",
    "Excellent question! Physics is all about curiosity!",
    "That's a smart observation!",
    "You're on the right track!",
    "I love your enthusiasm for learning!",
    "Physics can be tricky, but you're handling it well!",
    "Great thinking! Let's explore this further!"
  ];

  analyzeInput(input: string, context: any): Message {
    const lowerInput = input.toLowerCase();
    const words = lowerInput.split(' ');
    
    // Determine response type and content
    let responseText = "";
    let messageType: 'explanation' | 'question' | 'encouragement' | 'hint' = 'explanation';

    // Check for question patterns
    const matchedPattern = this.responsePatterns.find(pattern => 
      pattern.triggers.some(trigger => lowerInput.includes(trigger))
    );

    if (matchedPattern) {
      const randomResponse = matchedPattern.responses[Math.floor(Math.random() * matchedPattern.responses.length)];
      responseText = randomResponse + "\n\n";
    }

    // Physics concept detection
    if (lowerInput.includes('velocity')) {
      responseText += this.knowledge.kinematics.definitions.velocity;
      if (lowerInput.includes('calculate') || lowerInput.includes('formula')) {
        responseText += `\n\n📐 Formula: ${this.knowledge.kinematics.formulas.velocity}`;
      }
    } else if (lowerInput.includes('acceleration')) {
      responseText += this.knowledge.kinematics.definitions.acceleration;
      if (lowerInput.includes('formula')) {
        responseText += `\n\n📐 Formula: ${this.knowledge.kinematics.formulas.acceleration}`;
      }
    } else if (lowerInput.includes('force')) {
      responseText += this.knowledge.forces.definitions.force;
      if (lowerInput.includes('newton') || lowerInput.includes('law')) {
        responseText += "\n\n📚 Newton's Laws:\n" + this.knowledge.forces.laws.join('\n');
      }
    } else if (lowerInput.includes('energy')) {
      responseText += "Energy is the ability to do work! There are many types:\n\n";
      responseText += `🔋 ${this.knowledge.energy.definitions.kinetic}\n`;
      responseText += `⛰️ ${this.knowledge.energy.definitions.potential}\n`;
      responseText += `⚡ ${this.knowledge.energy.definitions.work}`;
    }

    // Problem-solving guidance
    if (lowerInput.includes('solve') || lowerInput.includes('problem')) {
      responseText += "\n\n🧮 Problem-solving steps:\n";
      responseText += "1. Identify what you know (given values)\n";
      responseText += "2. Identify what you need to find\n";
      responseText += "3. Choose the appropriate formula\n";
      responseText += "4. Substitute values and solve\n";
      responseText += "5. Check if your answer makes sense!";
    }

    // Encouragement for struggling
    if (lowerInput.includes('difficult') || lowerInput.includes('hard') || lowerInput.includes('confused')) {
      messageType = 'encouragement';
      responseText = this.encouragements[Math.floor(Math.random() * this.encouragements.length)];
      responseText += "\n\nLet's break this down into smaller pieces. What specific part would you like me to explain?";
    }

    // Hints for current question
    if (lowerInput.includes('hint') || lowerInput.includes('help')) {
      messageType = 'hint';
      responseText = this.generateHint(context.currentQuestion);
    }

    // Default fallback with encouragement
    if (!responseText) {
      responseText = "That's an interesting point! Physics is full of fascinating concepts. ";
      responseText += this.encouragements[Math.floor(Math.random() * this.encouragements.length)];
      responseText += "\n\nCould you tell me more about what you'd like to explore?";
    }

    return {
      id: Date.now().toString(),
      text: responseText,
      sender: 'ai',
      timestamp: new Date(),
      type: messageType
    };
  }

  generateHint(question: any): string {
    if (question.type === 'multiple-choice') {
      return "💡 Look carefully at each option. Think about the key physics concept being tested. Which option best matches the fundamental definition or principle?";
    } else if (question.type === 'fill-blank') {
      return "💡 Try to identify what formula or calculation you need. Look at the units given - they often provide clues about which equation to use!";
    } else if (question.type === 'simulation') {
      return "💡 Use the kinematic equations! Remember: x = v₀t + ½at². You know the target distance and time, so you can find the relationship between initial velocity and acceleration.";
    } else {
      return "💡 Think about the fundamental physics principles involved. Break the problem down step by step and consider what you know versus what you need to find.";
    }
  }

  generateWelcomeMessage(context: any): Message {
    const welcomeMessages = [
      "Hi there! I'm your personal physics tutor! 🤖✨",
      "Hello! Ready to explore the amazing world of physics together? 🚀",
      "Welcome! I'm here to help you master physics concepts! 🧠⚡"
    ];

    const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    
    return {
      id: Date.now().toString(),
      text: `${randomWelcome}\n\nI can help you with:\n• Understanding physics concepts\n• Solving problems step-by-step\n• Providing hints and explanations\n• Discussing real-world applications\n\nWhat would you like to explore about ${context.title}?`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'question'
    };
  }
}

export default function CustomAITutor({ isOpen, onClose, currentQuestion, context }: AITutorProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiBrain = useRef(new PhysicsAIBrain());

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = aiBrain.current.generateWelcomeMessage(context);
      setMessages([welcomeMessage]);
    }
  }, [isOpen, context]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate thinking time
    setTimeout(() => {
      const aiResponse = aiBrain.current.analyzeInput(inputText, { currentQuestion, ...context });
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200); // Random delay between 0.8-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Can you explain this concept?",
    "How do I solve this problem?",
    "Give me a hint",
    "What's a real-world example?",
    "Why is this important?"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[85vh] bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden flex flex-col">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🤖</div>
              <div>
                <CardTitle className="text-2xl font-bold">Physics AI Tutor</CardTitle>
                <p className="text-purple-100">Your personal learning companion</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-xl"
            >
              <span className="text-xl">✕</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-2xl rounded-br-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-2xl rounded-bl-md'
                  } p-4 shadow-md`}>
                    {message.sender === 'ai' && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🤖</span>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            message.type === 'encouragement' ? 'bg-green-100 text-green-700' :
                            message.type === 'hint' ? 'bg-yellow-100 text-yellow-700' :
                            message.type === 'question' ? 'bg-purple-100 text-purple-700' :
                            'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {message.type || 'explanation'}
                        </Badge>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md p-4 shadow-md">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🤖</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-sm text-gray-500">thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="mb-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputText(question)}
                    className="text-xs rounded-full"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Ask me anything about physics..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6"
              >
                <span className="text-lg">🚀</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}