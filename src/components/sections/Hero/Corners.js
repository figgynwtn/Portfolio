'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Corners() {
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [currentTime, setCurrentTime] = useState(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setCurrentTime(new Date())
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percentage = Math.round((scrollTop / docHeight) * 100)
      setScrollPercentage(percentage)
    }

    const updateTime = () => {
      setCurrentTime(new Date())
    }

    window.addEventListener('scroll', handleScroll)
    const timeInterval = setInterval(updateTime, 1000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(timeInterval)
    }
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

  return (
    <>
      {/* Top Left: Mini star appears when scrolled (transforms from main star) */}
      <motion.div
        className="fixed top-4 left-4 z-50 hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: scrollPercentage > 5 ? 1 : 0,
          scale: scrollPercentage > 5 ? 1 : 0
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <span className="text-neon-primary text-lg">★</span>
      </motion.div>

      {/* Top Right: Live scroll percentage with modern monospace font */}
      <motion.div
        style={{ position: 'fixed', top: 16, right: 16, zIndex: 50 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="text-neon-primary neon-text text-xs sm:text-sm">{scrollPercentage}%</span>
      </motion.div>

      {/* Bottom Left: Real-time clock with smooth second transitions */}
      {isClient && (
        <motion.div
          style={{ position: 'fixed', bottom: 16, left: 16, zIndex: 50 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="text-neon-primary neon-text text-xs sm:text-sm">{formatTime(currentTime)}</span>
        </motion.div>
      )}

      {/* Bottom Right: "TUNES" link with elegant hover effects */}
      <motion.div
        style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 50 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.a
          href="#tunes"
          className="text-neon-primary neon-text text-xs sm:text-sm hover:text-neon-purple transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          TUNES
        </motion.a>
      </motion.div>
    </>
  )
}