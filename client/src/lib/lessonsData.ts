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