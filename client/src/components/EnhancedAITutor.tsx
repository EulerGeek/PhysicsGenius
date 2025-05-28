import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

class EnhancedPhysicsAIBrain {
  private comprehensiveKnowledge: Record<string, string> = {
    // Physics Fundamentals
    'force': 'A force is a push or pull that changes motion. Newton\'s laws govern forces: F=ma (second law), every action has an equal opposite reaction (third law), and objects at rest stay at rest unless acted upon by a force (first law). Forces include gravity, electromagnetic, strong nuclear, and weak nuclear forces.',
    
    'energy': 'Energy is the ability to do work or cause change. Types include kinetic energy (KE = ½mv² for motion), potential energy (PE = mgh for height, PE = ½kx² for springs), thermal energy (heat), electromagnetic energy (light), and nuclear energy. The law of conservation of energy states that energy cannot be created or destroyed, only transformed.',
    
    'momentum': 'Momentum is mass times velocity (p = mv). It\'s a vector quantity with both magnitude and direction. The law of conservation of momentum states that total momentum in an isolated system remains constant. In collisions, momentum is conserved: m₁v₁ + m₂v₂ = m₁v₁\' + m₂v₂\'.',
    
    'gravity': 'Gravity is the fundamental force of attraction between masses. Newton\'s law of universal gravitation: F = G(m₁m₂)/r² where G = 6.67 × 10⁻¹¹ N⋅m²/kg². Einstein\'s general relativity describes gravity as the curvature of spacetime caused by mass and energy.',
    
    'quantum gravity': 'Quantum gravity is one of physics\' greatest unsolved problems - how to unify quantum mechanics with general relativity. At the Planck scale (10⁻³⁵ m), spacetime itself becomes quantized. Leading theories include string theory, loop quantum gravity, emergent gravity, and causal set theory. The graviton is the hypothetical quantum of gravity.',
    
    'graviton': 'The graviton is the hypothetical quantum particle that mediates gravitational force, like how photons mediate electromagnetic force. If gravity is quantized, gravitons would be massless, spin-2 particles traveling at light speed. They have never been detected due to gravity\'s extreme weakness.',
    
    'planck scale': 'The Planck scale is where quantum effects of gravity become significant. Planck length: 1.6 × 10⁻³⁵ m, Planck time: 5.4 × 10⁻⁴⁴ s, Planck energy: 1.2 × 10¹⁹ GeV. At these scales, spacetime may become discrete rather than continuous, and our current theories break down.',
    
    'string theory': 'String theory proposes fundamental particles are tiny vibrating strings in 10 or 11 dimensions. Different vibration modes correspond to different particles, including the graviton. It naturally includes gravity but requires extra dimensions and has no experimental verification yet.',
    
    'loop quantum gravity': 'Loop quantum gravity (LQG) quantizes spacetime itself, suggesting space has discrete, granular structure at the Planck scale. Unlike string theory, LQG doesn\'t require extra dimensions and focuses on quantum geometry. It predicts space is woven from loops and nodes.',
    
    'black hole': 'Black holes are regions where gravity is so strong nothing can escape, not even light. They form when massive stars collapse. Hawking radiation suggests black holes slowly evaporate by emitting quantum radiation. The information paradox asks what happens to information that falls in.',
    
    'hawking radiation': 'Hawking radiation is thermal radiation predicted to be emitted by black holes due to quantum effects near the event horizon. Virtual particle pairs split at the horizon, with one falling in and one escaping. This causes black holes to slowly evaporate, with smaller ones radiating faster.',
    
    'wave': 'Waves transfer energy without transferring matter. Key properties: wavelength (λ), frequency (f), amplitude (A), and speed (v = fλ). Types include mechanical waves (sound, water) requiring a medium, and electromagnetic waves (light, radio) that can travel through vacuum.',
    
    'electricity': 'Electricity involves electric charges and their interactions. Coulomb\'s law: F = k(q₁q₂)/r². Electric current I = Q/t (charge per time). Ohm\'s law: V = IR relates voltage, current, and resistance. Electric power P = IV = I²R = V²/R.',
    
    'magnetism': 'Magnetism arises from moving electric charges. Magnetic force on moving charge: F = q(v × B). Electromagnetic induction: changing magnetic flux induces voltage (Faraday\'s law). Maxwell\'s equations unify electricity and magnetism.',
    
    'quantum mechanics': 'Quantum mechanics describes nature at atomic scales. Key principles: wave-particle duality (matter and energy have both properties), uncertainty principle (Δx⋅Δp ≥ ħ/2), superposition (quantum states can be combined), and quantization (energy comes in discrete packets).',
    
    'relativity': 'Einstein\'s special relativity: space and time are relative, nothing travels faster than light (c), time dilation (Δt\' = γΔt), length contraction, and mass-energy equivalence (E = mc²). General relativity describes gravity as curved spacetime.',
    
    // Mathematics Fundamentals
    'calculus': 'Calculus studies continuous change through derivatives and integrals. Derivatives measure instantaneous rates of change: f\'(x) = lim(h→0)[f(x+h)-f(x)]/h. Integrals represent accumulation and area under curves: ∫f(x)dx. The fundamental theorem of calculus connects them.',
    
    'derivative': 'A derivative measures how a function changes instantly at each point. Geometric interpretation: slope of tangent line. Physical interpretation: instantaneous rate of change. Rules include power rule (d/dx[xⁿ] = nxⁿ⁻¹), product rule, quotient rule, and chain rule.',
    
    'integral': 'An integral represents accumulation - area under a curve, total change, or antiderivative. Definite integral ∫ₐᵇf(x)dx gives net area. Indefinite integral ∫f(x)dx = F(x) + C where F\'(x) = f(x). Techniques include substitution, integration by parts, partial fractions.',
    
    'tensor': 'A tensor is a mathematical object that generalizes scalars (0-rank), vectors (1-rank), and matrices (2-rank) to higher dimensions. Tensors transform predictably under coordinate changes and are fundamental in physics for describing relationships between quantities in spacetime.',
    
    'tensor product': 'The tensor product (⊗) combines vector spaces to create higher-dimensional structures. For vectors u and v, u⊗v creates a new object whose components are all products uᵢvⱼ. Essential in quantum mechanics for describing composite systems and entanglement.',
    
    'matrix': 'A matrix is a rectangular array of numbers representing linear transformations. Operations include addition, multiplication (AB ≠ BA generally), finding determinants (measure of scaling), eigenvalues (λ where Av = λv), and inverse matrices (AA⁻¹ = I).',
    
    'vector': 'A vector has both magnitude and direction. Operations: vector addition (parallelogram law), scalar multiplication, dot product (a⋅b = |a||b|cos θ gives scalar), and cross product (a×b gives vector perpendicular to both). Used extensively in physics.',
    
    'linear algebra': 'Linear algebra studies vectors, vector spaces, and linear transformations. Key concepts: basis vectors (spanning set), linear independence, eigenvalues/eigenvectors, determinants, and matrix operations. Applications include solving systems of equations and computer graphics.',
    
    'differential equation': 'Equations involving derivatives that describe how quantities change. Examples: dy/dx = ky (exponential growth/decay), d²y/dx² = -ω²y (simple harmonic motion), and partial differential equations like the wave equation and Schrödinger equation.',
    
    'complex numbers': 'Complex numbers z = a + bi extend real numbers with imaginary unit i where i² = -1. Operations follow standard rules. Euler\'s formula: e^(iθ) = cos(θ) + i sin(θ) connects exponentials with trigonometry. Essential in quantum mechanics and signal processing.',
    
    'fourier transform': 'The Fourier transform decomposes functions into frequency components: F(ω) = ∫f(t)e^(-iωt)dt. It reveals the frequency content of signals. The inverse transform reconstructs the original function. Applications include signal processing, quantum mechanics, and solving differential equations.',
    
    'algebra': 'Algebra manipulates symbols representing numbers and operations. Includes solving equations, factoring polynomials (x² - 4 = (x+2)(x-2)), working with functions, and the quadratic formula: x = (-b ± √(b²-4ac))/2a for ax² + bx + c = 0.',
    
    'logarithm': 'Logarithms are inverses of exponentials: log_b(x) = y means bʸ = x. Properties: log(ab) = log(a) + log(b), log(aⁿ) = n log(a), log(1) = 0. Natural log ln(x) uses base e ≈ 2.718. Common log uses base 10.',
    
    'trigonometry': 'Trigonometry studies triangles and periodic functions. Right triangle: sin(θ) = opposite/hypotenuse, cos(θ) = adjacent/hypotenuse, tan(θ) = opposite/adjacent. Key identity: sin²(θ) + cos²(θ) = 1. Used in waves, oscillations, and rotations.',
    
    'statistics': 'Statistics analyzes data and quantifies uncertainty. Measures of central tendency: mean (average), median (middle value), mode (most frequent). Measures of spread: variance, standard deviation. Probability distributions describe random phenomena.',
    
    'probability': 'Probability quantifies uncertainty from 0 (impossible) to 1 (certain). Basic rules: P(A∪B) = P(A) + P(B) - P(A∩B), P(A|B) = P(A∩B)/P(B). Bayes\' theorem: P(A|B) = P(B|A)P(A)/P(B) for updating beliefs with new evidence.'
  };

