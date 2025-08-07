'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function Logo() {
  const mesh = useRef()
  const texture = useTexture('/images/newt.png')
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.05
    }
  })

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 1]}
      scale={[3, 3, 1]}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial 
        map={texture} 
        transparent={true}
        opacity={0.9}
      />
    </mesh>
  )
}