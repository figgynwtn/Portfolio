'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function ModelViewer() {
  const mountRef = useRef(null)
  const controlsRef = useRef(null)
  const starRef = useRef(null)
  const mouse = useRef(new THREE.Vector2())

  useEffect(() => {
    // ===== 1. SETUP SCENE =====
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    })

    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    mountRef.current.appendChild(renderer.domElement)

    // ===== 2. LIGHTING SETUP =====
    new RGBELoader()
      .setDataType(THREE.HalfFloatType)
      .load(
        'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_1k.hdr',
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping
          texture.colorSpace = THREE.SRGBColorSpace
          scene.environment = texture
          scene.background = null
        }
      )

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // ===== 3. MODEL LOADING & CENTERING =====
    const loader = new GLTFLoader()
    loader.load(
      '/models/star.glb',
      (gltf) => {
        // Store reference to the star
        starRef.current = gltf.scene

        // Calculate bounding box and center
        const box = new THREE.Box3().setFromObject(gltf.scene)
        const center = box.getCenter(new THREE.Vector3())
        
        // Center the model
        gltf.scene.position.x -= center.x
        gltf.scene.position.y -= center.y
        gltf.scene.position.z -= center.z

        // Make it bigger (adjust scale factor as needed)
        gltf.scene.scale.set(1.5, 1.5, 1.5)

        scene.add(gltf.scene)
        
        // Position camera to fit the model
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const fov = camera.fov * (Math.PI / 180)
        let cameraZ = Math.abs(maxDim / Math.sin(fov / 2))
        
        // Add some padding
        cameraZ *= 1.5
        camera.position.z = cameraZ

        // Initialize orbit controls for dragging
        controlsRef.current = new OrbitControls(camera, renderer.domElement)
        controlsRef.current.enableDamping = true
        controlsRef.current.dampingFactor = 0.25
        controlsRef.current.screenSpacePanning = false
        controlsRef.current.maxPolarAngle = Math.PI
        controlsRef.current.minPolarAngle = 0
        controlsRef.current.enableZoom = false
      },
      undefined,
      (error) => console.error('Error loading model:', error)
    )

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    // ===== 4. HANDLE RESIZING =====
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // ===== 5. RENDER LOOP =====
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Update controls if they exist
      if (controlsRef.current) controlsRef.current.update()
      
      // Apply gentle mouse follow when not dragging
      if (starRef.current && (!controlsRef.current || !controlsRef.current.enabled)) {
        starRef.current.rotation.x += (mouse.current.y * 0.2 - starRef.current.rotation.x) * 0.05
        starRef.current.rotation.y += (mouse.current.x * 0.2 - starRef.current.rotation.y) * 0.05
      }
      
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (controlsRef.current) controlsRef.current.dispose()
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ 
    width: '100vw', 
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    touchAction: 'none'
  }} />
}