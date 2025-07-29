'use client'
import ModelViewer from './ModelViewer'
import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'

export default function Hero() {
  const containerRef = useRef(null)
  
  // Supersolid-style text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Background with subtle grain */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/10 to-black">
        <div className="absolute inset-0 opacity-5 bg-noise" />
      </div>

      {/* 3D Star - positioned slightly left */}
      <ModelViewer />

      {/* Text overlay - Supersolid-style layout */}
      <div className="absolute inset-0 flex items-center pl-[15vw] pointer-events-none">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="max-w-2xl"
        >
          <motion.h1 
            className="text-6xl font-bold text-white mb-4"
            variants={textVariants}
          >
            Newton
          </motion.h1>
          <motion.p 
            className="text-xl text-purple-200/80 font-light tracking-wider uppercase"
            variants={textVariants}
            transition={{ delay: 0.2 }}
          >
            UI/UX & Interactive Design
          </motion.p>
        </motion.div>
      </div>

      {/* Supersolid-style scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-px h-12 bg-gradient-to-t from-purple-400/30 to-transparent" />
        <p className="mt-2 text-xs text-purple-300/50 tracking-widest">SCROLL</p>
      </motion.div>
    </section>
  )
}