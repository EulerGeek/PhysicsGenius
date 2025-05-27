export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  totalLessons: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  order: number;
}

export const getCourses = (): Course[] => [
  {
    id: "classical",
    title: "Classical Mechanics",
    description: "Master the fundamentals of motion and forces",
    icon: "fas fa-rocket",
    color: "bg-blue-50 text-blue-600",
    totalLessons: 15
  },
  {
    id: "relativity",
    title: "General Relativity",
    description: "Explore spacetime and gravity",
    icon: "fas fa-infinity",
    color: "bg-purple-50 text-purple-600",
    totalLessons: 10
  },
  {
    id: "quantum",
    title: "Quantum Mechanics",
    description: "Discover the quantum world",
    icon: "fas fa-wave-square",
    color: "bg-amber-50 text-amber-600",
    totalLessons: 12
  }
];

export const getLessonsByCourse = (courseId: string): Lesson[] => {
  const lessons: Record<string, Lesson[]> = {
    classical: [
      {
        id: "cm-1",
        courseId: "classical",
        title: "Introduction to Motion",
        description: "Understanding position, velocity, and acceleration in one dimension",
        duration: "15 min",
        order: 1
      },
      {
        id: "cm-2",
        courseId: "classical",
        title: "Forces and Newton's Laws",
        description: "Explore the fundamental laws that govern motion and interactions",
        duration: "20 min",
        order: 2
      },
      {
        id: "cm-3",
        courseId: "classical",
        title: "Work and Energy",
        description: "Understand the relationship between work, kinetic and potential energy",
        duration: "18 min",
        order: 3
      },
      {
        id: "cm-4",
        courseId: "classical",
        title: "Momentum and Collisions",
        description: "Conservation of momentum in elastic and inelastic collisions",
        duration: "16 min",
        order: 4
      },
      {
        id: "cm-5",
        courseId: "classical",
        title: "Rotational Motion",
        description: "Angular velocity, acceleration, and rotational dynamics",
        duration: "22 min",
        order: 5
      },
      {
        id: "cm-6",
        courseId: "classical",
        title: "Simple Harmonic Motion",
        description: "Oscillations, springs, and pendulums in motion",
        duration: "19 min",
        order: 6
      }
    ],
    relativity: [
      {
        id: "rel-1",
        courseId: "relativity",
        title: "Special Relativity Basics",
        description: "Time dilation and length contraction explained",
        duration: "25 min",
        order: 1
      },
      {
        id: "rel-2",
        courseId: "relativity",
        title: "Spacetime and Light",
        description: "Understanding the speed of light and spacetime intervals",
        duration: "20 min",
        order: 2
      },
      {
        id: "rel-3",
        courseId: "relativity",
        title: "General Relativity Introduction",
        description: "Gravity as curved spacetime",
        duration: "30 min",
        order: 3
      }
    ],
    quantum: [
      {
        id: "qm-1",
        courseId: "quantum",
        title: "Wave-Particle Duality",
        description: "Light and matter exhibit both wave and particle properties",
        duration: "18 min",
        order: 1
      },
      {
        id: "qm-2",
        courseId: "quantum",
        title: "The Uncertainty Principle",
        description: "Heisenberg's principle and its implications",
        duration: "20 min",
        order: 2
      },
      {
        id: "qm-3",
        courseId: "quantum",
        title: "Quantum Superposition",
        description: "Schrödinger's cat and quantum states",
        duration: "22 min",
        order: 3
      }
    ]
  };

  return lessons[courseId] || [];
};
