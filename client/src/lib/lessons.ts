
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
  videoUrl?: string;
  notes?: string;
}

export const getCourses = (): Course[] => [
  {
    id: "classical",
    title: "Classical Mechanics",
    description: "Master the fundamentals of motion and forces",
    icon: "fas fa-rocket",
    color: "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200",
    totalLessons: 15
  },
  {
    id: "relativity",
    title: "General Relativity",
    description: "Explore spacetime and gravity",
    icon: "fas fa-infinity",
    color: "bg-purple-50 text-purple-600 dark:bg-purple-900 dark:text-purple-200",
    totalLessons: 10
  },
  {
    id: "quantum",
    title: "Quantum Mechanics",
    description: "Discover the quantum world",
    icon: "fas fa-wave-square",
    color: "bg-amber-50 text-amber-600 dark:bg-amber-900 dark:text-amber-200",
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
        order: 1,
        notes: "Motion is fundamental to physics. We'll explore how objects move through space and time, starting with basic concepts of position (where something is), velocity (how fast it's moving), and acceleration (how velocity changes)."
      },
      {
        id: "cm-2",
        courseId: "classical",
        title: "Forces and Newton's Laws",
        description: "Explore the fundamental laws that govern motion and interactions",
        duration: "20 min",
        order: 2,
        notes: "Newton's three laws form the foundation of classical mechanics: 1) Objects at rest stay at rest unless acted upon by a force, 2) F=ma (force equals mass times acceleration), 3) For every action, there's an equal and opposite reaction."
      },
      {
        id: "cm-3",
        courseId: "classical",
        title: "Work and Energy",
        description: "Understand the relationship between work, kinetic and potential energy",
        duration: "18 min",
        order: 3,
        notes: "Energy is the capacity to do work. Kinetic energy is energy of motion (½mv²), potential energy is stored energy (mgh for gravitational), and the work-energy theorem connects force and displacement."
      },
      {
        id: "cm-4",
        courseId: "classical",
        title: "Momentum and Collisions",
        description: "Conservation of momentum in elastic and inelastic collisions",
        duration: "16 min",
        order: 4,
        notes: "Momentum (p = mv) is conserved in isolated systems. In elastic collisions, kinetic energy is also conserved. In inelastic collisions, some kinetic energy is converted to other forms."
      },
      {
        id: "cm-5",
        courseId: "classical",
        title: "Rotational Motion",
        description: "Angular velocity, acceleration, and rotational dynamics",
        duration: "22 min",
        order: 5,
        notes: "Rotational motion parallels linear motion but uses angular quantities: angular velocity (ω), angular acceleration (α), and moment of inertia (I). The rotational equivalent of F=ma is τ=Iα."
      },
      {
        id: "cm-6",
        courseId: "classical",
        title: "Simple Harmonic Motion",
        description: "Oscillations, springs, and pendulums in motion",
        duration: "19 min",
        order: 6,
        notes: "SHM occurs when a restoring force is proportional to displacement (F = -kx). Examples include springs and pendulums. The motion follows sinusoidal patterns with period T = 2π√(m/k)."
      },
      {
        id: "cm-7",
        courseId: "classical",
        title: "Waves and Vibrations",
        description: "Understanding wave properties and propagation",
        duration: "21 min",
        order: 7,
        notes: "Waves transfer energy without transferring matter. Key properties: wavelength (λ), frequency (f), amplitude (A), and wave speed (v = fλ). Types include transverse and longitudinal waves."
      },
      {
        id: "cm-8",
        courseId: "classical",
        title: "Fluid Mechanics",
        description: "Pressure, buoyancy, and fluid flow",
        duration: "20 min",
        order: 8,
        notes: "Fluids exert pressure (P = F/A). Archimedes' principle explains buoyancy. Bernoulli's equation relates pressure, velocity, and height in flowing fluids."
      },
      {
        id: "cm-9",
        courseId: "classical",
        title: "Thermodynamics Basics",
        description: "Heat, temperature, and the laws of thermodynamics",
        duration: "24 min",
        order: 9,
        notes: "Temperature measures average kinetic energy. Heat is energy transfer. Four laws: 0th (thermal equilibrium), 1st (energy conservation), 2nd (entropy increases), 3rd (absolute zero)."
      },
      {
        id: "cm-10",
        courseId: "classical",
        title: "Electrostatics",
        description: "Electric charges, fields, and potential",
        duration: "18 min",
        order: 10,
        notes: "Like charges repel, unlike charges attract (Coulomb's law: F = kq₁q₂/r²). Electric field E = F/q. Electric potential V represents energy per unit charge."
      },
      {
        id: "cm-11",
        courseId: "classical",
        title: "Electric Current and Circuits",
        description: "Current, voltage, resistance, and Ohm's law",
        duration: "17 min",
        order: 11,
        notes: "Current I = Q/t (charge per time). Voltage drives current through resistance (V = IR). Power P = IV. In series: currents equal, voltages add. In parallel: voltages equal, currents add."
      },
      {
        id: "cm-12",
        courseId: "classical",
        title: "Magnetism",
        description: "Magnetic fields, forces, and electromagnetic induction",
        duration: "19 min",
        order: 12,
        notes: "Magnetic fields B exert forces on moving charges (F = qvB). Faraday's law: changing magnetic flux induces EMF (ε = -dΦ/dt). Lenz's law opposes the change."
      },
      {
        id: "cm-13",
        courseId: "classical",
        title: "Optics and Light",
        description: "Reflection, refraction, and wave nature of light",
        duration: "20 min",
        order: 13,
        notes: "Light can behave as waves or particles. Reflection: angle of incidence equals angle of reflection. Refraction: Snell's law (n₁sinθ₁ = n₂sinθ₂). Interference and diffraction show wave nature."
      },
      {
        id: "cm-14",
        courseId: "classical",
        title: "Modern Physics Introduction",
        description: "Transition from classical to modern physics",
        duration: "16 min",
        order: 14,
        notes: "Classical physics works well for everyday objects but fails at very high speeds (relativity needed) and very small scales (quantum mechanics needed). Planck's constant h connects energy and frequency."
      },
      {
        id: "cm-15",
        courseId: "classical",
        title: "Problem Solving Strategies",
        description: "Advanced techniques for solving complex physics problems",
        duration: "25 min",
        order: 15,
        notes: "Systematic approach: 1) Identify given information and what to find, 2) Choose relevant physics principles, 3) Set up equations, 4) Solve mathematically, 5) Check units and reasonableness."
      }
    ],
    relativity: [
      {
        id: "rel-1",
        courseId: "relativity",
        title: "Special Relativity Basics",
        description: "Time dilation and length contraction explained",
        duration: "25 min",
        order: 1,
        notes: "Einstein's postulates: 1) Laws of physics are the same in all inertial frames, 2) Speed of light is constant for all observers. This leads to time dilation (Δt' = γΔt) and length contraction (L' = L/γ) where γ = 1/√(1-v²/c²)."
      },
      {
        id: "rel-2",
        courseId: "relativity",
        title: "Spacetime and Light",
        description: "Understanding the speed of light and spacetime intervals",
        duration: "20 min",
        order: 2,
        notes: "Spacetime combines space and time into a 4D continuum. The spacetime interval (Δs² = c²Δt² - Δx² - Δy² - Δz²) is invariant for all observers. Light follows null geodesics (Δs² = 0)."
      },
      {
        id: "rel-3",
        courseId: "relativity",
        title: "Mass-Energy Equivalence",
        description: "E=mc² and its profound implications",
        duration: "18 min",
        order: 3,
        notes: "Einstein's famous equation E=mc² shows mass and energy are equivalent. Rest energy E₀=mc². Total energy E = γmc². This explains nuclear reactions and stellar fusion."
      },
      {
        id: "rel-4",
        courseId: "relativity",
        title: "Relativistic Momentum",
        description: "How momentum changes at high speeds",
        duration: "22 min",
        order: 4,
        notes: "Classical momentum p=mv must be modified: p = γmv. The energy-momentum relation is E² = (pc)² + (mc²)². For massless particles like photons, E = pc."
      },
      {
        id: "rel-5",
        courseId: "relativity",
        title: "General Relativity Introduction",
        description: "Gravity as curved spacetime",
        duration: "30 min",
        order: 5,
        notes: "Einstein's equivalence principle: gravity and acceleration are indistinguishable locally. Mass and energy curve spacetime, and this curvature is what we experience as gravity. 'Matter tells spacetime how to curve, and curved spacetime tells matter how to move.'"
      },
      {
        id: "rel-6",
        courseId: "relativity",
        title: "Einstein Field Equations",
        description: "The mathematical foundation of general relativity",
        duration: "28 min",
        order: 6,
        notes: "Einstein's field equations: Gμν = 8πTμν (in natural units). The Einstein tensor Gμν describes spacetime curvature, while the stress-energy tensor Tμν describes matter and energy distribution."
      },
      {
        id: "rel-7",
        courseId: "relativity",
        title: "Black Holes",
        description: "Event horizons, singularities, and extreme gravity",
        duration: "26 min",
        order: 7,
        notes: "Black holes form when matter collapses to infinite density. The Schwarzschild radius rs = 2GM/c² defines the event horizon. Inside, spacetime curvature becomes so extreme that even light cannot escape."
      },
      {
        id: "rel-8",
        courseId: "relativity",
        title: "Gravitational Waves",
        description: "Ripples in spacetime itself",
        duration: "24 min",
        order: 8,
        notes: "Accelerating masses create ripples in spacetime that propagate at light speed. LIGO detected these waves from merging black holes in 2015, confirming Einstein's 1915 prediction and opening a new window to the universe."
      },
      {
        id: "rel-9",
        courseId: "relativity",
        title: "Cosmology and the Big Bang",
        description: "General relativity and the expanding universe",
        duration: "27 min",
        order: 9,
        notes: "The Friedmann equations describe an expanding universe. The cosmic microwave background provides evidence for the Big Bang. Dark matter and dark energy dominate the universe's composition."
      },
      {
        id: "rel-10",
        courseId: "relativity",
        title: "Modern Applications",
        description: "GPS, particle accelerators, and relativity in technology",
        duration: "23 min",
        order: 10,
        notes: "GPS satellites must account for both special and general relativistic effects to maintain accuracy. Particle accelerators approach the speed of light. Relativistic effects are crucial in high-energy physics experiments."
      }
    ],
    quantum: [
      {
        id: "qm-1",
        courseId: "quantum",
        title: "Wave-Particle Duality",
        description: "Light and matter exhibit both wave and particle properties",
        duration: "18 min",
        order: 1,
        notes: "Light shows particle behavior in the photoelectric effect (E = hf) and wave behavior in interference. Matter also has wave properties: de Broglie wavelength λ = h/p. The double-slit experiment demonstrates this duality."
      },
      {
        id: "qm-2",
        courseId: "quantum",
        title: "The Uncertainty Principle",
        description: "Heisenberg's principle and its implications",
        duration: "20 min",
        order: 2,
        notes: "Heisenberg's uncertainty principle: ΔxΔp ≥ ℏ/2. You cannot simultaneously know both position and momentum with perfect precision. This isn't due to measurement limitations but is fundamental to quantum mechanics."
      },
      {
        id: "qm-3",
        courseId: "quantum",
        title: "Quantum Superposition",
        description: "Schrödinger's cat and quantum states",
        duration: "22 min",
        order: 3,
        notes: "Quantum systems can exist in superposition of multiple states simultaneously. Schrödinger's cat thought experiment illustrates the absurdity of applying quantum rules to macroscopic objects. Measurement causes wavefunction collapse."
      },
      {
        id: "qm-4",
        courseId: "quantum",
        title: "The Schrödinger Equation",
        description: "The fundamental equation of quantum mechanics",
        duration: "25 min",
        order: 4,
        notes: "The time-dependent Schrödinger equation: iℏ∂ψ/∂t = Ĥψ describes how quantum systems evolve. The wavefunction ψ contains all information about the system. |ψ|² gives probability density."
      },
      {
        id: "qm-5",
        courseId: "quantum",
        title: "Quantum Tunneling",
        description: "Particles passing through energy barriers",
        duration: "19 min",
        order: 5,
        notes: "Quantum tunneling allows particles to pass through energy barriers classically forbidden. Transmission probability depends on barrier height and width. Applications include scanning tunneling microscopy and nuclear fusion in stars."
      },
      {
        id: "qm-6",
        courseId: "quantum",
        title: "Atomic Structure",
        description: "Electron orbitals and quantum numbers",
        duration: "24 min",
        order: 6,
        notes: "Electrons occupy orbitals described by quantum numbers: n (principal), l (angular momentum), ml (magnetic), ms (spin). Pauli exclusion principle: no two electrons can have identical quantum numbers."
      },
      {
        id: "qm-7",
        courseId: "quantum",
        title: "Quantum Entanglement",
        description: "Spooky action at a distance",
        duration: "21 min",
        order: 7,
        notes: "Entangled particles remain correlated regardless of distance. Measuring one instantly affects the other. Bell's theorem shows no local hidden variables can explain quantum correlations. Einstein called it 'spooky action at a distance.'"
      },
      {
        id: "qm-8",
        courseId: "quantum",
        title: "Quantum Computing Basics",
        description: "Qubits, superposition, and quantum algorithms",
        duration: "26 min",
        order: 8,
        notes: "Quantum computers use qubits that can be in superposition of |0⟩ and |1⟩. Quantum parallelism allows processing multiple possibilities simultaneously. Shor's algorithm can factor large numbers exponentially faster than classical computers."
      },
      {
        id: "qm-9",
        courseId: "quantum",
        title: "Quantum Field Theory Introduction",
        description: "Particles as excitations of quantum fields",
        duration: "28 min",
        order: 9,
        notes: "Quantum field theory combines quantum mechanics and special relativity. Particles are excitations of underlying quantum fields. Virtual particles mediate forces. The Standard Model describes all known fundamental particles and forces."
      },
      {
        id: "qm-10",
        courseId: "quantum",
        title: "Interpretations of Quantum Mechanics",
        description: "Copenhagen, Many-worlds, and other interpretations",
        duration: "23 min",
        order: 10,
        notes: "Copenhagen interpretation: measurement causes wavefunction collapse. Many-worlds: all possibilities occur in parallel universes. Pilot wave theory: hidden variables guide particles. Each interpretation attempts to explain quantum weirdness."
      },
      {
        id: "qm-11",
        courseId: "quantum",
        title: "Quantum Cryptography",
        description: "Unbreakable encryption using quantum principles",
        duration: "20 min",
        order: 11,
        notes: "Quantum key distribution uses entangled photons for secure communication. Any eavesdropping attempt disturbs the quantum state, alerting the parties. Quantum cryptography provides information-theoretic security."
      },
      {
        id: "qm-12",
        courseId: "quantum",
        title: "Future of Quantum Technology",
        description: "Quantum sensors, simulators, and emerging applications",
        duration: "25 min",
        order: 12,
        notes: "Quantum sensors achieve unprecedented precision in measuring magnetic fields, gravity, and time. Quantum simulators model complex many-body systems. Quantum internet could connect quantum computers worldwide using entanglement."
      }
    ]
  };

  return lessons[courseId] || [];
};
