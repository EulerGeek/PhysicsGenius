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

// Classical Mechanics Exam
export const classicalMechanicsExam: ExamSession = {
  id: 'classical-exam',
  courseId: 'classical',
  title: 'Classical Mechanics Fundamentals',
  description: 'Master motion, forces, and energy concepts',
  timeLimit: 30,
  passingScore: 70,
  prerequisites: [],
  questions: [
    {
      id: 'cm-concept',
      question: 'CONCEPT: Classical Mechanics - Study of motion and forces acting on objects, from Newton\'s laws to energy conservation.',
      type: 'multiple-choice',
      options: ['Continue to Questions'],
      correctAnswer: 'Continue to Questions',
      explanation: 'Classical mechanics forms the foundation of physics, describing how objects move under the influence of forces. Key concepts include Newton\'s three laws, kinematics equations, energy conservation, and momentum.',
      difficulty: 'easy',
      topic: 'Introduction',
      points: 0
    },
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
    },
    {
      id: 'cm-6',
      question: 'What is the formula for kinetic energy?',
      type: 'multiple-choice',
      options: ['KE = mv', 'KE = ½mv²', 'KE = mgh', 'KE = Fd'],
      correctAnswer: 'KE = ½mv²',
      explanation: 'Kinetic energy is the energy of motion, given by KE = ½mv², where m is mass and v is velocity.',
      difficulty: 'medium',
      topic: 'Energy',
      points: 15
    },
    {
      id: 'cm-7',
      question: 'If a 2 kg object moves at 4 m/s, what is its kinetic energy?',
      type: 'multiple-choice',
      options: ['8 J', '16 J', '32 J', '4 J'],
      correctAnswer: '16 J',
      explanation: 'KE = ½mv² = ½(2)(4²) = ½(2)(16) = 16 J',
      difficulty: 'medium',
      topic: 'Energy',
      points: 15
    },
    {
      id: 'cm-8',
      question: 'What does Newton\'s third law state?',
      type: 'multiple-choice',
      options: ['F = ma', 'Objects at rest stay at rest', 'For every action, there is an equal and opposite reaction', 'Energy is conserved'],
      correctAnswer: 'For every action, there is an equal and opposite reaction',
      explanation: 'Newton\'s third law states that forces always come in pairs - when object A exerts a force on object B, object B exerts an equal and opposite force on object A.',
      difficulty: 'easy',
      topic: 'Newton\'s Laws',
      points: 10
    },
    {
      id: 'cm-9',
      question: 'A car travels 100 m in 5 seconds. What is its average speed?',
      type: 'multiple-choice',
      options: ['15 m/s', '20 m/s', '25 m/s', '500 m/s'],
      correctAnswer: '20 m/s',
      explanation: 'Average speed = distance/time = 100 m / 5 s = 20 m/s',
      difficulty: 'easy',
      topic: 'Kinematics',
      points: 10
    },
    {
      id: 'cm-10',
      question: 'What happens to gravitational potential energy as an object falls?',
      type: 'multiple-choice',
      options: ['It increases', 'It decreases', 'It stays constant', 'It becomes negative'],
      correctAnswer: 'It decreases',
      explanation: 'As an object falls, its height decreases, so its gravitational potential energy (PE = mgh) decreases and converts to kinetic energy.',
      difficulty: 'medium',
      topic: 'Energy',
      points: 15
    },
    {
      id: 'cm-11',
      question: 'In an isolated system, momentum is always conserved.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Yes! Conservation of momentum is a fundamental law - in any isolated system (no external forces), the total momentum remains constant.',
      difficulty: 'medium',
      topic: 'Momentum',
      points: 15
    },
    {
      id: 'cm-12',
      question: 'If two objects collide and stick together, what type of collision is this?',
      type: 'multiple-choice',
      options: ['Elastic collision', 'Inelastic collision', 'Perfectly inelastic collision', 'Explosive collision'],
      correctAnswer: 'Perfectly inelastic collision',
      explanation: 'When objects stick together after collision, it\'s perfectly inelastic. Momentum is conserved but kinetic energy is not.',
      difficulty: 'hard',
      topic: 'Collisions',
      points: 20
    }
  ]
};

