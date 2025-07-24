'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FestivalBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    camera.position.z = 5;

    // Shader material code from original script
    const bubbleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        iMouse: { value: new THREE.Vector2(0, 0) },
        force: { value: 0 },
        distortionAmount: { value: 0.5 },
        grainAmount: { value: 0.05 }
      },
      vertexShader: `
        // Vertex shader code from original
      `,
      fragmentShader: `
        // Fragment shader code from original
      `
    });

    // Rest of the Three.js setup (geometry, plane, event listeners, etc.)
    // ...

    return () => {
      // Cleanup
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
}