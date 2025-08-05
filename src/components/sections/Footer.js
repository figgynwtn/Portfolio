'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
  const [currentTime] = useState(new Date())
  
  return (
    <footer className="relative bg-neon-secondary pt-32 pb-16">
      {/* Content Container */}
      <div className="container mx-auto px-8">
        {/* NEWTON Stack - Moved up with less margin */}
        <div className="mb-16">
          {[0.3, 0.6, 1].map((opacity, i) => (
            <motion.div 
              key={i}
              className="font-clash text-3xl"
              style={{ opacity }}
            >
              NEWTON
            </motion.div>
          ))}
        </div>

        {/* Footer Content */}
        <div className="border-t border-neon-purple/30 pt-8">
          <div className="flex justify-between items-center">
            <div>© 2024 NEWTON</div>
            <div className="flex gap-6">
              <a href="#about">ABOUT</a>
              <a href="#contact">CONTACT</a>
              <a href="#resume">RESUME</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}