// General Relativity Exam
export const relativityExam: ExamSession = {
  id: 'relativity-exam',
  courseId: 'relativity',
  title: 'General Relativity Fundamentals',
  description: 'Advanced concepts of spacetime and gravity',
  timeLimit: 45,
  passingScore: 75,
  prerequisites: ['classical'],
  questions: [
    {
      id: 'gr-concept',
      question: 'CONCEPT: General Relativity - Einstein\'s theory describing gravity as the curvature of spacetime.',
      type: 'multiple-choice',
      options: ['Continue to Questions'],
      correctAnswer: 'Continue to Questions',
      explanation: 'General relativity revolutionized our understanding of gravity, space, and time. Key concepts include spacetime curvature, time dilation, length contraction, and the equivalence principle.',
      difficulty: 'easy',
      topic: 'Introduction',
      points: 0
    },
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
      question: 'What is the speed of light in a vacuum?',
      type: 'multiple-choice',
      options: ['3.0 × 10⁸ m/s', '3.0 × 10⁶ m/s', '2.99 × 10⁸ m/s', '299,792,458 m/s'],
      correctAnswer: '299,792,458 m/s',
      explanation: 'The speed of light in vacuum is exactly 299,792,458 m/s, a fundamental constant of nature.',
      difficulty: 'medium',
      topic: 'Constants',
      points: 10
    },
    {
      id: 'gr-3',
      question: 'According to Einstein\'s equivalence principle, gravitational mass equals inertial mass.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The equivalence principle states that gravitational and inertial mass are equivalent, leading to the geometric interpretation of gravity.',
      difficulty: 'hard',
      topic: 'Equivalence Principle',
      points: 20
    },
    {
      id: 'gr-4',
      question: 'What causes gravitational time dilation?',
      type: 'multiple-choice',
      options: ['High velocity', 'Strong gravitational fields', 'Low temperature', 'High pressure'],
      correctAnswer: 'Strong gravitational fields',
      explanation: 'Gravitational time dilation occurs in strong gravitational fields, where time runs slower compared to weaker fields.',
      difficulty: 'hard',
      topic: 'Time Dilation',
      points: 20
    }
  ]
};

