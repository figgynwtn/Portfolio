'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function FloatingShapes() {
  const containerRef = useRef(null);

  useEffect(() => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    const shapes = [];
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    
    for (let i = 0; i < 15; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(Math.random() * 0xffffff),
        wireframe: true,
        transparent: true,
        opacity: 0.7
      });
      
      const shape = new THREE.Mesh(geometry, material);
      shape.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      shape.scale.setScalar(Math.random() * 2 + 0.5);
      scene.add(shape);
      shapes.push(shape);
    }
    
    camera.position.z = 15;
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      shapes.forEach(shape => {
        shape.rotation.x += 0.001;
        shape.rotation.y += 0.002;
        
        shape.position.y += Math.sin(Date.now() * 0.001 + shape.id) * 0.005;
      });
      
      renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10" />;
}