  private encouragements = [
    "Great question! You're thinking like a true scientist! 🌟",
    "That's exactly the kind of curiosity that drives discovery! 🔬",
    "Excellent! You're building a strong foundation in this concept! 🏗️",
    "Perfect question! This is a fundamental concept that opens many doors! 🚪",
    "I love your analytical thinking! Keep exploring! 🧠",
    "Wonderful! You're connecting ideas beautifully! 🔗"
  ];

  analyzeInput(input: string): Message {
    const inputLower = input.toLowerCase();
    
    // Handle greetings
    if (inputLower.match(/\b(hello|hi|hey|greetings)\b/)) {
      return this.createMessage(
        "Hello! I'm your comprehensive QUOMA AI tutor! 🤖✨ I'm here to help you master physics, mathematics, and science concepts. Whether you need explanations, problem-solving help, or conceptual understanding, I'm ready to make learning engaging and clear! What would you like to explore today?",
        'encouragement'
      );
    }

    // Search for matching topics
    const matches = this.findMatchingTopics(inputLower);
    
    if (matches.length > 0) {
      const topic = matches[0];
      const explanation = this.comprehensiveKnowledge[topic];
      const encouragement = this.encouragements[Math.floor(Math.random() * this.encouragements.length)];
      
      return this.createMessage(
        `${encouragement}\n\n📚 **${topic.toUpperCase()}**\n\n${explanation}\n\n💡 Would you like me to:\n• Explain any specific aspect in more detail?\n• Show you related mathematical formulas?\n• Work through example problems?\n• Connect this to other concepts?\n\nI'm here to help you master this topic completely! 🎯`,
        'explanation'
      );
    }

    // Enhanced default response
    return this.createMessage(
      "That's a fascinating question! 🤔 I'm your comprehensive STEM learning companion, ready to help with:\n\n🔬 **Physics**: mechanics, waves, electricity, magnetism, quantum mechanics, relativity, thermodynamics\n\n📐 **Mathematics**: calculus, algebra, linear algebra, statistics, probability, complex numbers, differential equations\n\n🧮 **Advanced Topics**: tensors, Fourier transforms, vector operations, matrix theory\n\nCould you ask about any specific concept? I love making complex topics clear and engaging! For example, try asking 'What is a tensor product?' or 'Explain quantum mechanics' ✨",
      'question'
    );
  }

