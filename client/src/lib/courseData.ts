// Comprehensive Course Data with Mathematics and Physics
export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  category: 'mathematics' | 'physics';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  estimatedHours: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  videoUrl?: string;
  isCompleted: boolean;
  isLocked: boolean;
  concepts: string[];
  practiceQuestions: number;
}

// Mathematics Courses
export const algebraCourse: Course = {
  id: 'algebra',
  title: 'Algebra Fundamentals',
  description: 'Master the building blocks of mathematics with comprehensive algebra',
  icon: '📐',
  color: 'bg-green-500',
  category: 'mathematics',
  difficulty: 'beginner',
  prerequisites: [],
  estimatedHours: 40,
  lessons: [
    {
      id: 'alg-1',
      title: 'Linear Equations',
      description: 'Solving equations with one variable',
      difficulty: 'beginner',
      estimatedTime: '45 min',
      videoUrl: 'https://www.youtube.com/watch?v=9DtGpCU8UvQ',
      isCompleted: false,
      isLocked: false,
      concepts: ['Variables', 'Coefficients', 'Constants', 'Solving for x'],
      practiceQuestions: 15
    },
    {
      id: 'alg-2',
      title: 'Quadratic Equations',
      description: 'Understanding and solving quadratic equations',
      difficulty: 'intermediate',
      estimatedTime: '60 min',
      videoUrl: 'https://www.youtube.com/watch?v=3HxnVTaOwLI',
      isCompleted: false,
      isLocked: true,
      concepts: ['Quadratic Formula', 'Factoring', 'Completing the Square'],
      practiceQuestions: 20
    },
    {
      id: 'alg-3',
      title: 'Systems of Equations',
      description: 'Solving multiple equations simultaneously',
      difficulty: 'intermediate',
      estimatedTime: '50 min',
      videoUrl: 'https://www.youtube.com/watch?v=z_btfuvQUgU',
      isCompleted: false,
      isLocked: true,
      concepts: ['Substitution Method', 'Elimination Method', 'Graphical Solution'],
      practiceQuestions: 18
    }
  ]
};

export const calculusCourse: Course = {
  id: 'calculus',
  title: 'Calculus',
  description: 'Explore the mathematics of change and motion',
  icon: '∫',
  color: 'bg-blue-500',
  category: 'mathematics',
  difficulty: 'intermediate',
  prerequisites: ['algebra'],
  estimatedHours: 80,
  lessons: [
    {
      id: 'calc-1',
      title: 'Limits and Continuity',
      description: 'Understanding the foundation of calculus',
      difficulty: 'intermediate',
      estimatedTime: '75 min',
      videoUrl: 'https://www.youtube.com/watch?v=riXcZT2ICjA',
      isCompleted: false,
      isLocked: false,
      concepts: ['Limits', 'Continuity', 'Infinite Limits', 'Limit Laws'],
      practiceQuestions: 25
    },
    {
      id: 'calc-2',
      title: 'Derivatives',
      description: 'The mathematics of rates of change',
      difficulty: 'intermediate',
      estimatedTime: '90 min',
      videoUrl: 'https://www.youtube.com/watch?v=S0_qX4VJhMQ',
      isCompleted: false,
      isLocked: true,
      concepts: ['Power Rule', 'Product Rule', 'Chain Rule', 'Implicit Differentiation'],
      practiceQuestions: 30
    },
    {
      id: 'calc-3',
      title: 'Integrals',
      description: 'Understanding areas and accumulation',
      difficulty: 'advanced',
      estimatedTime: '100 min',
      videoUrl: 'https://www.youtube.com/watch?v=rfG8ce4nNh0',
      isCompleted: false,
      isLocked: true,
      concepts: ['Antiderivatives', 'Fundamental Theorem', 'Substitution', 'Integration by Parts'],
      practiceQuestions: 35
    }
  ]
};

