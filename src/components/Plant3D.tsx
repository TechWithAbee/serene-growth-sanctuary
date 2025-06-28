
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Color } from 'three';
import { Plant } from '../store/gardenStore';

interface Plant3DProps {
  plant: Plant;
  position: [number, number, number];
}

export const Plant3D: React.FC<Plant3DProps> = ({ plant, position }) => {
  const meshRef = useRef<Mesh>(null);
  const stemRef = useRef<Mesh>(null);
  const flowerRef = useRef<Mesh>(null);

  // Animate growth based on plant stage
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const growthScale = Math.max(0.1, plant.stage * 0.25 + 0.1);
      
      meshRef.current.scale.setScalar(growthScale);
      meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    }

    if (flowerRef.current && plant.stage >= 3) {
      const time = state.clock.getElapsedTime();
      flowerRef.current.rotation.y = time * 0.5;
      flowerRef.current.position.y = Math.sin(time * 2) * 0.1;
    }
  });

  const getPlantColor = () => {
    switch (plant.type) {
      case 'calm':
        return '#E6F3FF'; // Soft blue
      case 'focus':
        return '#E8F5E8'; // Soft green
      case 'creative':
        return '#FFF0E6'; // Soft orange
      default:
        return '#90EE90';
    }
  };

  const getFlowerColor = () => {
    switch (plant.type) {
      case 'calm':
        return '#87CEEB'; // Sky blue
      case 'focus':
        return '#98FB98'; // Pale green
      case 'creative':
        return '#FFB347'; // Peach
      default:
        return '#FFB6C1';
    }
  };

  return (
    <group position={position}>
      {/* Plant base/pot */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[1, 1.2, 1, 8]} />
        <meshLambertMaterial color="#8B4513" />
      </mesh>

      {/* Main plant body */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
        {plant.type === 'calm' && (
          <>
            {/* Lily stem */}
            <mesh ref={stemRef} position={[0, 1, 0]}>
              <cylinderGeometry args={[0.1, 0.15, 2, 6]} />
              <meshLambertMaterial color="#228B22" />
            </mesh>
            
            {/* Lily flower */}
            {plant.stage >= 2 && (
              <mesh ref={flowerRef} position={[0, 2.2, 0]}>
                <sphereGeometry args={[0.6, 8, 6]} />
                <meshLambertMaterial color={getFlowerColor()} />
              </mesh>
            )}
          </>
        )}

        {plant.type === 'focus' && (
          <>
            {/* Fern fronds */}
            {Array.from({ length: Math.max(1, plant.stage + 1) }).map((_, i) => (
              <mesh key={i} position={[Math.cos(i * 2) * 0.8, 1 + i * 0.3, Math.sin(i * 2) * 0.8]}>
                <coneGeometry args={[0.3, 1.5, 4]} />
                <meshLambertMaterial color={getPlantColor()} />
              </mesh>
            ))}
          </>
        )}

        {plant.type === 'creative' && (
          <>
            {/* Cactus body */}
            <mesh position={[0, 1, 0]}>
              <cylinderGeometry args={[0.4, 0.5, 2, 8]} />
              <meshLambertMaterial color={getPlantColor()} />
            </mesh>
            
            {/* Cactus flowers */}
            {plant.stage >= 3 && Array.from({ length: plant.stage - 2 }).map((_, i) => (
              <mesh key={i} position={[Math.cos(i * 1.5) * 0.6, 1.5 + Math.sin(i) * 0.3, Math.sin(i * 1.5) * 0.6]}>
                <sphereGeometry args={[0.2, 6, 4]} />
                <meshLambertMaterial color={getFlowerColor()} />
              </mesh>
            ))}
          </>
        )}
      </mesh>
    </group>
  );
};
