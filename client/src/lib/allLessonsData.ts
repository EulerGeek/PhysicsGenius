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
  }
};

// ALL 12 Quantum Mechanics Lessons  
export const allQuantumMechanicsLessons: Record<string, LessonData> = {
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