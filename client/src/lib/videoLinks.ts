// All YouTube video URLs for physics lessons
// You can replace any of these with your preferred videos

export const videoLinks = {
  // Classical Mechanics (15 lessons)
  "cm-1": "https://youtu.be/b1t41Q3xRM8",   // MIT 8.01 - Introduction to Motion
  "cm-2": "https://youtu.be/wWnfJ0-xXRE",   // MIT 8.01 - Forces and Newton's Laws  
  "cm-3": "https://youtu.be/w4QFJb9a8vo",   // MIT 8.01 - Work and Energy
  "cm-4": "https://youtu.be/8WRgxJKPgFY",   // MIT 8.01 - Momentum and Impulse
  "cm-5": "https://youtu.be/LTjkk4rKcyM",   // MIT 8.01 - Rotational Motion
  "cm-6": "https://youtu.be/Yz8HqbFH2wY",   // MIT 8.03 - Oscillations and Waves
  "cm-7": "https://youtu.be/fJefjG3xhW0",   // MIT 8.01 - Fluid Mechanics
  "cm-8": "https://youtu.be/rbSTTByFGhM",   // MIT 8.01 - Thermodynamics
  "cm-9": "https://youtu.be/7gf6YpdvtE0",   // MIT 8.01 - Gravitation
  "cm-10": "https://youtu.be/Cxqjyl74iu4",  // MIT 8.01 - Circular Motion
  "cm-11": "https://youtu.be/bpqLTrB3jjw",  // MIT 8.01 - Simple Harmonic Motion
  "cm-12": "https://youtu.be/6SL4bgxLmXo",  // MIT 8.01 - Damped Oscillations
  "cm-13": "https://youtu.be/KuXjwB4LzSA",  // MIT 8.01 - Driven Oscillations
  "cm-14": "https://youtu.be/DfznnKUwywQ",  // MIT 8.01 - Coupled Oscillations
  "cm-15": "https://youtu.be/WdHC-R-nHsc",  // MIT 8.01 - Review and Applications

  // General Relativity (10 lessons)
  "rel-1": "https://youtu.be/hbmf0bB38h0",  // MIT 8.962 - Special Relativity Basics
  "rel-2": "https://youtu.be/NblR01hHK6U",  // MIT 8.962 - Spacetime and Gravity
  "rel-3": "https://youtu.be/Rh0pYhMvxfQ",  // MIT 8.962 - Black Holes
  "rel-4": "https://youtu.be/foRPKAKZWx8",  // MIT 8.962 - Gravitational Waves
  "rel-5": "https://youtu.be/hLltkC_wTcY",  // MIT 8.962 - Cosmology Basics
  "rel-6": "https://youtu.be/7ImvlS8PLIo",  // MIT 8.962 - The Big Bang
  "rel-7": "https://youtu.be/BjKuMpOaah0",  // MIT 8.962 - Dark Matter and Dark Energy
  "rel-8": "https://youtu.be/HnETCBOlzJs",  // MIT 8.962 - Einstein Field Equations
  "rel-9": "https://youtu.be/UaiTg8pRO_c",  // MIT 8.962 - Solutions to Einstein Equations
  "rel-10": "https://youtu.be/LTjJBUqPtHE", // MIT 8.962 - Advanced General Relativity

  // Quantum Mechanics (12 lessons)
  "qm-1": "https://youtu.be/Iuv6hY6zsd0",   // MIT 8.04 - Wave-Particle Duality
  "qm-2": "https://youtu.be/p7bzE_R6DxU",   // MIT 8.04 - The Schrödinger Equation
  "qm-3": "https://youtu.be/RlXn2_aTrKg",   // MIT 8.04 - Quantum Operators
  "qm-4": "https://youtu.be/X-FcCCmBWEE",   // MIT 8.04 - The Hydrogen Atom
  "qm-5": "https://youtu.be/lZ3bPFNkYoY",   // MIT 8.04 - Quantum Tunneling
  "qm-6": "https://youtu.be/dEaecUuEqfc",   // MIT 8.04 - Quantum Harmonic Oscillator
  "qm-7": "https://youtu.be/2WIhPZjl-wg",   // MIT 8.04 - Angular Momentum
  "qm-8": "https://youtu.be/4_8VJCj7w4s",   // MIT 8.04 - Spin and Magnetic Moments
  "qm-9": "https://youtu.be/jvO0P5-SMxk",   // MIT 8.04 - Quantum Entanglement
  "qm-10": "https://youtu.be/zcqZHYo7ONs",  // MIT 8.04 - Many-Particle Systems
  "qm-11": "https://youtu.be/8Q_GQqUg6Ts",  // MIT 8.04 - Quantum Statistics
  "qm-12": "https://youtu.be/FTKP0Y9MVus"   // MIT 8.04 - Applications of Quantum Mechanics
};

// Helper function to get video ID for any lesson
export function getVideoId(lessonId: string): string | undefined {
  return videoLinks[lessonId as keyof typeof videoLinks];
}