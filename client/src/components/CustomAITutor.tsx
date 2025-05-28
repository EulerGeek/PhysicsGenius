import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

// Custom AI Brain - Advanced Rule-based intelligent responses
class PhysicsAIBrain {
  private knowledge: Record<string, any> = {
    kinematics: {
      definitions: {
        velocity: "Velocity is the rate of change of position with respect to time. It's a vector quantity with both magnitude and direction.",
        acceleration: "Acceleration is the rate of change of velocity with respect to time. It can be positive (speeding up) or negative (slowing down).",
        displacement: "Displacement is the change in position of an object - it's the straight-line distance from start to finish.",
        speed: "Speed is the magnitude of velocity, a scalar quantity that tells us how fast something is moving.",
        position: "Position describes where an object is located relative to a reference point.",
        "free fall": "Free fall is motion under gravity alone, with acceleration g = 9.8 m/s² downward on Earth."
      },
      formulas: {
        velocity: "v = Δx/Δt (average velocity)",
        acceleration: "a = Δv/Δt (average acceleration)", 
        kinematic1: "v = v₀ + at (final velocity)",
        kinematic2: "x = v₀t + ½at² (position equation)",
        kinematic3: "v² = v₀² + 2ax (no time equation)",
        kinematic4: "x = ½(v₀ + v)t (average velocity method)"
      },
      examples: [
        "A car accelerating from rest reaches 60 mph in 8 seconds: a = (60-0)/8 = 7.5 mph/s",
        "A ball thrown upward reaches maximum height when velocity becomes zero",
        "Free falling objects accelerate at 9.8 m/s² on Earth regardless of mass",
        "Projectile motion combines horizontal motion (constant velocity) and vertical motion (constant acceleration)"
      ],
      problemSolving: [
        "1. Identify what you know (given values)",
        "2. Identify what you need to find (unknown)",
        "3. Choose the right kinematic equation",
        "4. Substitute values and solve",
        "5. Check if your answer makes physical sense"
      ]
    },
    forces: {
      definitions: {
        force: "Force is a push or pull that can change an object's motion. It's a vector quantity measured in Newtons (N).",
        friction: "Friction is a force that opposes motion between surfaces in contact. Types: static, kinetic, rolling.",
        tension: "Tension is the force transmitted through a string, rope, or cable when it's pulled tight.",
        normal: "Normal force is the perpendicular contact force between surfaces.",
        weight: "Weight is the gravitational force acting on an object: W = mg",
        "net force": "Net force is the vector sum of all forces acting on an object."
      },
      laws: [
        "Newton's First Law: An object at rest stays at rest, an object in motion stays in motion (unless acted upon by net force)",
        "Newton's Second Law: F = ma (Net force equals mass times acceleration)",
        "Newton's Third Law: For every action, there is an equal and opposite reaction"
      ],
      applications: [
        "Free body diagrams help visualize all forces acting on an object",
        "Friction can be calculated using f = μN (coefficient × normal force)",
        "On an incline: components are mg sin θ (parallel) and mg cos θ (perpendicular)"
      ]
    },
    energy: {
      definitions: {
        work: "Work is done when a force causes displacement: W = F·d·cos(θ). Measured in Joules.",
        kinetic: "Kinetic energy is energy of motion: KE = ½mv². Depends on mass and velocity squared.",
        potential: "Potential energy is stored energy. Gravitational: PE = mgh. Elastic: PE = ½kx²",
        conservation: "Energy cannot be created or destroyed, only transformed from one form to another.",
        power: "Power is the rate of doing work: P = W/t = F·v. Measured in Watts."
      },
      applications: [
        "A roller coaster converts potential energy to kinetic energy",
        "Springs store elastic potential energy when compressed or stretched",
        "Work-energy theorem: Work done equals change in kinetic energy"
      ]
    },
    quantum: {
      definitions: {
        photon: "A photon is a particle of light with energy E = hf, where h is Planck's constant",
        "wave-particle duality": "Matter and energy exhibit both wave and particle properties",
        uncertainty: "Heisenberg's uncertainty principle: Δx·Δp ≥ ħ/2",
        superposition: "Quantum objects can exist in multiple states simultaneously"
      },
      concepts: [
        "Double-slit experiment shows wave-particle duality",
        "Quantum tunneling allows particles to pass through barriers",
        "Schrödinger's equation describes quantum wave functions"
      ]
    },
    relativity: {
      definitions: {
        "time dilation": "Time passes slower for objects moving at high speeds",
        "length contraction": "Objects appear shorter in the direction of motion at high speeds",
        spacetime: "Space and time are interconnected in a four-dimensional continuum",
        "event horizon": "The boundary around a black hole beyond which nothing can escape"
      },
      formulas: [
        "E = mc² (mass-energy equivalence)",
        "γ = 1/√(1-v²/c²) (Lorentz factor)",
        "Δt' = γΔt (time dilation)"
      ]
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

    // Advanced Physics concept detection with comprehensive responses
    if (lowerInput.includes('velocity') || lowerInput.includes('speed')) {
      if (lowerInput.includes('difference') && (lowerInput.includes('speed') || lowerInput.includes('velocity'))) {
        responseText += "Great question about velocity vs speed! 🏃‍♂️\n\n";
        responseText += `📍 **Velocity**: ${this.knowledge.kinematics.definitions.velocity}\n`;
        responseText += `🏁 **Speed**: ${this.knowledge.kinematics.definitions.speed}\n\n`;
        responseText += "Key difference: Velocity includes direction, speed doesn't!";
      } else {
        responseText += this.knowledge.kinematics.definitions.velocity;
        if (lowerInput.includes('calculate') || lowerInput.includes('formula') || lowerInput.includes('equation')) {
          responseText += `\n\n📐 **Formulas:**\n`;
          responseText += `• ${this.knowledge.kinematics.formulas.velocity}\n`;
          responseText += `• ${this.knowledge.kinematics.formulas.kinematic1}\n`;
          responseText += `• ${this.knowledge.kinematics.formulas.kinematic3}`;
        }
        if (lowerInput.includes('example')) {
          responseText += `\n\n🌟 **Example:** ${this.knowledge.kinematics.examples[0]}`;
        }
      }
    } else if (lowerInput.includes('acceleration')) {
      responseText += this.knowledge.kinematics.definitions.acceleration;
      if (lowerInput.includes('formula') || lowerInput.includes('equation')) {
        responseText += `\n\n📐 **Formulas:**\n`;
        responseText += `• ${this.knowledge.kinematics.formulas.acceleration}\n`;
        responseText += `• ${this.knowledge.kinematics.formulas.kinematic1}\n`;
        responseText += `• ${this.knowledge.kinematics.formulas.kinematic2}`;
      }
      if (lowerInput.includes('gravity') || lowerInput.includes('fall')) {
        responseText += `\n\n🌍 **Free Fall:** ${this.knowledge.kinematics.definitions["free fall"]}`;
      }
    } else if (lowerInput.includes('force') || lowerInput.includes('newton')) {
      responseText += this.knowledge.forces.definitions.force;
      if (lowerInput.includes('newton') || lowerInput.includes('law')) {
        responseText += "\n\n📚 **Newton's Laws:**\n";
        this.knowledge.forces.laws.forEach((law: string, index: number) => {
          responseText += `${index + 1}. ${law}\n`;
        });
      }
      if (lowerInput.includes('friction')) {
        responseText += `\n\n🔄 **Friction:** ${this.knowledge.forces.definitions.friction}`;
        responseText += `\n📐 Formula: f = μN`;
      }
    } else if (lowerInput.includes('energy')) {
      responseText += "Energy is the ability to do work! Let me explain the types: 🔋\n\n";
      responseText += `⚡ **Kinetic Energy:** ${this.knowledge.energy.definitions.kinetic}\n`;
      responseText += `⛰️ **Potential Energy:** ${this.knowledge.energy.definitions.potential}\n`;
      responseText += `🔨 **Work:** ${this.knowledge.energy.definitions.work}\n`;
      responseText += `⚖️ **Conservation:** ${this.knowledge.energy.definitions.conservation}`;
      
      if (lowerInput.includes('example') || lowerInput.includes('application')) {
        responseText += `\n\n🎢 **Real-world examples:**\n`;
        this.knowledge.energy.applications.forEach((app: string) => {
          responseText += `• ${app}\n`;
        });
      }
    } else if (lowerInput.includes('quantum')) {
      responseText += "Welcome to the fascinating world of quantum physics! 🌌\n\n";
      if (lowerInput.includes('wave') || lowerInput.includes('particle')) {
        responseText += `🌊 **Wave-Particle Duality:** ${this.knowledge.quantum.definitions["wave-particle duality"]}\n\n`;
        responseText += "This means electrons, photons, and other particles can behave like waves OR particles depending on how we observe them!";
      } else if (lowerInput.includes('uncertainty')) {
        responseText += `❓ **Uncertainty Principle:** ${this.knowledge.quantum.definitions.uncertainty}\n\n`;
        responseText += "This means we can't know both position and momentum of a particle exactly at the same time!";
      } else {
        responseText += `✨ **Key Concepts:**\n`;
        Object.entries(this.knowledge.quantum.definitions).forEach(([key, value]: [string, any]) => {
          responseText += `• **${key}:** ${value}\n`;
        });
      }
    } else if (lowerInput.includes('relativity') || lowerInput.includes('einstein')) {
      responseText += "Einstein's theories revolutionized our understanding of space and time! 🌟\n\n";
      if (lowerInput.includes('time')) {
        responseText += `⏰ **Time Dilation:** ${this.knowledge.relativity.definitions["time dilation"]}\n`;
        responseText += `📐 Formula: ${this.knowledge.relativity.formulas[2]}`;
      } else if (lowerInput.includes('e=mc')) {
        responseText += `💥 **Mass-Energy Equivalence:** ${this.knowledge.relativity.formulas[0]}\n\n`;
        responseText += "This famous equation shows that mass and energy are interchangeable! Even a tiny amount of mass contains enormous energy.";
      } else {
        responseText += `🚀 **Key Concepts:**\n`;
        Object.entries(this.knowledge.relativity.definitions).forEach(([key, value]: [string, any]) => {
          responseText += `• **${key}:** ${value}\n`;
        });
      }
    }

    // Mathematical calculations and numerical problems
    if (lowerInput.includes('calculate') || lowerInput.includes('find') || /\d/.test(lowerInput)) {
      if (lowerInput.includes('velocity') && /\d/.test(lowerInput)) {
        responseText += "\n\n🧮 **Velocity Calculation Guide:**\n";
        responseText += "• If you have distance and time: v = d/t\n";
        responseText += "• If you have initial velocity, acceleration, and time: v = v₀ + at\n";
        responseText += "• If you have initial velocity, acceleration, and distance: v² = v₀² + 2ax\n\n";
        responseText += "💡 **Tip:** Always check your units! Common units are m/s, km/h, or mph.";
      } else if (lowerInput.includes('force') && /\d/.test(lowerInput)) {
        responseText += "\n\n🧮 **Force Calculation Guide:**\n";
        responseText += "• Newton's Second Law: F = ma (mass × acceleration)\n";
        responseText += "• Weight: W = mg (mass × gravity)\n";
        responseText += "• Friction: f = μN (coefficient × normal force)\n\n";
        responseText += "💡 **Tip:** Forces are vectors - don't forget direction!";
      }
    }

    // Problem-solving guidance with enhanced steps
    if (lowerInput.includes('solve') || lowerInput.includes('problem') || lowerInput.includes('homework')) {
      responseText += "\n\n🧮 **Physics Problem-Solving Strategy:**\n";
      responseText += "1. 📝 **Read carefully** - What's the situation?\n";
      responseText += "2. 📊 **List knowns** - What information is given?\n";
      responseText += "3. 🎯 **Identify unknowns** - What do you need to find?\n";
      responseText += "4. 📐 **Choose equations** - Which formulas apply?\n";
      responseText += "5. 🔢 **Substitute & solve** - Plug in numbers\n";
      responseText += "6. ✅ **Check your answer** - Does it make sense?\n\n";
      responseText += "🔍 **Pro tip:** Draw a diagram if possible - it helps visualize the problem!";
    }

    // Study tips and learning strategies
    if (lowerInput.includes('study') || lowerInput.includes('learn') || lowerInput.includes('remember')) {
      messageType = 'encouragement';
      responseText += "\n\n📚 **Physics Study Tips:**\n";
      responseText += "• 🎯 **Practice daily** - Even 15 minutes helps!\n";
      responseText += "• 📝 **Make concept maps** - Connect ideas visually\n";
      responseText += "• 🧪 **Work examples** - Don't just read, do problems\n";
      responseText += "• 👥 **Teach others** - Explaining helps you understand\n";
      responseText += "• 🌟 **Stay curious** - Ask 'why' and 'how'\n\n";
      responseText += "Remember: Physics is about understanding patterns in nature - you've got this! 🚀";
    }

    // Real-world applications
    if (lowerInput.includes('real world') || lowerInput.includes('application') || lowerInput.includes('use')) {
      responseText += "\n\n🌍 **Physics in the Real World:**\n";
      if (lowerInput.includes('force') || lowerInput.includes('newton')) {
        responseText += "• 🚗 Car brakes use friction to stop\n";
        responseText += "• 🏗️ Buildings must withstand gravitational and wind forces\n";
        responseText += "• 🚀 Rockets work by Newton's third law (action-reaction)\n";
        responseText += "• ⚽ Sports involve projectile motion and collisions";
      } else if (lowerInput.includes('energy')) {
        responseText += "• ⚡ Power plants convert energy forms\n";
        responseText += "• 🎢 Roller coasters use potential/kinetic energy\n";
        responseText += "• 🔋 Batteries store chemical energy\n";
        responseText += "• 🌞 Solar panels convert light to electrical energy";
      } else {
        responseText += "• 📱 **Smartphones** use quantum mechanics in semiconductors\n";
        responseText += "• 🛰️ **GPS** needs relativity corrections\n";
        responseText += "• 🏥 **MRI machines** use nuclear magnetic resonance\n";
        responseText += "• 🌈 **Lasers** work through stimulated emission";
      }
    }

    // Encouragement for struggling students
    if (lowerInput.includes('difficult') || lowerInput.includes('hard') || lowerInput.includes('confused') || lowerInput.includes('stuck')) {
      messageType = 'encouragement';
      responseText = this.encouragements[Math.floor(Math.random() * this.encouragements.length)];
      responseText += "\n\n🧠 **Remember:** Every physicist started as a beginner! Even Einstein struggled with concepts.\n\n";
      responseText += "Let's break this down step by step. What specific part is challenging you? I'm here to help! 💪";
    }

    // Hints for current question
    if (lowerInput.includes('hint') || lowerInput.includes('help') || lowerInput.includes('clue')) {
      messageType = 'hint';
      responseText = this.generateHint(context.currentQuestion);
      responseText += "\n\n💡 **General tip:** Look for keywords in the problem that hint at which physics concept to use!";
    }

    // Interactive questions to engage students
    if (lowerInput.includes('test me') || lowerInput.includes('quiz') || lowerInput.includes('question')) {
      messageType = 'question';
      const questions = [
        "🤔 Can you explain why heavier objects don't fall faster than lighter ones?",
        "🚗 If a car is moving at constant velocity, what can you say about the net force on it?",
        "⚡ What happens to kinetic energy when you double the speed of an object?",
        "🌍 Why do you weigh less on the Moon than on Earth?",
        "🏀 At what point does a ball thrown upward have zero velocity but non-zero acceleration?"
      ];
      responseText = questions[Math.floor(Math.random() * questions.length)];
      responseText += "\n\nTake your time to think about it, and I'll help guide you to the answer! 🎯";
    }

    // Default fallback with more engaging response
    if (!responseText) {
      const greetings = [
        "That's a fascinating topic! 🌟",
        "Great question! 🧠",
        "I love your curiosity! ✨",
        "Interesting point! 🤔"
      ];
      responseText = greetings[Math.floor(Math.random() * greetings.length)];
      responseText += " Physics is all about exploring the amazing world around us.\n\n";
      responseText += this.encouragements[Math.floor(Math.random() * this.encouragements.length)];
      responseText += "\n\n🎯 **What would you like to explore?**\n";
      responseText += "• Ask about any physics concept\n";
      responseText += "• Get help solving problems\n";
      responseText += "• Learn real-world applications\n";
      responseText += "• Request study tips\n\n";
      responseText += "Just ask me anything! I'm here to make physics fun and understandable! 🚀";
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
          <div className="flex-1 p-6 overflow-y-auto">
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
          </div>

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