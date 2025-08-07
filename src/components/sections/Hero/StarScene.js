'use client'
import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'

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

export default function StarScene({ isDragging, setIsDragging }) {
  const { camera } = useThree()
  const [scrollProgress, setScrollProgress] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const progress = Math.min(scrollY / 200, 1) // Adjust 200 to change scroll sensitivity
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getResponsivePosition = () => {
    const distance = camera.position.z
    const vFOV = (camera.fov * Math.PI) / 180
    const visibleHeight = 2 * Math.tan(vFOV / 2) * distance
    const visibleWidth = visibleHeight * camera.aspect
    
    // Center position
    const center = [0, 0, 0]
    
    // Corner position (adjust pixel offsets as needed)
    const pixelOffsetX = 60
    const pixelOffsetY = 80
    const paddingX = (pixelOffsetX / window.innerWidth) * visibleWidth
    const paddingY = (pixelOffsetY / window.innerHeight) * visibleHeight
    const corner = [
      -(visibleWidth / 2) + paddingX,
      (visibleHeight / 2) - paddingY,
      0
    ]
    
    // Interpolate between positions
    return [
      center[0] + (corner[0] - center[0]) * scrollProgress,
      center[1] + (corner[1] - center[1]) * scrollProgress,
      center[2]
    ]
  }

  const getResponsiveScale = () => {
    const scaleFactor = Math.min(window.innerWidth / 1200, 1)
    const centerScale = scaleFactor * 0.8
    const cornerScale = scaleFactor * 0.15
    
    return centerScale + (cornerScale - centerScale) * scrollProgress
  }

  const { position, scale } = useSpring({
    position: getResponsivePosition(),
    scale: getResponsiveScale(),
    config: { 
      mass: 1, 
      tension: 170,
      friction: 26,
      precision: 0.0001
    },
  })

  return (
    <>
      <a.group position={position} scale={scale}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#4f46e5" />
        <pointLight position={[5, -5, 10]} intensity={0.6} color="#ec4899" />
        
        <Environment 
          files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/rogland_clear_night_1k.hdr"
          background={false}
        />
        
        <Suspense fallback={null}>
          <StarModel isDragging={isDragging} />
        </Suspense>
      </a.group>
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={!isDragging}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  )
}

useGLTF.preload('/models/star.glb')