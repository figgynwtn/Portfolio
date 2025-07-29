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
  const directionalLightRef = useRef(null)

  useEffect(() => {
    // 1. Initialize Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    })

    // 2. Set up Renderer
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.zIndex = '0'
    mountRef.current.appendChild(renderer.domElement)

    // 3. Add Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)
    directionalLightRef.current = directionalLight

    // 4. Load Environment Map
    new RGBELoader()
      .load(
        'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/rogland_clear_night_1k.hdr',
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping
          scene.environment = texture
          scene.background = null
        },
        undefined,
        (error) => console.error("HDR loading error:", error)
      )

    // 5. Load Star Model - Supersolid enhancements added here
    const loader = new GLTFLoader()
    loader.load(
      '/models/star.glb',
      (gltf) => {
        starRef.current = gltf.scene
        
        // Enhanced material configuration
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.material.metalness = 1.0
            child.material.roughness = 0.05 // Smoother than before
            child.material.envMapIntensity = 2.0 // More reflective
            child.material.color = new THREE.Color(0xffffff) // Pure chrome
            
            // Supersolid-style shader modifications
            child.material.defines = { 'STANDARD': '' };
            child.material.onBeforeCompile = (shader) => {
              shader.fragmentShader = shader.fragmentShader.replace(
                '#include <output_fragment>',
                `
                // Add subtle rim lighting
                float rim = 1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)));
                gl_FragColor.rgb += rim * 0.3 * vec3(0.5, 0.3, 1.0);
                ${'#include <output_fragment>'}
                `
              );
            };
          }
        })

        // Position and scale
        const box = new THREE.Box3().setFromObject(gltf.scene)
        const center = box.getCenter(new THREE.Vector3())
        gltf.scene.position.sub(center)
        gltf.scene.scale.set(1.5, 1.5, 1.5)
        scene.add(gltf.scene)

        // Enhanced camera positioning
        camera.position.z = box.getSize(new THREE.Vector3()).length() * 1.8
        camera.position.y = box.getSize(new THREE.Vector3()).length() * 0.3

        // Supersolid-style orbit controls
        controlsRef.current = new OrbitControls(camera, renderer.domElement)
        controlsRef.current.enableDamping = true
        controlsRef.current.dampingFactor = 0.25
        controlsRef.current.minDistance = box.getSize(new THREE.Vector3()).length() * 1.2
        controlsRef.current.maxDistance = box.getSize(new THREE.Vector3()).length() * 3
        controlsRef.current.maxPolarAngle = Math.PI * 0.8 // Limit vertical rotation
      },
      undefined,
      (error) => {
        console.error('Model loading error:', error)
        // Fallback cube if model fails to load
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)
      }
    )

    // Supersolid-inspired mouse interactions
    const handleMouseMove = (e) => {
      if (!starRef.current || !directionalLightRef.current) return;
      
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Subtle parallax movement
      starRef.current.rotation.x = mouseY * 0.1;
      starRef.current.rotation.y = mouseX * 0.2;
      
      // Light follow effect
      directionalLightRef.current.position.x = mouseX * 2;
      directionalLightRef.current.position.y = mouseY * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Animation Loop
    const animate = () => {
      requestAnimationFrame(animate)
      
      if (starRef.current && !controlsRef.current?.isDragging) {
        starRef.current.rotation.y += 0.002
      }

      if (controlsRef.current) controlsRef.current.update()
      renderer.render(scene, camera)
    }
    animate()

    // 7. Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (controlsRef.current) controlsRef.current.dispose()
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'auto' }}
    />
  )
}