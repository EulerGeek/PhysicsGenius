// Comprehensive Exam System for Course Unlocking
export interface ExamQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'numerical' | 'true-false';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  points: number;
}

export interface ExamSession {
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: ExamQuestion[];
  timeLimit: number; // in minutes
  passingScore: number; // percentage
  prerequisites: string[];
}

// Classical Mechanics Placement Exam
export const classicalMechanicsExam: ExamSession = {
  id: 'classical-placement',
  courseId: 'classical',
  title: 'Classical Mechanics Placement Exam',
  description: 'Demonstrate your understanding of basic physics and algebra to unlock Classical Mechanics',
  timeLimit: 30,
  passingScore: 70,
  prerequisites: [],
  questions: [
    {
      id: 'cm-1',
      question: 'A car accelerates from rest to 30 m/s in 6 seconds. What is its acceleration?',
      type: 'multiple-choice',
      options: ['3 m/s²', '5 m/s²', '6 m/s²', '180 m/s²'],
      correctAnswer: '5 m/s²',
      explanation: 'Using a = (v_f - v_i) / t = (30 - 0) / 6 = 5 m/s²',
      difficulty: 'easy',
      topic: 'Kinematics',
      points: 10
    },
    {
      id: 'cm-2',
      question: 'What is the unit of force in the SI system?',
      type: 'multiple-choice',
      options: ['Joule', 'Newton', 'Watt', 'Pascal'],
      correctAnswer: 'Newton',
      explanation: 'Newton (N) is the SI unit of force, defined as kg⋅m/s²',
      difficulty: 'easy',
      topic: 'Units',
      points: 5
    },
    {
      id: 'cm-3',
      question: 'If an object has mass 5 kg and acceleration 2 m/s², what is the net force?',
      type: 'numerical',
      correctAnswer: 10,
      explanation: 'Using Newton\'s second law: F = ma = 5 kg × 2 m/s² = 10 N',
      difficulty: 'medium',
      topic: 'Newton\'s Laws',
      points: 15
    },
    {
      id: 'cm-4',
      question: 'Acceleration can be negative.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Yes! Acceleration can be negative when an object is slowing down (deceleration) or moving in the opposite direction. For example, when you brake a car, the acceleration is negative.',
      difficulty: 'medium',
      topic: 'Acceleration',
      points: 10
    },
    {
      id: 'cm-5',
      question: 'A ball is thrown horizontally from a height of 20 m. How long does it take to hit the ground? (g = 10 m/s²)',
      type: 'multiple-choice',
      options: ['1 s', '2 s', '4 s', '10 s'],
      correctAnswer: '2 s',
      explanation: 'Using h = ½gt²: 20 = ½(10)t², so t² = 4, therefore t = 2 s',
      difficulty: 'hard',
      topic: 'Projectile Motion',
      points: 20
    }
  ]
};

// General Relativity Qualifying Exam
export const relativityExam: ExamSession = {
  id: 'relativity-qualifying',
  courseId: 'relativity',
  title: 'General Relativity Qualifying Exam',
  description: 'Advanced Classical Mechanics knowledge required to unlock General Relativity',
  timeLimit: 45,
  passingScore: 75,
  prerequisites: ['classical'],
  questions: [
    {
      id: 'gr-1',
      question: 'In special relativity, what happens to time as an object approaches the speed of light?',
      type: 'multiple-choice',
      options: ['Time speeds up', 'Time slows down', 'Time remains constant', 'Time reverses'],
      correctAnswer: 'Time slows down',
      explanation: 'Time dilation occurs as velocity approaches c, described by the Lorentz factor γ = 1/√(1-v²/c²)',
      difficulty: 'medium',
      topic: 'Special Relativity',
      points: 15
    },
    {
      id: 'gr-2',
      question: 'What is the rest energy of a 2 kg object? (c = 3×10⁸ m/s)',
      type: 'multiple-choice',
      options: ['6×10⁸ J', '1.8×10¹⁷ J', '9×10¹⁶ J', '6×10¹⁶ J'],
      correctAnswer: '1.8×10¹⁷ J',
      explanation: 'Using E = mc²: E = 2 kg × (3×10⁸ m/s)² = 2 × 9×10¹⁶ = 1.8×10¹⁷ J',
      difficulty: 'medium',
      topic: 'Mass-Energy Equivalence',
      points: 20
    },
    {
      id: 'gr-3',
      question: 'According to Einstein, gravity is not a force but a curvature of what?',
      type: 'multiple-choice',
      options: ['Space only', 'Time only', 'Spacetime', 'Matter'],
      correctAnswer: 'Spacetime',
      explanation: 'General relativity describes gravity as the curvature of spacetime caused by mass and energy',
      difficulty: 'hard',
      topic: 'General Relativity Concepts',
      points: 25
    }
  ]
};