  private findMatchingTopics(input: string): string[] {
    const matches: string[] = [];
    
    for (const topic of Object.keys(this.comprehensiveKnowledge)) {
      if (input.includes(topic) || input.includes(topic.replace(' ', ''))) {
        matches.push(topic);
      }
    }
    
    // Also check for partial matches and synonyms
    const synonyms: Record<string, string> = {
      'calc': 'calculus',
      'math': 'algebra',
      'physics': 'force',
      'einstein': 'relativity',
      'newton': 'force',
      'quantum': 'quantum mechanics',
      'electric': 'electricity',
      'magnetic': 'magnetism'
    };
    
    for (const [synonym, topic] of Object.entries(synonyms)) {
      if (input.includes(synonym) && !matches.includes(topic)) {
        matches.push(topic);
      }
    }
    
    return matches;
  }

  private createMessage(text: string, type: Message['type'] = 'explanation'): Message {
    return {
      id: Date.now().toString(),
      text,
      sender: 'ai',
      timestamp: new Date(),
      type
    };
  }

  generateWelcomeMessage(): Message {
    return this.createMessage(
      "Welcome to QUOMA AI Assistant! 🚀\n\nI'm your intelligent tutor for physics, mathematics, and science concepts. I can help you:\n\n✅ Understand complex concepts with clear explanations\n✅ Solve problems step-by-step\n✅ Connect ideas across different topics\n✅ Provide examples and applications\n\nTry asking me about topics like:\n• 'What is calculus?'\n• 'Explain quantum mechanics'\n• 'How do tensor products work?'\n• 'What is the difference between force and energy?'\n\nLet's make learning an exciting adventure! What would you like to explore first? 🌟",
      'encouragement'
    );
  }
}

