import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { TextureLoader } from "three";
import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

const CubeCanvas = ({ textures, isSelected }) => {
  const [front, back, top, bottom, right, left] = useLoader(TextureLoader, [
    textures.front,
    textures.back,
    textures.top,
    textures.bottom,
    textures.right,
    textures.left,
  ]);

  const materials = useMemo(() => [
    new THREE.MeshBasicMaterial({ map: right }),
    new THREE.MeshBasicMaterial({ map: left }),
    new THREE.MeshBasicMaterial({ map: top }),
    new THREE.MeshBasicMaterial({ map: bottom }),
    new THREE.MeshBasicMaterial({ map: front }),
    new THREE.MeshBasicMaterial({ map: back }),
  ], [front, back, top, bottom, right, left]);

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={0.1} />
      <OrbitControls enableZoom={false} />
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh scale={isSelected ? [1.7, 1.7, 1.7] : [1.5, 1.5, 1.5]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          {materials.map((material, i) => (
            <primitive attach={`material-${i}`} key={i} object={material} />
          ))}
        </mesh>
      </Float>
    </>
  );
};

const FloatingCube = ({ textures, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-[220px] h-[300px] rounded-full bg-gradient-to-br from-gray-800 to-gray-900 p-4 cursor-pointer shadow-lg hover:scale-105 transition-all duration-300 ${
        isSelected ? "ring-4 ring-white" : ""
      }`}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <CubeCanvas textures={textures} isSelected={isSelected} />
      </Canvas>
    </div>
  );
};

export default FloatingCube;
