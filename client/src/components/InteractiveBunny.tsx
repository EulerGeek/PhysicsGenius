import { useState, useEffect, useRef } from 'react';

interface InteractiveBunnyProps {
  isVisible?: boolean;
}

export default function InteractiveBunny({ isVisible = true }: InteractiveBunnyProps) {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isKicked, setIsKicked] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const bunnyRef = useRef<HTMLDivElement>(null);

  // Physics constants
  const gravity = 0.5;
  const friction = 0.99;
  const bounce = 0.8;
  const bunnySize = 60;

  useEffect(() => {
    if (!isVisible) return;

    const animate = () => {
      if (!isDragging) {
        setPosition(prev => {
          setVelocity(vel => {
            const newVel = { ...vel };
            
            // Apply gravity
            newVel.y += gravity;
            
            // Apply friction
            newVel.x *= friction;
            newVel.y *= friction;
            
            return newVel;
          });
          
          const newPos = { ...prev };
          newPos.x += velocity.x;
          newPos.y += velocity.y;
          
          // Boundary collisions
          const maxX = window.innerWidth - bunnySize;
          const maxY = window.innerHeight - bunnySize;

          if (newPos.x <= 0) {
            newPos.x = 0;
            setVelocity(v => ({ ...v, x: -v.x * bounce }));
          } else if (newPos.x >= maxX) {
            newPos.x = maxX;
            setVelocity(v => ({ ...v, x: -v.x * bounce }));
          }

          if (newPos.y <= 0) {
            newPos.y = 0;
            setVelocity(v => ({ ...v, y: -v.y * bounce }));
          } else if (newPos.y >= maxY) {
            newPos.y = maxY;
            setVelocity(v => ({ ...v, y: -v.y * bounce * 0.8, x: v.x * 0.9 }));
          }
          
          return newPos;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, isVisible, velocity]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!bunnyRef.current) return;

    const rect = bunnyRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    
    e.preventDefault();
    
    // Calculate kick direction from click position
    const rect = bunnyRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left - bunnySize / 2;
    const clickY = e.clientY - rect.top - bunnySize / 2;
    
    const kickStrength = 15;
    const normalizedX = clickX / (bunnySize / 2);
    const normalizedY = clickY / (bunnySize / 2);
    
    setVelocity({
      x: normalizedX * kickStrength + (Math.random() - 0.5) * 5,
      y: normalizedY * kickStrength + (Math.random() - 0.5) * 5
    });

    setIsKicked(true);
    setTimeout(() => setIsKicked(false), 300);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  if (!isVisible) return null;

  return (
    <div
      ref={bunnyRef}
      className={`fixed pointer-events-auto cursor-pointer select-none transition-transform duration-200 z-40 ${
        isDragging ? 'scale-110' : isKicked ? 'scale-125' : 'scale-100'
      } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${bunnySize}px`,
        height: `${bunnySize}px`,
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div
        className={`w-full h-full relative transition-all duration-500 ease-out ${
          isKicked ? 'animate-spin-slow' : isDragging ? 'animate-pulse-gentle' : 'animate-idle-bob'
        } ${isDragging ? 'filter brightness-110 scale-110' : 'scale-100'}`}
        style={{
          transform: `rotate(${velocity.x * 0.5}deg)`,
          filter: `hue-rotate(${Math.abs(velocity.x + velocity.y) * 2}deg)`
        }}
      >
        {/* Bunny Body with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 rounded-full shadow-lg animate-gentle-pulse">
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full animate-shimmer"></div>
          
          {/* Bunny Face */}
          <div className="absolute inset-2 bg-gradient-to-br from-white via-pink-50 to-pink-100 rounded-full flex items-center justify-center animate-face-glow">
            {/* Animated Eyes */}
            <div className={`absolute top-3 left-3 w-2 h-2 bg-black rounded-full transition-all duration-300 ${
              isKicked ? 'animate-blink-rapid' : 'animate-blink-slow'
            }`}></div>
            <div className={`absolute top-3 right-3 w-2 h-2 bg-black rounded-full transition-all duration-300 ${
              isKicked ? 'animate-blink-rapid' : 'animate-blink-slow'
            }`} style={{animationDelay: '0.1s'}}></div>
            
            {/* Eye sparkles */}
            <div className="absolute top-3.5 left-3.5 w-0.5 h-0.5 bg-white rounded-full animate-twinkle"></div>
            <div className="absolute top-3.5 right-3.5 w-0.5 h-0.5 bg-white rounded-full animate-twinkle" style={{animationDelay: '0.2s'}}></div>
            
            {/* Animated Nose */}
            <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full transition-all duration-300 ${
              isKicked ? 'animate-nose-wiggle' : 'animate-nose-breathe'
            }`}></div>
            
            {/* Animated Mouth */}
            <div className={`absolute top-7 left-1/2 transform -translate-x-1/2 w-3 h-1 border-b-2 border-gray-400 rounded-b-full transition-all duration-300 ${
              isKicked ? 'animate-mouth-happy' : 'animate-mouth-neutral'
            }`}></div>
            
            {/* Cheek blush */}
            <div className="absolute top-5 left-1 w-1.5 h-1 bg-pink-300/60 rounded-full animate-blush"></div>
            <div className="absolute top-5 right-1 w-1.5 h-1 bg-pink-300/60 rounded-full animate-blush" style={{animationDelay: '0.3s'}}></div>
          </div>
          
          {/* Animated Ears */}
          <div className={`absolute -top-3 left-2 w-3 h-8 bg-gradient-to-t from-pink-200 via-pink-300 to-pink-400 rounded-full transform rotate-12 shadow-md transition-all duration-500 ${
            isKicked ? 'animate-ear-flap' : 'animate-ear-twitch'
          }`}></div>
          <div className={`absolute -top-3 right-2 w-3 h-8 bg-gradient-to-t from-pink-200 via-pink-300 to-pink-400 rounded-full transform -rotate-12 shadow-md transition-all duration-500 ${
            isKicked ? 'animate-ear-flap' : 'animate-ear-twitch'
          }`} style={{animationDelay: '0.2s'}}></div>
          
          {/* Inner Ears with animation */}
          <div className="absolute -top-2 left-2.5 w-1.5 h-5 bg-gradient-to-t from-pink-400 to-pink-500 rounded-full transform rotate-12 animate-ear-inner"></div>
          <div className="absolute -top-2 right-2.5 w-1.5 h-5 bg-gradient-to-t from-pink-400 to-pink-500 rounded-full transform -rotate-12 animate-ear-inner" style={{animationDelay: '0.1s'}}></div>
          
          {/* Animated whiskers */}
          <div className="absolute top-6 left-0 w-4 h-0.5 bg-gray-400/60 rounded-full animate-whisker-left"></div>
          <div className="absolute top-7 left-0 w-3 h-0.5 bg-gray-400/60 rounded-full animate-whisker-left" style={{animationDelay: '0.1s'}}></div>
          <div className="absolute top-6 right-0 w-4 h-0.5 bg-gray-400/60 rounded-full animate-whisker-right"></div>
          <div className="absolute top-7 right-0 w-3 h-0.5 bg-gray-400/60 rounded-full animate-whisker-right" style={{animationDelay: '0.1s'}}></div>
        </div>

        {/* Bunny Legs with IK */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
          {/* Left Leg */}
          <div className={`absolute -left-3 top-0 transform transition-all duration-300 ${
            isDragging ? 'animate-leg-stretch' : isKicked ? 'animate-leg-kick' : 'animate-leg-walk'
          }`}>
            {/* Upper leg */}
            <div className="w-2 h-4 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full transform rotate-12 origin-top"></div>
            {/* Lower leg */}
            <div className="w-1.5 h-3 bg-gradient-to-b from-pink-400 to-pink-500 rounded-full transform translate-x-1 translate-y-3 rotate-45 origin-top"></div>
            {/* Foot */}
            <div className="w-2.5 h-1.5 bg-pink-500 rounded-full transform translate-x-1.5 translate-y-5"></div>
          </div>

          {/* Right Leg */}
          <div className={`absolute -right-3 top-0 transform transition-all duration-300 ${
            isDragging ? 'animate-leg-stretch' : isKicked ? 'animate-leg-kick' : 'animate-leg-walk'
          }`} style={{animationDelay: '0.3s'}}>
            {/* Upper leg */}
            <div className="w-2 h-4 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full transform -rotate-12 origin-top"></div>
            {/* Lower leg */}
            <div className="w-1.5 h-3 bg-gradient-to-b from-pink-400 to-pink-500 rounded-full transform -translate-x-1 translate-y-3 -rotate-45 origin-top"></div>
            {/* Foot */}
            <div className="w-2.5 h-1.5 bg-pink-500 rounded-full transform -translate-x-1.5 translate-y-5"></div>
          </div>
        </div>
        
        {/* Sparkle Effect when kicked */}
        {isKicked && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute top-2 right-0 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '0.1s'}}></div>
            <div className="absolute bottom-0 left-2 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
          </div>
        )}
      </div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Click me or drag me around! 🐰
      </div>
    </div>
  );
}