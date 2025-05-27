export interface Question {
  id: string;
  type: "multiple-choice" | "drag-drop" | "fill-blank";
  question: string;
  options?: { value: string; text: string; }[];
  correctAnswer: string;
  explanation: string;
  concept: string;
}

export interface LessonData {
  id: string;
  title: string;
  videoId?: string;
  notes?: string;
  feynmanNotes?: string;
  questions: Question[];
}

// Classical Mechanics Lessons
export const classicalMechanicsLessons: Record<string, LessonData> = {
  "cm-1": {
    id: "cm-1",
    title: "Introduction to Motion",
    videoId: "wWnfJ0-xXRE",
    feynmanNotes: "The thing that doesn't fit is the thing that's most interesting. Motion is the most fundamental phenomenon in physics. When we observe the world around us, everything is moving - planets orbit the sun, molecules vibrate, electrons dance around nuclei. Understanding motion means understanding the very essence of physical reality.",
    questions: [
      {
        id: "motion-1", type: "multiple-choice",
        question: "What is the definition of velocity?",
        options: [
          { value: "a", text: "The distance traveled by an object" },
          { value: "b", text: "The rate of change of position with respect to time" },
          { value: "c", text: "The force acting on an object" },
          { value: "d", text: "The mass times acceleration" }
        ],
        correctAnswer: "b",
        explanation: "Velocity is defined as the rate of change of position with respect to time. It's a vector quantity that includes both magnitude (speed) and direction.",
        concept: "Velocity = displacement/time"
      },
      {
        id: "motion-2", type: "multiple-choice",
        question: "If a car travels 100 meters in 10 seconds, what is its average speed?",
        options: [
          { value: "a", text: "5 m/s" },
          { value: "b", text: "10 m/s" },
          { value: "c", text: "15 m/s" },
          { value: "d", text: "20 m/s" }
        ],
        correctAnswer: "b",
        explanation: "Average speed = total distance / total time = 100 meters / 10 seconds = 10 m/s",
        concept: "Speed = distance/time"
      },
      {
        id: "motion-3", type: "multiple-choice",
        question: "What is acceleration?",
        options: [
          { value: "a", text: "The speed of an object" },
          { value: "b", text: "The distance traveled per unit time" },
          { value: "c", text: "The rate of change of velocity" },
          { value: "d", text: "The position of an object" }
        ],
        correctAnswer: "c",
        explanation: "Acceleration is the rate of change of velocity with respect to time. When velocity changes (either in magnitude or direction), acceleration occurs.",
        concept: "Acceleration = change in velocity/time"
      },
      {
        id: "motion-4", type: "multiple-choice",
        question: "A ball is thrown upward. At the highest point of its trajectory, what is its velocity?",
        options: [
          { value: "a", text: "Maximum upward velocity" },
          { value: "b", text: "Zero" },
          { value: "c", text: "Maximum downward velocity" },
          { value: "d", text: "Cannot be determined" }
        ],
        correctAnswer: "b",
        explanation: "At the highest point, the ball momentarily stops before falling back down. Therefore, its velocity is zero at that instant.",
        concept: "At maximum height, vertical velocity = 0"
      },
      {
        id: "motion-5", type: "multiple-choice",
        question: "Which of the following is a vector quantity?",
        options: [
          { value: "a", text: "Speed" },
          { value: "b", text: "Distance" },
          { value: "c", text: "Displacement" },
          { value: "d", text: "Time" }
        ],
        correctAnswer: "c",
        explanation: "Displacement is a vector quantity because it has both magnitude and direction. Speed and distance are scalar quantities (magnitude only).",
        concept: "Vector quantities have both magnitude and direction"
      },
      {
        id: "motion-6", type: "multiple-choice",
        question: "If an object moves 30 meters east, then 40 meters north, what is its displacement?",
        options: [
          { value: "a", text: "70 meters" },
          { value: "b", text: "50 meters" },
          { value: "c", text: "35 meters" },
          { value: "d", text: "10 meters" }
        ],
        correctAnswer: "b",
        explanation: "Using the Pythagorean theorem: displacement = √(30² + 40²) = √(900 + 1600) = √2500 = 50 meters",
        concept: "Displacement is the straight-line distance from start to end"
      },
      {
        id: "motion-7", type: "multiple-choice",
        question: "What does the slope of a position-time graph represent?",
        options: [
          { value: "a", text: "Acceleration" },
          { value: "b", text: "Velocity" },
          { value: "c", text: "Force" },
          { value: "d", text: "Distance" }
        ],
        correctAnswer: "b",
        explanation: "The slope of a position-time graph represents velocity, as slope = change in position / change in time = velocity.",
        concept: "Slope of x-t graph = velocity"
      },
      {
        id: "motion-8", type: "multiple-choice",
        question: "If a car accelerates from 0 to 60 mph in 6 seconds, what is its acceleration?",
        options: [
          { value: "a", text: "10 mph/s" },
          { value: "b", text: "6 mph/s" },
          { value: "c", text: "60 mph/s" },
          { value: "d", text: "360 mph/s" }
        ],
        correctAnswer: "a",
        explanation: "Acceleration = change in velocity / time = (60 - 0) mph / 6 s = 10 mph/s",
        concept: "a = Δv/Δt"
      },
      {
        id: "motion-9", type: "multiple-choice",
        question: "What is the acceleration due to gravity on Earth?",
        options: [
          { value: "a", text: "8.9 m/s²" },
          { value: "b", text: "9.8 m/s²" },
          { value: "c", text: "10.8 m/s²" },
          { value: "d", text: "11.8 m/s²" }
        ],
        correctAnswer: "b",
        explanation: "The acceleration due to gravity on Earth is approximately 9.8 m/s² downward.",
        concept: "g = 9.8 m/s²"
      },
      {
        id: "motion-10", type: "multiple-choice",
        question: "In uniform circular motion, what is always changing?",
        options: [
          { value: "a", text: "Speed" },
          { value: "b", text: "Direction of velocity" },
          { value: "c", text: "Magnitude of acceleration" },
          { value: "d", text: "Angular velocity" }
        ],
        correctAnswer: "b",
        explanation: "In uniform circular motion, speed remains constant but the direction of velocity continuously changes, requiring centripetal acceleration.",
        concept: "Circular motion requires changing direction"
      },
      {
        id: "motion-11", type: "multiple-choice",
        question: "What is the unit of acceleration in the SI system?",
        options: [
          { value: "a", text: "m/s" },
          { value: "b", text: "m/s²" },
          { value: "c", text: "kg⋅m/s²" },
          { value: "d", text: "m²/s" }
        ],
        correctAnswer: "b",
        explanation: "The SI unit of acceleration is meters per second squared (m/s²), representing how velocity changes per unit time.",
        concept: "SI unit: m/s²"
      },
      {
        id: "motion-12", type: "multiple-choice",
        question: "If you drop a ball from a height, what happens to its kinetic energy as it falls?",
        options: [
          { value: "a", text: "Decreases" },
          { value: "b", text: "Remains constant" },
          { value: "c", text: "Increases" },
          { value: "d", text: "Becomes zero" }
        ],
        correctAnswer: "c",
        explanation: "As the ball falls, it gains speed, so its kinetic energy (½mv²) increases while potential energy decreases.",
        concept: "Energy conservation: PE → KE"
      }
    ]
  },

  "cm-2": {
    id: "cm-2",
    title: "Forces and Newton's Laws",
    videoId: "ZM8ECpBuQYE",
    feynmanNotes: "Nature uses only the longest threads to weave her patterns, so that each small piece of her fabric reveals the organization of the entire tapestry. Newton's laws are these longest threads - three simple statements that explain why planets orbit, why we fall, why rockets fly.",
    questions: [
      {
        id: "force-1", type: "multiple-choice",
        question: "What is Newton's First Law of Motion?",
        options: [
          { value: "a", text: "F = ma" },
          { value: "b", text: "An object at rest stays at rest unless acted upon by a force" },
          { value: "c", text: "For every action, there is an equal and opposite reaction" },
          { value: "d", text: "Energy cannot be created or destroyed" }
        ],
        correctAnswer: "b",
        explanation: "Newton's First Law states that an object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an unbalanced force.",
        concept: "Law of Inertia"
      },
      {
        id: "force-2", type: "multiple-choice",
        question: "If a 10 kg object experiences a net force of 50 N, what is its acceleration?",
        options: [
          { value: "a", text: "2 m/s²" },
          { value: "b", text: "5 m/s²" },
          { value: "c", text: "10 m/s²" },
          { value: "d", text: "500 m/s²" }
        ],
        correctAnswer: "b",
        explanation: "Using Newton's Second Law: F = ma, so a = F/m = 50 N / 10 kg = 5 m/s²",
        concept: "F = ma"
      },
      {
        id: "force-3", type: "multiple-choice",
        question: "What is Newton's Third Law of Motion?",
        options: [
          { value: "a", text: "F = ma" },
          { value: "b", text: "Objects at rest stay at rest" },
          { value: "c", text: "For every action, there is an equal and opposite reaction" },
          { value: "d", text: "Force equals mass times velocity" }
        ],
        correctAnswer: "c",
        explanation: "Newton's Third Law states that for every action force, there is an equal and opposite reaction force.",
        concept: "Action-Reaction Pairs"
      },
      {
        id: "force-4", type: "multiple-choice",
        question: "What is the SI unit of force?",
        options: [
          { value: "a", text: "Joule" },
          { value: "b", text: "Newton" },
          { value: "c", text: "Watt" },
          { value: "d", text: "Pascal" }
        ],
        correctAnswer: "b",
        explanation: "The SI unit of force is the Newton (N), defined as kg⋅m/s².",
        concept: "SI unit: Newton (N)"
      },
      {
        id: "force-5", type: "multiple-choice",
        question: "Which force always acts toward the center of circular motion?",
        options: [
          { value: "a", text: "Centrifugal force" },
          { value: "b", text: "Centripetal force" },
          { value: "c", text: "Gravitational force" },
          { value: "d", text: "Normal force" }
        ],
        correctAnswer: "b",
        explanation: "Centripetal force always points toward the center of the circular path, providing the acceleration needed for circular motion.",
        concept: "Centripetal force = mv²/r"
      },
      {
        id: "force-6", type: "multiple-choice",
        question: "What happens to your weight if you travel to the Moon?",
        options: [
          { value: "a", text: "It increases by 6 times" },
          { value: "b", text: "It decreases by 6 times" },
          { value: "c", text: "It remains the same" },
          { value: "d", text: "It becomes zero" }
        ],
        correctAnswer: "b",
        explanation: "Weight = mg. Since the Moon's gravity is about 1/6 of Earth's, your weight would be about 1/6 of your Earth weight.",
        concept: "Weight depends on local gravity"
      },
      {
        id: "force-7", type: "multiple-choice",
        question: "What is the normal force?",
        options: [
          { value: "a", text: "The force of gravity" },
          { value: "b", text: "The perpendicular contact force from a surface" },
          { value: "c", text: "The force of friction" },
          { value: "d", text: "The applied force" }
        ],
        correctAnswer: "b",
        explanation: "The normal force is the perpendicular contact force exerted by a surface on an object resting on it.",
        concept: "Normal force ⊥ surface"
      },
      {
        id: "force-8", type: "multiple-choice",
        question: "If you push a book with 10 N of force and it doesn't move, what is the friction force?",
        options: [
          { value: "a", text: "0 N" },
          { value: "b", text: "5 N" },
          { value: "c", text: "10 N" },
          { value: "d", text: "20 N" }
        ],
        correctAnswer: "c",
        explanation: "If the book doesn't move, the net force is zero. Static friction exactly balances the applied force: 10 N.",
        concept: "Static equilibrium: ΣF = 0"
      },
      {
        id: "force-9", type: "multiple-choice",
        question: "What is inertia?",
        options: [
          { value: "a", text: "The tendency of objects to resist changes in motion" },
          { value: "b", text: "The force that keeps objects moving" },
          { value: "c", text: "The acceleration of an object" },
          { value: "d", text: "The speed of an object" }
        ],
        correctAnswer: "a",
        explanation: "Inertia is the tendency of objects to resist changes in their state of motion - to keep moving if moving, or stay at rest if at rest.",
        concept: "Inertia resists motion changes"
      },
      {
        id: "force-10", type: "multiple-choice",
        question: "Which has more inertia: a bowling ball or a ping pong ball?",
        options: [
          { value: "a", text: "Ping pong ball" },
          { value: "b", text: "Bowling ball" },
          { value: "c", text: "They have equal inertia" },
          { value: "d", text: "Cannot be determined" }
        ],
        correctAnswer: "b",
        explanation: "Inertia depends on mass. Since a bowling ball has much more mass than a ping pong ball, it has more inertia.",
        concept: "Inertia ∝ mass"
      },
      {
        id: "force-11", type: "multiple-choice",
        question: "What is the net force on an object moving at constant velocity?",
        options: [
          { value: "a", text: "Greater than zero" },
          { value: "b", text: "Less than zero" },
          { value: "c", text: "Equal to zero" },
          { value: "d", text: "Equal to its weight" }
        ],
        correctAnswer: "c",
        explanation: "By Newton's First Law, if an object moves at constant velocity, there is no acceleration, so the net force must be zero.",
        concept: "Constant velocity ⟹ ΣF = 0"
      },
      {
        id: "force-12", type: "multiple-choice",
        question: "When you walk forward, what force pushes you forward?",
        options: [
          { value: "a", text: "The force your foot applies to the ground" },
          { value: "b", text: "The friction force from the ground on your foot" },
          { value: "c", text: "Your weight" },
          { value: "d", text: "Air resistance" }
        ],
        correctAnswer: "b",
        explanation: "By Newton's Third Law, when your foot pushes backward on the ground, the ground pushes forward on your foot via friction.",
        concept: "Walking uses friction reaction force"
      }
    ]
  },

  "cm-3": {
    id: "cm-3",
    title: "Work and Energy",
    videoId: "w4QFJb9a8vo",
    feynmanNotes: "Energy is a very subtle concept. It is very, very difficult to get right. Energy cannot be created or destroyed, but it can change forms - kinetic, potential, thermal, and many others.",
    questions: [
      {
        id: "energy-1", type: "multiple-choice",
        question: "What is the formula for kinetic energy?",
        options: [
          { value: "a", text: "mgh" },
          { value: "b", text: "½mv²" },
          { value: "c", text: "F⋅d" },
          { value: "d", text: "½kx²" }
        ],
        correctAnswer: "b",
        explanation: "Kinetic energy is the energy of motion, given by KE = ½mv², where m is mass and v is velocity.",
        concept: "KE = ½mv²"
      },
      {
        id: "energy-2", type: "multiple-choice",
        question: "What is gravitational potential energy?",
        options: [
          { value: "a", text: "½mv²" },
          { value: "b", text: "mgh" },
          { value: "c", text: "F⋅d" },
          { value: "d", text: "½kx²" }
        ],
        correctAnswer: "b",
        explanation: "Gravitational potential energy is PE = mgh, where m is mass, g is gravitational acceleration, and h is height.",
        concept: "PE = mgh"
      },
      {
        id: "energy-3", type: "multiple-choice",
        question: "A 2 kg ball is moving at 10 m/s. What is its kinetic energy?",
        options: [
          { value: "a", text: "20 J" },
          { value: "b", text: "100 J" },
          { value: "c", text: "200 J" },
          { value: "d", text: "400 J" }
        ],
        correctAnswer: "b",
        explanation: "KE = ½mv² = ½(2 kg)(10 m/s)² = ½(2)(100) = 100 J",
        concept: "Calculate KE using ½mv²"
      },
      {
        id: "energy-4", type: "multiple-choice",
        question: "What happens to total mechanical energy in the absence of friction?",
        options: [
          { value: "a", text: "It increases" },
          { value: "b", text: "It decreases" },
          { value: "c", text: "It remains constant" },
          { value: "d", text: "It becomes zero" }
        ],
        correctAnswer: "c",
        explanation: "In the absence of non-conservative forces like friction, total mechanical energy (KE + PE) is conserved.",
        concept: "Energy conservation: E = KE + PE = constant"
      },
      {
        id: "energy-5", type: "multiple-choice",
        question: "If you lift a 5 kg object 2 meters high, how much work do you do against gravity?",
        options: [
          { value: "a", text: "10 J" },
          { value: "b", text: "98 J" },
          { value: "c", text: "50 J" },
          { value: "d", text: "25 J" }
        ],
        correctAnswer: "b",
        explanation: "Work against gravity = mgh = (5 kg)(9.8 m/s²)(2 m) = 98 J",
        concept: "Work against gravity = mgh"
      },
      {
        id: "energy-6", type: "multiple-choice",
        question: "What is power?",
        options: [
          { value: "a", text: "Energy per unit mass" },
          { value: "b", text: "Work per unit time" },
          { value: "c", text: "Force per unit area" },
          { value: "d", text: "Energy per unit volume" }
        ],
        correctAnswer: "b",
        explanation: "Power is the rate of doing work or transferring energy: P = W/t = ΔE/t.",
        concept: "P = W/t"
      },
      {
        id: "energy-7", type: "multiple-choice",
        question: "What is the SI unit of power?",
        options: [
          { value: "a", text: "Joule" },
          { value: "b", text: "Newton" },
          { value: "c", text: "Watt" },
          { value: "d", text: "Pascal" }
        ],
        correctAnswer: "c",
        explanation: "The SI unit of power is the Watt (W), equivalent to J/s or kg⋅m²/s³.",
        concept: "SI unit: Watt (W)"
      },
      {
        id: "energy-8", type: "multiple-choice",
        question: "A spring is compressed by 0.1 m with a spring constant of 100 N/m. What is its elastic potential energy?",
        options: [
          { value: "a", text: "0.5 J" },
          { value: "b", text: "1 J" },
          { value: "c", text: "5 J" },
          { value: "d", text: "10 J" }
        ],
        correctAnswer: "a",
        explanation: "Elastic PE = ½kx² = ½(100 N/m)(0.1 m)² = ½(100)(0.01) = 0.5 J",
        concept: "Elastic PE = ½kx²"
      },
      {
        id: "energy-9", type: "multiple-choice",
        question: "What is work?",
        options: [
          { value: "a", text: "Force times time" },
          { value: "b", text: "Force times distance" },
          { value: "c", text: "Mass times acceleration" },
          { value: "d", text: "Energy per unit time" }
        ],
        correctAnswer: "b",
        explanation: "Work is defined as W = F⋅d⋅cos(θ), where F is force, d is displacement, and θ is the angle between them.",
        concept: "W = F⋅d⋅cos(θ)"
      },
      {
        id: "energy-10", type: "multiple-choice",
        question: "What is the work-energy theorem?",
        options: [
          { value: "a", text: "Work equals kinetic energy" },
          { value: "b", text: "Work equals potential energy" },
          { value: "c", text: "Work equals the change in kinetic energy" },
          { value: "d", text: "Work equals total energy" }
        ],
        correctAnswer: "c",
        explanation: "The work-energy theorem states that the net work done on an object equals its change in kinetic energy: W = ΔKE.",
        concept: "W = ΔKE"
      },
      {
        id: "energy-11", type: "multiple-choice",
        question: "What is the SI unit of energy?",
        options: [
          { value: "a", text: "Newton" },
          { value: "b", text: "Joule" },
          { value: "c", text: "Watt" },
          { value: "d", text: "Pascal" }
        ],
        correctAnswer: "b",
        explanation: "The SI unit of energy is the Joule (J), equivalent to kg⋅m²/s² or N⋅m.",
        concept: "SI unit: Joule (J)"
      },
      {
        id: "energy-12", type: "multiple-choice",
        question: "If no work is done on a system, what happens to its kinetic energy?",
        options: [
          { value: "a", text: "It increases" },
          { value: "b", text: "It decreases" },
          { value: "c", text: "It remains constant" },
          { value: "d", text: "It becomes zero" }
        ],
        correctAnswer: "c",
        explanation: "By the work-energy theorem, if W = 0, then ΔKE = 0, so kinetic energy remains constant.",
        concept: "No work ⟹ constant KE"
      }
    ]
  }
};