// Quantum Mechanics Qualifying Exam
export const quantumExam: ExamSession = {
  id: 'quantum-qualifying',
  courseId: 'quantum',
  title: 'Quantum Mechanics Qualifying Exam',
  description: 'Master both Classical and Relativistic Physics to unlock Quantum Mechanics',
  timeLimit: 60,
  passingScore: 80,
  prerequisites: ['classical', 'relativity'],
  questions: [
    {
      id: 'qm-1',
      question: 'What is the energy of a photon with frequency 5×10¹⁴ Hz? (h = 6.626×10⁻³⁴ J⋅s)',
      type: 'multiple-choice',
      options: ['3.31×10⁻¹⁹ J', '1.33×10⁻⁴⁸ J', '3.31×10⁻²⁰ J', '1.33×10⁻¹⁹ J'],
      correctAnswer: '3.31×10⁻¹⁹ J',
      explanation: 'Using Planck\'s equation: E = hf = 6.626×10⁻³⁴ × 5×10¹⁴ = 3.31×10⁻¹⁹ J',
      difficulty: 'medium',
      topic: 'Quantum Energy',
      points: 20
    },
    {
      id: 'qm-2',
      question: 'According to Heisenberg\'s uncertainty principle, what cannot be precisely known simultaneously?',
      type: 'multiple-choice',
      options: ['Energy and time', 'Position and momentum', 'Speed and direction', 'Mass and velocity'],
      correctAnswer: 'Position and momentum',
      explanation: 'The uncertainty principle states Δx⋅Δp ≥ ℏ/2, meaning position and momentum cannot both be precisely known',
      difficulty: 'hard',
      topic: 'Uncertainty Principle',
      points: 30
    }
  ]
};

// Mathematics Placement Exams
export const algebraExam: ExamSession = {
  id: 'algebra-placement',
  courseId: 'algebra',
  title: 'Algebra Fundamentals Exam',
  description: 'Test your basic algebra skills to unlock advanced mathematics',
  timeLimit: 25,
  passingScore: 65,
  prerequisites: [],
  questions: [
    {
      id: 'alg-1',
      question: 'Solve for x: 3x + 7 = 22',
      type: 'numerical',
      correctAnswer: 5,
      explanation: '3x = 22 - 7 = 15, so x = 15/3 = 5',
      difficulty: 'easy',
      topic: 'Linear Equations',
      points: 10
    },
    {
      id: 'alg-2',
      question: 'What is the slope of the line passing through points (2, 3) and (6, 11)?',
      type: 'numerical',
      correctAnswer: 2,
      explanation: 'Slope = (y₂ - y₁)/(x₂ - x₁) = (11 - 3)/(6 - 2) = 8/4 = 2',
      difficulty: 'medium',
      topic: 'Linear Functions',
      points: 15
    },
    {
      id: 'alg-3',
      question: 'Factor completely: x² - 9',
      type: 'multiple-choice',
      options: ['(x - 3)(x - 3)', '(x + 3)(x + 3)', '(x - 3)(x + 3)', 'Cannot be factored'],
      correctAnswer: '(x - 3)(x + 3)',
      explanation: 'This is a difference of squares: x² - 9 = x² - 3² = (x - 3)(x + 3)',
      difficulty: 'medium',
      topic: 'Factoring',
      points: 15
    }
  ]
};

export const calculusExam: ExamSession = {
  id: 'calculus-qualifying',
  courseId: 'calculus',
  title: 'Calculus Readiness Exam',
  description: 'Demonstrate algebra mastery to unlock calculus',
  timeLimit: 40,
  passingScore: 70,
  prerequisites: ['algebra'],
  questions: [
    {
      id: 'calc-1',
      question: 'What is the derivative of f(x) = x³?',
      type: 'multiple-choice',
      options: ['3x²', 'x²/3', '3x', 'x⁴/4'],
      correctAnswer: '3x²',
      explanation: 'Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹, so d/dx(x³) = 3x²',
      difficulty: 'medium',
      topic: 'Derivatives',
      points: 15
    },
    {
      id: 'calc-2',
      question: 'Find the limit: lim(x→2) (x² - 4)/(x - 2)',
      type: 'numerical',
      correctAnswer: 4,
      explanation: 'Factor: (x² - 4)/(x - 2) = (x - 2)(x + 2)/(x - 2) = x + 2. As x→2: 2 + 2 = 4',
      difficulty: 'hard',
      topic: 'Limits',
      points: 25
    }
  ]
};

export const linearAlgebraExam: ExamSession = {
  id: 'linear-algebra-qualifying',
  courseId: 'linear-algebra',
  title: 'Linear Algebra Placement Exam',
  description: 'Advanced mathematics prerequisite for quantum mechanics',
  timeLimit: 35,
  passingScore: 75,
  prerequisites: ['algebra', 'calculus'],
  questions: [
    {
      id: 'la-1',
      question: 'What is the determinant of the 2×2 matrix [[3, 1], [2, 4]]?',
      type: 'numerical',
      correctAnswer: 10,
      explanation: 'For matrix [[a, b], [c, d]], determinant = ad - bc = 3×4 - 1×2 = 12 - 2 = 10',
      difficulty: 'medium',
      topic: 'Determinants',
      points: 20
    },
    {
      id: 'la-2',
      question: 'Two vectors are orthogonal if their dot product equals what?',
      type: 'numerical',
      correctAnswer: 0,
      explanation: 'Orthogonal vectors have a dot product of zero: a⃗ · b⃗ = 0',
      difficulty: 'easy',
      topic: 'Vector Operations',
      points: 15
    }
  ]
};

export const allExams = [
  classicalMechanicsExam,
  relativityExam,
  quantumExam,
  algebraExam,
  calculusExam,
  linearAlgebraExam
];

export const getExamForCourse = (courseId: string): ExamSession | undefined => {
  return allExams.find(exam => exam.courseId === courseId);
};