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
  questions: Question[];
}

// Classical Mechanics Lessons
export const classicalMechanicsLessons: Record<string, LessonData> = {
  "cm-1": {
    id: "cm-1",
    title: "Introduction to Motion",
    videoId: "wWnfJ0-xXRE",
    questions: [
      {
        id: "motion-1",
        type: "multiple-choice",
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
        id: "motion-2", 
        type: "multiple-choice",
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
        id: "motion-3",
        type: "multiple-choice", 
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
        id: "motion-4",
        type: "multiple-choice",
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
        id: "motion-5",
        type: "multiple-choice",
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
      }
    ]
  },
  "cm-2": {
    id: "cm-2",
    title: "Forces and Newton's Laws",
    videoId: "ZM8ECpBuQYE",
    questions: [
      {
        id: "force-1",
        type: "multiple-choice",
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
        id: "force-2",
        type: "multiple-choice",
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
        id: "force-3",
        type: "multiple-choice",
        question: "What is Newton's Third Law?",
        options: [
          { value: "a", text: "Objects in motion tend to stay in motion" },
          { value: "b", text: "Force equals mass times acceleration" },
          { value: "c", text: "For every action, there is an equal and opposite reaction" },
          { value: "d", text: "Energy is conserved" }
        ],
        correctAnswer: "c",
        explanation: "Newton's Third Law states that for every action force, there is an equal and opposite reaction force.",
        concept: "Action-Reaction Pairs"
      }
    ]
  },
  "cm-3": {
    id: "cm-3",
    title: "Work and Energy",
    videoId: "w4QFJb9a8vo",
    questions: [
      {
        id: "energy-1",
        type: "multiple-choice",
        question: "What is the definition of work in physics?",
        options: [
          { value: "a", text: "Force times time" },
          { value: "b", text: "Force times distance in the direction of force" },
          { value: "c", text: "Mass times velocity" },
          { value: "d", text: "Energy per unit time" }
        ],
        correctAnswer: "b",
        explanation: "Work is defined as force times distance when the force is applied in the direction of motion.",
        concept: "W = F × d"
      },
      {
        id: "energy-2",
        type: "multiple-choice",
        question: "What is kinetic energy?",
        options: [
          { value: "a", text: "Energy due to position" },
          { value: "b", text: "Energy due to motion" },
          { value: "c", text: "Energy due to temperature" },
          { value: "d", text: "Energy stored in springs" }
        ],
        correctAnswer: "b",
        explanation: "Kinetic energy is the energy an object possesses due to its motion.",
        concept: "KE = ½mv²"
      }
    ]
  }
};

// General Relativity Lessons
export const generalRelativityLessons: Record<string, LessonData> = {
  "rel-1": {
    id: "rel-1",
    title: "Special Relativity Basics",
    notes: "Einstein's Special Theory of Relativity revolutionized our understanding of space and time. The key principles are: 1) The laws of physics are the same in all inertial reference frames, 2) The speed of light in a vacuum is constant for all observers.",
    questions: [
      {
        id: "rel-1-1",
        type: "multiple-choice",
        question: "What is the speed of light in a vacuum?",
        options: [
          { value: "a", text: "300,000 km/s" },
          { value: "b", text: "299,792,458 m/s" },
          { value: "c", text: "3 × 10⁸ mph" },
          { value: "d", text: "186,000 m/s" }
        ],
        correctAnswer: "b",
        explanation: "The speed of light in a vacuum is exactly 299,792,458 meters per second, often approximated as 3 × 10⁸ m/s.",
        concept: "Universal Speed Limit"
      },
      {
        id: "rel-1-2",
        type: "multiple-choice",
        question: "What happens to time as you approach the speed of light?",
        options: [
          { value: "a", text: "Time speeds up" },
          { value: "b", text: "Time slows down" },
          { value: "c", text: "Time remains constant" },
          { value: "d", text: "Time reverses" }
        ],
        correctAnswer: "b",
        explanation: "According to time dilation, time slows down for objects moving at high speeds relative to an observer.",
        concept: "Time Dilation"
      }
    ]
  },
  "rel-2": {
    id: "rel-2",
    title: "Spacetime and Light",
    notes: "Spacetime is the four-dimensional continuum combining space and time. Light always travels at the same speed through spacetime, regardless of the motion of the source or observer.",
    questions: [
      {
        id: "rel-2-1",
        type: "multiple-choice",
        question: "How many dimensions does spacetime have?",
        options: [
          { value: "a", text: "3" },
          { value: "b", text: "4" },
          { value: "c", text: "5" },
          { value: "d", text: "11" }
        ],
        correctAnswer: "b",
        explanation: "Spacetime has 4 dimensions: 3 spatial dimensions (x, y, z) and 1 time dimension.",
        concept: "Four-dimensional Spacetime"
      }
    ]
  },
  "rel-3": {
    id: "rel-3",
    title: "General Relativity Introduction",
    notes: "General Relativity describes gravity not as a force, but as the curvature of spacetime caused by mass and energy. Massive objects warp spacetime, and this warping is what we experience as gravity.",
    questions: [
      {
        id: "rel-3-1",
        type: "multiple-choice",
        question: "According to General Relativity, what causes gravity?",
        options: [
          { value: "a", text: "Attractive force between masses" },
          { value: "b", text: "Curvature of spacetime" },
          { value: "c", text: "Exchange of particles" },
          { value: "d", text: "Electromagnetic fields" }
        ],
        correctAnswer: "b",
        explanation: "In General Relativity, gravity is not a force but the result of curved spacetime caused by mass and energy.",
        concept: "Gravity as Curved Spacetime"
      }
    ]
  }
};

