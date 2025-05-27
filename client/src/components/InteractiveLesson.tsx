
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Option {
  value: string;
  text: string;
}

interface Question {
  id: string;
  type: "multiple-choice";
  question: string;
  options: Option[];
  correctAnswer: string;
  explanation: string;
  concept: string;
}

interface InteractiveLessonProps {
  lessonId: string;
  onComplete: (score: number) => void;
  onClose: () => void;
}

const lessonQuestions: Record<string, Question[]> = {
  // Classical Mechanics - Introduction to Motion (30 questions)
  "cm-1": [
    {
      id: "motion-1",
      type: "multiple-choice",
      question: "Given the position vector r⃗(t) = (3t² + 2t)î + (t³ - 4t)ĵ, what is the velocity at t = 2s?",
      options: [
        { value: "a", text: "v⃗ = 14î + 8ĵ m/s" },
        { value: "b", text: "v⃗ = 10î + 12ĵ m/s" },
        { value: "c", text: "v⃗ = 14î + 12ĵ m/s" },
        { value: "d", text: "v⃗ = 16î + 8ĵ m/s" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "v⃗(t) = dr⃗/dt = (6t + 2)î + (3t² - 4)ĵ. At t = 2: v⃗ = (6(2) + 2)î + (3(4) - 4)ĵ = 14î + 8ĵ m/s",
      concept: "Vector differentiation: v⃗ = dr⃗/dt"
    },
    {
      id: "motion-2",
      type: "multiple-choice",
      question: "A particle moves such that x(t) = A cos(ωt + φ). What is the maximum acceleration magnitude?",
      options: [
        { value: "a", text: "Aω" },
        { value: "b", text: "Aω²" },
        { value: "c", text: "A²ω" },
        { value: "d", text: "Aω³" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "b",
      explanation: "a(t) = d²x/dt² = -Aω²cos(ωt + φ). Maximum magnitude occurs when |cos(ωt + φ)| = 1, giving |a|ₘₐₓ = Aω²",
      concept: "Simple harmonic motion: aₘₐₓ = Aω²"
    },
    {
      id: "motion-3",
      type: "multiple-choice",
      question: "For projectile motion with initial velocity v₀ at angle θ, what is the time to reach maximum height?",
      options: [
        { value: "a", text: "v₀sinθ/g" },
        { value: "b", text: "v₀cosθ/g" },
        { value: "c", text: "2v₀sinθ/g" },
        { value: "d", text: "v₀/g" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "At maximum height, vᵧ = 0. Using vᵧ = v₀sinθ - gt, solving for t: t = v₀sinθ/g",
      concept: "Projectile motion kinematics"
    },
    {
      id: "motion-4",
      type: "multiple-choice",
      question: "A particle undergoes circular motion with r(t) = R[cos(ωt)î + sin(ωt)ĵ]. What is the centripetal acceleration?",
      options: [
        { value: "a", text: "Rω towards center" },
        { value: "b", text: "Rω² towards center" },
        { value: "c", text: "Rω² tangential" },
        { value: "d", text: "R²ω towards center" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "b",
      explanation: "a⃗ = d²r⃗/dt² = -Rω²[cos(ωt)î + sin(ωt)ĵ] = -Rω²r̂, pointing toward center with magnitude Rω²",
      concept: "Centripetal acceleration: aᶜ = v²/r = rω²"
    },
    {
      id: "motion-5",
      type: "multiple-choice",
      question: "For motion in a resisting medium with F = -bv, what is the terminal velocity for a falling object?",
      options: [
        { value: "a", text: "mg/b" },
        { value: "b", text: "mb/g" },
        { value: "c", text: "√(mg/b)" },
        { value: "d", text: "b/mg" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "At terminal velocity, net force = 0: mg - bvₜ = 0, therefore vₜ = mg/b",
      concept: "Terminal velocity in viscous medium"
    },
    {
      id: "motion-6",
      type: "multiple-choice",
      question: "A particle moves along x(t) = t³ - 6t² + 9t. At what time(s) is the particle at rest?",
      options: [
        { value: "a", text: "t = 1s and t = 3s" },
        { value: "b", text: "t = 2s only" },
        { value: "c", text: "t = 0s and t = 3s" },
        { value: "d", text: "Never at rest" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "v(t) = dx/dt = 3t² - 12t + 9 = 3(t² - 4t + 3) = 3(t-1)(t-3). v = 0 when t = 1s and t = 3s",
      concept: "Finding when velocity equals zero"
    },
    {
      id: "motion-7",
      type: "multiple-choice",
      question: "For uniform circular motion, if the radius doubles while keeping the same period, how does centripetal force change?",
      options: [
        { value: "a", text: "Doubles" },
        { value: "b", text: "Quadruples" },
        { value: "c", text: "Halves" },
        { value: "d", text: "Remains same" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Fᶜ = mv²/r = m(2πr/T)²/r = 4π²mr/T². If r doubles and T constant, Fᶜ doubles",
      concept: "Centripetal force: Fᶜ = mv²/r"
    },
    {
      id: "motion-8",
      type: "multiple-choice",
      question: "A bead slides on a frictionless wire shaped as y = x²/2a. What is the equation of motion in the x-direction?",
      options: [
        { value: "a", text: "mẍ = -mgx/a" },
        { value: "b", text: "mẍ = -mg·x/(a(1 + x²/a²))" },
        { value: "c", text: "mẍ = -mgx/(a√(1 + x²/a²))" },
        { value: "d", text: "mẍ = -mg/(a + x²)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "b",
      explanation: "Using Lagrangian mechanics with constraint y = x²/2a, the x-component equation involves the constraint force and geometry",
      concept: "Constrained motion with Lagrangian mechanics"
    },
    {
      id: "motion-9",
      type: "multiple-choice",
      question: "For a damped harmonic oscillator with equation mẍ + 2γẋ + ω₀²x = 0, what is the condition for critical damping?",
      options: [
        { value: "a", text: "γ = ω₀" },
        { value: "b", text: "γ = ω₀/2" },
        { value: "c", text: "γ = 2ω₀" },
        { value: "d", text: "γ² = ω₀²" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Critical damping occurs when the discriminant of characteristic equation equals zero: (2γ)² - 4mω₀² = 0, giving γ = ω₀",
      concept: "Damped harmonic motion: critical damping condition"
    },
    {
      id: "motion-10",
      type: "multiple-choice",
      question: "A particle moves in a potential V(x) = ½kx² + αx⁴. What is the force at position x?",
      options: [
        { value: "a", text: "F = -kx - 4αx³" },
        { value: "b", text: "F = kx + 4αx³" },
        { value: "c", text: "F = -kx - αx³" },
        { value: "d", text: "F = -(k + 4αx²)x" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "F = -dV/dx = -d/dx(½kx² + αx⁴) = -kx - 4αx³",
      concept: "Conservative force: F⃗ = -∇V"
    },
    {
      id: "motion-11",
      type: "multiple-choice",
      question: "For a relativistic particle, what is the correct expression for momentum?",
      options: [
        { value: "a", text: "p = mv" },
        { value: "b", text: "p = γmv where γ = 1/√(1-v²/c²)" },
        { value: "c", text: "p = mv/√(1-v²/c²)" },
        { value: "d", text: "p = m₀v√(1-v²/c²)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "b",
      explanation: "Relativistic momentum: p = γm₀v where γ = 1/√(1-v²/c²) is the Lorentz factor",
      concept: "Special relativistic momentum"
    },
    {
      id: "motion-12",
      type: "multiple-choice",
      question: "A particle moving in 2D has trajectory r⃗(t) = a(cos(ωt), sin(ωt), 0). What is the radius of curvature?",
      options: [
        { value: "a", text: "a" },
        { value: "b", text: "aω" },
        { value: "c", text: "a/ω" },
        { value: "d", text: "aω²" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "For circular motion with radius a, the radius of curvature R = a (constant for a circle)",
      concept: "Radius of curvature: R = v³/|v⃗ × a⃗|"
    },
    {
      id: "motion-13",
      type: "multiple-choice",
      question: "What is the escape velocity from Earth's surface (R_E = 6.37×10⁶ m, g = 9.8 m/s²)?",
      options: [
        { value: "a", text: "√(2gR_E) ≈ 11.2 km/s" },
        { value: "b", text: "√(gR_E) ≈ 7.9 km/s" },
        { value: "c", text: "2√(gR_E) ≈ 15.8 km/s" },
        { value: "d", text: "√(gR_E/2) ≈ 5.6 km/s" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Escape velocity: v_esc = √(2GM/R) = √(2gR_E) ≈ √(2×9.8×6.37×10⁶) ≈ 11.2 km/s",
      concept: "Gravitational escape velocity"
    },
    {
      id: "motion-14",
      type: "multiple-choice",
      question: "For a pendulum with small angle θ, what is the period including second-order correction?",
      options: [
        { value: "a", text: "T = 2π√(L/g)(1 + θ₀²/16)" },
        { value: "b", text: "T = 2π√(L/g)(1 + θ₀²/8)" },
        { value: "c", text: "T = 2π√(L/g)(1 + θ₀²/4)" },
        { value: "d", text: "T = 2π√(L/g)(1 - θ₀²/16)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Including second-order terms: T ≈ 2π√(L/g)(1 + θ₀²/16) where θ₀ is maximum angle",
      concept: "Nonlinear pendulum period correction"
    },
    {
      id: "motion-15",
      type: "multiple-choice",
      question: "A mass m slides on a frictionless sphere of radius R. At what angle θ does it lose contact?",
      options: [
        { value: "a", text: "cos θ = 2/3" },
        { value: "b", text: "cos θ = 1/3" },
        { value: "c", text: "cos θ = 1/2" },
        { value: "d", text: "cos θ = 3/4" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Using energy conservation and Newton's laws: mg cos θ = mv²/R, with v² = 2gR(1-cos θ), gives cos θ = 2/3",
      concept: "Motion on curved surfaces with normal force"
    },
    {
      id: "motion-16",
      type: "multiple-choice",
      question: "For motion under central force F(r) = -k/r², what is the effective potential?",
      options: [
        { value: "a", text: "U_eff = -k/r + L²/(2mr²)" },
        { value: "b", text: "U_eff = -k/r + L²/(2mr)" },
        { value: "c", text: "U_eff = k/r + L²/(2mr²)" },
        { value: "d", text: "U_eff = -k/r - L²/(2mr²)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Effective potential: U_eff = U(r) + L²/(2mr²) = -k/r + L²/(2mr²) where L is angular momentum",
      concept: "Central force motion and effective potential"
    },
    {
      id: "motion-17",
      type: "multiple-choice",
      question: "A particle in 1D potential V(x) = ax⁴ oscillates. What is the frequency for small oscillations about equilibrium?",
      options: [
        { value: "a", text: "ω = 2√(a/m)" },
        { value: "b", text: "ω = √(2a/m)" },
        { value: "c", text: "ω = √(a/m)" },
        { value: "d", text: "ω = 4√(a/m)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "At equilibrium x = 0, V''(0) = 12ax²|₀ = 0, but V''''(0) = 24a. For quartic potential, ω = 2√(a/m)",
      concept: "Small oscillations in anharmonic potentials"
    },
    {
      id: "motion-18",
      type: "multiple-choice",
      question: "What is the Lagrangian for a free particle in spherical coordinates?",
      options: [
        { value: "a", text: "L = ½m(ṙ² + r²θ̇² + r²sin²θφ̇²)" },
        { value: "b", text: "L = ½m(ṙ² + r²θ̇² + r²φ̇²)" },
        { value: "c", text: "L = ½m(ṙ² + rθ̇² + rsin θφ̇²)" },
        { value: "d", text: "L = ½m(ṙ + rθ̇ + rsin θφ̇)²" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "In spherical coordinates: T = ½m(ṙ² + r²θ̇² + r²sin²θφ̇²), V = 0, so L = T - V = T",
      concept: "Lagrangian mechanics in curvilinear coordinates"
    },
    {
      id: "motion-19",
      type: "multiple-choice",
      question: "For Kepler problem, what is the eccentricity in terms of energy E and angular momentum L?",
      options: [
        { value: "a", text: "e = √(1 + 2EL²/(mk²))" },
        { value: "b", text: "e = √(1 + 2EL²/(m²k²))" },
        { value: "c", text: "e = √(1 - 2EL²/(mk²))" },
        { value: "d", text: "e = 1 + 2EL²/(mk²)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "For central force F = -k/r², eccentricity e = √(1 + 2EL²/(mk²)) where E < 0 for bound orbits",
      concept: "Orbital mechanics: eccentricity formula"
    },
    {
      id: "motion-20",
      type: "multiple-choice",
      question: "A rocket ejects mass at rate dm/dt = -α with exhaust velocity v_e. What is the thrust force?",
      options: [
        { value: "a", text: "F = αv_e" },
        { value: "b", text: "F = -αv_e" },
        { value: "c", text: "F = v_e dm/dt" },
        { value: "d", text: "F = -v_e dm/dt" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "d",
      explanation: "Thrust force F = -v_e(dm/dt). Since dm/dt = -α < 0, F = -v_e(-α) = αv_e",
      concept: "Rocket equation and variable mass systems"
    },
    {
      id: "motion-21",
      type: "multiple-choice",
      question: "For a double pendulum, how many degrees of freedom are there?",
      options: [
        { value: "a", text: "1" },
        { value: "b", text: "2" },
        { value: "c", text: "3" },
        { value: "d", text: "4" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "b",
      explanation: "Double pendulum has 2 degrees of freedom: the two angles θ₁ and θ₂ of each pendulum bob",
      concept: "Degrees of freedom in mechanical systems"
    },
    {
      id: "motion-22",
      type: "multiple-choice",
      question: "What is the Hamilton's canonical equation for momentum?",
      options: [
        { value: "a", text: "ṗ = -∂H/∂q" },
        { value: "b", text: "ṗ = ∂H/∂q" },
        { value: "c", text: "q̇ = ∂H/∂p" },
        { value: "d", text: "q̇ = -∂H/∂p" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Hamilton's canonical equations: q̇ = ∂H/∂p and ṗ = -∂H/∂q",
      concept: "Hamiltonian mechanics: canonical equations"
    },
    {
      id: "motion-23",
      type: "multiple-choice",
      question: "For a particle in uniform electric field E⃗ = E₀ẑ, what is the Lagrangian?",
      options: [
        { value: "a", text: "L = ½m(ẋ² + ẏ² + ż²) - qE₀z" },
        { value: "b", text: "L = ½m(ẋ² + ẏ² + ż²) + qE₀z" },
        { value: "c", text: "L = ½mv² - qE₀z" },
        { value: "d", text: "L = ½mv² + qE₀" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "b",
      explanation: "L = T - V = ½mv² - qΦ where Φ = -E₀z, so L = ½m(ẋ² + ẏ² + ż²) + qE₀z",
      concept: "Lagrangian for charged particle in electric field"
    },
    {
      id: "motion-24",
      type: "multiple-choice",
      question: "What is the period of small oscillations for a physical pendulum with moment of inertia I about pivot point distance d from center of mass?",
      options: [
        { value: "a", text: "T = 2π√(I/(mgd))" },
        { value: "b", text: "T = 2π√(mgd/I)" },
        { value: "c", text: "T = 2π√(I/(md²g))" },
        { value: "d", text: "T = 2π√(md²/(Ig))" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "For physical pendulum: T = 2π√(I/(mgd)) where I is moment of inertia about pivot",
      concept: "Physical pendulum period"
    },
    {
      id: "motion-25",
      type: "multiple-choice",
      question: "For coupled oscillators with masses m₁, m₂ and spring constants k₁, k₂, k₁₂, what determines the normal mode frequencies?",
      options: [
        { value: "a", text: "Eigenvalues of mass matrix" },
        { value: "b", text: "Eigenvalues of stiffness matrix" },
        { value: "c", text: "Eigenvalues of M⁻¹K matrix" },
        { value: "d", text: "Sum of spring constants" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "c",
      explanation: "Normal mode frequencies ω² are eigenvalues of M⁻¹K where M is mass matrix and K is stiffness matrix",
      concept: "Normal modes of coupled oscillators"
    },
    {
      id: "motion-26",
      type: "multiple-choice",
      question: "A mass m moves in a rotating reference frame with angular velocity Ω⃗. What is the Coriolis force?",
      options: [
        { value: "a", text: "F⃗_Cor = -2mΩ⃗ × v⃗" },
        { value: "b", text: "F⃗_Cor = 2mΩ⃗ × v⃗" },
        { value: "c", text: "F⃗_Cor = -mΩ⃗ × v⃗" },
        { value: "d", text: "F⃗_Cor = -m(Ω⃗ × r⃗)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Coriolis force in rotating frame: F⃗_Cor = -2mΩ⃗ × v⃗ where v⃗ is velocity in rotating frame",
      concept: "Fictitious forces in rotating reference frames"
    },
    {
      id: "motion-27",
      type: "multiple-choice",
      question: "For a gyroscope with angular momentum L⃗ in gravitational field, what is the precession frequency?",
      options: [
        { value: "a", text: "Ω_p = mgd/L" },
        { value: "b", text: "Ω_p = L/(mgd)" },
        { value: "c", text: "Ω_p = mgd·L" },
        { value: "d", text: "Ω_p = √(mgd/L)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Precession frequency: Ω_p = τ/L = mgd/L where τ is gravitational torque",
      concept: "Gyroscopic precession"
    },
    {
      id: "motion-28",
      type: "multiple-choice",
      question: "What is the action integral S for a particle moving from (x₁,t₁) to (x₂,t₂)?",
      options: [
        { value: "a", text: "S = ∫[t₁ to t₂] L dt" },
        { value: "b", text: "S = ∫[x₁ to x₂] L dx" },
        { value: "c", text: "S = ∫∫ L dx dt" },
        { value: "d", text: "S = L(x₂,t₂) - L(x₁,t₁)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Action S = ∫[t₁ to t₂] L(q,q̇,t) dt where L is the Lagrangian",
      concept: "Principle of least action"
    },
    {
      id: "motion-29",
      type: "multiple-choice",
      question: "For a relativistic particle, what is the invariant interval in spacetime?",
      options: [
        { value: "a", text: "ds² = c²dt² - dx² - dy² - dz²" },
        { value: "b", text: "ds² = dt² - dx² - dy² - dz²" },
        { value: "c", text: "ds² = dx² + dy² + dz² - c²dt²" },
        { value: "d", text: "ds² = c²dt² + dx² + dy² + dz²" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Minkowski spacetime interval: ds² = c²dt² - dx² - dy² - dz² (signature +,−,−,−)",
      concept: "Special relativity: spacetime interval"
    },
    {
      id: "motion-30",
      type: "multiple-choice",
      question: "For a system with holonomic constraints, how many generalized coordinates are needed if there are N particles and k constraints?",
      options: [
        { value: "a", text: "3N - k" },
        { value: "b", text: "3N + k" },
        { value: "c", text: "N - k" },
        { value: "d", text: "3(N - k)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Degrees of freedom = 3N - k where N is number of particles and k is number of independent constraints",
      concept: "Holonomic constraints and generalized coordinates"
    }
  ],
  // Classical Mechanics - Forces and Newton's Laws (25 questions)
  "cm-2": [
    {
      id: "forces-1",
      type: "multiple-choice",
      question: "A block of mass m slides down an inclined plane (angle θ, coefficient μ). What is the acceleration down the plane?",
      options: [
        { value: "a", text: "a = g(sin θ - μ cos θ)" },
        { value: "b", text: "a = g(cos θ - μ sin θ)" },
        { value: "c", text: "a = g sin θ - μg" },
        { value: "d", text: "a = μg cos θ - g sin θ" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Forces parallel to plane: mg sin θ (down) - f (up) = ma, where f = μN = μmg cos θ, giving a = g(sin θ - μ cos θ)",
      concept: "Newton's second law with friction on inclined plane"
    },
    {
      id: "forces-2",
      type: "multiple-choice",
      question: "Two masses m₁ and m₂ connected by string over pulley. What is the tension T in the string?",
      options: [
        { value: "a", text: "T = 2m₁m₂g/(m₁ + m₂)" },
        { value: "b", text: "T = (m₁ + m₂)g/2" },
        { value: "c", text: "T = m₁m₂g" },
        { value: "d", text: "T = g√(m₁m₂)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Using Newton's laws for both masses: m₁g - T = m₁a and T - m₂g = m₂a. Solving gives T = 2m₁m₂g/(m₁ + m₂)",
      concept: "Atwood machine dynamics"
    },
    {
      id: "forces-3",
      type: "multiple-choice",
      question: "A car rounds a banked curve (angle θ) at speed v without friction. What is the banking angle for radius R?",
      options: [
        { value: "a", text: "tan θ = v²/(gR)" },
        { value: "b", text: "tan θ = gR/v²" },
        { value: "c", text: "sin θ = v²/(gR)" },
        { value: "d", text: "cos θ = v²/(gR)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "For banked curve without friction: horizontal component N sin θ provides centripetal force mv²/R, vertical component N cos θ = mg. Therefore tan θ = v²/(gR)",
      concept: "Banked curves and centripetal force"
    },
    {
      id: "forces-4",
      type: "multiple-choice",
      question: "A particle experiences force F⃗ = -kx î + αy ĵ. What is the work done moving from (0,0) to (a,b)?",
      options: [
        { value: "a", text: "W = -ka²/2 + αb²/2" },
        { value: "b", text: "W = ka²/2 + αb²/2" },
        { value: "c", text: "W = Path dependent" },
        { value: "d", text: "W = 0" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "c",
      explanation: "∇ × F⃗ = (0,0,α - 0) ≠ 0, so force is non-conservative and work is path dependent",
      concept: "Conservative vs non-conservative forces"
    },
    {
      id: "forces-5",
      type: "multiple-choice",
      question: "A mass m hangs from string of length L in accelerating elevator (acceleration a upward). What is tension?",
      options: [
        { value: "a", text: "T = m(g + a)" },
        { value: "b", text: "T = m(g - a)" },
        { value: "c", text: "T = mg" },
        { value: "d", text: "T = ma" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "In elevator's frame (non-inertial), fictitious force ma acts downward. Total downward force: mg + ma. For equilibrium: T = m(g + a)",
      concept: "Forces in non-inertial reference frames"
    },
    {
      id: "forces-6",
      type: "multiple-choice",
      question: "What is the drag force on a sphere of radius R moving through fluid with velocity v in the Reynolds number regime Re >> 1?",
      options: [
        { value: "a", text: "F_d = 6πηRv (Stokes)" },
        { value: "b", text: "F_d = ½ρCdπR²v²" },
        { value: "c", text: "F_d = ρR²v²" },
        { value: "d", text: "F_d = πR²v" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "b",
      explanation: "For high Reynolds number (turbulent flow): F_d = ½ρCdAv² where A = πR² is cross-sectional area",
      concept: "Fluid dynamics: drag forces at high Reynolds number"
    },
    {
      id: "forces-7",
      type: "multiple-choice",
      question: "A charged particle (charge q, mass m) moves in crossed electric and magnetic fields E⃗ = E₀ x̂, B⃗ = B₀ ẑ. What is the drift velocity?",
      options: [
        { value: "a", text: "v⃗_d = (E₀/B₀) ŷ" },
        { value: "b", text: "v⃗_d = (E₀/B₀) x̂" },
        { value: "c", text: "v⃗_d = -(E₀/B₀) ŷ" },
        { value: "d", text: "v⃗_d = (B₀/E₀) ŷ" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "For E⃗ × B⃗ drift: v⃗_d = E⃗ × B⃗/B² = (E₀ x̂ × B₀ ẑ)/B₀² = (E₀/B₀) ŷ",
      concept: "Charged particle motion in electromagnetic fields"
    },
    {
      id: "forces-8",
      type: "multiple-choice",
      question: "For a rocket in vacuum with exhaust velocity u relative to rocket, what is the rocket equation?",
      options: [
        { value: "a", text: "m dv = -u dm" },
        { value: "b", text: "m dv = u dm" },
        { value: "c", text: "dv/v = -dm/m" },
        { value: "d", text: "v = u ln(m₀/m)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Conservation of momentum gives: m dv = -u dm, leading to Tsiolkovsky equation",
      concept: "Rocket propulsion and variable mass systems"
    },
    {
      id: "forces-9",
      type: "multiple-choice",
      question: "A bead slides on a frictionless vertical hoop of radius R. At what angle θ from bottom does normal force become zero?",
      options: [
        { value: "a", text: "cos θ = 2/3" },
        { value: "b", text: "cos θ = 1/3" },
        { value: "c", text: "θ = 60°" },
        { value: "d", text: "Never" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Energy conservation: mg(R - R cos θ) = ½mv². Radial force: mg cos θ - N = mv²/R. Setting N = 0 gives cos θ = 2/3",
      concept: "Constrained motion on curved surfaces"
    },
    {
      id: "forces-10",
      type: "multiple-choice",
      question: "What is the coefficient of restitution e for a perfectly elastic collision?",
      options: [
        { value: "a", text: "e = 0" },
        { value: "b", text: "e = 1" },
        { value: "c", text: "e = -1" },
        { value: "d", text: "e = ∞" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "b",
      explanation: "Coefficient of restitution: e = -(v₁' - v₂')/(v₁ - v₂). For elastic collision, e = 1",
      concept: "Collision dynamics and coefficient of restitution"
    },
    {
      id: "forces-11",
      type: "multiple-choice",
      question: "A uniform rod of length L and mass M pivots about one end. What is the moment of inertia about the pivot?",
      options: [
        { value: "a", text: "I = ML²/3" },
        { value: "b", text: "I = ML²/12" },
        { value: "c", text: "I = ML²/2" },
        { value: "d", text: "I = 2ML²/3" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "I = ∫₀ᴸ (M/L)x² dx = (M/L) · L³/3 = ML²/3",
      concept: "Moment of inertia calculation"
    },
    {
      id: "forces-12",
      type: "multiple-choice",
      question: "Two particles of masses m₁ and m₂ connected by spring (constant k) oscillate. What is the reduced mass μ?",
      options: [
        { value: "a", text: "μ = m₁m₂/(m₁ + m₂)" },
        { value: "b", text: "μ = (m₁ + m₂)/2" },
        { value: "c", text: "μ = m₁ + m₂" },
        { value: "d", text: "μ = √(m₁m₂)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "For two-body system: μ = m₁m₂/(m₁ + m₂), frequency ω = √(k/μ)",
      concept: "Reduced mass in two-body systems"
    },
    {
      id: "forces-13",
      type: "multiple-choice",
      question: "A gyroscope with angular velocity ω₀ about its axis experiences torque τ⃗ perpendicular to axis. What is the precession rate?",
      options: [
        { value: "a", text: "Ω = τ/(Iω₀)" },
        { value: "b", text: "Ω = Iω₀/τ" },
        { value: "c", text: "Ω = τω₀/I" },
        { value: "d", text: "Ω = √(τ/I)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "For gyroscope: τ⃗ = dL⃗/dt = Ω⃗ × L⃗, giving |τ| = Ω|L| = ΩIω₀, so Ω = τ/(Iω₀)",
      concept: "Gyroscopic motion and precession"
    },
    {
      id: "forces-14",
      type: "multiple-choice",
      question: "For a central force F(r) = -k/r³, what is the effective potential energy?",
      options: [
        { value: "a", text: "U_eff = -k/(2r²) + L²/(2mr²)" },
        { value: "b", text: "U_eff = k/(2r²) + L²/(2mr²)" },
        { value: "c", text: "U_eff = -k/r² + L²/(2mr²)" },
        { value: "d", text: "U_eff = -k/(2r²) + L²/(mr²)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "U(r) = ∫ -F(r) dr = ∫ k/r³ dr = -k/(2r²). U_eff = U(r) + L²/(2mr²)",
      concept: "Central forces and effective potential"
    },
    {
      id: "forces-15",
      type: "multiple-choice",
      question: "What is the escape velocity from a planet of mass M and radius R?",
      options: [
        { value: "a", text: "v_esc = √(2GM/R)" },
        { value: "b", text: "v_esc = √(GM/R)" },
        { value: "c", text: "v_esc = √(GM/2R)" },
        { value: "d", text: "v_esc = 2√(GM/R)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Energy conservation: ½mv² - GMm/R = 0, giving v_esc = √(2GM/R)",
      concept: "Gravitational escape velocity"
    },
    {
      id: "forces-16",
      type: "multiple-choice",
      question: "For a damped oscillator mẍ + γẋ + kx = 0, what is the Q-factor?",
      options: [
        { value: "a", text: "Q = ω₀m/γ" },
        { value: "b", text: "Q = γ/(ω₀m)" },
        { value: "c", text: "Q = √(k/m)/γ" },
        { value: "d", text: "Q = γ/√(km)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Q = ω₀m/γ where ω₀ = √(k/m) is natural frequency and γ is damping coefficient",
      concept: "Quality factor in damped oscillations"
    },
    {
      id: "forces-17",
      type: "multiple-choice",
      question: "A satellite orbits Earth in elliptical orbit. At periapsis (closest point), what is true about its velocity?",
      options: [
        { value: "a", text: "Maximum velocity" },
        { value: "b", text: "Minimum velocity" },
        { value: "c", text: "Average velocity" },
        { value: "d", text: "Zero velocity" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "By Kepler's second law (conservation of angular momentum), rv = constant. At periapsis, r is minimum, so v is maximum",
      concept: "Kepler's laws and orbital mechanics"
    },
    {
      id: "forces-18",
      type: "multiple-choice",
      question: "For small oscillations of a compound pendulum, what determines the period?",
      options: [
        { value: "a", text: "T = 2π√(I/(mgd))" },
        { value: "b", text: "T = 2π√(mgd/I)" },
        { value: "c", text: "T = 2π√(md²/I)" },
        { value: "d", text: "T = 2π√(I/mg)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Compound pendulum period: T = 2π√(I/(mgd)) where I is moment of inertia about pivot, d is distance to center of mass",
      concept: "Physical pendulum dynamics"
    },
    {
      id: "forces-19",
      type: "multiple-choice",
      question: "What is the tidal force on a mass m at distance r from planet center due to moon at distance D?",
      options: [
        { value: "a", text: "F_tidal ∝ m·r/D³" },
        { value: "b", text: "F_tidal ∝ m·r²/D³" },
        { value: "c", text: "F_tidal ∝ m/D²" },
        { value: "d", text: "F_tidal ∝ m·r/D²" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Tidal force is differential gravitational force: F_tidal ≈ GMₘ·m·r/D³ (first-order gradient)",
      concept: "Tidal forces and gravitational gradients"
    },
    {
      id: "forces-20",
      type: "multiple-choice",
      question: "For a spinning top with angular momentum L⃗ in gravitational field, what is the nutation frequency?",
      options: [
        { value: "a", text: "ω_nut = √(mgd/I)" },
        { value: "b", text: "ω_nut = mgd/L" },
        { value: "c", text: "ω_nut = L/(mgd)" },
        { value: "d", text: "ω_nut = √(L/mgd)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Nutation frequency for symmetric top: ω_nut = √(mgd/I₁) where I₁ is transverse moment of inertia",
      concept: "Gyroscopic motion: nutation and precession"
    },
    {
      id: "forces-21",
      type: "multiple-choice",
      question: "A particle moves in a 2D isotropic harmonic oscillator potential V = ½k(x² + y²). What are the energy levels?",
      options: [
        { value: "a", text: "E_n = ℏω(n + 1)" },
        { value: "b", text: "E_n = ℏω(n + ½)" },
        { value: "c", text: "E_{n₁,n₂} = ℏω(n₁ + n₂ + 1)" },
        { value: "d", text: "E_{n₁,n₂} = ℏω(n₁ + n₂ + ½)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "c",
      explanation: "2D harmonic oscillator: E = E_x + E_y = ℏω(n₁ + ½) + ℏω(n₂ + ½) = ℏω(n₁ + n₂ + 1)",
      concept: "Multi-dimensional harmonic oscillators"
    },
    {
      id: "forces-22",
      type: "multiple-choice",
      question: "For a particle on a rotating turntable (angular velocity Ω), what is the centrifugal force per unit mass?",
      options: [
        { value: "a", text: "Ω²r⃗" },
        { value: "b", text: "-Ω²r⃗" },
        { value: "c", text: "Ω × (Ω × r⃗)" },
        { value: "d", text: "-Ω × (Ω × r⃗)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Centrifugal force per unit mass in rotating frame: F_cf/m = Ω²r⃗ (outward from rotation axis)",
      concept: "Fictitious forces in rotating reference frames"
    },
    {
      id: "forces-23",
      type: "multiple-choice",
      question: "What is the Roche limit for a satellite orbiting a planet (equal densities ρ)?",
      options: [
        { value: "a", text: "d ≈ 2.44 R_planet" },
        { value: "b", text: "d ≈ 1.26 R_planet" },
        { value: "c", text: "d ≈ 3.86 R_planet" },
        { value: "d", text: "d ≈ R_planet" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Roche limit for equal densities: d ≈ 2.44 R_planet (rigid body) where tidal forces overcome self-gravity",
      concept: "Tidal disruption and Roche limit"
    },
    {
      id: "forces-24",
      type: "multiple-choice",
      question: "For a charged particle in uniform magnetic field B⃗ = B₀ẑ, what is the cyclotron frequency?",
      options: [
        { value: "a", text: "ω_c = qB₀/m" },
        { value: "b", text: "ω_c = qB₀/(2m)" },
        { value: "c", text: "ω_c = 2qB₀/m" },
        { value: "d", text: "ω_c = √(qB₀/m)" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Lorentz force provides centripetal force: qvB = mv²/r, giving ω_c = v/r = qB₀/m",
      concept: "Cyclotron motion in magnetic fields"
    },
    {
      id: "forces-25",
      type: "multiple-choice",
      question: "What is the period of a conical pendulum with string length L at angle θ from vertical?",
      options: [
        { value: "a", text: "T = 2π√(L cos θ/g)" },
        { value: "b", text: "T = 2π√(L sin θ/g)" },
        { value: "c", text: "T = 2π√(L/(g cos θ))" },
        { value: "d", text: "T = 2π√(L/(g sin θ))" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Vertical force balance: T cos θ = mg. Centripetal force: T sin θ = mω²L sin θ. Solving: ω = √(g/(L cos θ))",
      concept: "Conical pendulum dynamics"
    }
  ]
};

// Add lesson notes with physics laws and principles
const lessonNotes: Record<string, string> = {
  "cm-1": `
    **Introduction to Motion - Fundamental Laws & Principles**
    
    📚 **Core Principles:**
    • Galilean Relativity: Laws of physics are the same in all inertial frames
    • Position Vector: r⃗(t) = x(t)î + y(t)ĵ + z(t)k̂
    • Velocity: v⃗ = dr⃗/dt = lim(Δt→0) [r⃗(t+Δt) - r⃗(t)]/Δt
    • Acceleration: a⃗ = dv⃗/dt = d²r⃗/dt²
    
    📖 **From Goldstein's Classical Mechanics:**
    "The description of motion is the foundation upon which all of mechanics rests."
    
    🔬 **Mathematical Framework:**
    • Kinematic equations for constant acceleration:
      - v = v₀ + at
      - x = x₀ + v₀t + ½at²
      - v² = v₀² + 2a(x - x₀)
    
    ⚡ **Vector Calculus in Motion:**
    • For parametric motion r⃗(t), the tangent vector T̂ = v⃗/|v⃗|
    • Curvature κ = |dT̂/ds| where s is arc length
    • Radius of curvature R = 1/κ = v³/|v⃗ × a⃗|
    
    🌟 **Advanced Concepts:**
    • Frenet-Serret formulas for curve motion
    • Non-inertial reference frames introduce fictitious forces
    • Relativistic corrections become significant at v ≈ 0.1c
  `,
  "cm-2": `
    **Forces and Newton's Laws - The Foundation of Dynamics**
    
    📚 **Newton's Three Laws (Principia Mathematica, 1687):**
    
    **First Law (Law of Inertia):**
    "Every object persists in its state of rest or uniform motion in a straight line unless acted upon by an unbalanced force."
    Mathematical form: If ΣF⃗ = 0, then v⃗ = constant
    
    **Second Law (F = ma):**
    "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass."
    Mathematical form: F⃗ = dp⃗/dt = m(dv⃗/dt) = ma⃗ (for constant mass)
    
    **Third Law (Action-Reaction):**
    "For every action, there is an equal and opposite reaction."
    Mathematical form: F⃗₁₂ = -F⃗₂₁
    
    📖 **From Landau & Lifshitz Mechanics:**
    "The equations of motion in Newtonian mechanics follow from the principle of least action."
    
    🔬 **Force Classifications:**
    • **Conservative Forces:** ∇ × F⃗ = 0, work is path-independent
      - Gravitational: F⃗ = -GMm r̂/r²
      - Elastic: F⃗ = -kx̂
      - Coulomb: F⃗ = kq₁q₂ r̂/r²
    
    • **Non-conservative Forces:** Energy dissipation
      - Friction: f = μN (kinetic), f ≤ μₛN (static)
      - Air resistance: F_drag = -½ρCdAv²v̂
      - Viscous drag: F⃗ = -6πηRv⃗ (Stokes' law)
    
    ⚡ **Advanced Force Concepts:**
    • **Constraint Forces:** Maintain geometric constraints
    • **Central Forces:** F⃗ = f(r)r̂, conserve angular momentum
    • **Velocity-dependent Forces:** Lorentz force F⃗ = q(E⃗ + v⃗ × B⃗)
    
    🌟 **D'Alembert's Principle:**
    Rewrite dynamics as statics: F⃗ - ma⃗ = 0
    This leads naturally to Lagrangian mechanics.
  `
};

// Default questions generator with advanced concepts
const getDefaultQuestions = (lessonId: string): Question[] => {
  return [
    {
      id: `${lessonId}-1`,
      type: "multiple-choice",
      question: "For this advanced physics topic, what is the most crucial mathematical tool for analysis?",
      options: [
        { value: "a", text: "Vector calculus and differential equations" },
        { value: "b", text: "Basic algebra only" },
        { value: "c", text: "Memorized formulas" },
        { value: "d", text: "Graphical methods alone" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "a",
      explanation: "Advanced physics requires sophisticated mathematical tools including vector calculus, differential equations, and often tensor analysis for complete understanding.",
      concept: "Mathematical foundations of physics"
    },
    {
      id: `${lessonId}-2`,
      type: "multiple-choice",
      question: "When solving complex physics problems, what is the most systematic approach?",
      options: [
        { value: "a", text: "Guess and check" },
        { value: "b", text: "Apply conservation laws, identify symmetries, use appropriate coordinates" },
        { value: "c", text: "Use only Newton's laws" },
        { value: "d", text: "Avoid mathematics" },
        { value: "idk", text: "I don't know" }
      ],
      correctAnswer: "b",
      explanation: "Systematic problem solving involves identifying conservation laws (energy, momentum, angular momentum), recognizing symmetries, and choosing appropriate coordinate systems (Cartesian, spherical, cylindrical, etc.).",
      concept: "Advanced problem-solving methodology"
    }
  ];
};

export default function InteractiveLesson({ lessonId, onComplete, onClose }: InteractiveLessonProps) {
  const questions = lessonQuestions[lessonId] || getDefaultQuestions(lessonId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showNotes, setShowNotes] = useState(true);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isCorrect = selectedAnswer === question.correctAnswer;
  const notes = lessonNotes[lessonId] || "";

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const newAnswers = { ...answers, [question.id]: selectedAnswer };
    setAnswers(newAnswers);

    if (isCorrect && selectedAnswer !== "idk") {
      setScore(score + 1);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScore = Math.round((score / questions.length) * 1000);
      onComplete(finalScore);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
    }
  };

  const handleReadContent = () => {
    const text = `Physics concept: ${question.concept}. Question: ${question.question}. Options: ${question.options.map(opt => opt.text).join(', ')}`;
    
    if ('speechSynthesis' in window && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      const speak = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          utterance.voice = voices.find(voice => voice.lang.startsWith('en')) || voices[0];
        }
        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = speak;
      } else {
        speak();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-6xl max-h-[95vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg">
        <div className="p-6">
          {/* Lesson Notes Section */}
          {showNotes && notes && currentQuestion === 0 && (
            <Card className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 flex items-center">
                    <i className="fas fa-book-open mr-2"></i>
                    Lesson Notes & Principles
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNotes(false)}
                    className="text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/50"
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </div>
                <div className="prose dark:prose-invert max-w-none text-sm">
                  <pre className="whitespace-pre-wrap font-sans text-blue-700 dark:text-blue-300">
                    {notes}
                  </pre>
                </div>
                <Button
                  onClick={() => setShowNotes(false)}
                  className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
                >
                  Start Questions
                  <i className="fas fa-arrow-right ml-2"></i>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Progress and Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-primary">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-neutral-600 dark:text-gray-400">
                  Score: {score}/{questions.length}
                </div>
                {notes && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNotes(!showNotes)}
                    className="text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/50"
                  >
                    <i className="fas fa-book mr-1"></i>
                    Notes
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClose}
                  className="text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  <i className="fas fa-times"></i>
                </Button>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Physics Concept: {question.concept}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReadContent}
                  className="text-blue-600 dark:text-blue-400"
                >
                  <i className="fas fa-volume-up text-xs mr-1"></i>
                  Read Question
                </Button>
              </div>

              <h4 className="text-xl mb-6 text-neutral-900 dark:text-white">
                {question.question}
              </h4>

              <div className="space-y-3 mb-6">
                {question.options.map((option) => (
                  <div 
                    key={option.value}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedAnswer === option.value
                        ? showExplanation
                          ? option.value === question.correctAnswer
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : option.value === "idk"
                              ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                              : "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-primary bg-primary/10"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    } ${showExplanation ? 'pointer-events-none' : ''} ${
                      option.value === "idk" ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/10' : ''
                    }`}
                    onClick={() => !showExplanation && handleAnswerSelect(option.value)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === option.value
                          ? showExplanation
                            ? option.value === question.correctAnswer
                              ? "border-green-500 bg-green-500"
                              : option.value === "idk"
                                ? "border-yellow-500 bg-yellow-500"
                                : "border-red-500 bg-red-500"
                            : "border-primary bg-primary"
                          : option.value === "idk"
                            ? "border-yellow-300"
                            : "border-gray-300 dark:border-gray-600"
                      }`}>
                        {selectedAnswer === option.value && (
                          <i className={`fas fa-${
                            showExplanation
                              ? option.value === question.correctAnswer 
                                ? 'check' 
                                : option.value === "idk"
                                  ? 'question'
                                  : 'times'
                              : 'circle'
                          } text-white text-xs`}></i>
                        )}
                      </div>
                      <span className={`${
                        option.value === "idk" 
                          ? 'text-yellow-700 dark:text-yellow-300 font-medium' 
                          : 'text-neutral-700 dark:text-gray-300'
                      }`}>
                        {option.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {showExplanation && (
                <div className={`p-4 rounded-lg mb-6 ${
                  isCorrect && selectedAnswer !== "idk"
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                    : selectedAnswer === "idk"
                      ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                      : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-start space-x-3">
                    <i className={`fas fa-${
                      isCorrect && selectedAnswer !== "idk" 
                        ? 'check-circle text-green-500' 
                        : selectedAnswer === "idk"
                          ? 'question-circle text-yellow-500'
                          : 'times-circle text-red-500'
                    } text-lg mt-1`}></i>
                    <div>
                      <h5 className={`font-medium mb-2 ${
                        isCorrect && selectedAnswer !== "idk"
                          ? 'text-green-800 dark:text-green-200'
                          : selectedAnswer === "idk"
                            ? 'text-yellow-800 dark:text-yellow-200'
                            : 'text-red-800 dark:text-red-200'
                      }`}>
                        {isCorrect && selectedAnswer !== "idk" 
                          ? 'Correct!' 
                          : selectedAnswer === "idk"
                            ? "That's okay! Learning is a process."
                            : 'Incorrect'
                        }
                      </h5>
                      <p className={`${
                        isCorrect && selectedAnswer !== "idk"
                          ? 'text-green-700 dark:text-green-300'
                          : selectedAnswer === "idk"
                            ? 'text-yellow-700 dark:text-yellow-300'
                            : 'text-red-700 dark:text-red-300'
                      }`}>
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  <i className="fas fa-arrow-left text-xs mr-2"></i>
                  Previous
                </Button>

                {!showExplanation ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!selectedAnswer}
                    className="bg-primary text-white hover:bg-primary/90"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-primary text-white hover:bg-primary/90"
                  >
                    {isLastQuestion ? 'Complete Lesson' : 'Next Question'}
                    <i className="fas fa-arrow-right text-xs ml-2"></i>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