// Quantum Mechanics Exam
export const quantumExam: ExamSession = {
  id: 'quantum-exam',
  courseId: 'quantum',
  title: 'Quantum Mechanics Fundamentals',
  description: 'Explore the quantum world of particles and waves',
  timeLimit: 40,
  passingScore: 75,
  prerequisites: ['relativity'],
  questions: [
    {
      id: 'qm-concept',
      question: 'CONCEPT: Quantum Mechanics - The physics of atoms and subatomic particles, where classical physics breaks down.',
      type: 'multiple-choice',
      options: ['Continue to Questions'],
      correctAnswer: 'Continue to Questions',
      explanation: 'Quantum mechanics describes the behavior of matter and energy at atomic scales. Key principles include wave-particle duality, uncertainty principle, and quantum superposition.',
      difficulty: 'easy',
      topic: 'Introduction',
      points: 0
    },
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

// Mathematics Exams
export const algebraExam: ExamSession = {
  id: 'algebra-exam',
  courseId: 'algebra',
  title: 'Algebra Fundamentals',
  description: 'Master basic algebraic concepts and equations',
  timeLimit: 25,
  passingScore: 65,
  prerequisites: [],
  questions: [
    {
      id: 'alg-concept',
      question: 'CONCEPT: Algebra - The branch of mathematics dealing with symbols and rules for manipulating those symbols.',
      type: 'multiple-choice',
      options: ['Continue to Questions'],
      correctAnswer: 'Continue to Questions',
      explanation: 'Algebra uses letters and symbols to represent numbers and quantities in formulas and equations. Key concepts include linear equations, quadratic functions, and systems of equations.',
      difficulty: 'easy',
      topic: 'Introduction',
      points: 0
    },
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
      options: ['(x + 3)(x - 3)', '(x - 3)²', '(x + 3)²', 'x(x - 9)'],
      correctAnswer: '(x + 3)(x - 3)',
      explanation: 'This is a difference of squares: a² - b² = (a + b)(a - b), so x² - 9 = (x + 3)(x - 3)',
      difficulty: 'medium',
      topic: 'Factoring',
      points: 15
    }
  ]
};

export const calculusExam: ExamSession = {
  id: 'calculus-exam',
  courseId: 'calculus',
  title: 'Calculus Fundamentals',
  description: 'Master derivatives and integrals',
  timeLimit: 35,
  passingScore: 70,
  prerequisites: ['algebra'],
  questions: [
    {
      id: 'calc-concept',
      question: 'CONCEPT: Calculus - The mathematical study of continuous change, including derivatives and integrals.',
      type: 'multiple-choice',
      options: ['Continue to Questions'],
      correctAnswer: 'Continue to Questions',
      explanation: 'Calculus is fundamental to understanding rates of change (derivatives) and areas under curves (integrals). Essential for physics, engineering, and many other fields.',
      difficulty: 'easy',
      topic: 'Introduction',
      points: 0
    },
    {
      id: 'calc-1',
      question: 'What is the derivative of f(x) = x²?',
      type: 'multiple-choice',
      options: ['x', '2x', 'x²', '2x²'],
      correctAnswer: '2x',
      explanation: 'Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹, so d/dx(x²) = 2x¹ = 2x',
      difficulty: 'easy',
      topic: 'Derivatives',
      points: 10
    },
    {
      id: 'calc-2',
      question: 'The derivative represents the instantaneous rate of change.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Yes! The derivative at a point gives the instantaneous rate of change of the function at that point.',
      difficulty: 'medium',
      topic: 'Derivatives',
      points: 15
    }
  ]
};

export const linearAlgebraExam: ExamSession = {
  id: 'linear-algebra-exam',
  courseId: 'linear-algebra',
  title: 'Linear Algebra Fundamentals',
  description: 'Master vectors, matrices, and linear transformations',
  timeLimit: 30,
  passingScore: 70,
  prerequisites: ['calculus'],
  questions: [
    {
      id: 'la-concept',
      question: 'CONCEPT: Linear Algebra - The study of vectors, vector spaces, and linear transformations between them.',
      type: 'multiple-choice',
      options: ['Continue to Questions'],
      correctAnswer: 'Continue to Questions',
      explanation: 'Linear algebra is essential for computer graphics, machine learning, and quantum mechanics. Key concepts include vectors, matrices, eigenvalues, and linear transformations.',
      difficulty: 'easy',
      topic: 'Introduction',
      points: 0
    },
    {
      id: 'la-1',
      question: 'What is the dot product of vectors (2, 3) and (4, 1)?',
      type: 'numerical',
      correctAnswer: 11,
      explanation: 'Dot product = (2)(4) + (3)(1) = 8 + 3 = 11',
      difficulty: 'easy',
      topic: 'Vectors',
      points: 10
    },
    {
      id: 'la-2',
      question: 'A matrix multiplied by its inverse equals the identity matrix.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Yes! For an invertible matrix A, A × A⁻¹ = I (the identity matrix)',
      difficulty: 'medium',
      topic: 'Matrices',
      points: 15
    }
  ]
};

// Exam retrieval functions
export const allExams = [
  classicalMechanicsExam,
  relativityExam,
  quantumExam,
  algebraExam,
  calculusExam,
  linearAlgebraExam
];

export function getExamForCourse(courseId: string): ExamSession | undefined {
  return allExams.find(exam => exam.courseId === courseId);
}