export const linearAlgebraCourse: Course = {
  id: 'linear-algebra',
  title: 'Linear Algebra',
  description: 'Vector spaces, matrices, and linear transformations',
  icon: '🔢',
  color: 'bg-purple-500',
  category: 'mathematics',
  difficulty: 'advanced',
  prerequisites: ['algebra', 'calculus'],
  estimatedHours: 60,
  lessons: [
    {
      id: 'la-1',
      title: 'Vectors and Vector Spaces',
      description: 'Introduction to vector mathematics',
      difficulty: 'intermediate',
      estimatedTime: '80 min',
      videoUrl: 'https://www.youtube.com/watch?v=fNk_zzaMoSs',
      isCompleted: false,
      isLocked: false,
      concepts: ['Vector Addition', 'Scalar Multiplication', 'Linear Independence', 'Basis'],
      practiceQuestions: 22
    },
    {
      id: 'la-2',
      title: 'Matrices and Determinants',
      description: 'Matrix operations and properties',
      difficulty: 'advanced',
      estimatedTime: '95 min',
      videoUrl: 'https://www.youtube.com/watch?v=Ip3X9LOh2dk',
      isCompleted: false,
      isLocked: true,
      concepts: ['Matrix Multiplication', 'Determinants', 'Inverse Matrices', 'Eigenvalues'],
      practiceQuestions: 28
    }
  ]
};

// Physics Courses
export const classicalMechanicsCourse: Course = {
  id: 'classical',
  title: 'Classical Mechanics',
  description: 'Explore motion, forces, and energy in the macroscopic world',
  icon: '🔬',
  color: 'bg-indigo-500',
  category: 'physics',
  difficulty: 'intermediate',
  prerequisites: ['algebra', 'calculus'],
  estimatedHours: 100,
  lessons: [
    {
      id: 'cm-1',
      title: 'Kinematics in One Dimension',
      description: 'Motion along a straight line',
      difficulty: 'beginner',
      estimatedTime: '60 min',
      videoUrl: 'https://www.youtube.com/watch?v=ZM8ECpBuQYE',
      isCompleted: false,
      isLocked: false,
      concepts: ['Position', 'Velocity', 'Acceleration', 'Kinematic Equations'],
      practiceQuestions: 20
    },
    {
      id: 'cm-2',
      title: 'Newton\'s Laws of Motion',
      description: 'The fundamental laws governing motion',
      difficulty: 'intermediate',
      estimatedTime: '75 min',
      videoUrl: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds',
      isCompleted: false,
      isLocked: true,
      concepts: ['First Law', 'Second Law', 'Third Law', 'Free Body Diagrams'],
      practiceQuestions: 25
    },
    {
      id: 'cm-3',
      title: 'Work and Energy',
      description: 'Understanding energy transformations',
      difficulty: 'intermediate',
      estimatedTime: '70 min',
      videoUrl: 'https://www.youtube.com/watch?v=w4QFJb9a8vo',
      isCompleted: false,
      isLocked: true,
      concepts: ['Kinetic Energy', 'Potential Energy', 'Work-Energy Theorem', 'Conservation'],
      practiceQuestions: 22
    },
    {
      id: 'cm-4',
      title: 'Momentum and Collisions',
      description: 'Conservation of momentum in interactions',
      difficulty: 'advanced',
      estimatedTime: '85 min',
      videoUrl: 'https://www.youtube.com/watch?v=hHg4dWVLzqI',
      isCompleted: false,
      isLocked: true,
      concepts: ['Linear Momentum', 'Impulse', 'Elastic Collisions', 'Inelastic Collisions'],
      practiceQuestions: 30
    },
    {
      id: 'cm-5',
      title: 'Rotational Motion',
      description: 'Objects in circular and rotational motion',
      difficulty: 'advanced',
      estimatedTime: '90 min',
      videoUrl: 'https://www.youtube.com/watch?v=6aGUj-J_g8w',
      isCompleted: false,
      isLocked: true,
      concepts: ['Angular Velocity', 'Torque', 'Moment of Inertia', 'Angular Momentum'],
      practiceQuestions: 28
    }
  ]
};

