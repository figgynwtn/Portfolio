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
    if (!isScrolled) return 1
    return 0.15 // Small but clearly visible
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

        {/* Hero Text */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10"
          style={{ marginTop: '12vmin' }}
          animate={{
            opacity: isScrolled ? 0.3 : 1,
            scale: isScrolled ? 0.8 : 1,
            y: isScrolled ? -50 : 0
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 
            className={`text-[clamp(3rem,12vw,8rem)] font-black tracking-tight transition-all duration-500 rgb-shift ${
              isHovered ? 'text-neon-purple scale-105' : 'text-neon-primary'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            NEWTON
          </h1>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 bg-neon-primary">
          <div className="absolute inset-0 opacity-5 bg-noise" />
          <div className="absolute inset-0 opacity-10 bg-starfield" />
        </div>
      </section>
    </>
  )
}