
import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/bee.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials['Content-Material']} scale={[-1, 1, 1]} />
    </group>
  )
}

useGLTF.preload('/bee.glb')
