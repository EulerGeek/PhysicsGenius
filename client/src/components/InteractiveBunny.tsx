import { useState, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Velocity {
  x: number;
  y: number;
}

interface InteractiveBunnyProps {
  isVisible?: boolean;
}

export default function InteractiveBunny({ isVisible = true }: InteractiveBunnyProps) {
  const [position, setPosition] = useState<Position>({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState<Velocity>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isKicked, setIsKicked] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const bunnyRef = useRef<HTMLDivElement>(null);

  // Physics constants
  const gravity = 0.8;
  const friction = 0.98;
  const bounce = 0.7;
  const bunnySize = 60;

  useEffect(() => {
    if (!isVisible) return;

    const animate = () => {
      if (!isDragging) {
        setVelocity(prevVel => {
          let newVel = { ...prevVel };
          
          // Apply gravity
          newVel.y += gravity;
          
          // Apply friction
          newVel.x *= friction;
          newVel.y *= friction;
          
          return newVel;
        });
        
        setPosition(prevPos => {
          let newPos = { ...prevPos };
          
          // Update position with current velocity
          setVelocity(currentVel => {
            newPos.x += currentVel.x;
            newPos.y += currentVel.y;
            
            // Boundary collisions
            const windowWidth = window.innerWidth - bunnySize;
            const windowHeight = window.innerHeight - bunnySize;

            // Left and right boundaries
            if (newPos.x <= 0) {
              newPos.x = 0;
              setVelocity(prev => ({ ...prev, x: -prev.x * bounce }));
            } else if (newPos.x >= windowWidth) {
              newPos.x = windowWidth;
              setVelocity(prev => ({ ...prev, x: -prev.x * bounce }));
            }

            // Top and bottom boundaries
            if (newPos.y <= 0) {
              newPos.y = 0;
              setVelocity(prev => ({ ...prev, y: -prev.y * bounce }));
            } else if (newPos.y >= windowHeight) {
              newPos.y = windowHeight;
              setVelocity(prev => ({ ...prev, y: -prev.y * bounce * 0.8, x: prev.x * 0.9 }));
            }
            
            return currentVel;
          });
          
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
  }, [isDragging, isVisible]);

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
        className={`w-full h-full relative transition-all duration-300 ${
          isKicked ? 'animate-bounce' : ''
        } ${isDragging ? 'filter brightness-110' : ''}`}
      >
        {/* Bunny Body */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full shadow-lg">
          {/* Bunny Face */}
          <div className="absolute inset-2 bg-gradient-to-br from-white to-pink-100 rounded-full flex items-center justify-center">
            {/* Eyes */}
            <div className="absolute top-3 left-3 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute top-3 right-3 w-2 h-2 bg-black rounded-full"></div>
            
            {/* Nose */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full"></div>
            
            {/* Mouth */}
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-3 h-1 border-b-2 border-gray-400 rounded-b-full"></div>
          </div>
          
          {/* Ears */}
          <div className="absolute -top-3 left-2 w-3 h-8 bg-gradient-to-t from-pink-200 to-pink-300 rounded-full transform rotate-12 shadow-md"></div>
          <div className="absolute -top-3 right-2 w-3 h-8 bg-gradient-to-t from-pink-200 to-pink-300 rounded-full transform -rotate-12 shadow-md"></div>
          
          {/* Inner Ears */}
          <div className="absolute -top-2 left-2.5 w-1.5 h-5 bg-gradient-to-t from-pink-300 to-pink-400 rounded-full transform rotate-12"></div>
          <div className="absolute -top-2 right-2.5 w-1.5 h-5 bg-gradient-to-t from-pink-300 to-pink-400 rounded-full transform -rotate-12"></div>
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