// Quantum Mechanics Lessons
export const quantumMechanicsLessons: Record<string, LessonData> = {
  "qm-1": {
    id: "qm-1",
    title: "Wave-Particle Duality",
    notes: "One of the most fundamental concepts in quantum mechanics is that matter and light exhibit both wave and particle properties. This duality is not observed in everyday life but becomes apparent at the quantum scale.",
    questions: [
      {
        id: "qm-1-1",
        type: "multiple-choice",
        question: "What experiment demonstrates the wave-particle duality of light?",
        options: [
          { value: "a", text: "Double-slit experiment" },
          { value: "b", text: "Photoelectric effect" },
          { value: "c", text: "Both A and B" },
          { value: "d", text: "Compton scattering" }
        ],
        correctAnswer: "c",
        explanation: "Both the double-slit experiment (wave nature) and photoelectric effect (particle nature) demonstrate light's dual nature.",
        concept: "Wave-Particle Duality"
      },
      {
        id: "qm-1-2",
        type: "multiple-choice",
        question: "What are photons?",
        options: [
          { value: "a", text: "Particles of light" },
          { value: "b", text: "Electromagnetic waves" },
          { value: "c", text: "Both particles and waves" },
          { value: "d", text: "Energy packets" }
        ],
        correctAnswer: "c",
        explanation: "Photons are quanta of light that exhibit both particle and wave characteristics depending on how they're observed.",
        concept: "Photons as Light Quanta"
      }
    ]
  },
  "qm-2": {
    id: "qm-2",
    title: "The Uncertainty Principle",
    notes: "Heisenberg's Uncertainty Principle states that you cannot simultaneously know both the exact position and momentum of a particle. The more precisely you know one, the less precisely you can know the other.",
    questions: [
      {
        id: "qm-2-1",
        type: "multiple-choice",
        question: "What does Heisenberg's Uncertainty Principle state?",
        options: [
          { value: "a", text: "Energy cannot be created or destroyed" },
          { value: "b", text: "Position and momentum cannot both be precisely known" },
          { value: "c", text: "Light travels at constant speed" },
          { value: "d", text: "Mass and energy are equivalent" }
        ],
        correctAnswer: "b",
        explanation: "The Uncertainty Principle states that the position and momentum of a particle cannot both be precisely determined simultaneously.",
        concept: "Δx × Δp ≥ ℏ/2"
      }
    ]
  },
  "qm-3": {
    id: "qm-3",
    title: "Quantum Superposition",
    notes: "Quantum superposition allows particles to exist in multiple states simultaneously until observed. Schrödinger's famous thought experiment with a cat illustrates this bizarre quantum behavior on a macroscopic scale.",
    questions: [
      {
        id: "qm-3-1",
        type: "multiple-choice",
        question: "What is quantum superposition?",
        options: [
          { value: "a", text: "Particles moving very fast" },
          { value: "b", text: "Particles existing in multiple states simultaneously" },
          { value: "c", text: "Particles colliding with each other" },
          { value: "d", text: "Particles changing into energy" }
        ],
        correctAnswer: "b",
        explanation: "Quantum superposition means that quantum systems can exist in multiple states at the same time until measured.",
        concept: "Multiple States Simultaneously"
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