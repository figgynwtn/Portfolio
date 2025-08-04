'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
  const [currentTime, setCurrentTime] = useState(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setCurrentTime(new Date())
  }, [])

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date())
    }
    const timeInterval = setInterval(updateTime, 1000)
    return () => clearInterval(timeInterval)
  }, [])

  const formatTime = (date) => {
    if (!date) return '--:--:--'
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const logoVariants = [
    { id: 1, text: "NEWTON", opacity: 1 },
    { id: 2, text: "NEWTON", opacity: 0.7 },
    { id: 3, text: "NEWTON", opacity: 0.4 }
  ]

  return (
    <footer className="relative bg-neon-primary text-neon-primary py-16 overflow-hidden">
      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-10 bg-noise" />
      
      {/* Subtle Noise Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5"
        animate={{
          x: [0, 100, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end">
          
          {/* Left: Stacked Logo Variants */}
          <div className="space-y-2">
            {logoVariants.map((variant, index) => (
              <motion.div
                key={variant.id}
                className="neon-heading text-2xl md:text-3xl tracking-tight"
                style={{ opacity: variant.opacity }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: variant.opacity, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {variant.text}
              </motion.div>
            ))}
          </div>

          {/* Center: Clock (docked from corner) */}
          <div className="flex justify-center">
            {isClient && (
              <motion.div
                className="corner-ui"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="text-neon-primary neon-text">{formatTime(currentTime)}</span>
              </motion.div>
            )}
          </div>

          {/* Right: TUNES Link (docked from corner) */}
          <div className="flex justify-end">
            <motion.a
              href="#tunes"
              className="corner-ui"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-neon-primary neon-text">TUNES</span>
            </motion.a>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-16 pt-8 neon-border-t"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-neon-secondary neon-text">
              © 2024 NEWTON. ALL RIGHTS RESERVED.
            </div>
            
            <div className="flex items-center gap-6 text-sm text-neon-secondary neon-text">
              <a href="#about" className="hover:text-neon-purple transition-colors">
                ABOUT
              </a>
              <a href="#contact" className="hover:text-neon-purple transition-colors">
                CONTACT
              </a>
              <a href="#resume" className="hover:text-neon-purple transition-colors">
                RESUME
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
