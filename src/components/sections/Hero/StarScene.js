'use client'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

export default function StarScene() {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const starRef = useRef(null)
  const cameraRef = useRef(null)
  const animationRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const progress = Math.min(scrollY / 200, 1)
      setScrollProgress(progress)
    }

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight
        cameraRef.current.updateProjectionMatrix()
        rendererRef.current.setSize(window.innerWidth, window.innerHeight)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (sceneRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    })

    camera.position.z = 18
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.style.position = 'fixed'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.zIndex = '50'
    renderer.domElement.style.pointerEvents = 'none'
    
    mountRef.current.appendChild(renderer.domElement)
    sceneRef.current = scene
    rendererRef.current = renderer
    cameraRef.current = camera

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.4))
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
    directionalLight.position.set(10, 10, 5)
    scene.add(directionalLight)

    const pointLight1 = new THREE.PointLight(0x4f46e5, 0.8)
    pointLight1.position.set(-10, -10, -5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xec4899, 0.6)
    pointLight2.position.set(5, -5, 10)
    scene.add(pointLight2)

    // HDR Environment
    new RGBELoader().load(
      'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/rogland_clear_night_1k.hdr',
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping
        scene.environment = texture
      }
    )

    // Load star model
    new GLTFLoader().load('/models/star.glb', (gltf) => {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.metalness = 0.95
          child.material.roughness = 0.05
          child.material.envMapIntensity = 2.0
          child.material.color = new THREE.Color(0xffffff)
        }
      })

      const box = new THREE.Box3().setFromObject(gltf.scene)
      const center = box.getCenter(new THREE.Vector3())
      gltf.scene.position.sub(center)
      scene.add(gltf.scene)
      starRef.current = gltf.scene
    })

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)
      
      if (starRef.current && cameraRef.current) {
        starRef.current.rotation.y += 0.0063
        
        const t = scrollProgress
        const aspect = cameraRef.current.aspect
        const fov = cameraRef.current.fov
        const distance = cameraRef.current.position.z
        
        // Calculate visible area
        const vFOV = (fov * Math.PI) / 180
        const visibleHeight = 2 * Math.tan(vFOV / 2) * distance
        const visibleWidth = visibleHeight * aspect
        
.MathUtils.lerp(centerX, stickyX, t)
        starRef.current.position.y = THREE.MathUtils.lerp(centerY, stickyY, t)
        
        // Smaller scale
        const centerScale = Math.max(1.2, Math.min(2.0, window.innerWidth / 1000))
        const stickyScale = 0.2 // Reduced from 0.3 to 0.2
        
        starRef.current.scale.setScalar(THREE.MathUtils.lerp(centerScale, stickyScale, t))
      }
      
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      if (mountRef.current && rendererRef.current?.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement)
      }
    }
  }, [scrollProgress])

  return <div ref={mountRef} className="fixed inset-0 z-50 pointer-events-none" />
}