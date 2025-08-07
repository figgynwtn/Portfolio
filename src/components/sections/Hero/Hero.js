'use client'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import StarScene from './StarScene'
import Corners from './Corners'

export default function Hero() {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <>
      <Corners />
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-neon-primary">
        {/* 3D Star Canvas */}
        <div className="fixed inset-0 z-50">
          <Canvas
            gl={{ antialias: true, alpha: true }}
            camera={{ position: [0, 0, 18], fov: 45, near: 0.1, far: 1000 }}
            style={{ 
              width: "100vw", 
              height: "100vh", 
              background: "transparent",
              pointerEvents: isDragging ? "none" : "auto"
            }}
          >
            <StarScene 
              isDragging={isDragging}
              setIsDragging={setIsDragging}
            />
          </Canvas>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#1a1a1e]" />
          <div className="absolute inset-0 bg-grain" />
          <div className="absolute inset-0 bg-noise" />
          <div className="absolute inset-0 opacity-20 bg-starfield" />
        </div>
      </section>
    </>
  )
}