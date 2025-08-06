'use client'
import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useSpring, a } from '@react-spring/three'
import Corners from './Corners'

function StarModel({ isDragging }) {
  const mesh = useRef()
  const { scene } = useGLTF('/models/star.glb')
  
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.metalness = 0.9
          child.material.roughness = 0.1
          child.material.envMapIntensity = 2.0
          child.material.color.setHex(0xffffff)
        }
      })
    }
  }, [scene])
  
  useFrame(() => {
    if (mesh.current && !isDragging) {
      mesh.current.rotation.y += 0.0063
    }
  })

  return <primitive object={scene} ref={mesh} />
}

function ResponsiveStar({ isScrolled, isDragging, setIsDragging }) {
  const { camera, size } = useThree()
  
  const getResponsivePosition = () => {
    if (!isScrolled) return [0, 0, 0]
    
    const distance = camera.position.z
    const vFOV = (camera.fov * Math.PI) / 180
    const visibleHeight = 2 * Math.tan(vFOV / 2) * distance
    const visibleWidth = visibleHeight * camera.aspect
    
    // Position star well inside viewport with slight adjustments
    const pixelOffsetX = 60 // Perfect horizontal position
    const pixelOffsetY = 80 // More down from top
    
    const paddingX = (pixelOffsetX / window.innerWidth) * visibleWidth
    const paddingY = (pixelOffsetY / window.innerHeight) * visibleHeight
    
    const x = -(visibleWidth / 2) + paddingX
    const y = (visibleHeight / 2) - paddingY
    
    return [x, y, 0]
  }

  const getResponsiveScale = () => {
    // Adjust scale based on viewport width for better responsiveness
    const scaleFactor = Math.min(window.innerWidth / 1200, 1)
    if (!isScrolled) return scaleFactor * 0.8 // Slightly smaller when not scrolled
    return scaleFactor * 0.15 // Small but clearly visible when scrolled
  }

  const { position, scale } = useSpring({
    position: getResponsivePosition(),
    scale: getResponsiveScale(),
    config: { mass: 1, tension: 120, friction: 24 },
  })

  return (
    <a.group position={position} scale={scale}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#4f46e5" />
      <pointLight position={[5, -5, 10]} intensity={0.6} color="#ec4899" />
      
      <Environment 
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/rogland_clear_night_1k.hdr"
        background={false}
      />
      
      <Suspense fallback={
        <mesh scale={0.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
            emissive="#4f46e5"
            emissiveIntensity={0.2}
          />
        </mesh>
      }>
        <StarModel isDragging={isDragging} />
      </Suspense>
    </a.group>
  )
}

useGLTF.preload('/models/star.glb')

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Corners />
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-neon-primary">
        
        {/* 3D Star Canvas */}
        <div className="fixed inset-0 z-50" style={{ pointerEvents: isScrolled ? "none" : "auto" }}>
          <Canvas
            gl={{ antialias: true, alpha: true }}
            camera={{ position: [0, 0, 18], fov: 45, near: 0.1, far: 1000 }}
            style={{ width: "100vw", height: "100vh", background: "transparent" }}
          >
            <ResponsiveStar
              isScrolled={isScrolled}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
            />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={!isScrolled}
              enableDamping={true}
              dampingFactor={0.05}
            />
          </Canvas>
        </div>

        {/* Background Elements */}
{/* Background Elements */}
      <div className="absolute inset-0">
        {/* Charcoal base layer */}
        <div className="absolute inset-0 bg-[#1a1a1e]" />
        
        {/* Grain effect - make sure this has content and proper sizing */}
        <div className="absolute inset-0 bg-grain" />
        
        {/* Noise effect */}
        <div className="absolute inset-0 bg-noise" />
        
        {/* Starfield */}
        <div className="absolute inset-0 opacity-20 bg-starfield" />
      </div>
      </section>
    </>
  )
}