// General Relativity Lessons
export const generalRelativityLessons: Record<string, LessonData> = {
  "rel-1": {
    id: "rel-1",
    title: "Special Relativity Basics",
    videoId: "1YFrISfN7jo",
    feynmanNotes: "We have a habit in writing articles published in scientific journals to make the work as finished as possible, to cover up all the tracks, to not worry about the blind alleys or describe how you had the wrong idea first, and so on. The theory of relativity came from looking carefully at what we mean by simultaneity, and by time, and by space.",
    questions: [
      {
        id: "rel-1-1", type: "multiple-choice",
        question: "What is the speed of light in a vacuum?",
        options: [
          { value: "a", text: "3 × 10⁶ m/s" },
          { value: "b", text: "3 × 10⁸ m/s" },
          { value: "c", text: "3 × 10¹⁰ m/s" },
          { value: "d", text: "3 × 10¹² m/s" }
        ],
        correctAnswer: "b",
        explanation: "The speed of light in a vacuum is exactly 299,792,458 meters per second, often approximated as 3 × 10⁸ m/s.",
        concept: "c = 3 × 10⁸ m/s"
      },
      {
        id: "rel-1-2", type: "multiple-choice",
        question: "What happens to time as you approach the speed of light?",
        options: [
          { value: "a", text: "Time speeds up" },
          { value: "b", text: "Time slows down" },
          { value: "c", text: "Time remains constant" },
          { value: "d", text: "Time reverses" }
        ],
        correctAnswer: "b",
        explanation: "According to time dilation, time slows down for objects moving at high speeds relative to an observer.",
        concept: "Time Dilation: Δt' = γΔt"
      },
      {
        id: "rel-1-3", type: "multiple-choice",
        question: "What is the Lorentz factor γ when v = 0?",
        options: [
          { value: "a", text: "0" },
          { value: "b", text: "1" },
          { value: "c", text: "∞" },
          { value: "d", text: "c" }
        ],
        correctAnswer: "b",
        explanation: "When v = 0, γ = 1/√(1 - v²/c²) = 1/√(1 - 0) = 1.",
        concept: "γ = 1/√(1 - v²/c²)"
      },
      {
        id: "rel-1-4", type: "multiple-choice",
        question: "According to special relativity, which quantity is invariant for all observers?",
        options: [
          { value: "a", text: "Time intervals" },
          { value: "b", text: "Spatial distances" },
          { value: "c", text: "The speed of light" },
          { value: "d", text: "Mass" }
        ],
        correctAnswer: "c",
        explanation: "The speed of light in vacuum is the same for all observers, regardless of their motion.",
        concept: "c is universal constant"
      },
      {
        id: "rel-1-5", type: "multiple-choice",
        question: "What is length contraction?",
        options: [
          { value: "a", text: "Objects appear longer when moving" },
          { value: "b", text: "Objects appear shorter when moving" },
          { value: "c", text: "Objects change mass when moving" },
          { value: "d", text: "Objects change color when moving" }
        ],
        correctAnswer: "b",
        explanation: "Length contraction means objects appear shorter in the direction of motion when viewed by a stationary observer.",
        concept: "L = L₀/γ"
      },
      {
        id: "rel-1-6", type: "multiple-choice",
        question: "What is the mass-energy equivalence formula?",
        options: [
          { value: "a", text: "E = mc" },
          { value: "b", text: "E = mc²" },
          { value: "c", text: "E = ½mc²" },
          { value: "d", text: "E = 2mc²" }
        ],
        correctAnswer: "b",
        explanation: "Einstein's famous equation E = mc² shows that mass and energy are equivalent.",
        concept: "E = mc²"
      },
      {
        id: "rel-1-7", type: "multiple-choice",
        question: "What happens to an object's mass as it approaches the speed of light?",
        options: [
          { value: "a", text: "It decreases" },
          { value: "b", text: "It remains constant" },
          { value: "c", text: "Its relativistic mass increases" },
          { value: "d", text: "It becomes negative" }
        ],
        correctAnswer: "c",
        explanation: "The relativistic mass increases with velocity as m = γm₀, though rest mass remains constant.",
        concept: "Relativistic mass: m = γm₀"
      },
      {
        id: "rel-1-8", type: "multiple-choice",
        question: "What are the two postulates of special relativity?",
        options: [
          { value: "a", text: "Time is absolute, space is relative" },
          { value: "b", text: "Laws of physics are the same in all frames; speed of light is constant" },
          { value: "c", text: "Mass equals energy, time equals space" },
          { value: "d", text: "Gravity bends light, space is curved" }
        ],
        correctAnswer: "b",
        explanation: "The two postulates are: (1) Laws of physics are the same in all inertial frames, (2) Speed of light is constant for all observers.",
        concept: "Einstein's two postulates"
      },
      {
        id: "rel-1-9", type: "multiple-choice",
        question: "At what speed does γ = 2?",
        options: [
          { value: "a", text: "0.5c" },
          { value: "b", text: "0.707c" },
          { value: "c", text: "0.866c" },
          { value: "d", text: "0.9c" }
        ],
        correctAnswer: "c",
        explanation: "When γ = 2, solving 2 = 1/√(1 - v²/c²) gives v = √3/2 c ≈ 0.866c.",
        concept: "γ = 2 when v = 0.866c"
      },
      {
        id: "rel-1-10", type: "multiple-choice",
        question: "What is simultaneity in special relativity?",
        options: [
          { value: "a", text: "Events that are simultaneous for all observers" },
          { value: "b", text: "Events that happen at the same place" },
          { value: "c", text: "Events simultaneous in one frame may not be in another" },
          { value: "d", text: "Events that happen at the speed of light" }
        ],
        correctAnswer: "c",
        explanation: "Simultaneity is relative - events that are simultaneous in one reference frame may not be simultaneous in another moving frame.",
        concept: "Relativity of simultaneity"
      },
      {
        id: "rel-1-11", type: "multiple-choice",
        question: "Why can't massive objects reach the speed of light?",
        options: [
          { value: "a", text: "They would disappear" },
          { value: "b", text: "It would require infinite energy" },
          { value: "c", text: "They would reverse time" },
          { value: "d", text: "They would create black holes" }
        ],
        correctAnswer: "b",
        explanation: "As v approaches c, γ approaches infinity, so the energy required to accelerate further becomes infinite.",
        concept: "Infinite energy needed to reach c"
      },
      {
        id: "rel-1-12", type: "multiple-choice",
        question: "What is proper time?",
        options: [
          { value: "a", text: "Time measured by a moving observer" },
          { value: "b", text: "Time measured in the lab frame" },
          { value: "c", text: "Time measured by the object itself" },
          { value: "d", text: "Universal time for all observers" }
        ],
        correctAnswer: "c",
        explanation: "Proper time is the time measured by the object itself in its own rest frame - it's the shortest time interval between two events.",
        concept: "Proper time = time in rest frame"
      }
    ]
  }
};

