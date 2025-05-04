import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Model as Bee } from "./Bee";
import { useMediaQuery } from 'react-responsive';

const FloatingBee = () => {
    const beeRef = useRef();
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const floatSpeed = 0.5;
    const floatHeight = 0.2;
    const rotationSpeed = 0.2;

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        beeRef.current.position.y = Math.sin(t * floatSpeed) * floatHeight;
        beeRef.current.rotation.y = Math.sin(t * rotationSpeed) * 0.2;
        
        beeRef.current.rotation.z = Math.sin(t * floatSpeed) * 0.05;
        beeRef.current.rotation.x = Math.sin(t * floatSpeed * 0.5) * 0.03;
    });

    return (
        <group 
            ref={beeRef}
            scale={isMobile ? 0.2 : 0.3} 
            position={[0, 4, 0]} 
            rotation={[0, Math.PI, 0]}
        >
            <Bee />
        </group>
    )
}

export default FloatingBee