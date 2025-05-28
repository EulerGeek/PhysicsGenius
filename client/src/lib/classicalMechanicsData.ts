// Classical Mechanics Course with Candy Crush Style Levels
export interface Level {
  id: string;
  number: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  stars: number;
  isLocked: boolean;
  isCompleted: boolean;
  xpReward: number;
  questions: Question[];
  concept: string;
  formula?: string;
  tips: string[];
}

export interface Question {
  id: string;
  type: 'multiple_choice' | 'drag_drop' | 'fill_blank' | 'true_false' | 'calculation';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  hint?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  levels: Level[];
  isUnlocked: boolean;
  overallProgress: number;
}

export const classicalMechanicsLessons: Lesson[] = [
  {
    id: 'motion-intro',
    title: 'Introduction to Motion',
    description: 'Learn the fundamentals of how objects move',
    icon: '🏃‍♂️',
    color: 'gradient-green',
    isUnlocked: true,
    overallProgress: 0,
    levels: [
      {
        id: 'motion-intro-1',
        number: 1,
        title: 'What is Motion?',
        description: 'Understanding basic concepts of movement',
        difficulty: 'easy',
        stars: 0,
        isLocked: false,
        isCompleted: false,
        xpReward: 50,
        concept: 'Motion is the change in position of an object over time relative to a reference frame.',
        formula: 'Position = Distance from reference point',
        tips: [
          'Motion is always relative to something else',
          'We need a reference frame to describe motion',
          'Position tells us where an object is located'
        ],
        questions: [
          {
            id: 'q1',
            type: 'multiple_choice',
            question: 'What do we need to describe motion?',
            options: ['A reference frame', 'Only the object', 'Just time', 'Only distance'],
            correctAnswer: 'A reference frame',
            explanation: 'Motion is always described relative to a reference frame or point of view.',
            difficulty: 'easy',
            points: 10
          },
          {
            id: 'q2',
            type: 'true_false',
            question: 'Motion is absolute and does not depend on the observer.',
            options: ['True', 'False'],
            correctAnswer: 'False',
            explanation: 'Motion is relative! It depends on the reference frame of the observer.',
            difficulty: 'easy',
            points: 10
          }
        ]
      },
      {
        id: 'motion-intro-2',
        number: 2,
        title: 'Distance vs Displacement',
        description: 'Learn the difference between distance and displacement',
        difficulty: 'easy',
        stars: 0,
        isLocked: true,
        isCompleted: false,
        xpReward: 75,
        concept: 'Distance is the total path traveled, while displacement is the straight-line distance from start to finish.',
        formula: 'Displacement = Final Position - Initial Position',
        tips: [
          'Distance is always positive',
          'Displacement can be positive, negative, or zero',
          'Displacement has both magnitude and direction'
        ],
        questions: [
          {
            id: 'q3',
            type: 'multiple_choice',
            question: 'A person walks 3m east, then 4m west. What is their displacement?',
            options: ['7m', '1m west', '1m east', '0m'],
            correctAnswer: '1m west',
            explanation: 'Displacement = 3m east - 4m west = 1m west (net movement).',
            difficulty: 'medium',
            points: 15
          },
          {
            id: 'q4',
            type: 'calculation',
            question: 'A car travels 100m north, then 60m south. What is the total distance traveled?',
            correctAnswer: '160',
            explanation: 'Distance is the total path: 100m + 60m = 160m.',
            difficulty: 'easy',
            points: 10
          }
        ]
      },
      {
        id: 'motion-intro-3',
        number: 3,
        title: 'Speed and Velocity',
        description: 'Understanding the concepts of speed and velocity',
        difficulty: 'medium',
        stars: 0,
        isLocked: true,
        isCompleted: false,
        xpReward: 100,
        concept: 'Speed is distance per unit time, while velocity includes direction.',
        formula: 'Speed = Distance/Time, Velocity = Displacement/Time',
        tips: [
          'Speed is always positive',
          'Velocity can be positive or negative',
          'Average speed ≠ average velocity usually'
        ],
        questions: [
          {
            id: 'q5',
            type: 'calculation',
            question: 'A car travels 120 km in 2 hours. What is its average speed?',
            correctAnswer: '60',
            explanation: 'Average speed = Total distance / Total time = 120 km / 2 h = 60 km/h.',
            difficulty: 'easy',
            points: 15
          },
          {
            id: 'q6',
            type: 'multiple_choice',
            question: 'What is the difference between speed and velocity?',
            options: ['No difference', 'Velocity includes direction', 'Speed is faster', 'Velocity is always larger'],
            correctAnswer: 'Velocity includes direction',
            explanation: 'Velocity is a vector quantity that includes both magnitude (speed) and direction.',
            difficulty: 'medium',
            points: 20
          }
        ]
      }
    ]
  },
  {
    id: 'kinematics',
    title: 'Kinematics',
    description: 'Study motion with mathematical equations',
    icon: '📐',
    color: 'gradient-blue',
    isUnlocked: false,
    overallProgress: 0,
    levels: [
      {
        id: 'kinematics-1',
        number: 4,
        title: 'Acceleration',
        description: 'Understanding how velocity changes',
        difficulty: 'medium',
        stars: 0,
        isLocked: false,
        isCompleted: false,
        xpReward: 125,
        concept: 'Acceleration is the rate of change of velocity over time.',
        formula: 'a = (v₂ - v₁) / t = Δv / Δt',
        tips: [
          'Acceleration can be positive (speeding up) or negative (slowing down)',
          'Constant acceleration means the velocity changes by the same amount each second',
          'Units are m/s²'
        ],
        questions: [
          {
            id: 'q7',
            type: 'calculation',
            question: 'A car accelerates from 20 m/s to 35 m/s in 5 seconds. What is its acceleration?',
            correctAnswer: '3',
            explanation: 'a = (35 - 20) / 5 = 15 / 5 = 3 m/s²',
            difficulty: 'medium',
            points: 20
          },
          {
            id: 'q8',
            type: 'multiple_choice',
            question: 'What does negative acceleration mean?',
            options: ['Moving backward', 'Slowing down', 'Constant speed', 'Moving faster'],
            correctAnswer: 'Slowing down',
            explanation: 'Negative acceleration (deceleration) means the object is slowing down.',
            difficulty: 'easy',
            points: 15
          }
        ]
      },
      {
        id: 'kinematics-2',
        number: 5,
        title: 'Kinematic Equations',
        description: 'Master the fundamental equations of motion',
        difficulty: 'hard',
        stars: 0,
        isLocked: true,
        isCompleted: false,
        xpReward: 150,
        concept: 'The kinematic equations describe motion with constant acceleration.',
        formula: 'v = v₀ + at, s = v₀t + ½at², v² = v₀² + 2as',
        tips: [
          'Choose the equation that has the unknown you want to find',
          'Make sure all units are consistent',
          'Draw a diagram to understand the problem'
        ],
        questions: [
          {
            id: 'q9',
            type: 'calculation',
            question: 'A ball is dropped from rest and falls for 3 seconds. How far does it fall? (g = 10 m/s²)',
            correctAnswer: '45',
            explanation: 's = v₀t + ½at² = 0 + ½(10)(3)² = 45 m',
            difficulty: 'hard',
            points: 25
          },
          {
            id: 'q10',
            type: 'multiple_choice',
            question: 'Which kinematic equation would you use to find final velocity if you know initial velocity, acceleration, and distance?',
            options: ['v = v₀ + at', 's = v₀t + ½at²', 'v² = v₀² + 2as', 's = ½(v₀ + v)t'],
            correctAnswer: 'v² = v₀² + 2as',
            explanation: 'This equation relates final velocity (v) to initial velocity (v₀), acceleration (a), and distance (s).',
            difficulty: 'medium',
            points: 20
          }
        ]
      },
      {
        id: 'kinematics-3',
        number: 6,
        title: 'Free Fall Motion',
        description: 'Objects falling under gravity',
        difficulty: 'hard',
        stars: 0,
        isLocked: true,
        isCompleted: false,
        xpReward: 175,
        concept: 'Free fall is motion under the influence of gravity alone, with acceleration g = 9.8 m/s².',
        formula: 'Same kinematic equations with a = g = 9.8 m/s²',
        tips: [
          'All objects fall at the same rate in a vacuum',
          'Take upward as positive, downward as negative (or vice versa)',
          'At maximum height, velocity = 0'
        ],
        questions: [
          {
            id: 'q11',
            type: 'calculation',
            question: 'A ball is thrown upward with initial velocity 20 m/s. How high does it go? (g = 10 m/s²)',
            correctAnswer: '20',
            explanation: 'At max height, v = 0. Using v² = v₀² + 2as: 0 = 20² - 2(10)s, s = 400/20 = 20 m',
            difficulty: 'hard',
            points: 30
          },
          {
            id: 'q12',
            type: 'true_false',
            question: 'A heavier object falls faster than a lighter object in a vacuum.',
            options: ['True', 'False'],
            correctAnswer: 'False',
            explanation: 'In a vacuum, all objects fall at the same rate regardless of their mass.',
            difficulty: 'medium',
            points: 15
          }
        ]
      }
    ]
  },
  {
    id: 'forces',
    title: 'Forces and Newton\'s Laws',
    description: 'Understand what causes motion to change',
    icon: '⚡',
    color: 'gradient-orange',
    isUnlocked: false,
    overallProgress: 0,
    levels: [
      {
        id: 'forces-1',
        number: 7,
        title: 'What is a Force?',
        description: 'Introduction to forces and their effects',
        difficulty: 'easy',
        stars: 0,
        isLocked: false,
        isCompleted: false,
        xpReward: 100,
        concept: 'A force is a push or pull that can change an object\'s motion or shape.',
        formula: 'Force is measured in Newtons (N)',
        tips: [
          'Forces are vectors - they have magnitude and direction',
          'Forces can cause acceleration, deformation, or both',
          'Contact forces require touching, field forces act at a distance'
        ],
        questions: [
          {
            id: 'q13',
            type: 'multiple_choice',
            question: 'Which of these is NOT a force?',
            options: ['Gravity', 'Friction', 'Speed', 'Tension'],
            correctAnswer: 'Speed',
            explanation: 'Speed is a measure of motion, not a force. Forces cause changes in motion.',
            difficulty: 'easy',
            points: 10
          },
          {
            id: 'q14',
            type: 'drag_drop',
            question: 'Match the force with its type:',
            options: ['Contact Force: Friction', 'Field Force: Gravity', 'Contact Force: Normal', 'Field Force: Magnetic'],
            correctAnswer: ['Contact Force: Friction', 'Field Force: Gravity', 'Contact Force: Normal', 'Field Force: Magnetic'],
            explanation: 'Contact forces require physical contact, while field forces act through space.',
            difficulty: 'medium',
            points: 20
          }
        ]
      },
      {
        id: 'forces-2',
        number: 8,
        title: 'Newton\'s First Law',
        description: 'Objects at rest stay at rest, objects in motion stay in motion',
        difficulty: 'medium',
        stars: 0,
        isLocked: true,
        isCompleted: false,
        xpReward: 125,
        concept: 'An object will remain at rest or in uniform motion unless acted upon by an unbalanced force.',
        formula: 'ΣF = 0 ⟹ a = 0 (no acceleration)',
        tips: [
          'Also called the Law of Inertia',
          'Inertia is the tendency to resist changes in motion',
          'More massive objects have more inertia'
        ],
        questions: [
          {
            id: 'q15',
            type: 'multiple_choice',
            question: 'A book sits on a table. Why doesn\'t it fall?',
            options: ['Gravity is turned off', 'Normal force balances gravity', 'The book has no mass', 'Friction holds it up'],
            correctAnswer: 'Normal force balances gravity',
            explanation: 'The normal force from the table exactly balances the gravitational force, so net force is zero.',
            difficulty: 'medium',
            points: 15
          },
          {
            id: 'q16',
            type: 'true_false',
            question: 'A moving object will eventually stop on its own.',
            options: ['True', 'False'],
            correctAnswer: 'False',
            explanation: 'A moving object only stops due to external forces like friction. In space, objects continue moving.',
            difficulty: 'medium',
            points: 15
          }
        ]
      },
      {
        id: 'forces-3',
        number: 9,
        title: 'Newton\'s Second Law',
        description: 'Force equals mass times acceleration',
        difficulty: 'hard',
        stars: 0,
        isLocked: true,
        isCompleted: false,
        xpReward: 150,
        concept: 'The acceleration of an object is directly proportional to the net force and inversely proportional to its mass.',
        formula: 'F = ma or a = F/m',
        tips: [
          'More force = more acceleration',
          'More mass = less acceleration for same force',
          'Direction of acceleration matches direction of net force'
        ],
        questions: [
          {
            id: 'q17',
            type: 'calculation',
            question: 'A 10 kg object experiences a net force of 50 N. What is its acceleration?',
            correctAnswer: '5',
            explanation: 'a = F/m = 50 N / 10 kg = 5 m/s²',
            difficulty: 'medium',
            points: 20
          },
          {
            id: 'q18',
            type: 'multiple_choice',
            question: 'If you double the force on an object, what happens to its acceleration?',
            options: ['Stays the same', 'Doubles', 'Halves', 'Quadruples'],
            correctAnswer: 'Doubles',
            explanation: 'From F = ma, if F doubles and m stays constant, then a must double.',
            difficulty: 'medium',
            points: 15
          }
        ]
      },
      {
        id: 'forces-4',
        number: 10,
        title: 'Newton\'s Third Law',
        description: 'For every action, there is an equal and opposite reaction',
        difficulty: 'medium',
        stars: 0,
        isLocked: true,
        isCompleted: false,
        xpReward: 125,
        concept: 'When object A exerts a force on object B, object B exerts an equal and opposite force on object A.',
        formula: 'F₁₂ = -F₂₁ (forces are equal in magnitude, opposite in direction)',
        tips: [
          'Action-reaction pairs act on different objects',
          'The forces are always equal in magnitude',
          'They act simultaneously, not one after the other'
        ],
        questions: [
          {
            id: 'q19',
            type: 'multiple_choice',
            question: 'When you walk, what pushes you forward?',
            options: ['Your muscles', 'The ground', 'Air resistance', 'Gravity'],
            correctAnswer: 'The ground',
            explanation: 'You push backward on the ground, and by Newton\'s third law, the ground pushes forward on you.',
            difficulty: 'medium',
            points: 20
          },
          {
            id: 'q20',
            type: 'true_false',
            question: 'Action-reaction pairs cancel each other out.',
            options: ['True', 'False'],
            correctAnswer: 'False',
            explanation: 'Action-reaction pairs act on different objects, so they don\'t cancel each other out.',
            difficulty: 'hard',
            points: 25
          }
        ]
      }
    ]
  },
  {
    id: 'energy',
    title: 'Energy and Work',
    description: 'Learn about different forms of energy',
    icon: '⚡',
    color: 'gradient-green',
    isUnlocked: false,
    overallProgress: 0,
    levels: [
      {
        id: 'energy-1',
        number: 11,
        title: 'What is Energy?',
        description: 'Understanding the concept of energy',
        difficulty: 'easy',
        stars: 0,
        isLocked: false,
        isCompleted: false,
        xpReward: 100,
        concept: 'Energy is the ability to do work or cause change.',
        formula: 'Energy is measured in Joules (J)',
        tips: [
          'Energy exists in many forms',
          'Energy can be transferred and transformed',
          'Energy is conserved in isolated systems'
        ],
        questions: [
          {
            id: 'q21',
            type: 'multiple_choice',
            question: 'What is energy?',
            options: ['The ability to do work', 'A type of force', 'The same as power', 'Only found in batteries'],
            correctAnswer: 'The ability to do work',
            explanation: 'Energy is defined as the capacity or ability to do work or cause change.',
            difficulty: 'easy',
            points: 10
          },
          {
            id: 'q22',
            type: 'drag_drop',
            question: 'Match the energy type with its example:',
            options: ['Kinetic: Moving car', 'Potential: Water behind dam', 'Chemical: Food', 'Thermal: Hot coffee'],
            correctAnswer: ['Kinetic: Moving car', 'Potential: Water behind dam', 'Chemical: Food', 'Thermal: Hot coffee'],
            explanation: 'Different forms of energy are found in different situations.',
            difficulty: 'medium',
            points: 20
          }
        ]
      },
      {
        id: 'energy-2',
        number: 12,
        title: 'Kinetic Energy',
        description: 'Energy of motion',
        difficulty: 'medium',
        stars: 0,
        isLocked: true,
        isCompleted: false,
        xpReward: 125,
        concept: 'Kinetic energy is the energy an object has due to its motion.',
        formula: 'KE = ½mv²',
        tips: [
          'Kinetic energy depends on mass and velocity',
          'Doubling velocity quadruples kinetic energy',
          'Only moving objects have kinetic energy'
        ],
        questions: [
          {
            id: 'q23',
            type: 'calculation',
            question: 'A 2 kg ball moves at 10 m/s. What is its kinetic energy?',
            correctAnswer: '100',
            explanation: 'KE = ½mv² = ½(2)(10)² = ½(2)(100) = 100 J',
            difficulty: 'medium',
            points: 20
          },
          {
            id: 'q24',
            type: 'multiple_choice',
            question: 'If you double the speed of an object, its kinetic energy:',
            options: ['Doubles', 'Triples', 'Quadruples', 'Stays the same'],
            correctAnswer: 'Quadruples',
            explanation: 'KE = ½mv². If v doubles, v² becomes 4 times larger, so KE quadruples.',
            difficulty: 'hard',
            points: 25
          }
        ]
      },
      {
        id: 'energy-3',
        number: 13,
        title: 'Potential Energy',
        description: 'Stored energy due to position',
        difficulty: 'medium',
        stars: 0,
        isLocked: true,
        isCompleted: false,
        xpReward: 125,
        concept: 'Potential energy is stored energy due to an object\'s position or condition.',
        formula: 'PE = mgh (gravitational), PE = ½kx² (elastic)',
        tips: [
          'Gravitational PE depends on height',
          'Elastic PE depends on compression/extension',
          'PE can be converted to KE and vice versa'
        ],
        questions: [
          {
            id: 'q25',
            type: 'calculation',
            question: 'A 5 kg book is 2 m above the ground. What is its gravitational potential energy? (g = 10 m/s²)',
            correctAnswer: '100',
            explanation: 'PE = mgh = (5)(10)(2) = 100 J',
            difficulty: 'medium',
            points: 20
          },
          {
            id: 'q26',
            type: 'multiple_choice',
            question: 'When does a pendulum have maximum potential energy?',
            options: ['At the bottom', 'At the highest points', 'Halfway down', 'When moving fastest'],
            correctAnswer: 'At the highest points',
            explanation: 'Potential energy is maximum when height is maximum, which occurs at the extreme positions.',
            difficulty: 'medium',
            points: 15
          }
        ]
      },
      {
        id: 'energy-4',
        number: 14,
        title: 'Conservation of Energy',
        description: 'Energy cannot be created or destroyed',
        difficulty: 'hard',
        stars: 0,
        isLocked: true,
        isCompleted: false,
        xpReward: 175,
        concept: 'The total energy in an isolated system remains constant.',
        formula: 'E_total = KE + PE = constant',
        tips: [
          'Energy transforms from one type to another',
          'Total mechanical energy is conserved (no friction)',
          'Some energy may be "lost" to heat/sound (non-conservative forces)'
        ],
        questions: [
          {
            id: 'q27',
            type: 'calculation',
            question: 'A 1 kg ball is dropped from 5 m height. What is its speed just before hitting the ground? (g = 10 m/s²)',
            correctAnswer: '10',
            explanation: 'PE converts to KE: mgh = ½mv², so gh = ½v², v = √(2gh) = √(2×10×5) = 10 m/s',
            difficulty: 'hard',
            points: 30
          },
          {
            id: 'q28',
            type: 'multiple_choice',
            question: 'In a roller coaster (ignoring friction), when is kinetic energy maximum?',
            options: ['At the top of hills', 'At the bottom of hills', 'Halfway up hills', 'Same everywhere'],
            correctAnswer: 'At the bottom of hills',
            explanation: 'KE is maximum when PE is minimum, which occurs at the lowest points.',
            difficulty: 'medium',
            points: 20
          }
        ]
      }
    ]
  },
  {
    id: 'momentum',
    title: 'Momentum and Collisions',
    description: 'Objects in motion have momentum',
    icon: '🎱',
    color: 'gradient-blue',
    isUnlocked: false,
    overallProgress: 0,
    levels: [
      {
        id: 'momentum-1',
        number: 15,
        title: 'What is Momentum?',
        description: 'Understanding momentum and its properties',
        difficulty: 'medium',
        stars: 0,
        isLocked: false,
        isCompleted: false,
        xpReward: 125,
        concept: 'Momentum is the product of an object\'s mass and velocity.',
        formula: 'p = mv',
        tips: [
          'Momentum is a vector quantity',
          'More massive or faster objects have more momentum',
          'Momentum is conserved in collisions'
        ],
        questions: [
          {
            id: 'q29',
            type: 'calculation',
            question: 'A 1000 kg car travels at 20 m/s. What is its momentum?',
            correctAnswer: '20000',
            explanation: 'p = mv = (1000 kg)(20 m/s) = 20,000 kg⋅m/s',
            difficulty: 'easy',
            points: 15
          },
          {
            id: 'q30',
            type: 'multiple_choice',
            question: 'Which has more momentum: a 2 kg object at 10 m/s or a 5 kg object at 3 m/s?',
            options: ['2 kg object', '5 kg object', 'Same momentum', 'Cannot determine'],
            correctAnswer: '2 kg object',
            explanation: 'p₁ = 2×10 = 20 kg⋅m/s, p₂ = 5×3 = 15 kg⋅m/s. The 2 kg object has more momentum.',
            difficulty: 'medium',
            points: 20
          }
        ]
      }
    ]
  }
];

export default classicalMechanicsLessons;