export default function EnhancedAITutor({ isOpen, onClose, currentQuestion, context }: AITutorProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiBrain = new EnhancedPhysicsAIBrain();

  const quickQuestions = [
    "What is calculus?",
    "Explain quantum mechanics",
    "How do forces work?",
    "What are tensor products?",
    "Explain relativity theory",
    "How do derivatives work?",
    "What is linear algebra?",
    "Explain electromagnetic waves"
  ];

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([aiBrain.generateWelcomeMessage()]);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = aiBrain.analyzeInput(inputText);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([aiBrain.generateWelcomeMessage()]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" style={{ pointerEvents: 'auto' }}>
      <Card className="w-full max-w-4xl h-[90vh] bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden" style={{ pointerEvents: 'auto' }}>
        {/* Enhanced Header */}
        {/* Fixed Stable Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 border-b-2 border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">QUOMA AI</h2>
                <p className="text-xs text-blue-100">Physics & Math Tutor</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  if (messages.length > 1) {
                    setMessages(prev => prev.slice(0, -1));
                  }
                }}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 rounded-lg px-3 py-1 text-sm"
                title="Go back one message"
                disabled={messages.length <= 1}
              >
                ← Back
              </Button>
              <Button
                onClick={clearChat}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 rounded-lg px-3 py-1 text-sm"
                title="Clear chat and restart"
              >
                🔄 Reset
              </Button>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 rounded-lg px-3 py-1 text-sm font-bold"
                title="Close chat"
              >
                ✕ Close
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-0 flex flex-col h-full">
          {/* Messages Area with Enhanced Scrolling */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 scroll-smooth">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">🤖</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">QUOMA AI</span>
                    </div>
                  )}
                  <div className={`${message.sender === 'user' ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                    {message.text.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                    ))}
                  </div>
                  <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 p-4 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🤖</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">QUOMA AI</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>



          {/* Enhanced Input Area */}
          <div className="border-t-2 border-gray-200 dark:border-gray-700 p-6 bg-gradient-to-r from-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
            <div className="flex gap-2 items-center mb-4">
              <Button
                onClick={onClose}
                variant="outline"
                size="sm"
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ← Back
              </Button>
            </div>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  💬 Ask your question:
                </label>
                <Input
                  type="text"
                  placeholder="Ask me anything about physics, calculus, linear algebra, quantum mechanics..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="p-4 border-3 border-gray-300 dark:border-gray-600 rounded-2xl focus:border-blue-500 dark:focus:border-blue-400 text-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 text-lg font-semibold group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="mr-2 group-hover:rotate-12 transition-transform duration-300">🚀</span>
                Send
              </Button>
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ✨ Powered by QUOMA's comprehensive AI knowledge base
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}