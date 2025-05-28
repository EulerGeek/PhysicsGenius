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
  const gravity = 0.3;
  const friction = 0.95;
  const bounce = 0.6;
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
        {/* Bunny Body - Clean and Simple */}
        <div className="absolute inset-1 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full shadow-lg">
          {/* Main Body */}
          <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
            {/* Simple Eyes */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-black rounded-full"></div>
            <div className="absolute top-4 right-4 w-3 h-3 bg-black rounded-full"></div>
            
            {/* Simple Nose */}
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-1.5 h-1 bg-pink-400 rounded-full"></div>
            
            {/* Simple Mouth */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-gray-600 rounded-full"></div>
          </div>
          
          {/* Simple Ears */}
          <div className="absolute -top-2 left-3 w-4 h-10 bg-gray-200 rounded-full transform rotate-15 shadow-sm"></div>
          <div className="absolute -top-2 right-3 w-4 h-10 bg-gray-200 rounded-full transform -rotate-15 shadow-sm"></div>
          
          {/* Inner Ears */}
          <div className="absolute -top-1 left-3.5 w-2 h-6 bg-pink-200 rounded-full transform rotate-15"></div>
          <div className="absolute -top-1 right-3.5 w-2 h-6 bg-pink-200 rounded-full transform -rotate-15"></div>
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