import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCw, Zap, Waves, Atom } from 'lucide-react';

interface Visual3DCourse {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  concepts: Visual3DConcept[];
  category: 'mechanics' | 'waves' | 'electricity' | 'quantum' | 'relativity';
}

interface Visual3DConcept {
  id: string;
  title: string;
  description: string;
  visualization: 'pendulum' | 'wave' | 'orbit' | 'field' | 'particle' | 'spring' | 'collision' | 'fluid' | 'spacetime' | 'blackhole' | 'gravity_waves';
  parameters: Record<string, number>;
  explanation: string;
}

interface Visual3DCoursesProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (courseId: string, score: number) => void;
}

export default function Visual3DCourses({ isOpen, onClose, onComplete }: Visual3DCoursesProps) {
  const [selectedCourse, setSelectedCourse] = useState<Visual3DCourse | null>(null);
  const [currentConcept, setCurrentConcept] = useState<Visual3DConcept | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState([1]);
  const [parameters, setParameters] = useState<Record<string, number>>({});
  const [time, setTime] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  const visual3DCourses: Visual3DCourse[] = [
    {
      id: 'classical-mechanics-3d',
      title: 'Classical Mechanics in 3D',
      description: 'Visualize forces, motion, and energy in three dimensions',
      icon: <RotateCw className="w-6 h-6" />,
      difficulty: 'Beginner',
      duration: '45 min',
      category: 'mechanics',
      concepts: [
        {
          id: 'pendulum',
          title: 'Simple Pendulum',
          description: 'Watch how gravity creates oscillatory motion',
          visualization: 'pendulum',
          parameters: { length: 1, mass: 1, gravity: 9.8, angle: 30 },
          explanation: 'A pendulum demonstrates the conversion between potential and kinetic energy. The restoring force is F = -mg sin(θ), creating simple harmonic motion for small angles.'
        },
        {
          id: 'orbital-motion',
          title: 'Orbital Mechanics',
          description: 'See how objects orbit under gravitational force',
          visualization: 'orbit',
          parameters: { mass1: 100, mass2: 1, distance: 5, velocity: 2 },
          explanation: 'Orbital motion occurs when the gravitational force provides the centripetal force needed for circular motion: F = GMm/r² = mv²/r'
        },
        {
          id: 'spring-system',
          title: 'Spring Oscillations',
          description: 'Explore Hooke\'s law and elastic potential energy',
          visualization: 'spring',
          parameters: { springConstant: 10, mass: 1, amplitude: 2, damping: 0.1 },
          explanation: 'Springs follow Hooke\'s law F = -kx. The system oscillates with frequency ω = √(k/m), converting between kinetic and elastic potential energy.'
        }
      ]
    },
    {
      id: 'wave-physics-3d',
      title: 'Wave Physics Visualization',
      description: 'Experience waves, interference, and wave phenomena',
      icon: <Waves className="w-6 h-6" />,
      difficulty: 'Intermediate',
      duration: '60 min',
      category: 'waves',
      concepts: [
        {
          id: 'wave-propagation',
          title: 'Wave Propagation',
          description: 'See how waves carry energy through space',
          visualization: 'wave',
          parameters: { frequency: 2, amplitude: 1, wavelength: 3, speed: 6 },
          explanation: 'Waves propagate with v = fλ, where v is speed, f is frequency, and λ is wavelength. Energy travels without matter transport.'
        }
      ]
    },
    {
      id: 'electromagnetic-3d',
      title: 'Electromagnetic Fields',
      description: 'Visualize electric and magnetic field interactions',
      icon: <Zap className="w-6 h-6" />,
      difficulty: 'Advanced',
      duration: '75 min',
      category: 'electricity',
      concepts: [
        {
          id: 'electric-field',
          title: 'Electric Field Visualization',
          description: 'See how charges create electric fields in space',
          visualization: 'field',
          parameters: { charge1: 1, charge2: -1, separation: 4 },
          explanation: 'Electric fields E = F/q represent the force per unit charge. Field lines show direction and strength of the electric field.'
        }
      ]
    },
    {
      id: 'quantum-visualization',
      title: 'Quantum Mechanics Concepts',
      description: 'Explore quantum phenomena through visual representations',
      icon: <Atom className="w-6 h-6" />,
      difficulty: 'Advanced',
      duration: '90 min',
      category: 'quantum',
      concepts: [
        {
          id: 'particle-wave',
          title: 'Wave-Particle Duality',
          description: 'Visualize the quantum nature of matter and energy',
          visualization: 'particle',
          parameters: { energy: 5, momentum: 2, wavelength: 1 },
          explanation: 'Quantum objects exhibit both wave and particle properties. De Broglie wavelength λ = h/p relates particle momentum to wave properties.'
        }
      ]
    },

    // NEW: Amazing General Relativity Course with spectacular visualizations!
    {
      id: 'relativity',
      title: 'General Relativity Visualizations',
      description: 'Experience Einstein\'s revolutionary insights with stunning spacetime visualizations',
      icon: <Atom className="w-6 h-6" />,
      difficulty: 'Advanced' as const,
      duration: '60 min',
      category: 'relativity' as const,
      concepts: [
        {
          id: 'spacetime',
          title: 'Spacetime Curvature',
          description: 'See how mass warps the fabric of spacetime itself',
          visualization: 'spacetime' as const,
          parameters: { mass: 1, gridSize: 20 },
          explanation: 'Mass and energy curve spacetime, creating what we perceive as gravity. This revolutionary insight by Einstein shows that gravity is not a force but the curvature of spacetime itself!'
        },
        {
          id: 'blackhole',
          title: 'Black Hole Dynamics',
          description: 'Witness the extreme physics near a black hole\'s event horizon',
          visualization: 'blackhole' as const,
          parameters: { mass: 2, accretionRate: 1.5 },
          explanation: 'Black holes represent the ultimate gravitational extreme where spacetime curvature becomes so intense that nothing, not even light, can escape beyond the event horizon. The swirling accretion disk glows from superheated matter!'
        },
        {
          id: 'gravity_waves',
          title: 'Gravitational Waves',
          description: 'Observe ripples in spacetime from colliding massive objects',
          visualization: 'gravity_waves' as const,
          parameters: { frequency: 1, amplitude: 1 },
          explanation: 'When massive objects accelerate, they create ripples in spacetime that propagate at light speed. These gravitational waves were predicted by Einstein in 1915 and detected by LIGO in 2015, opening a new window to the universe!'
        }
      ]
    }
  ];

  useEffect(() => {
    if (currentConcept && canvasRef.current) {
      setParameters(currentConcept.parameters);
      setTime(0);
      setIsPlaying(true); // Auto-start animations when selecting a concept
      drawVisualization();
    }
  }, [currentConcept]);

  useEffect(() => {
    if (isPlaying && currentConcept) {
      lastTimeRef.current = 0;
      const startAnimation = (timestamp: number) => animate(timestamp);
      animationRef.current = requestAnimationFrame(startAnimation);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, animationSpeed[0], parameters, time]);

  const animate = (currentTime: number) => {
    if (lastTimeRef.current === 0) lastTimeRef.current = currentTime;
    const deltaTime = (currentTime - lastTimeRef.current) / 1000;
    lastTimeRef.current = currentTime;
    
    setTime(prevTime => prevTime + deltaTime * animationSpeed[0]);
    drawVisualization();
    animationRef.current = requestAnimationFrame(animate);
  };

  const drawVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas || !currentConcept) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Create beautiful gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const currentTime = time;

    switch (currentConcept.visualization) {
      case 'pendulum':
        drawPendulum(ctx, centerX, centerY, time);
        break;
      case 'orbit':
        drawOrbit(ctx, centerX, centerY, time);
        break;
      case 'spring':
        drawSpring(ctx, centerX, centerY, time);
        break;
      case 'wave':
        drawWave(ctx, centerX, centerY, time);
        break;
      case 'field':
        drawElectricField(ctx, centerX, centerY);
        break;
      case 'particle':
        drawQuantumParticle(ctx, centerX, centerY, time);
        break;
      case 'collision':
        drawParticleCollision(ctx, centerX, centerY, time);
        break;
      case 'fluid':
        drawFluidDynamics(ctx, centerX, centerY, time);
        break;
      case 'spacetime':
        drawSpacetime(ctx, centerX, centerY, time);
        break;
      case 'blackhole':
        drawBlackhole(ctx, centerX, centerY, time);
        break;
      case 'gravity_waves':
        drawGravityWaves(ctx, centerX, centerY, time);
        break;
    }
  };

  const drawPendulum = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const length = parameters.length * 100;
    const gravity = parameters.gravity || 9.81;
    const damping = 0.995; // Realistic energy loss
    
    // Advanced physics with damping (faster speed)
    const frequency = Math.sqrt(gravity / (parameters.length * 100)) * 2.5;
    const amplitude = parameters.angle * Math.PI / 180;
    const angle = amplitude * Math.cos(time * frequency) * Math.pow(damping, time);
    
    const bobX = centerX + length * Math.sin(angle);
    const bobY = centerY + length * Math.cos(angle);

    // Draw motion trail with fade effect (vibrant nature colors)
    ctx.globalAlpha = 0.3;
    for (let i = 1; i <= 8; i++) {
      const trailTime = time - i * 0.05;
      const trailAngle = amplitude * Math.cos(trailTime * frequency) * Math.pow(damping, trailTime);
      const trailX = centerX + length * Math.sin(trailAngle);
      const trailY = centerY + length * Math.cos(trailAngle);
      
      // Beautiful gradient trail from teal to purple
      const hue = 170 + i * 15; // Teal to purple spectrum
      ctx.fillStyle = `hsla(${hue}, 70%, 55%, ${0.3 - i * 0.035})`;
      ctx.beginPath();
      ctx.arc(trailX, trailY, 12, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Draw pivot with metallic effect
    const pivotGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 12);
    pivotGradient.addColorStop(0, '#fbbf24');
    pivotGradient.addColorStop(0.7, '#f59e0b');
    pivotGradient.addColorStop(1, '#d97706');
    ctx.fillStyle = pivotGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
    ctx.fill();

    // Draw string with realistic physics tension
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();

    // Draw bob with vibrant colors and mass-based size
    const bobRadius = Math.max(10, 15 * Math.sqrt(Math.abs(parameters.mass || 1)));
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(bobX, bobY, bobRadius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add highlight
    ctx.fillStyle = '#fca5a5';
    ctx.beginPath();
    ctx.arc(bobX - 3, bobY - 3, bobRadius * 0.6, 0, 2 * Math.PI);
    ctx.fill();

    // Draw angle arc
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, Math.PI/2, Math.PI/2 + angle, false);
    ctx.stroke();
  };

  const drawOrbit = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const orbitRadius = parameters.distance * 30;
    const angle = time * parameters.velocity / parameters.distance;
    
    // Draw central mass
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20 * Math.sqrt(parameters.mass1 / 10), 0, 2 * Math.PI);
    ctx.fill();

    // Draw orbit path
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, orbitRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw orbiting object
    const objectX = centerX + orbitRadius * Math.cos(angle);
    const objectY = centerY + orbitRadius * Math.sin(angle);
    
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(objectX, objectY, 8 * Math.sqrt(parameters.mass2), 0, 2 * Math.PI);
    ctx.fill();

    // Draw velocity vector
    const vx = -parameters.velocity * Math.sin(angle) * 10;
    const vy = parameters.velocity * Math.cos(angle) * 10;
    
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(objectX, objectY);
    ctx.lineTo(objectX + vx, objectY + vy);
    ctx.stroke();
  };

  const drawSpring = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const parameters = { amplitude: 1, springConstant: 2, mass: 1, damping: 0.1 };
    const equilibrium = centerX;
    const displacement = parameters.amplitude * 50 * Math.cos(time * Math.sqrt(parameters.springConstant / parameters.mass)) * Math.exp(-parameters.damping * time);
    const massX = equilibrium + displacement;

    // Draw wall with vibrant colors
    ctx.fillStyle = '#6b7280';
    ctx.fillRect(50, centerY - 100, 20, 200);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(52, centerY - 98, 16, 196);

    // Draw spring with proper horizontal coils
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(70, centerY);
    
    const coils = 15;
    const springLength = Math.abs(massX - 70);
    for (let i = 0; i <= coils; i++) {
      const x = 70 + (i / coils) * springLength;
      const y = centerY + (i % 2 === 0 ? -15 : 15);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(massX - 25, centerY);
    ctx.stroke();

    // Draw mass with vibrant colors
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(massX - 25, centerY - 20, 50, 40);
    ctx.fillStyle = '#fca5a5';
    ctx.fillRect(massX - 23, centerY - 18, 46, 36);

    // Add mass outline
    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 2;
    ctx.strokeRect(massX - 25, centerY - 20, 50, 40);

    // Draw equilibrium line
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(equilibrium, centerY - 80);
    ctx.lineTo(equilibrium, centerY + 80);
    ctx.stroke();
    ctx.setLineDash([]);

    // Add velocity indicator
    const velocity = -parameters.amplitude * 50 * Math.sqrt(parameters.springConstant / parameters.mass) * Math.sin(time * Math.sqrt(parameters.springConstant / parameters.mass)) * Math.exp(-parameters.damping * time);
    if (Math.abs(velocity) > 1) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(massX, centerY);
      ctx.lineTo(massX + velocity * 2, centerY);
      ctx.stroke();
      
      // Arrow head
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      const arrowDir = velocity > 0 ? 1 : -1;
      ctx.moveTo(massX + velocity * 2, centerY);
      ctx.lineTo(massX + velocity * 2 - arrowDir * 10, centerY - 5);
      ctx.lineTo(massX + velocity * 2 - arrowDir * 10, centerY + 5);
      ctx.fill();
    }
  };

  const drawWave = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const wavelength = parameters.wavelength * 50;
    const amplitude = parameters.amplitude * 30;
    const frequency = parameters.frequency;
    const speed = 2;

    // Create multiple wave layers for depth and interference
    const waves = [
      { color: '#60a5fa', alpha: 0.9, phase: 0 },
      { color: '#3b82f6', alpha: 0.7, phase: 0.2 },
      { color: '#1d4ed8', alpha: 0.5, phase: 0.4 }
    ];

    waves.forEach((wave, index) => {
      ctx.globalAlpha = wave.alpha;
      ctx.strokeStyle = wave.color;
      ctx.lineWidth = 4 - index;
      ctx.beginPath();

      for (let x = 0; x < 600; x += 1) {
        const y = centerY + amplitude * Math.sin(2 * Math.PI * (x / wavelength - frequency * time * speed) + wave.phase);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    });
    ctx.globalAlpha = 1;

    // Draw animated wave particles
    for (let x = 0; x < 600; x += 30) {
      const y = centerY + amplitude * Math.sin(2 * Math.PI * (x / wavelength - frequency * time * speed));
      const particleSize = 4 + 2 * Math.sin(time * 3 + x * 0.1);
      
      const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, particleSize);
      particleGradient.addColorStop(0, '#fbbf24');
      particleGradient.addColorStop(0.5, '#f59e0b');
      particleGradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
      
      ctx.fillStyle = particleGradient;
      ctx.beginPath();
      ctx.arc(x, y, particleSize, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Draw dynamic wavelength indicator
    const indicatorY = centerY + amplitude + 30;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, indicatorY);
    ctx.lineTo(50 + wavelength, indicatorY);
    ctx.stroke();

    // Add arrow heads
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(50, indicatorY);
    ctx.lineTo(45, indicatorY - 5);
    ctx.lineTo(45, indicatorY + 5);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(50 + wavelength, indicatorY);
    ctx.lineTo(55 + wavelength, indicatorY - 5);
    ctx.lineTo(55 + wavelength, indicatorY + 5);
    ctx.fill();

    // Enhanced wavelength label with glow effect
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('λ = ' + wavelength.toFixed(0) + 'px', 50 + wavelength/2 - 30, centerY + amplitude + 60);
    ctx.shadowBlur = 0;
  };

  const drawElectricField = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number) => {
    const charge1X = centerX - parameters.separation * 15;
    const charge2X = centerX + parameters.separation * 15;

    // Draw charges
    ctx.fillStyle = parameters.charge1 > 0 ? '#dc2626' : '#3b82f6';
    ctx.beginPath();
    ctx.arc(charge1X, centerY, 15, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = parameters.charge2 > 0 ? '#dc2626' : '#3b82f6';
    ctx.beginPath();
    ctx.arc(charge2X, centerY, 15, 0, 2 * Math.PI);
    ctx.fill();

    // Draw field lines
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 1;

    for (let angle = 0; angle < 2 * Math.PI; angle += Math.PI / 8) {
      ctx.beginPath();
      let x = charge1X + 20 * Math.cos(angle);
      let y = centerY + 20 * Math.sin(angle);
      ctx.moveTo(x, y);

      for (let i = 0; i < 50; i++) {
        const dx1 = x - charge1X;
        const dy1 = y - centerY;
        const r1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        
        const dx2 = x - charge2X;
        const dy2 = y - centerY;
        const r2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        const ex = parameters.charge1 * dx1 / (r1 * r1 * r1) + parameters.charge2 * dx2 / (r2 * r2 * r2);
        const ey = parameters.charge1 * dy1 / (r1 * r1 * r1) + parameters.charge2 * dy2 / (r2 * r2 * r2);

        const magnitude = Math.sqrt(ex * ex + ey * ey);
        if (magnitude > 0) {
          x += (ex / magnitude) * 2;
          y += (ey / magnitude) * 2;
          ctx.lineTo(x, y);
        }

        if (x < 0 || x > 600 || y < 0 || y > 400) break;
      }
      ctx.stroke();
    }
  };

  const drawQuantumParticle = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const wavelength = parameters.wavelength * 50;
    const amplitude = 30;

    // Draw wave function
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let x = 0; x < 600; x += 2) {
      const y = centerY + amplitude * Math.sin(2 * Math.PI * x / wavelength - parameters.energy * time);
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw probability density
    ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    for (let x = 0; x < 600; x += 2) {
      const waveValue = Math.sin(2 * Math.PI * x / wavelength - parameters.energy * time);
      const y = centerY + amplitude * waveValue * waveValue;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(600, centerY);
    ctx.closePath();
    ctx.fill();

    // Draw particle representation
    const particleX = centerX + 100 * Math.cos(parameters.momentum * time);
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(particleX, centerY - 100, 8, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawParticleCollision = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const m1 = parameters.particle1Mass || 2;
    const m2 = parameters.particle2Mass || 1;
    const v1_initial = parameters.velocity1 || 3;
    const v2_initial = parameters.velocity2 || -2;
    const restitution = parameters.restitution || 0.9;
    
    // Collision physics calculations
    const collision_time = 3;
    const collision_x = centerX;
    
    let x1, x2, v1, v2;
    
    if (time < collision_time) {
      x1 = collision_x - 100 + v1_initial * time * 20;
      x2 = collision_x + 100 + v2_initial * time * 20;
      v1 = v1_initial;
      v2 = v2_initial;
    } else {
      v1 = (m1 - restitution * m2) / (m1 + m2) * v1_initial + (1 + restitution) * m2 / (m1 + m2) * v2_initial;
      v2 = (1 + restitution) * m1 / (m1 + m2) * v1_initial + (m2 - restitution * m1) / (m1 + m2) * v2_initial;
      
      const post_time = time - collision_time;
      x1 = collision_x + v1 * post_time * 20;
      x2 = collision_x + v2 * post_time * 20;
    }
    
    // Draw particle trails
    ctx.globalAlpha = 0.3;
    for (let i = 1; i <= 8; i++) {
      const trail_time = time - i * 0.1;
      if (trail_time > 0) {
        let trail_x1, trail_x2;
        
        if (trail_time < collision_time) {
          trail_x1 = collision_x - 100 + v1_initial * trail_time * 20;
          trail_x2 = collision_x + 100 + v2_initial * trail_time * 20;
        } else {
          const trail_post_time = trail_time - collision_time;
          trail_x1 = collision_x + v1 * trail_post_time * 20;
          trail_x2 = collision_x + v2 * trail_post_time * 20;
        }
        
        ctx.fillStyle = `rgba(220, 38, 38, ${0.3 - i * 0.03})`;
        ctx.beginPath();
        ctx.arc(trail_x1, centerY, Math.sqrt(m1) * 8, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = `rgba(37, 99, 235, ${0.3 - i * 0.03})`;
        ctx.beginPath();
        ctx.arc(trail_x2, centerY, Math.sqrt(m2) * 8, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    
    // Draw particles with vibrant colors
    const radius1 = Math.max(8, Math.sqrt(Math.abs(m1)) * 12);
    const radius2 = Math.max(8, Math.sqrt(Math.abs(m2)) * 12);
    
    // Particle 1 (red)
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(x1, centerY, radius1, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#fca5a5';
    ctx.beginPath();
    ctx.arc(x1 - 3, centerY - 3, radius1 * 0.6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Particle 2 (blue)
    ctx.fillStyle = '#2563eb';
    ctx.beginPath();
    ctx.arc(x2, centerY, radius2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#93c5fd';
    ctx.beginPath();
    ctx.arc(x2 - 3, centerY - 3, radius2 * 0.6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add collision flash effect
    if (Math.abs(time - collision_time) < 0.2) {
      ctx.globalAlpha = 0.5 - Math.abs(time - collision_time) * 2.5;
      const flashGradient = ctx.createRadialGradient(collision_x, centerY, 0, collision_x, centerY, 50);
      flashGradient.addColorStop(0, '#fbbf24');
      flashGradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
      ctx.fillStyle = flashGradient;
      ctx.beginPath();
      ctx.arc(collision_x, centerY, 50, 0, 2 * Math.PI);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  };

  // NEW: Add spectacular General Relativity visualizations!
  const drawSpacetime = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    // Clear with deep space background
    ctx.fillStyle = '#0a0a23';
    ctx.fillRect(0, 0, 600, 400);
    
    // Use parameters for dynamic control
    const mass = parameters.mass || 1;
    const gridSize = parameters.gridSize || 20;
    
    // Draw spacetime grid with gravitational warping
    ctx.strokeStyle = '#7c3aed';
    ctx.lineWidth = 2;
    
    // Horizontal grid lines with curvature from massive object
    for (let y = 50; y < 350; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(50, y);
      for (let x = 50; x < 550; x += 10) {
        const distanceFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const warp = Math.max(0, (30 * mass) / (1 + distanceFromCenter / 50));
        ctx.lineTo(x, y + warp);
      }
      ctx.stroke();
    }
    
    // Vertical grid lines with warping
    for (let x = 50; x < 550; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 50);
      for (let y = 50; y < 350; y += 10) {
        const distanceFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const warp = Math.max(0, (30 * mass) / (1 + distanceFromCenter / 50));
        ctx.lineTo(x + warp * 0.5, y);
      }
      ctx.stroke();
    }
    
    // Draw massive object causing curvature (size based on mass)
    const objectRadius = 15 + mass * 10;
    
    // Create radial gradient for the massive object
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, objectRadius);
    gradient.addColorStop(0, '#fbbf24');
    gradient.addColorStop(0.6, '#f59e0b');
    gradient.addColorStop(1, '#d97706');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, objectRadius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add bright glow effect
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.arc(centerX, centerY, objectRadius * 0.6, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawBlackhole = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    // Deep space background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 600, 400);
    
    // Use parameters for dynamic control
    const mass = parameters.mass || 2;
    const accretionRate = parameters.accretionRate || 1.5;
    
    // Draw accretion disk with vibrant rotating colors (size based on mass)
    const maxRadius = 60 + mass * 40;
    const eventHorizon = 15 + mass * 15;
    
    for (let radius = maxRadius; radius > eventHorizon; radius -= 5) {
      const alpha = (maxRadius - radius) / maxRadius;
      const hue = (time * 50 * accretionRate + radius * 2) % 360;
      ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${alpha * 0.3})`;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Draw event horizon (black center, size based on mass)
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(centerX, centerY, eventHorizon, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw Hawking radiation particles (more with higher mass)
    const particleCount = Math.floor(5 + mass * 5);
    for (let i = 0; i < particleCount; i++) {
      const angle = (time * accretionRate + i) * 0.5;
      const distance = eventHorizon + 5;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      ctx.fillStyle = '#ff6b6b';
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const drawGravityWaves = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    // Space background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, 600, 400);
    
    // Use parameters for dynamic control
    const frequency = parameters.frequency || 1;
    const amplitude = parameters.amplitude || 1;
    
    // Draw gravitational waves as expanding ripples
    const waveCount = Math.floor(6 + amplitude * 4);
    for (let i = 1; i <= waveCount; i++) {
      const radius = (time * 80 * frequency + i * 25) % (250 + amplitude * 50);
      const alpha = Math.max(0, (1 - radius / (300 + amplitude * 50)) * amplitude);
      
      ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
      ctx.lineWidth = 2 + amplitude;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
    
    // Draw binary system causing gravitational waves
    const angle = time * frequency * 2;
    const orbit = 40 + amplitude * 20;
    const starSize = 10 + amplitude * 5;
    
    // Star 1 (red)
    ctx.fillStyle = '#ff6b6b';
    ctx.beginPath();
    ctx.arc(centerX + Math.cos(angle) * orbit, centerY + Math.sin(angle) * orbit, starSize, 0, 2 * Math.PI);
    ctx.fill();
    
    // Star 2 (cyan)
    ctx.fillStyle = '#4ecdc4';
    ctx.beginPath();
    ctx.arc(centerX - Math.cos(angle) * orbit, centerY - Math.sin(angle) * orbit, starSize, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add orbital trail effect
    ctx.globalAlpha = 0.3;
    for (let j = 1; j <= 20; j++) {
      const trailAngle = angle - j * 0.1;
      const trailAlpha = 0.3 - j * 0.015;
      
      ctx.globalAlpha = trailAlpha;
      ctx.fillStyle = '#ff6b6b';
      ctx.beginPath();
      ctx.arc(centerX + Math.cos(trailAngle) * orbit, centerY + Math.sin(trailAngle) * orbit, starSize * 0.7, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.fillStyle = '#4ecdc4';
      ctx.beginPath();
      ctx.arc(centerX - Math.cos(trailAngle) * orbit, centerY - Math.sin(trailAngle) * orbit, starSize * 0.7, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const drawFluidDynamics = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const viscosity = parameters.viscosity || 0.1;
    const flow_speed = parameters.flow_speed || 2;
    const turbulence = parameters.turbulence || 0.3;
    
    // Create fluid flow field
    const gridSize = 30;
    ctx.globalAlpha = 0.7;
    
    for (let x = 0; x < 600; x += gridSize) {
      for (let y = 0; y < 400; y += gridSize) {
        const distance_from_center = Math.sqrt((x - centerX)**2 + (y - centerY)**2);
        const base_flow = flow_speed * (1 - Math.exp(-distance_from_center / 100));
        
        const vortex_x = Math.sin(time * 0.5 + x * 0.01) * turbulence;
        const vortex_y = Math.cos(time * 0.7 + y * 0.01) * turbulence;
        
        const flow_x = base_flow + vortex_x;
        const flow_y = vortex_y * 0.5;
        
        const magnitude = Math.sqrt(flow_x**2 + flow_y**2);
        if (magnitude > 0.1) {
          const scale = Math.min(gridSize * 0.8, magnitude * 10);
          const end_x = x + (flow_x / magnitude) * scale;
          const end_y = y + (flow_y / magnitude) * scale;
          
          const intensity = Math.min(1, magnitude / 3);
          const hue = 240 - intensity * 60;
          ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${intensity})`;
          ctx.lineWidth = 2;
          
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(end_x, end_y);
          ctx.stroke();
          
          const angle = Math.atan2(flow_y, flow_x);
          ctx.fillStyle = ctx.strokeStyle;
          ctx.beginPath();
          ctx.moveTo(end_x, end_y);
          ctx.lineTo(end_x - 6 * Math.cos(angle - 0.3), end_y - 6 * Math.sin(angle - 0.3));
          ctx.lineTo(end_x - 6 * Math.cos(angle + 0.3), end_y - 6 * Math.sin(angle + 0.3));
          ctx.fill();
        }
      }
    }
    
    // Add flowing particles
    ctx.globalAlpha = 0.8;
    for (let i = 0; i < 12; i++) {
      const particle_age = (time * flow_speed + i * 0.5) % 8;
      const x = 50 + particle_age * 70;
      const y = centerY + 30 * Math.sin(time * 2 + i) * turbulence;
      
      const particle_size = Math.max(1, 4 + 2 * Math.sin(time * 3 + i));
      
      // Use vibrant solid colors instead of gradients
      ctx.fillStyle = '#60a5fa';
      ctx.beginPath();
      ctx.arc(x, y, particle_size, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const updateParameter = (key: string, value: number) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl h-[95vh] bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-bold">3D Visual Physics Courses</CardTitle>
              <p className="text-purple-100">Experience physics through interactive 3D visualizations</p>
            </div>
            <Button onClick={onClose} variant="ghost" className="text-white hover:bg-white/20">
              ✕ Close
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 h-full">
          {!selectedCourse ? (
            // Course Selection
            <div className="p-8 space-y-6 overflow-y-auto h-full max-h-[80vh] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {visual3DCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                          {course.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl">{course.title}</CardTitle>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{course.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant={course.difficulty === 'Beginner' ? 'secondary' : course.difficulty === 'Intermediate' ? 'default' : 'destructive'}>
                          {course.difficulty}
                        </Badge>
                        <Badge variant="outline">{course.duration}</Badge>
                        <Badge variant="outline">{course.concepts.length} concepts</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Concepts:</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          {course.concepts.map((concept) => (
                            <li key={concept.id} className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              {concept.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button 
                        onClick={() => setSelectedCourse(course)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Start Course
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : !currentConcept ? (
            // Concept Selection
            <div className="p-8 space-y-6 overflow-y-auto h-full max-h-[80vh] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <Button onClick={() => setSelectedCourse(null)} variant="outline">
                  ← Back to Courses
                </Button>
                <div>
                  <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{selectedCourse.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCourse.concepts.map((concept) => (
                  <Card key={concept.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300">
                    <CardHeader>
                      <CardTitle className="text-lg">{concept.title}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{concept.description}</p>
                    </CardHeader>
                    
                    <CardContent>
                      <Button 
                        onClick={() => setCurrentConcept(concept)}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      >
                        Explore Concept
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            // Visualization View
            <div className="flex h-full">
              {/* Visualization Canvas */}
              <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-800">
                <div className="mb-4 flex items-center justify-between">
                  <Button onClick={() => setCurrentConcept(null)} variant="outline">
                    ← Back to Concepts
                  </Button>
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => setIsPlaying(!isPlaying)}
                      variant={isPlaying ? "destructive" : "default"}
                      className="flex items-center gap-2"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Speed:</span>
                      <Slider
                        value={animationSpeed}
                        onValueChange={setAnimationSpeed}
                        max={3}
                        min={0.1}
                        step={0.1}
                        className="w-24"
                      />
                    </div>
                  </div>
                </div>

                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 shadow-lg w-full"
                />
              </div>

              {/* Controls Panel */}
              <div className="w-80 p-6 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
                <h3 className="text-xl font-bold mb-4">{currentConcept.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">{currentConcept.description}</p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Parameters</h4>
                    <div className="space-y-4">
                      {Object.entries(currentConcept.parameters).map(([key, defaultValue]) => (
                        <div key={key}>
                          <label className="block text-sm font-medium mb-1 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          <Slider
                            value={[parameters[key] || defaultValue]}
                            onValueChange={(value) => updateParameter(key, value[0])}
                            max={defaultValue * 3}
                            min={defaultValue * 0.1}
                            step={defaultValue * 0.05}
                            className="w-full"
                          />
                          <span className="text-xs text-gray-500">
                            {(parameters[key] || defaultValue).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Explanation</h4>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {currentConcept.explanation}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      onComplete(selectedCourse.id, 100);
                      setCurrentConcept(null);
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    Complete Concept
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}