// Quantum Mechanics Lessons  
export const quantumMechanicsLessons: Record<string, LessonData> = {
  "qm-1": {
    id: "qm-1",
    title: "Wave-Particle Duality",
    videoId: "Iuv6hY6zsd0",
    feynmanNotes: "I think I can safely say that nobody understands quantum mechanics. The theory is completely non-intuitive. Light sometimes behaves like a wave, spreading out and interfering with itself. But sometimes it behaves like particles, hitting detectors one photon at a time.",
    questions: [
      {
        id: "qm-1-1", type: "multiple-choice",
        question: "What did the double-slit experiment demonstrate?",
        options: [
          { value: "a", text: "Light is only a wave" },
          { value: "b", text: "Light is only a particle" },
          { value: "c", text: "Light exhibits wave-particle duality" },
          { value: "d", text: "Light doesn't exist" }
        ],
        correctAnswer: "c",
        explanation: "The double-slit experiment shows that light (and matter) can exhibit both wave and particle properties depending on how it's observed.",
        concept: "Wave-particle duality"
      },
      {
        id: "qm-1-2", type: "multiple-choice",
        question: "What is a photon?",
        options: [
          { value: "a", text: "A unit of light energy" },
          { value: "b", text: "A quantum of electromagnetic radiation" },
          { value: "c", text: "A particle of light" },
          { value: "d", text: "All of the above" }
        ],
        correctAnswer: "d",
        explanation: "A photon is a quantum (discrete unit) of electromagnetic radiation, representing both the particle nature of light and its energy.",
        concept: "Photon = light quantum"
      },
      {
        id: "qm-1-3", type: "multiple-choice",
        question: "What is Planck's constant?",
        options: [
          { value: "a", text: "h = 6.63 × 10⁻³⁴ J⋅s" },
          { value: "b", text: "h = 6.63 × 10⁻²⁴ J⋅s" },
          { value: "c", text: "h = 6.63 × 10⁻¹⁴ J⋅s" },
          { value: "d", text: "h = 6.63 × 10⁻⁴ J⋅s" }
        ],
        correctAnswer: "a",
        explanation: "Planck's constant h = 6.63 × 10⁻³⁴ J⋅s is the fundamental constant that relates energy to frequency in quantum mechanics.",
        concept: "h = 6.63 × 10⁻³⁴ J⋅s"
      },
      {
        id: "qm-1-4", type: "multiple-choice",
        question: "What is the energy of a photon?",
        options: [
          { value: "a", text: "E = hf" },
          { value: "b", text: "E = mc²" },
          { value: "c", text: "E = ½mv²" },
          { value: "d", text: "E = mgh" }
        ],
        correctAnswer: "a",
        explanation: "The energy of a photon is E = hf, where h is Planck's constant and f is the frequency.",
        concept: "E = hf = hc/λ"
      },
      {
        id: "qm-1-5", type: "multiple-choice",
        question: "What is de Broglie wavelength?",
        options: [
          { value: "a", text: "λ = h/p" },
          { value: "b", text: "λ = h/m" },
          { value: "c", text: "λ = h/v" },
          { value: "d", text: "λ = h/E" }
        ],
        correctAnswer: "a",
        explanation: "De Broglie wavelength λ = h/p shows that all matter has wave properties, where p is momentum.",
        concept: "λ = h/p (matter waves)"
      },
      {
        id: "qm-1-6", type: "multiple-choice",
        question: "What is the photoelectric effect?",
        options: [
          { value: "a", text: "Light creating electricity" },
          { value: "b", text: "Electrons being emitted when light hits a material" },
          { value: "c", text: "Light bending around objects" },
          { value: "d", text: "Light changing color" }
        ],
        correctAnswer: "b",
        explanation: "The photoelectric effect is the emission of electrons from a material when light of sufficient frequency strikes it.",
        concept: "Light ejects electrons"
      },
      {
        id: "qm-1-7", type: "multiple-choice",
        question: "What is the work function?",
        options: [
          { value: "a", text: "The minimum energy needed to remove an electron" },
          { value: "b", text: "The maximum energy of an electron" },
          { value: "c", text: "The kinetic energy of an electron" },
          { value: "d", text: "The potential energy of an electron" }
        ],
        correctAnswer: "a",
        explanation: "The work function is the minimum energy required to remove an electron from a material's surface.",
        concept: "Work function = minimum removal energy"
      },
      {
        id: "qm-1-8", type: "multiple-choice",
        question: "What is quantization?",
        options: [
          { value: "a", text: "Energy comes in discrete packets" },
          { value: "b", text: "Energy is continuous" },
          { value: "c", text: "Energy is always zero" },
          { value: "d", text: "Energy is infinite" }
        ],
        correctAnswer: "a",
        explanation: "Quantization means that certain quantities like energy come in discrete, indivisible packets called quanta.",
        concept: "Energy = discrete packets"
      },
      {
        id: "qm-1-9", type: "multiple-choice",
        question: "What happens when you observe a quantum system?",
        options: [
          { value: "a", text: "Nothing changes" },
          { value: "b", text: "The wave function collapses" },
          { value: "c", text: "The system disappears" },
          { value: "d", text: "Time stops" }
        ],
        correctAnswer: "b",
        explanation: "Quantum measurement causes the wave function to collapse, forcing the system into a definite state.",
        concept: "Measurement causes collapse"
      },
      {
        id: "qm-1-10", type: "multiple-choice",
        question: "What is interference in quantum mechanics?",
        options: [
          { value: "a", text: "Particles colliding" },
          { value: "b", text: "Wave functions adding constructively or destructively" },
          { value: "c", text: "Electrons repelling" },
          { value: "d", text: "Atoms bonding" }
        ],
        correctAnswer: "b",
        explanation: "Quantum interference occurs when wave functions add together, creating constructive or destructive interference patterns.",
        concept: "Wave functions interfere"
      },
      {
        id: "qm-1-11", type: "multiple-choice",
        question: "What is the complementarity principle?",
        options: [
          { value: "a", text: "Wave and particle properties are complementary" },
          { value: "b", text: "All particles are the same" },
          { value: "c", text: "Energy and matter are equivalent" },
          { value: "d", text: "Space and time are linked" }
        ],
        correctAnswer: "a",
        explanation: "Complementarity states that wave and particle properties are complementary aspects of quantum objects - both needed for complete description.",
        concept: "Wave and particle aspects are complementary"
      },
      {
        id: "qm-1-12", type: "multiple-choice",
        question: "What determines which slit an electron goes through in the double-slit experiment?",
        options: [
          { value: "a", text: "The electron's speed" },
          { value: "b", text: "The electron's charge" },
          { value: "c", text: "Whether or not you measure it" },
          { value: "d", text: "The size of the slits" }
        ],
        correctAnswer: "c",
        explanation: "If you don't measure which slit, the electron goes through both slits simultaneously. If you do measure, it goes through one specific slit.",
        concept: "Measurement determines path"
      }
    ]
  }
};

export function getLessonData(lessonId: string): LessonData | null {
  if (lessonId.startsWith("cm-")) {
    return classicalMechanicsLessons[lessonId] || null;
  } else if (lessonId.startsWith("rel-")) {
    return generalRelativityLessons[lessonId] || null;
  } else if (lessonId.startsWith("qm-")) {
    return quantumMechanicsLessons[lessonId] || null;
  }
  return null;
}