export const relativityCourse: Course = {
  id: 'relativity',
  title: 'General Relativity',
  description: 'Einstein\'s theory of spacetime and gravity',
  icon: '🌌',
  color: 'bg-purple-600',
  category: 'physics',
  difficulty: 'advanced',
  prerequisites: ['classical', 'linear-algebra'],
  estimatedHours: 120,
  lessons: [
    {
      id: 'gr-1',
      title: 'Special Relativity Foundations',
      description: 'Time dilation and length contraction',
      difficulty: 'advanced',
      estimatedTime: '100 min',
      videoUrl: 'https://www.youtube.com/watch?v=ajhFNcUTJI0',
      isCompleted: false,
      isLocked: false,
      concepts: ['Lorentz Transformations', 'Time Dilation', 'Length Contraction', 'Simultaneity'],
      practiceQuestions: 25
    },
    {
      id: 'gr-2',
      title: 'Spacetime and Curvature',
      description: 'Understanding curved spacetime geometry',
      difficulty: 'advanced',
      estimatedTime: '120 min',
      videoUrl: 'https://www.youtube.com/watch?v=wrwgIjBUYVc',
      isCompleted: false,
      isLocked: true,
      concepts: ['Spacetime Interval', 'Metric Tensor', 'Geodesics', 'Curvature'],
      practiceQuestions: 30
    },
    {
      id: 'gr-3',
      title: 'Einstein Field Equations',
      description: 'The mathematical foundation of general relativity',
      difficulty: 'advanced',
      estimatedTime: '140 min',
      videoUrl: 'https://www.youtube.com/watch?v=foRPKAKZWx8',
      isCompleted: false,
      isLocked: true,
      concepts: ['Einstein Tensor', 'Stress-Energy Tensor', 'Cosmological Constant', 'Field Equations'],
      practiceQuestions: 35
    }
  ]
};

export const quantumMechanicsCourse: Course = {
  id: 'quantum',
  title: 'Quantum Mechanics',
  description: 'The strange world of quantum phenomena',
  icon: '⚛️',
  color: 'bg-pink-600',
  category: 'physics',
  difficulty: 'advanced',
  prerequisites: ['classical', 'relativity', 'linear-algebra'],
  estimatedHours: 150,
  lessons: [
    {
      id: 'qm-1',
      title: 'Wave-Particle Duality',
      description: 'The dual nature of matter and energy',
      difficulty: 'advanced',
      estimatedTime: '110 min',
      videoUrl: 'https://www.youtube.com/watch?v=A9tKncAdlHQ',
      isCompleted: false,
      isLocked: false,
      concepts: ['de Broglie Wavelength', 'Double-Slit Experiment', 'Photons', 'Matter Waves'],
      practiceQuestions: 28
    },
    {
      id: 'qm-2',
      title: 'Schrödinger Equation',
      description: 'The fundamental equation of quantum mechanics',
      difficulty: 'advanced',
      estimatedTime: '130 min',
      videoUrl: 'https://www.youtube.com/watch?v=L0DlHl_76Fg',
      isCompleted: false,
      isLocked: true,
      concepts: ['Wave Function', 'Hamiltonian', 'Time Evolution', 'Probability Density'],
      practiceQuestions: 32
    },
    {
      id: 'qm-3',
      title: 'Quantum Entanglement',
      description: 'Non-local correlations in quantum systems',
      difficulty: 'advanced',
      estimatedTime: '125 min',
      videoUrl: 'https://www.youtube.com/watch?v=JFozGfxmi8A',
      isCompleted: false,
      isLocked: true,
      concepts: ['Bell States', 'EPR Paradox', 'Bell\'s Theorem', 'Quantum Teleportation'],
      practiceQuestions: 35
    }
  ]
};

export const allCourses: Course[] = [
  // Mathematics (Prerequisites for Physics)
  algebraCourse,
  calculusCourse,
  linearAlgebraCourse,
  // Physics
  classicalMechanicsCourse,
  relativityCourse,
  quantumMechanicsCourse
];

export const getCourseById = (id: string): Course | undefined => {
  return allCourses.find(course => course.id === id);
};

export const getCoursesRequiredFor = (courseId: string): Course[] => {
  const course = getCourseById(courseId);
  if (!course) return [];
  
  return course.prerequisites.map(prereqId => getCourseById(prereqId)).filter(Boolean) as Course[];
};

export const getAvailableCourses = (completedCourses: string[]): Course[] => {
  return allCourses.filter(course => {
    return course.prerequisites.every(prereq => completedCourses.includes(prereq));
  });
};