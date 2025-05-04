import { OrbitControls } from '@react-three/drei';
import React, { Suspense } from 'react'
import FloatingBee from './FloatingBee';
import HeroLights from '../hero_models/HeroLights';
import Particles from '../hero_models/Particles';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';

const BeeExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <ambientLight intensity={0.3} color="#ffffff" />
      
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet && !isMobile}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />
      
      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={100} />
        <FloatingBee />
      </Suspense>
    </Canvas>
  )
}

export default BeeExperience