import { useState, useEffect, useRef } from "react";

interface PhysicsObject {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  type: 'cube' | 'ball';
  color: string;
  rotation: number;
  rotationSpeed: number;
  isDragging: boolean;
  mass: number;
}

interface InteractivePhysicsElementsProps {
  isVisible?: boolean;
}

export default function InteractivePhysicsElements({ isVisible = true }: InteractivePhysicsElementsProps) {
  const [objects, setObjects] = useState<PhysicsObject[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [draggedObject, setDraggedObject] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const colors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', 
    '#EF4444', '#06B6D4', '#84CC16', '#F97316'
  ];

  const gravity = 0.3;
  const friction = 0.98;
  const bounce = 0.7;

  useEffect(() => {
    // Initialize physics objects
    const initialObjects: PhysicsObject[] = [];
    
    for (let i = 0; i < 8; i++) {
      const type = Math.random() > 0.5 ? 'cube' : 'ball';
      const size = 20 + Math.random() * 30;
      
      initialObjects.push({
        id: `object-${i}`,
        x: 100 + i * 80 + Math.random() * 40,
        y: 100 + Math.random() * 200,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 2,
        width: size,
        height: size,
        type,
        color: colors[i % colors.length],
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 5,
        isDragging: false,
        mass: size / 30
      });
    }
    
    setObjects(initialObjects);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animate = () => {
      setObjects(prevObjects => {
        return prevObjects.map(obj => {
          if (obj.isDragging) {
            return {
              ...obj,
              x: mousePos.x - obj.width / 2,
              y: mousePos.y - obj.height / 2,
              vx: 0,
              vy: 0
            };
          }

          let newX = obj.x + obj.vx;
          let newY = obj.y + obj.vy;
          let newVx = obj.vx * friction;
          let newVy = obj.vy + gravity;
          let newRotation = obj.rotation + obj.rotationSpeed;

          // Container bounds (relative to viewport)
          const containerHeight = window.innerHeight;
          const containerWidth = window.innerWidth;

          // Floor collision
          if (newY + obj.height > containerHeight - 50) {
            newY = containerHeight - 50 - obj.height;
            newVy = -newVy * bounce;
            newVx *= 0.9; // Add some friction on floor
            obj.rotationSpeed *= 0.8;
          }

          // Wall collisions
          if (newX < 0) {
            newX = 0;
            newVx = -newVx * bounce;
          }
          if (newX + obj.width > containerWidth) {
            newX = containerWidth - obj.width;
            newVx = -newVx * bounce;
          }

          // Ceiling collision
          if (newY < 0) {
            newY = 0;
            newVy = -newVy * bounce;
          }

          return {
            ...obj,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            rotation: newRotation
          };
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, mousePos]);

  const handleMouseDown = (e: React.MouseEvent, objectId: string) => {
    e.preventDefault();
    setDraggedObject(objectId);
    setObjects(prev => 
      prev.map(obj => 
        obj.id === objectId 
          ? { ...obj, isDragging: true }
          : obj
      )
    );
  };

  const handleMouseUp = () => {
    if (draggedObject) {
      setObjects(prev => 
        prev.map(obj => 
          obj.id === draggedObject 
            ? { ...obj, isDragging: false }
            : obj
        )
      );
      setDraggedObject(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const addNewObject = (e: React.MouseEvent) => {
    if (e.target === containerRef.current) {
      const type = Math.random() > 0.5 ? 'cube' : 'ball';
      const size = 25 + Math.random() * 25;
      const newObject: PhysicsObject = {
        id: `object-${Date.now()}`,
        x: e.clientX - size / 2,
        y: e.clientY - size / 2,
        vx: (Math.random() - 0.5) * 6,
        vy: -Math.random() * 5,
        width: size,
        height: size,
        type,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 8,
        isDragging: false,
        mass: size / 30
      };

      setObjects(prev => [...prev, newObject]);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-5"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDoubleClick={addNewObject}
      style={{ pointerEvents: draggedObject ? 'auto' : 'none' }}
    >
      {objects.map(obj => (
        <div
          key={obj.id}
          className={`absolute transition-none cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl ${
            obj.type === 'ball' ? 'rounded-full' : 'rounded-lg'
          }`}
          style={{
            left: `${obj.x}px`,
            top: `${obj.y}px`,
            width: `${obj.width}px`,
            height: `${obj.height}px`,
            backgroundColor: obj.color,
            transform: `rotate(${obj.rotation}deg)`,
            pointerEvents: 'auto',
            zIndex: obj.isDragging ? 20 : 10,
            boxShadow: obj.isDragging 
              ? '0 10px 30px rgba(0,0,0,0.3)' 
              : '0 4px 15px rgba(0,0,0,0.2)',
            border: obj.type === 'cube' 
              ? '2px solid rgba(255,255,255,0.3)' 
              : 'none'
          }}
          onMouseDown={(e) => handleMouseDown(e, obj.id)}
          onContextMenu={(e) => {
            e.preventDefault();
            setObjects(prev => prev.filter(o => o.id !== obj.id));
          }}
        >
          {/* Add some visual texture */}
          <div 
            className={`w-full h-full ${
              obj.type === 'ball' ? 'rounded-full' : 'rounded-lg'
            }`}
            style={{
              background: obj.type === 'ball' 
                ? `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${obj.color})`
                : `linear-gradient(135deg, rgba(255,255,255,0.3), transparent, rgba(0,0,0,0.2))`
            }}
          />
          
          {/* Physics indicator for cubes */}
          {obj.type === 'cube' && (
            <div className="absolute inset-1 border border-white/30 rounded-md" />
          )}
        </div>
      ))}

      {/* Enhanced Instructions overlay */}
      <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-xl shadow-2xl backdrop-blur-sm max-w-xs pointer-events-auto">
        <h4 className="font-bold mb-2 text-sm">🧪 Physics Playground</h4>
        <div className="text-xs space-y-1 text-gray-300">
          <p>• Drag objects to move them around</p>
          <p>• Double-click empty space to add objects</p>
          <p>• Right-click objects to remove them</p>
          <p>• Watch gravity and collisions in action!</p>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setObjects([])}
            className="text-xs bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full transition-colors"
          >
            🗑️ Clear All
          </button>
          <span className="text-xs bg-blue-600 px-2 py-1 rounded-full">
            Real Physics ⚡
          </span>
        </div>
      </div>
    </div>
  );
}