// Complete lesson data for ALL physics courses
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

// ALL 15 Classical Mechanics Lessons
export const allClassicalMechanicsLessons: Record<string, LessonData> = {
  "cm-6": {
    id: "cm-6",
    title: "Oscillations and Waves",
    videoId: "Yz8HqbFH2wY",
    feynmanNotes: "A vibration is a wiggle in time. A wave is a wiggle in time and space. Everything in nature oscillates - atoms vibrate, planets orbit, hearts beat.",
    questions: [
      { id: "osc-1", type: "multiple-choice", question: "What is simple harmonic motion?", options: [{ value: "a", text: "Motion that repeats" }, { value: "b", text: "F = -kx restoring force" }, { value: "c", text: "Sinusoidal motion" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "SHM is periodic motion with F = -kx restoring force, producing sinusoidal displacement.", concept: "SHM: F = -kx" },
      { id: "osc-2", type: "multiple-choice", question: "What is the period of a mass-spring system?", options: [{ value: "a", text: "T = 2π√(m/k)" }, { value: "b", text: "T = 2π√(k/m)" }, { value: "c", text: "T = π√(m/k)" }, { value: "d", text: "T = √(m/k)" }], correctAnswer: "a", explanation: "For a mass-spring system, T = 2π√(m/k).", concept: "T = 2π√(m/k)" },
      { id: "osc-3", type: "multiple-choice", question: "What is frequency?", options: [{ value: "a", text: "f = 1/T" }, { value: "b", text: "Number of cycles per second" }, { value: "c", text: "Measured in Hz" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Frequency f = 1/T is cycles per second, measured in Hertz.", concept: "f = 1/T (Hz)" },
      { id: "osc-4", type: "multiple-choice", question: "What is a wave?", options: [{ value: "a", text: "Disturbance that travels" }, { value: "b", text: "Transfers energy without transferring matter" }, { value: "c", text: "Has wavelength and frequency" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "A wave is a traveling disturbance that transfers energy without transferring matter.", concept: "Wave = traveling disturbance" },
      { id: "osc-5", type: "multiple-choice", question: "What is the wave equation?", options: [{ value: "a", text: "v = fλ" }, { value: "b", text: "v = λ/f" }, { value: "c", text: "v = f/λ" }, { value: "d", text: "v = fλ²" }], correctAnswer: "a", explanation: "Wave speed v = fλ, where f is frequency and λ is wavelength.", concept: "v = fλ" },
      { id: "osc-6", type: "multiple-choice", question: "What happens during resonance?", options: [{ value: "a", text: "Amplitude becomes very large" }, { value: "b", text: "Driving frequency matches natural frequency" }, { value: "c", text: "Energy transfer is maximum" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Resonance occurs when driving frequency matches natural frequency, causing large amplitude oscillations.", concept: "Resonance: max energy transfer" },
      { id: "osc-7", type: "multiple-choice", question: "What is damping?", options: [{ value: "a", text: "Energy loss in oscillations" }, { value: "b", text: "Friction-like forces" }, { value: "c", text: "Amplitude decreases over time" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Damping is energy loss that causes oscillation amplitude to decrease over time.", concept: "Damping reduces amplitude" },
      { id: "osc-8", type: "multiple-choice", question: "What is the pendulum period?", options: [{ value: "a", text: "T = 2π√(L/g)" }, { value: "b", text: "T = 2π√(g/L)" }, { value: "c", text: "T = π√(L/g)" }, { value: "d", text: "T = √(L/g)" }], correctAnswer: "a", explanation: "For a simple pendulum, T = 2π√(L/g), independent of mass.", concept: "T = 2π√(L/g)" },
      { id: "osc-9", type: "multiple-choice", question: "What is interference?", options: [{ value: "a", text: "Waves adding together" }, { value: "b", text: "Can be constructive or destructive" }, { value: "c", text: "Produces standing waves" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Interference is the superposition of waves, which can be constructive or destructive.", concept: "Wave superposition" },
      { id: "osc-10", type: "multiple-choice", question: "What determines wave speed in a string?", options: [{ value: "a", text: "Tension and mass density" }, { value: "b", text: "v = √(T/μ)" }, { value: "c", text: "Higher tension = faster waves" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Wave speed in a string is v = √(T/μ), where T is tension and μ is mass per unit length.", concept: "v = √(T/μ)" }
    ]
  },

  "cm-7": {
    id: "cm-7",
    title: "Fluid Mechanics",
    videoId: "fJefjG3xhW0",
    feynmanNotes: "Fluids flow in beautiful and complex ways. Whether it's water in a river or air over an airplane wing, the same principles govern all fluid motion.",
    questions: [
      { id: "fluid-1", type: "multiple-choice", question: "What is pressure?", options: [{ value: "a", text: "P = F/A" }, { value: "b", text: "Force per unit area" }, { value: "c", text: "Measured in Pascals" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Pressure P = F/A is force per unit area, measured in Pascals.", concept: "P = F/A" },
      { id: "fluid-2", type: "multiple-choice", question: "What is hydrostatic pressure?", options: [{ value: "a", text: "P = ρgh" }, { value: "b", text: "Pressure due to fluid weight" }, { value: "c", text: "Increases with depth" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Hydrostatic pressure P = ρgh increases with depth due to fluid weight.", concept: "P = ρgh" },
      { id: "fluid-3", type: "multiple-choice", question: "What is Archimedes' principle?", options: [{ value: "a", text: "Buoyant force equals weight of displaced fluid" }, { value: "b", text: "F_b = ρ_fluid × V_displaced × g" }, { value: "c", text: "Objects float if less dense than fluid" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Archimedes' principle: buoyant force equals the weight of displaced fluid.", concept: "F_b = ρVg displaced" },
      { id: "fluid-4", type: "multiple-choice", question: "What is continuity equation?", options: [{ value: "a", text: "A₁v₁ = A₂v₂" }, { value: "b", text: "Mass conservation in fluids" }, { value: "c", text: "Narrower pipes have faster flow" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Continuity equation A₁v₁ = A₂v₂ conserves mass - narrower areas have faster flow.", concept: "A₁v₁ = A₂v₂" },
      { id: "fluid-5", type: "multiple-choice", question: "What is Bernoulli's equation?", options: [{ value: "a", text: "P + ½ρv² + ρgh = constant" }, { value: "b", text: "Energy conservation in fluids" }, { value: "c", text: "Faster flow = lower pressure" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Bernoulli's equation: P + ½ρv² + ρgh = constant, showing energy conservation.", concept: "P + ½ρv² + ρgh = const" },
      { id: "fluid-6", type: "multiple-choice", question: "Why do airplanes fly?", options: [{ value: "a", text: "Bernoulli effect" }, { value: "b", text: "Newton's third law" }, { value: "c", text: "Air deflected downward" }, { value: "d", text: "All contribute" }], correctAnswer: "d", explanation: "Flight involves Bernoulli effect, Newton's laws, and air deflection - all contribute.", concept: "Multiple lift mechanisms" },
      { id: "fluid-7", type: "multiple-choice", question: "What is viscosity?", options: [{ value: "a", text: "Fluid's resistance to flow" }, { value: "b", text: "Internal friction" }, { value: "c", text: "Honey has high viscosity" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Viscosity is a fluid's resistance to flow due to internal friction.", concept: "Viscosity = flow resistance" },
      { id: "fluid-8", type: "multiple-choice", question: "What is Reynolds number?", options: [{ value: "a", text: "Re = ρvL/μ" }, { value: "b", text: "Predicts turbulent vs laminar flow" }, { value: "c", text: "High Re means turbulence" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Reynolds number Re = ρvL/μ predicts whether flow is laminar or turbulent.", concept: "Re = ρvL/μ" },
      { id: "fluid-9", type: "multiple-choice", question: "What causes surface tension?", options: [{ value: "a", text: "Molecular cohesion" }, { value: "b", text: "Unequal forces at surface" }, { value: "c", text: "Creates curved meniscus" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Surface tension results from molecular cohesion and unequal forces at the surface.", concept: "Molecular surface forces" },
      { id: "fluid-10", type: "multiple-choice", question: "What is Pascal's principle?", options: [{ value: "a", text: "Pressure applied to fluid is transmitted equally" }, { value: "b", text: "Basis for hydraulic systems" }, { value: "c", text: "Small force can create large force" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Pascal's principle: pressure applied to confined fluid is transmitted equally in all directions.", concept: "Pressure transmission" }
    ]
  },

  "cm-8": {
    id: "cm-8",
    title: "Thermodynamics",
    videoId: "rbSTTByFGhM",
    feynmanNotes: "Heat is molecular motion. Temperature is the average kinetic energy of molecules. The laws of thermodynamics govern all energy transformations in the universe.",
    questions: [
      { id: "thermo-1", type: "multiple-choice", question: "What is the first law of thermodynamics?", options: [{ value: "a", text: "ΔU = Q - W" }, { value: "b", text: "Energy conservation" }, { value: "c", text: "Heat input minus work output" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "First law: ΔU = Q - W, stating energy conservation.", concept: "ΔU = Q - W" },
      { id: "thermo-2", type: "multiple-choice", question: "What is entropy?", options: [{ value: "a", text: "Measure of disorder" }, { value: "b", text: "Always increases in isolated systems" }, { value: "c", text: "Related to number of microstates" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Entropy measures disorder and always increases in isolated systems.", concept: "Entropy = disorder measure" },
      { id: "thermo-3", type: "multiple-choice", question: "What is the second law of thermodynamics?", options: [{ value: "a", text: "Entropy of isolated system increases" }, { value: "b", text: "Heat flows from hot to cold" }, { value: "c", text: "No perfect heat engine possible" }, { value: "d", text: "All equivalent statements" }], correctAnswer: "d", explanation: "Second law has many equivalent forms - all describe irreversibility.", concept: "Entropy increases" },
      { id: "thermo-4", type: "multiple-choice", question: "What is absolute zero?", options: [{ value: "a", text: "0 Kelvin" }, { value: "b", text: "-273.15°C" }, { value: "c", text: "All molecular motion stops" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Absolute zero is 0 K = -273.15°C, where molecular motion theoretically stops.", concept: "0 K = absolute zero" },
      { id: "thermo-5", type: "multiple-choice", question: "What is heat capacity?", options: [{ value: "a", text: "C = Q/ΔT" }, { value: "b", text: "Energy needed to raise temperature" }, { value: "c", text: "Measured in J/K" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Heat capacity C = Q/ΔT is energy needed per degree temperature change.", concept: "C = Q/ΔT" },
      { id: "thermo-6", type: "multiple-choice", question: "What is an isothermal process?", options: [{ value: "a", text: "Constant temperature" }, { value: "b", text: "ΔU = 0 for ideal gas" }, { value: "c", text: "Q = W" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Isothermal process has constant temperature, so ΔU = 0 and Q = W.", concept: "Isothermal: T = constant" },
      { id: "thermo-7", type: "multiple-choice", question: "What is an adiabatic process?", options: [{ value: "a", text: "No heat transfer (Q = 0)" }, { value: "b", text: "ΔU = -W" }, { value: "c", text: "PVᵞ = constant" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Adiabatic process has Q = 0, so ΔU = -W and PVᵞ = constant.", concept: "Adiabatic: Q = 0" },
      { id: "thermo-8", type: "multiple-choice", question: "What is the Carnot efficiency?", options: [{ value: "a", text: "η = 1 - T_cold/T_hot" }, { value: "b", text: "Maximum theoretical efficiency" }, { value: "c", text: "Depends only on temperatures" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Carnot efficiency η = 1 - T_c/T_h is the maximum theoretical efficiency.", concept: "η = 1 - T_c/T_h" },
      { id: "thermo-9", type: "multiple-choice", question: "What is the ideal gas law?", options: [{ value: "a", text: "PV = nRT" }, { value: "b", text: "PV = NkT" }, { value: "c", text: "Relates pressure, volume, temperature" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Ideal gas law: PV = nRT = NkT relates pressure, volume, and temperature.", concept: "PV = nRT" },
      { id: "thermo-10", type: "multiple-choice", question: "What is kinetic theory?", options: [{ value: "a", text: "Relates macro and micro properties" }, { value: "b", text: "Average KE = (3/2)kT" }, { value: "c", text: "Temperature is molecular motion" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Kinetic theory relates macroscopic properties to molecular motion.", concept: "⟨KE⟩ = (3/2)kT" }
    ]
  },

  "cm-9": {
    id: "cm-9",
    title: "Gravitation",
    videoId: "7gf6YpdvtE0",
    feynmanNotes: "Newton's law of gravitation is universal - it governs the motion of apples and planets alike. Every particle attracts every other particle with a force proportional to their masses and inversely proportional to the square of the distance.",
    questions: [
      { id: "grav-1", type: "multiple-choice", question: "What is Newton's law of universal gravitation?", options: [{ value: "a", text: "F = Gm₁m₂/r²" }, { value: "b", text: "Force is attractive" }, { value: "c", text: "Applies to all masses" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Universal gravitation: F = Gm₁m₂/r² applies to all masses.", concept: "F = Gm₁m₂/r²" },
      { id: "grav-2", type: "multiple-choice", question: "What is gravitational field?", options: [{ value: "a", text: "g = GM/r²" }, { value: "b", text: "Force per unit mass" }, { value: "c", text: "Points toward mass" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Gravitational field g = GM/r² is force per unit mass.", concept: "g = GM/r²" },
      { id: "grav-3", type: "multiple-choice", question: "What is escape velocity?", options: [{ value: "a", text: "v = √(2GM/r)" }, { value: "b", text: "Minimum speed to escape gravity" }, { value: "c", text: "11.2 km/s for Earth" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Escape velocity v = √(2GM/r) is minimum speed to escape gravitational field.", concept: "v_escape = √(2GM/r)" },
      { id: "grav-4", type: "multiple-choice", question: "What are Kepler's laws?", options: [{ value: "a", text: "Elliptical orbits" }, { value: "b", text: "Equal areas in equal times" }, { value: "c", text: "T² ∝ r³" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Kepler's laws describe planetary motion: elliptical orbits, equal areas, and T² ∝ r³.", concept: "Kepler's three laws" },
      { id: "grav-5", type: "multiple-choice", question: "What is orbital velocity?", options: [{ value: "a", text: "v = √(GM/r)" }, { value: "b", text: "Speed needed for circular orbit" }, { value: "c", text: "Centripetal force equals gravity" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Orbital velocity v = √(GM/r) balances centripetal force with gravity.", concept: "v_orbit = √(GM/r)" },
      { id: "grav-6", type: "multiple-choice", question: "What is gravitational potential energy?", options: [{ value: "a", text: "U = -Gm₁m₂/r" }, { value: "b", text: "Negative because attractive" }, { value: "c", text: "Zero at infinite separation" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Gravitational PE: U = -Gm₁m₂/r, negative due to attractive force.", concept: "U = -Gm₁m₂/r" },
      { id: "grav-7", type: "multiple-choice", question: "What is tidal force?", options: [{ value: "a", text: "Differential gravity" }, { value: "b", text: "Stronger on closer side" }, { value: "c", text: "Causes ocean tides" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Tidal forces arise from gravitational gradients - stronger pull on closer parts.", concept: "Differential gravity" },
      { id: "grav-8", type: "multiple-choice", question: "What is weightlessness?", options: [{ value: "a", text: "Free fall condition" }, { value: "b", text: "No normal forces" }, { value: "c", text: "Gravity still present" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Weightlessness is free fall - gravity is present but no normal forces.", concept: "Free fall = weightless" },
      { id: "grav-9", type: "multiple-choice", question: "What is the gravitational constant G?", options: [{ value: "a", text: "6.67 × 10⁻¹¹ N⋅m²/kg²" }, { value: "b", text: "Universal constant" }, { value: "c", text: "Very small number" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "G = 6.67 × 10⁻¹¹ N⋅m²/kg² is the universal gravitational constant.", concept: "G = 6.67 × 10⁻¹¹" },
      { id: "grav-10", type: "multiple-choice", question: "What determines orbital period?", options: [{ value: "a", text: "Distance from central mass" }, { value: "b", text: "T² ∝ r³ (Kepler's 3rd law)" }, { value: "c", text: "Independent of satellite mass" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Orbital period depends only on distance: T² ∝ r³, independent of satellite mass.", concept: "T² ∝ r³" }
    ]
  },

  "cm-10": {
    id: "cm-10",
    title: "Circular Motion and Centripetal Force",
    videoId: "Cxqjyl74iu4",
    feynmanNotes: "When something moves in a circle, it's always accelerating toward the center. This centripetal acceleration requires a centripetal force - whether it's gravity keeping planets in orbit or tension in a string whirling a ball.",
    questions: [
      { id: "circ-1", type: "multiple-choice", question: "What is centripetal acceleration?", options: [{ value: "a", text: "a_c = v²/r" }, { value: "b", text: "Points toward center" }, { value: "c", text: "Required for circular motion" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Centripetal acceleration a_c = v²/r points toward the center and is required for circular motion.", concept: "a_c = v²/r" },
      { id: "circ-2", type: "multiple-choice", question: "What is centripetal force?", options: [{ value: "a", text: "F_c = ma_c = mv²/r" }, { value: "b", text: "Net force toward center" }, { value: "c", text: "Not a new type of force" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Centripetal force F_c = mv²/r is the net inward force required for circular motion.", concept: "F_c = mv²/r" },
      { id: "circ-3", type: "multiple-choice", question: "What provides centripetal force for a car on a flat curve?", options: [{ value: "a", text: "Friction between tires and road" }, { value: "b", text: "Normal force" }, { value: "c", text: "Weight" }, { value: "d", text: "Air resistance" }], correctAnswer: "a", explanation: "On a flat curve, friction between tires and road provides the centripetal force.", concept: "Friction provides F_c" },
      { id: "circ-4", type: "multiple-choice", question: "What is period in circular motion?", options: [{ value: "a", text: "T = 2πr/v" }, { value: "b", text: "Time for one complete revolution" }, { value: "c", text: "Related to frequency by T = 1/f" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Period T = 2πr/v is the time for one complete revolution.", concept: "T = 2πr/v" },
      { id: "circ-5", type: "multiple-choice", question: "What is angular velocity?", options: [{ value: "a", text: "ω = v/r" }, { value: "b", text: "ω = 2π/T" }, { value: "c", text: "Rate of angle change" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Angular velocity ω = v/r = 2π/T is the rate of angular change.", concept: "ω = v/r = 2π/T" },
      { id: "circ-6", type: "multiple-choice", question: "In vertical circular motion, where is tension maximum?", options: [{ value: "a", text: "At the top" }, { value: "b", text: "At the bottom" }, { value: "c", text: "On the sides" }, { value: "d", text: "Same everywhere" }], correctAnswer: "b", explanation: "At the bottom, tension must support weight AND provide centripetal force, so T = mg + mv²/r.", concept: "T_max at bottom" },
      { id: "circ-7", type: "multiple-choice", question: "What is banking of curves?", options: [{ value: "a", text: "Tilting the road inward" }, { value: "b", text: "Normal force component provides centripetal force" }, { value: "c", text: "Reduces reliance on friction" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Banking tilts the road so normal force components help provide centripetal force.", concept: "Banking helps F_c" },
      { id: "circ-8", type: "multiple-choice", question: "What is the conical pendulum?", options: [{ value: "a", text: "Pendulum moving in horizontal circle" }, { value: "b", text: "String makes cone shape" }, { value: "c", text: "Tension provides centripetal force component" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Conical pendulum moves in horizontal circles with tension providing centripetal force.", concept: "Horizontal circular pendulum" },
      { id: "circ-9", type: "multiple-choice", question: "What happens if centripetal force suddenly disappears?", options: [{ value: "a", text: "Object flies off tangentially" }, { value: "b", text: "Object continues in straight line" }, { value: "c", text: "Newton's first law applies" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Without centripetal force, objects move tangentially in straight lines (Newton's first law).", concept: "Tangential motion without F_c" },
      { id: "circ-10", type: "multiple-choice", question: "What is apparent weight in vertical circular motion?", options: [{ value: "a", text: "Varies with position" }, { value: "b", text: "Maximum at bottom" }, { value: "c", text: "Minimum at top" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Apparent weight varies in vertical circular motion - maximum at bottom, minimum at top.", concept: "Variable apparent weight" }
    ]
  },

  "cm-11": {
    id: "cm-11",
    title: "Simple Harmonic Motion",
    videoId: "bpqLTrB3jjw",
    feynmanNotes: "Simple harmonic motion is the most fundamental type of oscillation. It's everywhere - atoms vibrate, springs oscillate, pendulums swing. Understanding SHM is the key to understanding all periodic motion.",
    questions: [
      { id: "shm-1", type: "multiple-choice", question: "What defines simple harmonic motion?", options: [{ value: "a", text: "F = -kx restoring force" }, { value: "b", text: "Sinusoidal displacement" }, { value: "c", text: "Constant period" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "SHM is defined by F = -kx, producing sinusoidal motion with constant period.", concept: "F = -kx defines SHM" },
      { id: "shm-2", type: "multiple-choice", question: "What is the general solution for SHM?", options: [{ value: "a", text: "x(t) = A cos(ωt + φ)" }, { value: "b", text: "x(t) = A sin(ωt + φ)" }, { value: "c", text: "Both A and B" }, { value: "d", text: "x(t) = Ae^(ωt)" }], correctAnswer: "c", explanation: "SHM solution can be written as either cosine or sine: x(t) = A cos(ωt + φ).", concept: "x(t) = A cos(ωt + φ)" },
      { id: "shm-3", type: "multiple-choice", question: "What is the angular frequency?", options: [{ value: "a", text: "ω = √(k/m)" }, { value: "b", text: "ω = 2π/T" }, { value: "c", text: "ω = 2πf" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Angular frequency ω = √(k/m) = 2π/T = 2πf relates to spring constant and mass.", concept: "ω = √(k/m)" },
      { id: "shm-4", type: "multiple-choice", question: "What is the velocity in SHM?", options: [{ value: "a", text: "v(t) = -Aω sin(ωt + φ)" }, { value: "b", text: "v = dx/dt" }, { value: "c", text: "Maximum at equilibrium" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Velocity v(t) = -Aω sin(ωt + φ) is maximum at equilibrium position.", concept: "v = -Aω sin(ωt + φ)" },
      { id: "shm-5", type: "multiple-choice", question: "What is the acceleration in SHM?", options: [{ value: "a", text: "a(t) = -Aω² cos(ωt + φ)" }, { value: "b", text: "a = -ω²x" }, { value: "c", text: "Maximum at amplitude" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Acceleration a = -ω²x is maximum at amplitude, proportional to displacement.", concept: "a = -ω²x" },
      { id: "shm-6", type: "multiple-choice", question: "What is the total energy in SHM?", options: [{ value: "a", text: "E = ½kA²" }, { value: "b", text: "E = ½mω²A²" }, { value: "c", text: "Constant throughout motion" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Total energy E = ½kA² = ½mω²A² remains constant in SHM.", concept: "E = ½kA² = constant" },
      { id: "shm-7", type: "multiple-choice", question: "When is kinetic energy maximum in SHM?", options: [{ value: "a", text: "At equilibrium position" }, { value: "b", text: "When x = 0" }, { value: "c", text: "When velocity is maximum" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Kinetic energy is maximum at equilibrium where velocity is maximum.", concept: "KE_max at equilibrium" },
      { id: "shm-8", type: "multiple-choice", question: "When is potential energy maximum in SHM?", options: [{ value: "a", text: "At amplitude positions" }, { value: "b", text: "When x = ±A" }, { value: "c", text: "When velocity is zero" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Potential energy is maximum at amplitude where all energy is potential.", concept: "PE_max at amplitude" },
      { id: "shm-9", type: "multiple-choice", question: "What is phase in SHM?", options: [{ value: "a", text: "φ determines initial conditions" }, { value: "b", text: "Phase constant" }, { value: "c", text: "Shifts the wave in time" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Phase φ is determined by initial conditions and shifts the wave in time.", concept: "Phase φ from initial conditions" },
      { id: "shm-10", type: "multiple-choice", question: "What happens if you double the amplitude in SHM?", options: [{ value: "a", text: "Period stays the same" }, { value: "b", text: "Energy increases 4 times" }, { value: "c", text: "Maximum velocity doubles" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Doubling amplitude keeps period constant but quadruples energy and doubles max velocity.", concept: "Period independent of amplitude" }
    ]
  },

  "cm-12": {
    id: "cm-12",
    title: "Waves and Sound",
    videoId: "6SL4bgxLmXo",
    feynmanNotes: "A wave is a traveling disturbance. Sound waves are pressure oscillations that travel through air. Understanding waves helps us understand everything from music to earthquakes to light itself.",
    questions: [
      { id: "wave-1", type: "multiple-choice", question: "What is a mechanical wave?", options: [{ value: "a", text: "Requires a medium" }, { value: "b", text: "Transfers energy without transferring matter" }, { value: "c", text: "Sound waves are mechanical" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Mechanical waves require a medium and transfer energy without transferring matter.", concept: "Mechanical waves need medium" },
      { id: "wave-2", type: "multiple-choice", question: "What is the wave equation?", options: [{ value: "a", text: "v = fλ" }, { value: "b", text: "Speed = frequency × wavelength" }, { value: "c", text: "Universal for all waves" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "The wave equation v = fλ applies universally to all types of waves.", concept: "v = fλ universal" },
      { id: "wave-3", type: "multiple-choice", question: "What determines wave speed in a string?", options: [{ value: "a", text: "v = √(T/μ)" }, { value: "b", text: "Tension and mass density" }, { value: "c", text: "Independent of frequency" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Wave speed in strings: v = √(T/μ) depends on tension and mass per unit length.", concept: "v = √(T/μ) in strings" },
      { id: "wave-4", type: "multiple-choice", question: "What is sound?", options: [{ value: "a", text: "Longitudinal pressure waves" }, { value: "b", text: "Compressions and rarefactions" }, { value: "c", text: "Travels through air at ~343 m/s" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Sound consists of longitudinal pressure waves traveling at about 343 m/s in air.", concept: "Sound = pressure waves" },
      { id: "wave-5", type: "multiple-choice", question: "What is the Doppler effect?", options: [{ value: "a", text: "Frequency shift due to relative motion" }, { value: "b", text: "Higher pitch approaching, lower receding" }, { value: "c", text: "f' = f(v ± v_observer)/(v ± v_source)" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Doppler effect: frequency changes due to relative motion between source and observer.", concept: "Frequency shift from motion" },
      { id: "wave-6", type: "multiple-choice", question: "What is interference?", options: [{ value: "a", text: "Superposition of waves" }, { value: "b", text: "Can be constructive or destructive" }, { value: "c", text: "Produces standing wave patterns" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Wave interference is superposition, creating constructive or destructive patterns.", concept: "Wave superposition" },
      { id: "wave-7", type: "multiple-choice", question: "What is a standing wave?", options: [{ value: "a", text: "Interference of waves traveling in opposite directions" }, { value: "b", text: "Has nodes and antinodes" }, { value: "c", text: "Appears to stand still" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Standing waves form from interference, creating stationary patterns with nodes and antinodes.", concept: "Standing wave pattern" },
      { id: "wave-8", type: "multiple-choice", question: "What are harmonics?", options: [{ value: "a", text: "Resonant frequencies" }, { value: "b", text: "f_n = nf_1" }, { value: "c", text: "Create musical notes" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Harmonics are resonant frequencies f_n = nf_1 that create musical tones.", concept: "f_n = nf_1 harmonics" },
      { id: "wave-9", type: "multiple-choice", question: "What is resonance?", options: [{ value: "a", text: "Maximum amplitude at natural frequency" }, { value: "b", text: "Driving frequency matches natural frequency" }, { value: "c", text: "Can cause structural failure" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Resonance occurs when driving frequency matches natural frequency, causing large amplitudes.", concept: "Resonance at f_natural" },
      { id: "wave-10", type: "multiple-choice", question: "What is beat frequency?", options: [{ value: "a", text: "f_beat = |f_1 - f_2|" }, { value: "b", text: "Interference of two close frequencies" }, { value: "c", text: "Creates periodic amplitude variation" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Beats occur when two close frequencies interfere: f_beat = |f_1 - f_2|.", concept: "f_beat = |f_1 - f_2|" }
    ]
  },

  "cm-13": {
    id: "cm-13",
    title: "Elasticity and Stress",
    videoId: "KuXjwB4LzSA",
    feynmanNotes: "Materials deform when forces are applied. Understanding how materials respond to stress - whether they stretch, compress, or shear - is crucial for engineering and understanding the physical world.",
    questions: [
      { id: "elas-1", type: "multiple-choice", question: "What is stress?", options: [{ value: "a", text: "σ = F/A" }, { value: "b", text: "Force per unit area" }, { value: "c", text: "Measured in Pascals" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Stress σ = F/A is force per unit area, measured in Pascals.", concept: "σ = F/A" },
      { id: "elas-2", type: "multiple-choice", question: "What is strain?", options: [{ value: "a", text: "ε = ΔL/L₀" }, { value: "b", text: "Fractional change in dimension" }, { value: "c", text: "Dimensionless quantity" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Strain ε = ΔL/L₀ is the fractional change in length, dimensionless.", concept: "ε = ΔL/L₀" },
      { id: "elas-3", type: "multiple-choice", question: "What is Hooke's law?", options: [{ value: "a", text: "σ = Eε" }, { value: "b", text: "Stress proportional to strain" }, { value: "c", text: "Valid in elastic region" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Hooke's law σ = Eε states stress is proportional to strain in the elastic region.", concept: "σ = Eε (Hooke's law)" },
      { id: "elas-4", type: "multiple-choice", question: "What is Young's modulus?", options: [{ value: "a", text: "E = σ/ε" }, { value: "b", text: "Measure of stiffness" }, { value: "c", text: "Material property" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Young's modulus E = σ/ε measures material stiffness.", concept: "E = σ/ε stiffness" },
      { id: "elas-5", type: "multiple-choice", question: "What is the elastic limit?", options: [{ value: "a", text: "Maximum stress for elastic behavior" }, { value: "b", text: "Beyond this, permanent deformation" }, { value: "c", text: "Material won't return to original shape" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Elastic limit is maximum stress before permanent deformation occurs.", concept: "Elastic limit boundary" },
      { id: "elas-6", type: "multiple-choice", question: "What is the yield strength?", options: [{ value: "a", text: "Stress at which plastic deformation begins" }, { value: "b", text: "Often taken as 0.2% offset" }, { value: "c", text: "Important for engineering design" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Yield strength is the stress where significant plastic deformation begins.", concept: "Yield strength threshold" },
      { id: "elas-7", type: "multiple-choice", question: "What is ultimate tensile strength?", options: [{ value: "a", text: "Maximum stress before fracture" }, { value: "b", text: "Peak of stress-strain curve" }, { value: "c", text: "Material's breaking point" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Ultimate tensile strength is the maximum stress a material can withstand.", concept: "Maximum stress capacity" },
      { id: "elas-8", type: "multiple-choice", question: "What is Poisson's ratio?", options: [{ value: "a", text: "ν = -ε_lateral/ε_axial" }, { value: "b", text: "Ratio of lateral to axial strain" }, { value: "c", text: "Typically 0.2-0.5 for most materials" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Poisson's ratio ν relates lateral contraction to axial extension.", concept: "ν = lateral/axial strain ratio" },
      { id: "elas-9", type: "multiple-choice", question: "What is shear stress?", options: [{ value: "a", text: "τ = F_parallel/A" }, { value: "b", text: "Force parallel to surface" }, { value: "c", text: "Causes shape change" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Shear stress τ results from forces parallel to surfaces, changing shape.", concept: "τ = F_parallel/A" },
      { id: "elas-10", type: "multiple-choice", question: "What is bulk modulus?", options: [{ value: "a", text: "K = -ΔP/(ΔV/V₀)" }, { value: "b", text: "Resistance to volume change" }, { value: "c", text: "Inverse of compressibility" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Bulk modulus K measures resistance to uniform compression.", concept: "K = volume change resistance" }
    ]
  },

  "cm-14": {
    id: "cm-14",
    title: "Collisions and Center of Mass",
    videoId: "DfznnKUwywQ",
    feynmanNotes: "Collisions are nature's way of conserving momentum. Whether it's billiard balls colliding or galaxies merging, the total momentum before equals the total momentum after.",
    questions: [
      { id: "coll-1", type: "multiple-choice", question: "What is always conserved in collisions?", options: [{ value: "a", text: "Momentum" }, { value: "b", text: "Kinetic energy" }, { value: "c", text: "Potential energy" }, { value: "d", text: "Velocity" }], correctAnswer: "a", explanation: "Momentum is always conserved in collisions (assuming no external forces).", concept: "Momentum conservation" },
      { id: "coll-2", type: "multiple-choice", question: "What defines an elastic collision?", options: [{ value: "a", text: "Kinetic energy is conserved" }, { value: "b", text: "Objects don't stick together" }, { value: "c", text: "No energy lost to heat/sound" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Elastic collisions conserve both momentum and kinetic energy.", concept: "Elastic: KE conserved" },
      { id: "coll-3", type: "multiple-choice", question: "What defines an inelastic collision?", options: [{ value: "a", text: "Some kinetic energy is lost" }, { value: "b", text: "Momentum still conserved" }, { value: "c", text: "Energy goes to heat, sound, deformation" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Inelastic collisions conserve momentum but lose some kinetic energy.", concept: "Inelastic: KE lost" },
      { id: "coll-4", type: "multiple-choice", question: "What is a perfectly inelastic collision?", options: [{ value: "a", text: "Objects stick together after collision" }, { value: "b", text: "Maximum kinetic energy loss" }, { value: "c", text: "Same final velocity for both objects" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Perfectly inelastic: objects stick together with maximum energy loss.", concept: "Perfectly inelastic: stick together" },
      { id: "coll-5", type: "multiple-choice", question: "What is the center of mass?", options: [{ value: "a", text: "Balance point of system" }, { value: "b", text: "r_cm = Σm_i r_i / Σm_i" }, { value: "c", text: "Moves at constant velocity if no external forces" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Center of mass is the balance point that moves at constant velocity without external forces.", concept: "r_cm = Σm_i r_i / Σm_i" },
      { id: "coll-6", type: "multiple-choice", question: "What is the velocity of center of mass?", options: [{ value: "a", text: "v_cm = Σm_i v_i / Σm_i" }, { value: "b", text: "v_cm = p_total / M_total" }, { value: "c", text: "Constant if no external forces" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Center of mass velocity v_cm = p_total/M_total remains constant without external forces.", concept: "v_cm = p_total/M_total" },
      { id: "coll-7", type: "multiple-choice", question: "In a head-on elastic collision between equal masses, what happens?", options: [{ value: "a", text: "Velocities are exchanged" }, { value: "b", text: "Each object takes the other's velocity" }, { value: "c", text: "Kinetic energy is conserved" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Equal mass elastic collision: velocities are simply exchanged.", concept: "Equal mass: velocity exchange" },
      { id: "coll-8", type: "multiple-choice", question: "What is the coefficient of restitution?", options: [{ value: "a", text: "e = (v_2f - v_1f)/(v_1i - v_2i)" }, { value: "b", text: "Measures collision elasticity" }, { value: "c", text: "e = 1 for elastic, e = 0 for perfectly inelastic" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Coefficient of restitution e measures how elastic a collision is.", concept: "e = separation/approach speed" },
      { id: "coll-9", type: "multiple-choice", question: "What happens to center of mass during collision?", options: [{ value: "a", text: "Continues at constant velocity" }, { value: "b", text: "Unaffected by internal forces" }, { value: "c", text: "Only external forces can change its motion" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Center of mass motion is unaffected by internal collision forces.", concept: "CM unaffected by internal forces" },
      { id: "coll-10", type: "multiple-choice", question: "What is impulse in collision context?", options: [{ value: "a", text: "J = Δp = change in momentum" }, { value: "b", text: "J = F_avg Δt" }, { value: "c", text: "Large force over short time" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Impulse J = Δp = F_avg Δt represents the momentum change during collision.", concept: "J = Δp = F_avg Δt" }
    ]
  },

  "cm-15": {
    id: "cm-15",
    title: "Classical Mechanics Review",
    videoId: "WdHC-R-nHsc",
    feynmanNotes: "Classical mechanics is the foundation of physics. From Newton's laws to conservation principles, these concepts describe the motion of everything from baseballs to planets. Mastering these fundamentals opens the door to all of physics.",
    questions: [
      { id: "rev-1", type: "multiple-choice", question: "What are Newton's three laws?", options: [{ value: "a", text: "Inertia, F=ma, action-reaction" }, { value: "b", text: "Foundation of classical mechanics" }, { value: "c", text: "Apply to all macroscopic motion" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Newton's laws form the foundation of classical mechanics for macroscopic objects.", concept: "Three fundamental laws" },
      { id: "rev-2", type: "multiple-choice", question: "What quantities are conserved in physics?", options: [{ value: "a", text: "Energy, momentum, angular momentum" }, { value: "b", text: "Fundamental conservation laws" }, { value: "c", text: "Apply universally" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Energy, momentum, and angular momentum are fundamental conserved quantities.", concept: "Universal conservation laws" },
      { id: "rev-3", type: "multiple-choice", question: "What is the work-energy theorem?", options: [{ value: "a", text: "W_net = ΔKE" }, { value: "b", text: "Net work equals change in kinetic energy" }, { value: "c", text: "Connects force and energy" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Work-energy theorem: W_net = ΔKE connects force and energy concepts.", concept: "W_net = ΔKE" },
      { id: "rev-4", type: "multiple-choice", question: "What is mechanical energy conservation?", options: [{ value: "a", text: "E = KE + PE = constant" }, { value: "b", text: "Valid when only conservative forces act" }, { value: "c", text: "No friction or air resistance" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Mechanical energy E = KE + PE is conserved with only conservative forces.", concept: "E = KE + PE = constant" },
      { id: "rev-5", type: "multiple-choice", question: "What is the relationship between linear and rotational motion?", options: [{ value: "a", text: "v = rω, a = rα" }, { value: "b", text: "Analogous quantities" }, { value: "c", text: "Torque is rotational force" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Linear and rotational motion have analogous relationships: v = rω, τ = Iα.", concept: "Linear-rotational analogy" },
      { id: "rev-6", type: "multiple-choice", question: "What determines orbital motion?", options: [{ value: "a", text: "Gravitational force provides centripetal force" }, { value: "b", text: "mg = mv²/r for circular orbits" }, { value: "c", text: "Kepler's laws describe planetary motion" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Orbital motion results from gravitational centripetal force, following Kepler's laws.", concept: "Gravity provides centripetal force" },
      { id: "rev-7", type: "multiple-choice", question: "What characterizes simple harmonic motion?", options: [{ value: "a", text: "F = -kx restoring force" }, { value: "b", text: "Sinusoidal motion" }, { value: "c", text: "Period T = 2π√(m/k)" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "SHM has F = -kx restoring force producing sinusoidal motion with period T = 2π√(m/k).", concept: "F = -kx produces SHM" },
      { id: "rev-8", type: "multiple-choice", question: "What describes wave motion?", options: [{ value: "a", text: "v = fλ wave equation" }, { value: "b", text: "Energy transfer without matter transfer" }, { value: "c", text: "Interference and superposition" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Waves transfer energy via v = fλ relation and exhibit interference.", concept: "v = fλ energy transfer" },
      { id: "rev-9", type: "multiple-choice", question: "What are the limits of classical mechanics?", options: [{ value: "a", text: "Breaks down at very high speeds (relativity)" }, { value: "b", text: "Breaks down at atomic scales (quantum)" }, { value: "c", text: "Excellent for everyday phenomena" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Classical mechanics works excellently for everyday scales but fails at relativistic speeds and quantum scales.", concept: "Classical limits" },
      { id: "rev-10", type: "multiple-choice", question: "Why is classical mechanics important?", options: [{ value: "a", text: "Foundation for all physics" }, { value: "b", text: "Essential for engineering" }, { value: "c", text: "Describes macroscopic world accurately" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Classical mechanics is the foundation of physics and engineering, accurately describing our macroscopic world.", concept: "Foundation of physics" }
    ]
  }
};

// ALL 10 General Relativity Lessons
export const allGeneralRelativityLessons: Record<string, LessonData> = {
  "rel-2": {
    id: "rel-2",
    title: "Spacetime and Gravity",
    videoId: "NblR01hHK6U",
    feynmanNotes: "Einstein's greatest insight was that gravity is not a force - it's the curvature of spacetime itself. Mass tells spacetime how to curve, and curved spacetime tells mass how to move.",
    questions: [
      { id: "st-1", type: "multiple-choice", question: "What is spacetime?", options: [{ value: "a", text: "Unified space and time" }, { value: "b", text: "4-dimensional continuum" }, { value: "c", text: "Can be curved by mass" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Spacetime is the 4D continuum of space and time that can be curved by mass-energy.", concept: "4D spacetime continuum" },
      { id: "st-2", type: "multiple-choice", question: "What causes gravity in general relativity?", options: [{ value: "a", text: "Curved spacetime" }, { value: "b", text: "Mass-energy curves spacetime" }, { value: "c", text: "Objects follow geodesics" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Gravity is the effect of mass-energy curving spacetime, with objects following geodesics.", concept: "Gravity = curved spacetime" },
      { id: "st-3", type: "multiple-choice", question: "What is the equivalence principle?", options: [{ value: "a", text: "Acceleration equivalent to gravity" }, { value: "b", text: "No experiment can distinguish uniform acceleration from gravity" }, { value: "c", text: "Basis of general relativity" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Equivalence principle: acceleration is locally indistinguishable from gravity.", concept: "Acceleration ≡ gravity" },
      { id: "st-4", type: "multiple-choice", question: "What is a geodesic?", options: [{ value: "a", text: "Shortest path in curved spacetime" }, { value: "b", text: "Path of freely falling objects" }, { value: "c", text: "Straight line in flat spacetime" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Geodesics are the shortest paths in curved spacetime, followed by freely falling objects.", concept: "Geodesic = shortest path" },
      { id: "st-5", type: "multiple-choice", question: "What is gravitational time dilation?", options: [{ value: "a", text: "Time runs slower in stronger gravity" }, { value: "b", text: "Clocks run slower deeper in gravitational wells" }, { value: "c", text: "Confirmed by GPS satellites" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Time dilation: clocks run slower in stronger gravitational fields.", concept: "Stronger gravity = slower time" },
      { id: "st-6", type: "multiple-choice", question: "What is gravitational redshift?", options: [{ value: "a", text: "Light loses energy climbing out of gravity wells" }, { value: "b", text: "Frequency decreases, wavelength increases" }, { value: "c", text: "Observable in white dwarf stars" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Gravitational redshift: light loses energy escaping gravitational fields.", concept: "Light redshifted by gravity" },
      { id: "st-7", type: "multiple-choice", question: "What is the metric tensor?", options: [{ value: "a", text: "Describes spacetime geometry" }, { value: "b", text: "Determines distances and angles" }, { value: "c", text: "Contains gravitational field information" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "The metric tensor describes spacetime geometry and gravitational fields.", concept: "Metric describes geometry" },
      { id: "st-8", type: "multiple-choice", question: "What are Einstein's field equations?", options: [{ value: "a", text: "G_μν = 8πT_μν" }, { value: "b", text: "Relate spacetime curvature to matter" }, { value: "c", text: "Foundation of general relativity" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Einstein's field equations relate spacetime curvature to matter-energy content.", concept: "G_μν = 8πT_μν" },
      { id: "st-9", type: "multiple-choice", question: "What is frame dragging?", options: [{ value: "a", text: "Rotating mass drags spacetime" }, { value: "b", text: "Lense-Thirring effect" }, { value: "c", text: "Measured by Gravity Probe B" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Frame dragging: rotating mass drags spacetime around with it.", concept: "Rotation drags spacetime" },
      { id: "st-10", type: "multiple-choice", question: "What is tidal force?", options: [{ value: "a", text: "Differential gravitational force" }, { value: "b", text: "Stretches objects radially" }, { value: "c", text: "Compresses objects tangentially" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Tidal forces arise from gravitational field gradients, stretching objects.", concept: "Differential gravity" }
    ]
  },

  "rel-3": {
    id: "rel-3",
    title: "Black Holes",
    videoId: "Rh0pYhMvxfQ",
    feynmanNotes: "Black holes are regions where gravity is so strong that nothing, not even light, can escape. They represent the most extreme curvature of spacetime possible in our universe.",
    questions: [
      { id: "bh-1", type: "multiple-choice", question: "What is the event horizon?", options: [{ value: "a", text: "Point of no return" }, { value: "b", text: "Where escape velocity equals light speed" }, { value: "c", text: "Schwarzschild radius" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Event horizon is the point of no return where escape velocity equals the speed of light.", concept: "Event horizon boundary" },
      { id: "bh-2", type: "multiple-choice", question: "What is the Schwarzschild radius?", options: [{ value: "a", text: "r_s = 2GM/c²" }, { value: "b", text: "Radius of event horizon" }, { value: "c", text: "Depends only on mass" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Schwarzschild radius r_s = 2GM/c² defines the event horizon size.", concept: "r_s = 2GM/c²" },
      { id: "bh-3", type: "multiple-choice", question: "What is gravitational time dilation near black holes?", options: [{ value: "a", text: "Time runs slower closer to black hole" }, { value: "b", text: "Approaches zero at event horizon" }, { value: "c", text: "Observer dependent" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Time dilation increases dramatically near black holes, approaching zero at the horizon.", concept: "Extreme time dilation" },
      { id: "bh-4", type: "multiple-choice", question: "What is spaghettification?", options: [{ value: "a", text: "Stretching due to tidal forces" }, { value: "b", text: "Feet experience stronger gravity than head" }, { value: "c", text: "Eventually tears objects apart" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Spaghettification occurs due to extreme tidal forces stretching objects radially.", concept: "Tidal stretching" },
      { id: "bh-5", type: "multiple-choice", question: "What is Hawking radiation?", options: [{ value: "a", text: "Black holes emit radiation" }, { value: "b", text: "Temperature inversely proportional to mass" }, { value: "c", text: "Causes black hole evaporation" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Hawking radiation causes black holes to slowly evaporate, with smaller holes being hotter.", concept: "Black hole evaporation" },
      { id: "bh-6", type: "multiple-choice", question: "What types of black holes exist?", options: [{ value: "a", text: "Stellar mass (3-20 solar masses)" }, { value: "b", text: "Supermassive (millions to billions solar masses)" }, { value: "c", text: "Primordial (theoretical)" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Black holes range from stellar mass to supermassive, with theoretical primordial types.", concept: "Black hole categories" },
      { id: "bh-7", type: "multiple-choice", question: "What is the information paradox?", options: [{ value: "a", text: "Information seems lost in black holes" }, { value: "b", text: "Conflicts with quantum mechanics" }, { value: "c", text: "Still unsolved problem" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Information paradox: black holes seem to destroy information, violating quantum mechanics.", concept: "Information loss problem" },
      { id: "bh-8", type: "multiple-choice", question: "What is the ergosphere?", options: [{ value: "a", text: "Region outside spinning black hole" }, { value: "b", text: "Spacetime dragged around" }, { value: "c", text: "Objects must rotate with black hole" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Ergosphere is the region where rotating black holes drag spacetime around.", concept: "Frame dragging region" },
      { id: "bh-9", type: "multiple-choice", question: "How are black holes detected?", options: [{ value: "a", text: "X-ray emission from accretion disk" }, { value: "b", text: "Gravitational effects on nearby stars" }, { value: "c", text: "Gravitational waves from mergers" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Black holes detected through X-rays, gravitational effects, and gravitational waves.", concept: "Indirect detection methods" },
      { id: "bh-10", type: "multiple-choice", question: "What is the no-hair theorem?", options: [{ value: "a", text: "Black holes characterized by only 3 properties" }, { value: "b", text: "Mass, charge, and angular momentum" }, { value: "c", text: "All other information erased" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "No-hair theorem: black holes characterized only by mass, charge, and spin.", concept: "Only 3 properties survive" }
    ]
  },

  "rel-4": {
    id: "rel-4",
    title: "Gravitational Waves",
    videoId: "foRPKAKZWx8",
    feynmanNotes: "Gravitational waves are ripples in spacetime itself. When massive objects accelerate, they create waves that travel at the speed of light, carrying energy away and slightly stretching and compressing space as they pass.",
    questions: [
      { id: "gw-1", type: "multiple-choice", question: "What are gravitational waves?", options: [{ value: "a", text: "Ripples in spacetime" }, { value: "b", text: "Travel at speed of light" }, { value: "c", text: "Produced by accelerating masses" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Gravitational waves are spacetime ripples from accelerating masses, traveling at light speed.", concept: "Spacetime ripples" },
      { id: "gw-2", type: "multiple-choice", question: "What produces strong gravitational waves?", options: [{ value: "a", text: "Binary black hole mergers" }, { value: "b", text: "Neutron star collisions" }, { value: "c", text: "Asymmetric supernovae" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Strong gravitational waves come from extreme events like black hole mergers and neutron star collisions.", concept: "Extreme mass accelerations" },
      { id: "gw-3", type: "multiple-choice", question: "How do gravitational waves affect space?", options: [{ value: "a", text: "Stretch space in one direction" }, { value: "b", text: "Compress space in perpendicular direction" }, { value: "c", text: "Quadrupole pattern" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Gravitational waves create quadrupole distortions, stretching and compressing space perpendicular directions.", concept: "Quadrupole distortion" },
      { id: "gw-4", type: "multiple-choice", question: "What is LIGO?", options: [{ value: "a", text: "Laser Interferometer Gravitational-Wave Observatory" }, { value: "b", text: "Uses laser interferometry" }, { value: "c", text: "First to detect gravitational waves" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "LIGO uses laser interferometry and made the first direct gravitational wave detection in 2015.", concept: "Laser interferometry detection" },
      { id: "gw-5", type: "multiple-choice", question: "Why are gravitational waves hard to detect?", options: [{ value: "a", text: "Extremely small amplitude" }, { value: "b", text: "Strain ~ 10^-21" }, { value: "c", text: "Smaller than 1/10000 proton width" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Gravitational waves cause incredibly tiny distortions, smaller than 1/10000 of a proton width.", concept: "Incredibly small effects" },
      { id: "gw-6", type: "multiple-choice", question: "What was GW150914?", options: [{ value: "a", text: "First gravitational wave detection" }, { value: "b", text: "Binary black hole merger" }, { value: "c", text: "Confirmed Einstein's prediction" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "GW150914 was the first detected gravitational wave from a binary black hole merger, confirming Einstein.", concept: "Historic first detection" },
      { id: "gw-7", type: "multiple-choice", question: "What do gravitational waves tell us?", options: [{ value: "a", text: "Properties of merging objects" }, { value: "b", text: "Test general relativity in strong fields" }, { value: "c", text: "New window on the universe" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Gravitational waves reveal object properties, test relativity, and open new astronomical observations.", concept: "New astronomy window" },
      { id: "gw-8", type: "multiple-choice", question: "What is the chirp signal?", options: [{ value: "a", text: "Frequency increases as objects spiral in" }, { value: "b", text: "Characteristic of inspiraling binaries" }, { value: "c", text: "Ends at merger" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Chirp signals show increasing frequency as binary objects spiral inward before merging.", concept: "Inspiraling frequency sweep" },
      { id: "gw-9", type: "multiple-choice", question: "What is multi-messenger astronomy?", options: [{ value: "a", text: "Gravitational waves + electromagnetic waves" }, { value: "b", text: "Neutron star merger observations" }, { value: "c", text: "Confirms source properties" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Multi-messenger astronomy combines gravitational waves with light to study cosmic events.", concept: "Combined observations" },
      { id: "gw-10", type: "multiple-choice", question: "What future gravitational wave detectors exist?", options: [{ value: "a", text: "Space-based LISA" }, { value: "b", text: "More sensitive ground detectors" }, { value: "c", text: "Different frequency ranges" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Future detectors like LISA will observe different frequencies and be more sensitive.", concept: "Next generation detectors" }
    ]
  },

  "rel-5": {
    id: "rel-5",
    title: "Cosmology and Big Bang",
    videoId: "FMlPSGe9q2k",
    feynmanNotes: "The universe is expanding, and if we run the clock backward, everything was once compressed into an incredibly hot, dense state. The Big Bang theory explains how our universe evolved from this beginning.",
    questions: [
      { id: "cos-1", type: "multiple-choice", question: "What is Hubble's Law?", options: [{ value: "a", text: "v = H₀d" }, { value: "b", text: "Galaxies recede proportional to distance" }, { value: "c", text: "Evidence for expanding universe" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Hubble's Law v = H₀d shows galaxies recede faster at greater distances.", concept: "Universal expansion" },
      { id: "cos-2", type: "multiple-choice", question: "What is cosmic microwave background?", options: [{ value: "a", text: "Afterglow of Big Bang" }, { value: "b", text: "2.7K temperature radiation" }, { value: "c", text: "Fills entire universe" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "CMB is the 2.7K afterglow radiation from the Big Bang filling the universe.", concept: "Big Bang remnant" },
      { id: "cos-3", type: "multiple-choice", question: "What is dark matter?", options: [{ value: "a", text: "About 27% of universe" }, { value: "b", text: "Doesn't interact electromagnetically" }, { value: "c", text: "Only detectable through gravity" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Dark matter is invisible matter detected only through gravitational effects.", concept: "Invisible matter" },
      { id: "cos-4", type: "multiple-choice", question: "What is dark energy?", options: [{ value: "a", text: "About 68% of universe" }, { value: "b", text: "Causes accelerating expansion" }, { value: "c", text: "Nature unknown" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Dark energy dominates the universe and drives accelerating expansion.", concept: "Mysterious acceleration" },
      { id: "cos-5", type: "multiple-choice", question: "What happened in the first 3 minutes?", options: [{ value: "a", text: "Big Bang nucleosynthesis" }, { value: "b", text: "Hydrogen and helium formed" }, { value: "c", text: "Temperature dropped enough for nuclei" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "First 3 minutes saw nucleosynthesis creating light elements.", concept: "Primordial nucleosynthesis" },
      { id: "cos-6", type: "multiple-choice", question: "What is cosmic inflation?", options: [{ value: "a", text: "Rapid expansion in first fraction of second" }, { value: "b", text: "Explains flatness and horizon problems" }, { value: "c", text: "Stretches quantum fluctuations" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Inflation is rapid early expansion explaining universe's large-scale properties.", concept: "Early rapid expansion" },
      { id: "cos-7", type: "multiple-choice", question: "What is redshift?", options: [{ value: "a", text: "Light wavelength increases" }, { value: "b", text: "Due to expanding space" }, { value: "c", text: "Measures recession velocity" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Redshift occurs when expanding space stretches light wavelengths.", concept: "Cosmological redshift" },
      { id: "cos-8", type: "multiple-choice", question: "What determines universe's fate?", options: [{ value: "a", text: "Total matter and energy density" }, { value: "b", text: "Critical density comparison" }, { value: "c", text: "Dark energy behavior" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Universe's fate depends on total density and dark energy behavior.", concept: "Cosmic destiny" },
      { id: "cos-9", type: "multiple-choice", question: "What is the age of the universe?", options: [{ value: "a", text: "13.8 billion years" }, { value: "b", text: "Determined from Hubble constant" }, { value: "c", text: "Confirmed by CMB observations" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Universe is 13.8 billion years old based on multiple observations.", concept: "Cosmic age" },
      { id: "cos-10", type: "multiple-choice", question: "What is the observable universe?", options: [{ value: "a", text: "Region we can see" }, { value: "b", text: "Limited by light travel time" }, { value: "c", text: "About 46 billion light-years radius" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Observable universe is the region from which light has had time to reach us.", concept: "Observable horizon" }
    ]
  }
};

// ALL 12 Quantum Mechanics Lessons  
export const allQuantumMechanicsLessons: Record<string, LessonData> = {
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
      },
      {
        id: "qm-1-2", type: "multiple-choice",
        question: "What is a photon?",
        options: [
          { value: "a", text: "A unit of light energy" },
          { value: "b", text: "A quantum of electromagnetic radiation" },
          { value: "c", text: "A particle of light" },
          { value: "d", text: "All of the above" }
        ],
        correctAnswer: "d",
        explanation: "A photon is a quantum (discrete unit) of electromagnetic radiation, representing both the particle nature of light and its energy.",
        concept: "Photon = light quantum"
      },
      {
        id: "qm-1-3", type: "multiple-choice",
        question: "What is Planck's constant?",
        options: [
          { value: "a", text: "h = 6.63 × 10⁻³⁴ J⋅s" },
          { value: "b", text: "h = 6.63 × 10⁻²⁴ J⋅s" },
          { value: "c", text: "h = 6.63 × 10⁻¹⁴ J⋅s" },
          { value: "d", text: "h = 6.63 × 10⁻⁴ J⋅s" }
        ],
        correctAnswer: "a",
        explanation: "Planck's constant h = 6.63 × 10⁻³⁴ J⋅s is the fundamental constant that relates energy to frequency in quantum mechanics.",
        concept: "h = 6.63 × 10⁻³⁴ J⋅s"
      },
      {
        id: "qm-1-4", type: "multiple-choice",
        question: "What is the energy of a photon?",
        options: [
          { value: "a", text: "E = hf" },
          { value: "b", text: "E = mc²" },
          { value: "c", text: "E = ½mv²" },
          { value: "d", text: "E = mgh" }
        ],
        correctAnswer: "a",
        explanation: "The energy of a photon is E = hf, where h is Planck's constant and f is the frequency.",
        concept: "E = hf = hc/λ"
      },
      {
        id: "qm-1-5", type: "multiple-choice",
        question: "What is de Broglie wavelength?",
        options: [
          { value: "a", text: "λ = h/p" },
          { value: "b", text: "λ = h/m" },
          { value: "c", text: "λ = h/v" },
          { value: "d", text: "λ = h/E" }
        ],
        correctAnswer: "a",
        explanation: "De Broglie wavelength λ = h/p shows that all matter has wave properties, where p is momentum.",
        concept: "λ = h/p (matter waves)"
      },
      {
        id: "qm-1-6", type: "multiple-choice",
        question: "What is the photoelectric effect?",
        options: [
          { value: "a", text: "Light creating electricity" },
          { value: "b", text: "Electrons being emitted when light hits a material" },
          { value: "c", text: "Light bending around objects" },
          { value: "d", text: "Light changing color" }
        ],
        correctAnswer: "b",
        explanation: "The photoelectric effect is the emission of electrons from a material when light of sufficient frequency strikes it.",
        concept: "Light ejects electrons"
      },
      {
        id: "qm-1-7", type: "multiple-choice",
        question: "What is the work function?",
        options: [
          { value: "a", text: "The minimum energy needed to remove an electron" },
          { value: "b", text: "The maximum energy of an electron" },
          { value: "c", text: "The kinetic energy of an electron" },
          { value: "d", text: "The potential energy of an electron" }
        ],
        correctAnswer: "a",
        explanation: "The work function is the minimum energy required to remove an electron from a material's surface.",
        concept: "Work function = minimum removal energy"
      },
      {
        id: "qm-1-8", type: "multiple-choice",
        question: "What is quantization?",
        options: [
          { value: "a", text: "Energy comes in discrete packets" },
          { value: "b", text: "Energy is continuous" },
          { value: "c", text: "Energy is always zero" },
          { value: "d", text: "Energy is infinite" }
        ],
        correctAnswer: "a",
        explanation: "Quantization means that certain quantities like energy come in discrete, indivisible packets called quanta.",
        concept: "Energy = discrete packets"
      },
      {
        id: "qm-1-9", type: "multiple-choice",
        question: "What happens when you observe a quantum system?",
        options: [
          { value: "a", text: "Nothing changes" },
          { value: "b", text: "The wave function collapses" },
          { value: "c", text: "The system disappears" },
          { value: "d", text: "Time stops" }
        ],
        correctAnswer: "b",
        explanation: "Quantum measurement causes the wave function to collapse, forcing the system into a definite state.",
        concept: "Measurement causes collapse"
      },
      {
        id: "qm-1-10", type: "multiple-choice",
        question: "What is interference in quantum mechanics?",
        options: [
          { value: "a", text: "Particles colliding" },
          { value: "b", text: "Wave functions adding constructively or destructively" },
          { value: "c", text: "Electrons repelling" },
          { value: "d", text: "Atoms bonding" }
        ],
        correctAnswer: "b",
        explanation: "Quantum interference occurs when wave functions add together, creating constructive or destructive interference patterns.",
        concept: "Wave functions interfere"
      },
      {
        id: "qm-1-11", type: "multiple-choice",
        question: "What is the complementarity principle?",
        options: [
          { value: "a", text: "Wave and particle properties are complementary" },
          { value: "b", text: "All particles are the same" },
          { value: "c", text: "Energy and matter are equivalent" },
          { value: "d", text: "Space and time are linked" }
        ],
        correctAnswer: "a",
        explanation: "Complementarity states that wave and particle properties are complementary aspects of quantum objects - both needed for complete description.",
        concept: "Wave and particle aspects are complementary"
      },
      {
        id: "qm-1-12", type: "multiple-choice",
        question: "What determines which slit an electron goes through in the double-slit experiment?",
        options: [
          { value: "a", text: "The electron's speed" },
          { value: "b", text: "The electron's charge" },
          { value: "c", text: "Whether or not you measure it" },
          { value: "d", text: "The size of the slits" }
        ],
        correctAnswer: "c",
        explanation: "If you don't measure which slit, the electron goes through both slits simultaneously. If you do measure, it goes through one specific slit.",
        concept: "Measurement determines path"
      }
    ]
  },

  "qm-2": {
    id: "qm-2",
    title: "The Schrödinger Equation",
    videoId: "p7bzE_R6DxU",
    feynmanNotes: "The Schrödinger equation is the fundamental equation of quantum mechanics. It tells us how quantum states evolve in time, but it can only predict probabilities, never certainties.",
    questions: [
      { id: "sch-1", type: "multiple-choice", question: "What is the time-dependent Schrödinger equation?", options: [{ value: "a", text: "iℏ ∂ψ/∂t = Ĥψ" }, { value: "b", text: "Describes quantum evolution" }, { value: "c", text: "ψ is the wave function" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "The Schrödinger equation iℏ ∂ψ/∂t = Ĥψ describes how quantum systems evolve.", concept: "iℏ ∂ψ/∂t = Ĥψ" },
      { id: "sch-2", type: "multiple-choice", question: "What is the wave function?", options: [{ value: "a", text: "ψ(x,t) contains all quantum information" }, { value: "b", text: "|ψ|² gives probability density" }, { value: "c", text: "Must be normalized" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "The wave function ψ contains all quantum information, with |ψ|² giving probabilities.", concept: "|ψ|² = probability density" },
      { id: "sch-3", type: "multiple-choice", question: "What is the Hamiltonian operator?", options: [{ value: "a", text: "Ĥ = total energy operator" }, { value: "b", text: "Ĥ = T̂ + V̂" }, { value: "c", text: "Determines time evolution" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "The Hamiltonian Ĥ = T̂ + V̂ is the total energy operator.", concept: "Ĥ = T̂ + V̂" },
      { id: "sch-4", type: "multiple-choice", question: "What is the momentum operator?", options: [{ value: "a", text: "p̂ = -iℏ ∂/∂x" }, { value: "b", text: "Derivative with imaginary coefficient" }, { value: "c", text: "Non-commuting with position" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "The momentum operator p̂ = -iℏ ∂/∂x doesn't commute with position.", concept: "p̂ = -iℏ ∂/∂x" },
      { id: "sch-5", type: "multiple-choice", question: "What is the uncertainty principle?", options: [{ value: "a", text: "Δx Δp ≥ ℏ/2" }, { value: "b", text: "Cannot know position and momentum exactly" }, { value: "c", text: "Fundamental limit, not measurement error" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Uncertainty principle: Δx Δp ≥ ℏ/2 is a fundamental quantum limit.", concept: "Δx Δp ≥ ℏ/2" },
      { id: "sch-6", type: "multiple-choice", question: "What is quantum tunneling?", options: [{ value: "a", text: "Particles can pass through barriers" }, { value: "b", text: "Classically forbidden process" }, { value: "c", text: "Probability decreases exponentially with barrier thickness" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Quantum tunneling allows particles to pass through classically forbidden barriers.", concept: "Tunneling through barriers" },
      { id: "sch-7", type: "multiple-choice", question: "What is a quantum state?", options: [{ value: "a", text: "Complete description of quantum system" }, { value: "b", text: "Superposition of basis states" }, { value: "c", text: "Collapses upon measurement" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Quantum states completely describe systems and can exist in superposition.", concept: "Superposition of states" },
      { id: "sch-8", type: "multiple-choice", question: "What is the Born rule?", options: [{ value: "a", text: "P = |⟨φ|ψ⟩|²" }, { value: "b", text: "Probability of measuring state φ in system ψ" }, { value: "c", text: "Links quantum math to observations" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Born rule gives probabilities: P = |⟨φ|ψ⟩|² for measuring φ in state ψ.", concept: "P = |⟨φ|ψ⟩|²" },
      { id: "sch-9", type: "multiple-choice", question: "What is eigenvalue equation?", options: [{ value: "a", text: "Âψ = aψ" }, { value: "b", text: "a is the eigenvalue" }, { value: "c", text: "ψ is the eigenstate" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Eigenvalue equation Âψ = aψ gives measurable values a.", concept: "Âψ = aψ" },
      { id: "sch-10", type: "multiple-choice", question: "What is the correspondence principle?", options: [{ value: "a", text: "Quantum mechanics → classical mechanics" }, { value: "b", text: "Valid in limit ℏ → 0" }, { value: "c", text: "Large quantum numbers give classical behavior" }, { value: "d", text: "All of the above" }], correctAnswer: "d", explanation: "Correspondence principle: quantum mechanics reduces to classical in appropriate limits.", concept: "Quantum → classical limit" }
    ]
  }
};

export function getAllLessonData(lessonId: string): LessonData | null {
  // Check all lesson collections
  if (lessonId.startsWith("cm-")) {
    return allClassicalMechanicsLessons[lessonId] || null;
  } else if (lessonId.startsWith("rel-")) {
    return allGeneralRelativityLessons[lessonId] || null;
  } else if (lessonId.startsWith("qm-")) {
    return allQuantumMechanicsLessons[lessonId] || null;
  }
  return null;
}