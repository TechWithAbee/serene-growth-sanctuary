
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { Plant3D } from './Plant3D';
import { useGardenStore } from '../store/gardenStore';

const Garden3D = () => {
  const plants = useGardenStore((state) => state.plants);

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden bg-gradient-to-b from-sky-100 to-green-50">
      <Canvas
        camera={{ position: [0, 8, 12], fov: 45 }}
        shadows
      >
        <Environment preset="dawn" />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* Ground */}
        <mesh receiveShadow position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshLambertMaterial color="#8fbc8f" />
        </mesh>

        {/* Plants positioned in a gentle arc */}
        {plants.map((plant, index) => (
          <Float
            key={plant.id}
            speed={1}
            rotationIntensity={0.1}
            floatIntensity={0.1}
          >
            <Plant3D
              plant={plant}
              position={[
                (index - 1) * 4, // spread plants horizontally
                -1,
                0
              ]}
            />
          </Float>
        ))}

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Garden3D;
